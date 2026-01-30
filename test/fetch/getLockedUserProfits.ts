import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { fetchLockedUserProfits, fetchAllLockedUserProfits, PERP_VERSION, PROFIT_VAULT, LOCK_VAULT } from "src";


(async () => {
    const config = await TypusConfig.default("TESTNET", null);
    const user = "0x4374a519f43aeadf1fe795f1519682cc6a7cca552c26d874d5d98600aaeb76a8";
    const client = new TypusClient(config);
    const lockedProfit = await fetchLockedUserProfits(client, {
        lockVault: LOCK_VAULT,
        version: PERP_VERSION,
        user: user,
    });

    const allUserLockedProfits = await fetchAllLockedUserProfits(config, {
        lockVault: LOCK_VAULT,
    });

    console.log(allUserLockedProfits);
})()