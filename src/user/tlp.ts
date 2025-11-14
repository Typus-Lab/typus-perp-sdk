import { Transaction } from "@mysten/sui/transactions";
import { PythClient, splitCoin, splitCoins, TypusConfig, updateOracleWithPythUsd, updatePyth } from "@typus/typus-sdk/dist/src/utils";
import { CLOCK, tokenType, typeArgToAsset, TOKEN, oracle } from "@typus/typus-sdk/dist/src/constants";
import { LP_POOL, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, TLP_TOKEN, TLP_TREASURY_CAP } from "..";
import {
    StakePool,
    harvestPerUserShare,
    stake,
    unstake as _unstake,
    unsubscribe as _unsubscribe,
    snapshot as _snapshot,
    allocateIncentive,
} from "src/generated/typus_stake_pool/stake_pool";
import { LiquidityPool, redeem, mintLp, updateLiquidityValue, swap as _swap, claim as _claim } from "src/generated/typus_perp/lp_pool";

export async function snapshot(
    config: TypusConfig,
    tx: Transaction,
    input: {
        userShareId: string;
    }
): Promise<Transaction> {
    tx.add(
        _snapshot({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                UserShareId: BigInt(input.userShareId),
                typusEcosystemVersion: config.version.typus,
                typusUserRegistry: config.registry.typus.user,
            },
        })
    );
    return tx;
}

export async function mintStakeLp(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        coins: string[];
        cTOKEN: TOKEN;
        amount: string;
        userShareId: string | null;
        isAutoCompound: boolean;
        user: string;
        stake: boolean;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));
    // console.log("tokens", tokens);
    let cToken = tokenType[NETWORK][input.cTOKEN];

    let coin;
    let suiCoin;

    if (input.cTOKEN == "SUI" && config.sponsored) {
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
        tx.add(
            updateLiquidityValue({
                arguments: { version: PERP_VERSION, registry: LP_POOL, index: BigInt(0), oracle: oracle[NETWORK][token]! },
                typeArguments: [tokenType[NETWORK][token]],
            })
        );
    }

    // console.log(iToken);
    if (input.userShareId) {
        harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });
    }

    let lpCoin = tx.add(
        mintLp({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                treasuryCaps: TLP_TREASURY_CAP,
                index: BigInt(0),
                oracle: oracle[NETWORK][input.cTOKEN]!,
                coin,
            },
            typeArguments: [cToken, TLP_TOKEN],
        })
    );

    if (input.stake) {
        tx.add(
            stake({
                arguments: {
                    version: STAKE_POOL_VERSION,
                    registry: STAKE_POOL,
                    index: BigInt(0),
                    lpToken: lpCoin,
                    UserShareId: null,
                },
                typeArguments: [TLP_TOKEN],
            })
        );
    } else {
        tx.transferObjects([lpCoin], input.user);
    }

    return tx;
}

export async function stakeLp(
    config: TypusConfig,
    tx: Transaction,
    input: {
        stakePool: typeof StakePool.$inferType;
        lpCoins: string[];
        amount: string;
        userShareId: string | null;
        user: string;
    }
): Promise<Transaction> {
    var lpCoin;

    let destination = input.lpCoins.pop()!;

    if (input.lpCoins.length > 0) {
        tx.mergeCoins(destination, input.lpCoins);
    }

    [lpCoin] = tx.splitCoins(destination, [input.amount]);

    // console.log(iToken);
    if (input.userShareId) {
        harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });
    }

    tx.add(
        stake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                lpToken: lpCoin,
                UserShareId: null,
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    return tx;
}

export async function unstake(
    config: TypusConfig,
    tx: Transaction,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });

    tx.add(
        _unsubscribe({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                unsubscribedShares: input.share ? BigInt(input.share) : null,
                UserShareId: BigInt(input.userShareId),
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    let lpCoin = tx.add(
        _unstake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                UserShareId: BigInt(input.userShareId),
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    tx.transferObjects([lpCoin], input.user);

    return tx;
}

export async function unstakeRedeem(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        userShareId: string;
        share: string | null;
        user: string;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue({
            arguments: { version: PERP_VERSION, registry: LP_POOL, index: BigInt(0), oracle: oracle[NETWORK][token]! },
            typeArguments: [tokenType[NETWORK][token]],
        })(tx);
    }

    harvestStakeReward(config, tx, { stakePool: input.stakePool, userShareId: input.userShareId, user: input.user });

    tx.add(
        _unsubscribe({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                unsubscribedShares: input.share ? BigInt(input.share) : null,
                UserShareId: BigInt(input.userShareId),
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    let lpCoin = tx.add(
        _unstake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                UserShareId: BigInt(input.userShareId),
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    let balance = tx.moveCall({
        target: `0x2::coin::into_balance`,
        typeArguments: [TLP_TOKEN],
        arguments: [lpCoin],
    });

    tx.add(
        redeem({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(0),
                balance,
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    return tx;
}

export async function redeemTlp(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        lpCoins: string[];
        share: string | null;
        user: string;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        tx.add(
            updateLiquidityValue({
                arguments: { version: PERP_VERSION, registry: LP_POOL, index: BigInt(0), oracle: oracle[NETWORK][token]! },
                typeArguments: [tokenType[NETWORK][token]],
            })
        );
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

    tx.add(
        redeem({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(0),
                balance,
            },
            typeArguments: [TLP_TOKEN],
        })
    );

    return tx;
}

export async function claim(
    config: TypusConfig,
    tx: Transaction,
    pythClient: PythClient,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        cTOKEN: TOKEN;
        user: string;
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    // update pyth oracle
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    let suiCoin;
    if (config.sponsored) {
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, tokens.length.toString(), config.sponsored);
    }

    await updatePyth(pythClient, tx, tokens, suiCoin);

    for (let token of tokens) {
        updateOracleWithPythUsd(pythClient, tx, config.package.oracle, token);
        updateLiquidityValue({
            arguments: { version: PERP_VERSION, registry: LP_POOL, index: BigInt(0), oracle: oracle[NETWORK][token]! },
            typeArguments: [tokenType[NETWORK][token]],
        })(tx);
    }
    let cToken = tokenType[NETWORK][input.cTOKEN];

    let token = _claim({
        arguments: {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),

            treasuryCaps: TLP_TREASURY_CAP,
            oracle: oracle[NETWORK][input.cTOKEN]!,
        },
        typeArguments: [TLP_TOKEN, cToken],
    })(tx);

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
        suiCoins?: string[]; // for sponsored tx
    }
): Promise<Transaction> {
    let fromToken = tokenType[NETWORK][input.FROM_TOKEN];
    let toToken = tokenType[NETWORK][input.TO_TOKEN];

    let coin;
    let suiCoin;

    if (input.FROM_TOKEN == "SUI" && config.sponsored) {
        // split together
        [coin, suiCoin] = splitCoins(tx, tokenType.MAINNET.SUI, input.coins, [input.amount, "2"], config.sponsored);
    } else if (config.sponsored) {
        coin = splitCoin(tx, fromToken, input.coins, input.amount, config.sponsored);
        suiCoin = splitCoin(tx, tokenType.MAINNET.SUI, input.suiCoins!, "2", config.sponsored);
    } else {
        coin = splitCoin(tx, fromToken, input.coins, input.amount, config.sponsored);
        // no suiCoin
    }

    await updatePyth(pythClient, tx, [input.FROM_TOKEN, input.TO_TOKEN], suiCoin);
    updateOracleWithPythUsd(pythClient, tx, config.package.oracle, input.FROM_TOKEN);
    updateOracleWithPythUsd(pythClient, tx, config.package.oracle, input.TO_TOKEN);

    let token = _swap({
        arguments: {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(0),
            oracleFromToken: oracle[NETWORK][input.FROM_TOKEN]!,
            oracleToToken: oracle[NETWORK][input.TO_TOKEN]!,
            fromCoin: coin,
            minToAmount: BigInt(0),
        },
        typeArguments: [fromToken, toToken],
    })(tx);

    tx.transferObjects([token], input.user);

    return tx;
}

export async function harvestStakeReward(
    config: TypusConfig,
    tx: Transaction,
    input: {
        stakePool: typeof StakePool.$inferType;
        userShareId: string;
        user: string;
    }
): Promise<Transaction> {
    let iTokens = input.stakePool.incentives.map((i) => i.token_type.name);

    snapshot(config, tx, { userShareId: input.userShareId });

    tx.add(
        allocateIncentive({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
            },
        })
    );

    for (let iToken of iTokens) {
        // console.log(iToken);

        let iCoin = tx.add(
            harvestPerUserShare({
                arguments: {
                    version: STAKE_POOL_VERSION,
                    registry: STAKE_POOL,
                    index: BigInt(0),
                    UserShareId: BigInt(input.userShareId),
                },
                typeArguments: [iToken],
            })
        );
        if (iToken.endsWith("TLP")) {
            // stake
            tx.add(
                stake({
                    arguments: {
                        version: STAKE_POOL_VERSION,
                        registry: STAKE_POOL,
                        index: BigInt(0),
                        lpToken: iCoin,
                        UserShareId: null,
                    },
                    typeArguments: [TLP_TOKEN],
                })
            );
        } else {
            tx.transferObjects([iCoin], input.user);
        }
    }
    return tx;
}
