import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { getStakePools, MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import { autoCompound } from "src/generated/typus_stake_pool/stake_pool";
import { normalizeStructTag } from "@mysten/sui/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.AUTH_MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    const index = 0;
    let stakePools = await getStakePools(client);
    let stakePool = stakePools[index];
    console.log(stakePool);

    var tx = new Transaction();
    tx.add(
        autoCompound({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(index),
            },
            typeArguments: [normalizeStructTag(stakePool.pool_info.stake_token.name)],
        })
    );

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
