import * as package_source_ac3919fd321e4c397a5c17d0cc01ed150a5e0f7d8c0f2b728fde3f5d719a2f0e from "../typus_perp/init";
import * as package_source_998a95d766ddeb2f901da579720b7b16e866ab36406f3013eddb5aa480875e33 from "../typus_stake_pool/init";
import { StructClassLoader } from "./loader";

function registerClassesSource(loader: StructClassLoader) {
    package_source_998a95d766ddeb2f901da579720b7b16e866ab36406f3013eddb5aa480875e33.registerClasses(loader);
    package_source_ac3919fd321e4c397a5c17d0cc01ed150a5e0f7d8c0f2b728fde3f5d719a2f0e.registerClasses(loader);
}

export function registerClasses(loader: StructClassLoader) {
    registerClassesSource(loader);
}
