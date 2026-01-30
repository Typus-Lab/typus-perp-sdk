/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
import * as linked_object_table from "./deps/typus/linked_object_table";
import * as type_name from "./deps/std/type_name";
import * as object_table from "./deps/sui/object_table";
import * as keyed_big_vector from "./deps/typus/keyed_big_vector";
const $moduleName = "@typus/perp::trading";
export const MarketRegistry = new MoveStruct({
    name: `${$moduleName}::MarketRegistry`,
    fields: {
        id: object.UID,
        /** The UID of the referral registry. */
        referral_registry: object.UID,
        /** A linked object table of markets. */
        markets: linked_object_table.LinkedObjectTable(bcs.u64()),
        /** The number of markets. */
        num_market: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const Markets = new MoveStruct({
    name: `${$moduleName}::Markets`,
    fields: {
        id: object.UID,
        /** The index of the market. */
        index: bcs.u64(),
        /** The type name of the LP token. */
        lp_token_type: type_name.TypeName,
        /** The type name of the quote token. */
        quote_token_type: type_name.TypeName,
        /** Whether the market is active. */
        is_active: bcs.bool(),
        /** The protocol's share of the trading fee in basis points. */
        protocol_fee_share_bp: bcs.u64(),
        /** A vector of the symbols in the market. */
        symbols: bcs.vector(type_name.TypeName),
        /** An object table of the symbol markets. */
        symbol_markets: object_table.ObjectTable,
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const MarketInfo = new MoveStruct({
    name: `${$moduleName}::MarketInfo`,
    fields: {
        /** Whether the market is active. */
        is_active: bcs.bool(),
        /** The number of decimals for the size. */
        size_decimal: bcs.u64(),
        /** The total size of long positions. */
        user_long_position_size: bcs.u64(),
        /** The total size of short positions. */
        user_short_position_size: bcs.u64(),
        /** The next position ID. */
        next_position_id: bcs.u64(),
        /** The total size of long orders. */
        user_long_order_size: bcs.u64(),
        /** The total size of short orders. */
        user_short_order_size: bcs.u64(),
        /** The next order ID. */
        next_order_id: bcs.u64(),
        /** The timestamp of the last funding. */
        last_funding_ts_ms: bcs.u64(),
        /** The sign of the cumulative funding rate index. */
        cumulative_funding_rate_index_sign: bcs.bool(),
        /** The cumulative funding rate index. */
        cumulative_funding_rate_index: bcs.u64(),
        /** The previous timestamp of the last funding. */
        previous_last_funding_ts_ms: bcs.u64(),
        /** The previous sign of the cumulative funding rate index. */
        previous_cumulative_funding_rate_index_sign: bcs.bool(),
        /** The previous cumulative funding rate index. */
        previous_cumulative_funding_rate_index: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const MarketConfig = new MoveStruct({
    name: `${$moduleName}::MarketConfig`,
    fields: {
        /** The address of the oracle. */
        oracle_id: bcs.Address,
        /** The maximum leverage in mega basis points. */
        max_leverage_mbp: bcs.u64(),
        /** The maximum leverage for option collateral in mega basis points. */
        option_collateral_max_leverage_mbp: bcs.u64(),
        /** The minimum size of an order. */
        min_size: bcs.u64(),
        /** The lot size of an order. */
        lot_size: bcs.u64(),
        /** The trading fee configuration. */
        trading_fee_config: bcs.vector(bcs.u64()),
        /** The basic funding rate. */
        basic_funding_rate: bcs.u64(),
        /** The funding interval in milliseconds. */
        funding_interval_ts_ms: bcs.u64(),
        /** The experience multiplier. */
        exp_multiplier: bcs.u64(),
        /** The cool down threshold in milliseconds. */
        cool_down_threshold_ts_ms: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SymbolMarket = new MoveStruct({
    name: `${$moduleName}::SymbolMarket`,
    fields: {
        id: object.UID,
        /** A keyed big vector of user positions. */
        user_positions: keyed_big_vector.KeyedBigVector,
        /** The UID of the token collateral orders. */
        token_collateral_orders: object.UID,
        /** The UID of the option collateral orders. */
        option_collateral_orders: object.UID,
        /** Information about the market. */
        market_info: MarketInfo,
        /** Configuration for the market. */
        market_config: MarketConfig,
    },
});
export const USD = new MoveStruct({
    name: `${$moduleName}::USD`,
    fields: {
        dummy_field: bcs.bool(),
    },
});
export const NewMarketsEvent = new MoveStruct({
    name: `${$moduleName}::NewMarketsEvent`,
    fields: {
        index: bcs.u64(),
        lp_token_type: type_name.TypeName,
        quote_token_type: type_name.TypeName,
        protocol_fee_share_bp: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const AddTradingSymbolEvent = new MoveStruct({
    name: `${$moduleName}::AddTradingSymbolEvent`,
    fields: {
        index: bcs.u64(),
        base_token_type: type_name.TypeName,
        market_info: MarketInfo,
        market_config: MarketConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateProtocolFeeShareBpEvent = new MoveStruct({
    name: `${$moduleName}::UpdateProtocolFeeShareBpEvent`,
    fields: {
        index: bcs.u64(),
        previous_protocol_fee_share_bp: bcs.u64(),
        new_protocol_fee_share_bp: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateMarketConfigEvent = new MoveStruct({
    name: `${$moduleName}::UpdateMarketConfigEvent`,
    fields: {
        index: bcs.u64(),
        base_token_type: type_name.TypeName,
        previous_market_config: MarketConfig,
        new_market_config: MarketConfig,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SuspendMarketEvent = new MoveStruct({
    name: `${$moduleName}::SuspendMarketEvent`,
    fields: {
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ResumeMarketEvent = new MoveStruct({
    name: `${$moduleName}::ResumeMarketEvent`,
    fields: {
        index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SuspendTradingSymbolEvent = new MoveStruct({
    name: `${$moduleName}::SuspendTradingSymbolEvent`,
    fields: {
        index: bcs.u64(),
        suspended_base_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ResumeTradingSymbolEvent = new MoveStruct({
    name: `${$moduleName}::ResumeTradingSymbolEvent`,
    fields: {
        index: bcs.u64(),
        resumed_base_token: type_name.TypeName,
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const CreateTradingOrderEvent = new MoveStruct({
    name: `${$moduleName}::CreateTradingOrderEvent`,
    fields: {
        user: bcs.Address,
        market_index: bcs.u64(),
        pool_index: bcs.u64(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        order_id: bcs.u64(),
        linked_position_id: bcs.option(bcs.u64()),
        collateral_amount: bcs.u64(),
        leverage_mbp: bcs.u64(),
        reduce_only: bcs.bool(),
        is_long: bcs.bool(),
        is_stop_order: bcs.bool(),
        size: bcs.u64(),
        trigger_price: bcs.u64(),
        filled: bcs.bool(),
        filled_price: bcs.option(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const CancelTradingOrderEvent = new MoveStruct({
    name: `${$moduleName}::CancelTradingOrderEvent`,
    fields: {
        user: bcs.Address,
        market_index: bcs.u64(),
        order_id: bcs.u64(),
        trigger_price: bcs.u64(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        released_collateral_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ReleaseCollateralEvent = new MoveStruct({
    name: `${$moduleName}::ReleaseCollateralEvent`,
    fields: {
        user: bcs.Address,
        market_index: bcs.u64(),
        pool_index: bcs.u64(),
        position_id: bcs.u64(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        released_collateral_amount: bcs.u64(),
        remaining_collateral_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const IncreaseCollateralEvent = new MoveStruct({
    name: `${$moduleName}::IncreaseCollateralEvent`,
    fields: {
        user: bcs.Address,
        market_index: bcs.u64(),
        pool_index: bcs.u64(),
        position_id: bcs.u64(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        increased_collateral_amount: bcs.u64(),
        remaining_collateral_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const CreateTradingOrderWithBidReceiptsEvent = new MoveStruct({
    name: `${$moduleName}::CreateTradingOrderWithBidReceiptsEvent`,
    fields: {
        user: bcs.Address,
        market_index: bcs.u64(),
        pool_index: bcs.u64(),
        dov_index: bcs.u64(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        order_id: bcs.u64(),
        collateral_in_deposit_token: bcs.u64(),
        is_long: bcs.bool(),
        size: bcs.u64(),
        trigger_price: bcs.u64(),
        filled: bcs.bool(),
        filled_price: bcs.option(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const MatchTradingOrderEvent = new MoveStruct({
    name: `${$moduleName}::MatchTradingOrderEvent`,
    fields: {
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        matched_order_ids: bcs.vector(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerCancelOrdersEvent = new MoveStruct({
    name: `${$moduleName}::ManagerCancelOrdersEvent`,
    fields: {
        reason: bcs.string(),
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        order_type_tag: bcs.u8(),
        order_ids: bcs.vector(bcs.u64()),
        order_sizes: bcs.vector(bcs.u64()),
        order_prices: bcs.vector(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerReducePositionEvent = new MoveStruct({
    name: `${$moduleName}::ManagerReducePositionEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        position_id: bcs.u64(),
        reduced_size: bcs.u64(),
        collateral_price: bcs.u64(),
        trading_price: bcs.u64(),
        cancelled_order_ids: bcs.vector(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerClearPositionEvent = new MoveStruct({
    name: `${$moduleName}::ManagerClearPositionEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        position_id: bcs.u64(),
        removed_size: bcs.u64(),
        cancelled_order_ids: bcs.vector(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ManagerCloseOptionPositionEvent = new MoveStruct({
    name: `${$moduleName}::ManagerCloseOptionPositionEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        position_id: bcs.u64(),
        order_size: bcs.u64(),
        collateral_price: bcs.u64(),
        trading_price: bcs.u64(),
        cancelled_order_ids: bcs.vector(bcs.u64()),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const LiquidationInfo = new MoveStruct({
    name: `${$moduleName}::LiquidationInfo`,
    fields: {
        position_id: bcs.u64(),
        dov_index: bcs.option(bcs.u64()),
        bid_token: bcs.option(type_name.TypeName),
    },
});
export const LiquidateEvent = new MoveStruct({
    name: `${$moduleName}::LiquidateEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        base_token: type_name.TypeName,
        position_id: bcs.u64(),
        collateral_price: bcs.u64(),
        trading_price: bcs.u64(),
        realized_liquidator_fee: bcs.u64(),
        realized_value_for_lp_pool: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const SettleReceiptCollateralEvent = new MoveStruct({
    name: `${$moduleName}::SettleReceiptCollateralEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        bid_token: type_name.TypeName,
        position_id: bcs.u64(),
        realized_liquidator_fee: bcs.u64(),
        remaining_unrealized_sign: bcs.bool(),
        remaining_unrealized_value: bcs.u64(),
        remaining_value_for_lp_pool: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const UpdateFundingRateEvent = new MoveStruct({
    name: `${$moduleName}::UpdateFundingRateEvent`,
    fields: {
        base_token: type_name.TypeName,
        new_funding_ts_ms: bcs.u64(),
        intervals_count: bcs.u64(),
        previous_cumulative_funding_rate_index_sign: bcs.bool(),
        previous_cumulative_funding_rate_index: bcs.u64(),
        cumulative_funding_rate_index_sign: bcs.bool(),
        cumulative_funding_rate_index: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const ExpiredPositionInfo = new MoveStruct({
    name: `${$moduleName}::ExpiredPositionInfo`,
    fields: {
        position_id: bcs.u64(),
        dov_index: bcs.u64(),
        collateral_token: type_name.TypeName,
        bid_token: type_name.TypeName,
        base_token: type_name.TypeName,
    },
});
export const RealizeOptionPositionEvent = new MoveStruct({
    name: `${$moduleName}::RealizeOptionPositionEvent`,
    fields: {
        position_user: bcs.Address,
        position_id: bcs.u64(),
        trading_symbol: type_name.TypeName,
        realize_balance_token_type: type_name.TypeName,
        exercise_balance_value: bcs.u64(),
        user_remaining_value: bcs.u64(),
        user_remaining_in_usd: bcs.u64(),
        realized_loss_value: bcs.u64(),
        fee_value: bcs.u64(),
        realized_trading_fee: bcs.u64(),
        realized_borrow_fee: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
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
            module: "trading",
            function: "init",
        });
}
export interface NewMarketsArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    protocolFeeShareBp: RawTransactionArgument<number | bigint>;
}
export interface NewMarketsOptions {
    package?: string;
    arguments:
        | NewMarketsArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              protocolFeeShareBp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Creates a new market. */
export function newMarkets(options: NewMarketsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "protocolFeeShareBp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "new_markets",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AddTradingSymbolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    oracle: RawTransactionArgument<string>;
    maxLeverageMbp: RawTransactionArgument<number | bigint>;
    optionCollateralMaxLeverageMbp: RawTransactionArgument<number | bigint>;
    minSize: RawTransactionArgument<number | bigint>;
    lotSize: RawTransactionArgument<number | bigint>;
    tradingFeeConfig: RawTransactionArgument<number | bigint[]>;
    basicFundingRate: RawTransactionArgument<number | bigint>;
    fundingIntervalTsMs: RawTransactionArgument<number | bigint>;
    expMultiplier: RawTransactionArgument<number | bigint>;
    maxBuyOpenInterest: RawTransactionArgument<number | bigint>;
    maxSellOpenInterest: RawTransactionArgument<number | bigint>;
    maintenanceMarginRateBp: RawTransactionArgument<number | bigint>;
    optionMaintenanceMarginRateBp: RawTransactionArgument<number | bigint>;
    optionTradingFeeConfig: RawTransactionArgument<number | bigint[]>;
    tradingFeeFormulaVersion: RawTransactionArgument<number | bigint>;
    profitVaultFlag: RawTransactionArgument<number | bigint>;
}
export interface AddTradingSymbolOptions {
    package?: string;
    arguments:
        | AddTradingSymbolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              oracle: RawTransactionArgument<string>,
              maxLeverageMbp: RawTransactionArgument<number | bigint>,
              optionCollateralMaxLeverageMbp: RawTransactionArgument<number | bigint>,
              minSize: RawTransactionArgument<number | bigint>,
              lotSize: RawTransactionArgument<number | bigint>,
              tradingFeeConfig: RawTransactionArgument<number | bigint[]>,
              basicFundingRate: RawTransactionArgument<number | bigint>,
              fundingIntervalTsMs: RawTransactionArgument<number | bigint>,
              expMultiplier: RawTransactionArgument<number | bigint>,
              maxBuyOpenInterest: RawTransactionArgument<number | bigint>,
              maxSellOpenInterest: RawTransactionArgument<number | bigint>,
              maintenanceMarginRateBp: RawTransactionArgument<number | bigint>,
              optionMaintenanceMarginRateBp: RawTransactionArgument<number | bigint>,
              optionTradingFeeConfig: RawTransactionArgument<number | bigint[]>,
              tradingFeeFormulaVersion: RawTransactionArgument<number | bigint>,
              profitVaultFlag: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Adds a new trading symbol to a market. */
export function addTradingSymbol(options: AddTradingSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u64",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "u64",
        "u64",
        "u64",
        "u64",
        "vector<u64>",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "vector<u64>",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "marketIndex",
        "sizeDecimal",
        "oracle",
        "maxLeverageMbp",
        "optionCollateralMaxLeverageMbp",
        "minSize",
        "lotSize",
        "tradingFeeConfig",
        "basicFundingRate",
        "fundingIntervalTsMs",
        "expMultiplier",
        "maxBuyOpenInterest",
        "maxSellOpenInterest",
        "maintenanceMarginRateBp",
        "optionMaintenanceMarginRateBp",
        "optionTradingFeeConfig",
        "tradingFeeFormulaVersion",
        "profitVaultFlag",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "add_trading_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateProtocolFeeShareBpArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    protocolFeeShareBp: RawTransactionArgument<number | bigint>;
}
export interface UpdateProtocolFeeShareBpOptions {
    package?: string;
    arguments:
        | UpdateProtocolFeeShareBpArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              protocolFeeShareBp: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Updates the protocol fee share. */
export function updateProtocolFeeShareBp(options: UpdateProtocolFeeShareBpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "protocolFeeShareBp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "update_protocol_fee_share_bp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateMarketConfigArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    oracleId: RawTransactionArgument<string | null>;
    maxLeverageMbp: RawTransactionArgument<number | bigint | null>;
    optionCollateralMaxLeverageMbp: RawTransactionArgument<number | bigint | null>;
    minSize: RawTransactionArgument<number | bigint | null>;
    lotSize: RawTransactionArgument<number | bigint | null>;
    tradingFeeConfig: RawTransactionArgument<number | bigint[] | null>;
    basicFundingRate: RawTransactionArgument<number | bigint | null>;
    fundingIntervalTsMs: RawTransactionArgument<number | bigint | null>;
    expMultiplier: RawTransactionArgument<number | bigint | null>;
    maxBuyOpenInterest: RawTransactionArgument<number | bigint | null>;
    maxSellOpenInterest: RawTransactionArgument<number | bigint | null>;
    maintenanceMarginRateBp: RawTransactionArgument<number | bigint | null>;
    optionCollateralMaintenanceMarginRateBp: RawTransactionArgument<number | bigint | null>;
    optionCollateralTradingFeeConfig: RawTransactionArgument<number | bigint[] | null>;
    tradingFeeFormulaVersion: RawTransactionArgument<number | bigint | null>;
    profitVaultFlag: RawTransactionArgument<number | bigint | null>;
}
export interface UpdateMarketConfigOptions {
    package?: string;
    arguments:
        | UpdateMarketConfigArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              oracleId: RawTransactionArgument<string | null>,
              maxLeverageMbp: RawTransactionArgument<number | bigint | null>,
              optionCollateralMaxLeverageMbp: RawTransactionArgument<number | bigint | null>,
              minSize: RawTransactionArgument<number | bigint | null>,
              lotSize: RawTransactionArgument<number | bigint | null>,
              tradingFeeConfig: RawTransactionArgument<number | bigint[] | null>,
              basicFundingRate: RawTransactionArgument<number | bigint | null>,
              fundingIntervalTsMs: RawTransactionArgument<number | bigint | null>,
              expMultiplier: RawTransactionArgument<number | bigint | null>,
              maxBuyOpenInterest: RawTransactionArgument<number | bigint | null>,
              maxSellOpenInterest: RawTransactionArgument<number | bigint | null>,
              maintenanceMarginRateBp: RawTransactionArgument<number | bigint | null>,
              optionCollateralMaintenanceMarginRateBp: RawTransactionArgument<number | bigint | null>,
              optionCollateralTradingFeeConfig: RawTransactionArgument<number | bigint[] | null>,
              tradingFeeFormulaVersion: RawTransactionArgument<number | bigint | null>,
              profitVaultFlag: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Updates the market configuration. */
export function updateMarketConfig(options: UpdateMarketConfigOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<vector<u64>>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<vector<u64>>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "marketIndex",
        "oracleId",
        "maxLeverageMbp",
        "optionCollateralMaxLeverageMbp",
        "minSize",
        "lotSize",
        "tradingFeeConfig",
        "basicFundingRate",
        "fundingIntervalTsMs",
        "expMultiplier",
        "maxBuyOpenInterest",
        "maxSellOpenInterest",
        "maintenanceMarginRateBp",
        "optionCollateralMaintenanceMarginRateBp",
        "optionCollateralTradingFeeConfig",
        "tradingFeeFormulaVersion",
        "profitVaultFlag",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "update_market_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface SuspendMarketArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface SuspendMarketOptions {
    package?: string;
    arguments:
        | SuspendMarketArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Suspends a market. */
export function suspendMarket(options: SuspendMarketOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "suspend_market",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface ResumeMarketArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface ResumeMarketOptions {
    package?: string;
    arguments:
        | ResumeMarketArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
}
/** [Authorized Function] Resumes a market. */
export function resumeMarket(options: ResumeMarketOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "resume_market",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SuspendTradingSymbolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface SuspendTradingSymbolOptions {
    package?: string;
    arguments:
        | SuspendTradingSymbolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Suspends a trading symbol. */
export function suspendTradingSymbol(options: SuspendTradingSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "suspend_trading_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ResumeTradingSymbolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface ResumeTradingSymbolOptions {
    package?: string;
    arguments:
        | ResumeTradingSymbolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Resumes a trading symbol. */
export function resumeTradingSymbol(options: ResumeTradingSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "resume_trading_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemoveTradingSymbolArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface RemoveTradingSymbolOptions {
    package?: string;
    arguments:
        | RemoveTradingSymbolArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Removes a trading symbol from a market. */
export function removeTradingSymbol(options: RemoveTradingSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "remove_trading_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CreateTradingOrderArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    linkedPositionId: RawTransactionArgument<number | bigint | null>;
    collateral: RawTransactionArgument<string>;
    reduceOnly: RawTransactionArgument<boolean>;
    isLong: RawTransactionArgument<boolean>;
    isStopOrder: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
    triggerPrice: RawTransactionArgument<number | bigint>;
}
export interface CreateTradingOrderOptions {
    package?: string;
    arguments:
        | CreateTradingOrderArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              linkedPositionId: RawTransactionArgument<number | bigint | null>,
              collateral: RawTransactionArgument<string>,
              reduceOnly: RawTransactionArgument<boolean>,
              isLong: RawTransactionArgument<boolean>,
              isStopOrder: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
              triggerPrice: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [User Function] Creates a new trading order. */
export function createTradingOrder(options: CreateTradingOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
        "bool",
        "bool",
        "bool",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "linkedPositionId",
        "collateral",
        "reduceOnly",
        "isLong",
        "isStopOrder",
        "size",
        "triggerPrice",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "create_trading_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CancelTradingOrderArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    orderId: RawTransactionArgument<number | bigint>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    orderUser: RawTransactionArgument<string | null>;
}
export interface CancelTradingOrderOptions {
    package?: string;
    arguments:
        | CancelTradingOrderArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              orderId: RawTransactionArgument<number | bigint>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              orderUser: RawTransactionArgument<string | null>,
          ];
    typeArguments: [string, string];
}
/** [User Function] Cancels a trading order. */
export function cancelTradingOrder(options: CancelTradingOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<address>",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "orderId", "triggerPrice", "orderUser"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "cancel_trading_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ReleaseCollateralArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
    releaseAmount: RawTransactionArgument<number | bigint>;
}
export interface ReleaseCollateralOptions {
    package?: string;
    arguments:
        | ReleaseCollateralArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
              releaseAmount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/**
 * [User Function] Releases collateral from a position. Safe with
 * `check_position_user_matched`
 */
export function releaseCollateral(options: ReleaseCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
        "releaseAmount",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "release_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface IncreaseCollateralArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
    collateral: RawTransactionArgument<string>;
}
export interface IncreaseCollateralOptions {
    package?: string;
    arguments:
        | IncreaseCollateralArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
              collateral: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/**
 * [User Function] Increases the collateral of a position. Safe with
 * `check_position_user_matched`
 */
export function increaseCollateral(options: IncreaseCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
        "collateral",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "increase_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CollectPositionFundingFeeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface CollectPositionFundingFeeOptions {
    package?: string;
    arguments:
        | CollectPositionFundingFeeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** Collects the funding fee for a position. Safe with `check_position_user_matched` */
export function collectPositionFundingFee(options: CollectPositionFundingFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "collect_position_funding_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CreateTradingOrderWithBidReceiptArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    collateralBidReceipt: RawTransactionArgument<string>;
    isLong: RawTransactionArgument<boolean>;
}
export interface CreateTradingOrderWithBidReceiptOptions {
    package?: string;
    arguments:
        | CreateTradingOrderWithBidReceiptArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              collateralBidReceipt: RawTransactionArgument<string>,
              isLong: RawTransactionArgument<boolean>,
          ];
    typeArguments: [string, string, string];
}
/** [User Function] Creates a new trading order with a bid receipt as collateral. */
export function createTradingOrderWithBidReceipt(options: CreateTradingOrderWithBidReceiptOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded::vault::TypusBidReceipt",
        "bool",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "collateralBidReceipt",
        "isLong",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "create_trading_order_with_bid_receipt",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ReduceOptionCollateralPositionSizeArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    positionId: RawTransactionArgument<number | bigint>;
    orderSize: RawTransactionArgument<number | bigint | null>;
}
export interface ReduceOptionCollateralPositionSizeOptions {
    package?: string;
    arguments:
        | ReduceOptionCollateralPositionSizeArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              positionId: RawTransactionArgument<number | bigint>,
              orderSize: RawTransactionArgument<number | bigint | null>,
          ];
    typeArguments: [string, string, string];
}
/** [User Function] Reduces the size of an option collateral position. */
export function reduceOptionCollateralPositionSize(options: ReduceOptionCollateralPositionSizeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "positionId",
        "orderSize",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "reduce_option_collateral_position_size",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface MatchTradingOrderArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    orderTypeTag: RawTransactionArgument<number>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    maxOperationCount: RawTransactionArgument<number | bigint>;
}
export interface MatchTradingOrderOptions {
    package?: string;
    arguments:
        | MatchTradingOrderArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              orderTypeTag: RawTransactionArgument<number>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              maxOperationCount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Matches trading orders. */
export function matchTradingOrder(options: MatchTradingOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        `${packageAddress}::profit_vault::ProfitVault`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "u8",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "profitVault",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "orderTypeTag",
        "triggerPrice",
        "maxOperationCount",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "match_trading_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerCancelOrderByOpenInterestLimitArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    orderTypeTag: RawTransactionArgument<number>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    maxOperationCount: RawTransactionArgument<number | bigint>;
}
export interface ManagerCancelOrderByOpenInterestLimitOptions {
    package?: string;
    arguments:
        | ManagerCancelOrderByOpenInterestLimitArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              orderTypeTag: RawTransactionArgument<number>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              maxOperationCount: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Cancels orders by the manager due to open interest limit. */
export function managerCancelOrderByOpenInterestLimit(options: ManagerCancelOrderByOpenInterestLimitOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "u8",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "marketIndex",
        "poolIndex",
        "orderTypeTag",
        "triggerPrice",
        "maxOperationCount",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "manager_cancel_order_by_open_interest_limit",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CancelLinkedOrdersArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    linkedOrderIds: RawTransactionArgument<number | bigint[]>;
    linkedOrderPrices: RawTransactionArgument<number | bigint[]>;
    user: RawTransactionArgument<string>;
}
export interface CancelLinkedOrdersOptions {
    package?: string;
    arguments:
        | CancelLinkedOrdersArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              linkedOrderIds: RawTransactionArgument<number | bigint[]>,
              linkedOrderPrices: RawTransactionArgument<number | bigint[]>,
              user: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Cancels linked orders. */
export function cancelLinkedOrders(options: CancelLinkedOrdersOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "vector<u64>",
        "vector<u64>",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "linkedOrderIds", "linkedOrderPrices", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "cancel_linked_orders",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerReducePositionArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    positionId: RawTransactionArgument<number | bigint>;
    reducedRatioBp: RawTransactionArgument<number | bigint>;
}
export interface ManagerReducePositionOptions {
    package?: string;
    arguments:
        | ManagerReducePositionArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              positionId: RawTransactionArgument<number | bigint>,
              reducedRatioBp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Reduces a position by the manager. */
export function managerReducePosition(options: ManagerReducePositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        `${packageAddress}::profit_vault::ProfitVault`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "profitVault",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "positionId",
        "reducedRatioBp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "manager_reduce_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerClearPositionArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface ManagerClearPositionOptions {
    package?: string;
    arguments:
        | ManagerClearPositionArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
export function managerClearPosition(options: ManagerClearPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "poolRegistry", "marketIndex", "poolIndex", "positionId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "manager_clear_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerCloseOptionPositionArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface ManagerCloseOptionPositionOptions {
    package?: string;
    arguments:
        | ManagerCloseOptionPositionArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string, string];
}
/** [Authorized Function] Closes an option position by the manager. */
export function managerCloseOptionPosition(options: ManagerCloseOptionPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "positionId",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "manager_close_option_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetTradingFeeConfigArguments {
    marketConfig: RawTransactionArgument<string>;
    isOptionPosition: RawTransactionArgument<boolean>;
}
export interface GetTradingFeeConfigOptions {
    package?: string;
    arguments:
        | GetTradingFeeConfigArguments
        | [marketConfig: RawTransactionArgument<string>, isOptionPosition: RawTransactionArgument<boolean>];
}
export function getTradingFeeConfig(options: GetTradingFeeConfigOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::MarketConfig`, "bool"] satisfies string[];
    const parameterNames = ["marketConfig", "isOptionPosition"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_trading_fee_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLiquidationInfoArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    getAll: RawTransactionArgument<boolean>;
}
export interface GetLiquidationInfoOptions {
    package?: string;
    arguments:
        | GetLiquidationInfoArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              getAll: RawTransactionArgument<boolean>,
          ];
    typeArguments: [string, string];
}
/** [View Function] Gets the liquidation information for a position. */
export function getLiquidationInfo(options: GetLiquidationInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "bool",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "getAll",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_liquidation_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface LiquidateArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface LiquidateOptions {
    package?: string;
    arguments:
        | LiquidateArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string, string];
}
/** [Authorized Function] Liquidates a position. */
export function liquidate(options: LiquidateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "liquidate",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface SettleReceiptCollateralArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
}
export interface SettleReceiptCollateralOptions {
    package?: string;
    arguments:
        | SettleReceiptCollateralArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [Authorized Function] Settles receipt collateral. */
export function settleReceiptCollateral(options: SettleReceiptCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "poolRegistry", "dovRegistry", "typusOracleCToken", "marketIndex", "poolIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "settle_receipt_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface UpdateFundingRateArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
}
export interface UpdateFundingRateOptions {
    package?: string;
    arguments:
        | UpdateFundingRateArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Updates the funding rate. */
export function updateFundingRate(options: UpdateFundingRateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "poolRegistry", "typusOracleTradingSymbol", "marketIndex", "poolIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "update_funding_rate",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetExpiredPositionInfoArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
}
export interface GetExpiredPositionInfoOptions {
    package?: string;
    arguments:
        | GetExpiredPositionInfoArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
          ];
}
export function getExpiredPositionInfo(options: GetExpiredPositionInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "poolRegistry", "dovRegistry", "marketIndex", "poolIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_expired_position_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface InitUserAccountTableArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface InitUserAccountTableOptions {
    package?: string;
    arguments:
        | InitUserAccountTableArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
}
/**
 * [Authorized Function] Initializes the user account table. TODO: can be removed,
 * only use once.
 */
export function initUserAccountTable(options: InitUserAccountTableOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "init_user_account_table",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CreateUserAccountArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface CreateUserAccountOptions {
    package?: string;
    arguments:
        | CreateUserAccountArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
          ];
}
/** [User Function] Creates a new user account. */
export function createUserAccount(options: CreateUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "create_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddDelegateUserArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface AddDelegateUserOptions {
    package?: string;
    arguments:
        | AddDelegateUserArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
/** [User Function] Adds a delegate user to a user account. Safe with `check_owner` */
export function addDelegateUser(options: AddDelegateUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "add_delegate_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveDelegateUserArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface RemoveDelegateUserOptions {
    package?: string;
    arguments:
        | RemoveDelegateUserArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
/**
 * [User Function] Remove a delegate user to a user account. Safe with
 * `check_owner`
 */
export function removeDelegateUser(options: RemoveDelegateUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "remove_delegate_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemoveUserAccountArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    userAccountCap: RawTransactionArgument<string>;
}
export interface RemoveUserAccountOptions {
    package?: string;
    arguments:
        | RemoveUserAccountArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              userAccountCap: RawTransactionArgument<string>,
          ];
}
/** [User Function] Removes a user account. Safe with `UserAccountCap` */
export function removeUserAccount(options: RemoveUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        `${packageAddress}::user_account::UserAccountCap`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "userAccountCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "remove_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface DepositUserAccountArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    collateral: RawTransactionArgument<string>;
}
export interface DepositUserAccountOptions {
    package?: string;
    arguments:
        | DepositUserAccountArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              collateral: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** Deposits collateral into a user account. Safe with `check_owner` */
export function depositUserAccount(options: DepositUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<${options.typeArguments[0]}>`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "collateral"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "deposit_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawUserAccountArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    amount: RawTransactionArgument<number | bigint | null>;
    userAccountCap: RawTransactionArgument<string>;
}
export interface WithdrawUserAccountOptions {
    package?: string;
    arguments:
        | WithdrawUserAccountArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              amount: RawTransactionArgument<number | bigint | null>,
              userAccountCap: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/** Withdraws collateral from a user account. Safe with `UserAccountCap` */
export function withdrawUserAccount(options: WithdrawUserAccountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        `${packageAddress}::user_account::UserAccountCap`,
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "amount", "userAccountCap"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "withdraw_user_account",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ExecuteOrder_Arguments {
    version: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    symbolMarket: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    profitVault: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    protocolFeeShareBp: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
}
export interface ExecuteOrder_Options {
    package?: string;
    arguments:
        | ExecuteOrder_Arguments
        | [
              version: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              symbolMarket: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              profitVault: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              protocolFeeShareBp: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function executeOrder_(options: ExecuteOrder_Options) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "u64",
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        `${packageAddress}::profit_vault::ProfitVault`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "marketIndex",
        "symbolMarket",
        "liquidityPool",
        "profitVault",
        "order",
        "protocolFeeShareBp",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "execute_order_",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ExecuteOptionCollateralOrder_Arguments {
    version: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    symbolMarket: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    protocolFeeShareBp: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    typusEcosystemVersion: RawTransactionArgument<string>;
    typusUserRegistry: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
}
export interface ExecuteOptionCollateralOrder_Options {
    package?: string;
    arguments:
        | ExecuteOptionCollateralOrder_Arguments
        | [
              version: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              symbolMarket: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              protocolFeeShareBp: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              typusEcosystemVersion: RawTransactionArgument<string>,
              typusUserRegistry: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
          ];
    typeArguments: [string, string];
}
export function executeOptionCollateralOrder_(options: ExecuteOptionCollateralOrder_Options) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::user::TypusUserRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "dovRegistry",
        "typusOracleTradingSymbol",
        "typusOracleCToken",
        "symbolMarket",
        "liquidityPool",
        "order",
        "protocolFeeShareBp",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
        "typusEcosystemVersion",
        "typusUserRegistry",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "execute_option_collateral_order_",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemoveLinkedOrdersArguments {
    version: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    symbolMarket: RawTransactionArgument<string>;
    linkedOrderIds: RawTransactionArgument<number | bigint[]>;
    linkedOrderPrices: RawTransactionArgument<number | bigint[]>;
    user: RawTransactionArgument<string>;
}
export interface RemoveLinkedOrdersOptions {
    package?: string;
    arguments:
        | RemoveLinkedOrdersArguments
        | [
              version: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              symbolMarket: RawTransactionArgument<string>,
              linkedOrderIds: RawTransactionArgument<number | bigint[]>,
              linkedOrderPrices: RawTransactionArgument<number | bigint[]>,
              user: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function removeLinkedOrders(options: RemoveLinkedOrdersOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "u64",
        `${packageAddress}::trading::SymbolMarket`,
        "vector<u64>",
        "vector<u64>",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "marketIndex", "symbolMarket", "linkedOrderIds", "linkedOrderPrices", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "remove_linked_orders",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemoveLinkedOrder_Arguments {
    version: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    symbolMarket: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface RemoveLinkedOrder_Options {
    package?: string;
    arguments:
        | RemoveLinkedOrder_Arguments
        | [
              version: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              symbolMarket: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              user: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function removeLinkedOrder_(options: RemoveLinkedOrder_Options) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "u64",
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::position::TradingOrder`,
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "marketIndex", "symbolMarket", "order", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "remove_linked_order_",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetMutOrdersArguments {
    symbolMarket: RawTransactionArgument<string>;
    isTokenCollateral: RawTransactionArgument<boolean>;
    orderTypeTag: RawTransactionArgument<number>;
}
export interface GetMutOrdersOptions {
    package?: string;
    arguments:
        | GetMutOrdersArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              isTokenCollateral: RawTransactionArgument<boolean>,
              orderTypeTag: RawTransactionArgument<number>,
          ];
}
export function getMutOrders(options: GetMutOrdersOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::SymbolMarket`, "bool", "u8"] satisfies string[];
    const parameterNames = ["symbolMarket", "isTokenCollateral", "orderTypeTag"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_mut_orders",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrdersArguments {
    symbolMarket: RawTransactionArgument<string>;
    isTokenCollateral: RawTransactionArgument<boolean>;
    orderTypeTag: RawTransactionArgument<number>;
}
export interface GetOrdersOptions {
    package?: string;
    arguments:
        | GetOrdersArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              isTokenCollateral: RawTransactionArgument<boolean>,
              orderTypeTag: RawTransactionArgument<number>,
          ];
}
export function getOrders(options: GetOrdersOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::SymbolMarket`, "bool", "u8"] satisfies string[];
    const parameterNames = ["symbolMarket", "isTokenCollateral", "orderTypeTag"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_orders",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface TakeOrderByOrderIdAndPriceArguments {
    symbolMarket: RawTransactionArgument<string>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    orderId: RawTransactionArgument<number | bigint>;
    isTokenCollateral: RawTransactionArgument<boolean>;
    user: RawTransactionArgument<string>;
}
export interface TakeOrderByOrderIdAndPriceOptions {
    package?: string;
    arguments:
        | TakeOrderByOrderIdAndPriceArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              orderId: RawTransactionArgument<number | bigint>,
              isTokenCollateral: RawTransactionArgument<boolean>,
              user: RawTransactionArgument<string>,
          ];
}
export function takeOrderByOrderIdAndPrice(options: TakeOrderByOrderIdAndPriceOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::SymbolMarket`, "u64", "u64", "bool", "address"] satisfies string[];
    const parameterNames = ["symbolMarket", "triggerPrice", "orderId", "isTokenCollateral", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "take_order_by_order_id_and_price",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetLinkedPositionArguments {
    symbolMarket: RawTransactionArgument<string>;
    linkedPositionId: RawTransactionArgument<number | bigint | null>;
    user: RawTransactionArgument<string>;
}
export interface GetLinkedPositionOptions {
    package?: string;
    arguments:
        | GetLinkedPositionArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              linkedPositionId: RawTransactionArgument<number | bigint | null>,
              user: RawTransactionArgument<string>,
          ];
}
export function getLinkedPosition(options: GetLinkedPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::trading::SymbolMarket`,
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "address",
    ] satisfies string[];
    const parameterNames = ["symbolMarket", "linkedPositionId", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_linked_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckCollateralEnoughWhenAddingPositionArguments {
    symbolMarket: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface CheckCollateralEnoughWhenAddingPositionOptions {
    package?: string;
    arguments:
        | CheckCollateralEnoughWhenAddingPositionArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function checkCollateralEnoughWhenAddingPosition(options: CheckCollateralEnoughWhenAddingPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "symbolMarket",
        "order",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "check_collateral_enough_when_adding_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckCollateralEnoughWhenReducingPositionArguments {
    symbolMarket: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface CheckCollateralEnoughWhenReducingPositionOptions {
    package?: string;
    arguments:
        | CheckCollateralEnoughWhenReducingPositionArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function checkCollateralEnoughWhenReducingPosition(options: CheckCollateralEnoughWhenReducingPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "symbolMarket",
        "order",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "check_collateral_enough_when_reducing_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckOptionCollateralEnoughArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    symbolMarket: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface CheckOptionCollateralEnoughOptions {
    package?: string;
    arguments:
        | CheckOptionCollateralEnoughArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              symbolMarket: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function checkOptionCollateralEnough(options: CheckOptionCollateralEnoughOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "dovRegistry",
        "typusOracleTradingSymbol",
        "typusOracleCToken",
        "symbolMarket",
        "order",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "check_option_collateral_enough",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckReserveEnoughArguments {
    symbolMarket: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface CheckReserveEnoughOptions {
    package?: string;
    arguments:
        | CheckReserveEnoughArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function checkReserveEnough(options: CheckReserveEnoughOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::trading::SymbolMarket`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        `${packageAddress}::position::TradingOrder`,
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "symbolMarket",
        "liquidityPool",
        "order",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "check_reserve_enough",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AdjustMarketInfoUserOrderSizeArguments {
    symbolMarket: RawTransactionArgument<string>;
    long: RawTransactionArgument<boolean>;
    filledOrCancelled: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
}
export interface AdjustMarketInfoUserOrderSizeOptions {
    package?: string;
    arguments:
        | AdjustMarketInfoUserOrderSizeArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              long: RawTransactionArgument<boolean>,
              filledOrCancelled: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
          ];
}
export function adjustMarketInfoUserOrderSize(options: AdjustMarketInfoUserOrderSizeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::SymbolMarket`, "bool", "bool", "u64"] satisfies string[];
    const parameterNames = ["symbolMarket", "long", "filledOrCancelled", "size"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "adjust_market_info_user_order_size",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AdjustMarketInfoUserPositionSizeArguments {
    symbolMarket: RawTransactionArgument<string>;
    filledOrderIsLong: RawTransactionArgument<boolean>;
    reducingPosition: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
}
export interface AdjustMarketInfoUserPositionSizeOptions {
    package?: string;
    arguments:
        | AdjustMarketInfoUserPositionSizeArguments
        | [
              symbolMarket: RawTransactionArgument<string>,
              filledOrderIsLong: RawTransactionArgument<boolean>,
              reducingPosition: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
          ];
}
export function adjustMarketInfoUserPositionSize(options: AdjustMarketInfoUserPositionSizeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::SymbolMarket`, "bool", "bool", "u64"] satisfies string[];
    const parameterNames = ["symbolMarket", "filledOrderIsLong", "reducingPosition", "size"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "adjust_market_info_user_position_size",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface ExerciseBidReceiptsArguments {
    dovRegistry: RawTransactionArgument<string>;
    bidReceipts: RawTransactionArgument<string[]>;
}
export interface ExerciseBidReceiptsOptions {
    package?: string;
    arguments: ExerciseBidReceiptsArguments | [dovRegistry: RawTransactionArgument<string>, bidReceipts: RawTransactionArgument<string[]>];
    typeArguments: [string, string];
}
export function exerciseBidReceipts(options: ExerciseBidReceiptsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "vector<0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded::vault::TypusBidReceipt>",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "bidReceipts"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "exercise_bid_receipts",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ReturnToUserArguments {
    marketId: RawTransactionArgument<string>;
    balance: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface ReturnToUserOptions {
    package?: string;
    arguments:
        | ReturnToUserArguments
        | [marketId: RawTransactionArgument<string>, balance: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function returnToUser(options: ReturnToUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000002::object::UID",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "address",
    ] satisfies string[];
    const parameterNames = ["marketId", "balance", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "return_to_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckPositionUserMatchedArguments {
    position: RawTransactionArgument<string>;
    user: RawTransactionArgument<string>;
}
export interface CheckPositionUserMatchedOptions {
    package?: string;
    arguments: CheckPositionUserMatchedArguments | [position: RawTransactionArgument<string>, user: RawTransactionArgument<string>];
}
export function checkPositionUserMatched(options: CheckPositionUserMatchedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "address"] satisfies string[];
    const parameterNames = ["position", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "check_position_user_matched",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUserOrdersArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface GetUserOrdersOptions {
    package?: string;
    arguments:
        | GetUserOrdersArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
/** [View Function] Gets the user's orders. */
export function getUserOrders(options: GetUserOrdersOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_user_orders",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUserPositionsArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface GetUserPositionsOptions {
    package?: string;
    arguments:
        | GetUserPositionsArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
/** [View Function] Gets the user's positions. */
export function getUserPositions(options: GetUserPositionsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "address",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "user"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_user_positions",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetAllPositionsArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    slice: RawTransactionArgument<number | bigint>;
    page: RawTransactionArgument<number | bigint>;
}
export interface GetAllPositionsOptions {
    package?: string;
    arguments:
        | GetAllPositionsArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              slice: RawTransactionArgument<number | bigint>,
              page: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [View Function] Gets all positions. */
export function getAllPositions(options: GetAllPositionsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "slice", "page"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_all_positions",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetActiveOrdersByOrderTagArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    orderTypeTag: RawTransactionArgument<number>;
}
export interface GetActiveOrdersByOrderTagOptions {
    package?: string;
    arguments:
        | GetActiveOrdersByOrderTagArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              orderTypeTag: RawTransactionArgument<number>,
          ];
    typeArguments: [string];
}
/** [View Function] Gets active orders by order type tag. */
export function getActiveOrdersByOrderTag(options: GetActiveOrdersByOrderTagOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u8",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "orderTypeTag"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_active_orders_by_order_tag",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetActiveOrdersByOrderTagAndCtokenArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    orderTypeTag: RawTransactionArgument<number>;
}
export interface GetActiveOrdersByOrderTagAndCtokenOptions {
    package?: string;
    arguments:
        | GetActiveOrdersByOrderTagAndCtokenArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              orderTypeTag: RawTransactionArgument<number>,
          ];
    typeArguments: [string, string];
}
/** [View Function] Gets active orders by order type tag and collateral token. */
export function getActiveOrdersByOrderTagAndCtoken(options: GetActiveOrdersByOrderTagAndCtokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        "u64",
        "u8",
    ] satisfies string[];
    const parameterNames = ["version", "registry", "marketIndex", "orderTypeTag"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_active_orders_by_order_tag_and_ctoken",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetMaxReleasingCollateralAmountArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface GetMaxReleasingCollateralAmountOptions {
    package?: string;
    arguments:
        | GetMaxReleasingCollateralAmountArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/**
 * [View Function] Gets the maximum amount of collateral that can be released from
 * a position.
 */
export function getMaxReleasingCollateralAmount(options: GetMaxReleasingCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_max_releasing_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetEstimatedLiquidationPriceAndPnlArguments {
    version: RawTransactionArgument<string>;
    registry: RawTransactionArgument<string>;
    poolRegistry: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
    poolIndex: RawTransactionArgument<number | bigint>;
    positionId: RawTransactionArgument<number | bigint>;
}
export interface GetEstimatedLiquidationPriceAndPnlOptions {
    package?: string;
    arguments:
        | GetEstimatedLiquidationPriceAndPnlArguments
        | [
              version: RawTransactionArgument<string>,
              registry: RawTransactionArgument<string>,
              poolRegistry: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              marketIndex: RawTransactionArgument<number | bigint>,
              poolIndex: RawTransactionArgument<number | bigint>,
              positionId: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
/** [View Functio Only] Gets the estimated liquidation price and PnL for a position. */
export function getEstimatedLiquidationPriceAndPnl(options: GetEstimatedLiquidationPriceAndPnlOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::trading::MarketRegistry`,
        `${packageAddress}::lp_pool::Registry`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "registry",
        "poolRegistry",
        "dovRegistry",
        "typusOracleCToken",
        "typusOracleTradingSymbol",
        "marketIndex",
        "poolIndex",
        "positionId",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_estimated_liquidation_price_and_pnl",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CalculateTradingFeeRateMbpArguments {
    formulaVersion: RawTransactionArgument<number | bigint>;
    userLongPositionSize: RawTransactionArgument<number | bigint>;
    userShortPositionSize: RawTransactionArgument<number | bigint>;
    tvlUsd: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    orderSide: RawTransactionArgument<boolean>;
    orderSize: RawTransactionArgument<number | bigint>;
    tradingFeeConfig: RawTransactionArgument<number | bigint[]>;
}
export interface CalculateTradingFeeRateMbpOptions {
    package?: string;
    arguments:
        | CalculateTradingFeeRateMbpArguments
        | [
              formulaVersion: RawTransactionArgument<number | bigint>,
              userLongPositionSize: RawTransactionArgument<number | bigint>,
              userShortPositionSize: RawTransactionArgument<number | bigint>,
              tvlUsd: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              orderSide: RawTransactionArgument<boolean>,
              orderSize: RawTransactionArgument<number | bigint>,
              tradingFeeConfig: RawTransactionArgument<number | bigint[]>,
          ];
}
export function calculateTradingFeeRateMbp(options: CalculateTradingFeeRateMbpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["u64", "u64", "u64", "u64", "u64", "u64", "u64", "bool", "u64", "vector<u64>"] satisfies string[];
    const parameterNames = [
        "formulaVersion",
        "userLongPositionSize",
        "userShortPositionSize",
        "tvlUsd",
        "sizeDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "orderSide",
        "orderSize",
        "tradingFeeConfig",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "calculate_trading_fee_rate_mbp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMarketsBcsArguments {
    registry: RawTransactionArgument<string>;
    indexes: RawTransactionArgument<number | bigint[]>;
}
export interface GetMarketsBcsOptions {
    package?: string;
    arguments: GetMarketsBcsArguments | [registry: RawTransactionArgument<string>, indexes: RawTransactionArgument<number | bigint[]>];
}
/** [View Function] Gets the BCS-serialized markets. */
export function getMarketsBcs(options: GetMarketsBcsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::MarketRegistry`, "vector<u64>"] satisfies string[];
    const parameterNames = ["registry", "indexes"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_markets_bcs",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetMutMarketIdArguments {
    registry: RawTransactionArgument<string>;
    marketIndex: RawTransactionArgument<number | bigint>;
}
export interface GetMutMarketIdOptions {
    package?: string;
    arguments: GetMutMarketIdArguments | [registry: RawTransactionArgument<string>, marketIndex: RawTransactionArgument<number | bigint>];
}
/** Gets a mutable reference to the market ID. WARNING: no authority check inside */
export function getMutMarketId(options: GetMutMarketIdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::MarketRegistry`, "u64"] satisfies string[];
    const parameterNames = ["registry", "marketIndex"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "get_mut_market_id",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface TradingSymbolExistsArguments {
    market: RawTransactionArgument<string>;
}
export interface TradingSymbolExistsOptions {
    package?: string;
    arguments: TradingSymbolExistsArguments | [market: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function tradingSymbolExists(options: TradingSymbolExistsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::trading::Markets`] satisfies string[];
    const parameterNames = ["market"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "trading",
            function: "trading_symbol_exists",
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
            module: "trading",
            function: "deprecated",
        });
}
