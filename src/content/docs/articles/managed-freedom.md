---
title: Managed Freedom
description: How to choose a European cloud foundation that manages infrastructure without taking over the architecture.
date: 2026-08-15
sidebar:
  order: 130
---

Choosing a European cloud provider is not only a question of jurisdiction. It is a question about how much room the architecture will still have later.

A good cloud should remove weight from the team: patched machines, healthy control planes, durable storage, backed-up databases, and dependable networks. But it should not become the hidden shape of the product. The architecture should still be readable outside the provider's console.

That is managed freedom.

The goal is not to avoid managed services. As in [Open Source Sovereignty](/articles/open-source-sovereignty/), the goal is agency: use the provider without letting it become the operating model. A cloud can start by running servers and end up shaping identity, deployment, policy, observability, data flow, and security. The application still runs, but direction becomes hard to change unless the boundaries stay as visible as they are in [Decoupled by Design](/articles/decoupled-by-design/).

## The test

The infrastructure layer may be managed. Kubernetes control planes, object storage, PostgreSQL, load balancers, private networking, backups, and basic compute are infrastructure problems. A good provider should make them boring.

The application layer should remain independent. That means six tests matter:

1. Kubernetes stays the application control plane.
2. PostgreSQL remains PostgreSQL, not a proprietary database API.
3. Object storage remains S3-compatible enough for ordinary tools.
4. Identity uses open protocols such as OIDC and OAuth, and can live outside the infrastructure account.
5. Telemetry stays under the team's control, as in [Observability by Signal](/articles/observability-by-signal/), moving through OpenTelemetry-owned pipelines instead of being trapped in one dashboard.
6. Cluster networking, traffic policy, and network observability use portable primitives rather than provider-only rules.

Those tests do not require one perfect provider. They require visible ownership. Two healthy shapes pass that test. One is a single European cloud foundation for Kubernetes, networking, object storage, databases, load balancing, and backups. The other is a European infrastructure cloud combined with specialists for data, identity, or AI compute. That is not fragmentation if ownership is clear. It is a composed architecture.

## The network

Kubernetes portability is not just whether workloads can run on another cluster. The network is where the architecture hardens: pod and service routing, traffic policy, encryption, and workload visibility. Isovalent's [From Hyperscalers to Neoclouds: Why Cloud Providers Are Standardizing on Cilium](https://isovalent.com/blog/post/cilium-neocloud-sovereign/) is useful here because it shows providers treating this layer as foundation work, not as a plug-in detail. The test is not Cilium versus Calico, Antrea, or a provider data plane; it is whether those controls remain readable as Kubernetes architecture instead of rules that only make sense inside one console.

## The provider map

The [European Alternatives cloud computing platforms list](https://european-alternatives.eu/category/cloud-computing-platforms) is a useful starting point because it separates general cloud providers from VPS-only hosts and PaaS products. From there, the useful question is not whether a provider can run serious systems, but what role it wants to play:

1. General infrastructure clouds that can act as the main foundation.
2. Restrained infrastructure clouds that keep the surface smaller.
3. Integrated clouds and PaaS-shaped platforms that optimize for developer convenience.
4. Enterprise ecosystems that bring governance and catalog breadth.
5. Specialist providers for data, identity, and AI compute.

## General foundations

Start with the providers that look most like general infrastructure clouds: managed Kubernetes, object storage, databases, networking, and enough API surface to build with standard tools. [Exoscale](https://www.exoscale.com/) and [OVHcloud](https://www.ovhcloud.com/) both fit, but they lean differently.

**Exoscale** is the cleaner default foundation. It has the core primitives: managed Kubernetes, S3-compatible object storage, managed PostgreSQL, networking, DNS, and load balancing. Its PostgreSQL API lists PostgreSQL 17 and 18 as supported major versions for service creation and upgrade checks. Its Kubernetes service supports external OIDC providers, including setups based on Dex or Keycloak, so identity does not have to become an Exoscale account boundary.

Its database service is powered by Aiven and supports Prometheus, Rsyslog, and OpenSearch integrations. Those are not native OTLP outputs, but they are neutral enough to bridge into an OpenTelemetry Collector-owned pipeline. Managed Kubernetes Pro can also send control-plane audit records to a webhook endpoint. That is the healthy version of managed dependency: the provider takes work away while the important boundaries stay visible.

**OVHcloud** has a broader enterprise shape. It is European, mature, and real at scale. It has managed Kubernetes, S3-compatible object storage, managed PostgreSQL, OpenStack roots, PostgreSQL 17 and 18 support, and documented OIDC configuration for managed Kubernetes. It is a strong answer when scale, procurement maturity, OpenStack familiarity, and enterprise presence matter most.

The tradeoff is signal ownership. OVHcloud does not block external identity or OpenTelemetry: workloads can emit OpenTelemetry, and Public Cloud Databases expose Prometheus metrics. But its documented database-log forwarding path goes through Logs Data Platform. That can be bridged into a separate telemetry stack, but LDP becomes a provider-owned step in the signal path.

## Restrained foundations

[UpCloud](https://upcloud.com/) belongs in a smaller, more restrained category. It has the important building blocks: managed Kubernetes with a modern cadence, S3-compatible object storage, managed PostgreSQL, Valkey, OpenSearch, load balancing, persistent volumes through the UpCloud CSI driver, and automatic node scaling through Cluster Autoscaler. The restraint is not the basic infrastructure surface, but the operating model around it. External OIDC for managed Kubernetes is not a visible part of the platform story, and backups are documented as a Velero setup the team owns. That keeps the surface portable, but it is less finished than Exoscale as a single managed foundation.

**Cyso Cloud** is the one to watch as a general-infrastructure up-and-comer. It is Dutch, OpenStack-based, and built around the same portability instinct: managed Kubernetes, object storage, compute, load balancing, DNS, private networking, and OpenStack API automation. Its managed Kubernetes can use external OIDC-compatible identity providers, and cluster metrics can be scraped into Prometheus or an OpenTelemetry Collector. The database service points toward a fuller general-cloud shape, but it is still early-access beta. Cyso is promising, but not yet a proven default foundation beside Exoscale or OVHcloud.

**Elastx** and **Cleura** also belong in this conversation. Both have European sovereignty stories, OpenStack roots, managed Kubernetes, storage, networking, and managed-service support around databases. They feel more regional, consultative, and private-cloud shaped than Exoscale as a default public foundation. **gridscale** has useful European building blocks too, but as part of OVHcloud it belongs with the broader OVHcloud reading.

## Integrated platforms

[Scaleway](https://www.scaleway.com/) has a more integrated developer experience.

It has managed Kubernetes, S3-compatible object storage, managed PostgreSQL and MySQL, and Cockpit for metrics, logs, and traces. That is attractive when speed and product polish matter.

The risk is convenience. If Cockpit becomes the center of operations, the OpenTelemetry Collector becomes secondary, and the architecture starts to bend around the provider. Scaleway fits when integrated experience matters more than maximal independence of the telemetry boundary.

PaaS-shaped platforms such as **Clever Cloud** and **Upsun** sit nearby, but they are not quite the same decision. They can remove a lot of operational work, which is useful, but that also makes the platform itself more likely to become the operating model.

## Enterprise ecosystems

[STACKIT](https://www.stackit.de/en/) needs a different reading before it can be judged fairly. It is German, backed by Schwarz Group, and presents itself more like a sovereign enterprise cloud than a simple infrastructure provider. That can be valuable where European governance, procurement maturity, and broad catalog coverage matter.

The same breadth is also the risk. STACKIT Kubernetes Engine supports SSO through STACKIT IdP, and workload identity can federate Kubernetes service accounts to STACKIT APIs. Useful governance features become architectural constraints if the product needs an independent identity boundary such as Keycloak using OIDC. Without that line, governance stops being a service around the platform and starts becoming the platform.

**Aruba Cloud** is worth noting mainly as a maintenance warning. If a managed foundation still documents old core service versions, such as PostgreSQL 13.4 from 2021, the concern is broader than one database: upgrade cadence, security posture, and whether the provider keeps managed primitives current enough to remove work instead of moving it.

**IONOS Cloud** and **T Cloud Public** also belong closer to this enterprise reading. They manage real primitives, but the shape is heavier: more catalog, more governance surface, and more chance that the cloud account becomes the natural center of decisions.

## Specialist providers

Specialists are useful when one boundary should stay deliberately outside the main cloud account.

AI compute has its own specialist shape: GPU-first cloud capacity for training, inference, fine-tuning, and high-throughput model work. European examples include **Verda** (Finland), **Hyperstack** (United Kingdom), and **Nebius** (The Netherlands). Treat them as accelerated-compute boundaries, not as the main cloud foundation, unless AI infrastructure is the product's center of gravity.

[Aiven](https://aiven.io/) is a strong data-layer specialist for PostgreSQL, Kafka, OpenSearch, Valkey, Grafana, and related tools. Its PostgreSQL service advertises PostgreSQL 17 and 18, and its multi-cloud posture makes it useful either inside another cloud's offer, as with Exoscale, or beside another cloud, such as UpCloud.

[Keycloak](https://www.keycloak.org/) is the identity example in the same pattern. Self-hosted or managed through providers such as [Cloud-IAM](https://www.cloud-iam.com/), it supports OIDC and OAuth and keeps the trust boundary visible. That gives applications, users, and Kubernetes a shared identity layer without making the infrastructure provider's identity system the center of the product. Azure has already shown how quickly that can become the product.

This shape is less tidy for billing, procurement, support, and incident coordination. Prefer compositions where the operational edges stay boring, such as [Keycloak managed by Glasskube](https://www.exoscale.com/marketplace/listing/glasskube-keycloak/) on Kubernetes through the Exoscale marketplace.

## The decision

After this lens, Exoscale is the strongest first choice for a single European cloud foundation. It has enough managed surface to carry the everyday platform, but still leaves identity, data, telemetry, and runtime as visible architectural decisions.

The broader decision is about role, not brand. A provider can be the main foundation, a restrained infrastructure layer, an integrated developer platform, an enterprise governance environment, or a specialist boundary for data, identity, or AI compute. The important thing is to make the constraints explicit before the provider starts deciding them by default.

The best cloud choice is not just the one that can host the workload. It is the one that still leaves the workload belonging to the organization on day one thousand. Managed freedom means using the cloud without letting the cloud become the architecture.
