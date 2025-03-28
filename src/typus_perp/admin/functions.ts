import { PUBLISHED_AT } from "..";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface AddAuthorizedUserArgs {
    version: TransactionObjectInput;
    userAddress: string | TransactionArgument;
}

export function addAuthorizedUser(tx: Transaction, args: AddAuthorizedUserArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::add_authorized_user`,
        arguments: [obj(tx, args.version), pure(tx, args.userAddress, `address`)],
    });
}

export interface AddExpLeaderboardArgs {
    version: TransactionObjectInput;
    typusEcosystemVersion: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    user: string | TransactionArgument;
    score: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function addExpLeaderboard(tx: Transaction, args: AddExpLeaderboardArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::add_exp_leaderboard`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.user, `address`),
            pure(tx, args.score, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface AddTailsExpAmountArgs {
    version: TransactionObjectInput;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    user: string | TransactionArgument;
    amount: bigint | TransactionArgument;
}

export function addTailsExpAmount(tx: Transaction, args: AddTailsExpAmountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::add_tails_exp_amount`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            pure(tx, args.user, `address`),
            pure(tx, args.amount, `u64`),
        ],
    });
}

export interface ChargeFeeArgs {
    version: TransactionObjectInput;
    balance: TransactionObjectInput;
}

export function chargeFee(tx: Transaction, typeArg: string, args: ChargeFeeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::charge_fee`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.balance)],
    });
}

export interface ChargeLiquidatorFeeArgs {
    version: TransactionObjectInput;
    balance: TransactionObjectInput;
}

export function chargeLiquidatorFee(tx: Transaction, typeArg: string, args: ChargeLiquidatorFeeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::charge_liquidator_fee`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.balance)],
    });
}

export function init(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::init`, arguments: [] });
}

export interface InstallEcosystemManagerCapEntryArgs {
    version: TransactionObjectInput;
    typusEcosystemVersion: TransactionObjectInput;
}

export function installEcosystemManagerCapEntry(
    tx: Transaction,
    args: InstallEcosystemManagerCapEntryArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::admin::install_ecosystem_manager_cap_entry`,
        arguments: [obj(tx, args.version), obj(tx, args.typusEcosystemVersion)],
    });
}

export interface RemoveAuthorizedUserArgs {
    version: TransactionObjectInput;
    userAddress: string | TransactionArgument;
}

export function removeAuthorizedUser(tx: Transaction, args: RemoveAuthorizedUserArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::admin::remove_authorized_user`,
        arguments: [obj(tx, args.version), pure(tx, args.userAddress, `address`)],
    });
}

export function sendFee(tx: Transaction, typeArg: string, version: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::send_fee`, typeArguments: [typeArg], arguments: [obj(tx, version)] });
}

export function sendLiquidatorFee(tx: Transaction, typeArg: string, version: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::send_liquidator_fee`, typeArguments: [typeArg], arguments: [obj(tx, version)] });
}

export function upgrade(tx: Transaction, version: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::upgrade`, arguments: [obj(tx, version)] });
}

export function verify(tx: Transaction, version: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::verify`, arguments: [obj(tx, version)] });
}

export function versionCheck(tx: Transaction, version: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::admin::version_check`, arguments: [obj(tx, version)] });
}
