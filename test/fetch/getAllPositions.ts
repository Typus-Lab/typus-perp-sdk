import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getAllPositions, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let baseToken: TOKEN = "SUI";

    let res = await getAllPositions(client, {
        baseToken,
        slice: "100",
        page: "1",
    });
    console.log(res.positions.length);
})();
