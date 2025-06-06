import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrder, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    // INPUTS
    let cToken: TOKEN = "SUI";
    let tradingToken: TOKEN = "SUI";

    let pythClient = createPythClient(provider, NETWORK);

    let coins = (
        await provider.getCoins({
            owner: user,
            coinType: tokenType[NETWORK][cToken],
        })
    ).data.map((coin) => coin.coinObjectId);

    tx = await createTradingOrder(config, tx, pythClient, {
        coins,
        cToken,
        amount: "100000000",
        tradingToken,
        size: "1000000000",
        triggerPrice: "500000000",
        isLong: true,
        isStopOrder: false,
        reduceOnly: false,
        linkedPositionId: null,
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("CreateTradingOrderEvent"))[0].parsedJson); //
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("RealizeFundingEvent"))); // only exists if the order size is reduced ( with linked_position_id provided)
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
