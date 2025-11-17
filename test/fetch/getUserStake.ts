import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getUserStake, getDeactivatingShares, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = "0xd15f079d5f60b8fdfdcf3ca66c0d3473790c758b04b6418929d5d2991c5443ee";
    console.log(user);

    let stakes = await getUserStake(client, user);
    console.dir(stakes, { depth: null });

    let deactivatingShares = await getDeactivatingShares(client, user);
    console.dir(deactivatingShares, { depth: null });
})();
