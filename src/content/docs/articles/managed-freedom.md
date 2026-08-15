---
title: Managed Freedom
description: How to choose a European cloud foundation that manages infrastructure without taking over the architecture.
author: Erwin Kramer
date: 2026-08-15
---

![Open analog collage with loose European cloud paths, floating infrastructure modules, identity tokens, database ledgers, and portable telemetry routes](/assets/european-cloud-choice-collage.svg)

Choosing a European cloud provider is not only a question of jurisdiction. It is a question about how much room the architecture will still have later.

A good cloud should remove weight from the team. It should keep machines patched, control planes alive, storage durable, databases backed up, and networks dependable. But it should not become the hidden shape of the product. The architecture should still be readable outside the provider's console: clear boundaries, portable runtimes, familiar data stores, open standards, and infrastructure choices that can still be changed.

That is managed freedom.

The goal is not to avoid managed services. The goal is to use them without letting the cloud provider become the operating model. A cloud can start by running servers and end up shaping identity, deployment, policy, observability, data flow, and security. The application still runs, but changing direction becomes hard because too many decisions now live inside one environment.

## The shape

The infrastructure layer may be managed: Kubernetes control planes, object storage, PostgreSQL, load balancers, private networking, backups, and basic compute. Those are infrastructure problems. They are exactly the kind of problems a good provider should make less distracting.

The application layer should remain independent. Kubernetes should stay the application control plane. PostgreSQL should remain PostgreSQL, not a proprietary database API. Object storage should remain S3-compatible enough for ordinary tools. Identity should use open protocols such as OIDC and OAuth. Telemetry should move through OpenTelemetry-owned pipelines instead of being trapped in one dashboard.

There are two healthy shapes:

1. A single European cloud foundation that provides the core managed primitives.
2. A European infrastructure cloud combined with specialist providers for data and identity.

The second shape is valid when the boundaries are explicit. A specialist provider can run the data layer. A dedicated identity provider can run identity. The infrastructure provider can run Kubernetes, networking, object storage, and load balancing. That is not fragmentation if ownership is clear. It is a composed architecture.

This is the cloud version of the argument in [Open Source Sovereignty](/articles/open-source-sovereignty/): the goal is not retreat, but agency.

## Provider types

The [European Alternatives cloud computing platforms list](https://european-alternatives.eu/category/cloud-computing-platforms) is a useful starting point because it separates general cloud providers from VPS-only hosts and PaaS products.

Several of them can run serious systems. The question is not whether they can host workloads. The question is what kind of architecture they encourage.

## General infrastructure clouds

Start with the providers that look most like general infrastructure clouds: managed Kubernetes, object storage, databases, networking, and enough API surface to build with standard tools. [Exoscale](https://www.exoscale.com/) and [OVHcloud](https://www.ovhcloud.com/) both fit that part of the map, but they lean differently.

**Exoscale** has the core primitives: managed Kubernetes, S3-compatible object storage, managed PostgreSQL, networking, DNS, and load balancing. Its PostgreSQL API lists PostgreSQL 17 and 18 as supported major versions for service creation and upgrade checks. Its Kubernetes service supports external OIDC providers, including setups based on Dex or Keycloak. Its database service supports external integrations such as Prometheus, Rsyslog, and OpenSearch.

That combination matters. It means the provider can manage infrastructure while the architecture keeps its own boundaries. Kubernetes can use external identity. Database metrics can be exposed through Prometheus. Database logs can be sent through Rsyslog or into OpenSearch. Those are not native OTLP outputs, but they are neutral enough to bridge into an OpenTelemetry Collector-owned pipeline without making the provider's log product the operational center. Exoscale also lets Kubernetes audit events go to a configured webhook endpoint on its Pro offering. That is the healthy version of the concern described in [Decoupled by Design](/articles/decoupled-by-design/): dependencies are fine when the boundaries stay visible.

**OVHcloud** has a broader enterprise shape. It is European, mature, and real at scale. It has managed Kubernetes, S3-compatible object storage, managed PostgreSQL, OpenStack roots, PostgreSQL 17 and 18 support, and documented OIDC configuration for managed Kubernetes. It is a strong answer when scale, procurement maturity, OpenStack familiarity, and enterprise presence matter most.

The tradeoff is not that OVHcloud blocks external identity or OpenTelemetry. It does not. Workloads on managed Kubernetes can emit OpenTelemetry, and Public Cloud Databases expose Prometheus metrics. The narrower issue is managed-service logs: OVHcloud's documented forwarding path for database logs goes through Logs Data Platform. That can still be consumed or bridged into a separate telemetry stack, but LDP becomes a provider-owned step in the signal path. If the architecture wants the OpenTelemetry Collector to be the first boundary for service signals, this tradeoff has to be weighed against the rest of OVHcloud's breadth.

## Restrained infrastructure

[UpCloud](https://upcloud.com/) belongs in a smaller, more restrained category.

It is not the broadest cloud in the list, and that is part of its appeal. It has managed Kubernetes with a modern cadence, including the v1.34 and v1.35 lines in 2026. It has S3-compatible object storage. Its managed database offer covers PostgreSQL, Valkey, and OpenSearch. Its database guides include exporting managed database logs to OpenSearch or Rsyslog with TLS, and its OpenTelemetry guidance shows an owned collector pipeline with Thanos and object storage for longer-term metrics.

The tradeoff is polish around the edges. UpCloud leaves more of the platform shape in the team's hands: access, scaling, networking, and database tuning need more deliberate setup. That can be attractive for teams that want a clean toolkit, but it is less finished than Exoscale as a single managed foundation.

**Elastx** and **Cleura** sit near this restrained-cloud conversation. Both have a serious European sovereignty story, OpenStack roots, managed Kubernetes, storage, networking, and managed-service support around databases. They are closer than footnotes. The reason they do not change the decision is narrower: they feel more regional, consultative, and private-cloud shaped than Exoscale as a default public foundation. **gridscale** has useful European building blocks, managed services, and strong data-center control, but as part of OVHcloud it belongs with the broader OVHcloud reading rather than as a separate independent answer.

That still makes UpCloud a good fit when the desired cloud surface is smaller and calmer. Its own managed PostgreSQL can be enough for many systems, especially when the goal is a straightforward relational store close to the rest of the infrastructure. A specialist data provider only enters the picture when the data layer needs depth beyond that: more advanced managed PostgreSQL requirements, Kafka, OpenSearch-heavy workloads, or a deliberately multi-cloud data strategy. UpCloud should not be judged by whether it has every managed product. It should be judged by whether the team is comfortable assembling more of the platform boundary itself.

## Integrated clouds

[Scaleway](https://www.scaleway.com/) has a more integrated developer experience.

It has managed Kubernetes, S3-compatible object storage, managed PostgreSQL and MySQL, and a modern product surface. It also has Cockpit for metrics, logs, and traces. For a team that wants a European provider with an integrated developer experience, that is attractive.

PaaS-shaped platforms such as **Clever Cloud** and **Upsun** sit nearby, but they are not quite the same decision. They can remove a lot of operational work, which is useful, but that also makes the platform itself more likely to become the operating model.

The risk is convenience. If Cockpit becomes the center of operations, the OpenTelemetry Collector becomes secondary. If the provider's integrated path becomes the easiest path for every concern, the architecture starts to bend around the provider. Scaleway is a good fit when speed and integrated experience matter more than maximal independence of the telemetry boundary.

## Enterprise ecosystems

[STACKIT](https://www.stackit.de/en/) needs a different reading before it can be judged fairly.

It is German, backed by Schwarz Group, and presents itself more like a sovereign enterprise cloud than a simple infrastructure provider. That can be valuable for organizations that need European governance, procurement maturity, and a broad managed-service catalog.

**IONOS Cloud** and **T Cloud Public** belong closer to this broad-enterprise reading too. They manage real primitives, but the shape is heavier: more catalog, more governance surface, and more chance that the cloud account becomes the natural center of decisions.

The same breadth is also the risk. The identity question is where the tradeoff becomes visible. STACKIT Kubernetes Engine supports SSO through STACKIT IdP, and workload identity can federate Kubernetes service accounts to STACKIT APIs. That is useful for enterprise governance, but it makes STACKIT's own identity layer part of Kubernetes access and cloud API access. If the requirement is an independent identity boundary, such as Keycloak using OIDC, STACKIT is weaker than Exoscale or OVHcloud here. STACKIT can make the cloud feel like the natural place for every adjacent decision: identity, policy, observability, runtime choices, data services, and security controls. The danger is not one bad product. The danger is that the architecture slowly settles into one enterprise control plane. STACKIT needs especially clear rules about what is infrastructure and what would start to define the system.

## Specialist data and identity

[Aiven](https://aiven.io/) is a strong example of the specialist data-layer shape introduced earlier.

It is a Finnish managed open-source data platform for services such as PostgreSQL, Kafka, OpenSearch, Valkey, Grafana, and related tools. Its PostgreSQL service advertises PostgreSQL 17 and 18, and its posture is explicitly multi-cloud.

That makes Aiven a real fit when data operations are important enough to deserve a specialist. It can sit beside Exoscale as a separate data provider, or run closer to the infrastructure on clouds Aiven supports, such as UpCloud. The infrastructure provider runs Kubernetes and object storage. Aiven runs the data layer. The boundary is contractual, networked, and architectural.

[Keycloak](https://www.keycloak.org/) is the identity example in the same pattern. It can be self-hosted or run as a managed service through providers such as [Cloud-IAM](https://www.cloud-iam.com/), supports OIDC and OAuth, and keeps the trust boundary visible. That gives applications, users, and Kubernetes a shared identity layer without making the infrastructure provider's identity system the center of the product. Azure has already shown how quickly that can become the product.

This shape is less tidy for billing and procurement. It adds network paths, support boundaries, data processing agreements, and incident coordination. The burden is lighter when the cloud foundation also gives a clean way to deploy and pay for specialist software close to the workloads, so networking does not become its own project. [Keycloak managed by Glasskube](https://www.exoscale.com/marketplace/listing/glasskube-keycloak/) is a good example of that direction: automated deployment of open-source identity software on Kubernetes through the Exoscale marketplace. Compose providers when the data layer or identity layer is strategically important enough to deserve a specialist, but prefer compositions where the operational edges stay boring.

## The decision

After this lens, Exoscale is the strongest first choice for a single European cloud foundation.

It is broad enough to carry the everyday platform, but restrained enough to leave the architecture legible. The cloud can run the foundation without becoming the shape of the product. Identity, data, telemetry, and runtime can still be treated as owned parts of the system instead of slowly dissolving into one provider story.

UpCloud is the quieter alternative. It fits teams that want a smaller cloud surface and are comfortable assembling more of the surrounding platform themselves. That can be a strength when simplicity matters more than breadth, but it should be chosen for that restraint, not as a full replacement for a broader cloud foundation.

Specialists still matter when they strengthen the boundary. Aiven belongs in the picture when the data layer deserves its own operator. A managed Keycloak provider such as Cloud-IAM belongs in the picture when identity should stay independent. More than one provider is not a failure when every provider has a clear role.

The important thing is not whether the provider can host the workload. Many can. The important thing is whether the workload still belongs to the organization after the cloud has made it easier to run.

The best cloud choice is not the one that makes the first day easiest. It is the one that still leaves options on day one thousand.

Managed freedom means using the cloud without letting the cloud become the architecture.