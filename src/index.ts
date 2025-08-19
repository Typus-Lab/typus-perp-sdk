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
        : "0x585924f160f83ef16f8927ec117e4d740abb6f4e571ecfa89ff3e973042cb1b9";
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET" ? "0xb52138bfce4e79d0d25c69b1d9dfe6ec81a821ed3ef03cdb1c077cb4ac9c9b9d" : "@typus/perp";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x585924f160f83ef16f8927ec117e4d740abb6f4e571ecfa89ff3e973042cb1b9";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0x220e7ba8923c0c30b57c0baab3bc15d781a39bb294cf7af318c0fc816b5cf7e6";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x7677c52794bdf0f8c6c6e7c38d584e675a04575f5f551e880c36d317fdc5653f"
        : "0xf8fa4a303118328de2fb53f49a043fa5bf58b84f372db0d1e7cf7b1f1a47d10e";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0x220e7ba8923c0c30b57c0baab3bc15d781a39bb294cf7af318c0fc816b5cf7e6";

// Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xfee68e535bf24702be28fa38ea2d5946e617e0035027d5ca29dbed99efd82aaa"
        : "0x22bb370cec1ec8fbbf381b151615358946ad0083805ef7940dfd9529fe6eac88";
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9973b7dd68ab8ba18702d913191a4c62c597847d9cd9f0b5bd97f1b938fc9a0a"
        : "0x54447a759a238f93ff847177bd87ace4b6ebc83553080611b93ac394122ecc4d";
export const LIQUIDITY_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x98110aae0ffaf294259066380a2d35aba74e42860f1e87ee9c201f471eb3ba03"
        : "0xc7adb5c9e318690dd43802ff50071aff9ffcc51e48abfe0ee0b5323a8c02c676";
// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xc969d946a2b6b917a83b5fb71765793c4a52149e50d2c8cf5c01d7421fc7cd73"
        : "0xed48f046dc88c49eb01d59669e29eb3006173b66445facb88de277bec2913687";
// MARKET_0 = 0x442cc2c27cadaf287a5f4413967b4dacc6532bc9063875efbc7b178e5add3e4e

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0xa12c282a068328833ec4a9109fc77803ec1f523f8da1bb0f82bac8450335f0c9"
        : "0x80f739d013b365055540346d3b081b19369d6ba83d1ed6291be7a066e0a3c25f";
// LpRegistry
export const TLP =
    NETWORK == "MAINNET"
        ? "0xc0a8cc0201d202321cd40b3f19fcf4cc88d6b63ceac0de55b08a2ab16f8a721e"
        : "0x6554d13aa8152c0d5b1c11cbe2c927a2612afb5c5d9fd0323643fcf6ff92aa4c";
export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5::tlp::TLP"
        : "0x585924f160f83ef16f8927ec117e4d740abb6f4e571ecfa89ff3e973042cb1b9::tlp::TLP";
export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x77c75fb1d78cca25b5e2d69decfe2837abf95c4ef44b809868e6ca20f42b63bc"
        : "0xda520f3d9127d1b2b2c6c4d386d9d4640d7db7625a127e5880106b27964c88ec";
// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x2cdf93717f87a8a7aeb98b27777b3b643f0ae2b277f44e6bcda0fc655a47d3e0"
        : "0x36d3dbde4236a40464220bfee930a4267312e16120f3a3e4c714f20fb8810402";
export const STAKE_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x5c984987380805fbaaf78f41d8ff1973807b6c85176aa87cf5a58518e0a87418"
        : "0x0288a12a5447bc2fd9bc102e7a5b31a4cc61eaa7d1d7cb2d21cbe2782a1147e6";
export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0xdf3ed1599218b2415b2cd7fa06296f7f647676019b2873ec18e55a626c584f1b"
        : "0xafb81680b9ac3d627eb733154c43d34e3ec758cf8e00a55c384df2c8150f7881";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0x36056abf9adde86f81667dad680a8ac98868c9fc1cb4d519fd2222d5d4522906"
        : "0xbc3914cd777d009afc05e81cd6d006428ce742569c795b0bac493c1b0ef58559";
