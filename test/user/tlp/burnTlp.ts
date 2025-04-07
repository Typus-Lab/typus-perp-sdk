import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, getUserStake, burnTlp } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let lpPools = await getLpPools(config);
    let lpPool = lpPools[0];
    // console.log(lpPool);

    let pythClient = createPythClient(provider, NETWORK);

    // 1. Get user's stake
    let stakes = await getUserStake(config, user);
    console.log(stakes);

    // 2. StakePool
    let stakePool = await getStakePool(config);
    // console.log(stakePool);

    let lpCoin = "0x264b83989f2b58b0775a3dd1961270aa0eeb9371f3f9426f1d36a23c21eaf056";

    let tx = new Transaction();

    await burnTlp(config, tx, pythClient, {
        lpCoin,
        lpPool,
        stakePool,
        cTOKEN: "SUI",
        share: "500000000", // 55819898874
        user,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("UnstakeEvent")));
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("BurnLpEvent")));

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
