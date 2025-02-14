import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getStakePools } from "src";

(async () => {
    let config = await TypusConfig.default("TESTNET", null);

    let stakePools = await getStakePools(config);
    console.log(stakePools[0]); // 1 lpPool inclueded

    console.log(
        "Incentives: ",
        stakePools[0].incentives.map((i) => i.tokenType.name)
    );

    console.log("config: ", stakePools[0].incentives[0].config);
    console.log("info: ", stakePools[0].incentives[0].info);
})();
