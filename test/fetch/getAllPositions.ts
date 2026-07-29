import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getAllPositions, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = await TypusClient.create(config);

    let baseToken: TOKEN = "SUI";

    let res = await getAllPositions(client, {
        baseToken,
        slice: "100",
        page: "1",
        marketIndex: "0",
    });
    console.log(res.positions.length);
})();
