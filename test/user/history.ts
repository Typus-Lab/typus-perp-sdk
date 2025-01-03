import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { getUserHistory } from "src";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default("TESTNET", null);

    let user = keypair.toSuiAddress();
    console.log(user);

    await getUserHistory(user);
})();
