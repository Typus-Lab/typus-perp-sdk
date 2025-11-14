import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getUserStake, getDeactivatingShares, NETWORK } from "src";
import { SuiClient } from "@mysten/sui/client";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let user = "0xd15f079d5f60b8fdfdcf3ca66c0d3473790c758b04b6418929d5d2991c5443ee";
    console.log(user);

    let provider = new SuiClient({ url: config.rpcEndpoint });
    let stakes = await getUserStake(provider, user);
    console.dir(stakes, { depth: null });

    let deactivatingShares = await getDeactivatingShares(config, user);
    console.dir(deactivatingShares, { depth: null });
})();
