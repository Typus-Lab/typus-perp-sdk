import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getLiquidationPriceAndPnl, getUserPositions, NETWORK, parseOptionBidReceipts } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = "0xb6c7e3b1c61ee81516a8317f221daa035f1503e0ac3ae7a50b61834bc7a3ead9";
    console.log(user);

    let positions = await getUserPositions(client, { user, indexes: ["0", "1"] });
    console.log(JSON.stringify(positions, (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
    // `OpenFee` = unrealizedTradingFee

    // let bidReceipts = parseOptionBidReceipts(positions);
    // console.log(bidReceipts);
    // use bidReceipts to calculate `Option PnL`

    if (positions.length > 0) {
        let liquidationPrices = await getLiquidationPriceAndPnl(client, {
            positions,
        });
        console.log(liquidationPrices);
    }
})();
