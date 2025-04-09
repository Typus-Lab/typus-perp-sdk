import { PUBLISHED_AT } from "..";
import { Option } from "../../_dependencies/source/0x1/option/structs";
import { obj, pure, vector } from "../../_framework/util";
import { LpUserShare } from "./structs";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface ActivateIncentiveTokenArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function activateIncentiveToken(
    tx: Transaction,
    typeArg: string,
    args: ActivateIncentiveTokenArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::activate_incentive_token`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export interface AddIncentiveTokenArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    periodIncentiveAmount: bigint | TransactionArgument;
    incentiveIntervalTsMs: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function addIncentiveToken(tx: Transaction, typeArg: string, args: AddIncentiveTokenArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::add_incentive_token`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.periodIncentiveAmount, `u64`),
            pure(tx, args.incentiveIntervalTsMs, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface AllocateIncentiveArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function allocateIncentive(tx: Transaction, args: AllocateIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::allocate_incentive`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`), obj(tx, args.clock)],
    });
}

export interface CalculateIncentiveArgs {
    stakePool: TransactionObjectInput;
    incentiveToken: TransactionObjectInput;
    lpUserShare: TransactionObjectInput;
}

export function calculateIncentive(tx: Transaction, args: CalculateIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::calculate_incentive`,
        arguments: [obj(tx, args.stakePool), obj(tx, args.incentiveToken), obj(tx, args.lpUserShare)],
    });
}

export interface CreateUserLastIncentiveTsMsArgs {
    stakePool: TransactionObjectInput;
    currentTsMs: bigint | TransactionArgument;
}

export function createUserLastIncentiveTsMs(tx: Transaction, args: CreateUserLastIncentiveTsMsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::create_user_last_incentive_ts_ms`,
        arguments: [obj(tx, args.stakePool), pure(tx, args.currentTsMs, `u64`)],
    });
}

export interface DeactivateIncentiveTokenArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function deactivateIncentiveToken(
    tx: Transaction,
    typeArg: string,
    args: DeactivateIncentiveTokenArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::deactivate_incentive_token`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export interface DepositIncentiveArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    coin: TransactionObjectInput;
}

export function depositIncentive(tx: Transaction, typeArg: string, args: DepositIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::deposit_incentive`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`), obj(tx, args.coin)],
    });
}

export interface GetIncentiveArgs {
    stakePool: TransactionObjectInput;
    tokenType: TransactionObjectInput;
}

export function getIncentive(tx: Transaction, args: GetIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_incentive`,
        arguments: [obj(tx, args.stakePool), obj(tx, args.tokenType)],
    });
}

export function getIncentiveTokens(tx: Transaction, stakePool: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::get_incentive_tokens`, arguments: [obj(tx, stakePool)] });
}

export function getLastIncentivePriceIndex(tx: Transaction, stakePool: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::get_last_incentive_price_index`, arguments: [obj(tx, stakePool)] });
}

export interface GetMutIncentiveArgs {
    stakePool: TransactionObjectInput;
    tokenType: TransactionObjectInput;
}

export function getMutIncentive(tx: Transaction, args: GetMutIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_mut_incentive`,
        arguments: [obj(tx, args.stakePool), obj(tx, args.tokenType)],
    });
}

export interface GetMutStakePoolArgs {
    id: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function getMutStakePool(tx: Transaction, args: GetMutStakePoolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_mut_stake_pool`,
        arguments: [obj(tx, args.id), pure(tx, args.index, `u64`)],
    });
}

export interface GetStakePoolArgs {
    id: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function getStakePool(tx: Transaction, args: GetStakePoolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_stake_pool`,
        arguments: [obj(tx, args.id), pure(tx, args.index, `u64`)],
    });
}

export interface GetUserShareIdsArgs {
    stakePool: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function getUserShareIds(tx: Transaction, args: GetUserShareIdsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_user_share_ids`,
        arguments: [obj(tx, args.stakePool), pure(tx, args.user, `address`)],
    });
}

export interface GetUserSharesArgs {
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    user: string | TransactionArgument;
}

export function getUserShares(tx: Transaction, args: GetUserSharesArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_user_shares`,
        arguments: [obj(tx, args.registry), pure(tx, args.index, `u64`), pure(tx, args.user, `address`)],
    });
}

export interface HarvestPerUserShareArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    userShareId: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function harvestPerUserShare(tx: Transaction, typeArg: string, args: HarvestPerUserShareArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::harvest_per_user_share`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.userShareId, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface HarvestProgressUpdatedArgs {
    stakePool: TransactionObjectInput;
    lpUserShare: TransactionObjectInput;
}

export function harvestProgressUpdated(tx: Transaction, args: HarvestProgressUpdatedArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::harvest_progress_updated`,
        arguments: [obj(tx, args.stakePool), obj(tx, args.lpUserShare)],
    });
}

export function init(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::init`, arguments: [] });
}

export interface MigrateToStakedTlpArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function migrateToStakedTlp(tx: Transaction, typeArg: string, args: MigrateToStakedTlpArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::migrate_to_staked_tlp`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export function multiplier(tx: Transaction, decimal: bigint | TransactionArgument, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::multiplier`, arguments: [pure(tx, decimal, `u64`)] });
}

export interface NewStakePoolArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    unlockCountdownTsMs: bigint | TransactionArgument;
}

export function newStakePool(tx: Transaction, typeArg: string, args: NewStakePoolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::new_stake_pool`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.unlockCountdownTsMs, `u64`)],
    });
}

export interface RemoveIncentiveArgs {
    stakePool: TransactionObjectInput;
    tokenType: TransactionObjectInput;
}

export function removeIncentive(tx: Transaction, args: RemoveIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::remove_incentive`,
        arguments: [obj(tx, args.stakePool), obj(tx, args.tokenType)],
    });
}

export interface RemoveIncentiveTokenArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function removeIncentiveToken(
    tx: Transaction,
    typeArg: string,
    args: RemoveIncentiveTokenArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::remove_incentive_token`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export interface RemoveUserShareByIdArgs {
    id: TransactionObjectInput;
    user: string | TransactionArgument;
    userShareId: bigint | TransactionArgument;
}

export function removeUserShareById(tx: Transaction, args: RemoveUserShareByIdArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::remove_user_share_by_id`,
        arguments: [obj(tx, args.id), pure(tx, args.user, `address`), pure(tx, args.userShareId, `u64`)],
    });
}

export interface StakeArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    lpToken: TransactionObjectInput;
    userShareId: bigint | TransactionArgument | TransactionArgument | null;
    clock: TransactionObjectInput;
}

export function stake(tx: Transaction, typeArg: string, args: StakeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::stake`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            obj(tx, args.lpToken),
            pure(tx, args.userShareId, `${Option.$typeName}<u64>`),
            obj(tx, args.clock),
        ],
    });
}

export interface StoreUserSharesArgs {
    id: TransactionObjectInput;
    user: string | TransactionArgument;
    userShares: Array<TransactionObjectInput> | TransactionArgument;
}

export function storeUserShares(tx: Transaction, args: StoreUserSharesArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::store_user_shares`,
        arguments: [obj(tx, args.id), pure(tx, args.user, `address`), vector(tx, `${LpUserShare.$typeName}`, args.userShares)],
    });
}

export interface UnstakeArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    userShareId: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function unstake(tx: Transaction, typeArg: string, args: UnstakeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::unstake`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.userShareId, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface UnsubscribeArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    userShareId: bigint | TransactionArgument;
    unsubscribedShares: bigint | TransactionArgument | TransactionArgument | null;
    clock: TransactionObjectInput;
}

export function unsubscribe(tx: Transaction, typeArg: string, args: UnsubscribeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::unsubscribe`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.userShareId, `u64`),
            pure(tx, args.unsubscribedShares, `${Option.$typeName}<u64>`),
            obj(tx, args.clock),
        ],
    });
}

export interface UpdateIncentiveConfigArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    clock: TransactionObjectInput;
    periodIncentiveAmount: bigint | TransactionArgument | TransactionArgument | null;
    incentiveIntervalTsMs: bigint | TransactionArgument | TransactionArgument | null;
    u64Padding: Array<bigint | TransactionArgument> | TransactionArgument | TransactionArgument | null;
}

export function updateIncentiveConfig(
    tx: Transaction,
    typeArg: string,
    args: UpdateIncentiveConfigArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::update_incentive_config`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            obj(tx, args.clock),
            pure(tx, args.periodIncentiveAmount, `${Option.$typeName}<u64>`),
            pure(tx, args.incentiveIntervalTsMs, `${Option.$typeName}<u64>`),
            pure(tx, args.u64Padding, `${Option.$typeName}<vector<u64>>`),
        ],
    });
}

export interface UpdateUnlockCountdownTsMsArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    unlockCountdownTsMs: bigint | TransactionArgument;
}

export function updateUnlockCountdownTsMs(tx: Transaction, args: UpdateUnlockCountdownTsMsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::update_unlock_countdown_ts_ms`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`), pure(tx, args.unlockCountdownTsMs, `u64`)],
    });
}

export interface WithdrawIncentiveArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    amount: bigint | TransactionArgument | TransactionArgument | null;
}

export function withdrawIncentive(tx: Transaction, typeArg: string, args: WithdrawIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::withdraw_incentive`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.amount, `${Option.$typeName}<u64>`),
        ],
    });
}
