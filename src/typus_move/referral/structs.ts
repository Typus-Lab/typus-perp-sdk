import * as reified from "../../_framework/reified";
import { String } from "../../_dependencies/source/0x1/string/structs";
import { UID } from "../../_dependencies/source/0x2/object/structs";
import { Table } from "../../_dependencies/source/0x2/table/structs";
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
    ToTypeStr as ToPhantom,
} from "../../_framework/reified";
import { FieldsWithTypes, composeSuiType, compressSuiType } from "../../_framework/util";
import { Vector } from "../../_framework/vector";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64, fromHEX, toHEX } from "@mysten/sui/utils";

/* ============================== ReferralRegistry =============================== */

const PKG_V1 = "";

export function isReferralRegistry(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::referral::ReferralRegistry`;
}

export interface ReferralRegistryFields {
    id: ToField<UID>;
    config: ToField<Vector<"u64">>;
    referralCodes: ToField<Table<ToPhantom<String>, "address">>;
    referrers: ToField<Table<"address", ToPhantom<Referrer>>>;
    members: ToField<Table<"address", ToPhantom<String>>>;
}

export type ReferralRegistryReified = Reified<ReferralRegistry, ReferralRegistryFields>;

export class ReferralRegistry implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::referral::ReferralRegistry`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = ReferralRegistry.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::referral::ReferralRegistry`;
    readonly $typeArgs: [];
    readonly $isPhantom = ReferralRegistry.$isPhantom;

    readonly id: ToField<UID>;
    readonly config: ToField<Vector<"u64">>;
    readonly referralCodes: ToField<Table<ToPhantom<String>, "address">>;
    readonly referrers: ToField<Table<"address", ToPhantom<Referrer>>>;
    readonly members: ToField<Table<"address", ToPhantom<String>>>;

    private constructor(typeArgs: [], fields: ReferralRegistryFields) {
        this.$fullTypeName = composeSuiType(ReferralRegistry.$typeName, ...typeArgs) as `${typeof PKG_V1}::referral::ReferralRegistry`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.config = fields.config;
        this.referralCodes = fields.referralCodes;
        this.referrers = fields.referrers;
        this.members = fields.members;
    }

    static reified(): ReferralRegistryReified {
        return {
            typeName: ReferralRegistry.$typeName,
            fullTypeName: composeSuiType(ReferralRegistry.$typeName, ...[]) as `${typeof PKG_V1}::referral::ReferralRegistry`,
            typeArgs: [] as [],
            isPhantom: ReferralRegistry.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => ReferralRegistry.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => ReferralRegistry.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => ReferralRegistry.fromBcs(data),
            bcs: ReferralRegistry.bcs,
            fromJSONField: (field: any) => ReferralRegistry.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => ReferralRegistry.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => ReferralRegistry.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => ReferralRegistry.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => ReferralRegistry.fetch(client, id),
            new: (fields: ReferralRegistryFields) => {
                return new ReferralRegistry([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return ReferralRegistry.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<ReferralRegistry>> {
        return phantom(ReferralRegistry.reified());
    }
    static get p() {
        return ReferralRegistry.phantom();
    }

    static get bcs() {
        return bcs.struct("ReferralRegistry", {
            id: UID.bcs,
            config: bcs.vector(bcs.u64()),
            referral_codes: Table.bcs,
            referrers: Table.bcs,
            members: Table.bcs,
        });
    }

    static fromFields(fields: Record<string, any>): ReferralRegistry {
        return ReferralRegistry.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            config: decodeFromFields(reified.vector("u64"), fields.config),
            referralCodes: decodeFromFields(
                Table.reified(reified.phantom(String.reified()), reified.phantom("address")),
                fields.referral_codes
            ),
            referrers: decodeFromFields(Table.reified(reified.phantom("address"), reified.phantom(Referrer.reified())), fields.referrers),
            members: decodeFromFields(Table.reified(reified.phantom("address"), reified.phantom(String.reified())), fields.members),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): ReferralRegistry {
        if (!isReferralRegistry(item.type)) {
            throw new Error("not a ReferralRegistry type");
        }

        return ReferralRegistry.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            config: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.config),
            referralCodes: decodeFromFieldsWithTypes(
                Table.reified(reified.phantom(String.reified()), reified.phantom("address")),
                item.fields.referral_codes
            ),
            referrers: decodeFromFieldsWithTypes(
                Table.reified(reified.phantom("address"), reified.phantom(Referrer.reified())),
                item.fields.referrers
            ),
            members: decodeFromFieldsWithTypes(
                Table.reified(reified.phantom("address"), reified.phantom(String.reified())),
                item.fields.members
            ),
        });
    }

    static fromBcs(data: Uint8Array): ReferralRegistry {
        return ReferralRegistry.fromFields(ReferralRegistry.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            config: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.config),
            referralCodes: this.referralCodes.toJSONField(),
            referrers: this.referrers.toJSONField(),
            members: this.members.toJSONField(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): ReferralRegistry {
        return ReferralRegistry.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            config: decodeFromJSONField(reified.vector("u64"), field.config),
            referralCodes: decodeFromJSONField(
                Table.reified(reified.phantom(String.reified()), reified.phantom("address")),
                field.referralCodes
            ),
            referrers: decodeFromJSONField(Table.reified(reified.phantom("address"), reified.phantom(Referrer.reified())), field.referrers),
            members: decodeFromJSONField(Table.reified(reified.phantom("address"), reified.phantom(String.reified())), field.members),
        });
    }

    static fromJSON(json: Record<string, any>): ReferralRegistry {
        if (json.$typeName !== ReferralRegistry.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return ReferralRegistry.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): ReferralRegistry {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isReferralRegistry(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a ReferralRegistry object`);
        }
        return ReferralRegistry.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): ReferralRegistry {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isReferralRegistry(data.bcs.type)) {
                throw new Error(`object at is not a ReferralRegistry object`);
            }

            return ReferralRegistry.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return ReferralRegistry.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<ReferralRegistry> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching ReferralRegistry object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isReferralRegistry(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a ReferralRegistry object`);
        }

        return ReferralRegistry.fromSuiObjectData(res.data);
    }
}

/* ============================== Referrer =============================== */

export function isReferrer(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::referral::Referrer`;
}

export interface ReferrerFields {
    id: ToField<UID>;
    referrer: ToField<"address">;
    referralCode: ToField<String>;
    config: ToField<Vector<"u64">>;
    members: ToField<Vector<"address">>;
}

export type ReferrerReified = Reified<Referrer, ReferrerFields>;

export class Referrer implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::referral::Referrer`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = Referrer.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::referral::Referrer`;
    readonly $typeArgs: [];
    readonly $isPhantom = Referrer.$isPhantom;

    readonly id: ToField<UID>;
    readonly referrer: ToField<"address">;
    readonly referralCode: ToField<String>;
    readonly config: ToField<Vector<"u64">>;
    readonly members: ToField<Vector<"address">>;

    private constructor(typeArgs: [], fields: ReferrerFields) {
        this.$fullTypeName = composeSuiType(Referrer.$typeName, ...typeArgs) as `${typeof PKG_V1}::referral::Referrer`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.referrer = fields.referrer;
        this.referralCode = fields.referralCode;
        this.config = fields.config;
        this.members = fields.members;
    }

    static reified(): ReferrerReified {
        return {
            typeName: Referrer.$typeName,
            fullTypeName: composeSuiType(Referrer.$typeName, ...[]) as `${typeof PKG_V1}::referral::Referrer`,
            typeArgs: [] as [],
            isPhantom: Referrer.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => Referrer.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => Referrer.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => Referrer.fromBcs(data),
            bcs: Referrer.bcs,
            fromJSONField: (field: any) => Referrer.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => Referrer.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => Referrer.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => Referrer.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => Referrer.fetch(client, id),
            new: (fields: ReferrerFields) => {
                return new Referrer([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return Referrer.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<Referrer>> {
        return phantom(Referrer.reified());
    }
    static get p() {
        return Referrer.phantom();
    }

    static get bcs() {
        return bcs.struct("Referrer", {
            id: UID.bcs,
            referrer: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            referral_code: String.bcs,
            config: bcs.vector(bcs.u64()),
            members: bcs.vector(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) })),
        });
    }

    static fromFields(fields: Record<string, any>): Referrer {
        return Referrer.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            referrer: decodeFromFields("address", fields.referrer),
            referralCode: decodeFromFields(String.reified(), fields.referral_code),
            config: decodeFromFields(reified.vector("u64"), fields.config),
            members: decodeFromFields(reified.vector("address"), fields.members),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): Referrer {
        if (!isReferrer(item.type)) {
            throw new Error("not a Referrer type");
        }

        return Referrer.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            referrer: decodeFromFieldsWithTypes("address", item.fields.referrer),
            referralCode: decodeFromFieldsWithTypes(String.reified(), item.fields.referral_code),
            config: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.config),
            members: decodeFromFieldsWithTypes(reified.vector("address"), item.fields.members),
        });
    }

    static fromBcs(data: Uint8Array): Referrer {
        return Referrer.fromFields(Referrer.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            referrer: this.referrer,
            referralCode: this.referralCode,
            config: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.config),
            members: fieldToJSON<Vector<"address">>(`vector<address>`, this.members),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): Referrer {
        return Referrer.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            referrer: decodeFromJSONField("address", field.referrer),
            referralCode: decodeFromJSONField(String.reified(), field.referralCode),
            config: decodeFromJSONField(reified.vector("u64"), field.config),
            members: decodeFromJSONField(reified.vector("address"), field.members),
        });
    }

    static fromJSON(json: Record<string, any>): Referrer {
        if (json.$typeName !== Referrer.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return Referrer.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): Referrer {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isReferrer(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a Referrer object`);
        }
        return Referrer.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): Referrer {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isReferrer(data.bcs.type)) {
                throw new Error(`object at is not a Referrer object`);
            }

            return Referrer.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return Referrer.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<Referrer> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching Referrer object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isReferrer(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a Referrer object`);
        }

        return Referrer.fromSuiObjectData(res.data);
    }
}

/* ============================== RegisterAsReferrerEvent =============================== */

export function isRegisterAsReferrerEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::referral::RegisterAsReferrerEvent`;
}

export interface RegisterAsReferrerEventFields {
    referralCode: ToField<String>;
    referrerAddress: ToField<"address">;
    config: ToField<Vector<"u64">>;
}

export type RegisterAsReferrerEventReified = Reified<RegisterAsReferrerEvent, RegisterAsReferrerEventFields>;

export class RegisterAsReferrerEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::referral::RegisterAsReferrerEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = RegisterAsReferrerEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::referral::RegisterAsReferrerEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = RegisterAsReferrerEvent.$isPhantom;

    readonly referralCode: ToField<String>;
    readonly referrerAddress: ToField<"address">;
    readonly config: ToField<Vector<"u64">>;

    private constructor(typeArgs: [], fields: RegisterAsReferrerEventFields) {
        this.$fullTypeName = composeSuiType(
            RegisterAsReferrerEvent.$typeName,
            ...typeArgs
        ) as `${typeof PKG_V1}::referral::RegisterAsReferrerEvent`;
        this.$typeArgs = typeArgs;

        this.referralCode = fields.referralCode;
        this.referrerAddress = fields.referrerAddress;
        this.config = fields.config;
    }

    static reified(): RegisterAsReferrerEventReified {
        return {
            typeName: RegisterAsReferrerEvent.$typeName,
            fullTypeName: composeSuiType(RegisterAsReferrerEvent.$typeName, ...[]) as `${typeof PKG_V1}::referral::RegisterAsReferrerEvent`,
            typeArgs: [] as [],
            isPhantom: RegisterAsReferrerEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => RegisterAsReferrerEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => RegisterAsReferrerEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => RegisterAsReferrerEvent.fromBcs(data),
            bcs: RegisterAsReferrerEvent.bcs,
            fromJSONField: (field: any) => RegisterAsReferrerEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => RegisterAsReferrerEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => RegisterAsReferrerEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => RegisterAsReferrerEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => RegisterAsReferrerEvent.fetch(client, id),
            new: (fields: RegisterAsReferrerEventFields) => {
                return new RegisterAsReferrerEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return RegisterAsReferrerEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<RegisterAsReferrerEvent>> {
        return phantom(RegisterAsReferrerEvent.reified());
    }
    static get p() {
        return RegisterAsReferrerEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("RegisterAsReferrerEvent", {
            referral_code: String.bcs,
            referrer_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            config: bcs.vector(bcs.u64()),
        });
    }

    static fromFields(fields: Record<string, any>): RegisterAsReferrerEvent {
        return RegisterAsReferrerEvent.reified().new({
            referralCode: decodeFromFields(String.reified(), fields.referral_code),
            referrerAddress: decodeFromFields("address", fields.referrer_address),
            config: decodeFromFields(reified.vector("u64"), fields.config),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): RegisterAsReferrerEvent {
        if (!isRegisterAsReferrerEvent(item.type)) {
            throw new Error("not a RegisterAsReferrerEvent type");
        }

        return RegisterAsReferrerEvent.reified().new({
            referralCode: decodeFromFieldsWithTypes(String.reified(), item.fields.referral_code),
            referrerAddress: decodeFromFieldsWithTypes("address", item.fields.referrer_address),
            config: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.config),
        });
    }

    static fromBcs(data: Uint8Array): RegisterAsReferrerEvent {
        return RegisterAsReferrerEvent.fromFields(RegisterAsReferrerEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            referralCode: this.referralCode,
            referrerAddress: this.referrerAddress,
            config: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.config),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): RegisterAsReferrerEvent {
        return RegisterAsReferrerEvent.reified().new({
            referralCode: decodeFromJSONField(String.reified(), field.referralCode),
            referrerAddress: decodeFromJSONField("address", field.referrerAddress),
            config: decodeFromJSONField(reified.vector("u64"), field.config),
        });
    }

    static fromJSON(json: Record<string, any>): RegisterAsReferrerEvent {
        if (json.$typeName !== RegisterAsReferrerEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return RegisterAsReferrerEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): RegisterAsReferrerEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isRegisterAsReferrerEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a RegisterAsReferrerEvent object`);
        }
        return RegisterAsReferrerEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): RegisterAsReferrerEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isRegisterAsReferrerEvent(data.bcs.type)) {
                throw new Error(`object at is not a RegisterAsReferrerEvent object`);
            }

            return RegisterAsReferrerEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return RegisterAsReferrerEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<RegisterAsReferrerEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching RegisterAsReferrerEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isRegisterAsReferrerEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a RegisterAsReferrerEvent object`);
        }

        return RegisterAsReferrerEvent.fromSuiObjectData(res.data);
    }
}

/* ============================== RegisterYourReferralEvent =============================== */

export function isRegisterYourReferralEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::referral::RegisterYourReferralEvent`;
}

export interface RegisterYourReferralEventFields {
    sender: ToField<"address">;
    referralCode: ToField<String>;
    referrerAddress: ToField<"address">;
}

export type RegisterYourReferralEventReified = Reified<RegisterYourReferralEvent, RegisterYourReferralEventFields>;

export class RegisterYourReferralEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::referral::RegisterYourReferralEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = RegisterYourReferralEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::referral::RegisterYourReferralEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = RegisterYourReferralEvent.$isPhantom;

    readonly sender: ToField<"address">;
    readonly referralCode: ToField<String>;
    readonly referrerAddress: ToField<"address">;

    private constructor(typeArgs: [], fields: RegisterYourReferralEventFields) {
        this.$fullTypeName = composeSuiType(
            RegisterYourReferralEvent.$typeName,
            ...typeArgs
        ) as `${typeof PKG_V1}::referral::RegisterYourReferralEvent`;
        this.$typeArgs = typeArgs;

        this.sender = fields.sender;
        this.referralCode = fields.referralCode;
        this.referrerAddress = fields.referrerAddress;
    }

    static reified(): RegisterYourReferralEventReified {
        return {
            typeName: RegisterYourReferralEvent.$typeName,
            fullTypeName: composeSuiType(
                RegisterYourReferralEvent.$typeName,
                ...[]
            ) as `${typeof PKG_V1}::referral::RegisterYourReferralEvent`,
            typeArgs: [] as [],
            isPhantom: RegisterYourReferralEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => RegisterYourReferralEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => RegisterYourReferralEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => RegisterYourReferralEvent.fromBcs(data),
            bcs: RegisterYourReferralEvent.bcs,
            fromJSONField: (field: any) => RegisterYourReferralEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => RegisterYourReferralEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => RegisterYourReferralEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => RegisterYourReferralEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => RegisterYourReferralEvent.fetch(client, id),
            new: (fields: RegisterYourReferralEventFields) => {
                return new RegisterYourReferralEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return RegisterYourReferralEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<RegisterYourReferralEvent>> {
        return phantom(RegisterYourReferralEvent.reified());
    }
    static get p() {
        return RegisterYourReferralEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("RegisterYourReferralEvent", {
            sender: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            referral_code: String.bcs,
            referrer_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
        });
    }

    static fromFields(fields: Record<string, any>): RegisterYourReferralEvent {
        return RegisterYourReferralEvent.reified().new({
            sender: decodeFromFields("address", fields.sender),
            referralCode: decodeFromFields(String.reified(), fields.referral_code),
            referrerAddress: decodeFromFields("address", fields.referrer_address),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): RegisterYourReferralEvent {
        if (!isRegisterYourReferralEvent(item.type)) {
            throw new Error("not a RegisterYourReferralEvent type");
        }

        return RegisterYourReferralEvent.reified().new({
            sender: decodeFromFieldsWithTypes("address", item.fields.sender),
            referralCode: decodeFromFieldsWithTypes(String.reified(), item.fields.referral_code),
            referrerAddress: decodeFromFieldsWithTypes("address", item.fields.referrer_address),
        });
    }

    static fromBcs(data: Uint8Array): RegisterYourReferralEvent {
        return RegisterYourReferralEvent.fromFields(RegisterYourReferralEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            sender: this.sender,
            referralCode: this.referralCode,
            referrerAddress: this.referrerAddress,
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): RegisterYourReferralEvent {
        return RegisterYourReferralEvent.reified().new({
            sender: decodeFromJSONField("address", field.sender),
            referralCode: decodeFromJSONField(String.reified(), field.referralCode),
            referrerAddress: decodeFromJSONField("address", field.referrerAddress),
        });
    }

    static fromJSON(json: Record<string, any>): RegisterYourReferralEvent {
        if (json.$typeName !== RegisterYourReferralEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return RegisterYourReferralEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): RegisterYourReferralEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isRegisterYourReferralEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a RegisterYourReferralEvent object`);
        }
        return RegisterYourReferralEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): RegisterYourReferralEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isRegisterYourReferralEvent(data.bcs.type)) {
                throw new Error(`object at is not a RegisterYourReferralEvent object`);
            }

            return RegisterYourReferralEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return RegisterYourReferralEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<RegisterYourReferralEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching RegisterYourReferralEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isRegisterYourReferralEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a RegisterYourReferralEvent object`);
        }

        return RegisterYourReferralEvent.fromSuiObjectData(res.data);
    }
}

/* ============================== UpdateReferralRegistryConfigEvent =============================== */

export function isUpdateReferralRegistryConfigEvent(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::referral::UpdateReferralRegistryConfigEvent`;
}

export interface UpdateReferralRegistryConfigEventFields {
    index: ToField<"u64">;
    log: ToField<Vector<"u64">>;
    bcsPadding: ToField<Vector<Vector<"u8">>>;
}

export type UpdateReferralRegistryConfigEventReified = Reified<UpdateReferralRegistryConfigEvent, UpdateReferralRegistryConfigEventFields>;

export class UpdateReferralRegistryConfigEvent implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::referral::UpdateReferralRegistryConfigEvent`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = UpdateReferralRegistryConfigEvent.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::referral::UpdateReferralRegistryConfigEvent`;
    readonly $typeArgs: [];
    readonly $isPhantom = UpdateReferralRegistryConfigEvent.$isPhantom;

    readonly index: ToField<"u64">;
    readonly log: ToField<Vector<"u64">>;
    readonly bcsPadding: ToField<Vector<Vector<"u8">>>;

    private constructor(typeArgs: [], fields: UpdateReferralRegistryConfigEventFields) {
        this.$fullTypeName = composeSuiType(
            UpdateReferralRegistryConfigEvent.$typeName,
            ...typeArgs
        ) as `${typeof PKG_V1}::referral::UpdateReferralRegistryConfigEvent`;
        this.$typeArgs = typeArgs;

        this.index = fields.index;
        this.log = fields.log;
        this.bcsPadding = fields.bcsPadding;
    }

    static reified(): UpdateReferralRegistryConfigEventReified {
        return {
            typeName: UpdateReferralRegistryConfigEvent.$typeName,
            fullTypeName: composeSuiType(
                UpdateReferralRegistryConfigEvent.$typeName,
                ...[]
            ) as `${typeof PKG_V1}::referral::UpdateReferralRegistryConfigEvent`,
            typeArgs: [] as [],
            isPhantom: UpdateReferralRegistryConfigEvent.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => UpdateReferralRegistryConfigEvent.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateReferralRegistryConfigEvent.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => UpdateReferralRegistryConfigEvent.fromBcs(data),
            bcs: UpdateReferralRegistryConfigEvent.bcs,
            fromJSONField: (field: any) => UpdateReferralRegistryConfigEvent.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => UpdateReferralRegistryConfigEvent.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => UpdateReferralRegistryConfigEvent.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => UpdateReferralRegistryConfigEvent.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => UpdateReferralRegistryConfigEvent.fetch(client, id),
            new: (fields: UpdateReferralRegistryConfigEventFields) => {
                return new UpdateReferralRegistryConfigEvent([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return UpdateReferralRegistryConfigEvent.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<UpdateReferralRegistryConfigEvent>> {
        return phantom(UpdateReferralRegistryConfigEvent.reified());
    }
    static get p() {
        return UpdateReferralRegistryConfigEvent.phantom();
    }

    static get bcs() {
        return bcs.struct("UpdateReferralRegistryConfigEvent", {
            index: bcs.u64(),
            log: bcs.vector(bcs.u64()),
            bcs_padding: bcs.vector(bcs.vector(bcs.u8())),
        });
    }

    static fromFields(fields: Record<string, any>): UpdateReferralRegistryConfigEvent {
        return UpdateReferralRegistryConfigEvent.reified().new({
            index: decodeFromFields("u64", fields.index),
            log: decodeFromFields(reified.vector("u64"), fields.log),
            bcsPadding: decodeFromFields(reified.vector(reified.vector("u8")), fields.bcs_padding),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): UpdateReferralRegistryConfigEvent {
        if (!isUpdateReferralRegistryConfigEvent(item.type)) {
            throw new Error("not a UpdateReferralRegistryConfigEvent type");
        }

        return UpdateReferralRegistryConfigEvent.reified().new({
            index: decodeFromFieldsWithTypes("u64", item.fields.index),
            log: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.log),
            bcsPadding: decodeFromFieldsWithTypes(reified.vector(reified.vector("u8")), item.fields.bcs_padding),
        });
    }

    static fromBcs(data: Uint8Array): UpdateReferralRegistryConfigEvent {
        return UpdateReferralRegistryConfigEvent.fromFields(UpdateReferralRegistryConfigEvent.bcs.parse(data));
    }

    toJSONField() {
        return {
            index: this.index.toString(),
            log: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.log),
            bcsPadding: fieldToJSON<Vector<Vector<"u8">>>(`vector<vector<u8>>`, this.bcsPadding),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): UpdateReferralRegistryConfigEvent {
        return UpdateReferralRegistryConfigEvent.reified().new({
            index: decodeFromJSONField("u64", field.index),
            log: decodeFromJSONField(reified.vector("u64"), field.log),
            bcsPadding: decodeFromJSONField(reified.vector(reified.vector("u8")), field.bcsPadding),
        });
    }

    static fromJSON(json: Record<string, any>): UpdateReferralRegistryConfigEvent {
        if (json.$typeName !== UpdateReferralRegistryConfigEvent.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return UpdateReferralRegistryConfigEvent.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): UpdateReferralRegistryConfigEvent {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isUpdateReferralRegistryConfigEvent(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a UpdateReferralRegistryConfigEvent object`);
        }
        return UpdateReferralRegistryConfigEvent.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): UpdateReferralRegistryConfigEvent {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isUpdateReferralRegistryConfigEvent(data.bcs.type)) {
                throw new Error(`object at is not a UpdateReferralRegistryConfigEvent object`);
            }

            return UpdateReferralRegistryConfigEvent.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return UpdateReferralRegistryConfigEvent.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<UpdateReferralRegistryConfigEvent> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching UpdateReferralRegistryConfigEvent object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isUpdateReferralRegistryConfigEvent(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a UpdateReferralRegistryConfigEvent object`);
        }

        return UpdateReferralRegistryConfigEvent.fromSuiObjectData(res.data);
    }
}
