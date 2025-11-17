import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { MARKET, NETWORK, PERP_VERSION, STAKE_POOL, STAKE_POOL_VERSION, TLP_TOKEN } from "src";
import { autoCompound } from "src/typus_stake_pool/stake-pool/functions";

import mne from "mnemonic.json";
import { CLOCK } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    autoCompound(tx, TLP_TOKEN, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        clock: CLOCK,
    });

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
