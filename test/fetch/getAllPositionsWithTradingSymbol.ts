import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getAllPositionsWithTradingSymbol, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let baseToken: TOKEN = "SUI";

    let res = await getAllPositionsWithTradingSymbol(client, {
        baseToken,
    });
    // console.log(res);
    console.log("res.length:", res.length);
})();
