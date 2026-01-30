import { graphql } from "@mysten/sui/graphql/schemas/latest";
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
import { createPythClient, PythClient, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

export type Network = "MAINNET" | "TESTNET";

export class TypusClient {
    jsonRpcClient: SuiClient;
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

        this.jsonRpcClient = new SuiClient({
            network: network,
            url: config.rpcEndpoint,
            mvr,
        });

        this.gRpcClient = new SuiGrpcClient({
            network: network,
            transport:
                grpcTransport ??
                new GrpcWebFetchTransport({
                    baseUrl: `https://fullnode.${network}.sui.io:443`,
                    // Additional transport options
                }),
        });

        this.graphQLClient = new SuiGraphQLClient({
            network: network,
            url: `https://graphql.${network}.sui.io/graphql`,
            mvr,
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
        // this.gRpcClient.transactionExecutionService.simulateTransaction({ transaction: { bcs: { value: params.transactionBlock } } });

        return this.jsonRpcClient.devInspectTransactionBlock(params);
    }
    executeTransactionBlock(params: ExecuteTransactionBlockParams) {
        // this.gRpcClient.transactionExecutionService.executeTransaction({
        //     transaction: { bcs: { value: params.transactionBlock } },
        //     signatures,
        // });

        // this.gRpcClient.transactionExecutionService.executeTransaction({
        //     transaction: {
        //         bcs: {
        //             value: transactionBytes,
        //         },
        //     },
        //     signatures: signatures.map((sig) => ({
        //         bcs: { value: fromBase64(sig) },
        //         signature: { oneofKind: undefined },
        //     })),
        // });

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

    simulateTransaction(transactionBcs: Uint8Array<ArrayBufferLike>) {
        return this.gRpcClient.core.dryRunTransaction({ transaction: transactionBcs });
        // return this.gRpcClient.transactionExecutionService.simulateTransaction({
        //     transaction: { bcs: { value: transactionBcs } },
        //     // checks: 1,
        // });
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
