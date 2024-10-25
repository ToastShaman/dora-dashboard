import * as Plot from "npm:@observablehq/plot";
import { ascending, quantile, median, mean, min, max } from "d3-array";
import { utcMonth, utcTicks } from "d3-time";
import {
    differenceInHours,
    formatDistance,
    formatDuration,
    intervalToDuration,
    add,
} from "date-fns";

const diffTime = (d) =>
    differenceInHours(new Date(d.resolved), new Date(d.created));

const fmt = (hours) => {
    const start = new Date();
    const end = add(start, { hours });
    return formatDuration(intervalToDuration({ start, end }), {
        format: ["years", "months", "days", "hours"],
    });
};

export function calculateMedian(stories) {
    return fmt(median(stories.map((d) => diffTime(d))));
}

export function calculateQuantile(stories, p) {
    return fmt(quantile(stories.map((d) => diffTime(d)).sort(ascending), p));
}

export function renderTimeline(stories, { width } = {}) {
    const fmtDiffTime = (d) =>
        formatDistance(new Date(d.resolved), new Date(d.created), {
            addSuffix: true,
        });

    const data = stories.map((d) => ({
        ...d,
        cycleTimeInHours: diffTime(d),
    }));

    const percentile99 = quantile(
        data.map((d) => d.cycleTimeInHours).sort(ascending),
        0.99,
    );

    const percentile95 = quantile(
        data.map((d) => d.cycleTimeInHours).sort(ascending),
        0.95,
    );

    const percentile80 = quantile(
        data.map((d) => d.cycleTimeInHours).sort(ascending),
        0.8,
    );

    const colourRange = (value) => {
        if (value < percentile80) return "steelblue";
        if (value < percentile95) return "lightblue";
        if (value < percentile99) return "lightcoral";
        return "crimson";
    };

    const minDate = min(stories, (d) => new Date(d.created));
    const maxDate = max(stories, (d) => new Date(d.resolved));
    const ticks = utcTicks(minDate, maxDate, utcMonth.every(1));

    return Plot.plot({
        height: 800,
        width,
        x: {
            label: "End Date",
            type: "utc",
            tickFormat: "%Y-%m-%d",
            ticks,
        },
        y: {
            grid: true,
            inset: 10,
            label: "Cycle Time (hours)",
        },
        marks: [
            Plot.ruleY([percentile99], {
                stroke: "crimson",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "99th Percentile",
            }),

            Plot.ruleY([percentile95], {
                stroke: "lightcoral",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "95th Percentile",
            }),

            Plot.ruleY([percentile80], {
                stroke: "lightblue",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "80th Percentile",
            }),

            Plot.dot(data, {
                x: "created",
                y: "cycleTimeInHours",
                r: 5,
                tip: true,
                fill: (d) => colourRange(d.cycleTimeInHours),
                title: (d) => `${d.id} (${fmtDiffTime(d)})`,
            }),
        ],
    });
}
