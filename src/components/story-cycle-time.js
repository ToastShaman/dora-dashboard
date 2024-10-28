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

function diffTime(d) {
    return differenceInHours(new Date(d.resolved), new Date(d.created));
}

export function calculateMedian(stories) {
    return median(stories.map((d) => diffTime(d)));
}

export function calculateQuantile(stories, p) {
    return quantile(stories.map((d) => diffTime(d)).sort(ascending), p);
}

export function format(hours) {
    const start = new Date();
    const end = add(start, { hours });
    return formatDuration(intervalToDuration({ start, end }), {
        format: ["years", "months", "days", "hours"],
    });
}

export function renderTimeline(stories, { width } = {}) {
    const data = stories.map((d) => ({
        ...d,
        cycleTimeInHours: diffTime(d),
    }));

    data.sort((a, b) => ascending(a.created, b.created));

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

    const lastStory = data[data.length - 1];

    return Plot.plot({
        height: 800,
        width,
        x: {
            label: null,
            type: "utc",
            tickFormat: "%d %b %y",
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
                title: (d) => `${d.id} (${format(d.cycleTimeInHours)})`,
            }),

            Plot.text([[lastStory.created, percentile80]], {
                text: ["80th Percentile"],
                fill: "lightblue",
                textAnchor: "start",
                dx: -100,
                dy: -15,
            }),

            Plot.text([[lastStory.created, percentile95]], {
                text: ["95th Percentile"],
                fill: "lightcoral",
                textAnchor: "start",
                dx: -100,
                dy: -15,
            }),

            Plot.text([[lastStory.created, percentile99]], {
                text: ["99th Percentile"],
                fill: "crimson",
                textAnchor: "start",
                dx: -100,
                dy: -15,
            }),
        ],
    });
}
