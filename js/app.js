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
            <button class="drawer-nav-btn" data-tab="tab-intel" onclick="switchDrawerTab('${m.id}', 'tab-intel')">
              📝 Institutional Intelligence & Footnotes (${item.annotations.length})
            </button>
          </div>
          
          <!-- PANE 1: 7-YEAR MULTI-PERIOD FINANCIALS -->
          <div class="drawer-pane active" data-pane="tab-fin">
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
            ${isUkrRail ? `
              <table class="drawer-table">
                <thead>
                  <tr>
                    <th>Tranche / Facility Name</th>
                    <th>Instrument</th>
                    <th>Currency</th>
                    <th class="num">Outstanding ($M Eq.)</th>
                    <th class="num">Coupon / Margin</th>
                    <th class="num">Price</th>
                    <th>Guarantee / Status</th>
                    <th>Standstill / Restructuring Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>RAILUA 8.250% due July 2026</strong></td>
                    <td>Eurobond / LPN</td>
                    <td>USD</td>
                    <td class="num">$595.0M</td>
                    <td class="num">8.250%</td>
                    <td class="num" style="color:var(--accent-gold); font-weight:700;">$64.00</td>
                    <td><span class="badge badge-stress">Senior Unsecured</span></td>
                    <td>Moratorium extended through 2026 under Sovereign G7 umbrella; coupon capitalized (PIK).</td>
                  </tr>
                  <tr>
                    <td><strong>RAILUA 7.875% due July 2028</strong></td>
                    <td>Eurobond / LPN</td>
                    <td>USD</td>
                    <td class="num">$300.0M</td>
                    <td class="num">7.875%</td>
                    <td class="num" style="color:var(--accent-gold); font-weight:700;">$58.50</td>
                    <td><span class="badge badge-stress">Senior Unsecured</span></td>
                    <td>Moratorium extended through 2026; subject to 2026 debt resolution.</td>
                  </tr>
                  <tr>
                    <td><strong>EBRD Emergency Liquidity Facility</strong></td>
                    <td>Senior Loan</td>
                    <td>EUR</td>
                    <td class="num">$178.0M (€165M)</td>
                    <td class="num">Euribor + 2.50%</td>
                    <td class="num">100.00</td>
                    <td><span class="badge badge-ig">100% Sovereign Guaranteed</span></td>
                    <td>Exempt from commercial creditor haircut; multilateral preferred creditor status.</td>
                  </tr>
                  <tr>
                    <td><strong>EBRD Electric Rolling Stock Facility</strong></td>
                    <td>Project Loan</td>
                    <td>EUR</td>
                    <td class="num">$232.0M (€215M)</td>
                    <td class="num">Euribor + 2.25%</td>
                    <td class="num">100.00</td>
                    <td><span class="badge badge-ig">100% Sovereign Guaranteed</span></td>
                    <td>Actively disbursing for track renewals and locomotive modernization.</td>
                  </tr>
                  <tr>
                    <td><strong>EIB Priority Rail Infrastructure Loan</strong></td>
                    <td>Project Loan</td>
                    <td>EUR</td>
                    <td class="num">$280.0M (€260M)</td>
                    <td class="num">Euribor + 1.85%</td>
                    <td class="num">100.00</td>
                    <td><span class="badge badge-ig">100% Sovereign Guaranteed</span></td>
                    <td>Long-term concessionary infrastructure financing for Solidarity Lanes.</td>
                  </tr>
                  <tr>
                    <td><strong>Domestic State Banks (Oschadbank, Ukreximbank)</strong></td>
                    <td>Credit Lines</td>
                    <td>UAH / USD</td>
                    <td class="num">$85.0M</td>
                    <td class="num">NBU Key + 3.0%</td>
                    <td class="num">100.00</td>
                    <td><span class="badge badge-hy">Domestic Senior</span></td>
                    <td>Performing revolving working capital lines rolled over annually.</td>
                  </tr>
                  <tr style="background:#131e30; font-weight:700;">
                    <td colspan="3"><strong>TOTAL CONSOLIDATED GROSS DEBT</strong></td>
                    <td class="num" style="color:#fff;">$1,730.0M</td>
                    <td colspan="2"></td>
                    <td colspan="2"><span style="color:#94a3b8;">Cash: $265.0M | Net Debt: $1,465.0M | Net Lev: 3.86x</span></td>
                  </tr>
                </tbody>
              </table>
              
              <div style="margin-top:16px; background:#131d2e; border:1px solid #1e2d45; border-radius:6px; padding:14px;">
                <h4 style="color:var(--accent-gold); font-size:12px; margin:0 0 10px 0; text-transform:uppercase;">
                  Debt Maturity Wall Profile (USD Millions)
                </h4>
                <div style="display:flex; gap:12px; align-items:flex-end; height:70px; padding:10px 0 0 0;">
                  <div style="flex:1; text-align:center;">
                    <div style="color:#94a3b8; font-size:11px; margin-bottom:4px;">$85M</div>
                    <div style="background:#3b82f6; height:20px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:#fff; font-size:11px; font-weight:700; margin-top:4px;">2025</div>
                  </div>
                  <div style="flex:1; text-align:center;">
                    <div style="color:var(--accent-gold); font-size:11px; font-weight:700; margin-bottom:4px;">$595M</div>
                    <div style="background:#f59e0b; height:60px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:var(--accent-gold); font-size:11px; font-weight:700; margin-top:4px;">2026 (LPN)</div>
                  </div>
                  <div style="flex:1; text-align:center;">
                    <div style="color:#94a3b8; font-size:11px; margin-bottom:4px;">$110M</div>
                    <div style="background:#3b82f6; height:25px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:#fff; font-size:11px; font-weight:700; margin-top:4px;">2027</div>
                  </div>
                  <div style="flex:1; text-align:center;">
                    <div style="color:var(--accent-gold); font-size:11px; font-weight:700; margin-bottom:4px;">$300M</div>
                    <div style="background:#f59e0b; height:45px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:var(--accent-gold); font-size:11px; font-weight:700; margin-top:4px;">2028 (LPN)</div>
                  </div>
                  <div style="flex:1; text-align:center;">
                    <div style="color:#94a3b8; font-size:11px; margin-bottom:4px;">$280M</div>
                    <div style="background:#3b82f6; height:40px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:#fff; font-size:11px; font-weight:700; margin-top:4px;">2029</div>
                  </div>
                  <div style="flex:1; text-align:center;">
                    <div style="color:#94a3b8; font-size:11px; margin-bottom:4px;">$360M</div>
                    <div style="background:#3b82f6; height:50px; border-radius:3px 3px 0 0;"></div>
                    <div style="color:#fff; font-size:11px; font-weight:700; margin-top:4px;">2030+</div>
                  </div>
                </div>
              </div>
            ` : `
              <div class="kpi-mini-grid">
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">2024A Gross Debt</div>
                  <div class="kpi-mini-val">$${(f24.gross_debt || 0).toLocaleString()}M</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">Cash & Equivalents</div>
                  <div class="kpi-mini-val">$${(f24.cash || 0).toLocaleString()}M</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">Net Debt</div>
                  <div class="kpi-mini-val">$${(f24.net_debt || 0).toLocaleString()}M</div>
                </div>
                <div class="kpi-mini-tile">
                  <div class="kpi-mini-label">Total Debt Maturity Wall</div>
                  <div class="kpi-mini-val">$${(debt.total_outstanding_usd_m || f24.gross_debt || 0).toLocaleString()}M</div>
                </div>
              </div>
              <table class="drawer-table">
                <thead>
                  <tr>
                    <th>Maturity Year</th>
                    <th class="num">Amount Due ($M)</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(debt).filter(([k]) => k !== 'total_outstanding_usd_m').map(([yr, amt]) => `
                    <tr>
                      <td><strong>${yr.replace('_plus', '+')}</strong></td>
                      <td class="num">$${amt.toFixed(1)}M</td>
                      <td>${yr === '2025' || yr === '2026' ? 'Near-term refinancing maturity' : 'Medium-to-long term debt amortization'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
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
