import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getLpPool, getLpPools, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let lpPools = await getLpPools(client);
    console.log(lpPools); // 1 lpPool inclueded

    console.log(lpPools.map((x) => x.lp_token_type));

    const lpPool = lpPools[0];

    // avaliable token types to mint the lp tokens (3 token types supported)
    console.log(lpPool.liquidity_tokens.map((m) => m.name));

    //
    // console.log(lpPool.token_pools.map((m) => [m.token_type.name, m.state]));

    // maxCapacity, targetWeightBp
    // console.log(lpPool.tokenPools[1].config.spotConfig);

    // utilizationThresholdBp0
    // console.log(lpPool.tokenPools[1].config.marginConfig);
})();
