import * as package_source_89c20927846e2b4b41249d4400d31362e925a2f327acf83f535e51134f611617 from "../typus_perp/init";
import * as package_source_2861ec51c70e3bd8ff2372e210acb7151ece286d17f43447308d5f0ebbe8603b from "../typus_stake_pool/init";
import { StructClassLoader } from "./loader";

function registerClassesSource(loader: StructClassLoader) {
    package_source_2861ec51c70e3bd8ff2372e210acb7151ece286d17f43447308d5f0ebbe8603b.registerClasses(loader);
    package_source_89c20927846e2b4b41249d4400d31362e925a2f327acf83f535e51134f611617.registerClasses(loader);
}

export function registerClasses(loader: StructClassLoader) {
    registerClassesSource(loader);
}
