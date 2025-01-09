export * from "./fetch";
export * from "./user";

import dotenv from "dotenv";
// import .env file if exists
dotenv.config();
export const NETWORK = process.env.CLUSTER == "mainnet" ? "MAINNET" : "TESTNET";

console.log(`Initializing Typus Perp SDK for ${NETWORK}`);
