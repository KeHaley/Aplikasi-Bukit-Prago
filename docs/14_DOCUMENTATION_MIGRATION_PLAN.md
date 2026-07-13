# BPV4 MASTER

# DOCUMENTATION MIGRATION PLAN

Version : 2.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official migration strategy from Documentation V4 to Documentation V5.

The objective is to simplify the documentation architecture while preserving all engineering knowledge.

This document is temporary and exists only during the Documentation V5 migration.

---

# Lifecycle

Temporary

This document SHALL remain active only until the Documentation V5 migration has been completed.

After successful completion, this document SHALL be archived.

---

# Migration Goal

The migration SHALL:

- reduce duplicated information;
- preserve all project knowledge;
- maintain the Single Source of Truth (SSOT);
- improve long-term maintainability;
- establish one owner for every important information.

---

# Migration Deliverables

The migration SHALL produce:

- Documentation V5 completed;
- Information Ownership established;
- duplicate information minimized;
- stable documentation architecture;
- simplified future maintenance.

---

# Migration Principles

Every migration SHALL:

- preserve existing knowledge;
- preserve document purpose;
- preserve engineering intent;
- preserve project history;
- minimize duplicated information;
- define one owner for every important information.

---

# Migration Strategy

Documentation SHALL be migrated incrementally.

Large-scale rewrites are prohibited.

Every migration SHALL be:

- evidence-based;
- verifiable;
- reversible when necessary.

---

# Migration Phases

## Phase 1

Foundation

Documents

- README.md
- 00_PROJECT_CONTEXT.md
- 10_PROJECT_INTENT.md

Goal

Clarify permanent project identity.

Remove duplicated operational information.

Status

COMPLETE

---

## Phase 2

Architecture

Documents

- 02_ARCHITECTURE.md
- 03_ARCHITECTURE_DECISIONS.md

Goal

Centralize architecture knowledge.

Status

COMPLETE

---

## Phase 3

Governance

Documents

- 06_AI_ASSISTANT_POLICY.md
- 07_AI_STARTUP_GUIDE.md
- 08_DOCUMENTATION_STANDARD.md
- 09_ENGINEERING_METHODOLOGY.md
- 11_ENGINEERING_PLAYBOOK.md
- 12_REPOSITORY_STANDARD.md

Goal

Standardize engineering governance.

Status

COMPLETE

---

## Phase 4

Operations

Documents

- CURRENT_WORK.md
- 01_PROJECT_STATE.md
- 05_CHANGELOG.md

Goal

Separate:

- active engineering contract;
- project state;
- project history.

Status

COMPLETE

---

## Phase 5

Planning

Documents

- 04_ROADMAP.md

Goal

Ensure the roadmap contains only long-term engineering direction.

Operational status SHALL NOT be stored in this document.

Status

COMPLETE

---

## Phase 6

Validation

Goal

Verify that Documentation V5 is internally consistent.

Validation Checklist

- no critical information lost;
- duplicate information minimized;
- information ownership established;
- startup remains possible using documentation only;
- repository remains internally consistent.

Status

IN PROGRESS

---

# Update Rules

During the migration, milestone changes SHOULD normally require updates only to:

- CURRENT_WORK.md
- PROJECT_STATE.md
- CHANGELOG.md

Foundation and Governance documents SHALL remain stable unless their own subject changes.

---

# Completion Criteria

The migration is complete when:

- Documentation V5 is fully implemented;
- information ownership is clearly defined;
- duplicated information is minimized;
- documentation remains internally consistent;
- CURRENT_WORK.md becomes the Operational SSOT;
- a new AI can continue the project using documentation only.

---

# Migration Exit

After successful completion:

- Documentation V5 becomes the official documentation baseline.
- This document SHALL be moved to the project archive.
- Future documentation SHALL follow Documentation V5 standards.
- Documentation migration activities are considered complete.

---

# Related Documents

Documentation Standard

```text
docs/08_DOCUMENTATION_STANDARD.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Current Engineering Contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Documentation Migration Plan

Version

2.0

State

ACTIVE