import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { increaseCollateral, getUserPositions, NETWORK } from "src";
import { normalizeStructTag } from "@mysten/sui/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let positions = await getUserPositions(client, user);
    let position = positions.at(-1)!;
    // console.log(position);

    let coins = (
        await client.jsonRpcClient.getCoins({
            owner: user,
            coinType: normalizeStructTag(position.collateral_token.name),
        })
    ).data.map((coin) => coin.coinObjectId);

    tx = await increaseCollateral(client, tx, {
        coins,
        amount: "1000000",
        position,
    });

    let dryrunRes = await client.jsonRpcClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("IncreaseCollateralEvent"))[0].parsedJson);

    let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
