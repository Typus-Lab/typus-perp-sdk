export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();

// default MAINNET
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "testnet" ? "TESTNET" : "MAINNET";

export const PERP_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x46acca74c6bbba9d0f286e9741444485808f2be493a8baeee1bf7a6ea067c670"
        : "0x94cd358f552e9dd5df837de85939a9d1d682e97480740a203121e6f4c0078853";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x39addbf74f24fc4dcef507a229be8ba6dcbc7ffce34bc1c0b4225ba4cd1677a7"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

// lp_pool::Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0x9e9855b4ac00e407a0719a6542b9be76d886b499bf1d763a79f56d139830fd3a"
        : "0x85fa3cc6dc0fa8b47dda95ba0335fe1cec61dde4a2a8486ccd040f94d399b4c3";

// liquidity_pool_registry
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x32db917d2ed873a5bd8664efb220bfc7af4175638e30c8fc2b69b80888aab5d2"
        : "0xe034d157764f273df5a1e264a3c0f78d8f922c37f942c340dabb1d66244c72ba";

// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0xdcc27865c3668dcad62fecee867e219a2d3a8f7920bcfe2ffe5f0949442adf37"
        : "0xd0685e3eca9530f0618625d4a617a80db09f000609285b32a85f863da6baf811";

export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x70abe0418b654d6bae8f860aeebb8912c05534ededf67289a61cd48de679b450"
        : "0xbb0615832168e64e301db2ebd6ad71b3fe170d7e217ccd0c08714de56b41676b";

export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0x791498ed6eea0680052f262b388e0bea46e1dfdb976f2ca7ab9183142f5d2045"
        : "0x1b39c2a5bc109ac520787c62f924da9244343e869bad755157e6e3e22bd7b7ae";

// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0xf26906bd797b32a55c4ec479102c1b74eea5b3795d4a9af0bbb29c171c110826"
        : "0x8e5e5435c3fcd77f07cf097c5fbd381af7c2b394420ea035685662215471e578";

export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0x2f33ef6920dd63ab2089aa28f91c564cf15c008e507ceb915c286f3fc28e06a8"
        : "0x02b94b340a8810f6c451bc244dc2dd8d9d50cf86d727798969ca2c287c3186aa";

export const COMPETITION_CONFIG =
    NETWORK == "MAINNET"
        ? "0xd9f4468854e5e352072a9c9e023eaea096b5314e75832c49e23555c5f0a00472"
        : "0x2b811b120177839555aabdc2c28b28078170e663e855d29aa9072013d4fc918d";

export const PROFIT_VAULT =
    NETWORK == "MAINNET"
        ? "0xc7cc07321b9b34339f65c8b7dbfa31503421c261069df907bbde265f16e74c80" // TODO: Add mainnet PROFIT_VAULT address
        : "0xb1d603139b24db2c46f6a423c8613ce677f329a0b159ff6e57672f3b663aec47"; // TODO: Add testnet PROFIT_VAULT address
export const LOCK_VAULT =
    NETWORK == "MAINNET"
        ? "0xb4a67eafb124ad2d27c464de47e47eacc1d054bf04f38ee5be92add2d3010d92" // TODO: Add mainnet LOCK_VAULT address
        : "0x25dd9540f031b9a62b83784a727e1ef410f9aa91ecf7e3bb27a0c61f8ceecbfb"; // TODO: Add testnet LOCK_VAULT address