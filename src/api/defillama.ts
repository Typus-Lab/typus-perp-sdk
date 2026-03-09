export async function getRevenue(): Promise<Array<[string, number]>> {
    const apiUrl = "https://api.llama.fi/summary/fees/typus-finance?dataType=dailyRevenue";

    const headers = {
        Accept: "*/*",
    };

    const response = await fetch(apiUrl, {
        method: "GET",
        headers,
    });

    const data = await response.json();
    const chart: Array<[number, number]> = Array.isArray(data?.totalDataChart) ? data.totalDataChart : [];

    const monthly = aggregateMonthly(chart);
    return monthly;
}

function aggregateMonthly(chart: Array<[number, number]>): Array<[string, number]> {
    const map = new Map<string, number>();

    for (const entry of chart) {
        const ts = Number(entry[0]) || 0;
        const val = Number(entry[1]) || 0;
        const d = new Date(ts * 1000);
        const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
        map.set(ym, (map.get(ym) || 0) + val);
    }

    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

// getRevenue().then((data) => {
//     console.log("Monthly sums:", data);
// });
