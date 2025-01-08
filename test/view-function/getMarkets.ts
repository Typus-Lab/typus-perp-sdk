import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { getMarkets } from "src/typus_perp/view-function/getMarkets";

(async () => {
    let config = await TypusConfig.default("TESTNET", null);
    let markets = await getMarkets(config, { indexes: ["0"] });

    console.log(JSON.stringify(markets, null, 2));
})();
