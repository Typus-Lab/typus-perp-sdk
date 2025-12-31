export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xcb1c8159eb40b02877c0ceed599cf019cc8e61e8ec19c4d64db15e20ff630f05"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x6cf6c6cc05316e238a338ba82c018d38a1af7e6da26b85fffa433df98e8f1bdb"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xb4b5e5fff9c6036f5ba22434467df1d23c2a77709807c43c7c9200816edb7006"
        : "0x85fa3cc6dc0fa8b47dda95ba0335fe1cec61dde4a2a8486ccd040f94d399b4c3";

// liquidity_pool_registry
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x422d57052da4465c5cbed8270e815dd9bc943cba827865db44fa067c525de9d9"
        : "0xe034d157764f273df5a1e264a3c0f78d8f922c37f942c340dabb1d66244c72ba";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0x09a1fb68e7b07ac48d8f370cec4b5dabc80eb9a3a548ba4d06fa8e5ce1cf03ad"
        : "0xd0685e3eca9530f0618625d4a617a80db09f000609285b32a85f863da6baf811";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x6ed8676315014e829c89f56d95a88e35167ade69911f853aed8b92c25746ecbc"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0xf836ae7b9d53bddb9be877b4fbc3ebd93b01327ca76b437d8618940d5081d222"
        : "0x1b39c2a5bc109ac520787c62f924da9244343e869bad755157e6e3e22bd7b7ae";

// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x60c771d32a7b7f0f5f58d7dc2e6d83f76a6512f58d79bded2ee458a1d79b786c"
        : "0x8e5e5435c3fcd77f07cf097c5fbd381af7c2b394420ea035685662215471e578";

export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0x57ddf480a4649da5f92b4e607cf1fac75bc11d8b582816509989d66f8bc7e329"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0xf7fcb3dbabe52c0a7e3fe01e28bb0f7045e2e45463f62bfa739e8c14a911f4be"
        : "0x2b811b120177839555aabdc2c28b28078170e663e855d29aa9072013d4fc918d";
