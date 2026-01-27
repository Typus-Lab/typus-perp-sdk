export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x9003219180252ae6b81d2893b41d430488669027219537236675c0c2924c94d9"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xd280f3a072bca4b7b5b450f40c82a30b3935cd1d12d927eb9d1f790520a83d3b"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0x46ef530d3ad13037ac54b77be324e5ab063124af8a119e86f1f59be8a16a22a2"
        : "0x85fa3cc6dc0fa8b47dda95ba0335fe1cec61dde4a2a8486ccd040f94d399b4c3";

// liquidity_pool_registry
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9090a55fea75d0b135dfa53e6bbe234c0b0e9d0e0b21c615f32f0048bc35aca4"
        : "0xe034d157764f273df5a1e264a3c0f78d8f922c37f942c340dabb1d66244c72ba";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0x327c8a176055400e9aacde8553a897898b5da969d6dcdb55eee268bb501a2c3a"
        : "0xd0685e3eca9530f0618625d4a617a80db09f000609285b32a85f863da6baf811";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x7c30204bd3f4dc37918281907308e0d7d09a75a6826473aec0caa1712ee149e5"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x99071a9fb7e40546d3279dffac2ff15a278ab90229c3fe06610e1540dcafa7af"
        : "0x1b39c2a5bc109ac520787c62f924da9244343e869bad755157e6e3e22bd7b7ae";

// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0xdbd23ed1bfe214a61bce1ba711b86e62048913f2069e845c9ff69119628f41a3"
        : "0x8e5e5435c3fcd77f07cf097c5fbd381af7c2b394420ea035685662215471e578";

export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0x64d09fec0002837abc4bb283410034c991710234c4d5b9013eabe38b54cad561"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0xe896530a778adedc1b38e4fc31059a6557146caa7b1da56950b671a433de5f08"
        : "0x2b811b120177839555aabdc2c28b28078170e663e855d29aa9072013d4fc918d";

export const PROFIT_VAULT =
    NETWORK == "MAINNET"
        ? "0xd24222307ba17ee1a08fe46ac587b1106e585e53f314ffffb525a4d4158b64c3" // TODO: Add mainnet PROFIT_VAULT address
        : "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47"; // TODO: Add testnet PROFIT_VAULT address
export const LOCK_VAULT =
    NETWORK == "MAINNET"
        ? "0x585355900351dd1915b77f31c06ae9e6d58b187de848d4e6e6a55d3789e281d6" // TODO: Add mainnet LOCK_VAULT address
        : "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb"; // TODO: Add testnet LOCK_VAULT address