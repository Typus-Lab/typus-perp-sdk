import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getLiquidationPriceAndPnl, getUserPositions, NETWORK, parseOptionBidReceipts } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = "0x845c22be3e771ac8d90973e9859b5088207527c158f75ba4ac9e6201ca1eedb8";
    console.log(user);

    let positions = await getUserPositions(client, user);
    console.log(JSON.stringify(positions, (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
    // `OpenFee` = unrealizedTradingFee

    // let bidReceipts = parseOptionBidReceipts(positions);
    // console.log(bidReceipts);
    // use bidReceipts to calculate `Option PnL`

    if (positions.length > 0) {
        let liquidationPrices = await getLiquidationPriceAndPnl(client, {
            positions,
            user,
        });
        console.log(liquidationPrices);
    }
})();
