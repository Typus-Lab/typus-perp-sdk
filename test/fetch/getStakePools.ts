import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getStakePool, getStakePools, NETWORK } from "src";
import { SuiClient } from "@mysten/sui/client";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    // let stakePools = await getStakePools(config);
    // console.log(stakePools); // 1 lpPool inclueded
    // let stakePool = stakePools[0];

    let provider = new SuiClient({ url: config.rpcEndpoint });
    let stakePool = await getStakePool(provider);
    console.log(stakePool);

    console.log(
        "Incentives: ",
        stakePool.incentives.map((i) => i.token_type.name)
    );

    if (stakePool.incentives.length > 0) {
        console.log("config: ", stakePool.incentives[0].config);
        console.log("info: ", stakePool.incentives[0].info);
    }
})();
