# BPV4 MASTER

# ENGINEERING PLAYBOOK

Version : 6.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official engineering execution workflow used throughout the BPV4 project.

Every engineering activity SHALL follow this playbook.

---

# Scope

This document defines:

- engineering workflow;
- engineering execution;
- implementation deliverables;
- engineering completion procedure.

Engineering policy, methodology, repository standard, startup procedure, and project status are defined in their respective owner documents.

---

# Engineering Workflow

Every engineering activity SHALL follow this sequence.

```text
Repository Validation

↓

Documentation Startup

↓

Understand Current Work

↓

Engineering Audit

↓

Engineering Planning

↓

Implementation

↓

Provide FULL FILE

↓

Build

↓

Typecheck

↓

Engineering Review

↓

PASS

↓

Documentation Update (if required)

↓

Freeze

↓

Continue
```

---

# Engineering Procedure

## Step 1

Validate the repository.

Follow:

```text
docs/12_REPOSITORY_STANDARD.md
```

Implementation SHALL NOT begin before repository validation passes.

---

## Step 2

Complete the official startup procedure.

Follow:

```text
docs/07_AI_STARTUP_GUIDE.md
```

---

## Step 3

Read the current engineering contract.

```text
CURRENT_WORK.md
```

Identify:

- Current Phase
- Current Milestone
- Current Objective
- Current Priority
- Current Deliverables

---

## Step 4

Perform an engineering audit.

Understand:

- current behaviour;
- dependencies;
- implementation impact;
- compatibility;
- repository evidence.

Engineering decisions SHALL remain evidence-based.

---

## Step 5

Prepare the engineering plan.

Determine:

- implementation scope;
- affected components;
- expected deliverables.

Avoid unnecessary implementation.

---

## Step 6

Implement only the required engineering changes.

Preserve:

- Product SSOT;
- repository consistency;
- documentation consistency;
- backward compatibility.

---

## Step 7

Provide FULL FILES unless explicitly instructed otherwise.

---

## Step 8

Run Build.

Use the appropriate build procedure for the active project.

---

## Step 9

Run Typecheck.

Use the appropriate validation procedure for the active project.

---

## Step 10

Perform an engineering review.

Verify:

- objective achieved;
- compatibility preserved;
- Build PASS;
- Typecheck PASS;
- repository consistency preserved.

---

## Step 11

Wait for PASS.

Implementation SHALL NOT continue before PASS.

---

## Step 12

Update documentation only when required.

Documentation updates SHALL follow:

```text
docs/08_DOCUMENTATION_STANDARD.md
```

Documentation SHALL always follow Information Ownership.

---

## Step 13

Freeze the completed work.

Continue only after PASS.

---

# Working Rules

Every engineering activity SHALL:

- support the current engineering contract;
- preserve the Product SSOT;
- preserve Source Code SSOT;
- preserve production behaviour;
- minimize unnecessary changes;
- remain backward compatible;
- remain evidence-driven;
- preserve repository consistency;
- preserve documentation consistency.

---

# Default Deliverables

Every engineering activity SHOULD provide:

- engineering summary;
- FULL FILES;
- build result;
- typecheck result;
- required user actions (if any).

---

# Definition of Done

An engineering activity is complete when:

- the engineering objective is satisfied;
- production behaviour remains compatible;
- Build PASS;
- Typecheck PASS;
- repository consistency is preserved;
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

AI Assistant Policy

```text
docs/06_AI_ASSISTANT_POLICY.md
```

AI Startup Guide

```text
docs/07_AI_STARTUP_GUIDE.md
```

Engineering Methodology

```text
docs/09_ENGINEERING_METHODOLOGY.md
```

Repository Standard

```text
docs/12_REPOSITORY_STANDARD.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Documentation Standard

```text
docs/08_DOCUMENTATION_STANDARD.md
```

Current Engineering Contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Engineering Playbook

Version

6.0

Status

OFFICIAL

State

ACTIVE