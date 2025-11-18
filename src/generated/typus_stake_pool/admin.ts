/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `admin` module provides administrative functionalities for the Typus Stake
 * Pool. It includes version management, authority control, and fee handling.
 */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as type_name from "./deps/std/type_name";
import * as object from "./deps/sui/object";
import * as vec_set from "./deps/sui/vec_set";
const $moduleName = "@typus/stake-pool::admin";
export const FeeInfo = new MoveStruct({
    name: `${$moduleName}::FeeInfo`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of fees collected. */
        value: bcs.u64(),
    },
});
export const FeePool = new MoveStruct({
    name: `${$moduleName}::FeePool`,
    fields: {
        id: object.UID,
        /** A vector of `FeeInfo` structs. */
        fee_infos: bcs.vector(FeeInfo),
    },
});
export const Version = new MoveStruct({
    name: `${$moduleName}::Version`,
    fields: {
        id: object.UID,
        /** The version number. */
        value: bcs.u64(),
        /** The fee pool for protocol fees. */
        fee_pool: FeePool,
        /** The fee pool for liquidator fees. */
        liquidator_fee_pool: FeePool,
        /** The list of authorized addresses. */
        authority: vec_set.VecSet(bcs.Address),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SendFeeEvent = new MoveStruct({
    name: `${$moduleName}::SendFeeEvent`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of fees sent. */
        amount: bcs.u64(),
    },
});
