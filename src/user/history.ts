import { assetToDecimal, TOKEN, typeArgToToken } from "@typus/typus-sdk/dist/src/constants";
import { PKG_V1 as PERP_PACKAGE_ID } from "../typus_perp/index";
import { OrderFilledEvent } from "../typus_perp/position/structs";
import {
    CancelTradingOrderEvent,
    CreateTradingOrderEvent,
    CreateTradingOrderWithBidReceiptsEvent,
    IncreaseCollateralEvent,
    ReleaseCollateralEvent,
} from "../typus_perp/trading/structs";
import { SwapEvent } from "src/typus_perp/lp-pool/structs";

type actionType =
    | "Place Order"
    | "Cancel Order"
    | "Order Filled (Open Position)"
    | "Order Filled (Close Position)"
    | "Modify Collateral"
    | "Exercise Position"
    | "Liquidation"
    | "Force Close Position "
    | "Swap";

type sideType = "Long" | "Short";

type orderType = "Market" | "Limit" | "Take Profit" | "Stop Loss";

type statusType = "Open" | "Filled" | "Canceled";

interface Event {
    action: actionType;
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
    realized_pnl: number | undefined;
    timestamp: string;
    tx_digest: string;
}

export async function getUserHistory(sender: string) {
    const raw_events = await getGraphQLEvents(PERP_PACKAGE_ID, sender);

    const pageInfo = raw_events.pageInfo;
    console.log(pageInfo);
    // for pagination

    const events: Event[] = [];

    raw_events.nodes.forEach((event) => {
        const type = event.contents.type.repr;
        if (type.endsWith("PythPrice")) {
            return;
        }
        const json = event.contents.json;
        const timestamp = event.timestamp;
        const tx_digest = event.transactionBlock.digest;
        // console.log(type);
        // console.log(json);
        // console.log(timestamp);

        switch (type) {
            case CreateTradingOrderEvent.$typeName:
            case CreateTradingOrderWithBidReceiptsEvent.$typeName:
                var base_token = typeArgToToken(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToToken(json.collateral_token.name) as TOKEN;
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

                var e: Event = {
                    action: "Place Order",
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
                };
                events.push(e);
                break;

            case OrderFilledEvent.$typeName:
                var base_token = typeArgToToken(json.symbol.base_token.name) as TOKEN;
                var collateral_token = typeArgToToken(json.collateral_token.name) as TOKEN;
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

                var e: Event = {
                    action,
                    order_id: json.order_id,
                    position_id: json.linked_position_id ?? json.new_position_id,
                    market,
                    side: related?.side,
                    order_type: related?.order_type,
                    status: json.filled ? "Filled" : "Open",
                    size,
                    base_token,
                    collateral: related?.collateral,
                    collateral_token,
                    price: Number(price) / 10 ** 8, // WARNING: fixed decimal
                    realized_pnl: (0 - realized_trading_fee) / 10 ** assetToDecimal(base_token)!,
                    timestamp,
                    tx_digest,
                };
                events.push(e);
                break;

            case CancelTradingOrderEvent.$typeName:
                var base_token = typeArgToToken(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToToken(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.findLast((e) => e.order_id === json.order_id && e.market === market);

                var e: Event = {
                    action: "Cancel Order",
                    order_id: json.order_id,
                    position_id: undefined,
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

            case IncreaseCollateralEvent.$typeName:
            case ReleaseCollateralEvent.$typeName:
                var base_token = typeArgToToken(json.base_token.name) as TOKEN;
                var collateral_token = typeArgToToken(json.collateral_token.name) as TOKEN;
                var market = `${base_token}/USD`;
                var related = events.findLast((e) => e.position_id === json.position_id && e.market === market);

                var collateral: number;
                if (json.increased_collateral_amount) {
                    collateral = Number(json.increased_collateral_amount);
                } else {
                    collateral = Number(json.released_collateral_amount) * -1;
                }

                var e: Event = {
                    action: "Modify Collateral",
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

            case SwapEvent.$typeName:
                var from_token = typeArgToToken(json.from_token_type.name) as TOKEN;
                var to_token = typeArgToToken(json.to_token_type.name) as TOKEN;

                var from_price = Number(json.oracle_price_from_token);
                var to_price = Number(json.oracle_price_to_token);

                var e: Event = {
                    action: "Swap",
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
                    realized_pnl: -Number(json.fee_amount_usd) / 10 ** 6,
                    timestamp,
                    tx_digest,
                };
                events.push(e);
                break;
        }
    });

    console.log(events);

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
    var graphql = JSON.stringify({
        query: `
        {
        events(
          last: 50,
          before: ${beforeCursor ? `"${beforeCursor}"` : null},
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

    let response = await fetch(`https://sui-testnet.mystenlabs.com/graphql`, {
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
