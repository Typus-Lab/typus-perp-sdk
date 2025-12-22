import { PACKAGE_ID } from "..";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface GetUserProfitsArgs {
    version: TransactionObjectInput;
    profitVault: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function getUserProfits(tx: Transaction, args: GetUserProfitsArgs, package_id: string = PACKAGE_ID) {
    return tx.moveCall({
        target: `${package_id}::profit_vault::get_user_profits`,
        arguments: [obj(tx, args.version), obj(tx, args.profitVault), pure(tx, args.user, `address`)],
    });
}

export interface GetLockedUserProfitsArgs {
    version: TransactionObjectInput;
    lockVault: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function getLockedUserProfits(tx: Transaction, args: GetLockedUserProfitsArgs, package_id: string = PACKAGE_ID) {
    return tx.moveCall({
        target: `${package_id}::profit_vault::get_locked_user_profits`,
        arguments: [obj(tx, args.version), obj(tx, args.lockVault), pure(tx, args.user, `address`)],
    });
}
