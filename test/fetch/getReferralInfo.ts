import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getReferralInfo, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let referral = await getReferralInfo(config, "typus", true);
    console.dir(referral, { depth: null });
})();
