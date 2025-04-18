import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import { updateTlpPrice } from "src/typus_stake_pool/stake-pool/functions";
import mne from "mnemonic.json";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let tx = new Transaction();

    updateTlpPrice(tx, {
        version: STAKE_POOL_VERSION,
        registry: STAKE_POOL,
        index: BigInt(0),
        tlpPrice: BigInt(10000),
    });

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
