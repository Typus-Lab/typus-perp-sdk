import { PUBLISHED_AT } from "..";
import { Option } from "../../_dependencies/source/0x1/option/structs";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface AddDelegateUserArgs {
    userAccount: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function addDelegateUser(tx: Transaction, args: AddDelegateUserArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::add_delegate_user`,
        arguments: [obj(tx, args.userAccount), pure(tx, args.user, `address`)],
    });
}

export function checkOwner(tx: Transaction, userAccount: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::user_account::check_owner`, arguments: [obj(tx, userAccount)] });
}

export interface DepositArgs {
    userAccount: TransactionObjectInput;
    balance: TransactionObjectInput;
}

export function deposit(tx: Transaction, typeArg: string, args: DepositArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::deposit`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.userAccount), obj(tx, args.balance)],
    });
}

export interface GetMutUserAccountArgs {
    marketId: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function getMutUserAccount(tx: Transaction, args: GetMutUserAccountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::get_mut_user_account`,
        arguments: [obj(tx, args.marketId), pure(tx, args.user, `address`)],
    });
}

export function getUserAccountOwner(tx: Transaction, userAccountCap: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::user_account::get_user_account_owner`, arguments: [obj(tx, userAccountCap)] });
}

export interface HasUserAccountArgs {
    marketId: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function hasUserAccount(tx: Transaction, args: HasUserAccountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::has_user_account`,
        arguments: [obj(tx, args.marketId), pure(tx, args.user, `address`)],
    });
}

export function newUserAccount(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::user_account::new_user_account`, arguments: [] });
}

export interface RemoveUserAccountArgs {
    marketId: TransactionObjectInput;
    user: string | TransactionArgument;
    userAccountCap: TransactionObjectInput;
}

export function removeUserAccount(tx: Transaction, args: RemoveUserAccountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::remove_user_account`,
        arguments: [obj(tx, args.marketId), pure(tx, args.user, `address`), obj(tx, args.userAccountCap)],
    });
}

export interface WithdrawArgs {
    userAccount: TransactionObjectInput;
    amount: bigint | TransactionArgument | TransactionArgument | null;
    userAccountCap: TransactionObjectInput;
}

export function withdraw(tx: Transaction, typeArg: string, args: WithdrawArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::user_account::withdraw`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.userAccount), pure(tx, args.amount, `${Option.$typeName}<u64>`), obj(tx, args.userAccountCap)],
    });
}
