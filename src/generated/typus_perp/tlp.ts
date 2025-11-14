/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** The `tlp` module defines the TLP token and its associated functions. */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as object from "./deps/sui/object";
const $moduleName = "@typus/perp::tlp";
export const LpRegistry = new MoveStruct({
    name: `${$moduleName}::LpRegistry`,
    fields: {
        id: object.UID,
    },
});
export const TLP = new MoveStruct({
    name: `${$moduleName}::TLP`,
    fields: {
        dummy_field: bcs.bool(),
    },
});
