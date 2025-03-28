import { PUBLISHED_AT } from "..";
import { TypeName } from "../../_dependencies/source/0x1/type-name/structs";
import { TypusBidReceipt } from "../../_dependencies/source/0x908a10789a1a6953e0b73a997c10e3552f7ce4e2907afd00a334ed74bd973ded/vault/structs";
import { obj, pure, vector } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface CreateUnsettledBidReceiptArgs {
    receipt: Array<TransactionObjectInput> | TransactionArgument;
    positionId: bigint | TransactionArgument;
    user: string | TransactionArgument;
    tokenTypes: Array<TransactionObjectInput> | TransactionArgument;
    unrealizedPnlSign: boolean | TransactionArgument;
    unrealizedPnl: bigint | TransactionArgument;
    unrealizedTradingFee: bigint | TransactionArgument;
    unrealizedBorrowFee: bigint | TransactionArgument;
    unrealizedFundingFeeSign: boolean | TransactionArgument;
    unrealizedFundingFee: bigint | TransactionArgument;
    unrealizedLiquidatorFee: bigint | TransactionArgument;
}

export function createUnsettledBidReceipt(tx: Transaction, args: CreateUnsettledBidReceiptArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::escrow::create_unsettled_bid_receipt`,
        arguments: [
            vector(tx, `${TypusBidReceipt.$typeName}`, args.receipt),
            pure(tx, args.positionId, `u64`),
            pure(tx, args.user, `address`),
            vector(tx, `${TypeName.$typeName}`, args.tokenTypes),
            pure(tx, args.unrealizedPnlSign, `bool`),
            pure(tx, args.unrealizedPnl, `u64`),
            pure(tx, args.unrealizedTradingFee, `u64`),
            pure(tx, args.unrealizedBorrowFee, `u64`),
            pure(tx, args.unrealizedFundingFeeSign, `bool`),
            pure(tx, args.unrealizedFundingFee, `u64`),
            pure(tx, args.unrealizedLiquidatorFee, `u64`),
        ],
    });
}

export function destructUnsettledBidReceipt(
    tx: Transaction,
    unsettledBidReceipt: TransactionObjectInput,
    published_at: string = PUBLISHED_AT
) {
    return tx.moveCall({ target: `${published_at}::escrow::destruct_unsettled_bid_receipt`, arguments: [obj(tx, unsettledBidReceipt)] });
}

export function getBidReceipts(tx: Transaction, unsettledBidReceipt: TransactionObjectInput, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({ target: `${published_at}::escrow::get_bid_receipts`, arguments: [obj(tx, unsettledBidReceipt)] });
}
