# BPV4 MASTER

# ARCHITECTURE DECISIONS

Version : 6.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Record the official architecture decisions of the BPV4 project.

This document answers one question:

Why is the architecture designed this way?

---

# Decision Principles

Architecture decisions SHALL:

- support the project objective;
- preserve architecture consistency;
- improve maintainability;
- enable continuous product development.

---

# Official Decisions

## AD-001

### Repository First

The repository is the implementation authority.

Documentation defines engineering governance.

---

## AD-002

### Product First

The Bukit Prago Operational Application is the primary product.

All engineering components exist only to support the product.

---

## AD-003

### Product SSOT

```text
apps/bukit-prago
```

is the Product Single Source of Truth (Product SSOT).

The production application SHALL remain protected.

---

## AD-004

### Desktop Runtime Separation

```text
apps/bpv4-desktop
```

is the official Windows Desktop Runtime.

The Desktop Runtime is an engineering component.

It is NOT the product.

Its responsibility is to launch and host the Product SSOT while preserving production behaviour.

---

## AD-005

### Package Architecture

Every package SHALL have one primary responsibility.

Packages SHALL communicate only through public interfaces.

---

## AD-006

### Dependency Direction

Dependencies SHALL always move toward lower-level engineering layers.

The Product SSOT SHALL NEVER depend on engineering components.

Circular dependencies are prohibited.

---

## AD-007

### Evidence First

Engineering decisions SHALL always be based on verified repository evidence.

Assumptions are not engineering evidence.

---

## AD-008

### Product Preservation

Engineering SHALL preserve the integrity and operational behaviour of the Product SSOT.

Whenever practical, improvements SHALL be implemented outside the production application.

---

## AD-009

### Documentation as SSOT

Official documentation is the permanent engineering knowledge of the project.

Documentation SHALL remain internally consistent.

---

## AD-010

### Single Information Ownership

Every important project information SHALL have exactly one owner document.

Other documents SHALL reference the owner instead of duplicating information.

---

## AD-011

### Independent Evolution

Engineering components SHALL evolve independently whenever possible.

Product evolution SHALL remain decoupled from engineering infrastructure.

---

## AD-012

### Behavior-Preserving Architecture

Engineering architecture SHALL preserve existing production behaviour unless an intentional product change has been approved by the Project Owner.

---

## AD-013

### Source Code Single Source of Truth

The official GitHub repository is the Source Code Single Source of Truth (Source Code SSOT).

All official source code SHALL be committed to and maintained in the official GitHub repository.

Local repositories are Working Copies.

---

## AD-014

### Working Copy Model

Engineering activities SHALL be performed using a local Working Copy.

The Working Copy represents the current engineering workspace.

Only the official GitHub repository represents the authoritative Source Code SSOT.

---

## AD-015

### Repository Recovery Model

Repository recovery SHALL follow the official recovery hierarchy.

```text
GitHub Repository
        ↓
Cloud Backup
        ↓
Offline Backup
```

Cloud Backup and Offline Backup exist solely for recovery purposes.

Neither SHALL replace the Source Code SSOT.

---

## AD-016

### AI Engineering Partner

Artificial Intelligence is an Engineering Partner within BPV4.

The AI participates in repository analysis, engineering planning, implementation guidance, documentation maintenance, testing guidance and engineering governance.

The Project Owner defines business objectives and approves engineering decisions.

---

## AD-017

### Documentation Evolution

Repository documentation SHALL evolve through revision of the appropriate owner document.

Creation of new owner documents SHALL be minimized.

Documentation architecture SHALL preserve Information Ownership and Documentation SSOT.

---

# Related Documentation

Engineering Methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Engineering Playbook

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Documentation Standard

```text
docs/08_DOCUMENTATION_STANDARD.md
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

# Architecture Evolution

Future architecture decisions SHALL:

- preserve Product SSOT;
- preserve Source Code SSOT;
- preserve architectural consistency;
- reduce unnecessary coupling;
- improve maintainability;
- improve scalability;
- remain evidence-driven.

---

# Official Status

Authority

Architecture Decisions

Version

6.0

Status

OFFICIAL

State

ACTIVE