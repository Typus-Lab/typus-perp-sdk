import { String } from "../../_dependencies/source/0x1/string/structs";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface GetReferralInfoArgs {
    version: TransactionObjectInput;
    referralRegistry: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    referralCode: string | TransactionArgument;
    sumFeeUsd: boolean | TransactionArgument;
}

export function getReferralInfo(tx: Transaction, args: GetReferralInfoArgs, published_at: string) {
    return tx.moveCall({
        target: `${published_at}::referral::get_referral_info`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.referralRegistry),
            obj(tx, args.typusUserRegistry),
            pure(tx, args.referralCode, `${String.$typeName}`),
            pure(tx, args.sumFeeUsd, `bool`),
        ],
    });
}

export function initReferralRegistry(tx: Transaction, version: TransactionObjectInput, published_at: string) {
    return tx.moveCall({
        target: `${published_at}::referral::init_referral_registry`,
        arguments: [obj(tx, version)],
    });
}

export interface RegisterAsReferrerArgs {
    version: TransactionObjectInput;
    referralRegistry: TransactionObjectInput;
    referralCode: string | TransactionArgument;
    referrerAddress: string | TransactionArgument;
}

export function registerAsReferrer(tx: Transaction, args: RegisterAsReferrerArgs, published_at: string) {
    return tx.moveCall({
        target: `${published_at}::referral::register_as_referrer`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.referralRegistry),
            pure(tx, args.referralCode, `${String.$typeName}`),
            pure(tx, args.referrerAddress, `address`),
        ],
    });
}

export interface RegisterYourReferralArgs {
    version: TransactionObjectInput;
    referralRegistry: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    referralCode: string | TransactionArgument;
}

export function registerYourReferral(tx: Transaction, args: RegisterYourReferralArgs, published_at: string) {
    return tx.moveCall({
        target: `${published_at}::referral::register_your_referral`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.referralRegistry),
            obj(tx, args.typusUserRegistry),
            pure(tx, args.referralCode, `${String.$typeName}`),
        ],
    });
}

export interface UpdateReferralRegistryConfigArgs {
    version: TransactionObjectInput;
    referralRegistry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    value: bigint | TransactionArgument;
}

export function updateReferralRegistryConfig(tx: Transaction, args: UpdateReferralRegistryConfigArgs, published_at: string) {
    return tx.moveCall({
        target: `${published_at}::referral::update_referral_registry_config`,
        arguments: [obj(tx, args.version), obj(tx, args.referralRegistry), pure(tx, args.index, `u64`), pure(tx, args.value, `u64`)],
    });
}
