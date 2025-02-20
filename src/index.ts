export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();
export const NETWORK = process.env.NEXT_PUBLIC_CLUSTER == "mainnet" ? "MAINNET" : "TESTNET";

console.log(`Load .env NEXT_PUBLIC_CLUSTER: ${process.env.NEXT_PUBLIC_CLUSTER}`);
console.log(`Initializing Typus Perp SDK for ${NETWORK}`);

export const LP_POOL = NETWORK == "MAINNET" ? "" : "0xf85bb9b6bbe877e43e9a79f9c59d57331884f7519825f1116d8634806cd167e1";
export const LIQUIDITY_POOL = NETWORK == "MAINNET" ? "" : "0x93bc498e59e97c93820c14687a9a340bc794eada7f7ce0f458bb25190bdd395e";
export const LIQUIDITY_POOL_0 = NETWORK == "MAINNET" ? "" : "0xc0bf75a16dbd11f0d52b27d933d4e1efaa8bdfbe3cdb89587464465aad1b6606";
export const MARKET = NETWORK == "MAINNET" ? "" : "0xb73983f279effad13b455846c192a2eb402ed453f84a1e627c9e34cfd329bf92";
export const TLP = NETWORK == "MAINNET" ? "" : "0x7c19f81d9d411e78305d7af8dad25317c56bb449fede8a78b6021232478f0509";
export const TLP_TOKEN = NETWORK == "MAINNET" ? "" : "0x7c19f81d9d411e78305d7af8dad25317c56bb449fede8a78b6021232478f0509::tlp::TLP";
export const TLP_TREASURY_CAP = NETWORK == "MAINNET" ? "" : "0x7d9c6f9dfceb4788c21388f77e4ccf83e1b3f10282ae272b379402e92c97bbf6";
export const STAKE_POOL = NETWORK == "MAINNET" ? "" : "0x27efed0157eea40aa1a8483622edeb48ca8c3fa3073f9e662503280a22a4e51b";
export const STAKE_POOL_0 = NETWORK == "MAINNET" ? "" : "0xf784850926a300257546695fcb23333bcc0b2fdc4bd492b5174a3eb0e3fd4f00";
export const PERP_VERSION = NETWORK == "MAINNET" ? "" : "0xa3066f440d0e2fa74b1c98e55c316ce63b208be87b018b089bf39d5dd11e8dfd";
export const STAKE_POOL_VERSION = NETWORK == "MAINNET" ? "" : "0x25868624d2254a14eb513ae2b276fb56ca355ffd6cdd8ee05c5a51620f3f1bf3";
