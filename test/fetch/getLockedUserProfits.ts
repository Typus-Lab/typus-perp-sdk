import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { fetchLockedUserProfits, NETWORK } from "src";

(async () => {
    const config = await TypusConfig.default(NETWORK, null);
    const user = "0xa88c6f14d1f0394fcf633444503ef8d10d40b6d638858a95ac83b1de39aca6e9";
    const client = new TypusClient(config);
    const lockedProfit = await fetchLockedUserProfits(client, {
        user: user,
    });
    console.log(lockedProfit);
})();
