// import "@typus/typus-sdk/dist/src/utils/load_env";
// import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
// import { TypusClient } from "src/client";
//
// import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// import { Transaction } from "@mysten/sui/transactions";
// import { MARKET, NETWORK, PERP_VERSION } from "src";
// import { createUserAccount } from "src/typus_perp/trading/functions";

// (async () => {
//     let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
//     let config = await TypusConfig.default(NETWORK, null);
//     let client = new TypusClient(config);
//
//     let user = keypair.toSuiAddress();
//     console.log(user);

//     var tx = new Transaction();

//     let userAccountCap = createUserAccount(tx, {
//         version: PERP_VERSION,
//         registry: MARKET,
//         marketIndex: BigInt(0),
//     });

//     tx.transferObjects([userAccountCap], user);

//     let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
//     console.log(res);
// })();
