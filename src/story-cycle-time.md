---
title: Lead Time For Changes
theme: dashboard
toc: false
inspired_by: https://medium.com/agile-musings/the-cycle-time-scatter-plot-or-how-to-answer-the-question-when-will-it-be-done-262b9088e92e
---

# Lead Time For Changes

Lead Time for Changes measures the average speed at which the DevOps team delivers code, from commitment to deployment. It indicates the team's capacity, the complexity of the code, and DevOps’ overall ability to respond to changes in the environment.

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
