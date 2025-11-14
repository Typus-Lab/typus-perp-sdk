/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `treasury_caps` module defines the `TreasuryCaps` struct, which is a shared
 * object that stores the treasury caps for the TLP tokens.
 */

import { MoveStruct } from "../utils/index";
import * as object from "./deps/sui/object";
const $moduleName = "@typus/perp::treasury_caps";
export const TreasuryCaps = new MoveStruct({
    name: `${$moduleName}::TreasuryCaps`,
    fields: {
        id: object.UID,
    },
});
