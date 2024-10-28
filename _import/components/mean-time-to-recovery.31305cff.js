import * as Plot from "../../_npm/@observablehq/plot@0.6.16/e828d8c8.js";
import { median, rollups, sum, ascending } from "../../_node/d3-array@3.2.4/index.f89e3560.js";
import { utcDay } from "../../_node/d3-time@3.1.0/index.8fcc123e.js";
import {
    differenceInHours,
    formatDuration,
    intervalToDuration,
    add,
} from "../../_node/date-fns@4.1.0/index.8d4187c7.js";

export function calculateMedian(events) {
    return median(
        events.map((d) => {
            const created = new Date(d.created);
            const resolved = new Date(d.resolved);
            return differenceInHours(resolved, created);
        }),
    );
}

export function format(hours) {
    const start = new Date();
    const end = add(start, { hours });
    return formatDuration(intervalToDuration({ start, end }), {
        format: ["years", "months", "days", "hours"],
    });
}

export function renderTimeline(events, { width } = {}) {
    const data = events.map((d) => {
        const id = d.id;
        const created = new Date(d.created);
        const resolved = new Date(d.resolved);
        const recoveryTimeInHours = differenceInHours(resolved, created);
        return { id, created, resolved, recoveryTimeInHours };
    });

    const groupedByDate = rollups(
        data,
        (v) => sum(v, (d) => d.recoveryTimeInHours),
        (d) => utcDay(d.created),
    ).map(([created, recoveryTimeInHours]) => ({
        created,
        recoveryTimeInHours,
    }));

    groupedByDate.sort((a, b) => ascending(a.created, b.created));

    return Plot.plot({
        height: 900,
        width,
        x: {
            type: "utc",
            tickFormat: "%d %b %y",
            interval: utcDay,
        },
        y: {
            label: "Total Recovery Time (hours)",
            grid: true,
        },
        marks: [
            Plot.line(groupedByDate, {
                x: "created",
                y: "recoveryTimeInHours",
                stroke: "steelblue",
            }),
            Plot.dot(groupedByDate, {
                x: "created",
                y: "recoveryTimeInHours",
                fill: "red",
                tip: true,
                title: (d) => `${format(d.recoveryTimeInHours)}`,
            }),
        ],
    });
}
