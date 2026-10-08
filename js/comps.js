(function () {
  const ALL = ((typeof MASTER_ISSUERS !== 'undefined' ? MASTER_ISSUERS : (window.MASTER_ISSUERS || []))).filter(i => i && i.metadata);
  const PERIODS = ['2021A', '2022A', '2023A', '2024A', '2025E', '2026E', '2027E'];
  // metric key, label, source ('m' = metadata, 'f' = financials by period), unit, better ('up' | 'down' | null)
  const METRICS = [
    ['rating', 'Rating', 'm', '', null], ['price', 'Price', 'm', '', null], ['ytm', 'YTM', 'm', '%', 'down'], ['spread_bp', 'Spread', 'm', 'bp', 'down'],
    ['ltm_net_leverage', 'Net leverage (LTM)', 'm', 'x', 'down'], ['ltm_ebitda', 'EBITDA (LTM)', 'm', 'USDm', 'up'],
    ['net_debt_1h26', 'Net debt (1H26)', 'm', 'USDm', null], ['unrestricted_cash_1h26', 'Cash (1H26)', 'm', 'USDm', 'up'],
    ['revenue', 'Revenue', 'f', 'USDm', 'up'], ['ebitda', 'EBITDA', 'f', 'USDm', 'up'], ['ebitda_margin_pct', 'EBITDA margin', 'f', '%', 'up'],
    ['cfo', 'CFO', 'f', 'USDm', 'up'], ['capex', 'Capex', 'f', 'USDm', null], ['fcf', 'FCF', 'f', 'USDm', 'up'], ['fcf_conversion_pct', 'FCF conversion', 'f', '%', 'up'],
    ['cash', 'Cash', 'f', 'USDm', 'up'], ['gross_debt', 'Gross debt', 'f', 'USDm', null], ['net_debt', 'Net debt', 'f', 'USDm', null],
    ['net_leverage', 'Net leverage', 'f', 'x', 'down'], ['interest_coverage', 'Interest cover', 'f', 'x', 'up'], ['cash_interest', 'Cash interest', 'f', 'USDm', null],
    ['assets', 'Assets (banks)', 'f', 'USDm', null], ['loans', 'Loans (banks)', 'f', 'USDm', null], ['deposits', 'Deposits (banks)', 'f', 'USDm', null],
    ['nii', 'Net interest income (banks)', 'f', 'USDm', 'up'], ['total_income', 'Total income (banks)', 'f', 'USDm', 'up'],
  ];
  const DEFAULT_METRICS = ['rating', 'price', 'ytm', 'spread_bp', 'revenue', 'ebitda', 'ebitda_margin_pct', 'fcf', 'net_debt', 'net_leverage', 'interest_coverage'];
  const PRESETS = {
    'Ukraine corporates': { country: ['Ukraine'] }, 'Turkey corporates & banks': { country: ['Turkey'] }, 'GCC banks': { type: 'bank', region: ['Middle East', 'GCC'] },
    'Energy': { sector: ['Energy'] }, 'Utilities': { sector: ['Utilities'] }, 'Materials': { sector: ['Materials', 'Materials / Cement'] }, 'Real estate': { sector: ['Real Estate'] },
    'Banks': { type: 'bank' }, 'Distressed (CCC and below)': { rating: 'CCC' }, 'Africa': { region: ['Africa', 'Sub-Saharan Africa'] },
  };
  const $ = id => document.getElementById(id);
  const uniq = arr => [...new Set(arr.filter(Boolean))].sort();
  let group = new Set(), charts = {};
  const COLORS = ['#0071e3', '#15803d', '#b45309', '#dc2626', '#7c3aed', '#0e7490', '#be185d', '#4d7c0f', '#9a3412', '#1e40af', '#64748b', '#0f766e'];

  function bucket(r) { r = (r || '').toUpperCase(); if (/BBB|\bA/.test(r) && !/CCC/.test(r)) return 'IG'; if (/CCC|\bD\b|RD|\bC\b/.test(r)) return 'CCC'; if (/BB/.test(r)) return 'BB'; if (/\bB/.test(r)) return 'B'; return ''; }
  function val(issuer, key, src, period) {
    if (src === 'm') return issuer.metadata[key] ?? null;
    const f = (issuer.financials_multi_year || []).find(x => x.period === period) || {};
    return f[key] ?? null;
  }
  function fmt(v, unit) { if (v == null || v === '') return ''; if (typeof v !== 'number') return v; if (unit === 'bp') return Math.round(v).toLocaleString(); if (unit === 'x') return v.toFixed(1) + 'x'; if (unit === '%') return v.toFixed(1) + '%'; return Math.abs(v) >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(1); }

  // ---- filters
  function fill(id, values) { const s = $(id); s.innerHTML = values.map(v => `<option value="${v}">${v}</option>`).join(''); }
  fill('f-sector', uniq(ALL.map(i => i.metadata.sector))); fill('f-country', uniq(ALL.map(i => i.metadata.country))); fill('f-region', uniq(ALL.map(i => i.metadata.region)));
  $('issuer-list').innerHTML = ALL.map(i => `<option value="${i.metadata.ticker}">${i.metadata.name}</option>`).join('');
  $('period').innerHTML = PERIODS.map(p => `<option value="${p}" ${p === '2024A' ? 'selected' : ''}>${p}</option>`).join('');
  $('metrics').innerHTML = METRICS.map(([k, l]) => `<option value="${k}" ${DEFAULT_METRICS.includes(k) ? 'selected' : ''}>${l}</option>`).join('');
  const numeric = METRICS.filter(([k]) => k !== 'rating');
  ['chart-metric', 'sx', 'sy', 'ts-metric'].forEach(id => $(id).innerHTML = numeric.map(([k, l]) => `<option value="${k}">${l}</option>`).join(''));
  $('chart-metric').value = 'spread_bp'; $('sx').value = 'net_leverage'; $('sy').value = 'spread_bp'; $('ts-metric').value = 'net_leverage';

  function applyFilters() {
    const sel = id => [...$(id).selectedOptions].map(o => o.value);
    const sectors = sel('f-sector'), countries = sel('f-country'), regions = sel('f-region'), type = $('f-type').value, rb = $('f-rating').value;
    ALL.forEach(i => {
      const m = i.metadata;
      const ok = (!sectors.length || sectors.includes(m.sector)) && (!countries.length || countries.includes(m.country)) && (!regions.length || regions.includes(m.region)) &&
                 (!type || m.type === type) && (!rb || bucket(m.rating) === rb);
      if (ok && (sectors.length || countries.length || regions.length || type || rb)) group.add(m.id);
    });
    renderChips(); render();
  }
  function setPreset(p) {
    group = new Set();
    [...$('f-sector').options].forEach(o => o.selected = (p.sector || []).includes(o.value));
    [...$('f-country').options].forEach(o => o.selected = (p.country || []).includes(o.value));
    [...$('f-region').options].forEach(o => o.selected = (p.region || []).includes(o.value));
    $('f-type').value = p.type || ''; $('f-rating').value = p.rating || '';
    if (p.ids) p.ids.forEach(id => group.add(id));
    applyFilters();
  }
  function renderPresets() {
    const saved = JSON.parse(localStorage.getItem('cp_presets') || '{}');
    $('presets').innerHTML = Object.keys(PRESETS).map(n => `<button type="button" class="cp-chip" data-p="${n}">${n}</button>`).join('') +
      Object.keys(saved).map(n => `<button type="button" class="cp-chip" data-s="${n}">${n}<b title="remove">×</b></button>`).join('');
    $('presets').querySelectorAll('[data-p]').forEach(b => b.onclick = () => setPreset(PRESETS[b.dataset.p]));
    $('presets').querySelectorAll('[data-s]').forEach(b => { b.onclick = (e) => { if (e.target.tagName === 'B') { delete saved[b.dataset.s]; localStorage.setItem('cp_presets', JSON.stringify(saved)); renderPresets(); } else setPreset(saved[b.dataset.s]); }; });
  }
  function renderChips() {
    $('chips').innerHTML = [...group].map(id => { const m = (ALL.find(i => i.metadata.id === id) || {}).metadata || {}; return `<span class="cp-chip" data-id="${id}" title="remove from group">${m.ticker || id} · ${m.name || ''}<b>×</b></span>`; }).join('') || '<span class="cp-meta">No issuers in the group yet: pick a preset, set filters and Apply, or add issuers one by one.</span>';
    $('chips').querySelectorAll('[data-id]').forEach(c => c.onclick = () => { group.delete(c.dataset.id); renderChips(); render(); });
  }

  // ---- table and charts
  function currentRows() { return ALL.filter(i => group.has(i.metadata.id)); }
  function render() {
    const rows = currentRows(), period = $('period').value;
    const keys = [...$('metrics').selectedOptions].map(o => o.value);
    const defs = keys.map(k => METRICS.find(m => m[0] === k)).filter(Boolean);
    const cells = rows.map(i => ({ i, v: Object.fromEntries(defs.map(([k, l, src]) => [k, val(i, k, src, period)])) }));
    const sortKey = render.sortKey, dir = render.dir || 1;
    if (sortKey) cells.sort((a, b) => { const x = a.v[sortKey], y = b.v[sortKey]; if (x == null) return 1; if (y == null) return -1; return (x > y ? 1 : x < y ? -1 : 0) * dir; });
    let h = '<thead><tr><th>Issuer</th><th>Country / sector</th><th>Record as of</th>' + defs.map(([k, l, s, u]) => `<th data-k="${k}">${l}<br><span class="cp-meta">${u || ''}${s === 'f' ? (u ? ', ' : '') + period : (u ? ', ' : '') + 'as of record date'}</span></th>`).join('') + '</tr></thead><tbody>';
    const stats = {};
    defs.forEach(([k, l, s, u, better]) => { const nums = cells.map(c => c.v[k]).filter(v => typeof v === 'number'); if (nums.length) { const sorted = [...nums].sort((a, b) => a - b); stats[k] = { min: sorted[0], max: sorted[sorted.length - 1], med: sorted[Math.floor(sorted.length / 2)], better }; } });
    cells.forEach(({ i, v }) => {
      const m = i.metadata;
      h += `<tr><td class="name"><a href="company.html?id=${m.id}">${m.ticker}</a> <span class="cp-meta">${m.name}</span></td><td class="cp-meta" style="text-align:left">${m.country || ''} · ${m.sector || ''}</td><td class="cp-meta">${m.last_updated || ''}</td>`;
      defs.forEach(([k, l, s, u]) => { const st = stats[k]; let c = ''; if (st && typeof v[k] === 'number' && st.better && st.min !== st.max) { const best = st.better === 'up' ? st.max : st.min, worst = st.better === 'up' ? st.min : st.max; c = v[k] === best ? 'best' : v[k] === worst ? 'worst' : ''; } h += `<td class="${c}">${fmt(v[k], u)}</td>`; });
      h += '</tr>';
    });
    ['med', 'min', 'max'].forEach(s => { h += `<tr class="summary"><td>${{ med: 'Median', min: 'Min', max: 'Max' }[s]}</td><td></td><td></td>` + defs.map(([k, l, src, u]) => `<td>${stats[k] ? fmt(stats[k][s], u) : ''}</td>`).join('') + '</tr>'; });
    $('tbl').innerHTML = h + '</tbody>';
    $('tbl').querySelectorAll('th[data-k]').forEach(th => th.onclick = () => { render.dir = render.sortKey === th.dataset.k ? -(render.dir || 1) : -1; render.sortKey = th.dataset.k; render(); });
    $('count').textContent = `${rows.length} issuer(s) in the group · ${defs.length} metric(s) · period ${period} for financial metrics; market metrics as last updated in each record`;
    drawCharts(rows, period);
  }
  function metricDef(k) { return METRICS.find(m => m[0] === k); }
  function drawCharts(rows, period) {
    if (!window.Chart) return;
    Object.values(charts).forEach(c => c.destroy()); charts = {};
    const labelOf = i => i.metadata.ticker;
    // bar
    const bm = metricDef($('chart-metric').value);
    const bars = rows.map(i => ({ i, v: val(i, bm[0], bm[2], period) })).filter(x => typeof x.v === 'number').sort((a, b) => b.v - a.v);
    $('bar-title').textContent = `${bm[1]} (${bm[3]}${bm[2] === 'f' ? ', ' + period : ''}) across the group`;
    charts.bar = new Chart($('bar'), { type: 'bar', data: { labels: bars.map(x => labelOf(x.i)), datasets: [{ data: bars.map(x => x.v), backgroundColor: bars.map((_, j) => COLORS[j % COLORS.length] + 'cc') }] },
      options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } } }, animation: false, responsive: true, maintainAspectRatio: false } });
    // scatter
    const xm = metricDef($('sx').value), ym = metricDef($('sy').value);
    const pts = rows.map(i => ({ i, x: val(i, xm[0], xm[2], period), y: val(i, ym[0], ym[2], period) })).filter(p => typeof p.x === 'number' && typeof p.y === 'number');
    $('scatter-title').textContent = `${ym[1]} vs ${xm[1]}`;
    charts.scatter = new Chart($('scatter'), { type: 'scatter', data: { datasets: [{ data: pts.map(p => ({ x: p.x, y: p.y, t: labelOf(p.i) })), backgroundColor: '#0071e3cc', pointRadius: 5 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.raw.t}: ${xm[1]} ${fmt(c.raw.x, xm[3])}, ${ym[1]} ${fmt(c.raw.y, ym[3])}` } } },
        scales: { x: { title: { display: true, text: xm[1] } }, y: { title: { display: true, text: ym[1] } } }, animation: false, responsive: true, maintainAspectRatio: false },
      plugins: [{ id: 'labels', afterDatasetsDraw(ch) { const ctx = ch.ctx; ctx.font = '10px sans-serif'; ctx.fillStyle = '#334155'; ch.getDatasetMeta(0).data.forEach((pt, j) => ctx.fillText(ch.data.datasets[0].data[j].t, pt.x + 6, pt.y - 6)); } }] });
    // time series
    const tm = metricDef($('ts-metric').value);
    $('ts-title').textContent = `${tm[1]} by period (financial metrics only; market metrics have no period series)`;
    if (tm[2] === 'f') {
      charts.ts = new Chart($('ts'), { type: 'line', data: { labels: PERIODS, datasets: rows.slice(0, 12).map((i, j) => ({ label: labelOf(i), data: PERIODS.map(p => val(i, tm[0], 'f', p)), borderColor: COLORS[j % COLORS.length], tension: .25, spanGaps: true })) },
        options: { plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip: { mode: 'index', intersect: false } }, scales: { x: { grid: { display: false } } }, elements: { point: { radius: 2 } }, animation: false, responsive: true, maintainAspectRatio: false } });
    }
  }
  function exportCsv() {
    const rows = currentRows(), period = $('period').value, defs = [...$('metrics').selectedOptions].map(o => metricDef(o.value)).filter(Boolean);
    const lines = [['Ticker', 'Name', 'Country', 'Sector', 'Record as of', ...defs.map(d => d[1] + (d[2] === 'f' ? ' ' + period : ' (as of record date)'))].join(',')];
    rows.forEach(i => lines.push([i.metadata.ticker, `"${i.metadata.name}"`, i.metadata.country, `"${i.metadata.sector}"`, i.metadata.last_updated || '', ...defs.map(d => { const v = val(i, d[0], d[2], period); return v == null ? '' : (typeof v === 'string' ? `"${v}"` : v); })].join(',')));
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(lines.join('\n')); a.download = `peer_comparison_${period}.csv`; a.click();
  }

  $('btn-apply').onclick = applyFilters;
  $('btn-clear').onclick = () => { group = new Set(); renderChips(); render(); };
  $('btn-render').onclick = render;
  $('btn-csv').onclick = exportCsv;
  $('btn-save').onclick = () => { const n = prompt('Preset name'); if (!n) return; const saved = JSON.parse(localStorage.getItem('cp_presets') || '{}'); saved[n] = { ids: [...group] }; localStorage.setItem('cp_presets', JSON.stringify(saved)); renderPresets(); };
  $('f-add').addEventListener('change', () => { const t = $('f-add').value.trim().toLowerCase(); const hit = ALL.find(i => (i.metadata.ticker || '').toLowerCase() === t || (i.metadata.name || '').toLowerCase() === t); if (hit) { group.add(hit.metadata.id); $('f-add').value = ''; renderChips(); render(); } });
  ['period'].forEach(id => $(id).addEventListener('change', render));
  renderPresets();
  const q = new URLSearchParams(location.search);
  if (q.get('preset') && PRESETS[q.get('preset')]) setPreset(PRESETS[q.get('preset')]);
  else if (q.get('ids')) { q.get('ids').split(',').forEach(id => group.add(id)); renderChips(); render(); }
  else setPreset(PRESETS['Ukraine corporates']);
})();
