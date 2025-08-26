import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrder, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import { TOKEN, tokenType } from "@typus/typus-sdk/dist/src/constants";
import { getSponsoredTx } from "@typus/typus-sdk/dist/src/utils/sponsoredTx";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    config.sponsored = true;

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

    let suiCoins = (
        await provider.getCoins({
            owner: user,
            coinType: tokenType[NETWORK]["SUI"],
        })
    ).data.map((coin) => coin.coinObjectId);

    tx = await createTradingOrder(config, tx, pythClient, {
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

    // let dryrunRes = await provider.devInspectTransactionBlock({
    //     transactionBlock: tx,
    //     sender: user,
    // });
    // console.log(dryrunRes);
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("CreateTradingOrderEvent"))[0].parsedJson); //
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("RealizeFundingEvent"))); // only exists if the order size is reduced ( with linked_position_id provided)
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    // let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    // console.log(res);

    // For Sponsored Tx
    let sponsoredResponse = await getSponsoredTx(provider, user, tx);
    if (sponsoredResponse.txBytes) {
        let senderSig = await Transaction.from(sponsoredResponse.txBytes).sign({ signer: keypair }); // wallet sign
        let res = await provider.executeTransactionBlock({
            transactionBlock: sponsoredResponse.txBytes,
            signature: [senderSig?.signature, sponsoredResponse.sponsorSig],
        });
        console.log(res);
    } else {
        console.log(sponsoredResponse);
    }
})();
