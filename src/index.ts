export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "mainnet" ? "MAINNET" : "TESTNET";

console.log(`Load .env NEXT_PUBLIC_CLUSTER: ${process.env.NEXT_PUBLIC_CLUSTER}`);
console.log(`Initializing Typus Perp SDK for ${NETWORK}`);

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";

// Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xfee68e535bf24702be28fa38ea2d5946e617e0035027d5ca29dbed99efd82aaa"
        : "0xdfd138d539ecfd3b57286e20e5b9fff6c3fcd7986651567591245ba4c87ca6b5";
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9973b7dd68ab8ba18702d913191a4c62c597847d9cd9f0b5bd97f1b938fc9a0a"
        : "0x8e4ad806781a50b0bed6011e97d48cc07ef23f2f6d95fd021e8625ffc1ee44f8";
export const LIQUIDITY_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x98110aae0ffaf294259066380a2d35aba74e42860f1e87ee9c201f471eb3ba03"
        : "0x952fadd71b6ada8fc2e9aacc2e9de2dd3dade9813427af6a3c42a5926e371f04";
// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xc969d946a2b6b917a83b5fb71765793c4a52149e50d2c8cf5c01d7421fc7cd73"
        : "0x819ad73d991f69640e553048a343b3ddade3c1f807581166c40bb49fa5ae1ded";
export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0xa12c282a068328833ec4a9109fc77803ec1f523f8da1bb0f82bac8450335f0c9"
        : "0x26acf84bc93db806e435da1223e9e6add249724495c4103a08296d1b67d1edfc";
// LpRegistry
export const TLP =
    NETWORK == "MAINNET"
        ? "0xc0a8cc0201d202321cd40b3f19fcf4cc88d6b63ceac0de55b08a2ab16f8a721e"
        : "0x42096762e1dd5721621c4104c167569e6afb0586ba92a7f92d834062dd38d7e7";
export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5::tlp::TLP"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600::tlp::TLP";
export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x77c75fb1d78cca25b5e2d69decfe2837abf95c4ef44b809868e6ca20f42b63bc"
        : "0xb180a31c9335d0fb9b7f59b5aa9f0fef7e09292bb0edab9af587f9aa0f411b04";
// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x2cdf93717f87a8a7aeb98b27777b3b643f0ae2b277f44e6bcda0fc655a47d3e0"
        : "0xcd9b35eca5209f8abe8bd9f57b5a6cdda033cc21c3e6663418d40b38681f1d34";
export const STAKE_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x5c984987380805fbaaf78f41d8ff1973807b6c85176aa87cf5a58518e0a87418"
        : "0x29f3c845641a256d13a68c8613836b13aab5bd6ed6c5542e97d8098bec40e09f";
export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0xdf3ed1599218b2415b2cd7fa06296f7f647676019b2873ec18e55a626c584f1b"
        : "0xf9c29dd67d8e6a145671a8cf34681d7445b85cbf79b2f204d80af230fc7e8b50";
