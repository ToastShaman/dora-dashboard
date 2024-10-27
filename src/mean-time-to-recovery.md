---
title: Mean Time To Recovery
theme: dashboard
toc: false
---

# Mean Time To Recovery

Mean Time to Recovery (MTTR) is a key metric to measure the average time it takes to recover from a failure in production. 

```js
import {renderTimeline, calculateMedian, format} from "./components/mean-time-to-recovery.js";
```

```js
const events = FileAttachment("./data/fake-mean-time-to-recovery.json").json();
```

<div class="grid grid-cols-4">
  <div class="card">
    <h2>MTTR</h2>
    <span class="big">${format(calculateMedian(events))}</span>
  </div>
</div>

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => renderTimeline(events, {width}))}
  </div>
</div>
