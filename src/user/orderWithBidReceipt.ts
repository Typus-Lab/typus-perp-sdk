import {
    createTradingOrderWithBidReceipt as _createTradingOrderWithBidReceipt,
    reduceOptionCollateralPositionSize as _reduceOptionCollateralPositionSize,
} from "src/generated/typus_perp/trading";
import { Transaction } from "@mysten/sui/transactions";
import { updatePyth, updateOracleWithPythUsd, splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, TOKEN, oracle } from "@typus/typus-sdk/dist/src/constants";
import { getSplitBidReceiptTx } from "@typus/typus-sdk/dist/src/typus-dov-single-v2";
import { getWithdrawBidReceiptTx } from "@typus/typus-sdk/dist/src/auto-bid/user-entry";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";
import { TypusClient } from "src/client";

export async function createTradingOrderWithBidReceiptByAutoBid(
    client: TypusClient,
    tx: Transaction,
    input: {
        perpIndex: string;
        poolIndex: string;
        cToken: TOKEN;
        tradingToken: TOKEN;
        isLong: boolean;
        user: string;
        dovIndex: string;
        bToken: TOKEN;
        signalIndex: string;
        strategyIndex: string;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let suiCoin;
    if (client.config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), client.config.sponsored);
    }

    await updatePyth(client.pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }

    let collateralBidReceipt = getWithdrawBidReceiptTx(client.config, tx, {
        vaultIndex: input.dovIndex,
        signalIndex: input.signalIndex,
        strategyIndex: input.strategyIndex,
        user: input.user,
    });

    let cToken = tokenType[NETWORK][TOKEN];
    let bToken = tokenType[NETWORK][input.bToken];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];
    tx.add(
        _createTradingOrderWithBidReceipt({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.poolIndex),
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                isLong: input.isLong,
                dovRegistry: client.config.registry.dov.dovSingle,
                collateralBidReceipt,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
            },
            typeArguments: [cToken, bToken, baseToken],
        })
    );

    return tx;
}

export async function createTradingOrderWithBidReceipt(
    client: TypusClient,
    tx: Transaction,
    input: {
        perpIndex: string;
        poolIndex: string;
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
    if (client.config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), client.config.sponsored);
    }

    await updatePyth(client.pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }

    // split bid receipt
    let collateralBidReceipt = getSplitBidReceiptTx(client.config, tx, {
        index: input.index,
        receipts: input.bidReceipts,
        share: input.share, // if undefined, merge all receipts
        recipient: input.user,
    });

    let cToken = tokenType[NETWORK][TOKEN];
    let bToken = tokenType[NETWORK][input.bToken];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];
    tx.add(
        _createTradingOrderWithBidReceipt({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.poolIndex),
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                isLong: input.isLong,
                dovRegistry: client.config.registry.dov.dovSingle,
                collateralBidReceipt,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
            },
            typeArguments: [cToken, bToken, baseToken],
        })
    );

    return tx;
}

export async function reduceOptionCollateralPositionSize(
    client: TypusClient,
    tx: Transaction,
    input: {
        perpIndex: string;
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
    if (client.config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), client.config.sponsored);
    }

    await updatePyth(client.pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }

    let cToken = tokenType[NETWORK][TOKEN];
    let bToken = tokenType[NETWORK][input.bToken];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];
    tx.add(
        _reduceOptionCollateralPositionSize({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.perpIndex),
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                dovRegistry: client.config.registry.dov.dovSingle,
                positionId: BigInt(input.positionId),
                orderSize: input.orderSize ? BigInt(input.orderSize) : null,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
            },
            typeArguments: [cToken, bToken, baseToken],
        })
    );

    return tx;
}
