import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { NETWORK } from "src";
import { env } from "process";

let priceIDs = ["0xfd5464ac394d347958864c8a93dc71f2be56a5943fefc459a0074dc314b415d8"];

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let tx = new Transaction();

    let priceFeedUpdateData = await client.pythClient.connection.getPriceFeedsUpdateData(priceIDs);

    let pythPackageId = await client.pythClient.client.getPythPackageId();
    console.log("Pyth package ID:", pythPackageId);

    await client.pythClient.client.createPriceFeed(tx, priceFeedUpdateData);

    let res = await client.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: {
            showEffects: true,
            showEvents: true,
        },
    });
    console.log(res);

    // https://testnet.suivision.xyz/txblock/DmXouy51A9WuxHKTqQLwdEUsq6L5K6y5mHuzWaxUwsqb
})();
