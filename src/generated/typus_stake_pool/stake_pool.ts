/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as type_name from "./deps/std/type_name.js";
import * as type_name_1 from "./deps/std/type_name.js";
import * as type_name_2 from "./deps/std/type_name.js";
import * as type_name_3 from "./deps/std/type_name.js";
import * as type_name_4 from "./deps/std/type_name.js";
import * as type_name_5 from "./deps/std/type_name.js";
import * as type_name_6 from "./deps/std/type_name.js";
import * as type_name_7 from "./deps/std/type_name.js";
import * as type_name_8 from "./deps/std/type_name.js";
import * as type_name_9 from "./deps/std/type_name.js";
import * as type_name_10 from "./deps/std/type_name.js";
import * as type_name_11 from "./deps/std/type_name.js";
import * as type_name_12 from "./deps/std/type_name.js";
const $moduleName = "@typus/stake-pool::stake_pool";
export const StakePoolRegistry = new MoveStruct({
    name: `${$moduleName}::StakePoolRegistry`,
    fields: {
        id: bcs.Address,
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
        /** tlp price (decimal 4) */
        new_tlp_price: bcs.u64(),
        /** number of depositor */
        depositors_count: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const StakePoolConfig = new MoveStruct({
    name: `${$moduleName}::StakePoolConfig`,
    fields: {
        /** The unlock countdown in milliseconds. */
        unlock_countdown_ts_ms: bcs.u64(),
        /** for exp calculation */
        usd_per_exp: bcs.u64(),
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
        token_type: type_name_1.TypeName,
        /** The configuration for the incentive. */
        config: IncentiveConfig,
        /** Information about the incentive. */
        info: IncentiveInfo,
    },
});
export const StakePool = new MoveStruct({
    name: `${$moduleName}::StakePool`,
    fields: {
        id: bcs.Address,
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
        /**
         * The unsubscribed incentive price index (aligned with StakePool.incentives by
         * index).
         */
        unsubscribed_incentive_price_index: bcs.vector(bcs.u64()),
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
        /** The last incentive price index (aligned with StakePool.incentives by index). */
        last_incentive_price_index: bcs.vector(bcs.u64()),
        /** The last snapshot ts for exp. */
        snapshot_ts_ms: bcs.u64(),
        /** old tlp price for exp with decimal 4 */
        tlp_price: bcs.u64(),
        /** accumulated harvested amount */
        harvested_amount: bcs.u64(),
        /** Padding for future use. */
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
        incentive_token: type_name_2.TypeName,
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
        incentive_token: type_name_3.TypeName,
        incentive_info: IncentiveInfo,
        incentive_config: IncentiveConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DeactivateStakePoolEvent = new MoveStruct({
    name: `${$moduleName}::DeactivateStakePoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ActivateStakePoolEvent = new MoveStruct({
    name: `${$moduleName}::ActivateStakePoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DeactivateIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::DeactivateIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name_4.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ActivateIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::ActivateIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name_5.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RemoveIncentiveTokenEvent = new MoveStruct({
    name: `${$moduleName}::RemoveIncentiveTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token: type_name_6.TypeName,
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
        incentive_token_type: type_name_7.TypeName,
        deposit_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const WithdrawIncentiveEvent = new MoveStruct({
    name: `${$moduleName}::WithdrawIncentiveEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        incentive_token_type: type_name_8.TypeName,
        withdrawal_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const StakeEvent = new MoveStruct({
    name: `${$moduleName}::StakeEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name_9.TypeName,
        stake_amount: bcs.u64(),
        user_share_id: bcs.u64(),
        stake_ts_ms: bcs.u64(),
        last_incentive_price_index: bcs.vector(bcs.u64()),
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
        lp_token_type: type_name_10.TypeName,
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
        lp_token_type: type_name_11.TypeName,
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
        incentive_token_type: type_name_12.TypeName,
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
    const packageAddress = options.package ?? "@typus/stake-pool";
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "u64", "u64", "0x2::clock::Clock"] satisfies (string | null)[];
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
export interface DeactivateStakePoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface DeactivateStakePoolOptions {
    package?: string;
    arguments:
        | DeactivateStakePoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Activates a stake pool. */
export function deactivateStakePool(options: DeactivateStakePoolOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "deactivate_stake_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface ActivateStakePoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ActivateStakePoolOptions {
    package?: string;
    arguments:
        | ActivateStakePoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Activates a stake pool. */
export function activateStakePool(options: ActivateStakePoolOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "activate_stake_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [
        null,
        null,
        "u64",
        "0x2::clock::Clock",
        "0x1::option::Option<u64>",
        "0x1::option::Option<u64>",
        "0x1::option::Option<vector<u64>>",
    ] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", null] satisfies (string | null)[];
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
/** [Authorized Function] Withdraws incentive tokens. */
export function withdrawIncentive(options: WithdrawIncentiveOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x1::option::Option<u64>", "0x2::clock::Clock"] satisfies (string | null)[];
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
export interface StakeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    lpToken: RawTransactionArgument<string>;
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
          ];
    typeArguments: [string];
}
/** [User Function] Stake LP tokens. */
export function stake(options: StakeOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", null, "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index", "lpToken"];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "u64", "u64"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index", "tlpPrice", "usdPerExp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_pool_info_u64_padding",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SnapshotArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
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
          ];
}
/** [User Function] Get the staking exp */
export function snapshot(options: SnapshotOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "typusEcosystemVersion", "typusUserRegistry", "index"];
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
              unsubscribedShares: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [User Function] Pre-process to unstake the TLP */
export function unsubscribe(options: UnsubscribeOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x1::option::Option<u64>", "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index", "unsubscribedShares"];
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
}
export interface UnstakeOptions {
    package?: string;
    arguments:
        | UnstakeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [User Function] Post-process to unstake the TLP */
export function unstake(options: UnstakeOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "unstake",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "u64"] satisfies (string | null)[];
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
}
export interface HarvestPerUserShareOptions {
    package?: string;
    arguments:
        | HarvestPerUserShareArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [User Function] Harvest the incentive from staking TLP */
export function harvestPerUserShare(options: HarvestPerUserShareOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null, "u64", "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "harvest_per_user_share",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CalculateIncentiveByIdxArguments {
    currentIncentiveIndex: RawTransactionArgument<number | bigint>;
    incentiveIdx: RawTransactionArgument<number | bigint>;
    lpUserShare: RawTransactionArgument<string>;
}
export interface CalculateIncentiveByIdxOptions {
    package?: string;
    arguments:
        | CalculateIncentiveByIdxArguments
        | [
              currentIncentiveIndex: RawTransactionArgument<number | bigint>,
              incentiveIdx: RawTransactionArgument<number | bigint>,
              lpUserShare: RawTransactionArgument<string>,
          ];
}
export function calculateIncentiveByIdx(options: CalculateIncentiveByIdxOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = ["u64", "u64", null] satisfies (string | null)[];
    const parameterNames = ["currentIncentiveIndex", "incentiveIdx", "lpUserShare"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "calculate_incentive_by_idx",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateLastIncentivePriceIndexByIdxArguments {
    lpUserShare: RawTransactionArgument<string>;
    incentiveIdx: RawTransactionArgument<number | bigint>;
    currentIncentiveIndex: RawTransactionArgument<number | bigint>;
}
export interface UpdateLastIncentivePriceIndexByIdxOptions {
    package?: string;
    arguments:
        | UpdateLastIncentivePriceIndexByIdxArguments
        | [
              lpUserShare: RawTransactionArgument<string>,
              incentiveIdx: RawTransactionArgument<number | bigint>,
              currentIncentiveIndex: RawTransactionArgument<number | bigint>,
          ];
}
export function updateLastIncentivePriceIndexByIdx(options: UpdateLastIncentivePriceIndexByIdxOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "u64", "u64"] satisfies (string | null)[];
    const parameterNames = ["lpUserShare", "incentiveIdx", "currentIncentiveIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "update_last_incentive_price_index_by_idx",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface HarvestProgressUpdatedArguments {
    current: RawTransactionArgument<number | bigint[]>;
    user: RawTransactionArgument<number | bigint[]>;
}
export interface HarvestProgressUpdatedOptions {
    package?: string;
    arguments:
        | HarvestProgressUpdatedArguments
        | [current: RawTransactionArgument<number | bigint[]>, user: RawTransactionArgument<number | bigint[]>];
}
export function harvestProgressUpdated(options: HarvestProgressUpdatedOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = ["vector<u64>", "vector<u64>"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = ["u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "u64", "address"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, "u64", "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = ["0x2::object::ID", "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = ["0x2::object::ID", "u64"] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null] satisfies (string | null)[];
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null] satisfies (string | null)[];
    const parameterNames = ["stakePool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "remove_incentive",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetIncentiveIdxArguments {
    stakePool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface GetIncentiveIdxOptions {
    package?: string;
    arguments: GetIncentiveIdxArguments | [stakePool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
/** Get incentive index by token type, returns None if not found */
export function getIncentiveIdx(options: GetIncentiveIdxOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null, null] satisfies (string | null)[];
    const parameterNames = ["stakePool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_incentive_idx",
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
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
    const parameterNames = ["stakePool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "get_last_incentive_price_index",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckStakePoolActiveArguments {
    stakePool: RawTransactionArgument<string>;
}
export interface CheckStakePoolActiveOptions {
    package?: string;
    arguments: CheckStakePoolActiveArguments | [stakePool: RawTransactionArgument<string>];
}
export function checkStakePoolActive(options: CheckStakePoolActiveOptions) {
    const packageAddress = options.package ?? "@typus/stake-pool";
    const argumentsTypes = [null] satisfies (string | null)[];
    const parameterNames = ["stakePool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "stake_pool",
            function: "check_stake_pool_active",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
