/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `escrow` module defines the `UnsettledBidReceipt` struct and functions for
 * creating and destructing it. This is used to handle unsettled bids from
 * liquidations.
 */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as vault from "./deps/typus_framework/vault";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::escrow";
export const UnsettledBidReceipt = new MoveStruct({
    name: `${$moduleName}::UnsettledBidReceipt`,
    fields: {
        /** A vector of `TypusBidReceipt` structs. */
        receipt: bcs.vector(vault.TypusBidReceipt),
        /** The ID of the position. */
        position_id: bcs.u64(),
        /** The address of the user. */
        user: bcs.Address,
        /** A vector of the token types. */
        token_types: bcs.vector(type_name.TypeName),
        /** The sign of the unrealized PNL. */
        unrealized_pnl_sign: bcs.bool(),
        /** The unrealized PNL. */
        unrealized_pnl: bcs.u64(),
        /** The unrealized trading fee. */
        unrealized_trading_fee: bcs.u64(),
        /** The unrealized borrow fee. */
        unrealized_borrow_fee: bcs.u64(),
        /** The sign of the unrealized funding fee. */
        unrealized_funding_fee_sign: bcs.bool(),
        /** The unrealized funding fee. */
        unrealized_funding_fee: bcs.u64(),
        /** The unrealized liquidator fee. */
        unrealized_liquidator_fee: bcs.u64(),
    },
});
