import * as reified from "../../_framework/reified";
import { String } from "../../_dependencies/source/0x1/ascii/structs";
import { UID } from "../../_dependencies/source/0x2/object/structs";
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
import { fromB64 } from "@mysten/sui/utils";

/* ============================== CompetitionConfig =============================== */

export function isCompetitionConfig(type: string): boolean {
    type = compressSuiType(type);
    return type === `${PKG_V1}::competition::CompetitionConfig`;
}

export interface CompetitionConfigFields {
    id: ToField<UID>;
    boostBp: ToField<Vector<"u64">>;
    isActive: ToField<"bool">;
    programName: ToField<String>;
    u64Padding: ToField<Vector<"u64">>;
}

export type CompetitionConfigReified = Reified<CompetitionConfig, CompetitionConfigFields>;

export class CompetitionConfig implements StructClass {
    __StructClass = true as const;

    static readonly $typeName = `${PKG_V1}::competition::CompetitionConfig`;
    static readonly $numTypeParams = 0;
    static readonly $isPhantom = [] as const;

    readonly $typeName = CompetitionConfig.$typeName;
    readonly $fullTypeName: `${typeof PKG_V1}::competition::CompetitionConfig`;
    readonly $typeArgs: [];
    readonly $isPhantom = CompetitionConfig.$isPhantom;

    readonly id: ToField<UID>;
    readonly boostBp: ToField<Vector<"u64">>;
    readonly isActive: ToField<"bool">;
    readonly programName: ToField<String>;
    readonly u64Padding: ToField<Vector<"u64">>;

    private constructor(typeArgs: [], fields: CompetitionConfigFields) {
        this.$fullTypeName = composeSuiType(CompetitionConfig.$typeName, ...typeArgs) as `${typeof PKG_V1}::competition::CompetitionConfig`;
        this.$typeArgs = typeArgs;

        this.id = fields.id;
        this.boostBp = fields.boostBp;
        this.isActive = fields.isActive;
        this.programName = fields.programName;
        this.u64Padding = fields.u64Padding;
    }

    static reified(): CompetitionConfigReified {
        return {
            typeName: CompetitionConfig.$typeName,
            fullTypeName: composeSuiType(CompetitionConfig.$typeName, ...[]) as `${typeof PKG_V1}::competition::CompetitionConfig`,
            typeArgs: [] as [],
            isPhantom: CompetitionConfig.$isPhantom,
            reifiedTypeArgs: [],
            fromFields: (fields: Record<string, any>) => CompetitionConfig.fromFields(fields),
            fromFieldsWithTypes: (item: FieldsWithTypes) => CompetitionConfig.fromFieldsWithTypes(item),
            fromBcs: (data: Uint8Array) => CompetitionConfig.fromBcs(data),
            bcs: CompetitionConfig.bcs,
            fromJSONField: (field: any) => CompetitionConfig.fromJSONField(field),
            fromJSON: (json: Record<string, any>) => CompetitionConfig.fromJSON(json),
            fromSuiParsedData: (content: SuiParsedData) => CompetitionConfig.fromSuiParsedData(content),
            fromSuiObjectData: (content: SuiObjectData) => CompetitionConfig.fromSuiObjectData(content),
            fetch: async (client: SuiClient, id: string) => CompetitionConfig.fetch(client, id),
            new: (fields: CompetitionConfigFields) => {
                return new CompetitionConfig([], fields);
            },
            kind: "StructClassReified",
        };
    }

    static get r() {
        return CompetitionConfig.reified();
    }

    static phantom(): PhantomReified<ToTypeStr<CompetitionConfig>> {
        return phantom(CompetitionConfig.reified());
    }
    static get p() {
        return CompetitionConfig.phantom();
    }

    static get bcs() {
        return bcs.struct("CompetitionConfig", {
            id: UID.bcs,
            boost_bp: bcs.vector(bcs.u64()),
            is_active: bcs.bool(),
            program_name: String.bcs,
            u64_padding: bcs.vector(bcs.u64()),
        });
    }

    static fromFields(fields: Record<string, any>): CompetitionConfig {
        return CompetitionConfig.reified().new({
            id: decodeFromFields(UID.reified(), fields.id),
            boostBp: decodeFromFields(reified.vector("u64"), fields.boost_bp),
            isActive: decodeFromFields("bool", fields.is_active),
            programName: decodeFromFields(String.reified(), fields.program_name),
            u64Padding: decodeFromFields(reified.vector("u64"), fields.u64_padding),
        });
    }

    static fromFieldsWithTypes(item: FieldsWithTypes): CompetitionConfig {
        if (!isCompetitionConfig(item.type)) {
            throw new Error("not a CompetitionConfig type");
        }

        return CompetitionConfig.reified().new({
            id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
            boostBp: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.boost_bp),
            isActive: decodeFromFieldsWithTypes("bool", item.fields.is_active),
            programName: decodeFromFieldsWithTypes(String.reified(), item.fields.program_name),
            u64Padding: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.u64_padding),
        });
    }

    static fromBcs(data: Uint8Array): CompetitionConfig {
        return CompetitionConfig.fromFields(CompetitionConfig.bcs.parse(data));
    }

    toJSONField() {
        return {
            id: this.id,
            boostBp: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.boostBp),
            isActive: this.isActive,
            programName: this.programName,
            u64Padding: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.u64Padding),
        };
    }

    toJSON() {
        return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() };
    }

    static fromJSONField(field: any): CompetitionConfig {
        return CompetitionConfig.reified().new({
            id: decodeFromJSONField(UID.reified(), field.id),
            boostBp: decodeFromJSONField(reified.vector("u64"), field.boostBp),
            isActive: decodeFromJSONField("bool", field.isActive),
            programName: decodeFromJSONField(String.reified(), field.programName),
            u64Padding: decodeFromJSONField(reified.vector("u64"), field.u64Padding),
        });
    }

    static fromJSON(json: Record<string, any>): CompetitionConfig {
        if (json.$typeName !== CompetitionConfig.$typeName) {
            throw new Error("not a WithTwoGenerics json object");
        }

        return CompetitionConfig.fromJSONField(json);
    }

    static fromSuiParsedData(content: SuiParsedData): CompetitionConfig {
        if (content.dataType !== "moveObject") {
            throw new Error("not an object");
        }
        if (!isCompetitionConfig(content.type)) {
            throw new Error(`object at ${(content.fields as any).id} is not a CompetitionConfig object`);
        }
        return CompetitionConfig.fromFieldsWithTypes(content);
    }

    static fromSuiObjectData(data: SuiObjectData): CompetitionConfig {
        if (data.bcs) {
            if (data.bcs.dataType !== "moveObject" || !isCompetitionConfig(data.bcs.type)) {
                throw new Error(`object at is not a CompetitionConfig object`);
            }

            return CompetitionConfig.fromBcs(fromB64(data.bcs.bcsBytes));
        }
        if (data.content) {
            return CompetitionConfig.fromSuiParsedData(data.content);
        }
        throw new Error("Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.");
    }

    static async fetch(client: SuiClient, id: string): Promise<CompetitionConfig> {
        const res = await client.getObject({ id, options: { showBcs: true } });
        if (res.error) {
            throw new Error(`error fetching CompetitionConfig object at id ${id}: ${res.error.code}`);
        }
        if (res.data?.bcs?.dataType !== "moveObject" || !isCompetitionConfig(res.data.bcs.type)) {
            throw new Error(`object at id ${id} is not a CompetitionConfig object`);
        }

        return CompetitionConfig.fromSuiObjectData(res.data);
    }
}
