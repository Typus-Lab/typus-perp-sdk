import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getUserStake, getDeactivatingShares, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = "0xb6c7e3b1c61ee81516a8317f221daa035f1503e0ac3ae7a50b61834bc7a3ead9";
    console.log(user);

    let stakes = await getUserStake(client, {
        user,
        indexes: ["0", "1"],
    });
    console.dir(stakes, { depth: null });

    let deactivatingShares = await getDeactivatingShares(client, { user, indexes: [] });
    console.dir(deactivatingShares, { depth: null });
})();
