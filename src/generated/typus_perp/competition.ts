/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** The `competition` module defines the logic for trading competitions. */

import { MoveStruct } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as object from "./deps/sui/object";
const $moduleName = "@typus/perp::competition";
export const CompetitionConfig = new MoveStruct({
    name: `${$moduleName}::CompetitionConfig`,
    fields: {
        id: object.UID,
        /** The boost in basis points for each staking level. */
        boost_bp: bcs.vector(bcs.u64()),
        /** Whether the competition is active. */
        is_active: bcs.bool(),
        /** The name of the program. */
        program_name: bcs.string(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
