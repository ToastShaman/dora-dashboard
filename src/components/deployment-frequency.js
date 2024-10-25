import * as Plot from "npm:@observablehq/plot";
import { group } from "d3-array";
import { utcDay } from "d3-time";
import { startOfDay, format } from "date-fns";

export function deploymentFrequency(events, { width } = {}) {
    const eventsWithStartOfDay = events.map((d) => ({
        ...d,
        date: startOfDay(d.date),
    }));

    const grouped = Array.from(
        group(eventsWithStartOfDay, (d) => d.date),
        ([date, events]) => ({ date, count: events.length }),
    );

    grouped.sort((a, b) => a.date - b.date);

    return Plot.plot({
        height: 800,
        width,
        x: {
            label: "Date",
            interval: utcDay,
        },
        y: {
            label: "Deployments",
            domain: [0, Math.max(...grouped.map((d) => d.count))],
            ticks: Math.max(...grouped.map((d) => d.count)),
        },
        marks: [
            Plot.barY(grouped, {
                x: "date",
                y: "count",
                tip: true,
                title: (d) => `${format(d.date, "YYY-MM-dd")} (${d.count})`,
            }),
        ],
    });
}
