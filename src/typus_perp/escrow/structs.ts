import * as reified from "../../_framework/reified";
import { TypeName } from "../../_dependencies/source/0x1/type-name/structs";
import { TypusBidReceipt } from "../../_dependencies/source/0xb4f25230ba74837d8299e92951306100c4a532e8c48cc3d8828abe9b91c8b274/vault/structs";
import {
    PhantomReified,
    Reified,
    StructClass,
    ToField,
    ToTypeStr,
    decodeFromFields,
    decodeFromFieldsWithTypes,
    decodeFromJSONField,
    fieldToJSON,
    phantom,
} from "../../_framework/reified";
import { FieldsWithTypes, composeSuiType, compressSuiType } from "../../_framework/util";
import { Vector } from "../../_framework/vector";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64, fromHEX, toHEX } from "@mysten/sui/utils";

/* ============================== UnsettledBidReceipt =============================== */

export function isUnsettledBidReceipt(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::escrow::UnsettledBidReceipt`;
}

export interface UnsettledBidReceiptFields {
    receipt: ToField<Vector<TypusBidReceipt>>;
    positionId: ToField<"u64">;
    user: ToField<"address">;
    tokenTypes: ToField<Vector<TypeName>>;
    unrealizedPnlSign: ToField<"bool">;
    unrealizedPnl: ToField<"u64">;
    unrealizedTradingFee: ToField<"u64">;
    unrealizedBorrowFee: ToField<"u64">;
    unrealizedFundingFeeSign: ToField<"bool">;
    unrealizedFundingFee: ToField<"u64">;
    unrealizedLiquidatorFee: ToField<"u64">;
}

export type UnsettledBidReceiptReified = Reified<UnsettledBidReceipt, UnsettledBidReceiptFields>;

export class UnsettledBidReceipt implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::escrow::UnsettledBidReceipt`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = UnsettledBidReceipt.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::escrow::UnsettledBidReceipt`;
    readonly $typeArgs: [];
    readonly $isPhantom = UnsettledBidReceipt.$isPhantom;

    readonly receipt: ToField<Vector<TypusBidReceipt>>;
    readonly positionId: ToField<"u64">;
    readonly user: ToField<"address">;
    readonly tokenTypes: ToField<Vector<TypeName>>;
    readonly unrealizedPnlSign: ToField<"bool">;
    readonly unrealizedPnl: ToField<"u64">;
    readonly unrealizedTradingFee: ToField<"u64">;
    readonly unrealizedBorrowFee: ToField<"u64">;
    readonly unrealizedFundingFeeSign: ToField<"bool">;
    readonly unrealizedFundingFee: ToField<"u64">;
    readonly unrealizedLiquidatorFee: ToField<"u64">;

    private constructor(typeArgs: [], fields: UnsettledBidReceiptFields) {
        this.$fullTypeName = composeSuiType(UnsettledBidReceipt.$typeName, ...typeArgs) as `${typeof PKG_V1}::escrow::UnsettledBidReceipt`;
        this.$typeArgs = typeArgs;

        this.receipt = fields.receipt;
        this.positionId = fields.positionId;
        this.user = fields.user;
        this.tokenTypes = fields.tokenTypes;
        this.unrealizedPnlSign = fields.unrealizedPnlSign;
        this.unrealizedPnl = fields.unrealizedPnl;
        this.unrealizedTradingFee = fields.unrealizedTradingFee;
        this.unrealizedBorrowFee = fields.unrealizedBorrowFee;
        this.unrealizedFundingFeeSign = fields.unrealizedFundingFeeSign;
        this.unrealizedFundingFee = fields.unrealizedFundingFee;
        this.unrealizedLiquidatorFee = fields.unrealizedLiquidatorFee;
    }

    static reified(): UnsettledBidReceiptReified {
        return {
            typeName: UnsettledBidReceipt.$typeName,
            fullTypeName: composeSuiType(UnsettledBidReceipt.$typeName, ...[]) as `${typeof PKG_V1}::escrow::UnsettledBidReceipt`,
            typeArgs: [] as [],
            isPhantom: UnsettledBidReceipt.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => UnsettledBidReceipt.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => UnsettledBidReceipt.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => UnsettledBidReceipt.fromBcs(data),
            bcs: UnsettledBidReceipt.bcs,
            fromJSONField: (field: any) => UnsettledBidReceipt.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => UnsettledBidReceipt.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => UnsettledBidReceipt.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => UnsettledBidReceipt.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => UnsettledBidReceipt.fetch(client, id),
            new: (fields: UnsettledBidReceiptFields) => {
                return new UnsettledBidReceipt([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return UnsettledBidReceipt.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<UnsettledBidReceipt>> {
        return phantom(UnsettledBidReceipt.reified());
    }
    static get p() {
        return UnsettledBidReceipt.phantom();
    }

    static get bcs() {
        return bcs.struct("UnsettledBidReceipt", {
            receipt: bcs.vector(TypusBidReceipt.bcs),
            position_id: bcs.u64(),
            user: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            token_types: bcs.vector(TypeName.bcs),
            unrealized_pnl_sign: bcs.bool(),
            unrealized_pnl: bcs.u64(),
            unrealized_trading_fee: bcs.u64(),
            unrealized_borrow_fee: bcs.u64(),
            unrealized_funding_fee_sign: bcs.bool(),
            unrealized_funding_fee: bcs.u64(),
            unrealized_liquidator_fee: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): UnsettledBidReceipt {
        return UnsettledBidReceipt.reified().new({
            receipt: decodeFromFields(reified.vector(TypusBidReceipt.reified()), fields.receipt),
            positionId: decodeFromFields("u64", fields.position_id),
            user: decodeFromFields("address", fields.user),
            tokenTypes: decodeFromFields(reified.vector(TypeName.reified()), fields.token_types),
            unrealizedPnlSign: decodeFromFields("bool", fields.unrealized_pnl_sign),
            unrealizedPnl: decodeFromFields("u64", fields.unrealized_pnl),
            unrealizedTradingFee: decodeFromFields("u64", fields.unrealized_trading_fee),
            unrealizedBorrowFee: decodeFromFields("u64", fields.unrealized_borrow_fee),
            unrealizedFundingFeeSign: decodeFromFields("bool", fields.unrealized_funding_fee_sign),
            unrealizedFundingFee: decodeFromFields("u64", fields.unrealized_funding_fee),
            unrealizedLiquidatorFee: decodeFromFields("u64", fields.unrealized_liquidator_fee),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): UnsettledBidReceipt {
        if (!isUnsettledBidReceipt(item.type)) {
            throw new Error("not a UnsettledBidReceipt type");
        }

        return UnsettledBidReceipt.reified().new({
            receipt: decodeFromFieldsWithTypes(reified.vector(TypusBidReceipt.reified()), item.fields.receipt),
            positionId: decodeFromFieldsWithTypes("u64", item.fields.position_id),
            user: decodeFromFieldsWithTypes("address", item.fields.user),
            tokenTypes: decodeFromFieldsWithTypes(reified.vector(TypeName.reified()), item.fields.token_types),
            unrealizedPnlSign: decodeFromFieldsWithTypes("bool", item.fields.unrealized_pnl_sign),
            unrealizedPnl: decodeFromFieldsWithTypes("u64", item.fields.unrealized_pnl),
            unrealizedTradingFee: decodeFromFieldsWithTypes("u64", item.fields.unrealized_trading_fee),
            unrealizedBorrowFee: decodeFromFieldsWithTypes("u64", item.fields.unrealized_borrow_fee),
            unrealizedFundingFeeSign: decodeFromFieldsWithTypes("bool", item.fields.unrealized_funding_fee_sign),
            unrealizedFundingFee: decodeFromFieldsWithTypes("u64", item.fields.unrealized_funding_fee),
            unrealizedLiquidatorFee: decodeFromFieldsWithTypes("u64", item.fields.unrealized_liquidator_fee),
        });
    }

    static fromBcs(data: Uint8Array): UnsettledBidReceipt {
        return UnsettledBidReceipt.fromFields(UnsettledBidReceipt.bcs.parse(data));
    }

    toJSONField() {
        return {
            receipt: fieldToJSON<Vector<TypusBidReceipt>>(`vector<${TypusBidReceipt.$typeName}>`, this.receipt),
            positionId: this.positionId.toString(),
            user: this.user,
            tokenTypes: fieldToJSON<Vector<TypeName>>(`vector<${TypeName.$typeName}>`, this.tokenTypes),
            unrealizedPnlSign: this.unrealizedPnlSign,
            unrealizedPnl: this.unrealizedPnl.toString(),
            unrealizedTradingFee: this.unrealizedTradingFee.toString(),
            unrealizedBorrowFee: this.unrealizedBorrowFee.toString(),
            unrealizedFundingFeeSign: this.unrealizedFundingFeeSign,
            unrealizedFundingFee: this.unrealizedFundingFee.toString(),
            unrealizedLiquidatorFee: this.unrealizedLiquidatorFee.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): UnsettledBidReceipt {
        return UnsettledBidReceipt.reified().new({
            receipt: decodeFromJSONField(reified.vector(TypusBidReceipt.reified()), field.receipt),
            positionId: decodeFromJSONField("u64", field.positionId),
            user: decodeFromJSONField("address", field.user),
            tokenTypes: decodeFromJSONField(reified.vector(TypeName.reified()), field.tokenTypes),
            unrealizedPnlSign: decodeFromJSONField("bool", field.unrealizedPnlSign),
            unrealizedPnl: decodeFromJSONField("u64", field.unrealizedPnl),
            unrealizedTradingFee: decodeFromJSONField("u64", field.unrealizedTradingFee),
            unrealizedBorrowFee: decodeFromJSONField("u64", field.unrealizedBorrowFee),
            unrealizedFundingFeeSign: decodeFromJSONField("bool", field.unrealizedFundingFeeSign),
            unrealizedFundingFee: decodeFromJSONField("u64", field.unrealizedFundingFee),
            unrealizedLiquidatorFee: decodeFromJSONField("u64", field.unrealizedLiquidatorFee),
        });
    }

    static fromJSON(json: Record<string, any>): UnsettledBidReceipt {
        if (json.$typeName !== UnsettledBidReceipt.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return UnsettledBidReceipt.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): UnsettledBidReceipt {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isUnsettledBidReceipt(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a UnsettledBidReceipt object`);
        }
        return UnsettledBidReceipt.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): UnsettledBidReceipt {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isUnsettledBidReceipt(data.bcs.type)) {
                throw new Error(`object at is not a UnsettledBidReceipt object`);
            }

            return UnsettledBidReceipt.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return UnsettledBidReceipt.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<UnsettledBidReceipt> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching UnsettledBidReceipt object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isUnsettledBidReceipt(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a UnsettledBidReceipt object`);
        }

        return UnsettledBidReceipt.fromSuiObjectData(res.data);
    }
}
