# BPV4 MASTER

# DOCUMENTATION STANDARD

Version : 5.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official documentation standard of the BPV4 project.

Every project document SHALL follow this standard.

Documentation is the permanent engineering knowledge of the project.

---

# Documentation Philosophy

Documentation exists to preserve engineering knowledge.

Project knowledge SHALL live in documentation.

Project knowledge SHALL NOT depend on:

- previous conversations;
- AI memory;
- engineer memory.

---

# Primary Objective

Documentation SHALL enable a new AI or engineer to understand the project and continue engineering work without additional explanation.

---

# Documentation Principles

Every document SHALL be:

- accurate;
- complete;
- concise;
- consistent;
- easy to understand;
- professional;
- maintainable.

---

# Documentation Architecture Principles

Documentation SHALL follow the following principles.

- One Information → One Owner Document.
- Single Source of Truth (SSOT).
- Evidence First.
- Preserve Existing Content.
- Minimum Necessary Revision.
- Full File Delivery.
- Consistency Across Documents.

Documentation SHALL evolve incrementally.

Documentation SHALL NOT be rewritten from scratch unless explicitly instructed by the Project Owner.

---

# Documentation Ownership

Every important information SHALL have exactly one owner document.

Other documents MAY reference the information.

They SHALL NOT duplicate the information.

Information ownership is defined in:

```text
docs/13_INFORMATION_OWNERSHIP.md
```

---

# Documentation Hierarchy

The official documentation hierarchy is:

```text
README.md

↓

00_PROJECT_CONTEXT.md

↓

10_PROJECT_INTENT.md

↓

02_ARCHITECTURE.md

↓

03_ARCHITECTURE_DECISIONS.md

↓

09_ENGINEERING_METHODOLOGY.md

↓

06_AI_ASSISTANT_POLICY.md

↓

08_DOCUMENTATION_STANDARD.md

↓

11_ENGINEERING_PLAYBOOK.md

↓

12_REPOSITORY_STANDARD.md

↓

CURRENT_WORK.md
```

Lower-level documents SHALL NOT contradict higher-level documents.

If conflicts exist, the higher-level document SHALL prevail.

---

# Documentation Structure

Each document SHALL answer one primary question.

| Document | Primary Question |
|----------|------------------|
| README | What is this project? |
| PROJECT_CONTEXT | Why does this project exist? |
| PROJECT_INTENT | What is the long-term direction? |
| ARCHITECTURE | How is the system organized? |
| CURRENT_WORK | What should be done now? |
| PROJECT_STATE | What has been completed? |
| CHANGELOG | What has changed? |
| ROADMAP | What comes next? |

---

# Documentation Workflow

Every documentation revision SHALL follow:

Audit

↓

Compare

↓

Preserve Existing Content

↓

Minimum Revision

↓

Provide FULL FILE

↓

Review

↓

PASS

↓

Freeze

Documentation SHALL NOT be updated using partial snippets unless explicitly requested by the Project Owner.

---

# Documentation Update Rules

Documentation SHALL be updated only when:

- engineering knowledge changes;
- architecture changes;
- repository structure changes;
- engineering governance changes;
- official engineering contracts change;
- documentation inconsistency is discovered.

Routine implementation SHALL NOT trigger unnecessary documentation revisions.

Current milestone information SHALL be maintained only by its owner document.

---

# Documentation Acceptance Criteria

Documentation is considered complete when:

- every important information has one owner;
- documentation is internally consistent;
- duplicate information is minimized;
- project knowledge is preserved;
- a new AI can continue the project using documentation only.

---

# Documentation Freeze

Foundation and Governance documentation SHOULD remain stable.

Operational documentation MAY change according to the active engineering contract.

Documentation SHALL only be revised when its own subject changes.

---

# Related Documentation

Information ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Documentation migration

```text
docs/14_DOCUMENTATION_MIGRATION_PLAN.md
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

Documentation Standard

Version

5.0

State

ACTIVE