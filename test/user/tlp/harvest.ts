import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { getStakePool, getUserStake, harvestStakeReward, NETWORK } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    // 1. Get user's stake
    let stake = await getUserStake(config, user);
    console.log(stake);

    // 2. StakePool
    let stakePool = await getStakePool(config);
    console.log(stakePool);

    let tx = new Transaction();

    harvestStakeReward(config, tx, {
        stakePool,
        userShareId: "0",
        user,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });

    let events = dryrunRes.events.filter((e) => e.type.endsWith("HarvestPerUserShareEvent"));

    if (events.length > 0) {
        // @ts-ignore
        let harvest_amount = events[0].parsedJson.harvest_amount;
        console.log(`Sui incentive amount: ${harvest_amount / 10e9}`);
    }

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
