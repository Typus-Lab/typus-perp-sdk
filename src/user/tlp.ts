import { Transaction } from "@mysten/sui/transactions";
import { LiquidityPool } from "../typus_perp/lp-pool/structs";
import { burnLp, mintLp, updateLiquidityValue, swap as _swap } from "../typus_perp/lp-pool/functions";
import { harvestPerUserShare, stake, unstake, unsubscribe as _unsubscribe } from "../typus_stake_pool/stake-pool/functions";
import { PythClient, updatePyth, priceInfoObjectIds, pythStateId, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { CLOCK, tokenType, typeArgToAsset, TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { LP_POOL, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, TLP_TOKEN, TLP_TREASURY_CAP } from "..";

export async function mintStakeLp(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        coins: string[];
        cTOKEN: TOKEN;
        iTOKEN: TOKEN;
        amount: string;
        userShareId: string | null;
        user: string;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));
    // console.log("tokens", tokens);

    await updatePyth(pythClient, tx, tokens);
    let cToken = tokenType[NETWORK][input.cTOKEN];

    for (let token of tokens) {
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            pythState: pythStateId[NETWORK],
            oracle: priceInfoObjectIds[NETWORK][token],
            clock: CLOCK,
        });
    }

    var coin;

    if (input.cTOKEN == "SUI") {
        [coin] = tx.splitCoins(tx.gas, [input.amount]);
    } else {
        let destination = input.coins.pop()!;

        if (input.coins.length > 0) {
            tx.mergeCoins(destination, input.coins);
        }

        [coin] = tx.splitCoins(destination, [input.amount]);
    }

    let iToken = tokenType[NETWORK][input.iTOKEN];
    // console.log(iToken);
    if (input.userShareId) {
        let iCoin = harvestPerUserShare(tx, iToken, {
            version: STAKE_POOL_VERSION,
            registry: STAKE_POOL,
            index: BigInt(0),
            userShareId: BigInt(input.userShareId),
            clock: CLOCK,
        });
        tx.transferObjects([iCoin], input.user);
    }

    let lpCoin = mintLp(tx, [cToken, TLP_TOKEN], {
        version: PERP_VERSION,
        registry: LP_POOL,
        treasuryCaps: TLP_TREASURY_CAP,
        index: BigInt(0),
        pythState: pythStateId[NETWORK],
        oracle: priceInfoObjectIds[NETWORK][input.cTOKEN],
        coin,
        clock: CLOCK,
    });

    stake(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        lpToken: lpCoin,
        clock: CLOCK,
        userShareId: input.userShareId ? BigInt(input.userShareId) : null,
    });

    return tx;
}

export async function unstakeBurn(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        cTOKEN: TOKEN;
        iTOKEN: TOKEN;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));

    await updatePyth(pythClient, tx, tokens);
    let cToken = tokenType[NETWORK][input.cTOKEN];
    let oracle = priceInfoObjectIds[NETWORK][input.cTOKEN];

    for (let token of tokens) {
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            pythState: pythStateId[NETWORK],
            oracle: priceInfoObjectIds[NETWORK][token],
            clock: CLOCK,
        });
    }

    let iToken = tokenType[NETWORK][input.iTOKEN];
    // console.log(iToken);
    if (input.userShareId) {
        let iCoin = harvestPerUserShare(tx, iToken, {
            version: STAKE_POOL_VERSION,
            registry: STAKE_POOL,
            index: BigInt(0),
            userShareId: BigInt(input.userShareId),
            clock: CLOCK,
        });
        tx.transferObjects([iCoin], input.user);
    }

    let lpCoin = unstake(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
    });

    let coin = burnLp(tx, [cToken, TLP_TOKEN], {
        version: PERP_VERSION,
        registry: LP_POOL,
        treasuryCaps: TLP_TREASURY_CAP,
        index: BigInt(0),
        pythState: pythStateId[NETWORK],
        oracle,
        coin: lpCoin,
        clock: CLOCK,
    });

    tx.transferObjects([coin], input.user);

    return tx;
}

export async function swap(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        coins: string[];
        FROM_TOKEN: TOKEN;
        TO_TOKEN: TOKEN;
        amount: string;
        user: string;
    }
): Promise<Transaction> {
    await updatePyth(pythClient, tx, [input.FROM_TOKEN, input.TO_TOKEN]);
    let fromToken = tokenType[NETWORK][input.FROM_TOKEN];
    let toToken = tokenType[NETWORK][input.TO_TOKEN];

    var coin;

    if (input.FROM_TOKEN == "SUI") {
        [coin] = tx.splitCoins(tx.gas, [input.amount]);
    } else {
        let destination = input.coins.pop()!;

        if (input.coins.length > 0) {
            tx.mergeCoins(destination, input.coins);
        }

        [coin] = tx.splitCoins(destination, [input.amount]);
    }

    let token = _swap(tx, [fromToken, toToken], {
        version: PERP_VERSION,
        registry: LP_POOL,
        pythState: pythStateId[NETWORK],
        clock: CLOCK,
        index: BigInt(0),
        oracleFromToken: priceInfoObjectIds[NETWORK][input.FROM_TOKEN],
        oracleToToken: priceInfoObjectIds[NETWORK][input.TO_TOKEN],
        fromCoin: coin,
        minToAmount: BigInt(0),
    });

    tx.transferObjects([token], input.user);

    return tx;
}

export async function unsubscribe(
    config: TypusConfig,
    tx: Transaction,
    input: {
        userShareId: string;
        share: string | null;
    }
): Promise<Transaction> {
    _unsubscribe(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
        unsubscribedShares: input.share ? BigInt(input.share) : null,
    });
    return tx;
}

export async function harvestStakeReward(
    config: TypusConfig,
    tx: Transaction,
    input: {
        userShareId: string;
        user: string;
        iTOKEN: TOKEN;
    }
): Promise<Transaction> {
    let iToken = tokenType[NETWORK][input.iTOKEN];
    // console.log(iToken);
    let iCoin = harvestPerUserShare(tx, iToken, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
    });
    tx.transferObjects([iCoin], input.user);
    return tx;
}
