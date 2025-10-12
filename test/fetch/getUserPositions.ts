import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { getLiquidationPriceAndPnl, getUserPositions, NETWORK, parseOptionBidReceipts } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = "0x845c22be3e771ac8d90973e9859b5088207527c158f75ba4ac9e6201ca1eedb8";
    console.log(user);

    let positions = await getUserPositions(config, user);
    console.log(JSON.stringify(positions, (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
    // `OpenFee` = unrealizedTradingFee

    // let bidReceipts = parseOptionBidReceipts(positions);
    // console.log(bidReceipts);
    // use bidReceipts to calculate `Option PnL`

    if (positions.length > 0) {
        let pythClient = createPythClient(provider, NETWORK);

        let liquidationPrices = await getLiquidationPriceAndPnl(config, pythClient, {
            positions,
            user,
        });
        // console.log(liquidationPrices);
    }
})();
