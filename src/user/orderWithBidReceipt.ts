import {
    createTradingOrderWithBidReceipt as _createTradingOrderWithBidReceipt,
    reduceOptionCollateralPositionSize as _reduceOptionCollateralPositionSize,
} from "src/generated/typus_perp/trading";
import { Transaction, TransactionObjectArgument } from "@mysten/sui/transactions";
import { updatePyth, updateOracleWithPythUsd, splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, TOKEN, oracle } from "@typus/typus-sdk/dist/src/constants";
import { getSplitBidReceiptTx } from "@typus/typus-sdk/dist/src/typus-dov-single-v2";
import { getWithdrawBidReceiptTx } from "@typus/typus-sdk/dist/src/auto-bid/user-entry";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";
import { TypusClient } from "src/client";

export function splitBidReceiptTx(
    client: TypusClient,
    tx: Transaction,
    input: {
        index: string;
        receipts: TransactionObjectArgument[];
        share?: string;
        recipient: string;
    }
) {
    let result = tx.moveCall({
        target: `${client.config.package.dovSingle}::tds_user_entry::simple_split_bid_receipt`,
        typeArguments: [],
        arguments: [
            tx.object(client.config.registry.dov.dovSingle),
            tx.pure.u64(input.index),
            tx.makeMoveVec({
                type: `${client.config.packageOrigin.framework}::vault::TypusBidReceipt`,
                elements: input.receipts.map((receipt) => tx.object(receipt)),
            }),
            tx.pure.option("u64", input.share),
        ],
    });

    let unwrap0 = tx.moveCall({
        target: `0x1::option::destroy_some`,
        typeArguments: [`${client.config.packageOrigin.framework}::vault::TypusBidReceipt`],
        arguments: [tx.object(result[0])],
    });

    tx.moveCall({
        target: `${client.config.package.framework}::vault::transfer_bid_receipt`,
        typeArguments: [],
        arguments: [tx.object(result[1]), tx.pure.address(input.recipient)],
    });

    return unwrap0;
}

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

    let withdrawBidReceipt = getWithdrawBidReceiptTx(client.config, tx, {
        vaultIndex: input.dovIndex,
        signalIndex: input.signalIndex,
        strategyIndex: input.strategyIndex,
        user: input.user,
    });

    let collateralBidReceipt = withdrawBidReceipt;

    // split bid receipt
    if (input.share) {
        let splitBidReceipt = splitBidReceiptTx(client, tx, {
            index: input.dovIndex,
            receipts: [withdrawBidReceipt],
            share: input.share, // if undefined, merge all receipts
            recipient: input.user,
        });
        collateralBidReceipt = splitBidReceipt;
    }

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
