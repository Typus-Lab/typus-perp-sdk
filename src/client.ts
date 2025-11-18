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
}
