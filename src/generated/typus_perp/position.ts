/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `position` module defines the `Position` and `TradingOrder` structs, and the
 * logic for creating, updating, and closing them. All of the functions are inner
 * package functions used in `trading.move`.
 */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as type_name from "./deps/std/type_name";
import * as object from "./deps/sui/object";
import * as symbol from "./symbol";
const $moduleName = "@typus/perp::position";
export const OptionCollateralInfo = new MoveStruct({
    name: `${$moduleName}::OptionCollateralInfo`,
    fields: {
        /** The index of the portfolio. */
        index: bcs.u64(),
        /** The type name of the bid token. */
        bid_token: type_name.TypeName,
        /** A vector of the BCS-serialized bid receipts. */
        bid_receipts_bcs: bcs.vector(bcs.vector(bcs.u8())),
    },
});
export const Position = new MoveStruct({
    name: `${$moduleName}::Position`,
    fields: {
        id: object.UID,
        /** The timestamp when the position was created. */
        create_ts_ms: bcs.u64(),
        /** The ID of the position. */
        position_id: bcs.u64(),
        /** A vector of the linked order IDs. */
        linked_order_ids: bcs.vector(bcs.u64()),
        /** A vector of the linked order prices. */
        linked_order_prices: bcs.vector(bcs.u64()),
        /** The address of the user. */
        user: bcs.Address,
        /** Whether the position is long. */
        is_long: bcs.bool(),
        /** The size of the position. */
        size: bcs.u64(),
        /** The number of decimals for the size. */
        size_decimal: bcs.u64(),
        /** The type name of the collateral token. */
        collateral_token: type_name.TypeName,
        /** The number of decimals for the collateral token. */
        collateral_token_decimal: bcs.u64(),
        /** The symbol of the trading pair. */
        symbol: symbol.Symbol,
        /** The amount of collateral. */
        collateral_amount: bcs.u64(),
        /** The amount of reserved collateral. */
        reserve_amount: bcs.u64(),
        /** The average price of the position. */
        average_price: bcs.u64(),
        /** The entry borrow index. */
        entry_borrow_index: bcs.u64(),
        /** The sign of the entry funding rate index. */
        entry_funding_rate_index_sign: bcs.bool(),
        /** The entry funding rate index. */
        entry_funding_rate_index: bcs.u64(),
        /** The unrealized loss. */
        unrealized_loss: bcs.u64(),
        /** The sign of the unrealized funding fee. */
        unrealized_funding_sign: bcs.bool(),
        /** The unrealized funding fee. */
        unrealized_funding_fee: bcs.u64(),
        /** The unrealized trading fee. */
        unrealized_trading_fee: bcs.u64(),
        /** The unrealized borrow fee. */
        unrealized_borrow_fee: bcs.u64(),
        /** The unrealized rebate. */
        unrealized_rebate: bcs.u64(),
        /** Information about the option collateral. */
        option_collateral_info: bcs.option(OptionCollateralInfo),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const TradingOrder = new MoveStruct({
    name: `${$moduleName}::TradingOrder`,
    fields: {
        id: object.UID,
        /** The timestamp when the order was created. */
        create_ts_ms: bcs.u64(),
        /** The ID of the order. */
        order_id: bcs.u64(),
        /** The ID of the linked position. */
        linked_position_id: bcs.option(bcs.u64()),
        /** The address of the user. */
        user: bcs.Address,
        /** The type name of the collateral token. */
        collateral_token: type_name.TypeName,
        /** The number of decimals for the collateral token. */
        collateral_token_decimal: bcs.u64(),
        /** The symbol of the trading pair. */
        symbol: symbol.Symbol,
        /** The leverage in mega basis points. */
        leverage_mbp: bcs.u64(),
        /** Whether the order is reduce-only. */
        reduce_only: bcs.bool(),
        /** Whether the order is long. */
        is_long: bcs.bool(),
        /** Whether the order is a stop order. */
        is_stop_order: bcs.bool(),
        /** The size of the order. */
        size: bcs.u64(),
        /** The number of decimals for the size. */
        size_decimal: bcs.u64(),
        /** The trigger price of the order. */
        trigger_price: bcs.u64(),
        /** The oracle price when the order was placed. */
        oracle_price_when_placing: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RemovePositionEvent = new MoveStruct({
    name: `${$moduleName}::RemovePositionEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        linked_order_ids: bcs.vector(bcs.u64()),
        linked_order_prices: bcs.vector(bcs.u64()),
        remaining_collateral_amount: bcs.u64(),
        realized_trading_fee_amount: bcs.u64(),
        realized_borrow_fee_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const OrderFilledEvent = new MoveStruct({
    name: `${$moduleName}::OrderFilledEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        order_id: bcs.u64(),
        linked_position_id: bcs.option(bcs.u64()),
        new_position_id: bcs.option(bcs.u64()),
        filled_size: bcs.u64(),
        filled_price: bcs.u64(),
        position_side: bcs.bool(),
        position_size: bcs.u64(),
        position_average_price: bcs.u64(),
        realized_trading_fee: bcs.u64(),
        realized_borrow_fee: bcs.u64(),
        realized_fee_in_usd: bcs.u64(),
        realized_amount: bcs.u64(),
        realized_amount_sign: bcs.bool(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RealizeFundingEvent = new MoveStruct({
    name: `${$moduleName}::RealizeFundingEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        position_id: bcs.u64(),
        realized_funding_sign: bcs.bool(),
        realized_funding_fee: bcs.u64(),
        realized_funding_fee_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
