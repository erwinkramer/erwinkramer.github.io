---
title: OpenAPI-first MCP
description: A contract-first argument for generating MCP servers from OpenAPI instead of rebuilding integration logic by hand, with code mode as the discovery layer.
date: 2026-10-28
sidebar:
  order: 140
---

OpenAPI is not paperwork. It is one of the clearest machine-readable contracts most teams already have: operations, parameters, schemas, auth expectations, response shapes, and error boundaries in one place.

That makes it an excellent foundation for MCP servers. The mistake is treating MCP as a reason to start over. If an API already has a good OpenAPI description, the responsible path is to translate that stable HTTP contract into tools an agent can discover, call, validate, and reason about.

## Contracts first, adapters second

Most production APIs already carry a lot of hard-won design work. The OpenAPI document captures endpoint shape, parameter names, request bodies, response schemas, authentication, error cases, and sometimes examples. Ignoring that map asks developers to rewrite the same integration knowledge by hand, usually in a new format, with new naming decisions, new validation logic, and new ways to drift from reality.

An OpenAPI-first MCP server keeps the contract count low. The API contract remains the center. The MCP server becomes a generated and curated interface over it. Generated does not mean thoughtless. It means the baseline is repeatable, reviewable, and synchronized with the API. Human judgment then goes where it is valuable: deciding which operations are useful to agents, how tools should be named, and where safety constraints belong.

## What OpenAPI gives an MCP server

OpenAPI operations already describe the ingredients MCP tools need:

1. Tool names based on stable operation identifiers.
2. Input schemas derived from path, query, header, and body parameters.
3. Runtime validation before calling the upstream API.
4. Consistent HTTP client behavior for auth, retries, timeouts, and errors.
5. Typed responses or normalized result envelopes.
6. Documentation that stays close to the API contract.

Boring is good here. It means fewer handwritten adapters quietly drifting away from the API they claim to represent.

## Curation still matters

OpenAPI-first does not mean every endpoint should blindly become a public MCP tool. That would be a different mistake.

Jeremiah Lowin makes that warning from an interesting position in [Stop Converting Your REST APIs to MCP](https://jlowin.dev/blog/stop-converting-rest-apis-to-mcp). Lowin built [FastMCP](https://gofastmcp.com/), whose OpenAPI integration includes `FastMCP.from_openapi()`. His point is not that generation is useless. It is that generation should be treated as a starting point, not shipped as an uncurated production interface.

Some endpoints are too low-level. Some are dangerous without an explicit confirmation step. Some need pagination helpers. Some belong together as a higher-level workflow — which is exactly what [Arazzo](https://spec.openapis.org/arazzo/latest.html) was built to describe.

The right approach is to start from the contract, then curate.

For example, [erwinkramer/bank-api](https://github.com/erwinkramer/bank-api) is exactly the kind of sample where this approach makes sense. A generator can scaffold tools from operations like `GET /banks`, `POST /banks`, and `GET /banks/{id}`. A developer can then hide destructive operations, require confirmation, improve names, or compose lower-level endpoints into a safer workflow. The MCP layer becomes intentionally shaped, but still grounded in the contract.

That is the sweet spot: generated where precision matters, curated where experience matters.

## Discovery is the problem generation leaves

Here is the part most MCP discussions skip: once a server is live, how does an agent actually find and use the right tool? The naive answer is to declare every tool directly to the model, which works for five tools and falls apart at fifty: bloated context, diluted attention, and every new MCP server making the system prompt heavier and noisier.

Code mode is the emerging answer. Instead of declaring every tool definition directly to the model, it gives the model one small, stable interface — a sandboxed scripting environment — and lets it discover tools at runtime. The script can search the tool catalog by relevance, pull one tool's description and type declaration on demand, or enumerate everything it needs to browse. Only the script's output comes back to the model, so a script can fan out in parallel and discard everything irrelevant before the context ever sees it. [Pi's codemode](https://pi.dev/docs/latest/codemode) is a good concrete example: `searchTools("bank balance")` ranks callable tools by relevance, `describeTool(name)` loads one tool's declaration, and `ALL_TOOLS` lists the rest.

That is precisely what an OpenAPI-driven MCP server wants, and why the two fit together:

- **Stable context.** A spec with 200 operations produces 200 tools. With Codemode, the model's system prompt stays the same size whether it is talking to one server or ten; tool schemas are fetched on demand.
- **Search matches how specs are written.** OpenAPI operation summaries and descriptions are exactly the text a BM25-style `searchTools()` query matches well. The contract's own documentation becomes the index.
- **Batching is free.** A codemode script can run the equivalent of `GET /banks` and `GET /banks/{id}` in one pass with `Promise.allSettled()`, then hand the model only the filtered result. Multi-step workflows that would take five turns of tool calls collapse into one script.
- **Typed, verifiable calls.** Tool declarations carry TypeScript signatures, so generated calls are checkable rather than free-form.

Discovery stops being a context-management problem and becomes a search problem — and the spec's summaries and descriptions are already the index.

## The workflow

1. Treat OpenAPI as the contract.
2. Generate candidate MCP tools from operations and schemas.
3. Curate names, descriptions, exposed operations, policies, and response shapes.
4. Let the agent discover and call tools through code mode: search the catalog to find them, load one tool's declaration on demand, batch and filter with scripts.
5. Keep the generated surface in sync as the API evolves.

[Enframe](https://github.com/erwinkramer/enframe) takes this further: it is a drop-in sidecar that wraps any OpenAPI spec into a live MCP server, so step 2 and step 5 collapse into "point it at the spec." No hand-rolled adapter, no repo of glue code, no drift between the spec and the tools — when the OpenAPI document changes, the MCP surface changes with it.

## The default

OpenAPI and MCP are not rivals. OpenAPI describes what the service can do. MCP gives agents a practical way to use it. Code mode gives agents a practical way to find it.

Put them together and you get a maintainable bridge from existing APIs to agent-native workflows: contract first, generated where precision matters, curated where experience and safety matter, and discovered at runtime so the agent-facing surface can grow without drowning the model's context.
