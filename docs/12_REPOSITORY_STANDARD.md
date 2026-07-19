# BPV4 MASTER

# REPOSITORY STANDARD

Version : 6.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official repository standard of the BPV4 Modularization Engine.

This document defines the permanent rules governing repository organization, repository integrity, Source Code SSOT, repository validation, and engineering consistency.

Every AI and engineer SHALL preserve these standards.

---

# Repository Principles

The repository is the official engineering workspace.

The official GitHub repository is the Source Code Single Source of Truth (Source Code SSOT).

Engineering SHALL always begin from the latest approved repository.

Repository consistency SHALL always be preserved.

---

# Repository Authority

Repository authority SHALL follow the hierarchy below.

```text
GitHub Repository
        ↓
Local Working Copy
        ↓
Cloud Backup
        ↓
Offline Backup
```

Only the GitHub Repository represents the official Source Code SSOT.

Backups exist solely for recovery purposes.

---

# Repository Structure

The repository SHALL remain logically organized.

Primary directories include:

```text
apps/
```

Production applications.

```text
engine/
```

BPV4 Modularization Engine.

```text
docs/
```

Official active documentation.

```text
archive/
```

Historical documentation.

Read Only.

```text
tests/
```

Validation and regression tests.

Additional directories MAY exist when they directly support engineering.

---

# Repository Classification

Repository contents SHALL be classified as follows.

## Production

Contains operational application source code.

Example:

```text
apps/Bukit Prago
```

Production behaviour SHALL be preserved.

---

## Engineering

Contains engineering tools and supporting code.

Example:

```text
engine/
```

Engineering components MAY evolve independently.

---

## Documentation

Contains active engineering documentation.

Example:

```text
docs/
```

Documentation SHALL follow Information Ownership.

---

## Archive

Contains historical engineering information.

Example:

```text
archive/
```

Archive SHALL NOT become an active engineering reference unless explicitly requested.

---

## Tests

Contains validation assets.

Example:

```text
tests/
```

Validation assets SHALL remain consistent with the active repository.

---

# Repository Validation

Before implementation begins verify:

- repository structure;
- Product SSOT;
- active documentation;
- CURRENT_WORK;
- Source Code SSOT;
- repository consistency.

If validation fails:

STOP.

Report the inconsistency.

Implementation SHALL NOT begin.

---

# Validation Checklist

Repository validation SHALL confirm:

- repository available;
- repository structure valid;
- Product SSOT exists;
- CURRENT_WORK exists;
- active documentation available;
- repository consistency confirmed;
- Source Code SSOT confirmed.

Every validation SHALL pass before implementation.

---

# Repository Rules

Every engineering activity SHALL:

- preserve repository consistency;
- preserve Source Code SSOT;
- preserve Product SSOT;
- avoid unnecessary repository changes;
- avoid duplicate documentation;
- avoid duplicate engineering artifacts;
- follow Information Ownership;
- use repository evidence.

Repository evidence SHALL always override assumptions.

---

# Repository Modification Rules

Repository changes SHALL remain minimal.

Before creating a new file, verify that:

- an existing owner document cannot be updated;
- Information Ownership is preserved;
- duplicate information is not introduced.

Before deleting a file, verify that:

- the file is obsolete;
- no active references remain;
- Information Ownership remains valid.

---

# Documentation Rules

Only documents inside:

```text
docs/
```

represent the active engineering documentation.

Documents inside:

```text
archive/
```

are historical references.

They SHALL NOT become active documentation unless explicitly restored.

---

# Repository Success Criteria

The repository is considered healthy when:

- repository structure is consistent;
- Product SSOT is preserved;
- Source Code SSOT is preserved;
- Information Ownership is maintained;
- documentation remains consistent;
- repository validation passes.

---

# Related Documentation

Architecture

```text
docs/02_ARCHITECTURE.md
```

AI Startup Guide

```text
docs/07_AI_STARTUP_GUIDE.md
```

Engineering Playbook

```text
docs/11_ENGINEERING_PLAYBOOK.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Current Work

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Repository Standard

Version

6.0

Status

OFFICIAL

State

ACTIVE