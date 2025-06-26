import "@typus/typus-sdk/dist/src/utils/load_env";
import {
    getGraphQLEvents,
    getLiquidateFromSentio,
    getOrderMatchFromSentio,
    getRealizeOptionFromSentio,
    parseUserHistory,
    STAKE_PACKAGE_ID,
} from "src";
import { PKG_V1 as PERP_PACKAGE_ID } from "src/typus_perp/index";
import { getRecentTradesFromSentio } from "src/api/sentio";

(async () => {
    let recentTrades = await getRecentTradesFromSentio("WBTC");
    console.log(recentTrades.length);
    saveToFile(recentTrades, "recentTrades.csv");
})();

import * as fs from "fs";

function saveToFile(data: any[], filename: string) {
    const headers = Object.keys(data[0]);

    const csvRows = [headers.join(","), ...data.map((d) => Object.values(d).join(","))];

    const csvContent = csvRows.join("\n");
    fs.writeFileSync(filename, csvContent);
}
