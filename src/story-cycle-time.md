---
title: Story Cycle Time
theme: dashboard
toc: false
inspired_by: https://medium.com/agile-musings/the-cycle-time-scatter-plot-or-how-to-answer-the-question-when-will-it-be-done-262b9088e92e
---

# Story Cycle Time

The Cycle Time metric represents how many elapsed days a work item took to go through your workflow.
Once you have a few data points in your Cycle Time Scatter Plot, it becomes really useful as an analysis tool to answer one of the most important questions a stakeholder can ask you: When will a work item be done?

```js
import {renderTimeline, calculateMedian, calculateQuantile, format} from "./components/story-cycle-time.js";
```

```js
const stories = FileAttachment("./data/fake-story-cycle-time.json").json();
```

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Median Cycle Time</h2>
    <span class="big">${format(calculateMedian(stories))}</span>
  </div>
  <div class="card">
    <h2>85th Percentile</h2>
    <span class="big">${format(calculateQuantile(stories, 0.85))}</span>
  </div>
  <div class="card">
    <h2>90th Percentile</h2>
    <span class="big">${format(calculateQuantile(stories, 0.90))}</span>
  </div>
  <div class="card">
    <h2>99th Percentile</h2>
    <span class="big">${format(calculateQuantile(stories, 0.99))}</span>
  </div>
</div>

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => renderTimeline(stories, {width}))}
  </div>
</div>
