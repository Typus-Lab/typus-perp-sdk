import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { createPythClient, updatePyth } from "@typus/typus-sdk/dist/src/utils";

import mnemonic from "mnemonic.json";
import { NETWORK } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mnemonic.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let tx = new Transaction();
    let pythClient = createPythClient(provider, NETWORK);
    let priceInfoObjectIds = await updatePyth(pythClient, tx, ["SUI", "wBTC", "wETH", "wSOL", "DEEP", "WAL", "wAPT", "JPY", "XAU"]);
    console.log(priceInfoObjectIds);

    let res = await provider.signAndExecuteTransaction({
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
