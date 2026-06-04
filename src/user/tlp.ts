import { normalizeStructTag } from "@mysten/sui/utils";
import { Transaction } from "@mysten/sui/transactions";
import { splitCoin } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, typeArgToAsset, TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { LP_POOL, NETWORK, ORACLE_V2_ID, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, TLP_TREASURY_CAP } from "..";
import {
    StakePool,
    harvestPerUserShare,
    stake,
    unstake as _unstake,
    unsubscribe as _unsubscribe,
    snapshot as _snapshot,
} from "src/generated/typus_stake_pool/stake_pool";
import {
    LiquidityPool,
    redeem,
    mintLpV2 as _mintLp,
    updateLiquidityValueV2 as _updateLiquidityValue,
    swapV2 as _swap,
    claimV2 as _claim,
} from "src/generated/typus_perp/lp_pool";
import { TypusClient } from "src/client";

export async function snapshot(
    client: TypusClient,
    tx: Transaction,
    input: {
        perpIndex: string;
    }
): Promise<Transaction> {
    tx.add(
        _snapshot({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.perpIndex),
                typusEcosystemVersion: client.config.version.typus,
                typusUserRegistry: client.config.registry.typus.user,
            },
        })
    );
    return tx;
}

export async function mintStakeLp(
    client: TypusClient,
    tx: Transaction,
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
    }
): Promise<Transaction> {
    // tokens in the LP pool
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));
    let cToken = tokenType[NETWORK][input.cTOKEN];
    let coin = splitCoin(tx, cToken, input.coins, input.amount, client.config.sponsored);

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
    }
    for (let token of tokens) {
        tx.add(
            _updateLiquidityValue({
                arguments: {
                    version: PERP_VERSION,
                    registry: LP_POOL,
                    index: BigInt(input.stakePool.pool_info.index),
                    oracleV2: ORACLE_V2_ID,
                },
                typeArguments: [tokenType[NETWORK][token]],
            })
        );
    }

    if (input.userShareId) {
        harvestStakeReward(client, tx, { stakePool: input.stakePool, user: input.user });
    }

    let lpToken = normalizeStructTag(input.lpPool.lp_token_type.name);

    let lpCoin = tx.add(
        _mintLp({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                treasuryCaps: TLP_TREASURY_CAP,
                index: BigInt(input.stakePool.pool_info.index),
                oracleV2: ORACLE_V2_ID,
                coin,
            },
            typeArguments: [cToken, lpToken],
        })
    );

    if (input.stake) {
        tx.add(
            stake({
                arguments: {
                    version: STAKE_POOL_VERSION,
                    registry: STAKE_POOL,
                    index: BigInt(input.stakePool.pool_info.index),
                    lpToken: lpCoin,
                },
                typeArguments: [lpToken],
            })
        );
    } else {
        tx.transferObjects([lpCoin], input.user);
    }

    return tx;
}

export async function stakeLp(
    client: TypusClient,
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

    if (input.userShareId) {
        harvestStakeReward(client, tx, { stakePool: input.stakePool, user: input.user });
    }

    tx.add(
        stake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                lpToken: lpCoin,
            },
            typeArguments: [normalizeStructTag(input.stakePool.pool_info.stake_token.name)],
        })
    );

    return tx;
}

export async function unstake(
    client: TypusClient,
    tx: Transaction,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    harvestStakeReward(client, tx, { stakePool: input.stakePool, user: input.user });

    let lpToken = normalizeStructTag(input.lpPool.lp_token_type.name);

    tx.add(
        _unsubscribe({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                unsubscribedShares: tx.pure.option("u64", input.share ? BigInt(input.share) : null),
            },
            typeArguments: [lpToken],
        })
    );

    let lpCoin = tx.add(
        _unstake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.stakePool.pool_info.index),
            },
            typeArguments: [lpToken],
        })
    );

    tx.transferObjects([lpCoin], input.user);

    return tx;
}

export async function unstakeRedeem(
    client: TypusClient,
    tx: Transaction,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        userShareId: string;
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
    }

    for (let token of tokens) {
        _updateLiquidityValue({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                oracleV2: ORACLE_V2_ID,
            },
            typeArguments: [tokenType[NETWORK][token]],
        })(tx);
    }

    harvestStakeReward(client, tx, { stakePool: input.stakePool, user: input.user });

    let lpToken = normalizeStructTag(input.lpPool.lp_token_type.name);

    tx.add(
        _unsubscribe({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                unsubscribedShares: tx.pure.option("u64", input.share ? BigInt(input.share) : null),
            },
            typeArguments: [lpToken],
        })
    );

    let lpCoin = tx.add(
        _unstake({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(input.stakePool.pool_info.index),
            },
            typeArguments: [lpToken],
        })
    );

    let balance = tx.moveCall({
        target: `0x2::coin::into_balance`,
        typeArguments: [lpToken],
        arguments: [lpCoin],
    });

    tx.add(
        redeem({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                balance,
            },
            typeArguments: [lpToken],
        })
    );

    return tx;
}

export async function redeemTlp(
    client: TypusClient,
    tx: Transaction,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        lpCoins: string[];
        share: string | null;
        user: string;
    }
): Promise<Transaction> {
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
    }

    for (let token of tokens) {
        tx.add(
            _updateLiquidityValue({
                arguments: {
                    version: PERP_VERSION,
                    registry: LP_POOL,
                    index: BigInt(input.lpPool.index),
                    oracleV2: ORACLE_V2_ID,
                },
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

    let lpToken = normalizeStructTag(input.lpPool.lp_token_type.name);

    let balance = tx.moveCall({
        target: `0x2::coin::into_balance`,
        typeArguments: [lpToken],
        arguments: [burnCoin],
    });

    tx.add(
        redeem({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(input.lpPool.index),
                balance,
            },
            typeArguments: [lpToken],
        })
    );

    return tx;
}

export async function claim(
    client: TypusClient,
    tx: Transaction,
    input: {
        lpPool: typeof LiquidityPool.$inferType;
        stakePool: typeof StakePool.$inferType;
        cTOKEN: TOKEN;
        user: string;
    }
): Promise<Transaction> {
    let tokens = input.lpPool.token_pools.map((p) => typeArgToAsset("0x" + p.token_type.name));

    if (tokens.length > 0) {
        await client.pythClient.updateOracleV2WithPythLazer(tx, tokens);
    }

    for (let token of tokens) {
        _updateLiquidityValue({
            arguments: {
                version: PERP_VERSION,
                registry: LP_POOL,
                index: BigInt(input.stakePool.pool_info.index),
                oracleV2: ORACLE_V2_ID,
            },
            typeArguments: [tokenType[NETWORK][token]],
        })(tx);
    }
    let cToken = tokenType[NETWORK][input.cTOKEN];

    let token = _claim({
        arguments: {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(input.stakePool.pool_info.index),
            treasuryCaps: TLP_TREASURY_CAP,
            oracleV2: ORACLE_V2_ID,
        },
        typeArguments: [normalizeStructTag(input.lpPool.lp_token_type.name), cToken],
    })(tx);

    tx.transferObjects([token], input.user);

    return tx;
}

export async function swap(
    client: TypusClient,
    tx: Transaction,
    input: {
        coins: string[];
        FROM_TOKEN: TOKEN;
        TO_TOKEN: TOKEN;
        amount: string;
        user: string;
        perpIndex: number;
    }
): Promise<Transaction> {
    let fromToken = tokenType[NETWORK][input.FROM_TOKEN];
    let toToken = tokenType[NETWORK][input.TO_TOKEN];

    let coin = splitCoin(tx, fromToken, input.coins, input.amount, client.config.sponsored);

    await client.pythClient.updateOracleV2WithPythLazer(tx, [input.FROM_TOKEN, input.TO_TOKEN]);

    let token = _swap({
        arguments: {
            version: PERP_VERSION,
            registry: LP_POOL,
            index: BigInt(input.perpIndex),
            oracleV2: ORACLE_V2_ID,
            fromCoin: coin,
            minToAmount: BigInt(0),
        },
        typeArguments: [fromToken, toToken],
    })(tx);

    tx.transferObjects([token], input.user);

    return tx;
}

export async function harvestStakeReward(
    client: TypusClient,
    tx: Transaction,
    input: {
        stakePool: typeof StakePool.$inferType;
        user: string;
    }
): Promise<Transaction> {
    let iTokens = input.stakePool.incentives.map((i) => normalizeStructTag(i.token_type.name));

    snapshot(client, tx, { perpIndex: input.stakePool.pool_info.index });

    for (let iToken of iTokens) {
        let iCoin = tx.add(
            harvestPerUserShare({
                arguments: {
                    version: STAKE_POOL_VERSION,
                    registry: STAKE_POOL,
                    index: BigInt(input.stakePool.pool_info.index),
                },
                typeArguments: [iToken],
            })
        );
        if (iToken.endsWith("TLP")) {
            tx.add(
                stake({
                    arguments: {
                        version: STAKE_POOL_VERSION,
                        registry: STAKE_POOL,
                        index: BigInt(input.stakePool.pool_info.index),
                        lpToken: iCoin,
                    },
                    typeArguments: [normalizeStructTag(input.stakePool.pool_info.stake_token.name)],
                })
            );
        } else {
            tx.transferObjects([iCoin], input.user);
        }
    }
    return tx;
}
