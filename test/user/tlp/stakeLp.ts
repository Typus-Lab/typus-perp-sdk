import "@typus/typus-sdk/dist/src/utils/load_env";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { stakeLp, NETWORK, getUserStake, TLP_TOKEN, getStakePool } from "src";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let stakePool = await getStakePool(config);
    // console.log(stakePool);

    let stakes = await getUserStake(config, user);
    // console.log(stakes);

    // coins
    let coins = (
        await provider.getCoins({
            owner: user,
            coinType: TLP_TOKEN,
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log(coins.length);

    let tx = new Transaction();

    tx = await stakeLp(config, tx, {
        stakePool,
        lpCoins: coins,
        amount: "10000000000",
        userShareId: stakes.length > 0 ? stakes[0][0][0].userShareId.toString() : null,
        user,
    });

    // console.log(tx.getData());

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    // console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("StakeEvent")));

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/GRjmdrHtcqzAP4a8i6nTef88zDpPZ2ouLSVX4DTj8JnC
})();
