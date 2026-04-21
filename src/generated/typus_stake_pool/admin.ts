/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `admin` module provides administrative functionalities for the Typus Stake
 * Pool. It includes version management, authority control, and fee handling.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as vec_set from "./deps/sui/vec_set.js";
const $moduleName = "@typus/stake-pool::admin";
export const Version = new MoveStruct({
    name: `${$moduleName}::Version`,
    fields: {
        id: bcs.Address,
        /** The version number. */
        value: bcs.u64(),
        /** The list of authorized addresses. */
        authority: vec_set.VecSet(bcs.Address),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export interface VersionCheckArguments {
    version: RawTransactionArgument<string>;
}
export interface VersionCheckOptions {
    package?: string;
    arguments: VersionCheckArguments | [version: RawTransactionArgument<string>];
}
/** Checks if the contract version is valid. */
export function versionCheck(options: VersionCheckOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "version_check",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpgradeArguments {
    version: RawTransactionArgument<string>;
}
export interface UpgradeOptions {
    package?: string;
    arguments: UpgradeArguments | [version: RawTransactionArgument<string>];
}
/** Upgrades the contract version. WARNING: no authority check inside */
export function upgrade(options: UpgradeOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "upgrade",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface InitOptions {
    package?: string;
    arguments?: [];
}
/** Initializes the contract. */
export function init(options: InitOptions = {}) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "init",
        });
}
export interface VerifyArguments {
    version: RawTransactionArgument<string>;
}
export interface VerifyOptions {
    package?: string;
    arguments: VerifyArguments | [version: RawTransactionArgument<string>];
}
/** [Authorized Function] Verifies if the sender is an authorized user. */
export function verify(options: VerifyOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "verify",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddAuthorizedUserArguments {
    version: RawTransactionArgument<string>;
    userAddress: RawTransactionArgument<string>;
}
export interface AddAuthorizedUserOptions {
    package?: string;
    arguments: AddAuthorizedUserArguments | [version: RawTransactionArgument<string>, userAddress: RawTransactionArgument<string>];
}
/** [Authorized Function] Adds an authorized user. */
export function addAuthorizedUser(options: AddAuthorizedUserOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "address"] satisfies (string | null)[];
    const parameterNames = ["version", "userAddress"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "add_authorized_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveAuthorizedUserArguments {
    version: RawTransactionArgument<string>;
    userAddress: RawTransactionArgument<string>;
}
export interface RemoveAuthorizedUserOptions {
    package?: string;
    arguments: RemoveAuthorizedUserArguments | [version: RawTransactionArgument<string>, userAddress: RawTransactionArgument<string>];
}
/** [Authorized Function] Removes an authorized user. */
export function removeAuthorizedUser(options: RemoveAuthorizedUserOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "address"] satisfies (string | null)[];
    const parameterNames = ["version", "userAddress"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "remove_authorized_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface InstallEcosystemManagerCapEntryArguments {
    version: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
}
export interface InstallEcosystemManagerCapEntryOptions {
    package?: string;
    arguments:
        | InstallEcosystemManagerCapEntryArguments
        | [version: RawTransactionArgument<string>, typusEcosystemVersion: RawTransactionArgument<string>];
}
/**
 * [Authorized Function] Installs the ecosystem manager cap. TODO: can be remove
 * after install
 */
export function installEcosystemManagerCapEntry(options: InstallEcosystemManagerCapEntryOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null] satisfies (string | null)[];
    const parameterNames = ["version", "typusEcosystemVersion"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "install_ecosystem_manager_cap_entry",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddTailsExpAmountArguments {
    version: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
}
export interface AddTailsExpAmountOptions {
    package?: string;
    arguments:
        | AddTailsExpAmountArguments
        | [
              version: RawTransactionArgument<string>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              amount: RawTransactionArgument<number | bigint>,
          ];
}
/** Adds tails experience points to a user. */
export function addTailsExpAmount(options: AddTailsExpAmountOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, null, "address", "u64"] satisfies (string | null)[];
    const parameterNames = ["version", "typusEcosystemVersion", "typusUserRegistry", "user", "amount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "add_tails_exp_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
