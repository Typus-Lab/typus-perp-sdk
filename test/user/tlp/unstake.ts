import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, getUserStake, unstake } from "src";

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
    let stake = await getUserStake(client, user);
    console.log(stake);

    // 2. StakePool
    let stakePool = await getStakePool(client);
    // console.log(stakePool);

    let tx = new Transaction();

    await unstake(client, tx, {
        userShareId: stake![0].user_share_id.toString(),
        lpPool,
        stakePool,
        share: "1000000000",
        user,
    });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("UnstakeEvent")));

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
