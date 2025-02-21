import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { bcs, BcsReader } from "@mysten/bcs";

import { MarketRegistry, Markets, SymbolMarket } from "./typus_perp/trading/structs";
import { LiquidityPool, Registry } from "./typus_perp/lp-pool/structs";
import { TradingOrder, Position } from "./typus_perp/position/structs";
import {
    getUserOrders as _getUserOrders,
    getUserPositions as _getUserPositions,
    getEstimatedLiquidationPriceAndPnl,
} from "./typus_perp/trading/functions";

import { allocateIncentive, getUserShares } from "./typus_stake_pool/stake-pool/functions";
import { LpUserShare, StakePool } from "./typus_stake_pool/stake-pool/structs";

import { CLOCK, SENDER, tokenType, typeArgToToken } from "@typus/typus-sdk/dist/src/constants";
import {
    priceInfoObjectIds,
    pythStateId,
    PythClient,
    updatePyth,
    TypusConfig,
    updateOracleWithPyth,
    Token,
} from "@typus/typus-sdk/dist/src/utils";

import { LIQUIDITY_POOL, LIQUIDITY_POOL_0, LP_POOL, MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_0, STAKE_POOL_VERSION } from ".";
import { TypusBidReceipt } from "./_dependencies/source/0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded/vault/structs";
import { PUBLISHED_AT } from "./typus_perp";

export async function getLpPools(config: TypusConfig): Promise<LiquidityPool[]> {
    let provider = new SuiClient({ url: config.rpcEndpoint });

    // const lpPoolRegistry = await Registry.fetch(provider, LP_POOL);
    // console.log(lpPoolRegistry);

    let dynamicFields = await provider.getDynamicFields({
        parentId: LIQUIDITY_POOL,
    });

    let lpPools: LiquidityPool[] = [];

    for (const field of dynamicFields.data) {
        let lpPool = await LiquidityPool.fetch(provider, field.objectId);
        // console.log(lpPool);
        lpPools.push(lpPool);
    }

    return lpPools;
}

export async function getLpPool(config: TypusConfig, objectId: string = LIQUIDITY_POOL_0): Promise<LiquidityPool> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let lpPool = await LiquidityPool.fetch(provider, objectId);
    return lpPool;
}

export async function getStakePools(config: TypusConfig): Promise<StakePool[]> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let dynamicFields = await provider.getDynamicFields({
        parentId: STAKE_POOL,
    });

    let stakePools: StakePool[] = [];

    for (const field of dynamicFields.data) {
        let stakePool = await StakePool.fetch(provider, field.objectId);
        // console.log(stakePool);
        stakePools.push(stakePool);
    }

    return stakePools;
}

export async function getStakePool(config: TypusConfig, objectId: string = STAKE_POOL_0): Promise<StakePool> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let stakePool = await StakePool.fetch(provider, objectId);
    return stakePool;
}

export interface MarketsData {
    markets: Markets;
    symbolMarkets: SymbolMarket[];
}

export async function getMarkets(
    config: TypusConfig,
    input: {
        indexes: string[];
    }
): Promise<MarketsData[]> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let transaction = new Transaction();
    transaction.moveCall({
        target: `${PUBLISHED_AT}::trading::get_markets_bcs`,
        arguments: [transaction.object(MARKET), transaction.pure.vector("u64", input.indexes)],
    });
    let devInspectTransactionBlockResult = await provider.devInspectTransactionBlock({ sender: SENDER, transactionBlock: transaction });
    // @ts-ignore
    let bytes = devInspectTransactionBlockResult.results[0].returnValues[0][0];
    let reader = new BcsReader(new Uint8Array(bytes));
    let marketIndex = 0;
    let results: MarketsData[] = [];
    reader.readVec((reader, i) => {
        if (i == marketIndex) {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let markets = Markets.fromBcs(Uint8Array.from(Array.from(bytes)));
            results.push({ markets, symbolMarkets: [] });
            marketIndex = i + markets.symbols.length + 1;
        } else {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let symbolMarket = SymbolMarket.fromBcs(Uint8Array.from(Array.from(bytes)));
            results[results.length - 1].symbolMarkets.push(symbolMarket);
        }
    });
    return results;
}

// export async function getMarkets(config: TypusConfig): Promise<Markets[]> {
//     let provider = new SuiClient({ url: config.rpcEndpoint });

//     // const marketRegistry = await MarketRegistry.fetch(provider, MARKET);
//     // console.log(marketRegistry.markets.vid);

//     let dynamicFields = await provider.getDynamicFields({
//         // @ts-ignore
//         parentId: config.object.perpMarketVid,
//     });

//     let markets: Markets[] = [];

//     for (const field of dynamicFields.data) {
//         let market = await Markets.fetch(provider, field.objectId);
//         // console.log(market);
//         markets.push(market);
//     }
//     return markets;
// }

// export async function getSymbolMarkets(provider: SuiClient, market: Markets): Promise<Map<string, SymbolMarket>> {
//     let symbolMarkets = new Map<string, SymbolMarket>();

//     let dynamicFields = await provider.getDynamicFields({
//         parentId: market.symbolMarkets.id,
//     });

//     for (const field of dynamicFields.data) {
//         let symbolMarket = await SymbolMarket.fetch(provider, field.objectId);
//         // @ts-ignore
//         let key = field.name.value.name;
//         // console.log(key);
//         // console.log(symbolMarket);
//         symbolMarkets.set(key, symbolMarket);
//     }

//     return symbolMarkets;
// }

export async function getUserOrders(config: TypusConfig, user: string) {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let tx = new Transaction();

    _getUserOrders(tx, {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
        user,
    });

    let res = await provider.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    // @ts-ignore
    let returnValues = res.results[0].returnValues[0][0];
    // console.log(returnValues);

    let reader = new BcsReader(new Uint8Array(returnValues));
    let orders: TradingOrder[] = [];
    reader.readVec((reader) => {
        let length = reader.readULEB();
        let bytes = reader.readBytes(length);
        let order = TradingOrder.fromBcs(Uint8Array.from(Array.from(bytes)));
        orders.push(order);
    });

    // let orders: TradingOrder[] = readVecOrder(Uint8Array.from(returnValues));
    // console.log(orders);
    return orders;
}

export async function getUserPositions(config: TypusConfig, user: string) {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let tx = new Transaction();

    _getUserPositions(tx, {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
        user,
    });

    let res = await provider.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    // @ts-ignore
    let returnValues = res.results[0].returnValues[0][0];
    // console.log(returnValues);

    let reader = new BcsReader(new Uint8Array(returnValues));
    let positions: Position[] = [];
    reader.readVec((reader) => {
        let length = reader.readULEB();
        let bytes = reader.readBytes(length);
        let position = Position.fromBcs(Uint8Array.from(Array.from(bytes)));
        positions.push(position);
    });

    // let positions: Position[] = readVecPosition(Uint8Array.from(returnValues));
    // console.log(positions);
    return positions;
}

export function parseOptionBidReceipts(positions: Position[]): (TypusBidReceipt | null)[] {
    return positions.map((position) => {
        if (position.optionCollateralInfo) {
            let bidReceipt = TypusBidReceipt.fromBcs(Uint8Array.from(Array.from(position.optionCollateralInfo.bidReceiptsBcs[0])));
            // console.log(bidReceipt);
            return bidReceipt;
        } else {
            return null;
        }
    });
}

export async function getUserStake(config: TypusConfig, user: string): Promise<[LpUserShare, string[]][]> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let tx = new Transaction();

    allocateIncentive(tx, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        clock: CLOCK,
    });

    getUserShares(tx, {
        registry: STAKE_POOL,
        index: BigInt(0),
        user,
    });

    let res = await provider.devInspectTransactionBlock({ sender: user, transactionBlock: tx });
    // console.log(res);

    if (res.results) {
        // @ts-ignore
        let returnValues = res.results[1].returnValues[0][0];
        // console.log(returnValues);

        let reader = new BcsReader(new Uint8Array(returnValues));
        let lpShares: [LpUserShare, string[]][] = [];
        reader.readVec((reader) => {
            let length = reader.readULEB();
            // let bytes = reader.readBytes(length);
            // let lpShare = LpUserShare.fromBcs(Uint8Array.from(Array.from(bytes)));
            let lpShare = LpUserShare.fromFields(LpUserShare.bcs.read(reader));
            let incentives: string[] = [];
            reader.readVec((reader) => {
                let incentive = reader.read64();
                incentives.push(incentive);
            });

            lpShares.push([lpShare, incentives]);
        });

        // let lpShares: LpUserShare[] = readVecShares(Uint8Array.from(returnValues));
        // console.log(lpShares);
        // console.log(lpShares[0].deactivatingShares);
        // console.log(lpShares[0].lastIncentivePriceIndex);
        return lpShares;
    } else {
        return [];
    }
}

/// returns [liquidationPrice, pnl(in USD)]
export async function getLiquidationPriceAndPnl(
    config: TypusConfig,
    pythClient: PythClient,
    input: {
        positions: Position[];
        user: string;
    }
) {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let tx = new Transaction();

    let cTokens: string[] = ["SUI"];
    let pythTokens: string[] = [];

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToToken(position.collateralToken.name);
        let BASE_TOKEN = typeArgToToken(position.symbol.baseToken.name);
        cTokens.push(TOKEN);
        pythTokens.push(TOKEN);
        pythTokens.push(BASE_TOKEN);
    }

    await updatePyth(pythClient, tx, Array.from(new Set(pythTokens)));

    for (let cToken of Array.from(new Set(cTokens))) {
        if (config.oracle[cToken.toLocaleLowerCase()]) {
            // @ts-ignore
            updateOracleWithPyth(pythClient, tx, config.package.oracle, config.oracle[cToken.toLocaleLowerCase()], cToken, "wUSDC");
        }
    }

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToToken(position.collateralToken.name);
        let BASE_TOKEN = typeArgToToken(position.symbol.baseToken.name);

        getEstimatedLiquidationPriceAndPnl(tx, [position.collateralToken.name, position.symbol.baseToken.name], {
            version: PERP_VERSION,
            registry: MARKET,
            poolRegistry: LP_POOL,
            marketIndex: BigInt(0),
            poolIndex: BigInt(0),
            pythState: pythStateId[NETWORK],
            oracleCToken: priceInfoObjectIds[NETWORK][TOKEN],
            oracleTradingSymbol: priceInfoObjectIds[NETWORK][BASE_TOKEN],
            clock: CLOCK,
            positionId: position.positionId,
            dovRegistry: config.registry.dov.dovSingle,
            typusOracle: config.oracle[TOKEN.toLocaleLowerCase()] ?? config.oracle["sui"],
        });
    }

    let res = await provider.devInspectTransactionBlock({ sender: input.user, transactionBlock: tx });
    // console.log(res);

    let results = res.results?.slice(-input.positions.length).map((x) => {
        // console.log(x);
        let liquidationPrice = bcs.u64().parse(Uint8Array.from(x.returnValues![0][0]));
        let isProfit = bcs.bool().parse(Uint8Array.from(x.returnValues![1][0]));
        var pnl = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![2][0])));
        pnl = isProfit ? pnl : -pnl;
        let isCost = bcs.bool().parse(Uint8Array.from(x.returnValues![3][0]));
        var cost = Number(bcs.u64().parse(Uint8Array.from(x.returnValues![4][0])));
        cost = isCost ? cost : -cost;
        return [liquidationPrice, pnl - cost];
    });
    // console.log(results);
    return results;
}
