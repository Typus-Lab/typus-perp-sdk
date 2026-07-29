import {
    createTradingOrderWithBidReceiptV2 as _createTradingOrderWithBidReceipt,
    reduceOptionCollateralPositionSizeV2 as _reduceOptionCollateralPositionSize,
} from "src/generated/typus_perp/trading";
import { Transaction, TransactionObjectArgument } from "@mysten/sui/transactions";
import { tokenType, TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { getSplitBidReceiptTx } from "@typus/typus-sdk/dist/src/typus-dov-single-v2";
import { getWithdrawBidReceiptTx } from "@typus/typus-sdk/dist/src/auto-bid/user-entry";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, ORACLE_V2_ID, PERP_VERSION } from "..";
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
    }
): Promise<Transaction> {
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN])).filter((t) => t !== "TYPUS");

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
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
                dovRegistry: client.config.registry.dov.dovSingle,
                oracleV2: ORACLE_V2_ID,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.poolIndex),
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
                collateralBidReceipt,
                isLong: input.isLong,
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
    }
): Promise<Transaction> {
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN])).filter((t) => t !== "TYPUS");

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
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
                dovRegistry: client.config.registry.dov.dovSingle,
                oracleV2: ORACLE_V2_ID,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.poolIndex),
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
                collateralBidReceipt,
                isLong: input.isLong,
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
    }
): Promise<Transaction> {
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN])).filter((t) => t !== "TYPUS");

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
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
                dovRegistry: client.config.registry.dov.dovSingle,
                oracleV2: ORACLE_V2_ID,
                marketIndex: BigInt(input.perpIndex),
                poolIndex: BigInt(input.perpIndex),
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
                typusLeaderboardRegistry: client.config.registry.typus.leaderboard,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
                positionId: BigInt(input.positionId),
                orderSize: tx.pure.option("u64", input.orderSize ? BigInt(input.orderSize) : null),
            },
            typeArguments: [cToken, bToken, baseToken],
        })
    );

    return tx;
}
