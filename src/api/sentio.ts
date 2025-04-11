import { NETWORK } from "src";

const headers = {
    "api-key": "ffJa6FwxeJNrQP8NZ5doEMXqdSA7XM6mT",
    "Content-Type": "application/json",
};

export async function getFromSentio(event: string, userAddress: string, startTimestamp: string): Promise<any[]> {
    let apiUrl =
        NETWORK == "MAINNET"
            ? "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp_mainnet/sql/execute"
            : "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp/sql/execute";

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

export async function getTlpAPRFromSentio(): Promise<number> {
    let apiUrl =
        NETWORK == "MAINNET"
            ? "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query"
            : "https://app.sentio.xyz/api/v1/insights/typus/typus_perp/query";
    let requestData = {
        timeRange: {
            start: "now-7d",
            end: "now",
            step: 3600,
        },
        limit: 20,
        queries: [
            {
                metricsQuery: {
                    query: "tlp_price",
                    alias: "",
                    id: "a",
                    labelSelector: {},
                    aggregate: null,
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
    // console.log(data.results[0].matrix.samples[0].values[0]);

    let first = data.results[0].matrix.samples[0].values[0];
    let last = data.results[0].matrix.samples[0].values.at(-1);
    // console.log(first, last);
    let r = last.value / first.value - 1;
    // console.log(r);
    let apr = (365 / 7) * r;
    // console.log(apr);

    return apr;
}

export async function getVolumeFromSentio(): Promise<any[]> {
    let apiUrl =
        NETWORK == "MAINNET"
            ? "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query"
            : "https://app.sentio.xyz/api/v1/insights/typus/typus_perp/query";
    let requestData = {
        timeRange: {
            start: "now-3d",
            end: "now",
            step: 3600,
        },
        limit: 20,
        queries: [
            {
                eventsQuery: {
                    resource: {
                        name: "OrderFilled",
                        type: "EVENTS",
                    },
                    alias: "",
                    id: "a",
                    aggregation: {
                        total: {},
                    },
                    groupBy: ["trading_token"],
                    limit: 0,
                    functions: [],
                    color: "",
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
    let symbols: string[] = data.results[0].matrix.samples.map((s) => s.metric.labels.trading_token);
    console.log(symbols);

    let volume: Volume[][] = data.results[0].matrix.samples.map((s) => s.values);
    console.log(volume);

    return data.results as any[];
}

export interface Volume {
    timestamp: string;
    value: number;
}

export async function getTlpFeeFromSentio(): Promise<number> {
    let apiUrl =
        NETWORK == "MAINNET"
            ? "https://app.sentio.xyz/api/v1/insights/typus/typus_perp_mainnet/query"
            : "https://app.sentio.xyz/api/v1/insights/typus/typus_perp/query";
    let requestData = {
        timeRange: {
            start: "now-7d",
            end: "now",
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
                    aggregate: null,
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
    // console.log(data.results[0].matrix.samples[0].values[0]);

    let first = data.results[0].matrix.samples[0].values[0];
    let last = data.results[0].matrix.samples[0].values.at(-1);
    // console.log(first, last);
    let fee = last.value - first.value;
    // console.log(fee);

    return fee;
}

// getTlpAPRFromSentio();
// getVolumeFromSentio();
// getTlpFeeFromSentio();
