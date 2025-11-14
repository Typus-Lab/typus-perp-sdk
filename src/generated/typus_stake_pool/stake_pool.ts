/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
import * as type_name from "./deps/std/type_name";
import * as vec_map from "./deps/sui/vec_map";
const $moduleName = "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368::stake_pool";
export const StakePoolRegistry = new MoveStruct({
    name: `${$moduleName}::StakePoolRegistry`,
    fields: {
        id: object.UID,
        /** The number of pools in the registry. */
        num_pool: bcs.u64(),
    },
});
export const StakePoolInfo = new MoveStruct({
    name: `${$moduleName}::StakePoolInfo`,
    fields: {
        /** The type name of the stake token. */
        stake_token: type_name.TypeName,
        /** The index of the pool. */
        index: bcs.u64(),
        /** The next user share ID. */
        next_user_share_id: bcs.u64(),
        /** The total number of shares in the pool. */
        total_share: bcs.u64(),
        /** Whether the pool is active. */
        active: bcs.bool(),
        /**
         * Padding for future use. [new_tlp_price (decimal 4), usd_per_exp,
         * depositors_count]
         */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const StakePoolConfig = new MoveStruct({
    name: `${$moduleName}::StakePoolConfig`,
    fields: {
        /** The unlock countdown in milliseconds. */
        unlock_countdown_ts_ms: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const IncentiveConfig = new MoveStruct({
    name: `${$moduleName}::IncentiveConfig`,
    fields: {
        /** The amount of incentive per period. */
        period_incentive_amount: bcs.u64(),
        /** The incentive interval in milliseconds. */
        incentive_interval_ts_ms: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const IncentiveInfo = new MoveStruct({
    name: `${$moduleName}::IncentiveInfo`,
    fields: {
        /** Whether the incentive is active. */
        active: bcs.bool(),
        /** The timestamp of the last allocation. */
        last_allocate_ts_ms: bcs.u64(),
        /** The price index for accumulating incentive. */
        incentive_price_index: bcs.u64(),
        /** The unallocated amount of incentive. */
        unallocated_amount: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const Incentive = new MoveStruct({
    name: `${$moduleName}::Incentive`,
    fields: {
        /** The type name of the incentive token. */
        token_type: type_name.TypeName,
        /** The configuration for the incentive. */
        config: IncentiveConfig,
        /** Information about the incentive. */
        info: IncentiveInfo,
    },
});
export const StakePool = new MoveStruct({
    name: `${$moduleName}::StakePool`,
    fields: {
        id: object.UID,
        /** Information about the stake pool. */
        pool_info: StakePoolInfo,
        /** Configuration for the stake pool. */
        config: StakePoolConfig,
        /** A vector of the incentives in the stake pool. */
        incentives: bcs.vector(Incentive),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DeactivatingShares = new MoveStruct({
    name: `${$moduleName}::DeactivatingShares`,
    fields: {
        /** The number of shares. */
        shares: bcs.u64(),
        /** The timestamp when the user unsubscribed. */
        unsubscribed_ts_ms: bcs.u64(),
        /** The timestamp when the shares can be unlocked. */
        unlocked_ts_ms: bcs.u64(),
        /** The unsubscribed incentive price index. */
        unsubscribed_incentive_price_index: vec_map.VecMap(type_name.TypeName, bcs.u64()),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const LpUserShare = new MoveStruct({
    name: `${$moduleName}::LpUserShare`,
    fields: {
        /** The address of the user. */
        user: bcs.Address,
        /** The ID of the user's share. */
        user_share_id: bcs.u64(),
        /** The timestamp when the user staked. */
        stake_ts_ms: bcs.u64(),
        /** The total number of shares. */
        total_shares: bcs.u64(),
        /** The number of active shares. */
        active_shares: bcs.u64(),
        /** A vector of deactivating shares. */
        deactivating_shares: bcs.vector(DeactivatingShares),
        /** The last incentive price index. */
        last_incentive_price_index: vec_map.VecMap(type_name.TypeName, bcs.u64()),
        /**
         * Padding for future use. [snapshot_ts_ms, old_tlp_price (decimal 4),
         * is_auto_compound(deprecated), harvested_amount]
         */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const NewStakePoolEvent = new MoveStruct({
    name: `${$moduleName}::NewStakePoolEvent`,
    fields: {
        sender: bcs.Address,
        stake_pool_info: StakePoolInfo,
        stake_pool_config: StakePoolConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const AutoCompoundEvent = new MoveStruct({
    name: `${$moduleName}::AutoCompoundEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name.TypeName,
        incentive_price_index: bcs.u64(),
        total_amount: bcs.u64(),
        compound_users: bcs.u64(),
        total_users: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const AddIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::AddIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name.TypeName,
        incentive_info: IncentiveInfo,
        incentive_config: IncentiveConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DeactivateIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::DeactivateIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ActivateIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::ActivateIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RemoveIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::RemoveIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name.TypeName,
        incentive_balance_value: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateUnlockCountdownTsMsEvent = new MoveStruct({
    name: `${$moduleName}::UpdateUnlockCountdownTsMsEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        previous_unlock_countdown_ts_ms: bcs.u64(),
        new_unlock_countdown_ts_ms: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateIncentiveConfigEvent = new MoveStruct({
    name: `${$moduleName}::UpdateIncentiveConfigEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        previous_incentive_config: IncentiveConfig,
        new_incentive_config: IncentiveConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DepositIncentiveEvent = new MoveStruct({
    name: `${$moduleName}::DepositIncentiveEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token_type: type_name.TypeName,
        deposit_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const WithdrawIncentiveEvent = new MoveStruct({
    name: `${$moduleName}::WithdrawIncentiveEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token_type: type_name.TypeName,
        withdrawal_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const StakeEvent = new MoveStruct({
    name: `${$moduleName}::StakeEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        stake_amount: bcs.u64(),
        user_share_id: bcs.u64(),
        stake_ts_ms: bcs.u64(),
        last_incentive_price_index: vec_map.VecMap(type_name.TypeName, bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdatePoolInfoU64PaddingEvent = new MoveStruct({
    name: `${$moduleName}::UpdatePoolInfoU64PaddingEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SnapshotEvent = new MoveStruct({
    name: `${$moduleName}::SnapshotEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        user_share_id: bcs.u64(),
        shares: bcs.u64(),
        tlp_price: bcs.u64(),
        last_ts_ms: bcs.u64(),
        current_ts_ms: bcs.u64(),
        exp: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UnsubscribeEvent = new MoveStruct({
    name: `${$moduleName}::UnsubscribeEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        user_share_id: bcs.u64(),
        unsubscribed_shares: bcs.u64(),
        unsubscribe_ts_ms: bcs.u64(),
        unlocked_ts_ms: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UnstakeEvent = new MoveStruct({
    name: `${$moduleName}::UnstakeEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        user_share_id: bcs.u64(),
        unstake_amount: bcs.u64(),
        unstake_ts_ms: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const HarvestPerUserShareEvent = new MoveStruct({
    name: `${$moduleName}::HarvestPerUserShareEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token_type: type_name.TypeName,
        harvest_amount: bcs.u64(),
        user_share_id: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export interface InitOptions {
    package?: string;
    arguments?: [];
}
/** Initializes the module. */
export function init(options: InitOptions = {}) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "init",
        });
}
export interface NewStakePoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    unlockCountdownTsMs: RawTransactionArgument<number | bigint>;
}
export interface NewStakePoolOptions {
    package?: string;
    arguments:
        | NewStakePoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              unlockCountdownTsMs: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Creates a new stake pool. */
export function newStakePool(options: NewStakePoolOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "unlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "new_stake_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AutoCompoundArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface AutoCompoundOptions {
    package?: string;
    arguments:
        | AutoCompoundArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] */
export function autoCompound(options: AutoCompoundOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "auto_compound",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AddIncentiveTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    periodIncentiveAmount: RawTransactionArgument<number | bigint>;
    incentiveIntervalTsMs: RawTransactionArgument<number | bigint>;
}
export interface AddIncentiveTokenOptions {
    package?: string;
    arguments:
        | AddIncentiveTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              periodIncentiveAmount: RawTransactionArgument<number | bigint>,
              incentiveIntervalTsMs: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Adds a new incentive token to a pool. */
export function addIncentiveToken(options: AddIncentiveTokenOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "periodIncentiveAmount", "incentiveIntervalTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "add_incentive_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface DeactivateIncentiveTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface DeactivateIncentiveTokenOptions {
    package?: string;
    arguments:
        | DeactivateIncentiveTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Deactivates an incentive token. */
export function deactivateIncentiveToken(options: DeactivateIncentiveTokenOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "deactivate_incentive_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ActivateIncentiveTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ActivateIncentiveTokenOptions {
    package?: string;
    arguments:
        | ActivateIncentiveTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Activates an incentive token. */
export function activateIncentiveToken(options: ActivateIncentiveTokenOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "activate_incentive_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemoveIncentiveTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface RemoveIncentiveTokenOptions {
    package?: string;
    arguments:
        | RemoveIncentiveTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Removes an incentive token. */
export function removeIncentiveToken(options: RemoveIncentiveTokenOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "remove_incentive_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateUnlockCountdownTsMsArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    unlockCountdownTsMs: RawTransactionArgument<number | bigint>;
}
export interface UpdateUnlockCountdownTsMsOptions {
    package?: string;
    arguments:
        | UpdateUnlockCountdownTsMsArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              unlockCountdownTsMs: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Updates the unlock countdown. */
export function updateUnlockCountdownTsMs(options: UpdateUnlockCountdownTsMsOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "unlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_unlock_countdown_ts_ms",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateIncentiveConfigArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    periodIncentiveAmount: RawTransactionArgument<number | bigint | null>;
    incentiveIntervalTsMs: RawTransactionArgument<number | bigint | null>;
    u64Padding: RawTransactionArgument<number | bigint[] | null>;
}
export interface UpdateIncentiveConfigOptions {
    package?: string;
    arguments:
        | UpdateIncentiveConfigArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              periodIncentiveAmount: RawTransactionArgument<number | bigint | null>,
              incentiveIntervalTsMs: RawTransactionArgument<number | bigint | null>,
              u64Padding: RawTransactionArgument<number | bigint[] | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Updates the incentive configuration. */
export function updateIncentiveConfig(options: UpdateIncentiveConfigOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<vector<u64>>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "periodIncentiveAmount", "incentiveIntervalTsMs", "u64Padding"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_incentive_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AllocateIncentiveArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface AllocateIncentiveOptions {
    package?: string;
    arguments:
        | AllocateIncentiveArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** Allocates incentive to the pool. WARNING: no authority check inside */
export function allocateIncentive(options: AllocateIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "allocate_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface DepositIncentiveArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    coin: RawTransactionArgument<string>;
}
export interface DepositIncentiveOptions {
    package?: string;
    arguments:
        | DepositIncentiveArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              coin: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Deposits incentive tokens. */
export function depositIncentive(options: DepositIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "coin"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "deposit_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawIncentiveV2Arguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    amount: RawTransactionArgument<number | bigint | null>;
}
export interface WithdrawIncentiveV2Options {
    package?: string;
    arguments:
        | WithdrawIncentiveV2Arguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              amount: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Withdraws incentive tokens. */
export function withdrawIncentiveV2(options: WithdrawIncentiveV2Options) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "amount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "withdraw_incentive_v2",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface StakeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    lpToken: RawTransactionArgument<string>;
    UserShareId: RawTransactionArgument<number | bigint | null>;
}
export interface StakeOptions {
    package?: string;
    arguments:
        | StakeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              lpToken: RawTransactionArgument<string>,
              UserShareId: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [User Function] Stake LP tokens. */
export function stake(options: StakeOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "lpToken", "UserShareId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "stake",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdatePoolInfoU64PaddingArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    tlpPrice: RawTransactionArgument<number | bigint>;
    usdPerExp: RawTransactionArgument<number | bigint>;
}
export interface UpdatePoolInfoU64PaddingOptions {
    package?: string;
    arguments:
        | UpdatePoolInfoU64PaddingArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              tlpPrice: RawTransactionArgument<number | bigint>,
              usdPerExp: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Update TLP price for calculating staking exp */
export function updatePoolInfoU64Padding(options: UpdatePoolInfoU64PaddingOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "tlpPrice", "usdPerExp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_pool_info_u64_padding",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface HotfixPoolInfoU64PaddingArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    u64Padding: RawTransactionArgument<number | bigint[]>;
}
export interface HotfixPoolInfoU64PaddingOptions {
    package?: string;
    arguments:
        | HotfixPoolInfoU64PaddingArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              u64Padding: RawTransactionArgument<number | bigint[]>,
          ];
}
/** [Authorized Function] Update TLP price for calculating staking exp */
export function hotfixPoolInfoU64Padding(options: HotfixPoolInfoU64PaddingOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "vector<u64>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "u64Padding"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "hotfix_pool_info_u64_padding",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SnapshotArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    UserShareId: RawTransactionArgument<number | bigint>;
}
export interface SnapshotOptions {
    package?: string;
    arguments:
        | SnapshotArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              UserShareId: RawTransactionArgument<number | bigint>,
          ];
}
/** [User Function] Get the staking exp */
export function snapshot(options: SnapshotOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "0x4b0f4ee1a40ce37ec81c987cc4e76a665419e74b863319492fc7d26f708b835a::ecosystem::Version",
        "0x4b0f4ee1a40ce37ec81c987cc4e76a665419e74b863319492fc7d26f708b835a::user::TypusUserRegistry",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "typusEcosystemVersion", "typusUserRegistry", "index", "UserShareId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "snapshot",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UnsubscribeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    UserShareId: RawTransactionArgument<number | bigint>;
    unsubscribedShares: RawTransactionArgument<number | bigint | null>;
}
export interface UnsubscribeOptions {
    package?: string;
    arguments:
        | UnsubscribeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              UserShareId: RawTransactionArgument<number | bigint>,
              unsubscribedShares: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [User Function] Pre-process to unstake the TLP */
export function unsubscribe(options: UnsubscribeOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "UserShareId", "unsubscribedShares"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "unsubscribe",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UnstakeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    UserShareId: RawTransactionArgument<number | bigint>;
}
export interface UnstakeOptions {
    package?: string;
    arguments:
        | UnstakeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              UserShareId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [User Function] Post-process to unstake the TLP */
export function unstake(options: UnstakeOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "UserShareId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "unstake",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateLastIncentivePriceIndexArguments {
    lpUserShare: RawTransactionArgument<string>;
    incentiveToken: RawTransactionArgument<string>;
    currentIncentiveIndex: RawTransactionArgument<number | bigint>;
}
export interface UpdateLastIncentivePriceIndexOptions {
    package?: string;
    arguments:
        | UpdateLastIncentivePriceIndexArguments
        | [
              lpUserShare: RawTransactionArgument<string>,
              incentiveToken: RawTransactionArgument<string>,
              currentIncentiveIndex: RawTransactionArgument<number | bigint>,
          ];
}
export function updateLastIncentivePriceIndex(options: UpdateLastIncentivePriceIndexOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::stake_pool::LpUserShare`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
    ] satisfies string[];
    const parameterNames = ["lpUserShare", "incentiveToken", "currentIncentiveIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_last_incentive_price_index",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface LogHarvestedAmountArguments {
    userShare: RawTransactionArgument<string>;
    incentiveValue: RawTransactionArgument<number | bigint>;
}
export interface LogHarvestedAmountOptions {
    package?: string;
    arguments:
        | LogHarvestedAmountArguments
        | [userShare: RawTransactionArgument<string>, incentiveValue: RawTransactionArgument<number | bigint>];
}
export function logHarvestedAmount(options: LogHarvestedAmountOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [`${packageAddress}::stake_pool::LpUserShare`, "u64"] satisfies string[];
    const parameterNames = ["userShare", "incentiveValue"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "log_harvested_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface HarvestPerUserShareArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    UserShareId: RawTransactionArgument<number | bigint>;
}
export interface HarvestPerUserShareOptions {
    package?: string;
    arguments:
        | HarvestPerUserShareArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              UserShareId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [User Function] Harvest the incentive from staking TLP */
export function harvestPerUserShare(options: HarvestPerUserShareOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "UserShareId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "harvest_per_user_share",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CalculateIncentiveArguments {
    currentIncentiveIndex: RawTransactionArgument<number | bigint>;
    incentiveToken: RawTransactionArgument<string>;
    lpUserShare: RawTransactionArgument<string>;
}
export interface CalculateIncentiveOptions {
    package?: string;
    arguments:
        | CalculateIncentiveArguments
        | [
              currentIncentiveIndex: RawTransactionArgument<number | bigint>,
              incentiveToken: RawTransactionArgument<string>,
              lpUserShare: RawTransactionArgument<string>,
          ];
}
export function calculateIncentive(options: CalculateIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        `${packageAddress}::stake_pool::LpUserShare`,
    ] satisfies string[];
    const parameterNames = ["currentIncentiveIndex", "incentiveToken", "lpUserShare"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "calculate_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface HarvestProgressUpdatedArguments {
    current: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface HarvestProgressUpdatedOptions {
    package?: string;
    arguments: HarvestProgressUpdatedArguments | [current: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function harvestProgressUpdated(options: HarvestProgressUpdatedOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000002::vec_map::VecMap<0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName, u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000002::vec_map::VecMap<0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName, u64>",
    ] satisfies string[];
    const parameterNames = ["current", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "harvest_progress_updated",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface MultiplierArguments {
    decimal: RawTransactionArgument<number | bigint>;
}
export interface MultiplierOptions {
    package?: string;
    arguments: MultiplierArguments | [decimal: RawTransactionArgument<number | bigint>];
}
export function multiplier(options: MultiplierOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = ["u64"] satisfies string[];
    const parameterNames = ["decimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "multiplier",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUserSharesArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface GetUserSharesOptions {
    package?: string;
    arguments:
        | GetUserSharesArguments
        | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>, user: RawTransactionArgument<string>];
}
export function getUserShares(options: GetUserSharesOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [`${packageAddress}::stake_pool::StakePoolRegistry`, "u64", "address"] satisfies string[];
    const parameterNames = ["registry", "index", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_user_shares",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUserSharesByUserShareIdArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    userShareId: RawTransactionArgument<number | bigint>;
}
export interface GetUserSharesByUserShareIdOptions {
    package?: string;
    arguments:
        | GetUserSharesByUserShareIdArguments
        | [
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              userShareId: RawTransactionArgument<number | bigint>,
          ];
}
export function getUserSharesByUserShareId(options: GetUserSharesByUserShareIdOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [`${packageAddress}::stake_pool::StakePoolRegistry`, "u64", "u64"] satisfies string[];
    const parameterNames = ["registry", "index", "userShareId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_user_shares_by_user_share_id",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetStakePoolArguments {
    id: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetStakePoolOptions {
    package?: string;
    arguments: GetStakePoolArguments | [id: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getStakePool(options: GetStakePoolOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = ["0x0000000000000000000000000000000000000000000000000000000000000002::object::UID", "u64"] satisfies string[];
    const parameterNames = ["id", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_stake_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutStakePoolArguments {
    id: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetMutStakePoolOptions {
    package?: string;
    arguments: GetMutStakePoolArguments | [id: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getMutStakePool(options: GetMutStakePoolOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = ["0x0000000000000000000000000000000000000000000000000000000000000002::object::UID", "u64"] satisfies string[];
    const parameterNames = ["id", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_mut_stake_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetIncentiveTokensArguments {
    stakePool: RawTransactionArgument<string>;
}
export interface GetIncentiveTokensOptions {
    package?: string;
    arguments: GetIncentiveTokensArguments | [stakePool: RawTransactionArgument<string>];
}
export function getIncentiveTokens(options: GetIncentiveTokensOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [`${packageAddress}::stake_pool::StakePool`] satisfies string[];
    const parameterNames = ["stakePool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_incentive_tokens",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetIncentiveArguments {
    stakePool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface GetIncentiveOptions {
    package?: string;
    arguments: GetIncentiveArguments | [stakePool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
export function getIncentive(options: GetIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::stake_pool::StakePool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["stakePool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutIncentiveArguments {
    stakePool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface GetMutIncentiveOptions {
    package?: string;
    arguments: GetMutIncentiveArguments | [stakePool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
export function getMutIncentive(options: GetMutIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::stake_pool::StakePool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["stakePool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_mut_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveIncentiveArguments {
    stakePool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface RemoveIncentiveOptions {
    package?: string;
    arguments: RemoveIncentiveArguments | [stakePool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
export function removeIncentive(options: RemoveIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::stake_pool::StakePool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["stakePool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "remove_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLastIncentivePriceIndexArguments {
    stakePool: RawTransactionArgument<string>;
}
export interface GetLastIncentivePriceIndexOptions {
    package?: string;
    arguments: GetLastIncentivePriceIndexArguments | [stakePool: RawTransactionArgument<string>];
}
export function getLastIncentivePriceIndex(options: GetLastIncentivePriceIndexOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [`${packageAddress}::stake_pool::StakePool`] satisfies string[];
    const parameterNames = ["stakePool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_last_incentive_price_index",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface WithdrawIncentiveArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    amount: RawTransactionArgument<number | bigint | null>;
}
export interface WithdrawIncentiveOptions {
    package?: string;
    arguments:
        | WithdrawIncentiveArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              amount: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
export function withdrawIncentive(options: WithdrawIncentiveOptions) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::stake_pool::StakePoolRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "amount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "withdraw_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface DeprecatedOptions {
    package?: string;
    arguments?: [];
}
export function deprecated(options: DeprecatedOptions = {}) {
    const packageAddress = options.package ?? "0x11f4f072d6472f545a82200ec4bee8a8db006e209f76bcc013178c585ed4b368";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "deprecated",
        });
}
