import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { bcs, BcsReader } from "@mysten/bcs";

import { MarketRegistry, Markets, SymbolMarket } from "./typus_perp/trading/structs";
import { LiquidityPool, Registry } from "./typus_perp/lp-pool/structs";
import { TradingOrder, Position } from "./typus_perp/position/structs";
import {
    getUserOrders as _getUserOrders,
    getUserPositions as _getUserPositions,
    getAllPositions as _getAllPositions,
    getEstimatedLiquidationPriceAndPnl,
} from "./typus_perp/trading/functions";

import { allocateIncentive, getUserShares } from "./typus_stake_pool/stake-pool/functions";
import { LpUserShare, StakePool } from "./typus_stake_pool/stake-pool/structs";

import { CLOCK, oracle, SENDER, TOKEN, tokenType, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { pythStateId, PythClient, updatePyth, TypusConfig, updateOracleWithPythUsd } from "@typus/typus-sdk/dist/src/utils";

import { LIQUIDITY_POOL, LIQUIDITY_POOL_0, LP_POOL, MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_0, STAKE_POOL_VERSION } from ".";
import { TypusBidReceipt } from "./_dependencies/source/0xb4f25230ba74837d8299e92951306100c4a532e8c48cc3d8828abe9b91c8b274/vault/structs";
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

/**
 * @returns [lpShare, incentives]
 */
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

/**
 * @returns [liquidationPrice, pnl(in USD)]
 */
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

    let tokens: TOKEN[] = [];

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToAsset(position.collateralToken.name);
        let BASE_TOKEN = typeArgToAsset(position.symbol.baseToken.name);
        tokens.push(TOKEN);
        tokens.push(BASE_TOKEN);
    }

    await updatePyth(pythClient, tx, Array.from(new Set(tokens)));
    for (let token of Array.from(new Set(tokens))) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    for (let position of input.positions) {
        // parse from Position
        let TOKEN = typeArgToAsset(position.collateralToken.name);
        let BASE_TOKEN = typeArgToAsset(position.symbol.baseToken.name);

        getEstimatedLiquidationPriceAndPnl(tx, [position.collateralToken.name, position.symbol.baseToken.name], {
            version: PERP_VERSION,
            registry: MARKET,
            poolRegistry: LP_POOL,
            marketIndex: BigInt(0),
            poolIndex: BigInt(0),
            typusOracleCToken: oracle[NETWORK][TOKEN]!,
            typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
            clock: CLOCK,
            positionId: position.positionId,
            dovRegistry: config.registry.dov.dovSingle,
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

export async function getPositionCount(
    config: TypusConfig,
    input: {
        baseToken: TOKEN;
    }
) {
    const provider = new SuiClient({ url: config.rpcEndpoint });
    const tx = new Transaction();

    // Rust 實作是呼叫 get_all_positions(slice = 1, page = 1) 然後取最後 8 bytes。
    // 這裡直接複用相同邏輯，只需要 max_page。
    _getAllPositions(tx, tokenType[NETWORK][input.baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
        slice: BigInt(1),
        page: BigInt(1),
    });

    const res = await provider.devInspectTransactionBlock({
        sender: "0x0000000000000000000000000000000000000000000000000000000000000000",
        transactionBlock: tx,
    });

    // 沒有資料時，回傳 0
    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return 0;
    }

    const raw = new Uint8Array(res.results![0].returnValues![0][0]);

    // 至少要含 8 bytes 的 max_page；不足代表無 Position
    if (raw.length < 8) return 0;

    // 取最後 8 bytes (little‑endian) 解析成 number
    const maxPageBytes = raw.slice(raw.length - 8);
    const view = new DataView(maxPageBytes.buffer, maxPageBytes.byteOffset, 8);
    const maxPage = Number(view.getBigUint64(0, true)); // little‑endian

    return maxPage;
}

export async function getAllPositions(
    config: TypusConfig,
    input: {
        baseToken: TOKEN;
        slice: string;
        page: string;
    }
) {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let tx = new Transaction();

    _getAllPositions(tx, tokenType[NETWORK][input.baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
        slice: BigInt(input.slice),
        page: BigInt(input.page),
    });
    let res = await provider.devInspectTransactionBlock({
        sender: "0x0000000000000000000000000000000000000000000000000000000000000000",
        transactionBlock: tx,
    });
    console.log(res);

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return [];
    }

    // -- 解析回傳值 -------------------------------------------------
    const raw = new Uint8Array(res.results![0].returnValues![0][0]);

    // 1) 至少要有 8 bytes 的 max_page
    if (raw.length < 8) return [];

    const withoutMaxPage = raw.slice(0, raw.length - 8);
    const reader = new BcsReader(withoutMaxPage);

    // 2) 第一個 u8 = user_positions_len + 1
    const userPositionsLen = reader.read8() - 1;

    const positions: Position[] = [];
    for (let i = 0; i < userPositionsLen; i++) {
        reader.read16();

        const fields = Position.bcs.read(reader);
        const pos = Position.fromFields(fields);

        positions.push(pos);
    }

    return positions;
}

export async function getAllPositionsWithTradingSymbol(
    config: TypusConfig,
    input: {
        baseToken: TOKEN;
    }
): Promise<Position[]> {
    // 1) 取得該 trading symbol 的倉位總數
    const total = await getPositionCount(config, { baseToken: input.baseToken });

    // 2) 若無倉位直接回傳 []
    if (total === 0) {
        return [];
    }

    // 3) 每頁最多 100 筆
    const slice = Math.min(total, 100);
    const pages = Math.ceil(total / slice);

    // 4) 依頁數批次抓取
    const pagePromises: Promise<Position[]>[] = [];
    for (let page = 1; page <= pages; page++) {
        pagePromises.push(
            getAllPositions(config, {
                baseToken: input.baseToken,
                slice: slice.toString(),
                page: page.toString(),
            })
        );
    }

    const results = await Promise.all(pagePromises);

    // 5) 扁平化後回傳
    return results.flat();
}
