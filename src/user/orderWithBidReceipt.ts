import {
    createTradingOrderWithBidReceiptV3 as _createTradingOrderWithBidReceipt,
    reduceOptionCollateralPositionSizeV2 as _reduceOptionCollateralPositionSize,
} from "../typus_perp/trading/functions";
import { Transaction } from "@mysten/sui/transactions";
import { PythClient, updatePyth, TypusConfig, updateOracleWithPythUsd, splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, TOKEN, CLOCK, oracle } from "@typus/typus-sdk/dist/src/constants";
import { getSplitBidReceiptTx } from "@typus/typus-sdk/dist/src/typus-dov-single-v2";
import { getWithdrawBidReceiptTx } from "@typus/typus-sdk/dist/src/auto-bid/user-entry";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";

export async function createTradingOrderWithBidReceiptByAutoBid(
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
        signalIndex: string;
        strategyIndex: string;
        share?: string; // if undefined, merge all receipts
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    let collateralBidReceipt = getWithdrawBidReceiptTx(config, tx, {
        vaultIndex: input.index,
        signalIndex: input.signalIndex,
        strategyIndex: input.strategyIndex,
        user: input.user,
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
        tailsStakingRegistry: config.registry.typus.tailsStaking,
        competitionConfig: COMPETITION_CONFIG,
    });

    return tx;
}

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
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);
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
        tailsStakingRegistry: config.registry.typus.tailsStaking,
        competitionConfig: COMPETITION_CONFIG,
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
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);
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
        tailsStakingRegistry: config.registry.typus.tailsStaking,
        competitionConfig: COMPETITION_CONFIG,
    });

    return tx;
}
