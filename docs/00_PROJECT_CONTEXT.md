# BPV4 MASTER

# PROJECT CONTEXT

Version : 5.0

Status : OFFICIAL

State : ACTIVE

---

# Purpose

Define the permanent context of the BPV4 project.

This document explains why the project exists, what the primary product is, and the engineering principles that govern every implementation.

---

# Project Mission

Restore, launch, operate, preserve and continuously improve the Bukit Prago Operational Application.

Every engineering activity exists to support that mission.

The Bukit Prago Operational Application is the reason the BPV4 project exists.

---

# Primary Product

The primary product of this project is the Bukit Prago Operational Application.

Official Product Location

```text
apps/bukit-prago
```

This directory contains the official production application.

It is the Product Single Source of Truth (Product SSOT).

The production application SHALL remain preserved.

---

# Engineering Ecosystem

The BPV4 repository contains engineering components that support the Product SSOT.

These components include:

- Desktop Runtime
- Engineering Packages
- Documentation
- Testing
- Engineering Utilities

Engineering components exist only to support the primary product.

They are not the product.

The official repository architecture is defined in:

```text
docs/02_ARCHITECTURE.md
```

---

# Engineering Responsibility

BPV4 exists to:

- restore the application;
- launch the application;
- preserve the production application;
- understand the application;
- verify operational readiness;
- continuously improve the application;
- build engineering capabilities that directly support the application.

Engineering tools are supporting components.

They are never the primary objective.

---

# Product Preservation

The production application SHALL be preserved.

Engineering SHALL NOT modify the production application unless explicitly instructed by the Project Owner.

Whenever possible, new capabilities SHALL be implemented outside the production application while maintaining full compatibility.

Operational behaviour SHALL be preserved.

---

# Engineering Principles

The project follows these principles.

- Product First
- Launch Before Development
- Preserve the Product
- Working Software First
- Evidence First
- Knowledge First
- Continuous Improvement

These principles are permanent and independent of the current milestone.

---

# Project Success

The project is considered successful when:

- the Bukit Prago Operational Application operates successfully;
- operational behaviour remains reliable;
- the production application remains preserved;
- engineering knowledge continues to grow;
- improvements are continuously delivered without disrupting production.

---

# Repository Authority

The latest repository approved by the Project Owner is the official implementation source.

Implementation SHALL always continue from the latest approved repository.

---

# Related Documentation

Current engineering execution:

```text
CURRENT_WORK.md
```

Repository architecture:

```text
docs/02_ARCHITECTURE.md
```

Project progress:

```text
docs/01_PROJECT_STATE.md
```

Project roadmap:

```text
docs/04_ROADMAP.md
```

---

# Official Status

Authority

Project Context

Version

5.0

State

ACTIVE