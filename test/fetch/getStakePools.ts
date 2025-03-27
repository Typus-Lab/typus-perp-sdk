import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getStakePool, getStakePools, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    // let stakePools = await getStakePools(config);
    // console.log(stakePools); // 1 lpPool inclueded
    // let stakePool = stakePools[0];

    let stakePool = await getStakePool(config);
    console.log(stakePool);

    console.log(
        "Incentives: ",
        stakePool.incentives.map((i) => i.tokenType.name)
    );

    console.log("config: ", stakePool.incentives[0].config);
    console.log("info: ", stakePool.incentives[0].info);
})();
