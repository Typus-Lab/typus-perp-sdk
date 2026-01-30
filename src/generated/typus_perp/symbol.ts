/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `symbol` module defines the `Symbol` struct, which represents a trading
 * pair.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { type Transaction } from "@mysten/sui/transactions";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::symbol";
export const Symbol = new MoveStruct({
    name: `${$moduleName}::Symbol`,
    fields: {
        /** The base token of the trading pair. */
        base_token: type_name.TypeName,
        /** The quote token of the trading pair. */
        quote_token: type_name.TypeName,
    },
});
export interface CreateArguments {
    baseToken: RawTransactionArgument<string>;
    quoteToken: RawTransactionArgument<string>;
}
export interface CreateOptions {
    package?: string;
    arguments: CreateArguments | [baseToken: RawTransactionArgument<string>, quoteToken: RawTransactionArgument<string>];
}
/** Creates a new `Symbol` from `TypeName`s. */
export function create(options: CreateOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
        "0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName",
    ] satisfies string[];
    const parameterNames = ["baseToken", "quoteToken"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "symbol",
            function: "create",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface BaseTokenArguments {
    self: RawTransactionArgument<string>;
}
export interface BaseTokenOptions {
    package?: string;
    arguments: BaseTokenArguments | [self: RawTransactionArgument<string>];
}
/** Gets the base token of a `Symbol`. */
export function baseToken(options: BaseTokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::symbol::Symbol`] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "symbol",
            function: "base_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface QuoteTokenArguments {
    self: RawTransactionArgument<string>;
}
export interface QuoteTokenOptions {
    package?: string;
    arguments: QuoteTokenArguments | [self: RawTransactionArgument<string>];
}
/** Gets the quote token of a `Symbol`. */
export function quoteToken(options: QuoteTokenOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::symbol::Symbol`] satisfies string[];
    const parameterNames = ["self"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "symbol",
            function: "quote_token",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
