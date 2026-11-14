---
title: Rented Tokens
description: Why the context window is a lease rather than memory, and how to choose agent memory that keeps durable state portable, inspectable, and sovereign.
date: 2026-09-04
sidebar:
  order: 160
---

An agent's context window is not memory. It is a rented working set: a fixed budget of tokens, re-paid every turn, that disappears when the session ends.

That makes it an excellent place to hold a plan, a tool result, or the last five exchanges, and a terrible place to hold what an organization actually learned. Yet most agent systems put it there, because it is the only place that is always there.

The mistake is treating the most expensive, most transient surface in the system as the archive.

[Systems that Listen](/articles/systems-that-listen/) argues that learning changes what happens next, but only if there is somewhere for the lesson to live after the session that produced it ends. The context window is not that somewhere.

## Pay per turn

Every token in context costs two things on every turn.

First, GPU memory. For a grouped-query-attention model like Llama 3.1 8B, each token occupies roughly 128 KB of KV cache at fp16, which puts a full 80k-token window at about 10 GB of VRAM. On consumer hardware that is not an abstraction; it is the difference between a model that fits and one that does not.

Second, latency. Prefill scales with sequence length, and attention keeps paying for everything still in the window. The quality degrades too: [research across eighteen models](https://github.com/GAIR-NLP/ContextRot) found performance dropping as context grows, even on trivial tasks. A stuffed window is not more memory. It is worse memory, and it costs more to keep.

The context window is what a RAM page cache is to a database: a fast, small, expensive scratchpad. It is not the system of record, and it should not be.

## Two planes, one boundary

The July 2026 IETF draft [Architecture and Data Model for Persistent Memory in Agentic Systems](https://datatracker.ietf.org/doc/draft-infantado-agent-memory-architecture/) (project shorthand **P**ersistent **A**gentic **M**emory **A**rchitecture **S**pecification, PAMSPEC) names the boundary every working agent system has converged on: a **compute plane** that is transient (inference, planning, tool execution, context assembly) and a **persistent state plane** that is authoritative (the canonical records of what the agent knows, versioned, scoped, and auditable).

The draft's component list is a good map of what a serious memory system actually is: persistent, addressable **memory objects** with stable identity; **immutable versions**, because silent overwrite is what makes memory unauditable; an **event ledger** of what was written, read, redacted, or deleted; **scopes**, so one agent's memory does not leak into another's; **tombstones** for what was removed and why; and **derived indexes**: embeddings and search structures that are regenerable caches over the archive, never the archive itself. That last item is where most "memory" products quietly go wrong: they build the index first and treat it as the state.

This is the same argument as [Queueing Matters](/articles/queueing-matters/), applied to the newest state people are trying to hold. A queue is justified when work needs a durable home before it moves; memory is justified when knowledge needs to outlive the session that produced it. Below that threshold, the smaller tool is enough.

## An index over an archive

Once the archive exists on disk, the window changes role: it becomes an index, a small current view over a much larger, durable body of knowledge.

The consensus that has emerged splits that knowledge into three stores, borrowed from cognitive science:

**Episodic**: the timeline of what happened. Tool calls, decisions, failures, with timestamps. Appended cheaply, retrieved with recency weighting. And unlike the other two, it is allowed to be forgotten: raw episodes are kept for weeks or months, then let go, because the semantic store already holds what mattered. Forgetting is a design feature.

**Semantic**: distilled, deduplicated facts. "We chose Postgres because X." "The user prefers terse output." The cost model is what makes them work: distillation is paid once, at write time, by a small inference pass. Retrieval is paid at read time, in milliseconds of search and a few hundred injected tokens. The alternative, replaying the raw transcript that produced those facts, costs the full transcript every session, forever.

**Procedural**: how things get done. Skill files, runbooks, AGENTS.md conventions. The SKILL.md standard is where this store is converging: a plain-text file whose name and description sit in context for a few dozen tokens, with the full body loaded only when the task matches. It is portable across agent frameworks, greppable, and versionable in Git, which makes it the procedural half of the two-plane split. Progressive disclosure is the same bet as fact retrieval: a few tokens of index instead of thousands of content.

All three agree on the economics: the window holds the index, the archive holds the record, and retrieval moves only what the current work needs.

## Keep the archive small

The direction is a sovereign memory plane rather than a memory platform: durable, distilled state that the organization owns, can inspect, can redact, and can move.

The first memory system should be small enough to read in an afternoon:

1. **A table or a file of records.** One row per fact: type, content, scope, decided date, source. A Markdown file per project is a legitimate first implementation; a SQLite table with full-text search is the next step up. No embedding model required.
2. **Distilled, not transcribed.** The record is the decision or the fact, not the conversation that produced it. Retries, tool noise, and dead ends do not belong in the archive.
3. **Versioned in Git.** Memory records are operational records: they need history, review, and the same backup and retention thinking as [observability signals](/articles/observability-by-signal/). A memory that cannot be diffed is a memory you do not own.
4. **Scoped by default.** Per project, per agent, per user. Cross-scope leakage is the failure mode the IETF draft calls out first, and the one that turns a helpful archive into a privacy incident.
5. **Redactable.** If a fact must be deleted or corrected, the system must say what was removed and why, without keeping the content. That is the tombstone, and it is not an afterthought.
6. **Portable.** The records should be plain text or plain rows that another tool or framework can read without a proprietary export step. As argued in [Open Source Sovereignty](/articles/open-source-sovereignty/), the moment the archive only exists inside one vendor's runtime, it is no longer an asset. It is a subscription.

Retrieval can start dumb: full-text search over a small archive is fast, explainable, and good enough until it is not. Embeddings belong in the derived-index layer: regenerable, rebuildable from the records any time they drift.

## The sole survivor

The sovereignty requirements from the previous section are the filter: self-hosted, inspectable, versionable, scoped, redactable, portable, and real access control (not just a self-declared agent ID). Of the major products in this space, one passes them cleanly.

[Agent-Memory-OS](https://github.com/yamantaka520/Agent-Memory-OS) is a team-scoped memory layer where the ACL is the core design, not a paid add-on. It keeps everything in one SQLite file, works without an LLM, and what you are not allowed to see never reaches the results: each memory is private, team-, project-, or global-scoped, and anything out of scope is dropped outright, not just ranked low. Federation across nodes (memories and org structure converging with tombstones and revocation that propagates) is built in, free. Apache 2.0, stable, zero required dependencies.

## What to decline

The rest of the field does not fit, and the reasons cluster into three groups.

The first is the products that keep the processing in a vendor's cloud. **claude-mem** (nearly 95k stars, the most-starred project in this space) is the closest case: its default install provisions a hosted observer model, and the local-only mode is opt-in. The processing runs on the vendor's infrastructure by default, not under the organization's control. **OpenViking** (AGPL, from Volcengine) is the convergence signal in this space: a context database that unifies memory, retrieval, and skills in one store. But its primary model provider is Volcengine's paid cloud (Doubao VLM and embedding), and the purchase guide is the first thing in the docs. The code is open; the content-understanding layer is not.

The second is the products where the engine is genuinely open but the layer an organization actually needs is a subscription. **Letta** (formerly MemGPT) is the most capable local runtime in the space, and its self-hosted edition is genuinely sovereign: Apache 2.0, no account required, the agent manages its own memory blocks and paged storage. But the team layer is not: sharing agents across an organization, setting permissions, and multi-agent collaboration all require a paid plan, and the free tier caps at three stateful agents. The memory engine is yours; the organizational layer is a subscription. **Graphiti** (Apache 2.0, from Zep) is the strongest temporal knowledge graph in the space: entities, relationships, and time-scoped facts with a bi-temporal model. The open-source engine is genuinely self-hostable, with pluggable backends (Neo4j, FalkorDB, Neptune). But the production layer is not: governance (RBAC, ABAC, audit, retention, multi-tenant isolation), the dashboard, and optimized retrieval all live in Zep, the managed service. The graph engine is yours; the organization that operates it is a subscription.

The third is **Mem0** (roughly 65k stars), the largest general-purpose memory layer, which is too risky for a sovereignty mandate: the extraction policy is the product's. What gets remembered, how it is phrased, and how conflicts resolve are decisions you inherit rather than make, and the open-source edition has been shedding capabilities into the paid platform as it goes (graph stores, memory decay, temporal reasoning, background consolidation, structured export). The archive is yours, but the policy over what enters it is not.

Below the named products, two architectural approaches do not fit at all. The embedding-store-first products, even when self-hosted: a vector index with no canonical records, no versions, no scopes, and no redaction path is a cache pretending to be a database. It cannot be diffed, and it cannot answer "what did the agent believe, and since when?" And the transcript-as-memory approach: the full history paid for every turn in VRAM and latency, with no provenance, no redaction, no portability, and degraded recall as the window grows.

## Where to draw the line

Start with the smallest honest mechanism: a decisions file per project, a SQLite table with a few well-named columns and a full-text search query, a session summary at the end of each long conversation. These are memory, they are sovereign, and they cost nothing in VRAM.

Reach for a real memory layer only when the archive has outgrown grep: multiple projects, multiple agents, conflicting facts that need resolution, redaction that must be provable, or retrieval that full-text search cannot handle.

A good agent memory is not a second brain. It is a durable, versioned, scoped ledger of what the agent knows, kept under the organization's own control. The window holds the index. The archive holds the truth. And the truth belongs to the organization.
