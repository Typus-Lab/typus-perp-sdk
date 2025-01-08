import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { BcsReader } from "@mysten/bcs";
import { SENDER } from "@typus/typus-sdk/dist/src/constants";
import { AddressFromBytes, TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { Markets, SymbolMarket } from "../trading/structs";

export interface MarketsData {
    markets: Markets;
    symbolMarkets: SymbolMarket[];
}
export async function getMarkets(
    config: TypusConfig,
    input: {
        indexes: string[];
    }
): Promise<MarketsData[]> {
    let provider = new SuiClient({ url: config.rpcEndpoint });
    let transaction = new Transaction();
    transaction.moveCall({
        target: `${config.package.perp.perp}::trading::get_markets_bcs`,
        arguments: [transaction.object(config.registry.perp.market), transaction.pure.vector("u64", input.indexes)],
    });
    let devInspectTransactionBlockResult = await provider.devInspectTransactionBlock({ sender: SENDER, transactionBlock: transaction });
    // @ts-ignore
    let bytes = devInspectTransactionBlockResult.results[0].returnValues[0][0];
    let reader = new BcsReader(new Uint8Array(bytes));
    let marketIndex = 0;
    let results: MarketsData[] = [];
    reader.readVec((reader, i) => {
        if (i == marketIndex) {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let markets = Markets.fromBcs(Uint8Array.from(Array.from(bytes)));
            results.push({ markets, symbolMarkets: [] });
            marketIndex = i + markets.symbols.length + 1;
        } else {
            let length = reader.readULEB();
            let bytes = reader.readBytes(length);
            let symbolMarket = SymbolMarket.fromBcs(Uint8Array.from(Array.from(bytes)));
            results[results.length - 1].symbolMarkets.push(symbolMarket);
        }
    });
    return results;
}
