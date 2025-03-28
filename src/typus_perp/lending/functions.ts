import { PUBLISHED_AT } from "..";
import { obj } from "../../_framework/util";
import { Transaction, TransactionObjectInput } from "@mysten/sui/transactions";

export interface DepositScallopBasicArgs {
    balance: TransactionObjectInput;
    scallopVersion: TransactionObjectInput;
    scallopMarket: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function depositScallopBasic(tx: Transaction, typeArg: string, args: DepositScallopBasicArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::lending::deposit_scallop_basic`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.balance), obj(tx, args.scallopVersion), obj(tx, args.scallopMarket), obj(tx, args.clock)],
    });
}

export interface WithdrawScallopBasicArgs {
    marketCoin: TransactionObjectInput;
    scallopVersion: TransactionObjectInput;
    scallopMarket: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function withdrawScallopBasic(
    tx: Transaction,
    typeArg: string,
    args: WithdrawScallopBasicArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::lending::withdraw_scallop_basic`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.marketCoin), obj(tx, args.scallopVersion), obj(tx, args.scallopMarket), obj(tx, args.clock)],
    });
}
