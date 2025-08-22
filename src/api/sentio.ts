import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { Event, NETWORK, toSentioToken } from "src";

const headers = {
    "api-key": "ffJa6FwxeJNrQP8NZ5doEMXqdSA7XM6mT",
    "Content-Type": "application/json",
};

export async function getFromSentio(event: string, userAddress: string, startTimestamp: string, cranker?: boolean): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    // add cranker fileter
    let crankerFilter = "";
    if (cranker) {
        crankerFilter = "AND is_cranker == true";
    }

    let requestData = {
        sqlQuery: {
            sql: `
                SELECT *
                FROM ${event}
                WHERE distinct_id = '${userAddress}' AND timestamp >= ${startTimestamp} ${crankerFilter}
                ORDER BY timestamp DESC;
            `,
            size: 1000,
        },
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    if (data.result) {
        return data.result.rows as any[];
    } else {
        return [];
    }
}

export async function getRecentTradesFromSentio(base_token?: TOKEN): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    let tokenFilter = "";
    if (base_token) {
        tokenFilter = `WHERE base_token = '${toSentioToken(base_token)}'`;
    }

    let requestData = {
        sqlQuery: {
            sql: `
                SELECT * FROM (
                    WITH
                    OpenOrder AS (
                        SELECT
                        PlaceOrder.collateral AS collateral,
                        OrderFilled.position_id AS position_id,
                        OrderFilled.base_token AS base_token,
                        PlaceOrder.transaction_hash as transaction_hash
                        FROM PlaceOrder
                        JOIN OrderFilled ON OrderFilled.order_id == PlaceOrder.order_id AND OrderFilled.base_token == PlaceOrder.base_token
                        WHERE OrderFilled.order_type == 'Open'
                    )
                    SELECT
                    PlaceOrder.timestamp as timestamp,
                    PlaceOrder.base_token as base_token,
                    PlaceOrder.collateral_token as collateral_token,
                    PlaceOrder.order_type as order_type,
                    OrderFilled.order_type as status,
                    PlaceOrder.side as side,
                    PlaceOrder.distinct_id as distinct_id,
                    price,
                    size,
                    realized_amount-realized_fee-RealizeFunding.realized_funding_fee as realized_pnl,
                    OrderFilled.realized_pnl-RealizeFunding.realized_funding_fee_usd as realized_pnl_usd,
                    OpenOrder.collateral as collateral,
                    PlaceOrder.transaction_hash as transaction_hash
                    FROM PlaceOrder
                    LEFT JOIN OrderFilled ON OrderFilled.order_id == PlaceOrder.order_id AND OrderFilled.base_token == PlaceOrder.base_token
                    LEFT JOIN RealizeFunding ON RealizeFunding.position_id == OrderFilled.position_id AND RealizeFunding.base_token == OrderFilled.base_token AND RealizeFunding.transaction_hash == OrderFilled.transaction_hash
                    LEFT JOIN RealizeOption ON RealizeOption.position_id == OrderFilled.position_id AND RealizeOption.base_token == OrderFilled.base_token AND RealizeOption.transaction_hash == OrderFilled.transaction_hash
                    LEFT JOIN RemovePosition ON RemovePosition.transaction_hash == OrderFilled.transaction_hash
                    LEFT JOIN OpenOrder ON OpenOrder.position_id == OrderFilled.position_id  AND OpenOrder.base_token == PlaceOrder.base_token
                    ${tokenFilter}
                    UNION ALL
                    SELECT
                    PlaceOrderWithBidReceipt.timestamp as timestamp,
                    PlaceOrderWithBidReceipt.base_token as base_token,
                    PlaceOrderWithBidReceipt.collateral_token as collateral_token,
                    PlaceOrderWithBidReceipt.order_type as order_type,
                    OrderFilled.order_type as status,
                    PlaceOrderWithBidReceipt.side as side,
                    PlaceOrderWithBidReceipt.distinct_id as distinct_id,
                    price,
                    size,
                    realized_amount-realized_fee-RealizeFunding.realized_funding_fee as realized_pnl,
                    OrderFilled.realized_pnl-RealizeFunding.realized_funding_fee_usd as realized_pnl_usd,
                    RealizeOption.exercise_balance_value as collateral_amount,
                    PlaceOrderWithBidReceipt.transaction_hash as transaction_hash
                    FROM PlaceOrderWithBidReceipt
                    JOIN OrderFilled ON OrderFilled.order_id == PlaceOrderWithBidReceipt.order_id AND OrderFilled.base_token == PlaceOrderWithBidReceipt.base_token
                    LEFT JOIN RealizeFunding ON RealizeFunding.position_id == OrderFilled.position_id AND RealizeFunding.base_token == OrderFilled.base_token AND RealizeFunding.transaction_hash == OrderFilled.transaction_hash
                    LEFT JOIN RealizeOption ON RealizeOption.position_id == OrderFilled.position_id AND RealizeOption.base_token == OrderFilled.base_token AND RealizeOption.transaction_hash == OrderFilled.transaction_hash
                    ${tokenFilter}
                ) AS combined
                    ORDER BY timestamp DESC
            `,
            size: 100,
        },
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    if (data.result) {
        return data.result.rows as any[];
    } else {
        return [];
    }
}

/**
 * Inputs:
 *  day: number (at least 1)
 *  interval: in hour
 *
 * Returns Map<string, Volume[]>
 *  key: base_token {'APT','BTC','CETUS','DEEP','ETH','NAVX','NS','SOL','SUI','WAL'}
 *  value: Volume[]
 */
export async function getTradingVolumeFromSentio(
    fromTimestamp: number,
    interval: number,
    toTimestamp?: number
): Promise<Map<string, Volume[]>> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query";
    let requestData = {
        timeRange: {
            start: `${fromTimestamp}`,
            end: `${toTimestamp ?? now()}`,
            step: 3600 * interval,
        },
        limit: 30 * 24,
        queries: [
            {
                metricsQuery: {
                    query: "trading_volume_usd",
                    alias: "",
                    id: "a",
                    labelSelector: {},
                    aggregate: {
                        op: "SUM",
                        grouping: ["base_token"],
                    },
                    functions: [
                        {
                            name: "rollup_delta",
                            arguments: [
                                {
                                    durationValue: {
                                        value: interval,
                                        unit: "h",
                                    },
                                },
                            ],
                        },
                    ],
                    color: "",
                    disabled: false,
                },
                dataSource: "METRICS",
                sourceName: "",
            },
        ],
        formulas: [],
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    let samples = data.results[0].matrix.samples;

    let map = new Map<string, Volume[]>();

    samples.forEach((sample) => {
        // console.log(samples);
        let base_token = sample.metric.labels.base_token;
        let values: Volume[] = sample.values;
        // console.log(base_token);
        // console.log(values);
        map.set(base_token, values);
    });

    // console.log(map);
    // console.log(map.keys());
    // console.log(map.get("SUI")?.length);

    return map;
}

export async function getMinuteTradingVolumeFromSentio(base_token: TOKEN, minute: number, size: number): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    let requestData = {
        sqlQuery: {
            sql: `
                SELECT
                toDateTime(intDiv(toUnixTimestamp(timestamp), 60 * ${minute}) * 60 * ${minute}) as ts_start,
                sum(filled_size) AS total_filled_size
                FROM OrderFilled
                WHERE base_token = '${toSentioToken(base_token)}'
                GROUP BY ts_start
                ORDER BY ts_start DESC;
            `,
            size,
        },
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    if (data.result) {
        return data.result.rows as any[];
    } else {
        return [];
    }
}

export interface Volume {
    timestamp: string;
    value: number;
}

function now() {
    return Math.round(Date.now() / 1000);
}

function parseTimestamp(s: string) {
    return Math.round(Date.parse(s) / 1000);
}

export async function getTlpFeeFromSentio(fromTimestamp?: number, toTimestamp?: number): Promise<number> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query";
    let requestData = {
        timeRange: {
            start: `${fromTimestamp ?? 0}`,
            end: `${toTimestamp ?? now()}`,
            step: 3600,
        },
        limit: 20,
        queries: [
            {
                metricsQuery: {
                    query: "tlp_fee_usd",
                    alias: "",
                    id: "a",
                    labelSelector: {},
                    aggregate: {
                        op: "SUM",
                        grouping: [],
                    },
                    functions: [],
                    disabled: false,
                },
                dataSource: "METRICS",
                sourceName: "",
            },
        ],
        formulas: [],
    };
    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);
    // console.log(data.results[0].matrix.samples[0].values);

    let first = data.results[0].matrix.samples[0].values[0];
    let last = data.results[0].matrix.samples[0].values.at(-1);
    // console.log(first, last);
    let initial_value = fromTimestamp ? first.value : 0;
    // console.log(initial_value);
    let fee = last.value - initial_value;
    // console.log(fee);

    return fee;
}

export async function getTotalVolumeFromSentio(fromTimestamp?: number, toTimestamp?: number): Promise<number> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query";
    let requestData = {
        timeRange: {
            start: `${fromTimestamp ?? 0}`,
            end: `${toTimestamp ?? now()}`,
            step: 3600,
        },
        limit: 1,
        queries: [
            {
                metricsQuery: {
                    query: "trading_volume_usd",
                    alias: "",
                    id: "a",
                    labelSelector: {},
                    aggregate: {
                        op: "SUM",
                        grouping: [],
                    },
                    functions: [],
                    color: "",
                    disabled: false,
                },
                dataSource: "METRICS",
                sourceName: "",
            },
        ],
        formulas: [],
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data.results[0].matrix.samples[0].values);
    let initial_value = fromTimestamp ? data.results[0].matrix.samples[0].values.at(0).value : 0;
    // console.log(initial_value);

    let result = data.results[0].matrix.samples[0].values.at(-1).value - initial_value;
    // console.log(result);

    return result;
}

/** Returns Accumulated Users */
export async function getAccumulatedUser(): Promise<number> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query";

    let requestData = {
        timeRange: {
            start: "now-1h",
            end: "now",
            step: 3600,
            timezone: "Asia/Taipei",
        },
        limit: 1,
        queries: [
            {
                eventsQuery: {
                    resource: {
                        name: "",
                        type: "EVENTS",
                    },
                    alias: "",
                    id: "a",
                    aggregation: {
                        countUnique: {
                            duration: {
                                value: 0,
                                unit: "day",
                            },
                        },
                    },
                    groupBy: [],
                    limit: 1,
                    functions: [],
                    disabled: false,
                },
                dataSource: "EVENTS",
                sourceName: "",
            },
        ],
        formulas: [],
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data.results[0].matrix.samples[0].values[0].value);

    let result = data.results[0].matrix.samples[0].values.at(-1).value;
    // console.log(result);

    return result;
}

/**
 * Inputs:
 *   fromTimestamp: number, toTimestamp?: number
 *
 * Returns
 *   { timestamp: string, value: number }[]
 */
export async function getTlpPriceFromSentio(fromTimestamp?: number, toTimestamp?: number): Promise<{ timestamp: string; value: number }[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query";
    let requestData = {
        timeRange: {
            start: `${fromTimestamp ?? 0}`,
            end: `${toTimestamp ?? now()}`,
            step: 3600,
        },
        limit: 30 * 24,
        queries: [
            {
                metricsQuery: {
                    query: "tlp_price",
                    alias: "",
                    id: "a",
                    labelSelector: {},
                    aggregate: null,
                    functions: [],
                    color: "",
                    disabled: false,
                },
                dataSource: "METRICS",
                sourceName: "",
            },
        ],
        formulas: [],
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    let samples = data.results[0].matrix.samples;
    // console.log(samples[0].values);

    return samples[0].values;
}

export async function getUserPnlFromSentio(startTimestamp: number, endTimestamp: number, userAddress?: string): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    let userFilter = "";
    if (userAddress) {
        userFilter = `AND address == '${userAddress}'`;
    }

    let requestData = {
        version: 25,
        sqlQuery: {
            sql: `
            WITH
            Pnl_history as (
            SELECT
                timestamp as time,
                CAST( realized_pnl AS Float64 ) as Trader_PnlUSD,
                filled_size * filled_price as volumeUSD,
                distinct_id as address
                from OrderFilled
                    WHERE timestamp >= ${startTimestamp} and timestamp < ${endTimestamp}
            UNION ALL
                SELECT
                    timestamp as time,
                    CAST(value_for_lp_pool_usd + liquidator_fee_usd AS Float64) * (-1) as Trader_PnlUSD,
                    0 as volumeUSD,
                    distinct_id as address
                    from Liquidate -- collateral liquidate, liquidate fee不算
                        WHERE timestamp >= ${startTimestamp} and timestamp < ${endTimestamp}
            UNION ALL
                SELECT
                    timestamp as time,
                    CAST(realized_funding_fee_usd AS Float64) * (-1) as Trader_PnlUSD,
                    0 as volumeUSD,
                    distinct_id as address
                    from 'RealizeFunding' -- funding fee 正的是 user paid to pool
                        WHERE timestamp >= ${startTimestamp} and timestamp < ${endTimestamp}
            UNION ALL
                SELECT
                    timestamp as time,
                    CAST(
                        user_remaining_in_usd + (realized_loss_value - exercise_balance_value) * (user_remaining_in_usd / user_remaining_value) AS Float64
                    ) as Trader_PnlUSD,
                    0 as volumeUSD,
                    distinct_id as address
                    from 'RealizeOption'
                        WHERE timestamp >= ${startTimestamp} and timestamp < ${endTimestamp}
            ),
            sum_Trader_PnlUSD as (
                SELECT
                sum(Trader_PnlUSD) as Trader_PnlUSD,
                sum(volumeUSD) as volumeUSD,
                address
                from Pnl_history
                GROUP BY address
            )
            SELECT
            *
                from sum_Trader_PnlUSD
                    where address not in (
                        '0xc9ea1b9c3542551189cf26a08f5ca5ed7964aef34c14d06c888d30c8d91867e4',
                        '0x83d2cb640ee252bae6b01bd6104c4afc69071e67b688db85a029ce452c61f11c',
                        '0x39770d149a9bc9d9639314fca2c380e9061c0d230737635762c5bcc61dee13d0',
                        '0x834d17f7b2e167cae224325a17b49babffe168182c418caa0c63a92d6f70b83a',
                        '0xd35ae21660aee607ee21e104d093d03643d36efbf79df669092c4411308ed2e2',
                        '0xe6cbba68c446f52cf8211c12ae79179233c8f9cec5e0b5008418ec339ca72fea'
                        )
                    ${userFilter}
            order by Trader_PnlUSD desc
            `,
            size: 100,
        },
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    if (data.result) {
        return data.result.rows as any[];
    } else {
        return [];
    }
}

export async function getLeaderboardFromSentio(startTs: number, endTs: number): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    let size = (10 * (endTs - startTs)) / 60 / 60 / 24; // day * 10

    let requestData = {
        version: 25,
        sqlQuery: {
            sql: `
                WITH
                event AS (
                    SELECT
                        timestamp,
                        toDate(timestamp - INTERVAL 3 HOUR) AS logical_date,
                        toDate(timestamp - INTERVAL 3 HOUR) AS date,
                        score/power(10, 9) AS volume,
                        distinct_id
                    FROM Score
                ),
                sum_vol AS (
                    SELECT
                        logical_date,
                        distinct_id,
                        sum(volume) AS total_volume
                    FROM event
                    GROUP BY logical_date, distinct_id
                ),
                ranked AS (
                    SELECT
                        *,
                        row_number() OVER (PARTITION BY logical_date ORDER BY total_volume DESC) AS rk
                    FROM sum_vol
                ),
                top10 AS (
                    SELECT *
                    FROM ranked
                    WHERE rk <= 10
                ),
                top10_sum AS (
                    SELECT
                        logical_date,
                        sum(total_volume) AS top10_total_volume
                    FROM top10
                    GROUP BY logical_date
                )
                SELECT
                    toDateTime(logical_date + INTERVAL 3 HOUR) AS Date,
                    t.distinct_id as Address,
                    t.total_volume as Trading_Vol,
                    cast(t.total_volume AS Decimal256(18)) / cast(s.top10_total_volume AS Decimal256(18)) AS Volume_Share_Top10,
                    Volume_Share_Top10 * 150 as PrizePool_Share
                FROM top10 t
                JOIN top10_sum s ON t.logical_date = s.logical_date
                WHERE Date >= ${startTs} AND Date < ${endTs}
                ORDER BY
                    Date DESC,
                    t.rk ASC,
                    Volume_Share_Top10

            `,
            size,
        },
    };

    let jsonData = JSON.stringify(requestData);

    let response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: jsonData,
    });

    let data = await response.json();
    // console.log(data);

    if (data.result) {
        return data.result.rows as any[];
    } else {
        return [];
    }
}

// getRecentTradesFromSentio().then((x) => console.log(x));
// getAccumulatedUser().then((x) => console.log(x));
// getTradingVolumeFromSentio(1747008000, 1, 1747011600);
// getTlpPriceFromSentio(0).then((x) => console.dir(x, { depth: null }));
// getTotalVolumeFromSentio(0).then((x) => console.log(x));
// getTlpFeeFromSentio(0).then((x) => console.log(x));
// getUserPnlFromSentio(parseTimestamp("2025-06-24 11:00:00"), parseTimestamp("2025-07-08 11:00:00")).then((x) => console.log(x));
// getMinuteTradingVolumeFromSentio("SUI", 30, 10).then((x) => console.log(x));
// getLeaderboardFromSentio(1754362800, 1754362800 + 60 * 60 * 24 * 14).then((x) => console.log(x, x.length));
