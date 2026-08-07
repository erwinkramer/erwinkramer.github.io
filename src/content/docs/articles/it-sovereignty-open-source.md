---
title: IT Sovereignty and the Open Source Future
description: Why organizations need control over their software, data, and operating model in an unstable world.
author: Erwin Kramer
date: 2026-08-07
---

<figure class="page-art">
	<img src="/assets/contact-ledger-collage.svg" alt="Dark analog ledger collage with columns and signal lines" />
</figure>

IT sovereignty used to sound like a concern for governments, banks, and regulated industries. That was always too narrow. In the current world climate, sovereignty is becoming a basic design requirement for any organization that depends on software to operate.

The question is simple: who can still run your systems when conditions change?

Geopolitical tension, sanctions, supply chain pressure, export controls, sudden policy shifts, platform outages, price changes, and legal uncertainty all expose the same weakness. Many organizations have built critical services on infrastructure they do not really control, using platforms they cannot inspect, contracts they cannot meaningfully negotiate, and operating models that make leaving expensive by design.

That is not resilience. It is convenience with a long tail.

## Sovereignty is operational control

Sovereignty in IT is not isolationism. It is not a nostalgic argument for running everything in a basement. It is the practical ability to make independent decisions about systems that matter.

That means knowing where data lives. It means being able to move workloads without rewriting the business. It means choosing providers without becoming trapped by proprietary primitives. It means understanding the software supply chain well enough to patch, replace, audit, and verify what you depend on. It means having the skills and architecture to keep operating when a vendor relationship, region, regulation, or price model changes.

Sovereignty is not about rejecting outside help. It is about making sure outside help does not become outside control.

## The hyperscaler promise has a limit

Azure, AWS, Google Cloud, and the other large cloud companies solved real problems. They made infrastructure easier to access. They gave teams managed databases, identity systems, networking, deployment platforms, observability tools, and global capacity without waiting months for procurement. That mattered.

But the next phase of IT cannot simply be more dependence on bigger platforms.

Azure and the big cloud companies are not the future if the future means organizations handing over more of their architecture, data gravity, security model, developer workflow, and commercial leverage to a small group of vendors. They may remain useful infrastructure providers, but they should not be the center of gravity for digital strategy.

The future cannot be one where every serious decision starts with, "What does our cloud vendor allow?" It has to start with, "What does our organization need to be able to control?"

## Managed convenience becomes strategic dependency

The danger is not that managed services are bad. The danger is that they are easy.

Each managed service removes a problem from today's backlog. Over time, those choices become an architecture. Identity, storage, queues, serverless functions, databases, policy engines, monitoring, secrets, AI services, and deployment systems become deeply tied to one provider's APIs and assumptions. The organization gets faster at using that platform, but worse at operating outside it.

That is the trade. Speed today can become reduced freedom tomorrow.

At small scale, that may be acceptable. For critical systems, public services, healthcare, finance, education, logistics, media, and national infrastructure, it deserves much harder scrutiny. The more essential the system, the more dangerous it is to depend on a control plane that sits outside your effective reach.

## Open source changes the power balance

Open source software is not automatically sovereign. A careless open source stack can still be fragile, under-maintained, badly secured, or effectively controlled by a single commercial sponsor. But open source is the strongest foundation we have for sovereignty because it changes the default power relationship.

With open source, the code can be inspected. Standards can be implemented by more than one vendor. Skills can transfer between organizations. Bugs can be understood instead of merely escalated. Communities can maintain important tools beyond one company's product roadmap. Systems can be packaged, hosted, forked, patched, and audited in ways proprietary services rarely allow.

That matters because sovereignty is not only about ownership. It is about options.

Open source gives organizations more options: self-host, use a local provider, use a European provider, run on a hyperscaler when useful, move to another environment when necessary, or operate in a hybrid model. It makes portability a real engineering property instead of a procurement slogan.

## The way forward is open by default

The better path is not to abandon cloud. It is to stop treating proprietary cloud services as the default architecture for everything.

Use open standards before closed APIs. Use portable runtimes before proprietary execution models. Prefer PostgreSQL over a cloud-only database when the requirements fit. Prefer Kubernetes or simple container platforms over platform-specific deployment where portability matters. Prefer OpenTelemetry over vendor-specific observability wiring. Prefer open identity standards. Prefer infrastructure code that can target more than one environment. Prefer systems where the data model remains yours.

None of this means every team must operate every component themselves. Managed open source can be a good compromise when the contract, data access, backup model, and exit path are clear. The point is not self-hosting as an ideology. The point is keeping agency.

## Sovereignty needs engineering discipline

The hard part is that sovereignty cannot be bought as a feature. It has to be designed.

That requires boring but serious engineering work:

1. Clear data classification and residency decisions.
2. Open formats for data export and backup.
3. Documented recovery paths that do not assume one provider.
4. Avoiding proprietary services where they create hard lock-in.
5. Regular exit tests for critical workloads.
6. Supply chain visibility for dependencies, containers, and build systems.
7. Internal skills for operating the core stack.
8. Procurement that values exit options as much as onboarding speed.

This is not anti-cloud. It is pro-continuity.

## The future belongs to organizations that can choose

The current world climate makes one thing clear: technical dependence becomes strategic dependence. If software runs the organization, then the ability to understand, move, repair, and govern that software is not optional.

Azure and the big cloud companies will continue to exist. They will continue to sell useful services. But they should not define the future of IT. A future built entirely on closed platforms is a future where too few companies hold too much operational power over everyone else.

The healthier future is open, portable, inspectable, and plural. It is built on open source software, open standards, local competence, and architectures that keep choices alive.

IT sovereignty is not a retreat from modern technology. It is the condition for using modern technology without surrendering control.