import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getUserStake } from "src";

(async () => {
    let config = await TypusConfig.default("TESTNET", null);

    let user = "0xb6c7e3b1c61ee81516a8317f221daa035f1503e0ac3ae7a50b61834bc7a3ead9";
    console.log(user);

    let stakes = await getUserStake(config, user);
    console.log(stakes);
    // unsubscribedTsMs, unlockedTsMs in deactivatingShares
})();
