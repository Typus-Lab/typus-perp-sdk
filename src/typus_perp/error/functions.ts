import { PUBLISHED_AT } from "..";
import { Transaction } from "@mysten/sui/transactions";

export function invalidVersion(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::invalid_version`, arguments: [] });
}

export function activeTradingSymbol(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::active_trading_symbol`, arguments: [] });
}

export function addSizeNotAllowed(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::add_size_not_allowed`, arguments: [] });
}

export function authorityAlreadyExisted(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::authority_already_existed`, arguments: [] });
}

export function authorityDoestNotExist(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::authority_doest_not_exist`, arguments: [] });
}

export function authorityEmpty(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::authority_empty`, arguments: [] });
}

export function balanceNotEnoughForPayingFee(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::balance_not_enough_for_paying_fee`, arguments: [] });
}

export function baseTokenMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::base_token_mismatched`, arguments: [] });
}

export function bidReceiptHasBeenExpired(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::bid_receipt_has_been_expired`, arguments: [] });
}

export function bidReceiptNotExpired(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::bid_receipt_not_expired`, arguments: [] });
}

export function bidReceiptNotItm(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::bid_receipt_not_itm`, arguments: [] });
}

export function collateralTokenTypeMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::collateral_token_type_mismatched`, arguments: [] });
}

export function depositAmountInsufficient(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::deposit_amount_insufficient`, arguments: [] });
}

export function depositTokenMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::deposit_token_mismatched`, arguments: [] });
}

export function exceedMaxLeverage(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::exceed_max_leverage`, arguments: [] });
}

export function frictionTooLarge(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::friction_too_large`, arguments: [] });
}

export function insufficientAmountForMintFee(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::insufficient_amount_for_mint_fee`, arguments: [] });
}

export function invalidBidReceiptsInput(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::invalid_bid_receipts_input`, arguments: [] });
}

export function invalidOrderSide(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::invalid_order_side`, arguments: [] });
}

export function invalidOrderSize(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::invalid_order_size`, arguments: [] });
}

export function invalidTradingFeeConfig(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::invalid_trading_fee_config`, arguments: [] });
}

export function linkedOrderIdNotExisted(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::linked_order_id_not_existed`, arguments: [] });
}

export function liquidityNotEnough(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::liquidity_not_enough`, arguments: [] });
}

export function liquidityTokenNotExisted(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::liquidity_token_not_existed`, arguments: [] });
}

export function lpPoolReserveNotEnough(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::lp_pool_reserve_not_enough`, arguments: [] });
}

export function lpTokenTypeMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::lp_token_type_mismatched`, arguments: [] });
}

export function marketsInactive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::markets_inactive`, arguments: [] });
}

export function notOptionCollateralOrder(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::not_option_collateral_order`, arguments: [] });
}

export function notOptionCollateralPosition(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::not_option_collateral_position`, arguments: [] });
}

export function notReduceOnlyExecution(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::not_reduce_only_execution`, arguments: [] });
}

export function notTokenCollateralPosition(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::not_token_collateral_position`, arguments: [] });
}

export function optionCollateralNotEnough(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::option_collateral_not_enough`, arguments: [] });
}

export function optionCollateralOrderNotFilled(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::option_collateral_order_not_filled`, arguments: [] });
}

export function oracleMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::oracle_mismatched`, arguments: [] });
}

export function orderNotFilledImmediately(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::order_not_filled_immediately`, arguments: [] });
}

export function orderNotFound(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::order_not_found`, arguments: [] });
}

export function orderOrPositionSizeNotZero(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::order_or_position_size_not_zero`, arguments: [] });
}

export function perpPositionLosses(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::perp_position_losses`, arguments: [] });
}

export function poolAlreadyActive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::pool_already_active`, arguments: [] });
}

export function poolInactive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::pool_inactive`, arguments: [] });
}

export function portfolioIndexMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::portfolio_index_mismatched`, arguments: [] });
}

export function processShouldRemoveOrder(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::process_should_remove_order`, arguments: [] });
}

export function processShouldRemovePosition(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::process_should_remove_position`, arguments: [] });
}

export function processShouldRepayLiquidity(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::process_should_repay_liquidity`, arguments: [] });
}

export function processShouldSwap(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::process_should_swap`, arguments: [] });
}

export function reachMaxCapacity(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::reach_max_capacity`, arguments: [] });
}

export function reachMaxSingleOrderReserveUsage(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::reach_max_single_order_reserve_usage`, arguments: [] });
}

export function reachSlippageThreshold(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::reach_slippage_threshold`, arguments: [] });
}

export function remainingCollateralNotEnough(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::remaining_collateral_not_enough`, arguments: [] });
}

export function tokenCollateralNotEnough(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::token_collateral_not_enough`, arguments: [] });
}

export function tokenPoolAlreadyActive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::token_pool_already_active`, arguments: [] });
}

export function tokenPoolInactive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::token_pool_inactive`, arguments: [] });
}

export function tradingSymbolExisted(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::trading_symbol_existed`, arguments: [] });
}

export function tradingSymbolInactive(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::trading_symbol_inactive`, arguments: [] });
}

export function tradingSymbolNotExisted(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::trading_symbol_not_existed`, arguments: [] });
}

export function tvlNotYetUpdated(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::tvl_not_yet_updated`, arguments: [] });
}

export function unauthorized(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::unauthorized`, arguments: [] });
}

export function unsupportedOrderTypeTag(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::unsupported_order_type_tag`, arguments: [] });
}

export function unsupportedProcessStatusCode(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::unsupported_process_status_code`, arguments: [] });
}

export function userMismatched(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::user_mismatched`, arguments: [] });
}

export function wrongCollateralType(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::wrong_collateral_type`, arguments: [] });
}

export function zeroPrice(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::zero_price`, arguments: [] });
}

export function zeroTotalSupply(tx: Transaction) {
    return tx.moveCall({ target: `${PUBLISHED_AT}::error::zero_total_supply`, arguments: [] });
}
