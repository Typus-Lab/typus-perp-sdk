import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { BcsReader, bcs } from "@mysten/bcs";
import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";

// Testnet constants - from Rust config (matching src/index.ts)
const PERP_PACKAGE_ID = "0x7adddfb77658ff43ad0281e264fdb43403a1b97bc2f6328b55279dfb4253e1e0";
const PERP_VERSION = "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";
const PROFIT_VAULT = "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47";
const LOCK_VAULT = "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb";

// BCS definitions
const TypeNameBcs = bcs.struct("TypeName", {
    name: bcs.string(),
});

const UserProfitBcs = bcs.struct("UserProfit", {
    collateral_token: TypeNameBcs,
    base_token: TypeNameBcs,
    position_id: bcs.u64(),
    order_id: bcs.u64(),
    amount: bcs.u64(),
    create_ts_ms: bcs.u64(),
});

const LockedUserProfitBcs = bcs.struct("LockedUserProfit", {
    user_profit: UserProfitBcs,
    create_ts_ms: bcs.u64(),
});

async function fetchUserProfits(config: TypusConfig, user: string) {
    const provider = new SuiClient({ url: config.rpcEndpoint });
    const tx = new Transaction();

    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_user_profits`,
        arguments: [tx.object(PERP_VERSION), tx.object(PROFIT_VAULT), tx.pure.address(user)],
    });

    const res = await provider.devInspectTransactionBlock({ sender: user, transactionBlock: tx });

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return [];
    }

    // @ts-ignore
    const returnValues = res.results[0].returnValues[0][0];

    const reader = new BcsReader(new Uint8Array(returnValues));
    const profits: any[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const profit = UserProfitBcs.parse(Uint8Array.from(Array.from(bytes)));
        profits.push(profit);
    });

    return profits;
}

async function fetchLockedUserProfits(config: TypusConfig, user: string) {
    const provider = new SuiClient({ url: config.rpcEndpoint });
    const tx = new Transaction();

    tx.moveCall({
        target: `${PERP_PACKAGE_ID}::profit_vault::get_locked_user_profits`,
        arguments: [tx.object(PERP_VERSION), tx.object(LOCK_VAULT), tx.pure.address(user)],
    });

    const res = await provider.devInspectTransactionBlock({ sender: user, transactionBlock: tx });

    if (!res.results?.[0]?.returnValues?.[0]?.[0]) {
        return [];
    }

    // @ts-ignore
    const returnValues = res.results[0].returnValues[0][0];

    const reader = new BcsReader(new Uint8Array(returnValues));
    const lockedProfits: any[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const lockedProfit = LockedUserProfitBcs.parse(Uint8Array.from(Array.from(bytes)));
        lockedProfits.push(lockedProfit);
    });

    return lockedProfits;
}

(async () => {
    let config = await TypusConfig.default("TESTNET", null);

    let user = "0x4374a519f43aeadf1fe795f1519682cc6a7cca552c26d874d5d98600aaeb76a8";
    console.log("User:", user);

    // Fetch user profits
    console.log("\n=== User Profits ===");
    let profits = await fetchUserProfits(config, user);
    console.log(`Found ${profits.length} profits`);
    if (profits.length > 0) {
        console.log("First 3 profits:", JSON.stringify(profits.slice(0, 3), (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
    }

    // Filter non-zero profits
    let nonZeroProfits = profits.filter((p) => BigInt(p.amount) > BigInt(0));
    console.log(`Total: ${profits.length}, Non-zero: ${nonZeroProfits.length}, Zero: ${profits.length - nonZeroProfits.length}`);

    // Fetch locked user profits
    console.log("\n=== Locked User Profits ===");
    let lockedProfits = await fetchLockedUserProfits(config, user);
    console.log(`Found ${lockedProfits.length} locked profits`);
    if (lockedProfits.length > 0) {
        console.log("First 3 locked profits:", JSON.stringify(lockedProfits.slice(0, 3), (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
    }

    // Calculate total locked amount
    let totalLocked = lockedProfits.reduce((sum, p) => sum + BigInt(p.user_profit.amount), BigInt(0));
    console.log(`Total locked amount: ${totalLocked}`);
})();
