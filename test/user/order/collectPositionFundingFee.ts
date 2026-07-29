import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { collectPositionFundingFee, getUserPositions, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = await TypusClient.create(config);

    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC ?? process.env.W_MNEMONIC));

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let positions = await getUserPositions(client, { user, indexes: ["0"] });
    let position = positions[0];
    if (!position) { console.error("no position — match an order first"); process.exit(1); }
    console.log("position_id:", position.position_id);

    tx = await collectPositionFundingFee(client, tx, {
        position,
    });

    tx.setSender(user);
    let dryrunRes = await client.devInspectTransactionBlock({ transaction: tx });
    if (dryrunRes.FailedTransaction) {
        console.error("DRY-RUN FAILED:", JSON.stringify(dryrunRes.FailedTransaction.status.error, null, 2));
        process.exit(1);
    }
    console.log("DRY-RUN OK — collectPositionFundingFee PTB valid");

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log("digest:", res.Transaction?.digest, "status:", res.Transaction?.status);
    process.exit(0);
})();
