import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getLpPool, getLpPools, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    // let lpPools = await getLpPools(config);
    // console.log(lpPools); // 1 lpPool inclueded
    // const lpPool = lpPools[0];

    // skip dynamic field fetching
    let lpPool = await getLpPool(config);
    console.log(lpPool.poolInfo);

    // avaliable token types to mint the lp tokens (3 token types supported)
    // console.log(lpPool.liquidityTokens.map((m) => m.name));

    //
    console.log(lpPool.tokenPools.map((m) => [m.tokenType.name, m.state]));

    // maxCapacity, targetWeightBp
    // console.log(lpPool.tokenPools[1].config.spotConfig);

    // utilizationThresholdBp0
    // console.log(lpPool.tokenPools[1].config.marginConfig);
})();
