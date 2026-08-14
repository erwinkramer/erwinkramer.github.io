---
title: Workflows that Remember
description: Choosing a sovereign workflow engine for the rare processes that truly need durable memory, visible recovery, and code-first control.
author: Erwin Kramer
date: 2026-08-14
---

![Dark analog workflow map with durable state, code rails, timers, callbacks, and restart controls](/assets/workflows-that-remember-collage.svg)

A workflow engine is useful when work has to survive time. It is not a diagram, an approval box, or a more serious name for a background job. It is for named work with identity, memory, waiting, retries, compensation, and inspectable history: work that must continue after a worker crash, deployment, expired timer, late callback, or delayed human decision.

That gives workflow engines a real place in integration architecture, and makes them easy to overuse. Once one exists, ordinary delays start looking like workflows: a queue, a status column, three HTTP calls, a nightly import. The better question is smaller: what needs a durable process brain, and what only needs durable work?

That follows the restraint behind [Lightweight Queueing](/articles/lightweight-queueing/). A queue is enough when the system must accept work, retry it, and make pressure visible. A workflow engine is justified when work has durable decisions over time, when external events must resume a specific instance, or when failure needs controlled recovery instead of another blind retry.

The sovereignty requirement matters here. As argued in [Open Source Sovereignty](/articles/open-source-sovereignty/), operational control is not a nice extra for systems that run the organization. Workflow engines hold process state, retry buttons, schedules, callbacks, approval paths, and failure evidence. If the useful dashboard, identity, audit, restart, or recovery features live only in a SaaS tier or enterprise control plane, the organization has outsourced the place where stuck work is understood.

## The shape to aim for

The direction is focused workflow orchestration rather than an automation estate: workflow definitions as code, durable execution state, visible instance history, explicit retries, restart or rewind controls, and an included dashboard that operators can actually use.

This is not a search for the smallest durable-execution primitive. A library that checkpoints code can be useful, but it is not enough for this question by itself. The target is an operable workflow engine: durable execution plus the dashboard, identity-aware access, recovery controls, and storage model needed to run it responsibly.

The engine should solve workflows, not integration as a whole. It does not need to be the API gateway, message broker, schema registry, ETL suite, RPA platform, service catalog, and business rules engine. When a product tries to absorb all of that, the workflow requirement becomes a platform procurement. That is usually where the sovereignty argument is lost.

The preferred stack is free, open-source, and self-hostable where the runtime matters. Source, workflow definitions, runtime state, and operational controls should remain under the organization's control. A managed offering may be useful later, but it should not be the only way to get the features that make the engine operable.

The engine should also be code-first. Ordinary code is ideal when developers own the process logic. Readable YAML or another textual definition can work when it is stable, reviewable, and versioned in Git. A visual editor is acceptable only if it round-trips cleanly to readable source. If the canvas is the real source of truth, it is the wrong default here.

## When a workflow is actually needed

A workflow engine is justified when the process instance itself matters.

That happens when a process lasts longer than one request, worker, deployment, or ordinary retry window. It happens when a step waits for a timer, callback, webhook, message, or human decision. It happens when partial progress must be remembered so completed work is not repeated after a crash, or when compensation is needed because the third step failed after the first two already changed the world.

Those are real workflow problems. They have identity, time, state, and consequences.

Many cases are smaller. A background email sender usually needs a queue. A payment capture retry may need an outbox and idempotent handler. A document import may need a table with statuses, attempts, and error details. A scheduled cleanup may need a cron job. A three-step synchronous request may need better error handling, not orchestration.

The workflow engine should be introduced when the process cannot be made honest with those smaller tools.

## What the engine must do

Two rules shape the choice. First, the complete working stack must be free and self-hostable enough for the organization to keep operating without a mandatory external control plane. Second, operational features must not be trapped behind the paid product. A free runtime does not count if the dashboard, identity, retry, replay, audit trail, or production recovery path is only available through SaaS or enterprise packaging.

Workflows must be defined as code or as clean text that behaves like code. They should live in Git, move through CI/CD, support review, and survive without a proprietary editor. Versioning matters because long-running instances may still be executing old logic while new logic is deployed.

Execution must be durable. The engine should persist enough history to avoid repeating completed steps after a crash. It should support idempotent activities, timers, external events, explicit retries, and enough state to debug waiting and failed instances. Restart, reset, rewind, resume, cancel, terminate, and retry controls should be part of normal operations.

The dashboard must be included. Operators need to see running, completed, waiting, failed, and retried instances, with history, inputs and outputs where appropriate, timers, errors, worker status, and recovery actions. That dashboard also needs a real identity story: OIDC, existing application authorization, mTLS plus authorization, or another organizational access-control path. "Put it on a private port" is not identity support.

The storage model must be understandable. Workflow history and state are operational records. They need backup, retention, migration, and restore thinking. Payloads should be minimized or referenced where possible, so the workflow database does not become a shadow copy of every domain object.

Finally, domain state belongs in the domain. The workflow tracks coordination, waiting, history, and recovery. That boundary keeps the engine useful without making it the business system of record.

## An operable architecture

Applications start workflows or raise events. Workers execute workflow code and activities. The engine stores workflow history, timers, pending work, and execution state. A dashboard sits behind organizational identity and exposes instance search, history, failure details, and recovery actions. Observability flows into the normal telemetry stack.

Workflow definitions live with application code or in a Git-managed workflow repository. Deployment is ordinary CI/CD. If a visual editor exists, it edits the same textual definition that code review sees. The UI is an operating surface, not the only place the truth exists.

The engine can use queues internally, but it is not chosen as the queueing strategy for the whole architecture. It can consume events, but it is not the eventing backbone. It can call APIs, but it is not the API design model. This boundary follows the same logic as [Decoupled by Design](/articles/decoupled-by-design/): avoid letting one helpful product decision quietly define unrelated architecture.

## Where products fit

[Durable Task Extensions](https://github.com/lucaslorentz/durabletask-extensions) is a strong fit when the organization is already building in .NET and wants workflow-as-code without adopting a large external platform. It builds on Microsoft's open-source [Durable Task Framework](https://github.com/Azure/durabletask) (DTFx) and adds the missing practical pieces: .NET dependency injection and hosting integration, a REST API, an administrative and monitoring UI, EF Core storage for PostgreSQL, MySQL, SQL Server, and InMemory, plus composable server options.

Its operational surface matches the requirement instead of dodging it. The UI is included and supports OIDC/OAuth2 configuration. The API integrates with ASP.NET Core authorization policies, so read, history, create, terminate, event, and purge operations can be tied to real roles. EF Core storage adds input/output observability, orchestration tags, full execution history, reliable event delivery, and enhanced rewind.

The caveat is scope. Durable Task Extensions is a smaller project than the major workflow and orchestration platforms, and it is naturally strongest in .NET environments. That does not make it a bad choice. It means it should be chosen deliberately: excellent for sovereign .NET workflow execution where the team can own the runtime, less appropriate as a broad polyglot workflow platform for many unrelated teams.

[Cadence](https://github.com/cadence-workflow/cadence) is the strongest non-.NET challenger that still fits the spirit of the requirement. It is Apache 2.0 and self-hosted. [Cadence Web UI](https://github.com/cadence-workflow/cadence-web) is also Apache 2.0, so the dashboard is free rather than a commercial add-on. For this article, the Web UI is not optional in practice: without it, Cadence is mostly a backend and CLI, while the requirement asks for an operator surface to inspect and recover executions. The UI supports JWT-based authentication, TLS configuration, workflow diagnostics, and batch actions such as terminate, cancel, reset, and signal. The CLI also exposes workflow reset and terminate operations.

The caveat is operational footprint and ecosystem fit. Cadence is a platform with multiple backend services, persistence, optional visibility/search infrastructure, workers, CLI, and Web UI. It also fits best when Go or Java SDKs are acceptable. The free MIT-licensed [iWF](https://github.com/indeedeng/iwf) project can sit on top of Cadence, but its value is a different REST/state-machine programming model rather than broader language reach; in normal use it still means Java or Go SDKs, another service, and another abstraction layer. For an organization that wants a sovereign platform and can run it deliberately, Cadence belongs on the shortlist. For a .NET application that wants the workflow engine close to the application, Durable Task Extensions remains the more natural fit.

That leaves a narrow fit list. Durable Task Extensions is the best match for code-first .NET workflow execution. Cadence is the cleanest open-source platform challenger when the organization is willing to operate a broader workflow runtime. Both match the stricter bar better than the products below: self-hostable, permissively licensed, dashboard included, recovery controls included, and no obvious enterprise or SaaS funnel for the operating surface.

## What does not fit

Managed workflow services such as **AWS Step Functions**, **Google Cloud Workflows**, and **Microsoft's Durable Task Scheduler** can be good engineering choices, but they answer a different question. They are not the default here because the goal is a sovereign workflow runtime whose state, history, dashboard, identity, and recovery controls can remain under the organization's control.

Some products are technically strong but pull production governance into a managed or enterprise control plane. **Temporal** has a capable self-hosted runtime and Web UI, but roles, service accounts, API keys, audit logging, SAML, SCIM, private connectivity, support, and managed high availability are natural Temporal Cloud concerns. **Kestra** has a useful Apache 2.0 open-source edition, but SSO, RBAC, audit logs, multi-tenancy, high availability, stronger isolation, and enterprise safeguards sit in Kestra Enterprise. **Conductor** has a real Apache 2.0 OSS engine and built-in UI, but Orkes positions governance, security, observability, fine-grained RBAC, operational reliability, and audit logs around its broader commercial platform. **Hatchet** is the strongest technical challenger, with MIT licensing, self-hosting, code-defined workflows, dashboard, multi-tenancy, users, and roles, but SSO, audit logging, improved monitoring, multi-region deployments, enterprise support, and self-host support are emphasized around Hatchet Cloud. **Aiki** is an early Apache 2.0 TypeScript entrant with self-hosting, a standalone server, dashboard, optional IAM, retries, schedules, pause, resume, and cancel, but its public positioning already points toward Aiki Cloud for managed infrastructure. **Sayiir** has an MIT open-source core with Rust, Python, and Node.js bindings, but its roadmap puts the web dashboard, workflow visualization, manual interventions, multi-tenancy, RBAC, managed scheduling, mTLS, audit logging, and secret management under Enterprise Sayiir Server. The issue in these cases is not capability; it is commercial gravity around the operating surface.

Other tools are broader runtimes or ecosystems rather than focused workflow engines. **Elsa Workflows** is MIT-licensed, .NET-native, self-hostable, and supports C# code, JSON definitions, and Elsa Studio, but its center of gravity is a workflow library/server/designer ecosystem and its documentation still calls out operational UI limitations. **Dapr Workflow** is Apache 2.0, CNCF-backed, code-first, and strong on workflow access policies, mTLS identity, history signing, and HTTP/CLI lifecycle operations, but Dapr is a distributed-application runtime rather than a workflow product with an included recovery dashboard. **LittleHorse** is code-first and has a dashboard, but the server and dashboard are AGPL and the platform introduces its own Kernel, Kafka, identity-bridge, and integration model.

Several candidates are useful durable-execution or background-work signals, but not complete operable workflow engines by this standard. **Restate** uses the Business Source License and has an incomplete free governance story. **Inngest** uses the Server Side Public License with delayed Apache publication, while its hosted plans carry SAML, RBAC, audit trails, longer trace retention, advanced observability, and support. **DBOS Transact** is a strong MIT durable-execution library, but the management console and governance story sit in paid DBOS Conductor plans. **Wexflow** is MIT-licensed, self-hostable, and has a useful dashboard-backed automation surface, including human intervention, but the docs do not show a dashboard retry/replay action for failed jobs. That leaves it short of this article's operator-recovery requirement. **JobRunr** has an excellent JVM background-job dashboard, but workflow-like features, authentication, and advanced controls sit in JobRunr Pro. **Infinitic** is a thoughtful Java/Kotlin workflow-as-code engine on Pulsar, but observability is described as dashboards built through APIs rather than an included operator surface. **TanStack Workflow** is a TypeScript-focused embeddable durable-execution library with plain-code APIs and persistent stores, but the dashboard, identity, and recovery controls needed here are still planned, minimal, or outside the core project. **Flawless** is genuinely cutting edge as Rust/WebAssembly durable computation, but it is closer to an execution experiment than an operable workflow engine with identity and recovery controls.

Adjacent categories should stay in their lane. **pg_durable** is database-local durable SQL functions for Postgres-heavy work, not a general application/process workflow engine; its observability is SQL-table based rather than an operator dashboard, and it is intentionally SQL-shaped. **Airflow**, **Dagster**, **Prefect**, and **Azkaban** are strong for data pipelines, scheduled jobs, assets, and batch dependencies. **Argo Workflows** is strong when the work is a set of containerized steps that must run on a cluster, pass artifacts around, and be retried as Kubernetes workloads. **Camunda**, **Flowable**, **Activiti**, **Bonita**, and **jBPM** can be right when BPMN, human tasks, and process governance are real requirements. **n8n**, **Node-RED**, **Activepieces**, **Automatisch**, **Windmill**, **Make**, **Zapier**, and **Power Automate** solve citizen automation and integration-builder problems. None are the clean default for this article's code-first, sovereign workflow-engine requirement.

The common exclusion is not visual design or commercial support by itself. The exclusion is hidden dependence. If the open-source runtime is mostly a teaser and the production dashboard, identity, audit, high availability, retry, replay, or recovery controls require a vendor control plane, the product does not meet this standard.

## The choosing test

Start with the most specific honest mechanism.

If the work is just accepted now and done later, use a queue. If the process state belongs inside one domain model, use that domain model and a status table. If the work is a scheduled data pipeline, use a data orchestrator. If the work is mostly launching, sequencing, and retrying containers on Kubernetes, use a Kubernetes workflow tool. If it is employee-facing automation across SaaS tools, use a self-service automation product deliberately.

Reach for a workflow engine when a named process instance must survive time, failures, deployments, callbacks, timers, and partial completion, and when operators need to inspect and recover that instance later.

For a .NET-centered organization, Durable Task Extensions is the most sympathetic starting point: code-first, self-hostable, database-backed, dashboard included, MIT-licensed, and identity-aware through OIDC and ASP.NET Core authorization. For a broader open-source platform where Go or Java workers are acceptable, Cadence is the serious challenger. For broader polyglot or adjacent open-source requirements, Elsa, Dapr Workflow, Wexflow, LittleHorse, Infinitic, pg_durable, and TanStack Workflow may still be worth studying, but only with explicit licensing, maturity, fit, and operator-control tradeoffs. They are not the clean default for a free, complete, operable sovereign workflow engine.

A good workflow engine is not a universal process brain. It is a visible, durable ledger for work that really has to remember where it is.
