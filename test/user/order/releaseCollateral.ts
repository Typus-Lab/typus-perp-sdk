import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { releaseCollateral, getUserPositions, NETWORK } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let positions = await getUserPositions(client, user);
    let position = positions[0];
    console.log(position);

    tx = await releaseCollateral(client, tx, {
        amount: "1000000",
        position,
    });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("ReleaseCollateralEvent"))[0].parsedJson);

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
