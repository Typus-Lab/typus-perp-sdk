/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * This module implements a `LinkedObjectTable`, which is similar to
 * `sui::linked_table` but stores its values as dynamic object fields. This allows
 * the values to be objects themselves, which can be useful for storing complex
 * data structures. The table maintains a doubly-linked list of its entries,
 * allowing for efficient iteration in both forward and reverse order.
 */

import { type BcsType, bcs } from "@mysten/sui/bcs";
import { MoveStruct } from "../../../utils/index";
import * as object from "../sui/object";
const $moduleName = "typus::linked_object_table";
/**
 * A doubly-linked list of key-value pairs where values are stored as dynamic
 * object fields.
 */
export function LinkedObjectTable<K extends BcsType<any>>(...typeParameters: [K]) {
    return new MoveStruct({
        name: `${$moduleName}::LinkedObjectTable<${typeParameters[0].name as K["name"]}>`,
        fields: {
            /** The UID for storing the nodes of the linked list. */
            id: object.UID,
            /** The UID for storing the values as dynamic object fields. */
            vid: object.UID,
            /** The number of key-value pairs in the table. */
            size: bcs.u64(),
            /** The key of the first entry in the table. */
            head: bcs.option(typeParameters[0]),
            /** The key of the last entry in the table. */
            tail: bcs.option(typeParameters[0]),
        },
    });
}
