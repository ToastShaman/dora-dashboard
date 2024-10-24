import * as Plot from "npm:@observablehq/plot";
import { ascending, quantile, min, max } from "d3-array";
import { utcMonth, utcTicks, utcWeek } from "d3-time";
import { differenceInHours, formatDistance } from 'date-fns'

export function cycleTime(stories, { threshold, width, height } = {}) {
    const diffTime = (d) => differenceInHours(new Date(d.resolved), new Date(d.created));
    const fmtDiffTime = (d) => formatDistance(new Date(d.resolved), new Date(d.created), { addSuffix: true });
    const storiesWithCycleTime = stories.map(d => ({ ...d, cycle_time_h: diffTime(d) }));
    const percentile99 = quantile(storiesWithCycleTime.map(d => d.cycle_time_h).sort(ascending), 0.99);
    const percentile95 = quantile(storiesWithCycleTime.map(d => d.cycle_time_h).sort(ascending), 0.95);
    const percentile80 = quantile(storiesWithCycleTime.map(d => d.cycle_time_h).sort(ascending), 0.80);

    const minDate = min(stories, d => new Date(d.created));
    const maxDate = max(stories, d => new Date(d.resolved));
    const ticks = utcTicks(minDate, maxDate, utcMonth.every(1));

    return Plot.plot({
        height,
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
            label: "Resolution Time (hours)",
        },
        marks: [
            Plot.ruleY([percentile99], {
                stroke: "crimson",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "99th Percentile"
            }),

            Plot.ruleY([percentile95], {
                stroke: "lightcoral",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "95th Percentile"
            }),

            Plot.ruleY([percentile80], {
                stroke: "lightblue",
                strokeWidth: 2,
                strokeDasharray: "4, 4",
                label: "80th Percentile"
            }),

            Plot.dot(storiesWithCycleTime, {
                x: "created",
                y: "cycle_time_h",
                r: 5,
                tip: true,
                fill: d => d.cycle_time_h > threshold ? "red" : "steelblue",
                title: d => `${d.id} (${fmtDiffTime(d)})`,
            })
        ],
    });
};
