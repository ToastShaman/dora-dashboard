---
title: Mean Time To Recovery
theme: dashboard
toc: false
---

# Mean Time To Recovery

```js
import {renderTimeline} from "./components/mean-time-to-recovery.js";
```

```js
const events = FileAttachment("./data/fake-mean-time-to-recovery.json").json();
```

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => renderTimeline(events, {width}))}
  </div>
</div>
