import "@typus/typus-sdk/dist/src/utils/load_env";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { stakeLp, NETWORK, getUserStake, TLP_TOKEN, getStakePool } from "src";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    let stakePool = await getStakePool(client);
    // console.log(stakePool);

    let stakes = await getUserStake(client, user);
    // console.log(stakes);

    // coins
    let coins = (
        await client.jsonRpcClient.getCoins({
            owner: user,
            coinType: TLP_TOKEN,
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log(coins.length);

    let tx = new Transaction();

    tx = await stakeLp(client, tx, {
        stakePool,
        lpCoins: coins,
        amount: "10000000000",
        userShareId: stakes!.length > 0 ? stakes![0][0][0].userShareId.toString() : null,
        user,
    });

    // console.log(tx.getData());

    let dryrunRes = await client.jsonRpcClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    // console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("StakeEvent")));

    let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/GRjmdrHtcqzAP4a8i6nTef88zDpPZ2ouLSVX4DTj8JnC
})();
