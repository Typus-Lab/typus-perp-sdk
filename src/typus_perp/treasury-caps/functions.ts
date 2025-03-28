import { PUBLISHED_AT } from "..";
import { obj } from "../../_framework/util";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

export function getMutTreasuryCap(
    tx: Transaction,
    typeArg: string,
    treasuryCaps: TransactionObjectInput,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::treasury_caps::get_mut_treasury_cap`,
        typeArguments: [typeArg],
        arguments: [obj(tx, treasuryCaps)],
    });
}

export function init(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::treasury_caps::init`, arguments: [] });
}

export function removeTreasuryCap(
    tx: Transaction,
    typeArg: string,
    treasuryCaps: TransactionObjectInput,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::treasury_caps::remove_treasury_cap`,
        typeArguments: [typeArg],
        arguments: [obj(tx, treasuryCaps)],
    });
}

export interface StoreTreasuryCapArgs {
    treasuryCaps: TransactionObjectInput;
    treasuryCap: TransactionObjectInput;
}

export function storeTreasuryCap(tx: Transaction, typeArg: string, args: StoreTreasuryCapArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::treasury_caps::store_treasury_cap`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.treasuryCaps), obj(tx, args.treasuryCap)],
    });
}
