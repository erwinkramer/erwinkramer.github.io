---
title: The API Front Door
description: Choosing an API portal that keeps discovery useful, definitions protected, and gateway choices separate.
date: 2026-08-13
sidebar:
  order: 20
---

![Dark analog collage with a portal frame, catalog cards, protected API definitions, and version rails](/assets/the-api-front-door-collage.svg)

An API portal is not just a documentation website. It is the place where an organization shows how its APIs are meant to be discovered, trusted, governed, and reused. As argued in [Service Discovery](/articles/service-discovery/), a portal is really a front door to a relationship: it tells people what exists, what is stable, how to get access, and what kind of commitment the provider is making. When that portal is good, API knowledge becomes visible without becoming uncontrolled. Partners find the right product, teams understand ownership, and the organization keeps a clear boundary between public explanation and protected system detail.

That makes the choice smaller than an API management procurement, but more important than choosing an OpenAPI renderer. The goal is a free, sovereign, self-hostable portal architecture that can publish a polished developer experience without buying a gateway, adopting a broad API management suite, or leaking definitions to audiences that should not see them.

## The shape to aim for

The direction is a focused portal architecture rather than a suite: a portal shell for catalog and navigation, a self-controlled OIDC provider, private OpenAPI or AsyncAPI definitions, server-side authorization routes for both pages and raw definitions, and a replaceable API reference renderer where a richer experience is needed.

That is the useful order of thinking. First define what must be protected, how audiences are recognized, how API families and versions appear, and where definitions live. Only after those boundaries are clear does it make sense to choose the portal product.

This keeps the architecture understandable for management and operable for teams. It avoids the familiar trap where a simple portal requirement turns into a gateway migration, an enterprise platform program, or a SaaS dependency that quietly becomes the real system of record.

## What the portal must do

Two rules shape the choice. First, the complete working stack must be free: a free UI does not count if the required gateway, control plane, plugin, hosting tier, identity feature, or export path is paid. Second, the practical operation must remain sovereign: the organization should be able to self-host, keep source and definitions under its own control, and continue operating without a mandatory external control plane.

The portal also has product-specific requirements. APIs must be grouped into something users understand, such as a product, category, catalog, or domain. Access must be enforced server-side, so a protected API and its OpenAPI or AsyncAPI definition are not merely hidden in the browser but unavailable to unauthorized users. Audience rules must be based on real identity information, such as email domain, identity-provider group, organization, team, or role. Multiple versions of one API should stay visibly connected, preferably through a version selector or previous/next context, instead of appearing as unrelated cards.

The final requirement is restraint. A portal may sit near a gateway, but it should not force a gateway. It may link to credential workflows, but it should not require a monetization platform. It may use a renderer, but the renderer should not be mistaken for the portal. The chosen direction should help people understand the API landscape without hiding the organization inside a vendor's model of API management.

## A small architecture

The architecture assumes the portal has a small, explicit backbone.

The catalog is managed as code. A repository stores one compact metadata file per API family, including the stable API id, display name, domain, audience rules, owner, lifecycle state, and ordered versions. The catalog can describe `payments` as one API family with `v1`, `v2`, and `next`, instead of scattering versions across unrelated cards.

Definitions remain private. OpenAPI and AsyncAPI files live in Git, private object storage, or a controlled API/schema registry. They are not copied into public static assets. The portal renders protected pages server-side after OIDC authentication, reads claims such as email domain or group membership, and only then decides which catalog entries and versions are visible.

Raw definitions are served through authorization routes. A renderer receives a URL such as `/api-definitions/{apiId}/{version}`, but that route checks the same audience rule before returning the file. This is the critical difference between a portal and a documentation site: an unauthorized user should not be able to fetch the definition directly after guessing a URL.

The gateway stays outside the portal choice. That follows the same architectural restraint described in [Decoupled by Design](/articles/decoupled-by-design/): avoid turning a useful interface decision into platform coupling. Credential requests can link to an existing IAM process, service desk flow, GitOps workflow, or API ownership process. The portal should explain and guide access, not require a specific gateway product to exist.

This is deliberately modest. It creates a polished front door while keeping the sensitive material, the definitions and the audience rules, on the server side. It also makes the system easy to explain later: catalog metadata, private definitions, identity claims, authorization routes, and a renderer.

## Where products fit

[Zudoku](https://zudoku.dev/) becomes the preferred starting point once the portal boundaries are clear. It is the closest match to a free, open-source, self-hosted API portal shell: MIT-licensed, portal-focused, and suitable for an architecture where the organization controls hosting, identity, catalog metadata, and API definitions. It is not just a documentation shell waiting for another renderer; it already has OpenAPI plugins, API catalog behavior, authentication providers, and an integrated playground model. Zudoku also uses pieces from the Scalar ecosystem internally, such as OpenAPI parsing and snippet support, but those parts are folded into Zudoku's own portal experience rather than becoming a separate product choice. SSR matters for the protected-portal architecture because pages and raw definition routes need server-side audience checks, but that is a deployment and access-control concern, not a separate product category.

[Fumadocs](https://fumadocs.dev/) is the more custom path. It can stand on its own when the organization wants to build the documentation and portal experience itself, using its own content model, navigation, and custom pages. Fumadocs also has an OpenAPI package that can generate MDX documentation from an OpenAPI spec and includes Scalar-related integration points. That makes a richer API reference possible, but it is not the same proposition as Zudoku: the team still owns the catalog model, server-side audience checks, protected definition routes, version grouping, and onboarding flow. The tradeoff is ownership: the team is building a portal application, not assembling a near-ready portal product.

[Backstage](https://backstage.io/) is strong when the portal belongs inside an internal developer platform. It is Apache 2.0, CNCF-hosted, and backed by broad contributor signals. It models APIs, systems, components, users, groups, ownership, docs, and templates. That is powerful for internal engineering, but heavy for a focused partner-facing API portal. A partner portal needs branded discovery, audience-specific access, API product/version UX, onboarding, and protected definitions. Backstage can be shaped into that, but the organization is then building a custom Backstage application around the portal use case.

[Apicurio Registry](https://www.apicur.io/registry/) is useful behind the portal, not as the public portal. It is an Apache 2.0 CNCF Sandbox project for storing APIs and schemas, with containers, OIDC support, and a UI. That makes it strong as a controlled source of truth for OpenAPI, AsyncAPI, events, and schemas. But a registry UI is not the same as a developer portal: it does not naturally provide a branded catalog, partner-facing onboarding, product narratives, audience-specific landing pages, or the guided version experience expected from a public API portal. It fits best as the definition system behind the portal, where the portal decides what each audience may discover and fetch.

## What does not fit

Several products were omitted not because they are bad products, but because they answer a different question.

**Tyk Enterprise Developer Portal** was omitted because the developer portal is commercial. **Gravitee Developer Portal** and **WSO2 API Manager** were omitted because they turn the decision into an APIM/Gateway platform decision. Their portals are tied to APIs, plans, applications, subscriptions, analytics, logs, and gateway deployment models. That is too much platform gravity for a portal-only requirement.

Modern hosted-docs products such as **Fern**, **Mintlify**, and **Bump.sh** were also omitted unless a fully self-hosted free path is proven. They are worth watching because they set a high bar for polish, API docs, SDK generation, diffs, previews, and authoring experience. But a CLI, starter repository, preview command, or free hosted tier is not the same as owning the complete runtime.

Renderer-only and static-generated-docs tools were omitted as candidates. **Docusaurus OpenAPI Docs**, **Redoc**, **RapiDoc**, **Swagger UI**, and **Stoplight Elements** can produce useful API reference pages, but they do not solve the portal problem on their own. They do not provide built-in server-side sign-in, audience-specific catalog visibility, protected raw definitions, or partner onboarding. They can be implementation details behind a protected route; they are not the portal choice.

The best API portal is not the largest platform or the longest list of pages. It is the front door that makes the API landscape legible, keeps protected knowledge behind the right boundary, and leaves the organization free to evolve the machinery behind it.
