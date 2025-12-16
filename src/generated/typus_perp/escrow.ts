/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `escrow` module defines the `UnsettledBidReceipt` struct and functions for
 * creating and destructing it. This is used to handle unsettled bids from
 * liquidations.
 */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as vault from "./deps/typus_framework/vault";
import * as type_name from "./deps/std/type_name";
const $moduleName = "@typus/perp::escrow";
export const UnsettledBidReceipt = new MoveStruct({
    name: `${$moduleName}::UnsettledBidReceipt`,
    fields: {
        /** A vector of `TypusBidReceipt` structs. */
        receipt: bcs.vector(vault.TypusBidReceipt),
        /** The ID of the position. */
        position_id: bcs.u64(),
        /** The address of the user. */
        user: bcs.Address,
        /** A vector of the token types. */
        token_types: bcs.vector(type_name.TypeName),
        /** The sign of the unrealized PNL. */
        unrealized_pnl_sign: bcs.bool(),
        /** The unrealized PNL. */
        unrealized_pnl: bcs.u64(),
        /** The unrealized trading fee. */
        unrealized_trading_fee: bcs.u64(),
        /** The unrealized borrow fee. */
        unrealized_borrow_fee: bcs.u64(),
        /** The sign of the unrealized funding fee. */
        unrealized_funding_fee_sign: bcs.bool(),
        /** The unrealized funding fee. */
        unrealized_funding_fee: bcs.u64(),
        /** The unrealized liquidator fee. */
        unrealized_liquidator_fee: bcs.u64(),
    },
});
export interface CreateUnsettledBidReceiptArguments {
    receipt: RawTransactionArgument<string[]>;
    positionId: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
    tokenTypes: RawTransactionArgument<string[]>;
    unrealizedPnlSign: RawTransactionArgument<boolean>;
    unrealizedPnl: RawTransactionArgument<number | bigint>;
    unrealizedTradingFee: RawTransactionArgument<number | bigint>;
    unrealizedBorrowFee: RawTransactionArgument<number | bigint>;
    unrealizedFundingFeeSign: RawTransactionArgument<boolean>;
    unrealizedFundingFee: RawTransactionArgument<number | bigint>;
    unrealizedLiquidatorFee: RawTransactionArgument<number | bigint>;
}
export interface CreateUnsettledBidReceiptOptions {
    package?: string;
    arguments:
        | CreateUnsettledBidReceiptArguments
        | [
              receipt: RawTransactionArgument<string[]>,
              positionId: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
              tokenTypes: RawTransactionArgument<string[]>,
              unrealizedPnlSign: RawTransactionArgument<boolean>,
              unrealizedPnl: RawTransactionArgument<number | bigint>,
              unrealizedTradingFee: RawTransactionArgument<number | bigint>,
              unrealizedBorrowFee: RawTransactionArgument<number | bigint>,
              unrealizedFundingFeeSign: RawTransactionArgument<boolean>,
              unrealizedFundingFee: RawTransactionArgument<number | bigint>,
              unrealizedLiquidatorFee: RawTransactionArgument<number | bigint>,
          ];
}
/** Creates a new `UnsettledBidReceipt`. */
export function createUnsettledBidReceipt(options: CreateUnsettledBidReceiptOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [
        "vector<0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded::vault::TypusBidReceipt>",
        "u64",
        "address",
        "vector<0x0000000000000000000000000000000000000000000000000000000000000001::type_name::TypeName>",
        "bool",
        "u64",
        "u64",
        "u64",
        "bool",
        "u64",
        "u64",
    ] satisfies string[];
    const parameterNames = [
        "receipt",
        "positionId",
        "user",
        "tokenTypes",
        "unrealizedPnlSign",
        "unrealizedPnl",
        "unrealizedTradingFee",
        "unrealizedBorrowFee",
        "unrealizedFundingFeeSign",
        "unrealizedFundingFee",
        "unrealizedLiquidatorFee",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "escrow",
            function: "create_unsettled_bid_receipt",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface DestructUnsettledBidReceiptArguments {
    unsettledBidReceipt: RawTransactionArgument<string>;
}
export interface DestructUnsettledBidReceiptOptions {
    package?: string;
    arguments: DestructUnsettledBidReceiptArguments | [unsettledBidReceipt: RawTransactionArgument<string>];
}
/** Destructs an `UnsettledBidReceipt` and returns its fields. */
export function destructUnsettledBidReceipt(options: DestructUnsettledBidReceiptOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::escrow::UnsettledBidReceipt`] satisfies string[];
    const parameterNames = ["unsettledBidReceipt"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "escrow",
            function: "destruct_unsettled_bid_receipt",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface GetBidReceiptsArguments {
    unsettledBidReceipt: RawTransactionArgument<string>;
}
export interface GetBidReceiptsOptions {
    package?: string;
    arguments: GetBidReceiptsArguments | [unsettledBidReceipt: RawTransactionArgument<string>];
}
/** Gets a reference to the bid receipts in an `UnsettledBidReceipt`. */
export function getBidReceipts(options: GetBidReceiptsOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [`${packageAddress}::escrow::UnsettledBidReceipt`] satisfies string[];
    const parameterNames = ["unsettledBidReceipt"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "escrow",
            function: "get_bid_receipts",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
