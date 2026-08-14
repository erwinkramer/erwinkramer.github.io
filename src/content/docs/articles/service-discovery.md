---
title: Service Discovery
description: Why portals still matter, and why open discovery formats like APIs.json may define their next phase.
author: Erwin Kramer
date: 2026-08-07
---

![Dark analog catalog map with diamonds, tags, circular index nodes, and discovery signals](/assets/api-portal-discovery-collage.svg)

Portals used to be simple places to publish documentation. Put the reference pages online. Add a getting started guide. Give developers a key. Maybe include a few examples and a support link.

That was useful, but it was never the whole job.

A portal is really a front door to a relationship. It tells people what exists, what is stable, how to get access, what the rules are, where to find support, and what kind of commitment the provider is making. It turns a hidden service into something that can be discovered, understood, trusted, and used.

That role is becoming more important, not less.

## Portals are no longer just websites

In the current world, service information is used by more than developers browsing documentation pages. It is used by product teams, partner teams, governance processes, security reviewers, platform teams, procurement, operations, automation, and internal catalogs.

That changes what a portal needs to be.

A portal should still be readable by people. But it also needs to be readable by systems. If the portal only exists as web pages, every downstream process has to rediscover the same information by scraping, copying, or asking someone. That does not scale.

The future portal is a catalog. It connects documentation, contracts, authentication guidance, terms, status pages, changelogs, support routes, examples, workflows, governance rules, ownership information, and operational metadata into one discoverable surface.

## Discovery is the missing layer

Most service programs focus on the description of the thing itself. For APIs, that usually means OpenAPI or related contract formats. For workflows, it may mean a workflow description. For tools, integrations, events, or operational capabilities, it may mean another kind of metadata.

Those formats describe a service once you know where to look.

The harder question is: how does anything know where to look in the first place?

That is where discovery matters. An organization may have many services, many teams, many domains, many environments, and many supporting documents. Without an index, the service estate becomes tribal knowledge. People know where things are because they were told, not because the system can describe itself.

A portal without discovery becomes a website. A portal with discovery becomes infrastructure.

## APIs.json has been waiting for its moment

[APIs.json](https://apisjson.org/) is important because it provides a clear, open way to publish service metadata on the web. It is often described as something like `sitemap.xml` for APIs: a machine-readable index that points to APIs, documentation, specifications, authentication guidance, status pages, support channels, workflows, governance rules, and other related resources.

The idea has been around for a while. That matters. It is not a sudden fashion. It comes from a long-standing need: useful services should be discoverable by automated tools without every organization inventing a private catalog format.

Its current versions show how much the model has grown. An APIs.json file can point to contracts, documentation, getting started material, pricing, changelogs, SDKs, webhooks, governance rules, workflows, contact information, and more. It gives a provider a way to say: here is the map.

That map is exactly what modern portals need.

## A portal should not own the truth

Many portals become heavy because they try to own everything. The portal becomes the place where metadata is copied, adjusted, styled, approved, and slowly forgotten. Over time it drifts away from the service estate it claims to represent.

APIs.json points toward a healthier model. The portal can render the catalog, but the catalog remains portable. The API description can live near the API. Workflow descriptions can live near the processes they describe. Governance rules can live where the governance team manages them. The portal becomes a view over a discoverable service estate rather than a manual database of everything.

That makes portals easier to replace, federate, or extend. One team can build a public developer portal. Another can build an internal platform catalog. Another can build compliance views. Another can build search and onboarding tooling. If they all start from the same open index, they are not trapped inside one portal product.

## Discovery is sovereignty

This connects directly to [Open Source Sovereignty](/articles/open-source-sovereignty/). Sovereignty is not only about where systems run. It is also about whether an organization can understand and move its own technology estate.

If service knowledge only lives inside one vendor portal, one hosted catalog, or one private database, the organization loses leverage. Discovery becomes dependent on the tool. Migration becomes harder. Governance becomes harder. Even basic questions become harder: what do we expose, who owns it, which contracts are current, which workflows matter, and which systems depend on them?

Open discovery formats help keep that knowledge portable. They make the service estate visible outside one product. They let organizations build their own views, use open source tooling, share catalogs across boundaries, and keep control over the map of their systems.

That is a quiet but important kind of sovereignty.

## Registries are part of the same shift

The rise of registries points in the same direction.

The [MCP Registry](https://github.com/modelcontextprotocol/registry), for example, gives clients a way to discover MCP servers. That is not the same problem as an API portal, but it rhymes with it: useful capabilities need a discoverable home, a metadata model, ownership signals, and enough structure for tools to understand what exists.

This is also why APIs.json is interesting. It can act as a broader index, not only for API descriptions but also for adjacent resources that make a service usable: workflows, rules, documentation, prompts, registries, support routes, and operational information. It gives a portal something open and stable to gather from.

The future is not one catalog format for every possible thing. The future is a network of catalogs and registries that can point to each other clearly.

## The future portal is federated

The future of portals is probably not one central portal for everything.

Organizations are too distributed for that. Services live in teams, products, regions, platforms, partners, public programs, and internal systems. Some are internal. Some are public. Some are regulated. Some are experimental. Some are legacy but still critical.

A better future is federated discovery. Each domain can publish its own index. A portal can gather those indexes, present them clearly, and apply policy where needed. Search can work across them. Governance can inspect them. Developers can discover them. Automation can consume them.

That is where APIs.json may gain traction. It gives the federation something simple to rely on: a common, open description of where service information lives.

## Human portals still matter

None of this removes the need for a good human experience.

People still need clear explanations, examples, onboarding paths, contact routes, support expectations, and trust signals. A portal that is technically discoverable but unpleasant to use will still fail.

The point is that human experience and machine readability should not be separate projects. A good API portal should publish the same underlying truth in forms that people and systems can both use.

That is the future: portals as living views over open catalogs.

Services need more than endpoints. They need maps. APIs.json is one of the clearest open standards for publishing those maps, and it may be exactly the kind of small, durable standard that becomes more valuable as digital ecosystems become larger, more distributed, and harder to understand by hand.
