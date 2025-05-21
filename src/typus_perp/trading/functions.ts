import { PUBLISHED_AT } from "..";
import { Option } from "../../_dependencies/source/0x1/option/structs";
import { TypusBidReceipt } from "../../_dependencies/source/0xb4f25230ba74837d8299e92951306100c4a532e8c48cc3d8828abe9b91c8b274/vault/structs";
import { obj, pure, vector } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface AddTradingSymbolArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    oracle: TransactionObjectInput;
    maxLeverageMbp: bigint | TransactionArgument;
    optionCollateralMaxLeverageMbp: bigint | TransactionArgument;
    minSize: bigint | TransactionArgument;
    lotSize: bigint | TransactionArgument;
    tradingFeeConfig: Array<bigint | TransactionArgument> | TransactionArgument;
    basicFundingRate: bigint | TransactionArgument;
    fundingIntervalTsMs: bigint | TransactionArgument;
    expMultiplier: bigint | TransactionArgument;
    maxBuyOpenInterest: bigint | TransactionArgument;
    maxSellOpenInterest: bigint | TransactionArgument;
    maintenanceMarginRateBp: bigint | TransactionArgument;
    optionMaintenanceMarginRateBp: bigint | TransactionArgument;
    optionTradingFeeConfig: Array<bigint | TransactionArgument> | TransactionArgument;
    clock: TransactionObjectInput;
}

export function addTradingSymbol(tx: Transaction, typeArg: string, args: AddTradingSymbolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::add_trading_symbol`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            obj(tx, args.oracle),
            pure(tx, args.maxLeverageMbp, `u64`),
            pure(tx, args.optionCollateralMaxLeverageMbp, `u64`),
            pure(tx, args.minSize, `u64`),
            pure(tx, args.lotSize, `u64`),
            pure(tx, args.tradingFeeConfig, `vector<u64>`),
            pure(tx, args.basicFundingRate, `u64`),
            pure(tx, args.fundingIntervalTsMs, `u64`),
            pure(tx, args.expMultiplier, `u64`),
            pure(tx, args.maxBuyOpenInterest, `u64`),
            pure(tx, args.maxSellOpenInterest, `u64`),
            pure(tx, args.maintenanceMarginRateBp, `u64`),
            pure(tx, args.optionMaintenanceMarginRateBp, `u64`),
            pure(tx, args.optionTradingFeeConfig, `vector<u64>`),
            obj(tx, args.clock),
        ],
    });
}

export interface AdjustMarketInfoUserOrderSizeArgs {
    symbolMarket: TransactionObjectInput;
    long: boolean | TransactionArgument;
    filledOrCancelled: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
}

export function adjustMarketInfoUserOrderSize(
    tx: Transaction,
    args: AdjustMarketInfoUserOrderSizeArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::adjust_market_info_user_order_size`,
        arguments: [
            obj(tx, args.symbolMarket),
            pure(tx, args.long, `bool`),
            pure(tx, args.filledOrCancelled, `bool`),
            pure(tx, args.size, `u64`),
        ],
    });
}

export interface AdjustMarketInfoUserPositionSizeArgs {
    symbolMarket: TransactionObjectInput;
    filledOrderIsLong: boolean | TransactionArgument;
    reducingPosition: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
}

export function adjustMarketInfoUserPositionSize(
    tx: Transaction,
    args: AdjustMarketInfoUserPositionSizeArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::adjust_market_info_user_position_size`,
        arguments: [
            obj(tx, args.symbolMarket),
            pure(tx, args.filledOrderIsLong, `bool`),
            pure(tx, args.reducingPosition, `bool`),
            pure(tx, args.size, `u64`),
        ],
    });
}

export interface CalculateTradingFeeRateMbpArgs {
    userLongPositionSize: bigint | TransactionArgument;
    userShortPositionSize: bigint | TransactionArgument;
    tvlUsd: bigint | TransactionArgument;
    sizeDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    orderSide: boolean | TransactionArgument;
    orderSize: bigint | TransactionArgument;
    tradingFeeConfig: Array<bigint | TransactionArgument> | TransactionArgument;
}

export function calculateTradingFeeRateMbp(tx: Transaction, args: CalculateTradingFeeRateMbpArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::calculate_trading_fee_rate_mbp`,
        arguments: [
            pure(tx, args.userLongPositionSize, `u64`),
            pure(tx, args.userShortPositionSize, `u64`),
            pure(tx, args.tvlUsd, `u64`),
            pure(tx, args.sizeDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.orderSide, `bool`),
            pure(tx, args.orderSize, `u64`),
            pure(tx, args.tradingFeeConfig, `vector<u64>`),
        ],
    });
}

export interface CancelLinkedOrdersArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    linkedOrderIds: Array<bigint | TransactionArgument> | TransactionArgument;
    linkedOrderPrices: Array<bigint | TransactionArgument> | TransactionArgument;
    user: string | TransactionArgument;
}

export function cancelLinkedOrders(
    tx: Transaction,
    typeArgs: [string, string],
    args: CancelLinkedOrdersArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::cancel_linked_orders`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.linkedOrderIds, `vector<u64>`),
            pure(tx, args.linkedOrderPrices, `vector<u64>`),
            pure(tx, args.user, `address`),
        ],
    });
}

export interface CancelTradingOrderArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    orderId: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    orderUser: string | TransactionArgument | TransactionArgument | null;
}

export function cancelTradingOrder(
    tx: Transaction,
    typeArgs: [string, string],
    args: CancelTradingOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::cancel_trading_order`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.triggerPrice, `u64`),
            pure(tx, args.orderUser, `${Option.$typeName}<address>`),
        ],
    });
}

export interface CheckCollateralEnoughArgs {
    symbolMarket: TransactionObjectInput;
    order: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
}

export function checkCollateralEnough(
    tx: Transaction,
    typeArg: string,
    args: CheckCollateralEnoughArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::check_collateral_enough`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.symbolMarket),
            obj(tx, args.order),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
        ],
    });
}

export interface CheckOptionCollateralEnoughArgs {
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    symbolMarket: TransactionObjectInput;
    order: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    clock: TransactionObjectInput;
}

export function checkOptionCollateralEnough(
    tx: Transaction,
    typeArg: string,
    args: CheckOptionCollateralEnoughArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::check_option_collateral_enough`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.symbolMarket),
            obj(tx, args.order),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            obj(tx, args.clock),
        ],
    });
}

export interface CheckReserveEnoughArgs {
    symbolMarket: TransactionObjectInput;
    liquidityPool: TransactionObjectInput;
    order: TransactionObjectInput;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
}

export function checkReserveEnough(tx: Transaction, typeArg: string, args: CheckReserveEnoughArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::check_reserve_enough`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.symbolMarket),
            obj(tx, args.liquidityPool),
            obj(tx, args.order),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
        ],
    });
}

export interface CreateTradingOrderArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    linkedPositionId: bigint | TransactionArgument | TransactionArgument | null;
    collateral: TransactionObjectInput;
    reduceOnly: boolean | TransactionArgument;
    isLong: boolean | TransactionArgument;
    isStopOrder: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
}

export function createTradingOrder(
    tx: Transaction,
    typeArgs: [string, string],
    args: CreateTradingOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::create_trading_order`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.linkedPositionId, `${Option.$typeName}<u64>`),
            obj(tx, args.collateral),
            pure(tx, args.reduceOnly, `bool`),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.isStopOrder, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.triggerPrice, `u64`),
        ],
    });
}

export interface CreateTradingOrderV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    linkedPositionId: bigint | TransactionArgument | TransactionArgument | null;
    collateral: TransactionObjectInput;
    reduceOnly: boolean | TransactionArgument;
    isLong: boolean | TransactionArgument;
    isStopOrder: boolean | TransactionArgument;
    size: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
}

export function createTradingOrderV2(
    tx: Transaction,
    typeArgs: [string, string],
    args: CreateTradingOrderV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::create_trading_order_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.linkedPositionId, `${Option.$typeName}<u64>`),
            obj(tx, args.collateral),
            pure(tx, args.reduceOnly, `bool`),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.isStopOrder, `bool`),
            pure(tx, args.size, `u64`),
            pure(tx, args.triggerPrice, `u64`),
        ],
    });
}

export interface CreateTradingOrderWithBidReceiptArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    collateralBidReceipt: TransactionObjectInput;
    isLong: boolean | TransactionArgument;
    user: string | TransactionArgument;
}

export function createTradingOrderWithBidReceipt(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: CreateTradingOrderWithBidReceiptArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::create_trading_order_with_bid_receipt`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.collateralBidReceipt),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.user, `address`),
        ],
    });
}

export interface CreateTradingOrderWithBidReceiptV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    collateralBidReceipt: TransactionObjectInput;
    isLong: boolean | TransactionArgument;
    user: string | TransactionArgument;
}

export function createTradingOrderWithBidReceiptV2(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: CreateTradingOrderWithBidReceiptV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::create_trading_order_with_bid_receipt_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            obj(tx, args.collateralBidReceipt),
            pure(tx, args.isLong, `bool`),
            pure(tx, args.user, `address`),
        ],
    });
}

export function deprecated(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::trading::deprecated`, arguments: [] });
}

export interface ExecuteOptionCollateralOrder_Args {
    version: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    symbolMarket: TransactionObjectInput;
    liquidityPool: TransactionObjectInput;
    order: TransactionObjectInput;
    protocolFeeShareBp: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function executeOptionCollateralOrder_(
    tx: Transaction,
    typeArgs: [string, string],
    args: ExecuteOptionCollateralOrder_Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::execute_option_collateral_order_`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.symbolMarket),
            obj(tx, args.liquidityPool),
            obj(tx, args.order),
            pure(tx, args.protocolFeeShareBp, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            obj(tx, args.clock),
        ],
    });
}

export interface ExecuteOrder_Args {
    version: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    symbolMarket: TransactionObjectInput;
    liquidityPool: TransactionObjectInput;
    order: TransactionObjectInput;
    protocolFeeShareBp: bigint | TransactionArgument;
    collateralOraclePrice: bigint | TransactionArgument;
    collateralOraclePriceDecimal: bigint | TransactionArgument;
    tradingPairOraclePrice: bigint | TransactionArgument;
    tradingPairOraclePriceDecimal: bigint | TransactionArgument;
    tradingFeeMbp: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    clock: TransactionObjectInput;
}

export function executeOrder_(tx: Transaction, typeArg: string, args: ExecuteOrder_Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::execute_order_`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            pure(tx, args.marketIndex, `u64`),
            obj(tx, args.symbolMarket),
            obj(tx, args.liquidityPool),
            obj(tx, args.order),
            pure(tx, args.protocolFeeShareBp, `u64`),
            pure(tx, args.collateralOraclePrice, `u64`),
            pure(tx, args.collateralOraclePriceDecimal, `u64`),
            pure(tx, args.tradingPairOraclePrice, `u64`),
            pure(tx, args.tradingPairOraclePriceDecimal, `u64`),
            pure(tx, args.tradingFeeMbp, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            obj(tx, args.clock),
        ],
    });
}

export interface ExerciseBidReceiptsArgs {
    dovRegistry: TransactionObjectInput;
    bidReceipts: Array<TransactionObjectInput> | TransactionArgument;
}

export function exerciseBidReceipts(
    tx: Transaction,
    typeArgs: [string, string],
    args: ExerciseBidReceiptsArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::exercise_bid_receipts`,
        typeArguments: typeArgs,
        arguments: [obj(tx, args.dovRegistry), vector(tx, `${TypusBidReceipt.$typeName}`, args.bidReceipts)],
    });
}

export interface GetActiveOrdersByOrderTagArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    orderTypeTag: number | TransactionArgument;
}

export function getActiveOrdersByOrderTag(
    tx: Transaction,
    typeArg: string,
    args: GetActiveOrdersByOrderTagArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::get_active_orders_by_order_tag`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`), pure(tx, args.orderTypeTag, `u8`)],
    });
}

export interface GetActiveOrdersByOrderTagAndCtokenArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    orderTypeTag: number | TransactionArgument;
}

export function getActiveOrdersByOrderTagAndCtoken(
    tx: Transaction,
    typeArgs: [string, string],
    args: GetActiveOrdersByOrderTagAndCtokenArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::get_active_orders_by_order_tag_and_ctoken`,
        typeArguments: typeArgs,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`), pure(tx, args.orderTypeTag, `u8`)],
    });
}

export interface GetAllPositionsArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    slice: bigint | TransactionArgument;
    page: bigint | TransactionArgument;
}

export function getAllPositions(tx: Transaction, typeArg: string, args: GetAllPositionsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_all_positions`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.slice, `u64`),
            pure(tx, args.page, `u64`),
        ],
    });
}

export interface GetEstimatedLiquidationPriceAndPnlArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    clock: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
}

export function getEstimatedLiquidationPriceAndPnl(
    tx: Transaction,
    typeArgs: [string, string],
    args: GetEstimatedLiquidationPriceAndPnlArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::get_estimated_liquidation_price_and_pnl`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.clock),
            pure(tx, args.positionId, `u64`),
        ],
    });
}

export interface GetExpiredPositionInfoArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
}

export function getExpiredPositionInfo(tx: Transaction, args: GetExpiredPositionInfoArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_expired_position_info`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
        ],
    });
}

export interface GetLinkedPositionArgs {
    symbolMarket: TransactionObjectInput;
    linkedPositionId: bigint | TransactionArgument | TransactionArgument | null;
    user: string | TransactionArgument;
}

export function getLinkedPosition(tx: Transaction, args: GetLinkedPositionArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_linked_position`,
        arguments: [
            obj(tx, args.symbolMarket),
            pure(tx, args.linkedPositionId, `${Option.$typeName}<u64>`),
            pure(tx, args.user, `address`),
        ],
    });
}

export interface GetLiquidationInfoArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    getAll: boolean | TransactionArgument;
}

export function getLiquidationInfo(
    tx: Transaction,
    typeArgs: [string, string],
    args: GetLiquidationInfoArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::get_liquidation_info`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.getAll, `bool`),
        ],
    });
}

export interface GetMarketsBcsArgs {
    registry: TransactionObjectInput;
    indexes: Array<bigint | TransactionArgument> | TransactionArgument;
}

export function getMarketsBcs(tx: Transaction, args: GetMarketsBcsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_markets_bcs`,
        arguments: [obj(tx, args.registry), pure(tx, args.indexes, `vector<u64>`)],
    });
}

export interface GetMaxReleasingCollateralAmountArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    positionId: bigint | TransactionArgument;
}

export function getMaxReleasingCollateralAmount(
    tx: Transaction,
    typeArgs: [string, string],
    args: GetMaxReleasingCollateralAmountArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::get_max_releasing_collateral_amount`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.positionId, `u64`),
        ],
    });
}

export interface GetMutOrdersArgs {
    symbolMarket: TransactionObjectInput;
    isTokenCollateral: boolean | TransactionArgument;
    orderTypeTag: number | TransactionArgument;
}

export function getMutOrders(tx: Transaction, args: GetMutOrdersArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_mut_orders`,
        arguments: [obj(tx, args.symbolMarket), pure(tx, args.isTokenCollateral, `bool`), pure(tx, args.orderTypeTag, `u8`)],
    });
}

export interface GetOrdersArgs {
    symbolMarket: TransactionObjectInput;
    isTokenCollateral: boolean | TransactionArgument;
    orderTypeTag: number | TransactionArgument;
}

export function getOrders(tx: Transaction, args: GetOrdersArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_orders`,
        arguments: [obj(tx, args.symbolMarket), pure(tx, args.isTokenCollateral, `bool`), pure(tx, args.orderTypeTag, `u8`)],
    });
}

export interface GetUserOrdersArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    user: string | TransactionArgument;
}

export function getUserOrders(tx: Transaction, args: GetUserOrdersArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_user_orders`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`), pure(tx, args.user, `address`)],
    });
}

export interface GetUserPositionsArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    user: string | TransactionArgument;
}

export function getUserPositions(tx: Transaction, args: GetUserPositionsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::get_user_positions`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`), pure(tx, args.user, `address`)],
    });
}

export interface IncreaseCollateralArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    positionId: bigint | TransactionArgument;
    collateral: TransactionObjectInput;
}

export function increaseCollateral(
    tx: Transaction,
    typeArgs: [string, string],
    args: IncreaseCollateralArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::increase_collateral`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.positionId, `u64`),
            obj(tx, args.collateral),
        ],
    });
}

export function init(tx: Transaction, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::trading::init`, arguments: [] });
}

export interface LiquidateArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    clock: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
}

export function liquidate(tx: Transaction, typeArgs: [string, string, string], args: LiquidateArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::liquidate`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.clock),
            pure(tx, args.positionId, `u64`),
        ],
    });
}

export interface ManagerCancelOrderByOpenInterestLimitArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    orderTypeTag: number | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    maxOperationCount: bigint | TransactionArgument;
}

export function managerCancelOrderByOpenInterestLimit(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerCancelOrderByOpenInterestLimitArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_cancel_order_by_open_interest_limit`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.orderTypeTag, `u8`),
            pure(tx, args.triggerPrice, `u64`),
            pure(tx, args.maxOperationCount, `u64`),
        ],
    });
}

export interface ManagerCloseOptionPositionArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
}

export function managerCloseOptionPosition(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ManagerCloseOptionPositionArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_close_option_position`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.positionId, `u64`),
        ],
    });
}

export interface ManagerCloseOptionPositionV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
}

export function managerCloseOptionPositionV2(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ManagerCloseOptionPositionV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_close_option_position_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.positionId, `u64`),
        ],
    });
}

export interface ManagerReducePositionArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    reducedRatioBp: bigint | TransactionArgument;
}

export function managerReducePosition(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerReducePositionArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_reduce_position`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.reducedRatioBp, `u64`),
        ],
    });
}

export interface ManagerReducePositionV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    reducedRatioBp: bigint | TransactionArgument;
}

export function managerReducePositionV2(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerReducePositionV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_reduce_position_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.reducedRatioBp, `u64`),
        ],
    });
}

export interface ManagerRemoveOrderArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    orderUser: string | TransactionArgument;
    orderId: bigint | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    process: TransactionObjectInput;
}

export function managerRemoveOrder(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerRemoveOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_remove_order`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.orderUser, `address`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.triggerPrice, `u64`),
            obj(tx, args.process),
        ],
    });
}

export interface ManagerRemovePositionArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    isOptionPosition: boolean | TransactionArgument;
    process: TransactionObjectInput;
}

export function managerRemovePosition(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ManagerRemovePositionArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_remove_position`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.isOptionPosition, `bool`),
            obj(tx, args.process),
        ],
    });
}

export interface ManagerRemovePositionV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    isOptionPosition: boolean | TransactionArgument;
    process: TransactionObjectInput;
}

export function managerRemovePositionV2(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ManagerRemovePositionV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_remove_position_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.isOptionPosition, `bool`),
            obj(tx, args.process),
        ],
    });
}

export interface ManagerUpdateProcessStatusAfterOrderArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    process: TransactionObjectInput;
}

export function managerUpdateProcessStatusAfterOrder(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerUpdateProcessStatusAfterOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_update_process_status_after_order`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.process),
        ],
    });
}

export interface ManagerUpdateProcessStatusAfterPositionArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    process: TransactionObjectInput;
}

export function managerUpdateProcessStatusAfterPosition(
    tx: Transaction,
    typeArgs: [string, string],
    args: ManagerUpdateProcessStatusAfterPositionArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::manager_update_process_status_after_position`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.process),
        ],
    });
}

export interface MatchTradingOrderArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    orderTypeTag: number | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    maxOperationCount: bigint | TransactionArgument;
}

export function matchTradingOrder(
    tx: Transaction,
    typeArgs: [string, string],
    args: MatchTradingOrderArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::match_trading_order`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.orderTypeTag, `u8`),
            pure(tx, args.triggerPrice, `u64`),
            pure(tx, args.maxOperationCount, `u64`),
        ],
    });
}

export interface MatchTradingOrderV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    orderTypeTag: number | TransactionArgument;
    triggerPrice: bigint | TransactionArgument;
    maxOperationCount: bigint | TransactionArgument;
}

export function matchTradingOrderV2(
    tx: Transaction,
    typeArgs: [string, string],
    args: MatchTradingOrderV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::match_trading_order_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.orderTypeTag, `u8`),
            pure(tx, args.triggerPrice, `u64`),
            pure(tx, args.maxOperationCount, `u64`),
        ],
    });
}

export interface NewMarketsArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    protocolFeeShareBp: bigint | TransactionArgument;
}

export function newMarkets(tx: Transaction, typeArgs: [string, string], args: NewMarketsArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::new_markets`,
        typeArguments: typeArgs,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.protocolFeeShareBp, `u64`)],
    });
}

export interface ReduceOptionCollateralPositionSizeArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    orderSize: bigint | TransactionArgument | TransactionArgument | null;
}

export function reduceOptionCollateralPositionSize(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ReduceOptionCollateralPositionSizeArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::reduce_option_collateral_position_size`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.orderSize, `${Option.$typeName}<u64>`),
        ],
    });
}

export interface ReduceOptionCollateralPositionSizeV2Args {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    typusEcosystemVersion: TransactionObjectInput;
    typusUserRegistry: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    positionId: bigint | TransactionArgument;
    orderSize: bigint | TransactionArgument | TransactionArgument | null;
}

export function reduceOptionCollateralPositionSizeV2(
    tx: Transaction,
    typeArgs: [string, string, string],
    args: ReduceOptionCollateralPositionSizeV2Args,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::reduce_option_collateral_position_size_v2`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            obj(tx, args.typusEcosystemVersion),
            obj(tx, args.typusUserRegistry),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.orderSize, `${Option.$typeName}<u64>`),
        ],
    });
}

export interface ReleaseCollateralArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
    positionId: bigint | TransactionArgument;
    releaseAmount: bigint | TransactionArgument;
}

export function releaseCollateral(
    tx: Transaction,
    typeArgs: [string, string],
    args: ReleaseCollateralArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::release_collateral`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.releaseAmount, `u64`),
        ],
    });
}

export interface RemoveLinkedOrder_Args {
    version: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    symbolMarket: TransactionObjectInput;
    order: TransactionObjectInput;
    user: string | TransactionArgument;
}

export function removeLinkedOrder_(tx: Transaction, typeArg: string, args: RemoveLinkedOrder_Args, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::remove_linked_order_`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            pure(tx, args.marketIndex, `u64`),
            obj(tx, args.symbolMarket),
            obj(tx, args.order),
            pure(tx, args.user, `address`),
        ],
    });
}

export interface RemoveLinkedOrdersArgs {
    version: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    symbolMarket: TransactionObjectInput;
    linkedOrderIds: Array<bigint | TransactionArgument> | TransactionArgument;
    linkedOrderPrices: Array<bigint | TransactionArgument> | TransactionArgument;
    user: string | TransactionArgument;
}

export function removeLinkedOrders(tx: Transaction, typeArg: string, args: RemoveLinkedOrdersArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::remove_linked_orders`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            pure(tx, args.marketIndex, `u64`),
            obj(tx, args.symbolMarket),
            pure(tx, args.linkedOrderIds, `vector<u64>`),
            pure(tx, args.linkedOrderPrices, `vector<u64>`),
            pure(tx, args.user, `address`),
        ],
    });
}

export interface RemoveTradingSymbolArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
}

export function removeTradingSymbol(tx: Transaction, typeArg: string, args: RemoveTradingSymbolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::remove_trading_symbol`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`)],
    });
}

export interface ResumeMarketArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
}

export function resumeMarket(tx: Transaction, args: ResumeMarketArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::resume_market`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`)],
    });
}

export interface ResumeTradingSymbolArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
}

export function resumeTradingSymbol(tx: Transaction, typeArg: string, args: ResumeTradingSymbolArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::resume_trading_symbol`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`)],
    });
}

export interface SettleReceiptCollateralArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    dovRegistry: TransactionObjectInput;
    typusOracleCToken: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
}

export function settleReceiptCollateral(
    tx: Transaction,
    typeArgs: [string, string],
    args: SettleReceiptCollateralArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::settle_receipt_collateral`,
        typeArguments: typeArgs,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.dovRegistry),
            obj(tx, args.typusOracleCToken),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
        ],
    });
}

export interface SuspendMarketArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
}

export function suspendMarket(tx: Transaction, args: SuspendMarketArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::suspend_market`,
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`)],
    });
}

export interface SuspendTradingSymbolArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
}

export function suspendTradingSymbol(
    tx: Transaction,
    typeArg: string,
    args: SuspendTradingSymbolArgs,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({
        target: `${published_at}::trading::suspend_trading_symbol`,
        typeArguments: [typeArg],
        arguments: [obj(tx, args.version), obj(tx, args.registry), pure(tx, args.marketIndex, `u64`)],
    });
}

export interface TakeOrderByOrderIdAndPriceArgs {
    symbolMarket: TransactionObjectInput;
    triggerPrice: bigint | TransactionArgument;
    orderId: bigint | TransactionArgument;
    isTokenCollateral: boolean | TransactionArgument;
    user: string | TransactionArgument;
}

export function takeOrderByOrderIdAndPrice(tx: Transaction, args: TakeOrderByOrderIdAndPriceArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::take_order_by_order_id_and_price`,
        arguments: [
            obj(tx, args.symbolMarket),
            pure(tx, args.triggerPrice, `u64`),
            pure(tx, args.orderId, `u64`),
            pure(tx, args.isTokenCollateral, `bool`),
            pure(tx, args.user, `address`),
        ],
    });
}

export function tradingSymbolExists(tx: Transaction, typeArg: string, market: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::trading_symbol_exists`,
        typeArguments: [typeArg],
        arguments: [obj(tx, market)],
    });
}

export interface UpdateFundingRateArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    poolRegistry: TransactionObjectInput;
    typusOracleTradingSymbol: TransactionObjectInput;
    clock: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    poolIndex: bigint | TransactionArgument;
}

export function updateFundingRate(tx: Transaction, typeArg: string, args: UpdateFundingRateArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::update_funding_rate`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            obj(tx, args.poolRegistry),
            obj(tx, args.typusOracleTradingSymbol),
            obj(tx, args.clock),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.poolIndex, `u64`),
        ],
    });
}

export interface UpdateMarketConfigArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    oracleId: string | TransactionArgument | TransactionArgument | null;
    maxLeverageMbp: bigint | TransactionArgument | TransactionArgument | null;
    optionCollateralMaxLeverageMbp: bigint | TransactionArgument | TransactionArgument | null;
    minSize: bigint | TransactionArgument | TransactionArgument | null;
    lotSize: bigint | TransactionArgument | TransactionArgument | null;
    tradingFeeConfig: Array<bigint | TransactionArgument> | TransactionArgument | TransactionArgument | null;
    basicFundingRate: bigint | TransactionArgument | TransactionArgument | null;
    fundingIntervalTsMs: bigint | TransactionArgument | TransactionArgument | null;
    expMultiplier: bigint | TransactionArgument | TransactionArgument | null;
    maxBuyOpenInterest: bigint | TransactionArgument | TransactionArgument | null;
    maxSellOpenInterest: bigint | TransactionArgument | TransactionArgument | null;
    maintenanceMarginRateBp: bigint | TransactionArgument | TransactionArgument | null;
    optionCollateralMaintenanceMarginRateBp: bigint | TransactionArgument | TransactionArgument | null;
    optionCollateralTradingFeeConfig: Array<bigint | TransactionArgument> | TransactionArgument | TransactionArgument | null;
}

export function updateMarketConfig(tx: Transaction, typeArg: string, args: UpdateMarketConfigArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::update_market_config`,
        typeArguments: [typeArg],
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.oracleId, `${Option.$typeName}<address>`),
            pure(tx, args.maxLeverageMbp, `${Option.$typeName}<u64>`),
            pure(tx, args.optionCollateralMaxLeverageMbp, `${Option.$typeName}<u64>`),
            pure(tx, args.minSize, `${Option.$typeName}<u64>`),
            pure(tx, args.lotSize, `${Option.$typeName}<u64>`),
            pure(tx, args.tradingFeeConfig, `${Option.$typeName}<vector<u64>>`),
            pure(tx, args.basicFundingRate, `${Option.$typeName}<u64>`),
            pure(tx, args.fundingIntervalTsMs, `${Option.$typeName}<u64>`),
            pure(tx, args.expMultiplier, `${Option.$typeName}<u64>`),
            pure(tx, args.maxBuyOpenInterest, `${Option.$typeName}<u64>`),
            pure(tx, args.maxSellOpenInterest, `${Option.$typeName}<u64>`),
            pure(tx, args.maintenanceMarginRateBp, `${Option.$typeName}<u64>`),
            pure(tx, args.optionCollateralMaintenanceMarginRateBp, `${Option.$typeName}<u64>`),
            pure(tx, args.optionCollateralTradingFeeConfig, `${Option.$typeName}<vector<u64>>`),
        ],
    });
}

export interface UpdateProtocolFeeShareBpArgs {
    version: TransactionObjectInput;
    registry: TransactionObjectInput;
    marketIndex: bigint | TransactionArgument;
    protocolFeeShareBp: bigint | TransactionArgument;
}

export function updateProtocolFeeShareBp(tx: Transaction, args: UpdateProtocolFeeShareBpArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::trading::update_protocol_fee_share_bp`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.registry),
            pure(tx, args.marketIndex, `u64`),
            pure(tx, args.protocolFeeShareBp, `u64`),
        ],
    });
}
