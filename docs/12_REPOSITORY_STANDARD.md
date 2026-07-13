# BPV4 MASTER

# REPOSITORY STANDARD

Version : 5.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official repository standard of the BPV4 project.

This document specifies the minimum repository structure and validation requirements before any engineering activity may begin.

---

# Repository Principle

The repository is the official implementation source.

Every engineering activity SHALL use the latest repository approved by the Project Owner.

The repository SHALL remain internally consistent.

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
- CURRENT_WORK.md.

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
- use repository evidence;
- avoid assumptions;
- preserve repository consistency.

Repository evidence always overrides assumptions.

---

# Repository Success Criteria

The repository is considered valid when:

- required directories exist;
- required applications exist;
- required documentation exists;
- Product SSOT exists;
- Desktop Runtime exists;
- CURRENT_WORK.md exists;
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

Current engineering contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Repository Standard

Version

5.0

State

ACTIVE