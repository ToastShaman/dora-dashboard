import * as Plot from "../../_npm/@observablehq/plot@0.6.16/e828d8c8.js";
import { ascending, quantile, median, min, max } from "../../_node/d3-array@3.2.4/index.f89e3560.js";
import { utcDay, utcDays, utcWeek, utcMonth, utcTicks } from "../../_node/d3-time@3.1.0/index.8fcc123e.js";
import {
    differenceInHours,
    formatDuration,
    intervalToDuration,
    add,
} from "../../_node/date-fns@4.1.0/index.8d4187c7.js";

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
    const data = stories
        .filter((d) => d.resolved)
        .map((d) => ({
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

export function renderBurndown(stories, { width } = {}) {
    const data = stories.map((d) => {
        const created = new Date(d.created);
        const resolved = d.resolved ? new Date(d.resolved) : null;
        return { ...d, created, resolved };
    });

    data.sort((a, b) => ascending(a.created, b.created));

    const expanded = data.flatMap((i) => {
        const dates = utcDays(i.created, i.resolved ?? utcDay());
        return dates.map((at) => ({ created: i.created, at }));
    });

    return Plot.plot({
        width,
        height: 600,
        x: { label: null },
        color: { legend: true, label: "Opened" },
        marks: [
            Plot.areaY(
                expanded,
                Plot.binX(
                    { y: "count", filter: null },
                    {
                        x: "at",
                        fill: (d) => utcWeek(d.created),
                        reverse: true,
                        curve: "step",
                        tip: { format: { x: null, z: null } },
                        interval: "day",
                    },
                ),
            ),
        ],
    });
}
