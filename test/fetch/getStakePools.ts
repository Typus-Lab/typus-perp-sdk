import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getStakePools } from "src";

(async () => {
    let config = await TypusConfig.default("TESTNET", null);

    let stakePools = await getStakePools(config);
    console.log(stakePools[0]); // 1 lpPool inclueded
})();
