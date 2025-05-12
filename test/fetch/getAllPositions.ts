import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getAllPositions, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let baseToken: TOKEN = "SUI";

    let res = await getAllPositions(config, {
        baseToken,
        slice: "100",
        page: "1",
    });
    console.log(res);
})();
