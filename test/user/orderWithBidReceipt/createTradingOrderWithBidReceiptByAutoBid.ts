import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrderWithBidReceiptByAutoBid, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import "@typus/typus-sdk/dist/src/utils/load_env";
import { TOKEN } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let pythClient = createPythClient(provider, NETWORK);

    var tx = new Transaction();

    // 2. Get receipt detail, vaultIndex, dToken, bToken, oToken
    let index = "2";
    let cToken: TOKEN = "AFSUI"; // dToken
    let bToken: TOKEN = "SUI";
    let tradingToken: TOKEN = "SUI"; // oToken
    let isLong = false; // call => short, put => long

    tx = await createTradingOrderWithBidReceiptByAutoBid(config, tx, pythClient, {
        cToken,
        tradingToken,
        isLong,
        user,
        index,
        bToken,
        signalIndex: "0",
        strategyIndex: "9",
    });

    let dryrunRes = await provider.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("CreateTradingOrderWithBidReceiptsEvent")));
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    let res = await provider.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/9BwZRXhRqYxeP6k3NavsVX1yQQjTfJbPBYijDPfaPHPH
})();
