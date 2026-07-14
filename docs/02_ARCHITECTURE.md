# BPV4 MASTER

# ARCHITECTURE

Version : 5.2

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official architecture of the BPV4 project.

This document defines the engineering platform architecture, repository architecture, engineering layers, component responsibilities, dependency rules and runtime architecture supporting the Bukit Prago Operational Application.

---

# Engineering Platform

BPV4_MASTER is the official Engineering Platform for the Bukit Prago Operational Application.

The repository is developed as one integrated engineering platform.

Every engineering capability exists to support one common objective:

Restore.

Launch.

Operate.

Preserve.

Continuously improve.

The Bukit Prago Operational Application.

Engineering capabilities are NOT independent products.

They are integrated engineering components working together within one engineering platform.

The Bukit Prago Operational Application remains the only primary product.

---

# Architecture Philosophy

BPV4 follows a product-centric architecture.

The Bukit Prago Operational Application is the center of the engineering ecosystem.

Every engineering component exists to support, protect and improve the Product SSOT.

Engineering SHALL always prioritize the product over engineering infrastructure.

---

# Primary Product

Official Product

```text
apps/bukit-prago
```

The official production application.

This directory is the Product Single Source of Truth (Product SSOT).

---

# Desktop Runtime

Official Desktop Runtime

```text
apps/bpv4-desktop
```

The official Windows Desktop Runtime.

Responsibilities

- Launch the production application.
- Host Microsoft Edge WebView2.
- Integrate with the Windows desktop environment.
- Preserve production behaviour.

The Desktop Runtime is an engineering capability.

It is NOT the primary product.

---

# Repository Architecture

BPV4_MASTER is organized as one integrated engineering platform.

```text
BPV4_MASTER
│
├── Product
│   └── apps/
│       ├── bukit-prago
│       └── bpv4-desktop
│
├── Engineering Components
│   ├── packages/
│   ├── docs/
│   ├── tests/
│   └── tools/
│
└── Engineering Assets
    ├── blueprint/
    ├── archive/
    ├── patches/
    └── other engineering resources
```

Additional engineering directories MAY exist.

As long as they support the Product SSOT and remain consistent with the engineering platform architecture.

The official GitHub repository is the Source Code Single Source of Truth (Source Code SSOT).

Engineering activities are performed using local Working Copies synchronized with the official repository.

---

# Repository Layers

## Layer 1 — Product

```text
apps/bukit-prago
```

Official production application.

Product Single Source of Truth.

---

## Layer 2 — Desktop Runtime

```text
apps/bpv4-desktop
```

Official Windows Desktop Runtime.

Responsible for launching and hosting the Product SSOT.

---

## Layer 3 — Engineering Components

```text
packages/
```

Reusable engineering libraries.

Examples

- workspace
- parser
- analyzer
- knowledge
- documentation
- deployment

---

## Layer 4 — Documentation

Official engineering documentation.

Official engineering governance.

Permanent engineering knowledge.

Engineering Documentation Single Source of Truth (Documentation SSOT).

---

## Layer 5 — Verification

```text
tests/
```

Testing and verification.

---

## Layer 6 — Engineering Utilities

```text
tools/
```

Engineering support utilities.

---

# Runtime Architecture

```text
BukitPrago.exe

↓

Windows Forms

↓

Microsoft Edge WebView2

↓

Google Apps Script

↓

Bukit Prago Operational Application
```

---

# Dependency Architecture

All engineering dependencies SHALL move toward the Product SSOT.

```text
Engineering Components

↓

Desktop Runtime

↓

Product SSOT
```

Engineering infrastructure MAY depend on other engineering components.

The Product SSOT SHALL NEVER depend on engineering infrastructure.

---

# Dependency Rules

Allowed

```text
Engineering Components

↓

Engineering Components
```

Allowed

```text
Desktop Runtime

↓

Product SSOT
```

Prohibited

```text
Product SSOT

↓

Desktop Runtime
```

Prohibited

```text
Product SSOT

↓

Engineering Components
```

Prohibited

```text
Product SSOT

↓

Documentation
```

Prohibited

```text
Product SSOT

↓

Tests
```

Prohibited

```text
Product SSOT

↓

Tools
```

Circular dependencies are prohibited.

---

# Engineering Platform Principles

BPV4_MASTER SHALL operate as one integrated engineering platform.

Engineering capabilities SHALL:

- cooperate;
- share engineering knowledge;
- preserve the Product SSOT;
- remain modular;
- remain loosely coupled;
- support the active engineering contract.

Engineering capabilities SHALL NOT become independent products unless explicitly defined by the Project Owner.

---

# Product Preservation

The Product SSOT SHALL remain protected.

Engineering improvements SHOULD be implemented outside the production application whenever practical.

Desktop Runtime SHALL evolve independently while preserving production behaviour.

---

# Extension Principles

Engineering SHALL:

- extend;
- integrate;
- preserve.

Engineering SHALL NOT:

- redesign the production application;
- modify production behaviour unintentionally;
- tightly couple engineering components with the Product SSOT.

---

# Related Documentation

Engineering Methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Engineering Workflow

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Architecture Decisions

```text
docs/03_ARCHITECTURE_DECISIONS.md
```

Repository Standard

```text
docs/12_REPOSITORY_STANDARD.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

---

# Architecture Success Criteria

The architecture is considered successful when:

- the engineering platform is understood as one integrated system;
- repository responsibilities are clearly separated;
- the Product SSOT remains protected;
- the Source Code SSOT remains protected;
- the Desktop Runtime remains independent;
- engineering capabilities remain integrated;
- dependencies remain consistent;
- engineering components remain modular;
- future engineering expansion can be implemented without impacting the production application.

---

# Official Status

Authority

Architecture

Version

5.2

Status

OFFICIAL

State

ACTIVE