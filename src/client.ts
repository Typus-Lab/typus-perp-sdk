import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { SuiClient } from "@mysten/sui/client";
import { createPythClient, PythClient, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import type { Experimental_SuiClientTypes } from "@mysten/sui/experimental";

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

        this.jsonRpcClient = new SuiClient({ network: network, url: config.rpcEndpoint });

        this.gRpcClient = new SuiGrpcClient({
            network: network,
            baseUrl: `https://fullnode.${network}.sui.io:443`,
        });
        this.graphQLClient = new SuiGraphQLClient({
            url: `https://graphql.${network}.sui.io/graphql`,
        });

        this.pythClient = createPythClient(this.jsonRpcClient, this.config.network);
    }
}
