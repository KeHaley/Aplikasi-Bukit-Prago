/**
 * ============================================================
 * BUKIT PRAGO V3 CLEAN FULL REWRITE
 * VERSION: V3_FINAL_OPERATIONAL_BASELINE_2026_06_REKAP_YEAR_ARCHIVE_DYNAMIC_FROM_YELLOW_BASELINE_VERIFIED_SAFE
 *
 * Prinsip:
 * - Ditulis ulang bersih, bukan override bawah.
 * - Dashboard/Rekap/Input/Pemupukan hanya membaca TX_* ACTIVE_YEAR.
 * - Perbandingan Tahun boleh membaca ARCHIVE_* + TX_*.
 * - Desimal dosis pemupukan dipertahankan.
 * - File lama/rusak tidak disalin ke paket.
 * ============================================================
 */

const V3_CLEAN_VERSION = 'V3_FINAL_OPERATIONAL_BASELINE_2026_06_REKAP_YEAR_ARCHIVE_DYNAMIC_FROM_YELLOW_BASELINE_VERIFIED_SAFE';
const V3C = {
  MONTHS: ['', 'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  SHEETS: {
    TX_PENJUALAN: 'TX_PENJUALAN',
    TX_BIAYA: 'TX_BIAYA',
    TX_KAS: 'TX_KAS',
    TX_PEMUPUKAN: 'TX_PEMUPUKAN',
    APP_CONFIG: 'APP_CONFIG',
    LOG_AKTIVITAS: 'LOG_AKTIVITAS',
    YEAR_STATUS: 'YEAR_STATUS',
    ARCHIVE_PENJUALAN: 'ARCHIVE_PENJUALAN',
    ARCHIVE_BIAYA: 'ARCHIVE_BIAYA',
    ARCHIVE_KAS: 'ARCHIVE_KAS',
    ARCHIVE_PEMUPUKAN: 'ARCHIVE_PEMUPUKAN',
    TARGET_PRODUKSI: 'TARGET_PRODUKSI',
    ARCHIVE_TARGET_PRODUKSI: 'ARCHIVE_TARGET_PRODUKSI'
  }
};

// Request-local read cache. Diaktifkan hanya selama satu proses read-only payload,
// lalu selalu dibersihkan pada finally agar tidak menyimpan data lama antar-eksekusi.
let V3_REQUEST_OBJECT_CACHE = null;
function beginV3RequestReadCache_() { V3_REQUEST_OBJECT_CACHE = Object.create(null); }
function endV3RequestReadCache_() { V3_REQUEST_OBJECT_CACHE = null; }

function doGet() {
  // FINAL BASELINE SECURITY HARDENING:
  // Jangan izinkan web app dibingkai oleh situs lain. Aplikasi digunakan langsung
  // melalui URL deployment, sehingga X-Frame default lebih aman daripada ALLOWALL.
  const template = HtmlService.createTemplateFromFile('Index');
  template.appDeploymentUrl = ScriptApp.getService().getUrl() || '';
  return template.evaluate()
    .setTitle('Aplikasi Kebun Bukit Prago V3 Clean');
}

function getV3DashboardBindingPayloadWebSafeV3_8E6() {
  beginV3RequestReadCache_();
  try {
    const activeYear = getActiveYearV3Clean_();
    const payload = buildActiveYearPayloadV3Clean_(activeYear);
    payload.targetProduksi = getTargetProduksiV3Safe_(activeYear);
    // buildMetricYearTables membaca sheet yang sama; cache request menghindari getDataRange berulang.
    payload.metricYearTables = buildMetricYearTablesV3Clean_(activeYear);
    payload.metricYearTablesVersion = V3_CLEAN_VERSION;
    payload.webSafeVersion = V3_CLEAN_VERSION;
    payload.readOptimization = 'REQUEST_LOCAL_SHEET_CACHE';
    payload.txTouched = false;
    payload.appConfigChanged = false;
    payload.yearStatusChanged = false;
    payload.archiveDataWritten = false;
    return jsonSafeV3Clean_(payload);
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  } finally {
    endV3RequestReadCache_();
  }
}

function getV3DashboardBindingPayload() {
  return getV3DashboardBindingPayloadWebSafeV3_8E6();
}

function getV3AppState(year) {
  const activeYear = Number(year || getActiveYearV3Clean_());
  return buildActiveYearPayloadV3Clean_(activeYear);
}


/**
 * HISTORY YEAR VIEW SAFE
 * Read-only payload for riwayat menus. Active year reads TX_*; older selected year reads ARCHIVE_*.
 * Does not write database, does not touch TX_*, does not touch ARCHIVE_*.
 */
function getV3HistoryYearPayloadV3(year) {
  try {
    const activeYear = getActiveYearV3Clean_();
    const selectedYear = Number(year || activeYear);
    const payload = selectedYear === activeYear
      ? buildActiveYearPayloadV3Clean_(activeYear)
      : buildArchiveYearPayloadV3Clean_(selectedYear);
    payload.historyYearView = true;
    payload.historySelectedYear = selectedYear;
    payload.historySource = selectedYear === activeYear ? 'TX_*' : 'ARCHIVE_*';
    payload.metricYearTables = buildMetricYearTablesV3Clean_(activeYear);
    payload.txTouched = false;
    payload.appConfigChanged = false;
    payload.yearStatusChanged = false;
    payload.archiveDataWritten = false;
    return jsonSafeV3Clean_(payload);
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  }
}

function auditV3AppState(year) {
  const state = getV3AppState(year);
  const out = {
    ok: !!(state && state.ok),
    version: V3_CLEAN_VERSION,
    activeYear: state ? state.activeYear : getActiveYearV3Clean_(),
    source: state ? state.source : '',
    summary: state ? state.summary : {},
    rows: state ? state.rows : {},
    issues: state ? state.issues || [] : ['STATE_EMPTY']
  };
  Logger.log(JSON.stringify(out, null, 2));
  return jsonSafeV3Clean_(out);
}

function debugCleanRewriteBackendV3() {
  const activeYear = getActiveYearV3Clean_();
  const payload = getV3DashboardBindingPayloadWebSafeV3_8E6();
  const pemupukan = getPemupukanHistoryV3(activeYear, 0);
  const inputControl = getInputControlStateV3(0);
  const metric = payload.metricYearTables || {};
  const result = {
    ok: !!(
      payload && payload.ok && payload.source === 'TX_*' &&
      pemupukan && pemupukan.ok && pemupukan.source === 'TX_PEMUPUKAN' &&
      inputControl && inputControl.ok &&
      metric && metric.tables
    ),
    version: V3_CLEAN_VERSION,
    activeYear: activeYear,
    payload: {
      ok: payload.ok,
      source: payload.source,
      rows: payload.rows,
      total: payload.total,
      hasMetricYearTables: !!(metric && metric.tables)
    },
    pemupukan: {
      ok: pemupukan.ok,
      source: pemupukan.source,
      rows: pemupukan.summary ? pemupukan.summary.rows : 0,
      sample: pemupukan.rows && pemupukan.rows.length ? pemupukan.rows[0] : null
    },
    inputControl: inputControl,
    message: 'Backend clean rewrite siap untuk Index active-only. Perbandingan memakai metricYearTables.'
  };
  Logger.log(JSON.stringify(result, null, 2));
  return jsonSafeV3Clean_(result);
}

function getActiveYearV3Clean_() {
  const cfg = readConfigMapV3Clean_();
  const y = Number(cfg.ACTIVE_YEAR || cfg.activeYear || 2026);
  return y || 2026;
}

function buildActiveYearPayloadV3Clean_(year) {
  const y = Number(year || getActiveYearV3Clean_());
  const raw = readDatasetV3Clean_(false);
  const data = normalizeDatasetV3Clean_(raw, y, false);
  const months = buildMonthsV3Clean_(data, y, false);
  const total = summarizeMonthsV3Clean_(months);
  const dashboard = buildDashboardV3Clean_(y, total);
  const rekapBulanan = buildRekapV3Clean_(months, total);
  const audit = auditPayloadV3Clean_(total, data);
  return jsonSafeV3Clean_({
    ok: audit.ok,
    version: V3_CLEAN_VERSION,
    source: 'TX_*',
    mode: 'ACTIVE_YEAR_TX',
    activeYear: y,
    selectedYear: y,
    readOnly: false,
    hasData: hasTotalDataV3Clean_(total),
    dashboard: dashboard,
    dashboardCards: dashboard.cards,
    months: months,
    rekapBulanan: rekapBulanan,
    total: total,
    summary: total,
    rows: total.rows,
    inputSheet: buildInputSheetStateV3Clean_(y),
    rules: buildRulesV3Clean_(),
    audit: audit,
    issues: audit.issues
  });
}

function buildArchiveYearPayloadV3Clean_(year) {
  const y = Number(year);
  const raw = readDatasetV3Clean_(true);
  const data = normalizeDatasetV3Clean_(raw, y, true);
  const months = buildMonthsV3Clean_(data, y, true);
  const total = summarizeMonthsV3Clean_(months);
  const dashboard = buildDashboardV3Clean_(y, total);
  return jsonSafeV3Clean_({
    ok: true,
    version: V3_CLEAN_VERSION,
    source: 'ARCHIVE_*',
    mode: 'ARCHIVE_YEAR_READ_ONLY',
    activeYear: getActiveYearV3Clean_(),
    selectedYear: y,
    readOnly: true,
    hasData: hasTotalDataV3Clean_(total),
    months: months,
    dashboard: dashboard,
    rekapBulanan: buildRekapV3Clean_(months, total),
    total: total,
    summary: total,
    rows: total.rows,
    audit: { ok: true, issues: [] }
  });
}

function readDatasetV3Clean_(archive) {
  const s = V3C.SHEETS;
  return {
    penjualan: getObjectsV3Clean_(archive ? s.ARCHIVE_PENJUALAN : s.TX_PENJUALAN),
    biaya: getObjectsV3Clean_(archive ? s.ARCHIVE_BIAYA : s.TX_BIAYA),
    kas: getObjectsV3Clean_(archive ? s.ARCHIVE_KAS : s.TX_KAS),
    pemupukan: getObjectsV3Clean_(archive ? s.ARCHIVE_PEMUPUKAN : s.TX_PEMUPUKAN)
  };
}

function normalizeDatasetV3Clean_(raw, year, archive) {
  const y = Number(year);
  return {
    penjualan: (raw.penjualan || []).filter(function(r){ return isRowForYearV3Clean_(r, y); }).map(function(r){
      const kg = numberV3Clean_(r.panen_kg || r.kg || r.produksi_kg);
      const jumlah = numberV3Clean_(r.jumlah || r.penjualan || r.total);
      const harga = numberV3Clean_(r.harga || (kg ? jumlah / kg : 0));
      return {
        tx_id: cleanV3Clean_(r.tx_id), status: 'active', tahun: y,
        bulan: monthV3Clean_(r.periode_bulan || r.bulan),
        tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti),
        panen_ke: numberV3Clean_(r.panen_ke), panen_kg: kg, harga: harga, jumlah: jumlah,
        keterangan: cleanV3Clean_(r.keterangan), source_row: cleanV3Clean_(r.source_row)
      };
    }),
    biaya: (raw.biaya || []).filter(function(r){ return isRowForYearV3Clean_(r, y); }).map(function(r){
      const nama = cleanV3Clean_(r.biaya || r.nama_biaya);
      const ket = cleanV3Clean_(r.keterangan);
      return {
        tx_id: cleanV3Clean_(r.tx_id), status: 'active', tahun: y,
        bulan: monthV3Clean_(r.periode_bulan || r.bulan),
        tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti),
        panen_ke: numberV3Clean_(r.panen_ke), kategori: categorizeBiayaV3Clean_(nama + ' ' + ket, r.kategori),
        biaya: nama, keterangan: ket, jumlah: numberV3Clean_(r.jumlah || r.nominal || r.biaya_total),
        source_row: cleanV3Clean_(r.source_row)
      };
    }),
    kas: (raw.kas || []).filter(function(r){ return isRowForYearV3Clean_(r, y); }).map(function(r){
      return {
        tx_id: cleanV3Clean_(r.tx_id), status: 'active', tahun: y,
        bulan: monthV3Clean_(r.periode_bulan || r.bulan),
        tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti),
        panen_ke: numberV3Clean_(r.panen_ke), jenis_kas: normalizeJenisKasV3Clean_(r.jenis_kas || r.jenis),
        keterangan: cleanV3Clean_(r.keterangan), jumlah: numberV3Clean_(r.jumlah || r.nominal),
        akun_sumber: cleanV3Clean_(r.akun_sumber), akun_tujuan: cleanV3Clean_(r.akun_tujuan),
        source_row: cleanV3Clean_(r.source_row)
      };
    }).filter(function(r){ return ['kas_masuk','kas_keluar','transfer','pinjaman','potong_pinjaman'].indexOf(r.jenis_kas) !== -1; }),
    pemupukan: (raw.pemupukan || []).filter(function(r){ return isRowForYearV3Clean_(r, y); }).map(function(r){
      const jenis = cleanV3Clean_(r.jenis_pupuk || r.nama_pupuk || r.pupuk);
      const dosis = numberDecimalV3Adapter_(r.dosis);
      return {
        tx_id: cleanV3Clean_(r.tx_id), batch_id: cleanV3Clean_(r.batch_id), status: 'active', tahun: y,
        bulan: monthV3Clean_(r.periode_bulan || r.bulan),
        tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti),
        tanggal_bukti_display: formatDateShortBackendV3_(r.tanggal_bukti),
        jenis_pupuk: jenis, nama_pupuk: jenis,
        dosis: dosis, dosis_display: formatDosisDisplayV3_(dosis),
        satuan: cleanV3Clean_(r.satuan), jumlah: numberV3Clean_(r.jumlah),
        blok_area: cleanV3Clean_(r.blok_area || r.blok || r.area),
        keterangan: cleanV3Clean_(r.keterangan),
        status_realisasi: cleanV3Clean_(r.status_realisasi || r.status_pemupukan || 'Selesai'),
        source_row: cleanV3Clean_(r.source_row),
        source: archive ? 'ARCHIVE_PEMUPUKAN' : 'TX_PEMUPUKAN',
        readOnly: !!archive
      };
    })
  };
}

function buildMonthsV3Clean_(data, year, archive) {
  const months = [];
  for (let m = 1; m <= 12; m++) {
    months.push({
      bulan: m,
      bulan_nama: V3C.MONTHS[m],
      namaBulan: V3C.MONTHS[m],
      tahun: Number(year),
      statusBulan: archive ? 'archive' : 'open',
      produksiKg: 0,
      penjualanRp: 0,
      biayaRp: 0,
      kasRp: 0,
      transferRp: 0,
      pinjamanRp: 0,
      potongPinjamanRp: 0,
      kasMasukRp: 0,
      kasKeluarRp: 0,
      labaRp: 0,
      hppRpPerKg: 0,
      hargaRataRpPerKg: 0,
      rows: { penjualan: 0, biaya: 0, kas: 0, pemupukan: 0 },
      detail: { penjualan: [], biaya: [], kas: [], pemupukan: [] },
      biayaBreakdown: emptyBiayaBreakdownV3Clean_(),
      hasData: false
    });
  }
  function target(row) { return row.bulan >= 1 && row.bulan <= 12 ? months[row.bulan - 1] : null; }
  data.penjualan.forEach(function(r){ const m = target(r); if (!m) return; m.produksiKg += r.panen_kg; m.penjualanRp += r.jumlah; m.rows.penjualan++; m.detail.penjualan.push(r); });
  data.biaya.forEach(function(r){ const m = target(r); if (!m) return; m.biayaRp += r.jumlah; m.rows.biaya++; m.detail.biaya.push(r); });
  data.kas.forEach(function(r){ const m = target(r); if (!m) return; m.kasRp += r.jumlah; m.rows.kas++; m.detail.kas.push(r); if (r.jenis_kas === 'transfer') m.transferRp += r.jumlah; if (r.jenis_kas === 'pinjaman') m.pinjamanRp += r.jumlah; if (r.jenis_kas === 'potong_pinjaman') m.potongPinjamanRp += r.jumlah; if (r.jenis_kas === 'kas_masuk') m.kasMasukRp += r.jumlah; if (r.jenis_kas === 'kas_keluar') m.kasKeluarRp += r.jumlah; });
  data.pemupukan.forEach(function(r){ const m = target(r); if (!m) return; m.rows.pemupukan++; m.detail.pemupukan.push(r); });
  months.forEach(function(m){
    m.biayaBreakdown = buildBiayaBreakdownV3Clean_(m.detail.biaya);
    // COMPARISON_MAINTENANCE_FERTILIZER_SAFE:
    // Perawatan adalah gabungan biaya Babat + Tunas. Pupuk tetap kategori tersendiri.
    // Nilai turunan read-only ini dipakai khusus Dashboard payload/Perbandingan Tahun.
    m.perawatanRp = numberV3Clean_(m.biayaBreakdown.babatRp) + numberV3Clean_(m.biayaBreakdown.tunasRp);
    m.pupukRp = numberV3Clean_(m.biayaBreakdown.pupukRp);
    m.labaRp = m.penjualanRp - m.biayaRp;
    m.hppRpPerKg = m.produksiKg ? Math.round(m.biayaRp / m.produksiKg) : 0;
    m.hargaRataRpPerKg = m.produksiKg ? Math.round(m.penjualanRp / m.produksiKg) : 0;
    m.hasData = !!(m.produksiKg || m.penjualanRp || m.biayaRp || m.kasRp || m.transferRp || m.rows.pemupukan);
  });
  return months;
}

function summarizeMonthsV3Clean_(months) {
  const total = {
    produksiKg: 0, penjualanRp: 0, biayaRp: 0, kasRp: 0, transferRp: 0,
    pinjamanRp: 0, potongPinjamanRp: 0, kasMasukRp: 0, kasKeluarRp: 0,
    labaRp: 0, hppRpPerKg: 0, hargaRataRpPerKg: 0, activeMonths: 0,
    rows: { penjualan: 0, biaya: 0, kas: 0, pemupukan: 0 }
  };
  months.forEach(function(m){
    ['produksiKg','penjualanRp','biayaRp','kasRp','transferRp','pinjamanRp','potongPinjamanRp','kasMasukRp','kasKeluarRp'].forEach(function(k){ total[k] += numberV3Clean_(m[k]); });
    total.rows.penjualan += numberV3Clean_(m.rows && m.rows.penjualan);
    total.rows.biaya += numberV3Clean_(m.rows && m.rows.biaya);
    total.rows.kas += numberV3Clean_(m.rows && m.rows.kas);
    total.rows.pemupukan += numberV3Clean_(m.rows && m.rows.pemupukan);
    if (m.hasData) total.activeMonths++;
  });
  total.labaRp = total.penjualanRp - total.biayaRp;
  total.hppRpPerKg = total.produksiKg ? Math.round(total.biayaRp / total.produksiKg) : 0;
  total.hargaRataRpPerKg = total.produksiKg ? Math.round(total.penjualanRp / total.produksiKg) : 0;
  total.activeMonths = total.activeMonths || 1;
  return total;
}

function buildDashboardV3Clean_(year, total) {
  return {
    tahun: Number(year),
    total: total,
    cards: [
      { key:'produksiKg', metric:'produksi', label:'Produksi', value: total.produksiKg, format:'kg' },
      { key:'penjualanRp', metric:'penjualan', label:'Penjualan Buah', value: total.penjualanRp, format:'rp' },
      { key:'biayaRp', metric:'biaya', label:'Biaya', value: total.biayaRp, format:'rp' },
      { key:'labaRp', metric:'laba', label:'Laba Bersih', value: total.labaRp, format:'rp' },
      { key:'transferRp', metric:'transfer', label:'Transfer', value: total.transferRp, format:'rp' },
      { key:'hppRpPerKg', metric:'hpp', label:'HPP / Kg', value: total.hppRpPerKg, format:'rp' },
      { key:'hargaRataRpPerKg', metric:'harga', label:'Harga Rata-rata', value: total.hargaRataRpPerKg, format:'rp' }
    ],
    averageCards: [
      { key:'produksiKg', label:'Produksi / Bulan', value: Math.round(total.produksiKg / total.activeMonths), format:'kg' },
      { key:'penjualanRp', label:'Penjualan / Bulan', value: Math.round(total.penjualanRp / total.activeMonths), format:'rp' },
      { key:'biayaRp', label:'Biaya / Bulan', value: Math.round(total.biayaRp / total.activeMonths), format:'rp' },
      { key:'labaRp', label:'Laba / Bulan', value: Math.round(total.labaRp / total.activeMonths), format:'rp' }
    ]
  };
}

function buildRekapV3Clean_(months, total) {
  return { rows: months, total: total, avg: {
    label: 'AVG', activeMonths: total.activeMonths,
    produksiKg: Math.round(total.produksiKg / total.activeMonths),
    penjualanRp: Math.round(total.penjualanRp / total.activeMonths),
    biayaRp: Math.round(total.biayaRp / total.activeMonths),
    labaRp: Math.round(total.labaRp / total.activeMonths),
    transferRp: Math.round(total.transferRp / total.activeMonths)
  }};
}

/**
 * Menghasilkan daftar tahun dinamis berdasarkan isi ARCHIVE_* yang benar-benar ada,
 * kemudian selalu menambahkan ACTIVE_YEAR sebagai tahun berjalan.
 * Read-only: tidak menulis atau mengubah sheet apa pun.
 */
function getAvailableArchiveYearsV3Clean_(activeYearInput) {
  const activeYear = Number(activeYearInput || getActiveYearV3Clean_());
  const yearMap = {};
  const archiveSheets = [
    V3C.SHEETS.ARCHIVE_PENJUALAN,
    V3C.SHEETS.ARCHIVE_BIAYA,
    V3C.SHEETS.ARCHIVE_KAS,
    V3C.SHEETS.ARCHIVE_PEMUPUKAN
  ];
  archiveSheets.forEach(function(sheetName){
    const rows = getObjectsV3Clean_(sheetName) || [];
    rows.forEach(function(row){
      const y = Number(row.periode_tahun || row.tahun || row.year || row.closed_year || 0);
      if (y >= 2000 && y <= activeYear) yearMap[y] = true;
    });
  });
  if (activeYear >= 2000) yearMap[activeYear] = true;
  const years = Object.keys(yearMap).map(Number).filter(function(y){ return !!y; });
  years.sort(function(a,b){ return a-b; });
  return years.length ? years : [activeYear];
}

function getAvailableArchiveYearsV3() {
  try {
    const activeYear = getActiveYearV3Clean_();
    return jsonSafeV3Clean_({
      ok: true,
      activeYear: activeYear,
      years: getAvailableArchiveYearsV3Clean_(activeYear),
      source: 'ARCHIVE_* + ACTIVE_YEAR',
      readOnly: true,
      version: V3_CLEAN_VERSION
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      activeYear: Number(getActiveYearV3Clean_() || 0),
      years: [],
      source: 'ARCHIVE_* + ACTIVE_YEAR',
      readOnly: true,
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err)
    });
  }
}

function buildMetricYearTablesV3Clean_(activeYearInput) {
  const activeYear = Number(activeYearInput || getActiveYearV3Clean_());
  const years = getAvailableArchiveYearsV3Clean_(activeYear);
  const payloadByYear = {};
  const sourceByYear = {};
  years.forEach(function(y){
    payloadByYear[y] = y === activeYear ? buildActiveYearPayloadV3Clean_(y) : buildArchiveYearPayloadV3Clean_(y);
    sourceByYear[y] = payloadByYear[y].source;
  });
  const activeMonths = payloadByYear[activeYear].months || [];
  let ytdMonthLimit = 0;
  activeMonths.forEach(function(m){ if (m && m.hasData) ytdMonthLimit = Math.max(ytdMonthLimit, numberV3Clean_(m.bulan)); });
  ytdMonthLimit = ytdMonthLimit || 12;
  const metrics = [
    { key:'produksiKg', label:'Produksi', format:'kg' },
    { key:'penjualanRp', label:'Penjualan Buah', format:'rp' },
    { key:'biayaRp', label:'Biaya', format:'rp' },
    { key:'perawatanRp', label:'Perawatan (Babat + Tunas)', format:'rp' },
    { key:'pupukRp', label:'Pupuk', format:'rp' },
    { key:'labaRp', label:'Laba Bersih', format:'rp' },
    { key:'transferRp', label:'Transfer', format:'rp' },
    { key:'hppRpPerKg', label:'HPP / Kg', format:'rp' },
    { key:'hargaRataRpPerKg', label:'Harga Rata-rata', format:'rp' }
  ];
  const tables = {};
  metrics.forEach(function(metric){
    const rows = [];
    for (let m = 1; m <= 12; m++) {
      const values = {};
      years.forEach(function(y){
        const month = (payloadByYear[y].months || [])[m - 1] || {};
        values[y] = numberV3Clean_(month[metric.key]);
      });
      const activeMonth = (payloadByYear[activeYear].months || [])[m - 1] || {};
      const previousPayload = payloadByYear[activeYear - 1] || {};
      const previousMonth = (previousPayload.months || [])[m - 1] || {};
      // Untuk Perawatan/Pupuk, transaksi kategori yang kosong tidak boleh dianggap turun 100%.
      const activeMetricHasData = metricHasDataV3Clean_(activeMonth, metric.key);
      const previousMetricHasData = metricHasDataV3Clean_(previousMonth, metric.key);
      const yoy = yoyTextV3Clean_(values[activeYear], values[activeYear - 1], activeMetricHasData, previousMetricHasData, metric.key);
      rows.push({ bulan: m, bulan_nama: V3C.MONTHS[m], values: values, yoyText: yoy.text, yoyDirection: yoy.direction });
    }
    // COMPARISON_TOTAL_YTD_AVG_ORDER_SAFE:
    // Tampilkan tiga ringkasan berurutan: Total tahunan penuh, Total YTD,
    // lalu Avg YTD. Seluruh perhitungan tetap read-only.
    const annualTotalValues = {};
    const ytdTotalValues = {};
    const avgValues = {};
    years.forEach(function(y){
      annualTotalValues[y] = metricYtdValueV3Clean_(payloadByYear[y].months || [], metric.key, 12);
      ytdTotalValues[y] = metricYtdValueV3Clean_(payloadByYear[y].months || [], metric.key, ytdMonthLimit);
      avgValues[y] = ytdMonthLimit ? Math.round(numberV3Clean_(ytdTotalValues[y]) / ytdMonthLimit) : 0;
    });

    const activeAnnualHasData = metricYearHasDataV3Clean_(payloadByYear[activeYear], metric.key, 12);
    const previousAnnualHasData = metricYearHasDataV3Clean_(payloadByYear[activeYear - 1] || {}, metric.key, 12);
    const annualYoy = yoyTextV3Clean_(
      annualTotalValues[activeYear],
      annualTotalValues[activeYear - 1],
      activeAnnualHasData,
      previousAnnualHasData,
      metric.key
    );

    const activeYtdHasData = metricYearHasDataV3Clean_(payloadByYear[activeYear], metric.key, ytdMonthLimit);
    const previousYtdHasData = metricYearHasDataV3Clean_(payloadByYear[activeYear - 1] || {}, metric.key, ytdMonthLimit);
    const ytdYoy = yoyTextV3Clean_(
      ytdTotalValues[activeYear],
      ytdTotalValues[activeYear - 1],
      activeYtdHasData,
      previousYtdHasData,
      metric.key
    );

    tables[metric.key] = {
      key: metric.key, label: metric.label, format: metric.format, years: years,
      rows: rows,
      total: { values: annualTotalValues, yoyText: annualYoy.text, yoyDirection: annualYoy.direction, label: 'total' },
      totalYtd: { values: ytdTotalValues, yoyText: ytdYoy.text, yoyDirection: ytdYoy.direction, label: 'total YTD' },
      avg: { values: avgValues, label: 'Avg' },
      ytdMonthLimit: ytdMonthLimit
    };
  });
  return { activeYear: activeYear, years: years, metrics: metrics, defaultMetric: 'produksiKg', tables: tables, sourceByYear: sourceByYear, ytdMonthLimit: ytdMonthLimit, version: V3_CLEAN_VERSION };
}

function getPemupukanHistoryV3(year, month) {
  try {
    const activeYear = getActiveYearV3Clean_();
    const selectedYear = Number(year || activeYear);
    const selectedMonth = Number(month || 0);
    const isArchive = selectedYear !== activeYear;
    const raw = getObjectsV3Clean_(isArchive ? V3C.SHEETS.ARCHIVE_PEMUPUKAN : V3C.SHEETS.TX_PEMUPUKAN);
    const rows = normalizeDatasetV3Clean_({ penjualan: [], biaya: [], kas: [], pemupukan: raw }, selectedYear, isArchive).pemupukan
      .filter(function(r){ return !selectedMonth || Number(r.bulan) === selectedMonth; })
      .sort(function(a,b){ if (a.bulan !== b.bulan) return a.bulan - b.bulan; return String(a.tanggal_bukti).localeCompare(String(b.tanggal_bukti)); })
      .map(function(r){
        return Object.assign({}, r, {
          periode_tahun: selectedYear,
          periode_bulan: r.bulan,
          bulan_nama: V3C.MONTHS[r.bulan] || '',
          source: isArchive ? 'ARCHIVE_PEMUPUKAN' : 'TX_PEMUPUKAN',
          readOnly: isArchive
        });
      });
    return jsonSafeV3Clean_({
      ok: true,
      version: V3_CLEAN_VERSION,
      activeYear: activeYear,
      selectedYear: selectedYear,
      selectedMonth: selectedMonth,
      source: isArchive ? 'ARCHIVE_PEMUPUKAN' : 'TX_PEMUPUKAN',
      readOnly: isArchive,
      rows: rows,
      summary: summarizePemupukanHistoryV3Clean_(rows)
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, version: V3_CLEAN_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  }
}

function savePemupukanInputV3(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const activeYear = getActiveYearV3Clean_();
    const p = payload || {};
    const year = Number(p.periode_tahun || activeYear);
    const month = Number(p.periode_bulan || 0);
    const rows = Array.isArray(p.rows) ? p.rows : [];
    if (year !== activeYear) throw new Error('Simpan pemupukan ditolak. Tahun input bukan ACTIVE_YEAR.');
    if (month < 1 || month > 12) throw new Error('Bulan pemupukan tidak valid.');
    const now = new Date();
    const batchId = 'V3PUPUK_' + year + '_' + month + '_' + Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
    const txRows = [];
    rows.forEach(function(r, i){
      const jenis = cleanV3Clean_(r.jenis_pupuk || r.nama_pupuk || r.pupuk);
      const jumlah = numberV3Clean_(r.jumlah);
      const satuan = cleanV3Clean_(r.satuan);
      if (!jenis || !jumlah || !satuan) return;
      const dosis = numberDecimalV3Adapter_(r.dosis);
      txRows.push({
        tx_id: makeTxIdV3Clean_('PUPUK', batchId, i + 1),
        batch_id: batchId,
        status: 'active',
        periode_tahun: year,
        periode_bulan: month,
        tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti),
        jenis_pupuk: jenis,
        nama_pupuk: jenis,
        pupuk: jenis,
        dosis: dosis ? roundDecimalV3Clean_(dosis, 2) : '',
        satuan: satuan,
        jumlah: Math.round(jumlah),
        blok_area: cleanV3Clean_(r.blok_area || r.blok || r.area),
        keterangan: cleanV3Clean_(r.keterangan || ((V3C.MONTHS[month] || '') + ' - ' + jenis)),
        status_realisasi: normalizePemupukanStatusV3Clean_(r.status_realisasi || r.status_pemupukan || 'Selesai'),
        source_row: 'INPUT_PEMUPUKAN_V3',
        created_at: now,
        updated_at: now
      });
    });
    if (!txRows.length) throw new Error('Tidak ada baris pemupukan valid untuk disimpan.');
    appendObjectsToSheetV3Clean_(V3C.SHEETS.TX_PEMUPUKAN, txRows);
    logActivityV3Clean_('SAVE_PEMUPUKAN_INPUT_V3', { batch_id: batchId, rows: txRows.length, totalJumlah: txRows.reduce(function(a,r){ return a + numberV3Clean_(r.jumlah); }, 0) });
    return jsonSafeV3Clean_({ ok: true, severity: 'ok', version: V3_CLEAN_VERSION, message: 'Data pemupukan berhasil disimpan.', batch_id: batchId, rows: txRows.length, totalJumlah: txRows.reduce(function(a,r){ return a + numberV3Clean_(r.jumlah); }, 0) });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, severity: 'error', version: V3_CLEAN_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}


/**
 * ============================================================
 * TARGET PRODUKSI MANUAL V3 - SAFE ADD-ON
 * Prinsip:
 * - Modul tambahan, tidak mengubah TX_*.
 * - Target hanya untuk produksi mulai 2026 dst.
 * - Dashboard tetap aman walau target belum ada.
 * ============================================================
 */
function getTargetProduksiV3Safe_(year) {
  try {
    const y = Number(year || getActiveYearV3Clean_());
    const target = readTargetProduksiV3_(y, false);
    const snapshot = readTargetAnalysisSnapshotV3_(y, target, false);
    target.smartAnalysis = snapshot.analysis;
    target.analysisSnapshotAvailable = !!snapshot.available;
    target.analysisSnapshotUpdatedAt = snapshot.updatedAt || '';
    // Dashboard hanya membaca target final dan target bulanan yang sudah tersimpan.
    // Tidak ada forecast/model yang dihitung ulang pada pemuatan Dashboard.
    if (!Array.isArray(target.monthlyTargets) || target.monthlyTargets.length !== 12) {
      target.monthlyTargets = buildMonthlyTargetsFromFinalTargetV3_(target.target_kg || 0, snapshot.analysis);
    }
    target.smartVersion = target.smart_version || 'V3_TARGET_ANALYSIS_ON_DEMAND_SNAPSHOT_SAFE';
    target.dashboardReadMode = 'STORED_TARGET_ONLY';
    return jsonSafeV3Clean_(Object.assign({ ok: true, nonBlocking: true }, target));
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      nonBlocking: true,
      tahun: Number(year || 0),
      target_kg: 0,
      hasTarget: false,
      monthlyTargets: fallbackMonthlyTargetsV3_(0),
      smartAnalysis: null,
      analysisSnapshotAvailable: false,
      dashboardReadMode: 'STORED_TARGET_ONLY',
      message: err && err.message ? err.message : String(err)
    });
  }
}

function getTargetProduksiV3(year) {
  const y = Number(year || getActiveYearV3Clean_());
  const result = getTargetProduksiV3Safe_(y);
  // Menu Target boleh membaca snapshot sementara dari Script Properties
  // sebelum target final pertama kali disimpan. Dashboard tidak melakukan ini.
  if (!result.analysisSnapshotAvailable) {
    const snapshot = readTargetAnalysisSnapshotV3_(y, result, true);
    result.smartAnalysis = snapshot.analysis;
    result.analysisSnapshotAvailable = !!snapshot.available;
    result.analysisSnapshotUpdatedAt = snapshot.updatedAt || '';
  }
  return jsonSafeV3Clean_(result);
}

function analyzeTargetProduksiSmartV3(year) {
  const y = Number(year || getActiveYearV3Clean_());
  const analysis = analyzeTargetProduksiSmartV3_(y);
  try {
    const saved = persistTargetAnalysisSnapshotV3_(y, analysis);
    analysis.snapshotSaved = !!(saved && saved.ok);
    analysis.snapshotStorage = saved && saved.storage ? saved.storage : '';
    analysis.snapshotUpdatedAt = saved && saved.updatedAt ? saved.updatedAt : '';
    if (saved && saved.warning) analysis.snapshotWarning = saved.warning;
  } catch (snapshotErr) {
    analysis.snapshotSaved = false;
    analysis.snapshotStorage = '';
    analysis.snapshotWarning = snapshotErr && snapshotErr.message ? snapshotErr.message : String(snapshotErr);
  }
  return jsonSafeV3Clean_(analysis);
}


function targetAnalysisSnapshotPropertyKeyV3_(year) {
  return 'V3_TARGET_ANALYSIS_SNAPSHOT_' + Number(year || 0);
}

function parseTargetAnalysisSnapshotV3_(value) {
  if (!value) return null;
  if (typeof value === 'object') return value;
  try {
    const parsed = JSON.parse(String(value));
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    return null;
  }
}

function readTargetAnalysisSnapshotV3_(year, targetRow, allowPropertyFallback) {
  const y = Number(year || getActiveYearV3Clean_());
  const row = targetRow || readTargetProduksiV3_(y, false);
  let analysis = parseTargetAnalysisSnapshotV3_(row && row.analysis_snapshot_json);
  let updatedAt = row && row.analysis_updated_at ? row.analysis_updated_at : '';
  let storage = analysis ? 'TARGET_PRODUKSI' : '';
  if (!analysis && allowPropertyFallback === true) {
    try {
      const raw = PropertiesService.getScriptProperties().getProperty(targetAnalysisSnapshotPropertyKeyV3_(y));
      const holder = raw ? JSON.parse(raw) : null;
      analysis = holder && holder.analysis ? holder.analysis : null;
      updatedAt = holder && holder.updatedAt ? holder.updatedAt : updatedAt;
      if (analysis) storage = 'SCRIPT_PROPERTIES';
    } catch (e) {}
  }
  return { available: !!analysis, analysis: analysis || null, updatedAt: updatedAt || '', storage: storage };
}

function compactTargetAnalysisSnapshotV3_(analysis) {
  if (!analysis || typeof analysis !== 'object') return null;
  // Snapshot menyimpan semua data yang dipakai UI dan distribusi bulanan,
  // tetapi membuang properti sementara yang tidak diperlukan.
  return {
    ok: !!analysis.ok,
    nonBlocking: analysis.nonBlocking !== false,
    targetYear: Number(analysis.targetYear || 0),
    smartVersion: cleanV3Clean_(analysis.smartVersion || ''),
    mode: cleanV3Clean_(analysis.mode || ''),
    quality: cleanV3Clean_(analysis.quality || ''),
    yearsUsed: Array.isArray(analysis.yearsUsed) ? analysis.yearsUsed.slice(0, 5) : [],
    annuals: Array.isArray(analysis.annuals) ? analysis.annuals.slice(0, 5) : [],
    totalHistoryKg: numberV3Clean_(analysis.totalHistoryKg || 0),
    monthlyWeights: Array.isArray(analysis.monthlyWeights) ? analysis.monthlyWeights.slice(0, 12) : fallbackMonthlyWeightsV3_(),
    monthlyWeightPct: Array.isArray(analysis.monthlyWeightPct) ? analysis.monthlyWeightPct.slice(0, 12) : [],
    monthlyForecastKg: Array.isArray(analysis.monthlyForecastKg) ? analysis.monthlyForecastKg.slice(0, 12) : [],
    recommendations: analysis.recommendations || { conservative:0, normal:0, optimistic:0 },
    recommendedTargetKg: numberV3Clean_(analysis.recommendedTargetKg || 0),
    dominantModel: cleanV3Clean_(analysis.dominantModel || ''),
    models: Array.isArray(analysis.models) ? analysis.models.slice(0, 3) : [],
    anomalyCount: numberV3Clean_(analysis.anomalyCount || 0),
    uncertaintyPct: Number(analysis.uncertaintyPct || 0),
    modelDispersionPct: Number(analysis.modelDispersionPct || 0),
    weightingBasis: cleanV3Clean_(analysis.weightingBasis || ''),
    biasCorrectionPct: Number(analysis.biasCorrectionPct || 0),
    backtest: analysis.backtest || { available:false, periods:0, mape:null, maeKg:null, biasPct:null },
    note: cleanV3Clean_(analysis.note || ''),
    message: cleanV3Clean_(analysis.message || '')
  };
}

function persistTargetAnalysisSnapshotV3_(year, analysis) {
  const y = Number(year || getActiveYearV3Clean_());
  if (!analysis || !analysis.ok) throw new Error('TARGET_ANALYSIS_SNAPSHOT_INVALID');
  const now = new Date();
  const compact = compactTargetAnalysisSnapshotV3_(analysis);
  const json = JSON.stringify(compact);
  if (json.length > 45000) throw new Error('TARGET_ANALYSIS_SNAPSHOT_TOO_LARGE_FOR_SHEET');

  const sh = ensureTargetProduksiSheetV3_();
  const headers = getTargetProduksiHeadersV3_();
  let rowSaved = false;
  if (sh.getLastRow() >= 2) {
    const values = sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues();
    const yearCol = headers.indexOf('tahun');
    const statusCol = headers.indexOf('status');
    const jsonCol = headers.indexOf('analysis_snapshot_json') + 1;
    const atCol = headers.indexOf('analysis_updated_at') + 1;
    for (let i = values.length - 1; i >= 0; i--) {
      if (Number(values[i][yearCol] || 0) === y && normalizeTextV3Clean_(values[i][statusCol] || 'active') === 'active') {
        sh.getRange(i + 2, jsonCol).setValue(json);
        sh.getRange(i + 2, atCol).setValue(now);
        SpreadsheetApp.flush();
        rowSaved = String(sh.getRange(i + 2, jsonCol).getValue() || '') === json;
        break;
      }
    }
  }

  let propertySaved = false;
  let propertyWarning = '';
  try {
    const holder = JSON.stringify({ updatedAt: now.toISOString(), analysis: compact });
    // Script Properties memiliki batas ukuran per nilai; simpan hanya bila aman.
    if (holder.length <= 8500) {
      PropertiesService.getScriptProperties().setProperty(targetAnalysisSnapshotPropertyKeyV3_(y), holder);
      propertySaved = true;
    } else {
      propertyWarning = 'SNAPSHOT_PROPERTY_SKIPPED_SIZE_' + holder.length;
    }
  } catch (propErr) {
    propertyWarning = 'SNAPSHOT_PROPERTY_WARNING: ' + (propErr && propErr.message ? propErr.message : String(propErr));
  }

  if (!rowSaved && !propertySaved) throw new Error(propertyWarning || 'TARGET_ANALYSIS_SNAPSHOT_NOT_SAVED');
  return {
    ok:true,
    year:y,
    updatedAt:now.toISOString(),
    storage:rowSaved ? (propertySaved ? 'TARGET_PRODUKSI+SCRIPT_PROPERTIES' : 'TARGET_PRODUKSI') : 'SCRIPT_PROPERTIES',
    warning:propertyWarning
  };
}

function analyzeTargetProduksiSmartV3_(year) {
  try {
    const targetYear = Number(year || getActiveYearV3Clean_());
    const activeYear = getActiveYearV3Clean_();
    const minYear = targetYear - 5;
    const maxYear = targetYear - 1;
    const annuals = [];
    for (let y = minYear; y <= maxYear; y++) {
      let payload;
      try {
        payload = (y === activeYear) ? buildActiveYearPayloadV3Clean_(y) : buildArchiveYearPayloadV3Clean_(y);
      } catch (e) {
        payload = null;
      }
      const months = payload && payload.months ? payload.months : [];
      const monthly = [];
      let total = 0;
      for (let m = 1; m <= 12; m++) {
        const row = months[m - 1] || {};
        const kg = Math.max(0, numberV3Clean_(row.produksiKg || 0));
        monthly.push(kg);
        total += kg;
      }
      if (total > 0) annuals.push({ year:y, totalKg:Math.round(total), monthlyKg:monthly, source:y===activeYear?'TX_PENJUALAN':'ARCHIVE_PENJUALAN' });
    }

    const yearsUsed = annuals.map(function(x){ return x.year; });
    const nYears = annuals.length;
    if (!nYears) {
      return {
        ok:true, nonBlocking:true, targetYear:targetYear,
        smartVersion:'V3_TARGET_ENSEMBLE_MONTHLY_BACKTEST_SAFE',
        mode:'FALLBACK_FLAT_NO_HISTORY', quality:'rendah', yearsUsed:[], annuals:[],
        monthlyWeights:fallbackMonthlyWeightsV3_(), recommendations:{conservative:0,normal:0,optimistic:0},
        recommendedTargetKg:0, backtest:{available:false,mape:null,maeKg:null,biasPct:null,periods:0},
        models:[], dominantModel:'-', anomalyCount:0,
        note:'Histori produksi belum tersedia. Target tetap dapat diisi manual dan distribusi bulanan memakai rata-rata 12 bulan.'
      };
    }

    const rawMonthly = [];
    annuals.forEach(function(a){ (a.monthlyKg||[]).forEach(function(v){ rawMonthly.push(Math.max(0,numberV3Clean_(v))); }); });
    const cleanResult = cleanMonthlyAnomaliesV3_(rawMonthly);
    const cleanMonthly = cleanResult.values;

    const backtest = backtestTargetEnsembleV3_(cleanMonthly);
    const forecasts = forecastTargetModelsV3_(cleanMonthly, 12);
    const modelWeights = deriveEnsembleWeightsV3_(backtest.models, forecasts, nYears);
    const ensembleMonthly = combineForecastsV3_(forecasts, modelWeights, 12);
    const ensembleAnnual = Math.max(0, ensembleMonthly.reduce(function(a,b){ return a + numberV3Clean_(b); }, 0));

    const btMape = backtest.available ? Number(backtest.ensembleMape||0) : null;
    const modelAnnuals = ['weightedTrend','holtWinters','robustSeasonal'].map(function(k){
      return (forecasts[k]||[]).reduce(function(a,b){return a+Number(b||0);},0);
    }).filter(function(v){return isFinite(v)&&v>0;});
    const modelMin = modelAnnuals.length ? Math.min.apply(null,modelAnnuals) : ensembleAnnual;
    const modelMax = modelAnnuals.length ? Math.max.apply(null,modelAnnuals) : ensembleAnnual;
    const dispersionPct = ensembleAnnual>0 ? ((modelMax-modelMin)/(2*ensembleAnnual)*100) : 0;
    const baseUncertainty = backtest.available ? clampV3_(btMape, 3, 12) : (nYears >= 4 ? 8 : (nYears >= 2 ? 10 : 12));
    const uncertaintyPct = clampV3_(Math.max(baseUncertainty, dispersionPct), 3, 20);
    const biasCorrection = backtest.available ? clampV3_(-Number(backtest.ensembleBiasPct||0), -5, 5) : 0;
    const biasAdjustedAnnual = Math.max(0, ensembleAnnual * (1 + biasCorrection / 100));
    const recommendations = {
      conservative: roundToHundredV3_(biasAdjustedAnnual * (1 - uncertaintyPct / 100)),
      normal: roundToHundredV3_(biasAdjustedAnnual),
      optimistic: roundToHundredV3_(biasAdjustedAnnual * (1 + uncertaintyPct / 100))
    };

    const normalMonthly = normalizeMonthlyTargetArrayV3_(ensembleMonthly.map(function(v){
      return ensembleAnnual ? Math.round(v * recommendations.normal / ensembleAnnual) : 0;
    }), recommendations.normal);
    const monthlyWeights = recommendations.normal ? normalMonthly.map(function(v){ return v / recommendations.normal; }) : fallbackMonthlyWeightsV3_();

    let quality = 'rendah';
    if (backtest.available) {
      if (backtest.ensembleMape <= 7 && nYears >= 4) quality = 'tinggi';
      else if (backtest.ensembleMape <= 12 && nYears >= 3) quality = 'baik';
      else if (backtest.ensembleMape <= 18 && nYears >= 2) quality = 'sedang';
    } else if (nYears >= 3) quality = 'sedang';

    const modelRows = ['weightedTrend','holtWinters','robustSeasonal'].map(function(key){
      const bt = (backtest.models||[]).filter(function(x){ return x.key===key; })[0] || {};
      const fc = forecasts[key] || [];
      return {
        key:key,
        name:modelNameV3_(key),
        forecastKg:Math.round(fc.reduce(function(a,b){return a+numberV3Clean_(b);},0)),
        weightPct:Math.round(Number(modelWeights[key]||0) * 10000) / 100,
        mape:bt.mape == null ? null : Math.round(bt.mape*100)/100,
        biasPct:bt.biasPct == null ? null : Math.round(bt.biasPct*100)/100,
        periods:bt.periods||0
      };
    });
    modelRows.sort(function(a,b){ return b.weightPct-a.weightPct; });

    return {
      ok:true, nonBlocking:true, targetYear:targetYear,
      smartVersion:'V3_TARGET_ENSEMBLE_MONTHLY_BACKTEST_SAFE',
      mode:backtest.available?'ENSEMBLE_3_MODEL_MONTHLY_BACKTEST':('FALLBACK_'+nYears+'_YEAR_ADAPTIVE'), quality:quality,
      yearsUsed:yearsUsed, annuals:annuals,
      totalHistoryKg:Math.round(annuals.reduce(function(a,x){return a+x.totalKg;},0)),
      monthlyWeights:monthlyWeights,
      monthlyWeightPct:monthlyWeights.map(function(w){return Math.round(w*10000)/100;}),
      monthlyForecastKg:normalMonthly,
      recommendations:recommendations,
      recommendedTargetKg:recommendations.normal,
      dominantModel:modelRows.length?(modelRows[0].name+(backtest.available?'':' (fallback)')):'-',
      models:modelRows,
      anomalyCount:cleanResult.anomalyCount,
      uncertaintyPct:Math.round(uncertaintyPct*100)/100,
      modelDispersionPct:Math.round(dispersionPct*100)/100,
      weightingBasis:backtest.available?'Bobot berdasarkan inverse MAPE rolling backtest':('Bobot fallback adaptif untuk '+nYears+' tahun data'),
      biasCorrectionPct:Math.round(biasCorrection*100)/100,
      backtest:{
        available:backtest.available,
        periods:backtest.periods,
        mape:backtest.available?Math.round(backtest.ensembleMape*100)/100:null,
        maeKg:backtest.available?Math.round(backtest.ensembleMaeKg):null,
        biasPct:backtest.available?Math.round(backtest.ensembleBiasPct*100)/100:null
      },
      note:backtest.available?'Rekomendasi berasal dari ensemble 3 model bulanan dengan bobot rolling backtest. Anomali hanya diredam untuk analisis dan tidak mengubah data transaksi.':('Backtest belum cukup. Sistem memakai bobot fallback adaptif dan transparan untuk '+nYears+' tahun data; rentang ketidakpastian juga memperhitungkan selisih prediksi antar-model.')
    };
  } catch (err) {
    return { ok:false, nonBlocking:true, targetYear:Number(year||0), smartVersion:'V3_TARGET_ENSEMBLE_MONTHLY_BACKTEST_SAFE', mode:'ERROR_FALLBACK_FLAT', quality:'rendah', yearsUsed:[], annuals:[], monthlyWeights:fallbackMonthlyWeightsV3_(), recommendations:{conservative:0,normal:0,optimistic:0}, recommendedTargetKg:0, backtest:{available:false,periods:0,mape:null,maeKg:null,biasPct:null}, models:[], dominantModel:'-', anomalyCount:0, message:err&&err.message?err.message:String(err) };
  }
}

function modelNameV3_(key) {
  if (key === 'weightedTrend') return 'Tren Tahunan Berbobot';
  if (key === 'holtWinters') return 'Holt-Winters Musiman';
  if (key === 'robustSeasonal') return 'Tren Robust Musiman';
  return String(key || '-');
}

function medianV3_(arr) {
  const a = (arr||[]).map(Number).filter(function(v){return isFinite(v);}).sort(function(x,y){return x-y;});
  if (!a.length) return 0;
  const m = Math.floor(a.length/2);
  return a.length%2 ? a[m] : (a[m-1]+a[m])/2;
}

function cleanMonthlyAnomaliesV3_(series) {
  const src=(series||[]).map(function(v){return Math.max(0,numberV3Clean_(v));});
  const out=src.slice(); let count=0;
  for(let month=0;month<12;month++){
    const idx=[]; const vals=[];
    for(let i=month;i<src.length;i+=12){idx.push(i);vals.push(src[i]);}
    if(vals.length<3) continue;
    const med=medianV3_(vals);
    const mad=medianV3_(vals.map(function(v){return Math.abs(v-med);})) || Math.max(1,med*0.08);
    const limit=3.5*1.4826*mad;
    idx.forEach(function(pos){
      if(Math.abs(src[pos]-med)>limit){out[pos]=Math.max(0,Math.min(med+limit,Math.max(med-limit,src[pos])));count++;}
    });
  }
  return {values:out,anomalyCount:count};
}

function forecastTargetModelsV3_(series,horizon){
  return {
    weightedTrend:forecastWeightedTrendV3_(series,horizon),
    holtWinters:forecastHoltWintersV3_(series,horizon),
    robustSeasonal:forecastRobustSeasonalV3_(series,horizon)
  };
}

function forecastWeightedTrendV3_(series,horizon){
  const s=(series||[]).map(Number); const years=Math.floor(s.length/12);
  if(!years) return Array.from({length:horizon},function(){return 0;});
  const annual=[]; const monthlyByYear=[];
  for(let y=0;y<years;y++){
    const m=s.slice(y*12,y*12+12); monthlyByYear.push(m); annual.push(m.reduce(function(a,b){return a+b;},0));
  }
  const recent=annual.slice(Math.max(0,annual.length-5));
  const fixed=[0.09,0.13,0.18,0.25,0.35].slice(5-recent.length);
  const sumW=fixed.reduce(function(a,b){return a+b;},0)||1;
  const weights=fixed.map(function(w){return w/sumW;});
  let base=0; recent.forEach(function(v,i){base+=v*weights[i];});
  const yoy=[]; for(let i=1;i<annual.length;i++){if(annual[i-1]>0)yoy.push((annual[i]/annual[i-1])-1);}
  const trend=clampV3_(medianV3_(yoy)*100,-8,10)/100;
  const target=Math.max(0,base*(1+trend));
  const season=Array.from({length:12},function(_,m){
    let num=0,den=0;
    monthlyByYear.slice(Math.max(0,years-5)).forEach(function(row,idx){const w=idx+1;num+=numberV3Clean_(row[m])*w;den+=w;});
    return den?num/den:target/12;
  });
  const seasonSum=season.reduce(function(a,b){return a+b;},0)||1;
  return Array.from({length:horizon},function(_,i){return Math.max(0,target*season[i%12]/seasonSum);});
}

function forecastHoltWintersV3_(series,horizon){
  const s=(series||[]).map(function(v){return Math.max(0,Number(v)||0);});
  if(s.length<24) return forecastWeightedTrendV3_(s,horizon);
  const candidates=[0.2,0.4,0.6,0.8]; let best=null;
  candidates.forEach(function(alpha){[0.1,0.3,0.5].forEach(function(beta){[0.1,0.3,0.5,0.7].forEach(function(gamma){
    const fit=holtWintersFitV3_(s,alpha,beta,gamma,12);
    if(!best||fit.sse<best.sse)best={alpha:alpha,beta:beta,gamma:gamma,sse:fit.sse,fit:fit};
  });});});
  const f=best.fit, out=[];
  for(let h=1;h<=horizon;h++) out.push(Math.max(0,(f.level+h*f.trend)+(f.season[(f.index+h)%12]||0)));
  return out;
}

function holtWintersFitV3_(s,alpha,beta,gamma,period){
  let first=s.slice(0,period), second=s.slice(period,period*2);
  let level=first.reduce(function(a,b){return a+b;},0)/period;
  let trend=(second.reduce(function(a,b){return a+b;},0)-first.reduce(function(a,b){return a+b;},0))/(period*period);
  let season=first.map(function(v){return v-level;}); let sse=0;
  for(let t=period;t<s.length;t++){
    const si=t%period; const pred=level+trend+season[si]; const err=s[t]-pred; sse+=err*err;
    const prev=level; level=alpha*(s[t]-season[si])+(1-alpha)*(level+trend);
    trend=beta*(level-prev)+(1-beta)*trend;
    season[si]=gamma*(s[t]-level)+(1-gamma)*season[si];
  }
  return {level:level,trend:trend,season:season,sse:sse,index:s.length-1};
}

function forecastRobustSeasonalV3_(series,horizon){
  const s=(series||[]).map(function(v){return Math.max(0,Number(v)||0);});
  if(!s.length)return Array.from({length:horizon},function(){return 0;});
  const monthMedians=Array.from({length:12},function(_,m){const a=[];for(let i=m;i<s.length;i+=12)a.push(s[i]);return medianV3_(a);});
  const seasonMean=monthMedians.reduce(function(a,b){return a+b;},0)/12||1;
  const deseason=s.map(function(v,i){return v-(monthMedians[i%12]-seasonMean);});
  const slopes=[];
  for(let i=Math.max(0,deseason.length-36);i<deseason.length;i++){
    for(let j=i+1;j<deseason.length;j++) slopes.push((deseason[j]-deseason[i])/(j-i));
  }
  const slope=medianV3_(slopes);
  const intercept=medianV3_(deseason.map(function(v,i){return v-slope*i;}));
  return Array.from({length:horizon},function(_,h){const t=s.length+h;return Math.max(0,intercept+slope*t+(monthMedians[t%12]-seasonMean));});
}

function backtestTargetEnsembleV3_(series){
  const s=(series||[]).map(Number); const modelKeys=['weightedTrend','holtWinters','robustSeasonal'];
  const rows={}; modelKeys.forEach(function(k){rows[k]=[];});
  const minTrain=24;
  for(let cut=minTrain;cut+12<=s.length;cut+=12){
    const train=s.slice(0,cut), actual=s.slice(cut,cut+12);
    const fc=forecastTargetModelsV3_(train,12);
    modelKeys.forEach(function(k){
      const pred=(fc[k]||[]).reduce(function(a,b){return a+b;},0), act=actual.reduce(function(a,b){return a+b;},0);
      if(act>0)rows[k].push({pred:pred,actual:act,error:pred-act,ape:Math.abs(pred-act)/act*100});
    });
  }
  const models=modelKeys.map(function(k){
    const a=rows[k]; if(!a.length)return {key:k,periods:0,mape:null,maeKg:null,biasPct:null};
    const mape=a.reduce(function(x,r){return x+r.ape;},0)/a.length;
    const mae=a.reduce(function(x,r){return x+Math.abs(r.error);},0)/a.length;
    const bias=a.reduce(function(x,r){return x+(r.actual?r.error/r.actual*100:0);},0)/a.length;
    return {key:k,periods:a.length,mape:mape,maeKg:mae,biasPct:bias,rows:a};
  });
  const available=models.some(function(m){return m.periods>0;});
  if(!available)return {available:false,periods:0,models:models,ensembleMape:null,ensembleMaeKg:null,ensembleBiasPct:null};
  const weights=deriveEnsembleWeightsV3_(models,null, Math.max(0, Math.floor((series||[]).length/12)));
  const periods=Math.max.apply(null,models.map(function(m){return m.periods||0;})); const ensemble=[];
  for(let i=0;i<periods;i++){
    let pred=0,act=0,wSum=0;
    models.forEach(function(m){if(m.rows&&m.rows[i]){pred+=m.rows[i].pred*Number(weights[m.key]||0);act=m.rows[i].actual;wSum+=Number(weights[m.key]||0);}});
    if(wSum&&act>0){pred/=wSum;ensemble.push({pred:pred,actual:act,error:pred-act,ape:Math.abs(pred-act)/act*100});}
  }
  return {available:ensemble.length>0,periods:ensemble.length,models:models,
    ensembleMape:ensemble.length?ensemble.reduce(function(a,r){return a+r.ape;},0)/ensemble.length:null,
    ensembleMaeKg:ensemble.length?ensemble.reduce(function(a,r){return a+Math.abs(r.error);},0)/ensemble.length:null,
    ensembleBiasPct:ensemble.length?ensemble.reduce(function(a,r){return a+(r.error/r.actual*100);},0)/ensemble.length:null};
}

function deriveEnsembleWeightsV3_(models,forecasts,nYears){
  const keys=['weightedTrend','holtWinters','robustSeasonal'];
  const valid=(models||[]).filter(function(m){ return m && m.mape != null && isFinite(Number(m.mape)) && Number(m.periods||0)>0; });
  if (!valid.length) {
    // Fallback adaptif dan transparan ketika rolling backtest belum mungkin dilakukan.
    if (Number(nYears||0) <= 1) return {weightedTrend:0.70, holtWinters:0.05, robustSeasonal:0.25};
    if (Number(nYears||0) === 2) return {weightedTrend:0.50, holtWinters:0.15, robustSeasonal:0.35};
    return {weightedTrend:0.45, holtWinters:0.20, robustSeasonal:0.35};
  }
  const raw={}; let sum=0;
  keys.forEach(function(k){
    const m=(models||[]).filter(function(x){return x.key===k;})[0];
    const score=m&&m.mape!=null&&Number(m.periods||0)>0 ? 1/Math.max(2,Number(m.mape)) : 0;
    raw[k]=score; sum+=score;
  });
  if(!sum) return deriveEnsembleWeightsV3_([], forecasts, nYears);
  keys.forEach(function(k){raw[k]=raw[k]/sum;});
  return raw;
}

function combineForecastsV3_(forecasts,weights,horizon){
  const keys=['weightedTrend','holtWinters','robustSeasonal'];
  return Array.from({length:horizon},function(_,i){let v=0,w=0;keys.forEach(function(k){const x=numberV3Clean_((forecasts[k]||[])[i]);const wk=Number(weights[k]||0);v+=x*wk;w+=wk;});return Math.max(0,w?v/w:0);});
}


function saveTargetProduksiV3(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const p = payload || {};
    const year = Number(p.tahun || p.periode_tahun || getActiveYearV3Clean_());
    if (year < 2026) throw new Error('Target produksi hanya berlaku mulai tahun 2026.');
    const targetKg = numberV3Clean_(p.target_kg || p.targetKg || p.target || 0);
    if (targetKg <= 0) throw new Error('Target produksi wajib lebih dari 0 Kg.');
    const ket = cleanV3Clean_(p.keterangan || ('Target produksi tahun ' + year));
    const snapshot = readTargetAnalysisSnapshotV3_(year, null);
    const analysis = snapshot.analysis || null;
    const monthlyTargets = Array.isArray(p.monthlyTargets) && p.monthlyTargets.length === 12
      ? normalizeMonthlyTargetArrayV3_(p.monthlyTargets, targetKg)
      : buildMonthlyTargetsFromFinalTargetV3_(targetKg, analysis);
    const sh = ensureTargetProduksiSheetV3_();
    const headers = getTargetProduksiHeadersV3_();
    const values = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, headers.length).getValues() : [];
    const activeRowIndexes = [];
    for (let i = 0; i < values.length; i++) {
      const rowYear = Number(values[i][headers.indexOf('tahun')] || 0);
      const status = normalizeTextV3Clean_(values[i][headers.indexOf('status')] || 'active');
      if (rowYear === year && status === 'active') activeRowIndexes.push(i + 2);
    }
    // Pakai baris aktif terakhir sebagai baris kanonik; baris aktif ganda lama dinonaktifkan.
    let rowIndex = activeRowIndexes.length ? activeRowIndexes[activeRowIndexes.length - 1] : -1;
    const now = new Date();
    const rowObj = {
      tahun: year,
      target_kg: Math.round(targetKg),
      jan_kg: monthlyTargets[0], feb_kg: monthlyTargets[1], mar_kg: monthlyTargets[2], apr_kg: monthlyTargets[3],
      mei_kg: monthlyTargets[4], jun_kg: monthlyTargets[5], jul_kg: monthlyTargets[6], agu_kg: monthlyTargets[7],
      sep_kg: monthlyTargets[8], okt_kg: monthlyTargets[9], nov_kg: monthlyTargets[10], des_kg: monthlyTargets[11],
      target_source: cleanV3Clean_(p.target_source || p.targetSource || 'manual_final_smart_monthly'),
      recommendation_level: cleanV3Clean_(p.recommendation_level || p.recommendationLevel || ''),
      analysis_years: (analysis && analysis.yearsUsed ? analysis.yearsUsed.join(',') : ''),
      analysis_quality: analysis && analysis.quality ? analysis.quality : '',
      analysis_snapshot_json: analysis ? JSON.stringify(analysis) : '',
      analysis_updated_at: snapshot.updatedAt || '',
      smart_version: 'V3_TARGET_ANALYSIS_ON_DEMAND_SNAPSHOT_SAFE',
      keterangan: ket,
      status: 'active',
      created_at: now,
      updated_at: now
    };
    if (rowIndex > 0) {
      const old = sh.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
      rowObj.created_at = old[headers.indexOf('created_at')] || now;
      sh.getRange(rowIndex, 1, 1, headers.length).setValues([headers.map(function(h){ return Object.prototype.hasOwnProperty.call(rowObj, h) ? rowObj[h] : ''; })]);
    } else {
      sh.appendRow(headers.map(function(h){ return Object.prototype.hasOwnProperty.call(rowObj, h) ? rowObj[h] : ''; }));
      rowIndex = sh.getLastRow();
    }
    // Pastikan hanya ada satu target aktif untuk satu tahun.
    const statusCol = headers.indexOf('status') + 1;
    const updatedCol = headers.indexOf('updated_at') + 1;
    activeRowIndexes.forEach(function(idx){
      if (idx !== rowIndex) {
        sh.getRange(idx, statusCol).setValue('superseded');
        if (updatedCol > 0) sh.getRange(idx, updatedCol).setValue(now);
      }
    });
    SpreadsheetApp.flush();
    const verifiedTarget = readTargetProduksiV3_(year, false);
    const verifiedMonths = validateMonthlyTargetsV3_(verifiedTarget.monthlyTargets, targetKg);
    if (numberV3Clean_(verifiedTarget.target_kg) !== numberV3Clean_(targetKg)) throw new Error('TARGET_VERIFY_ANNUAL_MISMATCH');
    if (!verifiedMonths.ok) throw new Error('TARGET_VERIFY_MONTHLY_FAILED: ' + verifiedMonths.issues.join(','));
    ensureArchiveTargetProduksiSheetV3_();
    logActivityV3Clean_('SAVE_TARGET_PRODUKSI_SMART_V3', { tahun: year, target_kg: Math.round(targetKg), monthlyTargets: verifiedMonths.values, analysis: analysis ? { yearsUsed: analysis.yearsUsed || [], quality: analysis.quality || '', mode: analysis.mode || '' } : { snapshotAvailable:false }, keterangan: ket });
    return jsonSafeV3Clean_({
      ok: true,
      severity: 'ok',
      version: V3_CLEAN_VERSION,
      smartVersion: 'V3_TARGET_PRODUKSI_SMART_5_YEAR_READY_SAFE',
      message: 'Target produksi berhasil disimpan.',
      analysis: analysis,
      analysisSnapshotAvailable: !!analysis,
      target: verifiedTarget,
      verified: true,
      monthlyValidation: verifiedMonths
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, severity: 'error', version: V3_CLEAN_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function readTargetProduksiV3_(year, archive) {
  const y = Number(year || getActiveYearV3Clean_());
  const sheetName = archive ? V3C.SHEETS.ARCHIVE_TARGET_PRODUKSI : V3C.SHEETS.TARGET_PRODUKSI;
  const rows = getObjectsV3Clean_(sheetName).filter(function(r){
    const rowYear = Number(r.tahun || r.periode_tahun || r.closed_year || 0);
    const st = normalizeTextV3Clean_(r.status || (archive ? 'archived' : 'active'));
    return rowYear === y && (!archive || st === 'archived' || st === 'active') && (archive || st === 'active');
  });
  if (!rows.length) return { tahun: y, target_kg: 0, keterangan: '', hasTarget: false, source: sheetName, monthlyTargets: fallbackMonthlyTargetsV3_(0) };
  const r = rows[rows.length - 1];
  const targetKg = numberV3Clean_(r.target_kg || r.targetKg || r.target || 0);
  let monthly = readMonthlyTargetsFromRowV3_(r);
  const monthlyCheck = validateMonthlyTargetsV3_(monthly, targetKg);
  if (!monthlyCheck.ok && targetKg > 0) {
    const snap = parseTargetAnalysisSnapshotV3_(r.analysis_snapshot_json);
    monthly = buildMonthlyTargetsFromFinalTargetV3_(targetKg, snap);
  }
  else monthly = monthlyCheck.values;
  return {
    tahun: y,
    target_kg: targetKg,
    monthlyTargets: monthly,
    keterangan: cleanV3Clean_(r.keterangan),
    status: cleanV3Clean_(r.status || (archive ? 'archived' : 'active')),
    target_source: cleanV3Clean_(r.target_source || r.targetSource || ''),
    recommendation_level: cleanV3Clean_(r.recommendation_level || r.recommendationLevel || ''),
    analysis_years: cleanV3Clean_(r.analysis_years || ''),
    analysis_quality: cleanV3Clean_(r.analysis_quality || ''),
    analysis_snapshot_json: cleanV3Clean_(r.analysis_snapshot_json || ''),
    analysis_updated_at: r.analysis_updated_at || '',
    smart_version: cleanV3Clean_(r.smart_version || ''),
    updated_at: r.updated_at || '',
    created_at: r.created_at || '',
    hasTarget: targetKg > 0,
    source: sheetName
  };
}

function getTargetProduksiHeadersV3_() {
  return ['tahun','target_kg','jan_kg','feb_kg','mar_kg','apr_kg','mei_kg','jun_kg','jul_kg','agu_kg','sep_kg','okt_kg','nov_kg','des_kg','target_source','recommendation_level','analysis_years','analysis_quality','analysis_snapshot_json','analysis_updated_at','smart_version','keterangan','status','created_at','updated_at'];
}

function getArchiveTargetProduksiHeadersV3_() {
  return ['tahun','target_kg','jan_kg','feb_kg','mar_kg','apr_kg','mei_kg','jun_kg','jul_kg','agu_kg','sep_kg','okt_kg','nov_kg','des_kg','target_source','recommendation_level','analysis_years','analysis_quality','analysis_snapshot_json','analysis_updated_at','smart_version','keterangan','status','created_at','updated_at','archived_at','archive_version','closed_year','closed_to_year','close_year_batch_id'];
}

function fallbackMonthlyWeightsV3_() {
  const arr = [];
  for (let i = 0; i < 12; i++) arr.push(1 / 12);
  return arr;
}

function fallbackMonthlyTargetsV3_(annualTarget) {
  return normalizeMonthlyTargetArrayV3_(fallbackMonthlyWeightsV3_().map(function(w){ return Math.round(numberV3Clean_(annualTarget) * w); }), numberV3Clean_(annualTarget));
}

function buildMonthlyTargetsFromFinalTargetV3_(annualTarget, analysis) {
  const total = numberV3Clean_(annualTarget);
  if (!total) return fallbackMonthlyTargetsV3_(0);
  let weights = analysis && Array.isArray(analysis.monthlyWeights) && analysis.monthlyWeights.length === 12 ? analysis.monthlyWeights : fallbackMonthlyWeightsV3_();
  const s = weights.reduce(function(a,b){ return a + Number(b || 0); }, 0) || 1;
  weights = weights.map(function(w){ return Number(w || 0) / s; });
  return normalizeMonthlyTargetArrayV3_(weights.map(function(w){ return Math.round(total * w); }), total);
}

function normalizeMonthlyTargetArrayV3_(arr, annualTarget) {
  const total = Math.max(0, numberV3Clean_(annualTarget));
  let out = [];
  for (let i = 0; i < 12; i++) out.push(Math.max(0, numberV3Clean_(arr && arr[i])));
  let sum = out.reduce(function(a,b){ return a + b; }, 0);
  // Target tahunan positif wajib memiliki 12 target bulanan positif.
  // Bila array rusak/kosong, gunakan distribusi rata sebagai fallback aman.
  if (total > 0 && (sum <= 0 || out.some(function(v){ return v <= 0; }))) {
    const flat = Math.floor(total / 12);
    out = Array.from({length:12}, function(_,i){ return i === 11 ? total - flat * 11 : flat; });
    sum = total;
  }
  const diff = total - sum;
  out[11] = Math.max(0, numberV3Clean_(out[11]) + diff);
  return out;
}

function validateMonthlyTargetsV3_(arr, annualTarget) {
  const total = Math.max(0, numberV3Clean_(annualTarget));
  const values = Array.isArray(arr) ? arr.slice(0,12).map(function(v){ return Math.max(0, numberV3Clean_(v)); }) : [];
  const sum = values.reduce(function(a,b){ return a+b; },0);
  const issues = [];
  if (values.length !== 12) issues.push('MONTH_COUNT_NOT_12');
  if (total > 0 && values.some(function(v){ return v <= 0; })) issues.push('MONTH_ZERO_OR_NEGATIVE');
  if (sum !== total) issues.push('MONTH_TOTAL_MISMATCH');
  return {ok:issues.length===0, values:values, annualTarget:total, sum:sum, issues:issues};
}

function readMonthlyTargetsFromRowV3_(r) {
  return ['jan_kg','feb_kg','mar_kg','apr_kg','mei_kg','jun_kg','jul_kg','agu_kg','sep_kg','okt_kg','nov_kg','des_kg'].map(function(k){ return numberV3Clean_(r[k]); });
}

function getRecencyWeightsV3_(n) {
  const latestToOldest = [35,25,18,13,9].slice(0, Math.max(1, Math.min(5, Number(n || 1))));
  const sum = latestToOldest.reduce(function(a,b){ return a + b; }, 0);
  const oldestToLatest = latestToOldest.map(function(w){ return w / sum; }).reverse();
  return oldestToLatest;
}

function clampV3_(value, min, max) {
  const n = Number(value || 0);
  return Math.max(Number(min), Math.min(Number(max), n));
}

function roundToHundredV3_(value) {
  return Math.round(Number(value || 0) / 100) * 100;
}

function ensureTargetProduksiSheetV3_() {
  return ensureSheetWithHeadersV3Target_(V3C.SHEETS.TARGET_PRODUKSI, getTargetProduksiHeadersV3_());
}

function ensureArchiveTargetProduksiSheetV3_() {
  return ensureSheetWithHeadersV3Target_(V3C.SHEETS.ARCHIVE_TARGET_PRODUKSI, getArchiveTargetProduksiHeadersV3_());
}

function ensureSheetWithHeadersV3Target_(sheetName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(sheetName);
  if (!sh) sh = ss.insertSheet(sheetName);
  const wanted = headers.map(function(h){ return cleanV3Clean_(h); });
  if (sh.getLastRow() < 1 || sh.getLastColumn() < 1) {
    sh.getRange(1, 1, 1, wanted.length).setValues([wanted]);
  } else {
    const lastRow = sh.getLastRow();
    const lastCol = sh.getLastColumn();
    const oldHeaders = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function(h){ return cleanV3Clean_(h); });
    const sameOrder = oldHeaders.length >= wanted.length && wanted.every(function(h, i){ return oldHeaders[i] === h; });
    if (!sameOrder) {
      const oldValues = lastRow >= 2 ? sh.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];
      const remapped = oldValues.map(function(row){
        const obj = {};
        oldHeaders.forEach(function(h, i){ if (h) obj[h] = row[i]; });
        return wanted.map(function(h){ return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; });
      });
      sh.clearContents();
      sh.getRange(1, 1, 1, wanted.length).setValues([wanted]);
      if (remapped.length) sh.getRange(2, 1, remapped.length, wanted.length).setValues(remapped);
    }
  }
  try {
    sh.setFrozenRows(1);
    sh.getRange(1,1,1,wanted.length).setFontWeight('bold').setBackground('#087f3c').setFontColor('#ffffff');
  } catch(e) {}
  return sh;
}

function archiveTargetProduksiForCloseYearV3_(activeYear, nextYear, context) {
  try {
    const target = readTargetProduksiV3_(activeYear, false);
    if (!target || !target.hasTarget) return { ok: true, skipped: true, reason: 'TARGET_PRODUKSI_EMPTY', year: activeYear };
    const archiveSh = ensureArchiveTargetProduksiSheetV3_();
    const headers = getArchiveTargetProduksiHeadersV3_();
    const existing = getObjectsV3Clean_(V3C.SHEETS.ARCHIVE_TARGET_PRODUKSI).filter(function(r){
      return Number(r.tahun || r.closed_year || 0) === Number(activeYear);
    });
    if (existing.length) return { ok: true, skipped: true, reason: 'ARCHIVE_TARGET_ALREADY_EXISTS', year: activeYear, rows: existing.length };
    const now = new Date();
    const monthly = Array.isArray(target.monthlyTargets) && target.monthlyTargets.length === 12 ? target.monthlyTargets : fallbackMonthlyTargetsV3_(target.target_kg);
    const obj = {
      tahun: activeYear,
      target_kg: target.target_kg,
      jan_kg: monthly[0], feb_kg: monthly[1], mar_kg: monthly[2], apr_kg: monthly[3],
      mei_kg: monthly[4], jun_kg: monthly[5], jul_kg: monthly[6], agu_kg: monthly[7],
      sep_kg: monthly[8], okt_kg: monthly[9], nov_kg: monthly[10], des_kg: monthly[11],
      target_source: target.target_source || '',
      recommendation_level: target.recommendation_level || '',
      analysis_years: target.analysis_years || '',
      analysis_quality: target.analysis_quality || '',
      analysis_snapshot_json: target.analysis_snapshot_json || '',
      analysis_updated_at: target.analysis_updated_at || '',
      smart_version: target.smart_version || 'V3_TARGET_ENSEMBLE_MONTHLY_BACKTEST_SAFE',
      keterangan: target.keterangan,
      status: 'archived',
      created_at: target.created_at || '',
      updated_at: target.updated_at || '',
      archived_at: now,
      archive_version: V3_CLEAN_VERSION,
      closed_year: activeYear,
      closed_to_year: nextYear,
      close_year_batch_id: context && context.closeYearBatchId ? context.closeYearBatchId : ''
    };
    archiveSh.appendRow(headers.map(function(h){ return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; }));
    return { ok: true, skipped: false, year: activeYear, copied: 1, target_kg: target.target_kg };
  } catch (err) {
    return { ok: false, nonBlocking: true, year: activeYear, message: err && err.message ? err.message : String(err) };
  }
}

function getInputControlStateV3(monthInput) {
  try {
    const activeYear = getActiveYearV3Clean_();
    const month = Number(monthInput || 0);
    const selectedMonth = month >= 1 && month <= 12 ? month : getLatestActiveMonthV3Clean_(activeYear);
    const availability = getPanenAvailabilityV3Clean_(activeYear, selectedMonth);
    return jsonSafeV3Clean_({
      ok: true,
      version: V3_CLEAN_VERSION,
      activeYear: activeYear,
      selectedMonth: selectedMonth,
      selectedMonthName: V3C.MONTHS[selectedMonth] || '',
      panenAvailability: availability,
      locked: availability.locked,
      message: 'Kontrol input ACTIVE_YEAR siap.'
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, version: V3_CLEAN_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  }
}

function saveInputSheetV3(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const activeYear = getActiveYearV3Clean_();
    const p = payload || {};
    const year = Number(p.periode_tahun || activeYear);
    const month = Number(p.periode_bulan || 0);
    const panenKe = Number(p.panen_ke || 0);
    if (year !== activeYear) throw new Error('Simpan input ditolak. Tahun input bukan ACTIVE_YEAR.');
    if (month < 1 || month > 12) throw new Error('Bulan input tidak valid.');
    if ([1,2,3].indexOf(panenKe) === -1) throw new Error('Panen ke harus 1, 2, atau 3.');
    const bulanName = V3C.MONTHS[month] || '';
    const label = bulanName + ' PANEN ' + panenKe;
    if (hasExistingInputBatchV3Clean_(year, month, panenKe, label)) throw new Error('Data ' + label + ' sudah ada di TX aktif.');
    const now = new Date();
    const batchId = 'V3INPUT_' + year + '_' + month + '_PANEN' + panenKe + '_' + Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
    const tx = buildInputTxRowsV3Clean_(p, year, month, panenKe, cleanV3Clean_(p.tanggal_bukti), label, batchId, now);
    if (!tx.penjualan.length) throw new Error('Minimal satu baris panen valid wajib diisi.');
    appendObjectsToSheetV3Clean_(V3C.SHEETS.TX_PENJUALAN, tx.penjualan);
    appendObjectsToSheetV3Clean_(V3C.SHEETS.TX_BIAYA, tx.biaya);
    appendObjectsToSheetV3Clean_(V3C.SHEETS.TX_KAS, tx.kas);
    logActivityV3Clean_('SAVE_INPUT_TX_V3', { batch_id: batchId, label: label, rows: { penjualan: tx.penjualan.length, biaya: tx.biaya.length, kas: tx.kas.length }, total: tx.total });
    return jsonSafeV3Clean_({ ok: true, severity: 'ok', version: V3_CLEAN_VERSION, message: 'Data berhasil disimpan.', batch_id: batchId, batchLabel: label, rows: { penjualan: tx.penjualan.length, biaya: tx.biaya.length, kas: tx.kas.length }, total: tx.total });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, severity: 'error', version: V3_CLEAN_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function buildInputTxRowsV3Clean_(p, year, month, panenKe, tanggalBukti, label, batchId, now) {
  const penjualanRows = [];
  const biayaRows = [];
  const kasRows = [];
  const panen = Array.isArray(p.panen) ? p.panen : [];
  const biaya = Array.isArray(p.biaya) ? p.biaya : [];
  const kas = Array.isArray(p.kas) ? p.kas : [];
  let totalKg = 0, totalPenjualan = 0, totalBiaya = 0, totalKas = 0;
  panen.forEach(function(r, i){
    const kg = numberV3Clean_(r.panen_kg);
    const harga = numberV3Clean_(r.harga);
    if (kg <= 0 || harga <= 0) return;
    const jumlah = Math.round(kg * harga);
    totalKg += kg;
    totalPenjualan += jumlah;
    penjualanRows.push({ tx_id: makeTxIdV3Clean_('PNJ', batchId, i + 1), batch_id: batchId, status:'active', periode_tahun: year, periode_bulan: month, tanggal_bukti: tanggalBukti, panen_ke: panenKe, panen_kg: Math.round(kg), harga: Math.round(harga), jumlah: jumlah, keterangan: label, source_row: 'INPUT_SHEET_V3', created_at: now });
  });
  biaya.forEach(function(r, i){
    const nama = cleanV3Clean_(r.biaya);
    const jumlah = numberV3Clean_(r.jumlah);
    if (!nama || jumlah <= 0) return;
    const ket = cleanV3Clean_(r.keterangan || label);
    const kategori = categorizeBiayaV3Clean_(nama + ' ' + ket, r.kategori || 'panen');
    totalBiaya += Math.round(jumlah);
    biayaRows.push({ tx_id: makeTxIdV3Clean_('BYA', batchId, i + 1), batch_id: batchId, status:'active', periode_tahun: year, periode_bulan: month, tanggal_bukti: tanggalBukti, panen_ke: panenKe, kategori: kategori, biaya: nama, keterangan: ket, jumlah: Math.round(jumlah), source_row: 'INPUT_SHEET_V3', created_at: now });
  });
  kas.forEach(function(r, i){
    const jumlah = numberV3Clean_(r.jumlah);
    const jenis = normalizeJenisKasV3Clean_(r.jenis_kas);
    if (!jumlah || ['kas_masuk','pinjaman','potong_pinjaman','transfer'].indexOf(jenis) === -1) return;
    totalKas += Math.round(jumlah);
    kasRows.push({ tx_id: makeTxIdV3Clean_('KAS', batchId, i + 1), batch_id: batchId, status:'active', periode_tahun: year, periode_bulan: month, tanggal_bukti: tanggalBukti, panen_ke: panenKe, jenis_kas: jenis, keterangan: cleanV3Clean_(r.keterangan || (label + ' - ' + jenis)), jumlah: Math.round(jumlah), akun_sumber: '', akun_tujuan: '', source_row: 'INPUT_SHEET_V3', created_at: now });
  });
  return { penjualan: penjualanRows, biaya: biayaRows, kas: kasRows, total: { produksiKg: Math.round(totalKg), penjualanRp: Math.round(totalPenjualan), biayaRp: Math.round(totalBiaya), kasRp: Math.round(totalKas) } };
}

function getPanenAvailabilityV3Clean_(year, month) {
  const rows = [].concat(getObjectsV3Clean_(V3C.SHEETS.TX_PENJUALAN), getObjectsV3Clean_(V3C.SHEETS.TX_BIAYA), getObjectsV3Clean_(V3C.SHEETS.TX_KAS));
  const locked = { '1': false, '2': false, '3': false };
  const counts = { 1: 0, 2: 0, 3: 0, unknown: 0 };
  rows.forEach(function(r){
    if (!isRowForYearV3Clean_(r, year)) return;
    if (Number(r.periode_bulan || 0) !== Number(month)) return;
    const slot = extractPanenSlotV3Clean_(r);
    if ([1,2,3].indexOf(slot) !== -1) { locked[String(slot)] = true; counts[slot]++; }
    else counts.unknown++;
  });
  return { locked: locked, counts: counts, hasUnknownMonthData: counts.unknown > 0 };
}

function hasExistingInputBatchV3Clean_(year, month, panenKe, label) {
  const a = getPanenAvailabilityV3Clean_(year, month);
  if (a.locked && a.locked[String(panenKe)]) return true;
  const target = normalizeTextV3Clean_(label);
  const rows = [].concat(getObjectsV3Clean_(V3C.SHEETS.TX_PENJUALAN), getObjectsV3Clean_(V3C.SHEETS.TX_BIAYA), getObjectsV3Clean_(V3C.SHEETS.TX_KAS));
  return rows.some(function(r){
    if (!isRowForYearV3Clean_(r, year)) return false;
    if (Number(r.periode_bulan || 0) !== Number(month)) return false;
    if (extractPanenSlotV3Clean_(r) === Number(panenKe)) return true;
    const ket = normalizeTextV3Clean_(r.keterangan || '');
    return ket === target || ket.indexOf(target) !== -1;
  });
}

function buildInputSheetStateV3Clean_(year) {
  return { tahun: Number(year), months: V3C.MONTHS.map(function(n,i){ return i ? { value:i, label:n } : null; }).filter(Boolean) };
}

function buildRulesV3Clean_() {
  return { databaseAktifHanyaTxGoogleSheets: true, bulanInputAdalahAcuan: true, tanggalBuktiHanyaCatatan: true, arsipHanyaPerbandingan: true, dosisPemupukanDesimal: true };
}

function auditPayloadV3Clean_(total, data) {
  const issues = [];
  if (!total) issues.push('TOTAL_EMPTY');
  return { ok: issues.length === 0, severity: issues.length ? 'error' : 'ok', summary: total, rows: total ? total.rows : {}, issues: issues };
}


/**
 * FINAL QUALITY AUDIT V3 — read-only.
 * Memeriksa integrasi inti, konsistensi tahun, sheet wajib, data aktif,
 * aritmetika Dashboard, backup dua slot, dan trigger harian.
 * Tidak menulis TX_*, ARCHIVE_*, APP_CONFIG, atau file Drive.
 */
function runFullSystemAuditV3Safe() {
  const startedAt = new Date();
  const checks = [];
  const warnings = [];
  const issues = [];
  function push_(key, ok, message, detail) {
    const row = { key:key, ok:!!ok, message:String(message || ''), detail:detail || null };
    checks.push(row);
    if (!ok) issues.push(key + ': ' + row.message);
    return row;
  }
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const cfg = readConfigMapV3Clean_();
    const activeYear = Number(cfg.ACTIVE_YEAR || cfg.activeYear || 0);
    const currentYear = Number(cfg.CURRENT_YEAR || cfg.currentYear || activeYear || 0);
    push_('VERSION_SYNC', !!V3_CLEAN_VERSION && V3_CLEAN_VERSION.indexOf('V3_FINAL_OPERATIONAL_BASELINE_') === 0,
      'Versi runtime terdeteksi: ' + V3_CLEAN_VERSION);
    push_('ACTIVE_YEAR_VALID', activeYear >= 2024 && activeYear <= 2100,
      activeYear ? ('ACTIVE_YEAR ' + activeYear) : 'ACTIVE_YEAR tidak valid');
    push_('CURRENT_YEAR_SYNC', !currentYear || currentYear === activeYear,
      'ACTIVE_YEAR=' + activeYear + ', CURRENT_YEAR=' + currentYear);

    const requiredSheets = [
      V3C.SHEETS.TX_PENJUALAN,V3C.SHEETS.TX_BIAYA,V3C.SHEETS.TX_KAS,V3C.SHEETS.TX_PEMUPUKAN,
      V3C.SHEETS.ARCHIVE_PENJUALAN,V3C.SHEETS.ARCHIVE_BIAYA,V3C.SHEETS.ARCHIVE_KAS,V3C.SHEETS.ARCHIVE_PEMUPUKAN,
      V3C.SHEETS.APP_CONFIG,V3C.SHEETS.YEAR_STATUS,V3C.SHEETS.TARGET_PRODUKSI
    ];
    const missing = requiredSheets.filter(function(n){ return !ss.getSheetByName(n); });
    push_('REQUIRED_SHEETS', missing.length === 0,
      missing.length ? ('Sheet hilang: ' + missing.join(', ')) : (requiredSheets.length + ' sheet wajib tersedia'));

    V3_REQUEST_OBJECT_CACHE = {};
    let payload;
    try { payload = buildActiveYearPayloadV3Clean_(activeYear); }
    finally { V3_REQUEST_OBJECT_CACHE = null; }
    const total = payload && payload.total ? payload.total : {};
    const mathOk = Math.round(numberV3Clean_(total.labaRp)) === Math.round(numberV3Clean_(total.penjualanRp) - numberV3Clean_(total.biayaRp));
    push_('DASHBOARD_PAYLOAD', !!(payload && payload.ok && payload.source === 'TX_*'),
      payload ? ('Sumber=' + payload.source + ', tahun=' + payload.activeYear) : 'Payload kosong');
    push_('DASHBOARD_ARITHMETIC', mathOk,
      'Laba=' + Math.round(numberV3Clean_(total.labaRp)) + ', Penjualan-Biaya=' + Math.round(numberV3Clean_(total.penjualanRp)-numberV3Clean_(total.biayaRp)));

    let duplicate = {ok:true};
    try { duplicate = auditAllDuplicateTxIdV3Close_(activeYear); }
    catch (dupErr) { warnings.push('Audit duplikat tidak dapat dijalankan: ' + (dupErr.message || dupErr)); }
    push_('TX_ID_DUPLICATE', duplicate && duplicate.ok !== false,
      duplicate && duplicate.ok !== false ? 'Tidak ada konflik tx_id yang memblokir' : 'Konflik tx_id terdeteksi', duplicate);

    let target = null;
    try { target = getTargetProduksiV3Safe_(activeYear); }
    catch (targetErr) { target = {ok:false,message:targetErr.message || String(targetErr)}; }
    push_('TARGET_MODULE', !!(target && target.ok), target && target.ok ? 'Modul target dapat dibaca' : ((target && target.message) || 'Gagal membaca target'));

    let backup = null;
    try { backup = getBackupStatusV3Safe(); }
    catch (backupErr) { backup = {ok:false,message:backupErr.message || String(backupErr)}; }
    push_('BACKUP_FOLDER', !!(backup && backup.ok && backup.folder), backup && backup.ok ? 'Folder backup dapat diakses' : ((backup && backup.message) || 'Status backup gagal'));
    const latestOk = !!(backup && backup.latestAvailable && backup.latest && Number(backup.latest.sizeBytes || 0) > 0);
    push_('BACKUP_LATEST', latestOk, latestOk ? ('TERBARU tersedia, ' + backup.latest.sizeBytes + ' byte') : 'Slot TERBARU belum tersedia atau kosong');
    const triggerOk = !!(backup && backup.dailyTriggerVerified && Number(backup.triggerCount || 0) === 1);
    push_('DAILY_TRIGGER', triggerOk, triggerOk ? 'Satu trigger harian canonical aktif' : 'Trigger harian belum canonical/aktif');

    if (backup && backup.latest && backup.latest.ageHours != null && backup.latest.ageHours > 30) {
      warnings.push('Backup TERBARU berumur lebih dari 30 jam: ' + backup.latest.ageHours + ' jam.');
    }
    if (payload && !payload.hasData) warnings.push('TX_* tahun aktif ' + activeYear + ' masih kosong. Ini normal pada awal tahun, tetapi Tutup Buku berikutnya akan terkunci.');

    const elapsedMs = new Date().getTime() - startedAt.getTime();
    return jsonSafeV3Clean_({
      ok: issues.length === 0,
      status: issues.length ? 'PERLU_PERHATIAN' : (warnings.length ? 'AMAN_DENGAN_CATATAN' : 'AMAN_SEMPURNA'),
      severity: issues.length ? 'error' : (warnings.length ? 'warning' : 'ok'),
      version: V3_CLEAN_VERSION,
      activeYear: activeYear,
      checkedAt: Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'),
      elapsedMs: elapsedMs,
      checks: checks,
      issues: issues,
      warnings: warnings,
      readOnly: true,
      txTouched: false,
      archiveDataWritten: false,
      appConfigChanged: false
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok:false,status:'AUDIT_ERROR',severity:'error',version:V3_CLEAN_VERSION,
      message:err && err.message ? err.message : String(err),
      stack:err && err.stack ? err.stack : '',readOnly:true
    });
  }
}

function summarizePemupukanHistoryV3Clean_(rows) {
  const byJenis = {}, byStatus = {};
  let totalJumlah = 0;
  (rows || []).forEach(function(r){
    const jenis = r.jenis_pupuk || 'Lainnya';
    const status = r.status_realisasi || 'Tidak diisi';
    totalJumlah += numberV3Clean_(r.jumlah);
    byJenis[jenis] = (byJenis[jenis] || 0) + numberV3Clean_(r.jumlah);
    byStatus[status] = (byStatus[status] || 0) + 1;
  });
  return { rows: rows.length, totalJumlah: Math.round(totalJumlah), byJenis: byJenis, byStatus: byStatus };
}

function getLatestActiveMonthV3Clean_(year) {
  const payload = buildActiveYearPayloadV3Clean_(year);
  const active = (payload.months || []).filter(function(m){ return m.hasData; }).map(function(m){ return Number(m.bulan); });
  if (active.length) return Math.max.apply(null, active);
  return new Date().getMonth() + 1;
}

function getObjectsV3Clean_(sheetName) {
  const cacheKey = String(sheetName || '');
  if (V3_REQUEST_OBJECT_CACHE && Object.prototype.hasOwnProperty.call(V3_REQUEST_OBJECT_CACHE, cacheKey)) {
    return V3_REQUEST_OBJECT_CACHE[cacheKey];
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2 || sh.getLastColumn() < 1) {
    if (V3_REQUEST_OBJECT_CACHE) V3_REQUEST_OBJECT_CACHE[cacheKey] = [];
    return [];
  }
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
  const objects = values.slice(1).map(function(row){
    const obj = {};
    headers.forEach(function(h, i){ if (h) obj[h] = row[i]; });
    return obj;
  }).filter(function(obj){ return Object.keys(obj).some(function(k){ return obj[k] !== '' && obj[k] != null; }); });
  if (V3_REQUEST_OBJECT_CACHE) V3_REQUEST_OBJECT_CACHE[cacheKey] = objects;
  return objects;
}

function appendObjectsToSheetV3Clean_(sheetName, rows) {
  if (!rows || !rows.length) return 0;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh) throw new Error('Sheet tidak ditemukan: ' + sheetName);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function(h){ return cleanV3Clean_(h); });
  const values = rows.map(function(obj){ return headers.map(function(h){ return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; }); });
  sh.getRange(sh.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
  return values.length;
}

function readConfigMapV3Clean_() {
  const rows = getObjectsV3Clean_(V3C.SHEETS.APP_CONFIG);
  const map = {};
  rows.forEach(function(r){ const k = cleanV3Clean_(r.key); if (k) map[k] = r.value; });
  return map;
}

function isRowForYearV3Clean_(row, year) {
  const status = normalizeTextV3Clean_(row.status || 'active');
  return status === 'active' && Number(row.periode_tahun || row.tahun || row.year || 0) === Number(year);
}

function monthV3Clean_(value) { const n = Number(value || 0); return n >= 1 && n <= 12 ? n : 0; }
function cleanV3Clean_(value) { return String(value === null || typeof value === 'undefined' ? '' : value).trim(); }
function normalizeTextV3Clean_(value) { return cleanV3Clean_(value).toLowerCase().replace(/\u00a0/g,' ').replace(/_/g,' ').replace(/[^\w\s./-]/g,' ').replace(/\s+/g,' ').trim(); }

function numberV3Clean_(value) {
  if (typeof value === 'number') return isNaN(value) ? 0 : Math.round(value);
  if (value instanceof Date) return 0;
  let s = cleanV3Clean_(value).replace(/rp|kg/ig,'').replace(/\s/g,'').replace(/[^\d.,-]/g,'');
  if (!s) return 0;
  const hasComma = s.indexOf(',') !== -1;
  const hasDot = s.indexOf('.') !== -1;
  if (hasComma && hasDot) {
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g,'').replace(',', '.');
    else s = s.replace(/,/g,'');
  } else if (hasComma && !hasDot) {
    const parts = s.split(',');
    const thousands = parts.length > 1 && parts.slice(1).every(function(p){ return p.length === 3; });
    s = thousands ? s.replace(/,/g,'') : s.replace(',', '.');
  } else if (hasDot && !hasComma) {
    const parts = s.split('.');
    const thousands = parts.length > 1 && parts.slice(1).every(function(p){ return p.length === 3; });
    if (thousands) s = s.replace(/\./g,'');
  }
  const n = Number(s);
  return isNaN(n) ? 0 : Math.round(n);
}

function numberDecimalV3Adapter_(value) {
  if (value === null || typeof value === 'undefined' || value === '') return 0;
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (value instanceof Date) return 0;
  let s = cleanV3Clean_(value).replace(/rp|kg/ig,'').replace(/\s/g,'').replace(/[^\d.,-]/g,'');
  if (!s) return 0;
  const hasComma = s.indexOf(',') !== -1;
  const hasDot = s.indexOf('.') !== -1;
  if (hasComma && hasDot) {
    if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g,'').replace(',', '.');
    else s = s.replace(/,/g,'');
  } else if (hasComma && !hasDot) {
    s = s.replace(',', '.');
  }
  const n = Number(s);
  return isNaN(n) ? 0 : n;
}

function roundDecimalV3Clean_(value, decimals) {
  const p = Math.pow(10, Number(decimals || 2));
  return Math.round(Number(value || 0) * p) / p;
}

function formatDosisDisplayV3_(value) {
  const n = numberDecimalV3Adapter_(value);
  if (!n) return '';
  return String(roundDecimalV3Clean_(n, 2)).replace('.', ',');
}

function formatDateShortBackendV3_(value) {
  if (!value) return '';
  try {
    if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
      return Utilities.formatDate(value, Session.getScriptTimeZone() || 'Asia/Jakarta', 'dd/MM/yyyy');
    }
    const s = String(value).trim();
    if (!s) return '';
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return iso[3] + '/' + iso[2] + '/' + iso[1];
    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) return Utilities.formatDate(parsed, Session.getScriptTimeZone() || 'Asia/Jakarta', 'dd/MM/yyyy');
    return s;
  } catch (e) { return String(value); }
}

function categorizeBiayaV3Clean_(text, existingKategori) {
  const t = normalizeTextV3Clean_(text);
  if (/abu jangkos|pupuk abu|kcl abu|ongkos abu|premi abu|susun abu/.test(t)) return 'pupuk';
  if (/jangkos/.test(t)) return 'jangkos';
  if (/pupuk|urea|kcl|npk|dolomit|borate|borat|humat|humate|rock phosphate/.test(t)) return 'pupuk';
  if (/panen|brondolan|spsi|lansir|angkut|premi panen|ongkos mobil|upah panen/.test(t)) return 'panen';
  if (/babat/.test(t)) return 'babat';
  if (/tunas/.test(t)) return 'tunas';
  if (/batu|pasir|semen|paku|material/.test(t)) return 'batu';
  if (/bbm|solar|bensin|oli|service|servis|kir|hilux|mesin|alat|injektor|kabel|pln/.test(t)) return 'alat_bbm_mesin';
  return normalizeTextV3Clean_(existingKategori || 'serba_serbi').replace(/\s+/g,'_') || 'serba_serbi';
}

function normalizeJenisKasV3Clean_(value) {
  const k = normalizeTextV3Clean_(value).replace(/\s+/g,'_');
  if (['kas','kas_masuk','masuk','setor'].indexOf(k) !== -1) return 'kas_masuk';
  if (['kas_keluar','keluar'].indexOf(k) !== -1) return 'kas_keluar';
  if (k === 'transfer') return 'transfer';
  if (k === 'pinjaman') return 'pinjaman';
  if (['potong_pinjaman','potongpinjaman'].indexOf(k) !== -1) return 'potong_pinjaman';
  return k;
}

function emptyBiayaBreakdownV3Clean_() { return { panenRp:0, babatRp:0, tunasRp:0, pupukRp:0, jangkosRp:0, serbaRp:0, alatRp:0, batuRp:0, totalBiayaRp:0, rowsBiaya:0 }; }
function buildBiayaBreakdownV3Clean_(rows) {
  const out = emptyBiayaBreakdownV3Clean_();
  (rows || []).forEach(function(r){
    const jumlah = numberV3Clean_(r.jumlah);
    const kategori = normalizeTextV3Clean_(r.kategori || '').replace(/\s+/g,'_');
    const text = normalizeTextV3Clean_((r.biaya || '') + ' ' + (r.keterangan || ''));
    if (/babat/.test(text) || kategori === 'babat') out.babatRp += jumlah;
    else if (/tunas/.test(text) || kategori === 'tunas') out.tunasRp += jumlah;
    else if (/batu|pasir|semen|paku|material/.test(text) || kategori === 'batu') out.batuRp += jumlah;
    else if (kategori === 'pupuk') out.pupukRp += jumlah;
    else if (kategori === 'jangkos') out.jangkosRp += jumlah;
    else if (kategori === 'alat_bbm_mesin' || kategori === 'alat_bbm') out.alatRp += jumlah;
    else if (kategori === 'panen') out.panenRp += jumlah;
    else out.serbaRp += jumlah;
    out.rowsBiaya++;
  });
  out.totalBiayaRp = out.panenRp + out.babatRp + out.tunasRp + out.pupukRp + out.jangkosRp + out.serbaRp + out.alatRp + out.batuRp;
  return out;
}

function extractPanenSlotV3Clean_(row) {
  const direct = Number(row.panen_ke || 0);
  if ([1,2,3].indexOf(direct) !== -1) return direct;
  const text = normalizeTextV3Clean_([row.keterangan || '', row.tx_id || '', row.batch_id || '', row.source_row || ''].join(' '));
  const m = text.match(/panen\s*([123])/) || text.match(/panen([123])/);
  return m && m[1] ? Number(m[1]) : 0;
}

function normalizePemupukanStatusV3Clean_(value) {
  const t = normalizeTextV3Clean_(value);
  if (/rencana|plan/.test(t)) return 'Rencana';
  if (/tunda|pending/.test(t)) return 'Tunda';
  if (/batal|cancel/.test(t)) return 'Batal';
  return 'Selesai';
}

function hasTotalDataV3Clean_(t) { return !!(t && (t.produksiKg || t.penjualanRp || t.biayaRp || t.kasRp || t.transferRp || (t.rows && (t.rows.penjualan || t.rows.biaya || t.rows.kas || t.rows.pemupukan)))); }

function metricHasDataV3Clean_(month, key) {
  const m = month || {};
  if (key === 'perawatanRp' || key === 'pupukRp') return numberV3Clean_(m[key]) !== 0;
  return !!m.hasData;
}

function metricYearHasDataV3Clean_(payload, key, monthLimit) {
  const months = payload && Array.isArray(payload.months) ? payload.months : [];
  const limit = Math.max(1, Math.min(12, Number(monthLimit || 12)));
  if (key === 'perawatanRp' || key === 'pupukRp') {
    for (let i = 0; i < limit; i++) if (numberV3Clean_((months[i] || {})[key]) !== 0) return true;
    return false;
  }
  return !!(payload && payload.hasData);
}

function metricYtdValueV3Clean_(months, key, monthLimit) {
  const limit = Math.max(1, Math.min(12, Number(monthLimit || 12)));
  let produksi = 0, penjualan = 0, biaya = 0, total = 0;
  for (let i = 0; i < limit; i++) {
    const m = months[i] || {};
    produksi += numberV3Clean_(m.produksiKg);
    penjualan += numberV3Clean_(m.penjualanRp);
    biaya += numberV3Clean_(m.biayaRp);
    if (key !== 'hppRpPerKg' && key !== 'hargaRataRpPerKg') total += numberV3Clean_(m[key]);
  }
  if (key === 'hppRpPerKg') return produksi ? Math.round(biaya / produksi) : 0;
  if (key === 'hargaRataRpPerKg') return produksi ? Math.round(penjualan / produksi) : 0;
  return total;
}
function yoyTextV3Clean_(current, previous, currentHasData, previousHasData, metricKey) {
  const c = Number(current || 0), p = Number(previous || 0);
  if (currentHasData === false) return { text:'-', direction:'flat' };
  if (previousHasData === false) return { text:'-', direction:'flat' };
  if (!p) return { text:'-', direction:'flat' };
  if (p < 0) {
    if (c > 0) return { text: metricKey === 'labaRp' ? 'Balik Laba' : 'Balik Positif', direction:'up' };
    if (c < 0) return { text: metricKey === 'labaRp' ? 'Masih Rugi' : 'Masih Negatif', direction:'down' };
    return { text:'-', direction:'flat' };
  }
  if (p > 0 && c < 0 && metricKey === 'labaRp') return { text:'Turun Rugi', direction:'down' };
  const pct = ((c - p) / p) * 100;
  return { text:(pct > 0 ? '+' : '') + pct.toFixed(1).replace('.', ',') + '%', direction:pct > 0 ? 'up' : (pct < 0 ? 'down' : 'flat') };
}
function makeTxIdV3Clean_(prefix, batchId, no) { return prefix + '_' + batchId + '_' + ('000' + no).slice(-3); }
function jsonSafeV3Clean_(value) { return JSON.parse(JSON.stringify(value, function(k, v){ if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'); if (typeof v === 'undefined') return null; return v; })); }
function logActivityV3Clean_(action, detail) { try { const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(V3C.SHEETS.LOG_AKTIVITAS); if (!sh) return; const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(function(h){ return cleanV3Clean_(h); }); const obj = { timestamp: new Date(), action: action, detail: JSON.stringify(detail || {}), version: V3_CLEAN_VERSION }; sh.appendRow(headers.map(function(h){ return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : ''; })); } catch (e) { Logger.log('logActivityV3Clean_ gagal: ' + e); } }



/**
 * ============================================================
 * TAHAP 1 - AUDIT + PREVIEW TUTUP BUKU V3
 * MODE: READ ONLY / PREVIEW ONLY
 *
 * Prinsip:
 * - Tidak mengubah TX_*.
 * - Tidak menulis ARCHIVE_*.
 * - Tidak update APP_CONFIG ACTIVE_YEAR.
 * - Tidak membuat mode arsip lama.
 * - Mengikuti mekanisme V3 existing.
 * ============================================================
 */
function auditCloseYearReadinessV3() {
  try {
    const activeYear = getActiveYearV3Clean_();
    const nextYear = activeYear + 1;
    const blockingIssues = [];
    const warnings = [];
    const sheetPairs = getCloseYearSheetPairsV3_();
    const sheetAudit = {};
    const requiredSheets = [];

    sheetPairs.forEach(function(pair){
      requiredSheets.push(pair.tx);
      requiredSheets.push(pair.archive);
    });
    requiredSheets.push(V3C.SHEETS.APP_CONFIG);
    requiredSheets.push(V3C.SHEETS.LOG_AKTIVITAS);
    requiredSheets.push(V3C.SHEETS.YEAR_STATUS);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    requiredSheets.forEach(function(name){
      const sh = ss.getSheetByName(name);
      if (!sh) blockingIssues.push('SHEET_NOT_FOUND: ' + name);
    });

    sheetPairs.forEach(function(pair){
      const txHeaders = getSheetHeadersV3Close_(pair.tx);
      const archiveHeaders = getSheetHeadersV3Close_(pair.archive);
      const missingInArchive = txHeaders.filter(function(h){ return archiveHeaders.indexOf(h) === -1; });
      const criticalMissingTx = pair.required.filter(function(h){ return txHeaders.indexOf(h) === -1; });
      const criticalMissingArchive = pair.required.filter(function(h){ return archiveHeaders.indexOf(h) === -1; });
      const txRows = countRowsForYearV3Close_(pair.tx, activeYear);
      const archiveRows = countRowsForYearV3Close_(pair.archive, activeYear);

      if (!txHeaders.length) blockingIssues.push('HEADER_EMPTY_OR_SHEET_EMPTY: ' + pair.tx);
      if (!archiveHeaders.length) blockingIssues.push('HEADER_EMPTY_OR_SHEET_EMPTY: ' + pair.archive);
      if (missingInArchive.length) blockingIssues.push('ARCHIVE_HEADER_NOT_COMPATIBLE: ' + pair.archive + ' missing [' + missingInArchive.join(', ') + ']');
      if (criticalMissingTx.length) blockingIssues.push('TX_CRITICAL_HEADER_MISSING: ' + pair.tx + ' missing [' + criticalMissingTx.join(', ') + ']');
      if (criticalMissingArchive.length) blockingIssues.push('ARCHIVE_CRITICAL_HEADER_MISSING: ' + pair.archive + ' missing [' + criticalMissingArchive.join(', ') + ']');
      if (archiveRows > 0) blockingIssues.push('ARCHIVE_ALREADY_HAS_ACTIVE_YEAR_DATA: ' + pair.archive + ' tahun ' + activeYear + ' rows ' + archiveRows);

      sheetAudit[pair.key] = {
        txSheet: pair.tx,
        archiveSheet: pair.archive,
        txHeaders: txHeaders,
        archiveHeaders: archiveHeaders,
        missingInArchive: missingInArchive,
        criticalMissingTx: criticalMissingTx,
        criticalMissingArchive: criticalMissingArchive,
        txRowsActiveYear: txRows,
        archiveRowsActiveYear: archiveRows,
        headerCompatible: missingInArchive.length === 0 && criticalMissingTx.length === 0 && criticalMissingArchive.length === 0,
        archiveDuplicateRisk: archiveRows > 0
      };
    });

    const activeRows = {
      penjualan: sheetAudit.penjualan ? sheetAudit.penjualan.txRowsActiveYear : 0,
      biaya: sheetAudit.biaya ? sheetAudit.biaya.txRowsActiveYear : 0,
      kas: sheetAudit.kas ? sheetAudit.kas.txRowsActiveYear : 0,
      pemupukan: sheetAudit.pemupukan ? sheetAudit.pemupukan.txRowsActiveYear : 0
    };
    const totalActiveRows = activeRows.penjualan + activeRows.biaya + activeRows.kas + activeRows.pemupukan;
    if (!totalActiveRows) blockingIssues.push('TX_ACTIVE_YEAR_EMPTY: tidak ada data TX_* tahun ' + activeYear);

    const configStatus = getActiveYearConfigStatusV3Close_();
    if (!configStatus.ok) blockingIssues.push(configStatus.message);

    const dashboardPayload = buildActiveYearPayloadV3Clean_(activeYear);
    if (!dashboardPayload || !dashboardPayload.ok) blockingIssues.push('ACTIVE_YEAR_PAYLOAD_NOT_OK');

    let metricYearTablesOk = false;
    try {
      const metric = buildMetricYearTablesV3Clean_(activeYear);
      metricYearTablesOk = !!(metric && metric.tables && metric.years && metric.years.indexOf(activeYear) !== -1);
      if (!metricYearTablesOk) blockingIssues.push('METRIC_YEAR_TABLES_NOT_READY');
    } catch (metricErr) {
      blockingIssues.push('METRIC_YEAR_TABLES_ERROR: ' + (metricErr && metricErr.message ? metricErr.message : String(metricErr)));
    }

    const dosisAudit = auditPemupukanDecimalReadinessV3Close_(activeYear);
    if (!dosisAudit.ok) blockingIssues.push(dosisAudit.message);
    if (dosisAudit.warning) warnings.push(dosisAudit.warning);

    const duplicateAudit = auditAllDuplicateTxIdV3Close_(activeYear);
    if (!duplicateAudit.ok) {
      (duplicateAudit.issues || []).forEach(function(x){ blockingIssues.push(x); });
    }

    const archiveMetadataAudit = auditArchiveMetadataColumnsV3Close_();
    if (archiveMetadataAudit.warning) warnings.push(archiveMetadataAudit.warning);

    const ok = blockingIssues.length === 0;
    return jsonSafeV3Clean_({
      ok: ok,
      status: ok ? 'READY_FOR_CLOSE_YEAR_PREVIEW' : 'NOT_READY_FOR_CLOSE_YEAR',
      mode: 'READ_ONLY_AUDIT',
      version: V3_CLEAN_VERSION,
      stage: 'STAGE_2_CONFIRM_EXECUTION_SAFE',
      activeYear: activeYear,
      nextYear: nextYear,
      rows: activeRows,
      totalActiveRows: totalActiveRows,
      sheetAudit: sheetAudit,
      configStatus: configStatus,
      dashboardSummary: dashboardPayload ? (dashboardPayload.total || dashboardPayload.summary || {}) : {},
      dashboardRows: dashboardPayload ? (dashboardPayload.rows || {}) : {},
      metricYearTablesOk: metricYearTablesOk,
      dosisAudit: dosisAudit,
      duplicateTxIdAudit: duplicateAudit,
      archiveMetadataAudit: archiveMetadataAudit,
      blockingIssues: blockingIssues,
      warnings: warnings,
      safety: {
        readOnly: true,
        writesTx: false,
        writesArchive: false,
        updatesActiveYear: false,
        deletesRows: false,
        createsBackup: false,
        executionFunctionIncluded: true
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'AUDIT_ERROR',
      mode: 'READ_ONLY_AUDIT',
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  }
}

function previewCloseYearV3() {
  try {
    const audit = auditCloseYearReadinessV3();
    const activeYear = audit.activeYear || getActiveYearV3Clean_();
    const nextYear = activeYear + 1;
    const payload = buildActiveYearPayloadV3Clean_(activeYear);
    const summary = payload.total || payload.summary || {};
    const rows = payload.rows || audit.rows || {};
    const confirmText = 'TUTUP BUKU ' + activeYear + ' KE ' + nextYear;

    return jsonSafeV3Clean_({
      ok: !!(audit && audit.ok && payload && payload.ok),
      status: audit && audit.ok ? 'PREVIEW_READY' : 'PREVIEW_BLOCKED_BY_AUDIT',
      mode: 'PREVIEW_ONLY',
      version: V3_CLEAN_VERSION,
      stage: 'STAGE_2_CONFIRM_EXECUTION_SAFE',
      activeYear: activeYear,
      nextYear: nextYear,
      source: 'TX_* ACTIVE_YEAR',
      rows: rows,
      summary: {
        produksiKg: numberV3Clean_(summary.produksiKg),
        penjualanRp: numberV3Clean_(summary.penjualanRp),
        biayaRp: numberV3Clean_(summary.biayaRp),
        kasRp: numberV3Clean_(summary.kasRp),
        transferRp: numberV3Clean_(summary.transferRp),
        pinjamanRp: numberV3Clean_(summary.pinjamanRp),
        potongPinjamanRp: numberV3Clean_(summary.potongPinjamanRp),
        kasMasukRp: numberV3Clean_(summary.kasMasukRp),
        kasKeluarRp: numberV3Clean_(summary.kasKeluarRp),
        labaRp: numberV3Clean_(summary.labaRp),
        hppRpPerKg: numberV3Clean_(summary.hppRpPerKg),
        hargaRataRpPerKg: numberV3Clean_(summary.hargaRataRpPerKg),
        activeMonths: numberV3Clean_(summary.activeMonths)
      },
      audit: audit,
      requiredConfirmText: confirmText,
      note: 'Stage 2 aktif. Preview ini tetap read-only; eksekusi hanya berjalan jika tombol Eksekusi Tutup Buku ditekan dengan teks konfirmasi yang tepat.',
      safety: {
        readOnly: true,
        writesTx: false,
        writesArchive: false,
        updatesActiveYear: false,
        deletesRows: false,
        createsBackup: false,
        executionFunctionIncluded: true
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'PREVIEW_ERROR',
      mode: 'PREVIEW_ONLY',
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  }
}

function getCloseYearSheetPairsV3_() {
  return [
    { key: 'penjualan', tx: V3C.SHEETS.TX_PENJUALAN, archive: V3C.SHEETS.ARCHIVE_PENJUALAN, required: ['tx_id','status','periode_tahun','periode_bulan','panen_kg','harga','jumlah'] },
    { key: 'biaya', tx: V3C.SHEETS.TX_BIAYA, archive: V3C.SHEETS.ARCHIVE_BIAYA, required: ['tx_id','status','periode_tahun','periode_bulan','kategori','biaya','jumlah'] },
    { key: 'kas', tx: V3C.SHEETS.TX_KAS, archive: V3C.SHEETS.ARCHIVE_KAS, required: ['tx_id','status','periode_tahun','periode_bulan','jenis_kas','jumlah'] },
    { key: 'pemupukan', tx: V3C.SHEETS.TX_PEMUPUKAN, archive: V3C.SHEETS.ARCHIVE_PEMUPUKAN, required: ['tx_id','status','periode_tahun','periode_bulan','jenis_pupuk','dosis','satuan','jumlah'] }
  ];
}

function getSheetHeadersV3Close_(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastColumn() < 1) return [];
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function(h){ return cleanV3Clean_(h); }).filter(Boolean);
}

function countRowsForYearV3Close_(sheetName, year) {
  return getObjectsV3Clean_(sheetName).filter(function(r){ return isRowForYearV3Clean_(r, year); }).length;
}

function getActiveYearConfigStatusV3Close_() {
  try {
    const rows = getObjectsV3Clean_(V3C.SHEETS.APP_CONFIG);
    const activeRows = rows.filter(function(r){ return cleanV3Clean_(r.key) === 'ACTIVE_YEAR' || cleanV3Clean_(r.key) === 'activeYear'; });
    if (!activeRows.length) return { ok: false, message: 'APP_CONFIG_ACTIVE_YEAR_NOT_FOUND' };
    const activeYear = getActiveYearV3Clean_();
    if (!activeYear) return { ok: false, message: 'APP_CONFIG_ACTIVE_YEAR_INVALID' };
    return { ok: true, activeYear: activeYear, rows: activeRows.length };
  } catch (err) {
    return { ok: false, message: 'APP_CONFIG_CHECK_ERROR: ' + (err && err.message ? err.message : String(err)) };
  }
}

function auditPemupukanDecimalReadinessV3Close_(year) {
  try {
    const rows = getObjectsV3Clean_(V3C.SHEETS.TX_PEMUPUKAN).filter(function(r){ return isRowForYearV3Clean_(r, year); });
    let decimalRows = 0;
    let invalidRows = 0;
    let sample = null;
    rows.forEach(function(r){
      const raw = r.dosis;
      if (raw === '' || raw === null || typeof raw === 'undefined') return;
      const parsed = numberDecimalV3Adapter_(raw);
      if (isNaN(parsed)) invalidRows++;
      if (parsed && Math.round(parsed) !== parsed) {
        decimalRows++;
        if (!sample) sample = { raw: raw, parsed: parsed, display: formatDosisDisplayV3_(parsed) };
      }
    });
    if (invalidRows) return { ok: false, message: 'PEMUPUKAN_DOSIS_INVALID_ROWS: ' + invalidRows, rows: rows.length, decimalRows: decimalRows, sample: sample };
    return { ok: true, rows: rows.length, decimalRows: decimalRows, sample: sample, warning: decimalRows ? '' : 'Tidak ada dosis desimal terdeteksi di TX_PEMUPUKAN tahun aktif; parser desimal tetap tersedia.' };
  } catch (err) {
    return { ok: false, message: 'PEMUPUKAN_DOSIS_AUDIT_ERROR: ' + (err && err.message ? err.message : String(err)) };
  }
}


/**
 * ============================================================
 * TAHAP 2 - CONFIRM TUTUP BUKU + MULAI TAHUN BARU V3
 * MODE: EXECUTION SAFE
 *
 * Prinsip:
 * - Mengikuti sistem V3 existing, bukan membuat sistem baru.
 * - Audit Stage 1 wajib lulus sebelum eksekusi.
 * - Backup spreadsheet wajib berhasil sebelum tulis/hapus data.
 * - Copy TX_* ACTIVE_YEAR ke ARCHIVE_* dulu.
 * - Validasi arsip harus cocok sebelum TX_* lama dihapus.
 * - ACTIVE_YEAR dinaikkan paling akhir.
 * ============================================================
 */
function confirmCloseYearV3(confirmText) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const activeYear = getActiveYearV3Clean_();
    const nextYear = activeYear + 1;
    const requiredConfirmText = 'TUTUP BUKU ' + activeYear + ' KE ' + nextYear;
    const userConfirmText = cleanV3Clean_(confirmText);
    if (userConfirmText !== requiredConfirmText) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'CONFIRM_TEXT_INVALID',
        version: V3_CLEAN_VERSION,
        activeYear: activeYear,
        nextYear: nextYear,
        requiredConfirmText: requiredConfirmText,
        message: 'Teks konfirmasi tidak sesuai. Proses tutup buku dibatalkan.'
      });
    }

    const audit = auditCloseYearReadinessV3();
    if (!audit || !audit.ok) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'BLOCKED_BY_READINESS_AUDIT',
        version: V3_CLEAN_VERSION,
        activeYear: activeYear,
        nextYear: nextYear,
        audit: audit,
        message: 'Audit kesiapan belum lulus. Proses tutup buku dibatalkan.'
      });
    }

    const beforePayload = buildActiveYearPayloadV3Clean_(activeYear);
    const beforeSummary = beforePayload.total || beforePayload.summary || {};
    const beforeRows = beforePayload.rows || {};
    const beforeCounts = {
      penjualan: countRowsForYearV3Close_(V3C.SHEETS.TX_PENJUALAN, activeYear),
      biaya: countRowsForYearV3Close_(V3C.SHEETS.TX_BIAYA, activeYear),
      kas: countRowsForYearV3Close_(V3C.SHEETS.TX_KAS, activeYear),
      pemupukan: countRowsForYearV3Close_(V3C.SHEETS.TX_PEMUPUKAN, activeYear)
    };
    const totalBeforeRows = beforeCounts.penjualan + beforeCounts.biaya + beforeCounts.kas + beforeCounts.pemupukan;
    if (!totalBeforeRows) throw new Error('TX_ACTIVE_YEAR_EMPTY_BEFORE_EXECUTION');

    const backup = createCloseYearBackupV3_(activeYear, nextYear);
    if (!backup || !backup.ok) throw new Error('BACKUP_FAILED_BEFORE_CLOSE_YEAR');
    const closeYearBatchId = buildCloseYearBatchIdV3_(activeYear, nextYear);
    const closeYearContext = buildCloseYearContextV3_(activeYear, nextYear, closeYearBatchId, backup);
    logActivityV3Clean_('CLOSE_YEAR_BACKUP_CREATED_V3', { fromYear: activeYear, toYear: nextYear, backup: backup, closeYearBatchId: closeYearBatchId });

    const copyResult = copyActiveYearTxToArchiveV3_(activeYear, closeYearContext);
    logActivityV3Clean_('CLOSE_YEAR_ARCHIVE_COPIED_V3', { fromYear: activeYear, toYear: nextYear, closeYearBatchId: closeYearBatchId, copyResult: copyResult });

    const targetArchiveResult = archiveTargetProduksiForCloseYearV3_(activeYear, nextYear, closeYearContext);
    logActivityV3Clean_('CLOSE_YEAR_TARGET_PRODUKSI_ARCHIVE_V3', { fromYear: activeYear, toYear: nextYear, closeYearBatchId: closeYearBatchId, targetArchiveResult: targetArchiveResult });

    const archiveValidation = validateArchiveAfterCopyV3_(activeYear, beforeSummary, beforeCounts);
    if (!archiveValidation.ok) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'ERROR_ARCHIVE_VALIDATION_FAILED_TX_NOT_CLEARED',
        version: V3_CLEAN_VERSION,
        activeYear: activeYear,
        nextYear: nextYear,
        backup: backup,
        copyResult: copyResult,
        targetArchiveResult: targetArchiveResult,
        archiveValidation: archiveValidation,
        message: 'Arsip sudah dicopy tetapi validasi gagal. TX_* tidak dihapus dan ACTIVE_YEAR tidak diubah.'
      });
    }

    const clearResult = clearActiveYearTxRowsV3_(activeYear);
    logActivityV3Clean_('CLOSE_YEAR_TX_CLEARED_V3', { fromYear: activeYear, toYear: nextYear, clearResult: clearResult });

    const clearValidation = validateTxClearedForYearV3_(activeYear);
    if (!clearValidation.ok) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'ERROR_TX_CLEAR_VALIDATION_FAILED_ACTIVE_YEAR_NOT_UPDATED',
        version: V3_CLEAN_VERSION,
        activeYear: activeYear,
        nextYear: nextYear,
        backup: backup,
        copyResult: copyResult,
        targetArchiveResult: targetArchiveResult,
        archiveValidation: archiveValidation,
        clearResult: clearResult,
        clearValidation: clearValidation,
        message: 'TX_* tahun lama belum bersih. ACTIVE_YEAR tidak diubah.'
      });
    }

    const configUpdate = setActiveYearConfigV3Close_(nextYear, activeYear, closeYearBatchId, backup);
    logActivityV3Clean_('ACTIVE_YEAR_UPDATED_AFTER_CLOSE_YEAR_V3', { fromYear: activeYear, toYear: nextYear, closeYearBatchId: closeYearBatchId, configUpdate: configUpdate });

    const finalValidation = validateCloseYearFinalStateV3_(activeYear, nextYear, beforeSummary, beforeCounts);
    const ok = !!finalValidation.ok;
    logActivityV3Clean_('CONFIRM_CLOSE_YEAR_V3', {
      status: ok ? 'OK_CLOSE_YEAR_DONE' : 'ERROR_CLOSE_YEAR_FINAL_VALIDATION',
      fromYear: activeYear,
      toYear: nextYear,
      rowsArchived: beforeCounts,
      summary: beforeSummary,
      backup: backup,
      closeYearBatchId: closeYearBatchId,
      finalValidation: finalValidation,
      targetArchiveResult: targetArchiveResult
    });

    return jsonSafeV3Clean_({
      ok: ok,
      status: ok ? 'OK_CLOSE_YEAR_DONE' : 'ERROR_CLOSE_YEAR_FINAL_VALIDATION',
      version: V3_CLEAN_VERSION,
      activeYearBefore: activeYear,
      activeYearAfter: getActiveYearV3Clean_(),
      nextYear: nextYear,
      closeYearBatchId: closeYearBatchId,
      backup: backup,
      beforeRows: beforeRows,
      beforeCounts: beforeCounts,
      beforeSummary: normalizeCloseYearSummaryV3_(beforeSummary),
      copyResult: copyResult,
      targetArchiveResult: targetArchiveResult,
      archiveValidation: archiveValidation,
      clearResult: clearResult,
      clearValidation: clearValidation,
      configUpdate: configUpdate,
      finalValidation: finalValidation,
      message: ok ? 'Tutup buku berhasil. Tahun baru sudah aktif.' : 'Tutup buku selesai sebagian, tetapi audit final belum lulus.'
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'CONFIRM_CLOSE_YEAR_ERROR',
      version: V3_CLEAN_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function createCloseYearBackupV3_(activeYear, nextYear) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const file = DriveApp.getFileById(ss.getId());
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd_HHmmss');
  const name = 'BACKUP_BEFORE_CLOSE_YEAR_V3_' + activeYear + '_TO_' + nextYear + '_' + stamp;
  let copy;
  const parents = file.getParents();
  if (parents && parents.hasNext()) copy = file.makeCopy(name, parents.next());
  else copy = file.makeCopy(name);
  return { ok: true, name: name, fileId: copy.getId(), url: copy.getUrl(), createdAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss') };
}

function copyActiveYearTxToArchiveV3_(year, context) {
  const pairs = getCloseYearSheetPairsV3_();
  const result = {};
  pairs.forEach(function(pair){
    const rows = getObjectsV3Clean_(pair.tx).filter(function(r){ return isRowForYearV3Clean_(r, year); });
    const copiedRows = rows.map(function(r){ return normalizeCloseYearCopyRowV3_(r, pair.key, context); });
    appendObjectsToSheetV3Clean_(pair.archive, copiedRows);
    result[pair.key] = {
      txSheet: pair.tx,
      archiveSheet: pair.archive,
      copied: copiedRows.length,
      closeYearBatchId: context && context.closeYearBatchId ? context.closeYearBatchId : ''
    };
  });
  return result;
}

function normalizeCloseYearCopyRowV3_(row, key, context) {
  const out = Object.assign({}, row);
  out.status = cleanV3Clean_(out.status || 'active');
  if (key === 'pemupukan' && Object.prototype.hasOwnProperty.call(out, 'dosis')) {
    const dosis = numberDecimalV3Adapter_(out.dosis);
    out.dosis = dosis ? roundDecimalV3Clean_(dosis, 2) : '';
  }
  const ctx = context || {};
  if (ctx.archivedAt) out.archived_at = ctx.archivedAt;
  if (ctx.version) out.archive_version = ctx.version;
  if (ctx.archiveSource) out.archive_source = ctx.archiveSource;
  if (ctx.closedYear) out.closed_year = ctx.closedYear;
  if (ctx.closedToYear) out.closed_to_year = ctx.closedToYear;
  if (ctx.closeYearBatchId) out.close_year_batch_id = ctx.closeYearBatchId;
  return out;
}

function validateArchiveAfterCopyV3_(year, beforeSummary, beforeCounts) {
  const issues = [];
  const archiveCounts = {
    penjualan: countRowsForYearV3Close_(V3C.SHEETS.ARCHIVE_PENJUALAN, year),
    biaya: countRowsForYearV3Close_(V3C.SHEETS.ARCHIVE_BIAYA, year),
    kas: countRowsForYearV3Close_(V3C.SHEETS.ARCHIVE_KAS, year),
    pemupukan: countRowsForYearV3Close_(V3C.SHEETS.ARCHIVE_PEMUPUKAN, year)
  };
  Object.keys(beforeCounts).forEach(function(k){
    if (Number(archiveCounts[k] || 0) !== Number(beforeCounts[k] || 0)) issues.push('ARCHIVE_ROW_MISMATCH_' + k + ': expected ' + beforeCounts[k] + ' got ' + archiveCounts[k]);
  });
  const archivePayload = buildArchiveYearPayloadV3Clean_(year);
  const archiveSummary = archivePayload.total || archivePayload.summary || {};
  compareCloseYearSummaryV3_(beforeSummary, archiveSummary).forEach(function(x){ issues.push(x); });
  const dosisValidation = validatePemupukanDosisCopiedV3_(year);
  if (!dosisValidation.ok) issues.push(dosisValidation.message);
  return { ok: issues.length === 0, year: year, archiveCounts: archiveCounts, archiveSummary: normalizeCloseYearSummaryV3_(archiveSummary), dosisValidation: dosisValidation, issues: issues };
}

function validatePemupukanDosisCopiedV3_(year) {
  try {
    const txRows = getObjectsV3Clean_(V3C.SHEETS.TX_PEMUPUKAN).filter(function(r){ return isRowForYearV3Clean_(r, year); });
    const arRows = getObjectsV3Clean_(V3C.SHEETS.ARCHIVE_PEMUPUKAN).filter(function(r){ return isRowForYearV3Clean_(r, year); });
    const arById = {};
    arRows.forEach(function(r){ arById[cleanV3Clean_(r.tx_id)] = r; });
    let checked = 0;
    for (let i = 0; i < txRows.length; i++) {
      const tx = txRows[i];
      const id = cleanV3Clean_(tx.tx_id);
      const ar = arById[id];
      if (!ar) return { ok: false, message: 'PEMUPUKAN_ARCHIVE_ROW_NOT_FOUND_FOR_TX_ID: ' + id };
      const a = numberDecimalV3Adapter_(tx.dosis);
      const b = numberDecimalV3Adapter_(ar.dosis);
      if (Math.abs(a - b) > 0.000001) return { ok: false, message: 'PEMUPUKAN_DOSIS_MISMATCH_TX_ID: ' + id + ' expected ' + a + ' got ' + b };
      checked++;
    }
    return { ok: true, checked: checked };
  } catch (err) {
    return { ok: false, message: 'PEMUPUKAN_DOSIS_COPY_VALIDATION_ERROR: ' + (err && err.message ? err.message : String(err)) };
  }
}

function compareCloseYearSummaryV3_(beforeSummary, afterSummary) {
  const keys = ['produksiKg','penjualanRp','biayaRp','kasRp','transferRp','pinjamanRp','potongPinjamanRp','kasMasukRp','kasKeluarRp','labaRp','hppRpPerKg','hargaRataRpPerKg'];
  const issues = [];
  keys.forEach(function(k){
    const a = numberV3Clean_(beforeSummary && beforeSummary[k]);
    const b = numberV3Clean_(afterSummary && afterSummary[k]);
    if (a !== b) issues.push('ARCHIVE_SUMMARY_MISMATCH_' + k + ': expected ' + a + ' got ' + b);
  });
  return issues;
}

function normalizeCloseYearSummaryV3_(summary) {
  summary = summary || {};
  return {
    produksiKg: numberV3Clean_(summary.produksiKg),
    penjualanRp: numberV3Clean_(summary.penjualanRp),
    biayaRp: numberV3Clean_(summary.biayaRp),
    kasRp: numberV3Clean_(summary.kasRp),
    transferRp: numberV3Clean_(summary.transferRp),
    pinjamanRp: numberV3Clean_(summary.pinjamanRp),
    potongPinjamanRp: numberV3Clean_(summary.potongPinjamanRp),
    kasMasukRp: numberV3Clean_(summary.kasMasukRp),
    kasKeluarRp: numberV3Clean_(summary.kasKeluarRp),
    labaRp: numberV3Clean_(summary.labaRp),
    hppRpPerKg: numberV3Clean_(summary.hppRpPerKg),
    hargaRataRpPerKg: numberV3Clean_(summary.hargaRataRpPerKg),
    rows: summary.rows || {}
  };
}

function clearActiveYearTxRowsV3_(year) {
  const pairs = getCloseYearSheetPairsV3_();
  const result = {};
  pairs.forEach(function(pair){
    result[pair.key] = { sheet: pair.tx, deleted: deleteRowsForYearV3Close_(pair.tx, year) };
  });
  return result;
}

function deleteRowsForYearV3Close_(sheetName, year) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
  const yearIdx = headers.indexOf('periode_tahun') !== -1 ? headers.indexOf('periode_tahun') : headers.indexOf('tahun');
  const statusIdx = headers.indexOf('status');
  if (yearIdx === -1) throw new Error('YEAR_HEADER_NOT_FOUND_FOR_DELETE: ' + sheetName);
  let deleted = 0;
  for (let r = values.length - 1; r >= 1; r--) {
    const row = values[r];
    const rowYear = Number(row[yearIdx] || 0);
    const status = statusIdx >= 0 ? normalizeTextV3Clean_(row[statusIdx] || 'active') : 'active';
    if (rowYear === Number(year) && status === 'active') {
      sh.deleteRow(r + 1);
      deleted++;
    }
  }
  return deleted;
}

function validateTxClearedForYearV3_(year) {
  const counts = {
    penjualan: countRowsForYearV3Close_(V3C.SHEETS.TX_PENJUALAN, year),
    biaya: countRowsForYearV3Close_(V3C.SHEETS.TX_BIAYA, year),
    kas: countRowsForYearV3Close_(V3C.SHEETS.TX_KAS, year),
    pemupukan: countRowsForYearV3Close_(V3C.SHEETS.TX_PEMUPUKAN, year)
  };
  const total = counts.penjualan + counts.biaya + counts.kas + counts.pemupukan;
  return { ok: total === 0, year: year, counts: counts, total: total };
}

function setActiveYearConfigV3Close_(nextYear, oldYear, closeYearBatchId, backup) {
  const activeUpdate = upsertAppConfigValueV3Close_('ACTIVE_YEAR', Number(nextYear));
  const metadataUpdate = updateCloseYearMetadataConfigV3_(oldYear, nextYear, closeYearBatchId, backup);
  return { ok: true, activeYear: Number(nextYear), activeUpdate: activeUpdate, metadataUpdate: metadataUpdate };
}

function validateCloseYearFinalStateV3_(oldYear, nextYear, beforeSummary, beforeCounts) {
  const issues = [];
  const activeYearNow = getActiveYearV3Clean_();
  if (activeYearNow !== Number(nextYear)) issues.push('ACTIVE_YEAR_NOT_UPDATED: expected ' + nextYear + ' got ' + activeYearNow);
  const txCleared = validateTxClearedForYearV3_(oldYear);
  if (!txCleared.ok) issues.push('TX_OLD_YEAR_NOT_EMPTY');
  const archiveValidation = validateArchiveAfterCopyV3_(oldYear, beforeSummary, beforeCounts);
  if (!archiveValidation.ok) archiveValidation.issues.forEach(function(x){ issues.push(x); });
  let metricOk = false;
  try {
    const metric = buildMetricYearTablesV3Clean_(nextYear);
    metricOk = !!(metric && metric.tables && metric.years && metric.years.indexOf(oldYear) !== -1 && metric.years.indexOf(nextYear) !== -1);
    if (!metricOk) issues.push('METRIC_YEAR_TABLES_FINAL_NOT_READY');
  } catch (err) {
    issues.push('METRIC_YEAR_TABLES_FINAL_ERROR: ' + (err && err.message ? err.message : String(err)));
  }
  const newPayload = buildActiveYearPayloadV3Clean_(nextYear);
  return { ok: issues.length === 0, oldYear: oldYear, activeYearNow: activeYearNow, nextYear: nextYear, txCleared: txCleared, archiveValidation: archiveValidation, metricYearTablesOk: metricOk, newYearPayloadOk: !!(newPayload && newPayload.ok), issues: issues };
}



/**
 * ============================================================
 * STAGE 2E - DORMANT BACKEND HARDENED SAFE
 * Sifat:
 * - Patch penguatan, bukan sistem baru.
 * - Tidak mengubah Dashboard/Rekap/Input/Pemupukan/Perbandingan.
 * - Menambah audit, metadata, rollback fail-safe, dan log.
 * ============================================================
 */
function auditDuplicateTxIdV3Close_(sheetName, year) {
  try {
    const rows = getObjectsV3Clean_(sheetName).filter(function(r){ return isRowForYearV3Clean_(r, year); });
    const seen = {};
    const duplicates = [];
    rows.forEach(function(r){
      const id = cleanV3Clean_(r.tx_id);
      if (!id) return;
      if (seen[id]) duplicates.push(id);
      seen[id] = true;
    });
    return { ok: duplicates.length === 0, sheetName: sheetName, year: Number(year), rows: rows.length, duplicateCount: duplicates.length, duplicates: duplicates.slice(0, 20) };
  } catch (err) {
    return { ok: false, sheetName: sheetName, year: Number(year), message: 'DUPLICATE_TX_ID_AUDIT_ERROR_' + sheetName + ': ' + (err && err.message ? err.message : String(err)), duplicates: [] };
  }
}

function auditAllDuplicateTxIdV3Close_(year) {
  const pairs = getCloseYearSheetPairsV3_();
  const result = { ok: true, year: Number(year), tx: {}, archive: {}, issues: [] };
  pairs.forEach(function(pair){
    const txAudit = auditDuplicateTxIdV3Close_(pair.tx, year);
    const archiveAudit = auditDuplicateTxIdV3Close_(pair.archive, year);
    result.tx[pair.key] = txAudit;
    result.archive[pair.key] = archiveAudit;
    if (!txAudit.ok) {
      result.ok = false;
      result.issues.push('TX_DUPLICATE_TX_ID: ' + pair.tx + ' tahun ' + year + ' duplicates [' + (txAudit.duplicates || []).join(', ') + ']');
    }
    if (!archiveAudit.ok && archiveAudit.duplicateCount) {
      result.ok = false;
      result.issues.push('ARCHIVE_DUPLICATE_TX_ID: ' + pair.archive + ' tahun ' + year + ' duplicates [' + (archiveAudit.duplicates || []).join(', ') + ']');
    } else if (!archiveAudit.ok && archiveAudit.message) {
      result.ok = false;
      result.issues.push(archiveAudit.message);
    }
  });
  logActivityV3Clean_('CLOSE_YEAR_STAGE2E_DUPLICATE_AUDIT', { year: year, ok: result.ok, issues: result.issues });
  return result;
}

function auditArchiveMetadataColumnsV3Close_() {
  const required = ['archived_at','archive_version','archive_source','closed_year','closed_to_year','close_year_batch_id'];
  const pairs = getCloseYearSheetPairsV3_();
  const missing = {};
  pairs.forEach(function(pair){
    const headers = getSheetHeadersV3Close_(pair.archive);
    const miss = required.filter(function(h){ return headers.indexOf(h) === -1; });
    if (miss.length) missing[pair.archive] = miss;
  });
  const names = Object.keys(missing);
  return {
    ok: names.length === 0,
    required: required,
    missing: missing,
    warning: names.length ? 'ARCHIVE_METADATA_COLUMNS_MISSING_NON_BLOCKING: ' + names.map(function(n){ return n + ' missing [' + missing[n].join(', ') + ']'; }).join(' | ') : ''
  };
}

function buildCloseYearBatchIdV3_(oldYear, nextYear) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd_HHmmss');
  return 'CLOSE_YEAR_' + Number(oldYear) + '_TO_' + Number(nextYear) + '_' + stamp;
}

function buildCloseYearContextV3_(oldYear, nextYear, batchId, backup) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  return {
    closedYear: Number(oldYear),
    closedToYear: Number(nextYear),
    closeYearBatchId: cleanV3Clean_(batchId),
    archivedAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss'),
    version: V3_CLEAN_VERSION,
    archiveSource: 'CLOSE_YEAR_V3_STAGE2E',
    backup: backup || {}
  };
}

function upsertAppConfigValueV3Close_(key, value) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(V3C.SHEETS.APP_CONFIG);
  if (!sh || sh.getLastRow() < 1) throw new Error('APP_CONFIG_NOT_FOUND');
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
  const keyIdx = headers.indexOf('key');
  const valueIdx = headers.indexOf('value');
  if (keyIdx === -1 || valueIdx === -1) throw new Error('APP_CONFIG_KEY_VALUE_HEADER_NOT_FOUND');
  const targetKey = cleanV3Clean_(key);
  for (let r = 1; r < values.length; r++) {
    if (cleanV3Clean_(values[r][keyIdx]) === targetKey) {
      sh.getRange(r + 1, valueIdx + 1).setValue(value);
      return { ok: true, action: 'updated', key: targetKey, row: r + 1, value: value };
    }
  }
  const row = new Array(headers.length).fill('');
  row[keyIdx] = targetKey;
  row[valueIdx] = value;
  sh.appendRow(row);
  return { ok: true, action: 'inserted', key: targetKey, row: sh.getLastRow(), value: value };
}

function updateCloseYearMetadataConfigV3_(oldYear, nextYear, batchId, backup) {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const at = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
  const updates = [];
  updates.push(upsertAppConfigValueV3Close_('CURRENT_YEAR', Number(nextYear)));
  updates.push(upsertAppConfigValueV3Close_('LAST_CLOSED', Number(oldYear)));
  updates.push(upsertAppConfigValueV3Close_('YEAR_CLOSING_VERSION', V3_CLEAN_VERSION));
  updates.push(upsertAppConfigValueV3Close_('YEAR_CLOSING_STAGE', 'STAGE_2E_DORMANT_BACKEND_HARDENED_SAFE'));
  updates.push(upsertAppConfigValueV3Close_('LAST_CLOSE_YEAR_BATCH_ID', cleanV3Clean_(batchId)));
  updates.push(upsertAppConfigValueV3Close_('LAST_CLOSE_YEAR_AT', at));
  updates.push(upsertAppConfigValueV3Close_('LAST_CLOSE_YEAR_BACKUP_URL', backup && backup.url ? backup.url : ''));
  logActivityV3Clean_('CLOSE_YEAR_STAGE2E_APP_CONFIG_METADATA_UPDATED', { oldYear: oldYear, nextYear: nextYear, batchId: batchId, updates: updates.length });
  return { ok: true, updated: updates.length, updates: updates };
}

function rollbackFailedCloseYearArchiveCopyV3(confirmText, batchId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const activeYear = getActiveYearV3Clean_();
    const required = 'ROLLBACK COPY TUTUP BUKU ' + activeYear;
    if (cleanV3Clean_(confirmText) !== required) {
      return jsonSafeV3Clean_({ ok: false, status: 'ROLLBACK_CONFIRM_TEXT_INVALID', requiredConfirmText: required, message: 'Teks rollback tidak sesuai. Tidak ada data yang dihapus.' });
    }
    const cleanBatchId = cleanV3Clean_(batchId);
    if (!cleanBatchId) {
      return jsonSafeV3Clean_({ ok: false, status: 'ROLLBACK_BATCH_ID_REQUIRED', message: 'batchId wajib diisi agar rollback tidak menghapus data sembarangan.' });
    }
    const result = deleteArchiveRowsByCloseYearBatchIdV3_(activeYear, cleanBatchId);
    logActivityV3Clean_('CLOSE_YEAR_STAGE2E_ROLLBACK_ARCHIVE_COPY', { year: activeYear, batchId: cleanBatchId, result: result });
    return jsonSafeV3Clean_({ ok: true, status: 'OK_ROLLBACK_ARCHIVE_COPY_DONE', year: activeYear, batchId: cleanBatchId, result: result, message: 'Rollback archive copy selesai. TX_* dan ACTIVE_YEAR tidak disentuh.' });
  } catch (err) {
    return jsonSafeV3Clean_({ ok: false, status: 'ROLLBACK_ARCHIVE_COPY_ERROR', message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function deleteArchiveRowsByCloseYearBatchIdV3_(year, batchId) {
  const pairs = getCloseYearSheetPairsV3_();
  const result = {};
  pairs.forEach(function(pair){
    result[pair.key] = { sheet: pair.archive, deleted: deleteArchiveRowsByBatchIdV3_(pair.archive, year, batchId) };
  });
  return result;
}

function deleteArchiveRowsByBatchIdV3_(sheetName, year, batchId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
  const yearIdx = headers.indexOf('periode_tahun') !== -1 ? headers.indexOf('periode_tahun') : headers.indexOf('tahun');
  const batchIdx = headers.indexOf('close_year_batch_id');
  if (yearIdx === -1) throw new Error('YEAR_HEADER_NOT_FOUND_FOR_ROLLBACK: ' + sheetName);
  if (batchIdx === -1) throw new Error('CLOSE_YEAR_BATCH_ID_HEADER_NOT_FOUND_FOR_ROLLBACK: ' + sheetName);
  let deleted = 0;
  for (let r = values.length - 1; r >= 1; r--) {
    if (Number(values[r][yearIdx] || 0) === Number(year) && cleanV3Clean_(values[r][batchIdx]) === cleanV3Clean_(batchId)) {
      sh.deleteRow(r + 1);
      deleted++;
    }
  }
  return deleted;
}


/**
 * ============================================================
 * IMPORT ARSIP 2024 - STAGE A READ ONLY
 * VERSION: V3_IMPORT_ARCHIVE_2024_USING_2025_PATTERN_SAFE_STAGE_A
 *
 * Prinsip:
 * - Mengikuti pola arsip 2025 yang sudah dipakai ARCHIVE_*.
 * - Tidak menulis ARCHIVE_*.
 * - Tidak menyentuh TX_*.
 * - Tidak mengubah ACTIVE_YEAR / APP_CONFIG.
 * - Hanya audit dan preview data 2024 dari STAGING_2024_*.
 * ============================================================
 */
const V3_IMPORT_2024_VERSION = 'V3_IMPORT_ARCHIVE_2024_USING_2025_PATTERN_SAFE_STAGE_B_CONFIRM_IMPORT_SAFE';
const V3_IMPORT_2024_YEAR = 2024;

function auditImportArchive2024ReadinessV3() {
  try {
    const year = V3_IMPORT_2024_YEAR;
    const blockingIssues = [];
    const warnings = [];
    const pairs = getImportArchive2024PairsV3_();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetAudit = {};
    let totalStagingRows = 0;
    let totalConvertedRows = 0;

    pairs.forEach(function(pair){
      const stagingSheet = ss.getSheetByName(pair.staging);
      const archiveSheet = ss.getSheetByName(pair.archive);
      const stagingHeaders = getSheetHeadersV3Import2024_(pair.staging);
      const archiveHeaders = getSheetHeadersV3Import2024_(pair.archive);
      const archiveRows2024 = archiveSheet ? countRowsForYearV3Close_(pair.archive, year) : 0;
      const rawRows = stagingSheet ? getObjectsV3Clean_(pair.staging) : [];
      const conversion = convertStaging2024RowsForPairV3_(pair, rawRows);
      const requiredArchive = pair.required || [];
      const criticalMissingArchive = archiveHeaders.length ? requiredArchive.filter(function(h){ return archiveHeaders.indexOf(h) === -1; }) : requiredArchive;
      const metadataMissing = archiveHeaders.length ? getImport2024MetadataHeadersV3_().filter(function(h){ return archiveHeaders.indexOf(h) === -1; }) : [];
      const duplicateAudit = auditDuplicateTxIdInConvertedRowsV3Import2024_(pair, conversion.rows);
      const existingDup = archiveSheet ? auditConvertedTxIdAgainstArchiveV3Import2024_(pair.archive, conversion.rows) : { ok:true, duplicates:[] };

      if (!stagingSheet) blockingIssues.push('STAGING_SHEET_NOT_FOUND: ' + pair.staging);
      if (!archiveSheet) blockingIssues.push('ARCHIVE_SHEET_NOT_FOUND: ' + pair.archive);
      if (stagingSheet && !stagingHeaders.length) blockingIssues.push('STAGING_HEADER_EMPTY: ' + pair.staging);
      if (archiveSheet && !archiveHeaders.length) blockingIssues.push('ARCHIVE_HEADER_EMPTY: ' + pair.archive);
      if (archiveRows2024 > 0) blockingIssues.push('ARCHIVE_2024_ALREADY_HAS_DATA: ' + pair.archive + ' rows ' + archiveRows2024);
      if (criticalMissingArchive.length) blockingIssues.push('ARCHIVE_HEADER_NOT_COMPATIBLE_2025_PATTERN: ' + pair.archive + ' missing [' + criticalMissingArchive.join(', ') + ']');
      if (conversion.issues.length) conversion.issues.forEach(function(x){ blockingIssues.push(x); });
      if (!duplicateAudit.ok) blockingIssues.push('STAGING_2024_DUPLICATE_TX_ID: ' + pair.staging + ' [' + duplicateAudit.duplicates.join(', ') + ']');
      if (!existingDup.ok) blockingIssues.push('ARCHIVE_EXISTING_TX_ID_CONFLICT_2024_IMPORT: ' + pair.archive + ' [' + existingDup.duplicates.join(', ') + ']');
      if (metadataMissing.length) warnings.push('ARCHIVE_2024_METADATA_COLUMNS_MISSING_NON_BLOCKING: ' + pair.archive + ' missing [' + metadataMissing.join(', ') + ']');

      totalStagingRows += rawRows.length;
      totalConvertedRows += conversion.rows.length;
      sheetAudit[pair.key] = {
        stagingSheet: pair.staging,
        archiveSheet: pair.archive,
        stagingHeaders: stagingHeaders,
        archiveHeaders: archiveHeaders,
        stagingRows: rawRows.length,
        convertedRows: conversion.rows.length,
        archiveRows2024: archiveRows2024,
        archiveHeaderCompatible: criticalMissingArchive.length === 0,
        metadataMissing: metadataMissing,
        duplicateTxId: duplicateAudit,
        existingArchiveTxIdConflict: existingDup,
        sample: conversion.rows.length ? conversion.rows[0] : null
      };
    });

    if (!totalStagingRows) blockingIssues.push('STAGING_2024_EMPTY: tidak ada data di STAGING_2024_*');
    if (!totalConvertedRows) blockingIssues.push('CONVERTED_2024_EMPTY: tidak ada data valid hasil konversi');

    let archive2025PatternOk = false;
    try {
      const p2025 = buildArchiveYearPayloadV3Clean_(2025);
      archive2025PatternOk = !!(p2025 && p2025.ok && p2025.source === 'ARCHIVE_*');
      if (!archive2025PatternOk) warnings.push('ARCHIVE_2025_PATTERN_PAYLOAD_NOT_OK: arsip 2025 tidak terbaca sempurna sebagai acuan.');
    } catch (e) {
      warnings.push('ARCHIVE_2025_PATTERN_CHECK_ERROR: ' + (e && e.message ? e.message : String(e)));
    }

    const preview = buildImportArchive2024PreviewPayloadV3_();
    if (!preview || !preview.ok) blockingIssues.push('IMPORT_2024_PREVIEW_PAYLOAD_NOT_OK');

    const ok = blockingIssues.length === 0;
    return jsonSafeV3Clean_({
      ok: ok,
      status: ok ? 'READY_FOR_IMPORT_ARCHIVE_2024_PREVIEW' : 'NOT_READY_FOR_IMPORT_ARCHIVE_2024',
      mode: 'READ_ONLY_AUDIT',
      version: V3_IMPORT_2024_VERSION,
      activeYear: getActiveYearV3Clean_(),
      importYear: year,
      sourcePattern: 'ARCHIVE_2025_EXISTING_PATTERN',
      target: 'ARCHIVE_* periode_tahun 2024',
      totalStagingRows: totalStagingRows,
      totalConvertedRows: totalConvertedRows,
      sheetAudit: sheetAudit,
      archive2025PatternOk: archive2025PatternOk,
      previewSummary: preview.summary || {},
      previewRows: preview.rows || {},
      blockingIssues: blockingIssues,
      warnings: warnings,
      safety: {
        readOnly: true,
        writesTx: false,
        writesArchive: false,
        updatesActiveYear: false,
        updatesAppConfig: false,
        deletesRows: false,
        followsArchive2025Pattern: true
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'IMPORT_ARCHIVE_2024_AUDIT_ERROR',
      mode: 'READ_ONLY_AUDIT',
      version: V3_IMPORT_2024_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  }
}

function previewImportArchive2024V3() {
  try {
    const audit = auditImportArchive2024ReadinessV3();
    const preview = buildImportArchive2024PreviewPayloadV3_();
    const ok = !!(audit && audit.ok && preview && preview.ok);
    return jsonSafeV3Clean_({
      ok: ok,
      status: ok ? 'IMPORT_ARCHIVE_2024_PREVIEW_READY' : 'IMPORT_ARCHIVE_2024_PREVIEW_BLOCKED_BY_AUDIT',
      mode: 'PREVIEW_ONLY',
      version: V3_IMPORT_2024_VERSION,
      activeYear: getActiveYearV3Clean_(),
      importYear: V3_IMPORT_2024_YEAR,
      sourcePattern: 'ARCHIVE_2025_EXISTING_PATTERN',
      target: 'ARCHIVE_* periode_tahun 2024',
      source: 'STAGING_2024_* READ_ONLY',
      rows: preview.rows,
      summary: preview.summary,
      samples: preview.samples,
      audit: audit,
      requiredConfirmTextForFutureStage: 'IMPORT ARSIP 2024',
      note: 'Stage 2024B aktif. Preview ini tetap read-only; import real hanya berjalan jika tombol Import Arsip 2024 ditekan dengan teks konfirmasi yang tepat.',
      safety: {
        readOnly: true,
        writesTx: false,
        writesArchive: false,
        updatesActiveYear: false,
        updatesAppConfig: false,
        deletesRows: false,
        followsArchive2025Pattern: true
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'IMPORT_ARCHIVE_2024_PREVIEW_ERROR',
      mode: 'PREVIEW_ONLY',
      version: V3_IMPORT_2024_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  }
}

function getImportArchive2024PairsV3_() {
  return [
    { key:'penjualan', staging:'STAGING_2024_PENJUALAN', archive:V3C.SHEETS.ARCHIVE_PENJUALAN, required:['tx_id','status','periode_tahun','periode_bulan','panen_kg','harga','jumlah'] },
    { key:'biaya', staging:'STAGING_2024_BIAYA', archive:V3C.SHEETS.ARCHIVE_BIAYA, required:['tx_id','status','periode_tahun','periode_bulan','kategori','biaya','jumlah'] },
    { key:'kas', staging:'STAGING_2024_KAS', archive:V3C.SHEETS.ARCHIVE_KAS, required:['tx_id','status','periode_tahun','periode_bulan','jenis_kas','jumlah'] },
    { key:'pemupukan', staging:'STAGING_2024_PEMUPUKAN', archive:V3C.SHEETS.ARCHIVE_PEMUPUKAN, required:['tx_id','status','periode_tahun','periode_bulan','jenis_pupuk','dosis','satuan','jumlah'] }
  ];
}

function getImport2024MetadataHeadersV3_() {
  return ['archived_at','archive_version','archive_source','closed_year','closed_to_year','close_year_batch_id'];
}

function getSheetHeadersV3Import2024_(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastColumn() < 1) return [];
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function(h){ return cleanV3Clean_(h); }).filter(Boolean);
}

function buildImportArchive2024PreviewPayloadV3_() {
  const year = V3_IMPORT_2024_YEAR;
  const pairs = getImportArchive2024PairsV3_();
  const converted = { penjualan: [], biaya: [], kas: [], pemupukan: [] };
  const samples = {};
  const rows = {};
  const issues = [];
  pairs.forEach(function(pair){
    const raw = getObjectsV3Clean_(pair.staging);
    const conv = convertStaging2024RowsForPairV3_(pair, raw);
    converted[pair.key] = conv.rows;
    rows[pair.key] = conv.rows.length;
    samples[pair.key] = conv.rows.slice(0, 3);
    conv.issues.forEach(function(x){ issues.push(x); });
  });
  const data = normalizeDatasetV3Clean_(converted, year, true);
  const months = buildMonthsV3Clean_(data, year, true);
  const summary = summarizeMonthsV3Clean_(months);
  return jsonSafeV3Clean_({ ok: issues.length === 0, year: year, rows: rows, summary: normalizeCloseYearSummaryV3_(summary), months: months, samples: samples, issues: issues });
}

function convertStaging2024RowsForPairV3_(pair, rawRows) {
  const rows = [];
  const issues = [];
  (rawRows || []).forEach(function(r, idx){
    const rowNo = idx + 2;
    const converted = convertStaging2024RowV3_(pair.key, r, idx);
    const rowIssues = validateConvertedArchive2024RowV3_(pair, converted, rowNo);
    rowIssues.forEach(function(x){ issues.push(x); });
    if (!rowIssues.length) rows.push(converted);
  });
  return { rows: rows, issues: issues };
}

function convertStaging2024RowV3_(key, r, idx) {
  const year = V3_IMPORT_2024_YEAR;
  const month = monthImport2024V3_(r.periode_bulan || r.bulan || r.month || r.nama_bulan);
  const base = {
    tx_id: cleanV3Clean_(r.tx_id) || makeImport2024TxIdV3_(key, idx + 1),
    batch_id: cleanV3Clean_(r.batch_id) || 'IMPORT_ARCHIVE_2024_USING_2025_PATTERN',
    status: 'active',
    periode_tahun: year,
    periode_bulan: month,
    tanggal_bukti: formatDateShortBackendV3_(r.tanggal_bukti || r.tanggal || r.date),
    panen_ke: numberV3Clean_(r.panen_ke),
    keterangan: cleanV3Clean_(r.keterangan || r.catatan || ('Import arsip 2024 - ' + key)),
    source_row: cleanV3Clean_(r.source_row || 'IMPORT_ARCHIVE_2024_USING_2025_PATTERN_STAGE_A'),
    archived_at: '',
    archive_version: V3_CLEAN_VERSION,
    archive_source: 'IMPORT_ARCHIVE_2024_USING_2025_PATTERN',
    closed_year: year,
    closed_to_year: '',
    close_year_batch_id: 'IMPORT_ARCHIVE_2024_PREVIEW_ONLY'
  };

  if (key === 'penjualan') {
    const kg = numberV3Clean_(r.panen_kg || r.kg || r.produksi_kg || r.tonase);
    const harga = numberV3Clean_(r.harga || r.harga_rata || r.harga_per_kg);
    const jumlahRaw = numberV3Clean_(r.jumlah || r.penjualan || r.total || r.total_penjualan);
    return Object.assign({}, base, { panen_kg: kg, harga: harga || (kg ? Math.round(jumlahRaw / kg) : 0), jumlah: jumlahRaw || Math.round(kg * harga) });
  }
  if (key === 'biaya') {
    const nama = cleanV3Clean_(r.biaya || r.nama_biaya || r.item || r.nama || r.kategori_biaya);
    const ket = cleanV3Clean_(r.keterangan || r.catatan || nama);
    return Object.assign({}, base, { kategori: categorizeBiayaV3Clean_(nama + ' ' + ket, r.kategori), biaya: nama, keterangan: ket, jumlah: numberV3Clean_(r.jumlah || r.nominal || r.biaya_total || r.total) });
  }
  if (key === 'kas') {
    return Object.assign({}, base, {
      jenis_kas: normalizeJenisKasV3Clean_(r.jenis_kas || r.jenis || r.tipe),
      jumlah: numberV3Clean_(r.jumlah || r.nominal || r.total),
      akun_sumber: cleanV3Clean_(r.akun_sumber),
      akun_tujuan: cleanV3Clean_(r.akun_tujuan)
    });
  }
  if (key === 'pemupukan') {
    const jenis = cleanV3Clean_(r.jenis_pupuk || r.nama_pupuk || r.pupuk || r.nama);
    const dosis = numberDecimalV3Adapter_(r.dosis);
    return Object.assign({}, base, {
      jenis_pupuk: jenis,
      nama_pupuk: jenis,
      pupuk: jenis,
      dosis: dosis ? roundDecimalV3Clean_(dosis, 2) : '',
      satuan: cleanV3Clean_(r.satuan),
      jumlah: numberV3Clean_(r.jumlah || r.qty || r.total),
      blok_area: cleanV3Clean_(r.blok_area || r.blok || r.area),
      status_realisasi: normalizePemupukanStatusV3Clean_(r.status_realisasi || r.status_pemupukan || 'Selesai')
    });
  }
  return base;
}

function validateConvertedArchive2024RowV3_(pair, r, rowNo) {
  const issues = [];
  const prefix = 'STAGING_2024_INVALID_' + pair.key.toUpperCase() + '_ROW_' + rowNo + ': ';
  if (Number(r.periode_tahun) !== V3_IMPORT_2024_YEAR) issues.push(prefix + 'periode_tahun harus 2024');
  if (Number(r.periode_bulan) < 1 || Number(r.periode_bulan) > 12) issues.push(prefix + 'periode_bulan tidak valid');
  if (cleanV3Clean_(r.status) !== 'active') issues.push(prefix + 'status harus active');
  if (!cleanV3Clean_(r.tx_id)) issues.push(prefix + 'tx_id kosong');
  if (pair.key === 'penjualan') {
    if (numberV3Clean_(r.panen_kg) <= 0) issues.push(prefix + 'panen_kg kosong/tidak valid');
    if (numberV3Clean_(r.jumlah) <= 0) issues.push(prefix + 'jumlah penjualan kosong/tidak valid');
  }
  if (pair.key === 'biaya') {
    if (!cleanV3Clean_(r.biaya)) issues.push(prefix + 'biaya/nama_biaya kosong');
    if (numberV3Clean_(r.jumlah) <= 0) issues.push(prefix + 'jumlah biaya kosong/tidak valid');
  }
  if (pair.key === 'kas') {
    if (['kas_masuk','kas_keluar','transfer','pinjaman','potong_pinjaman'].indexOf(cleanV3Clean_(r.jenis_kas)) === -1) issues.push(prefix + 'jenis_kas tidak valid');
    if (numberV3Clean_(r.jumlah) <= 0) issues.push(prefix + 'jumlah kas kosong/tidak valid');
  }
  if (pair.key === 'pemupukan') {
    if (!cleanV3Clean_(r.jenis_pupuk)) issues.push(prefix + 'jenis_pupuk kosong');
    if (!cleanV3Clean_(r.satuan)) issues.push(prefix + 'satuan kosong');
    if (numberV3Clean_(r.jumlah) <= 0) issues.push(prefix + 'jumlah pemupukan kosong/tidak valid');
    if (r.dosis !== '' && isNaN(numberDecimalV3Adapter_(r.dosis))) issues.push(prefix + 'dosis tidak valid');
  }
  return issues;
}

function monthImport2024V3_(value) {
  const n = Number(value || 0);
  if (n >= 1 && n <= 12) return n;
  const t = normalizeTextV3Clean_(value);
  const names = {
    januari:1, jan:1, februari:2, feb:2, maret:3, mar:3, april:4, apr:4, mei:5,
    juni:6, jun:6, juli:7, jul:7, agustus:8, agu:8, ags:8, september:9, sep:9,
    oktober:10, okt:10, november:11, nov:11, desember:12, des:12
  };
  return names[t] || 0;
}

function makeImport2024TxIdV3_(key, no) {
  return 'IMP2024_' + String(key || '').toUpperCase() + '_' + ('000000' + Number(no || 0)).slice(-6);
}

function auditDuplicateTxIdInConvertedRowsV3Import2024_(pair, rows) {
  const seen = {}, dup = [];
  (rows || []).forEach(function(r){
    const id = cleanV3Clean_(r.tx_id);
    if (!id) return;
    if (seen[id] && dup.indexOf(id) === -1) dup.push(id);
    seen[id] = true;
  });
  return { ok: dup.length === 0, duplicates: dup };
}

function auditConvertedTxIdAgainstArchiveV3Import2024_(archiveSheet, rows) {
  const existing = {};
  getObjectsV3Clean_(archiveSheet).forEach(function(r){ const id = cleanV3Clean_(r.tx_id); if (id) existing[id] = true; });
  const dup = [];
  (rows || []).forEach(function(r){ const id = cleanV3Clean_(r.tx_id); if (id && existing[id] && dup.indexOf(id) === -1) dup.push(id); });
  return { ok: dup.length === 0, duplicates: dup };
}

function getImportArchive2024TemplateHeadersV3() {
  return jsonSafeV3Clean_({
    ok: true,
    version: V3_IMPORT_2024_VERSION,
    message: 'Header staging 2024 mengikuti pola archive existing/2025. Buat 4 sheet STAGING_2024_* dan pakai header berikut.',
    sheets: {
      STAGING_2024_PENJUALAN: ['tx_id','status','periode_tahun','periode_bulan','tanggal_bukti','panen_ke','panen_kg','harga','jumlah','keterangan','source_row'],
      STAGING_2024_BIAYA: ['tx_id','status','periode_tahun','periode_bulan','tanggal_bukti','panen_ke','kategori','biaya','keterangan','jumlah','source_row'],
      STAGING_2024_KAS: ['tx_id','status','periode_tahun','periode_bulan','tanggal_bukti','panen_ke','jenis_kas','keterangan','jumlah','akun_sumber','akun_tujuan','source_row'],
      STAGING_2024_PEMUPUKAN: ['tx_id','batch_id','status','periode_tahun','periode_bulan','tanggal_bukti','jenis_pupuk','nama_pupuk','dosis','satuan','jumlah','blok_area','keterangan','status_realisasi','source_row']
    },
    fixedValues: { periode_tahun: 2024, status: 'active', source_row: 'IMPORT_ARCHIVE_2024_USING_2025_PATTERN' },
    note: 'Fungsi ini hanya menampilkan template. Tidak membuat sheet dan tidak menulis data.'
  });
}


/**
 * ============================================================
 * IMPORT ARSIP 2024 - STAGE B CONFIRM IMPORT SAFE
 * VERSION: V3_IMPORT_ARCHIVE_2024_USING_2025_PATTERN_SAFE_STAGE_B_CONFIRM_IMPORT_SAFE
 *
 * Prinsip:
 * - Lanjutan langsung dari Stage 2024A yang sudah lulus audit + preview.
 * - Hanya append data 2024 ke ARCHIVE_* existing.
 * - Tidak menyentuh TX_*.
 * - Tidak mengubah ACTIVE_YEAR / APP_CONFIG.
 * - Membuat backup sebelum import real.
 * - Validasi hasil import memakai buildArchiveYearPayloadV3Clean_(2024).
 * ============================================================
 */
function confirmImportArchive2024V3(confirmText) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const year = V3_IMPORT_2024_YEAR;
    const requiredConfirmText = 'IMPORT ARSIP 2024';
    const userConfirmText = cleanV3Clean_(confirmText);
    if (userConfirmText !== requiredConfirmText) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'IMPORT_ARCHIVE_2024_CONFIRM_TEXT_INVALID',
        version: V3_IMPORT_2024_VERSION,
        importYear: year,
        requiredConfirmText: requiredConfirmText,
        message: 'Teks konfirmasi tidak sesuai. Import arsip 2024 dibatalkan.'
      });
    }

    const audit = auditImportArchive2024ReadinessV3();
    if (!audit || !audit.ok) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'IMPORT_ARCHIVE_2024_BLOCKED_BY_AUDIT',
        version: V3_IMPORT_2024_VERSION,
        importYear: year,
        audit: audit,
        message: 'Audit import arsip 2024 belum lulus. Import dibatalkan.'
      });
    }

    const preview = previewImportArchive2024V3();
    if (!preview || !preview.ok) {
      return jsonSafeV3Clean_({
        ok: false,
        status: 'IMPORT_ARCHIVE_2024_BLOCKED_BY_PREVIEW',
        version: V3_IMPORT_2024_VERSION,
        importYear: year,
        audit: audit,
        preview: preview,
        message: 'Preview import arsip 2024 belum valid. Import dibatalkan.'
      });
    }

    const expectedRows = preview.rows || {};
    const expectedSummary = preview.summary || {};
    const totalExpectedRows = numberV3Clean_(expectedRows.penjualan) + numberV3Clean_(expectedRows.biaya) + numberV3Clean_(expectedRows.kas) + numberV3Clean_(expectedRows.pemupukan);
    if (!totalExpectedRows) throw new Error('IMPORT_ARCHIVE_2024_EXPECTED_ROWS_EMPTY');

    const backup = createImportArchive2024BackupV3_();
    if (!backup || !backup.ok) throw new Error('IMPORT_ARCHIVE_2024_BACKUP_FAILED');

    const batchId = buildImportArchive2024BatchIdV3_();
    const appendResult = appendConvertedArchive2024RowsV3_(batchId);
    logActivityV3Clean_('IMPORT_ARCHIVE_2024_APPENDED_V3', { importYear: year, batchId: batchId, appendResult: appendResult, backup: backup });

    const validation = validateArchive2024AfterImportV3_(expectedRows, expectedSummary, batchId);
    const ok = !!validation.ok;
    logActivityV3Clean_('CONFIRM_IMPORT_ARCHIVE_2024_V3', {
      status: ok ? 'OK_IMPORT_ARCHIVE_2024_DONE' : 'ERROR_IMPORT_ARCHIVE_2024_VALIDATION',
      importYear: year,
      batchId: batchId,
      rowsImported: appendResult,
      expectedRows: expectedRows,
      expectedSummary: expectedSummary,
      backup: backup,
      validation: validation
    });

    return jsonSafeV3Clean_({
      ok: ok,
      status: ok ? 'OK_IMPORT_ARCHIVE_2024_DONE' : 'ERROR_IMPORT_ARCHIVE_2024_VALIDATION',
      version: V3_IMPORT_2024_VERSION,
      activeYear: getActiveYearV3Clean_(),
      importYear: year,
      batchId: batchId,
      backup: backup,
      expectedRows: expectedRows,
      expectedSummary: expectedSummary,
      appendResult: appendResult,
      validation: validation,
      message: ok ? 'Import arsip 2024 berhasil masuk ke ARCHIVE_*.' : 'Import arsip 2024 selesai tetapi validasi hasil belum lulus. Gunakan rollback batch jika diperlukan.'
    });
  } catch (err) {
    return jsonSafeV3Clean_({
      ok: false,
      status: 'IMPORT_ARCHIVE_2024_CONFIRM_ERROR',
      version: V3_IMPORT_2024_VERSION,
      message: err && err.message ? err.message : String(err),
      stack: err && err.stack ? err.stack : ''
    });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function createImportArchive2024BackupV3_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const file = DriveApp.getFileById(ss.getId());
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  const stamp = Utilities.formatDate(new Date(), tz, 'yyyyMMdd_HHmmss');
  const name = 'BACKUP_BEFORE_IMPORT_ARCHIVE_2024_V3_' + stamp;
  let copy;
  const parents = file.getParents();
  if (parents && parents.hasNext()) copy = file.makeCopy(name, parents.next());
  else copy = file.makeCopy(name);
  return { ok: true, name: name, fileId: copy.getId(), url: copy.getUrl(), createdAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm:ss') };
}

function buildImportArchive2024BatchIdV3_() {
  const tz = Session.getScriptTimeZone() || 'Asia/Jakarta';
  return 'IMPORT_ARCHIVE_2024_' + Utilities.formatDate(new Date(), tz, 'yyyyMMdd_HHmmss');
}

function appendConvertedArchive2024RowsV3_(batchId) {
  const pairs = getImportArchive2024PairsV3_();
  const result = {};
  const archivedAt = new Date();
  pairs.forEach(function(pair){
    const raw = getObjectsV3Clean_(pair.staging);
    const conv = convertStaging2024RowsForPairV3_(pair, raw);
    if (conv.issues && conv.issues.length) throw new Error('IMPORT_ARCHIVE_2024_CONVERSION_ISSUES_' + pair.key + ': ' + conv.issues.join(' | '));
    const rows = (conv.rows || []).map(function(r){ return enhanceImportArchive2024RowMetadataV3_(r, batchId, archivedAt); });
    const appended = appendObjectsToSheetV3Clean_(pair.archive, rows);
    result[pair.key] = { stagingSheet: pair.staging, archiveSheet: pair.archive, appended: appended };
  });
  return result;
}

function enhanceImportArchive2024RowMetadataV3_(row, batchId, archivedAt) {
  const out = Object.assign({}, row || {});
  out.status = 'active';
  out.periode_tahun = V3_IMPORT_2024_YEAR;
  out.archived_at = archivedAt;
  out.archive_version = V3_CLEAN_VERSION;
  out.archive_source = 'IMPORT_ARCHIVE_2024';
  out.closed_year = V3_IMPORT_2024_YEAR;
  out.closed_to_year = '';
  out.close_year_batch_id = batchId;
  out.source_row = cleanV3Clean_(out.source_row || 'IMPORT_ARCHIVE_2024_STAGE_B');
  if (Object.prototype.hasOwnProperty.call(out, 'dosis') && out.dosis !== '') {
    const dosis = numberDecimalV3Adapter_(out.dosis);
    out.dosis = dosis ? roundDecimalV3Clean_(dosis, 2) : '';
  }
  return out;
}

function validateArchive2024AfterImportV3_(expectedRows, expectedSummary, batchId) {
  const year = V3_IMPORT_2024_YEAR;
  const issues = [];
  const pairs = getImportArchive2024PairsV3_();
  const archiveCounts = {};
  pairs.forEach(function(pair){ archiveCounts[pair.key] = countRowsForYearV3Close_(pair.archive, year); });

  ['penjualan','biaya','kas','pemupukan'].forEach(function(k){
    if (numberV3Clean_(archiveCounts[k]) !== numberV3Clean_(expectedRows && expectedRows[k])) {
      issues.push('ARCHIVE_2024_ROW_MISMATCH_' + k + ': expected ' + numberV3Clean_(expectedRows && expectedRows[k]) + ' got ' + numberV3Clean_(archiveCounts[k]));
    }
  });

  let archivePayload = null;
  let archiveSummary = {};
  try {
    archivePayload = buildArchiveYearPayloadV3Clean_(year);
    archiveSummary = archivePayload.total || archivePayload.summary || {};
    if (!archivePayload || !archivePayload.ok) issues.push('ARCHIVE_2024_PAYLOAD_NOT_OK');
  } catch (err) {
    issues.push('ARCHIVE_2024_PAYLOAD_ERROR: ' + (err && err.message ? err.message : String(err)));
  }

  compareCloseYearSummaryV3_(expectedSummary, archiveSummary).forEach(function(x){ issues.push('IMPORT_2024_' + x); });

  let metricOk = false;
  try {
    const metric = buildMetricYearTablesV3Clean_(getActiveYearV3Clean_());
    metricOk = !!(metric && metric.tables && metric.years && metric.years.indexOf(year) !== -1);
    if (!metricOk) issues.push('METRIC_YEAR_TABLES_2024_NOT_READY_AFTER_IMPORT');
  } catch (err2) {
    issues.push('METRIC_YEAR_TABLES_2024_ERROR_AFTER_IMPORT: ' + (err2 && err2.message ? err2.message : String(err2)));
  }

  const batchAudit = auditArchive2024BatchRowsV3_(batchId);
  if (!batchAudit.ok) issues.push(batchAudit.message);

  return {
    ok: issues.length === 0,
    year: year,
    batchId: batchId,
    archiveCounts: archiveCounts,
    archiveSummary: normalizeCloseYearSummaryV3_(archiveSummary),
    metricYearTablesOk: metricOk,
    batchAudit: batchAudit,
    issues: issues
  };
}

function auditArchive2024BatchRowsV3_(batchId) {
  try {
    const pairs = getImportArchive2024PairsV3_();
    const counts = {};
    let total = 0;
    pairs.forEach(function(pair){
      const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(pair.archive);
      if (!sh || sh.getLastRow() < 2) { counts[pair.key] = 0; return; }
      const values = sh.getDataRange().getValues();
      const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
      const yearIdx = headers.indexOf('periode_tahun') !== -1 ? headers.indexOf('periode_tahun') : headers.indexOf('tahun');
      const batchIdx = headers.indexOf('close_year_batch_id');
      if (yearIdx === -1 || batchIdx === -1) { counts[pair.key] = null; return; }
      let c = 0;
      for (let r = 1; r < values.length; r++) {
        if (Number(values[r][yearIdx] || 0) === V3_IMPORT_2024_YEAR && cleanV3Clean_(values[r][batchIdx]) === cleanV3Clean_(batchId)) c++;
      }
      counts[pair.key] = c;
      total += c;
    });
    return { ok: true, batchId: batchId, counts: counts, total: total };
  } catch (err) {
    return { ok: false, message: 'ARCHIVE_2024_BATCH_AUDIT_ERROR: ' + (err && err.message ? err.message : String(err)) };
  }
}

function rollbackImportArchive2024ByBatchV3(confirmText, batchId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const requiredConfirmText = 'ROLLBACK IMPORT ARSIP 2024';
    if (cleanV3Clean_(confirmText) !== requiredConfirmText) {
      return jsonSafeV3Clean_({ ok:false, status:'ROLLBACK_IMPORT_ARCHIVE_2024_CONFIRM_TEXT_INVALID', requiredConfirmText:requiredConfirmText, message:'Teks konfirmasi rollback tidak sesuai.' });
    }
    const b = cleanV3Clean_(batchId);
    if (!b) throw new Error('ROLLBACK_IMPORT_ARCHIVE_2024_BATCH_ID_EMPTY');
    const result = {};
    getImportArchive2024PairsV3_().forEach(function(pair){
      result[pair.key] = { archiveSheet: pair.archive, deleted: deleteArchive2024RowsByBatchIdV3_(pair.archive, b) };
    });
    logActivityV3Clean_('ROLLBACK_IMPORT_ARCHIVE_2024_BY_BATCH_V3', { batchId: b, result: result });
    return jsonSafeV3Clean_({ ok:true, status:'OK_ROLLBACK_IMPORT_ARCHIVE_2024_BY_BATCH_DONE', batchId:b, result:result, message:'Rollback import arsip 2024 berdasarkan batch selesai.' });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, status:'ROLLBACK_IMPORT_ARCHIVE_2024_ERROR', message:err && err.message ? err.message : String(err), stack:err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function deleteArchive2024RowsByBatchIdV3_(sheetName, batchId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return 0;
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(h){ return cleanV3Clean_(h); });
  const yearIdx = headers.indexOf('periode_tahun') !== -1 ? headers.indexOf('periode_tahun') : headers.indexOf('tahun');
  const batchIdx = headers.indexOf('close_year_batch_id');
  const sourceIdx = headers.indexOf('archive_source');
  if (yearIdx === -1) throw new Error('YEAR_HEADER_NOT_FOUND_FOR_IMPORT_2024_ROLLBACK: ' + sheetName);
  if (batchIdx === -1) throw new Error('CLOSE_YEAR_BATCH_ID_HEADER_NOT_FOUND_FOR_IMPORT_2024_ROLLBACK: ' + sheetName);
  let deleted = 0;
  for (let r = values.length - 1; r >= 1; r--) {
    const isYear = Number(values[r][yearIdx] || 0) === V3_IMPORT_2024_YEAR;
    const isBatch = cleanV3Clean_(values[r][batchIdx]) === cleanV3Clean_(batchId);
    const sourceOk = sourceIdx === -1 || cleanV3Clean_(values[r][sourceIdx]) === 'IMPORT_ARCHIVE_2024';
    if (isYear && isBatch && sourceOk) {
      sh.deleteRow(r + 1);
      deleted++;
    }
  }
  return deleted;
}

/** ===== END IMPORT ARSIP 2024 STAGE B CONFIRM IMPORT SAFE ===== */

/** ===== END IMPORT ARSIP 2024 STAGE A READ ONLY ===== */

/**
 * ============================================================
 * DATABASE UI FORMAT SAFE - FORMATTING ONLY
 * VERSION: V3_DATABASE_UI_FORMAT_SAFE_1
 *
 * Prinsip:
 * - Hanya merapikan tampilan Google Sheet database.
 * - Tidak mengubah isi sel transaksi.
 * - Tidak menghapus data, kolom, atau sheet.
 * - Tidak mengubah ACTIVE_YEAR.
 * - Tidak mengubah alur Dashboard/Rekap/Input/Pemupukan/Perbandingan.
 * ============================================================
 */
const V3_DATABASE_UI_FORMAT_SAFE_VERSION = 'V3_DATABASE_UI_FORMAT_SAFE_1';

function previewDatabaseSheetsFormatV3Safe() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const out = sheets.map(function(sh){
      const name = sh.getName();
      const kind = classifyDatabaseSheetV3FormatSafe_(name);
      const headers = getSheetHeadersV3FormatSafe_(sh);
      return {
        sheet: name,
        kind: kind,
        lastRow: sh.getLastRow(),
        lastColumn: sh.getLastColumn(),
        headerCount: headers.length,
        technicalColumnsToHide: findTechnicalColumnIndexesV3FormatSafe_(headers).map(function(i){ return headers[i - 1]; }),
        planned: {
          frozenRows: 1,
          frozenColumns: kind.freezeColumns,
          headerStyle: true,
          filter: sh.getLastRow() >= 1 && sh.getLastColumn() >= 1,
          autoResize: sh.getLastColumn() >= 1,
          numberFormat: true,
          hideTechnicalColumns: true,
          tabColor: kind.tabColor
        }
      };
    });
    return jsonSafeV3Clean_({
      ok: true,
      version: V3_DATABASE_UI_FORMAT_SAFE_VERSION,
      mode: 'PREVIEW_ONLY',
      activeYear: getActiveYearV3Clean_(),
      sheets: out,
      safety: {
        formattingOnly: true,
        writesValues: false,
        deletesRows: false,
        deletesColumns: false,
        renamesSheets: false,
        changesActiveYear: false
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, version: V3_DATABASE_UI_FORMAT_SAFE_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  }
}

function formatDatabaseSheetsV3Safe() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const results = [];
    sheets.forEach(function(sh){
      const result = formatOneDatabaseSheetV3Safe_(sh);
      results.push(result);
    });
    logActivityV3Clean_('FORMAT_DATABASE_SHEETS_V3_SAFE', { version: V3_DATABASE_UI_FORMAT_SAFE_VERSION, sheets: results.length });
    return jsonSafeV3Clean_({
      ok: true,
      version: V3_DATABASE_UI_FORMAT_SAFE_VERSION,
      mode: 'FORMATTING_ONLY',
      activeYear: getActiveYearV3Clean_(),
      sheets: results,
      message: 'Format tampilan database selesai. Tidak ada data transaksi yang diubah.',
      safety: {
        formattingOnly: true,
        writesValues: false,
        deletesRows: false,
        deletesColumns: false,
        renamesSheets: false,
        changesActiveYear: false
      }
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, version: V3_DATABASE_UI_FORMAT_SAFE_VERSION, message: err && err.message ? err.message : String(err), stack: err && err.stack ? err.stack : '' });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function formatOneDatabaseSheetV3Safe_(sh) {
  const name = sh.getName();
  const lastRow = Math.max(sh.getLastRow(), 1);
  const lastCol = Math.max(sh.getLastColumn(), 1);
  const kind = classifyDatabaseSheetV3FormatSafe_(name);
  const headers = getSheetHeadersV3FormatSafe_(sh);
  let filterStatus = 'SKIPPED';
  let hiddenColumns = [];

  if (lastCol >= 1) {
    const headerRange = sh.getRange(1, 1, 1, lastCol);
    headerRange
      .setFontWeight('bold')
      .setFontColor(kind.headerFontColor)
      .setBackground(kind.headerBackground)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);
  }

  try { sh.setFrozenRows(1); } catch (e) {}
  try { if (kind.freezeColumns > 0 && lastCol >= kind.freezeColumns) sh.setFrozenColumns(kind.freezeColumns); } catch (e) {}
  try { sh.setTabColor(kind.tabColor); } catch (e) {}

  if (lastRow >= 1 && lastCol >= 1) {
    try {
      if (!sh.getFilter()) {
        sh.getRange(1, 1, lastRow, lastCol).createFilter();
        filterStatus = 'CREATED';
      } else {
        filterStatus = 'EXISTS';
      }
    } catch (e) {
      filterStatus = 'ERROR: ' + (e && e.message ? e.message : String(e));
    }
  }

  try { formatColumnsByHeaderV3FormatSafe_(sh, headers, lastRow); } catch (e) {}

  try {
    if (lastCol >= 1) sh.autoResizeColumns(1, lastCol);
  } catch (e) {}

  try {
    hiddenColumns = hideTechnicalColumnsV3FormatSafe_(sh, headers);
  } catch (e) {}

  return {
    sheet: name,
    kind: kind.key,
    lastRow: lastRow,
    lastColumn: lastCol,
    headers: headers.length,
    filter: filterStatus,
    frozenRows: 1,
    frozenColumns: kind.freezeColumns,
    hiddenColumns: hiddenColumns,
    formatted: true
  };
}

function classifyDatabaseSheetV3FormatSafe_(name) {
  const n = String(name || '').toUpperCase();
  if (n.indexOf('TX_') === 0) return { key:'TX', headerBackground:'#0F766E', headerFontColor:'#FFFFFF', tabColor:'#16A34A', freezeColumns:3 };
  if (n.indexOf('ARCHIVE_') === 0) return { key:'ARCHIVE', headerBackground:'#1D4ED8', headerFontColor:'#FFFFFF', tabColor:'#2563EB', freezeColumns:3 };
  if (n.indexOf('STAGING_') === 0) return { key:'STAGING', headerBackground:'#B45309', headerFontColor:'#FFFFFF', tabColor:'#F59E0B', freezeColumns:2 };
  if (n.indexOf('SOURCE_') === 0) return { key:'SOURCE', headerBackground:'#374151', headerFontColor:'#FFFFFF', tabColor:'#6B7280', freezeColumns:1 };
  if (n === 'APP_CONFIG') return { key:'CONFIG', headerBackground:'#CA8A04', headerFontColor:'#FFFFFF', tabColor:'#EAB308', freezeColumns:1 };
  if (n === 'LOG_AKTIVITAS') return { key:'LOG', headerBackground:'#7C3AED', headerFontColor:'#FFFFFF', tabColor:'#8B5CF6', freezeColumns:1 };
  if (n === 'YEAR_STATUS') return { key:'YEAR_STATUS', headerBackground:'#0F766E', headerFontColor:'#FFFFFF', tabColor:'#14B8A6', freezeColumns:1 };
  return { key:'OTHER', headerBackground:'#111827', headerFontColor:'#FFFFFF', tabColor:'#9CA3AF', freezeColumns:1 };
}

function getSheetHeadersV3FormatSafe_(sh) {
  if (!sh || sh.getLastColumn() < 1) return [];
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function(h){ return cleanV3Clean_(h); });
}

function formatColumnsByHeaderV3FormatSafe_(sh, headers, lastRow) {
  if (!headers || !headers.length || lastRow < 2) return;
  headers.forEach(function(h, idx){
    const col = idx + 1;
    const key = normalizeTextV3Clean_(h).replace(/\s+/g, '_');
    const range = sh.getRange(2, col, Math.max(lastRow - 1, 1), 1);
    if (['periode_tahun','periode_bulan','panen_ke','source_row','closed_year','closed_to_year'].indexOf(key) !== -1) {
      range.setNumberFormat('0');
    } else if (['panen_kg','harga','jumlah','biaya_total','nominal','kas','penjualan','biaya'].indexOf(key) !== -1) {
      range.setNumberFormat('#,##0');
    } else if (['dosis'].indexOf(key) !== -1) {
      range.setNumberFormat('0.00');
    } else if (['tanggal_bukti','created_at','updated_at','archived_at','timestamp','last_close_year_at'].indexOf(key) !== -1) {
      range.setNumberFormat('yyyy-mm-dd');
    }
  });
}

function findTechnicalColumnIndexesV3FormatSafe_(headers) {
  const technical = {
    tx_id:true,
    batch_id:true,
    source_row:true,
    sumber_file:true,
    created_at:true,
    updated_at:true,
    archived_at:true,
    archive_version:true,
    archive_source:true,
    closed_year:true,
    closed_to_year:true,
    close_year_batch_id:true,
    import_batch_id:true
  };
  const indexes = [];
  (headers || []).forEach(function(h, idx){
    const key = normalizeTextV3Clean_(h).replace(/\s+/g, '_');
    if (technical[key]) indexes.push(idx + 1);
  });
  return indexes;
}

function hideTechnicalColumnsV3FormatSafe_(sh, headers) {
  const indexes = findTechnicalColumnIndexesV3FormatSafe_(headers);
  const hiddenNames = [];
  indexes.forEach(function(col){
    try {
      sh.hideColumns(col);
      hiddenNames.push(headers[col - 1]);
    } catch (e) {}
  });
  return hiddenNames;
}

/** ===== END DATABASE UI FORMAT SAFE ===== */


/** ===== END FILE: Kode_V3_CLEAN_FULL_REWRITE_ACTIVE_ARCHIVE_SAFE.gs ===== */


function diagnoseSystemIntegrationV3() {
  const result = {
    ok: true,
    version: V3_CLEAN_VERSION,
    diagnosticVersion: 'V3_DIAGNOSTIC_COMPACT_LOG_SAFE_1',
    timestamp: new Date(),
    checks: {},
    issues: [],
    warnings: [],
    infos: []
  };

  function list_(value) {
    if (Array.isArray(value)) return value.filter(function(x){ return cleanV3Clean_(x); });
    if (value === null || typeof value === 'undefined' || value === '') return [];
    return [String(value)];
  }

  function pushUnique_(target, message) {
    const text = cleanV3Clean_(message);
    if (text && target.indexOf(text) === -1) target.push(text);
  }

  function recordFindings_(name, evaluation, critical) {
    list_(evaluation.issues).forEach(function(x){
      pushUnique_(critical ? result.issues : result.warnings, name + ': ' + x);
    });
    list_(evaluation.warnings).forEach(function(x){
      pushUnique_(result.warnings, name + ': ' + x);
    });
    list_(evaluation.infos).forEach(function(x){
      pushUnique_(result.infos, name + ': ' + x);
    });
  }

  function check(name, fn, options) {
    options = options || {};
    const critical = !!options.critical;
    try {
      const value = fn();
      let evaluation = {
        healthOk: true,
        state: 'OK',
        issues: [],
        warnings: [],
        infos: []
      };
      if (typeof options.evaluate === 'function') {
        const custom = options.evaluate(value) || {};
        evaluation.healthOk = custom.healthOk !== false;
        evaluation.state = cleanV3Clean_(custom.state) || (evaluation.healthOk ? 'OK' : 'NOT_OK');
        evaluation.issues = list_(custom.issues);
        evaluation.warnings = list_(custom.warnings);
        evaluation.infos = list_(custom.infos);
      }
      result.checks[name] = {
        ok: evaluation.healthOk,
        executionOk: true,
        healthOk: evaluation.healthOk,
        state: evaluation.state,
        value: value,
        issues: evaluation.issues,
        warnings: evaluation.warnings,
        infos: evaluation.infos
      };
      recordFindings_(name, evaluation, critical);
      if (!evaluation.healthOk && critical) result.ok = false;
    } catch (e) {
      const message = e && e.message ? e.message : String(e);
      result.checks[name] = {
        ok: false,
        executionOk: false,
        healthOk: false,
        state: 'EXECUTION_ERROR',
        message: message,
        issues: critical ? [message] : [],
        warnings: critical ? [] : [message],
        infos: []
      };
      pushUnique_(critical ? result.issues : result.warnings, name + ': ' + message);
      if (critical) result.ok = false;
    }
  }

  const activeYear = getActiveYearV3Clean_();

  check('ACTIVE_YEAR', function(){
    if (activeYear < 2026) throw new Error('ACTIVE_YEAR_INVALID');
    return activeYear;
  }, {critical:true});

  check('DASHBOARD_PAYLOAD', function(){
    const p = getV3DashboardBindingPayloadWebSafeV3_8E6();
    if (!p || !p.ok) throw new Error((p && p.message) || 'PAYLOAD_NOT_OK');
    return {source:p.source, rows:p.rows, total:p.total};
  }, {critical:true});

  check('TARGET_ACTIVE', function(){
    const t = readTargetProduksiV3_(activeYear, false);
    if (t.hasTarget) {
      const v = validateMonthlyTargetsV3_(t.monthlyTargets, t.target_kg);
      if (!v.ok) throw new Error(v.issues.join(','));
      return {target_kg:t.target_kg, monthlySum:v.sum, monthCount:v.values.length, source:t.source};
    }
    return {hasTarget:false};
  }, {
    critical:true,
    evaluate:function(v){
      if (v && v.hasTarget === false) return {healthOk:false, state:'TARGET_NOT_SET', issues:['Target produksi aktif belum ditetapkan.']};
      return {healthOk:true, state:'TARGET_VALIDATED'};
    }
  });

  check('TARGET_ANALYSIS', function(){
    const a = analyzeTargetProduksiSmartV3_(activeYear);
    if (!a || !a.ok) throw new Error((a && a.message) || 'ANALYSIS_NOT_OK');
    return {mode:a.mode, yearsUsed:a.yearsUsed, quality:a.quality, normal:a.recommendations && a.recommendations.normal};
  }, {critical:false});

  check('PEMUPUKAN', function(){
    const p = getPemupukanHistoryV3(activeYear, 0);
    if (!p || !p.ok) throw new Error((p && p.message) || 'PEMUPUKAN_NOT_OK');
    return {source:p.source, rows:p.rows ? p.rows.length : 0};
  }, {critical:false});

  check('INPUT_CONTROL', function(){
    const p = getInputControlStateV3(0);
    if (!p || !p.ok) throw new Error((p && p.message) || 'INPUT_CONTROL_NOT_OK');
    return p;
  }, {critical:false});

  check('CLOSE_YEAR_AUDIT', function(){
    const p = auditCloseYearReadinessV3();
    if (!p) throw new Error('NO_RESULT');
    return {
      ok: !!p.ok,
      status: p.status || '',
      blockingIssues: list_(p.blockingIssues || p.issues),
      warnings: list_(p.warnings)
    };
  }, {
    critical:false,
    evaluate:function(v){
      if (v.ok) return {healthOk:true, state:'READY', warnings:v.warnings};
      return {
        healthOk:false,
        state:'NOT_READY',
        warnings:(v.blockingIssues.length ? v.blockingIssues : ['Tutup Buku belum siap.']).concat(v.warnings)
      };
    }
  });

  check('IMPORT_2024_AUDIT', function(){
    const p = auditImportArchive2024ReadinessV3();
    if (!p) throw new Error('NO_RESULT');
    let archivePayload = null;
    try { archivePayload = buildArchiveYearPayloadV3Clean_(2024); } catch (archiveErr) {}
    const archivePresent = !!(archivePayload && archivePayload.ok && archivePayload.source === 'ARCHIVE_*');
    return {
      readinessOk: !!p.ok,
      status: p.status || '',
      blockingIssues: list_(p.blockingIssues || p.issues),
      warnings: list_(p.warnings),
      archive2024Present: archivePresent,
      archive2024Source: archivePayload ? archivePayload.source : '',
      archive2024Summary: archivePayload ? (archivePayload.total || archivePayload.summary || {}) : {}
    };
  }, {
    critical:false,
    evaluate:function(v){
      if (v.readinessOk) {
        return {healthOk:true, state:'READY_FOR_IMPORT', warnings:v.warnings};
      }
      if (v.archive2024Present) {
        return {
          healthOk:true,
          state:'IMPORT_NOT_REQUIRED_ARCHIVE_ALREADY_PRESENT',
          warnings:v.warnings,
          infos:['Arsip 2024 sudah tersedia; kesiapan import tidak diperlukan lagi.']
        };
      }
      return {
        healthOk:false,
        state:'NOT_READY_FOR_IMPORT',
        warnings:(v.blockingIssues.length ? v.blockingIssues : ['Import arsip 2024 belum siap.']).concat(v.warnings)
      };
    }
  });

  result.severity = result.issues.length ? 'error' : (result.warnings.length ? 'warning' : 'ok');
  result.ok = result.issues.length === 0;
  result.summary = {
    totalChecks: Object.keys(result.checks).length,
    passedChecks: Object.keys(result.checks).filter(function(k){ return result.checks[k].healthOk; }).length,
    failedChecks: Object.keys(result.checks).filter(function(k){ return !result.checks[k].healthOk; }).length,
    issueCount: result.issues.length,
    warningCount: result.warnings.length,
    infoCount: result.infos.length
  };

  const safeResult = jsonSafeV3Clean_(result);

  // Log dibuat ringkas agar summary dan severity tidak terpotong oleh batas Log Apps Script.
  function shortText_(value, maxLen) {
    const text = cleanV3Clean_(value);
    const limit = Math.max(40, Number(maxLen) || 180);
    return text.length > limit ? text.substring(0, limit - 3) + '...' : text;
  }

  function compactCheck_(name, checkData) {
    const c = checkData || {};
    const out = {
      executionOk: c.executionOk !== false,
      healthOk: c.healthOk !== false,
      state: c.state || ''
    };
    const v = c.value || {};

    if (name === 'ACTIVE_YEAR') out.value = v;
    if (name === 'DASHBOARD_PAYLOAD') {
      out.source = v.source || '';
      out.rows = v.rows || {};
      out.total = v.total ? {
        produksiKg: v.total.produksiKg || 0,
        penjualanRp: v.total.penjualanRp || 0,
        biayaRp: v.total.biayaRp || 0,
        labaRp: v.total.labaRp || 0,
        activeMonths: v.total.activeMonths || 0
      } : {};
    }
    if (name === 'TARGET_ACTIVE') {
      out.target_kg = v.target_kg || 0;
      out.monthlySum = v.monthlySum || 0;
      out.monthCount = v.monthCount || 0;
      out.source = v.source || '';
    }
    if (name === 'TARGET_ANALYSIS') {
      out.mode = v.mode || '';
      out.yearsUsed = v.yearsUsed || [];
      out.quality = v.quality || '';
      out.normal = v.normal || 0;
    }
    if (name === 'PEMUPUKAN') {
      out.source = v.source || '';
      out.rows = v.rows || 0;
    }
    if (name === 'INPUT_CONTROL') {
      out.activeYear = v.activeYear || 0;
      out.selectedMonth = v.selectedMonth || 0;
      out.message = shortText_(v.message || '', 140);
    }
    if (name === 'CLOSE_YEAR_AUDIT') {
      out.status = v.status || '';
      out.blockingIssueCount = Array.isArray(v.blockingIssues) ? v.blockingIssues.length : 0;
      out.warningCount = Array.isArray(v.warnings) ? v.warnings.length : 0;
    }
    if (name === 'IMPORT_2024_AUDIT') {
      const blocking = Array.isArray(v.blockingIssues) ? v.blockingIssues : [];
      out.status = v.status || '';
      out.archive2024Present = !!v.archive2024Present;
      out.archive2024Source = v.archive2024Source || '';
      out.blockingIssueCount = blocking.length;
      out.blockingIssueExamples = blocking.slice(0, 4).map(function(x){ return shortText_(x, 180); });
      out.warningCount = Array.isArray(v.warnings) ? v.warnings.length : 0;
    }
    out.issueCount = Array.isArray(c.issues) ? c.issues.length : 0;
    out.warningCount = Math.max(out.warningCount || 0, Array.isArray(c.warnings) ? c.warnings.length : 0);
    return out;
  }

  const compactLog = {
    ok: safeResult.ok,
    severity: safeResult.severity,
    diagnosticVersion: safeResult.diagnosticVersion,
    timestamp: safeResult.timestamp,
    summary: safeResult.summary,
    checks: {}
  };
  Object.keys(safeResult.checks || {}).forEach(function(name){
    compactLog.checks[name] = compactCheck_(name, safeResult.checks[name]);
  });
  compactLog.issues = (safeResult.issues || []).slice(0, 10).map(function(x){ return shortText_(x, 220); });
  compactLog.warnings = (safeResult.warnings || []).slice(0, 10).map(function(x){ return shortText_(x, 220); });
  compactLog.infos = (safeResult.infos || []).slice(0, 10).map(function(x){ return shortText_(x, 220); });

  try { console.log(JSON.stringify(compactLog, null, 2)); }
  catch (logErr) { Logger.log(JSON.stringify(compactLog)); }
  return safeResult;
}



/**
 * ============================================================
 * BACKUP DRIVE V3 - MANUAL + DAILY 2-SLOT SAFE
 * - Snapshot spreadsheet database utama ke Google Drive.
 * - Rotasi dua slot: TERBARU dan SEBELUMNYA.
 * - Tidak mengubah TX_*, ARCHIVE_*, TARGET_PRODUKSI, atau ACTIVE_YEAR.
 * - Trigger harian dipasang manual oleh pemilik project.
 * ============================================================
 */
const V3_BACKUP_CONFIG = {
  parentFolderName: '03_BACKUP_V3',
  folderName: 'OPERASIONAL_2_SLOT',
  latestName: 'BUKIT_PRAGO_V3_BACKUP_TERBARU',
  previousName: 'BUKIT_PRAGO_V3_BACKUP_SEBELUMNYA',
  dailyHandler: 'runDailyBackupV3Safe',
  dailyHour: 23,
  propertyFolderId: 'V3_BACKUP_2SLOT_FOLDER_ID',
  propertyLatestId: 'V3_BACKUP_LATEST_FILE_ID',
  propertyPreviousId: 'V3_BACKUP_PREVIOUS_FILE_ID'
};

function backupDriveManualV3Safe() {
  return createTransactionSnapshotBackupV3Safe_('MANUAL');
}

function runDailyBackupV3Safe() {
  return createTransactionSnapshotBackupV3Safe_('DAILY');
}

function createTransactionSnapshotBackupV3Safe_(mode) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    return jsonSafeV3Clean_({ ok:false, message:'BACKUP_LOCK_TIMEOUT' });
  }
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('ACTIVE_SPREADSHEET_NOT_FOUND');
    SpreadsheetApp.flush();

    const sourceFile = DriveApp.getFileById(ss.getId());
    const folder = getOrCreateBackupFolderV3Safe_();
    const props = PropertiesService.getScriptProperties();
    const now = new Date();
    const stamp = Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    // Bersihkan duplikat berdasarkan nama di folder kanonik.
    let latestFiles = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.latestName);
    let previousFiles = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.previousName);

    // Slot SEBELUMNYA lama dihapus agar tersisa maksimal satu.
    previousFiles.forEach(function(f){ f.setTrashed(true); });
    props.deleteProperty(V3_BACKUP_CONFIG.propertyPreviousId);

    // Slot TERBARU lama dipindahkan menjadi SEBELUMNYA.
    let previousCreated = null;
    if (latestFiles.length) {
      const latestCanonical = latestFiles[latestFiles.length - 1];
      latestFiles.slice(0, -1).forEach(function(f){ f.setTrashed(true); });
      latestCanonical.setName(V3_BACKUP_CONFIG.previousName);
      previousCreated = latestCanonical;
      props.setProperty(V3_BACKUP_CONFIG.propertyPreviousId, latestCanonical.getId());
    }

    // Buat snapshot baru sebagai TERBARU.
    const copy = sourceFile.makeCopy(V3_BACKUP_CONFIG.latestName, folder);
    props.setProperty(V3_BACKUP_CONFIG.propertyLatestId, copy.getId());

    // Verifikasi ulang dua slot dari folder kanonik.
    latestFiles = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.latestName);
    previousFiles = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.previousName);
    if (latestFiles.length !== 1) throw new Error('BACKUP_LATEST_SLOT_VERIFICATION_FAILED:' + latestFiles.length);
    if (previousCreated && previousFiles.length !== 1) throw new Error('BACKUP_PREVIOUS_SLOT_VERIFICATION_FAILED:' + previousFiles.length);

    const latestVerified = latestFiles[0];
    const previousVerified = previousFiles.length ? previousFiles[0] : null;
    const result = {
      ok: true,
      verified: true,
      mode: String(mode || 'MANUAL').toUpperCase(),
      timestamp: stamp,
      folder: {
        id: folder.getId(),
        name: folder.getName(),
        url: folder.getUrl(),
        parentName: V3_BACKUP_CONFIG.parentFolderName
      },
      latest: backupFileInfoV3Safe_(latestVerified),
      previous: previousVerified ? backupFileInfoV3Safe_(previousVerified) : null,
      latestAvailable: true,
      previousAvailable: !!previousVerified,
      slotCount: previousVerified ? 2 : 1,
      sourceSpreadsheetId: ss.getId(),
      sourceSpreadsheetName: ss.getName(),
      activeYear: getActiveYearV3Clean_(),
      txTouched: false,
      archiveTouched: false,
      appConfigChanged: false
    };
    try { logActivityV3Clean_('BACKUP_DRIVE_' + result.mode + '_V3', result); } catch (logErr) {}
    return jsonSafeV3Clean_(result);
  } catch (err) {
    const fail = { ok:false, verified:false, mode:String(mode || 'MANUAL').toUpperCase(), message:err && err.message ? err.message : String(err) };
    try { logActivityV3Clean_('BACKUP_DRIVE_FAILED_V3', fail); } catch (logErr) {}
    return jsonSafeV3Clean_(fail);
  } finally {
    lock.releaseLock();
  }
}

function backupFileInfoV3Safe_(f) {
  return {
    id: f.getId(),
    name: f.getName(),
    url: f.getUrl(),
    sizeBytes: Number(f.getSize() || 0),
    updatedAt: Utilities.formatDate(f.getLastUpdated(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss')
  };
}

function getOrCreateBackupFolderV3Safe_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(V3_BACKUP_CONFIG.propertyFolderId);
  if (savedId) {
    try {
      const saved = DriveApp.getFolderById(savedId);
      if (saved.getName() === V3_BACKUP_CONFIG.folderName && folderHasParentNamedV3Safe_(saved, V3_BACKUP_CONFIG.parentFolderName)) {
        return saved;
      }
      props.deleteProperty(V3_BACKUP_CONFIG.propertyFolderId);
    } catch (e) {
      props.deleteProperty(V3_BACKUP_CONFIG.propertyFolderId);
    }
  }

  // Prioritas: folder OPERASIONAL_2_SLOT yang berada tepat di dalam 03_BACKUP_V3.
  const candidates = DriveApp.getFoldersByName(V3_BACKUP_CONFIG.folderName);
  while (candidates.hasNext()) {
    const candidate = candidates.next();
    if (folderHasParentNamedV3Safe_(candidate, V3_BACKUP_CONFIG.parentFolderName)) {
      props.setProperty(V3_BACKUP_CONFIG.propertyFolderId, candidate.getId());
      return candidate;
    }
  }

  // Jika belum ada, cari 03_BACKUP_V3 dan buat subfolder secara otomatis.
  const parents = DriveApp.getFoldersByName(V3_BACKUP_CONFIG.parentFolderName);
  if (!parents.hasNext()) throw new Error('BACKUP_PARENT_FOLDER_NOT_FOUND:' + V3_BACKUP_CONFIG.parentFolderName);
  const parent = parents.next();
  const folder = parent.createFolder(V3_BACKUP_CONFIG.folderName);
  props.setProperty(V3_BACKUP_CONFIG.propertyFolderId, folder.getId());
  return folder;
}

function folderHasParentNamedV3Safe_(folder, parentName) {
  const parents = folder.getParents();
  while (parents.hasNext()) {
    if (parents.next().getName() === parentName) return true;
  }
  return false;
}

function getFilesByExactNameInFolderV3Safe_(folder, name) {
  const out = [];
  const it = folder.getFilesByName(name);
  while (it.hasNext()) out.push(it.next());
  return out;
}

function getDailyBackupTriggersV3Safe_() {
  const handler = V3_BACKUP_CONFIG.dailyHandler;
  return ScriptApp.getProjectTriggers().filter(function(trigger) {
    return trigger.getHandlerFunction() === handler;
  });
}

function getDailyBackupTriggerMetaV3Safe_() {
  const key = 'V3_DAILY_BACKUP_TRIGGER_META';
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (err) {
    Logger.log('[V3_BACKUP_TRIGGER][WARN] Gagal membaca metadata trigger: ' + String(err));
    return null;
  }
}

function setDailyBackupTriggerMetaV3Safe_(triggerId) {
  const key = 'V3_DAILY_BACKUP_TRIGGER_META';
  const meta = {
    triggerId: String(triggerId || ''),
    handler: V3_BACKUP_CONFIG.dailyHandler,
    dailyHour: Number(V3_BACKUP_CONFIG.dailyHour),
    everyDays: 1,
    timeZone: Session.getScriptTimeZone() || 'Asia/Jakarta',
    setupVersion: V3_CLEAN_VERSION,
    verifiedAt: new Date().toISOString()
  };
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(meta));
  return meta;
}

function clearDailyBackupTriggerMetaV3Safe_() {
  PropertiesService.getScriptProperties().deleteProperty('V3_DAILY_BACKUP_TRIGGER_META');
}

function isCanonicalDailyBackupTriggerV3Safe_(triggers, meta) {
  if (!Array.isArray(triggers) || triggers.length !== 1 || !meta) return false;
  const trigger = triggers[0];
  return String(meta.triggerId || '') === String(trigger.getUniqueId()) &&
    String(meta.handler || '') === String(V3_BACKUP_CONFIG.dailyHandler) &&
    Number(meta.dailyHour) === Number(V3_BACKUP_CONFIG.dailyHour) &&
    Number(meta.everyDays) === 1;
}

function logDailyBackupTriggerSetupV3Safe_(level, payload) {
  const safePayload = jsonSafeV3Clean_(payload || {});
  const line = '[V3_BACKUP_TRIGGER][' + String(level || 'INFO').toUpperCase() + '] ' + JSON.stringify(safePayload);
  Logger.log(line);
  if (String(level || '').toUpperCase() === 'ERROR') {
    console.error(line);
  } else {
    console.log(line);
  }
}

function isBackupTriggerAuthorizationErrorV3Safe_(message) {
  const text = String(message || '').toLowerCase();
  return text.indexOf('authorization') >= 0 ||
    text.indexOf('authorisation') >= 0 ||
    text.indexOf('permission') >= 0 ||
    text.indexOf('izin') >= 0 ||
    text.indexOf('scope') >= 0 ||
    text.indexOf('scriptapp.getprojecttriggers') >= 0 ||
    text.indexOf('scriptapp.newtrigger') >= 0;
}

function setupDailyBackupTriggerV3Safe() {
  const handler = V3_BACKUP_CONFIG.dailyHandler;
  const schedule = 'Setiap hari sekitar 23.00-00.00 WIB';
  const timeZone = Session.getScriptTimeZone() || 'Asia/Jakarta';
  let stage = 'START';

  try {
    stage = 'READ_EXISTING_TRIGGERS';
    let triggers = getDailyBackupTriggersV3Safe_();
    const countBefore = triggers.length;
    const metaBefore = getDailyBackupTriggerMetaV3Safe_();
    const canonicalBefore = isCanonicalDailyBackupTriggerV3Safe_(triggers, metaBefore);

    logDailyBackupTriggerSetupV3Safe_('INFO', {
      stage: stage,
      handler: handler,
      triggerCountBefore: countBefore,
      canonicalBefore: canonicalBefore,
      timeZone: timeZone
    });

    if (canonicalBefore) {
      const existingResult = {
        ok: true,
        verified: true,
        canonical: true,
        alreadyActive: true,
        created: false,
        replacedExisting: false,
        duplicateTriggersRemoved: 0,
        handler: handler,
        triggerId: triggers[0].getUniqueId(),
        triggerCount: 1,
        schedule: schedule,
        timeZone: timeZone,
        message: 'Backup harian sudah aktif dengan konfigurasi resmi dan telah diverifikasi.'
      };
      logDailyBackupTriggerSetupV3Safe_('SUCCESS', existingResult);
      return jsonSafeV3Clean_(existingResult);
    }

    stage = 'CREATE_CANONICAL_TRIGGER';
    const createdTrigger = ScriptApp.newTrigger(handler)
      .timeBased()
      .atHour(V3_BACKUP_CONFIG.dailyHour)
      .everyDays(1)
      .create();
    const createdId = createdTrigger.getUniqueId();

    stage = 'VERIFY_NEW_TRIGGER_EXISTS';
    Utilities.sleep(350);
    triggers = getDailyBackupTriggersV3Safe_();
    const createdFound = triggers.some(function(trigger) {
      return String(trigger.getUniqueId()) === String(createdId);
    });
    if (!createdFound) {
      throw new Error('TRIGGER_CREATION_NOT_VISIBLE_AFTER_CREATE');
    }

    stage = 'REMOVE_NON_CANONICAL_TRIGGERS';
    let removed = 0;
    triggers.forEach(function(trigger) {
      if (String(trigger.getUniqueId()) !== String(createdId)) {
        ScriptApp.deleteTrigger(trigger);
        removed++;
      }
    });

    stage = 'VERIFY_FINAL_TRIGGER';
    Utilities.sleep(300);
    triggers = getDailyBackupTriggersV3Safe_();
    if (triggers.length !== 1 || String(triggers[0].getUniqueId()) !== String(createdId)) {
      throw new Error('TRIGGER_FINAL_VERIFICATION_FAILED: expected=1 actual=' + triggers.length);
    }

    stage = 'WRITE_AND_VERIFY_METADATA';
    const savedMeta = setDailyBackupTriggerMetaV3Safe_(createdId);
    const metaAfter = getDailyBackupTriggerMetaV3Safe_();
    if (!isCanonicalDailyBackupTriggerV3Safe_(triggers, metaAfter)) {
      throw new Error('TRIGGER_METADATA_VERIFICATION_FAILED');
    }

    const result = {
      ok: true,
      verified: true,
      canonical: true,
      alreadyActive: countBefore > 0,
      created: true,
      replacedExisting: countBefore > 0,
      duplicateTriggersRemoved: removed,
      handler: handler,
      triggerId: createdId,
      triggerCount: 1,
      schedule: schedule,
      timeZone: timeZone,
      metadata: savedMeta,
      message: countBefore > 0
        ? 'Trigger lama diganti secara aman dengan trigger resmi, lalu diverifikasi.'
        : 'Backup harian berhasil diaktifkan dengan trigger resmi dan diverifikasi.'
    };
    logDailyBackupTriggerSetupV3Safe_('SUCCESS', result);
    return jsonSafeV3Clean_(result);
  } catch (err) {
    const rawMessage = err && err.message ? err.message : String(err);
    const authorizationRequired = isBackupTriggerAuthorizationErrorV3Safe_(rawMessage);
    const friendlyMessage = authorizationRequired
      ? 'BACKUP_TRIGGER_AUTHORIZATION_REQUIRED: Google belum memberi izin untuk membaca atau membuat pemicu Apps Script. Buka editor Apps Script, pilih fungsi setupDailyBackupTriggerV3Safe, klik Jalankan, selesaikan Tinjau izin, lalu kembali ke aplikasi dan tekan tombol ini lagi.'
      : 'BACKUP_TRIGGER_SETUP_FAILED pada tahap ' + stage + ': ' + rawMessage;

    logDailyBackupTriggerSetupV3Safe_('ERROR', {
      ok: false,
      verified: false,
      stage: stage,
      handler: handler,
      authorizationRequired: authorizationRequired,
      rawMessage: rawMessage,
      message: friendlyMessage
    });

    throw new Error(friendlyMessage);
  }
}

function removeDailyBackupTriggerV3Safe() {
  try {
    let removed = 0;
    ScriptApp.getProjectTriggers().forEach(function(t){
      if (t.getHandlerFunction() === V3_BACKUP_CONFIG.dailyHandler) {
        ScriptApp.deleteTrigger(t);
        removed++;
      }
    });
    clearDailyBackupTriggerMetaV3Safe_();
    return jsonSafeV3Clean_({ ok:true, removed:removed });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, message:err && err.message ? err.message : String(err) });
  }
}

function getBackupStatusV3Safe() {
  try {
    const folder = getOrCreateBackupFolderV3Safe_();
    const latest = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.latestName);
    const previous = getFilesByExactNameInFolderV3Safe_(folder, V3_BACKUP_CONFIG.previousName);
    const triggers = getDailyBackupTriggersV3Safe_();
    const triggerMeta = getDailyBackupTriggerMetaV3Safe_();
    const triggerCanonical = isCanonicalDailyBackupTriggerV3Safe_(triggers, triggerMeta);
    function info_(arr) {
      if (!arr.length) return null;
      const f = arr[arr.length - 1];
      const lastUpdated = f.getLastUpdated();
      const ageHours = Math.max(0, Math.round(((new Date()).getTime() - lastUpdated.getTime()) / 360000) / 10);
      return {
        id:f.getId(), name:f.getName(), url:f.getUrl(), sizeBytes:Number(f.getSize() || 0),
        updatedAt:Utilities.formatDate(lastUpdated, Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'),
        ageHours:ageHours,
        freshness:ageHours <= 30 ? 'FRESH' : 'STALE'
      };
    }
    return jsonSafeV3Clean_({
      ok:true,
      verified:latest.length === 1 && previous.length <= 1,
      folder:{ id:folder.getId(), name:folder.getName(), url:folder.getUrl(), parentName:V3_BACKUP_CONFIG.parentFolderName },
      latest:info_(latest),
      previous:info_(previous),
      latestAvailable:latest.length === 1,
      previousAvailable:previous.length === 1,
      slotCount:(latest.length ? 1 : 0) + (previous.length ? 1 : 0),
      dailyTriggerActive:triggers.length === 1,
      dailyTriggerVerified:triggerCanonical,
      dailyTriggerCanonical:triggerCanonical,
      triggerCount:triggers.length,
      triggerMeta:triggerCanonical ? triggerMeta : null,
      schedule:'Setiap hari sekitar 23.00-00.00 WIB'
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, message:err && err.message ? err.message : String(err) });
  }
}




/**
 * ============================================================
 * PORTABLE FULL BACKUP ZIP V3 - MANUAL READ-ONLY SAFE
 * VERSION: V3_FINAL_OPERATIONAL_BASELINE_2026_06_REKAP_YEAR_ARCHIVE_DYNAMIC_FROM_YELLOW_BASELINE_VERIFIED_SAFE
 *
 * Hasil satu ZIP portabel berisi:
 * - DATABASE_BUKIT_PRAGO.xlsx
 * - MANIFEST_BACKUP.json
 * - SOURCE_CODE/Kode.gs
 * - SOURCE_CODE/Index.html
 * - SOURCE_CODE/appsscript.json
 *
 * Catatan:
 * - Database aktif hanya dibaca; tidak ada sheet/cell/config yang diubah.
 * - Source code diambil dari ZIP baseline resmi yang sudah disimpan di Drive.
 * - Fitur hanya berjalan saat tombol ditekan dan tidak membuat trigger.
 * ============================================================
 */
const V3_PORTABLE_BACKUP_CONFIG = {
  parentFolderName: '03_BACKUP_V3',
  folderName: 'PORTABLE_CROSS_PLATFORM',
  sourcePackagePrefix: 'V3_FINAL_OPERATIONAL_BASELINE_',
  sourcePackageSuffix: '.zip',
  outputPrefix: 'BUKIT_PRAGO_PORTABLE_FULL_BACKUP',
  latestName: 'BUKIT_PRAGO_PORTABLE_BACKUP_TERBARU.zip',
  previousName: 'BUKIT_PRAGO_PORTABLE_BACKUP_SEBELUMNYA.zip',
  propertyFolderId: 'V3_PORTABLE_BACKUP_FOLDER_ID',
  maxZipBytes: 45 * 1024 * 1024
};

function createPortableFullBackupZipV3Safe() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1500)) {
    throw new Error('PORTABLE_BACKUP_ALREADY_RUNNING: Cadangan portabel sedang dibuat pada sesi lain. Tunggu proses sebelumnya selesai.');
  }

  const startedAt = new Date();
  const timing = {};
  function mark_(key, startMs) { timing[key] = Date.now() - startMs; }

  try {
    let phaseStart = Date.now();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('ACTIVE_SPREADSHEET_NOT_FOUND');
    const timeZone = Session.getScriptTimeZone() || 'Asia/Jakarta';
    const stamp = Utilities.formatDate(startedAt, timeZone, 'yyyy-MM-dd_HHmmss');
    const activeYear = getActiveYearV3Clean_();
    const databaseInspection = inspectPortableDatabaseV3Safe_(ss);
    mark_('inspectDatabaseMs', phaseStart);

    phaseStart = Date.now();
    const xlsxBlob = exportSpreadsheetAsXlsxV3Safe_(ss);
    validateXlsxBlobV3Safe_(xlsxBlob);
    const xlsxSha256 = sha256HexV3Safe_(xlsxBlob.getBytes());
    mark_('exportXlsxMs', phaseStart);

    phaseStart = Date.now();
    const sourcePackage = findPortableSourcePackageV3Safe_();
    const sourcePackageBlob = sourcePackage.getBlob();
    const sourceFiles = extractPortableSourceFilesV3Safe_(sourcePackageBlob);
    const sourceVersion = assertPortableSourceVersionMatchesV3Safe_(sourceFiles, V3_CLEAN_VERSION);
    const sourcePackageSha256 = sha256HexV3Safe_(sourcePackageBlob.getBytes());
    mark_('readSourcePackageMs', phaseStart);

    const outputName = V3_PORTABLE_BACKUP_CONFIG.outputPrefix + '_' + stamp + '.zip';
    const manifest = {
      format: 'BUKIT_PRAGO_PORTABLE_FULL_BACKUP_V1',
      verified: true,
      readOnlyDatabaseExport: true,
      createdAt: Utilities.formatDate(startedAt, timeZone, 'yyyy-MM-dd HH:mm:ss'),
      createdAtIso: startedAt.toISOString(),
      timeZone: timeZone,
      appVersion: V3_CLEAN_VERSION,
      activeYear: activeYear,
      sourceSpreadsheet: {
        id: ss.getId(),
        name: ss.getName(),
        sheetCount: databaseInspection.sheetCount,
        visibleSheetCount: databaseInspection.visibleSheetCount,
        hiddenSheetCount: databaseInspection.hiddenSheetCount,
        totalDataRows: databaseInspection.totalDataRows,
        totalFormulaCells: databaseInspection.totalFormulaCells,
        sheets: databaseInspection.sheets
      },
      databaseXlsx: {
        fileName: 'DATABASE_BUKIT_PRAGO.xlsx',
        sizeBytes: xlsxBlob.getBytes().length,
        sha256: xlsxSha256,
        structureValidated: true
      },
      sourceCode: {
        packageFileName: sourcePackage.getName(),
        packageFileId: sourcePackage.getId(),
        packageSha256: sourcePackageSha256,
        requiredFiles: ['Kode.gs','Index.html','appsscript.json'],
        detectedVersion: sourceVersion,
        versionMatchesRunningApp: sourceVersion === V3_CLEAN_VERSION,
        extractedAndIncluded: true
      },
      restoreGuidance: {
        database: 'File XLSX adalah salinan portabel. Untuk pemulihan aplikasi V3 penuh, gunakan prosedur migrasi/restore pada database salinan terlebih dahulu.',
        sourceCode: 'Pasang Kode.gs, Index.html, dan appsscript.json dari folder SOURCE_CODE ke project Apps Script yang sesuai.',
        validation: 'Bandingkan jumlah sheet, formula, ACTIVE_YEAR, dan checksum sebelum digunakan.'
      }
    };

    phaseStart = Date.now();
    const manifestBlob = Utilities.newBlob(JSON.stringify(manifest, null, 2), 'application/json', 'MANIFEST_BACKUP.json');
    const readmeBlob = Utilities.newBlob(buildPortableBackupReadmeV3Safe_(manifest), 'text/plain', 'README_RESTORE.txt');
    const zipBlobs = [xlsxBlob, manifestBlob, readmeBlob].concat(sourceFiles);
    const zipBlob = Utilities.zip(zipBlobs, outputName);
    const zipBytes = zipBlob.getBytes();
    if (!zipBytes.length) throw new Error('PORTABLE_ZIP_EMPTY');
    if (zipBytes.length > V3_PORTABLE_BACKUP_CONFIG.maxZipBytes) {
      throw new Error('PORTABLE_ZIP_TOO_LARGE:' + zipBytes.length);
    }
    validatePortableZipBlobV3Safe_(zipBlob);
    const zipSha256 = sha256HexV3Safe_(zipBytes);
    mark_('buildAndValidateZipMs', phaseStart);

    phaseStart = Date.now();
    const folder = getOrCreatePortableBackupFolderV3Safe_();
    const file = folder.createFile(zipBlob);
    if (!file || !file.getId()) throw new Error('PORTABLE_ZIP_DRIVE_CREATE_FAILED');
    const persisted = DriveApp.getFileById(file.getId());
    if (Number(persisted.getSize() || 0) <= 0) throw new Error('PORTABLE_ZIP_DRIVE_FILE_EMPTY');
    const persistedBlob = persisted.getBlob();
    validatePortableZipBlobV3Safe_(persistedBlob);
    const persistedSha256 = sha256HexV3Safe_(persistedBlob.getBytes());
    if (persistedSha256 !== zipSha256) throw new Error('PORTABLE_ZIP_DRIVE_CHECKSUM_MISMATCH');

    const slotRotation = rotatePortableBackupSlotsV3Safe_(folder, persisted);
    const canonicalLatest = DriveApp.getFileById(slotRotation.latestId);
    const canonicalBlob = canonicalLatest.getBlob();
    validatePortableZipBlobV3Safe_(canonicalBlob);
    const canonicalSha256 = sha256HexV3Safe_(canonicalBlob.getBytes());
    if (canonicalSha256 !== zipSha256) throw new Error('PORTABLE_LATEST_SLOT_CHECKSUM_MISMATCH');
    mark_('saveDriveMs', phaseStart);

    timing.totalMs = Date.now() - startedAt.getTime();
    const result = {
      ok: true,
      verified: true,
      readOnlyDatabaseExport: true,
      timestamp: manifest.createdAt,
      activeYear: activeYear,
      file: {
        id: canonicalLatest.getId(),
        name: canonicalLatest.getName(),
        sizeBytes: Number(canonicalLatest.getSize() || 0),
        sha256: zipSha256,
        persistedVerified: true,
        url: canonicalLatest.getUrl(),
        downloadUrl: 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(canonicalLatest.getId())
      },
      folder: { id: folder.getId(), name: folder.getName(), url: folder.getUrl() },
      portableSlots: slotRotation,
      database: {
        sheetCount: databaseInspection.sheetCount,
        visibleSheetCount: databaseInspection.visibleSheetCount,
        hiddenSheetCount: databaseInspection.hiddenSheetCount,
        totalDataRows: databaseInspection.totalDataRows,
        totalFormulaCells: databaseInspection.totalFormulaCells,
        xlsxSizeBytes: xlsxBlob.getBytes().length,
        xlsxSha256: xlsxSha256
      },
      sourcePackage: {
        name: sourcePackage.getName(),
        id: sourcePackage.getId(),
        sha256: sourcePackageSha256,
        detectedVersion: sourceVersion,
        versionMatchesRunningApp: sourceVersion === V3_CLEAN_VERSION
      },
      timing: timing,
      txTouched: false,
      archiveTouched: false,
      activeYearChanged: false,
      triggerChanged: false,
      message: 'Cadangan ZIP lengkap berhasil dibuat, diverifikasi, dan disimpan dalam dua slot TERBARU/SEBELUMNYA. Unduh TERBARU lalu simpan di platform selain Google.'
    };
    console.log('[V3_PORTABLE_BACKUP][SUCCESS] ' + JSON.stringify(result));
    return jsonSafeV3Clean_(result);
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    console.error('[V3_PORTABLE_BACKUP][ERROR] ' + message);
    throw new Error('PORTABLE_FULL_BACKUP_FAILED: ' + message);
  } finally {
    lock.releaseLock();
  }
}


function rotatePortableBackupSlotsV3Safe_(folder, newVerifiedFile) {
  if (!folder || !newVerifiedFile) throw new Error('PORTABLE_SLOT_ROTATION_INPUT_INVALID');

  const latestName = V3_PORTABLE_BACKUP_CONFIG.latestName;
  const previousName = V3_PORTABLE_BACKUP_CONFIG.previousName;
  const newId = String(newVerifiedFile.getId());
  const files = [];
  const it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    if (!f.isTrashed()) files.push(f);
  }

  const existingLatest = files.filter(function(f) {
    return String(f.getId()) !== newId && String(f.getName()) === latestName;
  }).sort(function(a,b) { return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });

  const existingPrevious = files.filter(function(f) {
    return String(f.getId()) !== newId && String(f.getName()) === previousName;
  }).sort(function(a,b) { return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });

  const legacy = files.filter(function(f) {
    const name = String(f.getName());
    return String(f.getId()) !== newId &&
      name !== latestName && name !== previousName &&
      name.indexOf(V3_PORTABLE_BACKUP_CONFIG.outputPrefix + '_') === 0 &&
      /\.zip$/i.test(name);
  }).sort(function(a,b) { return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });

  // Create-before-delete: snapshot baru sudah tersimpan dan tervalidasi sebelum rotasi dimulai.
  newVerifiedFile.setName(latestName);

  let previousCandidate = null;
  if (existingLatest.length) previousCandidate = existingLatest[0];
  else if (legacy.length) previousCandidate = legacy[0];
  else if (existingPrevious.length) previousCandidate = existingPrevious[0];

  if (previousCandidate) previousCandidate.setName(previousName);

  const keepIds = {};
  keepIds[newId] = true;
  if (previousCandidate) keepIds[String(previousCandidate.getId())] = true;

  files.forEach(function(f) {
    const id = String(f.getId());
    const name = String(f.getName());
    const managed = name === latestName || name === previousName ||
      (name.indexOf(V3_PORTABLE_BACKUP_CONFIG.outputPrefix + '_') === 0 && /\.zip$/i.test(name));
    if (managed && !keepIds[id]) f.setTrashed(true);
  });

  const after = [];
  const afterIt = folder.getFiles();
  while (afterIt.hasNext()) {
    const f = afterIt.next();
    if (!f.isTrashed()) after.push(f);
  }
  const latestAfter = after.filter(function(f){ return String(f.getName()) === latestName; });
  const previousAfter = after.filter(function(f){ return String(f.getName()) === previousName; });
  const legacyAfter = after.filter(function(f){
    const n = String(f.getName());
    return n.indexOf(V3_PORTABLE_BACKUP_CONFIG.outputPrefix + '_') === 0 && /\.zip$/i.test(n);
  });

  if (latestAfter.length !== 1 || String(latestAfter[0].getId()) !== newId) {
    throw new Error('PORTABLE_SLOT_LATEST_VERIFICATION_FAILED:' + latestAfter.length);
  }
  if (previousAfter.length > 1) throw new Error('PORTABLE_SLOT_PREVIOUS_DUPLICATE:' + previousAfter.length);
  if (legacyAfter.length) throw new Error('PORTABLE_SLOT_LEGACY_CLEANUP_FAILED:' + legacyAfter.length);

  return {
    verified: true,
    latestId: latestAfter[0].getId(),
    latestName: latestAfter[0].getName(),
    previousId: previousAfter.length ? previousAfter[0].getId() : '',
    previousName: previousAfter.length ? previousAfter[0].getName() : '',
    slotCount: 1 + (previousAfter.length ? 1 : 0),
    legacyRemaining: 0
  };
}

function inspectPortableDatabaseV3Safe_(ss) {
  const sheets = ss.getSheets();
  const details = [];
  let totalDataRows = 0;
  let totalFormulaCells = 0;
  let visibleSheetCount = 0;
  let hiddenSheetCount = 0;

  sheets.forEach(function(sheet) {
    const lastRow = Number(sheet.getLastRow() || 0);
    const lastColumn = Number(sheet.getLastColumn() || 0);
    let formulaCount = 0;
    if (lastRow > 0 && lastColumn > 0) {
      const formulas = sheet.getRange(1, 1, lastRow, lastColumn).getFormulas();
      formulas.forEach(function(row) {
        row.forEach(function(formula) { if (formula) formulaCount++; });
      });
    }
    const hidden = sheet.isSheetHidden();
    if (hidden) hiddenSheetCount++; else visibleSheetCount++;
    totalDataRows += lastRow;
    totalFormulaCells += formulaCount;
    details.push({
      name: sheet.getName(),
      index: sheet.getIndex(),
      hidden: hidden,
      lastRow: lastRow,
      lastColumn: lastColumn,
      formulaCells: formulaCount
    });
  });

  if (!sheets.length) throw new Error('DATABASE_HAS_NO_SHEETS');
  return {
    sheetCount: sheets.length,
    visibleSheetCount: visibleSheetCount,
    hiddenSheetCount: hiddenSheetCount,
    totalDataRows: totalDataRows,
    totalFormulaCells: totalFormulaCells,
    sheets: details
  };
}

function exportSpreadsheetAsXlsxV3Safe_(ss) {
  const url = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(ss.getId()) + '/export?format=xlsx';
  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
    followRedirects: true
  });
  const code = Number(response.getResponseCode());
  if (code < 200 || code >= 300) {
    throw new Error('XLSX_EXPORT_HTTP_' + code + ':' + String(response.getContentText() || '').slice(0, 300));
  }
  const blob = response.getBlob().setName('DATABASE_BUKIT_PRAGO.xlsx');
  if (!blob.getBytes().length) throw new Error('XLSX_EXPORT_EMPTY');
  return blob;
}

function validateXlsxBlobV3Safe_(blob) {
  let entries;
  try {
    const zipView = blob.copyBlob().setContentType('application/zip');
    entries = Utilities.unzip(zipView);
  } catch (err) {
    throw new Error('XLSX_STRUCTURE_INVALID:' + (err && err.message ? err.message : String(err)));
  }
  const names = entries.map(function(b) { return b.getName(); });
  if (names.indexOf('[Content_Types].xml') < 0 || names.indexOf('xl/workbook.xml') < 0) {
    throw new Error('XLSX_REQUIRED_STRUCTURE_MISSING');
  }
  return true;
}

function findPortableSourcePackageV3Safe_() {
  const prefix = String(V3_PORTABLE_BACKUP_CONFIG.sourcePackagePrefix || 'V3_FINAL_OPERATIONAL_BASELINE_');
  const suffix = String(V3_PORTABLE_BACKUP_CONFIG.sourcePackageSuffix || '.zip').toLowerCase();
  const escapedPrefix = prefix.replace(/'/g, "\'");
  const query = "trashed = false and title contains '" + escapedPrefix + "'";
  const candidates = [];
  const it = DriveApp.searchFiles(query);

  while (it.hasNext()) {
    const file = it.next();
    const name = String(file.getName() || '');
    if (name.indexOf(prefix) !== 0) continue;
    if (name.toLowerCase().slice(-suffix.length) !== suffix) continue;
    candidates.push(file);
  }

  if (!candidates.length) {
    throw new Error('SOURCE_PACKAGE_NOT_FOUND: Tidak ditemukan ZIP baseline dengan awalan ' + prefix + ' di Google Drive. Upload paket baseline aktif: ' + V3_CLEAN_VERSION + '.zip');
  }

  candidates.sort(function(a, b) {
    const updatedDiff = b.getLastUpdated().getTime() - a.getLastUpdated().getTime();
    if (updatedDiff) return updatedDiff;
    return b.getDateCreated().getTime() - a.getDateCreated().getTime();
  });

  const rejected = [];
  for (let i = 0; i < candidates.length; i++) {
    const file = candidates[i];
    try {
      const sourceFiles = extractPortableSourceFilesV3Safe_(file.getBlob());
      const detectedVersion = assertPortableSourceVersionMatchesV3Safe_(sourceFiles, V3_CLEAN_VERSION);
      console.log('[V3_PORTABLE_BACKUP][SOURCE_EXACT_VERSION_SELECTED] ' + JSON.stringify({
        name: file.getName(),
        id: file.getId(),
        detectedVersion: detectedVersion,
        runningVersion: V3_CLEAN_VERSION,
        lastUpdated: file.getLastUpdated().toISOString(),
        candidateCount: candidates.length,
        rejectedNewerCount: rejected.length
      }));
      return file;
    } catch (err) {
      rejected.push({
        name: file.getName(),
        id: file.getId(),
        reason: err && err.message ? err.message : String(err)
      });
    }
  }

  throw new Error('SOURCE_PACKAGE_EXACT_VERSION_NOT_FOUND: Tidak ada ZIP source yang versinya sama dengan aplikasi aktif ' + V3_CLEAN_VERSION + '. Upload ZIP baseline aktif tersebut ke Drive. Kandidat ditolak: ' + JSON.stringify(rejected.slice(0, 8)));
}

function extractPortableSourceFilesV3Safe_(zipBlob) {
  let entries;
  try {
    const zipView = zipBlob.copyBlob().setContentType('application/zip');
    entries = Utilities.unzip(zipView);
  } catch (err) {
    throw new Error('SOURCE_PACKAGE_ZIP_INVALID:' + (err && err.message ? err.message : String(err)));
  }
  const required = ['Kode.gs','Index.html','appsscript.json'];
  const found = {};
  entries.forEach(function(blob) {
    const normalized = String(blob.getName() || '').replace(/\\/g, '/');
    required.forEach(function(name) {
      if (!found[name] && (normalized === name || normalized.slice(-(name.length + 1)) === '/' + name)) {
        found[name] = blob;
      }
    });
  });
  required.forEach(function(name) {
    if (!found[name]) throw new Error('SOURCE_PACKAGE_REQUIRED_FILE_MISSING:' + name);
  });
  return required.map(function(name) {
    return found[name].copyBlob().setName('SOURCE_CODE/' + name);
  });
}

function detectPortableSourceVersionV3Safe_(sourceFiles) {
  const kodeBlob = (sourceFiles || []).filter(function(blob) {
    return /(^|\/)Kode\.gs$/i.test(String(blob.getName() || ''));
  })[0];
  if (!kodeBlob) throw new Error('SOURCE_PACKAGE_KODE_GS_NOT_FOUND');
  const kodeText = kodeBlob.getDataAsString('UTF-8');
  const match = kodeText.match(/const\s+V3_CLEAN_VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (!match || !match[1]) throw new Error('SOURCE_PACKAGE_VERSION_NOT_DETECTED');
  return String(match[1]).trim();
}

function assertPortableSourceVersionMatchesV3Safe_(sourceFiles, expectedVersion) {
  const detected = detectPortableSourceVersionV3Safe_(sourceFiles);
  const expected = String(expectedVersion || '').trim();
  if (!expected) throw new Error('RUNNING_APP_VERSION_EMPTY');
  if (detected !== expected) {
    throw new Error('SOURCE_PACKAGE_VERSION_MISMATCH: detected=' + detected + '; expected=' + expected);
  }
  return detected;
}

function getOrCreatePortableBackupFolderV3Safe_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(V3_PORTABLE_BACKUP_CONFIG.propertyFolderId);
  if (savedId) {
    try {
      const saved = DriveApp.getFolderById(savedId);
      if (saved.getName() === V3_PORTABLE_BACKUP_CONFIG.folderName && folderHasParentNamedV3Safe_(saved, V3_PORTABLE_BACKUP_CONFIG.parentFolderName)) {
        return saved;
      }
    } catch (ignore) {}
    props.deleteProperty(V3_PORTABLE_BACKUP_CONFIG.propertyFolderId);
  }

  const parents = DriveApp.getFoldersByName(V3_PORTABLE_BACKUP_CONFIG.parentFolderName);
  if (!parents.hasNext()) throw new Error('PORTABLE_BACKUP_PARENT_FOLDER_NOT_FOUND:' + V3_PORTABLE_BACKUP_CONFIG.parentFolderName);
  const parent = parents.next();
  const children = parent.getFoldersByName(V3_PORTABLE_BACKUP_CONFIG.folderName);
  const folder = children.hasNext() ? children.next() : parent.createFolder(V3_PORTABLE_BACKUP_CONFIG.folderName);
  props.setProperty(V3_PORTABLE_BACKUP_CONFIG.propertyFolderId, folder.getId());
  return folder;
}

function validatePortableZipBlobV3Safe_(zipBlob) {
  let entries;
  try {
    const zipView = zipBlob.copyBlob().setContentType('application/zip');
    entries = Utilities.unzip(zipView);
  } catch (err) {
    throw new Error('PORTABLE_ZIP_INVALID:' + (err && err.message ? err.message : String(err)));
  }
  const names = entries.map(function(blob) { return blob.getName(); });
  ['DATABASE_BUKIT_PRAGO.xlsx','MANIFEST_BACKUP.json','README_RESTORE.txt','SOURCE_CODE/Kode.gs','SOURCE_CODE/Index.html','SOURCE_CODE/appsscript.json'].forEach(function(required) {
    if (names.indexOf(required) < 0) throw new Error('PORTABLE_ZIP_REQUIRED_ENTRY_MISSING:' + required);
  });
  return true;
}

function sha256HexV3Safe_(bytes) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes).map(function(value) {
    const unsigned = value < 0 ? value + 256 : value;
    return ('0' + unsigned.toString(16)).slice(-2);
  }).join('');
}

function buildPortableBackupReadmeV3Safe_(manifest) {
  return [
    'BUKIT PRAGO - PORTABLE FULL BACKUP',
    '===================================',
    'Dibuat: ' + manifest.createdAt + ' (' + manifest.timeZone + ')',
    'Versi aplikasi: ' + manifest.appVersion,
    'ACTIVE_YEAR: ' + manifest.activeYear,
    'Jumlah sheet: ' + manifest.sourceSpreadsheet.sheetCount,
    'Jumlah formula: ' + manifest.sourceSpreadsheet.totalFormulaCells,
    '',
    'ISI:',
    '- DATABASE_BUKIT_PRAGO.xlsx : salinan database lengkap yang dapat dibuka di luar Google Sheets.',
    '- MANIFEST_BACKUP.json       : identitas, statistik, dan checksum validasi.',
    '- SOURCE_CODE/               : Kode.gs, Index.html, dan appsscript.json.',
    '',
    'PENTING:',
    '1. Simpan ZIP ini di OneDrive, Dropbox, NAS, hard disk, atau penyedia selain Google.',
    '2. Jangan menguji pemulihan langsung pada database produksi.',
    '3. Uji file XLSX dan source code pada salinan/environment uji terlebih dahulu.',
    '4. Cocokkan ACTIVE_YEAR, jumlah sheet, formula, dan checksum sebelum digunakan.',
    ''
  ].join('\\r\\n');
}


/**
 * ============================================================
 * RESTORE TOTAL DATABASE V3 - 2 SLOT FORMULA AWARE PROFESSIONAL SAFE
 * VERSION: V3_FINAL_OPERATIONAL_BASELINE_2026_06_REKAP_YEAR_ARCHIVE_DYNAMIC_FROM_YELLOW_BASELINE_VERIFIED_SAFE
 *
 * Prinsip keselamatan:
 * - Preview mengunci fileId + fingerprint logis sumber.
 * - Mendukung formula internal/lintas-sheet secara aman dengan re-apply formula
 *   setelah semua sheet tujuan sudah memiliki nama final.
 * - Menolak sumber yang sudah mengandung formula #REF! atau error formula fatal.
 * - Snapshot darurat dibuat dan diverifikasi sebelum fase destruktif.
 * - Validasi membandingkan sheet, dimensi, nilai non-formula, formula, merged range,
 *   properti sheet, named range, ACTIVE_YEAR, dan error formula.
 * - Rollback memakai mesin restore yang sama dan wajib tervalidasi.
 * - Slot TERBARU/SEBELUMNYA tidak pernah diubah oleh restore.
 * ============================================================
 */
const V3_RESTORE_TOTAL_CONFIG = {
  emergencyFolderName: 'RESTORE_SAFETY_SNAPSHOTS',
  emergencyLatestName: 'RESTORE_SAFETY_SNAPSHOT_TERBARU',
  emergencyPreviousName: 'RESTORE_SAFETY_SNAPSHOT_SEBELUMNYA',
  emergencyTempPrefix: '__RESTORE_SAFETY_SNAPSHOT_TEMP_',
  legacyEmergencyPrefix: 'BUKIT_PRAGO_V3_PRE_RESTORE_',
  tempMarkerPrefix: '__V3_RESTORE_MARKER_',
  tempCopyPrefix: '__V3_RESTORE_COPY_',
  maxFormulaCells: 50000,
  requiredSheets: Object.keys(V3C.SHEETS).map(function(k){ return V3C.SHEETS[k]; })
};

function previewRestoreTotalV3Safe(slot) {
  try {
    const slotName = normalizeRestoreSlotV3Safe_(slot);
    const file = getCanonicalRestoreSlotFileV3Safe_(slotName);
    const source = SpreadsheetApp.openById(file.getId());
    const inspection = inspectSpreadsheetForRestoreV3Safe_(source, true);
    validateRestoreSourceInspectionV3Safe_(inspection);
    return jsonSafeV3Clean_({
      ok:true,
      previewOnly:true,
      slot:slotName,
      confirmationText:'RESTORE TOTAL ' + slotName,
      file:backupFileInfoV3Safe_(file),
      sourceSpreadsheetName:source.getName(),
      sourceFingerprint:inspection.fingerprint,
      activeYear:inspection.activeYear,
      sheetCount:inspection.sheetCount,
      totalDataRows:inspection.totalDataRows,
      formulaCellCount:inspection.formulaCellCount,
      formulaErrorCount:inspection.formulaErrorCount,
      namedRangeCount:inspection.namedRangeCount,
      sheets:inspection.sheets,
      requiredSheetsPresent:inspection.requiredSheetsPresent,
      formulaMode:'SUPPORTED_AND_REBOUND_AFTER_FINAL_SHEET_NAMES',
      databaseTouched:false,
      backupSlotsTouched:false,
      message:'Preview restore total siap. Formula didukung dan akan dipasang ulang setelah seluruh nama sheet final tersedia. Database belum diubah.'
    });
  } catch (err) {
    return jsonSafeV3Clean_({ ok:false, previewOnly:true, message:err && err.message ? err.message : String(err) });
  }
}

function restoreTotalFromBackupV3Safe(payload) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(60000)) return jsonSafeV3Clean_({ ok:false, message:'RESTORE_LOCK_TIMEOUT' });
  let emergencyFile = null;
  let restoreStarted = false;
  let rollbackCompletedAndVerified = false;
  let preRestoreInspection = null;
  try {
    const p = payload || {};
    const slotName = normalizeRestoreSlotV3Safe_(p.slot);
    const expectedConfirmation = 'RESTORE TOTAL ' + slotName;
    if (String(p.confirmationText || '').trim().toUpperCase() !== expectedConfirmation) throw new Error('RESTORE_CONFIRMATION_TEXT_INVALID');
    if (p.acceptRisk !== true) throw new Error('RESTORE_RISK_CONFIRMATION_REQUIRED');

    const sourceFile = getCanonicalRestoreSlotFileV3Safe_(slotName);
    if (!p.expectedFileId || String(p.expectedFileId) !== String(sourceFile.getId())) throw new Error('RESTORE_PREVIEW_EXPIRED_OR_FILE_CHANGED');

    const activeSS = SpreadsheetApp.getActiveSpreadsheet();
    if (!activeSS) throw new Error('ACTIVE_SPREADSHEET_NOT_FOUND');
    if (String(activeSS.getId()) === String(sourceFile.getId())) throw new Error('RESTORE_SOURCE_EQUALS_ACTIVE_DATABASE');

    const sourceSS = SpreadsheetApp.openById(sourceFile.getId());
    const sourceInspection = inspectSpreadsheetForRestoreV3Safe_(sourceSS, true);
    validateRestoreSourceInspectionV3Safe_(sourceInspection);
    if (!p.expectedFingerprint || String(p.expectedFingerprint) !== String(sourceInspection.fingerprint)) {
      throw new Error('RESTORE_PREVIEW_FINGERPRINT_CHANGED_RUN_PREVIEW_AGAIN');
    }

    preRestoreInspection = inspectSpreadsheetForRestoreV3Safe_(activeSS, true);
    validateActiveDatabaseForRestoreV3Safe_(preRestoreInspection);

    emergencyFile = createPreRestoreEmergencySnapshotV3Safe_(activeSS, slotName);
    if (!emergencyFile) throw new Error('PRE_RESTORE_EMERGENCY_BACKUP_FAILED');

    const emergencySS = SpreadsheetApp.openById(emergencyFile.getId());
    const emergencyInspection = inspectSpreadsheetForRestoreV3Safe_(emergencySS, true);
    const emergencyComparison = compareRestoreInspectionsV3Safe_(preRestoreInspection, emergencyInspection);
    if (!emergencyComparison.ok) throw new Error('PRE_RESTORE_EMERGENCY_BACKUP_VALIDATION_FAILED:' + emergencyComparison.issues.join('|'));

    emergencyFile = finalizeEmergencySnapshotTwoSlotV3Safe_(emergencyFile);

    restoreStarted = true;
    const restoreResult = replaceAllSheetsFromSourceV3Safe_(sourceSS, activeSS);
    SpreadsheetApp.flush();
    Utilities.sleep(1000);
    SpreadsheetApp.flush();

    const finalInspection = inspectSpreadsheetForRestoreV3Safe_(activeSS, true);
    const comparison = compareRestoreInspectionsV3Safe_(sourceInspection, finalInspection);
    if (!comparison.ok) {
      const rollback = rollbackAndVerifyRestoreV3Safe_(emergencyFile, activeSS, preRestoreInspection);
      rollbackCompletedAndVerified = rollback.ok;
      if (!rollback.ok) throw new Error('RESTORE_VALIDATION_FAILED_AND_ROLLBACK_NOT_VERIFIED:' + rollback.issues.join('|') + ':EMERGENCY=' + emergencyFile.getUrl());
      throw new Error('RESTORE_VALIDATION_FAILED_ROLLED_BACK_VERIFIED:' + comparison.issues.join('|'));
    }

    try { Logger.log('RESTORE_TOTAL_SUCCESS_V3 ' + JSON.stringify({slot:slotName, emergencyFileId:emergencyFile.getId()})); } catch (ignoreLog) {}
    return jsonSafeV3Clean_({
      ok:true,
      verified:true,
      status:'RESTORE_TOTAL_SUCCESS',
      slot:slotName,
      source:backupFileInfoV3Safe_(sourceFile),
      emergencyBackup:backupFileInfoV3Safe_(emergencyFile),
      activeYear:finalInspection.activeYear,
      sheetCount:finalInspection.sheetCount,
      totalDataRows:finalInspection.totalDataRows,
      formulaCellCount:finalInspection.formulaCellCount,
      namedRangeCount:finalInspection.namedRangeCount,
      restoredSheets:restoreResult.restoredSheets,
      validation:comparison,
      snapshotValidation:emergencyComparison,
      backupSlotsTouched:false,
      message:'Restore total berhasil dan tervalidasi. Nilai non-formula, formula, struktur sheet, named range, dan ACTIVE_YEAR sesuai backup ' + slotName + '.'
    });
  } catch (err) {
    const originalMessage = err && err.message ? err.message : String(err);
    let automaticRollback = null;
    if (restoreStarted && emergencyFile && !rollbackCompletedAndVerified && preRestoreInspection) {
      automaticRollback = rollbackAndVerifyRestoreV3Safe_(emergencyFile, SpreadsheetApp.getActiveSpreadsheet(), preRestoreInspection);
      rollbackCompletedAndVerified = automaticRollback.ok;
    }
    try { Logger.log('RESTORE_TOTAL_FAILED_V3 ' + JSON.stringify({message:originalMessage, rollbackVerified:rollbackCompletedAndVerified})); } catch (ignoreLog2) {}
    return jsonSafeV3Clean_({
      ok:false,
      message:originalMessage,
      restoreStarted:restoreStarted,
      rollbackVerified:rollbackCompletedAndVerified,
      rollback:automaticRollback,
      emergencyBackup:emergencyFile ? backupFileInfoV3Safe_(emergencyFile) : null,
      backupSlotsTouched:false
    });
  } finally {
    try { lock.releaseLock(); } catch (ignoreRelease) {}
  }
}

function normalizeRestoreSlotV3Safe_(slot) {
  const s = String(slot || '').trim().toUpperCase();
  if (s !== 'TERBARU' && s !== 'SEBELUMNYA') throw new Error('RESTORE_SLOT_INVALID');
  return s;
}

function getCanonicalRestoreSlotFileV3Safe_(slotName) {
  const folder = getOrCreateBackupFolderV3Safe_();
  const fileName = slotName === 'TERBARU' ? V3_BACKUP_CONFIG.latestName : V3_BACKUP_CONFIG.previousName;
  const files = getFilesByExactNameInFolderV3Safe_(folder, fileName);
  if (files.length !== 1) throw new Error('RESTORE_SLOT_FILE_COUNT_INVALID:' + slotName + ':' + files.length);
  const file = files[0];
  if (file.getMimeType() !== MimeType.GOOGLE_SHEETS) throw new Error('RESTORE_SOURCE_NOT_GOOGLE_SHEETS:' + slotName);
  return file;
}

function getOrCreateRestoreSafetyFolderV3Safe_() {
  const canonical = getOrCreateBackupFolderV3Safe_();
  const folders = canonical.getFoldersByName(V3_RESTORE_TOTAL_CONFIG.emergencyFolderName);
  if (folders.hasNext()) return folders.next();
  return canonical.createFolder(V3_RESTORE_TOTAL_CONFIG.emergencyFolderName);
}

function createPreRestoreEmergencySnapshotV3Safe_(activeSS, slotName) {
  SpreadsheetApp.flush();
  const safetyFolder = getOrCreateRestoreSafetyFolderV3Safe_();
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMdd_HHmmss_SSS');
  const tempName = V3_RESTORE_TOTAL_CONFIG.emergencyTempPrefix + stamp + '_FROM_' + slotName;
  const copy = DriveApp.getFileById(activeSS.getId()).makeCopy(tempName, safetyFolder);
  const verified = DriveApp.getFileById(copy.getId());
  if (!verified || verified.getName() !== tempName || verified.getMimeType() !== MimeType.GOOGLE_SHEETS) throw new Error('EMERGENCY_BACKUP_FILE_VERIFICATION_FAILED');
  return verified;
}

function getExactFilesInRestoreSafetyFolderV3Safe_(folder, fileName) {
  const out = [], it = folder.getFilesByName(fileName);
  while (it.hasNext()) out.push(it.next());
  return out;
}

function finalizeEmergencySnapshotTwoSlotV3Safe_(newSnapshotFile) {
  const folder = getOrCreateRestoreSafetyFolderV3Safe_();
  const latestName = V3_RESTORE_TOTAL_CONFIG.emergencyLatestName;
  const previousName = V3_RESTORE_TOTAL_CONFIG.emergencyPreviousName;
  const newId = String(newSnapshotFile.getId());
  const recognized = [];
  const it = folder.getFiles();
  while (it.hasNext()) {
    const file = it.next();
    if (String(file.getId()) === newId) continue;
    const name = String(file.getName() || '');
    const isCanonical = name === latestName || name === previousName;
    const isLegacy = name.indexOf(V3_RESTORE_TOTAL_CONFIG.legacyEmergencyPrefix) === 0;
    const isTemp = name.indexOf(V3_RESTORE_TOTAL_CONFIG.emergencyTempPrefix) === 0;
    if (isCanonical || isLegacy || isTemp) recognized.push(file);
  }
  recognized.sort(function(a,b){ return b.getDateCreated().getTime() - a.getDateCreated().getTime(); });

  const oldLatest = recognized.filter(function(file){ return String(file.getName()) === latestName; });
  const previousCandidate = oldLatest.length ? oldLatest[0] : (recognized.length ? recognized[0] : null);

  newSnapshotFile.setName(latestName);
  if (previousCandidate) previousCandidate.setName(previousName);

  const postRename = [], postIt = folder.getFiles();
  while (postIt.hasNext()) {
    const file = postIt.next();
    const name = String(file.getName() || '');
    if (name === latestName || name === previousName ||
        name.indexOf(V3_RESTORE_TOTAL_CONFIG.legacyEmergencyPrefix) === 0 ||
        name.indexOf(V3_RESTORE_TOTAL_CONFIG.emergencyTempPrefix) === 0) postRename.push(file);
  }

  const finalLatest = postRename.filter(function(file){ return String(file.getName()) === latestName; });
  if (finalLatest.length !== 1 || String(finalLatest[0].getId()) !== newId) {
    throw new Error('RESTORE_SAFETY_2SLOT_LATEST_VERIFICATION_FAILED:' + finalLatest.length);
  }

  const previousId = previousCandidate ? String(previousCandidate.getId()) : '';
  postRename.forEach(function(file){
    const id = String(file.getId());
    if (id === newId || (previousId && id === previousId)) return;
    file.setTrashed(true);
  });

  const verifiedLatest = getExactFilesInRestoreSafetyFolderV3Safe_(folder, latestName);
  const verifiedPrevious = getExactFilesInRestoreSafetyFolderV3Safe_(folder, previousName);
  if (verifiedLatest.length !== 1 || String(verifiedLatest[0].getId()) !== newId) {
    throw new Error('RESTORE_SAFETY_2SLOT_FINAL_LATEST_INVALID:' + verifiedLatest.length);
  }
  if (verifiedPrevious.length > 1) throw new Error('RESTORE_SAFETY_2SLOT_FINAL_PREVIOUS_DUPLICATE:' + verifiedPrevious.length);
  if (previousId && (verifiedPrevious.length !== 1 || String(verifiedPrevious[0].getId()) !== previousId)) {
    throw new Error('RESTORE_SAFETY_2SLOT_PREVIOUS_VERIFICATION_FAILED');
  }
  return verifiedLatest[0];
}

function inspectSpreadsheetForRestoreV3Safe_(ss, withChecksum) {
  const sheets = ss.getSheets();
  const info = sheets.map(function(sh){ return inspectSheetForRestoreV3Safe_(sh, withChecksum); });
  const names = info.map(function(x){ return x.name; });
  const missing = V3_RESTORE_TOTAL_CONFIG.requiredSheets.filter(function(name){ return names.indexOf(name) === -1; });
  const formulaCellCount = info.reduce(function(sum,x){ return sum + Number(x.formulaCellCount || 0); }, 0);
  const formulaErrorCount = info.reduce(function(sum,x){ return sum + Number(x.formulaErrorCount || 0); }, 0);
  const namedRanges = inspectNamedRangesV3Safe_(ss);
  const fingerprintText = info.map(function(x){
    return [x.name,x.lastRow,x.lastColumn,x.staticValueChecksum,x.formulaCellCount,x.formulaChecksum,x.formulaErrorChecksum,x.mergedChecksum,x.propertyChecksum].join('\u001F');
  }).join('\u001E') + '\u001D' + namedRanges.checksum;
  return {
    spreadsheetId:ss.getId(), spreadsheetName:ss.getName(), sheetCount:info.length,
    totalDataRows:info.reduce(function(sum,x){ return sum + x.dataRows; }, 0),
    activeYear:readActiveYearFromSpreadsheetV3Safe_(ss),
    formulaCellCount:formulaCellCount,
    formulaErrorCount:formulaErrorCount,
    namedRangeCount:namedRanges.items.length,
    namedRangeChecksum:namedRanges.checksum,
    namedRanges:namedRanges.items,
    requiredSheetsPresent:missing.length === 0,
    missingRequiredSheets:missing,
    fingerprint:sha256TextV3Safe_(fingerprintText),
    sheets:info
  };
}

function inspectSheetForRestoreV3Safe_(sh, withChecksum) {
  const lastRow = sh.getLastRow();
  const lastColumn = sh.getLastColumn();
  const dataRows = Math.max(0, lastRow - (lastRow ? 1 : 0));
  let formulas = [];
  let values = [];
  let displays = [];
  if (lastRow && lastColumn) {
    const range = sh.getRange(1,1,lastRow,lastColumn);
    formulas = range.getFormulas();
    values = range.getValues();
    displays = range.getDisplayValues();
  }
  let formulaCount = 0;
  const formulaParts = [];
  const staticParts = [];
  const errorParts = [];
  for (let r=0;r<lastRow;r++) {
    for (let c=0;c<lastColumn;c++) {
      const f = String((formulas[r] && formulas[r][c]) || '');
      const address = columnToLettersV3Safe_(c + 1) + String(r + 1);
      if (f) {
        formulaCount++;
        formulaParts.push(address + '\u001F' + f);
        const display = String((displays[r] && displays[r][c]) || '');
        if (isFormulaErrorDisplayV3Safe_(display)) errorParts.push(address + '\u001F' + display);
      } else {
        staticParts.push(address + '\u001F' + normalizeCellValueForHashV3Safe_(values[r] ? values[r][c] : ''));
      }
    }
  }
  const merged = sh.getRange(1,1,sh.getMaxRows(),sh.getMaxColumns()).getMergedRanges().map(function(rg){ return rg.getA1Notation(); }).sort();
  const propertyText = [
    sh.getFrozenRows(), sh.getFrozenColumns(), sh.isSheetHidden() ? 1 : 0,
    String(sh.getTabColor() || ''), sh.getMaxRows(), sh.getMaxColumns()
  ].join('\u001F');
  return {
    name:sh.getName(), lastRow:lastRow, lastColumn:lastColumn, dataRows:dataRows,
    staticValueChecksum:withChecksum ? sha256TextV3Safe_(staticParts.join('\u001E')) : '',
    formulaCellCount:formulaCount,
    formulaChecksum:withChecksum ? sha256TextV3Safe_(formulaParts.join('\u001E')) : '',
    formulaErrorCount:errorParts.length,
    formulaErrorChecksum:withChecksum ? sha256TextV3Safe_(errorParts.join('\u001E')) : '',
    formulaErrors:errorParts,
    mergedChecksum:withChecksum ? sha256TextV3Safe_(merged.join('\u001E')) : '',
    mergedRanges:merged,
    propertyChecksum:withChecksum ? sha256TextV3Safe_(propertyText) : '',
    hidden:sh.isSheetHidden(), frozenRows:sh.getFrozenRows(), frozenColumns:sh.getFrozenColumns(),
    tabColor:String(sh.getTabColor() || ''), maxRows:sh.getMaxRows(), maxColumns:sh.getMaxColumns()
  };
}

function inspectNamedRangesV3Safe_(ss) {
  const items = ss.getNamedRanges().map(function(nr){
    const rg = nr.getRange();
    return { name:nr.getName(), sheetName:rg.getSheet().getName(), a1:rg.getA1Notation() };
  }).sort(function(a,b){ return (a.name + '|' + a.sheetName + '|' + a.a1).localeCompare(b.name + '|' + b.sheetName + '|' + b.a1); });
  return { items:items, checksum:sha256TextV3Safe_(items.map(function(x){ return [x.name,x.sheetName,x.a1].join('\u001F'); }).join('\u001E')) };
}

function validateRestoreSourceInspectionV3Safe_(inspection) {
  if (!inspection || !inspection.sheetCount) throw new Error('RESTORE_SOURCE_HAS_NO_SHEETS');
  if (!inspection.requiredSheetsPresent) throw new Error('RESTORE_SOURCE_MISSING_REQUIRED_SHEETS:' + inspection.missingRequiredSheets.join(','));
  if (!Number(inspection.activeYear)) throw new Error('RESTORE_SOURCE_ACTIVE_YEAR_INVALID');
  if (Number(inspection.formulaCellCount || 0) > V3_RESTORE_TOTAL_CONFIG.maxFormulaCells) throw new Error('RESTORE_SOURCE_FORMULA_COUNT_EXCEEDS_SAFE_LIMIT:' + inspection.formulaCellCount);
  if (Number(inspection.formulaErrorCount || 0) > 0) throw new Error('RESTORE_SOURCE_CONTAINS_FORMULA_ERRORS:' + inspection.formulaErrorCount);
}

function validateActiveDatabaseForRestoreV3Safe_(inspection) {
  if (!inspection || !inspection.sheetCount) throw new Error('ACTIVE_DATABASE_HAS_NO_SHEETS');
  if (!inspection.requiredSheetsPresent) throw new Error('ACTIVE_DATABASE_MISSING_REQUIRED_SHEETS:' + inspection.missingRequiredSheets.join(','));
  if (!Number(inspection.activeYear)) throw new Error('ACTIVE_DATABASE_ACTIVE_YEAR_INVALID');
  if (Number(inspection.formulaCellCount || 0) > V3_RESTORE_TOTAL_CONFIG.maxFormulaCells) throw new Error('ACTIVE_DATABASE_FORMULA_COUNT_EXCEEDS_SAFE_LIMIT:' + inspection.formulaCellCount);
}

function readActiveYearFromSpreadsheetV3Safe_(ss) {
  const sh = ss.getSheetByName(V3C.SHEETS.APP_CONFIG);
  if (!sh || sh.getLastRow() < 2 || sh.getLastColumn() < 2) return 0;
  const values = sh.getDataRange().getValues();
  const headers = values[0].map(function(v){ return String(v || '').trim(); });
  const keyIndex = headers.indexOf('key');
  const valueIndex = headers.indexOf('value');
  if (keyIndex < 0 || valueIndex < 0) return 0;
  for (let i=1;i<values.length;i++) {
    const key = String(values[i][keyIndex] || '').trim();
    if (key === 'ACTIVE_YEAR' || key === 'activeYear') return Number(values[i][valueIndex] || 0);
  }
  return 0;
}

function normalizeCellValueForHashV3Safe_(v) {
  if (v instanceof Date) return 'D:' + v.getTime();
  if (typeof v === 'number') return 'N:' + String(v);
  if (typeof v === 'boolean') return 'B:' + (v ? '1' : '0');
  return 'S:' + String(v === null || typeof v === 'undefined' ? '' : v);
}

function isFormulaErrorDisplayV3Safe_(display) {
  return /^(#REF!|#NAME\?|#ERROR!)/i.test(String(display || '').trim());
}

function columnToLettersV3Safe_(column) {
  let n = Number(column || 0), out = '';
  while (n > 0) { const rem = (n - 1) % 26; out = String.fromCharCode(65 + rem) + out; n = Math.floor((n - 1) / 26); }
  return out;
}

function sha256TextV3Safe_(text) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text || ''), Utilities.Charset.UTF_8);
  return digest.map(function(b){ const n=(b+256)%256; return ('0'+n.toString(16)).slice(-2); }).join('');
}

function replaceAllSheetsFromSourceV3Safe_(sourceSS, targetSS) {
  const sourceSheets = sourceSS.getSheets();
  if (!sourceSheets.length) throw new Error('RESTORE_SOURCE_HAS_NO_SHEETS');
  const sourceNamedRanges = inspectNamedRangesV3Safe_(sourceSS).items;
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jakarta', 'yyyyMMddHHmmssSSS') + '_' + Math.floor(Math.random()*1000000);
  const marker = targetSS.insertSheet(V3_RESTORE_TOTAL_CONFIG.tempMarkerPrefix + stamp);
  const copied = [];
  let destructivePhaseStarted = false;
  try {
    sourceSheets.forEach(function(sourceSheet, index){
      const copy = sourceSheet.copyTo(targetSS);
      const tempName = V3_RESTORE_TOTAL_CONFIG.tempCopyPrefix + stamp + '_' + ('000' + index).slice(-3);
      copy.setName(tempName);
      copied.push({ sheet:copy, sourceSheet:sourceSheet, originalName:sourceSheet.getName(), index:index, hidden:sourceSheet.isSheetHidden() });
    });
    if (copied.length !== sourceSheets.length) throw new Error('RESTORE_PRECOPY_COUNT_MISMATCH');

    copied.forEach(function(item){
      const src = item.sourceSheet;
      if (item.sheet.getLastRow() !== src.getLastRow() || item.sheet.getLastColumn() !== src.getLastColumn()) throw new Error('RESTORE_PRECOPY_DIMENSION_MISMATCH:' + item.originalName);
      const srcStatic = inspectSheetForRestoreV3Safe_(src, true).staticValueChecksum;
      const copyStatic = inspectSheetForRestoreV3Safe_(item.sheet, true).staticValueChecksum;
      if (srcStatic !== copyStatic) throw new Error('RESTORE_PRECOPY_STATIC_VALUE_MISMATCH:' + item.originalName);
    });

    destructivePhaseStarted = true;
    const keepIds = {};
    keepIds[String(marker.getSheetId())] = true;
    copied.forEach(function(item){ keepIds[String(item.sheet.getSheetId())] = true; });
    targetSS.getSheets().forEach(function(sh){ if (!keepIds[String(sh.getSheetId())]) targetSS.deleteSheet(sh); });

    copied.sort(function(a,b){ return a.index-b.index; }).forEach(function(item, index){
      item.sheet.showSheet();
      item.sheet.setName(item.originalName);
      targetSS.setActiveSheet(item.sheet);
      targetSS.moveActiveSheet(index + 1);
    });

    // Semua nama final sudah tersedia. Formula kini ditulis ulang dari sumber agar
    // referensi lintas-sheet terikat ke sheet hasil restore, bukan ke sheet lama.
    restoreNamedRangesV3Safe_(targetSS, sourceNamedRanges);
    copied.forEach(function(item){ reapplyFormulasFromSourceSheetV3Safe_(item.sourceSheet, item.sheet); });
    SpreadsheetApp.flush();

    targetSS.deleteSheet(marker);
    const visibleItem = copied.filter(function(item){ return !item.hidden; })[0];
    if (!visibleItem) throw new Error('RESTORE_SOURCE_HAS_NO_VISIBLE_SHEET');
    targetSS.setActiveSheet(visibleItem.sheet);
    copied.forEach(function(item){ if (item.hidden) item.sheet.hideSheet(); else item.sheet.showSheet(); });
    SpreadsheetApp.flush();

    return { ok:true, restoredSheets:copied.map(function(item){ return item.originalName; }), formulaCellsReapplied:copied.reduce(function(sum,item){ return sum + countSheetFormulasV3Safe_(item.sourceSheet); },0), namedRangesRestored:sourceNamedRanges.length };
  } catch (err) {
    if (!destructivePhaseStarted) {
      try { copied.forEach(function(item){ const sh=targetSS.getSheetByName(item.sheet.getName()); if (sh) targetSS.deleteSheet(sh); }); } catch (ignore1) {}
      try { const markerSheet=targetSS.getSheetByName(marker.getName()); if (markerSheet) targetSS.deleteSheet(markerSheet); } catch (ignore2) {}
    }
    throw err;
  }
}

function reapplyFormulasFromSourceSheetV3Safe_(sourceSheet, targetSheet) {
  const lastRow = sourceSheet.getLastRow();
  const lastColumn = sourceSheet.getLastColumn();
  if (!lastRow || !lastColumn) return 0;
  const formulas = sourceSheet.getRange(1,1,lastRow,lastColumn).getFormulas();
  let count = 0;
  for (let r=0;r<formulas.length;r++) {
    let c = 0;
    while (c < formulas[r].length) {
      while (c < formulas[r].length && !formulas[r][c]) c++;
      if (c >= formulas[r].length) break;
      const start = c;
      const rowFormulas = [];
      while (c < formulas[r].length && formulas[r][c]) { rowFormulas.push(formulas[r][c]); count++; c++; }
      targetSheet.getRange(r + 1, start + 1, 1, rowFormulas.length).setFormulas([rowFormulas]);
    }
  }
  return count;
}

function countSheetFormulasV3Safe_(sheet) {
  const lr=sheet.getLastRow(), lc=sheet.getLastColumn();
  if (!lr || !lc) return 0;
  const f=sheet.getRange(1,1,lr,lc).getFormulas();
  let n=0; f.forEach(function(row){ row.forEach(function(x){ if (x) n++; }); }); return n;
}

function restoreNamedRangesV3Safe_(targetSS, items) {
  targetSS.getNamedRanges().forEach(function(nr){ try { nr.remove(); } catch (ignore) {} });
  (items || []).forEach(function(item){
    const sh = targetSS.getSheetByName(item.sheetName);
    if (!sh) throw new Error('RESTORE_NAMED_RANGE_SHEET_MISSING:' + item.name + ':' + item.sheetName);
    targetSS.setNamedRange(item.name, sh.getRange(item.a1));
  });
}

function compareRestoreInspectionsV3Safe_(source, target) {
  const issues = [];
  if (!source || !target) return { ok:false, issues:['INSPECTION_MISSING'] };
  if (Number(source.activeYear) !== Number(target.activeYear)) issues.push('ACTIVE_YEAR_MISMATCH');
  if (source.sheetCount !== target.sheetCount) issues.push('SHEET_COUNT_MISMATCH');
  if (Number(source.formulaCellCount || 0) !== Number(target.formulaCellCount || 0)) issues.push('FORMULA_COUNT_MISMATCH');
  if (Number(source.formulaErrorCount || 0) !== Number(target.formulaErrorCount || 0)) issues.push('FORMULA_ERROR_COUNT_MISMATCH');
  if (String(source.namedRangeChecksum || '') !== String(target.namedRangeChecksum || '')) issues.push('NAMED_RANGE_MISMATCH');
  const sourceMap = {}, targetMap = {};
  (source.sheets || []).forEach(function(x){ sourceMap[x.name] = x; });
  (target.sheets || []).forEach(function(x){ targetMap[x.name] = x; });
  Object.keys(sourceMap).forEach(function(name){
    const src = sourceMap[name], dst = targetMap[name];
    if (!dst) { issues.push('MISSING_SHEET:' + name); return; }
    if (src.lastRow !== dst.lastRow || src.lastColumn !== dst.lastColumn) issues.push('DIMENSION_MISMATCH:' + name);
    if (src.staticValueChecksum !== dst.staticValueChecksum) issues.push('STATIC_VALUE_MISMATCH:' + name);
    if (src.formulaCellCount !== dst.formulaCellCount || src.formulaChecksum !== dst.formulaChecksum) issues.push('FORMULA_MISMATCH:' + name);
    if (src.formulaErrorCount !== dst.formulaErrorCount || src.formulaErrorChecksum !== dst.formulaErrorChecksum) issues.push('FORMULA_ERROR_MISMATCH:' + name);
    if (src.mergedChecksum !== dst.mergedChecksum) issues.push('MERGED_RANGE_MISMATCH:' + name);
    if (src.propertyChecksum !== dst.propertyChecksum) issues.push('SHEET_PROPERTY_MISMATCH:' + name);
  });
  Object.keys(targetMap).forEach(function(name){ if (!sourceMap[name]) issues.push('UNEXPECTED_SHEET:' + name); });
  if (source.fingerprint !== target.fingerprint) issues.push('FINGERPRINT_MISMATCH');
  return { ok:issues.length === 0, issues:issues, sourceSheetCount:source.sheetCount, targetSheetCount:target.sheetCount };
}

function rollbackAndVerifyRestoreV3Safe_(emergencyFile, activeSS, expectedInspection) {
  try {
    const emergencySS = SpreadsheetApp.openById(emergencyFile.getId());
    const emergencyInspection = inspectSpreadsheetForRestoreV3Safe_(emergencySS, true);
    const expectedVsEmergency = compareRestoreInspectionsV3Safe_(expectedInspection, emergencyInspection);
    if (!expectedVsEmergency.ok) return { ok:false, issues:['EMERGENCY_SNAPSHOT_CHANGED'].concat(expectedVsEmergency.issues) };
    const result = replaceAllSheetsFromSourceV3Safe_(emergencySS, activeSS);
    SpreadsheetApp.flush(); Utilities.sleep(1000); SpreadsheetApp.flush();
    const after = inspectSpreadsheetForRestoreV3Safe_(activeSS, true);
    const verification = compareRestoreInspectionsV3Safe_(expectedInspection, after);
    return { ok:verification.ok, issues:verification.issues, restoredSheets:result.restoredSheets, validation:verification };
  } catch (err) {
    return { ok:false, issues:['ROLLBACK_EXCEPTION:' + (err && err.message ? err.message : String(err))] };
  }
}



