import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getGraphQLEvents, getLiquidateFromSentio, getOrderMatchFromSentio, parseUserHistory } from "src";
import { PKG_V1 as PERP_PACKAGE_ID } from "src/typus_perp/index";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let user = keypair.toSuiAddress();
    // let user = "0x95f26ce574fc9ace2608807648d99a4dce17f1be8964613d5b972edc82849e9e";
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

    // 2. parser events
    console.log(raw_events.length);
    let events = await parseUserHistory(raw_events);
    // console.log(events);
    console.log(events.at(0)?.timestamp);

    // 3. order match events from sentio
    let order_match = await getOrderMatchFromSentio(user, 0);
    // deduplicate
    order_match = order_match.filter((x) => events.findIndex((y) => y.tx_digest == x.tx_digest) == -1);
    order_match = order_match.map((x) => {
        let related = events.findLast((e) => e.order_id == x.order_id && e.market == x.market);
        // console.log(x, related);
        if (related) {
            x.order_type = related.order_type;
            x.collateral = related.collateral;
        }
        return x;
    });
    // console.log(order_match);
    events = events.concat();

    // 4. liquidate events from sentio
    let liquidate = await getLiquidateFromSentio(user, 0);
    liquidate = liquidate.map((x) => {
        let related = events.findLast((e) => e.position_id == x.position_id && e.market == x.market);
        // console.log(x);
        // console.log(related);
        if (related) {
            x.side = related.side == "Long" ? "Short" : "Long";
            x.size = related.size;
        }
        return x;
    });
    // console.log(liquidate);
    events = events.concat(liquidate);

    //  5. sort events by timestamp
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    console.log(events);
})();
