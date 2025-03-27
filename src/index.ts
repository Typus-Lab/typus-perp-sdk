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
        ? "0x7ea60df3452d1cec0064d3380cb6f2a9309dcf7ac1b51529de71ef427688b1c3"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";
export const PERP_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x7ea60df3452d1cec0064d3380cb6f2a9309dcf7ac1b51529de71ef427688b1c3"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";
export const PERP_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0x7ea60df3452d1cec0064d3380cb6f2a9309dcf7ac1b51529de71ef427688b1c3"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600";

export const STAKE_PACKAGE_ID =
    NETWORK == "MAINNET"
        ? "0x59033cb52ab8286b2ff368b8e6b319eefd7f2a4a83bd9152b53ce2a2cc4b6ad0"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";
export const STAKE_PUBLISHED_AT =
    NETWORK == "MAINNET"
        ? "0x59033cb52ab8286b2ff368b8e6b319eefd7f2a4a83bd9152b53ce2a2cc4b6ad0"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";
export const STAKE_PKG_V1 =
    NETWORK == "MAINNET"
        ? "0x59033cb52ab8286b2ff368b8e6b319eefd7f2a4a83bd9152b53ce2a2cc4b6ad0"
        : "0xafe221d6a3abc88d6f6f79b2452840c9f8d4cf8f7e58938b853acee5f06f24a2";

// Registry
export const LP_POOL =
    NETWORK == "MAINNET"
        ? "0x3d5c4b793617d848b46e8239873aa6b4d01abc1e026de226f9d5050ea03b0534"
        : "0xdfd138d539ecfd3b57286e20e5b9fff6c3fcd7986651567591245ba4c87ca6b5";
export const LIQUIDITY_POOL =
    NETWORK == "MAINNET"
        ? "0x29919540a3473d2127562e77a41a3f643ccf5e544770efb4d0fe0407d88bbf57"
        : "0x8e4ad806781a50b0bed6011e97d48cc07ef23f2f6d95fd021e8625ffc1ee44f8";
export const LIQUIDITY_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x9e1f760bebd2aab8f6e03682917efc28d0d446f3d2d3a4c1d28d385e3f325bda"
        : "0x952fadd71b6ada8fc2e9aacc2e9de2dd3dade9813427af6a3c42a5926e371f04";
// MarketRegistry
export const MARKET =
    NETWORK == "MAINNET"
        ? "0x41a9721eb80d3e097865a2d9d85cbc334f74c7b2b6a50cba1e44fe9802baa9bb"
        : "0x819ad73d991f69640e553048a343b3ddade3c1f807581166c40bb49fa5ae1ded";
export const PERP_VERSION =
    NETWORK == "MAINNET"
        ? "0x059366677707d36e6a63fa6eaa3547bb1a32d821e1ba74c78024b471afb62f27"
        : "0x26acf84bc93db806e435da1223e9e6add249724495c4103a08296d1b67d1edfc";
// LpRegistry
export const TLP =
    NETWORK == "MAINNET"
        ? "0xc359ecccc1e5ec6e2d701bc1ad0e2e6f1299717bb43309b4359899f2aeae3d69"
        : "0x42096762e1dd5721621c4104c167569e6afb0586ba92a7f92d834062dd38d7e7";
export const TLP_TOKEN =
    NETWORK == "MAINNET"
        ? "0x7ea60df3452d1cec0064d3380cb6f2a9309dcf7ac1b51529de71ef427688b1c3::tlp::TLP"
        : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600::tlp::TLP";
export const TLP_TREASURY_CAP =
    NETWORK == "MAINNET"
        ? "0xf760d6e1a254f5218f9502a764bda3e7dce4a1fa0ed9414b73efe5cbd5a1fb4c"
        : "0xb180a31c9335d0fb9b7f59b5aa9f0fef7e09292bb0edab9af587f9aa0f411b04";
// StakePoolRegistry
export const STAKE_POOL =
    NETWORK == "MAINNET"
        ? "0x973d90d39d9c3f424e64fb2c372df4ceaef9cf6655fafdda1bc10a1b43322737"
        : "0xcd9b35eca5209f8abe8bd9f57b5a6cdda033cc21c3e6663418d40b38681f1d34";
export const STAKE_POOL_0 =
    NETWORK == "MAINNET"
        ? "0x2f2d7682e952db55a82ef56f1cfb83dc085f0a92377d55449e1fb2514798c411"
        : "0x29f3c845641a256d13a68c8613836b13aab5bd6ed6c5542e97d8098bec40e09f";
export const STAKE_POOL_VERSION =
    NETWORK == "MAINNET"
        ? "0x33b5b105563256282ff1569d5bd13b08cb1f8bd79fd30ca756c7adaccef2d48a"
        : "0xf9c29dd67d8e6a145671a8cf34681d7445b85cbf79b2f204d80af230fc7e8b50";
