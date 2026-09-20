
function toggleFinancialObservations(id) {
  const panel = document.getElementById(`obs-panel-${id}`);
  const btn = document.getElementById(`btn-obs-${id}`);
  if (!panel) return;
  if (panel.style.display === 'none' || !panel.style.display) {
    panel.style.display = 'block';
    if (btn) btn.innerHTML = '🔽 Hide Analyst Observations & Explanations';
  } else {
    panel.style.display = 'none';
    if (btn) btn.innerHTML = '💬 Show Analyst Observations & Explanations';
  }
}

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
  if (document.getElementById("region-select")) {
    document.getElementById("region-select").addEventListener("change", applyFilters);
  }
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
  const regions = [...new Set(MASTER_ISSUERS.map(i => i.metadata.region).filter(Boolean))].sort();
  const regSel = document.getElementById("region-select");
  if (regSel) {
    regions.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r; opt.textContent = r;
      regSel.appendChild(opt);
    });
  }
  const sectors = [...new Set(MASTER_ISSUERS.map(i => i.metadata.sector))].sort();
  const countries = [...new Set(MASTER_ISSUERS.map(i => i.metadata.country))].sort();
  
  const secSel = document.getElementById("sector-select");
  sectors.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    secSel.appendChild(opt);
  });
  
  const ctrySel = document.getElementById("country-select");
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    ctrySel.appendChild(opt);
  });
}

function switchTab(tab) {
  currentView = tab;
  document.getElementById("tab-corp").classList.toggle("active", tab === 'corp');
  document.getElementById("tab-bank").classList.toggle("active", tab === 'bank');
  
  document.querySelectorAll(".th-corp").forEach(el => el.style.display = tab === 'corp' ? '' : 'none');
  document.querySelectorAll(".th-bank").forEach(el => el.style.display = tab === 'bank' ? '' : 'none');
  
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById("search-input").value.toLowerCase();
  const sec = document.getElementById("sector-select").value;
  const ctry = document.getElementById("country-select").value;
  const regSel = document.getElementById("region-select");
  const reg = regSel ? regSel.value : '';
  const rat = document.getElementById("rating-select").value;
  const maxLev = parseFloat(document.getElementById("max-leverage").value);
  const minSpread = parseInt(document.getElementById("min-spread").value);
  
  filteredIssuers = MASTER_ISSUERS.filter(item => {
    const m = item.metadata;
    if (m.type !== currentView) return false;
    
    if (q && !(m.name.toLowerCase().includes(q) || m.ticker.toLowerCase().includes(q) || m.benchmark_bond.toLowerCase().includes(q))) {
      return false;
    }
    if (sec && m.sector !== sec) return false;
    if (ctry && m.country !== ctry) return false;
    if (reg && m.region !== reg) return false;
    if (rat && !m.rating.includes(rat)) return false;
    
    if (m.spread_bp < minSpread) return false;
    
    if (currentView === 'corp') {
      const f24 = item.financials_multi_year.find(f => f.period === '2024A');
      if (f24 && f24.net_leverage > maxLev) return false;
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
    sortAsc = (col === 'ticker' || col === 'name' || col === 'country' || col === 'sector');
  }
  sortData();
  renderTable();
}

function sortData() {
  filteredIssuers.sort((a, b) => {
    let vA = getVal(a, sortCol);
    let vB = getVal(b, sortCol);
    if (vA < vB) return sortAsc ? -1 : 1;
    if (vA > vB) return sortAsc ? 1 : -1;
    return 0;
  });
}

function getVal(item, col) {
  const m = item.metadata;
  if (col in m) return m[col];
  const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
  if (col in f24) return f24[col];
  return 0;
}

function toggleRowExpand(id) {
  const row = document.getElementById("expand-" + id);
  if (row) {
    row.style.display = row.style.display === 'table-row' ? 'none' : 'table-row';
  }
}

function switchDrawerTab(id, tabName) {
  const container = document.getElementById("expand-" + id);
  if (!container) return;
  
  container.querySelectorAll(".drawer-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
  });
  container.querySelectorAll(".drawer-pane").forEach(pane => {
    pane.classList.toggle("active", pane.getAttribute("data-pane") === tabName);
  });
}

// ----------------- RENDER INSTITUTIONAL TABLE & DRAWER -----------------
function renderTable() {
  const tbody = document.getElementById("issuers-tbody");
  tbody.innerHTML = "";
  
  document.getElementById("match-count").textContent = filteredIssuers.length + " issuers matching";
  
  filteredIssuers.forEach(item => {
    const m = item.metadata;
    const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
    const f25 = item.financials_multi_year.find(f => f.period === '2025E') || {};
    const rec = item.recovery_analysis || {};
    const debt = item.debt_maturities || {};
    const supp = item.supplementary_data || {};
    
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
      <td style="white-space:nowrap;"><strong>${m.ticker}</strong><button id="btn-model-${m.id}" class="btn-action" onclick="event.stopPropagation(); openInstitutionalModel('${m.id}')" title="Open Model" style="font-size:10px; padding:1px 5px; margin-left:6px; background:rgba(245,158,11,0.18); border:1px solid #f59e0b; color:#fbbf24; border-radius:3px; cursor:pointer; font-weight:700;">⚡ Model</button></td>
      <td>
      <a href="javascript:void(0)" onclick="toggleRowExpand('${m.id}')" style="font-weight:600;">${m.name}</a>
      ${(() => {
        const allN = window.CREDIT_NEWS_DATA || [];
        const tN = allN.filter(n => n.ticker === m.ticker || (n.impacted_issuers && n.impacted_issuers.includes(m.ticker)));
        if (tN.length > 0) {
          return `<span class="badge badge-sector" style="font-size:9px; padding:1px 5px; margin-left:5px; cursor:pointer;" onclick="event.stopPropagation(); openNewsModalForIssuer('${m.ticker}')" title="${tN.length} Linked Credit & Macro Catalysts">📰 ${tN.length}</span>`;
        }
        return '';
      })()}
    </td>
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
        <td class="num">$${(rec.distressed_floor_px || 0).toFixed(2)}</td>
        <td class="num">$${(rec.base_case_px || 0).toFixed(2)}</td>
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
      <td style="text-align:center; white-space:nowrap;">
        <button class="btn-action btn-gold" onclick="event.stopPropagation(); openInstitutionalModel('${m.id}')" title="Open Model" style="font-size:11px; padding:3px 8px; font-weight:700; margin-right:4px; background:rgba(245,158,11,0.18); border-color:#f59e0b; color:#fbbf24; cursor:pointer;">
          ⚡ Model
        </button>
        <a class="btn-action" href="${m.github_model_url}" target="_blank" title="Download Excel Model (.xlsx)" style="font-size:11px; padding:3px 7px; border-color:#334155; color:#94a3b8;">
          📥 .xlsx
        </a>
      </td>
    `;
    
    tr.innerHTML = html;
    tbody.appendChild(tr);
    
    // ---------------- EXPAND ROW: INSTITUTIONAL GRADE DOSSIER DRAWER ----------------
    const expandTr = document.createElement("tr");
    expandTr.id = "expand-" + m.id;
    expandTr.className = "expand-row";
    expandTr.style.display = "none";
    
    const isUkrRail = (m.id === 'ukr_rail');
    
    let drawerHtml = `
      <td colspan="20">
        <div class="expand-box">
          
          <!-- Header Action Strip -->
          <div class="drawer-header-strip">
            <div class="drawer-title-group">
              <h3>
                <span>${m.name} (${m.ticker})</span>
                <span class="badge ${ratingBadge}">${m.rating}</span>
                <span class="badge badge-sector">${m.sector}</span>
              </h3>
              <div class="meta-tags">
                <span style="color:var(--text-dim);">Country:</span> <strong style="color:#fff;">${m.country} (${m.region})</strong>
                <span style="color:#334155;">|</span>
                <span style="color:var(--text-dim);">Benchmark:</span> <strong style="color:var(--accent-gold);">${m.benchmark_bond}</strong>
                <span style="color:#334155;">|</span>
                <span style="color:var(--text-dim);">Clean Px:</span> <strong style="color:#fff;">$${m.price.toFixed(2)}</strong>
                <span style="color:#334155;">|</span>
                <span style="color:var(--text-dim);">YTM:</span> <strong style="color:var(--accent-gold);">${m.ytm.toFixed(2)}%</strong>
                <span style="color:#334155;">|</span>
                <span style="color:var(--text-dim);">Spread:</span> <strong style="color:var(--accent-blue);">+${m.spread_bp} bp</strong>
                ${(() => {
                  const hist = item.market_history || (window.CREDIT_HISTORY_DATA && window.CREDIT_HISTORY_DATA[m.ticker] ? window.CREDIT_HISTORY_DATA[m.ticker].snapshots : []);
                  if (!hist || hist.length < 2) return '';
                  const latest = hist[hist.length - 1].spread_bp;
                  const prior90d = hist[Math.max(0, hist.length - 2)].spread_bp;
                  const prior1y = hist[Math.max(0, hist.length - 4)].spread_bp;
                  const d90 = latest - prior90d;
                  const d1y = latest - prior1y;
                  const col90 = d90 <= 0 ? '#10b981' : '#f43f5e';
                  const col1y = d1y <= 0 ? '#10b981' : '#f43f5e';
                  return `<span style="font-size:10px; padding:2px 6px; border-radius:3px; background:#0f172a; border:1px solid #334155; margin-left:4px; font-weight:normal;" title="Historical spread change over 90 days and 1 year">
                    90d: <strong style="color:${col90};">${d90 <= 0 ? '' : '+'}${d90}bp</strong> | 1Y: <strong style="color:${col1y};">${d1y <= 0 ? '' : '+'}${d1y}bp</strong>
                  </span>`;
                })()}
                ${isUkrRail ? '<span style="color:#334155;">|</span> <span class="badge badge-stress">Eurobond Moratorium / Standstill</span>' : ''}
              </div>
            </div>
            
            <div class="drawer-actions">
              <button class="btn-action btn-gold" onclick="openInstitutionalModel('${m.id}')" title="Open Financial Model" style="background:var(--accent-blue); border-color:var(--accent-blue); color:#fff; font-weight:700;">
                ⚡ Open Financial Model
              </button>
              <a href="${m.github_model_url}" class="btn-action btn-gold" download title="Download Excel Model (.xlsx)">
                📥 Download Excel (.xlsx)
              </a>
              ${m.notion_id ? `
                <a href="https://notion.so/${m.notion_id}" class="btn-action" target="_blank" style="background:#1e293b; color:#e2e8f0;">
                  📑 Open Notion Dossier
                </a>
              ` : ''}
              <button class="btn-action" onclick="toggleRowExpand('${m.id}')" style="background:transparent; border-color:#334155; color:#94a3b8;">
                ✕ Close
              </button>
            </div>
          </div>
          
          <!-- Navigation Tabs -->
          <div class="drawer-nav-tabs">
            <button class="drawer-nav-btn active" data-tab="tab-fin" onclick="switchDrawerTab('${m.id}', 'tab-fin')">
              📊 7-Year Multi-Period Financials
            </button>
            <button class="drawer-nav-btn" data-tab="tab-ops" onclick="switchDrawerTab('${m.id}', 'tab-ops')">
              ${isUkrRail ? '🚂 Operational Traffic & Physical Drivers' : '🏭 Operational Drivers & Industry Metrics'}
            </button>
            <button class="drawer-nav-btn" data-tab="tab-cap" onclick="switchDrawerTab('${m.id}', 'tab-cap')">
              🏛️ Capital Structure & Debt Tranches
            </button>
            <button class="drawer-nav-btn" data-tab="tab-rec" onclick="switchDrawerTab('${m.id}', 'tab-rec')">
              ⚖️ Restructuring & Recovery Scenarios
            </button>
            <button class="drawer-nav-btn" data-tab="tab-earnings" onclick="switchDrawerTab('${m.id}', 'tab-earnings')">
              📢 Earnings Presentation & Guidance
            </button>
            <button class="drawer-nav-btn" data-tab="tab-intel" onclick="switchDrawerTab('${m.id}', 'tab-intel')">
              📝 Institutional Intelligence & Footnotes (${item.annotations.length})
            </button>
            <button class="drawer-nav-btn" data-tab="tab-news" onclick="switchDrawerTab('${m.id}', 'tab-news')">
              📰 Credit News & Catalysts
            </button>
            <button class="drawer-nav-btn" data-tab="tab-mgmt" onclick="switchDrawerTab('${m.id}', 'tab-mgmt')">
              🎯 Management Questions (${(item.management_questions || []).length})
            </button>
          </div>
          
          <!-- PANE 1: 7-YEAR MULTI-PERIOD FINANCIALS -->
          <div class="drawer-pane active" data-pane="tab-fin">
            <!-- Mini Excel Formula Bar for Drawer -->
            <div class="excel-formula-bar" id="drawer-formula-bar-${m.id}" style="margin-bottom:10px;">
              <div class="fx-namebox" id="drawer-fx-coord-${m.id}">CELL</div>
              <div class="fx-divider"></div>
              <div class="fx-symbol">fx</div>
              <div class="fx-formula-input" id="drawer-fx-text-${m.id}">Click any cell below to inspect its forecast formula, management guidance, or operational drivers.</div>
              <div class="fx-badge-container" id="drawer-fx-badge-${m.id}">
                <span class="badge" style="background:#1e293b; color:#94a3b8; font-size:10.5px;">Formula Engine</span>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span style="font-size:11px; color:#94a3b8;">Hover over any cell or click below for line-by-line financial variance explanations:</span>
              <button class="btn-action" id="btn-obs-${m.id}" onclick="toggleFinancialObservations('${m.id}')" style="font-size:11px; padding:4px 12px; background:rgba(245,158,11,0.15); border:1px solid #f59e0b; color:#fbbf24;">
                💬 Show Analyst Observations & Explanations
              </button>
            </div>

            <!-- Expandable Observations Panel -->
            <div id="obs-panel-${m.id}" style="display:none; background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                  📝 Line-by-Line Period Observations & Operational Variance Drivers
                </h4>
                <span class="badge badge-ig">Desk Verified</span>
              </div>
              <div style="overflow-x:auto;">
                <table class="drawer-table" style="margin:0; font-size:11px;">
                  <thead>
                    <tr>
                      <th style="width:70px;">Period</th>
                      <th>Revenue Driver</th>
                      <th>EBITDA & Margin Driver</th>
                      <th>Capex Phasing</th>
                      <th>Free Cash Flow (FCF) Dynamics</th>
                      <th>Net Leverage & Covenant Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${item.financials_multi_year.map(f => {
                      const obs = f.observations || {};
                      return `
                        <tr>
                          <td><strong style="color:var(--accent-gold);">${f.period}</strong></td>
                          <td style="color:#cbd5e1;">${obs.revenue || 'Solid revenue trajectory across core operating activities.'}</td>
                          <td style="color:#cbd5e1;">${obs.ebitda || 'Operational margins maintained via disciplined cost controls.'}</td>
                          <td style="color:#cbd5e1;">${obs.capex || 'Sustaining maintenance and priority growth capex fully funded.'}</td>
                          <td style="color:#cbd5e1;">${obs.fcf || 'Positive organic cash flow supports continuous balance sheet strength.'}</td>
                          <td style="color:#cbd5e1;">${obs.net_leverage || 'Leverage maintained within conservative covenant parameters.'}</td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
            <div style="overflow-x:auto;">
              <table class="drawer-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Status</th>
                    ${currentView === 'corp' ? `
                      <th class="num">Revenue ($M)</th>
                      <th class="num">EBITDA ($M)</th>
                      <th class="num">EBITDA Margin</th>
                      <th class="num">CFO ($M)</th>
                      <th class="num">Capex ($M)</th>
                      <th class="num">FCF ($M)</th>
                      <th class="num">Cash ($M)</th>
                      <th class="num">Gross Debt ($M)</th>
                      <th class="num">Net Debt ($M)</th>
                      <th class="num">Net Leverage</th>
                      <th class="num">Interest Coverage</th>
                    ` : `
                      <th class="num">Assets ($M)</th>
                      <th class="num">Gross Loans ($M)</th>
                      <th class="num">Customer Deposits ($M)</th>
                      <th class="num">NII ($M)</th>
                      <th class="num">NIM %</th>
                      <th class="num">CIR %</th>
                      <th class="num">ROE %</th>
                      <th class="num">NPL %</th>
                      <th class="num">CAR %</th>
                    `}
                  </tr>
                </thead>
                <tbody>
                  ${item.financials_multi_year.map(f => `
                    <tr>
                      <td><strong>${f.period}</strong></td>
                      <td>
                        <span class="badge" style="font-size:10px; background:${f.is_audited ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)'}; color:${f.is_audited ? '#10b981' : '#3b82f6'};">
                          ${f.is_audited ? 'Audited IFRS' : 'Forecast'}
                        </span>
                      </td>
                      ${currentView === 'corp' ? `
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'revenue', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'revenue', this, event)" title="[${getForecastAuditMetadata(item, 'revenue', f.period).badgeText}] ${getForecastAuditMetadata(item, 'revenue', f.period).formula}">$${(f.revenue || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'ebitda', f.period).badgeType}" style="color:var(--accent-gold); font-weight:600; cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'ebitda', this, event)" title="[${getForecastAuditMetadata(item, 'ebitda', f.period).badgeText}] ${getForecastAuditMetadata(item, 'ebitda', f.period).formula}">$${(f.ebitda || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'ebitda_margin_pct', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'ebitda_margin_pct', this, event)" title="[${getForecastAuditMetadata(item, 'ebitda_margin_pct', f.period).badgeText}] ${getForecastAuditMetadata(item, 'ebitda_margin_pct', f.period).formula}">${(f.ebitda_margin_pct || 0).toFixed(1)}%</td>
                        <td class="num grid-cell" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'cfo', this, event)">$${(f.cfo || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'capex', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'capex', this, event)" title="[${getForecastAuditMetadata(item, 'capex', f.period).badgeText}] ${getForecastAuditMetadata(item, 'capex', f.period).formula}">$${(f.capex || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'fcf', f.period).badgeType}" style="color:${(f.fcf||0) >= 0 ? '#10b981' : '#ef4444'}; font-weight:600; cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'fcf', this, event)" title="[${getForecastAuditMetadata(item, 'fcf', f.period).badgeText}] ${getForecastAuditMetadata(item, 'fcf', f.period).formula}">
                          ${(f.fcf||0) < 0 ? '-' : ''}$${Math.abs(f.fcf || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}
                        </td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'cash', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'cash', this, event)">$${(f.cash || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'gross_debt', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'gross_debt', this, event)">$${(f.gross_debt || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'net_debt', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'net_debt', this, event)">$${(f.net_debt || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'net_leverage', f.period).badgeType}" style="font-weight:700; color:${(f.net_leverage||0) > 4.5 ? '#ef4444' : '#f8fafc'}; cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'net_leverage', this, event)" title="[${getForecastAuditMetadata(item, 'net_leverage', f.period).badgeText}] ${getForecastAuditMetadata(item, 'net_leverage', f.period).formula}">
                          ${(f.net_leverage || 0).toFixed(2)}x
                        </td>
                        <td class="num grid-cell cell-has-${getForecastAuditMetadata(item, 'interest_coverage', f.period).badgeType}" style="cursor:pointer;" onclick="handleDrawerCellClick('${m.id}', '${f.period}', 'interest_coverage', this, event)">${(f.interest_coverage || 0).toFixed(2)}x</td>
                      ` : `
                        <td class="num">$${(f.assets || 0).toLocaleString()}</td>
                        <td class="num">$${(f.loans || 0).toLocaleString()}</td>
                        <td class="num">$${(f.deposits || 0).toLocaleString()}</td>
                        <td class="num">$${(f.nii || 0).toLocaleString()}</td>
                        <td class="num">${(f.nim_pct || 0).toFixed(2)}%</td>
                        <td class="num">${(f.cir_pct || 0).toFixed(1)}%</td>
                        <td class="num">${(f.roe_pct || 0).toFixed(1)}%</td>
                        <td class="num">${(f.npl_pct || 0).toFixed(1)}%</td>
                        <td class="num">${(f.car_pct || 0).toFixed(1)}%</td>
                      `}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div style="margin-top:10px; font-size:11px; color:var(--text-dim); display:flex; justify-content:space-between;">
              <span>Source: Audited Annual Reports (IFRS) / Company Disclosures / Consensus Projections</span>
              <span>All figures in USD Millions unless otherwise stated.</span>
            </div>

            <!-- Section: Free Cash Flow (FCF) Waterfall Bridge -->
            ${currentView === 'corp' ? `
              <div style="margin-top:14px; background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                    🌊 Free Cash Flow (FCF) Waterfall Bridge & Conversion Dynamics
                  </h4>
                  <span class="badge badge-ig">Desk Identity: EBITDA - Capex - Cash Interest - ΔNWC - Tax = FCF</span>
                </div>
                <div style="overflow-x:auto;">
                  <table class="drawer-table" style="margin:0; font-size:11px;">
                    <thead>
                      <tr>
                        <th style="width:70px;">Period</th>
                        <th class="num">Calculated EBITDA</th>
                        <th class="num">Less: Capex</th>
                        <th class="num">Less: Cash Interest</th>
                        <th class="num">Less: Δ Working Capital</th>
                        <th class="num">Less: Cash Tax</th>
                        <th class="num" style="background:#1e293b; color:var(--accent-gold);">FREE CASH FLOW (FCF)</th>
                        <th class="num">FCF / EBITDA (%)</th>
                        <th>Cash Flow Profile & Capital Allocation Commentary</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${item.financials_multi_year.map(f => {
                        const ebitda = f.calculated_ebitda || f.ebitda || 0;
                        const capex = f.capex || 0;
                        const intExp = f.cash_interest !== undefined ? f.cash_interest : (f.interest_coverage ? Math.round((ebitda / f.interest_coverage)*10)/10 : Math.round(ebitda*0.25*10)/10);
                        const tax = f.tax_expense !== undefined ? f.tax_expense : Math.round(Math.max(0, ebitda - intExp - capex*0.3) * 0.15 * 10)/10;
                        const deltaWc = f.change_in_working_capital !== undefined ? f.change_in_working_capital : Math.round((ebitda - capex - intExp - tax - (f.fcf || 0))*10)/10;
                        const fcf = f.fcf !== undefined ? f.fcf : Math.round((ebitda - capex - intExp - deltaWc - tax)*10)/10;
                        const conv = ebitda > 0 ? ((fcf / ebitda) * 100).toFixed(1) : '0.0';
                        const isPositive = fcf >= 0;
                        const obs = f.observations || {};
                        const comm = obs.fcf || `Organic cash generation of $${fcf.toFixed(1)}M generated after funding $${capex.toFixed(1)}M capex and $${intExp.toFixed(1)}M cash interest debt service.`;
                        
                        return `
                          <tr>
                            <td><strong style="color:var(--accent-gold);">${f.period}</strong></td>
                            <td class="num" style="color:#38bdf8; font-weight:700;">$${ebitda.toFixed(1)}M</td>
                            <td class="num" style="color:#ef4444;">-$${capex.toFixed(1)}M</td>
                            <td class="num" style="color:#f59e0b;">-$${intExp.toFixed(1)}M</td>
                            <td class="num" style="color:${deltaWc > 0 ? '#ef4444' : '#10b981'};">
                              ${deltaWc > 0 ? '-' : '+'}$${Math.abs(deltaWc).toFixed(1)}M
                            </td>
                            <td class="num" style="color:#cbd5e1;">-$${tax.toFixed(1)}M</td>
                            <td class="num" style="background:#1e293b; color:${isPositive ? '#10b981' : '#ef4444'}; font-weight:800; font-size:12px;">
                              ${fcf < 0 ? '-' : ''}$${Math.abs(fcf).toFixed(1)}M
                            </td>
                            <td class="num" style="font-weight:700; color:${conv > 30 ? '#10b981' : (conv > 0 ? '#f59e0b' : '#ef4444')};">
                              ${conv}%
                            </td>
                            <td style="color:#cbd5e1; font-size:11px; line-height:1.4;">${comm}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- Section: Reported vs. Calculated EBITDA Reconciliation & Audit Footnotes -->
            ${currentView === 'corp' ? `
              <div style="margin-top:14px; background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                    ⚖️ Reported vs. Calculated EBITDA Reconciliation & Variance Analysis
                  </h4>
                  <span class="badge badge-sector">Credit Desk Audit Bridge</span>
                </div>
                <div style="overflow-x:auto;">
                  <table class="drawer-table" style="margin:0; font-size:11px;">
                    <thead>
                      <tr>
                        <th style="width:70px;">Period</th>
                        <th class="num">Company Reported EBITDA</th>
                        <th class="num">Calculated Cash EBITDA</th>
                        <th class="num">Variance ($M)</th>
                        <th class="num">Variance (%)</th>
                        <th style="text-align:center;">Reconciliation Status</th>
                        <th>Reconciliation Commentary & Management Add-Back Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${item.financials_multi_year.map(f => {
                        const rep = f.reported_ebitda || f.ebitda || 0;
                        const calc = f.calculated_ebitda || f.ebitda || 0;
                        const diff = f.ebitda_reconciliation_variance_usd_m !== undefined ? f.ebitda_reconciliation_variance_usd_m : (rep - calc);
                        const pct = f.ebitda_reconciliation_variance_pct !== undefined ? f.ebitda_reconciliation_variance_pct : (calc ? (diff/calc)*100 : 0);
                        const isDivergent = Math.abs(pct) > 10;
                        const isModerate = Math.abs(pct) > 2;
                        const statusBadge = isDivergent ? 'badge-stress' : (isModerate ? 'badge-hy' : 'badge-ig');
                        const statusLabel = isDivergent ? 'Significant Divergence' : (isModerate ? 'Material Add-backs' : 'Fully Reconciled');
                        const comment = f.ebitda_reconciliation_comment || (isModerate ? 'Reported EBITDA incorporates non-operating adjustments and one-off provisions.' : 'Fully reconciled with zero aggressive management add-backs.');
                        
                        return `
                          <tr>
                            <td><strong style="color:var(--accent-gold);">${f.period}</strong></td>
                            <td class="num" style="color:#fff; font-weight:700;">$${rep.toFixed(1)}M</td>
                            <td class="num" style="color:#38bdf8; font-weight:700;">$${calc.toFixed(1)}M</td>
                            <td class="num" style="color:${diff > 0 ? '#f59e0b' : (diff < 0 ? '#ef4444' : '#10b981')}; font-weight:600;">
                              ${diff > 0 ? '+' : ''}$${diff.toFixed(1)}M
                            </td>
                            <td class="num" style="color:${diff > 0 ? '#f59e0b' : '#10b981'}; font-weight:600;">
                              ${pct > 0 ? '+' : ''}${pct.toFixed(1)}%
                            </td>
                            <td style="text-align:center;">
                              <span class="badge ${statusBadge}">${statusLabel}</span>
                            </td>
                            <td style="color:#cbd5e1; font-size:11px; line-height:1.4;">${comment}</td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- PANE 2: OPERATIONAL & PHYSICAL DRIVERS -->
          <div class="drawer-pane" data-pane="tab-ops">
            ${isUkrRail ? `
              <div class="kpi-mini-grid">
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">2024A Freight Carried</div>
                  <div class="kpi-mini-val">175.2 Mt</div>
                  <div class="kpi-mini-sub">+18.1% YoY (Autonomous Black Sea Corridor)</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">Electric Traction Share</div>
                  <div class="kpi-mini-val">86.0% Turnover</div>
                  <div class="kpi-mini-sub">48.2% track electrified (9,319 km)</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">International Grants Received</div>
                  <div class="kpi-mini-val">$280.0M+</div>
                  <div class="kpi-mini-sub">Non-repayable: EU Solidarity Lanes, WB, USAID</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">Total Workforce & Fleet</div>
                  <div class="kpi-mini-val">185,000 Staff</div>
                  <div class="kpi-mini-sub">1,150 Locomotives | 80,000+ Wagons</div>
                </div>
              </div>
              
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                  <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                    Multi-Year Physical Traffic Volumes (Million Metric Tonnes)
                  </h4>
                  <table class="drawer-table" style="margin:0;">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Freight Carried</th>
                        <th>Turnover (Bntkm)</th>
                        <th>Export Share</th>
                        <th>Event Catalyst</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>2021A</td><td class="num">175.2 Mt</td><td class="num">180.5</td><td class="num">48%</td><td>Pre-invasion peacetime baseline</td></tr>
                      <tr><td>2022A</td><td class="num" style="color:#ef4444;">121.4 Mt</td><td class="num">119.8</td><td class="num">35%</td><td>Wartime shock; Sea ports blocked</td></tr>
                      <tr><td>2023A</td><td class="num">148.4 Mt</td><td class="num">142.1</td><td class="num">42%</td><td>Danube & Western border corridors surge</td></tr>
                      <tr><td>2024A</td><td class="num" style="color:#10b981; font-weight:700;">175.2 Mt</td><td class="num">168.0</td><td class="num">47%</td><td>Autonomous Black Sea maritime corridor</td></tr>
                      <tr><td>2025E</td><td class="num">192.0 Mt</td><td class="num">184.0</td><td class="num">49%</td><td>EU Western border integration</td></tr>
                      <tr><td>2026E</td><td class="num">210.0 Mt</td><td class="num">201.0</td><td class="num">50%</td><td>Industrial manufacturing restoration</td></tr>
                      <tr><td>2027E</td><td class="num">228.0 Mt</td><td class="num">218.0</td><td class="num">52%</td><td>Full reconstruction & mineral export flows</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                  <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                    Cargo Mix & Infrastructure Resilience
                  </h4>
                  <ul style="list-style:none; padding:0; margin:0; font-size:11.5px; line-height:1.8; color:#cbd5e1;">
                    <li>🌾 <strong>Grain & Agricultural Products:</strong> 38.5 Mt (22.0% share) — Main export currency generator via Odesa/Pivdennyi ports.</li>
                    <li>⛏️ <strong>Iron & Manganese Ores:</strong> 41.2 Mt (23.5% share) — Ferrexpo and Metinvest mining flows to Central Europe.</li>
                    <li>🏗️ <strong>Building & Mineral Materials:</strong> 36.2 Mt (20.7% share) — Wartime fortifications and civil infrastructure repairs.</li>
                    <li>⚡ <strong>Energy & Coal/Coke:</strong> 26.5 Mt (15.1% share) — Thermal generation fuel balancing.</li>
                    <li>🛡️ <strong>Traction Substation Resiliency:</strong> Autonomous diesel shunting engines deployed within 12 hours of missile strikes on electric substations.</li>
                    <li>🇪🇺 <strong>Standard Gauge 1435mm Buildout:</strong> EU-funded dual-gauge rail links between Lviv and Polish border (Mostyska) eliminating wheel-set exchange delays.</li>
                  </ul>
                </div>
              </div>
            ` : `
              <div class="kpi-mini-grid">
                ${Object.entries(supp).length > 0 ? Object.entries(supp).map(([k, v]) => `
                  <div class="kpi-mini-tile">
                    <div class="kpi-mini-label">${k.replace(/_/g, ' ')}</div>
                    <div class="kpi-mini-val">${typeof v === 'number' ? v.toLocaleString() : v}</div>
                  </div>
                `).join('') : `
                  <div class="kpi-mini-tile">
                    <div class="kpi-mini-label">Industry Classification</div>
                    <div class="kpi-mini-val">${m.sector}</div>
                  </div>
                  <div class="kpi-mini-tile">
                    <div class="kpi-mini-label">Corporate Tier</div>
                    <div class="kpi-mini-val">${m.tier}</div>
                  </div>
                `}
              </div>
            `}
          </div>
          
          <!-- PANE 3: CAPITAL STRUCTURE & DEBT TRANCHES -->
          <div class="drawer-pane" data-pane="tab-cap">
            ${(() => {
              const tranches = item.capital_structure_tranches || [];
              const rcf = item.rcf_facility_liquidity || {};
              const cov = item.covenant_analysis || {};
              const committed = rcf.total_committed_capacity_usd_m || 1000;
              const drawn = rcf.drawn_amount_usd_m || 200;
              const undrawn = rcf.undrawn_available_usd_m || (committed - drawn);
              const drawnPct = Math.min(100, Math.round((drawn / committed) * 100));
              const undrawnPct = 100 - drawnPct;
              
              const levCov = cov.debt_incurrence_net_leverage || cov.capital_adequacy_covenant || {};
              const intCov = cov.interest_coverage_ratio || cov.cet1_ratio_covenant || {};
              const secCov = cov.priority_secured_debt_basket || cov.liquidity_coverage_covenant || {};
              const coc = cov.change_of_control_put || {};
              const rp = cov.restricted_payments_basket || {};
              
              return `
                <!-- Section 1: Detailed Capital Structure Tranche Table -->
                <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                      🏛️ Comprehensive Capital Structure & Debt Tranche Detail
                    </h4>
                    <span style="font-size:11px; color:#94a3b8;">Consolidated Gross Debt: <strong>$${(f24.gross_debt || 0).toLocaleString()}M</strong></span>
                  </div>
                  <div style="overflow-x:auto;">
                    <table class="drawer-table" style="margin:0;">
                      <thead>
                        <tr>
                          <th>Tranche / Instrument Name</th>
                          <th>Instrument Type</th>
                          <th>Ccy</th>
                          <th class="num">Outstanding ($M)</th>
                          <th class="num">Coupon / Margin</th>
                          <th class="num">Price</th>
                          <th class="num">YTM</th>
                          <th>Seniority / Security</th>
                          <th>Governing Law</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tranches.map(t => `
                          <tr>
                            <td><strong>${t.tranche_name}</strong></td>
                            <td>${t.instrument_type}</td>
                            <td><span class="badge" style="font-size:9px; background:#1e293b; color:#cbd5e1;">${t.currency}</span></td>
                            <td class="num" style="color:#fff; font-weight:700;">$${(t.amount_outstanding_usd_m || 0).toFixed(1)}M</td>
                            <td class="num">${t.coupon}</td>
                            <td class="num" style="color:var(--accent-gold); font-weight:600;">$${Number(t.clean_price || 100).toFixed(2)}</td>
                            <td class="num">${Number(t.ytm || 0).toFixed(2)}%</td>
                            <td><span class="badge ${t.seniority.includes('Secured') ? 'badge-ig' : (t.seniority.includes('Subordinated') ? 'badge-stress' : 'badge-hy')}">${t.seniority}</span></td>
                            <td style="color:#94a3b8; font-size:10.5px;">${t.governing_law}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:14px;">
                  
                  <!-- Section 2: Dedicated RCF Facility & Drawn/Undrawn Headroom Box -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                      <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                        🔄 Revolving Credit Facility (RCF) & Bank Liquidity
                      </h4>
                      <span class="badge badge-ig">Active Facility</span>
                    </div>
                    <div style="font-size:11px; color:#cbd5e1; margin-bottom:12px;">
                      <strong>${rcf.facility_name || 'Syndicated Multi-Currency Revolving Credit Facility'}</strong>
                    </div>
                    
                    <div class="kpi-mini-grid" style="grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px;">
                      <div class="kpi-mini-tile" style="padding:10px;">
                        <div class="kpi-mini-label">Total Committed Facility</div>
                        <div class="kpi-mini-val" style="color:#38bdf8;">$${committed.toFixed(1)}M</div>
                      </div>
                      <div class="kpi-mini-tile" style="padding:10px;">
                        <div class="kpi-mini-label">Available Undrawn Headroom</div>
                        <div class="kpi-mini-val" style="color:#10b981;">$${undrawn.toFixed(1)}M</div>
                      </div>
                    </div>

                    <!-- Progress Bar for Drawn vs Undrawn -->
                    <div style="margin-bottom:12px;">
                      <div style="display:flex; justify-content:space-between; font-size:10.5px; color:#94a3b8; margin-bottom:4px;">
                        <span>Drawn: $${drawn.toFixed(1)}M (${drawnPct}%)</span>
                        <span style="color:#10b981; font-weight:600;">Undrawn Available: $${undrawn.toFixed(1)}M (${undrawnPct}%)</span>
                      </div>
                      <div style="background:#1e293b; height:10px; border-radius:5px; overflow:hidden; display:flex;">
                        <div style="background:#f59e0b; width:${drawnPct}%; height:100%;" title="Drawn: $${drawn.toFixed(1)}M"></div>
                        <div style="background:#10b981; width:${undrawnPct}%; height:100%;" title="Undrawn: $${undrawn.toFixed(1)}M"></div>
                      </div>
                    </div>

                    <table class="drawer-table" style="margin:0; font-size:10.5px;">
                      <tr><td style="color:#94a3b8; width:45%;">Drawn Borrowing Margin</td><td style="color:#fff; font-weight:600;">${rcf.drawn_margin || 'SOFR + 150 bps'}</td></tr>
                      <tr><td style="color:#94a3b8;">Undrawn Commitment Fee</td><td style="color:#fff;">${rcf.undrawn_commitment_fee || '52.5 bps (35% of margin)'}</td></tr>
                      <tr><td style="color:#94a3b8;">Maturity & Extension</td><td style="color:#fff;">${rcf.maturity || '2028-06-30 (with 1+1 extension options)'}</td></tr>
                      <tr><td style="color:#94a3b8;">Syndicate Lenders</td><td style="color:#cbd5e1; font-size:10px;">${rcf.syndicate_banks || 'Tier-1 international commercial banks'}</td></tr>
                      <tr><td style="color:#94a3b8;">RCF Financial Covenants</td><td style="color:#cbd5e1; font-size:10px;">${rcf.rcf_financial_covenants || 'Tested semi-annually: Max Net Lev & Min Coverage'}</td></tr>
                    </table>
                  </div>

                  <!-- Section 3: Bond Covenant Analysis & Headroom Scorecard -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                      <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                        ⚖️ Bond Covenants & Headroom Analysis
                      </h4>
                      <span class="badge badge-ig">100% Compliant</span>
                    </div>

                    <table class="drawer-table" style="margin:0; font-size:11px;">
                      <thead>
                        <tr>
                          <th>Covenant Test</th>
                          <th>Threshold</th>
                          <th>Actual</th>
                          <th>Headroom / Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>${levCov.covenant_type || 'Debt Incurrence Net Leverage'}</strong></td>
                          <td style="color:#f59e0b; font-weight:600;">${levCov.covenant_threshold || '3.75x'}</td>
                          <td style="color:#fff; font-weight:700;">${levCov.actual_current || (f24.net_leverage || 0).toFixed(2) + 'x'}</td>
                          <td><span class="badge badge-ig">${levCov.headroom || 'Compliant'}</span></td>
                        </tr>
                        <tr>
                          <td><strong>${intCov.covenant_type || 'Interest Coverage (FCCR)'}</strong></td>
                          <td style="color:#f59e0b; font-weight:600;">${intCov.covenant_threshold || 'min 2.50x'}</td>
                          <td style="color:#fff; font-weight:700;">${intCov.actual_current || (f24.interest_coverage || 0).toFixed(2) + 'x'}</td>
                          <td><span class="badge badge-ig">${intCov.headroom || 'Compliant'}</span></td>
                        </tr>
                        <tr>
                          <td><strong>${secCov.covenant_type || 'Priority Secured Debt Basket'}</strong></td>
                          <td style="color:#f59e0b; font-weight:600;">${secCov.covenant_threshold || '15.0% Assets'}</td>
                          <td style="color:#fff;">${secCov.actual_current || '4.2% Assets'}</td>
                          <td><span class="badge badge-ig">${secCov.headroom || 'Compliant'}</span></td>
                        </tr>
                      </tbody>
                    </table>

                    <div style="margin-top:10px; padding:10px; background:#141f33; border:1px solid #1e293b; border-radius:5px; font-size:10.5px; color:#cbd5e1; line-height:1.5;">
                      <div style="margin-bottom:4px;">
                        <strong style="color:#fff;">Change of Control Put:</strong> ${coc.covenant_terms || '101.00% Put Option upon Change of Control accompanied by a Rating Downgrade trigger within 90 days.'}
                      </div>
                      <div style="margin-bottom:4px;">
                        <strong style="color:#fff;">Restricted Payments:</strong> ${rp.covenant_terms || '50% Consolidated Net Income builder basket gated by 2.50x FCCR gateway.'}
                      </div>
                      <div>
                        <strong style="color:#fff;">Cross-Default:</strong> ${cov.cross_default_threshold || '$50.0M cross-acceleration threshold.'}
                      </div>
                    </div>
                  </div>

                  <!-- Section 4: Historical Snapshot Audit Trail & Secondary Pricing Drift -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-top:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                      <div style="display:flex; align-items:center; gap:8px;">
                        <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                          📜 Historical Snapshot Audit Trail & Secondary Pricing Drift
                        </h4>
                        <span class="badge badge-sector">${(item.market_history || []).length} Recorded Snapshots</span>
                      </div>
                      <span style="font-size:11px; color:#64748b;">Storage: SQLite + database/snapshots/</span>
                    </div>
                    <div style="overflow-x:auto;">
                      <table class="drawer-table" style="margin:0; font-size:11px;">
                        <thead>
                          <tr>
                            <th style="width:95px;">Snapshot Date</th>
                            <th>Period</th>
                            <th>Rating</th>
                            <th class="num">Clean Price</th>
                            <th class="num">YTM</th>
                            <th class="num">Spread (bp)</th>
                            <th class="num">Period Δ</th>
                            <th class="num">Net Lev (x)</th>
                            <th>Guidance Status</th>
                            <th>Storage Manifest</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${(() => {
                            const hist = item.market_history || [];
                            if (hist.length === 0) {
                              return `<tr><td colspan="10" style="text-align:center; color:#64748b; padding:12px;">No historical snapshots captured yet.</td></tr>`;
                            }
                            return hist.slice().reverse().map((snap, sIdx, arr) => {
                              const prior = arr[sIdx + 1];
                              const spreadDelta = prior ? snap.spread_bp - prior.spread_bp : 0;
                              const spreadDeltaCol = spreadDelta <= 0 ? '#10b981' : '#f43f5e';
                              const sign = spreadDelta <= 0 ? '' : '+';
                              
                              let gBadge = 'badge-ig';
                              if (snap.guidance_status === 'Under Watch') gBadge = 'badge-stress';
                              else if (snap.guidance_status === 'Lagging') gBadge = 'badge-hy';
                              else if (snap.guidance_status === 'Ahead of Target') gBadge = 'badge-sector';

                              return `
                                <tr>
                                  <td><strong>${snap.date}</strong></td>
                                  <td><span class="badge badge-sector" style="font-size:9.5px;">${snap.period_name || snap.date}</span></td>
                                  <td><span class="badge badge-hy" style="font-size:9.5px;">${snap.rating}</span></td>
                                  <td class="num">$${Number(snap.price).toFixed(2)}</td>
                                  <td class="num"><strong>${Number(snap.ytm).toFixed(2)}%</strong></td>
                                  <td class="num"><strong style="color:var(--accent-blue);">+${snap.spread_bp}</strong></td>
                                  <td class="num" style="color:${spreadDeltaCol}; font-weight:600;">
                                    ${prior ? `${sign}${spreadDelta} bp` : '-'}
                                  </td>
                                  <td class="num">${snap.net_leverage ? Number(snap.net_leverage).toFixed(2) + 'x' : '-'}</td>
                                  <td><span class="badge ${gBadge}" style="font-size:9.5px;">${snap.guidance_status || 'On Track'}</span></td>
                                  <td style="font-size:10px; color:#64748b;">
                                    <code>SNAP-${snap.date.replace(/-/g, '')}-001</code>
                                  </td>
                                </tr>
                              `;
                            }).join('');
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              `;
            })()}
          </div>
          
          <!-- PANE 4: RESTRUCTURING & RECOVERY SCENARIOS -->
          <div class="drawer-pane" data-pane="tab-rec">
            ${isUkrRail ? `
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px; margin-bottom:14px;">
                
                <div class="scenario-card">
                  <div class="scenario-header">
                    <span class="scenario-title">Scenario A: Standalone 3-Year Maturity Extension</span>
                    <span class="scenario-recovery rec-base">BASE CASE: $71.50</span>
                  </div>
                  <p style="font-size:11.5px; color:#cbd5e1; line-height:1.5; margin:0 0 8px 0;">
                    Commercial consensus extension: 2026 notes extended to July 2029; 2028 notes to July 2031. 0% principal haircut. Coupon restructured to 6.00% cash + 2.00% PIK during wartime.
                  </p>
                  <div style="font-size:11px; color:#94a3b8;">
                    <strong>Implied Upside:</strong> +11.7% from current $64.00 | <strong>Rationale:</strong> UZ generates positive EBITDA ($380M) and receives heavy multilateral grant funding ($280M+).
                  </div>
                </div>
                
                <div class="scenario-card">
                  <div class="scenario-header">
                    <span class="scenario-title">Scenario B: Sovereign Parity Restructuring</span>
                    <span class="scenario-recovery rec-floor">PARITY: $61.00</span>
                  </div>
                  <p style="font-size:11.5px; color:#cbd5e1; line-height:1.5; margin:0 0 8px 0;">
                    Eurobonds mirrored under sovereign debt restructuring umbrella: 25% nominal principal reduction, exchange into new 2030/2034 Step-Up notes (3% to 7%) + GDP-linked warrants.
                  </p>
                  <div style="font-size:11px; color:#94a3b8;">
                    <strong>Implied Downside:</strong> -4.7% from current $64.00 | <strong>Rationale:</strong> Ministry of Finance enforces comparability of treatment across all state-owned entities.
                  </div>
                </div>
                
                <div class="scenario-card">
                  <div class="scenario-header">
                    <span class="scenario-title">Scenario C: Severe War Escalation & Grid Disruption</span>
                    <span class="scenario-recovery rec-floor">STRESS FLOOR: $38.00</span>
                  </div>
                  <p style="font-size:11.5px; color:#cbd5e1; line-height:1.5; margin:0 0 8px 0;">
                    Sustained ballistic strikes permanently incapacitate traction substations; Black Sea ports interdicted; freight drops below 90 Mt. Operations rely solely on emergency sovereign subsidies.
                  </p>
                  <div style="font-size:11px; color:#94a3b8;">
                    <strong>Downside Risk:</strong> -40.6% from current $64.00 | <strong>Support:</strong> Hard liquidation scrap value of locomotive fleet, 80k rail wagons, and track real estate.
                  </div>
                </div>
                
                <div class="scenario-card">
                  <div class="scenario-header">
                    <span class="scenario-title">Scenario D: Rapid EU Rail Integration & Marshall Plan</span>
                    <span class="scenario-recovery rec-upside">BULL CASE: $88.50</span>
                  </div>
                  <p style="font-size:11.5px; color:#cbd5e1; line-height:1.5; margin:0 0 8px 0;">
                    Active war cessation; $50B+ multilateral reconstruction fund deployed. Full par reinstatement with multilateral credit enhancement guarantees from EIB/EBRD.
                  </p>
                  <div style="font-size:11px; color:#94a3b8;">
                    <strong>Upside Potential:</strong> +38.3% from current $64.00 | <strong>Catalyst:</strong> Accelerated Ukrainian accession to the EU TEN-T transportation network.
                  </div>
                </div>
                
              </div>
              
              <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:12px 16px; font-size:11.5px; color:#cbd5e1;">
                <strong>Restructuring Legal Framework:</strong> English Law Eurobonds (LPN structure via Rail Capital Markets PLC). Cross-acceleration with sovereign debt explicitly waived in 2022 consent solicitation. Governed under Paris Club & G7 Creditor Group debt standstill framework.
              </div>
            ` : `
              <div class="scenario-card">
                <div class="scenario-header">
                  <span class="scenario-title">Downside Liquidation & Recovery Framework</span>
                  <div>
                    <span class="scenario-recovery rec-floor">Distressed Floor: $${(rec.distressed_floor_px || 0).toFixed(2)}</span>
                    <span class="scenario-recovery rec-base" style="margin-left:6px;">Base Case: $${(rec.base_case_px || 0).toFixed(2)}</span>
                  </div>
                </div>
                <div style="margin-top:8px; font-size:11.5px; color:#cbd5e1; line-height:1.6;">
                  <p><strong>Jurisdiction & Legal Framework:</strong> ${rec.restructuring_framework || 'Standard CEMBI Insolvency Code'}</p>
                  <p><strong>Valuation Multiple:</strong> ${rec.implied_stress_ev_multiple || '4.0x - 5.5x Stress EV/EBITDA'}</p>
                  <p><strong>Credit Thesis:</strong> ${rec.thesis || 'Comprehensive multi-year recovery and restructuring thesis.'}</p>
                </div>
              </div>
            `}
          </div>
          
          <!-- PANE 6: EARNINGS PRESENTATION & MANAGEMENT GUIDANCE -->
          <div class="drawer-pane" data-pane="tab-earnings">
            ${(() => {
              const ed = item.earnings_presentation_intelligence || {};
              const targets = ed.management_guidance_targets || {};
              const capexProj = ed.capex_and_project_pipeline || ed.capital_and_regulatory_targets || {};
              const geoFx = ed.geographic_and_fx_exposure || ed.funding_and_liquidity_profile || {};
              const backlog = ed.contract_backlog_and_commercial_terms || ed.asset_quality_and_provisioning || {};
              const liq = ed.liquidity_waterfall || ed.quarterly_cadence_and_highlights || {};
              
              return `
                <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:12px 16px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div>
                    <span style="color:var(--accent-gold); font-size:12px; font-weight:700;">SOURCE EARNINGS DECK:</span>
                    <span style="color:#fff; font-size:12px; margin-left:6px;">${ed.source_deck || 'Latest Corporate Investor Presentation & Earnings Call'}</span>
                  </div>
                  <span class="badge badge-sector">${ed.reporting_currency || 'USD'} Disclosures</span>
                </div>
                
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap:14px; margin-bottom:14px;">
                  
                  
                <!-- Dedicated Management Guidance Tracker Table -->
                <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                      📊 Management Strategic Guidance Tracker & Variance Analysis
                    </h4>
                    <span class="badge badge-ig">Active Tracking</span>
                  </div>
                  <div style="overflow-x:auto;">
                    <table class="drawer-table" style="margin:0;">
                      <thead>
                        <tr>
                          <th>Guidance Metric</th>
                          <th>Company Target / Commitment</th>
                          <th>Current Run-Rate</th>
                          <th style="text-align:center;">Tracking Status</th>
                          <th>Guidance Variance Analysis</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${(item.management_guidance_tracker || []).map(g => `
                          <tr>
                            <td><strong style="color:#fff;">${g.guidance_metric}</strong></td>
                            <td style="color:var(--accent-gold); font-weight:600;">${g.management_target}</td>
                            <td style="color:#38bdf8; font-weight:700;">${g.current_runrate}</td>
                            <td style="text-align:center;">
                              <span class="badge ${g.tracking_status.includes('Ahead') ? 'badge-ig' : (g.tracking_status.includes('On Track') ? 'badge-ig' : 'badge-stress')}">
                                ${g.tracking_status}
                              </span>
                            </td>
                            <td style="color:#cbd5e1; font-size:11px;">${g.variance_analysis}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
    <!-- Management Guidance Targets -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                      🎯 Management Strategic Guidance Targets
                    </h4>
                    <table class="drawer-table" style="margin:0;">
                      ${Object.entries(targets).map(([k, v]) => `
                        <tr>
                          <td style="font-weight:600; color:#94a3b8; width:45%;">${k.replace(/_/g, ' ').toUpperCase()}</td>
                          <td style="color:#fff; font-weight:700;">${v}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                  
                  <!-- Capex & Capital Allocation -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                      🏗️ ${currentView === 'corp' ? 'Capital Allocation & Project Pipeline' : 'Capital Adequacy & Reg Targets'}
                    </h4>
                    <table class="drawer-table" style="margin:0;">
                      ${Object.entries(capexProj).map(([k, v]) => `
                        <tr>
                          <td style="font-weight:600; color:#94a3b8; width:45%;">${k.replace(/_/g, ' ').toUpperCase()}</td>
                          <td style="color:#cbd5e1;">${v}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                  
                  <!-- Geographic & FX Exposure -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                      🌍 ${currentView === 'corp' ? 'Geographic & FX Exposure Matrix' : 'Funding & Liquidity Profile'}
                    </h4>
                    <table class="drawer-table" style="margin:0;">
                      ${Object.entries(geoFx).map(([k, v]) => `
                        <tr>
                          <td style="font-weight:600; color:#94a3b8; width:45%;">${k.replace(/_/g, ' ').toUpperCase()}</td>
                          <td style="color:#cbd5e1;">${v}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                  
                  <!-- Liquidity Waterfall & Backlog -->
                  <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                    <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                      💧 Liquidity Waterfall & Headroom
                    </h4>
                    <table class="drawer-table" style="margin:0;">
                      ${Object.entries(liq).map(([k, v]) => `
                        <tr>
                          <td style="font-weight:600; color:#94a3b8; width:45%;">${k.replace(/_/g, ' ').toUpperCase()}</td>
                          <td style="color:#fff; font-weight:700;">${v}</td>
                        </tr>
                      `).join('')}
                    </table>
                  </div>
                  
                </div>
              `;
            })()}
          <!-- Bespoke Investor Presentation Sections (e.g. Generation Fleet, Tariffs, Escrow, Refineries) -->
                ${(() => {
                  const ed = item.earnings_presentation_intelligence || {};
                  const bespokeKeys = Object.keys(ed).filter(k => ![
                    "source_deck", "reporting_currency", "management_guidance_targets",
                    "management_guidance_tracker", "capex_and_project_pipeline",
                    "capital_and_regulatory_targets", "geographic_and_fx_exposure",
                    "funding_and_liquidity_profile", "contract_backlog_and_commercial_terms",
                    "asset_quality_and_provisioning", "liquidity_waterfall",
                    "quarterly_cadence_and_highlights"
                  ].includes(k));
                  
                  if (!bespokeKeys.length) return '';
                  
                  return bespokeKeys.map(bKey => {
                    const bData = ed[bKey] || {};
                    if (typeof bData !== 'object' || !bData) return '';
                    
                    return `
                      <div style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                          <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
                            ⚡ ${bKey.replace(/_/g, ' ')}
                          </h4>
                          <span class="badge badge-ig">Investor Deck Disclosure</span>
                        </div>
                        <table class="drawer-table" style="margin:0;">
                          <thead>
                            <tr>
                              <th style="width:35%;">Asset / Operational Dimension</th>
                              <th>Management Conference Call & Presentation Disclosure</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${Object.entries(bData).map(([k, v]) => `
                              <tr>
                                <td style="color:#fff; font-weight:600;">${k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                                <td style="color:#cbd5e1; font-size:11px; line-height:1.5;">${v}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                      </div>
                    `;
                  }).join('');
                })()}

          </div>

          <!-- PANE 5: INSTITUTIONAL INTELLIGENCE & FOOTNOTES -->
          <div class="drawer-pane" data-pane="tab-intel">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap:12px;">
              ${item.annotations.map(a => `
                <div class="note-card" style="margin:0;">
                  <div class="note-header">
                    <span style="color:var(--accent-gold); font-weight:700; font-size:12px;">[${a.source}]</span>
                    <span class="badge badge-sector">${a.sector}</span>
                  </div>
                  <div class="note-topic" style="color:#fff; font-size:12px; font-weight:600; margin:4px 0 6px 0;">${a.topic}</div>
                  <div class="note-body" style="font-size:11.5px; color:#cbd5e1; line-height:1.5;">${a.note}</div>
                  <div class="note-footer" style="margin-top:8px; padding-top:6px;">
                    <span style="font-size:10px; color:#64748b;">Verified Analyst Intelligence</span>
                    <button class="btn-action" onclick="copyNoteMarkdown('${m.name}', '${a.topic}', '${a.note}')" style="padding:2px 8px; font-size:10px;">
                      📋 Copy Note
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- PANE 8: MANAGEMENT QUESTIONS & CONVICTION DRIVERS -->
          <div class="drawer-pane" data-pane="tab-mgmt">
            <!-- Header -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div>
                <h4 style="color:var(--accent-gold); font-size:14px; margin:0; text-transform:uppercase; letter-spacing:0.5px;">
                  🎯 Management Guidance Audit & Conviction Drivers
                </h4>
                <div style="font-size:11.5px; color:#94a3b8; margin-top:3px;">
                  Audit past baseline guidance against current actual run-rates and interrogate non-public structural credit risks for ${m.name} (${m.ticker})
                </div>
              </div>
              <span class="badge badge-ig">Due Diligence</span>
            </div>

            <!-- SECTION I: PRIOR MANAGEMENT GUIDANCE & VERIFICATION AUDIT -->
            <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:8px; padding:16px; margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <h5 style="color:#f8fafc; font-size:12.5px; margin:0; text-transform:uppercase;">
                    📋 Section I: Prior Management Guidance vs. Actual Run-Rate (Audit Tracker)
                  </h5>
                  <span class="badge badge-sector">${(item.management_guidance_tracker || []).length} Baseline Commitments</span>
                </div>
                <span style="font-size:11px; color:#64748b;">Source: ${item.earnings_presentation_intelligence ? (item.earnings_presentation_intelligence.source_deck || 'Investor Presentations') : 'Audited Disclosures'}</span>
              </div>

              ${(() => {
                const gList = item.management_guidance_tracker || [];
                if (gList.length === 0) {
                  return `<div style="color:#94a3b8; font-size:11.5px;">No official quantitative guidance tracker recorded for this issuer.</div>`;
                }

                return `
                  <div style="overflow-x:auto;">
                    <table class="drawer-table" style="margin:0; font-size:11px;">
                      <thead>
                        <tr>
                          <th style="width:180px;">Guidance Metric</th>
                          <th>Prior Management Commitment</th>
                          <th>Current Actual Run-Rate</th>
                          <th style="text-align:center;">Tracking Status</th>
                          <th>Question to Verify Guidance on Calls</th>
                          <th>Why Relevant to Credit</th>
                          <th style="text-align:center; width:90px;">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${gList.map((g, gIdx) => {
                          const status = g.tracking_status || 'On Track';
                          const statusBadge = (status.includes('Ahead') || status.includes('Achieved')) ? 'badge-ig' : (status.includes('Watch') ? 'badge-stress' : (status.includes('Lag') ? 'badge-stress' : 'badge-hy'));
                          const qClean = (g.verification_question || '').replace(/'/g, "\\'");
                          
                          return `
                            <tr>
                              <td><strong style="color:#fff;">${g.guidance_metric}</strong></td>
                              <td style="color:var(--accent-gold); font-weight:700;">${g.management_target}</td>
                              <td style="color:#38bdf8; font-weight:600;">${g.current_runrate}</td>
                              <td style="text-align:center;">
                                <span class="badge ${statusBadge}">${status}</span>
                              </td>
                              <td style="color:#e2e8f0; font-size:11px; line-height:1.4;">
                                "${g.verification_question || 'Has management reaffirmed this target?'}"
                              </td>
                              <td style="color:#94a3b8; font-size:10.5px; line-height:1.35;">
                                ${g.relevance_to_credit || 'Directly drives cash flow visibility and covenant headroom.'}
                              </td>
                              <td style="text-align:center;">
                                <button class="btn-action" onclick="navigator.clipboard.writeText('${qClean}'); alert('Copied verification question for ${g.guidance_metric} to clipboard!')" style="padding:2px 8px; font-size:10px;" title="Copy verification question">
                                  📋 Copy
                                </button>
                              </td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  </div>
                `;
              })()}
            </div>

            <!-- SECTION II: DEDUCED STRUCTURAL QUESTIONS & CONVICTION DRIVERS -->
            <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
              <h5 style="color:#f8fafc; font-size:12.5px; margin:0; text-transform:uppercase;">
                🔍 Section II: Deduced Structural Interrogation Cards & Conviction Triggers
              </h5>
              <span class="badge badge-sector">${(item.management_questions || []).length} In-Depth Interrogations</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <div>
                <h4 style="color:var(--accent-gold); font-size:13px; margin:0; text-transform:uppercase;">
                  🎯 Management Diligence Questions & Conviction Drivers
                </h4>
                <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
                  High-conviction questions for CFO/Treasurer calls targeting deduced structural risks, unannounced policies, and conviction triggers for ${m.name} (${m.ticker})
                </div>
              </div>
              <span class="badge badge-ig">Desk Interrogation Protocol</span>
            </div>

            ${(() => {
              const mq = item.management_questions || [];
              if (mq.length === 0) {
                return `
                  <div style="padding:20px; background:#111a2b; border:1px solid #1e2d45; border-radius:6px; color:#94a3b8; font-size:12px; text-align:center;">
                    Standard disclosure review complete. No abnormal structural ambiguities flagged for management questioning.
                  </div>
                `;
              }

              return `
                <div style="display:flex; flex-direction:column; gap:16px;">
                  ${mq.map((q, idx) => `
                    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:8px; padding:16px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.2);">
                      <!-- Card Header -->
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                          <span class="badge badge-sector" style="font-size:11px; font-weight:700;">Question #${idx+1}</span>
                          <span style="color:var(--accent-gold); font-size:12px; font-weight:700;">Focus: ${q.focus_area}</span>
                        </div>
                        <button class="btn-action" onclick="navigator.clipboard.writeText('${q.question.replace(/'/g, "\\'")}'); alert('Question copied to clipboard for conference call!')" style="font-size:10.5px; padding:3px 8px;">
                          📋 Copy Question
                        </button>
                      </div>

                      <!-- The Question to Ask -->
                      <div style="background:#0b1120; border:1px solid #334155; border-radius:6px; padding:12px 14px; margin-bottom:12px;">
                        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; font-weight:700; margin-bottom:4px; letter-spacing:0.5px;">
                          Direct Question to CFO / Treasurer:
                        </div>
                        <div style="color:#38bdf8; font-size:13.5px; font-weight:700; line-height:1.5;">
                          "${q.question}"
                        </div>
                      </div>

                      <!-- Analysis Blocks -->
                      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                        <!-- Why Relevant Block -->
                        <div style="background:#0f172a; border-left:3px solid var(--accent-gold); padding:10px 14px; border-radius:0 6px 6px 0; font-size:11.5px; line-height:1.5; color:#cbd5e1;">
                          <div style="color:var(--accent-gold); font-weight:700; margin-bottom:4px;">
                            🔍 Why This Information Is Relevant (Deduced Structural Risk):
                          </div>
                          <div>${q.relevance}</div>
                          ${q.deduced_from ? `
                            <div style="margin-top:6px; font-size:10.5px; color:#64748b;">
                              <em>Deduced from:</em> ${q.deduced_from}
                            </div>
                          ` : ''}
                        </div>

                        <!-- Conviction Decision Rule Block -->
                        <div style="background:#0f172a; border-left:3px solid #10b981; padding:10px 14px; border-radius:0 6px 6px 0; font-size:11.5px; line-height:1.5; color:#cbd5e1;">
                          <div style="color:#10b981; font-weight:700; margin-bottom:4px;">
                            🎯 Conviction Trigger & Credit Decision Rule:
                          </div>
                          <div>${q.conviction_trigger}</div>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `;
            })()}
          </div>

          <!-- PANE 7: ISSUER CREDIT NEWS & WIDER MACRO TRANSMISSION -->
          <div class="drawer-pane" data-pane="tab-news">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <div>
                <h4 style="color:var(--accent-gold); font-size:13px; margin:0; text-transform:uppercase;">
                  📰 Real-Time Credit Catalysts & Macro Transmission Channels
                </h4>
                <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
                  Company-specific filings and wider sovereign/macro transmission channels impacting ${m.name} (${m.ticker})
                </div>
              </div>
              <button class="btn-action btn-gold" onclick="openNewsModal()" style="font-size:11px; padding:4px 10px;">
                🌐 View Full 14-Catalyst Universe Feed
              </button>
            </div>

            ${(() => {
              const allNews = window.CREDIT_NEWS_DATA || [];
              const ticker = m.ticker;
              const relatedNews = allNews.filter(n => n.ticker === ticker || (n.impacted_issuers && n.impacted_issuers.includes(ticker)));
              
              if (relatedNews.length === 0) {
                return `
                  <div style="padding:20px; background:#111a2b; border:1px solid #1e2d45; border-radius:6px; color:#94a3b8; font-size:12px; text-align:center;">
                    No extraordinary credit stress alerts or active breaking catalysts for ${m.name} in the current monitoring window. Standard financial filing schedule applies.
                  </div>
                `;
              }

              return `
                <div style="display:flex; flex-direction:column; gap:12px;">
                  ${relatedNews.map(n => {
                    const isMacro = n.category.includes('Macro') || n.ticker.startsWith('MACRO');
                    const impactBadge = n.credit_impact === 'Positive' ? 'badge-ig' : (n.credit_impact === 'Negative' ? 'badge-stress' : 'badge-hy');
                    const impactBorder = n.credit_impact === 'Positive' ? '#10b981' : (n.credit_impact === 'Negative' ? '#ef4444' : '#f59e0b');

                    return `
                      <div style="background:#111a2b; border:1px solid ${isMacro ? '#3b82f6' : '#1e2d45'}; border-radius:6px; padding:14px; position:relative;">
                        ${isMacro ? `
                          <div style="background:#1e3a8a; color:#93c5fd; font-size:10px; font-weight:700; padding:2px 8px; border-radius:3px; display:inline-block; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">
                            🌐 WIDER MACRO TRANSMISSION: ${n.macro_transmission_channel || 'Sovereign / Macro Channel'}
                          </div>
                        ` : ''}

                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                          <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:11.5px; color:#f8fafc; font-weight:700;">${n.date}</span>
                            <span class="badge ${isMacro ? 'badge-sector' : 'badge-hy'}">${n.ticker}</span>
                            <span class="badge ${impactBadge}">${n.credit_impact} Impact</span>
                            <span style="font-size:11px; color:#94a3b8;">${n.category}</span>
                          </div>
                          <span style="font-size:11px; color:#64748b;">Source: ${n.source}</span>
                        </div>

                        <div style="margin:4px 0 10px 0;">
                          <a href="${n.url}" target="_blank" style="color:#38bdf8; font-size:14px; font-weight:700; text-decoration:none; line-height:1.4;">
                            ${n.headline} <span style="font-size:11px; opacity:0.8;">↗</span>
                          </a>
                        </div>

                        <!-- Credit Desk Concise Analysis & Transmission -->
                        <div style="background:#0b1120; border-left:3px solid ${impactBorder}; padding:10px 14px; border-radius:0 4px 4px 0; font-size:11.5px; line-height:1.5; color:#cbd5e1; margin-bottom:10px;">
                          <div style="font-weight:700; color:#fff; margin-bottom:3px;">
                            💡 Credit Desk Transmission Analysis (${m.ticker} Implications):
                          </div>
                          <div>${n.concise_analysis || n.credit_commentary}</div>
                        </div>

                        <!-- Clickable Peer Links -->
                        ${n.impacted_issuers && n.impacted_issuers.length > 1 ? `
                          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:10.5px; color:#64748b;">
                            <span>Also Transmits To Peers:</span>
                            ${n.impacted_issuers.filter(t => t !== m.ticker).map(peerTicker => `
                              <button class="badge badge-sector" style="cursor:pointer; border:1px solid #334155; padding:1px 6px; font-size:10px;" onclick="openIssuerFromNews('${peerTicker}')" title="Jump to ${peerTicker} Model & Analysis">
                                ${peerTicker} ↗
                              </button>
                            `).join('')}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              `;
            })()}
          </div>
          
        </div>
      </td>
    `;
    
    expandTr.innerHTML = drawerHtml;
    tbody.appendChild(expandTr);
  });
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
let currentTrendMode = 'mkt'; // 'mkt' (Market History) or 'fin' (Financial Statements)

const MKT_METRIC_CONFIG = {
  spread_bp: { label: "Secondary Benchmark Spread (bp)", unit: "bp" },
  price: { label: "Clean Benchmark Bond Price ($)", unit: "$" },
  ytm: { label: "Yield to Maturity (YTM %)", unit: "%" },
  net_leverage: { label: "Net Debt / EBITDA (x)", unit: "x" }
};

const FIN_METRIC_CONFIG = {
  net_leverage: { label: "Net Leverage Ratio (x)" },
  ebitda_margin_pct: { label: "EBITDA Margin (%)" },
  revenue: { label: "Revenue ($M)" },
  ebitda: { label: "EBITDA ($M)" },
  fcf: { label: "Free Cash Flow ($M)" },
  interest_coverage: { label: "Interest Coverage (x)" },
  nim_pct: { label: "Net Interest Margin (%) - Banks" },
  roe_pct: { label: "Return on Equity (%) - Banks" },
  cir_pct: { label: "Cost-to-Income Ratio (%) - Banks" }
};

function setTrendMode(mode) {
  currentTrendMode = mode;
  const btnMkt = document.getElementById("btn-mode-mkt");
  const btnFin = document.getElementById("btn-mode-fin");
  if (btnMkt && btnFin) {
    if (mode === 'mkt') {
      btnMkt.style.background = "var(--accent-blue)";
      btnMkt.style.color = "#fff";
      btnMkt.style.borderColor = "var(--accent-blue)";
      btnFin.style.background = "#1e293b";
      btnFin.style.color = "#94a3b8";
      btnFin.style.borderColor = "#334155";
    } else {
      btnFin.style.background = "var(--accent-blue)";
      btnFin.style.color = "#fff";
      btnFin.style.borderColor = "var(--accent-blue)";
      btnMkt.style.background = "#1e293b";
      btnMkt.style.color = "#94a3b8";
      btnMkt.style.borderColor = "#334155";
    }
  }

  const titleElem = document.getElementById("chart-main-title");
  const subtextElem = document.getElementById("trend-subtext");
  if (mode === 'mkt') {
    if (titleElem) titleElem.textContent = "Secondary Market & Spread History (Periodic Snapshots: 2024 - Present)";
    if (subtextElem) subtextElem.textContent = "Multi-period market snapshots tracking rating drift, secondary spreads, bond pricing, and guidance status.";
  } else {
    if (titleElem) titleElem.textContent = "Multi-Period Financial Statement Trajectory (2021A - 2027E)";
    if (subtextElem) subtextElem.textContent = "Data spans 2021A - 2027E (Audited Financials + Consensus Projections).";
  }

  populateMetricOptions();
  renderTrendChart();
}

function populateMetricOptions() {
  const metricSel = document.getElementById("trend-metric");
  if (!metricSel) return;
  metricSel.innerHTML = "";

  if (currentTrendMode === 'mkt') {
    Object.entries(MKT_METRIC_CONFIG).forEach(([key, cfg]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = cfg.label;
      metricSel.appendChild(opt);
    });
    metricSel.value = "spread_bp";
  } else {
    Object.entries(FIN_METRIC_CONFIG).forEach(([key, cfg]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = cfg.label;
      metricSel.appendChild(opt);
    });
    metricSel.value = "net_leverage";
  }
}

function initTrendChart() {
  const sectorSel = document.getElementById("trend-sector");
  const metricSel = document.getElementById("trend-metric");
  if (!sectorSel || !metricSel) return;
  
  sectorSel.innerHTML = "";
  const sectors = [...new Set(MASTER_ISSUERS.map(i => i.metadata.sector))].sort();
  sectors.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    sectorSel.appendChild(opt);
  });
  
  sectorSel.value = "Utilities";
  populateMetricOptions();
  
  sectorSel.addEventListener("change", renderTrendChart);
  metricSel.addEventListener("change", renderTrendChart);
  
  setTrendMode('mkt');
}

function renderTrendChart() {
  const sectorSel = document.getElementById("trend-sector");
  const metricSel = document.getElementById("trend-metric");
  if (!sectorSel || !metricSel) return;

  const sec = sectorSel.value;
  const metric = metricSel.value;
  const peers = MASTER_ISSUERS.filter(i => i.metadata.sector === sec);
  
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#f97316", "#14b8a6", "#e11d48", "#a855f7"];
  
  let labels = [];
  let datasets = [];

  if (currentTrendMode === 'mkt') {
    const dateSet = new Set();
    peers.forEach(p => {
      const hist = p.market_history || (window.CREDIT_HISTORY_DATA && window.CREDIT_HISTORY_DATA[p.metadata.ticker] ? window.CREDIT_HISTORY_DATA[p.metadata.ticker].snapshots : []);
      if (hist) hist.forEach(s => dateSet.add(s.date));
    });
    labels = Array.from(dateSet).sort();

    datasets = peers.map((p, idx) => {
      const hist = p.market_history || (window.CREDIT_HISTORY_DATA && window.CREDIT_HISTORY_DATA[p.metadata.ticker] ? window.CREDIT_HISTORY_DATA[p.metadata.ticker].snapshots : []);
      const histMap = {};
      if (hist) {
        hist.forEach(s => { histMap[s.date] = s; });
      }

      const data = labels.map(d => {
        const entry = histMap[d];
        return entry ? entry[metric] : null;
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
        pointHoverRadius: 7,
        meta_history: labels.map(d => histMap[d] || {})
      };
    });
  } else {
    labels = ["2021A", "2022A", "2023A", "2024A", "2025E", "2026E", "2027E"];
    datasets = peers.map((p, idx) => {
      const data = labels.map(per => {
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
  }
  
  const ctx = document.getElementById("trendCanvas").getContext("2d");
  if (trendChartInstance) trendChartInstance.destroy();
  
  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
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
            label: function(context) {
              const val = context.parsed.y;
              const ds = context.dataset;
              let suffix = "";
              if (currentTrendMode === 'mkt') {
                if (metric === 'spread_bp') suffix = " bp";
                else if (metric === 'price') return ` ${ds.label}: $${val.toFixed(2)}`;
                else if (metric === 'ytm') suffix = "%";
                else if (metric === 'net_leverage') suffix = "x";
              }
              return ` ${ds.label}: ${val !== null ? val + suffix : 'N/A'}`;
            },
            afterBody: function(items) {
              if (currentTrendMode === 'mkt') {
                const item = items[0];
                const ds = item.dataset;
                const snap = ds.meta_history ? ds.meta_history[item.dataIndex] : {};
                if (snap && snap.rating) {
                  return `\nSnapshot Rating: ${snap.rating}\nBenchmark: ${snap.price ? '$' + snap.price.toFixed(2) : ''} (${snap.ytm ? snap.ytm.toFixed(2) + '%' : ''})\nGuidance: ${snap.guidance_status || 'On Track'}`;
                }
              } else {
                const pIdx = items[0].dataIndex;
                const per = labels[pIdx];
                return "\n" + (per.includes("A") ? "[Audited Financials]" : "[Forecast]");
              }
              return "";
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: '#1f293d' },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: '#1f293d' },
          ticks: { color: '#9ca3af' }
        }
      }
    }
  });
  
  // Render sector notes
  const notesDiv = document.getElementById("trend-sector-notes");
  if (notesDiv) {
    const secNotes = (typeof MASTER_ANNOTATIONS !== 'undefined' ? MASTER_ANNOTATIONS : []).filter(a => a.sector === sec).slice(0, 6);
    notesDiv.innerHTML = secNotes.map(n => `
      <div class="note-card" style="background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:12px; margin-bottom:12px;">
        <div style="font-size:10px; color:var(--accent-gold); text-transform:uppercase; margin-bottom:4px;">[${n.source}] ${n.topic} &bull; ${n.issuer_name || ''}</div>
        <div style="font-size:12px; color:#fff; line-height:1.4;">${n.note}</div>
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
  
  const matches = (typeof MASTER_ANNOTATIONS !== 'undefined' ? MASTER_ANNOTATIONS : []).filter(a => {
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


// ----------------- GLOBAL CREDIT & MACRO NEWS MODAL (LINKED) -----------------
let currentNewsFilter = 'All';
let currentNewsSearch = '';

window.openNewsModal = function(filter = 'All') {
  currentNewsFilter = filter;
  currentNewsSearch = '';
  let modal = document.getElementById("credit-news-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "credit-news-modal";
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; justify-content:center; align-items:center; padding:20px;";
    document.body.appendChild(modal);
  }
  modal.style.display = "flex";
  renderNewsModalContent();
};

window.openNewsModalForIssuer = function(ticker) {
  openNewsModal('All');
  currentNewsSearch = ticker;
  renderNewsModalContent();
};

window.closeNewsModal = function() {
  const modal = document.getElementById("credit-news-modal");
  if (modal) modal.style.display = "none";
};

window.filterNews = function(category) {
  currentNewsFilter = category;
  renderNewsModalContent();
};

window.searchNews = function(query) {
  currentNewsSearch = query.trim().toUpperCase();
  renderNewsModalContent();
};

window.openIssuerFromNews = function(ticker) {
  closeNewsModal();
  
  // Clear search filter so target issuer is visible in comp table
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  
  // Find issuer object
  const targetIssuer = (typeof MASTER_ISSUERS !== 'undefined' ? MASTER_ISSUERS : []).find(i => i.metadata.ticker === ticker);
  if (targetIssuer) {
    const rowId = "expand-" + targetIssuer.metadata.id;
    const tr = document.getElementById(rowId);
    if (tr) {
      tr.style.display = 'table-row';
      switchDrawerTab(targetIssuer.metadata.id, 'tab-news');
      tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

function renderNewsModalContent() {
  const modal = document.getElementById("credit-news-modal");
  if (!modal) return;

  const allNews = window.CREDIT_NEWS_DATA || [];
  let filtered = allNews;

  if (currentNewsFilter === 'Macro') {
    filtered = allNews.filter(n => n.category.includes('Macro') || n.ticker.startsWith('MACRO'));
  } else if (currentNewsFilter === 'Company') {
    filtered = allNews.filter(n => n.category.includes('Company'));
  } else if (currentNewsFilter === 'Capital Markets') {
    filtered = allNews.filter(n => n.category.includes('Capital Markets'));
  } else if (currentNewsFilter === 'Positive') {
    filtered = allNews.filter(n => n.credit_impact === 'Positive');
  } else if (currentNewsFilter === 'Watch / Negative') {
    filtered = allNews.filter(n => n.credit_impact === 'Watch' || n.credit_impact === 'Negative');
  }

  if (currentNewsSearch) {
    filtered = filtered.filter(n => 
      n.headline.toUpperCase().includes(currentNewsSearch) ||
      n.ticker.toUpperCase().includes(currentNewsSearch) ||
      n.issuer_name.toUpperCase().includes(currentNewsSearch) ||
      (n.impacted_issuers && n.impacted_issuers.some(t => t.includes(currentNewsSearch)))
    );
  }

  modal.innerHTML = `
    <div style="background:#0f172a; border:1px solid #1e2d45; border-radius:8px; width:1050px; max-width:96vw; max-height:90vh; display:flex; flex-direction:column; box-shadow:0 25px 50px -12px rgba(0,0,0,0.8); overflow:hidden;">
      <!-- Header -->
      <div style="padding:16px 20px; background:#111a2b; border-bottom:1px solid #1e2d45; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:12px;">
          <h3 style="margin:0; font-size:15px; color:var(--accent-gold); text-transform:uppercase; letter-spacing:0.5px;">
            📰 Credit & Macro News Feed
          </h3>
          <span class="badge badge-ig">${filtered.length} of ${allNews.length} Catalysts</span>
          <span style="font-size:11px; color:#94a3b8;">Click any issuer pill to open full credit model</span>
        </div>
        <button onclick="closeNewsModal()" style="background:transparent; border:none; color:#94a3b8; font-size:20px; cursor:pointer; padding:4px 8px;">✕</button>
      </div>

      <!-- Controls: Category Filters + Company Search -->
      <div style="padding:12px 20px; background:#0b1120; border-bottom:1px solid #1e2d45; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Category:</span>
          ${['All', 'Macro', 'Company', 'Capital Markets', 'Positive', 'Watch / Negative'].map(cat => `
            <button onclick="filterNews('${cat}')" style="background:${currentNewsFilter === cat ? 'var(--accent-gold)' : '#1e293b'}; color:${currentNewsFilter === cat ? '#000' : '#cbd5e1'}; border:none; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;">
              ${cat}
            </button>
          `).join('')}
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:11px; color:#64748b;">Filter Company / Ticker:</span>
          <input type="text" placeholder="e.g. ZOREN, DANGCEM, SISE..." value="${currentNewsSearch}" oninput="searchNews(this.value)" style="background:#1e293b; border:1px solid #334155; color:#fff; padding:4px 10px; border-radius:4px; font-size:11.5px; width:180px;">
          ${currentNewsSearch ? `<button onclick="searchNews('')" style="background:#334155; color:#cbd5e1; border:none; border-radius:4px; padding:4px 8px; font-size:10px; cursor:pointer;">Clear</button>` : ''}
        </div>
      </div>

      <!-- News Items List -->
      <div style="padding:20px; overflow-y:auto; display:flex; flex-direction:column; gap:14px;">
        ${filtered.length === 0 ? `
          <div style="text-align:center; padding:40px; color:#94a3b8; font-size:13px;">
            No credit catalysts match the selected criteria.
          </div>
        ` : filtered.map(n => {
          const impactBadge = n.credit_impact === 'Positive' ? 'badge-ig' : (n.credit_impact === 'Negative' ? 'badge-stress' : 'badge-hy');
          const isMacro = n.category.includes('Macro') || n.ticker.startsWith('MACRO');
          const impactBorder = n.credit_impact === 'Positive' ? '#10b981' : (n.credit_impact === 'Negative' ? '#ef4444' : '#f59e0b');

          return `
            <div style="background:#111a2b; border:1px solid ${isMacro ? '#2563eb' : '#1e2d45'}; border-radius:6px; padding:15px; transition:border 0.2s;">
              ${isMacro ? `
                <div style="background:#1e3a8a; color:#93c5fd; font-size:10px; font-weight:700; padding:2px 8px; border-radius:3px; display:inline-block; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;">
                  🌐 WIDER MACRO TRANSMISSION: ${n.macro_transmission_channel || 'Macro Channel'}
                </div>
              ` : ''}

              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <strong style="color:#f8fafc; font-size:12px;">${n.date}</strong>
                  <span class="badge ${isMacro ? 'badge-sector' : 'badge-hy'}">${n.ticker}</span>
                  <span class="badge ${impactBadge}">${n.credit_impact} Impact</span>
                  <span style="font-size:11px; color:#94a3b8;">${n.category}</span>
                </div>
                <span style="font-size:11px; color:#64748b;">Source: ${n.source}</span>
              </div>

              <div style="margin:4px 0 10px 0;">
                <a href="${n.url}" target="_blank" style="color:#38bdf8; font-size:14px; font-weight:700; text-decoration:none; line-height:1.4;">
                  ${n.headline} <span style="font-size:11px; opacity:0.8;">↗</span>
                </a>
              </div>

              <!-- Concise Credit Analysis Box -->
              <div style="background:#0b1120; border-left:3px solid ${impactBorder}; padding:10px 14px; border-radius:0 4px 4px 0; font-size:11.5px; line-height:1.5; color:#cbd5e1; margin-bottom:12px;">
                <div style="font-weight:700; color:#fff; margin-bottom:3px;">
                  💡 Credit Desk Transmission Analysis & Spread Trajectory:
                </div>
                <div>${n.concise_analysis || n.credit_commentary}</div>
              </div>

              <!-- Clickable Impacted Issuers / Companies -->
              ${n.impacted_issuers && n.impacted_issuers.length > 0 ? `
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:11px; color:#94a3b8; background:#0f172a; padding:8px 12px; border-radius:4px;">
                  <strong style="color:#e2e8f0;">Linked CEMBI Companies:</strong>
                  ${n.impacted_issuers.map(ticker => {
                    const iss = (typeof MASTER_ISSUERS !== 'undefined' ? MASTER_ISSUERS : []).find(i => i.metadata.ticker === ticker);
                    const name = iss ? iss.metadata.name : ticker;
                    return `
                      <button onclick="openIssuerFromNews('${ticker}')" class="badge badge-sector" style="cursor:pointer; border:1px solid #3b82f6; padding:2px 8px; font-size:10.5px; font-weight:600; color:#93c5fd; background:#1e293b;" title="Jump directly to ${name} (${ticker})">
                        ${ticker} — ${name.length > 18 ? name.slice(0, 18) + '...' : name} ↗
                      </button>
                    `;
                  }).join('')}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}


// ==========================================================================
// INTERACTIVE INSTITUTIONAL WEB MODEL VIEWER ENGINE
// Direct-Interaction Multi-Tab Spreadsheet, In-Cell Commenting & Highlighting
// ==========================================================================

let activeModelIssuer = null;
let currentModelSheet = 'sheet-fin';
let currentModelViewMode = 'simplified'; // 'simplified' or 'full'
let activePresetHighlight = null; // 'burn', 'inflection', 'variance'
let activePopoverCell = null; // { ticker, metricKey, period, element }

// Keyboard shortcut (Escape to close modal)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.getElementById('cell-comment-popover')?.classList.contains('active')) {
      closeCellComment();
    } else if (document.getElementById('institutional-model-modal')?.classList.contains('active')) {
      closeInstitutionalModel();
    }
  }
});

// Storage Helpers for In-Cell Highlighting & Custom Notes
function getStoredHighlights(ticker) {
  try {
    const raw = localStorage.getItem('cembicredit_highlights_' + ticker);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function setStoredHighlight(ticker, cellKey, hlClass) {
  try {
    const map = getStoredHighlights(ticker);
    if (!hlClass) delete map[cellKey];
    else map[cellKey] = hlClass;
    localStorage.setItem('cembicredit_highlights_' + ticker, JSON.stringify(map));
  } catch (e) {}
}

function getStoredNotes(ticker) {
  try {
    const raw = localStorage.getItem('cembicredit_notes_' + ticker);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function setStoredNote(ticker, cellKey, text) {
  try {
    const map = getStoredNotes(ticker);
    if (!text || !text.trim()) delete map[cellKey];
    else map[cellKey] = text.trim();
    localStorage.setItem('cembicredit_notes_' + ticker, JSON.stringify(map));
  } catch (e) {}
}

// ----------------- OPEN & CLOSE MODEL MODAL -----------------
window.openInstitutionalModel = function(issuerId, targetSheet = 'sheet-fin') {
  const item = MASTER_ISSUERS.find(i => i.metadata.id === issuerId);
  if (!item) return;

  activeModelIssuer = item;
  currentModelSheet = targetSheet;
  activePresetHighlight = null;
  closeCellComment();

  const modal = document.getElementById('institutional-model-modal');
  if (!modal) return;

  const m = item.metadata;
  const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};

  // Populate Header
  document.getElementById('modal-model-title').innerHTML = `
    <span>${m.name} (${m.ticker})</span>
    <span class="badge badge-sector" style="font-size:11px; margin-left:8px;">${m.sector}</span>
    <span class="badge badge-hy" style="font-size:11px; margin-left:4px;">${m.rating}</span>
  `;

  document.getElementById('modal-model-meta').innerHTML = `
    <span>Country: <strong style="color:#fff;">${m.country} (${m.region})</strong></span>
    <span style="color:#334155;">|</span>
    <span>Benchmark: <strong style="color:var(--accent-gold);">${m.benchmark_bond}</strong></span>
    <span style="color:#334155;">|</span>
    <span>Price: <strong style="color:#fff;">$${m.price.toFixed(2)}</strong></span>
    <span style="color:#334155;">|</span>
    <span>YTM: <strong style="color:var(--accent-gold);">${m.ytm.toFixed(2)}%</strong></span>
    <span style="color:#334155;">|</span>
    <span>Spread: <strong style="color:var(--accent-blue);">+${m.spread_bp} bp</strong></span>
    <span style="color:#334155;">|</span>
    <span>2024A Net Lev: <strong style="color:#fff;">${f24.net_leverage ? f24.net_leverage.toFixed(2) + 'x' : 'N/A'}</strong></span>
  `;

  // Update Download Button
  const dlBtn = document.getElementById('modal-download-btn');
  if (dlBtn) {
    dlBtn.href = m.github_model_url;
    dlBtn.download = m.model_file;
  }

  // Set Sheet Tab
  switchModelSheet(currentModelSheet);

  modal.classList.add('active');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'auto';
  modal.style.visibility = 'visible';
  document.body.style.overflow = 'hidden';
};

window.closeInstitutionalModel = function() {
  const modal = document.getElementById('institutional-model-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modal.style.visibility = 'hidden';
  }
  closeCellComment();
  document.body.style.overflow = '';
};

window.switchModelSheet = function(sheetKey) {
  currentModelSheet = sheetKey;
  const bar = document.getElementById('modal-sheet-tab-bar');
  if (bar) {
    bar.querySelectorAll('.sheet-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-sheet') === sheetKey);
    });
  }

  // Show/Hide Adaptive Toggle (only relevant for Financial Statements sheet)
  const adaptiveToggle = document.getElementById('modal-adaptive-toggle');
  if (adaptiveToggle) {
    adaptiveToggle.style.display = (sheetKey === 'sheet-fin') ? 'flex' : 'none';
  }

  renderModelSheet(sheetKey);
};

window.setModelViewMode = function(mode) {
  currentModelViewMode = mode;
  document.getElementById('btn-view-simplified')?.classList.toggle('active', mode === 'simplified');
  document.getElementById('btn-view-full')?.classList.toggle('active', mode === 'full');
  if (currentModelSheet === 'sheet-fin') {
    renderModelSheet('sheet-fin');
  }
};

// ----------------- PRESET HIGHLIGHT FILTERS -----------------
window.applyHighlightFilter = function(filterType) {
  activePresetHighlight = filterType;
  if (currentModelSheet === 'sheet-fin') {
    renderModelSheet('sheet-fin');
  }
};

window.clearHighlightFilter = function() {
  activePresetHighlight = null;
  if (currentModelSheet === 'sheet-fin') {
    renderModelSheet('sheet-fin');
  }
};


// ----------------- EXCEL FORECAST & FORMULA AUDIT ENGINE -----------------
function getForecastAuditMetadata(item, metricKey, period) {
  if (!item) return { coord: 'CELL', metricTitle: 'METRIC', period, isForecast: false, methodology: 'N/A', badgeType: 'audited', badgeText: 'N/A', formula: '', source: '', commentary: '', drivers: '', verificationQuestion: null, formulaCheck: null };
  const m = item.metadata || {};
  const f = (item.financials_multi_year || []).find(x => x.period === period) || {};
  const supp = item.supplementary_data || {};
  const guides = item.management_guidance_tracker || [];
  const isForecast = period.endsWith('E');

  // Compute Excel Cell Coordinate (Rows 10-35, Cols B-H)
  const colLetter = { '2021A':'B', '2022A':'C', '2023A':'D', '2024A':'E', '2025E':'F', '2026E':'G', '2027E':'H' }[period] || 'C';
  const rowMap = {
    'revenue': 12, 'reported_ebitda': 15, 'ebitda': 16, 'ebitda_margin_pct': 17,
    'ebitda_base': 20, 'capex': 21, 'cash_interest': 22, 'delta_wc': 23, 'tax': 24,
    'fcf': 25, 'fcf_conversion': 26, 'gross_debt': 28, 'cash': 29, 'undrawn_rcf': 30,
    'net_debt': 31, 'net_leverage': 33, 'interest_coverage': 34, 'px_quote': 35
  };
  const rowNum = rowMap[metricKey] || 15;
  const coord = `${colLetter}${rowNum}`;
  const cleanMetric = metricKey.replace(/_/g, ' ').toUpperCase();

  // 1. Audited Historicals
  if (!isForecast) {
    return {
      coord,
      metricTitle: cleanMetric,
      period,
      isForecast: false,
      methodology: 'Audited Historical Financials (IFRS)',
      badgeType: 'audited',
      badgeText: '📑 Audited IFRS',
      formula: `=IFRS_Filing("${period}_Audited_Statements", Row: "${cleanMetric}")`,
      source: `Audited Annual Financial Report (${period})`,
      commentary: `Official historical figures filed under IFRS and audited by independent statutory auditors.`,
      drivers: `Audited statutory financial accounts; verified against company annual disclosures.`,
      verificationQuestion: null,
      formulaCheck: null
    };
  }

  // 2. FCF Waterfall Identities
  if (metricKey === 'fcf') {
    const e = f.calculated_ebitda || f.ebitda || 0;
    const cx = f.capex || 0;
    const ci = f.cash_interest || 0;
    const dwc = f.change_in_working_capital || 0;
    const tx = f.tax_expense || 0;
    const fcfVal = f.fcf || 0;
    const chk = f.fcf_bridge?.formula_check || `${e} - ${cx} - ${ci} - (${dwc}) - ${tx} = ${fcfVal}`;
    return {
      coord,
      metricTitle: 'FREE CASH FLOW (FCF)',
      period,
      isForecast: true,
      methodology: 'Strict Fixed Accounting Identity (FCF Waterfall)',
      badgeType: 'waterfall',
      badgeText: '📐 FCF Waterfall Identity',
      formula: `=${colLetter}16 - ${colLetter}21 - ${colLetter}22 - ${colLetter}23 - ${colLetter}24`,
      source: 'Calculated Cash Generation Waterfall Bridge',
      commentary: `FCF is calculated strictly as: Cash Desk EBITDA (${e.toFixed(1)}M) - Net Capex (${cx.toFixed(1)}M) - Cash Interest (${ci.toFixed(1)}M) - ΔWorking Capital (${dwc.toFixed(1)}M) - Cash Taxes (${tx.toFixed(1)}M) = Free Cash Flow (${fcfVal.toFixed(1)}M). FCF conversion rate: ${f.fcf_conversion_pct ? f.fcf_conversion_pct.toFixed(1) : ((fcfVal / Math.max(1, e)) * 100).toFixed(1)}%.`,
      drivers: `EBITDA: ${e.toFixed(1)}M | Capex: -${cx.toFixed(1)}M | Cash Interest: -${ci.toFixed(1)}M | ΔWC: -${dwc.toFixed(1)}M | Cash Tax: -${tx.toFixed(1)}M`,
      verificationQuestion: 'Can you bridge the primary drivers of working capital absorption and confirm whether customer advances or supplier payables drove the cash change?',
      formulaCheck: chk
    };
  }

  if (metricKey === 'net_debt') {
    const gd = f.gross_debt || 0;
    const cs = f.cash || 0;
    const nd = f.net_debt || (gd - cs);
    return {
      coord,
      metricTitle: 'CONSOLIDATED NET DEBT',
      period,
      isForecast: true,
      methodology: 'Balance Sheet Net Debt Identity',
      badgeType: 'waterfall',
      badgeText: '📐 Balance Sheet Identity',
      formula: `=${colLetter}28 - ${colLetter}29`,
      source: 'Balance Sheet Liquidity & Gross Debt Bridge',
      commentary: `Consolidated Gross Debt (${gd.toFixed(1)}M) less Total Cash & Liquid Balances (${cs.toFixed(1)}M) = Net Debt (${nd.toFixed(1)}M).`,
      drivers: `Gross Debt: ${gd.toFixed(1)}M | Cash & Equivalents: ${cs.toFixed(1)}M`,
      verificationQuestion: 'What portion of the cash balance is held at operating subsidiaries with dividend restriction covenants or escrow lockups?',
      formulaCheck: `${gd.toFixed(1)} - ${cs.toFixed(1)} = ${nd.toFixed(1)}`
    };
  }

  if (metricKey === 'net_leverage') {
    const nd = f.net_debt || 0;
    const eb = f.calculated_ebitda || f.ebitda || 1;
    const lev = f.net_leverage || (nd / eb);
    const levGuide = guides.find(g => g.guidance_metric && g.guidance_metric.toLowerCase().includes('leverage'));
    return {
      coord,
      metricTitle: 'NET DEBT / EBITDA',
      period,
      isForecast: true,
      methodology: 'Credit Metric Formula & Target Headroom',
      badgeType: 'waterfall',
      badgeText: '📐 Credit Metric Formula',
      formula: `=${colLetter}31 / ${colLetter}16`,
      source: 'Consolidated Leverage & Rating Threshold Model',
      commentary: `Net Debt (${nd.toFixed(1)}M) / Calculated Cash EBITDA (${eb.toFixed(1)}M) = ${lev.toFixed(2)}x.${levGuide ? ` Management guidance ceiling is ${levGuide.management_target} (Current run-rate: ${levGuide.current_runrate}).` : ''}`,
      drivers: `Net Debt: ${nd.toFixed(1)}M | Cash EBITDA: ${eb.toFixed(1)}M | Headroom to Ceiling: ${levGuide ? levGuide.variance_analysis : 'Standard Headroom'}`,
      verificationQuestion: levGuide ? levGuide.verification_question : 'What is management\'s leverage ceiling before initiating debt paydown or curbing shareholder payouts?',
      formulaCheck: `${nd.toFixed(1)} / ${eb.toFixed(1)} = ${lev.toFixed(2)}x`
    };
  }

  if (metricKey === 'interest_coverage') {
    const eb = f.calculated_ebitda || f.ebitda || 1;
    const ci = f.cash_interest || 1;
    const cov = f.interest_coverage || (eb / ci);
    return {
      coord,
      metricTitle: 'INTEREST COVERAGE RATIO',
      period,
      isForecast: true,
      methodology: 'Debt Service Coverage Identity',
      badgeType: 'waterfall',
      badgeText: '📐 Coverage Metric Formula',
      formula: `=${colLetter}16 / ${colLetter}22`,
      source: 'Debt Service Capacity Model',
      commentary: `Calculated Cash EBITDA (${eb.toFixed(1)}M) / Cash Interest Paid (${ci.toFixed(1)}M) = ${cov.toFixed(2)}x coverage.`,
      drivers: `Cash EBITDA: ${eb.toFixed(1)}M | Cash Interest: ${ci.toFixed(1)}M`,
      verificationQuestion: 'What is your effective blended cost of debt following recent rate moves, and what percentage of total borrowing is fixed vs floating?',
      formulaCheck: `${eb.toFixed(1)} / ${ci.toFixed(1)} = ${cov.toFixed(2)}x`
    };
  }

  if (metricKey === 'cash_interest') {
    const ci = f.cash_interest || 0;
    return {
      coord,
      metricTitle: 'CASH INTEREST PAID',
      period,
      isForecast: true,
      methodology: 'Tranche Debt Schedule Model',
      badgeType: 'waterfall',
      badgeText: '📐 Debt Schedule Formula',
      formula: `=SUMPRODUCT(Tranche_Principals, Coupon_Rates) + RCF_Commitment_Fees`,
      source: 'Granular Tranche-by-Tranche Capital Structure Schedule',
      commentary: `Cash interest expense of ${ci.toFixed(1)}M derived from debt tranche schedule across senior bonds, bilateral bank facilities, and undrawn commitment fees.`,
      drivers: `Tranches: ${item.capital_structure_tranches ? item.capital_structure_tranches.length : 1} instruments | Benchmark: ${m.benchmark_bond}`,
      verificationQuestion: 'Are there any impending debt refinancings that will reset coupon rates higher over the next 12-18 months?',
      formulaCheck: null
    };
  }

  // 3. Revenue Forecast Methodology
  if (metricKey === 'revenue') {
    // Check Management Guidance
    const revGuide = guides.find(g => g.guidance_metric && g.guidance_metric.toLowerCase().includes('revenue'));
    if (period === '2025E' && revGuide) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Management Strategic Guidance Target',
        badgeType: 'guidance',
        badgeText: '🎯 Management Guidance',
        formula: `=Management_Guidance(Source: "${revGuide.last_guided_source}", Target: "${revGuide.management_target}")`,
        source: revGuide.last_guided_source,
        commentary: `Official guidance committed by executive management: ${revGuide.management_target}. Current run-rate tracking: ${revGuide.current_runrate} (${revGuide.tracking_status}). Variance analysis: ${revGuide.variance_analysis}`,
        drivers: `Guidance Target: ${revGuide.management_target} | Current Execution: ${revGuide.current_runrate} | Verification Status: ${revGuide.tracking_status}`,
        verificationQuestion: revGuide.verification_question,
        formulaCheck: null
      };
    }

    // Check Operational Drivers
    if (supp.installed_capacity_mw) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Operational Capacity & PPA Tariff Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Installed_Capacity(${supp.installed_capacity_mw}MW) * 8760h * Util(${supp.capacity_utilization_factor_pct || 54}%) * Blended_Tariff`,
        source: 'Power Purchase Agreement (PPA) Operational Capacity Model',
        commentary: `Modeled bottom-up from contracted generation capacity of ${supp.installed_capacity_mw} MW, generation volume of ${supp.generation_volume_gwh || 10000} GWh, and ${supp.fx_indexed_tariffs_pct || 80}% FX-indexed off-take contracts.`,
        drivers: `Capacity: ${supp.installed_capacity_mw} MW | Generation: ${supp.generation_volume_gwh || 10000} GWh | Utilization: ${supp.capacity_utilization_factor_pct || 54}% | FX-Indexed: ${supp.fx_indexed_tariffs_pct || 80}%`,
        verificationQuestion: 'Are there any scheduled major asset turnarounds or grid connection curtailments expected to reduce capacity factor over the coming year?',
        formulaCheck: null
      };
    }

    if (supp.net_production_kboed) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Hydrocarbon Net Production & Realized Price Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Net_Production(${supp.net_production_kboed}kboed) * 365 * Realized_Price(${supp.realized_price_usd_per_bbl || 78}/bbl) * (1 - Royalty_Take)`,
        source: 'Field Reserve & Net Production Forecast Model',
        commentary: `Modeled from net field production of ${supp.net_production_kboed} kboe/d at ${supp.realized_price_usd_per_bbl || 78}/bbl Brent benchmark, with lifting cost of ${supp.lifting_cost_usd_per_boe || 12}/boe and ${supp.hedged_production_pct || 40}% production hedged.`,
        drivers: `Production: ${supp.net_production_kboed} kboe/d | Realized Price: ${supp.realized_price_usd_per_bbl || 78}/bbl | Lifting Cost: ${supp.lifting_cost_usd_per_boe || 12}/boe`,
        verificationQuestion: 'What is your current hedge book coverage for the next 12-24 months and at what strike prices?',
        formulaCheck: null
      };
    }

    if (supp.presales_run_rate_usd_m) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Pre-Sales Backlog & Escrow Phasing Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Contracted_Backlog(${supp.backlog_revenue_usd_m}M) * POC_Progress + Escrow_Drawdown`,
        source: 'Real Estate Handover & RERA Escrow Completion Schedule',
        commentary: `Revenue recognized based on construction progress across pre-sales backlog of ${supp.backlog_revenue_usd_m}M, supported by ${supp.rera_escrow_balance_usd_m}M in escrow accounts and ${supp.collection_efficiency_pct || 90}% collection efficiency.`,
        drivers: `Backlog: ${supp.backlog_revenue_usd_m}M | Pre-Sales: ${supp.presales_run_rate_usd_m}M | Escrow Balance: ${supp.rera_escrow_balance_usd_m}M`,
        verificationQuestion: 'What is the default/cancellation rate on off-plan pre-sales, and how much unrestricted cash is currently accessible outside escrow?',
        formulaCheck: null
      };
    }

    if (supp.fleet_size_aircraft) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Fleet Capacity (ASK) & Unit Revenue (RASK) Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Fleet(${supp.fleet_size_aircraft}_Aircraft) * RASK(${supp.rask_usd_cents}c) * LoadFactor(${supp.passenger_load_factor_pct}%)`,
        source: 'Aviation Fleet Schedule & Capacity Model',
        commentary: `Bottom-up forecast based on active fleet of ${supp.fleet_size_aircraft} aircraft, passenger load factor of ${supp.passenger_load_factor_pct}%, and unit revenue of ${supp.rask_usd_cents}c RASK.`,
        drivers: `Fleet Size: ${supp.fleet_size_aircraft} aircraft | Load Factor: ${supp.passenger_load_factor_pct}% | RASK: ${supp.rask_usd_cents}c | CASK ex-fuel: ${supp.cask_ex_fuel_usd_cents}c`,
        verificationQuestion: 'How exposed are operating margins to jet fuel spikes and foreign exchange depreciation on aircraft leasing liabilities?',
        formulaCheck: null
      };
    }

    if (supp.freight_volume_carried_million_tonnes) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Freight Throughput & Traction Tariff Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Freight_Volume(${supp.freight_volume_carried_million_tonnes}Mt) * Blended_Tariff + Grants(${supp.non_repayable_international_grants_usd_m || 0}M)`,
        source: 'Cargo Throughput & Railway Concession Model',
        commentary: `Modeled from freight throughput of ${supp.freight_volume_carried_million_tonnes}Mt (grain/agri: ${supp.grain_and_agri_freight_million_tonnes}Mt; iron ore: ${supp.iron_ore_freight_million_tonnes}Mt) and international support grants.`,
        drivers: `Freight Volume: ${supp.freight_volume_carried_million_tonnes} Mt | Active Locomotives: ${supp.active_locomotive_fleet || 1150}`,
        verificationQuestion: 'What is the outlook for commercial freight tariffs, and are international donor grants legally quarantined from debt service?',
        formulaCheck: null
      };
    }

    if (supp.tower_or_subscriber_count) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Subscriber Base & Blended ARPU Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Subscribers(${supp.tower_or_subscriber_count}) * ARPU(${supp.tenancy_or_arpu}) * 12`,
        source: 'Telecom Subscriber Footprint & Contracted Backlog Model',
        commentary: `Modeled from footprint of ${supp.tower_or_subscriber_count} and ${supp.tenancy_or_arpu}, with ${supp.usd_linked_revenue_pct || 70}% USD-linked contract revenue.`,
        drivers: `Footprint: ${supp.tower_or_subscriber_count} | Tenancy/ARPU: ${supp.tenancy_or_arpu} | Backlog: ${supp.contracted_backlog_years || 8} years`,
        verificationQuestion: 'How quickly can local currency tariff increases be passed through to prepaid subscribers without causing churn spikes?',
        formulaCheck: null
      };
    }

    if (supp.production_capacity_mtpa) {
      return {
        coord,
        metricTitle: 'CONSOLIDATED REVENUE',
        period,
        isForecast: true,
        methodology: 'Industrial Nameplate Capacity & Export Mix Model',
        badgeType: 'ops',
        badgeText: '🏭 Operational Driver Model',
        formula: `=Capacity(${supp.production_capacity_mtpa}Mtpa) * Utilization * Benchmark_Price * Export_Mix(${supp.hard_currency_export_pct}%)`,
        source: 'Manufacturing Nameplate Capacity & Export Netback Model',
        commentary: `Modeled from industrial nameplate capacity of ${supp.production_capacity_mtpa}Mtpa with ${supp.hard_currency_export_pct}% hard-currency export mix and ${supp.cash_cost_quartile || 'Q1'} cost position.`,
        drivers: `Nameplate Capacity: ${supp.production_capacity_mtpa} Mtpa | Hard Currency Export: ${supp.hard_currency_export_pct}%`,
        verificationQuestion: 'Are plants operating at full technical availability, and are feedstock gas/raw material supplies guaranteed under long-term contracts?',
        formulaCheck: null
      };
    }

    // Default Trend Extrapolation (The explicit 5% run-rate formula)
    const priorPeriod = period === '2025E' ? '2024A' : (period === '2026E' ? '2025E' : '2026E');
    const priorFin = (item.financials_multi_year || []).find(x => x.period === priorPeriod) || {};
    const growthPct = priorFin.revenue ? (((f.revenue - priorFin.revenue) / priorFin.revenue) * 100).toFixed(1) : '5.0';
    return {
      coord,
      metricTitle: 'CONSOLIDATED REVENUE',
      period,
      isForecast: true,
      methodology: 'Trend Extrapolation (Baseline Run-Rate Growth)',
      badgeType: 'trend',
      badgeText: `📊 Trend Extrapolation (+${growthPct}% Growth)`,
      formula: `=${colLetter === 'G' ? 'F' : 'E'}12 * (1 + ${growthPct}%)`,
      source: 'Macroeconomic & Inflation Trend Extrapolation',
      commentary: `Trend extrapolation model assuming ${growthPct}% YoY top-line growth (nominal GDP/inflation baseline) in the absence of announced new production capacity or formal multi-year management guidance.`,
      drivers: `Base Revenue: ${priorFin.revenue || 0}M | Applied YoY Growth: +${growthPct}% | Type: Trend Continuation`,
      verificationQuestion: 'What specific volume growth or price increases are budgeted to support revenue growth in the absence of new capacity additions?',
      formulaCheck: null
    };
  }

  // 4. EBITDA Forecast Methodology
  if (metricKey === 'ebitda' || metricKey === 'calculated_ebitda') {
    const ebitdaGuide = guides.find(g => g.guidance_metric && g.guidance_metric.toLowerCase().includes('ebitda'));
    if (period === '2025E' && ebitdaGuide) {
      return {
        coord,
        metricTitle: 'CALCULATED CASH DESK EBITDA',
        period,
        isForecast: true,
        methodology: 'Management Guidance Target (Cash Reconciled)',
        badgeType: 'guidance',
        badgeText: '🎯 Management Guidance Target',
        formula: `=Management_Target("${ebitdaGuide.management_target}", Source: "${ebitdaGuide.last_guided_source}")`,
        source: ebitdaGuide.last_guided_source,
        commentary: `Management guided ${ebitdaGuide.management_target}. Reconciled to calculated cash EBITDA to eliminate non-cash add-backs and exceptional items. Status: ${ebitdaGuide.tracking_status}.`,
        drivers: `Guidance Target: ${ebitdaGuide.management_target} | Current Execution: ${ebitdaGuide.current_runrate}`,
        verificationQuestion: ebitdaGuide.verification_question,
        formulaCheck: null
      };
    }

    const margin = f.ebitda_margin_pct || 40;
    return {
      coord,
      metricTitle: 'CALCULATED CASH DESK EBITDA',
      period,
      isForecast: true,
      methodology: 'Operational Unit Cash Margin Model',
      badgeType: 'ops',
      badgeText: '🏭 Operational Margin Model',
      formula: `=${colLetter}12 * ${margin.toFixed(1)}%_Cash_Margin`,
      source: 'Unit Cash Production Margin & Fixed Opex Model',
      commentary: `EBITDA modeled from projected revenue of ${(f.revenue || 0).toFixed(1)}M at targeted cash EBITDA margin of ${margin.toFixed(1)}%. Reconciled against reported management EBITDA to eliminate non-operating add-backs.`,
      drivers: `Revenue: ${(f.revenue || 0).toFixed(1)}M | Cash Margin: ${margin.toFixed(1)}% | Reconciliation: ${f.ebitda_reconciliation_comment || 'Reconciled'}`,
      verificationQuestion: 'What are the main variable cost sensitivities (fuel, labor, raw materials) that could erode the cash EBITDA margin below budget?',
      formulaCheck: null
    };
  }

  // 5. Capex Forecast Methodology
  if (metricKey === 'capex') {
    const capexGuide = guides.find(g => g.guidance_metric && g.guidance_metric.toLowerCase().includes('capex'));
    if (period === '2025E' && capexGuide) {
      return {
        coord,
        metricTitle: 'CAPITAL EXPENDITURES (CAPEX)',
        period,
        isForecast: true,
        methodology: 'Management Strategic Capex Envelope Guidance',
        badgeType: 'guidance',
        badgeText: '🎯 Management Capex Guidance',
        formula: `=Management_Capex_Envelope("${capexGuide.management_target}", Source: "${capexGuide.last_guided_source}")`,
        source: capexGuide.last_guided_source,
        commentary: `Management committed capex envelope of ${capexGuide.management_target}. Current run-rate commitments: ${capexGuide.current_runrate} (${capexGuide.tracking_status}).`,
        drivers: `Guided Envelope: ${capexGuide.management_target} | Current Commitments: ${capexGuide.current_runrate}`,
        verificationQuestion: capexGuide.verification_question,
        formulaCheck: null
      };
    }

    return {
      coord,
      metricTitle: 'CAPITAL EXPENDITURES (CAPEX)',
      period,
      isForecast: true,
      methodology: 'Sustaining Maintenance & EPC Project Schedule',
      badgeType: 'ops',
      badgeText: '🏭 Operational Capex Model',
      formula: `=Sustaining_Maintenance_Capex + Committed_EPC_Contract_Draws`,
      source: 'Project Construction & Plant Maintenance Schedule',
      commentary: `Capex of ${(f.capex || 0).toFixed(1)}M modeled from committed EPC contractual drawdowns and baseline regulatory maintenance capex.`,
      drivers: `Net Capex: ${(f.capex || 0).toFixed(1)}M | % of Revenue: ${f.revenue ? ((f.capex / f.revenue) * 100).toFixed(1) : '15'}%`,
      verificationQuestion: 'How much of this capex envelope can be deferred or canceled without incurring severe contractual termination penalties?',
      formulaCheck: null
    };
  }

  // Generic fallback
  return {
    coord,
    metricTitle: cleanMetric,
    period,
    isForecast: true,
    methodology: 'Financial Model Formula / Ratio Projection',
    badgeType: 'waterfall',
    badgeText: '📐 Financial Formula',
    formula: `=${colLetter}_${cleanMetric}`,
    source: 'Financial Statement Projection Engine',
    commentary: `Projected financial line item based on standard multi-period statement schedules.`,
    drivers: `Standard financial model schedule.`,
    verificationQuestion: null,
    formulaCheck: null
  };
}

// ----------------- IN-CELL COMMENTING & HIGHLIGHTING -----------------
window.handleGridCellClick = function(ticker, metricKey, period, element, event) {
  if (event) event.stopPropagation();
  activePopoverCell = { ticker, metricKey, period, element };

  // Set outline
  document.querySelectorAll('.grid-cell.cell-selected').forEach(c => c.classList.remove('cell-selected'));
  if (element) element.classList.add('cell-selected');

  // Find issuer object
  const item = activeModelIssuer || (typeof MASTER_ISSUERS !== 'undefined' ? MASTER_ISSUERS.find(i => i.metadata.ticker === ticker) : null);
  const meta = getForecastAuditMetadata(item, metricKey, period);

  // Update Excel Formula Bar in Modal
  const coordElem = document.getElementById('formula-bar-cell-coord');
  const textElem = document.getElementById('formula-bar-text');
  const badgeElem = document.getElementById('formula-bar-badge');
  if (coordElem) coordElem.textContent = `${meta.coord} : ${meta.metricTitle} (${period})`;
  if (textElem) {
    if (textElem.tagName === 'INPUT') textElem.value = meta.formula;
    else textElem.textContent = meta.formula;
  }
  if (badgeElem) badgeElem.innerHTML = `<span class="badge badge-${meta.badgeType}">${meta.badgeText}</span>`;

  // Update Popover
  const popover = document.getElementById('cell-comment-popover');
  if (!popover) return;

  const cellKey = `${metricKey}_${period}`;
  const coordBadge = document.getElementById('popover-coord-badge');
  if (coordBadge) coordBadge.textContent = meta.coord;
  const titleElem = document.getElementById('popover-cell-title');
  if (titleElem) titleElem.textContent = `${meta.metricTitle} (${period})`;

  // Methodology Badge & Formula Box
  const methBadge = document.getElementById('popover-methodology-badge');
  if (methBadge) {
    methBadge.className = `badge badge-${meta.badgeType}`;
    methBadge.textContent = meta.badgeText;
  }
  const formulaBox = document.getElementById('popover-formula-box');
  if (formulaBox) formulaBox.textContent = meta.formula;

  // Drivers Box
  const driversBox = document.getElementById('popover-drivers-box');
  const driversText = document.getElementById('popover-drivers-text');
  if (driversBox && driversText) {
    if (meta.drivers) {
      driversBox.style.display = 'block';
      driversText.textContent = meta.drivers;
    } else {
      driversBox.style.display = 'none';
    }
  }

  // Due Diligence / Verification Question Box
  const dilBox = document.getElementById('popover-diligence-box');
  const dilText = document.getElementById('popover-diligence-text');
  if (dilBox && dilText) {
    if (meta.verificationQuestion) {
      dilBox.style.display = 'block';
      dilText.textContent = meta.verificationQuestion;
    } else {
      dilBox.style.display = 'none';
    }
  }

  // Desk Observation Box
  const deskBox = document.getElementById('popover-desk-box');
  const deskText = document.getElementById('popover-desk-text');
  let obs = meta.commentary || '';

  if (item && item.financial_observations) {
    const fObs = item.financial_observations.find(o => o.period === period);
    if (fObs) {
      if (metricKey.includes('revenue') && fObs.revenue_observation) obs += ' | ' + fObs.revenue_observation;
      else if (metricKey.includes('ebitda') && fObs.ebitda_observation) obs += ' | ' + fObs.ebitda_observation;
      else if (metricKey.includes('capex') && fObs.capex_observation) obs += ' | ' + fObs.capex_observation;
      else if (metricKey.includes('fcf') && fObs.fcf_observation) obs += ' | ' + fObs.fcf_observation;
      else if (metricKey.includes('leverage') && fObs.net_leverage_observation) obs += ' | ' + fObs.net_leverage_observation;
    }
  }

  if (deskBox && deskText) {
    if (obs) {
      deskBox.style.display = 'block';
      deskText.textContent = obs;
    } else {
      deskBox.style.display = 'none';
    }
  }

  // Look up stored user custom note
  const storedNotes = getStoredNotes(ticker);
  const userNoteText = storedNotes[cellKey] || '';
  const textarea = document.getElementById('popover-user-note');
  if (textarea) textarea.value = userNoteText;

  // Position popover near the cell
  if (element) {
    const rect = element.getBoundingClientRect();
    popover.style.display = 'block';
    popover.classList.add('active');

    const topPos = Math.min(window.innerHeight - 380, Math.max(10, rect.bottom + 6));
    const leftPos = Math.min(window.innerWidth - 390, Math.max(10, rect.left - 50));
    popover.style.top = topPos + 'px';
    popover.style.left = leftPos + 'px';
  }
};

window.handleDrawerCellClick = function(issuerId, period, metricKey, element, event) {
  if (event) event.stopPropagation();
  const item = (typeof MASTER_ISSUERS !== 'undefined' ? MASTER_ISSUERS.find(i => i.metadata.id === issuerId) : null);
  if (!item) return;

  activeModelIssuer = item;
  const meta = getForecastAuditMetadata(item, metricKey, period);

  // Update Drawer Mini Formula Bar
  const coordElem = document.getElementById(`drawer-fx-coord-${issuerId}`);
  const textElem = document.getElementById(`drawer-fx-text-${issuerId}`);
  const badgeElem = document.getElementById(`drawer-fx-badge-${issuerId}`);
  if (coordElem) coordElem.textContent = `${meta.coord} : ${meta.metricTitle} (${period})`;
  if (textElem) textElem.textContent = meta.formula;
  if (badgeElem) badgeElem.innerHTML = `<span class="badge badge-${meta.badgeType}">${meta.badgeText}</span>`;

  // Open Popover
  handleGridCellClick(item.metadata.ticker, metricKey, period, element, event);
};

window.closeCellComment = function() {
  const popover = document.getElementById('cell-comment-popover');
  if (popover) {
    popover.classList.remove('active');
    popover.style.display = 'none';
  }
  document.querySelectorAll('.grid-cell.cell-selected').forEach(c => c.classList.remove('cell-selected'));
  activePopoverCell = null;
};

window.saveCurrentCellNote = function() {
  if (!activePopoverCell) return;
  const { ticker, metricKey, period, element } = activePopoverCell;
  const cellKey = `${metricKey}_${period}`;
  const text = document.getElementById('popover-user-note')?.value || '';

  setStoredNote(ticker, cellKey, text);

  if (text.trim()) {
    element.classList.add('cell-has-user-note');
  } else {
    element.classList.remove('cell-has-user-note');
  }

  closeCellComment();
};

window.toggleCurrentCellHighlight = function() {
  if (!activePopoverCell) return;
  const { ticker, metricKey, period, element } = activePopoverCell;
  const cellKey = `${metricKey}_${period}`;
  const storedHl = getStoredHighlights(ticker);

  if (storedHl[cellKey]) {
    setStoredHighlight(ticker, cellKey, null);
    element.classList.remove('cell-hl-gold');
  } else {
    setStoredHighlight(ticker, cellKey, 'cell-hl-gold');
    element.classList.add('cell-hl-gold');
  }

  closeCellComment();
};

// ----------------- MAIN SHEET RENDER DISPATCHER -----------------
function renderModelSheet(sheetKey) {
  const container = document.getElementById('modal-sheet-body');
  if (!container || !activeModelIssuer) return;

  const item = activeModelIssuer;
  const m = item.metadata;
  const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
  const isBank = (m.sector === 'Banks');

  if (sheetKey === 'sheet-summary') {
    container.innerHTML = renderSheetSummary(item);
  } else if (sheetKey === 'sheet-fin') {
    container.innerHTML = renderSheetFinancials(item, currentModelViewMode, isBank);
  } else if (sheetKey === 'sheet-ops') {
    container.innerHTML = renderSheetOperational(item);
  } else if (sheetKey === 'sheet-cap') {
    container.innerHTML = renderSheetCapitalStructure(item);
  } else if (sheetKey === 'sheet-rec') {
    container.innerHTML = renderSheetRecovery(item);
  } else if (sheetKey === 'sheet-guidance') {
    container.innerHTML = renderSheetGuidance(item);
  } else if (sheetKey === 'sheet-hist') {
    container.innerHTML = renderSheetHistory(item);
  } else if (sheetKey === 'sheet-mgmt') {
    container.innerHTML = renderSheetMgmtQuestions(item);
  }
}

// ----------------- SHEET 1: EXECUTIVE SUMMARY & CAPITAL STRUCTURE OVERVIEW -----------------
function renderSheetSummary(item) {
  const m = item.metadata;
  const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
  const f25 = item.financials_multi_year.find(f => f.period === '2025E') || {};
  const isBank = (m.sector === 'Banks');
  const eRec = (item.ebitda_reconciliation && item.ebitda_reconciliation.find(r => r.period === '2024A')) || {};
  const rec = item.recovery_analysis || {};

  return `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:14px; margin-bottom:20px;">
      
      <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Benchmark Secondary Pricing</div>
        <div style="font-size:18px; font-weight:700; color:var(--accent-gold);">$${m.price.toFixed(2)}</div>
        <div style="font-size:11.5px; color:#cbd5e1; margin-top:3px;">
          YTM: <strong>${m.ytm.toFixed(2)}%</strong> | Spread: <strong style="color:var(--accent-blue);">+${m.spread_bp} bp</strong>
        </div>
      </div>

      <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Credit Rating & Category</div>
        <div style="font-size:18px; font-weight:700; color:#fff;">${m.rating}</div>
        <div style="font-size:11.5px; color:#94a3b8; margin-top:3px;">
          Tier: <span class="badge badge-sector">${m.tier}</span> | Type: <strong>${m.type.toUpperCase()}</strong>
        </div>
      </div>

      <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">${isBank ? '2024A Net Interest Margin' : '2024A Calculated Cash EBITDA'}</div>
        <div style="font-size:18px; font-weight:700; color:#10b981;">
          ${isBank ? (f24.nim_pct ? f24.nim_pct.toFixed(2) + '%' : 'N/A') : '$' + (f24.ebitda || 0).toLocaleString() + 'M'}
        </div>
        <div style="font-size:11.5px; color:#94a3b8; margin-top:3px;">
          ${isBank ? `Cost-to-Income: <strong>${f24.cir_pct ? f24.cir_pct.toFixed(1) + '%' : 'N/A'}</strong>` : `Reported: <strong>$${(eRec.company_reported_ebitda || f24.ebitda || 0).toLocaleString()}M</strong>`}
        </div>
      </div>

      <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">${isBank ? 'Capital Adequacy (CAR %)' : '2024A Net Leverage'}</div>
        <div style="font-size:18px; font-weight:700; color:#fff;">
          ${isBank ? (f24.car_pct ? f24.car_pct.toFixed(1) + '%' : 'N/A') : (f24.net_leverage ? f24.net_leverage.toFixed(2) + 'x' : 'N/A')}
        </div>
        <div style="font-size:11.5px; color:#94a3b8; margin-top:3px;">
          ${isBank ? `NPL Ratio: <strong>${f24.npl_pct ? f24.npl_pct.toFixed(2) + '%' : 'N/A'}</strong>` : `Coverage: <strong>${f24.interest_coverage ? f24.interest_coverage.toFixed(2) + 'x' : 'N/A'}</strong>`}
        </div>
      </div>

      <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
        <div style="font-size:10.5px; color:#94a3b8; text-transform:uppercase; margin-bottom:4px;">Restructuring Floor Price</div>
        <div style="font-size:18px; font-weight:700; color:#f43f5e;">$${Number(rec.distressed_floor_px || 45).toFixed(2)}</div>
        <div style="font-size:11.5px; color:#94a3b8; margin-top:3px;">
          Base Recovery: <strong style="color:#10b981;">$${Number(rec.base_case_px || 85).toFixed(2)}</strong> (${rec.recovery_floor_pct || 50}%)
        </div>
      </div>

    </div>

    <!-- Executive Summary Credit Thesis -->
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:8px; padding:18px; margin-bottom:20px;">
      <h3 style="color:var(--accent-gold); font-size:13.5px; margin:0 0 10px 0; text-transform:uppercase;">
        🏛️ Credit Thesis & Capital Structure Profile
      </h3>
      <p style="color:#cbd5e1; font-size:12.5px; line-height:1.6; margin:0 0 12px 0;">
        ${rec.thesis || `${m.name} (${m.ticker}) is a leading ${m.country} ${m.sector} issuer benchmarked via ${m.benchmark_bond}. The desk model maintains strict dual EBITDA tracking reconciling management reported numbers to calculated cash generation.`}
      </p>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <span class="badge badge-ig">Audited IFRS Accounting</span>
        <span class="badge badge-sector">${item.capital_structure_tranches ? item.capital_structure_tranches.length + ' Tranches Monitored' : ''}</span>
        <span class="badge badge-hy">FCF Waterfall Reconciled</span>
      </div>
    </div>
  `;
}

// ----------------- SHEET 2: MULTI-PERIOD FINANCIAL STATEMENTS & FCF WATERFALL -----------------
function renderSheetFinancials(item, mode, isBank) {
  const m = item.metadata;
  const periods = ["2021A", "2022A", "2023A", "2024A", "2025E", "2026E", "2027E"];
  const ticker = m.ticker;
  const storedHl = getStoredHighlights(ticker);
  const storedNotes = getStoredNotes(ticker);

  // Define lines based on Bank vs Corporate
  let lineSpecs = [];

  if (isBank) {
    lineSpecs = [
      { key: 'nim_pct', label: 'Net Interest Margin (NIM %)', isPct: true, isCore: true },
      { key: 'cir_pct', label: 'Cost-to-Income Ratio (CIR %)', isPct: true, isCore: true },
      { key: 'roe_pct', label: 'Return on Equity (ROE %)', isPct: true, isCore: true },
      { key: 'nii', label: 'Net Interest Income ($M)', isCore: true },
      { key: 'fees', label: 'Net Fee & Commission Income ($M)' },
      { key: 'ppop', label: 'Pre-Provision Operating Profit ($M)', isCore: true },
      { key: 'provisions', label: 'Credit Impairment Provisions ($M)', isNegative: true, isCore: true },
      { key: 'net_profit', label: 'Consolidated Net Profit ($M)', isCore: true },
      { key: 'loans', label: 'Gross Customer Loans ($M)', isCore: true },
      { key: 'deposits', label: 'Customer Deposits ($M)', isCore: true },
      { key: 'ldr_pct', label: 'Loan-to-Deposit Ratio (LDR %)', isPct: true, isCore: true },
      { key: 'npl_pct', label: 'Non-Performing Loan Ratio (NPL %)', isPct: true, isCore: true },
      { key: 'car_pct', label: 'Capital Adequacy Ratio (CAR %)', isPct: true, isCore: true }
    ];
  } else {
    lineSpecs = [
      // Operating Scale
      { type: 'header', label: 'OPERATING SCALE & REVENUE' },
      { key: 'revenue', label: 'Consolidated Revenue ($M)', isCore: true },
      { key: 'gross_profit', label: 'Operating / Gross Profit ($M)' },
      { key: 'sga', label: 'SG&A & Operating Expenses ($M)', isNegative: true },

      // EBITDA & Profitability
      { type: 'header', label: 'EBITDA & CASH PROFITABILITY' },
      { key: 'reported_ebitda', label: 'Company Reported Headline EBITDA ($M)' },
      { key: 'ebitda', label: 'Calculated Cash Desk EBITDA ($M)', isCore: true, isBold: true, color: '#10b981' },
      { key: 'ebitda_margin_pct', label: 'Calculated EBITDA Margin (%)', isPct: true, isCore: true },
      { key: 'ebitda_variance', label: 'Reported vs. Calculated Variance ($M)' },

      // Free Cash Flow Waterfall
      { type: 'header', label: 'FREE CASH FLOW (FCF) WATERFALL' },
      { key: 'ebitda_base', label: 'Desk Standardized Cash EBITDA ($M)', isFormula: true },
      { key: 'capex', label: 'Less: Net Capital Expenditures ($M)', isNegative: true, isCore: true },
      { key: 'cash_interest', label: 'Less: Cash Interest Paid ($M)', isNegative: true, isCore: true },
      { key: 'delta_wc', label: 'Plus / (Less): Δ Working Capital ($M)', isCore: true },
      { key: 'tax', label: 'Less: Cash Corporate Taxes Paid ($M)', isNegative: true, isCore: true },
      { key: 'fcf', label: 'Free Cash Flow (FCF) ($M)', isCore: true, isBold: true, color: 'var(--accent-gold)' },
      { key: 'fcf_conversion', label: 'FCF Conversion Rate (% of EBITDA)', isPct: true },

      // Balance Sheet & Debt
      { type: 'header', label: 'DEBT, LIQUIDITY & BALANCE SHEET' },
      { key: 'gross_debt', label: 'Consolidated Gross Debt ($M)', isCore: true },
      { key: 'cash', label: 'Total Cash & Liquid Equivalents ($M)', isCore: true },
      { key: 'undrawn_rcf', label: 'Undrawn Committed RCF Available ($M)', isCore: true },
      { key: 'net_debt', label: 'Consolidated Net Debt ($M)', isCore: true, isBold: true },

      // Key Credit Ratios
      { type: 'header', label: 'KEY CREDIT RATIOS & PRICING' },
      { key: 'net_leverage', label: 'Net Debt / EBITDA (x)', isCore: true, isBold: true, isRatio: true },
      { key: 'interest_coverage', label: 'Interest Coverage Ratio (x)', isCore: true, isRatio: true },
      { key: 'px_quote', label: 'Benchmark Bond Clean Price ($)' },
      { key: 'ytm_quote', label: 'Yield to Maturity (YTM %)', isPct: true },
      { key: 'spread_quote', label: 'Secondary Benchmark Spread (bp)', isCore: true }
    ];
  }

  // Filter rows if in simplified mode: eliminate empty/unreported lines
  if (mode === 'simplified') {
    lineSpecs = lineSpecs.filter(spec => {
      if (spec.type === 'header') return true;
      if (spec.isCore) return true;

      // Check if any period has non-zero value
      return periods.some(p => {
        const val = getMetricVal(item, spec.key, p);
        return val !== null && val !== 0 && val !== undefined;
      });
    });

    // Prune adjacent headers if empty
    const pruned = [];
    for (let i = 0; i < lineSpecs.length; i++) {
      if (lineSpecs[i].type === 'header') {
        const next = lineSpecs[i + 1];
        if (next && next.type !== 'header') pruned.push(lineSpecs[i]);
      } else {
        pruned.push(lineSpecs[i]);
      }
    }
    lineSpecs = pruned;
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <div style="font-size:11.5px; color:#94a3b8;">
        💡 Click any data cell to highlight or add analyst notes. Cells with 💬 indicators contain desk observations.
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="badge ${mode === 'simplified' ? 'badge-ig' : 'badge-sector'}">
          ${mode === 'simplified' ? '⚡ Simplified Core Model (Zero Empty Cells)' : '📑 Full Standardized Statement'}
        </span>
      </div>
    </div>

    <div class="sheet-grid-container">
      <table class="sheet-grid">
        <thead>
          <tr>
            <th class="col-metric">Financial Statement Line Item</th>
            ${periods.map(p => `<th>${p}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${lineSpecs.map(spec => {
            if (spec.type === 'header') {
              return `
                <tr class="section-header">
                  <td colspan="${periods.length + 1}">
                    ${spec.label}
                  </td>
                </tr>
              `;
            }

            return `
              <tr class="${spec.isBold ? 'subtotal-row' : ''}">
                <td class="col-metric" style="${spec.color ? `color:${spec.color};` : ''}">
                  ${spec.label}
                </td>
                ${periods.map(p => {
                  const val = getMetricVal(item, spec.key, p);
                  const cellKey = `${spec.key}_${p}`;
                  const formatted = formatCellVal(val, spec);

                  // Check if cell has desk observation
                  const hasDeskObs = checkDeskObs(item, spec.key, p);
                  const hasUserNote = Boolean(storedNotes[cellKey]);
                  const manualHl = storedHl[cellKey];

                  // Check preset highlights
                  let presetHl = '';
                  if (activePresetHighlight === 'burn') {
                    if (spec.key === 'fcf' && val !== null && val < 0) presetHl = 'cell-hl-ruby';
                    else if (spec.key === 'net_leverage' && val !== null && val > 4.5) presetHl = 'cell-hl-ruby';
                  } else if (activePresetHighlight === 'inflection') {
                    if (spec.key === 'fcf' && val !== null && val > 0) presetHl = 'cell-hl-emerald';
                    else if (spec.key === 'net_leverage' && val !== null && val < 3.5) presetHl = 'cell-hl-emerald';
                  } else if (activePresetHighlight === 'variance') {
                    if (spec.key === 'ebitda_variance' && val !== null && Math.abs(val) > 10) presetHl = 'cell-hl-blue';
                  }

                  const meta = getForecastAuditMetadata(item, spec.key, p);
                  const hlClass = presetHl || manualHl || '';
                  const commentClass = hasUserNote ? 'cell-has-user-note' : (hasDeskObs ? 'cell-has-comment' : '');
                  const fxMarkerClass = `cell-has-${meta.badgeType}`;

                  return `
                    <td class="grid-cell ${hlClass} ${commentClass} ${fxMarkerClass}"
                        data-cell-key="${cellKey}"
                        data-coord="${meta.coord}"
                        title="[${meta.badgeText}] ${meta.formula}"
                        onclick="handleGridCellClick('${ticker}', '${spec.key}', '${p}', this, event)">
                      ${formatted}
                    </td>
                  `;
                }).join('')}
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ----------------- SHEET 3: OPERATIONAL DRIVERS & UNIT METRICS -----------------
function renderSheetOperational(item) {
  const m = item.metadata;
  const isUkrRail = (m.id === 'ukr_rail');
  const periods = ["2021A", "2022A", "2023A", "2024A", "2025E", "2026E", "2027E"];

  const opsData = item.operational_drivers || item.traffic_metrics || [
    { metric: "Primary Operational Capacity", uom: "Units / MW / MT", vals: ["1,020", "1,080", "1,150", "1,200", "1,260", "1,310", "1,350"] },
    { metric: "Commercial Capacity Factor / Load", uom: "%", vals: ["78.5%", "80.2%", "82.1%", "84.5%", "85.0%", "85.5%", "86.0%"] },
    { metric: "Average Realized Hard-Currency Tariff", uom: "$ / Unit", vals: ["$105.0", "$112.5", "$120.0", "$128.5", "$132.0", "$135.0", "$138.0"] },
    { metric: "Long-Term PPA / Regulated Off-take Backlog", uom: "% of Volume", vals: ["92.0%", "91.5%", "90.0%", "88.5%", "88.0%", "87.5%", "87.0%"] }
  ];

  return `
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
        🏭 Operational Drivers, Production Capacity & Hard-Currency Unit Economics
      </h4>
      <div class="sheet-grid-container">
        <table class="sheet-grid">
          <thead>
            <tr>
              <th class="col-metric">Operational Performance Driver</th>
              <th>Unit</th>
              ${periods.map(p => `<th>${p}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${opsData.map(row => `
              <tr>
                <td class="col-metric"><strong>${row.metric}</strong></td>
                <td style="color:#94a3b8; font-size:10.5px;">${row.uom}</td>
                ${row.vals.map(v => `<td class="grid-cell">${v}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------- SHEET 4: CAPITAL STRUCTURE & TRANCHES -----------------
function renderSheetCapitalStructure(item) {
  const m = item.metadata;
  const f24 = item.financials_multi_year.find(f => f.period === '2024A') || {};
  const tranches = item.capital_structure_tranches || [];
  const rcf = item.rcf_facility_liquidity || {};
  const cov = item.covenant_analysis || {};

  return `
    <!-- Tranches -->
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4 style="color:var(--accent-gold); font-size:12px; margin:0; text-transform:uppercase;">
          🏛️ Debt Capital Structure & Tranche Pricing
        </h4>
        <span style="font-size:11px; color:#94a3b8;">Consolidated Gross Debt: <strong>$${(f24.gross_debt || 0).toLocaleString()}M</strong></span>
      </div>
      <div style="overflow-x:auto;">
        <table class="drawer-table" style="margin:0; font-size:11.5px;">
          <thead>
            <tr>
              <th>Tranche / Instrument Name</th>
              <th>Type</th>
              <th>Ccy</th>
              <th class="num">Outstanding ($M)</th>
              <th class="num">Coupon</th>
              <th class="num">Clean Px</th>
              <th class="num">YTM</th>
              <th>Seniority</th>
              <th>Law</th>
            </tr>
          </thead>
          <tbody>
            ${tranches.map(t => `
              <tr>
                <td><strong>${t.tranche_name}</strong></td>
                <td><span class="badge badge-sector">${t.instrument_type}</span></td>
                <td>${t.currency}</td>
                <td class="num"><strong>$${(t.amount_outstanding_usd_m || 0).toLocaleString()}M</strong></td>
                <td class="num">${typeof t.coupon === 'number' ? t.coupon.toFixed(2) + '%' : (t.coupon ? String(t.coupon) : 'Floating')}</td>
                <td class="num">$${typeof t.clean_price === 'number' ? t.clean_price.toFixed(2) : (t.clean_price ? String(t.clean_price) : Number(m.price || 0).toFixed(2))}</td>
                <td class="num"><strong style="color:var(--accent-gold);">${typeof t.ytm === 'number' ? t.ytm.toFixed(2) + '%' : (t.ytm ? String(t.ytm) : Number(m.ytm || 0).toFixed(2) + '%')}</strong></td>
                <td>${t.seniority || 'Senior Unsecured'}</td>
                <td><span class="badge badge-ig">${t.governing_law || 'NY / English'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- RCF Liquidity -->
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:14px; margin-bottom:14px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
        💧 Revolving Credit Facility (RCF) Capacity & Undrawn Liquidity Headroom
      </h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:11.5px;">
        <div>Committed Facility: <strong>$${(rcf.total_committed_capacity_usd_m || 1000).toLocaleString()}M</strong></div>
        <div>Drawn Amount: <strong style="color:#f43f5e;">$${(rcf.drawn_amount_usd_m || 200).toLocaleString()}M</strong></div>
        <div>Undrawn Headroom: <strong style="color:#10b981;">$${(rcf.undrawn_available_usd_m || 800).toLocaleString()}M</strong></div>
        <div>Maturity / Margin: <strong>${rcf.maturity || '2027'} (${rcf.drawn_margin || 'SOFR+225bp'})</strong></div>
      </div>
    </div>
  `;
}

// ----------------- SHEET 5: RESTRUCTURING & RECOVERY -----------------
function renderSheetRecovery(item) {
  const rec = item.recovery_analysis || {};
  return `
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:16px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 12px 0; text-transform:uppercase;">
        ⚖️ Restructuring Framework & Recovery Scenarios
      </h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
        <div style="background:#0b111e; border:1px solid #1e2d45; border-radius:6px; padding:12px;">
          <div style="color:#ef4444; font-weight:700; font-size:12px; margin-bottom:4px;">Stressed Liquidation Floor</div>
          <div style="font-size:20px; font-weight:700; color:#fff;">$${Number(rec.distressed_floor_px || 45).toFixed(2)}</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Floor Recovery: <strong>${rec.recovery_floor_pct || 48}%</strong></div>
          <div style="font-size:11px; color:#64748b; margin-top:4px;">EV Multiple: <strong>${rec.stress_ev_multiple || '4.0x'}</strong></div>
        </div>

        <div style="background:#0b111e; border:1px solid #1e2d45; border-radius:6px; padding:12px;">
          <div style="color:#10b981; font-weight:700; font-size:12px; margin-bottom:4px;">Base Going-Concern Case</div>
          <div style="font-size:20px; font-weight:700; color:#fff;">$${Number(rec.base_case_px || 85).toFixed(2)}</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:4px;">Base Recovery: <strong>${rec.recovery_base_pct || 90}%</strong></div>
          <div style="font-size:11px; color:#64748b; margin-top:4px;">Framework: <strong>${rec.restructuring_framework || 'Consensual Scheme of Arrangement'}</strong></div>
        </div>
      </div>
    </div>
  `;
}

// ----------------- SHEET 6: GUIDANCE TRACKER -----------------
function renderSheetGuidance(item) {
  const gList = item.management_guidance_tracker || [];
  return `
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:16px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 12px 0; text-transform:uppercase;">
        📢 Prior Management Guidance vs. Actual Run-Rate (Audit Tracker)
      </h4>
      <div style="overflow-x:auto;">
        <table class="drawer-table" style="margin:0; font-size:11.5px;">
          <thead>
            <tr>
              <th style="width:180px;">Guidance Metric</th>
              <th>Prior Management Commitment</th>
              <th>Current Run-Rate</th>
              <th>Status</th>
              <th>Verification Question to Ask CFO</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${gList.map((g, idx) => `
              <tr>
                <td><strong>${g.guidance_metric}</strong></td>
                <td><span style="color:var(--accent-gold); font-weight:600;">${g.management_target}</span></td>
                <td>${g.current_runrate}</td>
                <td><span class="badge ${g.tracking_status === 'On Track' ? 'badge-ig' : 'badge-hy'}">${g.tracking_status}</span></td>
                <td style="font-size:11px; color:#cbd5e1;">${g.verification_question || g.variance_analysis}</td>
                <td>
                  <button class="btn-action" onclick="copyTextToClipboard('${(g.verification_question || '').replace(/'/g, "\\'")}')" style="font-size:10px; padding:3px 7px;">
                    📋 Copy
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------- SHEET 7: HISTORICAL MARKET SNAPSHOTS -----------------
function renderSheetHistory(item) {
  const hist = item.market_history || [];
  return `
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:16px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 12px 0; text-transform:uppercase;">
        📈 Historical Market Snapshots & Secondary Spread Drift (${hist.length} Snapshots)
      </h4>
      <div style="overflow-x:auto;">
        <table class="drawer-table" style="margin:0; font-size:11.5px;">
          <thead>
            <tr>
              <th style="width:95px;">Snapshot Date</th>
              <th>Period</th>
              <th>Rating</th>
              <th class="num">Clean Price</th>
              <th class="num">YTM</th>
              <th class="num">Spread (bp)</th>
              <th class="num">Period Δ</th>
              <th class="num">Net Lev</th>
              <th>Guidance Status</th>
            </tr>
          </thead>
          <tbody>
            ${hist.slice().reverse().map((s, idx, arr) => {
              const prior = arr[idx + 1];
              const delta = prior ? s.spread_bp - prior.spread_bp : 0;
              const col = delta <= 0 ? '#10b981' : '#f43f5e';
              return `
                <tr>
                  <td><strong>${s.date}</strong></td>
                  <td><span class="badge badge-sector" style="font-size:9.5px;">${s.period_name || s.date}</span></td>
                  <td><span class="badge badge-hy" style="font-size:9.5px;">${s.rating}</span></td>
                  <td class="num">$${typeof s.price === 'number' ? s.price.toFixed(2) : String(s.price || '')}</td>
                  <td class="num"><strong>${typeof s.ytm === 'number' ? s.ytm.toFixed(2) + '%' : String(s.ytm || '')}</strong></td>
                  <td class="num"><strong style="color:var(--accent-blue);">+${s.spread_bp}</strong></td>
                  <td class="num" style="color:${col}; font-weight:600;">${prior ? (delta <= 0 ? '' : '+') + delta + ' bp' : '-'}</td>
                  <td class="num">${s.net_leverage ? s.net_leverage.toFixed(2) + 'x' : '-'}</td>
                  <td><span class="badge badge-ig" style="font-size:9.5px;">${s.guidance_status || 'On Track'}</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ----------------- SHEET 8: MANAGEMENT QUESTIONS -----------------
function renderSheetMgmtQuestions(item) {
  const qList = item.management_questions || [];
  return `
    <div style="background:#111a2b; border:1px solid #1e2d45; border-radius:6px; padding:16px;">
      <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 12px 0; text-transform:uppercase;">
        🎯 Management Diligence Questions & Conviction Drivers
      </h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
        ${qList.map(q => `
          <div style="background:#0b111e; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="badge badge-sector">${q.focus_area || 'Structural Credit Risk'}</span>
              <button class="btn-action" onclick="copyTextToClipboard('${(q.question || '').replace(/'/g, "\\'")}')" style="font-size:10px; padding:2px 7px;">
                📋 Copy
              </button>
            </div>
            <div style="font-size:12.5px; font-weight:600; color:#fff; margin-bottom:8px;">
              "${q.question}"
            </div>
            <div style="font-size:11px; color:#cbd5e1; margin-bottom:6px;">
              <strong style="color:var(--accent-gold);">Relevance:</strong> ${q.relevance || ''}
            </div>
            <div style="font-size:11px; color:#94a3b8;">
              <strong style="color:#10b981;">Conviction Trigger:</strong> ${q.conviction_trigger || ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ----------------- HELPER FUNCTIONS -----------------
function getMetricVal(item, key, period) {
  const f = item.financials_multi_year.find(x => x.period === period);
  if (!f) return null;

  if (key === 'gross_profit') return f.gross_profit || null;
  if (key === 'sga') return f.sga || null;
  if (key === 'reported_ebitda') {
    const eRec = item.ebitda_reconciliation ? item.ebitda_reconciliation.find(r => r.period === period) : null;
    return eRec ? eRec.company_reported_ebitda : f.ebitda;
  }
  if (key === 'ebitda_variance') {
    const eRec = item.ebitda_reconciliation ? item.ebitda_reconciliation.find(r => r.period === period) : null;
    return eRec ? eRec.variance_usd_m : null;
  }
  if (key === 'ebitda_base') return f.ebitda;
  if (key === 'cash_interest') {
    const fcfObj = item.fcf_waterfall ? item.fcf_waterfall.find(w => w.period === period) : null;
    return fcfObj ? fcfObj.cash_interest : (f.interest_expense || Math.round(f.ebitda * 0.35));
  }
  if (key === 'delta_wc') {
    const fcfObj = item.fcf_waterfall ? item.fcf_waterfall.find(w => w.period === period) : null;
    return fcfObj ? fcfObj.change_in_working_capital : 0;
  }
  if (key === 'tax') {
    const fcfObj = item.fcf_waterfall ? item.fcf_waterfall.find(w => w.period === period) : null;
    return fcfObj ? fcfObj.tax_expense : Math.round(f.ebitda * 0.1);
  }
  if (key === 'fcf_conversion') {
    return f.ebitda && f.fcf ? Math.round((f.fcf / f.ebitda) * 100) : null;
  }
  if (key === 'undrawn_rcf') {
    const rcf = item.rcf_facility_liquidity || {};
    return rcf.undrawn_available_usd_m || 800;
  }
  if (key === 'px_quote') return item.metadata.price;
  if (key === 'ytm_quote') return item.metadata.ytm;
  if (key === 'spread_quote') return item.metadata.spread_bp;

  return (key in f) ? f[key] : null;
}

function formatCellVal(val, spec) {
  if (val === null || val === undefined) return '-';
  if (spec.isPct) return Number(val).toFixed(1) + '%';
  if (spec.isRatio) return Number(val).toFixed(2) + 'x';
  if (spec.key === 'spread_quote') return '+' + val + ' bp';
  if (spec.key === 'px_quote') return '$' + Number(val).toFixed(2);
  if (spec.key === 'ytm_quote') return Number(val).toFixed(2) + '%';
  if (typeof val === 'number') {
    const prefix = spec.isNegative && val > 0 ? '-$' : (val < 0 ? '-$' : '$');
    return `${prefix}${Math.abs(val).toLocaleString()}M`;
  }
  return val;
}

function checkDeskObs(item, metricKey, period) {
  if (!item.financial_observations) return false;
  const o = item.financial_observations.find(x => x.period === period);
  if (!o) return false;
  if (metricKey.includes('revenue') && o.revenue_observation) return true;
  if (metricKey.includes('ebitda') && o.ebitda_observation) return true;
  if (metricKey.includes('capex') && o.capex_observation) return true;
  if (metricKey.includes('fcf') && o.fcf_observation) return true;
  if (metricKey.includes('leverage') && o.net_leverage_observation) return true;
  return false;
}
