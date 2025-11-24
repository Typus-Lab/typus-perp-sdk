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
        : "0x29d1dcc803ec1cc1b4c98a8c818c655ecf432ebd2f85757bffc21806d329e240";
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x9eda9afa0b42bf908766c42d02a549c271d7d0ae02c8c58c5075858f8f4d3b69"
        : "0x29d1dcc803ec1cc1b4c98a8c818c655ecf432ebd2f85757bffc21806d329e240";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5"
        : "0x29d1dcc803ec1cc1b4c98a8c818c655ecf432ebd2f85757bffc21806d329e240";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xce188b7277324a817a91ce1953dd1d71f2dbb4685364caa90eb430c9ac453dc8";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0xdf96424bc1ba70a6e53c07b2b55c597eccb8a21f722a917a5b4c9d8514b2d858"
        : "0xce188b7277324a817a91ce1953dd1d71f2dbb4685364caa90eb430c9ac453dc8";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0xc427209145715a00a93d7e674a95c556a7147d79fda1bbaeb1a1cac5f9923966"
        : "0xce188b7277324a817a91ce1953dd1d71f2dbb4685364caa90eb430c9ac453dc8";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0xfee68e535bf24702be28fa38ea2d5946e617e0035027d5ca29dbed99efd82aaa"
        : "0x351312d71a8834cd978649ef065dc48928eaf07a279566bc93050a89c2b1edae";

// liquidity_pool_registry
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x9973b7dd68ab8ba18702d913191a4c62c597847d9cd9f0b5bd97f1b938fc9a0a"
        : "0x185f5713a04a01dbb2ef1ca603177b21c26a8a1f7c3b60b0b94c77c31dd4602d";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xc969d946a2b6b917a83b5fb71765793c4a52149e50d2c8cf5c01d7421fc7cd73"
        : "0x00fdefdaa281113998afe29b3b8906a8f7bfdfc031891da3b9d7ddc08a924919";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0xa12c282a068328833ec4a9109fc77803ec1f523f8da1bb0f82bac8450335f0c9"
        : "0xfd3699c86cda99e542e4517dc3ad4d9164806664fcbcc23981ad0d5101b87abd";

export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0xe27969a70f93034de9ce16e6ad661b480324574e68d15a64b513fd90eb2423e5::tlp::TLP"
        : "0x29d1dcc803ec1cc1b4c98a8c818c655ecf432ebd2f85757bffc21806d329e240::tlp::TLP";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x77c75fb1d78cca25b5e2d69decfe2837abf95c4ef44b809868e6ca20f42b63bc"
        : "0x118bd86c1885a02c2c8f8bb017b40b4a928d5dad1aa68802158171427f4c19c9";

// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x2cdf93717f87a8a7aeb98b27777b3b643f0ae2b277f44e6bcda0fc655a47d3e0"
        : "0xc48d38a6cd76ac6628ba98f1bdad7ade8d4b5273066aa4408a81e5e00a92363e";

export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0xdf3ed1599218b2415b2cd7fa06296f7f647676019b2873ec18e55a626c584f1b"
        : "0x138583562f9f8fc6261e8fd752a105eb42c8887f83efaba87b42a757f3d98765";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0x36056abf9adde86f81667dad680a8ac98868c9fc1cb4d519fd2222d5d4522906"
        : "0xbb246d6ee24d7c751777d81cbf95ffcfcda26910fecfdcfedab81b2b8e48dfe5";
