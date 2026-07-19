# BPV4 MASTER

# PROJECT CONTEXT

Version : 7.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the permanent context of the BPV4 Modularization Engine project.

This document establishes the long-term engineering mission, project boundaries, engineering principles, and repository context.

Every engineering activity SHALL remain aligned with this document.

---

# Project Definition

Project Name

BPV4 Modularization Engine

Project Type

Engineering Engine

Primary Objective

Safely modularize the Bukit Prago Operational Application.

Primary Engineering Output

Behaviour-preserving JavaScript modules extracted from the production application's `Index.html`.

This repository exists to build an engineering engine.

It does NOT exist to redesign or rewrite the production application.

---

# Project Mission

Build an engineering engine capable of safely transforming the Bukit Prago Operational Application into modular JavaScript while preserving identical behaviour.

Every engineering activity SHALL contribute directly to that mission.

---

# Primary Product

The primary product of this project is the Bukit Prago Operational Application.

Official Product Location

```text
apps/Bukit Prago
```

This directory is the Product Single Source of Truth (Product SSOT).

Engineering SHALL preserve the Product SSOT throughout the entire project.

---

# Engineering Objective

The objective of this repository is to build the BPV4 Modularization Engine.

The Modularization Engine performs engineering analysis and generates the information required for safe modularization.

The engineering engine is a supporting capability.

It is NOT the operational application.

---

# Engineering Scope

The Modularization Engine SHALL provide the following capabilities.

- Source Discovery
- Function Registry
- Global Variable Registry
- Dependency Extraction
- Module Detection
- Coupling Analysis
- Extraction Planning
- Safe Modularization
- Verification

Every capability SHALL contribute directly to safe modularization.

---

# Out of Scope

The following activities are NOT project objectives.

- Reverse Engineering
- Documentation Generation
- Engineering Knowledge Base Generation
- User Interface Redesign
- Product Feature Development
- Performance Optimization
- Production Refactoring without an approved modularization plan

These activities MAY support engineering but SHALL NOT become engineering objectives.

---

# Primary Engineering Question

Every engineering decision SHALL answer one question.

> Does this make modularization safer?

If the answer is NO,

the activity SHALL NOT become a project priority.

---

# Product Preservation

The production application SHALL remain preserved.

Engineering SHALL NOT intentionally change production behaviour unless explicitly approved by the Project Owner.

Whenever practical, engineering work SHALL be performed outside the production source code.

Behaviour Preservation is mandatory.

---

# Engineering Principles

The project permanently follows these principles.

- Source Code First
- Evidence First
- No Assumption
- Static Analysis
- Incremental Development
- Behaviour Preservation
- Safe Refactoring
- Repeatable Engineering

These principles govern every engineering decision.

---

# Engineering Workflow

The official engineering workflow is:

```text
Production Source Code
        ↓
Source Discovery
        ↓
Dependency Extraction
        ↓
Module Detection
        ↓
Coupling Analysis
        ↓
Extraction Planning
        ↓
Safe Modularization
        ↓
Verification
```

Every engineering artifact SHALL support the next stage of this workflow.

---

# Repository Authority

The official repository is the Source Code Single Source of Truth (Source Code SSOT).

All engineering work SHALL originate from the latest approved repository.

Engineering decisions SHALL always be supported by evidence extracted from the source code.

---

# Project Success

The project is considered successful when:

- the production source code can be analyzed automatically;
- every dependency is extracted correctly;
- safe module boundaries are identified;
- extraction plans are generated automatically;
- JavaScript modules are generated safely;
- verification reports zero broken references;
- production behaviour remains identical after modularization.

---

# Repository Structure

The repository is organized into the following primary areas.

```text
apps/
    Production Application (Product SSOT)

engine/
    BPV4 Modularization Engine

docs/
    Active Engineering Documentation

archive/
    Historical Documentation (Read Only)

tests/
    Verification and Regression Tests
```

Only documents located in `docs/` represent the active engineering context.

Documents located in `archive/` SHALL NOT be used as active engineering references unless explicitly requested.

---

# Related Documentation

Project State

```text
docs/01_PROJECT_STATE.md
```

Architecture

```text
docs/02_ARCHITECTURE.md
```

Architecture Decisions

```text
docs/03_ARCHITECTURE_DECISIONS.md
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

# AI Startup

If you are an AI opening this repository for the first time:

1. Read this document completely.
2. Read `docs/01_PROJECT_STATE.md`.
3. Read `docs/02_ARCHITECTURE.md`.
4. Read `docs/03_ARCHITECTURE_DECISIONS.md`.
5. Read `docs/04_ROADMAP.md`.
6. Read `CURRENT_WORK.md`.

After reading these documents you SHALL understand:

- what the project is;
- why the project exists;
- the current engineering status;
- the repository architecture;
- the long-term roadmap;
- the active engineering contract.

Do NOT begin implementation before understanding the active engineering contract.

Do NOT use archived documentation unless explicitly instructed.

---

# Official Status

Authority

Project Context

Version

7.0

Status

OFFICIAL

State

ACTIVE