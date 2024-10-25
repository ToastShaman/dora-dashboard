import * as Plot from "npm:@observablehq/plot";
import { rollup, sum, ascending } from "d3-array";
import { utcDay } from "d3-time";
import { differenceInHours } from "date-fns";

const diffTime = (d) =>
    differenceInHours(new Date(d.resolved), new Date(d.created));

export function renderTimeline(events, { width } = {}) {
    const data = events.map((d) => ({
        created: new Date(d.created),
        resolved: new Date(d.resolved),
        recoveryTimeInHours: diffTime(d),
    }));

    const groupedData = Array.from(
        rollup(
            data,
            (v) => sum(v, (d) => d.recoveryTimeInHours),
            (d) => utcDay(d.created),
        ),
        ([date, recoveryTimeInHours]) => ({ date, recoveryTimeInHours }),
    );

    groupedData.sort((a, b) => ascending(a.date, b.date));

    return Plot.plot({
        height: 900,
        width,
        x: {
            label: "Date",
            type: "utc",
            tickFormat: "%Y-%m-%d",
            tickRotate: 90,
            interval: utcDay,
        },
        y: {
            label: "Total Recovery Time (hours)",
            grid: true,
        },
        marks: [
            Plot.line(groupedData, {
                x: "date",
                y: "recoveryTimeInHours",
                stroke: "steelblue",
            }),
            Plot.dot(groupedData, {
                x: "date",
                y: "recoveryTimeInHours",
                fill: "red",
                tip: true,
            }),
        ],
    });
}
