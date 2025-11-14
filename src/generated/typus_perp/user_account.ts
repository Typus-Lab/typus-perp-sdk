/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `user_account` module defines the `UserAccount` and `UserAccountCap`
 * structs, and the logic for creating, updating, and using them.
 */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as object from "./deps/sui/object";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::user_account";
export const UserAccount = new MoveStruct({
    name: `${$moduleName}::UserAccount`,
    fields: {
        id: object.UID,
        /** The address of the owner of the user account. */
        owner: bcs.Address,
        /** A vector of the delegate users. */
        delegate_user: bcs.vector(bcs.Address),
        /** A vector of the symbols of the tokens in the user account. */
        symbols: bcs.vector(type_name.TypeName),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UserAccountCap = new MoveStruct({
    name: `${$moduleName}::UserAccountCap`,
    fields: {
        id: object.UID,
        /** The address of the owner of the user account. */
        owner: bcs.Address,
        /** The ID of the user account. */
        user_account_id: bcs.Address,
    },
});
