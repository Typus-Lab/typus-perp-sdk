import {
    createTradingOrder as _createTradingOrder,
    cancelTradingOrder as _cancelTradingOrder,
    increaseCollateral as _increaseCollateral,
    releaseCollateral as _releaseCollateral,
    createTradingOrderWithBidReceipt as _createTradingOrderWithBidReceipt,
    reduceOptionCollateralPositionSize as _reduceOptionCollateralPositionSize,
} from "../typus_perp/trading/functions";
import { Transaction } from "@mysten/sui/transactions";
import { PythClient, updatePyth, TypusConfig, updateOracleWithPythUsd } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, TOKEN, CLOCK, oracle } from "@typus/typus-sdk/dist/src/constants";
import { getSplitBidReceiptTx } from "@typus/typus-sdk/dist/src/typus-dov-single-v2";
import { LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";

export async function createTradingOrderWithBidReceipt(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        cToken: TOKEN;
        tradingToken: TOKEN;
        isLong: boolean;
        user: string;
        index: string;
        bToken: TOKEN;
        bidReceipts: string[];
        share?: string; // if undefined, merge all receipts
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;

    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));
    await updatePyth(pythClient, tx, tokens);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    // split bid receipt
    let collateralBidReceipt = getSplitBidReceiptTx(config, tx, {
        index: input.index,
        receipts: input.bidReceipts,
        share: input.share, // if undefined, merge all receipts
        recipient: input.user,
    });

    let cToken = tokenType[NETWORK][TOKEN];
    let bToken = tokenType[NETWORK][input.bToken];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];
    _createTradingOrderWithBidReceipt(tx, [cToken, bToken, baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        poolRegistry: LP_POOL,
        marketIndex: BigInt(0),
        poolIndex: BigInt(0),
        typusOracleCToken: oracle[NETWORK][TOKEN]!,
        typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
        clock: CLOCK,
        typusEcosystemVersion: config.version.typus,
        typusUserRegistry: config.registry.typus.user,
        typusLeaderboardRegistry: config.registry.typus.leaderboard,
        isLong: input.isLong,
        dovRegistry: config.registry.dov.dovSingle,
        collateralBidReceipt,
        user: input.user,
    });

    return tx;
}

export async function reduceOptionCollateralPositionSize(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        cToken: TOKEN;
        tradingToken: TOKEN;
        bToken: string;
        positionId: string;
        orderSize: string | null;
    }
): Promise<Transaction> {
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;

    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));
    await updatePyth(pythClient, tx, tokens);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    let cToken = tokenType[NETWORK][TOKEN];
    let bToken = tokenType[NETWORK][input.bToken];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];
    _reduceOptionCollateralPositionSize(tx, [cToken, bToken, baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        poolRegistry: LP_POOL,
        marketIndex: BigInt(0),
        poolIndex: BigInt(0),
        typusOracleCToken: oracle[NETWORK][TOKEN]!,
        typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
        clock: CLOCK,
        typusEcosystemVersion: config.version.typus,
        typusUserRegistry: config.registry.typus.user,
        typusLeaderboardRegistry: config.registry.typus.leaderboard,
        dovRegistry: config.registry.dov.dovSingle,
        positionId: BigInt(input.positionId),
        orderSize: input.orderSize ? BigInt(input.orderSize) : null,
    });

    return tx;
}
