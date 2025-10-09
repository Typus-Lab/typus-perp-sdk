import { assetToDecimal, TOKEN, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { PKG_V1 as PERP_PACKAGE_ID } from "../typus_perp/index";
import { OrderFilledEvent, RealizeFundingEvent, RemovePositionEvent } from "../typus_perp/position/structs";
import {
    CancelTradingOrderEvent,
    CreateTradingOrderEvent,
    CreateTradingOrderWithBidReceiptsEvent,
    IncreaseCollateralEvent,
    ManagerReducePositionEvent,
    ReleaseCollateralEvent,
} from "../typus_perp/trading/structs";
import { SwapEvent } from "src/typus_perp/lp-pool/structs";
import { getFromSentio } from "src/api/sentio";
import { NETWORK } from "src";

export type actionType =
    | "Place Order"
    | "Cancel Order"
    | "Order Filled (Open Position)"
    | "Order Filled (Increase Position)"
    | "Order Filled (Close Position)"
    | "Realized PnL"
    | "Modify Collateral"
    | "Exercise Position"
    | "Liquidation"
    | "Force Cancel Order"
    | "Force Close Position"
    | "Swap"
    | "Realize Funding";

export type sideType = "Long" | "Short";

export type orderType = "Market" | "Limit" | "Take Profit" | "Stop Loss";

export type statusType = "Open" | "Filled" | "Canceled";

export interface Event {
    action: actionType;
    typeName: string | undefined;
    order_id: string | undefined;
    position_id: string | undefined;
    market: string;
    side: sideType | undefined;
    order_type: orderType | undefined;
    status: statusType;
    size: number | undefined;
    base_token: TOKEN;
    collateral: number | undefined;
    collateral_token: TOKEN;
    price: number | undefined;
    realized_pnl: number | undefined; // in USD
    timestamp: string;
    tx_digest: string;
    dov_index: string | undefined; // for option collateral
    sender: "user" | "cranker";
}

export async function parseUserHistory(raw_events) {
    const events: Event[] = [];

    raw_events.forEach((event) => {
        const type: string = event.contents.type.repr;
        if (type.endsWith("PythPrice")) {
            return;
        }
        const json = event.contents.json;
        const timestamp = event.timestamp;
        const tx_digest = event.transactionBlock.digest;
        // console.log(type);
        // console.log(tx_digest);
        // console.log(json);
        // console.log(timestamp);

        const [pkg, mod, name] = type.split("::");

        switch (name) {
            case CreateTradingOrderEvent.$typeName.split("::")[2]:
            case CreateTradingOrderWithBidReceiptsEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;

                var size = Number(json.size) / 10 ** assetToDecimal(base_token)!;
                var collateral: number | undefined;
                if (json.collateral_amount) {
                    collateral = Number(json.collateral_amount) / 10 ** assetToDecimal(collateral_token)!;
                } else {
                    collateral = Number(json.collateral_in_deposit_token) / 10 ** assetToDecimal(collateral_token)!;
                }

                var order_type: orderType = "Limit";
                var price = json.trigger_price;
                if (json.filled) {
                    order_type = "Market";
                    price = json.filled_price!;
                } else if (json.reduce_only && !json.is_stop_order) {
                    order_type = "Take Profit";
                } else if (json.reduce_only && json.is_stop_order) {
                    order_type = "Stop Loss";
                }

                var e: Event = {
                    action: "Place Order",
                    typeName: name,
                    order_id: json.order_id,
                    position_id: json.linked_position_id,
                    market,
                    side: json.is_long ? "Long" : "Short",
                    order_type,
                    status: json.filled ? "Filled" : "Open",
                    size,
                    base_token,
                    collateral,
                    collateral_token,
                    price: Number(price) / 10 ** 8, // WARNING: fixed decimal
                    realized_pnl: undefined,
                    timestamp,
                    tx_digest,
                    dov_index: json.dov_index,
                    sender: "user",
                };
                events.push(e);
                break;

            case OrderFilledEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.symbol.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;

                var size = Number(json.filled_size) / 10 ** assetToDecimal(base_token)!;
                var price = json.filled_price;
                var action: actionType;
                var related: Event | undefined;
                var collateral: number | undefined;

                var realized_trading_fee = Number(json.realized_trading_fee) + Number(json.realized_borrow_fee);
                var realized_fee_in_usd = Number(json.realized_fee_in_usd) / 10 ** 9;
                var realized_amount = json.realized_amount_sign ? Number(json.realized_amount) : -Number(json.realized_amount);
                // console.log(realized_amount);
                var realized_pnl =
                    realized_trading_fee > 0 ? ((realized_amount - realized_trading_fee) * realized_fee_in_usd) / realized_trading_fee : 0;

                if (json.linked_position_id != undefined) {
                    action = "Order Filled (Close Position)";

                    related = events.findLast((e) => e.position_id === json.linked_position_id && e.market === market);
                    // the "Place Order" is emit after Order Filled if filled immediately
                    const relatedRawEvent = raw_events.find((e) => {
                        const type: string = e.contents.type.repr;
                        const [pkg, mod, name] = type.split("::");
                        return name === related?.typeName && e.transactionBlock.digest === related?.tx_digest && related?.order_id === json.order_id
                    });
                    if (relatedRawEvent?.contents?.json?.reduce_only === false) {
                        action = "Order Filled (Increase Position)";
                    }

                    if (realized_pnl > 0) {
                        collateral = (realized_amount - realized_trading_fee) / 10 ** assetToDecimal(collateral_token)!;
                    }
                } else {
                    action = "Order Filled (Open Position)";
                    related = events.findLast((e) => e.order_id === json.order_id && e.market === market);
                    collateral = related?.collateral;
                }

                var e: Event = {
                    action,
                    typeName: name,
                    order_id: json.order_id,
                    position_id: json.linked_position_id ?? json.new_position_id,
                    market,
                    side: json.position_side ? "Long" : "Short",
                    order_type: related?.order_type,
                    status: "Filled",
                    size,
                    base_token,
                    collateral, // TODO: check for option collateral
                    collateral_token,
                    price: Number(price) / 10 ** 8, // WARNING: fixed decimal
                    realized_pnl,
                    timestamp,
                    tx_digest,
                    dov_index: related?.dov_index,
                    sender: "user",
                };
                events.push(e);
                break;

            case RemovePositionEvent.$typeName.split("::")[2]:
                // same tx with order filled
                var index = events.findLastIndex((e) => e.tx_digest == tx_digest && e.action == "Order Filled (Close Position)");
                // console.log(index);
                if (index !== -1) {
                    // true => user paid to pool
                    let remaining_collateral_amount =
                        json.remaining_collateral_amount / 10 ** assetToDecimal(events[index].collateral_token)!;

                    events[index] = {
                        ...events[index],
                        collateral: remaining_collateral_amount + (events[index].collateral ?? 0),
                    };
                }
                break;

            case RealizeFundingEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.symbol.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.find((e) => e.position_id === json.position_id && e.market === market);

                // if realized_funding_sign is true, user pays to pool
                let realized_funding_fee = json.realized_funding_sign
                    ? -json.realized_funding_fee / 10 ** assetToDecimal(collateral_token)!
                    : json.realized_funding_fee / 10 ** assetToDecimal(collateral_token)!;

                let realized_funding_fee_usd = json.realized_funding_sign
                    ? -json.realized_funding_fee_usd / 10 ** 9
                    : json.realized_funding_fee_usd / 10 ** 9;

                // same tx with order filled
                var index = events.findLastIndex((e) => e.tx_digest == tx_digest && e.action == "Order Filled (Close Position)");
                // console.log(index);
                if (index !== -1) {
                    // true => user paid to pool
                    events[index] = {
                        ...events[index],
                        collateral: events[index].collateral ?? 0 - realized_funding_fee,
                        realized_pnl: events[index].realized_pnl ?? 0 - realized_funding_fee_usd,
                    };
                }

                var e: Event = {
                    action: "Realize Funding",
                    typeName: name,
                    order_id: undefined,
                    position_id: json.position_id,
                    market,
                    side: related?.side,
                    order_type: related?.order_type,
                    status: "Filled",
                    size: related?.size,
                    base_token,
                    collateral: realized_funding_fee,
                    collateral_token,
                    price: undefined,
                    realized_pnl: realized_funding_fee_usd,
                    timestamp,
                    tx_digest,
                    dov_index: related?.dov_index,
                    sender: "user",
                };
                events.push(e);
                break;

            case CancelTradingOrderEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.findLast((e) => e.order_id === json.order_id && e.market === market);

                var e: Event = {
                    action: "Cancel Order",
                    typeName: name,
                    order_id: json.order_id,
                    position_id: related?.position_id,
                    market,
                    side: related?.side,
                    order_type: related?.order_type,
                    status: "Canceled",
                    size: related?.size,
                    base_token,
                    collateral: Number(json.released_collateral_amount) / 10 ** assetToDecimal(collateral_token)!, // WARNING: fixed decimal
                    collateral_token,
                    price: Number(json.trigger_price) / 10 ** 8, // WARNING: fixed decimal
                    realized_pnl: undefined,
                    timestamp,
                    tx_digest,
                    dov_index: related?.dov_index,
                    sender: "user",
                };
                events.push(e);
                break;

            case IncreaseCollateralEvent.$typeName.split("::")[2]:
            case ReleaseCollateralEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.find((e) => e.position_id === json.position_id && e.market === market);

                var collateral: number | undefined;
                if (json.increased_collateral_amount) {
                    collateral = Number(json.increased_collateral_amount) * -1;
                } else {
                    collateral = Number(json.released_collateral_amount);
                }

                var e: Event = {
                    action: "Modify Collateral",
                    typeName: name,
                    order_id: undefined,
                    position_id: json.position_id,
                    market,
                    side: !related
                        ? undefined
                        : related.action === "Order Filled (Open Position)"
                            ? related.side
                            : related.side === "Long"
                                ? "Short"
                                : "Long",
                    order_type: related?.order_type,
                    status: "Filled",
                    size: related?.size,
                    base_token,
                    collateral: collateral / 10 ** assetToDecimal(collateral_token)!, // WARNING: fixed decimal
                    collateral_token,
                    price: related?.price,
                    realized_pnl: undefined,
                    timestamp,
                    tx_digest,
                    dov_index: related?.dov_index,
                    sender: "user",
                };
                events.push(e);
                break;

            case SwapEvent.$typeName.split("::")[2]:
                var from_token = typeArgToAsset(json.from_token_type.name) as TOKEN;
                var to_token = typeArgToAsset(json.to_token_type.name) as TOKEN;

                var from_price = Number(json.oracle_price_from_token);
                var to_price = Number(json.oracle_price_to_token);

                var e: Event = {
                    action: "Swap",
                    typeName: name,
                    order_id: undefined,
                    position_id: undefined,
                    market: `${from_token}/${to_token}`,
                    side: undefined,
                    order_type: "Market",
                    status: "Filled",
                    size: Number(json.actual_to_amount) / 10 ** assetToDecimal(to_token)!,
                    base_token: to_token,
                    collateral: Number(json.from_amount) / 10 ** assetToDecimal(from_token)!,
                    collateral_token: from_token,
                    price: from_price / to_price,
                    realized_pnl: -Number(json.fee_amount_usd) / 10 ** 9,
                    timestamp,
                    tx_digest,
                    dov_index: undefined,
                    sender: "user",
                };
                events.push(e);
                break;
        }
    });

    // console.log(events);
    return events;

    // CreateTradingOrderEvent => Place Order
    //      filled => market order
    //      reduce_only & !is_stop_order  => TP
    //      reduce_only & is_stop_order  => SL

    // CancelTradingOrderEvent => Cancel Order
    // OrderFilledEvent (position) => Order Filled (Open Position/ Close Position)

    // ManagerCloseOptionPosition => Exercise Position
    // RealizedPnlEvent
    // RealizeFundingEvent
    // LiquidateEvent + RemovePositionEvent => Liquidation
    //

    // SwapEvent => Swap
}

export async function getGraphQLEvents(module: string, sender: string | null, beforeCursor: string | null = null) {
    let before = "";
    if (beforeCursor) {
        before = `before: "${beforeCursor}",`;
    }
    let senderFilter = "";
    if (sender) {
        senderFilter = `sender: "${sender}"`;
    }
    var graphql = JSON.stringify({
        query: `
        {
        events(
          last: 50,
          ${before}
          filter: {
            eventType: "${module}",
            ${senderFilter}
            }
        ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges { cursor }
          nodes {
            transactionBlock { digest }
            sendingModule {
              name
              package { digest }
            }
            sender { address }
            timestamp
            contents {
              type { repr }
              json
            }
          }
        }}
          `,
    });

    let response = await fetch(`https://sui-${NETWORK.toLowerCase()}.mystenlabs.com/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: graphql,
    });

    // console.log(response);

    if (response.ok) {
        let data = await response.json();
        // console.log(data.data.events.pageInfo);
        return data.data.events;
    }
}

export async function getLiquidateFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("Liquidate", userAddress, startTimestamp.toString());
    // console.log(datas);
    let liquidate = datas.map((x) => {
        let collateral = Number(x.liquidator_fee) + Number(x.value_for_lp_pool);
        let base_token = toToken(x.base_token);
        let txHistory: Event = {
            action: "Liquidation",
            typeName: "LiquidateEvent",
            order_id: x.order_id,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: undefined,
            order_type: "Market",
            status: "Filled",
            size: Number(x.position_size),
            base_token,
            collateral,
            collateral_token: x.collateral_token,
            price: Number(x.trading_price),
            realized_pnl: -collateral * Number(x.collateral_price),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
            dov_index: undefined,
            sender: "cranker",
        };

        return txHistory;
    });

    liquidate = liquidate.map((x) => {
        let related = events.find((e) => e.position_id == x.position_id && e.market == x.market);
        // console.log(x);
        // console.log(related);
        if (related) {
            x.side = related.side;
            x.dov_index = related.dov_index;
        }
        return x;
    });
    // console.log(liquidate);
    events = events.concat(liquidate);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

export async function getRealizeFundingFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("RealizeFunding", userAddress, startTimestamp.toString());
    // console.log(datas);
    let realizeFunding = datas.map((x) => {
        let base_token = toToken(x.base_token);
        let txHistory: Event = {
            action: "Realize Funding",
            typeName: "RealizeFundingEvent",
            order_id: undefined,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: undefined,
            order_type: undefined,
            status: "Filled",
            size: undefined,
            base_token,
            collateral: -Number(x.realized_funding_fee),
            collateral_token: x.collateral_token,
            price: undefined,
            realized_pnl: -Number(x.realized_funding_fee_usd),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
            dov_index: undefined,
            sender: "cranker",
        };

        return txHistory;
    });

    // deduplicate
    realizeFunding = realizeFunding.filter(
        (x) => events.findIndex((y) => y.tx_digest == x.tx_digest && y.action == "Realize Funding") == -1
    );
    realizeFunding = realizeFunding.map((x) => {
        // find related position
        var related = events.find((e) => e.position_id === x.position_id && e.market === x.market);
        // console.log(x, related);
        if (related) {
            x.side = related.side;
            x.order_type = related.order_type;
            x.size = related.size;
            x.dov_index = related.dov_index;
        }

        // same tx with order filled
        var index = events.findLastIndex((e) => e.tx_digest == x.tx_digest && e.action == "Order Filled (Close Position)");
        // console.log(index);
        if (index !== -1) {
            // true => user paid to pool
            events[index] = {
                ...events[index],
                collateral: (events[index].collateral ?? 0) - (x.collateral ?? 0),
                realized_pnl: (events[index].realized_pnl ?? 0) - (x.realized_pnl ?? 0),
            };
        }

        return x;
    });
    // console.log(realizeFunding);
    events = events.concat(realizeFunding);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

export async function getRemovePositionFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("RemovePosition", userAddress, startTimestamp.toString());
    // console.log(datas);
    datas.forEach((x) => {
        // console.log(x);
        // same tx with order filled
        var index = events.findLastIndex((e) => e.tx_digest == x.transaction_hash && e.action == "Force Close Position");
        // console.log(index);
        if (index !== -1) {
            // true => user paid to pool
            let remaining_collateral_amount = x.remaining_collateral_amount;
            events[index] = {
                ...events[index],
                collateral: remaining_collateral_amount + Math.max(0, events[index].collateral!),
            };
        }
    });

    return events;
}

export async function getCancelOrderFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("CancelOrder", userAddress, startTimestamp.toString(), true);
    // console.log(datas);
    let cancelOrder = datas.map((x) => {
        let collateral = Number(x.released_collateral_amount);
        let base_token = toToken(x.base_token);
        let txHistory: Event = {
            action: "Force Cancel Order",
            typeName: "CancelTradingOrderEvent",
            order_id: x.order_id,
            position_id: undefined,
            market: `${base_token}/USD`,
            side: undefined,
            order_type: undefined,
            status: "Canceled",
            size: undefined,
            base_token,
            collateral,
            collateral_token: x.collateral_token,
            price: undefined,
            realized_pnl: undefined,
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
            dov_index: undefined,
            sender: "cranker",
        };

        return txHistory;
    });

    // no duplicate
    cancelOrder = cancelOrder.map((x) => {
        // find related order
        let related = events.findLast((e) => e.order_id == x.order_id && e.market == x.market);
        // console.log(x, related);
        if (related) {
            x.position_id = related.position_id;
            x.side = related.side;
            x.order_type = related.order_type;
            x.size = related.size;
            x.price = related.price;
        }
        return x;
    });
    // console.log(cancelOrder);
    events = events.concat(cancelOrder);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

export async function getOrderMatchFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("OrderFilled", userAddress, startTimestamp.toString(), true);
    // console.log(datas);
    let order_match = datas.map((x) => {
        let base_token = toToken(x.base_token);

        let txHistory: Event = {
            action:
                x.order_type == "Open"
                    ? "Order Filled (Open Position)"
                    : x.sender == "0x978f65df8570a075298598a9965c18de9087f9e888eb3430fe20334f5c554cfd"
                        ? "Force Close Position"
                        : "Order Filled (Close Position)",
            typeName: "OrderFilledEvent",
            order_id: x.order_id,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: x.side,
            order_type: undefined,
            status: "Filled",
            size: Number(x.filled_size),
            base_token,
            collateral: Number(x.realized_amount) - Number(x.realized_fee),
            collateral_token: x.collateral_token,
            price: Number(x.filled_price),
            realized_pnl: Number(x.realized_pnl),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
            dov_index: undefined,
            sender: x.is_cranker ? "cranker" : "user",
        };

        return txHistory;
    });

    // deduplicate
    order_match = order_match.filter((x) => events.findIndex((y) => y.tx_digest == x.tx_digest) == -1);
    order_match = order_match.map((x) => {
        // find related order
        let related = events.findLast((e) => e.order_id == x.order_id && e.market == x.market);
        // console.log(x, related);
        if (related) {
            x.order_type = related.order_type;
            x.collateral = related.collateral;
            x.dov_index = related.dov_index;
        } else {
            x.order_type = "Market";
            let related = events.findLast((e) => e.position_id == x.position_id && e.market == x.market);
            x.dov_index = related?.dov_index;
        }
        return x;
    });
    // console.log(order_match);
    events = events.concat(order_match);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

export async function getRealizeOptionFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("RealizeOption", userAddress, startTimestamp.toString());
    // console.log(datas);

    let exercise = datas.map((x) => {
        let base_token = toToken(x.base_token);
        let txHistory: Event = {
            action: "Exercise Position",
            typeName: "RealizeOptionPositionEvent",
            order_id: undefined,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: undefined,
            order_type: "Market",
            status: "Filled",
            size: undefined,
            base_token,
            collateral: Number(x.user_remaining_value),
            collateral_token: x.collateral_token,
            price: undefined,
            realized_pnl: Number(x.user_remaining_in_usd),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
            dov_index: undefined,
            sender: "cranker",
        };

        // console.log(txHistory);
        return txHistory;
    });

    let filter_exercise = exercise.reduce((acc, x) => {
        let related_index = events.findLastIndex(
            (e) => e.position_id == x.position_id && e.market == x.market && e.tx_digest == x.tx_digest
        );
        // console.log(x);
        // console.log(related_index);
        if (related_index != -1) {
            let related = events[related_index];
            if (related.sender == "cranker") {
                x.side = related.side;
                x.size = related.size;
                x.dov_index = related.dov_index;

                // add to close event
                related.collateral = Number(related.collateral ?? 0) + Number(x.collateral ?? 0);
                related.realized_pnl = Number(related.realized_pnl ?? 0) + Number(x.realized_pnl ?? 0);
                x.collateral = undefined;
                x.realized_pnl = undefined;

                acc.push(x);
            }
        }
        return acc;
    }, new Array<Event>());
    // console.log(filter_exercise);

    events = events.concat(filter_exercise);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

// export function toRecentTrades(events: Event[]): Event[] {
//     let trades: Event[] = [];

//     for (let event of events) {
//         if (event.action == "Place Order") {
//             trades.push(event);
//         } else if (event.action == "Order Filled (Close Position)") {
//             if (trades[trades.length - 1].tx_digest == event.tx_digest) {
//                 trades[trades.length - 1].realized_pnl = event.realized_pnl;
//             }
//         }
//     }

//     return trades;
// }

// getOrderMatchFromSentio("0x95f26ce574fc9ace2608807648d99a4dce17f1be8964613d5b972edc82849e9e", 0);
// getRealizeOptionFromSentio("0x95f26ce574fc9ace2608807648d99a4dce17f1be8964613d5b972edc82849e9e", 0);

function toToken(name: string): TOKEN {
    switch (name) {
        case "BTC":
        case "ETH":
        case "SOL":
        case "APT":
            return `w${name}` as TOKEN;
        case "WUSDC":
            return "wUSDC";
        default:
            return name as TOKEN;
    }
}

export function toSentioToken(name: TOKEN): string {
    switch (name) {
        case "WBTC":
            return "BTC";
        case "wETH":
            return "ETH";
        case "wSOL":
            return "SOL";
        case "wAPT":
            return "APT";
        case "wUSDC":
            return "USDC";
        default:
            return name;
    }
}
