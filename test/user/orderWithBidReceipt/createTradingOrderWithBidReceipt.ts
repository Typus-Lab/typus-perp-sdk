import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { createTradingOrderWithBidReceipt, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import "@typus/typus-sdk/dist/src/utils/load_env";
import { TOKEN } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default("TESTNET", null);
    let provider = new SuiClient({ url: config.rpcEndpoint });

    let user = keypair.toSuiAddress();
    console.log(user);

    let pythClient = createPythClient(provider, NETWORK);

    var tx = new Transaction();

    // 1. Get user's bid receipt
    let bidReceipt = "0x1959f2a27551a1a0a1a787d79a94e5670c6b5709afd94e79dadab251e69bcd0f";

    // 2. Get receipt detail, vaultIndex, dToken, bToken, oToken
    let index = "18";
    let cToken: TOKEN = "wUSDC"; // dToken
    let bToken: TOKEN = "wUSDC";
    let tradingToken: TOKEN = "wETH"; // oToken
    let isLong = false; // call => short, put => long
    let share: string | null = "300000";

    tx = await createTradingOrderWithBidReceipt(config, tx, pythClient, {
        cToken,
        tradingToken,
        isLong,
        user,
        index,
        bToken,
        bidReceipt,
        share,
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
