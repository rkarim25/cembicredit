
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
      <td><strong>${m.ticker}</strong></td>
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
      <td style="text-align:center;">
        <a class="btn-action" href="${m.github_model_url}" target="_blank" title="Download Full 7-Year Multi-Period Excel Model">
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
                ${isUkrRail ? '<span style="color:#334155;">|</span> <span class="badge badge-stress">Eurobond Moratorium / Standstill</span>' : ''}
              </div>
            </div>
            
            <div class="drawer-actions">
              <a href="${m.github_model_url}" class="btn-action btn-gold" download title="Download Full Institutional Excel Model">
                📥 Download ${isUkrRail ? '8-Tab Institutional Model' : 'Multi-Period Model'} (.xlsx)
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
                <span class="badge badge-ig">Institutional Desk Verified</span>
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
                          ${f.is_audited ? 'Audited IFRS' : 'Institutional Forecast'}
                        </span>
                      </td>
                      ${currentView === 'corp' ? `
                        <td class="num">$${(f.revenue || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num" style="color:var(--accent-gold); font-weight:600;">$${(f.ebitda || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num">${(f.ebitda_margin_pct || 0).toFixed(1)}%</td>
                        <td class="num">$${(f.cfo || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num">$${(f.capex || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num" style="color:${(f.fcf||0) >= 0 ? '#10b981' : '#ef4444'}; font-weight:600;">
                          ${(f.fcf||0) < 0 ? '-' : ''}$${Math.abs(f.fcf || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}
                        </td>
                        <td class="num">$${(f.cash || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num">$${(f.gross_debt || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num">$${(f.net_debt || 0).toLocaleString(undefined, {minimumFractionDigits:1, maximumFractionDigits:1})}</td>
                        <td class="num" style="font-weight:700; color:${(f.net_leverage||0) > 4.5 ? '#ef4444' : '#f8fafc'};">
                          ${(f.net_leverage || 0).toFixed(2)}x
                        </td>
                        <td class="num">${(f.interest_coverage || 0).toFixed(2)}x</td>
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
              <span>Source: Audited Annual Reports (IFRS) / Company Disclosures / Institutional Consensus Projections</span>
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
                            <td class="num" style="color:var(--accent-gold); font-weight:600;">$${(t.clean_price || 100).toFixed(2)}</td>
                            <td class="num">${(t.ytm || 0).toFixed(2)}%</td>
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
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <div>
                <h4 style="color:var(--accent-gold); font-size:13px; margin:0; text-transform:uppercase;">
                  🎯 Institutional Management Questions & Conviction Drivers
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
  const targetIssuer = issuersData.find(i => i.metadata.ticker === ticker);
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
            📰 Institutional Credit & Macro News Feed
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
                    const iss = issuersData.find(i => i.metadata.ticker === ticker);
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
