import { SuiGrpcClient } from "@mysten/sui/grpc";
import { LIQUIDITY_POOL, LIQUIDITY_POOL_0 } from "../index";
import { getLpPool, NETWORK } from "src";
import { tokenType } from "@typus/typus-sdk/dist/src/constants";

const gRpcClient = new SuiGrpcClient({ network: NETWORK.toLowerCase(), baseUrl: `https://fullnode.${NETWORK.toLowerCase()}.sui.io:443` });

// gRpcClient.ledgerService
//     .getObject({ objectId: LIQUIDITY_POOL_0, readMask: { paths: ["contents"] } })
//     .then((x) => console.log(x.response.object?.contents));

// gRpcClient.ledgerService
//     .batchGetObjects({
//         requests: [{ objectId: LIQUIDITY_POOL_0 }, { objectId: LIQUIDITY_POOL_0 }],
//         readMask: { paths: ["contents"] },
//     })
//     .then((x) =>
//         x.response.objects.map((x) => {
//             if (x.result.oneofKind === "object") {
//                 console.log(x.result.object.contents);
//             } else if (x.result.oneofKind === "error") {
//                 console.error(x.result.error);
//             } else {
//                 console.warn("undefined case");
//             }
//         })
//     );

// gRpcClient.stateService
//     .listDynamicFields({
//         parent: "0xfbd1ad8da88e7cb228f1c12a87399b19acd4f25c64a3503a7aad8747751580aa",
//         readMask: { paths: ["field_object"] },
//     })
//     .then((x) =>
//         x.response.dynamicFields.map((x) => {
//             console.log(x);
//             return x.fieldObject?.contents;
//         })
//     );

// getBalance
// listBalances;
// listOwnedObjects
