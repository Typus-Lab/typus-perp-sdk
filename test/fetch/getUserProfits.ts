import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { BcsReader } from "@mysten/bcs";
import { UserProfit, LockedUserProfit } from "../../src/typus_perp/profit-vault/structs";

// Testnet constants
const PERP_PACKAGE_ID = "0x7adddfb77658ff43ad0281e264fdb43403a1b97bc2f6328b55279dfb4253e1e0";
const PERP_VERSION = "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";
const PROFIT_VAULT = "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47";
const LOCK_VAULT = "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb";

async function fetchUserProfits(config: TypusConfig, user: string): Promise<UserProfit[]> {
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
    const profits: UserProfit[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const profit = UserProfit.fromBcs(Uint8Array.from(Array.from(bytes)));
        profits.push(profit);
    });

    return profits;
}

async function fetchLockedUserProfits(config: TypusConfig, user: string): Promise<LockedUserProfit[]> {
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
    const lockedProfits: LockedUserProfit[] = [];
    reader.readVec((reader) => {
        const length = reader.readULEB();
        const bytes = reader.readBytes(length);
        const lockedProfit = LockedUserProfit.fromBcs(Uint8Array.from(Array.from(bytes)));
        lockedProfits.push(lockedProfit);
    });

    return lockedProfits;
}

async function fetchAllUserProfits(config: TypusConfig): Promise<Map<string, UserProfit[]>> {
    const provider = new SuiClient({ url: config.rpcEndpoint });

    // 1. Read ProfitVault object to get user_profits Table ID
    const vaultResponse = await provider.getObject({
        id: PROFIT_VAULT,
        options: { showContent: true },
    });

    if (!vaultResponse.data?.content || vaultResponse.data.content.dataType !== "moveObject") {
        return new Map();
    }

    const fields = (vaultResponse.data.content as any).fields;
    const tableId = fields?.user_profits?.fields?.id?.id;

    if (!tableId) {
        return new Map();
    }

    // 2. Get all dynamic fields (user addresses) from the Table
    let cursor: string | null = null;
    const allUsers: string[] = [];

    while (true) {
        const dynamicFields = await provider.getDynamicFields({
            parentId: tableId,
            cursor,
            limit: 50,
        });

        for (const field of dynamicFields.data) {
            const userAddress = (field.name as any).value;
            if (userAddress) {
                allUsers.push(userAddress);
            }
        }

        if (!dynamicFields.hasNextPage) {
            break;
        }
        cursor = dynamicFields.nextCursor ?? null;
    }

    // 3. For each user, fetch their profits
    const result = new Map<string, UserProfit[]>();

    for (const user of allUsers) {
        try {
            const profits = await fetchUserProfits(config, user);
            if (profits.length > 0) {
                result.set(user, profits);
            }
        } catch (e) {
            console.error(`Failed to get profits for user ${user}:`, e);
        }
    }

    return result;
}

async function fetchAllLockedUserProfits(config: TypusConfig): Promise<Map<string, LockedUserProfit[]>> {
    const provider = new SuiClient({ url: config.rpcEndpoint });

    // 1. Read LockVault object to get locked_user_profits Table ID
    const vaultResponse = await provider.getObject({
        id: LOCK_VAULT,
        options: { showContent: true },
    });

    if (!vaultResponse.data?.content || vaultResponse.data.content.dataType !== "moveObject") {
        return new Map();
    }

    const fields = (vaultResponse.data.content as any).fields;
    const tableId = fields?.locked_user_profits?.fields?.id?.id;

    if (!tableId) {
        return new Map();
    }

    // 2. Get all dynamic fields (user addresses) from the Table
    let cursor: string | null = null;
    const allUsers: string[] = [];

    while (true) {
        const dynamicFields = await provider.getDynamicFields({
            parentId: tableId,
            cursor,
            limit: 50,
        });

        for (const field of dynamicFields.data) {
            const userAddress = (field.name as any).value;
            if (userAddress) {
                allUsers.push(userAddress);
            }
        }

        if (!dynamicFields.hasNextPage) {
            break;
        }
        cursor = dynamicFields.nextCursor ?? null;
    }

    // 3. For each user, fetch their locked profits
    const result = new Map<string, LockedUserProfit[]>();

    for (const user of allUsers) {
        try {
            const profits = await fetchLockedUserProfits(config, user);
            if (profits.length > 0) {
                result.set(user, profits);
            }
        } catch (e) {
            console.error(`Failed to get locked profits for user ${user}:`, e);
        }
    }

    return result;
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
        console.log("First 3 profits:", profits.slice(0, 3).map((p) => p.toJSONField()));
    }

    // Filter non-zero profits
    let nonZeroProfits = profits.filter((p) => BigInt(p.amount) > BigInt(0));
    console.log(`Total: ${profits.length}, Non-zero: ${nonZeroProfits.length}, Zero: ${profits.length - nonZeroProfits.length}`);

    // Fetch locked user profits
    console.log("\n=== Locked User Profits ===");
    let lockedProfits = await fetchLockedUserProfits(config, user);
    console.log(`Found ${lockedProfits.length} locked profits`);
    if (lockedProfits.length > 0) {
        console.log("First 3 locked profits:", lockedProfits.slice(0, 3).map((p) => p.toJSONField()));
    }

    // Calculate total locked amount
    let totalLocked = lockedProfits.reduce((sum, p) => sum + BigInt(p.userProfit.amount), BigInt(0));
    console.log(`Total locked amount: ${totalLocked}`);

    // Test fetchAllUserProfits
    console.log("\n=== All User Profits ===");
    let allProfits = await fetchAllUserProfits(config);
    console.log(`Found ${allProfits.size} users with profits`);
    let totalProfitCount = 0;
    for (const [_, userProfits] of allProfits) {
        totalProfitCount += userProfits.length;
    }
    console.log(`Total profit records: ${totalProfitCount}`);

    // Test fetchAllLockedUserProfits
    console.log("\n=== All Locked User Profits ===");
    let allLockedProfits = await fetchAllLockedUserProfits(config);
    console.log(`Found ${allLockedProfits.size} users with locked profits`);
    let totalLockedCount = 0;
    for (const [_, userLockedProfits] of allLockedProfits) {
        totalLockedCount += userLockedProfits.length;
    }
    console.log(`Total locked profit records: ${totalLockedCount}`);
})();
