import { PUBLISHED_AT } from "..";
import { Transaction } from "@mysten/sui/transactions";

export function activeTradingSymbol(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::active_trading_symbol`, arguments: [] });
}

export function addSizeNotAllowed(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::add_size_not_allowed`, arguments: [] });
}

export function auctionNotYetEnded(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::auction_not_yet_ended`, arguments: [] });
}

export function authorityAlreadyExisted(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::authority_already_existed`, arguments: [] });
}

export function authorityDoestNotExist(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::authority_doest_not_exist`, arguments: [] });
}

export function authorityEmpty(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::authority_empty`, arguments: [] });
}

export function balanceNotEnoughForPayingFee(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::balance_not_enough_for_paying_fee`, arguments: [] });
}

export function baseTokenMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::base_token_mismatched`, arguments: [] });
}

export function bidReceiptHasBeenExpired(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::bid_receipt_has_been_expired`, arguments: [] });
}

export function bidReceiptNotExpired(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::bid_receipt_not_expired`, arguments: [] });
}

export function bidReceiptNotItm(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::bid_receipt_not_itm`, arguments: [] });
}

export function bidTokenMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::bid_token_mismatched`, arguments: [] });
}

export function collateralTokenTypeMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::collateral_token_type_mismatched`, arguments: [] });
}

export function depositAmountInsufficient(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::deposit_amount_insufficient`, arguments: [] });
}

export function depositTokenMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::deposit_token_mismatched`, arguments: [] });
}

export function exceedMaxLeverage(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::exceed_max_leverage`, arguments: [] });
}

export function exceedMaxOpenInterest(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::exceed_max_open_interest`, arguments: [] });
}

export function frictionTooLarge(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::friction_too_large`, arguments: [] });
}

export function insufficientAmountForMintFee(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::insufficient_amount_for_mint_fee`, arguments: [] });
}

export function invalidBidReceiptsInput(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_bid_receipts_input`, arguments: [] });
}

export function invalidBoostBpArrayLength(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_boost_bp_array_length`, arguments: [] });
}

export function invalidOrderSide(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_order_side`, arguments: [] });
}

export function invalidOrderSize(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_order_size`, arguments: [] });
}

export function invalidTokenType(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_token_type`, arguments: [] });
}

export function invalidTradingFeeConfig(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_trading_fee_config`, arguments: [] });
}

export function invalidVersion(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::invalid_version`, arguments: [] });
}

export function linkedOrderIdNotExisted(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::linked_order_id_not_existed`, arguments: [] });
}

export function liquidityNotEnough(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::liquidity_not_enough`, arguments: [] });
}

export function liquidityTokenNotExisted(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::liquidity_token_not_existed`, arguments: [] });
}

export function lpPoolReserveNotEnough(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::lp_pool_reserve_not_enough`, arguments: [] });
}

export function lpTokenTypeMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::lp_token_type_mismatched`, arguments: [] });
}

export function marketsInactive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::markets_inactive`, arguments: [] });
}

export function notOptionCollateralOrder(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::not_option_collateral_order`, arguments: [] });
}

export function notOptionCollateralPosition(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::not_option_collateral_position`, arguments: [] });
}

export function notReduceOnlyExecution(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::not_reduce_only_execution`, arguments: [] });
}

export function notTokenCollateralPosition(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::not_token_collateral_position`, arguments: [] });
}

export function optionCollateralNotEnough(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::option_collateral_not_enough`, arguments: [] });
}

export function optionCollateralOrderNotFilled(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::option_collateral_order_not_filled`, arguments: [] });
}

export function oracleMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::oracle_mismatched`, arguments: [] });
}

export function orderNotFilledImmediately(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::order_not_filled_immediately`, arguments: [] });
}

export function orderNotFound(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::order_not_found`, arguments: [] });
}

export function orderOrPositionSizeNotZero(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::order_or_position_size_not_zero`, arguments: [] });
}

export function perpPositionLosses(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::perp_position_losses`, arguments: [] });
}

export function poolAlreadyActive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::pool_already_active`, arguments: [] });
}

export function poolInactive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::pool_inactive`, arguments: [] });
}

export function portfolioIndexMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::portfolio_index_mismatched`, arguments: [] });
}

export function positionIdNeededWithReduceOnlyOrder(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::position_id_needed_with_reduce_only_order`, arguments: [] });
}

export function processShouldRemoveOrder(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::process_should_remove_order`, arguments: [] });
}

export function processShouldRemovePosition(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::process_should_remove_position`, arguments: [] });
}

export function processShouldRepayLiquidity(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::process_should_repay_liquidity`, arguments: [] });
}

export function processShouldSwap(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::process_should_swap`, arguments: [] });
}

export function reachMaxCapacity(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::reach_max_capacity`, arguments: [] });
}

export function reachMaxSingleOrderReserveUsage(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::reach_max_single_order_reserve_usage`, arguments: [] });
}

export function reachSlippageThreshold(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::reach_slippage_threshold`, arguments: [] });
}

export function remainingCollateralNotEnough(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::remaining_collateral_not_enough`, arguments: [] });
}

export function tokenCollateralNotEnough(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::token_collateral_not_enough`, arguments: [] });
}

export function tokenPoolAlreadyActive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::token_pool_already_active`, arguments: [] });
}

export function tokenPoolInactive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::token_pool_inactive`, arguments: [] });
}

export function tooManyLinkedOrders(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::too_many_linked_orders`, arguments: [] });
}

export function tradingSymbolExisted(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::trading_symbol_existed`, arguments: [] });
}

export function tradingSymbolInactive(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::trading_symbol_inactive`, arguments: [] });
}

export function tradingSymbolNotExisted(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::trading_symbol_not_existed`, arguments: [] });
}

export function tvlNotYetUpdated(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::tvl_not_yet_updated`, arguments: [] });
}

export function unauthorized(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::unauthorized`, arguments: [] });
}

export function unsupportedOrderTypeTag(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::unsupported_order_type_tag`, arguments: [] });
}

export function unsupportedProcessStatusCode(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::unsupported_process_status_code`, arguments: [] });
}

export function userMismatched(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::user_mismatched`, arguments: [] });
}

export function wrongCollateralType(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::wrong_collateral_type`, arguments: [] });
}

export function zeroPrice(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::zero_price`, arguments: [] });
}

export function zeroTotalSupply(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::error::zero_total_supply`, arguments: [] });
}
