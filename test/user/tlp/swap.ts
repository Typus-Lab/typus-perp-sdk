import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { NETWORK, swap } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    // INPUT
    let FROM_TOKEN: TOKEN = "wUSDT";
    let TO_TOKEN: TOKEN = "wUSDC";

    // coins
    let coins = (
        await client.jsonRpcClient.getCoins({
            owner: user,
            coinType: tokenType[NETWORK][FROM_TOKEN],
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log(coins.length);

    let tx = new Transaction();

    tx = await swap(client, tx, {
        coins,
        amount: "1000000",
        FROM_TOKEN,
        TO_TOKEN,
        user,
    });

    let dryrunRes = await client.jsonRpcClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("SwapEvent"))[0].parsedJson);

    let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/8TDGppninwYxBqpNtao3mMa936nemU3rdMqA8xesJREA
})();
