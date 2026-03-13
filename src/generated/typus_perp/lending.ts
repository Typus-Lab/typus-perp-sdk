/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `lending` module provides functions for interacting with the Scallop lending
 * protocol.
 */

import { type Transaction } from "@mysten/sui/transactions";
import { normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
export interface DepositScallopBasicArguments {
    balance: RawTransactionArgument<string>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
}
export interface DepositScallopBasicOptions {
    package?: string;
    arguments:
        | DepositScallopBasicArguments
        | [
              balance: RawTransactionArgument<string>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/**
 * Deposits a token into the Scallop lending protocol. WARNING: no authority check
 * inside
 */
export function depositScallopBasic(options: DepositScallopBasicOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `0x0000000000000000000000000000000000000000000000000000000000000002::balance::Balance<${options.typeArguments[0]}>`,
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["balance", "scallopVersion", "scallopMarket"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lending",
            function: "deposit_scallop_basic",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
export interface WithdrawScallopBasicArguments {
    marketCoin: RawTransactionArgument<string>;
    scallopVersion: RawTransactionArgument<string>;
    scallopMarket: RawTransactionArgument<string>;
}
export interface WithdrawScallopBasicOptions {
    package?: string;
    arguments:
        | WithdrawScallopBasicArguments
        | [
              marketCoin: RawTransactionArgument<string>,
              scallopVersion: RawTransactionArgument<string>,
              scallopMarket: RawTransactionArgument<string>,
          ];
    typeArguments: [string];
}
/**
 * Withdraws a token from the Scallop lending protocol. WARNING: no authority check
 * inside
 */
export function withdrawScallopBasic(options: WithdrawScallopBasicOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        `0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<${options.typeArguments[0]}>>`,
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::version::Version",
        "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::market::Market",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
    const parameterNames = ["marketCoin", "scallopVersion", "scallopMarket"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "lending",
            function: "withdraw_scallop_basic",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
            typeArguments: options.typeArguments,
        });
}
