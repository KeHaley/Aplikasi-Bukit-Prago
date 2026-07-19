# BPV4 MASTER

# RELEASE BASELINE

Version : 2.1

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Record every official project baseline.

This document provides a single reference for identifying the current engineering baseline, completed milestones, frozen documentation and official repository baselines.

It answers one question.

What is the current official baseline of the BPV4 project?

---

# Baseline Philosophy

Every major engineering achievement SHALL become a baseline.

A baseline SHALL:

- be verified;
- pass Build;
- pass Typecheck (when applicable);
- preserve product behaviour;
- preserve repository consistency;
- preserve documentation consistency;
- be approved by the Project Owner;
- be frozen before further engineering continues.

---

# Current Official Baselines

## Product

Name

Bukit Prago Operational Application

Status

ACTIVE

Location

```text
apps/bukit-prago
```

State

LOCKED

---

## Source Code

Name

Official GitHub Repository

Role

Source Code Single Source of Truth (Source Code SSOT)

Status

ACTIVE

State

OFFICIAL

---

## Desktop Runtime

Name

BPV4 Desktop Runtime

Status

ACTIVE

Location

```text
apps/bpv4-desktop
```

State

LOCKED

---

## Documentation

Name

Documentation V6

Version

6.0

Status

COMPLETE

State

FROZEN

Git Tag

DOC-V6-FROZEN

---

## Repository

Name

Repository Engineering Baseline V2

Version

2.0

Status

COMPLETE

State

FROZEN

Git Tag

REPO-V2-FROZEN

---

## Engineering Governance

Name

Engineering Governance Baseline

Version

6.0

Status

COMPLETE

State

FROZEN

---

## Milestones

| Milestone | Status | State |
|-----------|--------|--------|
| M-01 Launch Bukit Prago Desktop Application | COMPLETE | FROZEN |
| M-02 Desktop Stabilization | ACTIVE | IN PROGRESS |

---

# Baseline History

| Baseline | Version | Status |
|----------|---------|--------|
| Documentation V5 | 5.0 | FROZEN |
| Documentation V6 | 6.0 | FROZEN |
| Repository Engineering V1 | 1.0 | FROZEN |
| Repository Engineering V2 | 2.0 | FROZEN |
| Desktop Runtime M-01 | 1.0 | FROZEN |
| Engineering Governance V6 | 6.0 | FROZEN |

---

# Current Engineering References

Current Engineering Contract

```text
CURRENT_WORK.md
```

Current Project State

```text
docs/01_PROJECT_STATE.md
```

Current Roadmap

```text
docs/04_ROADMAP.md
```

---

# Baseline Rules

A new baseline SHALL be added only when:

- a milestone is completed;
- a documentation baseline is officially frozen;
- a repository engineering baseline is officially established;
- an engineering governance baseline is officially established;
- a major architecture baseline is approved;
- the Project Owner approves the baseline.

Minor implementation changes SHALL NOT create a new baseline.

---

# Update Rules

This document SHALL be updated only when:

- a new milestone is frozen;
- a new documentation baseline is established;
- a new repository baseline is established;
- a new engineering governance baseline is established;
- a major architecture baseline is approved.

Routine engineering work SHALL NOT update this document.

---

# Related Documents

Current Engineering Contract

```text
CURRENT_WORK.md
```

Project State

```text
docs/01_PROJECT_STATE.md
```

Roadmap

```text
docs/04_ROADMAP.md
```

Changelog

```text
docs/05_CHANGELOG.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

---

# Official Status

Authority

Release Baseline

Version

2.1

Status

OFFICIAL

State

ACTIVE