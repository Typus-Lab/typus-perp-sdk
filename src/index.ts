export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xfee68e535bf24702be28fa38ea2d5946e617e0035027d5ca29dbed99efd82aaa"
        : "0x85fa3cc6dc0fa8b47dda95ba0335fe1cec61dde4a2a8486ccd040f94d399b4c3";

// liquidity_pool_registry
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9973b7dd68ab8ba18702d913191a4c62c597847d9cd9f0b5bd97f1b938fc9a0a"
        : "0xe034d157764f273df5a1e264a3c0f78d8f922c37f942c340dabb1d66244c72ba";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xc969d946a2b6b917a83b5fb71765793c4a52149e50d2c8cf5c01d7421fc7cd73"
        : "0xd0685e3eca9530f0618625d4a617a80db09f000609285b32a85f863da6baf811";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0xa12c282a068328833ec4a9109fc77803ec1f523f8da1bb0f82bac8450335f0c9"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x77c75fb1d78cca25b5e2d69decfe2837abf95c4ef44b809868e6ca20f42b63bc"
        : "0x1b39c2a5bc109ac520787c62f924da9244343e869bad755157e6e3e22bd7b7ae";

// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x2cdf93717f87a8a7aeb98b27777b3b643f0ae2b277f44e6bcda0fc655a47d3e0"
        : "0x8e5e5435c3fcd77f07cf097c5fbd381af7c2b394420ea035685662215471e578";

export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0xdf3ed1599218b2415b2cd7fa06296f7f647676019b2873ec18e55a626c584f1b"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0x36056abf9adde86f81667dad680a8ac98868c9fc1cb4d519fd2222d5d4522906"
        : "0x2b811b120177839555aabdc2c28b28078170e663e855d29aa9072013d4fc918d";
