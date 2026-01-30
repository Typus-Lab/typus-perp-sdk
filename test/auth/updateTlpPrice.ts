import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import { updatePoolInfoU64Padding } from "src/generated/typus_stake_pool/stake_pool";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.AUTH_MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let user = keypair.toSuiAddress();
    console.log(user);

    let tx = new Transaction();
    tx.add(
        updatePoolInfoU64Padding({
            arguments: {
                version: STAKE_POOL_VERSION,
                registry: STAKE_POOL,
                index: BigInt(0),
                tlpPrice: BigInt(10000),
                usdPerExp: BigInt(200),
            },
        })
    );

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
