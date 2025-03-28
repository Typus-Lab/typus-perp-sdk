import { PUBLISHED_AT } from "..";
import { obj } from "../../_framework/util";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

export function baseToken(tx: Transaction, self: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::symbol::base_token`, arguments: [obj(tx, self)] });
}

export interface CreateArgs {
    baseToken: TransactionObjectInput;
    quoteToken: TransactionObjectInput;
}

export function create(tx: Transaction, args: CreateArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::symbol::create`, arguments: [obj(tx, args.baseToken), obj(tx, args.quoteToken)] });
}

export function new_(tx: Transaction, typeArgs: [string, string], published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::symbol::new`, typeArguments: typeArgs, arguments: [] });
}

export function quoteToken(tx: Transaction, self: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::symbol::quote_token`, arguments: [obj(tx, self)] });
}
