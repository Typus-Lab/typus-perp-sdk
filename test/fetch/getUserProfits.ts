import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { fetchUserProfits, NETWORK } from "src";

(async () => {
    const config = await TypusConfig.default(NETWORK, null);
    const user = "0x09953d966977a79550b65661c0e9d03890809a3f94b1ff711482c9ab8254a32a";
    const client = new TypusClient(config);
    const profit = await fetchUserProfits(client, {
        user: user,
    });
    console.log(profit);
})();
