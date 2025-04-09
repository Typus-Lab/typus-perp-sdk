import { assetToDecimal, TOKEN, typeArgToAsset } from "@typus/typus-sdk/dist/src/constants";
import { PKG_V1 as PERP_PACKAGE_ID } from "../typus_perp/index";
import { OrderFilledEvent, RealizeFundingEvent } from "../typus_perp/position/structs";
import {
    CancelTradingOrderEvent,
    CreateTradingOrderEvent,
    CreateTradingOrderWithBidReceiptsEvent,
    IncreaseCollateralEvent,
    ReleaseCollateralEvent,
} from "../typus_perp/trading/structs";
import { SwapEvent } from "src/typus_perp/lp-pool/structs";
import { getFromSentio } from "src/api/sentio";
import { NETWORK } from "src";

export type actionType =
    | "Place Order"
    | "Cancel Order"
    | "Order Filled (Open Position)"
    | "Order Filled (Close Position)"
    | "Realized PnL"
    | "Modify Collateral"
    | "Exercise Position"
    | "Liquidation"
    | "Force Close Position"
    | "Swap";

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
                var collateral: number;
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

                related = events.find((e) => e.position_id == json.linked_position_id && e.market == market);

                var e: Event = {
                    action: "Place Order",
                    typeName: name,
                    order_id: json.order_id,
                    position_id: json.linked_position_id,
                    market,
                    side: related ? related.side : json.is_long ? "Long" : "Short",
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

                if (json.linked_position_id) {
                    action = "Order Filled (Close Position)";
                    related = events.findLast((e) => e.position_id === json.linked_position_id && e.market === market);
                    // the "Place Order" is emit after Order Filled if filled immediately
                } else {
                    action = "Order Filled (Open Position)";
                    related = events.findLast((e) => e.order_id === json.order_id && e.market === market);
                }

                var realized_trading_fee = Number(json.realized_trading_fee) + Number(json.realized_borrow_fee);
                var realized_fee_in_usd = Number(json.realized_fee_in_usd) / 10 ** 9;
                var realized_amount = json.realized_amount_sign ? Number(json.realized_amount) : -Number(json.realized_amount);
                var realized_pnl =
                    realized_trading_fee > 0 ? ((realized_amount - realized_trading_fee) * realized_fee_in_usd) / realized_trading_fee : 0;

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
                    collateral: related?.collateral,
                    collateral_token,
                    price: Number(price) / 10 ** 8, // WARNING: fixed decimal
                    realized_pnl,
                    timestamp,
                    tx_digest,
                };
                events.push(e);
                break;

            case RealizeFundingEvent.$typeName.split("::")[2]:
                // same tx with order filled
                const index = events.findLastIndex((e) => e.tx_digest == tx_digest);
                // console.log(index);
                if (index !== -1) {
                    // true => user paid to pool
                    let x = json.realized_funding_sign ? json.realized_funding_fee_usd / 10 ** 9 : -json.realized_funding_fee_usd / 10 ** 9;
                    events[index] = {
                        ...events[index],
                        realized_pnl: (events[index].realized_pnl ?? 0) - x,
                    };
                }
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
                };
                events.push(e);
                break;

            case IncreaseCollateralEvent.$typeName.split("::")[2]:
            case ReleaseCollateralEvent.$typeName.split("::")[2]:
                var base_token = typeArgToAsset(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToAsset(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.findLast((e) => e.position_id === json.position_id && e.market === market);

                var collateral: number;
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
                    side: related?.side,
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

export async function getGraphQLEvents(module: string, sender: string, beforeCursor: string | null = null) {
    let before = "";
    if (beforeCursor) {
        before = `before: "${beforeCursor}",`;
    }
    var graphql = JSON.stringify({
        query: `
        {
        events(
          last: 50,
          ${before}
          filter: {
            eventType: "${module}",
            sender: "${sender}"
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
        let base_token = toToken(x.trading_token);
        let txHistory: Event = {
            action: "Liquidation",
            typeName: "LiquidateEvent",
            order_id: x.order_id,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: undefined,
            order_type: "Market",
            status: "Filled",
            size: x.position_size,
            base_token,
            collateral,
            collateral_token: x.collateral_token,
            price: x.trading_price,
            realized_pnl: -collateral * Number(x.collateral_price),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
        };

        return txHistory;
    });

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
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

export async function getOrderMatchFromSentio(userAddress: string, startTimestamp: number, events: Event[]): Promise<Event[]> {
    const datas = await getFromSentio("OrderFilled", userAddress, startTimestamp.toString());
    // console.log(datas);
    let order_match = datas.map((x) => {
        let base_token = toToken(x.trading_token);
        let txHistory: Event = {
            action: x.order_type == "Open" ? "Order Filled (Open Position)" : "Order Filled (Close Position)",
            typeName: "OrderFilledEvent",
            order_id: x.order_id,
            position_id: x.position_id,
            market: `${base_token}/USD`,
            side: x.side,
            order_type: undefined,
            status: "Filled",
            size: x.filled_size,
            base_token,
            collateral: undefined,
            collateral_token: x.collateral_token,
            price: x.filled_price,
            realized_pnl: x.realized_pnl,
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
        };

        return txHistory;
    });

    // deduplicate
    order_match = order_match.filter((x) => events.findIndex((y) => y.tx_digest == x.tx_digest) == -1);
    order_match = order_match.map((x) => {
        let related = events.findLast((e) => e.order_id == x.order_id && e.market == x.market);
        // console.log(x, related);
        if (related) {
            x.order_type = related.order_type;
            x.collateral = related.collateral;
        } else {
            x.order_type = "Market";
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
            collateral: Number(x.exercise_balance_value),
            collateral_token: x.collateral_token,
            price: undefined,
            realized_pnl: Number(x.user_remaining_in_usd),
            timestamp: x.timestamp,
            tx_digest: x.transaction_hash,
        };

        // console.log(txHistory);
        return txHistory;
    });

    exercise = exercise.map((x) => {
        let related = events.findLast((e) => e.position_id == x.position_id && e.market == x.market);
        // console.log(x);
        // console.log(related);
        if (related) {
            x.side = related.side;
            x.size = related.size;
        }
        return x;
    });
    // console.log(exercise);
    events = events.concat(exercise);
    events = events.sort((a, b) => Number(new Date(a.timestamp)) - Number(new Date(b.timestamp)));
    return events;
}

// getOrderMatchFromSentio("0x95f26ce574fc9ace2608807648d99a4dce17f1be8964613d5b972edc82849e9e", 0);
// getRealizeOptionFromSentio("0x95f26ce574fc9ace2608807648d99a4dce17f1be8964613d5b972edc82849e9e", 0);

function toToken(name: string): TOKEN {
    switch (name) {
        case "BTC":
        case "ETH":
        case "SOL":
        case "APT":
            return `w${name}`;
        case "WUSDC":
            return "wUSDC";
        default:
            return name as TOKEN;
    }
}
