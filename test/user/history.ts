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

(async () => {
    let user = "0xdc72506f269feb89822c13e66b282bc52c5724c27e575a04cbec949a13671d13";
    console.log(user);

    // 1. pagination
    var raw_events: any[] = [];
    var beforeCursor = null;
    // get 5 pages
    for (let i = 0; i < 5; i += 1) {
        let result = await getGraphQLEvents(PERP_PACKAGE_ID, user, beforeCursor);
        let pageInfo = result.pageInfo;
        // console.log(pageInfo);
        beforeCursor = pageInfo.startCursor;
        raw_events.push(...result.nodes);
        if (!pageInfo.hasPreviousPage) {
            // raw_events.length > 0 && result.nodes.at(-1).transactionBlock.digest == raw_events.at(-1).transactionBlock.digest
            break;
        }
    }
    raw_events = raw_events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));

    // console.dir(raw_events, { depth: null });
    console.log(raw_events.length);

    // 2. parser events
    let events = await parseUserHistory(raw_events);
    // console.log(events);
    console.log(events.length);
    console.log(events.at(0)?.timestamp);

    // // 3. order match events from sentio
    // events = await getOrderMatchFromSentio(user, 0, events);

    // // 4. liquidate events from sentio
    // events = await getLiquidateFromSentio(user, 0, events);

    // // 5. exercise events from sentio
    // events = await getRealizeOptionFromSentio(user, 0, events);

    saveToFile(events, "userHistory.csv");
})();

import * as fs from "fs";

function saveToFile(data: any[], filename: string) {
    const headers = Object.keys(data[0]);

    const csvRows = [headers.join(","), ...data.map((d) => Object.values(d).join(","))];

    const csvContent = csvRows.join("\n");
    fs.writeFileSync(filename, csvContent);
}
