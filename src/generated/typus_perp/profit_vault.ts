/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
import * as vec_set from "./deps/sui/vec_set";
import * as table from "./deps/sui/table";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::profit_vault";
export const ProfitVault = new MoveStruct({
    name: `${$moduleName}::ProfitVault`,
    fields: {
        id: object.UID,
        whitelist: vec_set.VecSet(bcs.Address),
        user_profits: table.Table,
        unlock_countdown_ts_ms: bcs.u64(),
    },
});
export const LockVault = new MoveStruct({
    name: `${$moduleName}::LockVault`,
    fields: {
        id: object.UID,
        user_profits: table.Table,
    },
});
export const UserProfit = new MoveStruct({
    name: `${$moduleName}::UserProfit`,
    fields: {
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        position_id: bcs.u64(),
        order_id: bcs.u64(),
        amount: bcs.u64(),
        create_ts_ms: bcs.u64(),
    },
});
export const LockedUserProfit = new MoveStruct({
    name: `${$moduleName}::LockedUserProfit`,
    fields: {
        user_profit: UserProfit,
        create_ts_ms: bcs.u64(),
    },
});
export const CreateProfitVaultEvent = new MoveStruct({
    name: `${$moduleName}::CreateProfitVaultEvent`,
    fields: {
        unlock_countdown_ts_ms: bcs.u64(),
    },
});
export const AddWhitelistEvent = new MoveStruct({
    name: `${$moduleName}::AddWhitelistEvent`,
    fields: {
        new_whitelist_address: bcs.Address,
    },
});
export const RemoveWhitelistEvent = new MoveStruct({
    name: `${$moduleName}::RemoveWhitelistEvent`,
    fields: {
        removed_whitelist_address: bcs.Address,
    },
});
export const UpdateUnlockCountdownTsMsEvent = new MoveStruct({
    name: `${$moduleName}::UpdateUnlockCountdownTsMsEvent`,
    fields: {
        previous: bcs.u64(),
        new: bcs.u64(),
    },
});
export const LockUserProfitEvent = new MoveStruct({
    name: `${$moduleName}::LockUserProfitEvent`,
    fields: {
        user: bcs.Address,
        user_profit: UserProfit,
    },
});
export const UnlockUserProfitEvent = new MoveStruct({
    name: `${$moduleName}::UnlockUserProfitEvent`,
    fields: {
        user: bcs.Address,
        user_profit: UserProfit,
    },
});
export const PutUserProfitEvent = new MoveStruct({
    name: `${$moduleName}::PutUserProfitEvent`,
    fields: {
        user: bcs.Address,
        user_profit: UserProfit,
    },
});
export const WithdrawProfitEvent = new MoveStruct({
    name: `${$moduleName}::WithdrawProfitEvent`,
    fields: {
        token_type: type_name.TypeName,
        withdraw_amount: bcs.u64(),
    },
});
export interface CreateProfitVaultArguments {
    version: RawTransactionArgument<string>;
    unlockCountdownTsMs: RawTransactionArgument<number | bigint>;
}
export interface CreateProfitVaultOptions {
    package?: string;
    arguments:
        | CreateProfitVaultArguments
        | [version: RawTransactionArgument<string>, unlockCountdownTsMs: RawTransactionArgument<number | bigint>];
}
export function createProfitVault(options: CreateProfitVaultOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, "u64"] satisfies string[];
    const parameterNames = ["version", "unlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "create_profit_vault",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CreateLockVaultArguments {
    version: RawTransactionArgument<string>;
}
export interface CreateLockVaultOptions {
    package?: string;
    arguments: CreateLockVaultArguments | [version: RawTransactionArgument<string>];
}
export function createLockVault(options: CreateLockVaultOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "create_lock_vault",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddWhitelistArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface AddWhitelistOptions {
    package?: string;
    arguments:
        | AddWhitelistArguments
        | [version: RawTransactionArgument<string>, profitVault: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function addWhitelist(options: AddWhitelistOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::ProfitVault`,
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "profitVault", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "add_whitelist",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveWhitelistArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface RemoveWhitelistOptions {
    package?: string;
    arguments:
        | RemoveWhitelistArguments
        | [version: RawTransactionArgument<string>, profitVault: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function removeWhitelist(options: RemoveWhitelistOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::ProfitVault`,
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "profitVault", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "remove_whitelist",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateUnlockCountdownTsMsArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    newUnlockCountdownTsMs: RawTransactionArgument<number | bigint>;
}
export interface UpdateUnlockCountdownTsMsOptions {
    package?: string;
    arguments:
        | UpdateUnlockCountdownTsMsArguments
        | [
              version: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              newUnlockCountdownTsMs: RawTransactionArgument<number | bigint>,
          ];
}
export function updateUnlockCountdownTsMs(options: UpdateUnlockCountdownTsMsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::profit_vault::ProfitVault`, "u64"] satisfies string[];
    const parameterNames = ["version", "profitVault", "newUnlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "update_unlock_countdown_ts_ms",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface LockUserProfitArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    lockVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    idx: RawTransactionArgument<number | bigint>;
}
export interface LockUserProfitOptions {
    package?: string;
    arguments:
        | LockUserProfitArguments
        | [
              version: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              lockVault: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              idx: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function lockUserProfit(options: LockUserProfitOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::ProfitVault`,
        `${packageAddress}::profit_vault::LockVault`,
        "address",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "profitVault", "lockVault", "user", "idx"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "lock_user_profit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UnlockUserProfitArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    lockVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    idx: RawTransactionArgument<number | bigint>;
}
export interface UnlockUserProfitOptions {
    package?: string;
    arguments:
        | UnlockUserProfitArguments
        | [
              version: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              lockVault: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              idx: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function unlockUserProfit(options: UnlockUserProfitOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::ProfitVault`,
        `${packageAddress}::profit_vault::LockVault`,
        "address",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "profitVault", "lockVault", "user", "idx"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "unlock_user_profit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface PutUserProfitArguments {
    profitVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
    baseTokenType: RawTransactionArgument<string>;
    positionId: RawTransactionArgument<number | bigint>;
    orderId: RawTransactionArgument<number | bigint>;
}
export interface PutUserProfitOptions {
    package?: string;
    arguments:
        | PutUserProfitArguments
        | [
              profitVault: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              balance: RawTransactionArgument<string>,
              baseTokenType: RawTransactionArgument<string>,
              positionId: RawTransactionArgument<number | bigint>,
              orderId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function putUserProfit(options: PutUserProfitOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::profit_vault::ProfitVault`,
        "address",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["profitVault", "user", "balance", "baseTokenType", "positionId", "orderId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "put_user_profit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawProfitArguments {
    profitVault: RawTransactionArgument<string>;
}
export interface WithdrawProfitOptions {
    package?: string;
    arguments: WithdrawProfitArguments | [profitVault: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function withdrawProfit(options: WithdrawProfitOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::profit_vault::ProfitVault`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["profitVault"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "withdraw_profit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface IsWhitelistArguments {
    profitVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface IsWhitelistOptions {
    package?: string;
    arguments: IsWhitelistArguments | [profitVault: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function isWhitelist(options: IsWhitelistOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::profit_vault::ProfitVault`, "address"] satisfies string[];
    const parameterNames = ["profitVault", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "is_whitelist",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUserProfitsArguments {
    version: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface GetUserProfitsOptions {
    package?: string;
    arguments:
        | GetUserProfitsArguments
        | [version: RawTransactionArgument<string>, profitVault: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function getUserProfits(options: GetUserProfitsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::ProfitVault`,
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "profitVault", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "get_user_profits",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLockedUserProfitsArguments {
    version: RawTransactionArgument<string>;
    lockVault: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface GetLockedUserProfitsOptions {
    package?: string;
    arguments:
        | GetLockedUserProfitsArguments
        | [version: RawTransactionArgument<string>, lockVault: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function getLockedUserProfits(options: GetLockedUserProfitsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::profit_vault::LockVault`,
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "lockVault", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "profit_vault",
            function: "get_locked_user_profits",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
