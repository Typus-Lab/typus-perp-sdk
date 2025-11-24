import { typeArgsToAssets } from "@typus/typus-sdk/dist/src/constants";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getMarkets, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let markets = await getMarkets(client, { indexes: ["0", "1"] });
    console.log(JSON.stringify(markets, null, 2));
    console.log("Tradable Symbols: ", typeArgsToAssets(markets[0].markets.symbols.map((s) => s.name)));
})();
