import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { MARKET, NETWORK, PERP_VERSION } from "src";
import { registerAsReferrer } from "src/typus_move";
import mne from "mnemonic.json";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(mne.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    registerAsReferrer(
        tx,
        {
            version: config.version.typus,
            // @ts-ignore
            referralRegistry: config.registry.typus.referral,
            referralCode: "typus",
            referrerAddress: "0x978f65df8570a075298598a9965c18de9087f9e888eb3430fe20334f5c554cfd",
        },
        config.package.typus
    );

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
