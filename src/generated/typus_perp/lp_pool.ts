/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `lp_pool` module is the heart of the TLP (Typus Liquidity Pool) logic. It
 * defines the structures for liquidity pools, token pools, and their
 * configurations. It also contains the entry functions for creating pools, adding
 * liquidity, swapping, and redeeming.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
import * as type_name from "./deps/std/type_name";
import * as escrow from "./escrow";
import * as balance from "./deps/sui/balance";
const $moduleName = "@typus/perp::lp_pool";
export const Registry = new MoveStruct({
    name: `${$moduleName}::Registry`,
    fields: {
        id: object.UID,
        /** The number of pools in the registry. */
        num_pool: bcs.u64(),
        /** The UID of the liquidity pool registry. */
        liquidity_pool_registry: object.UID,
    },
});
export const SpotConfig = new MoveStruct({
    name: `${$moduleName}::SpotConfig`,
    fields: {
        /** The minimum deposit amount. */
        min_deposit: bcs.u64(),
        /** The maximum capacity of the pool. */
        max_capacity: bcs.u64(),
        /** The target weight of the token in the pool in basis points. */
        target_weight_bp: bcs.u64(),
        /** The basic mint fee in basis points. */
        basic_mint_fee_bp: bcs.u64(),
        /** The additional mint fee in basis points. */
        additional_mint_fee_bp: bcs.u64(),
        /** The basic burn fee in basis points. */
        basic_burn_fee_bp: bcs.u64(),
        /** The additional burn fee in basis points. */
        additional_burn_fee_bp: bcs.u64(),
        /** The swap fee in basis points. */
        swap_fee_bp: bcs.u64(),
        /** The protocol's share of the swap fee in basis points. */
        swap_fee_protocol_share_bp: bcs.u64(),
        /** The protocol's share of the lending interest in basis points. */
        lending_protocol_share_bp: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const MarginConfig = new MoveStruct({
    name: `${$moduleName}::MarginConfig`,
    fields: {
        /** The basic borrow rate at utilization 0. */
        basic_borrow_rate_0: bcs.u64(),
        /** The basic borrow rate at utilization 1. */
        basic_borrow_rate_1: bcs.u64(),
        /** The basic borrow rate at utilization 2. */
        basic_borrow_rate_2: bcs.u64(),
        /** The utilization threshold 0 in basis points. */
        utilization_threshold_bp_0: bcs.u64(),
        /** The utilization threshold 1 in basis points. */
        utilization_threshold_bp_1: bcs.u64(),
        /** The borrow interval in milliseconds. */
        borrow_interval_ts_ms: bcs.u64(),
        /** The maximum order reserve ratio in basis points. */
        max_order_reserve_ratio_bp: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const Config = new MoveStruct({
    name: `${$moduleName}::Config`,
    fields: {
        /** The address of the oracle. */
        oracle_id: bcs.Address,
        /** The number of decimals for the liquidity token. */
        liquidity_token_decimal: bcs.u64(),
        /** The spot-related configuration for the token pool. */
        spot_config: SpotConfig,
        /** The margin-related configuration for the token pool. */
        margin_config: MarginConfig,
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const State = new MoveStruct({
    name: `${$moduleName}::State`,
    fields: {
        /** The amount of liquidity in the pool. */
        liquidity_amount: bcs.u64(),
        /** The value of the liquidity in USD. */
        value_in_usd: bcs.u64(),
        /** The amount of liquidity reserved for open positions. */
        reserved_amount: bcs.u64(),
        /** The timestamp of the last update to the value_in_usd. */
        update_ts_ms: bcs.u64(),
        /** Whether the token pool is active. */
        is_active: bcs.bool(),
        /** The timestamp of the last borrow rate calculation. */
        last_borrow_rate_ts_ms: bcs.u64(),
        /** The cumulative borrow rate. */
        cumulative_borrow_rate: bcs.u64(),
        /** The previous timestamp of the last borrow rate calculation. */
        previous_last_borrow_rate_ts_ms: bcs.u64(),
        /** The previous cumulative borrow rate. */
        previous_cumulative_borrow_rate: bcs.u64(),
        /** The current lending amount. */
        current_lending_amount: bcs.vector(bcs.u64()),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const TokenPool = new MoveStruct({
    name: `${$moduleName}::TokenPool`,
    fields: {
        /** The type name of the token. */
        token_type: type_name.TypeName,
        /** The configuration for the token pool. */
        config: Config,
        /** The state of the token pool. */
        state: State,
    },
});
export const LiquidityPoolInfo = new MoveStruct({
    name: `${$moduleName}::LiquidityPoolInfo`,
    fields: {
        /** The number of decimals for the LP token. */
        lp_token_decimal: bcs.u64(),
        /** The total supply of LP tokens. */
        total_share_supply: bcs.u64(),
        /** The total value locked in the pool in USD. */
        tvl_usd: bcs.u64(),
        /** Whether the pool is active. */
        is_active: bcs.bool(),
    },
});
export const LiquidityPool = new MoveStruct({
    name: `${$moduleName}::LiquidityPool`,
    fields: {
        /**
         * The UID of the object. Token balances are dynamic fields under this id with
         * TypeName key.
         */
        id: object.UID,
        /** The index of the pool. */
        index: bcs.u64(),
        /** The type name of the LP token. */
        lp_token_type: type_name.TypeName,
        /** A vector of the type names of the liquidity tokens. */
        liquidity_tokens: bcs.vector(type_name.TypeName),
        /** A vector of the token pools. */
        token_pools: bcs.vector(TokenPool),
        /** Information about the liquidity pool. */
        pool_info: LiquidityPoolInfo,
        /** A vector of unsettled bid receipts from liquidations. */
        liquidated_unsettled_receipts: bcs.vector(escrow.UnsettledBidReceipt),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
        /** Padding for future use. */
        bcs_padding: bcs.vector(bcs.u8()),
    },
});
export const RemoveLiquidityTokenProcess = new MoveStruct({
    name: `${$moduleName}::RemoveLiquidityTokenProcess`,
    fields: {
        /** The type name of the liquidity token being removed. */
        liquidity_token: type_name.TypeName,
        /** A vector of the base tokens of the removed positions. */
        removed_positions_base_token: bcs.vector(type_name.TypeName),
        /** A vector of the base tokens of the removed orders. */
        removed_orders_base_token: bcs.vector(type_name.TypeName),
        /** The address of the oracle for the removed token. */
        removed_token_oracle_id: bcs.Address,
        /** The value of the removed liquidity in USD. */
        removed_usd: bcs.u64(),
        /** The value of the repaid liquidity in USD. */
        repaid_usd: bcs.u64(),
        /** The status of the removal process. */
        status: bcs.u64(),
    },
});
export const DeactivatingShares = new MoveStruct({
    name: `${$moduleName}::DeactivatingShares`,
    fields: {
        /** The balance of the deactivating shares. */
        balance: balance.Balance,
        /** The timestamp of the redemption. */
        redeem_ts_ms: bcs.u64(),
        /** The timestamp when the shares can be unlocked. */
        unlock_ts_ms: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerDepositReceiptV2 = new MoveStruct({
    name: `${$moduleName}::ManagerDepositReceiptV2`,
    fields: {
        id: object.UID,
        /** The index of the pool. */
        index: bcs.u64(),
        /** The type name of the token. */
        token_type: type_name.TypeName,
        /** The amount of the deposit. */
        amount: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const NewLiquidityPoolEvent = new MoveStruct({
    name: `${$moduleName}::NewLiquidityPoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        lp_token_decimal: bcs.u64(),
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
export const UpdateRebalanceCostThresholdBpEvent = new MoveStruct({
    name: `${$moduleName}::UpdateRebalanceCostThresholdBpEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        previous_rebalance_cost_threshold_bp: bcs.u64(),
        new_rebalance_cost_threshold_bp: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const AddLiquidityTokenEvent = new MoveStruct({
    name: `${$moduleName}::AddLiquidityTokenEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        token_type: type_name.TypeName,
        config: Config,
        state: State,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateSpotConfigEvent = new MoveStruct({
    name: `${$moduleName}::UpdateSpotConfigEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        previous_spot_config: SpotConfig,
        new_spot_config: SpotConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerEmergencyDepositEvent = new MoveStruct({
    name: `${$moduleName}::ManagerEmergencyDepositEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerEmergencyWithdrawEvent = new MoveStruct({
    name: `${$moduleName}::ManagerEmergencyWithdrawEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateMarginConfigEvent = new MoveStruct({
    name: `${$moduleName}::UpdateMarginConfigEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        previous_margin_config: MarginConfig,
        new_margin_config: MarginConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const MintLpEvent = new MoveStruct({
    name: `${$moduleName}::MintLpEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        deposit_amount: bcs.u64(),
        deposit_amount_usd: bcs.u64(),
        mint_fee_usd: bcs.u64(),
        lp_token_type: type_name.TypeName,
        minted_lp_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateBorrowInfoEvent = new MoveStruct({
    name: `${$moduleName}::UpdateBorrowInfoEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        previous_borrow_ts_ms: bcs.u64(),
        previous_cumulative_borrow_rate: bcs.u64(),
        borrow_interval_ts_ms: bcs.u64(),
        last_borrow_rate_ts_ms: bcs.u64(),
        last_cumulative_borrow_rate: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SwapEvent = new MoveStruct({
    name: `${$moduleName}::SwapEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        from_token_type: type_name.TypeName,
        from_amount: bcs.u64(),
        to_token_type: type_name.TypeName,
        min_to_amount: bcs.u64(),
        actual_to_amount: bcs.u64(),
        fee_amount: bcs.u64(),
        fee_amount_usd: bcs.u64(),
        oracle_price_from_token: bcs.u64(),
        oracle_price_to_token: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RedeemEvent = new MoveStruct({
    name: `${$moduleName}::RedeemEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        share: bcs.u64(),
        share_price: bcs.u64(),
        timestamp_ts_ms: bcs.u64(),
        unlock_ts_ms: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SuspendPoolEvent = new MoveStruct({
    name: `${$moduleName}::SuspendPoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ResumePoolEvent = new MoveStruct({
    name: `${$moduleName}::ResumePoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SuspendTokenPoolEvent = new MoveStruct({
    name: `${$moduleName}::SuspendTokenPoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ResumeTokenPoolEvent = new MoveStruct({
    name: `${$moduleName}::ResumeTokenPoolEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const DepositLendingEvent = new MoveStruct({
    name: `${$moduleName}::DepositLendingEvent`,
    fields: {
        index: bcs.u64(),
        lending_index: bcs.u64(),
        c_token_type: type_name.TypeName,
        deposit_amount: bcs.u64(),
        minted_market_coin_amount: bcs.u64(),
        latest_lending_amount: bcs.u64(),
        latest_market_coin_amount: bcs.u64(),
        latest_reserved_amount: bcs.u64(),
        latest_liquidity_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const WithdrawLendingEvent = new MoveStruct({
    name: `${$moduleName}::WithdrawLendingEvent`,
    fields: {
        index: bcs.u64(),
        lending_index: bcs.u64(),
        c_token_type: type_name.TypeName,
        r_token_type: type_name.TypeName,
        withdraw_amount: bcs.u64(),
        withdrawn_collateral_amount: bcs.u64(),
        latest_lending_amount: bcs.u64(),
        latest_market_coin_amount: bcs.u64(),
        latest_reserved_amount: bcs.u64(),
        latest_liquidity_amount: bcs.u64(),
        lending_interest: bcs.u64(),
        protocol_share: bcs.u64(),
        lending_reward: bcs.u64(),
        reward_protocol_share: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const StartRemoveLiquidityTokenProcessEvent = new MoveStruct({
    name: `${$moduleName}::StartRemoveLiquidityTokenProcessEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerFlashRemoveLiquidityEvent = new MoveStruct({
    name: `${$moduleName}::ManagerFlashRemoveLiquidityEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        price: bcs.u64(),
        price_decimal: bcs.u64(),
        remove_amount: bcs.u64(),
        removed_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerFlashRepayLiquidityEvent = new MoveStruct({
    name: `${$moduleName}::ManagerFlashRepayLiquidityEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        price: bcs.u64(),
        price_decimal: bcs.u64(),
        repaid_amount: bcs.u64(),
        repaid_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const CompleteRemoveLiquidityTokenProcessEvent = new MoveStruct({
    name: `${$moduleName}::CompleteRemoveLiquidityTokenProcessEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        removed_usd: bcs.u64(),
        repaid_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerRemoveLiquidityTokenEvent = new MoveStruct({
    name: `${$moduleName}::ManagerRemoveLiquidityTokenEvent`,
    fields: {
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RebalanceProcess = new MoveStruct({
    name: `${$moduleName}::RebalanceProcess`,
    fields: {
        index: bcs.u64(),
        token_type_a: type_name.TypeName,
        token_decimal_a: bcs.u64(),
        token_amount_a: bcs.u64(),
        oracle_price_a: bcs.u64(),
        reduced_usd: bcs.u64(),
        token_type_b: type_name.TypeName,
        token_decimal_b: bcs.u64(),
        oracle_price_b: bcs.u64(),
    },
});
export const RebalanceEvent = new MoveStruct({
    name: `${$moduleName}::RebalanceEvent`,
    fields: {
        index: bcs.u64(),
        from_token: type_name.TypeName,
        to_token: type_name.TypeName,
        rebalance_amount: bcs.u64(),
        from_token_oracle_price: bcs.u64(),
        to_token_oracle_price: bcs.u64(),
        reduced_usd: bcs.u64(),
        tvl_usd: bcs.u64(),
        from_token_liquidity_amount: bcs.u64(),
        to_token_liquidity_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const CompleteRebalancingEvent = new MoveStruct({
    name: `${$moduleName}::CompleteRebalancingEvent`,
    fields: {
        index: bcs.u64(),
        from_token: type_name.TypeName,
        to_token: type_name.TypeName,
        from_token_oracle_price: bcs.u64(),
        to_token_oracle_price: bcs.u64(),
        swapped_back_usd: bcs.u64(),
        tvl_usd: bcs.u64(),
        from_token_liquidity_amount: bcs.u64(),
        to_token_liquidity_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateLiquidityValueEvent = new MoveStruct({
    name: `${$moduleName}::UpdateLiquidityValueEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        liquidity_token: type_name.TypeName,
        price: bcs.u64(),
        value_in_usd: bcs.u64(),
        lp_pool_tvl_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const BurnLpEvent = new MoveStruct({
    name: `${$moduleName}::BurnLpEvent`,
    fields: {
        sender: bcs.Address,
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        burn_lp_amount: bcs.u64(),
        burn_amount_usd: bcs.u64(),
        burn_fee_usd: bcs.u64(),
        liquidity_token_type: type_name.TypeName,
        withdraw_token_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerDepositReceipt = new MoveStruct({
    name: `${$moduleName}::ManagerDepositReceipt`,
    fields: {
        id: object.UID,
        token_type: type_name.TypeName,
        amount: bcs.u64(),
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
            module: "lp_pool",
            function: "init",
        });
}
export interface NewLiquidityPoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    lpTokenDecimal: RawTransactionArgument<number | bigint>;
    unlockCountdownTsMs: RawTransactionArgument<number | bigint>;
}
export interface NewLiquidityPoolOptions {
    package?: string;
    arguments:
        | NewLiquidityPoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              lpTokenDecimal: RawTransactionArgument<number | bigint>,
              unlockCountdownTsMs: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Creates a new liquidity pool. */
export function newLiquidityPool(options: NewLiquidityPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64", "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "lpTokenDecimal", "unlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "new_liquidity_pool",
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
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64", "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index", "unlockCountdownTsMs"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_unlock_countdown_ts_ms",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateRebalanceCostThresholdBpArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    rebalanceCostThresholdBp: RawTransactionArgument<number | bigint>;
}
export interface UpdateRebalanceCostThresholdBpOptions {
    package?: string;
    arguments:
        | UpdateRebalanceCostThresholdBpArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              rebalanceCostThresholdBp: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Updates the rebalance cost threshold. */
export function updateRebalanceCostThresholdBp(options: UpdateRebalanceCostThresholdBpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64", "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index", "rebalanceCostThresholdBp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_rebalance_cost_threshold_bp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddLiquidityTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
    tokenDecimal: RawTransactionArgument<number | bigint>;
    targetWeightBp: RawTransactionArgument<number | bigint>;
    minDeposit: RawTransactionArgument<number | bigint>;
    maxCapacity: RawTransactionArgument<number | bigint>;
    basicMintFeeBp: RawTransactionArgument<number | bigint>;
    additionalMintFeeBp: RawTransactionArgument<number | bigint>;
    basicBurnFeeBp: RawTransactionArgument<number | bigint>;
    additionalBurnFeeBp: RawTransactionArgument<number | bigint>;
    swapFeeBp: RawTransactionArgument<number | bigint>;
    swapFeeProtocolShareBp: RawTransactionArgument<number | bigint>;
    lendingProtocolShareBp: RawTransactionArgument<number | bigint>;
    basicBorrowRate_0: RawTransactionArgument<number | bigint>;
    basicBorrowRate_1: RawTransactionArgument<number | bigint>;
    basicBorrowRate_2: RawTransactionArgument<number | bigint>;
    utilizationThresholdBp_0: RawTransactionArgument<number | bigint>;
    utilizationThresholdBp_1: RawTransactionArgument<number | bigint>;
    borrowIntervalTsMs: RawTransactionArgument<number | bigint>;
    maxOrderReserveRatioBp: RawTransactionArgument<number | bigint>;
}
export interface AddLiquidityTokenOptions {
    package?: string;
    arguments:
        | AddLiquidityTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
              tokenDecimal: RawTransactionArgument<number | bigint>,
              targetWeightBp: RawTransactionArgument<number | bigint>,
              minDeposit: RawTransactionArgument<number | bigint>,
              maxCapacity: RawTransactionArgument<number | bigint>,
              basicMintFeeBp: RawTransactionArgument<number | bigint>,
              additionalMintFeeBp: RawTransactionArgument<number | bigint>,
              basicBurnFeeBp: RawTransactionArgument<number | bigint>,
              additionalBurnFeeBp: RawTransactionArgument<number | bigint>,
              swapFeeBp: RawTransactionArgument<number | bigint>,
              swapFeeProtocolShareBp: RawTransactionArgument<number | bigint>,
              lendingProtocolShareBp: RawTransactionArgument<number | bigint>,
              basicBorrowRate_0: RawTransactionArgument<number | bigint>,
              basicBorrowRate_1: RawTransactionArgument<number | bigint>,
              basicBorrowRate_2: RawTransactionArgument<number | bigint>,
              utilizationThresholdBp_0: RawTransactionArgument<number | bigint>,
              utilizationThresholdBp_1: RawTransactionArgument<number | bigint>,
              borrowIntervalTsMs: RawTransactionArgument<number | bigint>,
              maxOrderReserveRatioBp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Adds a new liquidity token to a pool. */
export function addLiquidityToken(options: AddLiquidityTokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "index",
        "oracle",
        "tokenDecimal",
        "targetWeightBp",
        "minDeposit",
        "maxCapacity",
        "basicMintFeeBp",
        "additionalMintFeeBp",
        "basicBurnFeeBp",
        "additionalBurnFeeBp",
        "swapFeeBp",
        "swapFeeProtocolShareBp",
        "lendingProtocolShareBp",
        "basicBorrowRate_0",
        "basicBorrowRate_1",
        "basicBorrowRate_2",
        "utilizationThresholdBp_0",
        "utilizationThresholdBp_1",
        "borrowIntervalTsMs",
        "maxOrderReserveRatioBp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "add_liquidity_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateSpotConfigArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    targetWeightBp: RawTransactionArgument<number | bigint | null>;
    minDeposit: RawTransactionArgument<number | bigint | null>;
    maxCapacity: RawTransactionArgument<number | bigint | null>;
    basicMintFeeBp: RawTransactionArgument<number | bigint | null>;
    additionalMintFeeBp: RawTransactionArgument<number | bigint | null>;
    basicBurnFeeBp: RawTransactionArgument<number | bigint | null>;
    additionalBurnFeeBp: RawTransactionArgument<number | bigint | null>;
    swapFeeBp: RawTransactionArgument<number | bigint | null>;
    swapFeeProtocolShareBp: RawTransactionArgument<number | bigint | null>;
    lendingProtocolShareBp: RawTransactionArgument<number | bigint | null>;
}
export interface UpdateSpotConfigOptions {
    package?: string;
    arguments:
        | UpdateSpotConfigArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              targetWeightBp: RawTransactionArgument<number | bigint | null>,
              minDeposit: RawTransactionArgument<number | bigint | null>,
              maxCapacity: RawTransactionArgument<number | bigint | null>,
              basicMintFeeBp: RawTransactionArgument<number | bigint | null>,
              additionalMintFeeBp: RawTransactionArgument<number | bigint | null>,
              basicBurnFeeBp: RawTransactionArgument<number | bigint | null>,
              additionalBurnFeeBp: RawTransactionArgument<number | bigint | null>,
              swapFeeBp: RawTransactionArgument<number | bigint | null>,
              swapFeeProtocolShareBp: RawTransactionArgument<number | bigint | null>,
              lendingProtocolShareBp: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Updates the spot configuration for a token. */
export function updateSpotConfig(options: UpdateSpotConfigOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "index",
        "targetWeightBp",
        "minDeposit",
        "maxCapacity",
        "basicMintFeeBp",
        "additionalMintFeeBp",
        "basicBurnFeeBp",
        "additionalBurnFeeBp",
        "swapFeeBp",
        "swapFeeProtocolShareBp",
        "lendingProtocolShareBp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_spot_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerEmergencyDepositArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    coin: RawTransactionArgument<string>;
}
export interface ManagerEmergencyDepositOptions {
    package?: string;
    arguments:
        | ManagerEmergencyDepositArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              coin: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Allows a manager to deposit tokens in an emergency. */
export function managerEmergencyDeposit(options: ManagerEmergencyDepositOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "coin"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_emergency_deposit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerEmergencyWithdrawArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    receipt: RawTransactionArgument<string>;
}
export interface ManagerEmergencyWithdrawOptions {
    package?: string;
    arguments:
        | ManagerEmergencyWithdrawArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              receipt: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Allows a manager to withdraw tokens in an emergency. */
export function managerEmergencyWithdraw(options: ManagerEmergencyWithdrawOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `${packageAddress}::lp_pool::ManagerDepositReceiptV2`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "receipt"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_emergency_withdraw",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateMarginConfigArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    basicBorrowRate_0: RawTransactionArgument<number | bigint | null>;
    basicBorrowRate_1: RawTransactionArgument<number | bigint | null>;
    basicBorrowRate_2: RawTransactionArgument<number | bigint | null>;
    utilizationThresholdBp_0: RawTransactionArgument<number | bigint | null>;
    utilizationThresholdBp_1: RawTransactionArgument<number | bigint | null>;
    borrowIntervalTsMs: RawTransactionArgument<number | bigint | null>;
    maxOrderReserveRatioBp: RawTransactionArgument<number | bigint | null>;
}
export interface UpdateMarginConfigOptions {
    package?: string;
    arguments:
        | UpdateMarginConfigArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              basicBorrowRate_0: RawTransactionArgument<number | bigint | null>,
              basicBorrowRate_1: RawTransactionArgument<number | bigint | null>,
              basicBorrowRate_2: RawTransactionArgument<number | bigint | null>,
              utilizationThresholdBp_0: RawTransactionArgument<number | bigint | null>,
              utilizationThresholdBp_1: RawTransactionArgument<number | bigint | null>,
              borrowIntervalTsMs: RawTransactionArgument<number | bigint | null>,
              maxOrderReserveRatioBp: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Updates the margin configuration for a token. */
export function updateMarginConfig(options: UpdateMarginConfigOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "index",
        "basicBorrowRate_0",
        "basicBorrowRate_1",
        "basicBorrowRate_2",
        "utilizationThresholdBp_0",
        "utilizationThresholdBp_1",
        "borrowIntervalTsMs",
        "maxOrderReserveRatioBp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_margin_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface MintLpArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    treasuryCaps: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    coin: RawTransactionArgument<string>;
}
export interface MintLpOptions {
    package?: string;
    arguments:
        | MintLpArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              treasuryCaps: RawTransactionArgument<string>,
              oracle: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              coin: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [User Function] Mints LP tokens. */
export function mintLp(options: MintLpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        `${packageAddress}::treasury_caps::TreasuryCaps`,
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "treasuryCaps", "oracle", "index", "coin"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "mint_lp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateBorrowInfoArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface UpdateBorrowInfoOptions {
    package?: string;
    arguments:
        | UpdateBorrowInfoArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** [User Function] Updates the borrow information for all tokens in a pool. */
export function updateBorrowInfo(options: UpdateBorrowInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_borrow_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SwapArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracleFromToken: RawTransactionArgument<string>;
    oracleToToken: RawTransactionArgument<string>;
    fromCoin: RawTransactionArgument<string>;
    minToAmount: RawTransactionArgument<number | bigint>;
}
export interface SwapOptions {
    package?: string;
    arguments:
        | SwapArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracleFromToken: RawTransactionArgument<string>,
              oracleToToken: RawTransactionArgument<string>,
              fromCoin: RawTransactionArgument<string>,
              minToAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [User Function] Swaps one token for another. */
export function swap(options: SwapOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracleFromToken", "oracleToToken", "fromCoin", "minToAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "swap",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RedeemArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    balance: RawTransactionArgument<string>;
}
export interface RedeemOptions {
    package?: string;
    arguments:
        | RedeemArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              balance: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** [User Function] Redeems LP tokens for underlying assets. */
export function redeem(options: RedeemOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "balance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "redeem",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ClaimArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    treasuryCaps: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
}
export interface ClaimOptions {
    package?: string;
    arguments:
        | ClaimArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              treasuryCaps: RawTransactionArgument<string>,
              oracle: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [User Function] Claims underlying assets from redeemed LP tokens. */
export function claim(options: ClaimOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `${packageAddress}::treasury_caps::TreasuryCaps`,
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "treasuryCaps", "oracle"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "claim",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface SuspendPoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface SuspendPoolOptions {
    package?: string;
    arguments:
        | SuspendPoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Suspends a liquidity pool. */
export function suspendPool(options: SuspendPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "suspend_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface ResumePoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ResumePoolOptions {
    package?: string;
    arguments:
        | ResumePoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Resumes a liquidity pool. */
export function resumePool(options: ResumePoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "resume_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SuspendTokenPoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface SuspendTokenPoolOptions {
    package?: string;
    arguments:
        | SuspendTokenPoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Suspends a token pool. */
export function suspendTokenPool(options: SuspendTokenPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "suspend_token_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ResumeTokenPoolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ResumeTokenPoolOptions {
    package?: string;
    arguments:
        | ResumeTokenPoolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Resumes a token pool. */
export function resumeTokenPool(options: ResumeTokenPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "resume_token_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerDepositScallopArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
    lendingAmount: RawTransactionArgument<number | bigint | null>;
}
export interface ManagerDepositScallopOptions {
    package?: string;
    arguments:
        | ManagerDepositScallopArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
              lendingAmount: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Manager deposits to Scallop. */
export function managerDepositScallop(options: ManagerDepositScallopOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "scallopVersion", "scallopMarket", "lendingAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_deposit_scallop",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerDepositNaviArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    storage: RawTransactionArgument<string>;
    pool: RawTransactionArgument<string>;
    asset: RawTransactionArgument<number>;
    incentiveV2: RawTransactionArgument<string>;
    incentiveV3: RawTransactionArgument<string>;
    lendingAmount: RawTransactionArgument<number | bigint | null>;
}
export interface ManagerDepositNaviOptions {
    package?: string;
    arguments:
        | ManagerDepositNaviArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              storage: RawTransactionArgument<string>,
              pool: RawTransactionArgument<string>,
              asset: RawTransactionArgument<number>,
              incentiveV2: RawTransactionArgument<string>,
              incentiveV3: RawTransactionArgument<string>,
              lendingAmount: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
export function managerDepositNavi(options: ManagerDepositNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::pool::Pool<${options.typeArguments[0]}>`,
        "u8",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v2::Incentive",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "storage", "pool", "asset", "incentiveV2", "incentiveV3", "lendingAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_deposit_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerWithdrawScallopArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
    withdrawAmount: RawTransactionArgument<number | bigint | null>;
}
export interface ManagerWithdrawScallopOptions {
    package?: string;
    arguments:
        | ManagerWithdrawScallopArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
              withdrawAmount: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Manager withdraws from Scallop. */
export function managerWithdrawScallop(options: ManagerWithdrawScallopOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "scallopVersion", "scallopMarket", "withdrawAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_withdraw_scallop",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerWithdrawNaviArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracleConfig: RawTransactionArgument<string>;
    priceOracle: RawTransactionArgument<string>;
    supraOracleHolder: RawTransactionArgument<string>;
    pythPriceInfo: RawTransactionArgument<string>;
    feedAddress: RawTransactionArgument<string>;
    storage: RawTransactionArgument<string>;
    pool: RawTransactionArgument<string>;
    asset: RawTransactionArgument<number>;
    incentiveV2: RawTransactionArgument<string>;
    incentiveV3: RawTransactionArgument<string>;
}
export interface ManagerWithdrawNaviOptions {
    package?: string;
    arguments:
        | ManagerWithdrawNaviArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracleConfig: RawTransactionArgument<string>,
              priceOracle: RawTransactionArgument<string>,
              supraOracleHolder: RawTransactionArgument<string>,
              pythPriceInfo: RawTransactionArgument<string>,
              feedAddress: RawTransactionArgument<string>,
              storage: RawTransactionArgument<string>,
              pool: RawTransactionArgument<string>,
              asset: RawTransactionArgument<number>,
              incentiveV2: RawTransactionArgument<string>,
              incentiveV3: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function managerWithdrawNavi(options: ManagerWithdrawNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0xca441b44943c16be0e6e23c5a955bb971537ea3289ae8016fbf33fffe1fd210f::config::OracleConfig",
        "0xca441b44943c16be0e6e23c5a955bb971537ea3289ae8016fbf33fffe1fd210f::oracle::PriceOracle",
        "0x5d8fbbf6f908a4af8c6d072669a462d53e03eb3c1d863bd0359dc818c69ea706::SupraSValueFeed::OracleHolder",
        "0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e::price_info::PriceInfoObject",
        "address",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::pool::Pool<${options.typeArguments[0]}>`,
        "u8",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v2::Incentive",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "index",
        "oracleConfig",
        "priceOracle",
        "supraOracleHolder",
        "pythPriceInfo",
        "feedAddress",
        "storage",
        "pool",
        "asset",
        "incentiveV2",
        "incentiveV3",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_withdraw_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerRewardNaviArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    storage: RawTransactionArgument<string>;
    rewardFund: RawTransactionArgument<string>;
    coinTypes: RawTransactionArgument<string[]>;
    ruleIds: RawTransactionArgument<string[]>;
    incentiveV3: RawTransactionArgument<string>;
}
export interface ManagerRewardNaviOptions {
    package?: string;
    arguments:
        | ManagerRewardNaviArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              storage: RawTransactionArgument<string>,
              rewardFund: RawTransactionArgument<string>,
              coinTypes: RawTransactionArgument<string[]>,
              ruleIds: RawTransactionArgument<string[]>,
              incentiveV3: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function managerRewardNavi(options: ManagerRewardNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::RewardFund<${options.typeArguments[0]}>`,
        "vector<0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String>",
        "vector<address>",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "storage", "rewardFund", "coinTypes", "ruleIds", "incentiveV3"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_reward_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface StartRemoveLiquidityTokenProcessArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
}
export interface StartRemoveLiquidityTokenProcessOptions {
    package?: string;
    arguments:
        | StartRemoveLiquidityTokenProcessArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function startRemoveLiquidityTokenProcess(options: StartRemoveLiquidityTokenProcessOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracle"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "start_remove_liquidity_token_process",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerFlashRemoveLiquidityArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
    process: RawTransactionArgument<string>;
}
export interface ManagerFlashRemoveLiquidityOptions {
    package?: string;
    arguments:
        | ManagerFlashRemoveLiquidityArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
              process: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function managerFlashRemoveLiquidity(options: ManagerFlashRemoveLiquidityOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `${packageAddress}::lp_pool::RemoveLiquidityTokenProcess`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracle", "process"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_flash_remove_liquidity",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerFlashRepayLiquidityArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
    process: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
}
export interface ManagerFlashRepayLiquidityOptions {
    package?: string;
    arguments:
        | ManagerFlashRepayLiquidityArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
              process: RawTransactionArgument<string>,
              balance: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function managerFlashRepayLiquidity(options: ManagerFlashRepayLiquidityOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `${packageAddress}::lp_pool::RemoveLiquidityTokenProcess`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracle", "process", "balance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_flash_repay_liquidity",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CompleteRemoveLiquidityTokenProcessArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    process: RawTransactionArgument<string>;
}
export interface CompleteRemoveLiquidityTokenProcessOptions {
    package?: string;
    arguments:
        | CompleteRemoveLiquidityTokenProcessArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              process: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function completeRemoveLiquidityTokenProcess(options: CompleteRemoveLiquidityTokenProcessOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `${packageAddress}::lp_pool::RemoveLiquidityTokenProcess`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "process"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "complete_remove_liquidity_token_process",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerRemoveLiquidityTokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ManagerRemoveLiquidityTokenOptions {
    package?: string;
    arguments:
        | ManagerRemoveLiquidityTokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Manager removes a liquidity token. */
export function managerRemoveLiquidityToken(options: ManagerRemoveLiquidityTokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_remove_liquidity_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckTokenPoolStatusArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    assertActive: RawTransactionArgument<boolean>;
}
export interface CheckTokenPoolStatusOptions {
    package?: string;
    arguments:
        | CheckTokenPoolStatusArguments
        | [
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              assertActive: RawTransactionArgument<boolean>,
          ];
    typeArguments: [string];
}
export function checkTokenPoolStatus(options: CheckTokenPoolStatusOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64", "bool"] satisfies string[];
    const parameterNames = ["registry", "index", "assertActive"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "check_token_pool_status",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface TokenPoolIsActiveArguments {
    tokenPool: RawTransactionArgument<string>;
}
export interface TokenPoolIsActiveOptions {
    package?: string;
    arguments: TokenPoolIsActiveArguments | [tokenPool: RawTransactionArgument<string>];
}
export function tokenPoolIsActive(options: TokenPoolIsActiveOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::TokenPool`] satisfies string[];
    const parameterNames = ["tokenPool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "token_pool_is_active",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RebalanceArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracleTokenA: RawTransactionArgument<string>;
    oracleTokenB: RawTransactionArgument<string>;
    rebalanceAmount: RawTransactionArgument<number | bigint>;
}
export interface RebalanceOptions {
    package?: string;
    arguments:
        | RebalanceArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracleTokenA: RawTransactionArgument<string>,
              oracleTokenB: RawTransactionArgument<string>,
              rebalanceAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Manager take the liquidity token A to swap. */
export function rebalance(options: RebalanceOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracleTokenA", "oracleTokenB", "rebalanceAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "rebalance",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CompleteRebalancingArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracleTokenA: RawTransactionArgument<string>;
    oracleTokenB: RawTransactionArgument<string>;
    swappedBackBalance: RawTransactionArgument<string>;
    rebalanceProcess: RawTransactionArgument<string>;
}
export interface CompleteRebalancingOptions {
    package?: string;
    arguments:
        | CompleteRebalancingArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracleTokenA: RawTransactionArgument<string>,
              oracleTokenB: RawTransactionArgument<string>,
              swappedBackBalance: RawTransactionArgument<string>,
              rebalanceProcess: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Manager swap back the liquidity token from A to B. */
export function completeRebalancing(options: CompleteRebalancingOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[1]}>`,
        `${packageAddress}::lp_pool::RebalanceProcess`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracleTokenA", "oracleTokenB", "swappedBackBalance", "rebalanceProcess"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "complete_rebalancing",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerRemoveAllLiquidityArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface ManagerRemoveAllLiquidityOptions {
    package?: string;
    arguments:
        | ManagerRemoveAllLiquidityArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/**
 * Only for current contract sunset purpose. Will be removed in new contract
 * [Authorized Function] Manager remove all liquidity of a token.
 */
export function managerRemoveAllLiquidity(options: ManagerRemoveAllLiquidityOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "manager_remove_all_liquidity",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateLiquidityValueArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
}
export interface UpdateLiquidityValueOptions {
    package?: string;
    arguments:
        | UpdateLiquidityValueArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** [User Function] Update the liquidity value with oracle. */
export function updateLiquidityValue(options: UpdateLiquidityValueOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracle"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_liquidity_value",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetPoolLiquidityArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetPoolLiquidityOptions {
    package?: string;
    arguments:
        | GetPoolLiquidityArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
/**
 * [View Function] Get the liquidity pool token amounts. Return
 * [total_share_supply, tvl_usd, token_types, amounts, usds]
 */
export function getPoolLiquidity(options: GetPoolLiquidityOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_pool_liquidity",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateTvlArguments {
    version: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
}
export interface UpdateTvlOptions {
    package?: string;
    arguments:
        | UpdateTvlArguments
        | [
              version: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              tokenType: RawTransactionArgument<string>,
              oracle: RawTransactionArgument<string>,
          ];
}
export function updateTvl(options: UpdateTvlOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "liquidityPool", "tokenType", "oracle"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_tvl",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface OrderFilledArguments {
    liquidityPool: RawTransactionArgument<string>;
    addReserve: RawTransactionArgument<boolean>;
    dReserve: RawTransactionArgument<number | bigint>;
    feeBalance: RawTransactionArgument<string>;
}
export interface OrderFilledOptions {
    package?: string;
    arguments:
        | OrderFilledArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              addReserve: RawTransactionArgument<boolean>,
              dReserve: RawTransactionArgument<number | bigint>,
              feeBalance: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function orderFilled(options: OrderFilledOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "bool",
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "addReserve", "dReserve", "feeBalance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "order_filled",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateReserveAmountArguments {
    liquidityPool: RawTransactionArgument<string>;
    addReserve: RawTransactionArgument<boolean>;
    dReserve: RawTransactionArgument<number | bigint>;
}
export interface UpdateReserveAmountOptions {
    package?: string;
    arguments:
        | UpdateReserveAmountArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              addReserve: RawTransactionArgument<boolean>,
              dReserve: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function updateReserveAmount(options: UpdateReserveAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::LiquidityPool`, "bool", "u64"] satisfies string[];
    const parameterNames = ["liquidityPool", "addReserve", "dReserve"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "update_reserve_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface PutCollateralArguments {
    liquidityPool: RawTransactionArgument<string>;
    collateral: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface PutCollateralOptions {
    package?: string;
    arguments:
        | PutCollateralArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              collateral: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function putCollateral(options: PutCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "collateral", "collateralOraclePrice", "collateralOraclePriceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "put_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RequestCollateralArguments {
    liquidityPool: RawTransactionArgument<string>;
    collateralAmount: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface RequestCollateralOptions {
    package?: string;
    arguments:
        | RequestCollateralArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              collateralAmount: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function requestCollateral(options: RequestCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::LiquidityPool`, "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["liquidityPool", "collateralAmount", "collateralOraclePrice", "collateralOraclePriceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "request_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface PutReceiptCollateralsArguments {
    liquidityPool: RawTransactionArgument<string>;
    unsettledBidReceipts: RawTransactionArgument<string[]>;
}
export interface PutReceiptCollateralsOptions {
    package?: string;
    arguments:
        | PutReceiptCollateralsArguments
        | [liquidityPool: RawTransactionArgument<string>, unsettledBidReceipts: RawTransactionArgument<string[]>];
}
export function putReceiptCollaterals(options: PutReceiptCollateralsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        `vector<${packageAddress}::escrow::UnsettledBidReceipt>`,
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "unsettledBidReceipts"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "put_receipt_collaterals",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetReceiptCollateralArguments {
    liquidityPool: RawTransactionArgument<string>;
}
export interface GetReceiptCollateralOptions {
    package?: string;
    arguments: GetReceiptCollateralArguments | [liquidityPool: RawTransactionArgument<string>];
}
export function getReceiptCollateral(options: GetReceiptCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::LiquidityPool`] satisfies string[];
    const parameterNames = ["liquidityPool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_receipt_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateMintLpArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    tokenType: RawTransactionArgument<string>;
    price: RawTransactionArgument<number | bigint>;
    priceDecimal: RawTransactionArgument<number | bigint>;
    depositAmount: RawTransactionArgument<number | bigint>;
}
export interface CalculateMintLpOptions {
    package?: string;
    arguments:
        | CalculateMintLpArguments
        | [
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              tokenType: RawTransactionArgument<string>,
              price: RawTransactionArgument<number | bigint>,
              priceDecimal: RawTransactionArgument<number | bigint>,
              depositAmount: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateMintLp(options: CalculateMintLpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["registry", "index", "tokenType", "price", "priceDecimal", "depositAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "calculate_mint_lp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateBurnLpArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    tokenType: RawTransactionArgument<string>;
    price: RawTransactionArgument<number | bigint>;
    priceDecimal: RawTransactionArgument<number | bigint>;
    burnAmount: RawTransactionArgument<number | bigint>;
}
export interface CalculateBurnLpOptions {
    package?: string;
    arguments:
        | CalculateBurnLpArguments
        | [
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              tokenType: RawTransactionArgument<string>,
              price: RawTransactionArgument<number | bigint>,
              priceDecimal: RawTransactionArgument<number | bigint>,
              burnAmount: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateBurnLp(options: CalculateBurnLpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["registry", "index", "tokenType", "price", "priceDecimal", "burnAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "calculate_burn_lp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateLpFeeArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
    depositAmount: RawTransactionArgument<number | bigint>;
    depositAmountUsd: RawTransactionArgument<number | bigint>;
    isMint: RawTransactionArgument<boolean>;
}
export interface CalculateLpFeeOptions {
    package?: string;
    arguments:
        | CalculateLpFeeArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              tokenType: RawTransactionArgument<string>,
              depositAmount: RawTransactionArgument<number | bigint>,
              depositAmountUsd: RawTransactionArgument<number | bigint>,
              isMint: RawTransactionArgument<boolean>,
          ];
}
export function calculateLpFee(options: CalculateLpFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "u64",
        "bool",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType", "depositAmount", "depositAmountUsd", "isMint"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "calculate_lp_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateSwapFeeArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
    amount: RawTransactionArgument<number | bigint>;
    amountUsd: RawTransactionArgument<number | bigint>;
    swapIn: RawTransactionArgument<boolean>;
}
export interface CalculateSwapFeeOptions {
    package?: string;
    arguments:
        | CalculateSwapFeeArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              tokenType: RawTransactionArgument<string>,
              amount: RawTransactionArgument<number | bigint>,
              amountUsd: RawTransactionArgument<number | bigint>,
              swapIn: RawTransactionArgument<boolean>,
          ];
}
export function calculateSwapFee(options: CalculateSwapFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "u64",
        "bool",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType", "amount", "amountUsd", "swapIn"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "calculate_swap_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckTvlUpdatedArguments {
    liquidityPool: RawTransactionArgument<string>;
}
export interface CheckTvlUpdatedOptions {
    package?: string;
    arguments: CheckTvlUpdatedArguments | [liquidityPool: RawTransactionArgument<string>];
}
export function checkTvlUpdated(options: CheckTvlUpdatedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["liquidityPool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "check_tvl_updated",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateLendingAmountCappedArguments {
    tokenPool: RawTransactionArgument<string>;
    lendingAmount: RawTransactionArgument<number | bigint | null>;
}
export interface CalculateLendingAmountCappedOptions {
    package?: string;
    arguments:
        | CalculateLendingAmountCappedArguments
        | [tokenPool: RawTransactionArgument<string>, lendingAmount: RawTransactionArgument<number | bigint | null>];
}
export function calculateLendingAmountCapped(options: CalculateLendingAmountCappedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::TokenPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = ["tokenPool", "lendingAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "calculate_lending_amount_capped",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface DepositScallopBasicArguments {
    liquidityPool: RawTransactionArgument<string>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
    depositAmount: RawTransactionArgument<number | bigint>;
}
export interface DepositScallopBasicOptions {
    package?: string;
    arguments:
        | DepositScallopBasicArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
              depositAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function depositScallopBasic(options: DepositScallopBasicOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "scallopVersion", "scallopMarket", "depositAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "deposit_scallop_basic",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawScallopBasicArguments {
    version: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
    withdrawAmount: RawTransactionArgument<number | bigint>;
}
export interface WithdrawScallopBasicOptions {
    package?: string;
    arguments:
        | WithdrawScallopBasicArguments
        | [
              version: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
              withdrawAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function withdrawScallopBasic(options: WithdrawScallopBasicOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "liquidityPool", "scallopVersion", "scallopMarket", "withdrawAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "withdraw_scallop_basic",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface DepositNaviArguments {
    liquidityPool: RawTransactionArgument<string>;
    storage: RawTransactionArgument<string>;
    pool: RawTransactionArgument<string>;
    asset: RawTransactionArgument<number>;
    incentiveV2: RawTransactionArgument<string>;
    incentiveV3: RawTransactionArgument<string>;
    depositAmount: RawTransactionArgument<number | bigint>;
}
export interface DepositNaviOptions {
    package?: string;
    arguments:
        | DepositNaviArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              storage: RawTransactionArgument<string>,
              pool: RawTransactionArgument<string>,
              asset: RawTransactionArgument<number>,
              incentiveV2: RawTransactionArgument<string>,
              incentiveV3: RawTransactionArgument<string>,
              depositAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function depositNavi(options: DepositNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::pool::Pool<${options.typeArguments[0]}>`,
        "u8",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v2::Incentive",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "storage", "pool", "asset", "incentiveV2", "incentiveV3", "depositAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "deposit_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawNaviArguments {
    version: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    oracleConfig: RawTransactionArgument<string>;
    priceOracle: RawTransactionArgument<string>;
    supraOracleHolder: RawTransactionArgument<string>;
    pythPriceInfo: RawTransactionArgument<string>;
    feedAddress: RawTransactionArgument<string>;
    storage: RawTransactionArgument<string>;
    pool: RawTransactionArgument<string>;
    asset: RawTransactionArgument<number>;
    incentiveV2: RawTransactionArgument<string>;
    incentiveV3: RawTransactionArgument<string>;
}
export interface WithdrawNaviOptions {
    package?: string;
    arguments:
        | WithdrawNaviArguments
        | [
              version: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              oracleConfig: RawTransactionArgument<string>,
              priceOracle: RawTransactionArgument<string>,
              supraOracleHolder: RawTransactionArgument<string>,
              pythPriceInfo: RawTransactionArgument<string>,
              feedAddress: RawTransactionArgument<string>,
              storage: RawTransactionArgument<string>,
              pool: RawTransactionArgument<string>,
              asset: RawTransactionArgument<number>,
              incentiveV2: RawTransactionArgument<string>,
              incentiveV3: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function withdrawNavi(options: WithdrawNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0xca441b44943c16be0e6e23c5a955bb971537ea3289ae8016fbf33fffe1fd210f::config::OracleConfig",
        "0xca441b44943c16be0e6e23c5a955bb971537ea3289ae8016fbf33fffe1fd210f::oracle::PriceOracle",
        "0x5d8fbbf6f908a4af8c6d072669a462d53e03eb3c1d863bd0359dc818c69ea706::SupraSValueFeed::OracleHolder",
        "0x8d97f1cd6ac663735be08d1d2b6d02a159e711586461306ce60a2b7a6a565a9e::price_info::PriceInfoObject",
        "address",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::pool::Pool<${options.typeArguments[0]}>`,
        "u8",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v2::Incentive",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "liquidityPool",
        "oracleConfig",
        "priceOracle",
        "supraOracleHolder",
        "pythPriceInfo",
        "feedAddress",
        "storage",
        "pool",
        "asset",
        "incentiveV2",
        "incentiveV3",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "withdraw_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RewardNaviArguments {
    version: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    storage: RawTransactionArgument<string>;
    rewardFund: RawTransactionArgument<string>;
    coinTypes: RawTransactionArgument<string[]>;
    ruleIds: RawTransactionArgument<string[]>;
    incentiveV3: RawTransactionArgument<string>;
}
export interface RewardNaviOptions {
    package?: string;
    arguments:
        | RewardNaviArguments
        | [
              version: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              storage: RawTransactionArgument<string>,
              rewardFund: RawTransactionArgument<string>,
              coinTypes: RawTransactionArgument<string[]>,
              ruleIds: RawTransactionArgument<string[]>,
              incentiveV3: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function rewardNavi(options: RewardNaviOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::storage::Storage",
        `0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::RewardFund<${options.typeArguments[0]}>`,
        "vector<0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String>",
        "vector<address>",
        "0xd899cf7d2b5db716bd2cf55599fb0d5ee38a3061e7b6bb6eebf73fa5bc4c81ca::incentive_v3::Incentive",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "liquidityPool", "storage", "rewardFund", "coinTypes", "ruleIds", "incentiveV3"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "reward_navi",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface BurnLp_Arguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    treasuryCaps: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
    burnLpBalance: RawTransactionArgument<string>;
}
export interface BurnLp_Options {
    package?: string;
    arguments:
        | BurnLp_Arguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              treasuryCaps: RawTransactionArgument<string>,
              oracle: RawTransactionArgument<string>,
              burnLpBalance: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
export function burnLp_(options: BurnLp_Options) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `${packageAddress}::treasury_caps::TreasuryCaps`,
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "treasuryCaps", "oracle", "burnLpBalance"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "burn_lp_",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ViewSwapResultArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    oracleFromToken: RawTransactionArgument<string>;
    oracleToToken: RawTransactionArgument<string>;
    fromAmount: RawTransactionArgument<number | bigint>;
}
export interface ViewSwapResultOptions {
    package?: string;
    arguments:
        | ViewSwapResultArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              oracleFromToken: RawTransactionArgument<string>,
              oracleToToken: RawTransactionArgument<string>,
              fromAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
export function viewSwapResult(options: ViewSwapResultOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "oracleFromToken", "oracleToToken", "fromAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "view_swap_result",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetReceiptCollateralBcsArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetReceiptCollateralBcsOptions {
    package?: string;
    arguments:
        | GetReceiptCollateralBcsArguments
        | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getReceiptCollateralBcs(options: GetReceiptCollateralBcsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_receipt_collateral_bcs",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetExpiredReceiptCollateralBcsArguments {
    registry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetExpiredReceiptCollateralBcsOptions {
    package?: string;
    arguments:
        | GetExpiredReceiptCollateralBcsArguments
        | [
              registry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
          ];
}
export function getExpiredReceiptCollateralBcs(options: GetExpiredReceiptCollateralBcsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::Registry`,
        "0x321848bf1ae327a9e022ccb3701940191e02fa193ab160d9c0e49cd3c003de3a::typus_dov_single::Registry",
        "u64",
    ] satisfies string[];
    const parameterNames = ["registry", "dovRegistry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_expired_receipt_collateral_bcs",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLiquidityPoolArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetLiquidityPoolOptions {
    package?: string;
    arguments: GetLiquidityPoolArguments | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getLiquidityPool(options: GetLiquidityPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_liquidity_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutLiquidityPoolArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetMutLiquidityPoolOptions {
    package?: string;
    arguments: GetMutLiquidityPoolArguments | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getMutLiquidityPool(options: GetMutLiquidityPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_mut_liquidity_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SafetyCheckArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
    oracleId: RawTransactionArgument<string>;
}
export interface SafetyCheckOptions {
    package?: string;
    arguments:
        | SafetyCheckArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              tokenType: RawTransactionArgument<string>,
              oracleId: RawTransactionArgument<string>,
          ];
}
export function safetyCheck(options: SafetyCheckOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "address",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType", "oracleId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "safety_check",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckActiveArguments {
    liquidityPool: RawTransactionArgument<string>;
}
export interface CheckActiveOptions {
    package?: string;
    arguments: CheckActiveArguments | [liquidityPool: RawTransactionArgument<string>];
}
export function checkActive(options: CheckActiveOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::LiquidityPool`] satisfies string[];
    const parameterNames = ["liquidityPool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "check_active",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface OracleMatchedArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
    oracleId: RawTransactionArgument<string>;
}
export interface OracleMatchedOptions {
    package?: string;
    arguments:
        | OracleMatchedArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              tokenType: RawTransactionArgument<string>,
              oracleId: RawTransactionArgument<string>,
          ];
}
export function oracleMatched(options: OracleMatchedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "address",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType", "oracleId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "oracle_matched",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetTokenPoolArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface GetTokenPoolOptions {
    package?: string;
    arguments: GetTokenPoolArguments | [liquidityPool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
export function getTokenPool(options: GetTokenPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_token_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutTokenPoolArguments {
    liquidityPool: RawTransactionArgument<string>;
    tokenType: RawTransactionArgument<string>;
}
export interface GetMutTokenPoolOptions {
    package?: string;
    arguments: GetMutTokenPoolArguments | [liquidityPool: RawTransactionArgument<string>, tokenType: RawTransactionArgument<string>];
}
export function getMutTokenPool(options: GetMutTokenPoolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "tokenType"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_mut_token_pool",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLpTokenTypeArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
}
export interface GetLpTokenTypeOptions {
    package?: string;
    arguments: GetLpTokenTypeArguments | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>];
}
export function getLpTokenType(options: GetLpTokenTypeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64"] satisfies string[];
    const parameterNames = ["registry", "index"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_lp_token_type",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLiquidityTokenDecimalArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    liquidityToken: RawTransactionArgument<string>;
}
export interface GetLiquidityTokenDecimalOptions {
    package?: string;
    arguments:
        | GetLiquidityTokenDecimalArguments
        | [
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              liquidityToken: RawTransactionArgument<string>,
          ];
}
export function getLiquidityTokenDecimal(options: GetLiquidityTokenDecimalOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["registry", "index", "liquidityToken"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_liquidity_token_decimal",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetTokenPoolStateArguments {
    liquidityPool: RawTransactionArgument<string>;
    liquidityToken: RawTransactionArgument<string>;
}
export interface GetTokenPoolStateOptions {
    package?: string;
    arguments: GetTokenPoolStateArguments | [liquidityPool: RawTransactionArgument<string>, liquidityToken: RawTransactionArgument<string>];
}
export function getTokenPoolState(options: GetTokenPoolStateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "liquidityToken"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_token_pool_state",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckTradingOrderSizeValidArguments {
    liquidityPool: RawTransactionArgument<string>;
    liquidityToken: RawTransactionArgument<string>;
    reserveAmount: RawTransactionArgument<number | bigint>;
}
export interface CheckTradingOrderSizeValidOptions {
    package?: string;
    arguments:
        | CheckTradingOrderSizeValidArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              liquidityToken: RawTransactionArgument<string>,
              reserveAmount: RawTransactionArgument<number | bigint>,
          ];
}
export function checkTradingOrderSizeValid(options: CheckTradingOrderSizeValidOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "liquidityToken", "reserveAmount"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "check_trading_order_size_valid",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetCumulativeBorrowRateArguments {
    liquidityPool: RawTransactionArgument<string>;
    liquidityToken: RawTransactionArgument<string>;
}
export interface GetCumulativeBorrowRateOptions {
    package?: string;
    arguments:
        | GetCumulativeBorrowRateArguments
        | [liquidityPool: RawTransactionArgument<string>, liquidityToken: RawTransactionArgument<string>];
}
export function getCumulativeBorrowRate(options: GetCumulativeBorrowRateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "liquidityToken"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_cumulative_borrow_rate",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetTvlUsdArguments {
    liquidityPool: RawTransactionArgument<string>;
}
export interface GetTvlUsdOptions {
    package?: string;
    arguments: GetTvlUsdArguments | [liquidityPool: RawTransactionArgument<string>];
}
export function getTvlUsd(options: GetTvlUsdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::LiquidityPool`] satisfies string[];
    const parameterNames = ["liquidityPool"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_tvl_usd",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetBorrowRateDecimalOptions {
    package?: string;
    arguments?: [];
}
export function getBorrowRateDecimal(options: GetBorrowRateDecimalOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_borrow_rate_decimal",
        });
}
export interface BurnLpArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    treasuryCaps: RawTransactionArgument<string>;
    oracle: RawTransactionArgument<string>;
    coin: RawTransactionArgument<string>;
}
export interface BurnLpOptions {
    package?: string;
    arguments:
        | BurnLpArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              index: RawTransactionArgument<number | bigint>,
              treasuryCaps: RawTransactionArgument<string>,
              oracle: RawTransactionArgument<string>,
              coin: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
export function burnLp(options: BurnLpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        `${packageAddress}::treasury_caps::TreasuryCaps`,
        "0x855eb2d260ee42b898266e6df90bfd3c4ed821ccb253a352c159c223244a4b8a::oracle::Oracle",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[1]}>`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "index", "treasuryCaps", "oracle", "coin"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "burn_lp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface DeprecatedOptions {
    package?: string;
    arguments?: [];
}
export function deprecated(options: DeprecatedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "deprecated",
        });
}
export interface GetUserDeactivatingSharesArguments {
    registry: RawTransactionArgument<string>;
    index: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface GetUserDeactivatingSharesOptions {
    package?: string;
    arguments:
        | GetUserDeactivatingSharesArguments
        | [registry: RawTransactionArgument<string>, index: RawTransactionArgument<number | bigint>, user: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function getUserDeactivatingShares(options: GetUserDeactivatingSharesOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::lp_pool::Registry`, "u64", "address"] satisfies string[];
    const parameterNames = ["registry", "index", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lp_pool",
            function: "get_user_deactivating_shares",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
