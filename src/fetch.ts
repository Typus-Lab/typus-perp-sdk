import { Transaction } from "@mysten/sui/transactions";
import { bcs, BcsReader } from "@mysten/bcs";

import { oracle, SENDER, TOKEN, tokenType, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { updatePyth, updateOracleWithPythUsd } from "@typus/typus-sdk/dist/src/utils";

import {
    LIQUIDITY_POOL,
    LIQUIDITY_POOL_0,
    LP_POOL,
    MARKET,
    NETWORK,
    PERP_VERSION,
    STAKE_POOL,
    STAKE_POOL_0,
    STAKE_POOL_VERSION,
    TLP_TOKEN,
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

import { TypusBidReceipt } from "./generated/typus_perp/deps/typus_framework/vault";
import { TypusClient } from "src/client";

export async function getLpPools(client: TypusClient): Promise<(typeof LiquidityPool.$inferType)[]> {
    // const lpPoolRegistry = await Registry.fetch(client, LP_POOL);
    // console.log(lpPoolRegistry);

    let dynamicFields = await client.getDynamicFields({
        parentId: LIQUIDITY_POOL,
    });

    let lpPools: (typeof LiquidityPool.$inferType)[] = [];

    for (const field of dynamicFields.data) {
        let lpPool = await getLpPool(client, field.objectId);
        // console.log(lpPool);
        lpPools.push(lpPool);
    }

    return lpPools;
}

export async function getLpPool(client: TypusClient, objectId: string = LIQUIDITY_POOL_0): Promise<typeof LiquidityPool.$inferType> {
    // let lpPool = await LiquidityPool.fetch(client, objectId);
    // return lpPool;

    const data = await client.getObject({
        id: objectId,
        options: {
            // request the bcs data when loading your object
            showBcs: true,
        },
    });
    if (data.data?.bcs?.dataType !== "moveObject") {
        throw new Error("Expected a move object");
    }

    // console.log(data.data.bcs.bcsBytes);

    return LiquidityPool.fromBase64(data.data.bcs.bcsBytes);
}

// getLpPool(client).then((x) => console.log(x));

export async function getStakePools(client: TypusClient): Promise<(typeof StakePool.$inferType)[]> {
    let dynamicFields = await client.getDynamicFields({
        parentId: STAKE_POOL,
    });

    let stakePools: (typeof StakePool.$inferType)[] = [];

    for (const field of dynamicFields.data) {
        let stakePool = await getStakePool(client, field.objectId);
        // console.log(stakePool);
        stakePools.push(stakePool);
    }

    return stakePools;
}

export async function getStakePool(client: TypusClient, objectId: string = STAKE_POOL_0): Promise<typeof StakePool.$inferType> {
    // let stakePool = await StakePool.fetch(client, objectId);
    // return stakePool;

    const data = await client.getObject({
        id: objectId,
        options: {
            // request the bcs data when loading your object
            showBcs: true,
        },
    });
    if (data.data?.bcs?.dataType !== "moveObject") {
        throw new Error("Expected a move object");
    }

    // console.log(data.data.bcs.bcsBytes);

    return StakePool.fromBase64(data.data.bcs.bcsBytes);
}

export interface MarketsData {
    markets: typeof Markets.$inferType;
    symbolMarkets: (typeof SymbolMarket.$inferType)[];
}

export async function getMarkets(
    client: TypusClient,
    input: {
        indexes: string[];
    }
): Promise<MarketsData[]> {
    let tx = new Transaction();
    tx.add(getMarketsBcs({ arguments: { registry: MARKET, indexes: input.indexes.map((x) => BigInt(x)) } }));
    let devInspectTransactionBlockResult = await client.devInspectTransactionBlock({ sender: SENDER, transactionBlock: tx });
    // @ts-ignore
    let bytes = devInspectTransactionBlockResult.results[0].returnValues[0][0];
    let reader = new BcsReader(new Uint8Array(bytes));
    let marketIndex = 0;
    let results: MarketsData[] = [];
    reader.readVec((reader, i) => {
        if (i == marketIndex) {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let markets = Markets.parse(bytes);
            results.push({ markets, symbolMarkets: [] });
            marketIndex = i + markets.symbols.length + 1;
        } else {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let symbolMarket = SymbolMarket.parse(bytes);
            results[results.length - 1].symbolMarkets.push(symbolMarket);
        }
    });
    return results;
}

export async function getUserOrders(client: TypusClient, user: string) {
    let tx = new Transaction();
    tx.add(
        _getUserOrders({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                marketIndex: BigInt(0),
                user,
            },
        })
    );

    let res = await client.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    // @ts-ignore
    let returnValues = res.results[0].returnValues[0][0];
    // console.log(returnValues);

    let reader = new BcsReader(new Uint8Array(returnValues));
    let orders: (typeof TradingOrder.$inferType)[] = [];
    reader.readVec((reader) => {
        let length = reader.readULEB();
        let bytes = reader.readBytes(length);
        let order = TradingOrder.parse(bytes);
        orders.push(order);
    });

    // let orders: TradingOrder[] = readVecOrder(Uint8Array.from(returnValues));
    // console.log(orders);
    return orders;
}

export async function getUserPositions(client: TypusClient, user: string) {
    let tx = new Transaction();

    tx.add(
        _getUserPositions({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                marketIndex: BigInt(0),
                user,
            },
        })
    );

    let res = await client.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    // @ts-ignore
    let returnValues = res.results[0].returnValues[0][0];
    // console.log(returnValues);

    let reader = new BcsReader(new Uint8Array(returnValues));
    let positions: (typeof Position.$inferType)[] = [];
    reader.readVec((reader) => {
        let length = reader.readULEB();
        let bytes = reader.readBytes(length);
        let position = Position.parse(bytes);
        positions.push(position);
    });

    // let positions: Position[] = readVecPosition(Uint8Array.from(returnValues));
    // console.log(positions);
    return positions;
}

export function parseOptionBidReceipts(positions: (typeof Position.$inferType)[]): (typeof TypusBidReceipt.$inferType | null)[] {
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
 * @returns [lpShare, incentives]
 */
export async function getUserStake(client: TypusClient, user: string): Promise<[typeof LpUserShare.$inferType, string[]] | null> {
    let tx = new Transaction();

    tx.add(
        allocateIncentive({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
            },
        })
    );

    tx.add(
        getUserShares({
            arguments: {
                registry: STAKE_POOL,
                index: BigInt(0),
                user,
            },
        })
    );

    let res = await client.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    if (res.results) {
        // @ts-ignore
        var returnValues = res.results[1].returnValues[0][0];
        // console.log(returnValues);

        var reader = new BcsReader(new Uint8Array(returnValues));
        let length = reader.readULEB();
        // console.log(length);
        if (length == 0) {
            return null;
        }
        // let lpShare = LpUserShare.fromFields(LpUserShare.bcs.read(reader));
        let lpShare = LpUserShare.read(reader);

        let incentives: string[] = [];
        reader.readVec((reader) => {
            let incentive = reader.read64();
            incentives.push(incentive);
        });

        return [lpShare, incentives];
    } else {
        return null;
    }
}

/**
 * @returns deactivatingShares[]
 */
export async function getDeactivatingShares(client: TypusClient, user: string): Promise<(typeof DeactivatingShares.$inferType)[]> {
    let tx = new Transaction();
    tx.add(
        getUserDeactivatingShares({
            arguments: {
                registry: LP_POOL,
                index: BigInt(0),
                user,
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    let res = await client.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    if (res.results) {
        // @ts-ignore
        var returnValues = res.results[0].returnValues[0][0];
        // console.log(returnValues);

        var reader = new BcsReader(new Uint8Array(returnValues));
        let deactivatingShares: (typeof DeactivatingShares.$inferType)[] = [];
        reader.readVec((reader) => {
            let length = reader.readULEB();
            let lpShare = DeactivatingShares.read(reader);

            // @ts-ignore
            deactivatingShares.push(lpShare);
        });
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
        user: string;
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
        tx.add(
            getEstimatedLiquidationPriceAndPnl({
                arguments: {
                    version: PERP_VERSION,
                    registry: MARKET,
                    poolRegistry: LP_POOL,
                    marketIndex: BigInt(0),
                    poolIndex: BigInt(0),
                    typusOracleCToken: oracle[NETWORK][TOKEN]!,
                    typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                    positionId: BigInt(position.position_id),
                    dovRegistry: client.config.registry.dov.dovSingle,
                },
                typeArguments: [position.collateral_token.name, position.symbol.base_token.name],
            })
        );
    }

    let res = await client.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
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
    }
) {
    let tx = new Transaction();
    tx.add(
        _getAllPositions({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                marketIndex: BigInt(0),
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
    }
): Promise<(typeof Position.$inferType)[]> {
    var positions: (typeof Position.$inferType)[] = [];

    var { positions: pos, maxPage } = await getAllPositions(client, {
        baseToken: input.baseToken,
        slice: SLICE.toString(),
        page: "1",
    });
    // console.log(maxPage);

    positions = positions.concat(pos);

    for (let page = 2; page <= maxPage; page++) {
        console.log(page);
        var { positions: pos, maxPage } = await getAllPositions(client, {
            baseToken: input.baseToken,
            slice: SLICE.toString(),
            page: page.toString(),
        });
        positions = positions.concat(pos);
    }
    return positions;
}
