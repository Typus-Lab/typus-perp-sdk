import "@typus/typus-sdk/dist/src/utils/load_env";
import { getFromSentio } from "src/api/sentio";
import {
    getCancelOrderFromSentio,
    getArchivePlaceOrderEvents,
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
    let user = "0xdc72506f269feb89822c13e66b282bc52c5724c27e575a04cbec949a13671d13";
    console.log(user);

    // 1. pagination
    var raw_events: any[] = [];
    var beforeCursor = null;
    // get 5 pages
    const PERP_PACKAGE_ID = "0x9003219180252ae6b81d2893b41d430488669027219537236675c0c2924c94d9"
    for (let i = 0; i < 20; i += 1) {
        let result = await getGraphQLEvents(PERP_PACKAGE_ID, user, beforeCursor);
        let pageInfo = result.pageInfo;
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

    const startTimestamp = Math.floor((Date.now() - 90 * 24 * 60 * 60 * 1000) / 1000); // 60 days ago timestamp
    const endTimestamp = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
    const placeOrderEvents = await getArchivePlaceOrderEvents(user, startTimestamp, endTimestamp, []);
    const matchingDatas = await getFromSentio("OrderFilled", user, startTimestamp.toString(), undefined, true)
    // 2. parser events
    let events = await parseUserHistory(raw_events, matchingDatas);
    // console.log(events.length);
    // console.log(events.at(0)?.timestamp);
    //  console.log(startTimestamp);

    // 3. order match events from sentio
    events = await getOrderMatchFromSentio(user, startTimestamp, events, matchingDatas, placeOrderEvents);


    // 4. liquidate events from sentio
    events = await getLiquidateFromSentio(user, startTimestamp, events);

    // 5. exercise events from sentio
    events = await getRealizeOptionFromSentio(user, startTimestamp, events);

    // 6. force cancel order
    events = await getCancelOrderFromSentio(user, startTimestamp, events);

    // 7.
    events = await getRealizeFundingFromSentio(user, startTimestamp, events);
    events = await getRemovePositionFromSentio(user, startTimestamp, events);

    // console.log(events.filter(e => e.market === "XAG/USD"));
    // console.log(events.filter((x) => x.collateral_token == "DEEP"));

    console.log({ events: events.filter(e => e.tx_digest === "Gdy7iuXHanyM5ockfEZJPR5bQY1wdJXKxcaf6bxnbmFt") })
    // saveToFile(events, "userHistory.csv");
})();


