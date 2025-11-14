/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `symbol` module defines the `Symbol` struct, which represents a trading
 * pair.
 */

import { MoveStruct } from "../utils/index";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::symbol";
export const Symbol = new MoveStruct({
    name: `${$moduleName}::Symbol`,
    fields: {
        /** The base token of the trading pair. */
        base_token: type_name.TypeName,
        /** The quote token of the trading pair. */
        quote_token: type_name.TypeName,
    },
});
