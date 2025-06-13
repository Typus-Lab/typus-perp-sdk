import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getUserStake, getDeactivatingShares, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let user = "0x73e8e5c0d73cf33fa870915250e6cab0b3744f6e97b91308c83fb69bd500c070";
    console.log(user);

    let stakes = await getUserStake(config, user);
    console.dir(stakes, { depth: null });

    let deactivatingShares = await getDeactivatingShares(config, user);
    console.dir(deactivatingShares, { depth: null });
})();
