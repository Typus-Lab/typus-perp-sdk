import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, claim, getStakePools } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC ?? process.env.W_MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = await TypusClient.create(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    const index = 0;

    let lpPools = await getLpPools(client);
    let lpPool = lpPools[index];
    // console.log(lpPool);

    let stakePools = await getStakePools(client);
    let stakePool = stakePools[index];
    let tx = new Transaction();

    await claim(client, tx, {
        lpPool,
        stakePool,
        cTOKEN: "wUSDC",
        user,
    });

    tx.setSender(user);
    let dryrunRes = await client.devInspectTransactionBlock({ transaction: tx });
    if (dryrunRes.FailedTransaction) {
        console.error("DRY-RUN FAILED:", JSON.stringify(dryrunRes.FailedTransaction.status.error, null, 2));
        process.exit(1);
    }
    console.log("DRY-RUN OK — PTB valid (Lazer + claim_v2 path)");
    // @ts-ignore
    let evts = dryrunRes.Transaction.events.filter((e: any) => (e.eventType ?? e.type ?? "").endsWith("BurnLpEvent"));
    console.log("BurnLpEvent:", JSON.stringify(evts[0]?.json ?? evts[0]?.parsedJson ?? evts[0] ?? null, null, 2));
    process.exit(0);
})();
