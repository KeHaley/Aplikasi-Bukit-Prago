# BPV4 MASTER

# ENGINEERING PLAYBOOK

Version : 5.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official implementation workflow used throughout the BPV4 project.

Every implementation SHALL follow this playbook.

---

# Scope

This document defines:

- implementation workflow;
- engineering execution;
- implementation deliverables;
- completion procedure.

Engineering policy, methodology, architecture and project status are defined in their respective owner documents.

---

# Engineering Workflow

Every implementation SHALL follow this sequence.

```text
Read Documentation

↓

Validate Repository

↓

Understand Current Work

↓

Audit

↓

Implement

↓

Provide FULL FILE

↓

Build

↓

Typecheck

↓

Review

↓

PASS

↓

Update Documentation (if required)

↓

Freeze

↓

Continue
```

---

# Implementation Procedure

## Step 1

Read the official documentation.

---

## Step 2

Validate the repository.

Follow:

```text
docs/12_REPOSITORY_STANDARD.md
```

---

## Step 3

Read the current engineering contract.

```text
CURRENT_WORK.md
```

---

## Step 4

Audit the implementation target.

Understand:

- current behaviour;
- dependencies;
- impact;
- compatibility.

---

## Step 5

Implement only the required changes.

Avoid unnecessary modifications.

---

## Step 6

Provide FULL FILES unless explicitly instructed otherwise.

---

## Step 7

Run Build.

Use the appropriate build command for the active project.

---

## Step 8

Run Typecheck.

Use the appropriate typecheck command for the active project.

---

## Step 9

Review the implementation.

Verify:

- objective achieved;
- compatibility preserved;
- build passed;
- typecheck passed.

---

## Step 10

Wait for PASS.

Do not continue implementation before PASS.

---

## Step 11

Update documentation only when required.

Documentation updates SHALL follow:

```text
docs/08_DOCUMENTATION_STANDARD.md
```

---

## Step 12

Freeze the completed work.

Continue with the next task only after PASS.

---

# Working Rules

Every implementation SHALL:

- support the current engineering contract;
- preserve the Product SSOT;
- preserve production behaviour;
- minimize unnecessary changes;
- remain backward compatible;
- remain evidence-driven.

---

# Default Deliverables

Every implementation SHOULD provide:

- implementation summary;
- FULL FILES;
- build result;
- typecheck result;
- required user actions (if any).

---

# Definition of Done

An implementation is complete when:

- the implementation objective is satisfied;
- production behaviour remains compatible;
- Build PASS;
- Typecheck PASS;
- required documentation has been updated;
- the Project Owner confirms PASS.

---

# After PASS

After PASS:

1. Freeze the completed work.
2. Review CURRENT_WORK.md.
3. Continue the active engineering contract.

Future milestones SHALL NOT begin prematurely.

---

# Related Documentation

Engineering methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Repository standard

```text
docs/12_REPOSITORY_STANDARD.md
```

Documentation standard

```text
docs/08_DOCUMENTATION_STANDARD.md
```

AI Startup Guide

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

Engineering Playbook

Version

5.0

State

ACTIVE