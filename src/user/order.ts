import {
    createTradingOrder as _createTradingOrder,
    cancelTradingOrder as _cancelTradingOrder,
    increaseCollateral as _increaseCollateral,
    releaseCollateral as _releaseCollateral,
} from "../typus_perp/trading/functions";
import { Position, TradingOrder } from "../typus_perp/position/structs";
import { LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";
import { PythClient, updatePyth, TypusConfig, updateOracleWithPythUsd } from "@typus/typus-sdk/dist/src/utils";
import { CLOCK, tokenType, TOKEN, typeArgToAsset, oracle } from "@typus/typus-sdk/dist/src/constants";
import { Transaction } from "@mysten/sui/transactions";

export async function createTradingOrder(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
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
    }
): Promise<Transaction> {
    // INPUTS
    let TOKEN = input.cToken;
    let BASE_TOKEN = input.tradingToken;

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    var coin;

    if (TOKEN == "SUI") {
        if (input.coins.length == 0) {
            // support zero coin input for closing position
            [coin] = zeroCoin(tx, [cToken]);
        } else {
            [coin] = tx.splitCoins(tx.gas, [input.amount]);
        }
    } else {
        if (input.coins.length == 0) {
            // support zero coin input for closing position
            [coin] = zeroCoin(tx, [cToken]);
        } else {
            let destination = input.coins.pop()!;

            if (input.coins.length > 0) {
                tx.mergeCoins(destination, input.coins);
            }

            [coin] = tx.splitCoins(destination, [input.amount]);
        }
    }

    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));
    await updatePyth(pythClient, tx, tokens);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    _createTradingOrder(tx, [cToken, baseToken], {
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
        collateral: coin,
        size: BigInt(input.size),
        triggerPrice: BigInt(input.triggerPrice),
        isLong: input.isLong,
        isStopOrder: input.isStopOrder,
        reduceOnly: input.reduceOnly,
        linkedPositionId: input.linkedPositionId ? BigInt(input.linkedPositionId) : null,
    });

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
    config: TypusConfig,
    tx: Transaction,
    input: {
        order: TradingOrder;
        user: string;
    }
): Promise<Transaction> {
    let cToken = "0x" + input.order.collateralToken.name;
    let BASE_TOKEN = "0x" + input.order.symbol.baseToken.name;

    let coin = _cancelTradingOrder(tx, [cToken, BASE_TOKEN], {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
        orderId: input.order.orderId,
        triggerPrice: input.order.triggerPrice,
        orderUser: null,
    });

    tx.transferObjects([coin], input.user);

    return tx;
}

export async function increaseCollateral(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        coins: string[];
        amount: string;
        position: Position;
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateralToken.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.baseToken.name);

    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));
    await updatePyth(pythClient, tx, tokens);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    var coin;

    if (TOKEN == "SUI") {
        [coin] = tx.splitCoins(tx.gas, [input.amount]);
    } else {
        let destination = input.coins.pop()!;

        if (input.coins.length > 0) {
            tx.mergeCoins(destination, input.coins);
        }

        [coin] = tx.splitCoins(destination, [input.amount]);
    }

    _increaseCollateral(tx, [cToken, baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        poolRegistry: LP_POOL,
        marketIndex: BigInt(0),
        poolIndex: BigInt(0),
        typusOracleCToken: oracle[NETWORK][TOKEN]!,
        typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
        clock: CLOCK,
        positionId: BigInt(input.position.positionId),
        collateral: coin,
    });

    return tx;
}

export async function releaseCollateral(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        position: Position;
        amount: string;
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateralToken.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.baseToken.name);

    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));
    await updatePyth(pythClient, tx, tokens);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
    }

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    let coin = _releaseCollateral(tx, [cToken, baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        poolRegistry: LP_POOL,
        marketIndex: BigInt(0),
        poolIndex: BigInt(0),
        typusOracleCToken: oracle[NETWORK][TOKEN]!,
        typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
        clock: CLOCK,
        positionId: BigInt(input.position.positionId),
        releaseAmount: BigInt(input.amount),
    });

    tx.transferObjects([coin], input.position.user);

    return tx;
}
