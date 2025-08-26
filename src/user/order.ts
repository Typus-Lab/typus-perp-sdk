import {
    createTradingOrderV2 as _createTradingOrder,
    cancelTradingOrder as _cancelTradingOrder,
    increaseCollateral as _increaseCollateral,
    releaseCollateral as _releaseCollateral,
    collectPositionFundingFee as _collectPositionFundingFee,
} from "../typus_perp/trading/functions";
import { Position, TradingOrder } from "../typus_perp/position/structs";
import { COMPETITION_CONFIG, LP_POOL, MARKET, NETWORK, PERP_VERSION } from "..";
import { PythClient, updatePyth, TypusConfig, updateOracleWithPythUsd, splitCoins, splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { CLOCK, tokenType, TOKEN, typeArgToAsset, oracle } from "@typus/typus-sdk/dist/src/constants";
import { Argument, Transaction } from "@mysten/sui/transactions";

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

    if (TOKEN == "SUI" && config.sponsored) {
        // split together
        [coin, suiCoin] = splitCoins(tx, tokenType.MAINNET.SUI, input.coins, [input.amount, tokens.length.toString()], config.sponsored);
    } else if (config.sponsored) {
        coin = splitCoin(tx, cToken, input.coins, input.amount, config.sponsored);
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    } else {
        coin = splitCoin(tx, cToken, input.coins, input.amount, config.sponsored);
        // no suiCoin
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);
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
        tailsStakingRegistry: config.registry.typus.tailsStaking,
        competitionConfig: COMPETITION_CONFIG,
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
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateralToken.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.baseToken.name);
    let tokens = Array.from(new Set([TOKEN, BASE_TOKEN]));

    let cToken = tokenType[NETWORK][TOKEN];
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    let coin;
    let suiCoin;

    if (TOKEN == "SUI" && config.sponsored) {
        // split together
        [coin, suiCoin] = splitCoins(tx, tokenType.MAINNET.SUI, input.coins, [input.amount, tokens.length.toString()], config.sponsored);
    } else if (config.sponsored) {
        coin = splitCoin(tx, cToken, input.coins, input.amount, config.sponsored);
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    } else {
        coin = splitCoin(tx, cToken, input.coins, input.amount, config.sponsored);
        // no suiCoin
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);
    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
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
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateralToken.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.baseToken.name);

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

export async function collectPositionFundingFee(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        position: Position;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // parse from Position
    let TOKEN = typeArgToAsset(input.position.collateralToken.name);
    let BASE_TOKEN = typeArgToAsset(input.position.symbol.baseToken.name);

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
    let baseToken = tokenType[NETWORK][BASE_TOKEN];

    _collectPositionFundingFee(tx, [cToken, baseToken], {
        version: PERP_VERSION,
        registry: MARKET,
        poolRegistry: LP_POOL,
        marketIndex: BigInt(0),
        poolIndex: BigInt(0),
        typusOracleCToken: oracle[NETWORK][TOKEN]!,
        typusOracleTradingSymbol: oracle[NETWORK][BASE_TOKEN]!,
        clock: CLOCK,
        positionId: BigInt(input.position.positionId),
    });

    return tx;
}
