import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { getStakePool, MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import { migrateLpUserSharesV2 } from "src/typus_stake_pool/stake-pool/functions";

import mne from "mnemonic.json";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var hasNextPage = true;
    var nextCursor: string | null = null;

    var total = 0;
    let users: { user: string; total_shares: number; active_shares: number }[] = [];

    while (hasNextPage) {
        var res = await provider.getDynamicFields({
            parentId: "0x0ad369d88f8072ae5f8a3a9f7c197778bfd0f5ca8eca4c51336ddc4be3104f0c",
            // parentId: "0xaaeb8ee5148b7ee3eefc6733e3fe2eb48f5d8d187d7d79f9cc21aa59902f077d",
            cursor: nextCursor,
        });
        // console.log(res);
        hasNextPage = res.hasNextPage;
        nextCursor = res.nextCursor;

        var res2 = await provider.multiGetObjects({ ids: res.data.map((x) => x.objectId), options: { showContent: true } });

        res2.forEach((x) => {
            var total_shares = 0;
            var active_shares = 0;
            // @ts-ignore
            x.data?.content.fields.value.forEach((y) => {
                total_shares += Number(y.fields.total_shares);
                active_shares += Number(y.fields.active_shares);
            });
            // @ts-ignore
            let user = x.data?.content.fields.name;
            console.log(user, active_shares);

            users.push({ user, total_shares, active_shares });
            total += active_shares;
        });
    }

    console.log(total);
    let stakePool = await getStakePool(config);
    console.log(stakePool.poolInfo.totalShare);

    saveToFile(users, "stake_v1_users.csv");

    console.log(users.length);

    var tx = new Transaction();

    for (let user of users) {
        migrateLpUserSharesV2(tx, {
            version: STAKE_POOL_VERSION,
            registry: STAKE_POOL,
            index: BigInt(0),
            user: user.user,
        });
    }

    let res3 = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res3);
})();

import * as fs from "fs";

function saveToFile(data: any[], filename: string) {
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(","), ...data.map((d) => Object.values(d).join(","))];
    const csvContent = csvRows.join("\n");
    fs.writeFileSync(filename, csvContent);
}
