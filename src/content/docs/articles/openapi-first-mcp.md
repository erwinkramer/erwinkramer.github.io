---
title: OpenAPI-first MCP
description: A contract-first argument for generating MCP servers from OpenAPI instead of rebuilding integration logic by hand.
author: Erwin Kramer
date: 2026-08-07
---

<figure class="page-art">
	<img src="/assets/contact-ledger-collage.svg" alt="Dark analog ledger collage with columns and signal lines" />
</figure>

OpenAPI is not paperwork. It is one of the clearest machine-readable contracts most teams already have: operations, parameters, schemas, auth expectations, response shapes, and error boundaries in one place.

That makes it an excellent foundation for MCP servers.

The mistake is treating MCP as a reason to start over. If an API already has a good OpenAPI description, the responsible path is to use that contract as the source of truth and build the MCP surface from it. Not as a lazy wrapper. Not as a thin novelty layer. As a deliberate translation from a stable HTTP contract into tools an agent can discover, call, validate, and reason about.

## Contracts first, adapters second

Most production APIs already carry a lot of hard-won design work. The OpenAPI document captures endpoint shape, parameter names, request bodies, response schemas, authentication, error cases, and sometimes examples. That information is not incidental. It is the map of the system.

When building an MCP server for an existing API, ignoring that map is wasteful. It asks developers to rewrite the same integration knowledge by hand, usually in a new format, with new naming decisions, new validation logic, and new ways to drift from reality. Every manual adapter becomes a second contract. Every second contract eventually disagrees with the first.

An OpenAPI-first MCP server keeps the contract count low. The API contract remains the center. The MCP server becomes a generated and curated interface over it.

That distinction matters. Generated does not mean thoughtless. It means the baseline is repeatable, reviewable, and synchronized with the API. Human judgment then goes where it is valuable: deciding which operations are useful to agents, how tools should be named, what descriptions should say, and where safety constraints belong.

## What OpenAPI gives an MCP server

OpenAPI is especially useful because MCP tools need exactly the kind of information OpenAPI already describes.

An OpenAPI operation can become a candidate tool. Its `operationId` can seed a stable tool name. Its summary and description can become the first draft of tool documentation. Its request body and parameter schemas can become the input schema. Its response schema can inform result typing, examples, and downstream validation.

That gives a generator enough structure to produce useful MCP scaffolding:

1. Tool names based on stable operation identifiers.
2. Input schemas derived from path, query, header, and body parameters.
3. Runtime validation before calling the upstream API.
4. Consistent HTTP client behavior for auth, retries, timeouts, and errors.
5. Typed responses or normalized result envelopes.
6. Documentation that stays close to the API contract.

This is exactly where OpenAPI shines. It gives you enough structure to generate tool definitions, validate input before a request leaves the server, keep schemas aligned with the real API, and preserve the boring details that production systems depend on.

Boring is good here. Boring means fewer hand-written adapters quietly drifting away from the API they claim to represent.

## Curation still matters

OpenAPI-first does not mean every endpoint should blindly become a public MCP tool. That would be a different mistake.

Some endpoints are too low-level. Some exist only for internal orchestration. Some are dangerous without an explicit confirmation step. Some need pagination helpers. Some return shapes that are technically correct but unpleasant for an agent to work with. Some belong together as a higher-level workflow.

The right approach is to start from the contract, then curate.

For example, [erwinkramer/bank-api](https://github.com/erwinkramer/bank-api) is a design reference project for bootstrapping a compliant, modern API. It is exactly the kind of sample where this approach makes sense: start with the OpenAPI description, derive the MCP tool surface from it, and then curate the result. A banking API might expose endpoints like `GET /banks`, `POST /banks`, `GET /banks/{id}`, `PUT /banks/{id}`, and `DELETE /banks/{id}`. A generator can scaffold the obvious tools from those operations. A developer can then decide that destructive operations need stronger descriptions, confirmation requirements, or may not be exposed at all. The MCP layer becomes intentionally shaped, but it is still grounded in the contract.

That is the sweet spot: generated where precision matters, curated where experience matters.

## The workflow I want

The better workflow is straightforward:

1. Treat OpenAPI as the contract.
2. Generate or scaffold MCP tools from that contract.
3. Select the operations that deserve to be exposed.
4. Improve names and descriptions for agent use.
5. Add policy: authentication, authorization, confirmation, rate limits, and safety checks.
6. Normalize awkward responses where needed.
7. Keep the generated surface in sync as the API evolves.

That last point is the quiet superpower. MCP servers should not become a second integration estate with undocumented behavior. The more manually curated they become from scratch, the more they invite mismatch, drift, and fragile agent behavior.

OpenAPI-first MCP keeps the center of gravity where it belongs: in the API contract.

## What this prevents

The alternative is a pile of handwritten glue. It might feel clean at first, especially for a small demo. But production systems punish duplication.

Without the OpenAPI contract as the baseline, teams end up copying parameter names, rewriting schemas, re-documenting response fields, inventing new error handling, and manually tracking endpoint changes. A field becomes required in the API but optional in the MCP tool. A response changes shape but the tool description does not. An auth rule changes but the adapter still assumes the old behavior.

That is not a philosophical problem. It is an operational one.

Contract-first generation gives you a way to detect and manage those changes. If the OpenAPI document changes, the generated MCP surface can change with it. Diffs become visible. Reviews become concrete. Tool behavior remains tied to the service it represents.

## The default

OpenAPI and MCP are not rivals. OpenAPI describes what the service can do. MCP gives agents a practical way to use it.

Put them together and you get a maintainable bridge from existing APIs to agent-native workflows.

That should be the default direction: contract first, generated where possible, curated where it matters, and synchronized by design.

Start with the specification. Build the MCP server from it. Then apply judgment.

That is not just a convenient path. For existing APIs, it is the path that respects the work already done, reduces drift, and gives teams a serious foundation for agent integrations.