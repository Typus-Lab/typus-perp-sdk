import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getLiquidationPriceAndPnl, getUserPositions, NETWORK, parseOptionBidReceipts } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = "0x575efc989b65eafc66ee88a60def0134c5466a05b7d0882a5736e837b3ede4c0";
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
