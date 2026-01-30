import "@typus/typus-sdk/dist/src/utils/load_env";
import {
    getCancelOrderFromSentio,
    getGraphQLEvents,
    getLiquidateFromSentio,
    getOrderMatchFromSentio,
    getRealizeFundingFromSentio,
    getRealizeOptionFromSentio,
    getRemovePositionFromSentio,
    parseUserHistory,
    PERP_PACKAGE_ID,
    STAKE_PACKAGE_ID,
} from "src";

(async () => {
    let user = "0x845c22be3e771ac8d90973e9859b5088207527c158f75ba4ac9e6201ca1eedb8";
    console.log(user);

    // 1. pagination
    var raw_events: any[] = [];
    var beforeCursor = null;
    // get 5 pages
    const PERP_PACKAGE_ID = "0xec30955b1e100617a02fecec432d2c845f17b2f3d68827f390563faba112513b"
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
    // console.log(raw_events.map((x) => x.contents.json));

    // 2. parser events
    let events = await parseUserHistory(raw_events);
    // console.log(events);
    // console.log(events.length);
    // console.log(events.at(0)?.timestamp);
    const startTimestamp = Math.floor(new Date(events.at(0)?.timestamp!).getTime() / 1000);
    //  console.log(startTimestamp);

    // 3. order match events from sentio
    events = await getOrderMatchFromSentio(user, startTimestamp, events);

    // 4. liquidate events from sentio
    events = await getLiquidateFromSentio(user, startTimestamp, events);

    // 5. exercise events from sentio
    events = await getRealizeOptionFromSentio(user, startTimestamp, events);

    // 6. force cancel order
    events = await getCancelOrderFromSentio(user, startTimestamp, events);

    // 7.
    events = await getRealizeFundingFromSentio(user, startTimestamp, events);
    events = await getRemovePositionFromSentio(user, startTimestamp, events);

    // console.log(events);
    // console.log(events.filter((x) => x.collateral_token == "DEEP"));

    // saveToFile(events, "userHistory.csv");
})();

import * as fs from "fs";

function saveToFile(data: any[], filename: string) {
    const headers = Object.keys(data[0]);

    const csvRows = [headers.join(","), ...data.map((d) => Object.values(d).join(","))];

    const csvContent = csvRows.join("\n");
    fs.writeFileSync(filename, csvContent);
}
