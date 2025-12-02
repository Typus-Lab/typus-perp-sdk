import {
    createTradingOrderV2 as _createTradingOrder,
    cancelTradingOrder as _cancelTradingOrder,
    increaseCollateral as _increaseCollateral,
    releaseCollateral as _releaseCollateral,
    collectPositionFundingFee as _collectPositionFundingFee,
    Markets,
} from "src/generated/typus_perp/trading";
import { Position, TradingOrder } from "src/generated/typus_perp/position";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";
import { updatePyth, updateOracleWithPythUsd, splitCoins, splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, TOKEN, typeArgToAsset, oracle } from "@typus/typus-sdk/dist/src/constants";
import { Transaction } from "@mysten/sui/transactions";
import { TypusClient } from "src/client";
import { normalizeStructTag } from "@mysten/sui/utils";

export function findMarketIndex(
    client: TypusClient,
    input: {
        markets: (typeof Markets.$inferType)[];
        tradingToken: TOKEN;
    }
) {
    let target = tokenType[client.config.network][input.tradingToken];
    for (let i = 0; i < input.markets.length; i++) {
        for (let symbol of input.markets[i].symbols) {
            if (normalizeStructTag(symbol.name) == target) {
                return i;
            }
        }
    }
}

export async function createTradingOrder(
    client: TypusClient,
    tx: Transaction,
    input: {
        perpIndex: string;
        coins: string[];
        cToken: TOKEN;
        amount: string;
        tradingToken: TOKEN;
        size: string;
        triggerPrice: string;
        isLong: boolean;
        isStopOrder: boolean;
        reduceOnly: boolean;
        linkedPositionId: string | null;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    let coin;
    let suiCoin;

    if (TOKEN == "SUI" && client.config.sponsored) {
        // split together
        [coin, suiCoin] = splitCoins(
            tx,
            tokenType.MAINNET.SUI,
            input.coins,
            [input.amount, tokens.length.toString()],
            client.config.sponsored
        );
    } else if (client.config.sponsored) {
        coin = splitCoin(tx, cToken, input.coins, input.amount, client.config.sponsored);
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), client.config.sponsored);
    } else {
        coin = splitCoin(tx, cToken, input.coins, input.amount, client.config.sponsored);
        // no suiCoin
    }

    await updatePyth(client.pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }
    tx.add(
        _createTradingOrder({
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
                collateral: coin,
                size: BigInt(input.size),
                triggerPrice: BigInt(input.triggerPrice),
                isLong: input.isLong,
                isStopOrder: input.isStopOrder,
                reduceOnly: input.reduceOnly,
                linkedPositionId: input.linkedPositionId ? BigInt(input.linkedPositionId) : null,
                tailsStakingRegistry: client.config.registry.typus.tailsStaking,
                competitionConfig: COMPETITION_CONFIG,
            },
            typeArguments: [cToken, baseToken],
        })
    );

    return tx;
}

export function zeroCoin(tx: Transaction, typeArgs: [string]) {
    return tx.moveCall({
        target: `0x2::coin::zero`,
        typeArguments: typeArgs,
        arguments: [],
    });
}

export async function cancelTradingOrder(
    client: TypusClient,
    tx: Transaction,
    input: {
        order: typeof TradingOrder.$inferType;
        user: string;
    }
): Promise<Transaction> {
    let cToken = "0x" + input.order.collateral_token.name;
    let BASE_TOKEN = "0x" + input.order.symbol.base_token.name;

    let coin = tx.add(
        _cancelTradingOrder({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                // @ts-ignore
                marketIndex: BigInt(input.order.marketIndex),
                orderId: BigInt(input.order.order_id),
                triggerPrice: BigInt(input.order.trigger_price),
                orderUser: null,
            },
            typeArguments: [cToken, BASE_TOKEN],
        })
    );

    tx.transferObjects([coin], input.user);

    return tx;
}

export async function increaseCollateral(
    client: TypusClient,
    tx: Transaction,
    input: {
        coins: string[];
        amount: string;
        position: typeof Position.$inferType;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateral_token.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.base_token.name);
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    let coin;
    let suiCoin;

    if (TOKEN == "SUI" && client.config.sponsored) {
        // split together
        [coin, suiCoin] = splitCoins(
            tx,
            tokenType.MAINNET.SUI,
            input.coins,
            [input.amount, tokens.length.toString()],
            client.config.sponsored
        );
    } else if (client.config.sponsored) {
        coin = splitCoin(tx, cToken, input.coins, input.amount, client.config.sponsored);
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), client.config.sponsored);
    } else {
        coin = splitCoin(tx, cToken, input.coins, input.amount, client.config.sponsored);
        // no suiCoin
    }

    await updatePyth(client.pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(client.pythClient, tx, client.config.package.oracle, token);
    }
    // @ts-ignore
    let marketIndex = BigInt(input.position.marketIndex);

    tx.add(
        _increaseCollateral({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: marketIndex,
                poolIndex: marketIndex,
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                positionId: BigInt(input.position.position_id),
                collateral: coin,
            },
            typeArguments: [cToken, baseToken],
        })
    );

    return tx;
}

export async function releaseCollateral(
    client: TypusClient,
    tx: Transaction,
    input: {
        position: typeof Position.$inferType;
        amount: string;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateral_token.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.base_token.name);

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
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    // @ts-ignore
    let marketIndex = BigInt(input.position.marketIndex);

    let coin = tx.add(
        _releaseCollateral({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: marketIndex,
                poolIndex: marketIndex,
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                positionId: BigInt(input.position.position_id),
                releaseAmount: BigInt(input.amount),
            },
            typeArguments: [cToken, baseToken],
        })
    );

    tx.transferObjects([coin], input.position.user);

    return tx;
}

export async function collectPositionFundingFee(
    client: TypusClient,
    tx: Transaction,
    input: {
        position: typeof Position.$inferType;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateral_token.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.base_token.name);

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
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    // @ts-ignore
    let marketIndex = BigInt(input.position.marketIndex);

    tx.add(
        _collectPositionFundingFee({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
                poolRegistry: LP_POOL,
                marketIndex: marketIndex,
                poolIndex: marketIndex,
                typusOracleCToken: oracle[NETWORK][TOKEN]!,
                typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
                positionId: BigInt(input.position.position_id),
            },
            typeArguments: [cToken, baseToken],
        })
    );

    return tx;
}
