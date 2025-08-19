import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { MARKET, NETWORK, PERP_VERSION } from "src";
import { initUserAccountTable } from "src/typus_perp/trading/functions";
import mne from "mnemonic.json";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    initUserAccountTable(tx, {
        version: PERP_VERSION,
        registry: MARKET,
        marketIndex: BigInt(0),
    });

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
