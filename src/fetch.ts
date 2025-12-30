import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { bcs, BcsReader } from "@mysten/bcs";

import { oracle, SENDER, TOKEN, tokenType, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { updatePyth, updateOracleWithPythUsd, TypusConfig } from "@typus/typus-sdk/dist/src/utils";

import { LIQUIDITY_POOL, LP_POOL, MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, PERP_PACKAGE_ID, PROFIT_VAULT, LOCK_VAULT } from ".";

import { getMarketsBcs, Markets, SymbolMarket } from "./generated/typus_perp/trading";
import { DeactivatingShares, getUserDeactivatingShares } from "./generated/typus_perp/lp_pool";
import { TradingOrder, Position } from "./generated/typus_perp/position";
import {
    getUserOrders as _getUserOrders,
    getUserPositions as _getUserPositions,
    getAllPositions as _getAllPositions,
    getEstimatedLiquidationPriceAndPnl,
} from "./generated/typus_perp/trading";
import { LiquidityPool } from "./generated/typus_perp/lp_pool";
import { LpUserShare, StakePool, getUserShares, allocateIncentive } from "./generated/typus_stake_pool/stake_pool";

import { UserProfit, LockedUserProfit } from "./generated/typus_perp/profit_vault";
import {
    getUserProfits as _getUserProfits,
    getLockedUserProfits as _getLockedUserProfits,
} from "./generated/typus_perp/profit_vault";

import { TypusBidReceipt } from "./generated/typus_perp/deps/typus_framework/vault";
import { TypusClient } from "src/client";

export async function getLpPools(client: TypusClient) {
    // let dynamicFields = await client.getDynamicFields({
    //     parentId: LIQUIDITY_POOL,
    // });

    // let lpPools: (typeof LiquidityPool.$inferType)[] = [];

    // for (const field of dynamicFields.data) {
    //     let lpPool = await getLpPool(client, field.objectId);
    //     // console.log(lpPool);
    //     lpPools.push(lpPool);
    // }
    // return lpPools.sort((a, b) => Number(a.index) - Number(b.index));

    return (await client.getDynamicObjectFieldsBcs(LIQUIDITY_POOL).then((x) => x.map((x) => LiquidityPool.parse(x)))).sort(
        (a, b) => Number(a.index) - Number(b.index)
    );
}

export async function getLpPool(client: TypusClient, objectId: string) {
    // const data = await client.getObject({
    //     id: objectId,
    //     options: {
    //         // request the bcs data when loading your object
    //         showBcs: true,
    //     },
    // });
    // if (data.data?.bcs?.dataType !== "moveObject") {
    //     throw new Error("Expected a move object");
    // }
    // // console.log(data.data.bcs.bcsBytes);
    // return LiquidityPool.fromBase64(data.data.bcs.bcsBytes);

    const bcs = await client.getObjectBcs(objectId);
    return LiquidityPool.parse(bcs!);
}

// getLpPool(client).then((x) => console.log(x));

export async function getStakePools(client: TypusClient) {
    // let dynamicFields = await client.getDynamicFields({
    //     parentId: STAKE_POOL,
    // });

    // let stakePools: (typeof StakePool.$inferType)[] = [];

    // for (const field of dynamicFields.data) {
    //     let stakePool = await getStakePool(client, field.objectId);
    //     // console.log(stakePool);
    //     stakePools.push(stakePool);
    // }

    // return stakePools.sort((a, b) => Number(a.pool_info.index) - Number(b.pool_info.index));

    return (await client.getDynamicObjectFieldsBcs(STAKE_POOL).then((x) => x.map((x) => StakePool.parse(x)))).sort(
        (a, b) => Number(a.pool_info.index) - Number(b.pool_info.index)
    );
}

export async function getStakePool(client: TypusClient, objectId: string) {
    // const data = await client.getObject({
    //     id: objectId,
    //     options: {
    //         // request the bcs data when loading your object
    //         showBcs: true,
    //     },
    // });
    // if (data.data?.bcs?.dataType !== "moveObject") {
    //     throw new Error("Expected a move object");
    // }

    // // console.log(data.data.bcs.bcsBytes);

    // return StakePool.fromBase64(data.data.bcs.bcsBytes);

    const bcs = await client.getObjectBcs(objectId);
    return StakePool.parse(bcs!);
}

/**
 * @returns [Markets, SymbolMarket[]][]
 */
export async function getMarkets(
    client: TypusClient,
    input: {
        indexes: string[];
    }
) {
    let tx = new Transaction();
    tx.add(getMarketsBcs({ arguments: { registry: MARKET, indexes: input.indexes.map((x) => BigInt(x)) } }));

    // tx.setSender(SENDER);
    // let bcs = await tx.build({ client: client.jsonRpcClient, onlyTransactionKind: true });
    // // console.log("bcs", bcs);
    // let res = await client.simulateTransaction(bcs);

    let devInspectTransactionBlockResult = await client.devInspectTransactionBlock({ sender: SENDER, transactionBlock: tx });
    // @ts-ignore
    let bytes = devInspectTransactionBlockResult.results[0].returnValues[0][0];
    let reader = new BcsReader(new Uint8Array(bytes));
    let marketIndex = 0;
    let results: [typeof Markets.$inferType, (typeof SymbolMarket.$inferType)[]][] = [];
    reader.readVec((reader, i) => {
        if (i == marketIndex) {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let markets = Markets.parse(bytes);
            results.push([markets, []]);
            marketIndex = i + markets.symbols.length + 1;
        } else {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let symbolMarket = SymbolMarket.parse(bytes);
            results[results.length - 1][1].push(symbolMarket);
        }
    });
    return results;
}

export type TradingOrder = typeof TradingOrder.$inferType;
export type TradingOrderWithMarketIndex = TradingOrder & { marketIndex: number };

export async function getUserOrders(
    client: TypusClient,
    input: {
        user: string;
        indexes: string[];
    }
) {
    let tx = new Transaction();

    for (let i of input.indexes) {
        tx.add(
            _getUserOrders({
                arguments: {
                    version: PERP_VERSION,
                    registry: MARKET,
                    marketIndex: BigInt(i),
                    user: input.user,
                },
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
    // console.log(res);

    let orders: TradingOrderWithMarketIndex[] = [];

    for (var x = 0; x < input.indexes.length; x++) {
        // @ts-ignore
        let returnValues = res.results[x].returnValues[0][0];
        // console.log(returnValues);

        let reader = new BcsReader(new Uint8Array(returnValues));
        reader.readVec((reader) => {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let order = TradingOrder.parse(bytes);

            orders.push({ ...order, marketIndex: x });
        });
    }

    return orders;
}

export type Position = typeof Position.$inferType;
export type PositionWithMarketIndex = Position & { marketIndex: number };

export async function getUserPositions(
    client: TypusClient,
    input: {
        user: string;
        indexes: string[];
    }
) {
    let tx = new Transaction();

    for (let i of input.indexes) {
        tx.add(
            _getUserPositions({
                arguments: {
                    version: PERP_VERSION,
                    registry: MARKET,
                    marketIndex: BigInt(i),
                    user: input.user,
                },
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
    // console.log(res);

    let positions: PositionWithMarketIndex[] = [];

    for (var x = 0; x < input.indexes.length; x++) {
        // @ts-ignore
        let returnValues = res.results[x].returnValues[0][0];
        // console.log(returnValues);

        let reader = new BcsReader(new Uint8Array(returnValues));
        reader.readVec((reader) => {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let position = Position.parse(bytes);
            positions.push({
                ...position,
                marketIndex: x,
            });
        });
    }
    // let positions: Position[] = readVecPosition(Uint8Array.from(returnValues));
    // console.log(positions);
    return positions;
}

export function parseOptionBidReceipts(positions: (typeof Position.$inferType)[]) {
    return positions.map((position) => {
        if (position.option_collateral_info) {
            let bidReceipt = TypusBidReceipt.parse(Uint8Array.from(Array.from(position.option_collateral_info.bid_receipts_bcs[0])));
            // console.log(bidReceipt);
            return bidReceipt;
        } else {
            return null;
        }
    });
}

/**
 * @returns [lpShare, incentives][]
 */
export async function getUserStake(
    client: TypusClient,
    input: {
        user: string;
        indexes: string[];
    }
) {
    let tx = new Transaction();

    for (let i of input.indexes) {
        tx.add(
            allocateIncentive({
                arguments: {
                    version: STAKE_POOL_VERSION,
                    registry: STAKE_POOL,
                    index: BigInt(i),
                },
            })
        );
        tx.add(
            getUserShares({
                arguments: {
                    registry: STAKE_POOL,
                    index: BigInt(i),
                    user: input.user,
                },
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
    // console.log(res);

    if (res.results) {
        let results: [typeof LpUserShare.$inferType | null, string[]][] = [];

        for (var x = 0; x < input.indexes.length; x++) {
            // @ts-ignore
            var returnValues = res.results[2 * x + 1].returnValues[0][0];
            // console.log(returnValues);

            var reader = new BcsReader(new Uint8Array(returnValues));
            let length = reader.readULEB();
            console.log(length);
            if (length == 0) {
                results.push([null, []]);
                continue;
            }
            // let lpShare = LpUserShare.fromFields(LpUserShare.bcs.read(reader));
            let lpShare = LpUserShare.read(reader);

            let incentives: string[] = [];
            reader.readVec((reader) => {
                let incentive = reader.read64();
                incentives.push(incentive);
            });

            results.push([lpShare, incentives]);
        }

        return results;
    } else {
        return [];
    }
}

/**
 * @returns deactivatingShares[]
 */
export async function getDeactivatingShares(
    client: TypusClient,
    input: {
        user: string;
        indexes: string[];
    }
) {
    let tx = new Transaction();

    for (let i of input.indexes) {
        tx.add(
            getUserDeactivatingShares({
                arguments: {
                    registry: LP_POOL,
                    index: BigInt(i),
                    user: input.user,
                },
                typeArguments: ["TLP_TOKEN"],
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
    // console.log(res);

    if (res.results) {
        let deactivatingShares: (typeof DeactivatingShares.$inferType)[] = [];

        for (var x = 0; x < input.indexes.length; x++) {
            // @ts-ignore
            var returnValues = res.results[0].returnValues[0][0];
            // console.log(returnValues);

            var reader = new BcsReader(new Uint8Array(returnValues));
            reader.readVec((reader) => {
                let length = reader.readULEB();
                let lpShare = DeactivatingShares.read(reader);

                // @ts-ignore
                deactivatingShares.push(lpShare);
            });
        }

        // console.log(deactivatingShares);
        return deactivatingShares;
    } else {
        return [];
    }
}

/**
 * @returns [liquidationPrice, pnl(in USD)]
 */
export async function getLiquidationPriceAndPnl(
    client: TypusClient,
    input: {
        positions: (typeof Position.$inferType)[];
    }
): Promise<PositionInfo[]> {
    let tx = new Transaction();

    let tokens: TOKEN[] = [];

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToAsset(position.collateral_token.name);
        let BASE_TOKEN = typeArgToAsset(position.symbol.base_token.name);
        tokens.push(TOKEN);
        tokens.push(BASE_TOKEN);
    }

    await updatePyth(client.pythClient, tx, Array.from(new Set(tokens)));
    for (let token of Array.from(new Set(tokens))) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToAsset(position.collateral_token.name);
        let BASE_TOKEN = typeArgToAsset(position.symbol.base_token.name);
        // @ts-ignore
        let index = position.marketIndex;
        tx.add(
            getEstimatedLiquidationPriceAndPnl({
                arguments: {
                    version: PERP_VERSION,
                    registry: MARKET,
                    poolRegistry: LP_POOL,
                    marketIndex: BigInt(index),
                    poolIndex: BigInt(index),
                    typusOracleCToken: oracle[NETWORK][TOKEN]!,
                    typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                    positionId: BigInt(position.position_id),
                    dovRegistry: client.config.registry.dov.dovSingle,
                },
                typeArguments: [position.collateral_token.name, position.symbol.base_token.name],
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: SENDER, transactionBlock: tx });
    // console.log(res);
    //   0  estimated_liquidation_price,
    //   1  has_profit,
    //   2  pnl_usd,
    //   3  is_cost,
    //   4  unrealized_cost_in_usd,
    //   5  unrealized_funding_sign,
    //   6  unrealized_funding_fee_usd,
    //   7  unrealized_borrow_fee_usd,
    //   8  close_fee_usd

    let results = res.results
        ? res.results!.slice(-input.positions.length).map((x) => {
            // console.log(x);
            let liquidationPrice = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![0][0])));
            let isProfit = bcs.bool().parse(Uint8Array.from(x.returnValues![1][0]));
            var pnl = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![2][0])));
            pnl = isProfit ? pnl : -pnl;
            // including closeFee
            let isCost = bcs.bool().parse(Uint8Array.from(x.returnValues![3][0]));
            var cost = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![4][0])));
            cost = isCost ? cost : -cost;
            // cost = unrealized_loss + unrealized_trading_fee + unrealized_borrow_fee + unrealized_funding_fee;
            let fundingFeeSign = bcs.bool().parse(Uint8Array.from(x.returnValues![5][0]));
            var fundingFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![6][0])));
            fundingFee = fundingFeeSign ? fundingFee : -fundingFee;
            let borrowFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![7][0])));
            let closeFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![8][0])));

            return {
                liquidationPrice,
                pnl: pnl + closeFee,
                fundingFee,
                borrowFee,
                closeFee,
                pnlAfterFee: pnl - cost,
            } as PositionInfo;
        })
        : [];
    // console.log(results);
    return results;
}

interface PositionInfo {
    liquidationPrice: number;
    pnl: number;
    fundingFee: number;
    borrowFee: number;
    closeFee: number;
    pnlAfterFee: number;
}

export async function getAllPositions(
    client: TypusClient,
    input: {
        baseToken: TOKEN;
        slice: string;
        page: string;
        marketIndex: string;
    }
) {
    let tx = new Transaction();
    tx.add(
        _getAllPositions({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                marketIndex: BigInt(input.marketIndex),
                slice: BigInt(input.slice),
                page: BigInt(input.page),
            },
            typeArguments: [tokenType[NETWORK][input.baseToken]],
        })
    );
    let res = await client.devInspectTransactionBlock({
        sender: SENDER,
        transactionBlock: tx,
    });

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return { positions: [], maxPage: 0 };
    }

    // -- 解析回傳值 -------------------------------------------------
    const raw = new Uint8Array(res.results![0].returnValues![0][0]);

    // 1) 至少要有 8 bytes 的 max_page
    if (raw.length < 8) return { positions: [], maxPage: 0 };

    const reader = new BcsReader(raw);

    // 2) 第一個 u8 = user_positions_len + 1
    const userPositionsLen = reader.readULEB() - 1;
    // console.log("userPositionsLen", userPositionsLen);

    const positions: (typeof Position.$inferType)[] = [];
    for (let i = 0; i < userPositionsLen; i++) {
        reader.readULEB();
        const pos = Position.read(reader);
        positions.push(pos);
    }

    reader.readULEB();
    const maxPage = Number(reader.read64());
    // console.log("maxPage", maxPage);

    return { positions, maxPage };
}

const SLICE = 100;

export async function getAllPositionsWithTradingSymbol(
    client: TypusClient,
    input: {
        baseToken: TOKEN;
        marketIndex: string;
    }
) {
    var { positions: pos, maxPage } = await getAllPositions(client, {
        baseToken: input.baseToken,
        slice: SLICE.toString(),
        page: "1",
        marketIndex: input.marketIndex,
    });
    // console.log(maxPage);

    var positions = pos;

    for (let page = 2; page <= maxPage; page++) {
        console.log(page);
        var { positions: pos, maxPage } = await getAllPositions(client, {
            baseToken: input.baseToken,
            slice: SLICE.toString(),
            page: page.toString(),
            marketIndex: input.marketIndex,
        });
        positions = positions.concat(pos);
    }
    return positions;
}


const TypeNameBcs = bcs.struct("TypeName", {
    name: bcs.string(),
});

const UserProfitBcs = bcs.struct("UserProfit", {
    collateral_token: TypeNameBcs,
    base_token: TypeNameBcs,
    position_id: bcs.u64(),
    order_id: bcs.u64(),
    amount: bcs.u64(),
    create_ts_ms: bcs.u64(),
});

const LockedUserProfitBcs = bcs.struct("LockedUserProfit", {
    user_profit: UserProfitBcs,
    create_ts_ms: bcs.u64(),
});

export type UserProfit = {
    collateral_token: {
        name: string;
    },
    base_token: {
        name: string;
    },
    position_id: string,
    order_id: string,
    amount: string,
    create_ts_ms: string;
}

export type LockedUserProfit = {
    user_profit: UserProfit;
    create_ts_ms: string;
}

export async function fetchUserProfits(
    client: TypusClient,
    input: {
        profitVault: string;
        version: string;
        user: string;
    }
) {
    let tx = new Transaction();
    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_user_profits`,
        arguments: [tx.object(input.version), tx.object(input.profitVault), tx.pure.address(input.user)],
    });

    const res = await client.devInspectTransactionBlock({
        sender: SENDER,
        transactionBlock: tx,
    });

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return [];
    }

    const returnValues = res.results[0].returnValues[0][0];

    const reader = new BcsReader(new Uint8Array(returnValues));

    const profits: UserProfit[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const profit = UserProfitBcs.parse(Uint8Array.from(Array.from(bytes)));
        profits.push(profit);
    });

    return profits;
}

export async function fetchLockedUserProfits(
    client: TypusClient,
    input: {
        lockVault: string;
        version: string;
        user: string;
    }
) {
    let tx = new Transaction();
    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_locked_user_profits`,
        arguments: [tx.object(PERP_VERSION), tx.object(input.lockVault), tx.pure.address(input.user)],
    });

    const res = await client.devInspectTransactionBlock({
        sender: SENDER,
        transactionBlock: tx,
    });

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return [];
    }

    const returnValues = res.results[0].returnValues[0][0];
    const reader = new BcsReader(new Uint8Array(returnValues));
    const lockedUserProfits: LockedUserProfit[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const profit = LockedUserProfitBcs.parse(Uint8Array.from(Array.from(bytes)));
        lockedUserProfits.push(profit);
    });

    return lockedUserProfits;
}

export async function fetchAllUserProfits(
    client: TypusClient,
    input?: {
        profitVault?: string;
    }
): Promise<{ user: string, profits: UserProfit[] }[]> {
    const provider = new SuiClient({ url: client.config.rpcEndpoint });
    const profitVaultId = input?.profitVault ?? PROFIT_VAULT;

    // 1. Read ProfitVault object to get user_profits Table ID
    const vaultResponse = await provider.getObject({
        id: profitVaultId,
        options: { showContent: true },
    });

    if (!vaultResponse.data?.content || vaultResponse.data.content.dataType !== "moveObject") {
        return [];
    }

    const fields = (vaultResponse.data.content as any).fields;
    const tableId = fields?.user_profits?.fields?.id?.id;

    if (!tableId) {
        return [];
    }

    // 2. Get all dynamic fields (user addresses) from the Table
    let cursor: string | null = null;
    const allUsers: string[] = [];

    while (true) {
        const dynamicFields = await provider.getDynamicFields({
            parentId: tableId,
            cursor,
            limit: 50,
        });

        for (const field of dynamicFields.data) {
            const userAddress = (field.name as any).value;
            if (userAddress) {
                allUsers.push(userAddress);
            }
        }

        if (!dynamicFields.hasNextPage) {
            break;
        }
        cursor = dynamicFields.nextCursor ?? null;
    }

    // 3. For each user, fetch their profits
    const fetchUserProfitsPromises: Promise<{ user: string, profits: UserProfit[] }>[] = [];
    for (const user of allUsers) {
        try {
            const fetchUserProfitsWithUser = async () => {
                const profits = await fetchUserProfits(client, { profitVault: profitVaultId, version: PERP_VERSION, user });
                return { user, profits };
            }
            fetchUserProfitsPromises.push(fetchUserProfitsWithUser());
        } catch (e) {
            console.error(`Failed to get profits for user ${user}:`, e);
        }
    }

    const results = await Promise.all(fetchUserProfitsPromises);
    return results
}

export async function fetchAllLockedUserProfits(
    client: TypusClient,
    input?: {
        lockVault?: string;
    }
): Promise<{ user: string, lockedUserProfits: LockedUserProfit[] }[]> {
    const provider = new SuiClient({ url: client.config.rpcEndpoint });

    // 1. Read LockVault object to get locked_user_profits Table ID
    const vaultResponse = await provider.getObject({
        id: input?.lockVault ?? LOCK_VAULT,
        options: { showContent: true },
    });

    if (!vaultResponse.data?.content || vaultResponse.data.content.dataType !== "moveObject") {
        return [];
    }

    const fields = (vaultResponse.data.content as any).fields;
    const tableId = fields?.locked_user_profits?.fields?.id?.id;

    if (!tableId) {
        return [];
    }

    // 2. Get all dynamic fields (user addresses) from the Table
    let cursor: string | null = null;
    const allUsers: string[] = [];

    while (true) {
        const dynamicFields = await provider.getDynamicFields({
            parentId: tableId,
            cursor,
            limit: 50,
        });

        for (const field of dynamicFields.data) {
            const userAddress = (field.name as any).value;
            if (userAddress) {
                allUsers.push(userAddress);
            }
        }

        if (!dynamicFields.hasNextPage) {
            break;
        }
        cursor = dynamicFields.nextCursor ?? null;
    }

    // 3. For each user, fetch their locked profits
    const fetchLockedUserProfitsPromises: Promise<{ user: string, lockedUserProfits: LockedUserProfit[] }>[] = [];

    for (const user of allUsers) {
        try {
            const fetchLockedUserProfitsWithUser = async () => {
                const lockedUserProfits = await fetchLockedUserProfits(client, { lockVault: LOCK_VAULT, version: PERP_VERSION, user });
                return { user, lockedUserProfits };
            }
            fetchLockedUserProfitsPromises.push(fetchLockedUserProfitsWithUser());
        } catch (e) {
            console.error(`Failed to get locked profits for user ${user}:`, e);
        }
    }
    const results = await Promise.all(fetchLockedUserProfitsPromises);

    return results;
}