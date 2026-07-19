# BPV4 MASTER

# ROADMAP

Version : 7.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official engineering roadmap of the BPV4 Modularization Engine.

This roadmap defines the long-term evolution of the engineering engine responsible for safely modularizing the Bukit Prago Operational Application.

The roadmap defines engineering direction.

It does not define the current engineering contract.

---

# Engineering Vision

Build a complete engineering engine capable of safely transforming the production application's `Index.html` into modular JavaScript while preserving identical behaviour.

Every roadmap phase SHALL directly contribute to safe modularization.

---

# Engineering Pipeline

The Modularization Engine follows one continuous engineering pipeline.

```text
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

Each phase produces engineering artifacts required by the next phase.

---

# Engineering Roadmap

## Phase 1

### Source Discovery

Status

COMPLETE

### Objective

Discover every engineering element contained within the production source code.

### Deliverables

- Function Registry
- Global Variable Registry

---

## Phase 2

### Dependency Extraction

Status

ACTIVE

### Objective

Extract all dependencies directly from the production source code.

### Deliverables

- Function Call Graph
- Global Variable Access Graph
- DOM Access Graph
- Browser API Graph
- google.script.run Graph
- DependencyGraph

---

## Phase 3

### Module Detection

Status

PLANNED

### Objective

Automatically identify safe module boundaries using the DependencyGraph.

### Deliverables

- ModuleCandidate

---

## Phase 4

### Coupling Analyzer

Status

PLANNED

### Objective

Measure dependency quality between module candidates.

### Deliverables

- Fan In
- Fan Out
- Cohesion
- Coupling
- Shared Globals
- Shared DOM
- ModuleMetrics

---

## Phase 5

### Extraction Planner

Status

PLANNED

### Objective

Generate the safest modularization sequence.

### Deliverables

- ExtractionPlan

---

## Phase 6

### Safe Modularizer

Status

PLANNED

### Objective

Generate JavaScript modules without changing production behaviour.

### Deliverables

- dashboard.js
- history.js
- rekap.js
- target.js
- input.js
- pemupukan.js
- Additional modules as required

---

## Phase 7

### Verification

Status

PLANNED

### Objective

Verify that modularization preserves identical application behaviour.

### Deliverables

- Broken Reference Report
- Dependency Validation
- Behaviour Validation
- Modularization Validation

---

# Engineering Rules

Every roadmap phase SHALL:

- preserve production behaviour;
- use source code as the primary evidence;
- avoid manual dependency creation;
- remain repeatable;
- minimize engineering risk.

---

# Current Engineering Contract

The active engineering contract is defined in:

```text
CURRENT_WORK.md
```

The roadmap defines long-term direction only.

Current implementation priorities SHALL always follow the active engineering contract.

---

# Progress Tracking

Current engineering progress is recorded in:

```text
docs/01_PROJECT_STATE.md
```

Project history is recorded in:

```text
docs/05_CHANGELOG.md
```

---

# Roadmap Success Criteria

The roadmap is considered successful when:

- every phase completes successfully;
- every engineering artifact is generated automatically;
- dependency extraction is accurate;
- module boundaries are safely identified;
- modularization is repeatable;
- generated modules preserve identical behaviour.

---

# Official Status

Authority

Roadmap

Version

7.0

Status

OFFICIAL

State

ACTIVE