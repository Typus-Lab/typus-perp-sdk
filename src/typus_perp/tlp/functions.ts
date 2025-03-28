import { PUBLISHED_AT } from "..";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface BurnArgs {
    treasuryCap: TransactionObjectInput;
    coin: TransactionObjectInput;
}

export function burn(tx: Transaction, typeArg: string, args: BurnArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::tlp::burn`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.treasuryCap), obj(tx, args.coin)],
    });
}

export function init(tx: Transaction, witness: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::tlp::init`, arguments: [obj(tx, witness)] });
}

export interface MintArgs {
    treasuryCap: TransactionObjectInput;
    value: bigint | TransactionArgument;
}

export function mint(tx: Transaction, typeArg: string, args: MintArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::tlp::mint`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.treasuryCap), pure(tx, args.value, `u64`)],
    });
}

export function totalSupply(tx: Transaction, treasuryCap: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::tlp::total_supply`, arguments: [obj(tx, treasuryCap)] });
}

export interface TransferTreasuryCapArgs {
    version: TransactionObjectInput;
    lpRegistry: TransactionObjectInput;
    treasuryCaps: TransactionObjectInput;
}

export function transferTreasuryCap(tx: Transaction, args: TransferTreasuryCapArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::tlp::transfer_treasury_cap`,
        arguments: [obj(tx, args.version), obj(tx, args.lpRegistry), obj(tx, args.treasuryCaps)],
    });
}
