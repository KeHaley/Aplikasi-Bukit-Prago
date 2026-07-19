# BPV4 MASTER

# ENGINEERING PLAYBOOK

Version : 7.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the official engineering execution workflow of the BPV4 Modularization Engine.

This document defines how engineering work SHALL be executed.

Every AI and engineer SHALL follow this playbook.

---

# Scope

This document defines:

- engineering execution workflow;
- implementation workflow;
- validation workflow;
- documentation workflow;
- engineering completion procedure.

Engineering policies, project status, and engineering contracts are defined in their respective owner documents.

---

# Engineering Workflow

Every engineering activity SHALL follow the following sequence.

```text
Repository Validation
        ↓
AI Startup
        ↓
Read CURRENT_WORK
        ↓
Engineering Analysis
        ↓
Engineering Planning
        ↓
Implementation
        ↓
Validation
        ↓
Engineering Review
        ↓
Project Owner PASS
        ↓
Documentation Update (if required)
        ↓
Continue CURRENT_WORK
```

---

# Engineering Execution Procedure

## Step 1

Validate the Repository.

Follow:

```text
docs/12_REPOSITORY_STANDARD.md
```

Implementation SHALL NOT begin until repository validation has passed.

---

## Step 2

Complete AI Startup.

Follow:

```text
docs/07_AI_STARTUP_GUIDE.md
```

Implementation SHALL NOT begin before startup has completed successfully.

---

## Step 3

Read the Active Engineering Contract.

Read:

```text
CURRENT_WORK.md
```

Identify:

- Current Mission
- Current Phase
- Current Objective
- Current Deliverables
- Current Constraints
- Definition of Done

The engineering contract SHALL govern all implementation.

---

## Step 4

Perform Engineering Analysis.

Before modifying any source code:

- understand the production behaviour;
- identify dependencies;
- identify engineering risks;
- determine implementation scope;
- collect repository evidence.

Engineering decisions SHALL remain evidence-driven.

---

## Step 5

Prepare the Engineering Plan.

Determine:

- implementation scope;
- affected components;
- expected deliverables;
- validation strategy.

Implementation SHALL remain limited to the approved scope.

---

## Step 6

Implement.

Implementation SHALL:

- preserve production behaviour;
- preserve repository consistency;
- preserve documentation consistency;
- preserve Source Code SSOT;
- remain within the active engineering contract.

---

## Step 7

Validate.

Perform every validation required by the current engineering activity.

Validation MAY include:

- engineering validation;
- dependency validation;
- regression validation;
- build validation;
- typecheck validation;
- behaviour validation.

Perform only the validations applicable to the current phase.

---

## Step 8

Engineering Review.

Verify:

- objective achieved;
- constraints respected;
- validation passed;
- repository consistency preserved.

---

## Step 9

Wait for Project Owner PASS.

Implementation SHALL NOT continue until PASS has been received.

---

## Step 10

Update Documentation.

Update documentation only when required.

Documentation SHALL follow:

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Only the owner document SHALL be updated.

---

## Step 11

Continue the Active Engineering Contract.

Review:

```text
CURRENT_WORK.md
```

Continue the current objective unless the Project Owner explicitly changes the engineering contract.

---

# Working Rules

Every engineering activity SHALL:

- follow CURRENT_WORK;
- preserve production behaviour;
- remain evidence-driven;
- minimize implementation scope;
- avoid assumptions;
- preserve repository consistency;
- preserve documentation consistency.

---

# Response Rules

Every engineering response SHALL prioritize execution.

Unless explicitly requested by the Project Owner, the AI SHALL NOT:

- explain engineering theory;
- provide long technical discussions;
- compare multiple solutions;
- produce educational content;
- repeat documented information;
- generate unnecessary implementation details.

Default responses SHALL be:

- concise;
- implementation-focused;
- evidence-driven;
- action-oriented.

---

# Default Deliverables

Engineering activities SHOULD provide only the information required to continue implementation.

Typical deliverables include:

- implementation summary;
- modified files;
- validation results;
- required Project Owner actions.

Avoid unnecessary narrative.

---

# Definition of Done

An engineering activity is complete when:

- the objective has been achieved;
- required validations have passed;
- production behaviour has been preserved;
- repository consistency has been maintained;
- documentation has been updated when required;
- the Project Owner confirms PASS.

---

# Related Documentation

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

Current Work

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Engineering Playbook

Version

7.0

Status

OFFICIAL

State

ACTIVE