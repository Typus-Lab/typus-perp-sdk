/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * This module implements a `KeyedBigVector`, a data structure that combines the
 * features of a `BigVector` and a `Table`. It allows for both indexed and keyed
 * access to a large number of elements by storing them in slices, while
 * maintaining a mapping from keys to indices in a `Table`.
 */

import { MoveStruct } from "../../../utils/index";
import { bcs } from "@mysten/sui/bcs";
import * as object from "../sui/object";
import * as type_name from "../std/type_name";
const $moduleName = "typus::keyed_big_vector";
export const KeyedBigVector = new MoveStruct({
    name: `${$moduleName}::KeyedBigVector`,
    fields: {
        /** The unique identifier of the KeyedBigVector object. */
        id: object.UID,
        /** The type name of the keys. */
        key_type: type_name.TypeName,
        /** The type name of the values. */
        value_type: type_name.TypeName,
        /** The index of the latest slice. */
        slice_idx: bcs.u16(),
        /** The maximum size of each slice. */
        slice_size: bcs.u32(),
        /** The total number of elements in the KeyedBigVector. */
        length: bcs.u64(),
    },
});
