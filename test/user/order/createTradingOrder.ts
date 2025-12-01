import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrder, findMarketIndex, getMarkets, NETWORK } from "src";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { getSponsoredTx } from "@typus/typus-sdk/dist/src/utils/sponsoredTx";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);
    config.sponsored = false;

    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    // INPUTS
    let cToken: TOKEN = "wUSDT";
    let tradingToken: TOKEN = "SUI";

    let coins = (
        await client.getCoins({
            owner: user,
            coinType: tokenType[NETWORK][cToken],
        })
    ).data.map((coin) => coin.coinObjectId);

    let suiCoins = (
        await client.getCoins({
            owner: user,
            coinType: tokenType[NETWORK]["SUI"],
        })
    ).data.map((coin) => coin.coinObjectId);

    let markets = await getMarkets(client, { indexes: ["0", "1"] });
    let marketsOnly = markets.map((x) => x[0]);
    let perpIndex = findMarketIndex(client, { markets: marketsOnly, tradingToken });
    console.log("perpIndex: ", perpIndex);

    tx = await createTradingOrder(client, tx, {
        perpIndex: perpIndex!.toString(),
        coins,
        cToken,
        amount: "1000000000",
        tradingToken,
        size: "5000000000",
        triggerPrice: "100000000",
        isLong: true,
        isStopOrder: false,
        reduceOnly: false,
        linkedPositionId: null,
        suiCoins,
    });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes);
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("CreateTradingOrderEvent"))[0].parsedJson); //
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("RealizeFundingEvent"))); // only exists if the order size is reduced ( with linked_position_id provided)
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
})();
