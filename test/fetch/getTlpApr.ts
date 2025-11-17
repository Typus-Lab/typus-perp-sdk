import { TypusConfig } from "@typus/typus-sdk/dist/src/utils";
import { TypusClient } from "src/client";
import { getLpPool, getStakePool, getStakePools, NETWORK } from "src";
import { getTlpFeeFromSentio } from "src/api/sentio";

(async () => {
    let config = await TypusConfig.default(NETWORK, null);
    let client = new TypusClient(config);

    // let stakePools = await getStakePools(config);
    // console.log(stakePools); // 1 lpPool inclueded
    // let stakePool = stakePools[0];

    let stakePool = await getStakePool(client);
    let incentive_ratio = Number(stakePool.incentives[0].config.period_incentive_amount) / Number(stakePool.pool_info.total_share);
    // console.log(incentive_ratio);
    let times = (365 * 24 * 3600 * 1000) / Number(stakePool.incentives[0].config.incentive_interval_ts_ms);
    let incentive_apr = incentive_ratio * times;

    const end = Math.round(Date.now() / 1000);
    const start = end - 3600 * 24 * 7; // 7 days ago
    const value = await getTlpFeeFromSentio(start, end);
    // console.log(value);
    // console.log((value * 365) / 7);

    let lpPool = await getLpPool(client);
    let tvl_usd = Number(lpPool.pool_info.tvl_usd) / 10 ** 9;
    let tlp_amount = Number(lpPool.pool_info.total_share_supply) / 10 ** 9;
    let tlp_price = tvl_usd / tlp_amount;
    // console.log(tvl_usd);
    console.log(tlp_price);

    let fee_apr = (value * 365) / 7 / tvl_usd;
    // console.log(fee_apr);

    let total_apr = incentive_apr + fee_apr;
    console.log(total_apr);
})();
