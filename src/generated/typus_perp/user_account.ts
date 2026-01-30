/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `user_account` module defines the `UserAccount` and `UserAccountCap`
 * structs, and the logic for creating, updating, and using them.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::user_account";
export const UserAccount = new MoveStruct({
    name: `${$moduleName}::UserAccount`,
    fields: {
        id: object.UID,
        /** The address of the owner of the user account. */
        owner: bcs.Address,
        /** A vector of the delegate users. */
        delegate_user: bcs.vector(bcs.Address),
        /** A vector of the symbols of the tokens in the user account. */
        symbols: bcs.vector(type_name.TypeName),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UserAccountCap = new MoveStruct({
    name: `${$moduleName}::UserAccountCap`,
    fields: {
        id: object.UID,
        /** The address of the owner of the user account. */
        owner: bcs.Address,
        /** The ID of the user account. */
        user_account_id: bcs.Address,
    },
});
export interface NewUserAccountOptions {
    package?: string;
    arguments?: [];
}
/** Creates a new user account and capability. */
export function newUserAccount(options: NewUserAccountOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "new_user_account",
        });
}
export interface RemoveUserAccountArguments {
    marketId: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    userAccountCap: RawTransactionArgument<string>;
}
export interface RemoveUserAccountOptions {
    package?: string;
    arguments:
        | RemoveUserAccountArguments
        | [marketId: RawTransactionArgument<string>, user: RawTransactionArgument<string>, userAccountCap: RawTransactionArgument<string>];
}
/** Removes a user account. WARNING: no authority check inside */
export function removeUserAccount(options: RemoveUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000002::object::UID",
        "address",
        `${packageAddress}::user_account::UserAccountCap`,
    ] satisfies string[];
    const parameterNames = ["marketId", "user", "userAccountCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "remove_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface HasUserAccountArguments {
    marketId: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface HasUserAccountOptions {
    package?: string;
    arguments: HasUserAccountArguments | [marketId: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
/** Checks if a user has an account. */
export function hasUserAccount(options: HasUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000002::object::UID",
        "address",
    ] satisfies string[];
    const parameterNames = ["marketId", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "has_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutUserAccountArguments {
    marketId: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface GetMutUserAccountOptions {
    package?: string;
    arguments: GetMutUserAccountArguments | [marketId: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
/**
 * Gets a mutable reference to a user account. WARNING: no security check, only
 * delegate_user or cranker can access
 */
export function getMutUserAccount(options: GetMutUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000002::object::UID",
        "address",
    ] satisfies string[];
    const parameterNames = ["marketId", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "get_mut_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckOwnerArguments {
    userAccount: RawTransactionArgument<string>;
}
export interface CheckOwnerOptions {
    package?: string;
    arguments: CheckOwnerArguments | [userAccount: RawTransactionArgument<string>];
}
/** Checks if the sender is the owner of the user account. Abort if not owner */
export function checkOwner(options: CheckOwnerOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::user_account::UserAccount`] satisfies string[];
    const parameterNames = ["userAccount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "check_owner",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddDelegateUserArguments {
    userAccount: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface AddDelegateUserOptions {
    package?: string;
    arguments: AddDelegateUserArguments | [userAccount: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
/** Adds a delegate user to a user account. WARNING: no authority check inside */
export function addDelegateUser(options: AddDelegateUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::user_account::UserAccount`, "address"] satisfies string[];
    const parameterNames = ["userAccount", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "add_delegate_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveDelegateUserArguments {
    userAccount: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface RemoveDelegateUserOptions {
    package?: string;
    arguments: RemoveDelegateUserArguments | [userAccount: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
/** Remove a delegate user from a user account. WARNING: no authority check inside */
export function removeDelegateUser(options: RemoveDelegateUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::user_account::UserAccount`, "address"] satisfies string[];
    const parameterNames = ["userAccount", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "remove_delegate_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface DepositArguments {
    userAccount: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface DepositOptions {
    package?: string;
    arguments: DepositArguments | [userAccount: RawTransactionArgument<string>, balance: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Deposits collateral into a user account. WARNING: no authority check inside */
export function deposit(options: DepositOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::user_account::UserAccount`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["userAccount", "balance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "deposit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawArguments {
    userAccount: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint | null>;
    userAccountCap: RawTransactionArgument<string>;
}
export interface WithdrawOptions {
    package?: string;
    arguments:
        | WithdrawArguments
        | [
              userAccount: RawTransactionArgument<string>,
              amount: RawTransactionArgument<number | bigint | null>,
              userAccountCap: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** Withdraws collateral from a user account. WARNING: no authority check inside */
export function withdraw(options: WithdrawOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::user_account::UserAccount`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        `${packageAddress}::user_account::UserAccountCap`,
    ] satisfies string[];
    const parameterNames = ["userAccount", "amount", "userAccountCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "withdraw",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetUserAccountOwnerArguments {
    userAccountCap: RawTransactionArgument<string>;
}
export interface GetUserAccountOwnerOptions {
    package?: string;
    arguments: GetUserAccountOwnerArguments | [userAccountCap: RawTransactionArgument<string>];
}
/** Gets the owner of a user account from a capability. */
export function getUserAccountOwner(options: GetUserAccountOwnerOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::user_account::UserAccountCap`] satisfies string[];
    const parameterNames = ["userAccountCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "user_account",
            function: "get_user_account_owner",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
