import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { reduceOptionCollateralPositionSize, NETWORK } from "src";
import { createPythClient } from "@typus/typus-sdk/dist/src/utils";
import "@typus/typus-sdk/dist/src/utils/load_env";
import { TOKEN } from "@typus/typus-sdk/dist/src/constants";

(async () => {
    let keypair = Ed25519Keypair.deriveKeypair(String(process.env.MNEMONIC));
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    let user = keypair.toSuiAddress();
    console.log(user);

    var tx = new Transaction();

    // 2. Get receipt detail, vaultIndex, dToken, bToken, oToken
    let cToken: TOKEN = "wUSDC"; // dToken
    let bToken: TOKEN = "wUSDC";
    let tradingToken: TOKEN = "wETH"; // oToken

    tx = await reduceOptionCollateralPositionSize(client, tx, {
        cToken,
        tradingToken,
        bToken,
        positionId: "1",
        orderSize: "100000",
    });

    let dryrunRes = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: user,
    });
    // console.log(dryrunRes.events.filter((e) => e.type.endsWith("reduceOptionCollateralPositionSizesEvent")));
    console.log(dryrunRes.events.filter((e) => e.type.endsWith("OrderFilledEvent"))); // if the order is not filled, there will be no OrderFilledEvent

    let res = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
    console.log(res);
    // https://testnet.suivision.xyz/txblock/9BwZRXhRqYxeP6k3NavsVX1yQQjTfJbPBYijDPfaPHPH
})();
