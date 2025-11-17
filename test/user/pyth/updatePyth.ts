import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { updatePyth } from "@typus/typus-sdk/dist/src/utils";

import mnemonic from "mnemonic.json";
import { NETWORK } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mnemonic.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let tx = new Transaction();
    let priceInfoObjectIds = await updatePyth(client.pythClient, tx, ["SUI", "WBTC", "wETH", "wSOL", "DEEP", "WAL", "wAPT", "JPY", "XAU"]);
    console.log(priceInfoObjectIds);

    let res = await client.jsonRpcClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: tx,
        options: {
            showEffects: true,
            showEvents: true,
        },
    });
    console.log(res);

    // https://suivision.xyz/txblock/7NZUby1ezhc6tN8EkT4vkTDEQ7XZMyHcDxd42GfJZzQo
})();
