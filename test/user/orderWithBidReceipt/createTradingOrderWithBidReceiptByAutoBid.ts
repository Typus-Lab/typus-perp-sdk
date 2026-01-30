import "@typus/typus-sdk/dist/src/utils/load_env";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrderWithBidReceiptByAutoBid, findMarketIndex, getMarkets, NETWORK } from "src";
import { TOKEN } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    // 2. Get receipt detail, vaultIndex, dToken, bToken, oToken
    let dovIndex = "2";
    let cToken: TOKEN = "AFSUI"; // dToken
    let bToken: TOKEN = "SUI";
    let tradingToken: TOKEN = "SUI"; // oToken
    let isLong = false; // call => short, put => long

    let markets = await getMarkets(client, { indexes: ["0", "1"] });
    let marketsOnly = markets.map((x) => x[0]);
    let perpIndex = findMarketIndex(client, { markets: marketsOnly, tradingToken });
    console.log("perpIndex: ", perpIndex);

    tx = await createTradingOrderWithBidReceiptByAutoBid(client, tx, {
        perpIndex: perpIndex!.toString(),
        cToken,
        tradingToken,
        isLong,
        user,
        dovIndex,
        bToken,
        signalIndex: "0",
        strategyIndex: "9",
    });

    let dryrunRes = await client.jsonRpcClient.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("CreateTradingOrderWithBidReceiptsEvent")));
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    let res = await client.jsonRpcClient.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/9BwZRXhRqYxeP6k3NavsVX1yQQjTfJbPBYijDPfaPHPH
})();
