# BPV4 MASTER

# CURRENT WORK

Version : 6.0

Status : ACTIVE

State : LOCKED

---

# Purpose

Define the active engineering contract of the BPV4 Modularization Engine.

This document is the Operational Single Source of Truth (Operational SSOT).

Every AI and engineer SHALL continue implementation from this document.

If this document conflicts with any other document, this document takes precedence for day-to-day engineering work.

---

# Current Mission

Build the BPV4 Modularization Engine capable of safely modularizing the Bukit Prago Operational Application while preserving identical behaviour.

Nothing has higher priority.

---

# Current Phase

Phase 2

Dependency Extraction

---

# Current Objective

Generate a complete Dependency Graph from the production application's `Index.html`.

The Dependency Graph SHALL become the primary engineering artifact for all subsequent modularization activities.

---

# Current Deliverables

The current phase SHALL produce:

- Function Call Graph
- Global Variable Access Graph
- DOM Access Graph
- Browser API Dependency Graph
- `google.script.run` Dependency Graph
- Unified Dependency Graph

All artifacts SHALL be generated automatically from the production source code.

---

# Current Priority

ONLY ONE

Complete Dependency Extraction.

Every implementation SHALL directly contribute to generating an accurate Dependency Graph.

Activities outside this objective SHALL NOT take priority.

---

# Current Constraints

During this phase:

- DO NOT modify the production application's behaviour.
- DO NOT manually edit the production source code unless explicitly approved by the Project Owner.
- DO NOT begin module extraction.
- DO NOT split production files.
- DO NOT rename production functions or variables.
- DO NOT introduce architectural redesign unrelated to dependency extraction.

The production application remains the Product SSOT.

---

# Implementation Rules

Before implementation:

- validate the repository;
- verify the Product SSOT;
- verify the current engineering phase;
- review the latest architecture decisions;
- follow the Engineering Playbook.

Repository standards are defined in:

```text
docs/12_REPOSITORY_STANDARD.md
```

Implementation workflow is defined in:

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

---

# Engineering Decisions

The following decisions are LOCKED during Phase 2:

- Source code is the only engineering evidence.
- Dependency extraction SHALL use static analysis.
- Dependency Graph SHALL be generated automatically.
- Manual dependency mapping is prohibited.
- Behaviour Preservation is mandatory.
- Module extraction SHALL NOT begin before Dependency Extraction is complete.

---

# Definition of Done

The current phase is complete when:

- every dependency has been extracted;
- the Dependency Graph has been generated successfully;
- engineering artifacts are reproducible;
- no production behaviour has been modified;
- validation passes;
- required documentation has been updated;
- the Project Owner confirms PASS.

---

# Next Phase

Phase 3

Module Detection

Module Detection SHALL NOT begin until Dependency Extraction has been completed, validated, and frozen.

---

# AI Startup

If you are an AI continuing this project:

Current Priority

Dependency Extraction.

Your immediate objective is to generate a complete Dependency Graph.

Do NOT redesign the architecture.

Do NOT perform modularization.

Do NOT modify production behaviour.

Read this document together with:

```text
docs/01_PROJECT_STATE.md
docs/02_ARCHITECTURE.md
docs/03_ARCHITECTURE_DECISIONS.md
docs/04_ROADMAP.md
```

Continue implementation only within the scope defined by this engineering contract.

---

# Official Status

Authority

Current Work

Version

6.0

Status

ACTIVE

State

LOCKED

Current Phase

Phase 2

Dependency Extraction