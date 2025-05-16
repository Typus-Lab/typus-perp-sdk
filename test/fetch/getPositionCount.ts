import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getPositionCount, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let baseToken: TOKEN = "SUI";

    let res = await getPositionCount(config, {
        baseToken,
    });
    console.log(res);
})();
