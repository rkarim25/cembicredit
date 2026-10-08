(function () {
  const data = window.SOVEREIGNS || [], IND = window.SOVEREIGN_INDICATORS || [];
  const tbl = document.getElementById('tbl'), q = document.getElementById('q'), region = document.getElementById('region'),
        group = document.getElementById('group'), count = document.getElementById('count'), detail = document.getElementById('detail');
  let sortKey = 'country', sortDir = 1, charts = [];
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
      inds.forEach(i => { const v = d.ind[i.key]; h += `<td class="${cls(i, v)}" title="${(d.src[i.key] || '').replace(/"/g, '')}">${fmt(v, i.unit)}</td>`; });
      h += `<td class="sv-meta">${d.asof || ''}</td><td>${d.report.open_items ?? ''}</td></tr>`;
    });
    tbl.innerHTML = h + '</tbody>';
    count.textContent = `${list.length} of ${data.length} sovereigns`;
    tbl.querySelectorAll('th[data-k]').forEach(th => th.onclick = () => { const k = th.dataset.k; sortDir = (sortKey === k) ? -sortDir : (k === 'country' ? 1 : -1); sortKey = k; render(); });
    tbl.querySelectorAll('td.name').forEach(td => td.onclick = () => show(td.dataset.slug));
  }
  function show(slug) {
    const d = data.find(x => x.slug === slug); if (!d) return;
    charts.forEach(c => c.destroy()); charts = [];
    const series = ['real_gdp_growth_pct', 'cpi_avg_pct', 'current_account_pct_gdp', 'fiscal_balance_pct_gdp', 'primary_balance_pct_gdp', 'gov_debt_pct_gdp', 'external_debt_pct_gdp', 'gross_reserves_usd_bn'];
    let h = `<h3 style="margin:0 0 6px">${d.country} <span class="sv-tag">${d.fx_regime || 'FX regime n/a'}</span></h3>`;
    h += `<p class="sv-meta">${d.commodity || ''} ${d.politics.next_election ? '· next election ' + d.politics.next_election : ''} ${d.imf.programme ? '· IMF ' + d.imf.programme + (d.imf.risk_of_debt_distress ? ' (' + d.imf.risk_of_debt_distress + ')' : '') : ''}</p>`;
    h += `<p class="sv-meta"><a href="reports.html#${slug}-sovereign-credit">Report</a> · <a href="knowledge.html#knowledge/sovereigns/${slug}.md">Knowledge page</a> · <a href="models/sovereigns/${(d.country || slug).replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '')}_Sovereign_Model.xlsx">Model workbook</a> · as of ${d.asof}</p>`;
    h += '<div class="sv-charts">' + series.filter(s => d.series[s] && Object.keys(d.series[s]).length).map(s => `<div><div class="sv-src">${s.replace(/_/g, ' ')}</div><canvas id="c_${s}"></canvas></div>`).join('') + '</div>';
    if (!series.some(s => d.series[s] && Object.keys(d.series[s]).length)) h += '<p class="sv-meta">No annual series extracted yet for this sovereign.</p>';
    detail.style.display = 'block'; detail.innerHTML = h; detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (!window.Chart) return;
    series.forEach(s => {
      const ser = d.series[s]; if (!ser || !Object.keys(ser).length) return;
      const labels = Object.keys(ser).sort((a, b) => a.slice(0, 4) - b.slice(0, 4) || a.localeCompare(b));
      charts.push(new Chart(document.getElementById('c_' + s), { type: 'bar', data: { labels, datasets: [{ data: labels.map(l => ser[l]), backgroundColor: labels.map(l => /[EF]$/.test(l) ? 'rgba(79,140,255,.45)' : 'rgba(79,140,255,.9)') }] },
        options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } } }, animation: false } }));
    });
  }
  [q, region, group].forEach(el => el.addEventListener('input', render));
  render();
  if (location.hash) show(location.hash.slice(1));
})();
