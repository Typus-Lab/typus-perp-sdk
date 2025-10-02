import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getUserStake, getDeactivatingShares, NETWORK, getUserStakeById } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let user = "0xd15f079d5f60b8fdfdcf3ca66c0d3473790c758b04b6418929d5d2991c5443ee";
    console.log(user);

    let stakes = await getUserStake(config, user);
    console.dir(stakes, { depth: null });

    // let stakes = await getUserStakeById(config, "54");
    // console.dir(stakes, { depth: null });

    let deactivatingShares = await getDeactivatingShares(config, user);
    console.dir(deactivatingShares, { depth: null });
})();
