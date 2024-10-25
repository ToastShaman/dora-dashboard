---
title: Deployment Frequency
theme: dashboard
toc: false
---

# Deployment Frequency

Deployment frequency is how often a development team releases new features, bug fixes, or improvements to a live production environment.

```js
import {deploymentFrequency, deploymentFrequencyByEnv} from "./components/deployment-frequency.js";
```

```js
const events = FileAttachment("./data/fake-deployment-frequency.json").json();
```

## Overall

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => deploymentFrequency(events, {width}))}
  </div>
</div>

## By Environment

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => deploymentFrequencyByEnv(events, {width}))}
  </div>
</div>