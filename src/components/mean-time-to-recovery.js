import * as Plot from "npm:@observablehq/plot";
import { median, rollup, sum, ascending } from "d3-array";
import { utcDay } from "d3-time";
import {
    differenceInHours,
    formatDuration,
    intervalToDuration,
    add,
} from "date-fns";

export function calculateMedian(events) {
    const x = events.map((d) => {
        const created = new Date(d.created);
        const resolved = new Date(d.resolved);
        return differenceInHours(resolved, created);
    });
    return median(x);
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
        const created = new Date(d.created);
        const resolved = new Date(d.resolved);
        const recoveryTimeInHours = differenceInHours(resolved, created);
        return { created, resolved, recoveryTimeInHours };
    });

    const groupedByDate = rollup(
        data,
        (v) => sum(v, (d) => d.recoveryTimeInHours),
        (d) => utcDay(d.created),
    );

    const flattened = Array.from(
        groupedByDate,
        ([created, recoveryTimeInHours]) => ({
            created,
            recoveryTimeInHours,
        }),
    )
        .slice()
        .sort((a, b) => ascending(a.created, b.created));

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
            Plot.line(flattened, {
                x: "created",
                y: "recoveryTimeInHours",
                stroke: "steelblue",
            }),
            Plot.dot(flattened, {
                x: "created",
                y: "recoveryTimeInHours",
                fill: "red",
                tip: true,
            }),
        ],
    });
}
