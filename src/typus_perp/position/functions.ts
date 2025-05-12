import { PUBLISHED_AT } from "..";
import { Option } from "../../_dependencies/source/0x1/option/structs";
import { TypusBidReceipt } from "../../_dependencies/source/0xb4f25230ba74837d8299e92951306100c4a532e8c48cc3d8828abe9b91c8b274/vault/structs";
import { obj, option, pure, vector } from "../../_framework/util";
import { Position } from "./structs";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface AddPositionLinkedOrderInfoArgs {
    position: TransactionObjectInput;
    linkedOrderId: bigint | TransactionArgument;
    linkedOrderPrice: bigint | TransactionArgument;
}

export function addPositionLinkedOrderInfo(tx: Transaction, args: AddPositionLinkedOrderInfoArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::add_position_linked_order_info`,
        arguments: [obj(tx, args.position), pure(tx, args.linkedOrderId, `u64`), pure(tx, args.linkedOrderPrice, `u64`)],
    });
}

export interface CalculateFilled_Args {
    position: TransactionObjectInput;
    reduceOnly: boolean | TransactionArgument;
    orderSide: boolean | TransactionArgument;
    orderSize: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
}

export function calculateFilled_(tx: Transaction, args: CalculateFilled_Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_filled_`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.reduceOnly, `bool`),
            pure(tx, args.orderSide, `bool`),
            pure(tx, args.orderSize, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
        ],
    });
}

export interface CalculateIntrinsicValueArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    receipts: Array<TransactionObjectInput> | TransactionArgument;
    clock: TransactionObjectInput;
}

export function calculateIntrinsicValue(
    tx: Transaction,
    typeArg: string,
    args: CalculateIntrinsicValueArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_intrinsic_value`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            vector(tx, `${TypusBidReceipt.$typeName}`, args.receipts),
            obj(tx, args.clock),
        ],
    });
}

export interface CalculatePositionFundingRateArgs {
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    cumulativeFundingRateIndexSign: boolean | TransactionArgument;
    cumulativeFundingRateIndex: bigint | TransactionArgument;
}

export function calculatePositionFundingRate(tx: Transaction, args: CalculatePositionFundingRateArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_position_funding_rate`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.cumulativeFundingRateIndexSign, `bool`),
            pure(tx, args.cumulativeFundingRateIndex, `u64`),
        ],
    });
}

export interface CalculateRealizedPnlUsdArgs {
    side: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    entryPrice: bigint | TransactionArgument;
    exitPrice: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    priceDecimal: bigint | TransactionArgument;
}

export function calculateRealizedPnlUsd(tx: Transaction, args: CalculateRealizedPnlUsdArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_realized_pnl_usd`,
        arguments: [
            pure(tx, args.side, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.entryPrice, `u64`),
            pure(tx, args.exitPrice, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.priceDecimal, `u64`),
        ],
    });
}

export interface CalculateTradingFeeArgs {
    size: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    collateralTokenDecimal: bigint | TransactionArgument;
}

export function calculateTradingFee(tx: Transaction, args: CalculateTradingFeeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_trading_fee`,
        arguments: [
            pure(tx, args.size, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.collateralTokenDecimal, `u64`),
        ],
    });
}

export function calculateUnrealizedCost(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::calculate_unrealized_cost`, arguments: [obj(tx, position)] });
}

export interface CalculateUnrealizedPnlArgs {
    position: TransactionObjectInput;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
}

export function calculateUnrealizedPnl(tx: Transaction, args: CalculateUnrealizedPnlArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::calculate_unrealized_pnl`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
        ],
    });
}

export interface CheckOptionCollateralPositionLiquidatedArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    maintenanceMarginRateBp: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function checkOptionCollateralPositionLiquidated(
    tx: Transaction,
    typeArg: string,
    args: CheckOptionCollateralPositionLiquidatedArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::check_option_collateral_position_liquidated`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.maintenanceMarginRateBp, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface CheckOrderFilledArgs {
    order: TransactionObjectInput;
    oraclePrice: bigint | TransactionArgument;
}

export function checkOrderFilled(tx: Transaction, args: CheckOrderFilledArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::check_order_filled`,
        arguments: [obj(tx, args.order), pure(tx, args.oraclePrice, `u64`)],
    });
}

export interface CheckPositionLiquidatedArgs {
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    maintenanceMarginRateBp: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    cumulativeFundingRateIndexSign: boolean | TransactionArgument;
    cumulativeFundingRateIndex: bigint | TransactionArgument;
}

export function checkPositionLiquidated(tx: Transaction, args: CheckPositionLiquidatedArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::check_position_liquidated`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.maintenanceMarginRateBp, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            pure(tx, args.cumulativeFundingRateIndexSign, `bool`),
            pure(tx, args.cumulativeFundingRateIndex, `u64`),
        ],
    });
}

export interface CollateralWithPnlArgs {
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
}

export function collateralWithPnl(tx: Transaction, args: CollateralWithPnlArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::collateral_with_pnl`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
        ],
    });
}

export interface CreateOrderArgs {
    version: TransactionObjectInput;
    symbol: TransactionObjectInput;
    leverageMbp: bigint | TransactionArgument;
    reduceOnly: boolean | TransactionArgument;
    isLong: boolean | TransactionArgument;
    isStopOrder: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    collateral: TransactionObjectInput;
    collateralTokenDecimal: bigint | TransactionArgument;
    linkedPositionId: bigint | TransactionArgument | TransactionArgument | null;
    orderId: bigint | TransactionArgument;
    oraclePrice: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function createOrder(tx: Transaction, typeArg: string, args: CreateOrderArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::create_order`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.symbol),
            pure(tx, args.leverageMbp, `u64`),
            pure(tx, args.reduceOnly, `bool`),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.isStopOrder, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.triggerPrice, `u64`),
            obj(tx, args.collateral),
            pure(tx, args.collateralTokenDecimal, `u64`),
            pure(tx, args.linkedPositionId, `${Option.$typeName}<u64>`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.oraclePrice, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface CreateOrderWithBidReceiptsArgs {
    version: TransactionObjectInput;
    symbol: TransactionObjectInput;
    portfolioIndex: bigint | TransactionArgument;
    depositToken: TransactionObjectInput;
    leverageMbp: bigint | TransactionArgument;
    reduceOnly: boolean | TransactionArgument;
    isLong: boolean | TransactionArgument;
    isStopOrder: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    collateralBidReceipts: Array<TransactionObjectInput> | TransactionArgument;
    depositTokenDecimal: bigint | TransactionArgument;
    linkedPositionId: bigint | TransactionArgument | TransactionArgument | null;
    orderId: bigint | TransactionArgument;
    oraclePrice: bigint | TransactionArgument;
    user: string | TransactionArgument;
    clock: TransactionObjectInput;
}

export function createOrderWithBidReceipts(tx: Transaction, args: CreateOrderWithBidReceiptsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::create_order_with_bid_receipts`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.symbol),
            pure(tx, args.portfolioIndex, `u64`),
            obj(tx, args.depositToken),
            pure(tx, args.leverageMbp, `u64`),
            pure(tx, args.reduceOnly, `bool`),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.isStopOrder, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.triggerPrice, `u64`),
            vector(tx, `${TypusBidReceipt.$typeName}`, args.collateralBidReceipts),
            pure(tx, args.depositTokenDecimal, `u64`),
            pure(tx, args.linkedPositionId, `${Option.$typeName}<u64>`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.oraclePrice, `u64`),
            pure(tx, args.user, `address`),
            obj(tx, args.clock),
        ],
    });
}

export interface EmitRealizedFundingEventArgs {
    user: string | TransactionArgument;
    collateralToken: TransactionObjectInput;
    symbol: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    realizedFundingSign: boolean | TransactionArgument;
    realizedFundingFee: bigint | TransactionArgument;
    realizedFundingFeeUsd: bigint | TransactionArgument;
    u64Padding: Array<bigint | TransactionArgument> | TransactionArgument;
}

export function emitRealizedFundingEvent(tx: Transaction, args: EmitRealizedFundingEventArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::emit_realized_funding_event`,
        arguments: [
            pure(tx, args.user, `address`),
            obj(tx, args.collateralToken),
            obj(tx, args.symbol),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.realizedFundingSign, `bool`),
            pure(tx, args.realizedFundingFee, `u64`),
            pure(tx, args.realizedFundingFeeUsd, `u64`),
            pure(tx, args.u64Padding, `vector<u64>`),
        ],
    });
}

export interface GetEstimatedLiquidationPriceArgs {
    position: TransactionObjectInput;
    isSameToken: boolean | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    maintenanceMarginRateBp: bigint | TransactionArgument;
}

export function getEstimatedLiquidationPrice(tx: Transaction, args: GetEstimatedLiquidationPriceArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::get_estimated_liquidation_price`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.isSameToken, `bool`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.maintenanceMarginRateBp, `u64`),
        ],
    });
}

export function getMaxOrderTypeTag(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_max_order_type_tag`, arguments: [] });
}

export interface GetOptionCollateralOrderCollateralAmountArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    order: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function getOptionCollateralOrderCollateralAmount(
    tx: Transaction,
    typeArg: string,
    args: GetOptionCollateralOrderCollateralAmountArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::get_option_collateral_order_collateral_amount`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.order),
            obj(tx, args.clock),
        ],
    });
}

export interface GetOptionPositionCollateralAmountArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    position: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function getOptionPositionCollateralAmount(
    tx: Transaction,
    typeArg: string,
    args: GetOptionPositionCollateralAmountArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::get_option_position_collateral_amount`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.position),
            obj(tx, args.clock),
        ],
    });
}

export interface GetOptionPositionExerciseValueArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    position: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function getOptionPositionExerciseValue(
    tx: Transaction,
    typeArg: string,
    args: GetOptionPositionExerciseValueArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::get_option_position_exercise_value`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.position),
            obj(tx, args.clock),
        ],
    });
}

export function getOptionPositionPortfolioIndex(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_option_position_portfolio_index`, arguments: [obj(tx, position)] });
}

export function getOrderCollateralAmount(
    tx: Transaction,
    typeArg: string,
    order: TransactionObjectInput,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::get_order_collateral_amount`,
        typeArguments: [typeArg],
        arguments: [obj(tx, order)],
    });
}

export function getOrderCollateralToken(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_collateral_token`, arguments: [obj(tx, order)] });
}

export function getOrderCollateralTokenDecimal(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_collateral_token_decimal`, arguments: [obj(tx, order)] });
}

export interface GetOrderFilledFeeArgs {
    order: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
}

export function getOrderFilledFee(tx: Transaction, args: GetOrderFilledFeeArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::get_order_filled_fee`,
        arguments: [
            obj(tx, args.order),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
        ],
    });
}

export function getOrderId(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_id`, arguments: [obj(tx, order)] });
}

export function getOrderLinkedPositionId(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_linked_position_id`, arguments: [obj(tx, order)] });
}

export function getOrderPortfolioIndex(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_portfolio_index`, arguments: [obj(tx, order)] });
}

export function getOrderPrice(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_price`, arguments: [obj(tx, order)] });
}

export function getOrderReduceOnly(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_reduce_only`, arguments: [obj(tx, order)] });
}

export function getOrderSide(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_side`, arguments: [obj(tx, order)] });
}

export function getOrderSize(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_size`, arguments: [obj(tx, order)] });
}

export function getOrderTradingSymbol(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_trading_symbol`, arguments: [obj(tx, order)] });
}

export function getOrderTypeTag(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_type_tag`, arguments: [obj(tx, order)] });
}

export function getOrderUser(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_order_user`, arguments: [obj(tx, order)] });
}

export function getPositionCollateralAmount(
    tx: Transaction,
    typeArg: string,
    position: TransactionObjectInput,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::get_position_collateral_amount`,
        typeArguments: [typeArg],
        arguments: [obj(tx, position)],
    });
}

export function getPositionCollateralTokenDecimal(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_collateral_token_decimal`, arguments: [obj(tx, position)] });
}

export function getPositionCollateralTokenType(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_collateral_token_type`, arguments: [obj(tx, position)] });
}

export function getPositionId(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_id`, arguments: [obj(tx, position)] });
}

export function getPositionLinkedOrderIds(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_linked_order_ids`, arguments: [obj(tx, position)] });
}

export function getPositionOptionCollateralInfo(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_option_collateral_info`, arguments: [obj(tx, position)] });
}

export function getPositionSide(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_side`, arguments: [obj(tx, position)] });
}

export function getPositionSize(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_size`, arguments: [obj(tx, position)] });
}

export function getPositionSizeDecimal(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_size_decimal`, arguments: [obj(tx, position)] });
}

export function getPositionSymbol(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_symbol`, arguments: [obj(tx, position)] });
}

export function getPositionUnrealizedFundingSign(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_unrealized_funding_sign`, arguments: [obj(tx, position)] });
}

export function getPositionUser(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_position_user`, arguments: [obj(tx, position)] });
}

export function getReserveAmount(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::get_reserve_amount`, arguments: [obj(tx, position)] });
}

export interface IncreaseCollateralArgs {
    position: TransactionObjectInput;
    collateral: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
}

export function increaseCollateral(tx: Transaction, typeArg: string, args: IncreaseCollateralArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::increase_collateral`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.position),
            obj(tx, args.collateral),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
        ],
    });
}

export function isOptionCollateralOrder(tx: Transaction, order: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::is_option_collateral_order`, arguments: [obj(tx, order)] });
}

export function isOptionCollateralPosition(tx: Transaction, position: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::position::is_option_collateral_position`, arguments: [obj(tx, position)] });
}

export interface ManagerCreateReduceOnlyOrderArgs {
    version: TransactionObjectInput;
    symbol: TransactionObjectInput;
    isLong: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    collateral: TransactionObjectInput;
    collateralTokenDecimal: bigint | TransactionArgument;
    linkedPositionId: bigint | TransactionArgument;
    user: string | TransactionArgument;
    orderId: bigint | TransactionArgument;
    oraclePrice: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function managerCreateReduceOnlyOrder(
    tx: Transaction,
    typeArg: string,
    args: ManagerCreateReduceOnlyOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::manager_create_reduce_only_order`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.symbol),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.triggerPrice, `u64`),
            obj(tx, args.collateral),
            pure(tx, args.collateralTokenDecimal, `u64`),
            pure(tx, args.linkedPositionId, `u64`),
            pure(tx, args.user, `address`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.oraclePrice, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface MaxReleasingCollateralAmountArgs {
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    maxEntryLeverageMbp: bigint | TransactionArgument;
}

export function maxReleasingCollateralAmount(tx: Transaction, args: MaxReleasingCollateralAmountArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::max_releasing_collateral_amount`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            pure(tx, args.maxEntryLeverageMbp, `u64`),
        ],
    });
}

export interface OptionPositionBidReceiptsExpiredArgs {
    dovRegistry: TransactionObjectInput;
    position: TransactionObjectInput;
}

export function optionPositionBidReceiptsExpired(
    tx: Transaction,
    args: OptionPositionBidReceiptsExpiredArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::option_position_bid_receipts_expired`,
        arguments: [obj(tx, args.dovRegistry), obj(tx, args.position)],
    });
}

export interface OrderFilledArgs {
    version: TransactionObjectInput;
    ecosystemVersion: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    order: TransactionObjectInput;
    originalPosition: TransactionObjectInput | TransactionArgument | null;
    nextPositionId: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    cumulativeFundingRateIndexSign: boolean | TransactionArgument;
    cumulativeFundingRateIndex: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function orderFilled(tx: Transaction, typeArg: string, args: OrderFilledArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::order_filled`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.ecosystemVersion),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            obj(tx, args.order),
            option(tx, `${Position.$typeName}`, args.originalPosition),
            pure(tx, args.nextPositionId, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            pure(tx, args.cumulativeFundingRateIndexSign, `bool`),
            pure(tx, args.cumulativeFundingRateIndex, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface OrderFilledWithBidReceiptsCollateralArgs {
    version: TransactionObjectInput;
    ecosystemVersion: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    liquidityPool: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    order: TransactionObjectInput;
    originalPosition: TransactionObjectInput | TransactionArgument | null;
    nextPositionId: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    cumulativeFundingRateIndexSign: boolean | TransactionArgument;
    cumulativeFundingRateIndex: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    referralFeeRebateBp: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function orderFilledWithBidReceiptsCollateral(
    tx: Transaction,
    typeArgs: [string, string],
    args: OrderFilledWithBidReceiptsCollateralArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::order_filled_with_bid_receipts_collateral`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.ecosystemVersion),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            obj(tx, args.liquidityPool),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.order),
            option(tx, `${Position.$typeName}`, args.originalPosition),
            pure(tx, args.nextPositionId, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            pure(tx, args.cumulativeFundingRateIndexSign, `bool`),
            pure(tx, args.cumulativeFundingRateIndex, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            pure(tx, args.referralFeeRebateBp, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface RealizeFundingArgs {
    position: TransactionObjectInput;
    fundingIncome: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
}

export function realizeFunding(tx: Transaction, typeArg: string, args: RealizeFundingArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::realize_funding`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.position),
            obj(tx, args.fundingIncome),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
        ],
    });
}

export interface ReleaseCollateralArgs {
    position: TransactionObjectInput;
    releaseAmount: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
}

export function releaseCollateral(tx: Transaction, typeArg: string, args: ReleaseCollateralArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::release_collateral`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.position),
            pure(tx, args.releaseAmount, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
        ],
    });
}

export interface RemoveOrderArgs {
    version: TransactionObjectInput;
    order: TransactionObjectInput;
}

export function removeOrder(tx: Transaction, typeArg: string, args: RemoveOrderArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::remove_order`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.order)],
    });
}

export interface RemoveOrderWithBidReceiptsArgs {
    version: TransactionObjectInput;
    order: TransactionObjectInput;
}

export function removeOrderWithBidReceipts(tx: Transaction, args: RemoveOrderWithBidReceiptsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::remove_order_with_bid_receipts`,
        arguments: [obj(tx, args.version), obj(tx, args.order)],
    });
}

export interface RemovePositionArgs {
    version: TransactionObjectInput;
    position: TransactionObjectInput;
}

export function removePosition(tx: Transaction, typeArg: string, args: RemovePositionArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::remove_position`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.position)],
    });
}

export interface RemovePositionLinkedOrderInfoArgs {
    position: TransactionObjectInput;
    linkedOrderId: bigint | TransactionArgument;
}

export function removePositionLinkedOrderInfo(
    tx: Transaction,
    args: RemovePositionLinkedOrderInfoArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::remove_position_linked_order_info`,
        arguments: [obj(tx, args.position), pure(tx, args.linkedOrderId, `u64`)],
    });
}

export interface RemovePositionWithBidReceiptsArgs {
    version: TransactionObjectInput;
    position: TransactionObjectInput;
}

export function removePositionWithBidReceipts(
    tx: Transaction,
    args: RemovePositionWithBidReceiptsArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::remove_position_with_bid_receipts`,
        arguments: [obj(tx, args.version), obj(tx, args.position)],
    });
}

export interface SplitBidReceiptArgs {
    dovRegistry: TransactionObjectInput;
    position: TransactionObjectInput;
    size: bigint | TransactionArgument;
}

export function splitBidReceipt(tx: Transaction, args: SplitBidReceiptArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::position::split_bid_receipt`,
        arguments: [obj(tx, args.dovRegistry), obj(tx, args.position), pure(tx, args.size, `u64`)],
    });
}

export interface UpdateOptionPositionCollateralAmountArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    position: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function updateOptionPositionCollateralAmount(
    tx: Transaction,
    typeArg: string,
    args: UpdateOptionPositionCollateralAmountArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::update_option_position_collateral_amount`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.position),
            obj(tx, args.clock),
        ],
    });
}

export interface UpdatePositionBorrowRateAndFundingRateArgs {
    position: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    cumulativeBorrowRate: bigint | TransactionArgument;
    cumulativeFundingRateIndexSign: boolean | TransactionArgument;
    cumulativeFundingRateIndex: bigint | TransactionArgument;
}

export function updatePositionBorrowRateAndFundingRate(
    tx: Transaction,
    args: UpdatePositionBorrowRateAndFundingRateArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::position::update_position_borrow_rate_and_funding_rate`,
        arguments: [
            obj(tx, args.position),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.cumulativeBorrowRate, `u64`),
            pure(tx, args.cumulativeFundingRateIndexSign, `bool`),
            pure(tx, args.cumulativeFundingRateIndex, `u64`),
        ],
    });
}
