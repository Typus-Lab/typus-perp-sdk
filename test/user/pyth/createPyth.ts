import "@typus/typus-sdk/dist/src/utils/load_env";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { NETWORK } from "src";

// Bootstrap a brand-new token in the OracleV2 feed_id_map. Admin path
// (the on-chain `add_latest_price_new_token` is permissioned to OracleV2 authority).
(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.W_MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = await TypusClient.create(config);

    let tx = new Transaction();
    await client.pythClient.addLatestPriceNewToken(tx, "SUI");

    tx.setSender(keypair.toSuiAddress());
    let res = await client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
    });
    console.log(res);
})();
