/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct } from "../../../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as object from "../sui/object";
const $moduleName = "typus_framework::vault";
export const TypusBidReceipt = new MoveStruct({
    name: `${$moduleName}::TypusBidReceipt`,
    fields: {
        id: object.UID,
        vid: bcs.Address,
        index: bcs.u64(),
        metadata: bcs.string(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
