import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { cancelTradingOrder, getUserOrders, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let orders = await getUserOrders(client, user);
    let order = orders[0];
    console.log(order);

    tx = await cancelTradingOrder(client, tx, {
        order,
        user,
    });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("CancelTradingOrderEvent"))[0].parsedJson);

    // let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    // console.log(res);
})();
