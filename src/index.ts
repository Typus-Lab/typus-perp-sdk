export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

// console.log(`Load .env NEXT_PUBLIC_CLUSTER: ${process.env.NEXT_PUBLIC_CLUSTER}`);
// console.log(`Initializing Typus Perp SDK for ${NETWORK}`);

/** Register the MVR plugin globally */

import { namedPackagesPlugin, Transaction } from "@mysten/sui/transactions";

const mvrPlugin = NETWORK == "MAINNET" ? "https://mainnet.mvr.mystenlabs.com" : "https://testnet.mvr.mystenlabs.com";

const plugin = namedPackagesPlugin({ url: mvrPlugin });

/** Register the MVR plugin globally (once) for our PTB construction */
Transaction.registerGlobalSerializationPlugin("namedPackagesPlugin", plugin);

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x7adddfb77658ff43ad0281e264fdb43403a1b97bc2f6328b55279dfb4253e1e0"; // TYPUS_PERP_PACKAGE
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x9eda9afa0b42bf908766c42d02a549c271d7d0ae02c8c58c5075858f8f4d3b69"
        : "@typus/perp";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853"; // TYPUS_PERP_PACKAGE_ORIGIN

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xcfe3d323fec2dde129480328dbcf075bc47bac50f916f33746d74f1c875acd2e";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0xdf96424bc1ba70a6e53c07b2b55c597eccb8a21f722a917a5b4c9d8514b2d858"
        : "0xcfe3d323fec2dde129480328dbcf075bc47bac50f916f33746d74f1c875acd2e";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0x220e7ba8923c0c30b57c0baab3bc15d781a39bb294cf7af318c0fc816b5cf7e6";

// Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xfee68e535bf24702be28fa38ea2d5946e617e0035027d5ca29dbed99efd82aaa"
        : "0x351312d71a8834cd978649ef065dc48928eaf07a279566bc93050a89c2b1edae";
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9973b7dd68ab8ba18702d913191a4c62c597847d9cd9f0b5bd97f1b938fc9a0a"
        : "0x185f5713a04a01dbb2ef1ca603177b21c26a8a1f7c3b60b0b94c77c31dd4602d";
export const LIQUIDITY_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x98110aae0ffaf294259066380a2d35aba74e42860f1e87ee9c201f471eb3ba03"
        : "0x310a065075d2d49a09440402fcf8d2238886111c063cddaa4c118b09b1790e5e";
// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xc969d946a2b6b917a83b5fb71765793c4a52149e50d2c8cf5c01d7421fc7cd73"
        : "0x00fdefdaa281113998afe29b3b8906a8f7bfdfc031891da3b9d7ddc08a924919";
// MARKET_0 = 0x442cc2c27cadaf287a5f4413967b4dacc6532bc9063875efbc7b178e5add3e4e
// testnet MARKET_0 = 0x7f427b15136ab0f5919e66612ff343f9c34d2733e636c95f6d9563a596a4b6ac

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0xa12c282a068328833ec4a9109fc77803ec1f523f8da1bb0f82bac8450335f0c9"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b"; // TYPUS_PERP_VERSION
// LpRegistry
export const TLP =
    NETWORK == "MAINNET"
        ? "0xc0a8cc0201d202321cd40b3f19fcf4cc88d6b63ceac0de55b08a2ab16f8a721e"
        : ""; // deprecated in new version TLP
export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5::tlp::TLP"
        : "0xc44ba56ee8f91195facaf7a5a39b5522e0e8268a21b324275757ecc8baaa4e11::itlp_typus::ITLP_TYPUS";
export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x77c75fb1d78cca25b5e2d69decfe2837abf95c4ef44b809868e6ca20f42b63bc"
        : "0x118bd86c1885a02c2c8f8bb017b40b4a928d5dad1aa68802158171427f4c19c9";
// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x2cdf93717f87a8a7aeb98b27777b3b643f0ae2b277f44e6bcda0fc655a47d3e0"
        : "0xc48d38a6cd76ac6628ba98f1bdad7ade8d4b5273066aa4408a81e5e00a92363e";
export const STAKE_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x5c984987380805fbaaf78f41d8ff1973807b6c85176aa87cf5a58518e0a87418"
        : "0xce188b7277324a817a91ce1953dd1d71f2dbb4685364caa90eb430c9ac453dc8";
export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0xdf3ed1599218b2415b2cd7fa06296f7f647676019b2873ec18e55a626c584f1b"
        : "0x138583562f9f8fc6261e8fd752a105eb42c8887f83efaba87b42a757f3d98765";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0x36056abf9adde86f81667dad680a8ac98868c9fc1cb4d519fd2222d5d4522906"
        : "0xbb246d6ee24d7c751777d81cbf95ffcfcda26910fecfdcfedab81b2b8e48dfe5";

export const PROFIT_VAULT =
    NETWORK == "MAINNET"
        ? "" // TODO: Add mainnet PROFIT_VAULT address
        : "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47"; // TODO: Add testnet PROFIT_VAULT address
export const LOCK_VAULT =
    NETWORK == "MAINNET"
        ? "" // TODO: Add mainnet LOCK_VAULT address
        : "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb"; // TODO: Add testnet LOCK_VAULT address
