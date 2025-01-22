import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { increaseCollateral, getUserPositions, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import { tokenType, typeArgToToken } from "@typus/typus-sdk/dist/src/constants";
import { normalizeStructTag } from "@mysten/sui/utils";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default("TESTNET", null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    let positions = await getUserPositions(config, user);
    let position = positions.at(-1)!;
    // console.log(position);

    let pythClient = createPythClient(provider, NETWORK);

    let coins = (
        await provider.getCoins({
            owner: user,
            coinType: normalizeStructTag(position.collateralToken.name),
        })
    ).data.map((coin) => coin.coinObjectId);

    tx = await increaseCollateral(config, tx, pythClient, {
        coins,
        amount: "1000000",
        position,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("IncreaseCollateralEvent"))[0].parsedJson);

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
