# BPV4 MASTER

# ARCHITECTURE

Version : 6.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official architecture of the BPV4 Modularization Engine.

This document defines the engineering architecture responsible for safely modularizing the Bukit Prago Operational Application while preserving identical behaviour.

---

# Architecture Goal

The architecture exists to support one objective:

Safely modularize the production application's `Index.html`.

Every engineering component SHALL directly contribute to that objective.

---

# Primary Product

Official Product

```text
apps/Bukit Prago
```

The Bukit Prago Operational Application.

This directory is the Product Single Source of Truth (Product SSOT).

The production application SHALL remain preserved.

---

# Engineering Product

Official Engineering Product

```text
engine/
```

The BPV4 Modularization Engine.

The engine analyzes the production source code, discovers dependencies, detects module boundaries, generates extraction plans, produces JavaScript modules, and verifies behavioural equivalence.

---

# Repository Architecture

```text
BPV4_MASTER/

├── apps/
│   └── Bukit Prago/
│
├── engine/
│
├── docs/
│
├── artifacts/
│
├── archive/
│
└── tests/
```

---

# Engineering Layers

## Layer 1 — Production Application

```text
apps/Bukit Prago
```

The Product SSOT.

No engineering component may modify application behaviour during analysis.

---

## Layer 2 — Modularization Engine

```text
engine/
```

Responsible for:

- Source Discovery
- Static Analysis
- Function Registry
- Global Variable Registry
- Dependency Extraction
- Module Detection
- Coupling Analysis
- Extraction Planning
- Safe Modularization
- Verification

---

## Layer 3 — Artifacts

```text
artifacts/
```

Automatically generated engineering outputs.

Examples:

- Function Registry
- Global Variable Registry
- Dependency Graph
- Module Candidate
- Module Metrics
- Extraction Plan

Artifacts SHALL NOT be edited manually.

---

## Layer 4 — Documentation

```text
docs/
```

Active engineering documentation.

Documentation defines engineering intent, architecture, and project governance.

---

## Layer 5 — Archive

```text
archive/
```

Historical documentation.

Archive is read-only.

Archived documents SHALL NOT become active engineering references unless explicitly requested.

---

## Layer 6 — Verification

```text
tests/
```

Verification and regression testing.

Responsible for confirming that modularization preserves application behaviour.

---

# Engineering Pipeline

The Modularization Engine operates through the following pipeline.

```text
Production Source Code

↓

Source Discovery

↓

Function Registry

↓

Global Variable Registry

↓

Dependency Extraction

↓

Dependency Graph

↓

Module Detection

↓

Module Candidate

↓

Coupling Analysis

↓

Module Metrics

↓

Extraction Planner

↓

Extraction Plan

↓

Safe Modularizer

↓

JavaScript Modules

↓

Verification
```

Every stage consumes evidence produced by the previous stage.

---

# Dependency Architecture

Engineering dependencies SHALL always move toward the production source code.

```text
Engine

↓

Production Source Code
```

The production application SHALL NEVER depend on the engineering engine.

---

# Dependency Rules

Allowed

```text
Engine

↓

Production Source Code
```

Allowed

```text
Verification

↓

Artifacts
```

Allowed

```text
Documentation

↓

Artifacts
```

Prohibited

```text
Production Source Code

↓

Engine
```

Prohibited

```text
Production Source Code

↓

Documentation
```

Prohibited

```text
Production Source Code

↓

Tests
```

Circular dependencies are prohibited.

---

# Engineering Principles

The architecture permanently follows these principles.

- Source Code First
- Evidence First
- Static Analysis
- Behaviour Preservation
- Safe Refactoring
- Incremental Development
- Repeatable Engineering

---

# Behaviour Preservation

Behaviour Preservation is the highest engineering constraint.

No engineering activity shall intentionally change production behaviour before verification has confirmed behavioural equivalence.

---

# Related Documentation

Project Context

```text
docs/00_PROJECT_CONTEXT.md
```

Project State

```text
docs/01_PROJECT_STATE.md
```

Engineering Methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Engineering Playbook

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Roadmap

```text
docs/04_ROADMAP.md
```

Current Work

```text
CURRENT_WORK.md
```

---

# Architecture Success Criteria

The architecture is considered successful when:

- every engineering component directly supports modularization;
- dependencies are extracted automatically;
- module boundaries are identified safely;
- modularization can be performed incrementally;
- generated modules preserve identical behaviour;
- verification confirms zero broken references.

---

# Official Status

Authority

Architecture

Version

6.0

Status

OFFICIAL

State

ACTIVE