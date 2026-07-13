# BPV4 MASTER

# ARCHITECTURE

Version : 5.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official architecture of the BPV4 project.

This document defines the repository architecture, engineering layers, component responsibilities, dependency rules, and runtime architecture supporting the Bukit Prago Operational Application.

---

# Architecture Philosophy

BPV4 follows a product-centric architecture.

The Bukit Prago Operational Application is the center of the engineering ecosystem.

Every engineering component exists to support, protect and improve the Product SSOT.

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

Responsibilities:

- Launch the production application.
- Host Microsoft Edge WebView2.
- Integrate with the Windows desktop environment.
- Preserve production behaviour.

The Desktop Runtime is an engineering component.

It is NOT the primary product.

---

# Repository Architecture

```text
BPV4_MASTER
│
├── apps
│   ├── bukit-prago          ← Product SSOT
│   └── bpv4-desktop         ← Desktop Runtime
│
├── packages
│
├── docs
│
├── tests
│
└── tools
```

---

# Repository Layers

## Layer 1 — Product

```text
apps/bukit-prago
```

Official production application.

---

## Layer 2 — Desktop Runtime

```text
apps/bpv4-desktop
```

Official Windows Desktop Runtime.

---

## Layer 3 — Engineering Components

```text
packages/
```

Reusable engineering libraries.

Examples:

- workspace
- parser
- analyzer
- knowledge
- documentation
- deployment

---

## Layer 4 — Documentation

```text
docs/
```

Official engineering documentation.

Permanent project knowledge.

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

Dependencies SHALL always move toward the Product SSOT.

```text
Desktop Runtime

↓

Product SSOT
```

Engineering components MAY depend on engineering libraries.

The Product SSOT SHALL NEVER depend on:

- Desktop Runtime
- Engineering Packages
- Testing
- Documentation
- Tools

---

# Dependency Rules

Allowed

```text
Desktop Runtime

↓

Product
```

Allowed

```text
Packages

↓

Packages
```

Prohibited

```text
Product

↓

Desktop Runtime
```

Prohibited

```text
Product

↓

Packages
```

Circular dependencies are prohibited.

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

Engineering methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Engineering workflow

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Architecture decisions

```text
docs/03_ARCHITECTURE_DECISIONS.md
```

Repository standard

```text
docs/12_REPOSITORY_STANDARD.md
```

---

# Architecture Success Criteria

The architecture is considered successful when:

- repository responsibilities are clearly separated;
- the Product SSOT remains protected;
- the Desktop Runtime remains independent;
- dependencies remain consistent;
- engineering components remain modular;
- future engineering expansion can be implemented without impacting the production application.

---

# Official Status

Authority

Architecture

Version

5.0

State

ACTIVE