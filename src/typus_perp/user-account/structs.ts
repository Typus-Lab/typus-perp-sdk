import * as reified from "../../_framework/reified";
import { TypeName } from "../../_dependencies/source/0x1/type-name/structs";
import { ID, UID } from "../../_dependencies/source/0x2/object/structs";
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

/* ============================== UserAccount =============================== */

export function isUserAccount(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::user_account::UserAccount`;
}

export interface UserAccountFields {
    id: ToField<UID>;
    owner: ToField<"address">;
    delegateUser: ToField<Vector<"address">>;
    symbols: ToField<Vector<TypeName>>;
    u64Padding: ToField<Vector<"u64">>;
}

export type UserAccountReified = Reified<UserAccount, UserAccountFields>;

export class UserAccount implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::user_account::UserAccount`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = UserAccount.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::user_account::UserAccount`;
    readonly $typeArgs: [];
    readonly $isPhantom = UserAccount.$isPhantom;

    readonly id: ToField<UID>;
    readonly owner: ToField<"address">;
    readonly delegateUser: ToField<Vector<"address">>;
    readonly symbols: ToField<Vector<TypeName>>;
    readonly u64Padding: ToField<Vector<"u64">>;

    private constructor(typeArgs: [], fields: UserAccountFields) {
        this.$fullTypeName = composeSuiType(UserAccount.$typeName, ...typeArgs) as `${typeof PKG_V1}::user_account::UserAccount`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.owner = fields.owner;
        this.delegateUser = fields.delegateUser;
        this.symbols = fields.symbols;
        this.u64Padding = fields.u64Padding;
    }

    static reified(): UserAccountReified {
        return {
            typeName: UserAccount.$typeName,
            fullTypeName: composeSuiType(UserAccount.$typeName, ...[]) as `${typeof PKG_V1}::user_account::UserAccount`,
            typeArgs: [] as [],
            isPhantom: UserAccount.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => UserAccount.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => UserAccount.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => UserAccount.fromBcs(data),
            bcs: UserAccount.bcs,
            fromJSONField: (field: any) => UserAccount.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => UserAccount.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => UserAccount.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => UserAccount.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => UserAccount.fetch(client, id),
            new: (fields: UserAccountFields) => {
                return new UserAccount([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return UserAccount.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<UserAccount>> {
        return phantom(UserAccount.reified());
    }
    static get p() {
        return UserAccount.phantom();
    }

    static get bcs() {
        return bcs.struct("UserAccount", {
            id: UID.bcs,
            owner: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            delegate_user: bcs.vector(
                bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) })
            ),
            symbols: bcs.vector(TypeName.bcs),
            u64_padding: bcs.vector(bcs.u64()),
        });
    }

    static fromFields(fields: Record<string, any>): UserAccount {
        return UserAccount.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            owner: decodeFromFields("address", fields.owner),
            delegateUser: decodeFromFields(reified.vector("address"), fields.delegate_user),
            symbols: decodeFromFields(reified.vector(TypeName.reified()), fields.symbols),
            u64Padding: decodeFromFields(reified.vector("u64"), fields.u64_padding),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): UserAccount {
        if (!isUserAccount(item.type)) {
            throw new Error("not a UserAccount type");
        }

        return UserAccount.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            owner: decodeFromFieldsWithTypes("address", item.fields.owner),
            delegateUser: decodeFromFieldsWithTypes(reified.vector("address"), item.fields.delegate_user),
            symbols: decodeFromFieldsWithTypes(reified.vector(TypeName.reified()), item.fields.symbols),
            u64Padding: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.u64_padding),
        });
    }

    static fromBcs(data: Uint8Array): UserAccount {
        return UserAccount.fromFields(UserAccount.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            owner: this.owner,
            delegateUser: fieldToJSON<Vector<"address">>(`vector<address>`, this.delegateUser),
            symbols: fieldToJSON<Vector<TypeName>>(`vector<${TypeName.$typeName}>`, this.symbols),
            u64Padding: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.u64Padding),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): UserAccount {
        return UserAccount.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            owner: decodeFromJSONField("address", field.owner),
            delegateUser: decodeFromJSONField(reified.vector("address"), field.delegateUser),
            symbols: decodeFromJSONField(reified.vector(TypeName.reified()), field.symbols),
            u64Padding: decodeFromJSONField(reified.vector("u64"), field.u64Padding),
        });
    }

    static fromJSON(json: Record<string, any>): UserAccount {
        if (json.$typeName !== UserAccount.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return UserAccount.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): UserAccount {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isUserAccount(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a UserAccount object`);
        }
        return UserAccount.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): UserAccount {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isUserAccount(data.bcs.type)) {
                throw new Error(`object at is not a UserAccount object`);
            }

            return UserAccount.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return UserAccount.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<UserAccount> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching UserAccount object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isUserAccount(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a UserAccount object`);
        }

        return UserAccount.fromSuiObjectData(res.data);
    }
}

/* ============================== UserAccountCap =============================== */

export function isUserAccountCap(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::user_account::UserAccountCap`;
}

export interface UserAccountCapFields {
    id: ToField<UID>;
    owner: ToField<"address">;
    userAccountId: ToField<ID>;
}

export type UserAccountCapReified = Reified<UserAccountCap, UserAccountCapFields>;

export class UserAccountCap implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::user_account::UserAccountCap`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = UserAccountCap.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::user_account::UserAccountCap`;
    readonly $typeArgs: [];
    readonly $isPhantom = UserAccountCap.$isPhantom;

    readonly id: ToField<UID>;
    readonly owner: ToField<"address">;
    readonly userAccountId: ToField<ID>;

    private constructor(typeArgs: [], fields: UserAccountCapFields) {
        this.$fullTypeName = composeSuiType(UserAccountCap.$typeName, ...typeArgs) as `${typeof PKG_V1}::user_account::UserAccountCap`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.owner = fields.owner;
        this.userAccountId = fields.userAccountId;
    }

    static reified(): UserAccountCapReified {
        return {
            typeName: UserAccountCap.$typeName,
            fullTypeName: composeSuiType(UserAccountCap.$typeName, ...[]) as `${typeof PKG_V1}::user_account::UserAccountCap`,
            typeArgs: [] as [],
            isPhantom: UserAccountCap.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => UserAccountCap.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => UserAccountCap.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => UserAccountCap.fromBcs(data),
            bcs: UserAccountCap.bcs,
            fromJSONField: (field: any) => UserAccountCap.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => UserAccountCap.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => UserAccountCap.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => UserAccountCap.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => UserAccountCap.fetch(client, id),
            new: (fields: UserAccountCapFields) => {
                return new UserAccountCap([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return UserAccountCap.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<UserAccountCap>> {
        return phantom(UserAccountCap.reified());
    }
    static get p() {
        return UserAccountCap.phantom();
    }

    static get bcs() {
        return bcs.struct("UserAccountCap", {
            id: UID.bcs,
            owner: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val) }),
            user_account_id: ID.bcs,
        });
    }

    static fromFields(fields: Record<string, any>): UserAccountCap {
        return UserAccountCap.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            owner: decodeFromFields("address", fields.owner),
            userAccountId: decodeFromFields(ID.reified(), fields.user_account_id),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): UserAccountCap {
        if (!isUserAccountCap(item.type)) {
            throw new Error("not a UserAccountCap type");
        }

        return UserAccountCap.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            owner: decodeFromFieldsWithTypes("address", item.fields.owner),
            userAccountId: decodeFromFieldsWithTypes(ID.reified(), item.fields.user_account_id),
        });
    }

    static fromBcs(data: Uint8Array): UserAccountCap {
        return UserAccountCap.fromFields(UserAccountCap.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            owner: this.owner,
            userAccountId: this.userAccountId,
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): UserAccountCap {
        return UserAccountCap.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            owner: decodeFromJSONField("address", field.owner),
            userAccountId: decodeFromJSONField(ID.reified(), field.userAccountId),
        });
    }

    static fromJSON(json: Record<string, any>): UserAccountCap {
        if (json.$typeName !== UserAccountCap.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return UserAccountCap.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): UserAccountCap {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isUserAccountCap(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a UserAccountCap object`);
        }
        return UserAccountCap.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): UserAccountCap {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isUserAccountCap(data.bcs.type)) {
                throw new Error(`object at is not a UserAccountCap object`);
            }

            return UserAccountCap.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return UserAccountCap.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<UserAccountCap> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching UserAccountCap object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isUserAccountCap(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a UserAccountCap object`);
        }

        return UserAccountCap.fromSuiObjectData(res.data);
    }
}
