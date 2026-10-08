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
  ];
  const COLORS = ['#0071e3', '#15803d', '#b45309', '#dc2626', '#7c3aed', '#0e7490', '#be185d', '#4d7c0f', '#9a3412', '#1e40af'];
  [...new Set(data.map(d => d.region).filter(Boolean))].sort().forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = r; region.appendChild(o); });

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
    return data.filter(d => (!f || (d.country || '').toLowerCase().includes(f)) && (!rg || d.region === rg));
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
    const sel = document.getElementById('histsel');
    if (sel) sel.onchange = () => document.querySelectorAll('#histcharts .sv-chart').forEach(c => c.style.display = (sel.value === 'all' || c.dataset.k === sel.value) ? '' : 'none');
  }

  // ---- compare countries on one indicator over time
  function buildCompare() {
    if (!compare) return;
    let h = `<h3 style="margin:0 0 6px">Compare over time</h3><div class="sv-hist-bar"><label class="sv-meta">Indicator <select id="cmp-ind">${HIST.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></label> <label class="sv-meta">Countries (ctrl-click for several) <select id="cmp-ctry" multiple size="6">${data.map(d => `<option value="${d.slug}">${d.country}</option>`).join('')}</select></label> <label class="sv-meta">From <input id="cmp-from" type="number" value="2010" min="2005" max="2031" style="width:70px"></label> <button type="button" id="cmp-go" class="sh-back">Chart</button> <button type="button" id="cmp-table" class="sh-back">Table</button></div><div class="sv-canvas-wide"><canvas id="cmp-canvas"></canvas></div><div id="cmp-tbl" class="sv-table-wrap" style="margin-top:10px;display:none"></div>`;
    compare.innerHTML = h;
    const ind = document.getElementById('cmp-ind'), ctry = document.getElementById('cmp-ctry'), from = document.getElementById('cmp-from');
    const picked = () => [...ctry.selectedOptions].map(o => o.value).slice(0, 10);
    function draw() {
      const k = ind.value, slugs = picked(); if (!slugs.length) return;
      const ys = [...new Set(slugs.flatMap(s => years((data.find(d => d.slug === s).hist || {})[k] || {})))].filter(y => +y >= +from.value).sort();
      const datasets = slugs.map((s, i) => { const d = data.find(x => x.slug === s), ser = (d.hist || {})[k] || {}; return { label: d.country, data: ys.map(y => ser[y] ?? null), borderColor: COLORS[i % COLORS.length], tension: .25, spanGaps: true }; });
      if (cmpChart) cmpChart.destroy();
      cmpChart = lineChart(document.getElementById('cmp-canvas'), ys, datasets, { plugins: { legend: { display: true, position: 'bottom' }, tooltip: { mode: 'index', intersect: false } } });
      const t = document.getElementById('cmp-tbl');
      t.innerHTML = `<table class="sv"><thead><tr><th>Country</th>${ys.map(y => `<th>${y}</th>`).join('')}</tr></thead><tbody>${slugs.map(s => { const d = data.find(x => x.slug === s), ser = (d.hist || {})[k] || {}; return `<tr><td class="name">${d.country}</td>${ys.map(y => `<td>${ser[y] != null ? (+ser[y]).toFixed(1) : ''}</td>`).join('')}</tr>`; }).join('')}</tbody></table>`;
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
