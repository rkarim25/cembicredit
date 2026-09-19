// CEMBI Credit Master Portal - Client Application Engine
let currentView = 'corp'; // 'corp' or 'bank'
let filteredIssuers = [];
let sortCol = 'spread_bp';
let sortAsc = false;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof MASTER_ISSUERS === 'undefined') {
    console.error("MASTER_ISSUERS not loaded.");
    return;
  }
  
  if (document.getElementById("issuers-tbody")) {
    initScreener();
  } else if (document.getElementById("trendCanvas")) {
    initTrendChart();
  } else if (document.getElementById("notes-container")) {
    initNotesSearch();
  }
});

// ----------------- SCREENER LOGIC (index.html) -----------------
function initScreener() {
  updateKPIs();
  populateDropdowns();
  
  // Attach listeners
  document.getElementById("search-input").addEventListener("input", applyFilters);
  document.getElementById("sector-select").addEventListener("change", applyFilters);
  document.getElementById("country-select").addEventListener("change", applyFilters);
  document.getElementById("rating-select").addEventListener("change", applyFilters);
  document.getElementById("max-leverage").addEventListener("input", (e) => {
    document.getElementById("leverage-val").textContent = e.target.value + "x";
    applyFilters();
  });
  document.getElementById("min-spread").addEventListener("input", (e) => {
    document.getElementById("spread-val").textContent = "+" + e.target.value + "bp";
    applyFilters();
  });
  
  applyFilters();
}

function updateKPIs() {
  const total = MASTER_ISSUERS.length;
  const spreads = MASTER_ISSUERS.map(i => i.metadata.spread_bp);
  const ytms = MASTER_ISSUERS.map(i => i.metadata.ytm);
  
  const medSpread = Math.round(spreads.sort((a,b)=>a-b)[Math.floor(total/2)]);
  const medYtm = (ytms.sort((a,b)=>a-b)[Math.floor(total/2)]).toFixed(2);
  const distressed = MASTER_ISSUERS.filter(i => i.metadata.spread_bp >= 600).length;
  
  document.getElementById("kpi-total").textContent = total;
  document.getElementById("kpi-ytm").textContent = medYtm + "%";
  document.getElementById("kpi-spread").textContent = "+" + medSpread + " bp";
  document.getElementById("kpi-distress").textContent = distressed + " Issuers (" + Math.round(distressed/total*100) + "%)";
}

function populateDropdowns() {
  const sectors = [...new Set(MASTER_ISSUERS.map(i => i.metadata.sector))].sort();
  const countries = [...new Set(MASTER_ISSUERS.map(i => i.metadata.country))].sort();
  
  const secSel = document.getElementById("sector-select");
  sectors.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    secSel.appendChild(opt);
  });
  
  const ctySel = document.getElementById("country-select");
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    ctySel.appendChild(opt);
  });
}

function switchTab(view) {
  currentView = view;
  document.getElementById("tab-corp").classList.toggle("active", view === 'corp');
  document.getElementById("tab-bank").classList.toggle("active", view === 'bank');
  
  // Toggle header visibility
  document.querySelectorAll(".th-corp").forEach(th => th.style.display = view === 'corp' ? '' : 'none');
  document.querySelectorAll(".th-bank").forEach(th => th.style.display = view === 'bank' ? '' : 'none');
  
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById("search-input").value.toLowerCase();
  const sec = document.getElementById("sector-select").value;
  const cty = document.getElementById("country-select").value;
  const rat = document.getElementById("rating-select").value;
  const maxLev = parseFloat(document.getElementById("max-leverage").value);
  const minSpread = parseInt(document.getElementById("min-spread").value);
  
  filteredIssuers = MASTER_ISSUERS.filter(item => {
    const m = item.metadata;
    if (currentView === 'corp' && m.type !== 'corp') return false;
    if (currentView === 'bank' && m.type !== 'bank') return false;
    
    if (sec && m.sector !== sec) return false;
    if (cty && m.country !== cty) return false;
    if (rat && !m.rating.toLowerCase().includes(rat.toLowerCase())) return false;
    if (m.spread_bp < minSpread) return false;
    
    // Leverage filter for corps
    if (currentView === 'corp') {
      const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
      if (f24.net_leverage > maxLev) return false;
    }
    
    if (q) {
      const match = m.name.toLowerCase().includes(q) ||
                    m.ticker.toLowerCase().includes(q) ||
                    m.benchmark_bond.toLowerCase().includes(q) ||
                    m.country.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
  
  sortData();
  renderTable();
}

function sortTable(col) {
  if (sortCol === col) {
    sortAsc = !sortAsc;
  } else {
    sortCol = col;
    sortAsc = true;
  }
  sortData();
  renderTable();
}

function sortData() {
  filteredIssuers.sort((a, b) => {
    let vA, vB;
    if (sortCol in a.metadata) {
      vA = a.metadata[sortCol];
      vB = b.metadata[sortCol];
    } else {
      const fA = a.financials_multi_year.find(f => f.period === '2024A') || {};
      const fB = b.financials_multi_year.find(f => f.period === '2024A') || {};
      vA = fA[sortCol] ?? 0;
      vB = fB[sortCol] ?? 0;
    }
    if (vA < vB) return sortAsc ? -1 : 1;
    if (vA > vB) return sortAsc ? 1 : -1;
    return 0;
  });
}

function renderTable() {
  const tbody = document.getElementById("issuers-tbody");
  tbody.innerHTML = "";
  
  document.getElementById("match-count").textContent = filteredIssuers.length + " issuers matching";
  
  filteredIssuers.forEach(item => {
    const m = item.metadata;
    const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
    const f25 = item.financials_multi_year.find(f => f.period === '2025E') || {};
    const rec = item.recovery_analysis;
    
    const tr = document.createElement("tr");
    tr.style.cursor = "pointer";
    tr.onclick = (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
        toggleRowExpand(m.id);
      }
    };
    
    let ratingBadge = "badge-hy";
    if (m.rating.includes("BBB") || m.rating.includes("A")) ratingBadge = "badge-ig";
    else if (m.rating.includes("CCC") || m.rating.includes("D") || m.spread_bp >= 700) ratingBadge = "badge-stress";
    
    let html = `
      <td><strong>${m.ticker}</strong></td>
      <td><a href="javascript:void(0)" onclick="toggleRowExpand('${m.id}')">${m.name}</a></td>
      <td>${m.country}</td>
      <td><span class="badge badge-sector">${m.sector}</span></td>
      <td><span class="badge ${ratingBadge}">${m.rating}</span></td>
      <td>${m.benchmark_bond}</td>
      <td class="num">$${m.price.toFixed(2)}</td>
      <td class="num"><strong>${m.ytm.toFixed(2)}%</strong></td>
      <td class="num"><strong>+${m.spread_bp}</strong></td>
    `;
    
    if (currentView === 'corp') {
      html += `
        <td class="num">$${(f24.revenue || 0).toLocaleString()}</td>
        <td class="num">$${(f24.ebitda || 0).toLocaleString()}</td>
        <td class="num">${(f24.ebitda_margin_pct || 0).toFixed(1)}%</td>
        <td class="num"><strong>${(f24.net_leverage || 0).toFixed(2)}x</strong></td>
        <td class="num">${(f25.net_leverage || 0).toFixed(2)}x</td>
        <td class="num">${(f24.interest_coverage || 0).toFixed(2)}x</td>
        <td class="num">$${rec.distressed_floor_px.toFixed(2)}</td>
        <td class="num">$${rec.base_case_px.toFixed(2)}</td>
      `;
    } else {
      html += `
        <td class="num">$${(f24.assets || 0).toLocaleString()}</td>
        <td class="num">$${(f24.loans || 0).toLocaleString()}</td>
        <td class="num">$${(f24.deposits || 0).toLocaleString()}</td>
        <td class="num">$${(f24.nii || 0).toLocaleString()}</td>
        <td class="num"><strong>${(f24.nim_pct || 0).toFixed(2)}%</strong></td>
        <td class="num">${(f24.cir_pct || 0).toFixed(1)}%</td>
        <td class="num">${(f24.roe_pct || 0).toFixed(1)}%</td>
        <td class="num">${(f24.npl_pct || 0).toFixed(1)}%</td>
        <td class="num">${(f24.car_pct || 0).toFixed(1)}%</td>
      `;
    }
    
    html += `
      <td style="text-align:center;">
        <a class="btn-action" href="${m.github_model_url}" target="_blank" title="Download Full 7-Year Multi-Period Excel Model">
          📥 .xlsx
        </a>
      </td>
    `;
    
    tr.innerHTML = html;
    tbody.appendChild(tr);
    
    // Expand row
    const expandTr = document.createElement("tr");
    expandTr.id = "expand-" + m.id;
    expandTr.className = "expand-row";
    expandTr.innerHTML = `
      <td colspan="20">
        <div class="expand-box">
          <div>
            <h4>7-Year Multi-Period Financial History & Projections</h4>
            <table class="expand-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>${currentView === 'corp' ? 'Revenue' : 'Total Assets'}</th>
                  <th>${currentView === 'corp' ? 'EBITDA' : 'Gross Loans'}</th>
                  <th>${currentView === 'corp' ? 'Net Debt' : 'Customer Deps'}</th>
                  <th>${currentView === 'corp' ? 'Net Lev' : 'NIM'}</th>
                  <th>${currentView === 'corp' ? 'FCF' : 'ROE'}</th>
                </tr>
              </thead>
              <tbody>
                ${item.financials_multi_year.map(f => `
                  <tr>
                    <td><strong>${f.period}</strong></td>
                    <td class="num">${currentView === 'corp' ? '$' + (f.revenue||0).toFixed(1) : '$' + (f.assets||0).toFixed(1)}</td>
                    <td class="num">${currentView === 'corp' ? '$' + (f.ebitda||0).toFixed(1) : '$' + (f.loans||0).toFixed(1)}</td>
                    <td class="num">${currentView === 'corp' ? '$' + (f.net_debt||0).toFixed(1) : '$' + (f.deposits||0).toFixed(1)}</td>
                    <td class="num">${currentView === 'corp' ? (f.net_leverage||0).toFixed(2) + 'x' : (f.nim_pct||0).toFixed(2) + '%'}</td>
                    <td class="num">${currentView === 'corp' ? '$' + (f.fcf||0).toFixed(1) : (f.roe_pct||0).toFixed(1) + '%'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div>
            <h4>Downside Liquidation & Recovery</h4>
            <p style="color:var(--text-muted); font-size:11px; margin-bottom:8px;">
              <strong>Distressed Floor:</strong> $${rec.distressed_floor_px.toFixed(2)} | 
              <strong>Base Case:</strong> $${rec.base_case_px.toFixed(2)}
            </p>
            <p style="color:var(--text-dim); font-size:11px; margin-bottom:6px;">
              <strong>Jurisdiction:</strong> ${rec.restructuring_framework}
            </p>
            <p style="color:var(--text-main); font-size:11px; line-height:1.4;">
              ${rec.thesis}
            </p>
          </div>
          <div>
            <h4>Analyst & Broker Intelligence</h4>
            ${item.annotations.map(a => `
              <div style="margin-bottom:8px; font-size:11px;">
                <span style="color:var(--accent-gold); font-weight:600;">[${a.source}] ${a.topic}:</span>
                <span style="color:var(--text-muted);">${a.note}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(expandTr);
  });
}

function toggleRowExpand(id) {
  const row = document.getElementById("expand-" + id);
  if (row) {
    row.style.display = row.style.display === 'table-row' ? 'none' : 'table-row';
  }
}

function exportFilteredCSV() {
  let csv = "Ticker,Name,Country,Sector,Rating,Bond,Price,YTM,Spread_bp\n";
  filteredIssuers.forEach(i => {
    const m = i.metadata;
    csv += `"${m.ticker}","${m.name}","${m.country}","${m.sector}","${m.rating}","${m.benchmark_bond}",${m.price},${m.ytm},${m.spread_bp}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `CEMBI_Filtered_Screen_${Date.now()}.csv`);
  a.click();
}

// ----------------- TRENDS LOGIC (trends.html) -----------------
let trendChartInstance = null;

function initTrendChart() {
  const sectorSel = document.getElementById("trend-sector");
  const metricSel = document.getElementById("trend-metric");
  
  const sectors = [...new Set(MASTER_ISSUERS.map(i => i.metadata.sector))].sort();
  sectors.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    sectorSel.appendChild(opt);
  });
  
  sectorSel.value = "Real Estate";
  metricSel.value = "net_leverage";
  
  sectorSel.addEventListener("change", renderTrendChart);
  metricSel.addEventListener("change", renderTrendChart);
  
  renderTrendChart();
}

function renderTrendChart() {
  const sec = document.getElementById("trend-sector").value;
  const metric = document.getElementById("trend-metric").value;
  const peers = MASTER_ISSUERS.filter(i => i.metadata.sector === sec);
  
  const periods = ["2021A", "2022A", "2023A", "2024A", "2025E", "2026E", "2027E"];
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#f97316", "#14b8a6"];
  
  const datasets = peers.map((p, idx) => {
    const data = periods.map(per => {
      const f = p.financials_multi_year.find(x => x.period === per);
      return f ? f[metric] : null;
    });
    return {
      label: `${p.metadata.name} (${p.metadata.ticker})`,
      data: data,
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length] + "22",
      borderWidth: 2.5,
      tension: 0.25,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 7
    };
  });
  
  const ctx = document.getElementById("trendCanvas").getContext("2d");
  if (trendChartInstance) trendChartInstance.destroy();
  
  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: periods,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: { color: '#9ca3af', font: { size: 11 } }
        },
        tooltip: {
          backgroundColor: '#162030',
          titleColor: '#f59e0b',
          bodyColor: '#f3f4f6',
          borderColor: '#212c40',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            afterBody: function(items) {
              const pIdx = items[0].dataIndex;
              const per = periods[pIdx];
              return "\n" + (per.includes("A") ? "[Audited Financials]" : "[Institutional Forecast]");
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#1e293b' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: '#1e293b' },
          ticks: { color: '#9ca3af' }
        }
      }
    }
  });
  
  // Render Footnotes for this sector
  const notesDiv = document.getElementById("trend-sector-notes");
  if (notesDiv) {
    const secNotes = MASTER_ANNOTATIONS.filter(a => a.sector === sec).slice(0, 6);
    notesDiv.innerHTML = secNotes.map(n => `
      <div class="note-card" style="margin-bottom:12px;">
        <div class="note-topic">[${n.source}] ${n.topic} — ${n.issuer_name}</div>
        <div class="note-body">${n.note}</div>
      </div>
    `).join('');
  }
}

// ----------------- NOTES SEARCH (notes.html) -----------------
function initNotesSearch() {
  const searchInput = document.getElementById("note-search");
  const srcSelect = document.getElementById("note-source-select");
  
  searchInput.addEventListener("input", renderNotes);
  srcSelect.addEventListener("change", renderNotes);
  
  renderNotes();
}

function renderNotes() {
  const q = document.getElementById("note-search").value.toLowerCase();
  const src = document.getElementById("note-source-select").value;
  const container = document.getElementById("notes-container");
  
  const matches = MASTER_ANNOTATIONS.filter(a => {
    if (src && !a.source.toLowerCase().includes(src.toLowerCase())) return false;
    if (q) {
      const txt = (a.issuer_name + " " + a.sector + " " + a.topic + " " + a.note).toLowerCase();
      if (!txt.includes(q)) return false;
    }
    return true;
  });
  
  document.getElementById("notes-count").textContent = matches.length + " annotations found";
  
  container.innerHTML = matches.map(a => `
    <div class="note-card">
      <div class="note-header">
        <div class="note-issuer">${a.issuer_name}</div>
        <span class="badge badge-sector">${a.sector}</span>
      </div>
      <div class="note-topic">${a.topic}</div>
      <div class="note-body">${a.note}</div>
      <div class="note-footer">
        <span>Source: <strong>${a.source}</strong></span>
        <button class="btn-action" onclick="copyNoteMarkdown('${a.issuer_name}', '${a.topic}', '${a.note}')" style="padding:3px 8px; font-size:10px;">
          📋 Copy
        </button>
      </div>
    </div>
  `).join('');
}

function copyNoteMarkdown(issuer, topic, note) {
  const md = `> **[${issuer} — ${topic}]**\n> ${note}\n`;
  navigator.clipboard.writeText(md).then(() => {
    alert("Copied footnote as Markdown to clipboard!");
  });
}
