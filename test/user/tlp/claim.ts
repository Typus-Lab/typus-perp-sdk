import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, claim } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let lpPools = await getLpPools(config);
    let lpPool = lpPools[0];
    // console.log(lpPool);

    let pythClient = createPythClient(provider, NETWORK);

    // 2. StakePool
    let stakePool = await getStakePool(config);
    // console.log(stakePool);

    let tx = new Transaction();

    await claim(client, tx, {
        lpPool,
        stakePool,
        cTOKEN: "wUSDT",
        user,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("BurnLpEvent")));

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
