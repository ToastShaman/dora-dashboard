import * as Plot from "npm:@observablehq/plot";
import { min, max } from "d3-array";
import { utcDay, timeMonth } from "d3-time";
import { timeFormat } from "d3-time-format";
import { utcTicks } from "d3-time";

export function deploymentFrequency(events, { width } = {}) {
    const data = events.map((d) => ({ ...d, date: new Date(d.date) }));

    return Plot.plot({
        height: 800,
        width,
        x: {
            label: "Date",
            tickFormat: "%Y-%m-%d",
            tickRotate: 90,
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
