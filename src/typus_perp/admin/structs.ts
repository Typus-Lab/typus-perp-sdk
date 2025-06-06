import * as reified from "../../_framework/reified";
import { TypeName } from "../../_dependencies/source/0x1/type-name/structs";
import { UID } from "../../_dependencies/source/0x2/object/structs";
import { VecSet } from "../../_dependencies/source/0x2/vec-set/structs";
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

/* ============================== FeeInfo =============================== */

export function isFeeInfo(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::FeeInfo`;
}

export interface FeeInfoFields {
    token: ToField<TypeName>;
    value: ToField<"u64">;
}

export type FeeInfoReified = Reified<FeeInfo, FeeInfoFields>;

export class FeeInfo implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::FeeInfo`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = FeeInfo.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::FeeInfo`;
    readonly $typeArgs: [];
    readonly $isPhantom = FeeInfo.$isPhantom;

    readonly token: ToField<TypeName>;
    readonly value: ToField<"u64">;

    private constructor(typeArgs: [], fields: FeeInfoFields) {
        this.$fullTypeName = composeSuiType(FeeInfo.$typeName, ...typeArgs) as `${typeof PKG_V1}::admin::FeeInfo`;
        this.$typeArgs = typeArgs;

        this.token = fields.token;
        this.value = fields.value;
    }

    static reified(): FeeInfoReified {
        return {
            typeName: FeeInfo.$typeName,
            fullTypeName: composeSuiType(FeeInfo.$typeName, ...[]) as `${typeof PKG_V1}::admin::FeeInfo`,
            typeArgs: [] as [],
            isPhantom: FeeInfo.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => FeeInfo.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => FeeInfo.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => FeeInfo.fromBcs(data),
            bcs: FeeInfo.bcs,
            fromJSONField: (field: any) => FeeInfo.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => FeeInfo.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => FeeInfo.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => FeeInfo.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => FeeInfo.fetch(client, id),
            new: (fields: FeeInfoFields) => {
                return new FeeInfo([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return FeeInfo.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<FeeInfo>> {
        return phantom(FeeInfo.reified());
    }
    static get p() {
        return FeeInfo.phantom();
    }

    static get bcs() {
        return bcs.struct("FeeInfo", {
            token: TypeName.bcs,
            value: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): FeeInfo {
        return FeeInfo.reified().new({
            token: decodeFromFields(TypeName.reified(), fields.token),
            value: decodeFromFields("u64", fields.value),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): FeeInfo {
        if (!isFeeInfo(item.type)) {
            throw new Error("not a FeeInfo type");
        }

        return FeeInfo.reified().new({
            token: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.token),
            value: decodeFromFieldsWithTypes("u64", item.fields.value),
        });
    }

    static fromBcs(data: Uint8Array): FeeInfo {
        return FeeInfo.fromFields(FeeInfo.bcs.parse(data));
    }

    toJSONField() {
        return {
            token: this.token.toJSONField(),
            value: this.value.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): FeeInfo {
        return FeeInfo.reified().new({
            token: decodeFromJSONField(TypeName.reified(), field.token),
            value: decodeFromJSONField("u64", field.value),
        });
    }

    static fromJSON(json: Record<string, any>): FeeInfo {
        if (json.$typeName !== FeeInfo.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return FeeInfo.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): FeeInfo {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isFeeInfo(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a FeeInfo object`);
        }
        return FeeInfo.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): FeeInfo {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isFeeInfo(data.bcs.type)) {
                throw new Error(`object at is not a FeeInfo object`);
            }

            return FeeInfo.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return FeeInfo.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<FeeInfo> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching FeeInfo object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isFeeInfo(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a FeeInfo object`);
        }

        return FeeInfo.fromSuiObjectData(res.data);
    }
}

/* ============================== FeePool =============================== */

export function isFeePool(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::FeePool`;
}

export interface FeePoolFields {
    id: ToField<UID>;
    feeInfos: ToField<Vector<FeeInfo>>;
}

export type FeePoolReified = Reified<FeePool, FeePoolFields>;

export class FeePool implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::FeePool`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = FeePool.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::FeePool`;
    readonly $typeArgs: [];
    readonly $isPhantom = FeePool.$isPhantom;

    readonly id: ToField<UID>;
    readonly feeInfos: ToField<Vector<FeeInfo>>;

    private constructor(typeArgs: [], fields: FeePoolFields) {
        this.$fullTypeName = composeSuiType(FeePool.$typeName, ...typeArgs) as `${typeof PKG_V1}::admin::FeePool`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.feeInfos = fields.feeInfos;
    }

    static reified(): FeePoolReified {
        return {
            typeName: FeePool.$typeName,
            fullTypeName: composeSuiType(FeePool.$typeName, ...[]) as `${typeof PKG_V1}::admin::FeePool`,
            typeArgs: [] as [],
            isPhantom: FeePool.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => FeePool.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => FeePool.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => FeePool.fromBcs(data),
            bcs: FeePool.bcs,
            fromJSONField: (field: any) => FeePool.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => FeePool.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => FeePool.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => FeePool.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => FeePool.fetch(client, id),
            new: (fields: FeePoolFields) => {
                return new FeePool([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return FeePool.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<FeePool>> {
        return phantom(FeePool.reified());
    }
    static get p() {
        return FeePool.phantom();
    }

    static get bcs() {
        return bcs.struct("FeePool", {
            id: UID.bcs,
            fee_infos: bcs.vector(FeeInfo.bcs),
        });
    }

    static fromFields(fields: Record<string, any>): FeePool {
        return FeePool.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            feeInfos: decodeFromFields(reified.vector(FeeInfo.reified()), fields.fee_infos),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): FeePool {
        if (!isFeePool(item.type)) {
            throw new Error("not a FeePool type");
        }

        return FeePool.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            feeInfos: decodeFromFieldsWithTypes(reified.vector(FeeInfo.reified()), item.fields.fee_infos),
        });
    }

    static fromBcs(data: Uint8Array): FeePool {
        return FeePool.fromFields(FeePool.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            feeInfos: fieldToJSON<Vector<FeeInfo>>(`vector<${FeeInfo.$typeName}>`, this.feeInfos),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): FeePool {
        return FeePool.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            feeInfos: decodeFromJSONField(reified.vector(FeeInfo.reified()), field.feeInfos),
        });
    }

    static fromJSON(json: Record<string, any>): FeePool {
        if (json.$typeName !== FeePool.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return FeePool.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): FeePool {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isFeePool(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a FeePool object`);
        }
        return FeePool.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): FeePool {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isFeePool(data.bcs.type)) {
                throw new Error(`object at is not a FeePool object`);
            }

            return FeePool.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return FeePool.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<FeePool> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching FeePool object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isFeePool(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a FeePool object`);
        }

        return FeePool.fromSuiObjectData(res.data);
    }
}

/* ============================== ProtocolFeeEvent =============================== */

export function isProtocolFeeEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::ProtocolFeeEvent`;
}

export interface ProtocolFeeEventFields {
    token: ToField<TypeName>;
    amount: ToField<"u64">;
}

export type ProtocolFeeEventReified = Reified<ProtocolFeeEvent, ProtocolFeeEventFields>;

export class ProtocolFeeEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::ProtocolFeeEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = ProtocolFeeEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::ProtocolFeeEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = ProtocolFeeEvent.$isPhantom;

    readonly token: ToField<TypeName>;
    readonly amount: ToField<"u64">;

    private constructor(typeArgs: [], fields: ProtocolFeeEventFields) {
        this.$fullTypeName = composeSuiType(ProtocolFeeEvent.$typeName, ...typeArgs) as `${typeof PKG_V1}::admin::ProtocolFeeEvent`;
        this.$typeArgs = typeArgs;

        this.token = fields.token;
        this.amount = fields.amount;
    }

    static reified(): ProtocolFeeEventReified {
        return {
            typeName: ProtocolFeeEvent.$typeName,
            fullTypeName: composeSuiType(ProtocolFeeEvent.$typeName, ...[]) as `${typeof PKG_V1}::admin::ProtocolFeeEvent`,
            typeArgs: [] as [],
            isPhantom: ProtocolFeeEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => ProtocolFeeEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => ProtocolFeeEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => ProtocolFeeEvent.fromBcs(data),
            bcs: ProtocolFeeEvent.bcs,
            fromJSONField: (field: any) => ProtocolFeeEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => ProtocolFeeEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => ProtocolFeeEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => ProtocolFeeEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => ProtocolFeeEvent.fetch(client, id),
            new: (fields: ProtocolFeeEventFields) => {
                return new ProtocolFeeEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return ProtocolFeeEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<ProtocolFeeEvent>> {
        return phantom(ProtocolFeeEvent.reified());
    }
    static get p() {
        return ProtocolFeeEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("ProtocolFeeEvent", {
            token: TypeName.bcs,
            amount: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): ProtocolFeeEvent {
        return ProtocolFeeEvent.reified().new({
            token: decodeFromFields(TypeName.reified(), fields.token),
            amount: decodeFromFields("u64", fields.amount),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeEvent {
        if (!isProtocolFeeEvent(item.type)) {
            throw new Error("not a ProtocolFeeEvent type");
        }

        return ProtocolFeeEvent.reified().new({
            token: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.token),
            amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
        });
    }

    static fromBcs(data: Uint8Array): ProtocolFeeEvent {
        return ProtocolFeeEvent.fromFields(ProtocolFeeEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            token: this.token.toJSONField(),
            amount: this.amount.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): ProtocolFeeEvent {
        return ProtocolFeeEvent.reified().new({
            token: decodeFromJSONField(TypeName.reified(), field.token),
            amount: decodeFromJSONField("u64", field.amount),
        });
    }

    static fromJSON(json: Record<string, any>): ProtocolFeeEvent {
        if (json.$typeName !== ProtocolFeeEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return ProtocolFeeEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): ProtocolFeeEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isProtocolFeeEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a ProtocolFeeEvent object`);
        }
        return ProtocolFeeEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): ProtocolFeeEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isProtocolFeeEvent(data.bcs.type)) {
                throw new Error(`object at is not a ProtocolFeeEvent object`);
            }

            return ProtocolFeeEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return ProtocolFeeEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<ProtocolFeeEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching ProtocolFeeEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isProtocolFeeEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a ProtocolFeeEvent object`);
        }

        return ProtocolFeeEvent.fromSuiObjectData(res.data);
    }
}

/* ============================== PutInsuranceFundEvent =============================== */

export function isPutInsuranceFundEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::PutInsuranceFundEvent`;
}

export interface PutInsuranceFundEventFields {
    token: ToField<TypeName>;
    amount: ToField<"u64">;
}

export type PutInsuranceFundEventReified = Reified<PutInsuranceFundEvent, PutInsuranceFundEventFields>;

export class PutInsuranceFundEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::PutInsuranceFundEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = PutInsuranceFundEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::PutInsuranceFundEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = PutInsuranceFundEvent.$isPhantom;

    readonly token: ToField<TypeName>;
    readonly amount: ToField<"u64">;

    private constructor(typeArgs: [], fields: PutInsuranceFundEventFields) {
        this.$fullTypeName = composeSuiType(
            PutInsuranceFundEvent.$typeName,
            ...typeArgs
        ) as `${typeof PKG_V1}::admin::PutInsuranceFundEvent`;
        this.$typeArgs = typeArgs;

        this.token = fields.token;
        this.amount = fields.amount;
    }

    static reified(): PutInsuranceFundEventReified {
        return {
            typeName: PutInsuranceFundEvent.$typeName,
            fullTypeName: composeSuiType(PutInsuranceFundEvent.$typeName, ...[]) as `${typeof PKG_V1}::admin::PutInsuranceFundEvent`,
            typeArgs: [] as [],
            isPhantom: PutInsuranceFundEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => PutInsuranceFundEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => PutInsuranceFundEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => PutInsuranceFundEvent.fromBcs(data),
            bcs: PutInsuranceFundEvent.bcs,
            fromJSONField: (field: any) => PutInsuranceFundEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => PutInsuranceFundEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => PutInsuranceFundEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => PutInsuranceFundEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => PutInsuranceFundEvent.fetch(client, id),
            new: (fields: PutInsuranceFundEventFields) => {
                return new PutInsuranceFundEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return PutInsuranceFundEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<PutInsuranceFundEvent>> {
        return phantom(PutInsuranceFundEvent.reified());
    }
    static get p() {
        return PutInsuranceFundEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("PutInsuranceFundEvent", {
            token: TypeName.bcs,
            amount: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): PutInsuranceFundEvent {
        return PutInsuranceFundEvent.reified().new({
            token: decodeFromFields(TypeName.reified(), fields.token),
            amount: decodeFromFields("u64", fields.amount),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): PutInsuranceFundEvent {
        if (!isPutInsuranceFundEvent(item.type)) {
            throw new Error("not a PutInsuranceFundEvent type");
        }

        return PutInsuranceFundEvent.reified().new({
            token: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.token),
            amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
        });
    }

    static fromBcs(data: Uint8Array): PutInsuranceFundEvent {
        return PutInsuranceFundEvent.fromFields(PutInsuranceFundEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            token: this.token.toJSONField(),
            amount: this.amount.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): PutInsuranceFundEvent {
        return PutInsuranceFundEvent.reified().new({
            token: decodeFromJSONField(TypeName.reified(), field.token),
            amount: decodeFromJSONField("u64", field.amount),
        });
    }

    static fromJSON(json: Record<string, any>): PutInsuranceFundEvent {
        if (json.$typeName !== PutInsuranceFundEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return PutInsuranceFundEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): PutInsuranceFundEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isPutInsuranceFundEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a PutInsuranceFundEvent object`);
        }
        return PutInsuranceFundEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): PutInsuranceFundEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isPutInsuranceFundEvent(data.bcs.type)) {
                throw new Error(`object at is not a PutInsuranceFundEvent object`);
            }

            return PutInsuranceFundEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return PutInsuranceFundEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<PutInsuranceFundEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching PutInsuranceFundEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isPutInsuranceFundEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a PutInsuranceFundEvent object`);
        }

        return PutInsuranceFundEvent.fromSuiObjectData(res.data);
    }
}

/* ============================== SendFeeEvent =============================== */

export function isSendFeeEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::SendFeeEvent`;
}

export interface SendFeeEventFields {
    token: ToField<TypeName>;
    amount: ToField<"u64">;
}

export type SendFeeEventReified = Reified<SendFeeEvent, SendFeeEventFields>;

export class SendFeeEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::SendFeeEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = SendFeeEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::SendFeeEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = SendFeeEvent.$isPhantom;

    readonly token: ToField<TypeName>;
    readonly amount: ToField<"u64">;

    private constructor(typeArgs: [], fields: SendFeeEventFields) {
        this.$fullTypeName = composeSuiType(SendFeeEvent.$typeName, ...typeArgs) as `${typeof PKG_V1}::admin::SendFeeEvent`;
        this.$typeArgs = typeArgs;

        this.token = fields.token;
        this.amount = fields.amount;
    }

    static reified(): SendFeeEventReified {
        return {
            typeName: SendFeeEvent.$typeName,
            fullTypeName: composeSuiType(SendFeeEvent.$typeName, ...[]) as `${typeof PKG_V1}::admin::SendFeeEvent`,
            typeArgs: [] as [],
            isPhantom: SendFeeEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => SendFeeEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => SendFeeEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => SendFeeEvent.fromBcs(data),
            bcs: SendFeeEvent.bcs,
            fromJSONField: (field: any) => SendFeeEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => SendFeeEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => SendFeeEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => SendFeeEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => SendFeeEvent.fetch(client, id),
            new: (fields: SendFeeEventFields) => {
                return new SendFeeEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return SendFeeEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<SendFeeEvent>> {
        return phantom(SendFeeEvent.reified());
    }
    static get p() {
        return SendFeeEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("SendFeeEvent", {
            token: TypeName.bcs,
            amount: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): SendFeeEvent {
        return SendFeeEvent.reified().new({
            token: decodeFromFields(TypeName.reified(), fields.token),
            amount: decodeFromFields("u64", fields.amount),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): SendFeeEvent {
        if (!isSendFeeEvent(item.type)) {
            throw new Error("not a SendFeeEvent type");
        }

        return SendFeeEvent.reified().new({
            token: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.token),
            amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
        });
    }

    static fromBcs(data: Uint8Array): SendFeeEvent {
        return SendFeeEvent.fromFields(SendFeeEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            token: this.token.toJSONField(),
            amount: this.amount.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): SendFeeEvent {
        return SendFeeEvent.reified().new({
            token: decodeFromJSONField(TypeName.reified(), field.token),
            amount: decodeFromJSONField("u64", field.amount),
        });
    }

    static fromJSON(json: Record<string, any>): SendFeeEvent {
        if (json.$typeName !== SendFeeEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return SendFeeEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): SendFeeEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isSendFeeEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a SendFeeEvent object`);
        }
        return SendFeeEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): SendFeeEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isSendFeeEvent(data.bcs.type)) {
                throw new Error(`object at is not a SendFeeEvent object`);
            }

            return SendFeeEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return SendFeeEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<SendFeeEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching SendFeeEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isSendFeeEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a SendFeeEvent object`);
        }

        return SendFeeEvent.fromSuiObjectData(res.data);
    }
}

/* ============================== Version =============================== */

export function isVersion(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::admin::Version`;
}

export interface VersionFields {
    id: ToField<UID>;
    value: ToField<"u64">;
    feePool: ToField<FeePool>;
    liquidatorFeePool: ToField<FeePool>;
    authority: ToField<VecSet<"address">>;
    u64Padding: ToField<Vector<"u64">>;
}

export type VersionReified = Reified<Version, VersionFields>;

export class Version implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::admin::Version`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = Version.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::admin::Version`;
    readonly $typeArgs: [];
    readonly $isPhantom = Version.$isPhantom;

    readonly id: ToField<UID>;
    readonly value: ToField<"u64">;
    readonly feePool: ToField<FeePool>;
    readonly liquidatorFeePool: ToField<FeePool>;
    readonly authority: ToField<VecSet<"address">>;
    readonly u64Padding: ToField<Vector<"u64">>;

    private constructor(typeArgs: [], fields: VersionFields) {
        this.$fullTypeName = composeSuiType(Version.$typeName, ...typeArgs) as `${typeof PKG_V1}::admin::Version`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.value = fields.value;
        this.feePool = fields.feePool;
        this.liquidatorFeePool = fields.liquidatorFeePool;
        this.authority = fields.authority;
        this.u64Padding = fields.u64Padding;
    }

    static reified(): VersionReified {
        return {
            typeName: Version.$typeName,
            fullTypeName: composeSuiType(Version.$typeName, ...[]) as `${typeof PKG_V1}::admin::Version`,
            typeArgs: [] as [],
            isPhantom: Version.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => Version.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => Version.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => Version.fromBcs(data),
            bcs: Version.bcs,
            fromJSONField: (field: any) => Version.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => Version.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => Version.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => Version.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => Version.fetch(client, id),
            new: (fields: VersionFields) => {
                return new Version([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return Version.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<Version>> {
        return phantom(Version.reified());
    }
    static get p() {
        return Version.phantom();
    }

    static get bcs() {
        return bcs.struct("Version", {
            id: UID.bcs,
            value: bcs.u64(),
            fee_pool: FeePool.bcs,
            liquidator_fee_pool: FeePool.bcs,
            authority: VecSet.bcs(
                bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) })
            ),
            u64_padding: bcs.vector(bcs.u64()),
        });
    }

    static fromFields(fields: Record<string, any>): Version {
        return Version.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            value: decodeFromFields("u64", fields.value),
            feePool: decodeFromFields(FeePool.reified(), fields.fee_pool),
            liquidatorFeePool: decodeFromFields(FeePool.reified(), fields.liquidator_fee_pool),
            authority: decodeFromFields(VecSet.reified("address"), fields.authority),
            u64Padding: decodeFromFields(reified.vector("u64"), fields.u64_padding),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): Version {
        if (!isVersion(item.type)) {
            throw new Error("not a Version type");
        }

        return Version.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            value: decodeFromFieldsWithTypes("u64", item.fields.value),
            feePool: decodeFromFieldsWithTypes(FeePool.reified(), item.fields.fee_pool),
            liquidatorFeePool: decodeFromFieldsWithTypes(FeePool.reified(), item.fields.liquidator_fee_pool),
            authority: decodeFromFieldsWithTypes(VecSet.reified("address"), item.fields.authority),
            u64Padding: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.u64_padding),
        });
    }

    static fromBcs(data: Uint8Array): Version {
        return Version.fromFields(Version.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            value: this.value.toString(),
            feePool: this.feePool.toJSONField(),
            liquidatorFeePool: this.liquidatorFeePool.toJSONField(),
            authority: this.authority.toJSONField(),
            u64Padding: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.u64Padding),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): Version {
        return Version.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            value: decodeFromJSONField("u64", field.value),
            feePool: decodeFromJSONField(FeePool.reified(), field.feePool),
            liquidatorFeePool: decodeFromJSONField(FeePool.reified(), field.liquidatorFeePool),
            authority: decodeFromJSONField(VecSet.reified("address"), field.authority),
            u64Padding: decodeFromJSONField(reified.vector("u64"), field.u64Padding),
        });
    }

    static fromJSON(json: Record<string, any>): Version {
        if (json.$typeName !== Version.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return Version.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): Version {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isVersion(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a Version object`);
        }
        return Version.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): Version {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isVersion(data.bcs.type)) {
                throw new Error(`object at is not a Version object`);
            }

            return Version.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return Version.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<Version> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching Version object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isVersion(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a Version object`);
        }

        return Version.fromSuiObjectData(res.data);
    }
}
