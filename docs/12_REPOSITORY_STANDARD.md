# BPV4 MASTER

# REPOSITORY STANDARD

Version : 5.1

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official repository standard of the BPV4 project.

This document specifies the official repository model, repository lifecycle, Source Code Single Source of Truth (Source Code SSOT), and the minimum repository validation requirements before any engineering activity may begin.

---

# Repository Principle

The repository is the official implementation source.

The official GitHub repository SHALL be the Source Code Single Source of Truth (Source Code SSOT).

Every engineering activity SHALL use the latest repository approved by the Project Owner.

The repository SHALL remain internally consistent.

---

# Repository Authority

The official GitHub repository SHALL be the authoritative source of all BPV4 source code.

The local repository is the official Working Copy used for engineering activities.

Cloud Backup and Offline Backup support repository recovery but SHALL NOT replace the Source Code SSOT.

---

# Repository Lifecycle

Repository lifecycle SHALL follow the sequence below.

```text
Working Copy

↓

Build

↓

Test

↓

Commit

↓

Push

↓

GitHub Repository (Source Code SSOT)

↓

Cloud Backup

↓

Offline Backup
```

Only the GitHub repository represents the official source code baseline.

---

# Repository Structure

The repository SHALL contain the following root directories.

```text
apps/
packages/
docs/
tests/
tools/
```

---

# Required Applications

The repository SHALL contain:

```text
apps/bukit-prago
```

Official Product Single Source of Truth (Product SSOT).

---

The repository SHALL contain:

```text
apps/bpv4-desktop
```

Official Desktop Runtime.

---

# Required Documentation

The repository SHALL contain:

```text
README.md
CURRENT_WORK.md
```

and the official documentation directory:

```text
docs/
```

containing at minimum:

```text
00_PROJECT_CONTEXT.md
01_PROJECT_STATE.md
02_ARCHITECTURE.md
03_ARCHITECTURE_DECISIONS.md
04_ROADMAP.md
05_CHANGELOG.md
06_AI_ASSISTANT_POLICY.md
07_AI_STARTUP_GUIDE.md
08_DOCUMENTATION_STANDARD.md
09_ENGINEERING_METHODOLOGY.md
10_PROJECT_INTENT.md
11_ENGINEERING_PLAYBOOK.md
12_REPOSITORY_STANDARD.md
13_INFORMATION_OWNERSHIP.md
14_DOCUMENTATION_MIGRATION_PLAN.md
```

---

# Repository Validation

Before implementation begins, verify:

- repository structure;
- required applications;
- required documentation;
- Product SSOT;
- Desktop Runtime;
- CURRENT_WORK.md;
- official Git repository;
- Working Copy consistency.

If any required item is missing:

STOP.

Report the inconsistency.

Do not continue implementation.

---

# Validation Checklist

Repository validation SHALL confirm:

- Repository available
- Repository structure valid
- Documentation available
- CURRENT_WORK.md available
- Product SSOT exists
- Desktop Runtime exists
- Product accessible
- Desktop Runtime accessible
- GitHub repository available
- Working Copy available
- Source Code SSOT confirmed

Every item SHALL pass before implementation begins.

---

# Documentation Consistency

The repository SHALL remain internally consistent.

Documentation, repository structure and engineering contracts SHALL describe the same repository.

Any inconsistency SHALL be reported before implementation.

---

# Repository Rules

Engineering SHALL:

- verify repository contents;
- verify Source Code SSOT;
- use repository evidence;
- avoid assumptions;
- preserve repository consistency;
- preserve Working Copy consistency.

Repository evidence always overrides assumptions.

---

# Backup Model

Repository backup SHALL follow the official recovery model.

```text
GitHub Repository

↓

Cloud Backup

↓

Offline Backup
```

Cloud Backup and Offline Backup exist for recovery purposes and SHALL NOT become the official Source Code SSOT.

---

# Repository Success Criteria

The repository is considered valid when:

- required directories exist;
- required applications exist;
- required documentation exists;
- Product SSOT exists;
- Desktop Runtime exists;
- CURRENT_WORK.md exists;
- GitHub repository is available;
- Source Code SSOT is confirmed;
- repository validation passes.

---

# Related Documentation

Repository architecture

```text
docs/02_ARCHITECTURE.md
```

AI startup

```text
docs/07_AI_STARTUP_GUIDE.md
```

Information ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Current engineering contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Repository Standard

Version

5.1

Status

OFFICIAL

State

ACTIVE