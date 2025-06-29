import { TOKEN } from "@typus/typus-sdk/dist/src/constants";
import { Event, NETWORK, toSentioToken } from "src";

const headers = {
    "api-key": "ffJa6FwxeJNrQP8NZ5doEMXqdSA7XM6mT",
    "Content-Type": "application/json",
};

export async function getFromSentio(event: string, userAddress: string, startTimestamp: string): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute";

    let requestData = {
        sqlQuery: {
            sql: `
                SELECT *
                FROM ${event}
                WHERE distinct_id = '${userAddress}' AND timestamp >= ${startTimestamp}
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
                SELECT
                timestamp,
                base_token,
                collateral_token,
                order_type,
                side,
                status,
                distinct_id,
                price,
                size,
                size_usd,
                realized_fee,
                realized_fee_in_usd,
                realized_pnl
                FROM PlaceOrder
                LEFT JOIN OrderFilled ON OrderFilled.transaction_hash == PlaceOrder.transaction_hash AND OrderFilled.position_id == PlaceOrder.position_id
                ${tokenFilter}
                ORDER BY timestamp DESC;
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

export interface Volume {
    timestamp: string;
    value: number;
}

function now() {
    return Math.round(Date.now() / 1000);
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

// getRecentTradesFromSentio().then((x) => console.log(x));
// getAccumulatedUser().then((x) => console.log(x));
// getTradingVolumeFromSentio(1747008000, 1, 1747011600);
// getTlpPriceFromSentio(0).then((x) => console.dir(x, { depth: null }));
// getTotalVolumeFromSentio(0).then((x) => console.log(x));
// getTlpFeeFromSentio(0).then((x) => console.log(x));
