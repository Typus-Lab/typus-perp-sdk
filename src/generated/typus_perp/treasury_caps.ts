/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `treasury_caps` module defines the `TreasuryCaps` struct, which is a shared
 * object that stores the treasury caps for the TLP tokens.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
const $moduleName = "@typus/perp::treasury_caps";
export const TreasuryCaps = new MoveStruct({
    name: `${$moduleName}::TreasuryCaps`,
    fields: {
        id: object.UID,
    },
});
export interface InitOptions {
    package?: string;
    arguments?: [];
}
export function init(options: InitOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "treasury_caps",
            function: "init",
        });
}
export interface GetMutTreasuryCapArguments {
    treasuryCaps: RawTransactionArgument<string>;
}
export interface GetMutTreasuryCapOptions {
    package?: string;
    arguments: GetMutTreasuryCapArguments | [treasuryCaps: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Gets a mutable reference to a treasury cap. WARNING: no authority check inside */
export function getMutTreasuryCap(options: GetMutTreasuryCapOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::treasury_caps::TreasuryCaps`] satisfies string[];
    const parameterNames = ["treasuryCaps"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "treasury_caps",
            function: "get_mut_treasury_cap",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerStoreTreasuryCapArguments {
    version: RawTransactionArgument<string>;
    treasuryCaps: RawTransactionArgument<string>;
    treasuryCap: RawTransactionArgument<string>;
}
export interface ManagerStoreTreasuryCapOptions {
    package?: string;
    arguments:
        | ManagerStoreTreasuryCapArguments
        | [
              version: RawTransactionArgument<string>,
              treasuryCaps: RawTransactionArgument<string>,
              treasuryCap: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function managerStoreTreasuryCap(options: ManagerStoreTreasuryCapOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::treasury_caps::TreasuryCaps`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::TreasuryCap<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "treasuryCaps", "treasuryCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "treasury_caps",
            function: "manager_store_treasury_cap",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
