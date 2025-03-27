import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { getUserOrders, NETWORK } from "src";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let user = "0xb6c7e3b1c61ee81516a8317f221daa035f1503e0ac3ae7a50b61834bc7a3ead9";
    console.log(user);

    let orders = await getUserOrders(config, user);
    console.log(JSON.stringify(orders, (_, v) => (typeof v === "bigint" ? `${v}` : v), 2));
})();
