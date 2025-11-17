import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { collectPositionFundingFee, getUserPositions, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { getSponsoredTx } from "@typus/typus-sdk/dist/src/utils/sponsoredTx";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    config.sponsored = true;

    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let positions = await getUserPositions(client, user);
    let position = positions[0];
    console.log(position);

    let suiCoins = (
        await client.jsonRpcClient.getCoins({
            owner: user,
            coinType: tokenType[NETWORK]["SUI"],
        })
    ).data.map((coin) => coin.coinObjectId);

    tx = await collectPositionFundingFee(client, tx, {
        position,
        suiCoins,
    });

    // For Sponsored Tx
    let sponsoredResponse = await getSponsoredTx(client.jsonRpcClient, user, tx);
    let senderSig = await Transaction.from(sponsoredResponse?.txBytes).sign({ signer: keypair }); // wallet sign
    let res = await client.jsonRpcClient.executeTransactionBlock({
        transactionBlock: sponsoredResponse?.txBytes,
        signature: [senderSig?.signature, sponsoredResponse?.sponsorSig],
    });
    console.log(res);
})();
