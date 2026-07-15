# BPV4 MASTER

# CURRENT WORK

Version : 5.1

Status : ACTIVE

State : LOCKED

---

# Purpose

Define the only active engineering contract.

Every AI and engineer SHALL continue implementation from this document.

This document is the Operational Single Source of Truth (Operational SSOT).

---

# Current Mission

Stabilize the Bukit Prago Desktop Application.

Nothing has higher priority.

---

# Current Phase

Desktop Stabilization

---

# Current Milestone

M-02

Desktop Stabilization

---

# Current Objective

Stabilize the Bukit Prago Desktop Application while preserving the Product SSOT.

Desktop improvements SHALL NOT modify production behaviour.

---

# Current Priority

ONLY ONE

Stabilize the Desktop Runtime.

Current implementation SHALL focus on:

- Splash Screen
- Loading Indicator
- Offline Detection
- Error Handling

The following items are intentionally excluded from M-02:

- About Dialog
- Settings

Installer remains a mandatory project deliverable but SHALL be implemented during the Release phase after the Desktop Runtime and the Bukit Prago Application have reached production maturity.

No work outside this priority SHALL take precedence.

---

# Current Deliverables

This milestone SHALL produce:

- Stable Desktop Runtime
- Splash Screen
- Loading Screen
- Offline Detection
- Error Handling
- Production behaviour preserved
- Build PASS
- Typecheck PASS

Installer is NOT part of M-02.

Installer SHALL be implemented during the Release phase after the application has reached production readiness.

---

# Current Constraints

During this milestone:

- DO NOT modify `apps/bukit-prago` unless explicitly instructed by the Project Owner.
- Preserve production behaviour.
- Desktop Runtime SHALL remain independent from the Product SSOT.
- Avoid unnecessary architectural changes.
- Do NOT introduce native Desktop UI that changes the existing user experience without explicit approval.

---

# Implementation Rules

Before implementation:

- validate the repository;
- verify the Product SSOT;
- verify the Desktop Runtime;
- follow the Engineering Playbook.

Repository validation is defined in:

```text
docs/12_REPOSITORY_STANDARD.md
```

Implementation workflow is defined in:

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

---

# Engineering Decisions

The following decisions are LOCKED for M-02:

- Desktop Runtime acts only as the native host.
- The primary user interface remains the Bukit Prago Web Application.
- Native desktop menus (About, Settings, etc.) are intentionally omitted.
- Desktop Runtime shall remain lightweight and focused on stability.
- Avoid feature additions without demonstrated operational value.
- Installer remains a mandatory Release deliverable and SHALL NOT be implemented before the application reaches production maturity.

---

# Definition of Done

The current milestone is complete when:

- Desktop Runtime is stable;
- planned deliverables are complete;
- production behaviour remains compatible;
- Build PASS;
- Typecheck PASS;
- required documentation has been updated;
- Project Owner confirms PASS.

---

# Next Milestone

M-03

Operational Verification

The next milestone SHALL NOT begin before the current milestone is completed and frozen.

---

# Official Status

Authority

Current Work

Version

5.1

State

ACTIVE

Current Milestone

M-02

Status

READY FOR FREEZE