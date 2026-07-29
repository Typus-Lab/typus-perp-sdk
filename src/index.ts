export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

// Mainnet is the CVersion-7 package: the only one carrying `create_trading_order_v2`
// / `match_trading_order_v2` (the OracleV2 readers). Verified on-chain — the
// previously pinned 0xf60e3542 exposes no `_v2` order entries at all, and
// typus-config@main still advertises the older 0x8e4743f2.
export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xb78db3bf6aff87ae8aa6b1b5d4718d475d46b74734727889f2b4c300d79e8970"
        : "0x228f1823a2daf15cf2d5031e47bd7c26ae1d19ea89160df29d351c6e56134c61";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xd280f3a072bca4b7b5b450f40c82a30b3935cd1d12d927eb9d1f790520a83d3b"
        : "0x11ca35c03a2f3ba157a8f605613bcb70eb22da5fcb9dbb00966db745ed6427e6";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0x46ef530d3ad13037ac54b77be324e5ab063124af8a119e86f1f59be8a16a22a2"
        : "0x7870f1a8f1a4750f2b8b2c9e62b2770eb717aec185b85156d8a3ac503920de57";

// inner liquidity_pool_registry (Registry.liquidity_pool_registry, parent of pool dynamic fields)
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9090a55fea75d0b135dfa53e6bbe234c0b0e9d0e0b21c615f32f0048bc35aca4"
        : "0x4ef2f9562737beaba55fe03fd0d9da21af0d2277e0e802d3660afbc7ca4c073f";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0x327c8a176055400e9aacde8553a897898b5da969d6dcdb55eee268bb501a2c3a"
        : "0x56e899ecc6a8b801b027a096a59aeef65be9a57a8c5380f0b93631c42e346706";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x7c30204bd3f4dc37918281907308e0d7d09a75a6826473aec0caa1712ee149e5"
        : "0xe456c2b305e64a7add716dec6fa0c2ea459cf5148313c01fb98468707dae06b3";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x99071a9fb7e40546d3279dffac2ff15a278ab90229c3fe06610e1540dcafa7af"
        : "0x63afeecd08a372b623d2b0170303dcad285f3485833fac6218ea770cd032e762";

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
        : "0x05c3fd5ed8d9b8ca62b370e375dd555c174cfe6c573ba06ec22eb22f31c79ba3";

export const PROFIT_VAULT =
    NETWORK == "MAINNET"
        ? "0xd24222307ba17ee1a08fe46ac587b1106e585e53f314ffffb525a4d4158b64c3"
        : "0xdf6973935e107c091d8bb5aaef2d2bdf4987e496a880ae7e664d6ceb062f43a7";
export const LOCK_VAULT =
    NETWORK == "MAINNET"
        ? "0x585355900351dd1915b77f31c06ae9e6d58b187de848d4e6e6a55d3789e281d6"
        : "0x8d3c497b2b0e7b8a7633422e8da780ba83ea6709d81ba7b0ca6935d58692cc96";

// Pyth Lazer + OracleV2. Mainnet values mirror typus-rust
// src/config/mainnet/pyth.json (oracle v16 / Lazer state), which the crankers
// already run against — the OracleV2 object below holds 24 registered tokens.
export const ORACLE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xb52c1b617cf5c9a6f911907be7d4b7bc12c618050b6421ee9801a4011617dcbe"
        : "0xd2e030ab7f0fc956c7e683cf3c6faf3d22868dee81a4aae9f4a10a6d998a8a02";
export const ORACLE_V2_ID =
    NETWORK == "MAINNET"
        ? "0xcd03806a638885c18d9866b9704cb53487c51df8642e95059a6984673b9fa211"
        : "0x6378d4a139475984613344077a862972756e2bd0cb2aab7018e7f48eeee0742d";
export const PYTH_LAZER_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xefbfd064480777699fd9c557a5804d72ace7bc82661fdc8d1f1a44ea6d92ee10"
        : "0xacb76cbd636b83839153feff75b83157c400075717ce8c979fbbe88cf3564901";
export const PYTH_LAZER_STATE_ID =
    NETWORK == "MAINNET"
        ? "0xd0db9c1e9212a98120384bf78d8b8c985d87b9ee6921dffcf9d1394062911573"
        : "0x7b570126bfdcc7f7b2b4028445d4ac1d35c41da498606a2b097c3973425698d3";

// DOV single-collateral Registry that the new typus_perp pkg links against
// (origin 0x02821e55). typus-config@main still advertises the old 0x6c9a394a DOV.
export const DOV_SINGLE_REGISTRY =
    NETWORK == "MAINNET" ? "" : "0x43db5b91c8af6cf7a2a3b624e97aa35eef40adff4a22e2b59571b9eb89ded084";
