/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `position` module defines the `Position` and `TradingOrder` structs, and the
 * logic for creating, updating, and closing them. All of the functions are inner
 * package functions used in `trading.move`.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as type_name from "./deps/std/type_name";
import * as object from "./deps/sui/object";
import * as symbol from "./symbol";
const $moduleName = "@typus/perp::position";
export const OptionCollateralInfo = new MoveStruct({
    name: `${$moduleName}::OptionCollateralInfo`,
    fields: {
        /** The index of the portfolio. */
        index: bcs.u64(),
        /** The type name of the bid token. */
        bid_token: type_name.TypeName,
        /** A vector of the BCS-serialized bid receipts. */
        bid_receipts_bcs: bcs.vector(bcs.vector(bcs.u8())),
    },
});
export const Position = new MoveStruct({
    name: `${$moduleName}::Position`,
    fields: {
        id: object.UID,
        /** The timestamp when the position was created. */
        create_ts_ms: bcs.u64(),
        /** The timestamp when the position was last updated. */
        update_ts_ms: bcs.u64(),
        /** The ID of the position. */
        position_id: bcs.u64(),
        /** A vector of the linked order IDs. */
        linked_order_ids: bcs.vector(bcs.u64()),
        /** A vector of the linked order prices. */
        linked_order_prices: bcs.vector(bcs.u64()),
        /** The address of the user. */
        user: bcs.Address,
        /** Whether the position is long. */
        is_long: bcs.bool(),
        /** The size of the position. */
        size: bcs.u64(),
        /** The number of decimals for the size. */
        size_decimal: bcs.u64(),
        /** The type name of the collateral token. */
        collateral_token: type_name.TypeName,
        /** The number of decimals for the collateral token. */
        collateral_token_decimal: bcs.u64(),
        /** The symbol of the trading pair. */
        symbol: symbol.Symbol,
        /** The amount of collateral. */
        collateral_amount: bcs.u64(),
        /** The amount of reserved collateral. */
        reserve_amount: bcs.u64(),
        /** The average price of the position. */
        average_price: bcs.u64(),
        /** The entry borrow index. */
        entry_borrow_index: bcs.u64(),
        /** The sign of the entry funding rate index. */
        entry_funding_rate_index_sign: bcs.bool(),
        /** The entry funding rate index. */
        entry_funding_rate_index: bcs.u64(),
        /** The unrealized loss. */
        unrealized_loss: bcs.u64(),
        /** The sign of the unrealized funding fee. */
        unrealized_funding_sign: bcs.bool(),
        /** The unrealized funding fee. */
        unrealized_funding_fee: bcs.u64(),
        /** The unrealized trading fee. */
        unrealized_trading_fee: bcs.u64(),
        /** The unrealized borrow fee. */
        unrealized_borrow_fee: bcs.u64(),
        /** The unrealized rebate. */
        unrealized_rebate: bcs.u64(),
        /** Information about the option collateral. */
        option_collateral_info: bcs.option(OptionCollateralInfo),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const TradingOrder = new MoveStruct({
    name: `${$moduleName}::TradingOrder`,
    fields: {
        id: object.UID,
        /** The timestamp when the order was created. */
        create_ts_ms: bcs.u64(),
        /** The ID of the order. */
        order_id: bcs.u64(),
        /** The ID of the linked position. */
        linked_position_id: bcs.option(bcs.u64()),
        /** The address of the user. */
        user: bcs.Address,
        /** The type name of the collateral token. */
        collateral_token: type_name.TypeName,
        /** The number of decimals for the collateral token. */
        collateral_token_decimal: bcs.u64(),
        /** The symbol of the trading pair. */
        symbol: symbol.Symbol,
        /** The leverage in mega basis points. */
        leverage_mbp: bcs.u64(),
        /** Whether the order is reduce-only. */
        reduce_only: bcs.bool(),
        /** Whether the order is long. */
        is_long: bcs.bool(),
        /** Whether the order is a stop order. */
        is_stop_order: bcs.bool(),
        /** The size of the order. */
        size: bcs.u64(),
        /** The number of decimals for the size. */
        size_decimal: bcs.u64(),
        /** The trigger price of the order. */
        trigger_price: bcs.u64(),
        /** The oracle price when the order was placed. */
        oracle_price_when_placing: bcs.u64(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RemovePositionEvent = new MoveStruct({
    name: `${$moduleName}::RemovePositionEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        linked_order_ids: bcs.vector(bcs.u64()),
        linked_order_prices: bcs.vector(bcs.u64()),
        remaining_collateral_amount: bcs.u64(),
        realized_trading_fee_amount: bcs.u64(),
        realized_borrow_fee_amount: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const OrderFilledEvent = new MoveStruct({
    name: `${$moduleName}::OrderFilledEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        order_id: bcs.u64(),
        linked_position_id: bcs.option(bcs.u64()),
        new_position_id: bcs.option(bcs.u64()),
        filled_size: bcs.u64(),
        filled_price: bcs.u64(),
        position_side: bcs.bool(),
        position_size: bcs.u64(),
        position_average_price: bcs.u64(),
        realized_trading_fee: bcs.u64(),
        realized_borrow_fee: bcs.u64(),
        realized_fee_in_usd: bcs.u64(),
        realized_amount: bcs.u64(),
        realized_amount_sign: bcs.bool(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export const RealizeFundingEvent = new MoveStruct({
    name: `${$moduleName}::RealizeFundingEvent`,
    fields: {
        user: bcs.Address,
        collateral_token: type_name.TypeName,
        symbol: symbol.Symbol,
        position_id: bcs.u64(),
        realized_funding_sign: bcs.bool(),
        realized_funding_fee: bcs.u64(),
        realized_funding_fee_usd: bcs.u64(),
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export interface CreateOrderArguments {
    version: RawTransactionArgument<string>;
    symbol: RawTransactionArgument<string>;
    leverageMbp: RawTransactionArgument<number | bigint>;
    reduceOnly: RawTransactionArgument<boolean>;
    isLong: RawTransactionArgument<boolean>;
    isStopOrder: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    collateral: RawTransactionArgument<string>;
    collateralTokenDecimal: RawTransactionArgument<number | bigint>;
    linkedPositionId: RawTransactionArgument<number | bigint | null>;
    orderId: RawTransactionArgument<number | bigint>;
    oraclePrice: RawTransactionArgument<number | bigint>;
}
export interface CreateOrderOptions {
    package?: string;
    arguments:
        | CreateOrderArguments
        | [
              version: RawTransactionArgument<string>,
              symbol: RawTransactionArgument<string>,
              leverageMbp: RawTransactionArgument<number | bigint>,
              reduceOnly: RawTransactionArgument<boolean>,
              isLong: RawTransactionArgument<boolean>,
              isStopOrder: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              collateral: RawTransactionArgument<string>,
              collateralTokenDecimal: RawTransactionArgument<number | bigint>,
              linkedPositionId: RawTransactionArgument<number | bigint | null>,
              orderId: RawTransactionArgument<number | bigint>,
              oraclePrice: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Creates a new trading order. WARNING: no authority check inside */
export function createOrder(options: CreateOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::symbol::Symbol`,
        "u64",
        "bool",
        "bool",
        "bool",
        "u64",
        "u64",
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "symbol",
        "leverageMbp",
        "reduceOnly",
        "isLong",
        "isStopOrder",
        "size",
        "sizeDecimal",
        "triggerPrice",
        "collateral",
        "collateralTokenDecimal",
        "linkedPositionId",
        "orderId",
        "oraclePrice",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "create_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemoveOrderArguments {
    version: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
}
export interface RemoveOrderOptions {
    package?: string;
    arguments: RemoveOrderArguments | [version: RawTransactionArgument<string>, order: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Removes a trading order. WARNING: no authority check inside */
export function removeOrder(options: RemoveOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["version", "order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "remove_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ManagerCreateReduceOnlyOrderArguments {
    version: RawTransactionArgument<string>;
    symbol: RawTransactionArgument<string>;
    isLong: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    collateral: RawTransactionArgument<string>;
    collateralTokenDecimal: RawTransactionArgument<number | bigint>;
    linkedPositionId: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
    orderId: RawTransactionArgument<number | bigint>;
    oraclePrice: RawTransactionArgument<number | bigint>;
}
export interface ManagerCreateReduceOnlyOrderOptions {
    package?: string;
    arguments:
        | ManagerCreateReduceOnlyOrderArguments
        | [
              version: RawTransactionArgument<string>,
              symbol: RawTransactionArgument<string>,
              isLong: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              collateral: RawTransactionArgument<string>,
              collateralTokenDecimal: RawTransactionArgument<number | bigint>,
              linkedPositionId: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
              orderId: RawTransactionArgument<number | bigint>,
              oraclePrice: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** [Authorized Function] Creates a reduce-only order by the manager. */
export function managerCreateReduceOnlyOrder(options: ManagerCreateReduceOnlyOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::symbol::Symbol`,
        "bool",
        "u64",
        "u64",
        "u64",
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "u64",
        "u64",
        "address",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "symbol",
        "isLong",
        "size",
        "sizeDecimal",
        "triggerPrice",
        "collateral",
        "collateralTokenDecimal",
        "linkedPositionId",
        "user",
        "orderId",
        "oraclePrice",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "manager_create_reduce_only_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface IncreaseCollateralArguments {
    position: RawTransactionArgument<string>;
    collateral: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface IncreaseCollateralOptions {
    package?: string;
    arguments:
        | IncreaseCollateralArguments
        | [
              position: RawTransactionArgument<string>,
              collateral: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Increases the collateral of a position. WARNING: no authority check inside */
export function increaseCollateral(options: IncreaseCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::position::Position`,
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "position",
        "collateral",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "increase_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface ReleaseCollateralArguments {
    position: RawTransactionArgument<string>;
    releaseAmount: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface ReleaseCollateralOptions {
    package?: string;
    arguments:
        | ReleaseCollateralArguments
        | [
              position: RawTransactionArgument<string>,
              releaseAmount: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Releases collateral from a position. WARNING: no authority check inside */
export function releaseCollateral(options: ReleaseCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "releaseAmount",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "release_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RemovePositionArguments {
    version: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface RemovePositionOptions {
    package?: string;
    arguments: RemovePositionArguments | [version: RawTransactionArgument<string>, position: RawTransactionArgument<string>];
    typeArguments: [string];
}
/** Removes a position. WARNING: no authority check inside */
export function removePosition(options: RemovePositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["version", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "remove_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface OrderFilledArguments {
    version: RawTransactionArgument<string>;
    ecosystemVersion: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    originalPosition: RawTransactionArgument<string | null>;
    nextPositionId: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
    cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>;
    cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface OrderFilledOptions {
    package?: string;
    arguments:
        | OrderFilledArguments
        | [
              version: RawTransactionArgument<string>,
              ecosystemVersion: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              originalPosition: RawTransactionArgument<string | null>,
              nextPositionId: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
              cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>,
              cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Handles a filled order. WARNING: no authority check inside */
export function orderFilled(options: OrderFilledOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        `${packageAddress}::position::TradingOrder`,
        `0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::position::Position>`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "bool",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "ecosystemVersion",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "order",
        "originalPosition",
        "nextPositionId",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "cumulativeBorrowRate",
        "cumulativeFundingRateIndexSign",
        "cumulativeFundingRateIndex",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "order_filled",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RealizePositionPnlAndFeeArguments {
    version: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
    profitValueToRealize: RawTransactionArgument<number | bigint>;
    lossValueToRealize: RawTransactionArgument<number | bigint>;
    originalReserve: RawTransactionArgument<number | bigint>;
    protocolFeeShareBp: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface RealizePositionPnlAndFeeOptions {
    package?: string;
    arguments:
        | RealizePositionPnlAndFeeArguments
        | [
              version: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
              profitValueToRealize: RawTransactionArgument<number | bigint>,
              lossValueToRealize: RawTransactionArgument<number | bigint>,
              originalReserve: RawTransactionArgument<number | bigint>,
              protocolFeeShareBp: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Realizes the PnL and fees of a position. WARNING: no authority check inside */
export function realizePositionPnlAndFee(options: RealizePositionPnlAndFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        `${packageAddress}::position::Position`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "liquidityPool",
        "position",
        "profitValueToRealize",
        "lossValueToRealize",
        "originalReserve",
        "protocolFeeShareBp",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "realize_position_pnl_and_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface RealizeFundingFeeArguments {
    liquidityPool: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface RealizeFundingFeeOptions {
    package?: string;
    arguments:
        | RealizeFundingFeeArguments
        | [
              liquidityPool: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
/** Realizes the funding fee of a position. WARNING: no authority check inside */
export function realizeFundingFee(options: RealizeFundingFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::lp_pool::LiquidityPool`,
        `${packageAddress}::position::Position`,
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = ["liquidityPool", "position", "collateralOraclePrice", "collateralOraclePriceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "realize_funding_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckOrderFilledArguments {
    order: RawTransactionArgument<string>;
    oraclePrice: RawTransactionArgument<number | bigint>;
}
export interface CheckOrderFilledOptions {
    package?: string;
    arguments: CheckOrderFilledArguments | [order: RawTransactionArgument<string>, oraclePrice: RawTransactionArgument<number | bigint>];
}
export function checkOrderFilled(options: CheckOrderFilledOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`, "u64"] satisfies string[];
    const parameterNames = ["order", "oraclePrice"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "check_order_filled",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculatePeriodBorrowCostArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
}
export interface CalculatePeriodBorrowCostOptions {
    package?: string;
    arguments:
        | CalculatePeriodBorrowCostArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
          ];
}
export function calculatePeriodBorrowCost(options: CalculatePeriodBorrowCostOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "cumulativeBorrowRate",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_period_borrow_cost",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CheckPositionLiquidatedArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    maintenanceMarginRateBp: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
    cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>;
    cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>;
}
export interface CheckPositionLiquidatedOptions {
    package?: string;
    arguments:
        | CheckPositionLiquidatedArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              maintenanceMarginRateBp: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
              cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>,
              cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>,
          ];
}
export function checkPositionLiquidated(options: CheckPositionLiquidatedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::position::Position`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "bool",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
        "maintenanceMarginRateBp",
        "cumulativeBorrowRate",
        "cumulativeFundingRateIndexSign",
        "cumulativeFundingRateIndex",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "check_position_liquidated",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateUnrealizedPnlArguments {
    position: RawTransactionArgument<string>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface CalculateUnrealizedPnlOptions {
    package?: string;
    arguments:
        | CalculateUnrealizedPnlArguments
        | [
              position: RawTransactionArgument<string>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateUnrealizedPnl(options: CalculateUnrealizedPnlOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["position", "tradingPairOraclePrice", "tradingPairOraclePriceDecimal", "tradingFeeMbp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_unrealized_pnl",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface MaxReleasingCollateralAmountArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
    maxEntryLeverageMbp: RawTransactionArgument<number | bigint>;
}
export interface MaxReleasingCollateralAmountOptions {
    package?: string;
    arguments:
        | MaxReleasingCollateralAmountArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
              maxEntryLeverageMbp: RawTransactionArgument<number | bigint>,
          ];
}
export function maxReleasingCollateralAmount(options: MaxReleasingCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
        "cumulativeBorrowRate",
        "maxEntryLeverageMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "max_releasing_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetEstimatedLiquidationPriceArguments {
    position: RawTransactionArgument<string>;
    isSameToken: RawTransactionArgument<boolean>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    maintenanceMarginRateBp: RawTransactionArgument<number | bigint>;
}
export interface GetEstimatedLiquidationPriceOptions {
    package?: string;
    arguments:
        | GetEstimatedLiquidationPriceArguments
        | [
              position: RawTransactionArgument<string>,
              isSameToken: RawTransactionArgument<boolean>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              maintenanceMarginRateBp: RawTransactionArgument<number | bigint>,
          ];
}
export function getEstimatedLiquidationPrice(options: GetEstimatedLiquidationPriceOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "bool", "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "isSameToken",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingOraclePriceDecimal",
        "tradingFeeMbp",
        "maintenanceMarginRateBp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_estimated_liquidation_price",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CreateOrderWithBidReceiptsArguments {
    version: RawTransactionArgument<string>;
    symbol: RawTransactionArgument<string>;
    portfolioIndex: RawTransactionArgument<number | bigint>;
    depositToken: RawTransactionArgument<string>;
    leverageMbp: RawTransactionArgument<number | bigint>;
    reduceOnly: RawTransactionArgument<boolean>;
    isLong: RawTransactionArgument<boolean>;
    isStopOrder: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    triggerPrice: RawTransactionArgument<number | bigint>;
    collateralBidReceipts: RawTransactionArgument<string[]>;
    depositTokenDecimal: RawTransactionArgument<number | bigint>;
    linkedPositionId: RawTransactionArgument<number | bigint | null>;
    orderId: RawTransactionArgument<number | bigint>;
    oraclePrice: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface CreateOrderWithBidReceiptsOptions {
    package?: string;
    arguments:
        | CreateOrderWithBidReceiptsArguments
        | [
              version: RawTransactionArgument<string>,
              symbol: RawTransactionArgument<string>,
              portfolioIndex: RawTransactionArgument<number | bigint>,
              depositToken: RawTransactionArgument<string>,
              leverageMbp: RawTransactionArgument<number | bigint>,
              reduceOnly: RawTransactionArgument<boolean>,
              isLong: RawTransactionArgument<boolean>,
              isStopOrder: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              triggerPrice: RawTransactionArgument<number | bigint>,
              collateralBidReceipts: RawTransactionArgument<string[]>,
              depositTokenDecimal: RawTransactionArgument<number | bigint>,
              linkedPositionId: RawTransactionArgument<number | bigint | null>,
              orderId: RawTransactionArgument<number | bigint>,
              oraclePrice: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
export function createOrderWithBidReceipts(options: CreateOrderWithBidReceiptsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        `${packageAddress}::symbol::Symbol`,
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "u64",
        "bool",
        "bool",
        "bool",
        "u64",
        "u64",
        "u64",
        "vector<0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded::vault::TypusBidReceipt>",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<u64>",
        "u64",
        "u64",
        "address",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "symbol",
        "portfolioIndex",
        "depositToken",
        "leverageMbp",
        "reduceOnly",
        "isLong",
        "isStopOrder",
        "size",
        "sizeDecimal",
        "triggerPrice",
        "collateralBidReceipts",
        "depositTokenDecimal",
        "linkedPositionId",
        "orderId",
        "oraclePrice",
        "user",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "create_order_with_bid_receipts",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemovePositionWithBidReceiptsArguments {
    version: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface RemovePositionWithBidReceiptsOptions {
    package?: string;
    arguments: RemovePositionWithBidReceiptsArguments | [version: RawTransactionArgument<string>, position: RawTransactionArgument<string>];
}
export function removePositionWithBidReceipts(options: RemovePositionWithBidReceiptsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::admin::Version`, `${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["version", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "remove_position_with_bid_receipts",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface OrderFilledWithBidReceiptsCollateralArguments {
    version: RawTransactionArgument<string>;
    ecosystemVersion: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    liquidityPool: RawTransactionArgument<string>;
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
    originalPosition: RawTransactionArgument<string | null>;
    nextPositionId: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
    cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>;
    cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface OrderFilledWithBidReceiptsCollateralOptions {
    package?: string;
    arguments:
        | OrderFilledWithBidReceiptsCollateralArguments
        | [
              version: RawTransactionArgument<string>,
              ecosystemVersion: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              liquidityPool: RawTransactionArgument<string>,
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
              originalPosition: RawTransactionArgument<string | null>,
              nextPositionId: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
              cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>,
              cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string, string];
}
export function orderFilledWithBidReceiptsCollateral(options: OrderFilledWithBidReceiptsCollateralOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        `${packageAddress}::lp_pool::LiquidityPool`,
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::TradingOrder`,
        `0x0000000000000000000000000000000000000000000000000000000000000001::option::Option<${packageAddress}::position::Position>`,
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "u64",
        "bool",
        "u64",
        "u64",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = [
        "version",
        "ecosystemVersion",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "liquidityPool",
        "dovRegistry",
        "typusOracleTradingSymbol",
        "typusOracleCToken",
        "order",
        "originalPosition",
        "nextPositionId",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "cumulativeBorrowRate",
        "cumulativeFundingRateIndexSign",
        "cumulativeFundingRateIndex",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "order_filled_with_bid_receipts_collateral",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CheckOptionCollateralPositionLiquidatedArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    maintenanceMarginRateBp: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
}
export interface CheckOptionCollateralPositionLiquidatedOptions {
    package?: string;
    arguments:
        | CheckOptionCollateralPositionLiquidatedArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              maintenanceMarginRateBp: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
          ];
    typeArguments: [string];
}
export function checkOptionCollateralPositionLiquidated(options: CheckOptionCollateralPositionLiquidatedOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::Position`,
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
        "dovRegistry",
        "typusOracleTradingSymbol",
        "typusOracleCToken",
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
        "maintenanceMarginRateBp",
        "cumulativeBorrowRate",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "check_option_collateral_position_liquidated",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface AddPositionLinkedOrderInfoArguments {
    position: RawTransactionArgument<string>;
    linkedOrderId: RawTransactionArgument<number | bigint>;
    linkedOrderPrice: RawTransactionArgument<number | bigint>;
}
export interface AddPositionLinkedOrderInfoOptions {
    package?: string;
    arguments:
        | AddPositionLinkedOrderInfoArguments
        | [
              position: RawTransactionArgument<string>,
              linkedOrderId: RawTransactionArgument<number | bigint>,
              linkedOrderPrice: RawTransactionArgument<number | bigint>,
          ];
}
/** Adds linked order info to a position. WARNING: no authority check inside */
export function addPositionLinkedOrderInfo(options: AddPositionLinkedOrderInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64"] satisfies string[];
    const parameterNames = ["position", "linkedOrderId", "linkedOrderPrice"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "add_position_linked_order_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface RemovePositionLinkedOrderInfoArguments {
    position: RawTransactionArgument<string>;
    linkedOrderId: RawTransactionArgument<number | bigint>;
}
export interface RemovePositionLinkedOrderInfoOptions {
    package?: string;
    arguments:
        | RemovePositionLinkedOrderInfoArguments
        | [position: RawTransactionArgument<string>, linkedOrderId: RawTransactionArgument<number | bigint>];
}
/** Removes linked order info from a position. WARNING: no authority check inside */
export function removePositionLinkedOrderInfo(options: RemovePositionLinkedOrderInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64"] satisfies string[];
    const parameterNames = ["position", "linkedOrderId"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "remove_position_linked_order_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdatePositionBorrowRateAndFundingRateArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    cumulativeBorrowRate: RawTransactionArgument<number | bigint>;
    cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>;
    cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>;
}
export interface UpdatePositionBorrowRateAndFundingRateOptions {
    package?: string;
    arguments:
        | UpdatePositionBorrowRateAndFundingRateArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              cumulativeBorrowRate: RawTransactionArgument<number | bigint>,
              cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>,
              cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>,
          ];
}
/**
 * Updates the borrow rate and funding rate of a position. WARNING: no authority
 * check inside
 */
export function updatePositionBorrowRateAndFundingRate(options: UpdatePositionBorrowRateAndFundingRateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "u64", "bool", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "cumulativeBorrowRate",
        "cumulativeFundingRateIndexSign",
        "cumulativeFundingRateIndex",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "update_position_borrow_rate_and_funding_rate",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UpdateOptionPositionCollateralAmountArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface UpdateOptionPositionCollateralAmountOptions {
    package?: string;
    arguments:
        | UpdateOptionPositionCollateralAmountArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/**
 * Updates the collateral amount of an option position. WARNING: no authority check
 * inside
 */
export function updateOptionPositionCollateralAmount(options: UpdateOptionPositionCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::Position`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "typusOracleTradingSymbol", "typusOracleCToken", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "update_option_position_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CalculateRealizedPnlUsdArguments {
    side: RawTransactionArgument<boolean>;
    size: RawTransactionArgument<number | bigint>;
    entryPrice: RawTransactionArgument<number | bigint>;
    exitPrice: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    priceDecimal: RawTransactionArgument<number | bigint>;
}
export interface CalculateRealizedPnlUsdOptions {
    package?: string;
    arguments:
        | CalculateRealizedPnlUsdArguments
        | [
              side: RawTransactionArgument<boolean>,
              size: RawTransactionArgument<number | bigint>,
              entryPrice: RawTransactionArgument<number | bigint>,
              exitPrice: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              priceDecimal: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateRealizedPnlUsd(options: CalculateRealizedPnlUsdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["bool", "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["side", "size", "entryPrice", "exitPrice", "sizeDecimal", "priceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_realized_pnl_usd",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateFilled_Arguments {
    position: RawTransactionArgument<string>;
    reduceOnly: RawTransactionArgument<boolean>;
    orderSide: RawTransactionArgument<boolean>;
    orderSize: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
}
export interface CalculateFilled_Options {
    package?: string;
    arguments:
        | CalculateFilled_Arguments
        | [
              position: RawTransactionArgument<string>,
              reduceOnly: RawTransactionArgument<boolean>,
              orderSide: RawTransactionArgument<boolean>,
              orderSize: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateFilled_(options: CalculateFilled_Options) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "bool", "bool", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["position", "reduceOnly", "orderSide", "orderSize", "tradingPairOraclePrice", "tradingPairOraclePriceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_filled_",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateIntrinsicValueArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    receipts: RawTransactionArgument<string[]>;
}
export interface CalculateIntrinsicValueOptions {
    package?: string;
    arguments:
        | CalculateIntrinsicValueArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              receipts: RawTransactionArgument<string[]>,
          ];
    typeArguments: [string];
}
export function calculateIntrinsicValue(options: CalculateIntrinsicValueOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "vector<0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded::vault::TypusBidReceipt>",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "typusOracleTradingSymbol", "typusOracleCToken", "receipts"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_intrinsic_value",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface CalculateTradingFeeArguments {
    size: RawTransactionArgument<number | bigint>;
    sizeDecimal: RawTransactionArgument<number | bigint>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
    collateralTokenDecimal: RawTransactionArgument<number | bigint>;
}
export interface CalculateTradingFeeOptions {
    package?: string;
    arguments:
        | CalculateTradingFeeArguments
        | [
              size: RawTransactionArgument<number | bigint>,
              sizeDecimal: RawTransactionArgument<number | bigint>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
              collateralTokenDecimal: RawTransactionArgument<number | bigint>,
          ];
}
export function calculateTradingFee(options: CalculateTradingFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["u64", "u64", "u64", "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "size",
        "sizeDecimal",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
        "collateralTokenDecimal",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_trading_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CollateralWithPnlArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface CollateralWithPnlOptions {
    package?: string;
    arguments:
        | CollateralWithPnlArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
}
export function collateralWithPnl(options: CollateralWithPnlOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "tradingFeeMbp",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "collateral_with_pnl",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculatePositionFundingRateArguments {
    position: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>;
    cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>;
}
export interface CalculatePositionFundingRateOptions {
    package?: string;
    arguments:
        | CalculatePositionFundingRateArguments
        | [
              position: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              cumulativeFundingRateIndexSign: RawTransactionArgument<boolean>,
              cumulativeFundingRateIndex: RawTransactionArgument<number | bigint>,
          ];
}
export function calculatePositionFundingRate(options: CalculatePositionFundingRateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`, "u64", "u64", "u64", "u64", "bool", "u64"] satisfies string[];
    const parameterNames = [
        "position",
        "collateralOraclePrice",
        "collateralOraclePriceDecimal",
        "tradingPairOraclePrice",
        "tradingPairOraclePriceDecimal",
        "cumulativeFundingRateIndexSign",
        "cumulativeFundingRateIndex",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_position_funding_rate",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface IsOptionCollateralOrderArguments {
    order: RawTransactionArgument<string>;
}
export interface IsOptionCollateralOrderOptions {
    package?: string;
    arguments: IsOptionCollateralOrderArguments | [order: RawTransactionArgument<string>];
}
export function isOptionCollateralOrder(options: IsOptionCollateralOrderOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "is_option_collateral_order",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderCollateralTokenArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderCollateralTokenOptions {
    package?: string;
    arguments: GetOrderCollateralTokenArguments | [order: RawTransactionArgument<string>];
}
export function getOrderCollateralToken(options: GetOrderCollateralTokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_collateral_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderCollateralTokenDecimalArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderCollateralTokenDecimalOptions {
    package?: string;
    arguments: GetOrderCollateralTokenDecimalArguments | [order: RawTransactionArgument<string>];
}
export function getOrderCollateralTokenDecimal(options: GetOrderCollateralTokenDecimalOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_collateral_token_decimal",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderTradingSymbolArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderTradingSymbolOptions {
    package?: string;
    arguments: GetOrderTradingSymbolArguments | [order: RawTransactionArgument<string>];
}
export function getOrderTradingSymbol(options: GetOrderTradingSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_trading_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderPriceArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderPriceOptions {
    package?: string;
    arguments: GetOrderPriceArguments | [order: RawTransactionArgument<string>];
}
export function getOrderPrice(options: GetOrderPriceOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_price",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderUserArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderUserOptions {
    package?: string;
    arguments: GetOrderUserArguments | [order: RawTransactionArgument<string>];
}
export function getOrderUser(options: GetOrderUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderIdArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderIdOptions {
    package?: string;
    arguments: GetOrderIdArguments | [order: RawTransactionArgument<string>];
}
export function getOrderId(options: GetOrderIdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_id",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderSizeArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderSizeOptions {
    package?: string;
    arguments: GetOrderSizeArguments | [order: RawTransactionArgument<string>];
}
export function getOrderSize(options: GetOrderSizeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_size",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderSideArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderSideOptions {
    package?: string;
    arguments: GetOrderSideArguments | [order: RawTransactionArgument<string>];
}
export function getOrderSide(options: GetOrderSideOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_side",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderReduceOnlyArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderReduceOnlyOptions {
    package?: string;
    arguments: GetOrderReduceOnlyArguments | [order: RawTransactionArgument<string>];
}
export function getOrderReduceOnly(options: GetOrderReduceOnlyOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_reduce_only",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderLinkedPositionIdArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderLinkedPositionIdOptions {
    package?: string;
    arguments: GetOrderLinkedPositionIdArguments | [order: RawTransactionArgument<string>];
}
export function getOrderLinkedPositionId(options: GetOrderLinkedPositionIdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_linked_position_id",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderTypeTagArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderTypeTagOptions {
    package?: string;
    arguments: GetOrderTypeTagArguments | [order: RawTransactionArgument<string>];
}
export function getOrderTypeTag(options: GetOrderTypeTagOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_type_tag",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOrderCollateralAmountArguments {
    order: RawTransactionArgument<string>;
}
export interface GetOrderCollateralAmountOptions {
    package?: string;
    arguments: GetOrderCollateralAmountArguments | [order: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function getOrderCollateralAmount(options: GetOrderCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`] satisfies string[];
    const parameterNames = ["order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_order_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetOptionCollateralOrderCollateralAmountArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    order: RawTransactionArgument<string>;
}
export interface GetOptionCollateralOrderCollateralAmountOptions {
    package?: string;
    arguments:
        | GetOptionCollateralOrderCollateralAmountArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              order: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function getOptionCollateralOrderCollateralAmount(options: GetOptionCollateralOrderCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::TradingOrder`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "typusOracleTradingSymbol", "typusOracleCToken", "order"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_option_collateral_order_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetOrderFilledFeeArguments {
    order: RawTransactionArgument<string>;
    collateralOraclePrice: RawTransactionArgument<number | bigint>;
    collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingPairOraclePrice: RawTransactionArgument<number | bigint>;
    tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>;
    tradingFeeMbp: RawTransactionArgument<number | bigint>;
}
export interface GetOrderFilledFeeOptions {
    package?: string;
    arguments:
        | GetOrderFilledFeeArguments
        | [
              order: RawTransactionArgument<string>,
              collateralOraclePrice: RawTransactionArgument<number | bigint>,
              collateralOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingPairOraclePrice: RawTransactionArgument<number | bigint>,
              tradingPairOraclePriceDecimal: RawTransactionArgument<number | bigint>,
              tradingFeeMbp: RawTransactionArgument<number | bigint>,
          ];
}
export function getOrderFilledFee(options: GetOrderFilledFeeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::TradingOrder`, "u64", "u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = [
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
            module: "position",
            function: "get_order_filled_fee",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SplitBidReceiptArguments {
    dovRegistry: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
    size: RawTransactionArgument<number | bigint>;
}
export interface SplitBidReceiptOptions {
    package?: string;
    arguments:
        | SplitBidReceiptArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
              size: RawTransactionArgument<number | bigint>,
          ];
}
export function splitBidReceipt(options: SplitBidReceiptOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        `${packageAddress}::position::Position`,
        "u64",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "position", "size"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "split_bid_receipt",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface IsOptionCollateralPositionArguments {
    position: RawTransactionArgument<string>;
}
export interface IsOptionCollateralPositionOptions {
    package?: string;
    arguments: IsOptionCollateralPositionArguments | [position: RawTransactionArgument<string>];
}
export function isOptionCollateralPosition(options: IsOptionCollateralPositionOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "is_option_collateral_position",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface EmitRealizedFundingEventArguments {
    user: RawTransactionArgument<string>;
    collateralToken: RawTransactionArgument<string>;
    symbol: RawTransactionArgument<string>;
    positionId: RawTransactionArgument<number | bigint>;
    realizedFundingSign: RawTransactionArgument<boolean>;
    realizedFundingFee: RawTransactionArgument<number | bigint>;
    realizedFundingFeeUsd: RawTransactionArgument<number | bigint>;
    u64Padding: RawTransactionArgument<number | bigint[]>;
}
export interface EmitRealizedFundingEventOptions {
    package?: string;
    arguments:
        | EmitRealizedFundingEventArguments
        | [
              user: RawTransactionArgument<string>,
              collateralToken: RawTransactionArgument<string>,
              symbol: RawTransactionArgument<string>,
              positionId: RawTransactionArgument<number | bigint>,
              realizedFundingSign: RawTransactionArgument<boolean>,
              realizedFundingFee: RawTransactionArgument<number | bigint>,
              realizedFundingFeeUsd: RawTransactionArgument<number | bigint>,
              u64Padding: RawTransactionArgument<number | bigint[]>,
          ];
}
export function emitRealizedFundingEvent(options: EmitRealizedFundingEventOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "address",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        `${packageAddress}::symbol::Symbol`,
        "u64",
        "bool",
        "u64",
        "u64",
        "vector<u64>",
    ] satisfies string[];
    const parameterNames = [
        "user",
        "collateralToken",
        "symbol",
        "positionId",
        "realizedFundingSign",
        "realizedFundingFee",
        "realizedFundingFeeUsd",
        "u64Padding",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "emit_realized_funding_event",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionIdArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionIdOptions {
    package?: string;
    arguments: GetPositionIdArguments | [position: RawTransactionArgument<string>];
}
export function getPositionId(options: GetPositionIdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_id",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionSizeArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionSizeOptions {
    package?: string;
    arguments: GetPositionSizeArguments | [position: RawTransactionArgument<string>];
}
export function getPositionSize(options: GetPositionSizeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_size",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionSideArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionSideOptions {
    package?: string;
    arguments: GetPositionSideArguments | [position: RawTransactionArgument<string>];
}
export function getPositionSide(options: GetPositionSideOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_side",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionUserArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionUserOptions {
    package?: string;
    arguments: GetPositionUserArguments | [position: RawTransactionArgument<string>];
}
export function getPositionUser(options: GetPositionUserOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_user",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionSymbolArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionSymbolOptions {
    package?: string;
    arguments: GetPositionSymbolArguments | [position: RawTransactionArgument<string>];
}
export function getPositionSymbol(options: GetPositionSymbolOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_symbol",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionOptionCollateralInfoArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionOptionCollateralInfoOptions {
    package?: string;
    arguments: GetPositionOptionCollateralInfoArguments | [position: RawTransactionArgument<string>];
}
export function getPositionOptionCollateralInfo(options: GetPositionOptionCollateralInfoOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_option_collateral_info",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetReserveAmountArguments {
    position: RawTransactionArgument<string>;
}
export interface GetReserveAmountOptions {
    package?: string;
    arguments: GetReserveAmountArguments | [position: RawTransactionArgument<string>];
}
export function getReserveAmount(options: GetReserveAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_reserve_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionSizeDecimalArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionSizeDecimalOptions {
    package?: string;
    arguments: GetPositionSizeDecimalArguments | [position: RawTransactionArgument<string>];
}
export function getPositionSizeDecimal(options: GetPositionSizeDecimalOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_size_decimal",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionCollateralTokenDecimalArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionCollateralTokenDecimalOptions {
    package?: string;
    arguments: GetPositionCollateralTokenDecimalArguments | [position: RawTransactionArgument<string>];
}
export function getPositionCollateralTokenDecimal(options: GetPositionCollateralTokenDecimalOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_collateral_token_decimal",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface CalculateUnrealizedCostArguments {
    position: RawTransactionArgument<string>;
}
export interface CalculateUnrealizedCostOptions {
    package?: string;
    arguments: CalculateUnrealizedCostArguments | [position: RawTransactionArgument<string>];
}
export function calculateUnrealizedCost(options: CalculateUnrealizedCostOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "calculate_unrealized_cost",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionLinkedOrderIdsArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionLinkedOrderIdsOptions {
    package?: string;
    arguments: GetPositionLinkedOrderIdsArguments | [position: RawTransactionArgument<string>];
}
export function getPositionLinkedOrderIds(options: GetPositionLinkedOrderIdsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_linked_order_ids",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionCollateralTokenTypeArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionCollateralTokenTypeOptions {
    package?: string;
    arguments: GetPositionCollateralTokenTypeArguments | [position: RawTransactionArgument<string>];
}
export function getPositionCollateralTokenType(options: GetPositionCollateralTokenTypeOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_collateral_token_type",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetPositionCollateralAmountArguments {
    position: RawTransactionArgument<string>;
}
export interface GetPositionCollateralAmountOptions {
    package?: string;
    arguments: GetPositionCollateralAmountArguments | [position: RawTransactionArgument<string>];
    typeArguments: [string];
}
export function getPositionCollateralAmount(options: GetPositionCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::position::Position`] satisfies string[];
    const parameterNames = ["position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_position_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetOptionPositionCollateralAmountArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface GetOptionPositionCollateralAmountOptions {
    package?: string;
    arguments:
        | GetOptionPositionCollateralAmountArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function getOptionPositionCollateralAmount(options: GetOptionPositionCollateralAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::Position`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "typusOracleTradingSymbol", "typusOracleCToken", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_option_position_collateral_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface OptionPositionBidReceiptsExpiredArguments {
    dovRegistry: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface OptionPositionBidReceiptsExpiredOptions {
    package?: string;
    arguments:
        | OptionPositionBidReceiptsExpiredArguments
        | [dovRegistry: RawTransactionArgument<string>, position: RawTransactionArgument<string>];
}
export function optionPositionBidReceiptsExpired(options: OptionPositionBidReceiptsExpiredOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        `${packageAddress}::position::Position`,
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "option_position_bid_receipts_expired",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetOptionPositionExerciseValueArguments {
    dovRegistry: RawTransactionArgument<string>;
    typusOracleTradingSymbol: RawTransactionArgument<string>;
    typusOracleCToken: RawTransactionArgument<string>;
    position: RawTransactionArgument<string>;
}
export interface GetOptionPositionExerciseValueOptions {
    package?: string;
    arguments:
        | GetOptionPositionExerciseValueArguments
        | [
              dovRegistry: RawTransactionArgument<string>,
              typusOracleTradingSymbol: RawTransactionArgument<string>,
              typusOracleCToken: RawTransactionArgument<string>,
              position: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
export function getOptionPositionExerciseValue(options: GetOptionPositionExerciseValueOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x6c9a394a43844fc09d9617bc8a8e775a4521f0e28e83de1da780d043a498671f::typus_dov_single::Registry",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        "0x1d17058789bd1e1e79f1a92424519a88146f191f58a06cc4d9ab23d17d46ab73::oracle::Oracle",
        `${packageAddress}::position::Position`,
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["dovRegistry", "typusOracleTradingSymbol", "typusOracleCToken", "position"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_option_position_exercise_value",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface GetMaxOrderTypeTagOptions {
    package?: string;
    arguments?: [];
}
export function getMaxOrderTypeTag(options: GetMaxOrderTypeTagOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "position",
            function: "get_max_order_type_tag",
        });
}
