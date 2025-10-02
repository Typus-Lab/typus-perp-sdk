import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, STAKE_POOL, STAKE_POOL_VERSION } from "src";
import mne from "mnemonic.json";
import { upgrade } from "src/typus_stake_pool/admin/functions";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let tx = new Transaction();

    upgrade(tx, STAKE_POOL_VERSION);

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
