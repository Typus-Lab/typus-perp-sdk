export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "mainnet" ? "MAINNET" : "TESTNET";

console.log(`Load .env NEXT_PUBLIC_CLUSTER: ${process.env.NEXT_PUBLIC_CLUSTER}`);
console.log(`Initializing Typus Perp SDK for ${NETWORK}`);

// Registry
export const LP_POOL = NETWORK == "MAINNET" ? "0xb17d749086743ab54a93c6e6cc8655c3dbf9740e85639a557d958e573c44e24a" : "0xdfd138d539ecfd3b57286e20e5b9fff6c3fcd7986651567591245ba4c87ca6b5";
export const LIQUIDITY_POOL = NETWORK == "MAINNET" ? "0x4dfa3664bc55767d93711310d260e21dec14225e3e12736de92842a128c77c80" : "0x8e4ad806781a50b0bed6011e97d48cc07ef23f2f6d95fd021e8625ffc1ee44f8";
export const LIQUIDITY_POOL_0 = NETWORK == "MAINNET" ? "" : "0x952fadd71b6ada8fc2e9aacc2e9de2dd3dade9813427af6a3c42a5926e371f04";
// MarketRegistry
export const MARKET = NETWORK == "MAINNET" ? "0x83ff21d9c8e6069ba633e4915873ced7f9b5a5fc0bba15121d5e86fb2496ebb6" : "0x819ad73d991f69640e553048a343b3ddade3c1f807581166c40bb49fa5ae1ded";
export const PERP_VERSION = NETWORK == "MAINNET" ? "0xb3c6f9e1826c2543519928783cfb885eb9911a49feac7a444497731c4c1ec95a" : "0x26acf84bc93db806e435da1223e9e6add249724495c4103a08296d1b67d1edfc";
// LpRegistry
export const TLP = NETWORK == "MAINNET" ? "0x6ec2d66cc73c00c76ea5ff03a50778656afcd627a2d9afc3e6cf7f72f0d22711" : "0x42096762e1dd5721621c4104c167569e6afb0586ba92a7f92d834062dd38d7e7";
export const TLP_TOKEN = NETWORK == "MAINNET" ? "0x42c1f8533436ba9e63a609c0433ea7b9de222d9ab8911c0ed220a2f887531106::tlp::TLP" : "0x21a3b745eaeee0ec0cbc3207230185013d1d8939f7a920aa61f5fea7d09db600::tlp::TLP";
export const TLP_TREASURY_CAP = NETWORK == "MAINNET" ? "0xc580a459e26cf9db8be3393951c1b6f90a06278caf19193f8db43fa76b915b9f" : "0xb180a31c9335d0fb9b7f59b5aa9f0fef7e09292bb0edab9af587f9aa0f411b04";
// StakePoolRegistry
export const STAKE_POOL = NETWORK == "MAINNET" ? "0x973d90d39d9c3f424e64fb2c372df4ceaef9cf6655fafdda1bc10a1b43322737" : "0xcd9b35eca5209f8abe8bd9f57b5a6cdda033cc21c3e6663418d40b38681f1d34";
export const STAKE_POOL_0 = NETWORK == "MAINNET" ? "" : "0x29f3c845641a256d13a68c8613836b13aab5bd6ed6c5542e97d8098bec40e09f";
export const STAKE_POOL_VERSION = NETWORK == "MAINNET" ? "0x33b5b105563256282ff1569d5bd13b08cb1f8bd79fd30ca756c7adaccef2d48a" : "0xf9c29dd67d8e6a145671a8cf34681d7445b85cbf79b2f204d80af230fc7e8b50";
