import * as Plot from "../../_npm/@observablehq/plot@0.6.16/e828d8c8.js";
import { utcDay } from "../../_node/d3-time@3.1.0/index.8fcc123e.js";
import { median, rollups } from "../../_node/d3-array@3.2.4/index.f89e3560.js";

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
            Plot.text(
                data,
                Plot.groupX(
                    { y: "count", text: "count" },
                    {
                        dy: -10,
                        x: (d) => utcDay(d.date),
                        textAnchor: "middle",
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
            Plot.text(
                data,
                Plot.groupX(
                    { y: "count", text: "count" },
                    {
                        dy: -10,
                        x: (d) => utcDay(d.date),
                        textAnchor: "middle",
                    },
                ),
            ),
        ],
    });
}
