# BPV4 MASTER

# PRODUCT PROFILE

Version : 2.1

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Provide a concise technical profile of the primary product.

This document allows a new AI or engineer to quickly understand the primary product before reading the detailed engineering documentation.

It summarizes the essential product information.

Engineering governance, repository rules, architecture decisions and engineering methodology remain in their respective owner documents.

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

# Product Mission

Provide a stable, reliable and productive operational application supporting the daily operations of the Bukit Prago plantation.

The production application is always the highest engineering priority.

All engineering activities SHALL ultimately support this product.

---

# Product Scope

The Bukit Prago Operational Application provides operational support for plantation management, including:

- Dashboard
- Production Management
- Sales Management
- Fertilizer Management
- Forecast
- Target Management
- Annual Reporting
- Backup
- Administration

---

# Product Deployment Architecture

The product is deployed through three complementary engineering layers.

```text
Bukit Prago Operational Application
            │
            ▼
Windows Desktop Runtime
            │
            ▼
BPV4 Engineering Platform
```

The Bukit Prago Operational Application remains the primary product.

The Desktop Runtime provides a Windows execution environment while preserving production behaviour.

The BPV4 Engineering Platform supports the engineering lifecycle without becoming part of the production application.

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

# Product Location

```text
apps/
    bukit-prago/
    bpv4-desktop/
```

---

# Product Principles

The product SHALL:

- remain the Product Single Source of Truth (Product SSOT);
- preserve operational behaviour;
- remain backward compatible whenever practical;
- remain available for daily operational activities.

The Desktop Runtime SHALL preserve production behaviour.

The BPV4 Engineering Platform SHALL support engineering activities without modifying the production application.

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

Architecture Decisions

```text
docs/03_ARCHITECTURE_DECISIONS.md
```

Information Ownership

```text
docs/13_INFORMATION_OWNERSHIP.md
```

Current Engineering Contract

```text
CURRENT_WORK.md
```

---

# Official Status

Authority

Product Profile

Version

2.1

Status

OFFICIAL

State

ACTIVE