(function () {
  const data = window.SOVEREIGNS || [], IND = window.SOVEREIGN_INDICATORS || [];
  const tbl = document.getElementById('tbl'), q = document.getElementById('q'), region = document.getElementById('region'),
        group = document.getElementById('group'), count = document.getElementById('count'), detail = document.getElementById('detail'),
        compare = document.getElementById('compare');
  let sortKey = 'country', sortDir = 1, charts = [], cmpChart = null;
  const HIST = [
    ['real_gdp_growth_pct', 'Real GDP growth (%)'], ['cpi_avg_pct', 'CPI, average (%)'], ['cpi_eop_pct', 'CPI, end-period (%)'],
    ['current_account_pct_gdp', 'Current account (% GDP)'], ['fiscal_balance_pct_gdp', 'Fiscal balance (% GDP)'], ['primary_balance_pct_gdp', 'Primary balance (% GDP)'],
    ['gov_debt_pct_gdp', 'Government debt (% GDP)'], ['revenue_pct_gdp', 'Revenue (% GDP)'], ['expenditure_pct_gdp', 'Expenditure (% GDP)'],
    ['nominal_gdp_usd_bn', 'Nominal GDP (USD bn)'], ['gdp_per_capita_usd', 'GDP per capita (USD)'], ['unemployment_pct', 'Unemployment (%)'],
    ['gross_reserves_usd_bn', 'Reserves incl. gold (USD bn)'], ['import_cover_months', 'Import cover (months)'], ['external_debt_stock_usd_bn', 'External debt stock (USD bn)'],
    ['external_debt_pct_gni', 'External debt (% GNI)'], ['debt_service_pct_exports', 'Debt service (% exports)'], ['short_term_debt_pct_reserves', 'ST debt (% reserves)'],
    ['fdi_net_pct_gdp', 'FDI, net (% GDP)'], ['exports_pct_gdp', 'Exports (% GDP)'],
  , ['ppg_external_debt_usd_bn', 'PPG external debt stock (USD bn)'], ['ppg_debt_service_usd_bn', 'PPG external debt service (USD bn)'], ['short_term_external_debt_usd_bn', 'Short-term external debt (USD bn)'], ['remittances_pct_gdp', 'Remittances (% GDP)'], ['external_interest_paid_usd_bn', 'External interest paid (USD bn)']];
  const COLORS = ['#0071e3', '#15803d', '#b45309', '#dc2626', '#7c3aed', '#0e7490', '#be185d', '#4d7c0f', '#9a3412', '#1e40af'];
  const groups = [...new Set(data.map(d => d.group).filter(Boolean))].sort();
  if (data.some(d => d.ceemea)) { const o = document.createElement('option'); o.value = '__ceemea'; o.textContent = 'CEEMEA (all)'; region.appendChild(o); }
  groups.forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = r; region.appendChild(o); });
  if (data.some(d => d.ceemea) && !location.hash) region.value = '__ceemea';

  function cls(ind, v) {
    if (v == null || !ind.th || !ind.dir) return '';
    const [good, bad] = ind.th;
    if (ind.dir === 'up') return v >= good ? 'good' : v <= bad ? 'bad' : 'mid';
    return v <= good ? 'good' : v >= bad ? 'bad' : 'mid';
  }
  function fmt(v, unit) {
    if (v == null) return '';
    if (typeof v !== 'number') return v;
    return unit === 'bp' ? Math.round(v).toString() : (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(1));
  }
  function rating(r) { return r && r.rating ? r.rating + (r.outlook ? ' ' + r.outlook[0].toLowerCase() : '') : ''; }
  function rows() {
    const f = q.value.toLowerCase(), rg = region.value;
    return data.filter(d => (!f || (d.country || '').toLowerCase().includes(f)) && (!rg || (rg === '__ceemea' ? d.ceemea : d.group === rg)));
  }
  function render() {
    const inds = IND.filter(i => !group.value || i.group === group.value);
    const list = rows().sort((a, b) => {
      const av = sortKey === 'country' ? a.country : (a.ind[sortKey] ?? null), bv = sortKey === 'country' ? b.country : (b.ind[sortKey] ?? null);
      if (av == null) return 1; if (bv == null) return -1;
      return (av > bv ? 1 : av < bv ? -1 : 0) * sortDir;
    });
    let h = '<thead><tr><th data-k="country">Sovereign</th><th>Fitch / S&amp;P / Moody\'s</th><th>IMF</th>';
    inds.forEach(i => h += `<th data-k="${i.key}" title="${i.group}">${i.label}${i.unit ? '<br><span class="sv-meta">' + i.unit + '</span>' : ''}</th>`);
    h += '<th>As of</th><th>Open</th></tr></thead><tbody>';
    list.forEach(d => {
      h += `<tr><td class="name" data-slug="${d.slug}">${d.country || d.slug}<br><span class="sv-meta">${d.region || ''}</span></td>`;
      h += `<td title="${(d.ratings.fitch||{}).date||''} / ${(d.ratings.sp||{}).date||''} / ${(d.ratings.moodys||{}).date||''}">${rating(d.ratings.fitch)} / ${rating(d.ratings.sp)} / ${rating(d.ratings.moodys)}</td>`;
      h += `<td title="${((d.imf.programme || '') + (d.imf.size_usd_bn ? ' | USD ' + d.imf.size_usd_bn + 'bn' : '') + (d.imf.next_review ? ' | next review ' + d.imf.next_review : '')).replace(/"/g, '')}">${(d.imf.programme || '').replace(/\s*\(.*$/, '').slice(0, 34)}</td>`;
      inds.forEach(i => { const v = d.ind[i.key]; const asof = d.asof_ind && d.asof_ind[i.key] ? d.asof_ind[i.key] : ''; h += `<td class="${cls(i, v)}" title="${(d.src[i.key] || '').replace(/"/g, '')}">${fmt(v, i.unit)}${v != null && asof ? '<br><span class="sv-asof">' + asof + '</span>' : ''}</td>`; });
      h += `<td class="sv-meta">${d.asof || ''}</td><td>${d.report.open_items ?? ''}</td></tr>`;
    });
    tbl.innerHTML = h + '</tbody>';
    count.textContent = `${list.length} of ${data.length} sovereigns`;
    tbl.querySelectorAll('th[data-k]').forEach(th => th.onclick = () => { const k = th.dataset.k; sortDir = (sortKey === k) ? -sortDir : (k === 'country' ? 1 : -1); sortKey = k; render(); });
    tbl.querySelectorAll('td.name').forEach(td => td.onclick = () => { location.hash = td.dataset.slug; show(td.dataset.slug); });
  }

  function years(series) { return Object.keys(series).filter(y => /^\d{4}$/.test(y)).sort(); }
  function lineChart(canvas, labels, datasets, opts) {
    return new Chart(canvas, { type: 'line', data: { labels, datasets }, options: Object.assign({
      plugins: { legend: { display: datasets.length > 1, position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }, tooltip: { mode: 'index', intersect: false } },
      scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 12, font: { size: 10 } } }, y: { ticks: { font: { size: 10 } } } },
      elements: { point: { radius: 2 } }, animation: false, responsive: true, maintainAspectRatio: false }, opts || {}) });
  }
  function show(slug) {
    const d = data.find(x => x.slug === slug); if (!d) return;
    charts.forEach(c => c.destroy()); charts = [];
    const hist = d.hist || {}, avail = HIST.filter(([k]) => hist[k] && Object.keys(hist[k]).length);
    let h = `<h3 style="margin:0 0 6px">${d.country} <span class="sv-tag">${d.fx_regime || 'FX regime n/a'}</span></h3>`;
    h += `<p class="sv-meta">${d.commodity || ''} ${d.politics.next_election ? '· next election ' + d.politics.next_election : ''} ${d.imf.programme ? '· IMF ' + d.imf.programme + (d.imf.risk_of_debt_distress ? ' (' + d.imf.risk_of_debt_distress + ')' : '') : ''}</p>`;
    h += `<p class="sv-meta"><a href="reports.html#${slug}-sovereign-credit">Report</a> · <a href="knowledge.html#knowledge/sovereigns/${slug}.md">Knowledge page</a> · <a href="models/sovereigns/${(d.country || slug).replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '')}_Sovereign_Model.xlsx">Model workbook</a> · <a href="database/sovereigns/${slug}.json">Data record (json)</a> · as of ${d.asof}</p>`;
    if (avail.length) {
      h += `<div class="sv-hist-bar"><strong>History</strong> <span class="sv-meta">IMF WEO and World Bank annual series; dashed = IMF projection. Hover for values.</span> <label class="sv-meta">Series <select id="histsel"><option value="all">all</option>${avail.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></label></div>`;
      h += '<div class="sv-charts" id="histcharts">' + avail.map(([k, l]) => `<div class="sv-chart" data-k="${k}"><div class="sv-src">${l} <span class="sv-src2">${(d.hist_src[k] || '').split(',')[0]}</span></div><div class="sv-canvas"><canvas id="c_${k}"></canvas></div></div>`).join('') + '</div>';
    } else {
      h += '<p class="sv-meta">No official history fetched yet for this sovereign (run pipeline/sovereign_data_fetch.py).</p>';
    }
    const MONTHLY = [['policy_rate_pct', 'Policy rate (%)'], ['fx_per_usd', 'FX, local currency per USD'], ['reer_broad_real', 'Real effective exchange rate (BIS broad, 2020=100)'], ['cpi_yoy_pct', 'CPI inflation, y/y (%)'], ['policy_rate_imf_pct', 'Policy-related rate, IMF (%)'], ['gross_reserves_usd_bn', 'Gross reserves incl. gold (USD bn)'], ['reserves_ex_gold_usd_bn', 'Reserves excluding gold (USD bn)'], ['reer_imf_2010', 'Real effective exchange rate, IMF (2010=100)'], ['ctot_net_export_gdp_idx', 'Commodity terms of trade, IMF (Jun-2012=100)'], ['official_reserve_assets_usd_bn', 'Official reserve assets, IMF template (USD bn)'], ['predetermined_drains_usd_bn', 'Predetermined 1y net drains on FX assets (USD bn)'], ['reserves_net_of_drains_usd_bn', 'Reserves net of 1y predetermined drains (USD bn)'], ['contingent_drains_usd_bn', 'Contingent 1y net drains (USD bn)']];
    const mon = d.monthly || {}, mavail = MONTHLY.filter(([k]) => mon[k] && Object.keys(mon[k]).length);
    if (mavail.length) {
      const z = (d.derived || {}).reer_z_10y;
      h += `<div class="sv-hist-bar" style="margin-top:10px"><strong>Monthly</strong> <span class="sv-meta">From 2015. BIS: policy rate (end of month), local currency per USD (monthly average), real effective exchange rate (broad basket). IMF data portal: CPI inflation y/y, policy-related rate, reserves (excluding gold, and gross including gold at national valuation), CPI-based REER, commodity terms of trade (net exports to GDP weights). REER up = real appreciation.${z != null ? ' REER z-score vs trailing ten years: <b>' + z + '</b> sd.' : ''}</span></div>`;
      h += '<div class="sv-charts">' + mavail.map(([k, l]) => `<div class="sv-chart"><div class="sv-src">${l} <span class="sv-src2">${(d.monthly_src[k] || '').split(';')[0]}</span></div><div class="sv-canvas"><canvas id="m_${k}"></canvas></div></div>`).join('') + '</div>';
    }
    const QUARTERLY = [['current_account_usd_bn', 'Current account balance (USD bn)'], ['goods_balance_usd_bn', 'Goods balance (USD bn)'], ['services_balance_usd_bn', 'Services balance (USD bn)'], ['primary_income_usd_bn', 'Primary income (USD bn)'], ['secondary_income_usd_bn', 'Secondary income, incl. remittances (USD bn)'], ['fdi_liabilities_usd_bn', 'Inward FDI equity flow (USD bn)']];
    const qtr = d.quarterly || {}, qavail = QUARTERLY.filter(([k]) => qtr[k] && Object.keys(qtr[k]).length);
    if (qavail.length) {
      const ca = (d.ind || {}).current_account_4q_usd_bn;
      h += `<div class="sv-hist-bar" style="margin-top:10px"><strong>Balance of payments</strong> <span class="sv-meta">IMF BOP (BPM6), quarterly, USD bn, net (credits less debits).${ca != null ? ' Last four quarters: current account <b>' + ca + '</b> bn.' : ''}</span></div>`;
      h += '<div class="sv-charts">' + qavail.map(([k, l]) => `<div class="sv-chart"><div class="sv-src">${l} <span class="sv-src2">IMF BOP</span></div><div class="sv-canvas"><canvas id="q_${k}"></canvas></div></div>`).join('') + '</div>';
    }
    const FSI = [['car_pct', 'Regulatory capital / RWA'], ['tier1_pct', 'Tier 1 / RWA'], ['npl_pct', 'NPL ratio'], ['provisions_to_npl_pct', 'Provisions / NPLs'], ['roa_pct', 'Return on assets'], ['roe_pct', 'Return on equity'], ['fx_open_position_to_capital_pct', 'Net FX open position / capital']];
    const fsi = d.fsi || {}, favail = FSI.filter(([k]) => fsi[k] && Object.keys(fsi[k]).length);
    if (favail.length) {
      const qs = [...new Set(favail.flatMap(([k]) => Object.keys(fsi[k])))].sort().slice(-8);
      h += `<div class="sv-hist-bar" style="margin-top:10px"><strong>Banking system</strong> <span class="sv-meta">IMF Financial Soundness Indicators, deposit takers, %; last eight periods reported (quarterly where the country reports quarterly, else annual). Latest: ${qs[qs.length - 1]}.</span></div>`;
      h += `<div class="sv-table-wrap"><table class="sv"><thead><tr><th>Indicator</th>${qs.map(q => `<th>${q}</th>`).join('')}</tr></thead><tbody>${favail.map(([k, l]) => `<tr><td class="name">${l}</td>${qs.map(q => `<td>${fsi[k][q] != null ? (+fsi[k][q]).toFixed(1) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    const runSeries = Object.entries(d.series || {}).filter(([k, s]) => s && Object.keys(s).length);
    if (runSeries.length) h += `<details class="sv-meta" style="margin-top:8px"><summary>Series captured from reports (${runSeries.length})</summary><pre style="font-size:11px">${runSeries.map(([k, s]) => k + ': ' + Object.entries(s).map(([y, v]) => y + '=' + v).join(', ')).join('\n')}</pre></details>`;
    detail.style.display = 'block'; detail.innerHTML = h; detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (!window.Chart) return;
    const lastActual = 2025;
    avail.forEach(([k, l]) => {
      const s = hist[k], ys = years(s);
      const actual = ys.map(y => +y <= lastActual ? s[y] : null), proj = ys.map(y => +y >= lastActual ? s[y] : null);
      charts.push(lineChart(document.getElementById('c_' + k), ys, [
        { label: l, data: actual, borderColor: '#0071e3', backgroundColor: 'rgba(0,113,227,.12)', fill: true, tension: .25 },
        { label: 'IMF projection', data: proj, borderColor: '#0071e3', borderDash: [5, 4], tension: .25, pointRadius: 0 }]));
    });
    qavail.forEach(([k, l]) => {
      const s = qtr[k], qs = Object.keys(s).sort();
      charts.push(new Chart(document.getElementById('q_' + k), { type: 'bar', data: { labels: qs, datasets: [{ label: l, data: qs.map(q => s[q]), backgroundColor: qs.map(q => s[q] < 0 ? 'rgba(200,60,60,.6)' : 'rgba(0,113,227,.55)') }] },
        options: { plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 12, font: { size: 10 }, callback: (v, i) => qs[i] && qs[i].endsWith('Q1') ? qs[i].slice(0, 4) : '' } }, y: { ticks: { font: { size: 10 } } } }, animation: false, responsive: true, maintainAspectRatio: false } }));
    });
    mavail.forEach(([k, l]) => {
      const s = mon[k], ms = Object.keys(s).sort();
      charts.push(lineChart(document.getElementById('m_' + k), ms, [{ label: l, data: ms.map(m => s[m]), borderColor: '#b5651d', backgroundColor: 'rgba(181,101,29,.10)', fill: true, tension: .2, pointRadius: 0 }],
        { scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 12, font: { size: 10 }, callback: (v, i) => ms[i] && ms[i].endsWith('-01') ? ms[i].slice(0, 4) : '' } }, y: { ticks: { font: { size: 10 } } } } }));
    });
    const sel = document.getElementById('histsel');
    if (sel) sel.onchange = () => document.querySelectorAll('#histcharts .sv-chart').forEach(c => c.style.display = (sel.value === 'all' || c.dataset.k === sel.value) ? '' : 'none');
  }

  // ---- compare countries on one indicator over time
  function buildCompare() {
    if (!compare) return;
    let h = `<h3 style="margin:0 0 6px">Compare over time</h3><div class="sv-hist-bar"><label class="sv-meta">Indicator <select id="cmp-ind">${HIST.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}<optgroup label="Monthly (BIS, IMF)"><option value="m:policy_rate_pct">Policy rate (%)</option><option value="m:fx_per_usd_idx">FX vs USD, rebased to 100 at start</option><option value="m:reer_broad_real">Real effective exchange rate (2020=100)</option><option value="m:cpi_yoy_pct">CPI inflation y/y (%, IMF)</option><option value="m:policy_rate_imf_pct">Policy-related rate (%, IMF)</option><option value="m:gross_reserves_usd_bn">Gross reserves incl. gold (USD bn, IMF)</option><option value="m:gross_reserves_usd_bn_idx">Gross reserves, rebased to 100 at start</option><option value="m:reer_imf_2010">REER, IMF (2010=100)</option><option value="m:ctot_net_export_gdp_idx">Commodity terms of trade (IMF)</option><option value="m:reserves_net_of_drains_usd_bn">Reserves net of 1y drains (USD bn, IMF template)</option></optgroup><optgroup label="Quarterly (IMF BOP)"><option value="q:current_account_usd_bn">Current account balance (USD bn)</option><option value="q:goods_balance_usd_bn">Goods balance (USD bn)</option><option value="q:secondary_income_usd_bn">Secondary income (USD bn)</option><option value="q:fdi_liabilities_usd_bn">Inward FDI equity flow (USD bn)</option></optgroup></select></label> <label class="sv-meta">Countries (ctrl-click for several) <select id="cmp-ctry" multiple size="6">${data.map(d => `<option value="${d.slug}">${d.country}</option>`).join('')}</select></label> <label class="sv-meta">From <input id="cmp-from" type="number" value="2010" min="2005" max="2031" style="width:70px"></label> <button type="button" id="cmp-go" class="sh-back">Chart</button> <button type="button" id="cmp-table" class="sh-back">Table</button></div><div class="sv-canvas-wide"><canvas id="cmp-canvas"></canvas></div><div id="cmp-tbl" class="sv-table-wrap" style="margin-top:10px;display:none"></div>`;
    compare.innerHTML = h;
    const ind = document.getElementById('cmp-ind'), ctry = document.getElementById('cmp-ctry'), from = document.getElementById('cmp-from');
    const picked = () => [...ctry.selectedOptions].map(o => o.value).slice(0, 10);
    function draw() {
      const k = ind.value, slugs = picked(); if (!slugs.length) return;
      const monthly = k.startsWith('m:') || k.startsWith('q:'), mk = monthly ? k.slice(2).replace(/_idx$/, '') : k;
      const serOf = d => k.startsWith('q:') ? ((d.quarterly || {})[mk] || {}) : monthly ? ((d.monthly || {})[mk] || {}) : ((d.hist || {})[mk] || {});
      let ys = [...new Set(slugs.flatMap(s => Object.keys(serOf(data.find(d => d.slug === s)))))].filter(y => +y.slice(0, 4) >= +from.value).sort();
      const datasets = slugs.map((s, i) => { const d = data.find(x => x.slug === s), ser = serOf(d); let base = null;
        if (k.endsWith('_idx')) { const first = ys.find(y => ser[y] != null); base = first != null ? ser[first] : null; }
        return { label: d.country, data: ys.map(y => ser[y] == null ? null : (base ? +(100 * ser[y] / base).toFixed(2) : ser[y])), borderColor: COLORS[i % COLORS.length], tension: .25, spanGaps: true, pointRadius: monthly ? 0 : 2 }; });
      if (cmpChart) cmpChart.destroy();
      cmpChart = lineChart(document.getElementById('cmp-canvas'), ys, datasets, { plugins: { legend: { display: true, position: 'bottom' }, tooltip: { mode: 'index', intersect: false } } });
      const t = document.getElementById('cmp-tbl');
      const tys = k.startsWith('q:') ? ys.filter(y => y.endsWith('Q4') || y === ys[ys.length - 1]) : monthly ? ys.filter(y => y.endsWith('-12') || y === ys[ys.length - 1]) : ys;
      t.innerHTML = `<table class="sv"><thead><tr><th>Country</th>${tys.map(y => `<th>${y}</th>`).join('')}</tr></thead><tbody>${datasets.map(ds => `<tr><td class="name">${ds.label}</td>${tys.map(y => { const v = ds.data[ys.indexOf(y)]; return `<td>${v != null ? (+v).toFixed(1) : ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
    }
    document.getElementById('cmp-go').onclick = draw;
    document.getElementById('cmp-table').onclick = () => { const t = document.getElementById('cmp-tbl'); t.style.display = t.style.display === 'none' ? '' : 'none'; };
    ind.onchange = draw; ctry.onchange = draw;
    // default: first four countries with data on government debt
    const def = data.filter(d => d.hist && d.hist.gov_debt_pct_gdp).slice(0, 4).map(d => d.slug);
    [...ctry.options].forEach(o => o.selected = def.includes(o.value)); ind.value = 'gov_debt_pct_gdp';
    if (def.length) draw();
  }

  [q, region, group].forEach(el => el.addEventListener('input', render));
  render();
  buildCompare();
  if (location.hash) show(location.hash.slice(1));
})();
