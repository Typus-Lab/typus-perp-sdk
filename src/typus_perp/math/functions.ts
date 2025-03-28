import { PUBLISHED_AT } from "..";
import { pure } from "../../_framework/util";
import { Transaction, TransactionArgument } from "@mysten/sui/transactions";

export interface AmountToUsdArgs {
    amount: bigint | TransactionArgument;
    amountDecimal: bigint | TransactionArgument;
    price: bigint | TransactionArgument;
    priceDecimal: bigint | TransactionArgument;
}

export function amountToUsd(tx: Transaction, args: AmountToUsdArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::math::amount_to_usd`,
        arguments: [
            pure(tx, args.amount, `u64`),
            pure(tx, args.amountDecimal, `u64`),
            pure(tx, args.price, `u64`),
            pure(tx, args.priceDecimal, `u64`),
        ],
    });
}

export function getFundingRateDecimal(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::math::get_funding_rate_decimal`, arguments: [] });
}

export interface GetU64VectorValueArgs {
    u64Vector: Array<bigint | TransactionArgument> | TransactionArgument;
    i: bigint | TransactionArgument;
}

export function getU64VectorValue(tx: Transaction, args: GetU64VectorValueArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::math::get_u64_vector_value`,
        arguments: [pure(tx, args.u64Vector, `vector<u64>`), pure(tx, args.i, `u64`)],
    });
}

export function getUsdDecimal(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::math::get_usd_decimal`, arguments: [] });
}

export function multiplier(tx: Transaction, decimal: bigint | TransactionArgument, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::math::multiplier`, arguments: [pure(tx, decimal, `u64`)] });
}

export interface SetU64VectorValueArgs {
    u64Vector: Array<bigint | TransactionArgument> | TransactionArgument;
    i: bigint | TransactionArgument;
    value: bigint | TransactionArgument;
}

export function setU64VectorValue(tx: Transaction, args: SetU64VectorValueArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::math::set_u64_vector_value`,
        arguments: [pure(tx, args.u64Vector, `vector<u64>`), pure(tx, args.i, `u64`), pure(tx, args.value, `u64`)],
    });
}

export interface UsdToAmountArgs {
    usd: bigint | TransactionArgument;
    amountDecimal: bigint | TransactionArgument;
    price: bigint | TransactionArgument;
    priceDecimal: bigint | TransactionArgument;
}

export function usdToAmount(tx: Transaction, args: UsdToAmountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::math::usd_to_amount`,
        arguments: [
            pure(tx, args.usd, `u64`),
            pure(tx, args.amountDecimal, `u64`),
            pure(tx, args.price, `u64`),
            pure(tx, args.priceDecimal, `u64`),
        ],
    });
}
