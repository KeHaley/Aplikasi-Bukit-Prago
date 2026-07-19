# GLOBAL VARIABLE REGISTRY

Version : 1.0

Status : OFFICIAL

State : ACTIVE

Owner : BPV4 MASTER

---

# PURPOSE

Dokumen ini merupakan registry resmi seluruh global variable
yang dideklarasikan pada `production/Index.html`.

Dokumen ini menjadi Single Source of Truth (SSOT)
untuk analisis state, dependency,
module extraction, dan refactoring.

---

# SCOPE

Registry ini mencakup:

- global `var`
- global `let`
- global `const`

yang dideklarasikan pada global scope.

Registry ini tidak mencakup:

- local variable
- function parameter
- closure variable
- object property
- class property

---

# SOURCE

Application

Bukit Prago Operational Application

Source File

production/Index.html

Discovery Method

Static Global Variable Discovery

Declaration Pattern

var <name>

let <name>

const <name>

---

# REGISTRY STATISTICS

| Item | Value |
|------|------:|
| Source File | 1 |
| Global Variable | 24 |
| Global const | 0 |
| Global let | 0 |
| Global var | 24 |

---

# GLOBAL VARIABLE REGISTRY

| No | Variable | Keyword | Initial Value |
|---:|----------|---------|---------------|
|1|V3_APP_DEPLOYMENT_URL|var|`<?!= JSON.stringify(appDeploymentUrl || '') ?>`|
|2|STATE|var|`null`|
|3|HISTORY_STATE|var|`null`|
|4|HISTORY_SELECTED_YEAR|var|`0`|
|5|HISTORY_LOADING|var|`false`|
|6|REKAP_STATE|var|`null`|
|7|REKAP_SELECTED_YEAR|var|`0`|
|8|REKAP_LOADING|var|`false`|
|9|ACTIVE_YEAR|var|`0`|
|10|CURRENT_TAB|var|`'dashboard'`|
|11|REKAP_MODE|var|`'ringkas'`|
|12|CURRENT_METRIC_KEY|var|`'produksiKg'`|
|13|CURRENT_DASHBOARD_CHART_KEY|var|`'produksiKg'`|
|14|SMART_TARGET_ANALYSIS|var|`null`|
|15|SMART_TARGET_LEVEL|var|`''`|
|16|TARGET_PRODUKSI_LOADING|var|`false`|
|17|INPUT_DRAFT_SAFE_VERSION|var|`'V3_INPUT_DRAFT_SAFE_REVISI_LOCKED_2'`|
|18|INPUT_DRAFT_SUSPEND_SAVE|var|`false`|
|19|IMPORT_2024_PREVIEW_READY|var|`false`|
|20|IMPORT_2024_REQUIRED_CONFIRM_TEXT|var|`'IMPORT ARSIP 2024'`|
|21|CLOSE_YEAR_REQUIRED_CONFIRM_TEXT|var|`''`|
|22|MONTHS|var|`Array(13)`|
|23|TARGET_ANALYSIS_REQUEST_SEQ_V3|var|`0`|
|24|RESTORE_TOTAL_PREVIEW_V3|var|`null`|

---

# VERIFICATION SUMMARY

## Source Verification

| Item | Status |
|------|--------|
| Source File | PASS |
| Global Variable Discovery | PASS |
| Registry Generation | PASS |
| Duplicate Detection | PASS |

---

## Registry Verification

| Item | Value |
|------|------:|
| Total Global Variable | 24 |
| Documented | 24 |
| Remaining | 0 |
| Duplicate | 0 |

---

# REGISTRY STATUS

Version

1.0

Document Status

OFFICIAL

Registry Status

COMPLETE

Single Source of Truth

YES

Ready For

- Dependency Analysis
- State Analysis
- Module Extraction

---

# RELATED DOCUMENTS

03_FUNCTION_REGISTRY.md

05_DEPENDENCY_MAP.md

06_CALL_GRAPH.md

07_MODULE_EXTRACTION_PLAN.md

---

# END OF DOCUMENT