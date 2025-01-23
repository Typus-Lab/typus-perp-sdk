import { NETWORK } from "../index";

export const PACKAGE_ID = NETWORK == "MAINNET" ? "" : "0xac3919fd321e4c397a5c17d0cc01ed150a5e0f7d8c0f2b728fde3f5d719a2f0e";
export const PUBLISHED_AT = NETWORK == "MAINNET" ? "" : "0x04e536fe79e7f1ed23fed0a421629c95c820ce6d0a6fe15a7d9b457800f109bd";
export const PKG_V1 = NETWORK == "MAINNET" ? "" : "0xac3919fd321e4c397a5c17d0cc01ed150a5e0f7d8c0f2b728fde3f5d719a2f0e";
