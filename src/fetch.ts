import { Transaction } from "@mysten/sui/transactions";
import { bcs, BcsReader } from "@mysten/bcs";

import { oracle, SENDER, TOKEN, tokenType, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { updatePyth, updateOracleWithPythUsd, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { updateOracleWithSignatureTx } from "@typus/typus-sdk/dist/src/utils";

import {
    LIQUIDITY_POOL,
    LP_POOL,
    MARKET,
    NETWORK,
    PERP_VERSION,
    STAKE_POOL,
    STAKE_POOL_VERSION,
    PERP_PACKAGE_ID,
    LOCK_VAULT,
    PROFIT_VAULT,
} from ".";

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
import { getUserProfits as _getUserProfits, getLockedUserProfits as _getLockedUserProfits } from "./generated/typus_perp/profit_vault";

import { TypusBidReceipt } from "./generated/typus_perp/deps/typus_framework/vault";
import { TypusClient } from "src/client";
import { normalizeStructTag } from "@mysten/sui/utils";

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
    // let bcs = await tx.build({ client: client.gRpcClient, onlyTransactionKind: true });
    // // console.log("bcs", bcs);
    // let res = await client.simulateTransaction(bcs);

    let devInspectTransactionBlockResult = await client.devInspectTransactionBlock({ transaction: tx });
    // @ts-ignore
    let bytes = devInspectTransactionBlockResult.commandResults[0].returnValues[0].bcs;
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

    let res = await client.devInspectTransactionBlock({ transaction: tx });
    // console.log(res);

    let orders: TradingOrderWithMarketIndex[] = [];

    for (var x = 0; x < input.indexes.length; x++) {
        // @ts-ignore
        let returnValues = res.commandResults[x].returnValues[0].bcs;
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

    let res = await client.devInspectTransactionBlock({ transaction: tx });
    // console.log(res);

    let positions: PositionWithMarketIndex[] = [];

    for (var x = 0; x < input.indexes.length; x++) {
        // @ts-ignore
        let returnValues = res.commandResults[x].returnValues[0].bcs;
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

    let res = await client.devInspectTransactionBlock({ transaction: tx });
    // console.log(res);

    if (res.FailedTransaction) {
        console.error("Transaction failed with error: ", res.FailedTransaction.status.error);
    }
    if (res.commandResults) {
        let results: [typeof LpUserShare.$inferType | null, string[]][] = [];

        for (var x = 0; x < input.indexes.length; x++) {
            // @ts-ignore
            var returnValues = res.commandResults[2 * x + 1].returnValues[0].bcs;
            // console.log(returnValues);

            var reader = new BcsReader(new Uint8Array(returnValues));
            let length = reader.readULEB();
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

    let res = await client.devInspectTransactionBlock({ transaction: tx });
    // console.log(res);

    if (res.commandResults) {
        let deactivatingShares: (typeof DeactivatingShares.$inferType)[] = [];

        for (var x = 0; x < input.indexes.length; x++) {
            // @ts-ignore
            var returnValues = res.commandResults[0].returnValues[0].bcs;
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
        oracle?: string;
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

    const tokensWithoutTypus = tokens.filter((token) => token !== "TYPUS");
    await updatePyth(client.pythClient, tx, Array.from(new Set(tokensWithoutTypus)));
    for (let token of Array.from(new Set(tokensWithoutTypus))) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }

    if (tokens.includes("TYPUS")) {
        tx = await updateOracleWithSignatureTx(NETWORK, tx, client.config.package.oracle, tokenType[NETWORK]["TYPUS"]);
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
                typeArguments: [normalizeStructTag(position.collateral_token.name), normalizeStructTag(position.symbol.base_token.name)],
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ transaction: tx });
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

    let results = res.commandResults
        ? // @ts-ignore
          res.commandResults!.slice(-input.positions.length).map((x) => {
              // console.log(x);
              let liquidationPrice = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![0].bcs)));
              let isProfit = bcs.bool().parse(Uint8Array.from(x.returnValues![1].bcs));
              var pnl = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![2].bcs)));
              pnl = isProfit ? pnl : -pnl;
              // including closeFee
              let isCost = bcs.bool().parse(Uint8Array.from(x.returnValues![3].bcs));
              var cost = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![4].bcs)));
              cost = isCost ? cost : -cost;
              // cost = unrealized_loss + unrealized_trading_fee + unrealized_borrow_fee + unrealized_funding_fee;
              let fundingFeeSign = bcs.bool().parse(Uint8Array.from(x.returnValues![5].bcs));
              var fundingFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![6].bcs)));
              fundingFee = fundingFeeSign ? fundingFee : -fundingFee;
              let borrowFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![7].bcs)));
              let closeFee = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![8].bcs)));

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
        transaction: tx,
    });

    // @ts-ignore
    if (!res.commandResults?.[0]?.returnValues?.[0]?.bcs) {
        return { positions: [], maxPage: 0 };
    }

    // -- 解析回傳值 -------------------------------------------------
    // @ts-ignore
    const raw = new Uint8Array(res.commandResults![0].returnValues![0].bcs);

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
    };
    base_token: {
        name: string;
    };
    position_id: string;
    order_id: string;
    amount: string;
    create_ts_ms: string;
};

export type LockedUserProfit = {
    user_profit: UserProfit;
    create_ts_ms: string;
};

export async function fetchUserProfits(
    client: TypusClient,
    input: {
        user: string;
    }
) {
    let tx = new Transaction();
    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_user_profits`,
        arguments: [tx.object(PERP_VERSION), tx.object(PROFIT_VAULT), tx.pure.address(input.user)],
    });

    const res = await client.devInspectTransactionBlock({
        transaction: tx,
    });

    // @ts-ignore
    if (!res.commandResults?.[0]?.returnValues?.[0].bcs) {
        return [];
    }

    // @ts-ignore
    const returnValues = res.commandResults[0].returnValues[0].bcs;

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
        user: string;
    }
) {
    let tx = new Transaction();
    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_locked_user_profits`,
        arguments: [tx.object(PERP_VERSION), tx.object(LOCK_VAULT), tx.pure.address(input.user)],
    });

    const res = await client.devInspectTransactionBlock({
        transaction: tx,
    });

    // @ts-ignore
    if (!res.commandResults?.[0]?.returnValues?.[0].bcs) {
        return [];
    }

    // @ts-ignore
    const returnValues = res.commandResults[0].returnValues[0].bcs;
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
