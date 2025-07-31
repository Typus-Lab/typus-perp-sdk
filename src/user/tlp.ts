import { Transaction } from "@mysten/sui/transactions";
import { LiquidityPool } from "../typus_perp/lp-pool/structs";
import { redeem, mintLp, updateLiquidityValue, swap as _swap, claim as _claim } from "../typus_perp/lp-pool/functions";
import {
    harvestPerUserShare,
    stake,
    unstake as _unstake,
    unsubscribe as _unsubscribe,
    snapshot as _snapshot,
} from "../typus_stake_pool/stake-pool/functions";
import { PythClient, splitCoins, TypusConfig, updateOracleWithPythUsd, updatePyth } from "@typus/typus-sdk/dist/src/utils";
import { CLOCK, tokenType, typeArgToAsset, TOKEN, oracle } from "@typus/typus-sdk/dist/src/constants";
import { LP_POOL, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, TLP_TOKEN, TLP_TREASURY_CAP } from "..";
import { StakePool } from "src/typus_stake_pool/stake-pool/structs";

export async function snapshot(
    config: TypusConfig,
    tx: Transaction,
    input: {
        userShareId: string;
    }
): Promise<Transaction> {
    _snapshot(tx, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        clock: CLOCK,
        userShareId: BigInt(input.userShareId),
        typusEcosystemVersion: config.version.typus,
        typusUserRegistry: config.registry.typus.user,
    });

    return tx;
}

export async function mintStakeLp(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        stakePool: StakePool;
        coins: string[];
        cTOKEN: TOKEN;
        amount: string;
        userShareId: string | null;
        user: string;
        stake: boolean;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));
    // console.log("tokens", tokens);

    await updatePyth(pythClient, tx, tokens);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            oracle: oracle[NETWORK][token]!,
            clock: CLOCK,
        });
    }

    let cToken = tokenType[NETWORK][input.cTOKEN];
    let coin = splitCoins(tx, cToken, input.coins, input.amount, config.sponsored);

    // console.log(iToken);
    if (input.userShareId) {
        harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });
    }

    let lpCoin = mintLp(tx, [cToken, TLP_TOKEN], {
        version: PERP_VERSION,
        registry: LP_POOL,
        treasuryCaps: TLP_TREASURY_CAP,
        index: BigInt(0),
        oracle: oracle[NETWORK][input.cTOKEN]!,
        coin,
        clock: CLOCK,
    });

    if (input.stake) {
        stake(tx, TLP_TOKEN, {
            version: STAKE_POOL_VERSION,
            registry: STAKE_POOL,
            index: BigInt(0),
            lpToken: lpCoin,
            clock: CLOCK,
            userShareId: input.userShareId ? BigInt(input.userShareId) : null,
        });
    } else {
        tx.transferObjects([lpCoin], input.user);
    }

    return tx;
}

export async function stakeLp(
    config: TypusConfig,
    tx: Transaction,
    input: {
        stakePool: StakePool;
        lpCoins: string[];
        amount: string;
        userShareId: string | null;
        user: string;
    }
): Promise<Transaction> {
    var coin;

    let destination = input.lpCoins.pop()!;

    if (input.lpCoins.length > 0) {
        tx.mergeCoins(destination, input.lpCoins);
    }

    [coin] = tx.splitCoins(destination, [input.amount]);

    // console.log(iToken);
    if (input.userShareId) {
        harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });
    }

    stake(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        lpToken: coin,
        clock: CLOCK,
        userShareId: input.userShareId ? BigInt(input.userShareId) : null,
    });

    return tx;
}

export async function unstake(
    config: TypusConfig,
    tx: Transaction,
    input: {
        lpPool: LiquidityPool;
        stakePool: StakePool;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });

    _unsubscribe(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
        unsubscribedShares: input.share ? BigInt(input.share) : null,
    });

    let lpCoin = _unstake(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
    });

    tx.transferObjects([lpCoin], input.user);

    return tx;
}

export async function unstakeRedeem(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        stakePool: StakePool;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));

    await updatePyth(pythClient, tx, tokens);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            oracle: oracle[NETWORK][token]!,
            clock: CLOCK,
        });
    }

    harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });

    _unsubscribe(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
        unsubscribedShares: input.share ? BigInt(input.share) : null,
    });

    let lpCoin = _unstake(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        userShareId: BigInt(input.userShareId),
        clock: CLOCK,
    });

    let balance = tx.moveCall({
        target: `0x2::coin::into_balance`,
        typeArguments: [TLP_TOKEN],
        arguments: [lpCoin],
    });

    redeem(tx, TLP_TOKEN, {
        version: PERP_VERSION,
        registry: LP_POOL,
        index: BigInt(0),
        clock: CLOCK,
        balance,
    });

    return tx;
}

export async function redeemTlp(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        lpCoins: string[];
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));

    await updatePyth(pythClient, tx, tokens);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            oracle: oracle[NETWORK][token]!,
            clock: CLOCK,
        });
    }

    let destination = input.lpCoins.pop()!;

    if (input.lpCoins.length > 0) {
        tx.mergeCoins(destination, input.lpCoins);
    }

    let lpCoin = tx.object(destination);

    let burnCoin;

    if (input.share) {
        burnCoin = tx.splitCoins(lpCoin, [input.share]);
    } else {
        burnCoin = lpCoin;
    }

    let balance = tx.moveCall({
        target: `0x2::coin::into_balance`,
        typeArguments: [TLP_TOKEN],
        arguments: [burnCoin],
    });

    redeem(tx, TLP_TOKEN, {
        version: PERP_VERSION,
        registry: LP_POOL,
        index: BigInt(0),
        clock: CLOCK,
        balance,
    });

    return tx;
}

export async function claim(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: LiquidityPool;
        stakePool: StakePool;
        cTOKEN: TOKEN;
        user: string;
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.tokenPools.map((p) => typeArgToAsset("0x" + p.tokenType.name));

    await updatePyth(pythClient, tx, tokens);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue(tx, tokenType[NETWORK][token], {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            oracle: oracle[NETWORK][token]!,
            clock: CLOCK,
        });
    }
    let cToken = tokenType[NETWORK][input.cTOKEN];

    let token = _claim(tx, [TLP_TOKEN, cToken], {
        version: PERP_VERSION,
        registry: LP_POOL,
        index: BigInt(0),
        clock: CLOCK,
        treasuryCaps: TLP_TREASURY_CAP,
        oracle: oracle[NETWORK][input.cTOKEN]!,
    });

    tx.transferObjects([token], input.user);

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
    updateOracleWithPythUsd(pythClient, tx, config.package.oracle, input.FROM_TOKEN);
    updateOracleWithPythUsd(pythClient, tx, config.package.oracle, input.TO_TOKEN);

    let fromToken = tokenType[NETWORK][input.FROM_TOKEN];
    let coin = splitCoins(tx, fromToken, input.coins, input.amount, config.sponsored);

    let toToken = tokenType[NETWORK][input.TO_TOKEN];
    let token = _swap(tx, [fromToken, toToken], {
        version: PERP_VERSION,
        registry: LP_POOL,
        clock: CLOCK,
        index: BigInt(0),
        oracleFromToken: oracle[NETWORK][input.FROM_TOKEN]!,
        oracleToToken: oracle[NETWORK][input.TO_TOKEN]!,
        fromCoin: coin,
        minToAmount: BigInt(0),
    });

    tx.transferObjects([token], input.user);

    return tx;
}

export async function harvestStakeReward(
    config: TypusConfig,
    tx: Transaction,
    input: {
        stakePool: StakePool;
        userShareId: string;
        user: string;
    }
): Promise<Transaction> {
    let iTokens = input.stakePool.incentives.map((i) => i.tokenType.name);
    _snapshot(tx, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        clock: CLOCK,
        userShareId: BigInt(input.userShareId),
        typusEcosystemVersion: config.version.typus,
        typusUserRegistry: config.registry.typus.user,
    });
    for (let iToken of iTokens) {
        // console.log(iToken);
        let iCoin = harvestPerUserShare(tx, iToken, {
            version: STAKE_POOL_VERSION,
            registry: STAKE_POOL,
            index: BigInt(0),
            userShareId: BigInt(input.userShareId),
            clock: CLOCK,
        });
        if (iToken.endsWith("TLP")) {
            // stake
            stake(tx, TLP_TOKEN, {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                lpToken: iCoin,
                clock: CLOCK,
                userShareId: input.userShareId ? BigInt(input.userShareId) : null,
            });
        } else {
            tx.transferObjects([iCoin], input.user);
        }
    }
    return tx;
}
