# FUNCTION REGISTRY

Version : 2.1

Status : OFFICIAL

State : ACTIVE

Owner : BPV4 MASTER

---

# PURPOSE

Dokumen ini merupakan registry resmi seluruh deklarasi `function`
yang ditemukan pada source code antarmuka aplikasi Bukit Prago.

Dokumen ini menjadi Single Source of Truth (SSOT)
untuk inventarisasi seluruh function sebelum dilakukan proses:

- Global Variable Analysis
- Dependency Analysis
- Call Graph Analysis
- Module Extraction
- Modularization
- Reverse Engineering

Dokumen ini hanya mendokumentasikan deklarasi function.

Dokumen ini tidak melakukan analisis implementasi,
dependency, ataupun perilaku runtime.

---

# SCOPE

Registry ini mencakup:

- seluruh deklarasi `function`
- nama function
- parameter function
- urutan deklarasi pada source

Registry ini tidak mencakup:

- anonymous function
- arrow function
- callback function
- object method
- class method
- event handler callback
- implementation detail
- dependency
- global variable

Seluruh item tersebut akan didokumentasikan
pada dokumen engineering berikutnya.

---

# SOURCE

Application

Bukit Prago Operational Application

Source File

production/Index.html

Discovery Method

Static Function Declaration Discovery

Declaration Pattern

function <name>(...)

---

# DISCOVERY RULES

Seluruh registry dihasilkan berdasarkan deklarasi
function yang terdapat pada source code.

Setiap deklarasi dicatat tepat satu kali.

Urutan registry mengikuti urutan kemunculan
pada source.

Function yang memiliki nama sama
tidak diduplikasi.

Anonymous Function tidak dimasukkan.

Arrow Function tidak dimasukkan.

Object Method tidak dimasukkan.

---

# REGISTRY STATISTICS

| Item | Value |
|------|------:|
| Source File | 1 |
| Total Function | 157 |
| Duplicate Function | 0 |
| Anonymous Function | Excluded |
| Arrow Function | Excluded |

---

# FUNCTION REGISTRY

| No | Function | Parameters |
|---:|----------|------------|
| 1 | n | v |
| 2 | escapeHtmlV3_ | v |
| 3 | rp | v |
| 4 | kg | v |
| 5 | rpCell | v |
| 6 | fmt | v, format |
| 7 | setStatus | text, ok |
| 8 | parseNumberID | v |
| 9 | parseDecimalID | v |
|10| formatNumberID | v |
|11| formatRupiahID | v |
|12| formatKgID | v |
|13| formatMoneyInput | el |
|14| formatPlainNumberInput | el |
|15| formatDecimalInputID | el |
|16| moneyInput | value |
|17| kgInput | value |
|18| priceInput | value |
|19| setupMonthSelects | - |
|20| showTab | id |
|21| loadAll | - |
|22| normalizePayload | res |
|23| syncYearInputs | - |
|24| renderAll | - |
|25| cardHtml | c |
|26| renderDashboard | - |
|27| getHistorySelectedYearV3UI | - |
|28| getHistoryViewStateV3UI | - |
|29| getHistoryYearsV3UI | - |
|30| addYear | y |
|31| setupHistoryYearSelectsV3UI | - |
|32| updateHistoryYearBadgesV3UI | - |
|33| getRekapSelectedYearV3UI | - |
|34| getRekapViewStateV3UI | - |
|35| setupRekapYearSelectV3UI | - |
|36| updateRekapYearBadgeV3UI | - |
|37| changeRekapYearV3UI | year |
|38| changeHistoryYearV3UI | year |
|39| setupRiwayatPanenMonthFilterV3UI | - |
|40| inferRiwayatPanenKeV3UI_ | row |
|41| getRiwayatPanenRowsV3UI | - |
|42| parseRiwayatPanenDateV3UI_ | value, fallbackMonth |
|43| renderRiwayatPanenV3UI | - |
|44| panenGroupKey | row |
|45| panenGroupLabel | row |
|46| subtotalRow | label |
|47| setupRiwayatBiayaMonthFilterV3UI | - |
|48| getRiwayatBiayaRowsV3UI | - |
|49| renderRiwayatBiayaV3UI | - |
|50| groupKey | row |
|51| groupLabel | row |
|52| subtotalBiayaRow | label |
|53| showRekapMode | mode |
|54| updateRekapButtons | - |
|55| renderRekap | - |
|56| renderRekapRingkas | rekapState |
|57| breakdown | m |
|58| renderRekapDetail | rekapState |
|59| renderRekapSummary | mode, rekapState |
|60| renderPerbandingan | - |
|61| fmtMetric | v, format |
|62| renderMetricYearTable | comp, key |
|63| renderMetricYearChart | comp, key |
|64| dashboardChartDefsV3Clean_ | - |
|65| setDashboardChartMetricV3Clean | key |
|66| renderDashboardMonthlyChart | - |
|67| renderProduksiTargetChartV3_ | box, rows, target |
|68| y | v |
|69| x | i |
|70| esc | v |
|71| targetMiniCardV3_ | label, value, hint |
|72| initTargetProduksiV3UI | - |
|73| loadTargetProduksiV3UI | silent |
|74| analyzeTargetProduksiSmartV3UI | - |
|75| getSmartTargetModeLabelV3UI_ | a |
|76| buildTargetRecommendationDescriptionV3UI_ | level, a, year |
|77| bindTargetProduksiManualEditV3UI_ | - |
|78| renderSmartTargetAnalysisV3UI | a |
|79| pctOrDash | v |
|80| useSmartTargetRecommendationV3UI | level |
|81| buildMonthlyTargetsClientV3_ | annualTarget, weights |
|82| validateMonthlyTargetsClientV3_ | arr, annualTarget |
|83| previewTargetProduksiV3UI | - |
|84| saveTargetProduksiV3UI | - |
|85| copyElementAsImageV3Clean | elementId, filename |
|86| downloadBlobV3Clean_ | blob, filename |
|87| initInputSheet | - |
|88| getDefaultInputMonthV3_ | - |
|89| buildDefaultInputRows | forceReset |
|90| defaultBiayaRowsHtmlV3DraftSafe_ | - |
|91| updateAutoBiayaKeteranganByPanenKgV3_ | totalKg |
|92| kasDraftInputV3Safe_ | field, value |
|93| getKasInputV3Safe_ | field |
|94| getKasInputValueV3Safe_ | field |
|95| setKasInputValueV3Safe_ | field, value |
|96| defaultKasRowsHtmlV3DraftSafe_ | - |
|97| addPanenRowV3DraftSafe_ | kgValue, hargaValue, skipRecalc |
|98| addPanenRow | - |
|99| addBiayaRowV3DraftSafe_ | namaValue, ketValue, jumlahValue, skipRecalc |
|100| addBiayaRow | - |
|101| recalcInputSheet | - |
|102| setVal | id, val |
|103| onInputMonthChangedV3 | - |
|104| loadInputControlStateV3UI | - |
|105| applyInputControlStateV3UI | res, requestedMonth |
|106| collectInputSheetPayloadV3 | - |
|107| saveInputSheetV3UI | - |
|108| inputDraftKeyV3Safe_ | - |
|109| getInputDraftStorageV3Safe_ | - |
|110| collectInputDraftV3Safe_ | - |
|111| inputDraftHasContentV3Safe_ | draft |
|112| saveInputDraftV3Safe | options |
|113| persistInputDraftNowV3Safe_ | reason |
|114| bindInputDraftLifecycleV3Safe_ | - |
|115| readInputDraftV3Safe_ | - |
|116| clearInputDraftV3Safe | - |
|117| restoreInputDraftV3Safe | - |
|118| resetInputSheetFormAfterSaveV3Safe | - |
|119| initPemupukanInput | - |
|120| statusPemupukanSelect | value |
|121| addPemupukanRow | - |
|122| collectPemupukanPayloadV3 | - |
|123| recalcPemupukanInputV3 | - |
|124| savePemupukanInputV3UI | - |
|125| loadPemupukanHistoryV3 | - |
|126| renderPemupukanHistoryV3 | res |
|127| auditCloseYearV3UI | - |
|128| previewYearClosingV3UI | - |
|129| validateCloseYearExecutionUnlockV3UI | - |
|130| confirmCloseYearV3UI | - |
|131| renderCloseYearConfirmResultV3UI | res |
|132| renderCloseYearAuditV3UI | res |
|133| renderCloseYearPreviewV3UI | res |
|134| renderCloseYearSheetAuditTableV3_ | table, sheetAudit |
|135| auditImportArchive2024V3UI | - |
|136| previewImportArchive2024V3UI | - |
|137| resetImport2024ExecutionLockV3UI | - |
|138| validateImport2024ExecutionUnlockV3UI | - |
|139| confirmImportArchive2024V3UI | - |
|140| renderImport2024ConfirmResultV3UI | res |
|141| renderImport2024AuditV3UI | res |
|142| renderImport2024PreviewV3UI | res |
|143| renderImport2024SummaryTableV3_ | table, t |
|144| renderImport2024DetailTableV3_ | table, sheetAudit |
|145| runFullSystemAuditV3UI | - |
|146| formatBytesV3UI_ | bytes |
|147| renderBackupStatusV3UI_ | res |
|148| loadBackupStatusV3UI | - |
|149| runManualBackupV3UI | - |
|150| renderDailyBackupTriggerErrorV3UI_ | message |
|151| setupDailyBackupV3UI | - |
|152| runPortableFullBackupV3UI | - |
|153| resetRestoreTotalV3UI | - |
|154| previewRestoreTotalV3UI | - |
|155| validateRestoreTotalUnlockV3UI | - |
|156| openRestoredAppV3UI | - |
|157| executeRestoreTotalV3UI | - |
---

# VERIFICATION SUMMARY

## Source Verification

| Item | Status |
|------|--------|
| Source File Identified | PASS |
| Source Parsing | PASS |
| Function Discovery | PASS |
| Registry Generation | PASS |
| Duplicate Detection | PASS |

---

## Registry Verification

| Item | Value |
|------|------:|
| Total Function | 157 |
| Documented Function | 157 |
| Remaining Function | 0 |
| Duplicate Function | 0 |

---

## Registry Coverage

| Coverage Item | Status |
|--------------|--------|
| Function Name | COMPLETE |
| Function Parameter | COMPLETE |
| Declaration Order | COMPLETE |
| Registry Completeness | COMPLETE |

---

# REGISTRY STATUS

Version

2.1

Document Status

OFFICIAL

Registry Status

COMPLETE

Single Source of Truth

YES

Ready For

- Global Variable Registry
- Dependency Analysis
- Call Graph Analysis
- Module Extraction

---

# RELATED DOCUMENTS

01_INDEX_HTML_MODULARIZATION_PLAN.md

02_INDEX_HTML_MODULE_MAP.md

04_GLOBAL_VARIABLE_REGISTRY.md

05_DEPENDENCY_MAP.md

06_CALL_GRAPH.md

07_MODULE_EXTRACTION_PLAN.md

---

# CHANGELOG

## Version 2.1

Improvements

- Standardized document structure.
- Added Scope section.
- Added Discovery Rules.
- Added Registry Statistics.
- Improved Verification Summary.
- Added Registry Coverage.
- Added Related Documents.
- Standardized closing section.
- Registry data (Function 1–157) remains unchanged.

---

# END OF DOCUMENT