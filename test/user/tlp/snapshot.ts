import "@typus/typus-sdk/dist/src/utils/load_env";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { snapshot, NETWORK, getUserStake, getLpPools, getStakePool } from "src";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    let stakes = await getUserStake(client, user);
    console.log(stakes);

    let tx = new Transaction();

    tx = await snapshot(client, tx, {
        userShareId: stakes![0][0][0].userShareId.toString(),
    });

    // console.log(tx.getData());

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
