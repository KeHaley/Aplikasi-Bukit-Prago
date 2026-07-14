# BPV4 MASTER

# INFORMATION OWNERSHIP

Version : 2.2

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official information ownership model of the BPV4 project.

Every important information SHALL have exactly one owner document.

Other documents MAY reference the information but SHALL NOT duplicate or redefine it.

This document establishes the Information Single Source of Truth (Information SSOT).

---

# Philosophy

One Information

↓

One Owner

↓

Many References

↓

No Duplication

---

# Ownership Principles

Information ownership SHALL follow these principles.

- Every important information has exactly one owner.
- Owner documents define the authoritative information.
- Other documents MAY reference the owner.
- Duplicate information SHOULD be eliminated whenever practical.
- Information ownership SHALL remain stable.
- Documentation SHALL evolve by revising the owner document rather than creating duplicate owner documents whenever practical.

---

# Information Ownership Matrix

| Information | Owner Document |
|-------------|----------------|
| Project Overview | README.md |
| Project Context | docs/00_PROJECT_CONTEXT.md |
| Project Intent | docs/10_PROJECT_INTENT.md |
| Product SSOT | docs/00_PROJECT_CONTEXT.md |
| Repository Architecture | docs/02_ARCHITECTURE.md |
| Desktop Runtime | docs/02_ARCHITECTURE.md |
| Architecture Decisions | docs/03_ARCHITECTURE_DECISIONS.md |
| Engineering Roadmap | docs/04_ROADMAP.md |
| Project History | docs/05_CHANGELOG.md |
| Repository Baselines | docs/99_RELEASE_BASELINE.md |
| AI Policy | docs/06_AI_ASSISTANT_POLICY.md |
| AI Native Engineering Policy | docs/06_AI_ASSISTANT_POLICY.md |
| AI Safe Mode | docs/06_AI_ASSISTANT_POLICY.md |
| Git Command Guidance | docs/06_AI_ASSISTANT_POLICY.md |
| AI Responsibility Model | docs/06_AI_ASSISTANT_POLICY.md |
| Startup Procedure | docs/07_AI_STARTUP_GUIDE.md |
| AI Startup Protocol | docs/07_AI_STARTUP_GUIDE.md |
| AI Startup Package | docs/07_AI_STARTUP_GUIDE.md |
| AI Context Protocol | docs/07_AI_STARTUP_GUIDE.md |
| AI Session Continuation | docs/07_AI_STARTUP_GUIDE.md |
| Documentation Standard | docs/08_DOCUMENTATION_STANDARD.md |
| Engineering Methodology | docs/09_ENGINEERING_METHODOLOGY.md |
| Engineering Workflow | docs/11_ENGINEERING_PLAYBOOK.md |
| Repository Standard | docs/12_REPOSITORY_STANDARD.md |
| Source Code SSOT | docs/12_REPOSITORY_STANDARD.md |
| Official Git Repository | docs/12_REPOSITORY_STANDARD.md |
| Working Copy Standard | docs/12_REPOSITORY_STANDARD.md |
| Repository Lifecycle | docs/12_REPOSITORY_STANDARD.md |
| Cloud Backup Policy | docs/12_REPOSITORY_STANDARD.md |
| Offline Backup Policy | docs/12_REPOSITORY_STANDARD.md |
| Current Engineering Contract | CURRENT_WORK.md |
| Current Phase | CURRENT_WORK.md |
| Current Milestone | CURRENT_WORK.md |
| Current Objective | CURRENT_WORK.md |
| Current Priority | CURRENT_WORK.md |
| Current Deliverables | CURRENT_WORK.md |
| Definition of Done | CURRENT_WORK.md |
| Next Milestone | CURRENT_WORK.md |
| Engineering Progress | docs/01_PROJECT_STATE.md |
| Completed Milestones | docs/01_PROJECT_STATE.md |
| Documentation Migration | docs/14_DOCUMENTATION_MIGRATION_PLAN.md |

---

# Ownership Rules

The owner document SHALL:

- define the official information;
- maintain the information;
- approve future revisions.

Other documents:

- MAY reference the owner.
- SHALL NOT redefine the information.
- SHALL NOT contradict the owner.

---

# Reference Rule

When information already exists in its owner document:

- reference it;
- do not copy it.

References SHALL be preferred over duplication.

---

# Conflict Resolution

If conflicting information exists:

1. Use the owner document.
2. Report the inconsistency.
3. Update the non-owner document.
4. Preserve repository consistency.

Owner documents always have priority.

---

# Ownership Change

Information ownership SHALL change only when:

- repository architecture changes;
- documentation architecture changes;
- the Project Owner approves the change.

Routine implementation SHALL NOT change information ownership.

---

# Documentation Evolution Rule

Repository documentation SHALL evolve by extending the appropriate owner document.

Creating a new document SHALL be the last option.

A new owner document MAY be introduced only when:

- a new information domain is introduced;
- no existing owner document can legitimately own the information;
- no ownership overlap is introduced;
- the Project Owner approves the new owner document.

---

# Success Criteria

Information ownership is complete when:

- every important information has exactly one owner;
- duplicate information is minimized;
- documentation remains internally consistent;
- documentation is easy to maintain;
- a new AI can continue the project using documentation only.

---

# Related Documents

Documentation Standard

```text
docs/08_DOCUMENTATION_STANDARD.md
```

Documentation Migration Plan

```text
docs/14_DOCUMENTATION_MIGRATION_PLAN.md
```

Repository Standard

```text
docs/12_REPOSITORY_STANDARD.md
```

AI Assistant Policy

```text
docs/06_AI_ASSISTANT_POLICY.md
```

AI Startup Guide

```text
docs/07_AI_STARTUP_GUIDE.md
```

Release Baseline

```text
docs/99_RELEASE_BASELINE.md
```

Current Engineering Contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Information Ownership

Version

2.2

Status

OFFICIAL

State

ACTIVE