import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import {
    DevInspectTransactionBlockParams,
    ExecuteTransactionBlockParams,
    GetCoinsParams,
    GetDynamicFieldsParams,
    GetObjectParams,
    GetOwnedObjectsParams,
    MultiGetObjectsParams,
    QueryEventsParams,
    SuiClient,
} from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { createPythClient, PythClient, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import type { Experimental_SuiClientTypes } from "@mysten/sui/experimental";
import { PERP_PUBLISHED_AT, STAKE_PUBLISHED_AT } from "src";

export type Network = "MAINNET" | "TESTNET";

export class TypusClient {
    jsonRpcClient: SuiClient;
    gRpcClient: SuiGrpcClient;
    graphQLClient: SuiGraphQLClient;
    pythClient: PythClient;
    config: TypusConfig;
    // user: string;

    constructor(config: TypusConfig, mvr?: Experimental_SuiClientTypes.MvrOptions) {
        this.config = config;
        const network = config.network.toLowerCase();

        this.jsonRpcClient = new SuiClient({
            network: network,
            url: config.rpcEndpoint,
            mvr: {
                overrides: {
                    packages: {
                        "@typus/perp": PERP_PUBLISHED_AT,
                        "@typus/stake-pool": STAKE_PUBLISHED_AT,
                    },
                },
            },
        });

        this.gRpcClient = new SuiGrpcClient({
            network: network,
            baseUrl: `https://fullnode.${network}.sui.io:443`,
        });
        this.graphQLClient = new SuiGraphQLClient({
            url: `https://graphql.${network}.sui.io/graphql`,
        });

        this.pythClient = createPythClient(this.jsonRpcClient, this.config.network);
    }

    getCoins(params: GetCoinsParams) {
        return this.jsonRpcClient.getCoins(params);
    }
    getObject(params: GetObjectParams) {
        return this.jsonRpcClient.getObject(params);
    }
    getOwnedObjects(params: GetOwnedObjectsParams) {
        return this.jsonRpcClient.getOwnedObjects(params);
    }
    getDynamicFields(params: GetDynamicFieldsParams) {
        return this.jsonRpcClient.getDynamicFields(params);
    }
    multiGetObjects(params: MultiGetObjectsParams) {
        return this.jsonRpcClient.multiGetObjects(params);
    }
    devInspectTransactionBlock(params: DevInspectTransactionBlockParams) {
        return this.jsonRpcClient.devInspectTransactionBlock(params);
    }
    executeTransactionBlock(params: ExecuteTransactionBlockParams) {
        return this.jsonRpcClient.executeTransactionBlock(params);
    }
    signAndExecuteTransaction(params) {
        return this.jsonRpcClient.signAndExecuteTransaction(params);
    }
    queryEvents(params: QueryEventsParams) {
        return this.jsonRpcClient.queryEvents(params);
    }

    // gRPC
    async getObjectBcs(objectId: string): Promise<Uint8Array<ArrayBufferLike> | undefined> {
        const x = await this.gRpcClient.ledgerService.getObject({ objectId, readMask: { paths: ["contents"] } });
        return x.response.object?.contents?.value;
    }

    async batchGetObjectsBcs(objectIds: string[]): Promise<(Uint8Array<ArrayBufferLike> | undefined)[]> {
        let requests = objectIds.map((objectId) => {
            return {
                objectId: objectId,
            };
        });
        const x = await this.gRpcClient.ledgerService.batchGetObjects({
            requests,
            readMask: { paths: ["contents"] },
        });
        return x.response.objects.map((x_1) => {
            if (x_1.result.oneofKind === "object") {
                return x_1.result.object.contents?.value;
            } else if (x_1.result.oneofKind === "error") {
                console.error(x_1.result.error);
            } else {
                console.warn("undefined case");
            }
        });
    }

    async getDynamicFieldsBcs(parent: string) {
        const x = await this.gRpcClient.stateService.listDynamicFields({ parent, readMask: { paths: ["field_object"] } });
        return x.response.dynamicFields.map((x_1) => {
            // console.log(x_1.fieldObject?.contents?.value!);
            return x_1.fieldObject?.contents?.value!;
        });
    }

    async getDynamicObjectFieldsBcs(parent: string) {
        const x = await this.gRpcClient.stateService.listDynamicFields({ parent, readMask: { paths: ["child_object"] } });
        return x.response.dynamicFields.map((x_1) => {
            // console.log(x_1.childObject?.contents?.value!);
            return x_1.childObject?.contents?.value!;
        });
    }
}
