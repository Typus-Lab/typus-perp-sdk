import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, TLP, TLP_TOKEN, getLpPools, getStakePool, getUserStake, redeemTlp } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    let lpPools = await getLpPools(client);
    let lpPool = lpPools[0];
    // console.log(lpPool);

    // 1. Get user's stake
    let stakes = await getUserStake(client, user);
    console.log(stakes);

    // 2. get TLP coins
    // coins
    let coins = (
        await client.jsonRpcClient.getCoins({
            owner: user,
            coinType: TLP_TOKEN,
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log(coins.length);

    let tx = new Transaction();

    await redeemTlp(client, tx, {
        lpPool,
        share: "1964494844",
        user,
        lpCoins: coins,
    });

    let dryrunRes = await client.jsonRpcClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("RedeemEvent")));

    let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
