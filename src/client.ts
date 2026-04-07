import { graphql } from "@mysten/sui/graphql/schema";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { createPythClient, PythClient, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { SuiClientTypes } from "@mysten/sui/client";

export type Network = "MAINNET" | "TESTNET";

export class TypusClient {
    jsonRpcClient: SuiJsonRpcClient;
    gRpcClient: SuiGrpcClient;
    graphQLClient: SuiGraphQLClient;
    pythClient: PythClient;
    config: TypusConfig;
    // user: string;

    // mvr?: Experimental_SuiClientTypes.MvrOptions
    constructor(config: TypusConfig, grpcTransport?: RpcTransport) {
        this.config = config;
        const network = config.network.toLowerCase();

        const mvr = {
            overrides: {
                packages: {
                    "@typus/perp": config.package.perp.perp,
                    "@typus/stake-pool": config.package.perp.stakePool,
                },
                // types: {
                //     "@typus/perp": PERP_PACKAGE_ID,
                //     "@typus/stake-pool": STAKE_PACKAGE_ID,
                // },
            },
        };

        this.jsonRpcClient = new SuiJsonRpcClient({
            network: network,
            url: config.rpcEndpoint,
            mvr,
        });

        this.gRpcClient = new SuiGrpcClient({
            network: network,
            baseUrl: `https://fullnode.${network}.sui.io:443`,
            mvr,
        });

        this.graphQLClient = new SuiGraphQLClient({
            network: network,
            url: `https://graphql.${network}.sui.io/graphql`,
            mvr,
        });

        this.pythClient = createPythClient(this.jsonRpcClient, this.config.network);
    }

    getCoins(params: SuiClientTypes.ListCoinsOptions) {
        return this.gRpcClient.listCoins(params);
    }
    getObject(params: SuiClientTypes.GetObjectOptions) {
        return this.gRpcClient.getObject(params);
    }
    getOwnedObjects(params: SuiClientTypes.ListOwnedObjectsOptions) {
        return this.gRpcClient.listOwnedObjects(params);
    }
    getDynamicFields(params: SuiClientTypes.ListDynamicFieldsOptions): Promise<SuiClientTypes.ListDynamicFieldsResponse> {
        return this.gRpcClient.listDynamicFields(params);
    }
    multiGetObjects(params: SuiClientTypes.GetObjectsOptions) {
        return this.gRpcClient.getObjects(params);
    }
    devInspectTransactionBlock(params: SuiClientTypes.SimulateTransactionOptions) {
        params.checksEnabled = false;
        params.include = { commandResults: true };
        return this.gRpcClient.simulateTransaction(params);
    }
    executeTransactionBlock(params: SuiClientTypes.ExecuteTransactionOptions) {
        return this.gRpcClient.executeTransaction(params);
    }
    signAndExecuteTransaction(params) {
        return this.gRpcClient.signAndExecuteTransaction(params);
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

const dynamicFieldsQuery = graphql(`
    query ($id: SuiAddress!) {
        address(address: $id) {
            dynamicFields {
                nodes {
                    name {
                        ...Value
                    }
                    value {
                        __typename
                        ... on MoveValue {
                            ...Value
                        }
                        ... on MoveObject {
                            contents {
                                ...Value
                            }
                        }
                    }
                }
            }
        }
    }

    fragment Value on MoveValue {
        type {
            repr
        }
        json
    }
`);
