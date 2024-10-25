---
title: Deployment Frequency
theme: dashboard
toc: false
---

# Deployment Frequency

Deployment frequency is how often a development team releases new features, bug fixes, or improvements to a live production environment.

```js
import {renderTimeline, renderTimelineByEnv, calculateMedian} from "./components/deployment-frequency.js";
```

```js
const events = FileAttachment("./data/fake-deployment-frequency.json").json();
```

## Overall

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Avg deploys/day</h2>
    <span class="big">${calculateMedian(events)}</span>
  </div>
</div>

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => renderTimeline(events, {width}))}
  </div>
</div>

## By Environment

<div class="grid grid-cols-3">
  <div class="card">
    <h2>Avg deploys/days <span class="muted">(Dev)</span></h2>
    <span class="big">${calculateMedian(events, 'dev')}</span>
  </div>
  <div class="card">
    <h2>Avg deploys/days <span class="muted">(Staging)</span></h2>
    <span class="big">${calculateMedian(events, 'staging')}</span>
  </div>
  <div class="card">
    <h2>Avg deploys/days <span class="muted">(Prod)</span></h2>
    <span class="big">${calculateMedian(events, 'prod')}</span>
  </div>
</div>

<div class="grid grid-cols-1">
  <div>
    ${resize((width) => renderTimelineByEnv(events, {width}))}
  </div>
</div>
