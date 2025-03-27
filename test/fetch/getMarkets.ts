import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getMarkets, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let markets = await getMarkets(config, { indexes: ["0"] });
    console.log(JSON.stringify(markets, null, 2));
    console.log(
        "Tradable Symbols: ",
        markets[0].markets.symbols.map((s) => s.name)
    );
})();
