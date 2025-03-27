import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { getLiquidationPriceAndPnl, getUserPositions, NETWORK, parseOptionBidReceipts } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = "0xb6c7e3b1c61ee81516a8317f221daa035f1503e0ac3ae7a50b61834bc7a3ead9";
    console.log(user);

    let positions = await getUserPositions(config, user);
    console.log(JSON.stringify(positions, (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));

    let bidReceipts = parseOptionBidReceipts(positions);
    console.log(bidReceipts);

    if (positions.length > 0) {
        let pythClient = createPythClient(provider, NETWORK);

        let liquidationPrices = await getLiquidationPriceAndPnl(config, pythClient, {
            positions,
            user,
        });
        console.log(liquidationPrices);
    }
})();
