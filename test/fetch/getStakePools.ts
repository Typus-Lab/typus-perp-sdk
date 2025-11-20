import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getStakePool, getStakePools, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let stakePools = await getStakePools(client);
    console.log(stakePools); // 1 lpPool inclueded
    let stakePool = stakePools[0];

    console.log(
        "Incentives: ",
        stakePool.incentives.map((i) => i.token_type.name)
    );

    if (stakePool.incentives.length > 0) {
        console.log("config: ", stakePool.incentives[0].config);
        console.log("info: ", stakePool.incentives[0].info);
    }
})();
