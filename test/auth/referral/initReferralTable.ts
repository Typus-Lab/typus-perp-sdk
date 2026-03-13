import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import { initReferralTable } from "src/generated/typus_perp/trading";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.AUTH_MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    tx.add(
        initReferralTable({
            arguments: {
                version: PERP_VERSION,
                registry: MARKET,
            },
        })
    );

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
