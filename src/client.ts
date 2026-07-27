import { graphql } from "@mysten/sui/graphql/schema";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { SuiGrpcClient } from "@mysten/sui/grpc";
import { PythLazerSuiClient, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { PythLazerClient } from "@pythnetwork/pyth-lazer-sdk";
import { JsonRpcHTTPTransport, SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { SuiClientTypes } from "@mysten/sui/client";
import {
    DOV_SINGLE_REGISTRY,
    ORACLE_PACKAGE_ID,
    ORACLE_V2_ID,
    PERP_PACKAGE_ID,
    PYTH_LAZER_PACKAGE_ID,
    PYTH_LAZER_STATE_ID,
    STAKE_PACKAGE_ID,
} from ".";

export type Network = "MAINNET" | "TESTNET";

export class TypusClient {
    gRpcClient: SuiGrpcClient;
    graphQLClient: SuiGraphQLClient;
    pythClient: PythLazerSuiClient;
    config: TypusConfig;

    /**
     * `opts.getAccessToken` is the browser path: it returns a short-lived Pyth
     * JWT per call, so no long-lived key is needed (and none can leak into a
     * bundle). Omit it and we fall back to the WS client off `LAZER_TOKEN`,
     * which is what node crankers and scripts use.
     */
    static async create(
        config: TypusConfig,
        opts?: { getAccessToken?: () => string | Promise<string> }
    ): Promise<TypusClient> {
        // typus-config@main is stale (advertises old oracle + old perp pkgs). Override here.
        if (ORACLE_PACKAGE_ID) {
            config.package.oracle = ORACLE_PACKAGE_ID;
        }
        if (PERP_PACKAGE_ID) {
            config.package.perp.perp = PERP_PACKAGE_ID;
        }
        if (STAKE_PACKAGE_ID) {
            config.package.perp.stakePool = STAKE_PACKAGE_ID;
        }
        // typus-config@main points at the old DOV registry; the new typus_perp links
        // against the 0x02821e55 DOV family — override so bid-receipt / liquidation
        // views pass the right &DovRegistry type.
        if (DOV_SINGLE_REGISTRY && config.registry?.dov) {
            config.registry.dov.dovSingle = DOV_SINGLE_REGISTRY;
        }

        if (opts?.getAccessToken) {
            return new TypusClient(config, { getAccessToken: opts.getAccessToken });
        }

        const token = process.env.LAZER_TOKEN ?? process.env.PYTH_LAZER_TOKEN;
        if (!token) {
            throw new Error("LAZER_TOKEN (or PYTH_LAZER_TOKEN) env var is required for Pyth Lazer client");
        }
        const lazer = await PythLazerClient.create({
            token,
            webSocketPoolConfig: { numConnections: 1 },
        });
        return new TypusClient(config, { lazer });
    }

    private constructor(
        config: TypusConfig,
        priceSource: { lazer?: PythLazerClient; getAccessToken?: () => string | Promise<string> }
    ) {
        this.config = config;
        const network = config.network.toLowerCase();

        const mvr = {
            overrides: {
                packages: {
                    "@typus/perp": config.package.perp.perp,
                    "@typus/stake-pool": config.package.perp.stakePool,
                },
            },
        };

        this.gRpcClient = new SuiGrpcClient({
            network: network,
            baseUrl: config.rpcEndpoint,
            mvr,
        });

        this.graphQLClient = new SuiGraphQLClient({
            network: network,
            url: `https://graphql.${network}.sui.io/graphql`,
            mvr,
        });

        const jsonRpcClient = new SuiJsonRpcClient({
            network: network,
            transport: new JsonRpcHTTPTransport({ url: config.rpcEndpoint }),
        });

        this.pythClient = new PythLazerSuiClient({
            ...priceSource,
            sui: jsonRpcClient,
            network: config.network,
            lazerPackage: PYTH_LAZER_PACKAGE_ID,
            oraclePackage: ORACLE_PACKAGE_ID,
            oracleV2Id: ORACLE_V2_ID,
            stateObjectId: PYTH_LAZER_STATE_ID,
        });
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
    /**
     * For view-function and dry-run transaction.
     * dry-run need `tx.setSender(user)` to work, otherwise it will fail with "Invalid sender address" error
     */
    devInspectTransactionBlock(params: SuiClientTypes.SimulateTransactionOptions) {
        params.checksEnabled = false;
        params.include = { commandResults: true, events: true };
        return this.gRpcClient.simulateTransaction(params);
    }
    executeTransactionBlock(params: SuiClientTypes.ExecuteTransactionOptions) {
        return this.gRpcClient.executeTransaction(params);
    }
    signAndExecuteTransaction(params: SuiClientTypes.SignAndExecuteTransactionOptions) {
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
