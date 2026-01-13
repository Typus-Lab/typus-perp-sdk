import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, getStakePools, getUserStake, unstake } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    const index = 0;

    let lpPools = await getLpPools(client);
    let lpPool = lpPools[index];
    // console.log(lpPool);

    let stakePools = await getStakePools(client);
    console.log(stakePools);

    let stakePool = stakePools[index];
    console.log(stakePool);

    // 1. Get user's stake
    let stakes = await getUserStake(client, { user, indexes: ["0", "1"] });
    console.log(stakes);

    let tx = new Transaction();

    await unstake(client, tx, {
        userShareId: stakes[0][0]!.user_share_id.toString(),
        lpPool,
        stakePool,
        share: "10000000",
        user,
    });

    console.dir(JSON.parse(await tx.toJSON({ client: client.jsonRpcClient })).commands[0], { depth: null });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("UnstakeEvent")));

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
