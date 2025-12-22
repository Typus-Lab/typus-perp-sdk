import { TypeName } from "../../_dependencies/source/0x1/type-name/structs";
import {
    PhantomReified,
    Reified,
    StructClass,
    ToField,
    ToTypeStr,
    decodeFromFields,
    decodeFromFieldsWithTypes,
    decodeFromJSONField,
    phantom,
} from "../../_framework/reified";
import { FieldsWithTypes, composeSuiType, compressSuiType } from "../../_framework/util";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64 } from "@mysten/sui/utils";

/* ============================== UserProfit =============================== */

export function isUserProfit(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::profit_vault::UserProfit`;
}

export interface UserProfitFields {
    collateralToken: ToField<TypeName>;
    baseToken: ToField<TypeName>;
    positionId: ToField<"u64">;
    orderId: ToField<"u64">;
    amount: ToField<"u64">;
    createTsMs: ToField<"u64">;
}

export type UserProfitReified = Reified<UserProfit, UserProfitFields>;

export class UserProfit implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::profit_vault::UserProfit`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = UserProfit.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::profit_vault::UserProfit`;
    readonly $typeArgs: [];
    readonly $isPhantom = UserProfit.$isPhantom;

    readonly collateralToken: ToField<TypeName>;
    readonly baseToken: ToField<TypeName>;
    readonly positionId: ToField<"u64">;
    readonly orderId: ToField<"u64">;
    readonly amount: ToField<"u64">;
    readonly createTsMs: ToField<"u64">;

    private constructor(typeArgs: [], fields: UserProfitFields) {
        this.$fullTypeName = composeSuiType(UserProfit.$typeName, ...typeArgs) as `${typeof PKG_V1}::profit_vault::UserProfit`;
        this.$typeArgs = typeArgs;

        this.collateralToken = fields.collateralToken;
        this.baseToken = fields.baseToken;
        this.positionId = fields.positionId;
        this.orderId = fields.orderId;
        this.amount = fields.amount;
        this.createTsMs = fields.createTsMs;
    }

    static reified(): UserProfitReified {
        return {
            typeName: UserProfit.$typeName,
            fullTypeName: composeSuiType(UserProfit.$typeName, ...[]) as `${typeof PKG_V1}::profit_vault::UserProfit`,
            typeArgs: [] as [],
            isPhantom: UserProfit.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => UserProfit.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => UserProfit.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => UserProfit.fromBcs(data),
            bcs: UserProfit.bcs,
            fromJSONField: (field: any) => UserProfit.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => UserProfit.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => UserProfit.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => UserProfit.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => UserProfit.fetch(client, id),
            new: (fields: UserProfitFields) => {
                return new UserProfit([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return UserProfit.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<UserProfit>> {
        return phantom(UserProfit.reified());
    }
    static get p() {
        return UserProfit.phantom();
    }

    static get bcs() {
        return bcs.struct("UserProfit", {
            collateral_token: TypeName.bcs,
            base_token: TypeName.bcs,
            position_id: bcs.u64(),
            order_id: bcs.u64(),
            amount: bcs.u64(),
            create_ts_ms: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): UserProfit {
        return UserProfit.reified().new({
            collateralToken: decodeFromFields(TypeName.reified(), fields.collateral_token),
            baseToken: decodeFromFields(TypeName.reified(), fields.base_token),
            positionId: decodeFromFields("u64", fields.position_id),
            orderId: decodeFromFields("u64", fields.order_id),
            amount: decodeFromFields("u64", fields.amount),
            createTsMs: decodeFromFields("u64", fields.create_ts_ms),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): UserProfit {
        if (!isUserProfit(item.type)) {
            throw new Error("not a UserProfit type");
        }

        return UserProfit.reified().new({
            collateralToken: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.collateral_token),
            baseToken: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.base_token),
            positionId: decodeFromFieldsWithTypes("u64", item.fields.position_id),
            orderId: decodeFromFieldsWithTypes("u64", item.fields.order_id),
            amount: decodeFromFieldsWithTypes("u64", item.fields.amount),
            createTsMs: decodeFromFieldsWithTypes("u64", item.fields.create_ts_ms),
        });
    }

    static fromBcs(data: Uint8Array): UserProfit {
        return UserProfit.fromFields(UserProfit.bcs.parse(data));
    }

    toJSONField() {
        return {
            collateralToken: this.collateralToken.toJSONField(),
            baseToken: this.baseToken.toJSONField(),
            positionId: this.positionId.toString(),
            orderId: this.orderId.toString(),
            amount: this.amount.toString(),
            createTsMs: this.createTsMs.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): UserProfit {
        return UserProfit.reified().new({
            collateralToken: decodeFromJSONField(TypeName.reified(), field.collateralToken),
            baseToken: decodeFromJSONField(TypeName.reified(), field.baseToken),
            positionId: decodeFromJSONField("u64", field.positionId),
            orderId: decodeFromJSONField("u64", field.orderId),
            amount: decodeFromJSONField("u64", field.amount),
            createTsMs: decodeFromJSONField("u64", field.createTsMs),
        });
    }

    static fromJSON(json: Record<string, any>): UserProfit {
        if (json.$typeName !== UserProfit.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return UserProfit.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): UserProfit {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isUserProfit(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a UserProfit object`);
        }
        return UserProfit.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): UserProfit {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isUserProfit(data.bcs.type)) {
                throw new Error(`object at is not a UserProfit object`);
            }

            return UserProfit.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return UserProfit.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<UserProfit> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching UserProfit object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isUserProfit(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a UserProfit object`);
        }

        return UserProfit.fromSuiObjectData(res.data);
    }
}

/* ============================== LockedUserProfit =============================== */

export function isLockedUserProfit(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::profit_vault::LockedUserProfit`;
}

export interface LockedUserProfitFields {
    userProfit: ToField<UserProfit>;
    createTsMs: ToField<"u64">;
}

export type LockedUserProfitReified = Reified<LockedUserProfit, LockedUserProfitFields>;

export class LockedUserProfit implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::profit_vault::LockedUserProfit`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = LockedUserProfit.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::profit_vault::LockedUserProfit`;
    readonly $typeArgs: [];
    readonly $isPhantom = LockedUserProfit.$isPhantom;

    readonly userProfit: ToField<UserProfit>;
    readonly createTsMs: ToField<"u64">;

    private constructor(typeArgs: [], fields: LockedUserProfitFields) {
        this.$fullTypeName = composeSuiType(LockedUserProfit.$typeName, ...typeArgs) as `${typeof PKG_V1}::profit_vault::LockedUserProfit`;
        this.$typeArgs = typeArgs;

        this.userProfit = fields.userProfit;
        this.createTsMs = fields.createTsMs;
    }

    static reified(): LockedUserProfitReified {
        return {
            typeName: LockedUserProfit.$typeName,
            fullTypeName: composeSuiType(LockedUserProfit.$typeName, ...[]) as `${typeof PKG_V1}::profit_vault::LockedUserProfit`,
            typeArgs: [] as [],
            isPhantom: LockedUserProfit.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => LockedUserProfit.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => LockedUserProfit.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => LockedUserProfit.fromBcs(data),
            bcs: LockedUserProfit.bcs,
            fromJSONField: (field: any) => LockedUserProfit.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => LockedUserProfit.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => LockedUserProfit.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => LockedUserProfit.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => LockedUserProfit.fetch(client, id),
            new: (fields: LockedUserProfitFields) => {
                return new LockedUserProfit([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return LockedUserProfit.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<LockedUserProfit>> {
        return phantom(LockedUserProfit.reified());
    }
    static get p() {
        return LockedUserProfit.phantom();
    }

    static get bcs() {
        return bcs.struct("LockedUserProfit", {
            user_profit: UserProfit.bcs,
            create_ts_ms: bcs.u64(),
        });
    }

    static fromFields(fields: Record<string, any>): LockedUserProfit {
        return LockedUserProfit.reified().new({
            userProfit: decodeFromFields(UserProfit.reified(), fields.user_profit),
            createTsMs: decodeFromFields("u64", fields.create_ts_ms),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): LockedUserProfit {
        if (!isLockedUserProfit(item.type)) {
            throw new Error("not a LockedUserProfit type");
        }

        return LockedUserProfit.reified().new({
            userProfit: decodeFromFieldsWithTypes(UserProfit.reified(), item.fields.user_profit),
            createTsMs: decodeFromFieldsWithTypes("u64", item.fields.create_ts_ms),
        });
    }

    static fromBcs(data: Uint8Array): LockedUserProfit {
        return LockedUserProfit.fromFields(LockedUserProfit.bcs.parse(data));
    }

    toJSONField() {
        return {
            userProfit: this.userProfit.toJSONField(),
            createTsMs: this.createTsMs.toString(),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): LockedUserProfit {
        return LockedUserProfit.reified().new({
            userProfit: decodeFromJSONField(UserProfit.reified(), field.userProfit),
            createTsMs: decodeFromJSONField("u64", field.createTsMs),
        });
    }

    static fromJSON(json: Record<string, any>): LockedUserProfit {
        if (json.$typeName !== LockedUserProfit.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return LockedUserProfit.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): LockedUserProfit {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isLockedUserProfit(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a LockedUserProfit object`);
        }
        return LockedUserProfit.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): LockedUserProfit {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isLockedUserProfit(data.bcs.type)) {
                throw new Error(`object at is not a LockedUserProfit object`);
            }

            return LockedUserProfit.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return LockedUserProfit.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<LockedUserProfit> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching LockedUserProfit object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isLockedUserProfit(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a LockedUserProfit object`);
        }

        return LockedUserProfit.fromSuiObjectData(res.data);
    }
}
