/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `math` module provides mathematical utility functions for the Typus
 * Perpetual Protocol.
 */

import { type Transaction } from "@mysten/sui/transactions";
import { normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
export interface SetU64VectorValueArguments {
    u64Vector: RawTransactionArgument<number | bigint[]>;
    i: RawTransactionArgument<number | bigint>;
    value: RawTransactionArgument<number | bigint>;
}
export interface SetU64VectorValueOptions {
    package?: string;
    arguments:
        | SetU64VectorValueArguments
        | [
              u64Vector: RawTransactionArgument<number | bigint[]>,
              i: RawTransactionArgument<number | bigint>,
              value: RawTransactionArgument<number | bigint>,
          ];
}
/**
 * Sets a value in a `vector<u64>` at a specific index. It will extend the vector
 * with zeros if the index is out of bounds.
 */
export function setU64VectorValue(options: SetU64VectorValueOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["vector<u64>", "u64", "u64"] satisfies string[];
    const parameterNames = ["u64Vector", "i", "value"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "set_u64_vector_value",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetU64VectorValueArguments {
    u64Vector: RawTransactionArgument<number | bigint[]>;
    i: RawTransactionArgument<number | bigint>;
}
export interface GetU64VectorValueOptions {
    package?: string;
    arguments:
        | GetU64VectorValueArguments
        | [u64Vector: RawTransactionArgument<number | bigint[]>, i: RawTransactionArgument<number | bigint>];
}
/**
 * Gets a value from a `vector<u64>` at a specific index. It will return 0 if the
 * index is out of bounds.
 */
export function getU64VectorValue(options: GetU64VectorValueOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["vector<u64>", "u64"] satisfies string[];
    const parameterNames = ["u64Vector", "i"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "get_u64_vector_value",
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
/** Calculates a multiplier for a given number of decimals. */
export function multiplier(options: MultiplierOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["u64"] satisfies string[];
    const parameterNames = ["decimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "multiplier",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AmountToUsdArguments {
    amount: RawTransactionArgument<number | bigint>;
    amountDecimal: RawTransactionArgument<number | bigint>;
    price: RawTransactionArgument<number | bigint>;
    priceDecimal: RawTransactionArgument<number | bigint>;
}
export interface AmountToUsdOptions {
    package?: string;
    arguments:
        | AmountToUsdArguments
        | [
              amount: RawTransactionArgument<number | bigint>,
              amountDecimal: RawTransactionArgument<number | bigint>,
              price: RawTransactionArgument<number | bigint>,
              priceDecimal: RawTransactionArgument<number | bigint>,
          ];
}
/** Converts an amount of a token to USD. */
export function amountToUsd(options: AmountToUsdOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["amount", "amountDecimal", "price", "priceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "amount_to_usd",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface UsdToAmountArguments {
    usd: RawTransactionArgument<number | bigint>;
    amountDecimal: RawTransactionArgument<number | bigint>;
    price: RawTransactionArgument<number | bigint>;
    priceDecimal: RawTransactionArgument<number | bigint>;
}
export interface UsdToAmountOptions {
    package?: string;
    arguments:
        | UsdToAmountArguments
        | [
              usd: RawTransactionArgument<number | bigint>,
              amountDecimal: RawTransactionArgument<number | bigint>,
              price: RawTransactionArgument<number | bigint>,
              priceDecimal: RawTransactionArgument<number | bigint>,
          ];
}
/** Converts an amount of USD to a token. */
export function usdToAmount(options: UsdToAmountOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = ["u64", "u64", "u64", "u64"] satisfies string[];
    const parameterNames = ["usd", "amountDecimal", "price", "priceDecimal"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "usd_to_amount",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetUsdDecimalOptions {
    package?: string;
    arguments?: [];
}
/** Returns the number of decimals for USD. */
export function getUsdDecimal(options: GetUsdDecimalOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "get_usd_decimal",
        });
}
export interface GetFundingRateDecimalOptions {
    package?: string;
    arguments?: [];
}
/** Returns the number of decimals for the funding rate. */
export function getFundingRateDecimal(options: GetFundingRateDecimalOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "math",
            function: "get_funding_rate_decimal",
        });
}
