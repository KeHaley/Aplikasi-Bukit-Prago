# BPV4 MASTER

# RELEASE BASELINE

Version : 1.1

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Record every official project baseline.

This document provides a single reference for identifying the current engineering baseline, completed milestones, frozen documentation and official repository baselines.

It answers one question:

What is the current official baseline of the BPV4 project?

---

# Baseline Philosophy

Every major engineering achievement SHALL become a baseline.

A baseline SHALL:

- be verified;
- pass Build;
- pass Typecheck (when applicable);
- preserve product behaviour;
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

## Desktop Runtime

Name

BPV4 Desktop Runtime

Status

ACTIVE

Location

```text
apps/bpv4-desktop
```

Technology

- .NET 8
- Windows Forms
- Microsoft Edge WebView2

---

## Documentation

Name

Documentation V5

Version

5.0

Status

COMPLETE

State

FROZEN

Git Tag

DOC-V5-FROZEN

Description

Project documentation has been migrated to Documentation V5.

Information Ownership has been implemented.

Documentation duplication has been minimized.

Documentation is the official Engineering SSOT.

---

## Repository

Name

Repository Engineering Baseline V1

Version

1.0

Status

COMPLETE

State

FROZEN

Git Tag

REPO-V1-FROZEN

Description

Repository engineering foundation validated.

Git repository initialized.

Repository audit completed.

Package audit completed.

Repository frozen as Engineering Baseline V1.

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
| Repository Engineering V1 | 1.0 | FROZEN |
| Desktop Runtime M-01 | 1.0 | FROZEN |

---

# Active Engineering Baseline

Current Engineering Contract

```text
CURRENT_WORK.md
```

Current Project Status

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
- documentation is officially frozen;
- a repository engineering baseline is officially established;
- architecture changes are officially adopted;
- the Project Owner approves the baseline.

Minor implementation changes SHALL NOT create a new baseline.

---

# Update Rules

This document SHALL be updated only when:

- a new milestone is frozen;
- a new documentation baseline is established;
- a new repository baseline is established;
- a major architecture baseline is approved.

Routine engineering work SHALL NOT update this document.

---

# Related Documents

Current Work

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

1.1

Status

OFFICIAL

State

ACTIVE