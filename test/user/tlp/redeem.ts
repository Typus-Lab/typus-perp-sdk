import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, TLP, TLP_TOKEN, getLpPools, getStakePool, getUserStake, redeemTlp } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let lpPools = await getLpPools(config);
    let lpPool = lpPools[0];
    // console.log(lpPool);

    let pythClient = createPythClient(provider, NETWORK);

    // 1. Get user's stake
    let stakes = await getUserStake(config, user);
    console.log(stakes);

    // 2. get TLP coins
    // coins
    let coins = (
        await provider.getCoins({
            owner: user,
            coinType: TLP_TOKEN,
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log(coins.length);

    let tx = new Transaction();

    await redeemTlp(config, tx, pythClient, {
        lpPool,
        share: "1964494844",
        user,
        lpCoins: coins,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("RedeemEvent")));

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
