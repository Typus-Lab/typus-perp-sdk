/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `admin` module provides administrative functionalities for the Typus
 * Perpetual Protocol. It includes version management, authority control, and fee
 * handling.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as type_name from "./deps/std/type_name";
import * as object from "./deps/sui/object";
import * as vec_set from "./deps/sui/vec_set";
const $moduleName = "@typus/perp::admin";
export const FeeInfo = new MoveStruct({
    name: `${$moduleName}::FeeInfo`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of fees collected. */
        value: bcs.u64(),
    },
});
export const FeePool = new MoveStruct({
    name: `${$moduleName}::FeePool`,
    fields: {
        id: object.UID,
        /** A vector of `FeeInfo` structs. */
        fee_infos: bcs.vector(FeeInfo),
    },
});
export const Version = new MoveStruct({
    name: `${$moduleName}::Version`,
    fields: {
        id: object.UID,
        /** The version number. */
        value: bcs.u64(),
        /** The fee pool for protocol fees. */
        fee_pool: FeePool,
        /** The fee pool for liquidator fees. */
        liquidator_fee_pool: FeePool,
        /** The list of authorized addresses. */
        authority: vec_set.VecSet(bcs.Address),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SendFeeEvent = new MoveStruct({
    name: `${$moduleName}::SendFeeEvent`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of fees sent. */
        amount: bcs.u64(),
    },
});
export const ProtocolFeeEvent = new MoveStruct({
    name: `${$moduleName}::ProtocolFeeEvent`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of fees charged. */
        amount: bcs.u64(),
    },
});
export const PutInsuranceFundEvent = new MoveStruct({
    name: `${$moduleName}::PutInsuranceFundEvent`,
    fields: {
        /** The type name of the token. */
        token: type_name.TypeName,
        /** The amount of funds put into the insurance fund. */
        amount: bcs.u64(),
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
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
export function init(options: InitOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, "address"] satisfies string[];
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, "address"] satisfies string[];
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
    ] satisfies string[];
    const parameterNames = ["version", "typusEcosystemVersion"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "install_ecosystem_manager_cap_entry",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddTailsExpAndLeaderboardArguments {
    version: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    tradingFeeUsd: RawTransactionArgument<number | bigint>;
    expMultiplier: RawTransactionArgument<number | bigint>;
}
export interface AddTailsExpAndLeaderboardOptions {
    package?: string;
    arguments:
        | AddTailsExpAndLeaderboardArguments
        | [
              version: RawTransactionArgument<string>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              tradingFeeUsd: RawTransactionArgument<number | bigint>,
              expMultiplier: RawTransactionArgument<number | bigint>,
          ];
}
export function addTailsExpAndLeaderboard(options: AddTailsExpAndLeaderboardOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "address",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "user",
        "tradingFeeUsd",
        "expMultiplier",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "add_tails_exp_and_leaderboard",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddCompetitionLeaderboardArguments {
    version: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    leaderboardKey: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
    score: RawTransactionArgument<number | bigint>;
}
export interface AddCompetitionLeaderboardOptions {
    package?: string;
    arguments:
        | AddCompetitionLeaderboardArguments
        | [
              version: RawTransactionArgument<string>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              leaderboardKey: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
              score: RawTransactionArgument<number | bigint>,
          ];
}
/** Adds a score to the competition leaderboard. */
export function addCompetitionLeaderboard(options: AddCompetitionLeaderboardOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String",
        "address",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "typusEcosystemVersion", "typusLeaderboardRegistry", "leaderboardKey", "user", "score"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "add_competition_leaderboard",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SendFeeArguments {
    version: RawTransactionArgument<string>;
}
export interface SendFeeOptions {
    package?: string;
    arguments: SendFeeArguments | [version: RawTransactionArgument<string>];
    typeArguments: [string];
}
/**
 * Sends the collected fees to the fee address. Safe with constant address as
 * receiver
 */
export function sendFee(options: SendFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "send_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ChargeFeeArguments {
    version: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface ChargeFeeOptions {
    package?: string;
    arguments: ChargeFeeArguments | [version: RawTransactionArgument<string>, balance: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Charges a protocol fee. */
export function chargeFee(options: ChargeFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "balance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "charge_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface SendLiquidatorFeeArguments {
    version: RawTransactionArgument<string>;
}
export interface SendLiquidatorFeeOptions {
    package?: string;
    arguments: SendLiquidatorFeeArguments | [version: RawTransactionArgument<string>];
    typeArguments: [string];
}
/**
 * Sends the liquidator fees to the fee address. Safe with constant address as
 * receiver
 */
export function sendLiquidatorFee(options: SendLiquidatorFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`] satisfies string[];
    const parameterNames = ["version"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "send_liquidator_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ChargeLiquidatorFeeArguments {
    version: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface ChargeLiquidatorFeeOptions {
    package?: string;
    arguments: ChargeLiquidatorFeeArguments | [version: RawTransactionArgument<string>, balance: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Charges a liquidator fee. */
export function chargeLiquidatorFee(options: ChargeLiquidatorFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "balance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "admin",
            function: "charge_liquidator_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
