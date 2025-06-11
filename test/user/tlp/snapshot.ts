import "@typus/typus-sdk/dist/src/utils/load_env";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { snapshot, NETWORK, getUserStake, getLpPools, getStakePool } from "src";
import { TypusConfig, createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let stakes = await getUserStake(config, user);
    console.log(stakes);

    let tx = new Transaction();

    tx = await snapshot(config, tx, {
        userShareId: stakes[0][0][0].userShareId.toString(),
    });

    // console.log(tx.getData());

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
