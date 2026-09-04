---
title: OpenAPI-first MCP
description: A contract-first argument for generating MCP servers from OpenAPI instead of rebuilding integration logic by hand.
date: 2026-08-07
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

Some endpoints are too low-level. Some are dangerous without an explicit confirmation step. Some need pagination helpers. Some return shapes that are technically correct but awkward for agents. Some belong together as a higher-level workflow.

The right approach is to start from the contract, then curate.

For example, [erwinkramer/bank-api](https://github.com/erwinkramer/bank-api) is exactly the kind of sample where this approach makes sense. A generator can scaffold tools from operations like `GET /banks`, `POST /banks`, `GET /banks/{id}`, `PUT /banks/{id}`, and `DELETE /banks/{id}`. A developer can then hide destructive operations, require confirmation, improve names, or compose lower-level endpoints into a safer workflow. The MCP layer becomes intentionally shaped, but still grounded in the contract.

That is the sweet spot: generated where precision matters, curated where experience matters.

## The overlay-shaped middle

There is a useful parallel in the [OpenAPI Overlay Specification](https://spec.openapis.org/overlay/latest.html). An overlay is a separate document that augments an OpenAPI description without forcing those changes into the original source. It can target parts of the description, update them, remove them, copy them, or attach metadata for another tool to consume.

MCP generation needs a similar middle layer, with one important difference: the target should not just be another OpenAPI document. It should be an MCP projection that emits [MCP Description](https://mcpdesc.org/), or `mcpdesc`, a portable, machine-readable description of what an MCP server offers.

OpenAPI says what the HTTP service can do. The MCP projection says what an agent should be allowed and helped to do with it. It can select operations, hide internal endpoints, rename tools, rewrite descriptions, attach confirmation requirements, mark scopes, define pagination helpers, normalize responses, and use [Arazzo](https://spec.openapis.org/arazzo/latest.html) to describe combinations of low-level operations as higher-level workflows.

That projection might be expressed as an OpenAPI overlay with MCP-specific metadata, or as a dedicated mapping file that reads OpenAPI with selectors and emits MCP artifacts. Either way, it should be versioned and reviewed. The same OpenAPI contract plus the same projection should produce the same MCP surface.

Then `mcpdesc` becomes the downstream contract for AI tooling. It describes tools, resources, prompts, transports, security, and server metadata in a static document that agents, clients, catalogs, linters, and conformance checks can consume.

## The workflow I want

The better workflow is straightforward:

1. Treat OpenAPI as the contract.
2. Add an MCP projection layer, using OpenAPI overlays or a dedicated mapping file where that fits the toolchain.
3. Generate candidate MCP tools from operations and schemas.
4. Curate names, descriptions, exposed operations, policies, and response shapes.
5. Emit `mcpdesc` for the curated MCP server.
6. Use `mcpdesc` to help AI tooling discover the server, choose tools, form calls, and validate behavior.
7. Keep the generated surface in sync as the API evolves.

## The default

OpenAPI and MCP are not rivals. OpenAPI describes what the service can do. MCP gives agents a practical way to use it.

Put them together and you get a maintainable bridge from existing APIs to agent-native workflows: contract first, generated where precision matters, curated where experience and safety matter, and described with `mcpdesc` so the agent-facing contract can be reviewed before generated code becomes the only record of intent.
