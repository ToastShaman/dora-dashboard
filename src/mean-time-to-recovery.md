---
title: Mean Time To Recovery
theme: dashboard
toc: false
---

# Mean Time To Recovery

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
