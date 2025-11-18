import "@typus/typus-sdk/dist/src/utils/load_env";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import {
    mintStakeLp,
    NETWORK,
    getUserStake,
    getLpPool,
    getStakePool,
    STAKE_PUBLISHED_AT,
    PERP_PUBLISHED_AT,
    STAKE_PACKAGE_ID,
    PERP_PACKAGE_ID,
} from "src";
import { TypusConfig, createPythClient } from "@typus/typus-sdk/dist/src/utils";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { TypusClient } from "src/client";

import { isValidNamedPackage, parseStructTag } from "@mysten/sui/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    // console.log(user);

    let lpPool = await getLpPool(client);
    // console.log(lpPool);

    let stakePool = await getStakePool(client);
    // console.log(stakePool);

    let stakes = await getUserStake(client, user);
    console.log(stakes);

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
    console.log(coins.length);

    let tx = new Transaction();

    tx = await mintStakeLp(client, tx, {
        lpPool,
        stakePool,
        coins,
        cTOKEN,
        amount: "10000000000",
        userShareId: stakes ? stakes[0].user_share_id.toString() : null,
        user,
        stake: false,
        isAutoCompound: false,
    });

    // console.log(JSON.parse(await tx.toJSON({ client: client.jsonRpcClient })).commands);

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
