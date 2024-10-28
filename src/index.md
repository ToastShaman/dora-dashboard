---
toc: false
---

# Dora Dashboard

DevOps Research and Assessment (DORA) provides a standard set of DevOps metrics used for evaluating process performance and maturity. These metrics provide information about how quickly DevOps can respond to changes, the average time to deploy code, the frequency of iterations, and insight into failures.

## What is DORA?

DORA originated as a team at Google Cloud specifically focused on assessing DevOps performance using a standard set of metrics. Their goal is to improve performance and collaboration while driving velocity. These metrics serve as a continuous improvement tool for DevOps teams everywhere by helping set goals based on current performance and then measuring progress against those goals.

## What are DORA metrics?

DORA metrics for DevOps teams focus on four critical measures:

* Frequency of deployments
* The amount of time between acceptance and deployment
* How frequently deployments fail
* How long it takes to restore service—or recover from a failure

##  Deployment frequency

DevOps teams generally deliver software in smaller, more frequent deployments to reduce the number of changes and risks in each cycle. More frequent deployments allow teams to collect feedback sooner, which leads to faster iterations.

Deployment frequency is the average number of daily finished code deployments to any given environment. This is an indicator of DevOps’ overall efficiency, as it measures the speed of the development team and their capabilities and level of automation.

Reducing the amount of work or the size of each deployment can help increase deployment frequency.


## Lead time for changes

Lead time for changes measures the average speed at which the DevOps team delivers code, from commitment to deployment. It indicates the team’s capacity, the complexity of the code, and DevOps’ overall ability to respond to changes in the environment.

This metric helps businesses quantify code delivery speed to the customer or business. For example, some highly skilled teams may have an average lead time of 2-4 hours for changes, whereas for others, it may be a week.

Reducing the amount of work in the deployment, improving code reviews, and increasing automation can help reduce lead time for changes.


## Time to restore service

Response time is critical when something goes wrong in the production environment. Whether it is an external security threat or a bug that has brought standard processes to a standstill, DevOps teams must be able to respond rapidly with: Bug fixes, New code, Updates.

The time to restore services, or mean time to recovery, is the average time between encountering the issue and resolving it in the production environment.

A response plan helps teams understand how to address issues before they arise, ultimately decreasing the time to restore service.

# How to get started

Prepare your data in the correct format to enable visualisation.
After shaping the data properly, save it in the `./data/` folder.
Then, update the include statement in the relevant report to reference your data:

```javascript
const events = FileAttachment("./data/my-project-mean-time-to-recovery.json").json();
```

See `README.md` for more help on how to build and deploy the dashboard.

## Deployment frequency

```json
[
    { "env": "staging", "date": "2024-02-03T09:36:59.432Z" },
    { "env": "dev", "date": "2024-01-29T02:56:04.177Z" },
    { "env": "prod", "date": "2024-01-14T06:43:28.841Z" },
    ...
]
```

## Time to restore service

```json
[
    { "id": "INC-96623", "created": "2024-06-09T03:06:23.688Z", "resolved": "2024-06-09T16:06:23.688Z" },
    { "id": "INC-90006", "created": "2024-01-03T06:51:26.580Z", "resolved": "2024-01-04T03:51:26.580Z" },
    { "id": "INC-94398", "created": "2024-06-19T12:00:28.241Z", "resolved": "2024-06-20T07:00:28.241Z" },
    ...
]
```

## Lead time for changes

```json
[
    { "id": "FKE-4212", "created": "2024-05-09T04:20:11.003Z", "resolved": "2024-05-12T15:20:11.003Z" },
    { "id": "FKE-40918", "created": "2024-06-21T18:23:25.885Z", "resolved": "2024-06-23T09:23:25.885Z" },
    ...
]
```
