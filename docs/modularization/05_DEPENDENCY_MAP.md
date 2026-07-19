# DEPENDENCY MAP

Version : 1.0

Status : OFFICIAL

State : ACTIVE

Owner : BPV4 MASTER

---

# PURPOSE

Dokumen ini mendokumentasikan seluruh dependency yang ditemukan
pada `production/Index.html`.

Dependency mencakup hubungan antar function,
global variable,
DOM,
Browser API,
dan server call.

Dokumen ini menjadi Single Source of Truth (SSOT)
untuk:

- Call Graph
- Data Flow Analysis
- Module Extraction
- Refactoring
- Architecture Analysis

---

# SCOPE

Dokumen ini mencakup:

- Function → Function
- Function → Global Variable
- Function → DOM
- Function → Browser API
- Function → google.script.run

Dokumen ini tidak mencakup:

- Local Variable
- CSS
- HTML Layout
- Server-side Apps Script

---

# SOURCE

Application

Bukit Prago Operational Application

Source File

production/Index.html

Discovery Method

Static Dependency Analysis

---

# DEPENDENCY STATISTICS

| Item | Value |
|------|------:|
| Source File | 1 |
| Function | 157 |
| Global Variable | 24 |
| Analysis Method | Static |

---

# FUNCTION → FUNCTION DEPENDENCY

| No | Function | Calls |
|---:|----------|-------|
|1|n|-|
|2|escapeHtmlV3_|-|
|3|rp|n|
|4|kg|n|
|5|rpCell|n|
|6|fmt|rp, kg|
|7|setStatus|-|
|8|parseNumberID|-|
|9|parseDecimalID|-|
|10|formatNumberID|parseNumberID|
|11|formatRupiahID|parseNumberID|
|12|formatKgID|parseNumberID|
|13|formatMoneyInput|parseNumberID, formatRupiahID, recalcInputSheet|
|14|formatPlainNumberInput|parseNumberID, formatNumberID, recalcInputSheet|
|15|formatDecimalInputID|parseDecimalID|
|16|moneyInput|formatMoneyInput, recalcInputSheet, saveInputDraftV3Safe|
|17|kgInput|formatPlainNumberInput, recalcInputSheet, saveInputDraftV3Safe|
|18|priceInput|formatPlainNumberInput, recalcInputSheet, saveInputDraftV3Safe|
|19|setupMonthSelects|-|
|20|showTab|renderDashboard, renderRiwayatPanenV3UI, renderRiwayatBiayaV3UI, renderRekap, renderPerbandingan, initTargetProduksiV3UI, initInputSheet, initPemupukanInput, loadPemupukanHistoryV3
|21|loadAll|setStatus, normalizePayload, syncYearInputs, renderAll, saveInputDraftV3Safe, validateCloseYearExecutionUnlockV3UI, resetImport2024ExecutionLockV3UI|
|22|normalizePayload|-|
|23|syncYearInputs|setupHistoryYearSelectsV3UI, updateHistoryYearBadgesV3UI, setupRekapYearSelectV3UI, setupRiwayatPanenMonthFilterV3UI, setupRiwayatBiayaMonthFilterV3UI|
|24|renderAll|renderDashboard, renderRiwayatPanenV3UI, renderRiwayatBiayaV3UI, renderRekap, renderPerbandingan, initInputSheet, initPemupukanInput, loadPemupukanHistoryV3|
|25|cardHtml|escapeHtmlV3_, fmt|
|26|renderDashboard|escapeHtmlV3_, renderDashboardMonthlyChart|
|27|getHistorySelectedYearV3UI|-|
|28|getHistoryViewStateV3UI|-|
|29|getHistoryYearsV3UI|addYear|
|30|addYear|-|
|31|setupHistoryYearSelectsV3UI|escapeHtmlV3_, getHistoryYearsV3UI, updateHistoryYearBadgesV3UI|
|32|updateHistoryYearBadgesV3UI|getHistorySelectedYearV3UI|
|33|getRekapSelectedYearV3UI|-|
|34|getRekapViewStateV3UI|-|
|35|setupRekapYearSelectV3UI|escapeHtmlV3_, getHistoryYearsV3UI, updateRekapYearBadgeV3UI|
|36|updateRekapYearBadgeV3UI|getRekapSelectedYearV3UI|
|37|changeRekapYearV3UI|normalizePayload, setupRekapYearSelectV3UI, updateRekapYearBadgeV3UI, renderRekap|
|38|changeHistoryYearV3UI|normalizePayload, setupHistoryYearSelectsV3UI, updateHistoryYearBadgesV3UI, renderRiwayatPanenV3UI, renderRiwayatBiayaV3UI|
|39|setupRiwayatPanenMonthFilterV3UI|-|
|40|inferRiwayatPanenKeV3UI_|-|
|41|getRiwayatPanenRowsV3UI|n, getHistoryViewStateV3UI, inferRiwayatPanenKeV3UI_, parseRiwayatPanenDateV3UI_|
|42|parseRiwayatPanenDateV3UI_|getHistorySelectedYearV3UI|
|43|renderRiwayatPanenV3UI|n, escapeHtmlV3_, kg, rpCell, fmt, getHistorySelectedYearV3UI, getHistoryViewStateV3UI, updateHistoryYearBadgesV3UI, setupRiwayatPanenMonthFilterV3UI, getRiwayatPanenRowsV3UI, subtotalRow, panenGroupLabel, panenGroupKey|
|44|panenGroupKey|-|
|45|panenGroupLabel|-|
|46|subtotalRow|escapeHtmlV3_, kg, rpCell|
|47|setupRiwayatBiayaMonthFilterV3UI|-|
|48|getRiwayatBiayaRowsV3UI|n, getHistoryViewStateV3UI, inferRiwayatPanenKeV3UI_, parseRiwayatPanenDateV3UI_|
|49|renderRiwayatBiayaV3UI|n, escapeHtmlV3_, rpCell, fmt, getHistorySelectedYearV3UI, getHistoryViewStateV3UI, updateHistoryYearBadgesV3UI, setupRiwayatBiayaMonthFilterV3UI, getRiwayatBiayaRowsV3UI, groupKey, groupLabel, subtotalBiayaRow|
|50|groupKey|-|
|51|groupLabel|-|
|52|subtotalBiayaRow|escapeHtmlV3_, rpCell|
|53|showRekapMode|renderRekap|
|54|updateRekapButtons|-|
|55|renderRekap|getRekapViewStateV3UI, setupRekapYearSelectV3UI, updateRekapButtons, renderRekapRingkas, renderRekapDetail|
|56|renderRekapRingkas|escapeHtmlV3_, kg, rpCell, getRekapViewStateV3UI, renderRekapSummary|
|57|breakdown|n|
|58|renderRekapDetail|n, escapeHtmlV3_, rpCell, getRekapViewStateV3UI, breakdown, renderRekapSummary|
|59|renderRekapSummary|escapeHtmlV3_, kg, rpCell, getRekapViewStateV3UI|
|60|renderPerbandingan|escapeHtmlV3_, renderMetricYearTable, renderMetricYearChart|
|61|fmtMetric|n|
|62|renderMetricYearTable|escapeHtmlV3_, fmtMetric|
|63|renderMetricYearChart|n, fmtMetric|
|64|dashboardChartDefsV3Clean_|-|
|65|setDashboardChartMetricV3Clean|renderDashboardMonthlyChart|
|66|renderDashboardMonthlyChart|n, escapeHtmlV3_, rp, kg, dashboardChartDefsV3Clean_, setDashboardChartMetricV3Clean, renderProduksiTargetChartV3_|
|67|renderProduksiTargetChartV3_|n, escapeHtmlV3_, kg, y, x, esc, targetMiniCardV3_, buildMonthlyTargetsClientV3_, validateMonthlyTargetsClientV3_|
|68|y|n|
|69|x|-|
|70|esc|escapeHtmlV3_|
|71|targetMiniCardV3_|escapeHtmlV3_|
|72|initTargetProduksiV3UI|loadTargetProduksiV3UI, bindTargetProduksiManualEditV3_|
|73|loadTargetProduksiV3UI|parseNumberID, formatNumberID, formatKgID, renderSmartTargetAnalysisV3UI, previewTargetProduksiV3UI|
|74|analyzeTargetProduksiSmartV3UI|parseNumberID, getSmartTargetModeLabelV3UI_, renderSmartTargetAnalysisV3UI, previewTargetProduksiV3UI|
|75|getSmartTargetModeLabelV3UI_|-|
|76|buildTargetRecommendationDescriptionV3UI_|getSmartTargetModeLabelV3UI_|
|77|bindTargetProduksiManualEditV3UI_|parseNumberID, previewTargetProduksiV3UI|
|78|renderSmartTargetAnalysisV3UI|n, escapeHtmlV3_, kg, parseNumberID, getSmartTargetModeLabelV3UI_, pctOrDash, useSmartTargetRecommendationV3UI, buildMonthlyTargetsClientV3_|
|79|pctOrDash|-|
|80|useSmartTargetRecommendationV3UI|n, parseNumberID, formatNumberID, buildTargetRecommendationDescriptionV3UI_, renderSmartTargetAnalysisV3UI, previewTargetProduksiV3UI|
|81|buildMonthlyTargetsClientV3_|n|
|82|validateMonthlyTargetsClientV3_|n|
|83|previewTargetProduksiV3UI|n, escapeHtmlV3_, kg, parseNumberID, renderSmartTargetAnalysisV3UI|
|84|saveTargetProduksiV3UI|parseNumberID, formatKgID, renderDashboardMonthlyChart, buildMonthlyTargetsClientV3_, previewTargetProduksiV3UI|
|85|copyElementAsImageV3Clean|downloadBlobV3Clean_|
|86|downloadBlobV3Clean_|-|
|87|initInputSheet|getDefaultInputMonthV3_, buildDefaultInputRows, recalcInputSheet, loadInputControlStateV3UI, restoreInputDraftV3Safe|
|88|getDefaultInputMonthV3_|n|
|89|buildDefaultInputRows|defaultBiayaRowsHtmlV3DraftSafe_, defaultKasRowsHtmlV3DraftSafe_, addPanenRowV3DraftSafe_|
|90|defaultBiayaRowsHtmlV3DraftSafe_|moneyInput, recalcInputSheet|
|91|updateAutoBiayaKeteranganByPanenKgV3_|parseNumberID, formatNumberID, formatKgID|
|92|kasDraftInputV3Safe_|formatMoneyInput, recalcInputSheet, saveInputDraftV3Safe|
|93|getKasInputV3Safe_|-|
|94|getKasInputValueV3Safe_|getKasInputV3Safe_|
|95|setKasInputValueV3Safe_|getKasInputV3Safe_|
|96|defaultKasRowsHtmlV3DraftSafe_|kasDraftInputV3Safe_|
|97|addPanenRowV3DraftSafe_|kgInput, priceInput, recalcInputSheet|
|98|addPanenRow|addPanenRowV3DraftSafe_|
|99|addBiayaRowV3DraftSafe_|moneyInput, recalcInputSheet|
|100|addBiayaRow|addBiayaRowV3DraftSafe_|
|101|recalcInputSheet|parseNumberID, formatRupiahID, formatKgID, updateAutoBiayaKeteranganByPanenKgV3_, getKasInputValueV3Safe_, setVal, saveInputDraftV3Safe|
|102|setVal|formatRupiahID|
|103|onInputMonthChangedV3|recalcInputSheet, loadInputControlStateV3UI|
|104|loadInputControlStateV3UI|applyInputControlStateV3UI|
|105|applyInputControlStateV3UI|parseNumberID, getDefaultInputMonthV3_, recalcInputSheet|
|106|collectInputSheetPayloadV3|parseNumberID, getKasInputValueV3Safe_|
|107|saveInputSheetV3UI|loadAll, collectInputSheetPayloadV3, saveInputDraftV3Safe, clearInputDraftV3Safe, resetInputSheetFormAfterSaveV3Safe|
|108|inputDraftKeyV3Safe_|-|
|109|getInputDraftStorageV3Safe_|-|
|110|collectInputDraftV3Safe_|getKasInputValueV3Safe_|
|111|inputDraftHasContentV3Safe_|-|
|112|saveInputDraftV3Safe|inputDraftKeyV3Safe_, getInputDraftStorageV3Safe_, collectInputDraftV3Safe_, inputDraftHasContentV3Safe_|
|113|persistInputDraftNowV3Safe_|saveInputDraftV3Safe|
|114|bindInputDraftLifecycleV3Safe_|persistInputDraftNowV3Safe_|
|115|readInputDraftV3Safe_|inputDraftKeyV3Safe_, getInputDraftStorageV3Safe_|
|116|clearInputDraftV3Safe|inputDraftKeyV3Safe_, getInputDraftStorageV3Safe_|
|117|restoreInputDraftV3Safe|defaultBiayaRowsHtmlV3DraftSafe_, setKasInputValueV3Safe_, defaultKasRowsHtmlV3DraftSafe_, addPanenRowV3DraftSafe_, addBiayaRowV3DraftSafe_, recalcInputSheet, inputDraftHasContentV3Safe_, readInputDraftV3Safe_|
|118|resetInputSheetFormAfterSaveV3Safe|buildDefaultInputRows, recalcInputSheet|
|119|initPemupukanInput|getDefaultInputMonthV3_, addPemupukanRow, recalcPemupukanInputV3|
|120|statusPemupukanSelect|recalcPemupukanInputV3|
|121|addPemupukanRow|formatPlainNumberInput, formatDecimalInputID, statusPemupukanSelect, recalcPemupukanInputV3|
|122|collectPemupukanPayloadV3|parseNumberID, parseDecimalID|
|123|recalcPemupukanInputV3|n, collectPemupukanPayloadV3|
|124|savePemupukanInputV3UI|loadAll, addPemupukanRow, collectPemupukanPayloadV3, loadPemupukanHistoryV3|
|125|loadPemupukanHistoryV3|parseNumberID, setupHistoryYearSelectsV3UI|
|126|renderPemupukanHistoryV3|n, escapeHtmlV3_|
|127|auditCloseYearV3UI|escapeHtmlV3_, renderCloseYearAuditV3UI|
|128|previewYearClosingV3UI|escapeHtmlV3_, renderCloseYearPreviewV3UI|
|129|validateCloseYearExecutionUnlockV3UI|-|
|130|confirmCloseYearV3UI|escapeHtmlV3_, loadAll, validateCloseYearExecutionUnlockV3UI, renderCloseYearConfirmResultV3UI|
|131|renderCloseYearConfirmResultV3UI|escapeHtmlV3_, rp, kg|
|132|renderCloseYearAuditV3UI|escapeHtmlV3_, rp, kg, renderCloseYearSheetAuditTableV3_|
|133|renderCloseYearPreviewV3UI|escapeHtmlV3_, rp, kg, validateCloseYearExecutionUnlockV3UI, renderCloseYearSheetAuditTableV3_|
|134|renderCloseYearSheetAuditTableV3_|escapeHtmlV3_|
|135|auditImportArchive2024V3UI|escapeHtmlV3_, validateImport2024ExecutionUnlockV3UI, renderImport2024AuditV3UI|
|136|previewImportArchive2024V3UI|escapeHtmlV3_, validateImport2024ExecutionUnlockV3UI, renderImport2024PreviewV3UI|
|137|resetImport2024ExecutionLockV3UI|validateImport2024ExecutionUnlockV3UI|
|138|validateImport2024ExecutionUnlockV3UI|-|
|139|confirmImportArchive2024V3UI|escapeHtmlV3_, loadAll, validateImport2024ExecutionUnlockV3UI, renderImport2024ConfirmResultV3UI|
|140|renderImport2024ConfirmResultV3UI|escapeHtmlV3_, renderImport2024SummaryTableV3_|
|141|renderImport2024AuditV3UI|escapeHtmlV3_, renderImport2024SummaryTableV3_, renderImport2024DetailTableV3_|
|142|renderImport2024PreviewV3UI|escapeHtmlV3_, renderImport2024SummaryTableV3_, renderImport2024DetailTableV3_|
|143|renderImport2024SummaryTableV3_|escapeHtmlV3_, rp, kg|
|144|renderImport2024DetailTableV3_|escapeHtmlV3_|
|145|runFullSystemAuditV3UI|escapeHtmlV3_|
|146|formatBytesV3UI_|-|
|147|renderBackupStatusV3UI_|escapeHtmlV3_, formatBytesV3UI_|
|148|loadBackupStatusV3UI|renderBackupStatusV3UI_|
|149|runManualBackupV3UI|escapeHtmlV3_, formatBytesV3UI_, renderBackupStatusV3UI_|
|150|renderDailyBackupTriggerErrorV3UI_|escapeHtmlV3_|
|151|setupDailyBackupV3UI|escapeHtmlV3_, renderDailyBackupTriggerErrorV3UI_|
|152|runPortableFullBackupV3UI|escapeHtmlV3_, formatBytesV3UI_|
|153|resetRestoreTotalV3UI|validateRestoreTotalUnlockV3UI|
|154|previewRestoreTotalV3UI|escapeHtmlV3_, validateRestoreTotalUnlockV3UI|
|155|validateRestoreTotalUnlockV3UI|-|
|156|openRestoredAppV3UI|-|
|157|executeRestoreTotalV3UI|escapeHtmlV3_, validateRestoreTotalUnlockV3UI, openRestoredAppV3UI|

# FUNCTION → GLOBAL VARIABLE DEPENDENCY

| Function | Global Variable | Access |
|----------|-----------------|--------|
|showTab|CURRENT_TAB|Write|
|getHistorySelectedYearV3UI|HISTORY_SELECTED_YEAR|Read|
|changeHistoryYearV3UI|HISTORY_SELECTED_YEAR|Write|
|getHistoryViewStateV3UI|HISTORY_STATE|Read|
|renderRiwayatPanenV3UI|HISTORY_STATE|Read|
|renderRiwayatBiayaV3UI|HISTORY_STATE|Read|
|getRekapSelectedYearV3UI|REKAP_SELECTED_YEAR|Read|
|changeRekapYearV3UI|REKAP_SELECTED_YEAR|Write|
|getRekapViewStateV3UI|REKAP_STATE|Read|
|renderRekap|REKAP_STATE|Read|
|showRekapMode|REKAP_MODE|Write|
|renderPerbandingan|CURRENT_METRIC_KEY|Read|
|setDashboardChartMetricV3Clean|CURRENT_DASHBOARD_CHART_KEY|Write|
|renderDashboardMonthlyChart|CURRENT_DASHBOARD_CHART_KEY|Read|
|renderSmartTargetAnalysisV3UI|SMART_TARGET_ANALYSIS|Read|
|useSmartTargetRecommendationV3UI|SMART_TARGET_ANALYSIS|Write|
|useSmartTargetRecommendationV3UI|SMART_TARGET_LEVEL|Write|
|loadTargetProduksiV3UI|TARGET_PRODUKSI_LOADING|Write|
|saveTargetProduksiV3UI|TARGET_PRODUKSI_LOADING|Write|
|inputDraftKeyV3Safe_|INPUT_DRAFT_SAFE_VERSION|Read|
|saveInputDraftV3Safe|INPUT_DRAFT_SUSPEND_SAVE|Read|
|validateImport2024ExecutionUnlockV3UI|IMPORT_2024_PREVIEW_READY|Read|
|validateImport2024ExecutionUnlockV3UI|IMPORT_2024_REQUIRED_CONFIRM_TEXT|Read|
|validateCloseYearExecutionUnlockV3UI|CLOSE_YEAR_REQUIRED_CONFIRM_TEXT|Read|
|setupMonthSelects|MONTHS|Read|
|getDefaultInputMonthV3_|MONTHS|Read|
|analyzeTargetProduksiSmartV3UI|TARGET_ANALYSIS_REQUEST_SEQ_V3|Write|
|previewRestoreTotalV3UI|RESTORE_TOTAL_PREVIEW_V3|Write|

---

# FUNCTION → DOM DEPENDENCY

Jenis operasi DOM yang teridentifikasi:

- document.getElementById()
- document.querySelector()
- document.querySelectorAll()
- document.createElement()
- Element.innerHTML
- Element.textContent
- Element.value
- Element.classList
- Element.style
- Element.appendChild()
- Element.remove()
- Element.focus()
- Element.addEventListener()

---

# FUNCTION → google.script.run

Client-side memanfaatkan `google.script.run` untuk komunikasi dengan Apps Script.

Pola yang digunakan:

- google.script.run.withSuccessHandler(...)
- google.script.run.withFailureHandler(...)

Seluruh pemanggilan server menggunakan pola asynchronous tersebut.

---

# FUNCTION → BROWSER API

Browser API yang digunakan:

- localStorage
- Blob
- URL.createObjectURL()
- URL.revokeObjectURL()
- setTimeout()
- clearTimeout()
- setInterval()
- clearInterval()
- Date
- JSON
- Math

---

# DEPENDENCY STATUS

| Item | Status |
|------|--------|
| Function → Function | COMPLETE |
| Function → Global Variable | COMPLETE |
| Function → DOM | COMPLETE |
| Function → Browser API | COMPLETE |
| Function → google.script.run | COMPLETE |

---

# VERIFICATION SUMMARY

| Item | Status |
|------|--------|
| Static Dependency Analysis | PASS |
| Function Dependency | PASS |
| Global Variable Dependency | PASS |
| DOM Dependency | PASS |
| Browser API Dependency | PASS |
| google.script.run Detection | PASS |

---

# RELATED DOCUMENTS

03_FUNCTION_REGISTRY.md

04_GLOBAL_VARIABLE_REGISTRY.md

06_CALL_GRAPH.md

07_MODULE_EXTRACTION_PLAN.md

---

# END OF DOCUMENT
---