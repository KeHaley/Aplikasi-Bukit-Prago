# BPV4 MASTER

# PRODUCT PROFILE

Version : 1.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Provide a concise technical profile of the primary product.

This document allows a new AI or engineer to quickly understand what is being developed before reading detailed documentation.

It summarizes the essential facts of the product.

Detailed engineering rules remain in their respective owner documents.

---

# Product

Name

Bukit Prago Operational Application

Status

ACTIVE

Product SSOT

```text
apps/bukit-prago
```

The Product SSOT is the official production application.

---

# Desktop Runtime

Location

```text
apps/bpv4-desktop
```

Status

ACTIVE

Purpose

Launch and host the Bukit Prago Operational Application on Windows while preserving production behaviour.

---

# Product Mission

Provide a stable, reliable and productive operational application for the Bukit Prago plantation.

The production application is always the highest engineering priority.

---

# Technology Profile

## Production Application

Platform

Google Apps Script

Frontend

- HTML
- CSS
- JavaScript

Backend

- Google Apps Script

Data Storage

- Google Spreadsheet

---

## Desktop Runtime

Platform

.NET 8

Framework

Windows Forms

Browser Engine

Microsoft Edge WebView2

---

# Repository Structure

```text
apps/
    bukit-prago/
    bpv4-desktop/

packages/
docs/
tests/
tools/
```

---

# Current Engineering Status

Current engineering status is defined in:

```text
CURRENT_WORK.md
```

Current project progress is defined in:

```text
docs/01_PROJECT_STATE.md
```

Future engineering direction is defined in:

```text
docs/04_ROADMAP.md
```

---

# Product Principles

The product SHALL:

- remain the Product SSOT;
- preserve operational behaviour;
- remain backward compatible;
- remain available for daily operational activities.

Desktop Runtime SHALL support the product without modifying production behaviour.

---

# Engineering Priority

Engineering SHALL always follow this order.

1. Product
2. Current Engineering Contract
3. Operational Stability
4. Product Preservation
5. Continuous Improvement

---

# Related Documents

Project Context

```text
docs/00_PROJECT_CONTEXT.md
```

Project Intent

```text
docs/10_PROJECT_INTENT.md
```

Architecture

```text
docs/02_ARCHITECTURE.md
```

Current Engineering Contract

```text
CURRENT_WORK.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

---

# Official Status

Authority

Product Profile

Version

1.0

State

ACTIVE