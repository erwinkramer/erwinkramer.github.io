---
title: Lightweight Queueing
description: How to choose queueing that keeps work durable, visible, and close to the system before reaching for a broker or managed messaging platform.
author: Erwin Kramer
date: 2026-08-13
---

![Dark analog queueing map with Postgres records, message cards, worker lanes, and delayed handoff signals](/assets/lightweight-queueing-collage.svg)

A queue does not have to be a platform before it becomes useful. Sometimes it is just a durable record that says: this work exists, it has been accepted, and it still needs to move forward.

That is the philosophy behind [Queueing Matters](/articles/quiet-power-of-queues/). Queues give systems room to breathe. They separate acceptance from completion, make pressure visible, and let one part of a system keep moving while another part catches up.

The mistake is turning every delay into a broker decision. A message broker can be exactly right, but the first question should be smaller: where should the promise of the work live?

That question has old roots. In [Queues Are Databases](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-95-56.pdf), Jim Gray made the same pressure point hard to ignore: accepted work needs a place to wait without being forgotten.

## The shape to aim for

The direction is lightweight queueing rather than a queueing estate: durable handoffs close to the work they protect, clear ownership, visible retries, and no central broker unless the system actually needs one.

The target is a queueing architecture the organization can run on its own terms: free or genuinely open-source where the runtime matters, self-hostable, understandable from ordinary operational data, and small enough that teams do not need a messaging platform program before they can make work reliable.

The queue should do a few things well: record work durably, let workers claim work safely, make retries explicit, expose age and depth, keep poison messages from blocking everything, and let completed or failed work be archived, inspected, or cleaned up.

But it should not become the place where all integration meaning goes to live. The queue is a boundary, not a second application hidden between applications.

## Databases are serious candidates

The first lightweight queue is often not a broker. It is a table.

That sounds too simple until the system is examined honestly. Orders, payments, imports, notifications, documents, approvals, and integration state often become durable in a database before they become messages anywhere else. If the queue belongs to the same bounded context as that state, keeping the queue in the database can be the simplest honest design.

The database-backed queue works when the database can do three things well: commit the work and the queue record together, let workers claim rows atomically, and expose pending work through ordinary operational queries. That makes the database more than storage. It becomes the place where the system keeps its promise.

The exact mechanism depends on the database. Some systems have stronger row-claiming primitives than others, and some are better suited to local or embedded queueing than multi-worker server workloads. The point here is not that every database should become a broker. It is that the durable store can be the queue when the queue belongs to the same system.

In a .NET application, Entity Framework Core can own the ordinary data model and transaction boundary. A service can save the domain change and enqueue a row in the same transaction. Workers can then claim pending rows, process them, and mark them completed, failed, delayed, or ready for retry. The claim step should still be atomic; two workers should not be able to pick the same work.

The limitation is just as important. A database queue should not be stretched into a universal broker for the whole organization. A table queue is strongest when it protects local work, local retries, local projections, local notifications, or local handoffs. If many independent systems need shared routing, fan-out, protocol support, cross-region topology, or high-throughput event distribution, the queue has outgrown the application database.

## Where products fit

[PostgreSQL](https://www.postgresql.org/) plus an application worker is the default starting point when the queue belongs to the same system that owns the data. It is not a product so much as a design choice: a table for pending work, status fields, attempt counts, timestamps, visibility or lock timeouts, ordering, and worker code that claims rows carefully. [PGMQ](https://github.com/pgmq/pgmq) fits inside this choice rather than beside it: use it when the team wants a packaged Postgres queue primitive with SQS-like operations, visibility timeouts, archival, FIFO support, and topic-style features.

[Wolverine](https://wolverinefx.io/) is useful when the application is already in .NET and queueing is part of a broader message-handling model. It supports durable local queues, transactional inbox/outbox behavior, scheduling, handlers, and message storage through several databases, including PostgreSQL and SQL Server. JasperFx sells support and adjacent products, but the durable messaging features themselves are not hidden behind a paid runtime. Wolverine is not the answer to a simple queue table; it fits when the application wants a fuller messaging framework.

[NATS JetStream](https://docs.nats.io/nats-concepts/jetstream) fits when the queue really does need to leave the application database, but the organization still wants a lightweight, self-hostable messaging system. Core NATS is ephemeral pub/sub and request/reply. JetStream adds persistence, at-least-once delivery, replay, streams, consumers, and durable positions. It also has an open observability path through monitoring endpoints such as `/varz`, `/connz`, `/routez`, `/jsz`, and `/healthz`, plus the open-source [Prometheus NATS Exporter](https://github.com/nats-io/prometheus-nats-exporter). Keep it on the shortlist only when the topology needs a shared runtime.

If the shortlist had to be narrow: start with database queueing when the work belongs to one system, use PGMQ as part of the PostgreSQL path when the queue should become a reusable primitive, use Wolverine only when a .NET application wants a fuller message-handling framework, and move to NATS JetStream only when the topology needs an actual broker.

## What does not fit

Managed messaging services are useful, but they answer a different question. Amazon MQ, Amazon MSK, Amazon SQS, Amazon SNS, Azure Service Bus, Azure Event Hubs, Google Pub/Sub, Confluent Cloud, CloudAMQP, IBM MQ on Cloud, Oracle Cloud Streaming, Solace PubSub+ Cloud, and similar services can be good operational choices. They are not the clean default here because the goal is free, sovereign, self-hostable queueing that can remain close to the work. A managed queue may be right later, but it changes the ownership boundary.

Streaming platforms also answer a different question. Apache Kafka, Apache Pulsar, Redpanda, AutoMQ, RocketMQ, and similar systems are excellent when the organization needs an event log, replay, partitioned streams, broad fan-out, stream processing, or high-throughput event distribution. They are usually too much when the problem is simply: accept work, retry it, and make pending work visible.

Database changefeeds and live queries also answer a different question. MongoDB change streams, RethinkDB changefeeds, SurrealDB live queries, CockroachDB changefeeds, and similar features are useful for projections, notifications, synchronization, and downstream reactions. They are not automatically work queues. A queue needs claiming, retry ownership, pending-work visibility, and failure handling, not only a signal that data changed.

Enterprise brokers and integration suites should be treated carefully. IBM MQ, Red Hat AMQ, TIBCO Enterprise Message Service, Solace, Anypoint MQ, and similar products may be right in regulated or large enterprise environments. But they bring platform gravity: operations, governance, licensing, specialized skills, and central control. RabbitMQ sits nearby: it is a real open-source broker, but the VMware/Broadcom commercial offering carries much of the enterprise lifecycle and support story. These tools can be useful, but they are not lightweight defaults.

Workflow engines are also not queues. Temporal, Camunda, Airflow, Argo Workflows, Step Functions, Inngest, Restate, and similar tools can coordinate long-running processes, retries, human steps, schedules, or durable execution. That is valuable when the work is a workflow. It is unnecessary when the system only needs a queue.

## The choosing test

The queue should live where the promise is easiest to keep.

If the work is created and owned inside one application, keep it in that application's durable store. Use PostgreSQL, EF Core transactions, and either a careful queue table or PGMQ when PostgreSQL should provide the reusable queue primitive. Make the queue visible with ordinary SQL and ordinary dashboards.

If the work crosses several services but the organization still wants a small self-hosted messaging layer, use NATS JetStream. That gives the queue its own runtime because the boundary has become shared.

If the work is really an event stream, choose a streaming platform. If it is really a workflow, choose a workflow engine. If it is really an enterprise integration standard, choose a broker or managed service deliberately.

The point is not to avoid brokers. The point is to avoid pretending every delay needs one.

A good queue is a visible promise. It should make waiting understandable, retries honest, and pressure impossible to ignore. The best queueing architecture is often the smallest one that can keep that promise.