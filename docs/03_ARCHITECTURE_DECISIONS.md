# BPV4 MASTER

# ARCHITECTURE DECISIONS

Version : 7.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Record the permanent architecture decisions of the BPV4 Modularization Engine.

This document explains why the architecture is designed as it is and records decisions that are expected to remain stable throughout the lifetime of the project.

Implementation details SHALL NOT be documented here.

---

# Decision Principles

Architecture decisions SHALL:

- support safe modularization;
- preserve production behaviour;
- remain evidence-based;
- minimize engineering risk;
- maximize repeatability.

---

# Official Architecture Decisions

## AD-001

### Product SSOT

The Bukit Prago Operational Application is the Product Single Source of Truth (Product SSOT).

```text
apps/Bukit Prago
```

Every engineering activity SHALL preserve the Product SSOT.

---

## AD-002

### Source Code First

The production source code is the only authoritative engineering evidence.

Documentation SHALL NOT replace source code.

Whenever documentation conflicts with source code, source code prevails.

---

## AD-003

### Static Analysis First

All dependency discovery SHALL be performed using static analysis.

Manual dependency creation is prohibited.

---

## AD-004

### Evidence First

Every engineering decision SHALL be supported by evidence extracted from the production source code.

Assumptions SHALL NOT become engineering facts.

---

## AD-005

### Dependency Graph Authority

The Dependency Graph is the primary engineering artifact for modularization.

Module detection, coupling analysis, extraction planning, and verification SHALL use the Dependency Graph as their primary input.

---

## AD-006

### Behaviour Preservation

Behaviour Preservation is the highest engineering constraint.

No modularization activity may intentionally change production behaviour before verification has confirmed behavioural equivalence.

---

## AD-007

### Incremental Modularization

Modularization SHALL be performed incrementally.

Each extraction SHALL be independently verifiable before the next extraction begins.

---

## AD-008

### Automated Discovery

The following engineering artifacts SHALL be generated automatically.

- Function Registry
- Global Variable Registry
- Dependency Graph
- Module Candidate
- Module Metrics
- Extraction Plan

Manual maintenance of these artifacts is prohibited.

---

## AD-009

### Documentation Separation

Engineering documentation describes the architecture.

Engineering artifacts describe the production application.

Documentation and engineering artifacts SHALL remain separated.

---

## AD-010

### Archive Policy

Historical documentation SHALL be moved to the repository archive.

Archived documentation is read-only.

Archived documentation SHALL NOT become an active engineering reference unless explicitly requested.

---

## AD-011

### Repeatable Engineering

Running the Modularization Engine multiple times against the same production source code SHALL produce identical engineering artifacts.

Deterministic engineering behaviour is mandatory.

---

## AD-012

### Safe Extraction

Module extraction SHALL only occur after:

- dependency validation;
- coupling analysis;
- extraction planning;
- verification planning.

No source code SHALL be moved directly from the production application without completing these stages.

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

Architecture

```text
docs/02_ARCHITECTURE.md
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

# Architecture Evolution

New architecture decisions SHALL:

- improve modularization safety;
- preserve behaviour;
- remain evidence-driven;
- minimize coupling;
- improve automation;
- support repeatable engineering.

---

# Official Status

Authority

Architecture Decisions

Version

7.0

Status

OFFICIAL

State

ACTIVE