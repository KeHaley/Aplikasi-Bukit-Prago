# BPV4 MASTER

# ENGINEERING METHODOLOGY

Version : 7.1

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official engineering methodology of the BPV4 Modularization Engine.

This document establishes the permanent engineering principles used throughout the project.

The methodology defines how engineering decisions are made.

It does NOT define implementation workflow, project status, or the active engineering contract.

---

# Engineering Philosophy

The objective of engineering is to safely modularize the Bukit Prago Operational Application while preserving identical behaviour.

Engineering decisions SHALL be:

- evidence-driven;
- repository-driven;
- repeatable;
- behaviour-preserving;
- necessary.

Engineering SHALL maximize engineering quality while preserving identical external behaviour.

---

# Engineering Principles

Every engineering activity SHALL follow these principles.

- Source Code First
- Evidence First
- Behaviour Preservation
- Necessary Engineering
- Static Analysis
- Incremental Engineering
- Repeatable Engineering
- Validation Before Change
- Single Source of Truth
- Traceability

These principles remain valid throughout the lifetime of the project.

---

# Engineering Method

Engineering SHALL follow the following methodology.

```text
Observe
        ↓
Understand
        ↓
Analyze
        ↓
Plan
        ↓
Implement
        ↓
Validate
        ↓
Review
        ↓
Repeat
```

Each step SHALL be completed before progressing to the next.

---

# Evidence-Driven Engineering

Engineering decisions SHALL always be based on verified repository evidence.

Evidence MAY include:

- source code;
- dependency analysis;
- validation results;
- generated engineering artifacts.

Assumptions SHALL NOT become engineering facts.

---

# Behaviour Preservation

Behaviour Preservation is the highest engineering constraint.

Engineering SHALL preserve:

- application behaviour;
- business logic;
- user workflow;
- user interface;
- visual appearance;
- data processing;
- calculations;
- outputs;
- APIs;
- integrations.

Engineering SHALL preserve production behaviour unless explicitly approved by the Project Owner.

Whenever practical, engineering work SHALL occur outside the production source code.

From the Product Owner's perspective, the application SHALL behave identically before and after engineering changes.

---

# Engineering Freedom

Within the Behaviour Preservation constraint, engineering MAY freely improve the internal implementation.

Engineering MAY:

- reorganize source code;
- redesign module boundaries;
- split or merge modules;
- relocate functions;
- improve dependencies;
- improve maintainability;
- improve readability;
- improve extensibility;
- improve testability.

Internal implementation MAY evolve provided that external behaviour remains unchanged.

---

# Necessary Engineering

Every engineering change SHALL address a demonstrated current engineering need.

Engineering SHALL NOT introduce new abstractions, modules, utilities, interfaces, or supporting structures solely for possible future use.

Every engineering artifact SHALL provide immediate engineering value by:

- solving a current engineering problem;
- supporting the current engineering objective;
- reducing current complexity; or
- improving current maintainability.

Speculative engineering SHALL be avoided.

---

# Static Analysis

Static analysis is the preferred engineering approach.

Repository understanding SHALL be derived from source code analysis before any implementation begins.

Manual interpretation SHALL be minimized whenever engineering evidence can be generated automatically.

---

# Incremental Engineering

Engineering SHALL progress in small, verifiable increments.

Every completed increment SHALL:

- produce measurable results;
- remain independently verifiable;
- preserve repository consistency.

Future engineering SHALL build upon completed engineering results rather than speculative preparation.

---

# Validation

Every engineering change SHALL be validated before continuation.

Validation methods MAY include:

- dependency validation;
- engineering validation;
- regression validation;
- behaviour validation;
- build validation;
- typecheck validation.

Only validations applicable to the current engineering activity are required.

---

# Decision Principles

When multiple engineering options exist, preference SHALL be given to the solution that:

1. preserves production behaviour;
2. solves the current engineering need;
3. minimizes engineering risk;
4. relies on repository evidence;
5. minimizes implementation scope;
6. improves maintainability;
7. avoids speculative engineering;
8. remains repeatable.

---

# Continuous Improvement

Engineering methodology SHALL continuously evolve while preserving:

- Product SSOT;
- Source Code SSOT;
- repository consistency;
- documentation consistency.

Methodology improvements SHALL simplify engineering without changing project objectives.

---

# Related Documentation

Project Context

```text
docs/00_PROJECT_CONTEXT.md
```

Architecture

```text
docs/02_ARCHITECTURE.md
```

Engineering Playbook

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Repository Standard

```text
docs/12_REPOSITORY_STANDARD.md
```
Implementation Standard

docs/16_IMPLEMENTATION_STANDARD.md

Current Engineering Contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Engineering Methodology

Version

7.1

Status

OFFICIAL

State

ACTIVE