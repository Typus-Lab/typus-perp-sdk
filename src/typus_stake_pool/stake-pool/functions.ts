import { PUBLISHED_AT } from "..";
import { Option } from "../../_dependencies/source/0x1/option/structs";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export function init(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::init`, arguments: [] });
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

export interface AddLpUserSharesV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function addLpUserSharesV2(tx: Transaction, args: AddLpUserSharesV2Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::add_lp_user_shares_v2`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export interface MigrateLpUserSharesV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    user: string | TransactionArgument;
}

export function migrateLpUserSharesV2(tx: Transaction, args: MigrateLpUserSharesV2Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::migrate_lp_user_shares_v2`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`), pure(tx, args.user, `address`)],
    });
}

export interface RemoveLpUserSharesV1Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
}

export function removeLpUserSharesV1(tx: Transaction, args: RemoveLpUserSharesV1Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::remove_lp_user_shares_v1`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`)],
    });
}

export function isAutoCompound(tx: Transaction, userShare: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::is_auto_compound`, arguments: [obj(tx, userShare)] });
}

export interface AutoCompoundArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function autoCompound(tx: Transaction, typeArg: string, args: AutoCompoundArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::auto_compound`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.index, `u64`), obj(tx, args.clock)],
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

export interface WithdrawIncentiveV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    amount: bigint | TransactionArgument | TransactionArgument | null;
    clock: TransactionObjectInput;
}

export function withdrawIncentiveV2(tx: Transaction, typeArg: string, args: WithdrawIncentiveV2Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::withdraw_incentive_v2`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.amount, `${Option.$typeName}<u64>`),
            obj(tx, args.clock),
        ],
    });
}

export interface StakeArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    lpToken: TransactionObjectInput;
    isAutoCompound: bigint | TransactionArgument | TransactionArgument | null;
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
            pure(tx, args.isAutoCompound, `${Option.$typeName}<u64>`),
            obj(tx, args.clock),
        ],
    });
}

export interface UpdatePoolInfoU64PaddingArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    tlpPrice: bigint | TransactionArgument;
    usdPerExp: bigint | TransactionArgument;
}

export function updatePoolInfoU64Padding(tx: Transaction, args: UpdatePoolInfoU64PaddingArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::update_pool_info_u64_padding`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.index, `u64`),
            pure(tx, args.tlpPrice, `u64`),
            pure(tx, args.usdPerExp, `u64`),
        ],
    });
}

export interface SnapshotArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    userShareId: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function snapshot(tx: Transaction, args: SnapshotArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::snapshot`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
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

export interface UpdateLastIncentivePriceIndexArgs {
    lpUserShare: TransactionObjectInput;
    incentiveToken: TransactionObjectInput;
    currentIncentiveIndex: bigint | TransactionArgument;
}

export function updateLastIncentivePriceIndex(
    tx: Transaction,
    args: UpdateLastIncentivePriceIndexArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::update_last_incentive_price_index`,
        arguments: [obj(tx, args.lpUserShare), obj(tx, args.incentiveToken), pure(tx, args.currentIncentiveIndex, `u64`)],
    });
}

export interface LogHarvestedAmountArgs {
    userShare: TransactionObjectInput;
    incentiveValue: bigint | TransactionArgument;
}

export function logHarvestedAmount(tx: Transaction, args: LogHarvestedAmountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::log_harvested_amount`,
        arguments: [obj(tx, args.userShare), pure(tx, args.incentiveValue, `u64`)],
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

export interface CalculateIncentiveArgs {
    currentIncentiveIndex: bigint | TransactionArgument;
    incentiveToken: TransactionObjectInput;
    lpUserShare: TransactionObjectInput;
}

export function calculateIncentive(tx: Transaction, args: CalculateIncentiveArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::calculate_incentive`,
        arguments: [pure(tx, args.currentIncentiveIndex, `u64`), obj(tx, args.incentiveToken), obj(tx, args.lpUserShare)],
    });
}

export interface HarvestProgressUpdatedArgs {
    current: TransactionObjectInput;
    user: TransactionObjectInput;
}

export function harvestProgressUpdated(tx: Transaction, args: HarvestProgressUpdatedArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::harvest_progress_updated`,
        arguments: [obj(tx, args.current), obj(tx, args.user)],
    });
}

export function multiplier(tx: Transaction, decimal: bigint | TransactionArgument, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::multiplier`, arguments: [pure(tx, decimal, `u64`)] });
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

export interface GetUserSharesByUserShareIdArgs {
    registry: TransactionObjectInput;
    index: bigint | TransactionArgument;
    userShareId: bigint | TransactionArgument;
}

export function getUserSharesByUserShareId(tx: Transaction, args: GetUserSharesByUserShareIdArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::stake_pool::get_user_shares_by_user_share_id`,
        arguments: [obj(tx, args.registry), pure(tx, args.index, `u64`), pure(tx, args.userShareId, `u64`)],
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

export function getIncentiveTokens(tx: Transaction, stakePool: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::get_incentive_tokens`, arguments: [obj(tx, stakePool)] });
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

export function getLastIncentivePriceIndex(tx: Transaction, stakePool: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::get_last_incentive_price_index`, arguments: [obj(tx, stakePool)] });
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

export function deprecated(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::stake_pool::deprecated`, arguments: [] });
}
