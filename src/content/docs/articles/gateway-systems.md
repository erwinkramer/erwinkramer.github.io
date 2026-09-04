---
title: Gateway Systems
description: How to think about gateways as traffic boundaries, not only API management products, and where Kubernetes Gateway API changes the model.
date: 2026-08-13
sidebar:
  order: 10
---

A gateway is not only an API gateway. It is any deliberate boundary where traffic enters, leaves, crosses trust zones, changes protocol, receives policy, or becomes visible enough for the system to decide what should happen next.

That makes gateways older and broader than API management. A load balancer is a gateway. A reverse proxy is a gateway. A Kubernetes ingress controller is a gateway. A service mesh edge, identity-aware proxy, webhook receiver, AI model router, protocol bridge, egress proxy, or managed file-transfer front door can also be a gateway in the useful sense of the word.

As argued in [The Shape of Traffic](/articles/the-shape-of-traffic/), traffic is behavior made visible. A gateway is one of the places where that behavior becomes legible: who is calling, what is under pressure, where trust is decided, and where the system is too dependent on one narrow path.

## The shape to aim for

The direction is a gateway architecture rather than a gateway empire: clear entry points where shared guarantees are needed, local control where context matters, and policy that can move across products, clusters, and teams.

The target is a gateway stack the organization can run on its own terms: free or genuinely open-source where the runtime matters, self-hostable, not dependent on a mandatory SaaS control plane, usable as generic north-south ingress, and compatible with standard Kubernetes Gateway API workflows. API-specific features are welcome only after that bar is met.

The gateway should provide a central way of ingress when the organization needs one. It should handle TLS offloading or passthrough deliberately, manage certificates, route by host, path, method, protocol, tenant, region, identity, or service, and apply broad controls such as caching, compression, rate limiting, retries, timeouts, request size limits, logging, metrics, tracing headers, and basic threat protection.

But it should not become the place where all business meaning goes to live. That follows the same restraint described in [Decoupled by Design](/articles/decoupled-by-design/): good boundaries give systems room to move independently. Gateways should protect and shape traffic without becoming the hidden implementation of every product and team behind them.

## Kubernetes changed the language

Kubernetes `Ingress` made host and path routing common, but it was too small for many real platform boundaries. Advanced routing, TLS behavior, cross-namespace delegation, traffic splitting, and role separation often moved into controller-specific annotations.

The Kubernetes [Gateway API](https://gateway-api.sigs.k8s.io/) is an evolution of that model. It introduces resources such as `GatewayClass`, `Gateway`, `HTTPRoute`, `GRPCRoute`, `TCPRoute`, `TLSRoute`, and `ReferenceGrant` so platform and application teams can share a clearer contract. The platform defines what kind of gateway exists. Applications attach routes. Policy becomes more portable.

That touches API management and API gateways directly. Traditional API gateways proved that routing, authentication, TLS, rate limits, and analytics belong near the boundary. Gateway API takes part of that lesson and expresses it as infrastructure vocabulary. The broader [Gateway API implementations page](https://gateway-api.sigs.k8s.io/docs/implementations/list/) also tracks common integrations such as cert-manager, Kuadrant, Flagger, Argo Rollouts, Knative, and OpenKruise Rollouts. For this article, the ordinary integrations matter most: certificates, DNS, auth, rate limits, and progressive delivery. Exotic AI or serverless hooks are useful only after the general ingress story is solid.

## The less obvious gateways

Some gateway choices will not appear in an API gateway comparison. Identity-aware proxies decide who can reach internal tools. Egress gateways control what the organization is allowed to call. Service meshes move mTLS, service identity, retries, timeouts, telemetry, and traffic splitting closer to workloads. Webhook gateways such as Convoy, Svix, and Hookdeck handle signing, retries, replay, and delivery logs. AI gateways such as LiteLLM, Portkey, Envoy AI Gateway, Kong AI Gateway, Docker MCP Gateway, and agentgateway route model and agent traffic through policy, cost tracking, failover, rate limits, caching, audit logs, and guardrails.

These are not substitutes for one another. They are reminders that the gateway is a boundary pattern, not one product category.

## Where products fit

With that context, the candidates below are judged against a narrower test: generic ingress first, self-hostable operation, open or free enough to avoid a vendor control plane, no meaningful gateway features hidden behind a paid product, and credible Kubernetes Gateway API participation. The official [Gateway API v1.6 implementation matrix](https://gateway-api.sigs.k8s.io/docs/implementations/versions/v1.6/) is the current reference because support is reported by implementation, route type, and conformance run.

[Envoy Gateway](https://gateway.envoyproxy.io/) is the strongest Envoy-native starting point. It is an Envoy subproject for managing Envoy-based application gateways, and it is conceptually close to the target: open, self-hostable, Kubernetes-native, and focused on runtime gateway behavior rather than API lifecycle management.

[Istio](https://istio.io/) fits when the gateway is part of a mesh decision. A minimal install can serve Kubernetes Gateway API ingress, while the same platform can extend to east-west traffic management. It is not the same kind of choice as Envoy Gateway: Istio uses Envoy for gateway and sidecar proxying, while ambient mode also introduces ztunnel for part of the data plane. That is powerful when mesh is already part of the operating model, and too much when the organization only needs a front door.

If the shortlist had to be narrow: start with Envoy Gateway for a modern Gateway API edge, and choose Istio only when gateway and mesh should be one decision.

## What does not fit

Some otherwise strong candidates were omitted because important gateway features are tied to paid products. NGINX Gateway Fabric can use NGINX Open Source, but NGINX Plus unlocks advanced metrics, live dashboarding, dynamic upstream reconfiguration, session persistence, advanced load balancing, JWT/OIDC, WAF integration, and vendor support. Traefik Proxy is a strong open-source application proxy, but Traefik Hub and Traefik Enterprise carry many of the API gateway, WAF, distributed rate-limit, advanced auth, governance, and enterprise operations features. kgateway is open source and CNCF Sandbox, but Solo's own product material marks several gateway features as Enterprise, including URL rewrites, staged transformations, JWT validation, external auth, WAF, local rate limiting, traffic mirroring, portal, analytics, and monetization. Cilium is an excellent open CNCF networking project, but the broader Isovalent/Cisco load-balancer and enterprise networking story puts advanced delivery, compliance, and operational features in a commercial product line. HAProxy Ingress has a community Apache-licensed project, but HAProxy Enterprise Kubernetes Ingress Controller and HAProxy Enterprise carry the richer security, observability, automation, support, WAF, bot-management, and enterprise load-balancing story, so it is not a clean recommendation under this strict filter.

Some API gateways are capable but not the clean default for this article. Apache APISIX, Kong Gateway, WSO2 Gateway, Gravitee, Gloo Gateway, Airlock Microgateway, and similar products may be self-hostable and some appear in Gateway API implementation status, but their center of gravity is API-specific gateway, security, plugin, or management behavior. They fit when that is the requirement. They do not fit as neatly when the first requirement is generic ingress for broad system traffic.

Full API management suites answer an even wider question. Akana, Amazon API Gateway and API management tooling, Axway Amplify, MuleSoft Anypoint, Apigee, Azure API Management, Boomi API Management, IBM API Connect, IBM webMethods API Management, Kong Enterprise, Broadcom Layer7, Red Hat 3scale, Sensedia, Traefik API Management, Tyk API Management, WSO2 API Manager, Zuplo, and products like them package gateway behavior with lifecycle management, plans, subscriptions, developer portals, analytics, monetization, approvals, and governance workflows.

Those products can be valuable when the problem really is API product management. But they belong to an older shape of system: one where API traffic is treated as a centrally managed product estate. That is related to the new gateway world, and in some ways an ancestor of it, but it is not the same problem. The newer gateway problem spans APIs, events, agents, devices, regions, internal services, partner links, Kubernetes clusters, and local platforms.

That repeats the lesson from [The API Front Door](/articles/the-api-front-door/): a focused need should not automatically become a platform purchase. A portal can explain what exists. A registry can store definitions and schemas. A gateway can enforce runtime policy. A service can own business behavior. Observability can collect signals across all of it. Bundles are acceptable only when those responsibilities remain clear.

## The choosing test

The gateway should own rules that protect the boundary, belong to transport, apply broadly, or help traffic remain visible. It should avoid rules that define domain behavior, product meaning, or service ownership.

Some transformation is reasonable: protocol translation, header normalization, request validation, payload size checks, authentication handoff, and compatibility shims can all belong at a boundary. But the more the gateway understands every workflow, the more it becomes a central application with worse tools.

WAF is a useful example of why decoupling matters. A gateway product may sell WAF as an enterprise feature, but WAF does not always have to be bought as part of the gateway. In an Envoy-based architecture, open-source pieces such as [coraza-envoy-go-filter](https://github.com/united-security-providers/coraza-envoy-go-filter) can attach Coraza WAF behavior to Envoy without turning the gateway choice into a paid security platform. That is not a universal answer, but it keeps the boundary design honest: gateway, policy, and protection can be composed instead of bundled by default.

The best gateway architecture will not be the one with the longest feature list. It will be the one where traffic is understandable, policy is explicit, and teams can still move independently.

The new world still needs gateways. It just needs them to be lighter, more portable, more distributed, and less confused with the whole platform.
