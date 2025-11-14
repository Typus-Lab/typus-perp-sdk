import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getAllPositionsWithTradingSymbol, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);

    let baseToken: TOKEN = "SUI";

    let res = await getAllPositionsWithTradingSymbol(config, {
        baseToken,
    });
    // console.log(res);
    console.log("res.length:", res.length);
})();
