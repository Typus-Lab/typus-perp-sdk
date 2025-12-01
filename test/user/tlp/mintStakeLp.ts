import "@typus/typus-sdk/dist/src/utils/load_env";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { mintStakeLp, NETWORK, getUserStake, getLpPools, getStakePools } from "src";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { TypusClient } from "src/client";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    const index = 0;

    let lpPools = await getLpPools(client);
    let lpPool = lpPools[index];
    // console.log(lpPool);

    let stakePools = await getStakePools(client);
    // console.log(stakePools);

    let stakePool = stakePools[index];
    // console.log(stakePool);

    let stakes = await getUserStake(client, {
        user,
        indexes: [
            ...Array(lpPools.length)
                .keys()
                .map((x) => x.toString()),
        ],
    });
    console.log("stakes: ", stakes);

    let userShareId = stakes.length > 0 ? stakes[index][0]!.user_share_id.toString() : null;
    console.log("userShareId: ", userShareId);

    // INPUT
    let cTOKEN: TOKEN = "wUSDT";
    let cToken = tokenType[NETWORK][cTOKEN];

    // coins
    let coins = (
        await client.getCoins({
            owner: user,
            coinType: cToken,
        })
    ).data.map((coin) => coin.coinObjectId);
    console.log("coins.length: ", coins.length);

    let tx = new Transaction();

    tx = await mintStakeLp(client, tx, {
        lpPool,
        stakePool,
        coins,
        cTOKEN,
        amount: "10000000000",
        userShareId,
        user,
        stake: true,
        isAutoCompound: false,
    });

    // console.dir(JSON.parse(await tx.toJSON({ client: client.jsonRpcClient })).commands[8], { depth: null });
    // console.dir(JSON.parse(await tx.toJSON({ client: client.jsonRpcClient })).inputs[11], { depth: null });

    // let dryrunRes = await client.devInspectTransactionBlock({
    //     transactionBlock: tx,
    //     sender: user,
    // });
    // // console.log(dryrunRes);
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("MintLpEvent")));
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("StakeEvent")));

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/GRjmdrHtcqzAP4a8i6nTef88zDpPZ2ouLSVX4DTj8JnC
})();
