/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * No authority chech in these public functions, do not let `DepositVault`
 * `BidVault` and `RefundVault` be exposed.
 */

import { MoveStruct } from "../../../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
const $moduleName = "typus_framework::vault";
export const TypusBidReceipt = new MoveStruct({
    name: `${$moduleName}::TypusBidReceipt`,
    fields: {
        id: bcs.Address,
        /** The ID of the `BidVault`. */
        vid: bcs.Address,
        /** The index of the vault. */
        index: bcs.u64(),
        /** Metadata for display purposes. */
        metadata: bcs.string(),
        /** Padding for additional u64 fields. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
