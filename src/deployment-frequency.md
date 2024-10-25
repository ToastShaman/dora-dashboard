---
title: Deployment Frequency
theme: dashboard
toc: false
---

# Deployment Frequency

Deployment frequency is how often a development team releases new features, bug fixes, or improvements to a live production environment.

```js
import {deploymentFrequency} from "./components/deployment-frequency.js";
```

```js
const events = FileAttachment("./data/fake-deployment-frequency.json").json();
```

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => deploymentFrequency(events, {width}))}
  </div>
</div>