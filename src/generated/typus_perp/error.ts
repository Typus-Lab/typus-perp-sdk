/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/**
 * The `error` module defines the error codes used in the `typus_perp` module. The
 * errors are grouped by the module they belong to.
 */

import { type Transaction } from "@mysten/sui/transactions";
export interface PoolInactiveOptions {
    package?: string;
    arguments?: [];
}
export function poolInactive(options: PoolInactiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "pool_inactive",
        });
}
export interface PoolAlreadyActiveOptions {
    package?: string;
    arguments?: [];
}
export function poolAlreadyActive(options: PoolAlreadyActiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "pool_already_active",
        });
}
export interface TokenPoolInactiveOptions {
    package?: string;
    arguments?: [];
}
export function tokenPoolInactive(options: TokenPoolInactiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "token_pool_inactive",
        });
}
export interface TokenPoolAlreadyActiveOptions {
    package?: string;
    arguments?: [];
}
export function tokenPoolAlreadyActive(options: TokenPoolAlreadyActiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "token_pool_already_active",
        });
}
export interface LpTokenTypeMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function lpTokenTypeMismatched(options: LpTokenTypeMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "lp_token_type_mismatched",
        });
}
export interface LiquidityTokenNotExistedOptions {
    package?: string;
    arguments?: [];
}
export function liquidityTokenNotExisted(options: LiquidityTokenNotExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "liquidity_token_not_existed",
        });
}
export interface DepositAmountInsufficientOptions {
    package?: string;
    arguments?: [];
}
export function depositAmountInsufficient(options: DepositAmountInsufficientOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "deposit_amount_insufficient",
        });
}
export interface OracleMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function oracleMismatched(options: OracleMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "oracle_mismatched",
        });
}
export interface InsufficientAmountForMintFeeOptions {
    package?: string;
    arguments?: [];
}
export function insufficientAmountForMintFee(options: InsufficientAmountForMintFeeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "insufficient_amount_for_mint_fee",
        });
}
export interface ZeroTotalSupplyOptions {
    package?: string;
    arguments?: [];
}
export function zeroTotalSupply(options: ZeroTotalSupplyOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "zero_total_supply",
        });
}
export interface TvlNotYetUpdatedOptions {
    package?: string;
    arguments?: [];
}
export function tvlNotYetUpdated(options: TvlNotYetUpdatedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "tvl_not_yet_updated",
        });
}
export interface LiquidityNotEnoughOptions {
    package?: string;
    arguments?: [];
}
export function liquidityNotEnough(options: LiquidityNotEnoughOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "liquidity_not_enough",
        });
}
export interface ReachMaxCapacityOptions {
    package?: string;
    arguments?: [];
}
export function reachMaxCapacity(options: ReachMaxCapacityOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "reach_max_capacity",
        });
}
export interface ReachSlippageThresholdOptions {
    package?: string;
    arguments?: [];
}
export function reachSlippageThreshold(options: ReachSlippageThresholdOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "reach_slippage_threshold",
        });
}
export interface FrictionTooLargeOptions {
    package?: string;
    arguments?: [];
}
export function frictionTooLarge(options: FrictionTooLargeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "friction_too_large",
        });
}
export interface InvalidTokenTypeOptions {
    package?: string;
    arguments?: [];
}
export function invalidTokenType(options: InvalidTokenTypeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_token_type",
        });
}
export interface DeactivatingSharesAlreadyExistedOptions {
    package?: string;
    arguments?: [];
}
export function deactivatingSharesAlreadyExisted(options: DeactivatingSharesAlreadyExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "deactivating_shares_already_existed",
        });
}
export interface UserDeactivatingSharesNotExistedOptions {
    package?: string;
    arguments?: [];
}
export function userDeactivatingSharesNotExisted(options: UserDeactivatingSharesNotExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "user_deactivating_shares_not_existed",
        });
}
export interface LiquidityTokenExistedOptions {
    package?: string;
    arguments?: [];
}
export function liquidityTokenExisted(options: LiquidityTokenExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "liquidity_token_existed",
        });
}
export interface InvalidConfigRangeOptions {
    package?: string;
    arguments?: [];
}
export function invalidConfigRange(options: InvalidConfigRangeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_config_range",
        });
}
export interface PoolIndexMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function poolIndexMismatched(options: PoolIndexMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "pool_index_mismatched",
        });
}
export interface ReserveBookkeepingErrorOptions {
    package?: string;
    arguments?: [];
}
export function reserveBookkeepingError(options: ReserveBookkeepingErrorOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "reserve_bookkeeping_error",
        });
}
export interface RebalanceProcessFieldMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function rebalanceProcessFieldMismatched(options: RebalanceProcessFieldMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "rebalance_process_field_mismatched",
        });
}
export interface ExceedRebalanceCostThresholdOptions {
    package?: string;
    arguments?: [];
}
export function exceedRebalanceCostThreshold(options: ExceedRebalanceCostThresholdOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "exceed_rebalance_cost_threshold",
        });
}
export interface ProcessShouldRemovePositionOptions {
    package?: string;
    arguments?: [];
}
export function processShouldRemovePosition(options: ProcessShouldRemovePositionOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "process_should_remove_position",
        });
}
export interface ProcessShouldRemoveOrderOptions {
    package?: string;
    arguments?: [];
}
export function processShouldRemoveOrder(options: ProcessShouldRemoveOrderOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "process_should_remove_order",
        });
}
export interface ProcessShouldSwapOptions {
    package?: string;
    arguments?: [];
}
export function processShouldSwap(options: ProcessShouldSwapOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "process_should_swap",
        });
}
export interface ProcessShouldRepayLiquidityOptions {
    package?: string;
    arguments?: [];
}
export function processShouldRepayLiquidity(options: ProcessShouldRepayLiquidityOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "process_should_repay_liquidity",
        });
}
export interface UnsupportedProcessStatusCodeOptions {
    package?: string;
    arguments?: [];
}
export function unsupportedProcessStatusCode(options: UnsupportedProcessStatusCodeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "unsupported_process_status_code",
        });
}
export interface ZeroPriceOptions {
    package?: string;
    arguments?: [];
}
export function zeroPrice(options: ZeroPriceOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "zero_price",
        });
}
export interface AuthorityAlreadyExistedOptions {
    package?: string;
    arguments?: [];
}
export function authorityAlreadyExisted(options: AuthorityAlreadyExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "authority_already_existed",
        });
}
export interface AuthorityDoestNotExistOptions {
    package?: string;
    arguments?: [];
}
export function authorityDoestNotExist(options: AuthorityDoestNotExistOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "authority_doest_not_exist",
        });
}
export interface AuthorityEmptyOptions {
    package?: string;
    arguments?: [];
}
export function authorityEmpty(options: AuthorityEmptyOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "authority_empty",
        });
}
export interface InvalidVersionOptions {
    package?: string;
    arguments?: [];
}
export function invalidVersion(options: InvalidVersionOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_version",
        });
}
export interface UnauthorizedOptions {
    package?: string;
    arguments?: [];
}
export function unauthorized(options: UnauthorizedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "unauthorized",
        });
}
export interface NotReduceOnlyExecutionOptions {
    package?: string;
    arguments?: [];
}
export function notReduceOnlyExecution(options: NotReduceOnlyExecutionOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_reduce_only_execution",
        });
}
export interface WrongCollateralTypeOptions {
    package?: string;
    arguments?: [];
}
export function wrongCollateralType(options: WrongCollateralTypeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "wrong_collateral_type",
        });
}
export interface InvalidBidReceiptsInputOptions {
    package?: string;
    arguments?: [];
}
export function invalidBidReceiptsInput(options: InvalidBidReceiptsInputOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_bid_receipts_input",
        });
}
export interface DepositTokenMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function depositTokenMismatched(options: DepositTokenMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "deposit_token_mismatched",
        });
}
export interface LinkedOrderIdNotExistedOptions {
    package?: string;
    arguments?: [];
}
export function linkedOrderIdNotExisted(options: LinkedOrderIdNotExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "linked_order_id_not_existed",
        });
}
export interface PortfolioIndexMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function portfolioIndexMismatched(options: PortfolioIndexMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "portfolio_index_mismatched",
        });
}
export interface NotOptionCollateralOrderOptions {
    package?: string;
    arguments?: [];
}
export function notOptionCollateralOrder(options: NotOptionCollateralOrderOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_option_collateral_order",
        });
}
export interface NotOptionCollateralPositionOptions {
    package?: string;
    arguments?: [];
}
export function notOptionCollateralPosition(options: NotOptionCollateralPositionOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_option_collateral_position",
        });
}
export interface NotTokenCollateralPositionOptions {
    package?: string;
    arguments?: [];
}
export function notTokenCollateralPosition(options: NotTokenCollateralPositionOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_token_collateral_position",
        });
}
export interface TooManyLinkedOrdersOptions {
    package?: string;
    arguments?: [];
}
export function tooManyLinkedOrders(options: TooManyLinkedOrdersOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "too_many_linked_orders",
        });
}
export interface TradingSymbolExistedOptions {
    package?: string;
    arguments?: [];
}
export function tradingSymbolExisted(options: TradingSymbolExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "trading_symbol_existed",
        });
}
export interface TradingSymbolNotExistedOptions {
    package?: string;
    arguments?: [];
}
export function tradingSymbolNotExisted(options: TradingSymbolNotExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "trading_symbol_not_existed",
        });
}
export interface MarketsInactiveOptions {
    package?: string;
    arguments?: [];
}
export function marketsInactive(options: MarketsInactiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "markets_inactive",
        });
}
export interface TradingSymbolInactiveOptions {
    package?: string;
    arguments?: [];
}
export function tradingSymbolInactive(options: TradingSymbolInactiveOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "trading_symbol_inactive",
        });
}
export interface ActiveTradingSymbolOptions {
    package?: string;
    arguments?: [];
}
export function activeTradingSymbol(options: ActiveTradingSymbolOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "active_trading_symbol",
        });
}
export interface OrderNotFoundOptions {
    package?: string;
    arguments?: [];
}
export function orderNotFound(options: OrderNotFoundOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "order_not_found",
        });
}
export interface UnsupportedOrderTypeTagOptions {
    package?: string;
    arguments?: [];
}
export function unsupportedOrderTypeTag(options: UnsupportedOrderTypeTagOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "unsupported_order_type_tag",
        });
}
export interface ExceedMaxLeverageOptions {
    package?: string;
    arguments?: [];
}
export function exceedMaxLeverage(options: ExceedMaxLeverageOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "exceed_max_leverage",
        });
}
export interface CollateralTokenTypeMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function collateralTokenTypeMismatched(options: CollateralTokenTypeMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "collateral_token_type_mismatched",
        });
}
export interface BidReceiptHasBeenExpiredOptions {
    package?: string;
    arguments?: [];
}
export function bidReceiptHasBeenExpired(options: BidReceiptHasBeenExpiredOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "bid_receipt_has_been_expired",
        });
}
export interface BidReceiptNotExpiredOptions {
    package?: string;
    arguments?: [];
}
export function bidReceiptNotExpired(options: BidReceiptNotExpiredOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "bid_receipt_not_expired",
        });
}
export interface BidReceiptNotItmOptions {
    package?: string;
    arguments?: [];
}
export function bidReceiptNotItm(options: BidReceiptNotItmOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "bid_receipt_not_itm",
        });
}
export interface InvalidOrderSideOptions {
    package?: string;
    arguments?: [];
}
export function invalidOrderSide(options: InvalidOrderSideOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_order_side",
        });
}
export interface InvalidOrderSizeOptions {
    package?: string;
    arguments?: [];
}
export function invalidOrderSize(options: InvalidOrderSizeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_order_size",
        });
}
export interface AddSizeNotAllowedOptions {
    package?: string;
    arguments?: [];
}
export function addSizeNotAllowed(options: AddSizeNotAllowedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "add_size_not_allowed",
        });
}
export interface BaseTokenMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function baseTokenMismatched(options: BaseTokenMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "base_token_mismatched",
        });
}
export interface UserMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function userMismatched(options: UserMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "user_mismatched",
        });
}
export interface TokenCollateralNotEnoughOptions {
    package?: string;
    arguments?: [];
}
export function tokenCollateralNotEnough(options: TokenCollateralNotEnoughOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "token_collateral_not_enough",
        });
}
export interface OptionCollateralNotEnoughOptions {
    package?: string;
    arguments?: [];
}
export function optionCollateralNotEnough(options: OptionCollateralNotEnoughOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "option_collateral_not_enough",
        });
}
export interface RemainingCollateralNotEnoughOptions {
    package?: string;
    arguments?: [];
}
export function remainingCollateralNotEnough(options: RemainingCollateralNotEnoughOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "remaining_collateral_not_enough",
        });
}
export interface ReachMaxSingleOrderReserveUsageOptions {
    package?: string;
    arguments?: [];
}
export function reachMaxSingleOrderReserveUsage(options: ReachMaxSingleOrderReserveUsageOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "reach_max_single_order_reserve_usage",
        });
}
export interface OptionCollateralOrderNotFilledOptions {
    package?: string;
    arguments?: [];
}
export function optionCollateralOrderNotFilled(options: OptionCollateralOrderNotFilledOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "option_collateral_order_not_filled",
        });
}
export interface OrderNotFilledImmediatelyOptions {
    package?: string;
    arguments?: [];
}
export function orderNotFilledImmediately(options: OrderNotFilledImmediatelyOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "order_not_filled_immediately",
        });
}
export interface LpPoolReserveNotEnoughOptions {
    package?: string;
    arguments?: [];
}
export function lpPoolReserveNotEnough(options: LpPoolReserveNotEnoughOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "lp_pool_reserve_not_enough",
        });
}
export interface PerpPositionLossesOptions {
    package?: string;
    arguments?: [];
}
export function perpPositionLosses(options: PerpPositionLossesOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "perp_position_losses",
        });
}
export interface InvalidTradingFeeConfigOptions {
    package?: string;
    arguments?: [];
}
export function invalidTradingFeeConfig(options: InvalidTradingFeeConfigOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_trading_fee_config",
        });
}
export interface OrderOrPositionSizeNotZeroOptions {
    package?: string;
    arguments?: [];
}
export function orderOrPositionSizeNotZero(options: OrderOrPositionSizeNotZeroOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "order_or_position_size_not_zero",
        });
}
export interface BalanceNotEnoughForPayingFeeOptions {
    package?: string;
    arguments?: [];
}
export function balanceNotEnoughForPayingFee(options: BalanceNotEnoughForPayingFeeOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "balance_not_enough_for_paying_fee",
        });
}
export interface PositionIdNeededWithReduceOnlyOrderOptions {
    package?: string;
    arguments?: [];
}
export function positionIdNeededWithReduceOnlyOrder(options: PositionIdNeededWithReduceOnlyOrderOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "position_id_needed_with_reduce_only_order",
        });
}
export interface AuctionNotYetEndedOptions {
    package?: string;
    arguments?: [];
}
export function auctionNotYetEnded(options: AuctionNotYetEndedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "auction_not_yet_ended",
        });
}
export interface BidTokenMismatchedOptions {
    package?: string;
    arguments?: [];
}
export function bidTokenMismatched(options: BidTokenMismatchedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "bid_token_mismatched",
        });
}
export interface ExceedMaxOpenInterestOptions {
    package?: string;
    arguments?: [];
}
export function exceedMaxOpenInterest(options: ExceedMaxOpenInterestOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "exceed_max_open_interest",
        });
}
export interface InvalidOrderPriceOptions {
    package?: string;
    arguments?: [];
}
export function invalidOrderPrice(options: InvalidOrderPriceOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_order_price",
        });
}
export interface InvalidUserAccountOptions {
    package?: string;
    arguments?: [];
}
export function invalidUserAccount(options: InvalidUserAccountOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_user_account",
        });
}
export interface NotUserAccountOwnerOptions {
    package?: string;
    arguments?: [];
}
export function notUserAccountOwner(options: NotUserAccountOwnerOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_user_account_owner",
        });
}
export interface NoBalanceOptions {
    package?: string;
    arguments?: [];
}
export function noBalance(options: NoBalanceOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "no_balance",
        });
}
export interface NotUserAccountCapOptions {
    package?: string;
    arguments?: [];
}
export function notUserAccountCap(options: NotUserAccountCapOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_user_account_cap",
        });
}
export interface NotEmptySymbolsOptions {
    package?: string;
    arguments?: [];
}
export function notEmptySymbols(options: NotEmptySymbolsOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "not_empty_symbols",
        });
}
export interface InvalidBoostBpArrayLengthOptions {
    package?: string;
    arguments?: [];
}
export function invalidBoostBpArrayLength(options: InvalidBoostBpArrayLengthOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_boost_bp_array_length",
        });
}
export interface InvalidIdxOptions {
    package?: string;
    arguments?: [];
}
export function invalidIdx(options: InvalidIdxOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "invalid_idx",
        });
}
export interface WhitelistAlreadyExistedOptions {
    package?: string;
    arguments?: [];
}
export function whitelistAlreadyExisted(options: WhitelistAlreadyExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "whitelist_already_existed",
        });
}
export interface WhitelistNotExistedOptions {
    package?: string;
    arguments?: [];
}
export function whitelistNotExisted(options: WhitelistNotExistedOptions = {}) {
    const packageAddress = options.package ?? "@typus/perp";
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "error",
            function: "whitelist_not_existed",
        });
}
