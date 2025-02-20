const headers = {
    "api-key": "vQCQ6ZvvFesph3Q8usDLKfc7Wx2D8AX5M",
    "Content-Type": "application/json",
};

export async function getFromSentio(event: string, userAddress: string, startTimestamp: string): Promise<any[]> {
    let apiUrl = "https://app.sentio.xyz/api/v1/analytics/typus/typus_perp/sql/execute";

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

    return data.result.rows as any[];
}

export async function getTlpAPRFromSentio(): Promise<number> {
    let apiUrl = "https://app.sentio.xyz/api/v1/insights/typus/typus_perp/query";
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

// getTlpPriceFromSentio();
