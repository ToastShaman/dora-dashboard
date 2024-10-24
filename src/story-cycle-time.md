---
title: Story Cycle Time
theme: dashboard
toc: false
inspired_by: https://medium.com/agile-musings/the-cycle-time-scatter-plot-or-how-to-answer-the-question-when-will-it-be-done-262b9088e92e
---

# Story Cycle Time

Cycle time is a key metric in agile software development, particularly in tracking the efficiency of delivering user stories or features.
It refers to the total amount of time it takes for a user story to move through the entire workflow, from the moment work begins on it to the moment it's completed and delivered.
Understanding cycle time can help teams identify bottlenecks, improve their processes, and ultimately deliver value faster.

```js
import {cycleTime, meanCycleTime, pCycleTime} from "./components/story-cycle-time.js";
```

```js
const stories = FileAttachment("./data/story-cycle-time.json").json();
```

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Average Cycle Time</h2>
    <span class="big">${meanCycleTime(stories)}</span>
  </div>
  <div class="card">
    <h2>85th Percentile</h2>
    <span class="big">${pCycleTime(stories, 0.85)}</span>
  </div>
  <div class="card">
    <h2>90th Percentile</h2>
    <span class="big">${pCycleTime(stories, 0.90)}</span>
  </div>
  <div class="card">
    <h2>99th Percentile</h2>
    <span class="big">${pCycleTime(stories, 0.99)}</span>
  </div>
</div>

```js
cycleTime(stories, {height: 600, width: 1400})
```
