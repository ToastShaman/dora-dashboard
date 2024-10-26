import * as Plot from "npm:@observablehq/plot";
import { utcDay } from "d3-time";
import { median, rollups } from "d3-array";

export function calculateMedian(events, env = null) {
    return median(
        rollups(
            events.filter((d) => (env ? d.env === env : true)),
            (v) => v.length,
            (d) => utcDay(new Date(d.date)),
        ).map(([_, count]) => count),
    );
}

export function renderTimeline(events, { width } = {}) {
    const data = events.map((d) => ({ ...d, date: new Date(d.date) }));

    return Plot.plot({
        height: 800,
        width,
        x: {
            tickFormat: "%d %b %y",
            interval: utcDay,
        },
        y: {
            label: "Deployments",
            grid: true,
        },
        marks: [
            Plot.barY(
                data,
                Plot.groupX(
                    { y: "count" },
                    {
                        x: (d) => utcDay(d.date),
                        tip: true,
                    },
                ),
            ),
        ],
    });
}

export function renderTimelineByEnv(events, { width } = {}) {
    const data = events.map((d) => ({ ...d, date: new Date(d.date) }));

    return Plot.plot({
        height: 800,
        width,
        color: { legend: true },
        x: {
            tickFormat: "%d %b %y",
            interval: utcDay,
        },
        y: {
            label: "Deployments",
            grid: true,
        },
        marks: [
            Plot.barY(
                data,
                Plot.groupX(
                    { y: "count" },
                    {
                        x: (d) => utcDay(d.date),
                        fill: "env",
                        tip: true,
                    },
                ),
            ),
        ],
    });
}
