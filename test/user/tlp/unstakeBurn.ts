import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { NETWORK, getLpPools, getStakePool, getUserStake, unstakeBurn } from "src";
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

    let unlockedStakes = stakes.filter((s) => s[0].deactivatingShares.filter((d) => d.unlockedTsMs < Date.now()).length > 0);
    console.log(unlockedStakes);

    let stake = unlockedStakes[0];
    console.log(stake);

    let tx = new Transaction();

    await unstakeBurn(config, tx, pythClient, {
        userShareId: stake[0].userShareId.toString(),
        lpPool,
        stakePool,
        cTOKEN: "USDC",
        share: "987450000000",
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
    // https://testnet.suivision.xyz/txblock/EvBgQwKFay8YMYDG9WtStsfvR7MzhPa4nu5aKMgeptzX?tab=Events
})();
