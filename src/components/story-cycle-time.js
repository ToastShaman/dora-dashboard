import * as Plot from "npm:@observablehq/plot";
import { ascending, quantile, min, max } from "d3-array";
import { utcTicks, utcMonth } from "d3-time";

export function cycleTime(stories, { threshold, width, height } = {}) {
    const diffTime = (d) => Math.abs(new Date(d.resolved) - new Date(d.created)) / 360000;
    const storiesWithCycleTime = stories.map(d => ({ ...d, cycle_time_h: diffTime(d) }));
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
            ticks: ticks,
        },
        y: {
            grid: true,
            inset: 10,
            label: "Resolution Time (hours)",
        },
        marks: [
            Plot.ruleY([percentile95], {
                stroke: "lightcoral",
                strokeWidth: 2,      
                strokeDasharray: "4, 4",
                label: "95th Percentile"
            }),

            Plot.ruleY([percentile80], {
                stroke: "lightcoral",
                strokeWidth: 2,      
                strokeDasharray: "4, 4",
                label: "80th Percentile"
            }),

            Plot.dot(storiesWithCycleTime, {
                x: "created",
                y: "cycle_time_h",
                fill: d => d.cycle_time_h > threshold ? "red" : "steelblue",
                r: 5,
                tip: true
            }),

            Plot.text(storiesWithCycleTime, {
                x: "created",
                y: "cycle_time_h",
                text: d => `${d.id} (${d.status})`,
                lineAnchor: "bottom",
                dy: -10,
                lineWidth: 10,
                fontSize: 12
            })
        ],
    });
};
