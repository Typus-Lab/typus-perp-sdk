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

// @ts-ignore - url property may not be in type definitions but works at runtime
const plugin = namedPackagesPlugin({ url: mvrPlugin });

/** Register the MVR plugin globally (once) for our PTB construction */
Transaction.registerGlobalSerializationPlugin("namedPackagesPlugin", plugin);

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xcb1c8159eb40b02877c0ceed599cf019cc8e61e8ec19c4d64db15e20ff630f05"
        : "0x7adddfb77658ff43ad0281e264fdb43403a1b97bc2f6328b55279dfb4253e1e0"; // TYPUS_PERP_PACKAGE
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0xcb1c8159eb40b02877c0ceed599cf019cc8e61e8ec19c4d64db15e20ff630f05"
        : "@typus/perp";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xcb1c8159eb40b02877c0ceed599cf019cc8e61e8ec19c4d64db15e20ff630f05"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853"; // TYPUS_PERP_PACKAGE_ORIGIN

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x6cf6c6cc05316e238a338ba82c018d38a1af7e6da26b85fffa433df98e8f1bdb"
        : "0xcfe3d323fec2dde129480328dbcf075bc47bac50f916f33746d74f1c875acd2e";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x6cf6c6cc05316e238a338ba82c018d38a1af7e6da26b85fffa433df98e8f1bdb"
        : "0xcfe3d323fec2dde129480328dbcf075bc47bac50f916f33746d74f1c875acd2e";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0x6cf6c6cc05316e238a338ba82c018d38a1af7e6da26b85fffa433df98e8f1bdb"
        : "0x220e7ba8923c0c30b57c0baab3bc15d781a39bb294cf7af318c0fc816b5cf7e6";

// Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xb4b5e5fff9c6036f5ba22434467df1d23c2a77709807c43c7c9200816edb7006"
        : "0x351312d71a8834cd978649ef065dc48928eaf07a279566bc93050a89c2b1edae";
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x422d57052da4465c5cbed8270e815dd9bc943cba827865db44fa067c525de9d9"
        : "0x185f5713a04a01dbb2ef1ca603177b21c26a8a1f7c3b60b0b94c77c31dd4602d";
export const LIQUIDITY_POOL_0 =
    NETWORK == "MAINNET"
        ? "0xf2e497409f87e5993aead0b9057b2f57a6261dce0978fa605034a74daa1081a6"
        : "0x310a065075d2d49a09440402fcf8d2238886111c063cddaa4c118b09b1790e5e";
// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0x09a1fb68e7b07ac48d8f370cec4b5dabc80eb9a3a548ba4d06fa8e5ce1cf03ad"
        : "0x00fdefdaa281113998afe29b3b8906a8f7bfdfc031891da3b9d7ddc08a924919";
// MARKET_0 = 0x442cc2c27cadaf287a5f4413967b4dacc6532bc9063875efbc7b178e5add3e4e
// testnet MARKET_0 = 0x7f427b15136ab0f5919e66612ff343f9c34d2733e636c95f6d9563a596a4b6ac

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x6ed8676315014e829c89f56d95a88e35167ade69911f853aed8b92c25746ecbc"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b"; // TYPUS_PERP_VERSION
// LpRegistry
export const TLP =
    NETWORK == "MAINNET"
        ? ""
        : ""; // deprecated in new version TLP
export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0x88a4a61e409c9dd63b00d274fae045ce18fee116ab38e52edfa044906db46dc5::itlp_typus::ITLP_TYPUS"
        : "0xc44ba56ee8f91195facaf7a5a39b5522e0e8268a21b324275757ecc8baaa4e11::itlp_typus::ITLP_TYPUS";
export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0xf836ae7b9d53bddb9be877b4fbc3ebd93b01327ca76b437d8618940d5081d222"
        : "0x118bd86c1885a02c2c8f8bb017b40b4a928d5dad1aa68802158171427f4c19c9";
// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x60c771d32a7b7f0f5f58d7dc2e6d83f76a6512f58d79bded2ee458a1d79b786c"
        : "0xc48d38a6cd76ac6628ba98f1bdad7ade8d4b5273066aa4408a81e5e00a92363e";
export const STAKE_POOL_0 =
    NETWORK == "MAINNET"
        ? "0xbb3f82d9c540a405b6abd1d3998fe7fab895ae578932d56cf3fc9860e7552490"
        : "0xce188b7277324a817a91ce1953dd1d71f2dbb4685364caa90eb430c9ac453dc8";
export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0x57ddf480a4649da5f92b4e607cf1fac75bc11d8b582816509989d66f8bc7e329"
        : "0x138583562f9f8fc6261e8fd752a105eb42c8887f83efaba87b42a757f3d98765";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0xf7fcb3dbabe52c0a7e3fe01e28bb0f7045e2e45463f62bfa739e8c14a911f4be"
        : "0xbb246d6ee24d7c751777d81cbf95ffcfcda26910fecfdcfedab81b2b8e48dfe5";

export const PROFIT_VAULT =
    NETWORK == "MAINNET"
        ? "0xc227378ff761748144f82f47a8711ce03ca24c0991d7e80a410ecb27384666ab" // TODO: Add mainnet PROFIT_VAULT address
        : "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47"; // TODO: Add testnet PROFIT_VAULT address
export const LOCK_VAULT =
    NETWORK == "MAINNET"
        ? "0xa510c6e83f5c93578cac982bddc4f5dfc6b2f8011c2ce8d6cecbb17adb8dc298" // TODO: Add mainnet LOCK_VAULT address
        : "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb"; // TODO: Add testnet LOCK_VAULT address
