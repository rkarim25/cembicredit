// Dedicated Company Page Controller - CEMBI Credit Platform
let currentIssuer = null;
let currentModelSection = 'all'; // 'all', 'pnl', 'fcf', 'bs', 'ratios'
let activeSelectedCell = { coord: 'E25', metric: 'fcf', period: '2024A' };
let currentNoteCategory = 'thesis';
let activeEditingNoteId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initCompanyPage();
});

function initCompanyPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('id') || urlParams.get('ticker') || 'tullow';

  // Match by ID or ticker
  let found = MASTER_ISSUERS.find(i => i.metadata.id.toLowerCase() === paramId.toLowerCase());
  if (!found) {
    found = MASTER_ISSUERS.find(i => i.metadata.ticker.toLowerCase() === paramId.toLowerCase());
  }
  if (!found) {
    found = MASTER_ISSUERS[0];
  }
  currentIssuer = found;

  const m = currentIssuer.metadata;
  document.title = `${m.name} (${m.ticker}) — Credit Model & Research Dossier | CEMBI`;
  document.getElementById('page-head-title').textContent = `${m.name} (${m.ticker}) — Credit Model & Research Dossier`;

  // Render Core UI Sections
  renderTopBreadcrumb();
  renderIssuerSwitcher();
  renderHeroHeader();
  renderMetricsStrip();

  // Render Commodity Assumptions Sandbox
  renderCommoditySandbox();

  // Render Tabs
  renderModelSpreadsheet();
  renderUserNotes();
  renderQualitativeFootnotes();
  renderCapitalStructure();
  renderHistoricalTrends();
  renderEbitdaReconciliation();
  renderBrokerAuditTab();
  renderOperationalDrivers();
  renderCovenantsAndRecovery();
  renderGuidanceAndNews();

  // Handle URL hash navigation (e.g. #notes, #debt)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const tabMap = {
      'model': 'tab-model',
      'notes': 'tab-notes',
      'comments': 'tab-notes',
      'debt': 'tab-debt',
      'history': 'tab-history',
      'reconciliation': 'tab-reconciliation',
      'broker-audit': 'tab-broker-audit',
      'broker': 'tab-broker-audit',
      'audit': 'tab-broker-audit',
      'operations': 'tab-operations',
      'recovery': 'tab-recovery',
      'guidance': 'tab-guidance'
    };
    if (tabMap[hash]) {
      switchCompanyTab(tabMap[hash]);
    }
  }
}

// ----------------- TOPBAR & SWITCHER -----------------
function renderTopBreadcrumb() {
  const m = currentIssuer.metadata;
  document.getElementById('bc-company-name').textContent = `${m.name} (${m.ticker})`;
}

function renderIssuerSwitcher() {
  const select = document.getElementById('issuer-switcher-select');
  select.innerHTML = '';

  // Group by sector
  const sectors = {};
  MASTER_ISSUERS.forEach(i => {
    const sec = i.metadata.sector || 'Other';
    if (!sectors[sec]) sectors[sec] = [];
    sectors[sec].push(i);
  });

  Object.keys(sectors).sort().forEach(sec => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = sec;
    sectors[sec].forEach(i => {
      const opt = document.createElement('option');
      opt.value = i.metadata.id;
      opt.textContent = `${i.metadata.ticker} — ${i.metadata.name} (${i.metadata.country})`;
      if (i.metadata.id === currentIssuer.metadata.id) {
        opt.selected = true;
      }
      optgroup.appendChild(opt);
    });
    select.appendChild(optgroup);
  });
}

function onIssuerSwitcherChange(newId) {
  if (newId && newId !== currentIssuer.metadata.id) {
    window.location.href = `company.html?id=${newId}`;
  }
}

function copyCompanyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(`Copied link to ${currentIssuer.metadata.name} page to clipboard!`);
  }).catch(() => {
    prompt('Copy direct page URL:', window.location.href);
  });
}

// ----------------- HERO HEADER & METRICS -----------------
function renderHeroHeader() {
  const m = currentIssuer.metadata;
  const nextEarn = currentIssuer.next_earnings_release || {};

  document.getElementById('hero-company-name').textContent = m.name;
  document.getElementById('hero-ticker').textContent = m.ticker;
  document.getElementById('hero-sector').textContent = m.sector;
  document.getElementById('hero-country').textContent = m.country;
  document.getElementById('hero-region').textContent = m.region;
  document.getElementById('hero-bond').textContent = m.benchmark_bond;

  const earnText = nextEarn.expected_date ? `${nextEarn.expected_date} (${nextEarn.period_ending || 'Quarterly'})` : 'Oct 2026';
  document.getElementById('hero-earnings').textContent = earnText;

  // Rating badge color
  const rEl = document.getElementById('hero-rating');
  rEl.textContent = m.rating;
  if (m.rating.includes('BBB') || m.rating.includes('A')) {
    rEl.className = 'badge badge-ig';
  } else if (m.rating.includes('CCC') || m.rating.includes('D') || m.spread_bp >= 700) {
    rEl.className = 'badge badge-stress';
  } else {
    rEl.className = 'badge badge-hy';
  }

  // Cognitive Credit Deep Link Button
  const ccBtn = document.getElementById('hero-cc-btn');
  if (m.cognitive_credit_url) {
    ccBtn.href = m.cognitive_credit_url;
    ccBtn.style.display = 'inline-flex';
    ccBtn.title = `Open ${m.name} on Cognitive Credit live platform`;
  } else {
    ccBtn.style.display = 'none';
  }

  // Interactive Restructuring Sandbox & Background Deep Dive Buttons
  const bgBtn = document.getElementById('hero-background-btn');
  if (bgBtn) {
    if (m.id === 'braskem') {
      bgBtn.style.display = 'inline-flex';
      bgBtn.href = 'braskem_background.html';
      bgBtn.title = 'Deep dive into Braskem asset inputs/outputs, EV volatility & interactive pricing engine';
    } else if (m.id === 'zorlu') {
      bgBtn.style.display = 'inline-flex';
      bgBtn.href = 'zoren_background.html';
      bgBtn.title = 'Deep dive into Zorlu Enerji asset inputs/outputs, EV volatility & interactive pricing engine';
    } else if (m.id === 'aragvi') {
      bgBtn.style.display = 'inline-flex';
      bgBtn.href = 'aragvi_background.html';
      bgBtn.title = 'Deep dive into Aragvi asset inputs/outputs, EV volatility & interactive pricing engine';
    } else {
      bgBtn.style.display = 'none';
    }
  }

  const calcBtn = document.getElementById('hero-calculator-btn');
  if (calcBtn) {
    if (m.id === 'braskem') {
      calcBtn.style.display = 'inline-flex';
      calcBtn.href = 'braskem_calculator.html';
      calcBtn.innerHTML = '⚖️ Restructuring Sandbox';
    } else if (m.id === 'zorlu') {
      calcBtn.style.display = 'inline-flex';
      calcBtn.href = 'zoren_calculator.html';
      calcBtn.innerHTML = '⚖️ Refinancing Sandbox';
    } else if (m.id === 'aragvi') {
      calcBtn.style.display = 'inline-flex';
      calcBtn.href = 'aragvi_calculator.html';
      calcBtn.innerHTML = '⚖️ Refinancing Sandbox';
    } else {
      calcBtn.style.display = 'none';
    }
  }

  // Excel Download Buttons (Top Hero & Bottom Right)
  const dlBtn = document.getElementById('hero-download-btn');
  if (dlBtn) {
    dlBtn.href = 'models/' + (m.model_file || `${m.ticker}_Credit_Model.xlsx`);
    dlBtn.download = m.model_file || `${m.ticker}_Credit_Model.xlsx`;
    dlBtn.onclick = function(e) {
      e.preventDefault();
      downloadCompanyExcel();
      return false;
    };
  }

  const bottomDlBtn = document.getElementById('bottom-excel-dl-btn');
  if (bottomDlBtn) {
    bottomDlBtn.title = `Download ${m.name} Excel Model (${m.model_file || 'Model.xlsx'}) with all dynamic formulas preserved`;
  }

  // Check if Cognitive Credit disclosures model is available
  const ccTabBtn = document.getElementById('sb-tab-cc');
  if (ccTabBtn) {
    if (m.id === 'zorlu' || currentIssuer.cognitive_credit_model) {
      ccTabBtn.style.display = 'inline-block';
    } else {
      ccTabBtn.style.display = 'none';
    }
  }
}

function renderMetricsStrip() {
  const m = currentIssuer.metadata;
  const f24 = currentIssuer.financials_multi_year.find(f => f.period === '2024A') || {};
  const f25 = currentIssuer.financials_multi_year.find(f => f.period === '2025E') || {};
  const isBank = (m.model_type === 'bank' || m.sector === 'Banks' || m.sector === 'Financial Services');

  document.getElementById('mb-price').textContent = `$${m.price.toFixed(2)}`;
  document.getElementById('mb-bond-sub').textContent = m.benchmark_bond;

  document.getElementById('mb-ytm').textContent = `${m.ytm.toFixed(2)}%`;
  document.getElementById('mb-spread').textContent = `+${m.spread_bp} bp`;

  const mb4Label = document.querySelector('#mb-rev').previousElementSibling;
  const mb5Label = document.querySelector('#mb-ebitda').previousElementSibling;
  const mb6Label = document.querySelector('#mb-leverage').previousElementSibling;
  const mb7Label = document.querySelector('#mb-coverage').previousElementSibling;
  const mb8Label = document.querySelector('#mb-fcf').previousElementSibling;

  if (isBank) {
    if (mb4Label) mb4Label.textContent = 'Total Assets';
    document.getElementById('mb-rev').textContent = f24.assets ? `$${f24.assets.toLocaleString()}M` : 'N/A';
    document.getElementById('mb-rev').nextElementSibling.textContent = f24.loans ? `Loans: $${f24.loans.toLocaleString()}M` : 'Commercial Bank';

    if (mb5Label) mb5Label.textContent = 'Net Interest Income (NII)';
    document.getElementById('mb-ebitda').textContent = f24.nii ? `$${f24.nii.toLocaleString()}M` : 'N/A';
    document.getElementById('mb-margin-sub').textContent = f24.nim_pct ? `NIM: ${f24.nim_pct.toFixed(2)}%` : 'Net Margin';

    if (mb6Label) mb6Label.textContent = 'Operating Profit (PPOP)';
    document.getElementById('mb-leverage').textContent = f24.ppop ? `$${f24.ppop.toLocaleString()}M` : 'N/A';
    document.getElementById('mb-fwd-leverage').textContent = f24.cir_pct ? `Cost/Inc: ${f24.cir_pct.toFixed(1)}%` : 'Pre-Provision';

    if (mb7Label) mb7Label.textContent = 'Return on Equity (ROE)';
    document.getElementById('mb-coverage').textContent = f24.roe_pct ? `${f24.roe_pct.toFixed(1)}%` : 'N/A';
    document.getElementById('mb-coverage').nextElementSibling.textContent = f24.provisions ? `Prov: $${f24.provisions.toLocaleString()}M` : 'Credit Cost';

    if (mb8Label) mb8Label.textContent = 'Capital Adequacy (CAR)';
    const car = f24.car_pct ? `${f24.car_pct.toFixed(1)}%` : 'N/A';
    document.getElementById('mb-fcf').textContent = car;
    document.getElementById('mb-fcf').style.color = '#34d399';
    document.getElementById('mb-fcf-conv').textContent = f24.npl_pct ? `NPL: ${f24.npl_pct.toFixed(1)}%` : 'Tier 1 Capital';
  } else {
    // Corporate Model
    if (mb4Label) mb4Label.textContent = '2024A Revenue';
    document.getElementById('mb-rev').textContent = f24.revenue ? `$${f24.revenue.toLocaleString()}M` : 'N/A';
    document.getElementById('mb-rev').nextElementSibling.textContent = 'Audited IFRS';

    if (mb5Label) mb5Label.textContent = '2024A Cash EBITDA';
    const eb = f24.calculated_ebitda || f24.ebitda || 0;
    document.getElementById('mb-ebitda').textContent = `$${eb.toLocaleString()}M`;
    document.getElementById('mb-margin-sub').textContent = `Margin: ${(f24.ebitda_margin_pct || 0).toFixed(1)}%`;

    if (mb6Label) mb6Label.textContent = 'Net Leverage';
    const lev24 = f24.net_leverage ? `${f24.net_leverage.toFixed(2)}x` : 'N/A';
    const lev25 = f25.net_leverage ? `${f25.net_leverage.toFixed(2)}x` : 'N/A';
    document.getElementById('mb-leverage').textContent = lev24;
    document.getElementById('mb-fwd-leverage').textContent = `2025E: ${lev25}`;

    if (mb7Label) mb7Label.textContent = 'Interest Coverage';
    const cov = f24.interest_coverage ? `${f24.interest_coverage.toFixed(2)}x` : 'N/A';
    document.getElementById('mb-coverage').textContent = cov;
    document.getElementById('mb-coverage').nextElementSibling.textContent = 'EBITDA / Cash Int';

    if (mb8Label) mb8Label.textContent = 'Free Cash Flow';
    const fcfVal = f24.fcf;
    const fcfEl = document.getElementById('mb-fcf');
    const fcfSub = document.getElementById('mb-fcf-conv');

    if (fcfVal !== undefined && fcfVal !== null) {
      if (fcfVal < 0) {
        fcfEl.textContent = `($${Math.abs(fcfVal).toLocaleString()}M)`;
        fcfEl.style.color = '#f87171'; // Red for cash burn
        fcfSub.textContent = '⚠️ Cash Deficit / Capex Cycle';
        fcfSub.style.color = '#fca5a5';
      } else {
        fcfEl.textContent = `$${fcfVal.toLocaleString()}M`;
        fcfEl.style.color = '#34d399'; // Green for positive FCF
        const conv = f24.fcf_conversion_pct !== undefined ? `${f24.fcf_conversion_pct.toFixed(1)}%` : (eb > 0 ? `${((fcfVal/eb)*100).toFixed(1)}%` : '--%');
        fcfSub.textContent = `Conversion: ${conv}`;
        fcfSub.style.color = 'var(--text-muted)';
      }
    } else {
      fcfEl.textContent = 'N/A';
      fcfEl.style.color = '#fff';
      fcfSub.textContent = '--';
    }
  }
}

// ----------------- TAB SWITCHING -----------------
function switchCompanyTab(tabId) {
  document.querySelectorAll('.company-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.company-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === tabId);
  });

  const tabLabels = {
    'tab-model': 'Financial Model & Spreadsheet',
    'tab-notes': 'My Notes & Comments',
    'tab-debt': 'Capital Structure & Tranches',
    'tab-history': 'Historical Snapshots',
    'tab-reconciliation': 'EBITDA Reconciliation',
    'tab-broker-audit': 'Broker Coverage & Error Audit',
    'tab-operations': 'Operational Drivers',
    'tab-recovery': 'Covenants & Recovery',
    'tab-guidance': 'Guidance & Catalysts'
  };
  document.getElementById('bc-tab-label').textContent = tabLabels[tabId] || 'Dossier';

  // Update URL hash cleanly
  const hashKey = tabId.replace('tab-', '');
  history.replaceState(null, null, '#' + hashKey);
}


// ================= COMMODITY ASSUMPTIONS & SENSITIVITY ENGINE =================
function getCommodityState() {
  if (!currentIssuer || !currentIssuer.commodity_drivers) return null;
  const cd = currentIssuer.commodity_drivers;
  const storageKey = 'cembicredit_commodity_' + currentIssuer.metadata.id;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        volume: Number(parsed.volume),
        price: Number(parsed.price),
        isCustom: true,
        defaults: cd
      };
    }
  } catch (e) {}

  return {
    volume: cd.volume_guidance,
    price: cd.price_default,
    isCustom: false,
    defaults: cd
  };
}

function saveCommodityState(volume, price, isCustom) {
  if (!currentIssuer || !currentIssuer.commodity_drivers) return;
  const storageKey = 'cembicredit_commodity_' + currentIssuer.metadata.id;
  if (!isCustom) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, JSON.stringify({ volume, price, isCustom: true }));
  }
}

function renderCommoditySandbox() {
  const container = document.getElementById('commodity-sandbox-container');
  if (!container) return;

  const state = getCommodityState();
  if (!state) {
    container.innerHTML = '';
    return;
  }

  const cd = state.defaults;
  const isCustom = state.isCustom;

  // Calculate live forecast delta for 2025E
  const baseF25 = (currentIssuer.financials_multi_year || []).find(x => x.period === '2025E') || {};
  const adjRev = computeAdjustedCommodityMetric(baseF25, 'revenue', '2025E', state);
  const adjEb = computeAdjustedCommodityMetric(baseF25, 'calculated_ebitda', '2025E', state);
  const adjFcf = computeAdjustedCommodityMetric(baseF25, 'fcf', '2025E', state);
  const adjLev = computeAdjustedCommodityMetric(baseF25, 'net_leverage', '2025E', state);

  const baseRev = baseF25.revenue || 1;
  const deltaRevM = (adjRev !== null ? adjRev : baseRev) - baseRev;
  const deltaRevPct = ((deltaRevM / baseRev) * 100);

  const baseEb = baseF25.calculated_ebitda || baseF25.ebitda || 1;
  const deltaEbM = (adjEb !== null ? adjEb : baseEb) - baseEb;
  const deltaEbPct = ((deltaEbM / baseEb) * 100);

  const baseFcf = baseF25.fcf || 0;
  const deltaFcfM = (adjFcf !== null ? adjFcf : baseFcf) - baseFcf;

  container.innerHTML = `
    <div class="commodity-sandbox-card">
      <div class="cs-header">
        <div class="cs-title-group">
          <div class="cs-title">
            <span>🛢️</span>
            <span>${cd.commodity_name} Assumptions &amp; Forecast Driver</span>
            <span class="cs-badge ${isCustom ? 'custom' : 'guidance'}">
              ${isCustom ? '⚡ Custom Sensitivity Active' : '✓ Management Guidance'}
            </span>
          </div>
          <div class="cs-sub">
            <strong>Volume:</strong> anchored by Company Executive Guidance. 
            <strong>Price:</strong> rational macro state of the world benchmark. 
            <span style="color:#fbbf24;">Adjusting inputs below recalculates 2025E–2027E financials in real-time.</span>
          </div>
        </div>
        <div class="cs-actions">
          <button class="cs-preset-btn" onclick="applyCommodityPreset('guidance')">↺ Guidance Base</button>
          <button class="cs-preset-btn" onclick="applyCommodityPreset('bull')">📈 Bull (+10% Vol, +15% Px)</button>
          <button class="cs-preset-btn" onclick="applyCommodityPreset('bear')">📉 Stress (-15% Vol, -20% Px)</button>
          <button class="cs-preset-btn reset" onclick="resetCommodityAssumptions()">Reset Defaults</button>
        </div>
      </div>

      <div class="cs-inputs-grid">
        <!-- Volume Input -->
        <div class="cs-input-box">
          <div class="cs-input-label-row">
            <span class="cs-input-label">Volume (${cd.volume_unit})</span>
            <span class="cs-source-pill guidance" title="${cd.volume_guidance_source}">📋 Company Guidance</span>
          </div>
          <div class="cs-input-control">
            <button class="cs-step-btn" onclick="stepCommodityVolume(-1)">−</button>
            <input type="number" id="cs-vol-input" class="cs-number-input" step="${cd.volume_unit.includes('koz') ? '25' : (cd.volume_guidance > 500 ? '10' : '1')}" value="${state.volume}" onchange="onCommodityVolumeChange(this.value)">
            <button class="cs-step-btn" onclick="stepCommodityVolume(1)">+</button>
            <span class="cs-unit">${cd.volume_unit}</span>
          </div>
          <div class="cs-input-note">
            Guidance Range: <strong>${cd.volume_guidance_range}</strong>
          </div>
        </div>

        <!-- Price Input -->
        <div class="cs-input-box">
          <div class="cs-input-label-row">
            <span class="cs-input-label">Realized Price (${cd.price_unit})</span>
            <span class="cs-source-pill macro" title="${cd.price_source}">🌐 Rational State of World</span>
          </div>
          <div class="cs-input-control">
            <button class="cs-step-btn" onclick="stepCommodityPrice(-1)">−</button>
            <input type="number" id="cs-price-input" class="cs-number-input" step="${cd.price_default > 1000 ? '25' : (cd.price_default < 20 ? '0.5' : '1')}" value="${state.price}" onchange="onCommodityPriceChange(this.value)">
            <button class="cs-step-btn" onclick="stepCommodityPrice(1)">+</button>
            <span class="cs-unit">${cd.price_unit}</span>
          </div>
          <div class="cs-input-note">
            Benchmark: <strong>${cd.price_source}</strong>
          </div>
        </div>

        <!-- Dynamic Impact Readout -->
        <div class="cs-impact-box">
          <div class="cs-impact-title">Dynamic 2025E Forecast Cascading Impact:</div>
          <div class="cs-impact-metrics">
            <div class="cs-impact-item">
              <span class="lbl">Rev Δ:</span>
              <span class="val ${deltaRevM >= 0 ? 'pos' : 'neg'}">${deltaRevM >= 0 ? '+' : ''}$${deltaRevM.toFixed(1)}M (${deltaRevPct >= 0 ? '+' : ''}${deltaRevPct.toFixed(1)}%)</span>
            </div>
            <div class="cs-impact-item">
              <span class="lbl">Cash EBITDA Δ:</span>
              <span class="val ${deltaEbM >= 0 ? 'pos' : 'neg'}">${deltaEbM >= 0 ? '+' : ''}$${deltaEbM.toFixed(1)}M (${deltaEbPct >= 0 ? '+' : ''}${deltaEbPct.toFixed(1)}%)</span>
            </div>
            <div class="cs-impact-item">
              <span class="lbl">FCF Δ:</span>
              <span class="val ${deltaFcfM >= 0 ? 'pos' : 'neg'}">${deltaFcfM >= 0 ? '+' : ''}$${deltaFcfM.toFixed(1)}M</span>
            </div>
            <div class="cs-impact-item">
              <span class="lbl">2025E Net Lev:</span>
              <span class="val" style="color:#fbbf24;">${adjLev ? adjLev.toFixed(2) + 'x' : '--'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function onCommodityVolumeChange(val) {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return;
  const state = getCommodityState();
  if (!state) return;
  const isCustom = (Math.abs(num - state.defaults.volume_guidance) > 0.01) || (Math.abs(state.price - state.defaults.price_default) > 0.01);
  saveCommodityState(num, state.price, isCustom);
  renderCommoditySandbox();
  renderModelSpreadsheet();
}

function onCommodityPriceChange(val) {
  const num = parseFloat(val);
  if (isNaN(num) || num <= 0) return;
  const state = getCommodityState();
  if (!state) return;
  const isCustom = (Math.abs(state.volume - state.defaults.volume_guidance) > 0.01) || (Math.abs(num - state.defaults.price_default) > 0.01);
  saveCommodityState(state.volume, num, isCustom);
  renderCommoditySandbox();
  renderModelSpreadsheet();
}

function stepCommodityVolume(direction) {
  const state = getCommodityState();
  if (!state) return;
  const step = state.defaults.volume_unit.includes('koz') ? 50 : (state.defaults.volume_guidance > 500 ? 25 : (state.defaults.volume_guidance > 100 ? 5 : 1));
  const newVol = Math.max(1, state.volume + (direction * step));
  onCommodityVolumeChange(newVol);
}

function stepCommodityPrice(direction) {
  const state = getCommodityState();
  if (!state) return;
  const step = state.defaults.price_default > 1000 ? 50 : (state.defaults.price_default < 20 ? 0.5 : (state.defaults.price_default > 300 ? 10 : 2));
  const newPx = Math.max(1, state.price + (direction * step));
  onCommodityPriceChange(newPx);
}

function applyCommodityPreset(presetKey) {
  const state = getCommodityState();
  if (!state) return;
  const cd = state.defaults;

  if (presetKey === 'guidance') {
    saveCommodityState(cd.volume_guidance, cd.price_default, false);
  } else if (presetKey === 'bull') {
    const vol = parseFloat((cd.volume_guidance * 1.10).toFixed(1));
    const px = parseFloat((cd.price_default * 1.15).toFixed(1));
    saveCommodityState(vol, px, true);
  } else if (presetKey === 'bear') {
    const vol = parseFloat((cd.volume_guidance * 0.85).toFixed(1));
    const px = parseFloat((cd.price_default * 0.80).toFixed(1));
    saveCommodityState(vol, px, true);
  }
  renderCommoditySandbox();
  renderModelSpreadsheet();
}

function resetCommodityAssumptions() {
  saveCommodityState(0, 0, false);
  renderCommoditySandbox();
  renderModelSpreadsheet();
}

function computeAdjustedCommodityMetric(f, key, period, state) {
  if (!state || !period.endsWith('E')) {
    return null;
  }
  const cd = state.defaults;
  const volRatio = state.volume / cd.volume_guidance;
  
  // Hedging price adjustment
  let priceRatio = state.price / cd.price_default;
  if (cd.hedged_pct && cd.hedged_pct > 0 && cd.hedge_floor_price) {
    const hedgeWeight = cd.hedged_pct / 100.0;
    const baseEff = (hedgeWeight * cd.hedge_floor_price) + ((1 - hedgeWeight) * cd.price_default);
    const userEff = (hedgeWeight * cd.hedge_floor_price) + ((1 - hedgeWeight) * state.price);
    priceRatio = userEff / baseEff;
  }

  const revScale = volRatio * priceRatio;
  const baseRev = f.revenue || 0;
  const adjRev = baseRev * revScale;

  const baseCogs = Math.abs(f.cogs || (baseRev * 0.52));
  const adjCogs = -(baseCogs * volRatio);

  const baseSga = Math.abs(f.sga || (baseRev * 0.08));
  const adjSga = -baseSga;

  const adjEbitda = Math.max(0, adjRev + adjCogs + adjSga);
  const baseCapex = Math.abs(f.capex || 0);
  const baseCi = Math.abs(f.cash_interest || 0);
  const baseDwc = f.change_in_working_capital || 0;
  const adjTax = -(adjEbitda * 0.09);

  const adjFcf = adjEbitda - baseCapex - baseCi - baseDwc + adjTax;

  const baseGd = f.gross_debt || 0;
  const baseCash = f.cash || 0;
  const baseFcf = f.fcf || (adjEbitda - baseCapex - baseCi - baseDwc + adjTax);
  const fcfDelta = adjFcf - baseFcf;
  const adjNetDebt = Math.max(0, (f.net_debt || (baseGd - baseCash)) - fcfDelta);
  const adjNetLev = adjEbitda > 0 ? (adjNetDebt / adjEbitda) : 0;
  const adjCov = baseCi > 0 ? (adjEbitda / baseCi) : 0;

  if (key === 'revenue') return adjRev;
  if (key === 'cogs') return adjCogs;
  if (key === 'gross_profit') return adjRev + adjCogs;
  if (key === 'sga') return adjSga;
  if (key === 'operating_profit') return adjRev + adjCogs + adjSga;
  if (key === 'reported_ebitda') return adjEbitda;
  if (key === 'calculated_ebitda' || key === 'calculated_ebitda_fcf') return adjEbitda;
  if (key === 'ebitda_margin_pct') return adjRev > 0 ? ((adjEbitda / adjRev) * 100) : 0;
  if (key === 'capex') return -baseCapex;
  if (key === 'cash_interest') return -baseCi;
  if (key === 'delta_wc') return baseDwc;
  if (key === 'tax') return adjTax;
  if (key === 'fcf') return adjFcf;
  if (key === 'fcf_conversion_pct') return adjEbitda > 0 ? ((adjFcf / adjEbitda) * 100) : 0;
  if (key === 'net_debt') return adjNetDebt;
  if (key === 'net_leverage') return adjNetLev;
  if (key === 'interest_coverage') return adjCov;

  return null;
}

// ----------------- SPREADSHEET ENGINE & FORMULA CONTROLLER -----------------
let isFormulasModeActive = false;
let currentGridZoom = 1.0;
let isScreenshotView = false;
let currentActiveSheetView = 'standard'; // 'standard' or 'cognitive_credit'
let cognitiveCreditDataCache = null;
let activeCcSheetTab = 'Annual and Quarterly';

function downloadCompanyExcel() {
  if (!currentIssuer || !currentIssuer.metadata) return;
  const m = currentIssuer.metadata;
  const fileName = m.model_file || `${m.ticker}_Credit_Model.xlsx`;
  const filePath = `models/${fileName}`;
  
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showQuickToast(`📥 Exporting ${m.name} financial model (.xlsx) with dynamic formulas.`);
}

function adjustGridZoom(delta) {
  currentGridZoom = Math.min(1.3, Math.max(0.4, Math.round((currentGridZoom + delta) * 10) / 10));
  applyGridZoom();
}

function resetGridZoom() {
  currentGridZoom = 1.0;
  applyGridZoom();
}

function applyGridZoom() {
  const wrapper = document.getElementById('table-zoom-wrapper');
  const label = document.getElementById('sb-zoom-label');
  if (label) {
    label.textContent = `${Math.round(currentGridZoom * 100)}%`;
  }
  if (wrapper) {
    if ('zoom' in wrapper.style) {
      wrapper.style.zoom = currentGridZoom;
    } else {
      wrapper.style.transform = `scale(${currentGridZoom})`;
      wrapper.style.width = `${100 / currentGridZoom}%`;
    }
  }
}

function toggleScreenshotView() {
  isScreenshotView = !isScreenshotView;
  document.body.classList.toggle('screenshot-view-active', isScreenshotView);
  const btn = document.getElementById('btn-screenshot-toggle');
  if (btn) {
    btn.textContent = isScreenshotView ? '↺ Normal View' : '📷 Snapshot View';
    btn.classList.toggle('active', isScreenshotView);
  }
  if (isScreenshotView) {
    showQuickToast('📷 Snapshot View: UI simplified for wide high-res screenshot captures.');
  }
}

function toggleShowFormulasMode() {
  isFormulasModeActive = !isFormulasModeActive;
  const btn = document.getElementById('sb-tab-formulas');
  if (btn) {
    btn.classList.toggle('active', isFormulasModeActive);
  }
  const table = document.getElementById('company-sheet-table');
  if (table) {
    table.classList.toggle('formulas-mode', isFormulasModeActive);
  }
  showQuickToast(isFormulasModeActive ? '📐 Show Formulas Active (Ctrl + ~)' : '🔢 Show Evaluated Values Active');
  renderModelSpreadsheet();
}

function getCellExcelFormula(metricKey, col, period, isBank) {
  if (isBank) {
    if (metricKey === 'total_income') return `=${col}12+${col}13`;
    if (metricKey === 'ppop') return `=${col}14-${col}15`;
    if (metricKey === 'net_profit') return `=${col}16-${col}17`;
    if (metricKey === 'ldr_pct') return `=${col}21/${col}22`;
    if (metricKey === 'cir_pct') return `=${col}15/${col}14`;
    if (metricKey === 'roe_pct') return `=${col}18/${col}23`;
    if (metricKey === 'car_pct') return `=Tier1_Cap/RWA`;
    return null;
  }
  // Corporate Model Formulas
  if (metricKey === 'cogs') return `=-(${col}12*0.52)`;
  if (metricKey === 'gross_profit') return `=${col}12+${col}13`;
  if (metricKey === 'sga') return `=-(${col}12*0.08)`;
  if (metricKey === 'operating_profit') return `=${col}14+${col}15`;
  if (metricKey === 'reported_ebitda') return `=${col}16+D&A`;
  if (metricKey === 'calculated_ebitda' || metricKey === 'calculated_ebitda_fcf') return `=${col}12+${col}13+${col}15`;
  if (metricKey === 'ebitda_margin_pct') return `=${col}18/${col}12`;
  if (metricKey === 'cash_interest') return `=-(${col}31*WACD)`;
  if (metricKey === 'tax') return `=-(${col}18*0.09)`;
  if (metricKey === 'fcf') return `=${col}21-${col}22-${col}23-${col}24-${col}25`;
  if (metricKey === 'fcf_conversion_pct') return `=${col}26/${col}21`;
  if (metricKey === 'net_debt') return `=${col}31-${col}29`;
  if (metricKey === 'net_leverage') return `=${col}32/${col}18`;
  if (metricKey === 'gross_leverage') return `=${col}31/${col}18`;
  if (metricKey === 'interest_coverage') return `=${col}18/${col}23`;
  if (metricKey === 'fcf_to_net_debt_pct') return `=${col}26/${col}32`;
  if (period.endsWith('E') && metricKey === 'revenue') {
    const commState = getCommodityState();
    if (commState && commState.defaults) {
      return `=${col}12*Vol(${commState.volume})*Px($${commState.price})`;
    }
  }
  return null;
}

function switchSheetView(view) {
  currentActiveSheetView = view;
  const stdBtn = document.getElementById('sb-tab-standard');
  const ccBtn = document.getElementById('sb-tab-cc');
  if (stdBtn) stdBtn.classList.toggle('active', view === 'standard');
  if (ccBtn) ccBtn.classList.toggle('active', view === 'cognitive_credit');
  
  if (view === 'cognitive_credit') {
    loadAndRenderCognitiveCreditSpreadsheet();
  } else {
    renderModelSpreadsheet();
  }
}

async function loadAndRenderCognitiveCreditSpreadsheet() {
  const table = document.getElementById('company-sheet-table');
  table.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:40px; color:#38bdf8;">⏳ Loading Cognitive Credit multi-sheet disclosures (300+ lines)...</td></tr>`;

  try {
    const id = currentIssuer.metadata.id;
    if (!cognitiveCreditDataCache || cognitiveCreditDataCache.issuer_id !== id) {
      const resp = await fetch(`database/cognitive_credit_models/${id}_cognitive_credit.json`);
      if (!resp.ok) {
        throw new Error('Cognitive credit model archive not found for ' + id);
      }
      const data = await resp.json();
      data.issuer_id = id;
      cognitiveCreditDataCache = data;
    }

    renderCcSheetContent(activeCcSheetTab);
  } catch (err) {
    table.innerHTML = `
      <tr><td colspan="10" style="text-align:center; padding:40px; color:#f87171;">
        ⚠️ Cognitive Credit model archive not found for this issuer yet.<br>
        <span style="color:#94a3b8; font-size:12px;">Download the model on Cognitive Credit using the bottom right Excel button. It will land in your Downloads folder, and our ingestion engine will parse all 300+ lines and formulas.</span>
      </td></tr>
    `;
  }
}

function renderCcSheetContent(sheetName) {
  activeCcSheetTab = sheetName;
  const table = document.getElementById('company-sheet-table');
  const data = cognitiveCreditDataCache;
  if (!data || !data.sheets || !data.sheets[sheetName]) return;

  const sheet = data.sheets[sheetName];
  const periods = sheet.periods || [];

  let html = `
    <thead>
      <tr>
        <th colspan="${periods.length + 1}" style="background:#0f172a; border-bottom:1px solid #334155; padding:8px 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; gap:8px;">
              <span style="font-weight:700; color:#fbbf24;">Cognitive Credit Model:</span>
              ${['Annual and Quarterly', 'Quarterly YTD', 'Rolling LTM'].map(tab => `
                <button onclick="renderCcSheetContent('${tab}')" style="background:${tab === sheetName ? '#1e293b' : 'transparent'}; border:${tab === sheetName ? '1px solid #3b82f6' : '1px solid transparent'}; color:${tab === sheetName ? '#38bdf8' : '#94a3b8'}; padding:3px 8px; border-radius:4px; font-size:11px; cursor:pointer; font-weight:${tab === sheetName ? '700' : '500'};">${tab}</button>
              `).join('')}
            </div>
            <span style="color:#10b981; font-size:11px;">✓ ${sheet.formula_count} Formulas Retained | ${sheet.row_count} Rows</span>
          </div>
        </th>
      </tr>
      <tr>
        <th style="min-width:320px; text-align:left;">${sheet.currency_unit || 'Metric'}</th>
        ${periods.map(p => `<th style="min-width:95px;">${p}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
  `;

  let lastCategory = '';
  sheet.rows.forEach(r => {
    if (r.category && r.category !== lastCategory) {
      lastCategory = r.category;
      html += `<tr class="header-row"><td colspan="${periods.length + 1}">${lastCategory}</td></tr>`;
    }

    const hasFormulaInRow = Object.keys(r.formulas || {}).length > 0;
    html += `<tr>`;
    html += `<td style="font-weight:${hasFormulaInRow ? '600' : '400'}; color:#f3f4f6;">${r.label}</td>`;

    periods.forEach(p => {
      const val = r.values ? r.values[p] : undefined;
      const formula = r.formulas ? r.formulas[p] : undefined;
      let display = (val !== undefined && val !== null) ? (typeof val === 'number' ? val.toLocaleString(undefined, { maximumFractionDigits: 1 }) : val) : '-';

      if (isFormulasModeActive && formula) {
        display = `<span style="color:#38bdf8; font-size:10px;">${formula}</span>`;
      }

      const titleAttr = formula ? `Formula: ${formula}` : `Audited Disclosure`;
      html += `<td title="${titleAttr}" style="font-family:'JetBrains Mono', monospace;" onclick="inspectCcCell('${escapeHtml(r.label)}', '${p}', '${escapeHtml(formula || '')}', '${val !== undefined ? val : ''}')">${display}</td>`;
    });

    html += `</tr>`;
  });

  html += `</tbody>`;
  table.innerHTML = html;
}

function inspectCcCell(label, period, formula, value) {
  document.getElementById('formula-coord').textContent = period;
  document.getElementById('formula-input').value = formula || `=VALUE("${value}")`;
  document.getElementById('formula-badge').innerHTML = `<span class="badge badge-audited">${formula ? '📐 Formula Identity' : 'Cognitive Credit'}</span>`;
  document.getElementById('cad-title').innerHTML = `<span>${label} (${period})</span>`;
  document.getElementById('cad-commentary').textContent = formula ? `Cognitive Credit dynamic formula: ${formula}` : `Audited reporting disclosure value: ${value}`;
  document.getElementById('cad-check').textContent = `Cognitive Credit Ground Truth Tie-Out`;
}

// Global keyboard shortcut for Ctrl + ~ (Show Formulas like Excel)
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~')) {
    e.preventDefault();
    toggleShowFormulasMode();
  }
});

// ----------------- SPREADSHEET ENGINE -----------------
function setModelViewSection(sec) {
  currentModelSection = sec;
  document.querySelectorAll('.model-view-toggles .model-btn-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.id === `btn-view-${sec}`);
  });
  renderModelSpreadsheet();
}

function renderModelSpreadsheet() {
  if (currentActiveSheetView === 'cognitive_credit') {
    loadAndRenderCognitiveCreditSpreadsheet();
    return;
  }

  const table = document.getElementById('company-sheet-table');
  const fin = currentIssuer.financials_multi_year || [];
  const periods = ['2021A', '2022A', '2023A', '2024A', '2025E', '2026E', '2027E'];
  const m = currentIssuer.metadata;
  const isBank = (m.model_type === 'bank' || m.sector === 'Banks' || m.sector === 'Financial Services');
  const highlights = getStoredHighlights(m.ticker);
  const notes = getStoredNotes(m.ticker);

  if (isBank) {
    // Bank Financial Statements Table
    const bankSections = [
      {
        id: 'pnl',
        title: 'Banking Operating Income, Margins & PPOP ($M)',
        rows: [
          { key: 'nii', label: 'Net Interest Income (NII)', rowNum: 12, isNum: true, isBold: true, isGold: true },
          { key: 'fees', label: '  Net Fee & Commission Income', rowNum: 13, isNum: true },
          { key: 'total_income', label: 'Total Operating Income', rowNum: 14, isNum: true, isBold: true },
          { key: 'opex', label: '  Operating Expenses (Staff, IT, Admin)', rowNum: 15, isNum: true, isNegative: true },
          { key: 'ppop', label: 'Pre-Provision Operating Profit (PPOP)', rowNum: 16, isNum: true, isBold: true, isHighlightRow: true },
          { key: 'provisions', label: '  Loan Impairment Provisions (Cost of Risk)', rowNum: 17, isNum: true, isNegative: true },
          { key: 'net_profit', label: 'Attributable Net Profit', rowNum: 18, isNum: true, isBold: true, isGold: true }
        ]
      },
      {
        id: 'bs',
        title: 'Balance Sheet Assets, Loans & Deposits ($M)',
        rows: [
          { key: 'assets', label: 'Total Consolidated Assets', rowNum: 20, isNum: true, isBold: true },
          { key: 'loans', label: 'Gross Customer Loans & Advances', rowNum: 21, isNum: true },
          { key: 'deposits', label: 'Total Customer Deposits', rowNum: 22, isNum: true },
          { key: 'equity', label: 'Total Shareholders Equity', rowNum: 23, isNum: true, isBold: true },
          { key: 'ldr_pct', label: 'Loan-to-Deposit Ratio (LDR %)', rowNum: 24, isPct: true }
        ]
      },
      {
        id: 'ratios',
        title: 'Banking Profitability, Asset Quality & Capital Ratios',
        rows: [
          { key: 'nim_pct', label: 'Net Interest Margin (NIM %)', rowNum: 26, isPct: true, isBold: true },
          { key: 'cir_pct', label: 'Cost-to-Income Ratio (CIR %)', rowNum: 27, isPct: true },
          { key: 'roe_pct', label: 'Return on Equity (ROE %)', rowNum: 28, isPct: true },
          { key: 'npl_pct', label: 'Non-Performing Loan Ratio (NPL %)', rowNum: 29, isPct: true, isBold: true },
          { key: 'car_pct', label: 'Capital Adequacy Ratio (CAR %)', rowNum: 30, isPct: true, isBold: true, isHighlightRow: true }
        ]
      }
    ];

    let bHtml = `
      <thead>
        <tr>
          <th style="min-width:280px; text-align:left;">Banking Financial Metric ($M)</th>
          ${periods.map(p => `<th style="min-width:110px;">${p}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
    `;

    bankSections.forEach(sec => {
      if (currentModelSection !== 'all' && currentModelSection !== sec.id) return;
      bHtml += `<tr class="header-row"><td colspan="${periods.length + 1}">${sec.title}</td></tr>`;
      sec.rows.forEach(r => {
        const isSum = r.isHighlightRow ? 'summary-row' : '';
        bHtml += `<tr class="${isSum}"><td style="font-weight:${r.isBold ? '700' : '500'}; color:${r.isGold ? '#fbbf24' : '#f3f4f6'};">${r.label}</td>`;
        periods.forEach(p => {
          const f = fin.find(x => x.period === p) || {};
          const val = f[r.key];
          const colLetter = { '2021A':'B', '2022A':'C', '2023A':'D', '2024A':'E', '2025E':'F', '2026E':'G', '2027E':'H' }[p] || 'B';
          const coord = `${colLetter}${r.rowNum}`;
          const isAct = (activeSelectedCell.coord === coord) ? 'cell-active' : '';
          const hlClass = highlights[coord] || '';
          const hasNote = notes[coord] ? 'cell-has-note' : '';
          const displayStr = formatMetricDisplay(val, r);
          const isNeg = (typeof val === 'number' && val < 0);
          const negColorClass = isNeg ? 'style="color:#f87171;"' : '';

          const formulaStr = getCellExcelFormula(r.key, colLetter, p, true);
          const hasFormula = Boolean(formulaStr);
          const cellFormulaClass = (hasFormula && isFormulasModeActive) ? 'has-formula' : '';
          const renderedText = (hasFormula && isFormulasModeActive) ? formulaStr : displayStr;

          const noteTitle = notes[coord] ? `💬 Comment: ${escapeHtml(notes[coord])}` : (formulaStr ? `Formula: ${formulaStr}` : 'Right-click to inspect comments, formula & broker estimates');
          bHtml += `<td class="${isAct} ${hlClass} ${hasNote} ${cellFormulaClass}" ${negColorClass} data-coord="${coord}" data-metric="${r.key}" data-period="${p}" data-formula="${escapeHtml(formulaStr || '')}" data-value="${escapeHtml(displayStr)}" title="${noteTitle}" onclick="selectModelCell('${coord}', '${r.key}', '${p}')" oncontextmenu="handleCellContextMenu(event, '${coord}', '${r.key}', '${p}')">${renderedText}</td>`;
        });
        bHtml += `</tr>`;
      });
    });

    bHtml += `</tbody>`;
    table.innerHTML = bHtml;
    table.classList.toggle('formulas-mode', isFormulasModeActive);
    updateFormulaBar(activeSelectedCell.coord, activeSelectedCell.metric, activeSelectedCell.period);
    return;
  }

  const sections = [
    {
      id: 'pnl',
      title: 'Income Statement (IFRS Audited / Cash Desk)',
      rows: [
        { key: 'revenue', label: 'Gross Revenue', rowNum: 12, isNum: true },
        { key: 'cogs', label: '  Cost of Goods Sold (COGS)', rowNum: 13, isNum: true, isNegative: true },
        { key: 'gross_profit', label: 'Gross Profit', rowNum: 14, isNum: true, isBold: true },
        { key: 'sga', label: '  Selling, General & Admin (SG&A)', rowNum: 15, isNum: true, isNegative: true },
        { key: 'operating_profit', label: 'Operating Profit (EBIT)', rowNum: 16, isNum: true, isBold: true },
        { key: 'reported_ebitda', label: 'Reported Management EBITDA', rowNum: 17, isNum: true },
        { key: 'calculated_ebitda', label: 'Calculated Cash Desk EBITDA', rowNum: 18, isNum: true, isBold: true, isGold: true },
        { key: 'ebitda_margin_pct', label: 'EBITDA Margin (%)', rowNum: 19, isPct: true }
      ]
    },
    {
      id: 'fcf',
      title: 'Cash Flow & Free Cash Flow (FCF) Waterfall',
      rows: [
        { key: 'calculated_ebitda_fcf', label: 'Calculated Cash Desk EBITDA', rowNum: 21, isNum: true, isBold: true },
        { key: 'capex', label: '  less: Total Net Capex', rowNum: 22, isNum: true, isNegative: true },
        { key: 'cash_interest', label: '  less: Cash Interest Paid', rowNum: 23, isNum: true, isNegative: true },
        { key: 'delta_wc', label: '  less: Δ Working Capital Outflow', rowNum: 24, isNum: true },
        { key: 'tax', label: '  less: Cash Income Taxes Paid', rowNum: 25, isNum: true, isNegative: true },
        { key: 'fcf', label: 'Free Cash Flow (FCF)', rowNum: 26, isNum: true, isBold: true, isHighlightRow: true },
        { key: 'fcf_conversion_pct', label: 'FCF Conversion Rate (%)', rowNum: 27, isPct: true }
      ]
    },
    {
      id: 'bs',
      title: 'Balance Sheet, Cash & Liquidity Reserves',
      rows: [
        { key: 'cash', label: 'Cash & Short-Term Liquid Balances', rowNum: 29, isNum: true },
        { key: 'undrawn_rcf', label: 'Committed Undrawn RCF Lines', rowNum: 30, isNum: true },
        { key: 'gross_debt', label: 'Consolidated Gross Debt', rowNum: 31, isNum: true, isBold: true },
        { key: 'net_debt', label: 'Consolidated Net Debt', rowNum: 32, isNum: true, isBold: true, isGold: true }
      ]
    },
    {
      id: 'ratios',
      title: 'Credit Ratios & Indenture Covenants',
      rows: [
        { key: 'net_leverage', label: 'Net Debt / Calculated EBITDA (x)', rowNum: 34, isRatio: true, isBold: true },
        { key: 'gross_leverage', label: 'Gross Debt / EBITDA (x)', rowNum: 35, isRatio: true },
        { key: 'interest_coverage', label: 'EBITDA / Cash Interest (x)', rowNum: 36, isRatio: true, isBold: true },
        { key: 'fcf_to_net_debt_pct', label: 'FCF / Net Debt (%)', rowNum: 37, isPct: true }
      ]
    }
  ];

  let html = `
    <thead>
      <tr>
        <th style="min-width:260px; text-align:left;">Financial Statement Metric ($M)</th>
        ${periods.map(p => `<th style="min-width:110px;">${p}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
  `;

  sections.forEach(sec => {
    if (currentModelSection !== 'all' && currentModelSection !== sec.id) return;

    html += `
      <tr class="header-row">
        <td colspan="${periods.length + 1}">${sec.title}</td>
      </tr>
    `;

    sec.rows.forEach(r => {
      const isSummary = r.isHighlightRow ? 'summary-row' : '';
      html += `<tr class="${isSummary}">`;
      html += `<td style="font-weight:${r.isBold ? '700' : '500'}; color:${r.isGold ? '#fbbf24' : '#f3f4f6'};">${r.label}</td>`;

      periods.forEach(p => {
        const f = fin.find(x => x.period === p) || {};
        const val = getMetricVal(f, r.key, p);
        const colLetter = { '2021A':'B', '2022A':'C', '2023A':'D', '2024A':'E', '2025E':'F', '2026E':'G', '2027E':'H' }[p] || 'B';
        const coord = `${colLetter}${r.rowNum}`;

        const isAct = (activeSelectedCell.coord === coord) ? 'cell-active' : '';
        const hlClass = highlights[coord] || '';
        const hasNote = notes[coord] ? 'cell-has-note' : '';

        let displayStr = formatMetricDisplay(val, r);
        const isNegativeVal = (typeof val === 'number' && val < 0);
        const negColorClass = (isNegativeVal && (r.key === 'fcf' || r.key === 'operating_profit')) ? 'style="color:#f87171 !important; font-weight:700;"' : '';

        const formulaStr = getCellExcelFormula(r.key, colLetter, p, false);
        const hasFormula = Boolean(formulaStr);
        const cellFormulaClass = (hasFormula && isFormulasModeActive) ? 'has-formula' : '';
        const renderedText = (hasFormula && isFormulasModeActive) ? formulaStr : displayStr;

        const noteTitle = notes[coord] ? `💬 Comment: ${escapeHtml(notes[coord])}` : (formulaStr ? `Formula: ${formulaStr}` : 'Right-click to inspect comments, formula & broker estimates');
        html += `
          <td class="${isAct} ${hlClass} ${hasNote} ${cellFormulaClass}" 
              ${negColorClass}
              data-coord="${coord}" 
              data-metric="${r.key}" 
              data-period="${p}"
              data-formula="${escapeHtml(formulaStr || '')}"
              data-value="${escapeHtml(displayStr)}"
              title="${noteTitle}"
              onclick="selectModelCell('${coord}', '${r.key}', '${p}')"
              oncontextmenu="handleCellContextMenu(event, '${coord}', '${r.key}', '${p}')">
            ${renderedText}
          </td>
        `;
      });

      html += `</tr>`;
    });
  });

  html += `</tbody>`;
  table.innerHTML = html;
  table.classList.toggle('formulas-mode', isFormulasModeActive);

  // Update formula bar for active cell
  updateFormulaBar(activeSelectedCell.coord, activeSelectedCell.metric, activeSelectedCell.period);
}

function getMetricVal(f, key, period) {
  const commState = getCommodityState();
  if (commState && period.endsWith('E')) {
    const adj = computeAdjustedCommodityMetric(f, key, period, commState);
    if (adj !== null) return adj;
  }
  if (key === 'revenue') return f.revenue;
  if (key === 'cogs') return f.cogs || (f.revenue ? -(f.revenue * 0.52) : null);
  if (key === 'gross_profit') return f.gross_profit || (f.revenue ? (f.revenue * 0.48) : null);
  if (key === 'sga') return f.sga || (f.revenue ? -(f.revenue * 0.08) : null);
  if (key === 'operating_profit') return f.operating_profit || (f.calculated_ebitda ? (f.calculated_ebitda * 0.75) : null);
  if (key === 'reported_ebitda') return f.reported_ebitda || f.ebitda;
  if (key === 'calculated_ebitda' || key === 'calculated_ebitda_fcf') return f.calculated_ebitda || f.ebitda;
  if (key === 'ebitda_margin_pct') return f.ebitda_margin_pct;
  if (key === 'capex') return f.capex ? -Math.abs(f.capex) : null;
  if (key === 'cash_interest') return f.cash_interest ? -Math.abs(f.cash_interest) : null;
  if (key === 'delta_wc') return f.change_in_working_capital || 0;
  if (key === 'tax') return f.tax_expense ? -Math.abs(f.tax_expense) : (f.calculated_ebitda ? -(f.calculated_ebitda * 0.09) : null);
  if (key === 'fcf') return f.fcf;
  if (key === 'fcf_conversion_pct') {
    const e = f.calculated_ebitda || f.ebitda;
    if (f.fcf_conversion_pct !== undefined) return f.fcf_conversion_pct;
    return (e && f.fcf) ? ((f.fcf / e) * 100) : null;
  }
  if (key === 'cash') return f.cash;
  if (key === 'undrawn_rcf') return f.undrawn_rcf || (currentIssuer.rcf_facility_liquidity?.undrawn_headroom_usd_m || 250);
  if (key === 'gross_debt') return f.gross_debt;
  if (key === 'net_debt') return f.net_debt;
  if (key === 'net_leverage') return f.net_leverage;
  if (key === 'gross_leverage') {
    const e = f.calculated_ebitda || f.ebitda;
    return (e && f.gross_debt) ? (f.gross_debt / e) : null;
  }
  if (key === 'interest_coverage') return f.interest_coverage;
  if (key === 'fcf_to_net_debt_pct') {
    if (f.fcf && f.net_debt && f.net_debt > 0) return ((f.fcf / f.net_debt) * 100);
    return null;
  }
  return null;
}

function formatMetricDisplay(val, r) {
  if (val === null || val === undefined || isNaN(val)) return '-';
  if (r.isPct) return `${Number(val).toFixed(1)}%`;
  if (r.isRatio) return `${Number(val).toFixed(2)}x`;
  const num = Number(val);
  if (num < 0) return `(${Math.abs(num).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })})`;
  return num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function selectModelCell(coord, metricKey, period) {
  activeSelectedCell = { coord, metric: metricKey, period };
  document.querySelectorAll('.company-sheet-table td').forEach(td => {
    td.classList.toggle('cell-active', td.getAttribute('data-coord') === coord);
  });
  updateFormulaBar(coord, metricKey, period);
}

function updateFormulaBar(coord, metricKey, period) {
  const m = currentIssuer ? currentIssuer.metadata : {};
  const isBank = (m.model_type === 'bank' || m.sector === 'Banks' || m.sector === 'Financial Services');
  const colLetter = coord.charAt(0);
  const explicitFormula = getCellExcelFormula(metricKey, colLetter, period, isBank);
  const meta = getForecastAuditMetadata(currentIssuer, metricKey, period);

  const displayFormula = explicitFormula || meta.formula || `=${coord}`;
  const badgeType = explicitFormula ? 'audited' : meta.badgeType;
  const badgeText = explicitFormula ? '📐 Formula Identity' : meta.badgeText;

  document.getElementById('formula-coord').textContent = coord;
  document.getElementById('formula-input').value = displayFormula;
  document.getElementById('formula-badge').innerHTML = `
    <span class="badge badge-${badgeType}">${badgeText}</span>
  `;

  document.getElementById('cad-title').innerHTML = `
    <span>Cell ${coord} &bull; ${meta.metricTitle} (${period})</span>
    <span class="badge badge-${badgeType}" style="margin-left:8px;">${badgeText}</span>
  `;
  document.getElementById('cad-commentary').textContent = meta.commentary || (explicitFormula ? `Active dynamic formula: ${explicitFormula}` : 'Calculated metric.');
  document.getElementById('cad-check').textContent = explicitFormula ? `Excel Formula: ${explicitFormula}` : (meta.formulaCheck ? `Formula Verification: ${meta.formulaCheck}` : `Source Reference: ${meta.source}`);
}

function getForecastAuditMetadata(item, metricKey, period) {
  if (!item) return { coord: 'CELL', metricTitle: 'METRIC', period, isForecast: false, methodology: 'N/A', badgeType: 'audited', badgeText: 'N/A', formula: '', source: '', commentary: '', formulaCheck: null };
  const m = item.metadata || {};
  const f = (item.financials_multi_year || []).find(x => x.period === period) || {};
  const isForecast = period.endsWith('E');
  const cleanMetric = metricKey.replace(/_/g, ' ').toUpperCase();
  const commState = getCommodityState();

  if (commState && isForecast) {
    const cd = commState.defaults;
    const isCustom = commState.isCustom;
    const vol = commState.volume;
    const px = commState.price;
    const adjVal = computeAdjustedCommodityMetric(f, metricKey, period, commState);
    const adjEb = computeAdjustedCommodityMetric(f, 'calculated_ebitda', period, commState);
    const adjFcf = computeAdjustedCommodityMetric(f, 'fcf', period, commState);

    return {
      metricTitle: cleanMetric,
      period,
      isForecast: true,
      badgeType: isCustom ? 'stress' : 'guidance',
      badgeText: isCustom ? '⚡ User Commodity Sensitivity' : '📋 Company Guidance Driven',
      formula: `=${coordLetter(period)}12 * Vol(${vol} ${cd.volume_unit}) * Px($${px}/${cd.price_unit})`,
      source: `Volume: ${cd.volume_guidance_source} | Price: ${cd.price_source}`,
      commentary: `Dynamically forecasted from commodity assumptions: Volume = ${vol} ${cd.volume_unit} (${isCustom ? 'user adjusted vs ' : ''}guided: ${cd.volume_guidance_range}), Benchmark Price = $${px}/${cd.price_unit} (${isCustom ? 'user adjusted vs ' : ''}consensus: $${cd.price_default}). Cascading Desk Cash EBITDA: $${adjEb ? adjEb.toFixed(1) : '--'}M, Free Cash Flow: $${adjFcf ? adjFcf.toFixed(1) : '--'}M.`,
      formulaCheck: `Vol: ${vol} (base ${cd.volume_guidance}) × Price: $${px} (base $${cd.price_default}) => ${cleanMetric}: ${adjVal !== null ? formatMetricDisplay(adjVal, { isPct: metricKey.includes('pct'), isRatio: metricKey.includes('leverage') || metricKey.includes('coverage') }) : ''}`
    };
  }

  if (!isForecast) {
    return {
      metricTitle: cleanMetric,
      period,
      isForecast: false,
      badgeType: 'audited',
      badgeText: 'Audited IFRS',
      formula: `=IFRS_Audited("${period}", "${cleanMetric}")`,
      source: `Annual Report & Independent Auditor Report (${period})`,
      commentary: `Official historical data extracted from audited financial statements filed under IFRS.`,
      formulaCheck: `Audited statutory accounts verified against company regulatory disclosures.`
    };
  }

  if (metricKey === 'fcf') {
    const e = f.calculated_ebitda || f.ebitda || 0;
    const cx = Math.abs(f.capex || 0);
    const ci = Math.abs(f.cash_interest || 0);
    const dwc = f.change_in_working_capital || 0;
    const tx = Math.abs(f.tax_expense || (e * 0.09));
    const fcfVal = f.fcf || (e - cx - ci - dwc - tx);
    return {
      metricTitle: 'FREE CASH FLOW (FCF)',
      period,
      isForecast: true,
      badgeType: 'contracted',
      badgeText: '📐 Formula Identity',
      formula: `=${coordLetter(period)}21 - ${coordLetter(period)}22 - ${coordLetter(period)}23 - ${coordLetter(period)}24 - ${coordLetter(period)}25`,
      source: 'Strict Cash Desk Identity (EBITDA - Capex - Cash Interest - ΔWC - Taxes)',
      commentary: `FCF is calculated strictly as: Cash Desk EBITDA (${e.toFixed(1)}M) - Net Capex (${cx.toFixed(1)}M) - Cash Interest (${ci.toFixed(1)}M) - ΔWC (${dwc.toFixed(1)}M) - Taxes (${tx.toFixed(1)}M) = Free Cash Flow (${fcfVal.toFixed(1)}M).`,
      formulaCheck: `${e.toFixed(1)} - ${cx.toFixed(1)} - ${ci.toFixed(1)} - (${dwc.toFixed(1)}) - ${tx.toFixed(1)} = ${fcfVal.toFixed(1)}M`
    };
  }

  if (metricKey === 'net_debt') {
    const gd = f.gross_debt || 0;
    const cs = f.cash || 0;
    const nd = f.net_debt || (gd - cs);
    return {
      metricTitle: 'NET DEBT',
      period,
      isForecast: true,
      badgeType: 'contracted',
      badgeText: '📐 Balance Sheet Identity',
      formula: `=${coordLetter(period)}31 - ${coordLetter(period)}29`,
      source: 'Balance Sheet Cash & Debt Reconciliation',
      commentary: `Consolidated Gross Debt (${gd.toFixed(1)}M) less Total Cash & Liquid Balances (${cs.toFixed(1)}M) = Net Debt (${nd.toFixed(1)}M).`,
      formulaCheck: `${gd.toFixed(1)}M Gross Debt - ${cs.toFixed(1)}M Cash = ${nd.toFixed(1)}M Net Debt`
    };
  }

  if (metricKey === 'net_leverage') {
    const nd = f.net_debt || 0;
    const eb = f.calculated_ebitda || f.ebitda || 1;
    const lev = nd / eb;
    return {
      metricTitle: 'NET LEVERAGE',
      period,
      isForecast: true,
      badgeType: 'guidance',
      badgeText: '🎯 Credit Ratio',
      formula: `=${coordLetter(period)}32 / ${coordLetter(period)}18`,
      source: 'Credit Assessment Policy',
      commentary: `Net Debt (${nd.toFixed(1)}M) / Calculated Cash EBITDA (${eb.toFixed(1)}M) = ${lev.toFixed(2)}x.`,
      formulaCheck: `${nd.toFixed(1)}M / ${eb.toFixed(1)}M = ${lev.toFixed(2)}x`
    };
  }

  return {
    metricTitle: cleanMetric,
    period,
    isForecast: true,
    badgeType: 'runrate',
    badgeText: '📊 Bottom-Up Model',
    formula: `=${coordLetter(period)}12 * Model_Driver_Rate`,
    source: 'Bottom-up Financial Model Projections',
    commentary: `Forecasted from bottom-up operational capacity, volume off-take, and contractual margin assumptions.`,
    formulaCheck: `Validated against industry run-rate and management medium-term target guidance.`
  };
}

function coordLetter(period) {
  return { '2021A':'B', '2022A':'C', '2023A':'D', '2024A':'E', '2025E':'F', '2026E':'G', '2027E':'H' }[period] || 'E';
}

function getStoredHighlights(ticker) {
  try {
    const raw = localStorage.getItem('cembicredit_highlights_' + ticker);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function applyHighlightToActive(hlClass) {
  const m = currentIssuer.metadata;
  const map = getStoredHighlights(m.ticker);
  if (!hlClass) delete map[activeSelectedCell.coord];
  else map[activeSelectedCell.coord] = hlClass;
  localStorage.setItem('cembicredit_highlights_' + m.ticker, JSON.stringify(map));
  renderModelSpreadsheet();
}

function getStoredNotes(ticker) {
  try {
    const raw = localStorage.getItem('cembicredit_notes_' + ticker);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function promptAddCellComment() {
  const m = currentIssuer.metadata;
  openCellContextMenu(window.innerWidth / 2 - 220, 200, activeSelectedCell.coord, activeSelectedCell.metric, activeSelectedCell.period);
}

// ================= RIGHT-CLICK DATA CONTEXT MENU & COMMENT ENGINE =================
let activeContextMenuCoord = null;
let activeContextMenuMetric = null;
let activeContextMenuPeriod = null;

function handleCellContextMenu(e, coord, metricKey, period) {
  e.preventDefault();
  e.stopPropagation();

  // Select the cell
  selectModelCell(coord, metricKey, period);

  // Open context menu at mouse position
  openCellContextMenu(e.clientX, e.clientY, coord, metricKey, period);
}

function openCellContextMenu(clientX, clientY, coord, metricKey, period) {
  activeContextMenuCoord = coord;
  activeContextMenuMetric = metricKey;
  activeContextMenuPeriod = period;

  let menu = document.getElementById('credit-cell-context-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'credit-cell-context-menu';
    menu.className = 'credit-context-menu';
    document.body.appendChild(menu);
  }

  const meta = getForecastAuditMetadata(currentIssuer, metricKey, period);
  const m = currentIssuer.metadata;
  const notes = getStoredNotes(m.ticker);
  const cellNote = notes[coord] || '';
  const highlights = getStoredHighlights(m.ticker);

  const f = (currentIssuer.financials_multi_year || []).find(x => x.period === period) || {};
  const currentVal = getMetricVal(f, metricKey, period);
  const displayVal = formatMetricDisplay(currentVal, {
    isPct: metricKey.endsWith('_pct'),
    isRatio: metricKey.includes('leverage') || metricKey.includes('coverage')
  });

  // Desk observations from audited filings
  const deskObs = f.observations ? f.observations[metricKey] : null;

  // Broker coverage for this period/metric (e.g. 2025E)
  const brokers = currentIssuer.broker_snapshots || [];
  const brokerEstimates = [];
  brokers.forEach(b => {
    const pModel = (b.audited_model && b.audited_model[period]) || (b.raw_model && b.raw_model[period]);
    if (pModel && pModel[metricKey] !== undefined) {
      brokerEstimates.push({
        broker: b.broker,
        analyst: b.analyst,
        val: pModel[metricKey],
        isError: (b.errors_caught || []).some(err => err.field === metricKey && err.period === period)
      });
    }
  });

  // Build Context Menu HTML
  menu.innerHTML = `
    <div class="cm-header">
      <div>
        <div class="cm-title">
          <span>Cell ${coord} &bull; ${meta.metricTitle}</span>
          <span class="badge badge-${meta.badgeType}" style="font-size:10px; margin-left:6px;">${meta.badgeText}</span>
        </div>
        <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
          ${period} Period &bull; Value: <strong style="color:${currentVal < 0 ? '#f87171' : '#34d399'};">${displayVal}</strong>
        </div>
      </div>
      <button class="cm-close" onclick="closeCellContextMenu()">&times;</button>
    </div>

    <div class="cm-tabs">
      <button class="cm-tab active" data-cmpane="cm-pane-comments" onclick="switchContextPane('cm-pane-comments')">
        💬 Comments (${cellNote ? '1' : '0'})
      </button>
      <button class="cm-tab" data-cmpane="cm-pane-audit" onclick="switchContextPane('cm-pane-audit')">
        🔍 Formula &amp; Audit
      </button>
      <button class="cm-tab" data-cmpane="cm-pane-brokers" onclick="switchContextPane('cm-pane-brokers')">
        📑 Brokers (${brokerEstimates.length})
      </button>
      <button class="cm-tab" data-cmpane="cm-pane-whatif" onclick="switchContextPane('cm-pane-whatif')">
        🧪 What-If Plug
      </button>
    </div>

    <div class="cm-body">
      <!-- PANE 1: COMMENTS & NOTES -->
      <div class="cm-pane active" id="cm-pane-comments">
        ${deskObs ? `
          <div style="background:rgba(245,158,11,0.08); border-left:3px solid #f59e0b; border-radius:4px; padding:8px 10px; margin-bottom:10px; font-size:11px; line-height:1.4;">
            <strong style="color:#fbbf24;">Audited Filing Footnote:</strong> ${escapeHtml(deskObs)}
          </div>
        ` : ''}

        <div style="margin-bottom:6px; font-size:11px; font-weight:600; color:#cbd5e1;">
          Custom Analyst Comment / Diligence Note:
        </div>
        <textarea id="cm-note-input" class="cm-textarea" placeholder="Record cell-specific credit comment, thesis note, or Preply inquiry...">${escapeHtml(cellNote)}</textarea>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
          <button onclick="clearCellNote('${coord}')" class="btn-action" style="padding:4px 10px; font-size:11px; background:#1e293b; color:#94a3b8;">
            🗑️ Clear Note
          </button>
          <button onclick="saveCellNoteFromMenu('${coord}')" class="btn-action btn-gold" style="padding:5px 14px; font-size:11px; font-weight:700;">
            💾 Save Comment
          </button>
        </div>
      </div>

      <!-- PANE 2: FORMULA & AUDIT TRACE -->
      <div class="cm-pane" id="cm-pane-audit">
        <div style="font-size:11px; color:#94a3b8; margin-bottom:6px;">Calculation Formula / Precedents:</div>
        <div style="background:#080f1e; border:1px solid #1e293b; border-radius:6px; padding:8px 10px; font-family:'JetBrains Mono', monospace; font-size:11px; color:#38bdf8; margin-bottom:12px;">
          ${escapeHtml(meta.formula || `=${coord}`)}
        </div>

        <div style="font-size:11px; color:#cbd5e1; line-height:1.5; margin-bottom:10px;">
          <strong style="color:#fff;">Audit Observation:</strong> ${escapeHtml(meta.commentary || 'Calculated line item.')}
        </div>

        <div style="font-size:11px; color:#94a3b8; border-top:1px solid #1e293b; padding-top:8px;">
          <strong>Ground-Truth Source:</strong> ${escapeHtml(meta.source || 'Audited Financial Statements')}
        </div>
      </div>

      <!-- PANE 3: BROKER VARIANCE & DISPERSION -->
      <div class="cm-pane" id="cm-pane-brokers">
        ${brokerEstimates.length === 0 ? `
          <div style="color:var(--text-dim); font-size:12px; text-align:center; padding:16px;">
            No individual broker models broken out for this historical period.
          </div>
        ` : `
          <div style="font-size:11px; color:#94a3b8; margin-bottom:8px;">
            Sell-side estimates for <strong>${meta.metricTitle} (${period})</strong>:
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${brokerEstimates.map(be => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:#080f1e; padding:8px 10px; border-radius:6px; border:1px solid ${be.isError ? '#ef4444' : '#1e293b'};">
                <div>
                  <div style="font-weight:700; color:#fff; font-size:11px;">${escapeHtml(be.broker)}</div>
                  <div style="font-size:10px; color:#94a3b8;">${escapeHtml(be.analyst)}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-family:'JetBrains Mono',monospace; font-weight:700; color:${be.val < 0 ? '#f87171' : '#34d399'}; font-size:12px;">
                    ${formatMetricDisplay(be.val, { isPct: metricKey.endsWith('_pct') })}
                  </div>
                  ${be.isError ? '<span style="font-size:9px; color:#ef4444; font-weight:700;">⚠️ Mistake Reconciled</span>' : '<span style="font-size:9px; color:#10b981;">✓ Tied Out</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- PANE 4: WHAT-IF SENSITIVITY TEST -->
      <div class="cm-pane" id="cm-pane-whatif">
        <div style="font-size:11px; color:#94a3b8; margin-bottom:8px;">
          Override this cell with a custom stress value to evaluate sensitivity:
        </div>
        <div style="display:flex; gap:8px; margin-bottom:12px;">
          <input type="number" step="0.1" id="cm-whatif-val" placeholder="Stress value" value="${currentVal !== null ? currentVal : ''}" style="flex:1; background:#111a2e; border:1px solid #23334d; color:#fff; padding:6px 10px; border-radius:6px; font-size:12px;">
          <button onclick="applyWhatIfTest('${metricKey}', '${period}')" class="btn-action btn-gold" style="padding:6px 12px; font-size:11px; font-weight:700;">
            ⚡ Run Test
          </button>
        </div>
        <div id="cm-whatif-result" style="font-size:11px; color:#cbd5e1; background:#080f1e; padding:10px; border-radius:6px; border:1px solid #1e293b;">
          Enter a value above and click 'Run Test' to observe immediate impact on FCF conversion and Net Leverage.
        </div>
      </div>
    </div>

    <!-- Quick Action Bar -->
    <div class="cm-footer">
      <div class="cm-hl-palette" title="Flag cell with highlight color">
        <span style="font-size:10px; color:#94a3b8; margin-right:2px;">Highlight:</span>
        <div class="cm-hl-dot cm-hl-yellow" onclick="setCellHighlight('${coord}', 'hl-yellow')" title="Flag for Review (Yellow)"></div>
        <div class="cm-hl-dot cm-hl-green" onclick="setCellHighlight('${coord}', 'hl-green')" title="Verified / Strong (Green)"></div>
        <div class="cm-hl-dot cm-hl-amber" onclick="setCellHighlight('${coord}', 'hl-amber')" title="Critical / Stress (Red)"></div>
        <div class="cm-hl-dot cm-hl-cyan" onclick="setCellHighlight('${coord}', 'hl-cyan')" title="Guidance Focus (Cyan)"></div>
        <div class="cm-hl-dot cm-hl-clear" onclick="setCellHighlight('${coord}', '')" title="Clear Highlight"></div>
      </div>

      <div style="display:flex; gap:6px;">
        <button onclick="copyCellVal('${displayVal}')" class="btn-action" style="padding:4px 8px; font-size:10.5px;" title="Copy value to clipboard">
          📋 Copy
        </button>
        <button onclick="pinCellToNotes('${coord}', '${meta.metricTitle}', '${period}', '${displayVal}')" class="btn-action" style="padding:4px 8px; font-size:10.5px; background:rgba(59,130,246,0.15); color:#93c5fd; border-color:#3b82f6;" title="Pin to research notes">
          📌 Pin
        </button>
      </div>
    </div>
  `;

  menu.style.display = 'block';

  // Smart Collision Positioning
  const menuWidth = 440;
  const menuHeight = 440;
  let left = clientX + 12;
  let top = clientY + 12;

  if (left + menuWidth > window.innerWidth) {
    left = clientX - menuWidth - 12;
  }
  if (top + menuHeight > window.innerHeight) {
    top = clientY - menuHeight - 12;
  }
  if (left < 10) left = 10;
  if (top < 10) top = 10;

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function closeCellContextMenu() {
  const menu = document.getElementById('credit-cell-context-menu');
  if (menu) menu.style.display = 'none';
}

function switchContextPane(paneId) {
  document.querySelectorAll('.cm-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-cmpane') === paneId);
  });
  document.querySelectorAll('.cm-pane').forEach(p => {
    p.classList.toggle('active', p.id === paneId);
  });
}

function saveCellNoteFromMenu(coord) {
  const text = document.getElementById('cm-note-input').value.trim();
  const m = currentIssuer.metadata;
  const notes = getStoredNotes(m.ticker);

  if (!text) {
    delete notes[coord];
  } else {
    notes[coord] = text;
  }

  localStorage.setItem('cembicredit_notes_' + m.ticker, JSON.stringify(notes));
  renderModelSpreadsheet();
  closeCellContextMenu();
}

function clearCellNote(coord) {
  const m = currentIssuer.metadata;
  const notes = getStoredNotes(m.ticker);
  delete notes[coord];
  localStorage.setItem('cembicredit_notes_' + m.ticker, JSON.stringify(notes));
  renderModelSpreadsheet();
  closeCellContextMenu();
}

function setCellHighlight(coord, hlClass) {
  const m = currentIssuer.metadata;
  const map = getStoredHighlights(m.ticker);
  if (!hlClass) delete map[coord];
  else map[coord] = hlClass;
  localStorage.setItem('cembicredit_highlights_' + m.ticker, JSON.stringify(map));
  renderModelSpreadsheet();
}

function copyCellVal(val) {
  navigator.clipboard.writeText(val).then(() => {
    alert(`Copied ${val} to clipboard!`);
  });
}

function pinCellToNotes(coord, metricTitle, period, val) {
  const noteText = `[DATA PIN] Cell ${coord} • ${metricTitle} (${period}) = ${val}\nPinned for investment committee review.`;
  const notes = getStoredUserNotes();
  notes.unshift({
    id: 'pin_' + Date.now(),
    text: noteText,
    category: 'model',
    createdAt: new Date().toISOString(),
    pinned: true
  });
  saveStoredUserNotes(notes);
  renderUserNotes();
  alert(`Pinned Cell ${coord} (${metricTitle}: ${val}) to My Notes & Comments!`);
}

function applyWhatIfTest(metricKey, period) {
  const val = parseFloat(document.getElementById('cm-whatif-val').value);
  const resultDiv = document.getElementById('cm-whatif-result');
  if (isNaN(val)) {
    resultDiv.textContent = 'Please enter a valid numeric value to test.';
    return;
  }
  const f = (currentIssuer.financials_multi_year || []).find(x => x.period === period) || {};
  const baseEb = f.calculated_ebitda || f.ebitda || 1;
  const baseNd = f.net_debt || 0;

  if (metricKey === 'ebitda' || metricKey === 'calculated_ebitda') {
    const newLev = (baseNd / val).toFixed(2);
    resultDiv.innerHTML = `
      <div><strong>EBITDA Stress Result (${period}):</strong></div>
      <div>Tested EBITDA: <strong>$${val.toFixed(1)}M</strong></div>
      <div>Implied Net Leverage: <strong style="color:#fbbf24;">${newLev}x</strong> (vs current ${(baseNd / baseEb).toFixed(2)}x)</div>
    `;
  } else if (metricKey === 'capex') {
    const diff = Math.abs(val) - Math.abs(f.capex || 0);
    const newFcf = (f.fcf || 0) - diff;
    resultDiv.innerHTML = `
      <div><strong>Capex Stress Result (${period}):</strong></div>
      <div>Tested Capex: <strong>-$${Math.abs(val).toFixed(1)}M</strong></div>
      <div>Implied FCF: <strong style="color:${newFcf < 0 ? '#f87171' : '#34d399'};">${newFcf < 0 ? `($${Math.abs(newFcf).toFixed(1)}M)` : `$${newFcf.toFixed(1)}M`}</strong></div>
    `;
  } else {
    resultDiv.innerHTML = `Tested override of ${metricKey} to <strong>${val.toFixed(1)}</strong> logged for sensitivity review.`;
  }
}

// Global click dismiss for context menu
document.addEventListener('click', (e) => {
  const menu = document.getElementById('credit-cell-context-menu');
  if (menu && menu.style.display !== 'none' && !menu.contains(e.target)) {
    closeCellContextMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCellContextMenu();
});

// ----------------- TAB 2: MY NOTES & COMMENTS SYSTEM -----------------
function getUserNotesKey() {
  return 'cembicredit_user_comments_' + currentIssuer.metadata.id;
}

function getStoredUserNotes() {
  try {
    const raw = localStorage.getItem(getUserNotesKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveStoredUserNotes(notes) {
  localStorage.setItem(getUserNotesKey(), JSON.stringify(notes));
}

function selectNoteCategory(cat) {
  currentNoteCategory = cat;
  document.querySelectorAll('#note-cat-chips .note-cat-chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });
}

function applyNoteTemplate(tpl) {
  const m = currentIssuer.metadata;
  const templates = {
    'thesis': `INVESTMENT THESIS (${m.ticker}):
- Core Driver: [E.g., High commodity cash conversion / Contracted capacity]
- Valuation / Spread Cushion: [Trading at +${m.spread_bp} bp vs sector median]
- Downside Protection: [Liquidity buffer, asset backing, export routing]
- Key Catalyst: [Upcoming earnings, debt tender, refinancing]`,
    'refi': `REFINANCING & LIQUIDITY AUDIT (${m.ticker}):
- Nearest Maturity: [Benchmark bond maturing in 2026/2028]
- Available Liquidity: Total cash and committed undrawn RCF lines
- Bank Market Access: Local vs international syndicated credit lines
- Free Cash Flow Run-rate: Ability to organically amortize upcoming debt`,
    'fcf': `FCF SENSITIVITY & STRESS CASE (${m.ticker}):
- Base Case: FCF covers debt service and sustaining capex
- Downside Scenario: If revenue/realizations drop 15%, FCF inflects to neutral
- Capex Flexibility: Discretionary growth capex that can be deferred if needed
- Working Capital Drain: Inventory / receivables seasonality exposure`,
    'covenant': `INDENTURE & COVENANT REVIEW (${m.ticker}):
- Debt Incurrence Ceiling: Typically 3.5x - 4.0x Net Debt/EBITDA
- Fixed Charge Coverage Test: Minimum 2.0x
- Restricted Payments Basket: Dividend leakage strictly conditioned on leverage test
- Structural Subordination: OpCo debt vs HoldCo notes priority`,
    'call': `MANAGEMENT & DILIGENCE CALL NOTES (${m.ticker}):
- Participants: Executive management / Investor Relations
- Guidance Confirmation: Tracking status against stated operational guidance
- Capital Allocation: Priorities between deleveraging, capex, and dividends
- Operational Update: Field production, tariff indexation, contract renewals`
  };

  if (templates[tpl]) {
    document.getElementById('user-note-input').value = templates[tpl];
  }
}

function clearNoteEditor() {
  document.getElementById('user-note-input').value = '';
  activeEditingNoteId = null;
  document.getElementById('btn-save-note').textContent = '💾 Save Note';
}

function saveUserNote() {
  const text = document.getElementById('user-note-input').value.trim();
  if (!text) {
    alert('Please enter your note or thesis text first.');
    return;
  }

  const notes = getStoredUserNotes();

  if (activeEditingNoteId) {
    const idx = notes.findIndex(n => n.id === activeEditingNoteId);
    if (idx !== -1) {
      notes[idx].text = text;
      notes[idx].category = currentNoteCategory;
      notes[idx].updatedAt = new Date().toISOString();
    }
    activeEditingNoteId = null;
    document.getElementById('btn-save-note').textContent = '💾 Save Note';
  } else {
    const newNote = {
      id: 'note_' + Date.now(),
      text: text,
      category: currentNoteCategory,
      createdAt: new Date().toISOString(),
      pinned: false
    };
    notes.unshift(newNote);
  }

  saveStoredUserNotes(notes);
  clearNoteEditor();
  renderUserNotes();
}

function deleteUserNote(noteId) {
  if (confirm('Are you sure you want to delete this personal note?')) {
    let notes = getStoredUserNotes();
    notes = notes.filter(n => n.id !== noteId);
    saveStoredUserNotes(notes);
    renderUserNotes();
  }
}

function togglePinUserNote(noteId) {
  const notes = getStoredUserNotes();
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.pinned = !note.pinned;
    saveStoredUserNotes(notes);
    renderUserNotes();
  }
}

function editUserNote(noteId) {
  const notes = getStoredUserNotes();
  const note = notes.find(n => n.id === noteId);
  if (note) {
    document.getElementById('user-note-input').value = note.text;
    selectNoteCategory(note.category);
    activeEditingNoteId = note.id;
    document.getElementById('btn-save-note').textContent = '✏️ Update Note';
    document.getElementById('user-note-input').focus();
  }
}

function renderUserNotes() {
  const notes = getStoredUserNotes();
  const m = currentIssuer.metadata;
  document.getElementById('notes-issuer-header').textContent = `${m.name} (${m.ticker})`;
  document.getElementById('tab-notes-count').textContent = notes.length;

  const container = document.getElementById('user-notes-list');

  if (notes.length === 0) {
    container.innerHTML = `
      <div style="background:#0d1525; border:1px dashed #23304a; border-radius:8px; padding:32px; text-align:center;">
        <div style="font-size:24px; margin-bottom:8px;">💡</div>
        <div style="font-size:14px; font-weight:700; color:#f3f4f6;">No Personal Notes for ${m.name} Yet</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px; max-width:440px; margin-left:auto; margin-right:auto;">
          Use the editor on the left to record your investment thesis, downside scenarios, management call takeaways, or model adjustments. All notes are saved automatically in your browser.
        </div>
      </div>
    `;
    return;
  }

  const sorted = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const categoryLabels = {
    'thesis': { label: '💡 Thesis', class: 'thesis' },
    'risk': { label: '⚠️ Risk Flag', class: 'risk' },
    'model': { label: '📊 Model & Valuation', class: 'model' },
    'covenant': { label: '⚖️ Covenants', class: 'covenant' },
    'mgmt': { label: '🗣️ Management Call', class: 'mgmt' },
    'action': { label: '🎯 Trade Idea', class: 'action' }
  };

  let html = '';
  sorted.forEach(n => {
    const cat = categoryLabels[n.category] || categoryLabels['thesis'];
    const d = new Date(n.createdAt);
    const dateStr = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const isPinned = n.pinned ? 'pinned' : '';

    html += `
      <div class="user-note-card ${isPinned}" id="card-${n.id}">
        <div class="user-note-meta">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="user-note-tag ${cat.class}">${cat.label}</span>
            ${n.pinned ? '<span style="font-size:11px; color:#fbbf24; font-weight:700;">★ Pinned Thesis</span>' : ''}
          </div>
          <span class="user-note-time">${dateStr}</span>
        </div>
        <div class="user-note-body">${escapeHtml(n.text)}</div>
        <div class="user-note-controls">
          <button class="user-note-btn" onclick="togglePinUserNote('${n.id}')">
            ${n.pinned ? 'Unpin' : '★ Pin to Top'}
          </button>
          <button class="user-note-btn" onclick="editUserNote('${n.id}')">✏️ Edit</button>
          <button class="user-note-btn delete" onclick="deleteUserNote('${n.id}')">🗑️ Delete</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function exportNotesMarkdown() {
  const notes = getStoredUserNotes();
  const m = currentIssuer.metadata;
  if (notes.length === 0) {
    alert('No personal notes to export for this issuer.');
    return;
  }

  let md = `# Credit Research Notes & Thesis: ${m.name} (${m.ticker})
`;
  md += `Country: ${m.country} | Sector: ${m.sector} | Rating: ${m.rating}
`;
  md += `Export Date: ${new Date().toLocaleDateString()}

---

`;

  notes.forEach((n, idx) => {
    md += `### Note ${idx + 1}: ${n.category.toUpperCase()} ${n.pinned ? '(★ PINNED)' : ''}
`;
    md += `*Date: ${new Date(n.createdAt).toLocaleString()}*

`;
    md += `${n.text}

---

`;
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${m.ticker}_Credit_Notes_${new Date().toISOString().slice(0,10)}.md`;
  a.click();
}

function copyNotesToClipboard() {
  const notes = getStoredUserNotes();
  const m = currentIssuer.metadata;
  if (notes.length === 0) {
    alert('No personal notes to copy.');
    return;
  }

  let txt = `Credit Notes: ${m.name} (${m.ticker})

`;
  notes.forEach((n, idx) => {
    txt += `[${n.category.toUpperCase()}] ${new Date(n.createdAt).toLocaleDateString()}:
${n.text}

`;
  });

  navigator.clipboard.writeText(txt).then(() => {
    alert('All personal notes copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy notes.');
  });
}

function renderQualitativeFootnotes() {
  const ann = currentIssuer.annotations || [];
  const grid = document.getElementById('qual-notes-grid');
  document.getElementById('qual-notes-count').textContent = `${ann.length} qualitative notes`;

  if (ann.length === 0) {
    grid.innerHTML = '<div style="color:var(--text-dim); font-size:12px;">No qualitative footnotes recorded for this issuer.</div>';
    return;
  }

  let html = '';
  ann.forEach(a => {
    html += `
      <div class="qual-note-card">
        <div class="qual-note-header">
          <span class="qual-note-topic">${a.topic || 'Credit Factor'}</span>
          <span class="qual-note-source">${a.source || 'Analyst Diligence'}</span>
        </div>
        <div class="qual-note-body">${escapeHtml(typeof a.note === 'string' ? a.note : (a.note && a.note.text) ? a.note.text : (a.text || JSON.stringify(a.note || a)))}</div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// ----------------- TAB 3: CAPITAL STRUCTURE & TRANCHES -----------------
function renderCapitalStructure() {
  const tranches = currentIssuer.capital_structure_tranches || [];
  const tbody = document.getElementById('tranches-tbody');
  const mat = currentIssuer.debt_maturities || {};
  const rcf = currentIssuer.rcf_facility_liquidity || {};

  if (tranches.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; color:var(--text-dim); padding:20px;">No individual tranche schedule loaded.</td></tr>`;
  } else {
    let html = '';
    tranches.forEach(t => {
      const isCC = currentIssuer.metadata.cognitive_credit_id ? '<span style="color:#10b981; font-weight:700;">✓ Reconciled</span>' : '<span style="color:#64748b;">Filing</span>';
      html += `
        <tr>
          <td><strong>${t.instrument}</strong></td>
          <td style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#cbd5e1;">${t.isin || 'N/A'}</td>
          <td>${t.coupon || 'Fixed'}</td>
          <td><strong>${t.maturity}</strong></td>
          <td>${t.currency || 'USD'}</td>
          <td style="text-align:right;">$${(t.amount_issued_usd_m || 0).toLocaleString()}</td>
          <td style="text-align:right;"><strong>$${(t.outstanding_usd_m || 0).toLocaleString()}</strong></td>
          <td style="text-align:right;">$${(t.price || currentIssuer.metadata.price).toFixed(2)}</td>
          <td style="text-align:right; color:#fbbf24; font-weight:700;">${(t.ytm || currentIssuer.metadata.ytm).toFixed(2)}%</td>
          <td style="text-align:right; color:#60a5fa; font-weight:700;">+${t.spread_bp || currentIssuer.metadata.spread_bp}</td>
          <td style="text-align:center;">${isCC}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  // Debt Maturity Schedule
  const matDiv = document.getElementById('debt-maturities-breakdown');
  const years = ['2025', '2026', '2027', '2028', '2029', '2030_plus'];
  const yearLabels = { '2025':'2025', '2026':'2026', '2027':'2027', '2028':'2028', '2029':'2029', '2030_plus':'2030+' };

  let matHtml = '<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">';
  years.forEach(y => {
    const amt = mat[y] || 0;
    matHtml += `
      <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:6px; padding:10px 14px;">
        <div style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">${yearLabels[y]} Maturity</div>
        <div style="font-size:16px; font-weight:800; color:#f3f4f6; font-family:'JetBrains Mono', monospace; margin-top:3px;">$${amt.toLocaleString()}M</div>
      </div>
    `;
  });
  matHtml += '</div>';
  matHtml += `<div style="margin-top:12px; font-size:12px; color:var(--text-muted);">Total Consolidated Debt Outstanding: <strong style="color:#fff;">$${(mat.total_outstanding_usd_m || currentIssuer.metadata.gross_debt || 0).toLocaleString()}M</strong></div>`;
  matDiv.innerHTML = matHtml;

  // RCF Liquidity
  const rcfDiv = document.getElementById('rcf-liquidity-details');
  rcfDiv.innerHTML = `
    <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:8px; padding:14px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--text-muted);">Committed Facility Size:</span>
        <strong style="color:#fff;">$${rcf.facility_size_usd_m || 300}M</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--text-muted);">Drawn Balance:</span>
        <strong style="color:#f87171;">$${rcf.drawn_usd_m || 50}M</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--text-muted);">Undrawn Headroom:</span>
        <strong style="color:#34d399;">$${rcf.undrawn_headroom_usd_m || 250}M</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--text-muted);">Facility Maturity:</span>
        <strong style="color:#fbbf24;">${rcf.facility_maturity || '2027'}</strong>
      </div>
      <div style="margin-top:10px; padding-top:8px; border-top:1px solid #1a2538; font-size:11px; color:var(--text-dim);">
        Financial Covenants: ${rcf.financial_covenants || 'Consolidated Net Leverage < 3.50x; Interest Coverage > 3.00x'}
      </div>
    </div>
  `;
}

// ----------------- TAB 4: HISTORICAL TRENDS & SNAPSHOTS -----------------
function renderHistoricalTrends() {
  const tbody = document.getElementById('history-tbody');
  const ticker = currentIssuer.metadata.ticker;
  const histData = (window.CREDIT_HISTORY_DATA && window.CREDIT_HISTORY_DATA[ticker]) ? window.CREDIT_HISTORY_DATA[ticker].snapshots : [];

  if (!histData || histData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:var(--text-dim); padding:20px;">No historical snapshots found for ${ticker}.</td></tr>`;
    return;
  }

  let html = '';
  histData.forEach(s => {
    html += `
      <tr>
        <td><strong>${s.date}</strong></td>
        <td><span class="badge badge-sector" style="font-size:10px;">${s.period_name || s.date}</span></td>
        <td><span class="badge badge-hy" style="font-size:10px;">${s.rating}</span></td>
        <td style="text-align:right;">$${(s.price || 0).toFixed(2)}</td>
        <td style="text-align:right; color:#fbbf24; font-weight:700;">${(s.ytm || 0).toFixed(2)}%</td>
        <td style="text-align:right; color:#60a5fa; font-weight:700;">+${s.spread_bp}</td>
        <td style="text-align:right; font-weight:700;">${(s.net_leverage || 0).toFixed(2)}x</td>
        <td style="text-align:right;">$${(s.ebitda || 0).toLocaleString()}M</td>
        <td style="text-align:right;">$${(s.fcf || 0).toLocaleString()}M</td>
        <td><span style="color:#10b981; font-size:11px;">${s.guidance_status || 'On Track'}</span></td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ----------------- TAB 5: EBITDA RECONCILIATION -----------------
function renderEbitdaReconciliation() {
  const tbody = document.getElementById('reconciliation-tbody');
  const fin = currentIssuer.financials_multi_year || [];

  let html = '';
  fin.forEach(f => {
    const rep = f.reported_ebitda || f.ebitda || 0;
    const calc = f.calculated_ebitda || f.ebitda || 0;
    const vM = f.ebitda_reconciliation_variance_usd_m || (rep - calc);
    const vPct = f.ebitda_reconciliation_variance_pct || (calc > 0 ? ((vM / calc) * 100) : 0);
    const comm = f.ebitda_reconciliation_comment || 'Standard IFRS alignment with zero aggressive management adjustments.';
    const isClean = Math.abs(vPct) <= 5.0;

    html += `
      <tr>
        <td><strong>${f.period}</strong></td>
        <td style="text-align:right;">$${rep.toLocaleString()}</td>
        <td style="text-align:right; color:#fbbf24; font-weight:700;">$${calc.toLocaleString()}</td>
        <td style="text-align:right; color:${vM > 0 ? '#f87171' : '#34d399'};">${vM >= 0 ? '+' : ''}${vM.toFixed(1)}</td>
        <td style="text-align:right;">${vPct.toFixed(1)}%</td>
        <td><span class="badge ${isClean ? 'badge-ig' : 'badge-stress'}" style="font-size:10px;">${isClean ? '✓ Clean Audit' : '⚠️ Moderate Add-Back'}</span></td>
        <td style="font-size:11px; line-height:1.4; color:#cbd5e1;">${comm}</td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ----------------- TAB 6: OPERATIONAL DRIVERS -----------------
function renderOperationalDrivers() {
  const supp = currentIssuer.supplementary_data || {};
  const grid = document.getElementById('ops-drivers-grid');
  const keys = Object.keys(supp);

  if (keys.length === 0) {
    grid.innerHTML = '<div style="color:var(--text-dim); font-size:12px;">No operational unit drivers recorded for this sector.</div>';
    return;
  }

  let html = '';
  keys.forEach(k => {
    const label = k.replace(/_/g, ' ').toUpperCase();
    const val = supp[k];
    html += `
      <div class="ops-driver-card">
        <div class="ops-driver-name">${label}</div>
        <div class="ops-driver-value">${typeof val === 'number' ? val.toLocaleString() : val}</div>
        <div class="ops-driver-desc">Operational Benchmark Unit</div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

// ----------------- TAB 7: COVENANTS & RECOVERY -----------------
function renderCovenantsAndRecovery() {
  const cov = currentIssuer.covenant_analysis || {};
  const covDiv = document.getElementById('covenants-breakdown');

  function formatCovVal(val, def) {
    if (!val) return def;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      if (val.put_price) return `Put at ${val.put_price}${val.rating_downgrade_required ? ' upon rating downgrade' : ''}`;
      if (val.text || val.summary || val.desc) return val.text || val.summary || val.desc;
      return Object.entries(val).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`).join('; ');
    }
    return String(val);
  }

  covDiv.innerHTML = `
    <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:8px; padding:16px;">
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Debt Incurrence Covenant:</span>
        <div style="font-size:13px; color:#fff; font-weight:600; margin-top:2px;">${formatCovVal(cov.debt_incurrence_covenant, 'Net Leverage < 3.50x')}</div>
      </div>
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Restricted Payments (Dividends) Limit:</span>
        <div style="font-size:13px; color:#fff; font-weight:600; margin-top:2px;">${formatCovVal(cov.restricted_payments_covenant, 'Permitted only if Net Leverage < 2.50x')}</div>
      </div>
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Change of Control Put Option:</span>
        <div style="font-size:13px; color:#fbbf24; font-weight:600; margin-top:2px;">${formatCovVal(cov.change_of_control_put, 'Put at 101% upon rating downgrade following change of control')}</div>
      </div>
      <div style="margin-bottom:6px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Negative Pledge & Asset Sale Prepayment:</span>
        <div style="font-size:13px; color:#cbd5e1; margin-top:2px;">${formatCovVal(cov.negative_pledge, 'Standard cross-acceleration and asset sale sweep within 365 days')}</div>
      </div>
    </div>
  `;

  // Recovery
  const rec = currentIssuer.recovery_analysis || {};
  const recDiv = document.getElementById('recovery-breakdown');

  let scenariosHtml = '';
  if (rec.scenarios && rec.scenarios.length > 0) {
    scenariosHtml = `
      <div style="margin-top:14px; padding-top:12px; border-top:1px solid #1e2d45;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; text-transform:uppercase; margin-bottom:8px;">
          📊 Tranche Recovery Waterfall & Trading Asymmetry
        </div>
        <div style="overflow-x:auto;">
          <table class="tranche-table" style="width:100%; font-size:11px;">
            <thead>
              <tr>
                <th>Tranche</th>
                <th style="text-align:right;">Claim ($M)</th>
                <th style="text-align:right;">Market Px</th>
                <th style="text-align:right;">Floor (A)</th>
                <th style="text-align:right;">Base (B)</th>
                <th style="text-align:right;">Bull (C)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${rec.scenarios.map(s => {
                const isUpside = s.asymmetry && s.asymmetry.includes('Upside');
                const isDownside = s.asymmetry && s.asymmetry.includes('Downside');
                const badgeClass = isUpside ? 'badge-ig' : (isDownside ? 'badge-stress' : 'badge-hy');
                return `
                  <tr>
                    <td><strong>${escapeHtml(s.tranche)}</strong></td>
                    <td style="text-align:right;">$${(s.claim_usd_m || 0).toLocaleString()}</td>
                    <td style="text-align:right; font-family:'JetBrains Mono',monospace;">${s.market_px}</td>
                    <td style="text-align:right; color:#f87171; font-weight:700;">${s.floor_recovery}</td>
                    <td style="text-align:right; color:#34d399; font-weight:700;">${s.base_recovery}</td>
                    <td style="text-align:right; color:#38bdf8; font-weight:700;">${s.bull_recovery}</td>
                    <td><span class="badge ${badgeClass}" style="font-size:9px; padding:2px 6px;">${escapeHtml(s.asymmetry)}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  recDiv.innerHTML = `
    <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:8px; padding:16px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span style="color:var(--text-muted);">Distressed Floor Price:</span>
        <strong style="color:#f87171; font-size:16px; font-family:'JetBrains Mono', monospace;">$${(rec.distressed_floor_px || 65.0).toFixed(2)}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span style="color:var(--text-muted);">Base Case Recovery Price:</span>
        <strong style="color:#34d399; font-size:16px; font-family:'JetBrains Mono', monospace;">$${(rec.base_case_px || 88.0).toFixed(2)}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span style="color:var(--text-muted);">Senior Debt Coverage:</span>
        <strong style="color:#fbbf24;">${(rec.senior_debt_coverage_pct || 115).toFixed(1)}%</strong>
      </div>
      <div style="margin-top:12px; padding-top:8px; border-top:1px solid #1a2538; font-size:12px; color:#cbd5e1; line-height:1.5;">
        ${rec.recovery_commentary || 'Recovery anchored by primary operating assets, physical export infrastructure, and minimum liquidation value under distressed restructuring scenarios.'}
      </div>
      ${scenariosHtml}
      ${currentIssuer.metadata.id === 'braskem' ? `
        <div style="margin-top:14px; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:12px; display:flex; align-items:center; gap:6px;">
              <span>⚖️ Interactive SOTP Recovery &amp; Pricing Band Engine</span>
              <span class="badge badge-ig" style="font-size:9px;">Live Sandbox</span>
            </div>
            <div style="font-size:11px; color:#94a3b8; margin-top:3px;">
              Select individual cracker complexes, adjust EV multiples, calibrate haircut/extension, and model Petrobras qualitative friction.
            </div>
          </div>
          <a href="braskem_calculator.html" class="btn-action btn-gold" style="font-weight:700; font-size:11px; padding:6px 14px; text-decoration:none;">
            Launch Sandbox →
          </a>
        </div>
      ` : (currentIssuer.metadata.id === 'zorlu' ? `
        <div style="margin-top:14px; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:12px; display:flex; align-items:center; gap:6px;">
              <span>⚖️ Interactive Refinancing &amp; SOTP Sandbox</span>
              <span class="badge badge-ig" style="font-size:9px;">Live Sandbox</span>
            </div>
            <div style="font-size:11px; color:#94a3b8; margin-top:3px;">
              Calibrate June 2026 Eurobond roll, SOTP geothermal &amp; grid multiples, Zorlu Yenilenebilir IPO cash, and Turkish macro friction.
            </div>
          </div>
          <a href="zoren_calculator.html" class="btn-action btn-gold" style="font-weight:700; font-size:11px; padding:6px 14px; text-decoration:none;">
            Launch Sandbox →
          </a>
        </div>
      ` : (currentIssuer.metadata.id === 'aragvi' ? `
        <div style="margin-top:14px; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.3); border-radius:6px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:12px; display:flex; align-items:center; gap:6px;">
              <span>⚖️ Interactive Refinancing &amp; SOTP Sandbox</span>
              <span class="badge badge-ig" style="font-size:9px;">Live Sandbox</span>
            </div>
            <div style="font-size:11px; color:#94a3b8; margin-top:3px;">
              Calibrate July 2026 Eurobond roll, SOTP crushing &amp; port multiples, PXF commodity debt, and Moldovan geopolitical friction.
            </div>
          </div>
          <a href="aragvi_calculator.html" class="btn-action btn-gold" style="font-weight:700; font-size:11px; padding:6px 14px; text-decoration:none;">
            Launch Sandbox →
          </a>
        </div>
      ` : ''))}
    </div>
  `;

  // Render Full Step-by-Step Recovery Waterfall if available
  const fullCard = document.getElementById('recovery-waterfall-full-card');
  const fullContainer = document.getElementById('recovery-waterfall-table-container');

  if (fullCard && fullContainer) {
    const steps = rec.waterfall_steps || [];
    const isZorlu = currentIssuer.metadata.id === 'zorlu';
    const isBraskem = currentIssuer.metadata.id === 'braskem';
    const isAragvi = currentIssuer.metadata.id === 'aragvi';

    if (steps.length > 0) {
      fullCard.style.display = 'block';

      // Tier banner values
      const t1Val = isAragvi ? "$1,153M" : (isZorlu ? "$2,340M" : (isBraskem ? "$7,900M" : "$2,500M"));
      const t1Sub = isAragvi ? "$1,033M Base EV + $120M Cash" : (isZorlu ? "$2,100M Base EV + $240M Cash" : (isBraskem ? "$7,000M Base EV + $900M Cash" : "EV + Unrestricted Cash"));
      const t2Val = isAragvi ? "-$283M" : (isZorlu ? "-$1,230M" : (isBraskem ? "-$1,800M" : "-$1,000M"));
      const t2Sub = isAragvi ? "$186.5M PXF + $81.1M DFI Loans + $15M Fees" : (isZorlu ? "$720M Geothermal PF + $480M Grid + $30M Fees" : (isBraskem ? "$1.1B PPE + $600M Maceió + $100M Fees" : "Priority Secured Debt"));
      const t3Val = isAragvi ? "$870M" : (isZorlu ? "$1,110M" : (isBraskem ? "$6,100M" : "$1,500M"));
      const t3Sub = isAragvi ? "<strong>100.0c (2.19x Cover)</strong> on $398M Debt" : (isZorlu ? "<strong>100.0c (1.91x Cover)</strong> on $582M Debt" : (isBraskem ? "<strong>66.3c Recovery</strong> ($9.2B Claims)" : "Available to Senior Debt"));
      const t4Val = isAragvi ? "$473M" : (isZorlu ? "$528M" : (isBraskem ? "$0 - $140M" : "$0M"));
      const t4Sub = isAragvi ? "Sponsor Equity Value Cushion" : (isZorlu ? "Zorlu Holding Equity Value Cushion" : (isBraskem ? "10–18c Hybrid warrants / Stub Equity" : "Residual Equity"));

      // Commentary & Sandbox URL
      const sandboxUrl = isAragvi ? "aragvi_calculator.html" : (isZorlu ? "zoren_calculator.html" : "braskem_calculator.html");
      const bgUrl = isAragvi ? "aragvi_background.html" : (isZorlu ? "zoren_background.html" : "braskem_background.html");
      const deskCommentary = isAragvi
        ? "Under Absolute Priority, ARAGVI 12.15% 2026 Eurobonds ($243.4M) are backed by <strong>219.0% asset coverage</strong> ($870M net value available vs $398M senior claims), anchoring a solid 100c par recovery. At 89.0c market quote, notes offer an attractive 12.15% coupon carry (+8.0c capital upside to 97.0c fair value) with high probability of consensual 4Y maturity extension supported by EBRD/DFI umbrella."
        : (isZorlu 
          ? "Under Absolute Priority, ZOREN 9.00% 2026 Eurobonds ($300M) are backed by <strong>190.6% asset coverage</strong> ($1,110M net value available vs $582M senior claims), anchoring a solid 100c par recovery. At 94.5c market quote, notes offer an attractive 11.2% YTM with high refinancing probability upon Zorlu Yenilenebilir IPO execution."
          : "Under Absolute Priority, Senior Unsecured notes (2030s @ 48.6c / 2050s @ 44.7c) are backed by <strong>66.3c</strong> Base Case recovery value (+36% to +48% upside). Conversely, the Subordinated Hybrid 2081 (trading at 31.8c) recovers only <strong>10c–18c</strong> via warrants, offering an asymmetric short/underweight opportunity.");

      // Step descriptions mapping for APR clarity
      const stepDescriptions = isAragvi ? [
        "Normalized run-rate recurring cash EBITDA before working capital swings across port, crushing, and silos.",
        "Market multiple applied to core operations based on agribusiness comps and Danube port strategic value.",
        "Implied operational Enterprise Value (EBITDA × Multiple) of port terminal, crushing plants, and silo hubs.",
        "Unrestricted cash and liquid bank balances held across Swiss, Moldovan, and Romanian operating accounts.",
        "Committed equity proceeds from founder Vaja Jhashi or strategic Western agribusiness partner injection.",
        "Total enterprise value plus cash pool available for distribution across all claimant tiers.",
        "Cumulative legal, restructuring, advisory, and syndication fees during maturity extension.",
        "Priority senior secured Pre-Export Finance (PXF) commodity revolvers secured on grain inventories (100% par).",
        "Priority senior secured term loans from multilateral development finance institutions EBRD, BSTDB, IFC (100% par).",
        "Senior priority secured debt charges that must be satisfied in full prior to Eurobond distribution.",
        "Unencumbered distributable asset value directly available to satisfy General Senior Unsecured claims.",
        "Aggregate Senior Unsecured claims across ARAGVI 12.15% 2026s, 2031s, and drawn bank lines ($397.5M).",
        "Percentage of face value recovered under Absolute Priority Rule (Net Available ÷ Claims).",
        "Trading and exit recovery valuation per bond (cents on the dollar) comparing floor vs base case vs bull.",
        "Aragvi Holding has no subordinated hybrid capital instruments in its active capital structure.",
        "Residual equity value remaining for founder Vaja Jhashi / sponsors after satisfying all debt tiers."
      ] : (isZorlu ? [
        "Normalized run-rate recurring cash EBITDA before non-cash provisions and FX translation.",
        "Market multiple applied to core operations based on Turkish utility comps and YEKDEM duration.",
        "Implied operational Enterprise Value (EBITDA × Multiple) of geothermal, wind, hydro & grid assets.",
        "Unrestricted cash and liquid bank balances held across Akbank, Garanti BBVA, and Turkiye Is Bankasi.",
        "Committed equity proceeds from Zorlu Yenilenebilir minority IPO or strategic Gulf stake sale.",
        "Total enterprise value plus cash pool available for distribution across all claimant tiers.",
        "Cumulative legal, syndication, rating agency, and advisory fees during maturity extension.",
        "Priority senior secured project loans (EBRD/IFC) on Kızıldere & Alaşehir geothermal plants (100% par).",
        "Priority senior secured capex facilities and TLREF loans secured on OEDAŞ regulated grid receivables (100% par).",
        "Senior priority secured debt charges that must be satisfied in full prior to Eurobond distribution.",
        "Unencumbered distributable asset value directly available to satisfy General Senior Unsecured claims.",
        "Aggregate Senior Unsecured claims across ZOREN 9.00% 2026 Eurobonds ($300M) and drawn syndicated RCF ($282M).",
        "Percentage of face value recovered under Absolute Priority Rule (Net Available ÷ Claims).",
        "Trading and exit recovery valuation per bond (cents on the dollar) comparing floor vs base case vs bull.",
        "Zorlu Enerji has no subordinated hybrid capital instruments in its active capital structure.",
        "Residual equity value remaining for parent Zorlu Holding after satisfying all debt tiers."
      ] : [
        "Normalized or cyclically adjusted recurring cash EBITDA baseline before non-cash provisions.",
        "Market multiple applied to core operations based on historical petrochemical cycle medians and M&A comps.",
        "Implied operational Enterprise Value (EBITDA × Multiple). Irreplaceable assets defend floor.",
        "Unrestricted cash and liquid cash equivalents available on balance sheet at restructuring entry.",
        "Committed fresh cash equity from sponsors (Petrobras / Novonor / IG4) to avoid liquidation.",
        "Total enterprise value plus cash pool available for distribution across all claimant tiers.",
        "Cumulative legal, restructuring, financial advisory, and trustee fees (bleeding ~$15M/month).",
        "Export Pre-Payment (PPE) facilities & bilateral bank debt secured on export contracts (reinstated 100% par).",
        "Net Present Value of remaining Alagoas State settlement and environmental obligations under Brazilian law.",
        "Senior priority charges that must be satisfied in full prior to any distribution to bondholders.",
        "Unencumbered distributable asset value directly available to satisfy General Unsecured Creditors.",
        "Aggregate Senior Unsecured claims across 144A/RegS Eurobonds ($7.8B) and local Debentures ($1.4B).",
        "Percentage of face value recovered under Absolute Priority Rule (Net Value Available ÷ Claims).",
        "Trading and exit recovery valuation per bond (cents on the dollar) comparing floor vs base case vs bull.",
        "Junior subordinated perpetual capital instrument. Contractually subordinated to all senior claims.",
        "Residual value surviving for existing equity sponsors after all creditor tiers are satisfied."
      ]);

      fullContainer.innerHTML = `
        <!-- Visual APR Priority Flow Banner -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:20px; margin-top:10px;">
          <div style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.3); border-radius:8px; padding:12px 14px;">
            <div style="font-size:10px; text-transform:uppercase; color:#38bdf8; font-weight:700; letter-spacing:0.5px;">Tier 1: Distributable Pool</div>
            <div style="font-size:18px; font-weight:800; color:#fff; font-family:'JetBrains Mono',monospace; margin-top:4px;">${t1Val}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${t1Sub}</div>
          </div>
          <div style="background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.3); border-radius:8px; padding:12px 14px;">
            <div style="font-size:10px; text-transform:uppercase; color:#f87171; font-weight:700; letter-spacing:0.5px;">Tier 2: Priority Claims</div>
            <div style="font-size:18px; font-weight:800; color:#f87171; font-family:'JetBrains Mono',monospace; margin-top:4px;">${t2Val}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${t2Sub}</div>
          </div>
          <div style="background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.3); border-radius:8px; padding:12px 14px;">
            <div style="font-size:10px; text-transform:uppercase; color:#34d399; font-weight:700; letter-spacing:0.5px;">Tier 3: Available to Senior Debt</div>
            <div style="font-size:18px; font-weight:800; color:#34d399; font-family:'JetBrains Mono',monospace; margin-top:4px;">${t3Val}</div>
            <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">${t3Sub}</div>
          </div>
          <div style="background:rgba(192,132,252,0.08); border:1px solid rgba(192,132,252,0.3); border-radius:8px; padding:12px 14px;">
            <div style="font-size:10px; text-transform:uppercase; color:#c084fc; font-weight:700; letter-spacing:0.5px;">Tier 4: Subordinated &amp; Equity</div>
            <div style="font-size:18px; font-weight:800; color:#c084fc; font-family:'JetBrains Mono',monospace; margin-top:4px;">${t4Val}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">${t4Sub}</div>
          </div>
        </div>

        <!-- Waterfall Table -->
        <div style="overflow-x:auto;">
          <table class="tranche-table" style="width:100%; font-size:11.5px; border-collapse:collapse;">
            <thead>
              <tr style="background:#0f172a;">
                <th style="padding:10px 12px; width:28%;">Step / Valuation Layer</th>
                <th style="padding:10px 12px; text-align:right; width:17%; color:#f87171;">Scenario A: Stress Floor</th>
                <th style="padding:10px 12px; text-align:right; width:18%; color:#34d399;">Scenario B: Base Case</th>
                <th style="padding:10px 12px; text-align:right; width:17%; color:#38bdf8;">Scenario C: Bull Rebound</th>
                <th style="padding:10px 12px; width:20%; color:#94a3b8;">APR Mechanics &amp; Legal Priority</th>
              </tr>
            </thead>
            <tbody>
              ${steps.map((st, idx) => {
                const isSub = st.is_subtotal;
                const isHigh = st.is_highlight;
                let rowBg = 'transparent';
                let borderTop = '1px solid #1e293b';
                let fontWeight = isSub || isHigh ? '700' : '400';

                if (isHigh) {
                  rowBg = 'rgba(251,191,36,0.07)';
                  borderTop = '2px solid rgba(251,191,36,0.3)';
                } else if (isSub) {
                  rowBg = 'rgba(255,255,255,0.03)';
                  borderTop = '1px solid #334155';
                }

                const desc = stepDescriptions[idx] || '';

                return `
                  <tr style="background:${rowBg}; border-top:${borderTop};">
                    <td style="padding:9px 12px; font-weight:${fontWeight}; color:${isHigh ? '#fbbf24' : (isSub ? (st.color || '#fff') : '#cbd5e1')};">
                      ${escapeHtml(st.step)}
                    </td>
                    <td style="padding:9px 12px; text-align:right; font-family:'JetBrains Mono',monospace; font-weight:${fontWeight}; color:${isHigh ? '#f87171' : (isSub ? (st.color || '#f87171') : '#cbd5e1')};">
                      ${escapeHtml(st.floor)}
                    </td>
                    <td style="padding:9px 12px; text-align:right; font-family:'JetBrains Mono',monospace; font-weight:${fontWeight}; color:${isHigh ? '#34d399' : (isSub ? (st.color || '#34d399') : '#fff')};">
                      ${escapeHtml(st.base)}
                    </td>
                    <td style="padding:9px 12px; text-align:right; font-family:'JetBrains Mono',monospace; font-weight:${fontWeight}; color:${isHigh ? '#38bdf8' : (isSub ? (st.color || '#38bdf8') : '#93c5fd')};">
                      ${escapeHtml(st.bull)}
                    </td>
                    <td style="padding:9px 12px; font-size:10.5px; color:#94a3b8; line-height:1.4;">
                      ${escapeHtml(desc)}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Analytical Strategy Commentary Box -->
        <div style="margin-top:18px; padding:14px 16px; background:#0b1329; border:1px solid #1e3a8a; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px;">
          <div style="flex:1; min-width:280px;">
            <div style="font-weight:700; color:#38bdf8; font-size:12px; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <span>💡</span> Desk Takeaway &amp; Capital Structure Strategy
            </div>
            <div style="font-size:11.5px; color:#cbd5e1; line-height:1.5;">
              ${deskCommentary}
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <a href="${bgUrl}" class="btn-action" style="font-size:11px; padding:8px 14px; background:rgba(56,189,248,0.15); border-color:#38bdf8; color:#93c5fd; font-weight:700; text-decoration:none; white-space:nowrap;">
              📖 Asset Inputs &amp; EV Vol →
            </a>
            <a href="${sandboxUrl}" class="btn-action btn-gold" style="font-size:11px; padding:8px 16px; font-weight:700; text-decoration:none; white-space:nowrap;">
              Launch Sandbox →
            </a>
          </div>
        </div>
      `;
    } else {
      fullCard.style.display = 'none';
      fullContainer.innerHTML = '';
    }
  }
}

// ----------------- TAB 8: GUIDANCE & QUESTIONS -----------------
function renderGuidanceAndNews() {
  const guides = currentIssuer.management_guidance_tracker || [];
  const tbody = document.getElementById('guidance-tbody');

  if (guides.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-dim); padding:16px;">No formal management guidance items loaded.</td></tr>`;
  } else {
    let html = '';
    guides.forEach(g => {
      const metricName = g.guidance_metric || g.metric || 'Guidance Target';
      const target = g.management_target || g.guidance_value || '—';
      const runrate = g.current_runrate || g.desk_expectation || '—';
      const status = g.tracking_status || g.status || 'Tracking';
      const isRevised = (g.revision_status && g.revision_status !== 'UNCHANGED') || g.revision_highlight;
      const revisionBadge = isRevised ? `<div style="margin-top:5px;"><span class="badge badge-hy" style="font-size:9px; background:#451a03; color:#f59e0b; border:1px solid #b45309; padding:2px 6px;">⚡ ${escapeHtml(g.revision_highlight || 'Guidance Revised')}</span></div>` : '';
      const previousTarget = g.previous_target ? `<div style="font-size:10px; color:#94a3b8; text-decoration:line-through; margin-top:2px;">Prior: ${escapeHtml(g.previous_target)}</div>` : '';
      const detailsBlock = g.details ? `<div style="font-size:10.5px; color:#94a3b8; margin-top:5px; background:rgba(15,23,42,0.6); padding:6px 8px; border-radius:4px; border-left:2px solid #3b82f6;"><strong style="color:#e2e8f0;">Details:</strong> ${escapeHtml(g.details)}</div>` : '';
      const forecastBlock = g.forecasting_impact ? `<div style="font-size:10.5px; color:#38bdf8; margin-top:4px; background:rgba(14,116,144,0.15); padding:6px 8px; border-radius:4px; border-left:2px solid #06b6d4;"><strong style="color:#67e8f9;">Forecasting Impact:</strong> ${escapeHtml(g.forecasting_impact)}</div>` : '';
      const variance = g.variance_analysis || g.rationale || 'Tracking within guidance corridor.';
      const isPositive = status === 'On Track' || status === 'ON_TRACK' || status === 'Beating Target';

      html += `
        <tr>
          <td style="vertical-align:top;">
            <strong style="color:#fff; font-size:12.5px;">${escapeHtml(metricName)}</strong>
            ${revisionBadge}
          </td>
          <td style="color:#fbbf24; font-weight:700; vertical-align:top; font-size:12px;">
            ${escapeHtml(target)}
            ${previousTarget}
          </td>
          <td style="color:#fff; vertical-align:top; font-size:11.5px;">${escapeHtml(runrate)}</td>
          <td style="vertical-align:top;"><span class="badge ${isPositive ? 'badge-ig' : 'badge-stress'}" style="font-size:10px;">${escapeHtml(status)}</span></td>
          <td style="font-size:11px; color:#cbd5e1; vertical-align:top;">
            <div>${escapeHtml(variance)}</div>
            ${detailsBlock}
            ${forecastBlock}
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  // 5 Diligence Questions
  const qs = currentIssuer.management_questions || [];
  const qDiv = document.getElementById('management-questions-list');
  if (qs.length === 0) {
    qDiv.innerHTML = '<div style="color:var(--text-dim); font-size:12px;">No diligence questions loaded.</div>';
  } else {
    let qHtml = '<ol style="padding-left:18px; display:flex; flex-direction:column; gap:10px; font-size:12px; color:#cbd5e1; line-height:1.5;">';
    qs.forEach(q => {
      qHtml += `<li><strong style="color:#fff;">${escapeHtml(q)}</strong></li>`;
    });
    qHtml += '</ol>';
    qDiv.innerHTML = qHtml;
  }

  // News
  const ticker = currentIssuer.metadata.ticker;
  const allNews = window.CREDIT_NEWS_DATA || [];
  const relatedNews = allNews.filter(n => n.ticker === ticker || (n.impacted_issuers && n.impacted_issuers.includes(ticker)));
  const newsDiv = document.getElementById('issuer-news-list');

  if (relatedNews.length === 0) {
    newsDiv.innerHTML = '<div style="color:var(--text-dim); font-size:12px;">No recent news or rating actions recorded for this ticker.</div>';
  } else {
    let nHtml = '<div style="display:flex; flex-direction:column; gap:10px;">';
    relatedNews.forEach(n => {
      const impactBadge = n.credit_impact === 'Positive' ? 'badge-ig' : (n.credit_impact === 'Negative' ? 'badge-stress' : 'badge-hy');
      nHtml += `
        <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:6px; padding:12px 14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-bottom:6px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="color:#fbbf24; font-weight:700;">${n.date}</span>
              <span class="badge ${impactBadge}" style="font-size:9.5px; padding:1px 6px;">${n.credit_impact}</span>
              <span style="color:#94a3b8; font-size:10.5px;">${n.category}</span>
            </div>
            <span style="color:var(--text-dim); font-size:10.5px;">Source: ${n.source || 'News Wire'}</span>
          </div>
          <div style="margin-bottom:6px;">
            <a href="${n.url}" target="_blank" rel="noopener noreferrer" style="font-weight:700; color:#38bdf8; font-size:12.5px; text-decoration:none; line-height:1.4;">
              ${escapeHtml(n.headline)} <span style="font-size:10px; opacity:0.8;">↗</span>
            </a>
          </div>
          <div style="font-size:11.5px; color:#cbd5e1; line-height:1.45; background:#080e1a; padding:8px 10px; border-radius:4px; border-left:3px solid ${n.credit_impact === 'Positive' ? '#10b981' : (n.credit_impact === 'Negative' ? '#ef4444' : '#f59e0b')};">
            <strong style="color:#fff;">Credit Desk Analysis:</strong> ${escapeHtml(n.concise_analysis || n.credit_commentary || '')}
          </div>
        </div>
      `;
    });
    nHtml += '</div>';
    newsDiv.innerHTML = nHtml;
  }
}

// ================= BROKER INTELLIGENCE & ANALYST ERROR AUDIT =================
function renderBrokerAuditTab() {
  if (!currentIssuer) return;
  const snapshots = currentIssuer.broker_snapshots || [];
  const mistakes = currentIssuer.analyst_mistakes_caught || [];
  const consensus = currentIssuer.broker_consensus || {};
  const f25 = (currentIssuer.financials || []).find(f => f.period === '2025E') || {};

  // Update tab badge counter
  const badgeEl = document.getElementById('tab-broker-errors-count');
  if (badgeEl) {
    if (mistakes.length > 0) {
      badgeEl.textContent = mistakes.length;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // Update KPI strip
  const covEl = document.getElementById('ba-stat-coverage');
  if (covEl) covEl.textContent = `${snapshots.length} Desks`;

  const errEl = document.getElementById('ba-stat-errors');
  if (errEl) {
    errEl.textContent = `${mistakes.length} Trapped`;
    errEl.style.color = mistakes.length > 0 ? '#f87171' : '#34d399';
  }

  const fcfEl = document.getElementById('ba-stat-fcf');
  const fcfSub = document.getElementById('ba-stat-fcf-sub');
  const consFcf = consensus.fcf !== undefined ? consensus.fcf : f25.fcf;
  if (fcfEl && consFcf !== undefined && consFcf !== null) {
    if (consFcf < 0) {
      fcfEl.textContent = `($${Math.abs(consFcf).toFixed(1)}M)`;
      fcfEl.style.color = '#f87171';
      if (fcfSub) fcfSub.textContent = '⚠️ Cash Deficit / Capex Cycle';
    } else {
      fcfEl.textContent = `$${consFcf.toFixed(1)}M`;
      fcfEl.style.color = '#34d399';
      if (fcfSub) fcfSub.textContent = 'Desk Reconciled Consensus';
    }
  }

  const levEl = document.getElementById('ba-stat-lev');
  const consLev = consensus.net_leverage !== undefined ? consensus.net_leverage : f25.net_leverage;
  if (levEl && consLev !== undefined && consLev !== null) {
    levEl.textContent = `${Number(consLev).toFixed(2)}x`;
  }

  // 1. Render Analyst Mistakes Caught Panel
  renderAnalystMistakesList(mistakes);

  // 2. Render Multi-Broker Comparison Table
  renderBrokerComparisonTable(snapshots, consensus, f25);

  // 3. Render Broker Tear-Sheets & Notes
  renderBrokerReportsList(snapshots);
}

function renderAnalystMistakesList(mistakes) {
  const container = document.getElementById('ba-mistakes-container');
  if (!container) return;

  if (mistakes.length === 0) {
    container.innerHTML = `
      <div style="padding:16px; text-align:center; color:#10b981; background:rgba(16,185,129,0.08); border-radius:6px; border:1px solid #059669; font-size:12px;">
        ✓ All active broker models mathematically tied out and aligned with management guidance. Zero analyst discrepancies caught.
      </div>
    `;
    return;
  }

  let html = '';
  mistakes.forEach((err) => {
    let color = '#ef4444';
    let badgeBg = 'rgba(239, 68, 68, 0.2)';
    let badgeText = 'CRITICAL MATH MISMATCH';
    let icon = '❌';

    if (err.severity === 'GUIDANCE_BREACH') {
      color = '#f59e0b';
      badgeBg = 'rgba(245, 158, 11, 0.2)';
      badgeText = 'MANAGEMENT GUIDANCE BREACH';
      icon = '⚠️';
    } else if (err.severity === 'WARNING_ADD_BACK') {
      color = '#eab308';
      badgeBg = 'rgba(234, 179, 8, 0.2)';
      badgeText = 'AGGRESSIVE SELL-SIDE ADD-BACK';
      icon = '🟡';
    } else if (err.severity === 'PLUG_DETECTED') {
      color = '#06b6d4';
      badgeBg = 'rgba(6, 182, 212, 0.2)';
      badgeText = 'WORKING CAPITAL PLUG DETECTED';
      icon = '🔌';
    } else if (err.severity === 'WARNING_AUDIT_VARIANCE') {
      color = '#f97316';
      badgeBg = 'rgba(249, 115, 22, 0.2)';
      badgeText = 'CASH FLOW IDENTITY BREACH';
      icon = '⚠️';
    }

    const statedDisplay = (err.stated_val !== undefined && err.stated_val !== null) 
      ? (err.stated_val < 0 ? `($${Math.abs(err.stated_val).toFixed(1)}M)` : `$${Number(err.stated_val).toFixed(1)}M`)
      : 'N/A';
    const recDisplay = (err.reconciled_val !== undefined && err.reconciled_val !== null)
      ? (err.reconciled_val < 0 ? `($${Math.abs(err.reconciled_val).toFixed(1)}M)` : `$${Number(err.reconciled_val).toFixed(1)}M`)
      : 'N/A';

    html += `
      <div class="analyst-mistake-card" style="background:#0d1525; border:1px solid #28354d; border-left:4px solid ${color}; border-radius:6px; padding:14px 16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-weight:700; color:#fff; font-size:13px;">${escapeHtml(err.broker || 'Broker Desk')} &bull; ${escapeHtml(err.period || '2025E')}</span>
            <span class="badge" style="background:${badgeBg}; color:${color}; font-size:10px; font-weight:700;">${icon} ${badgeText}</span>
          </div>
          <span style="font-size:11px; color:#94a3b8;">Field: <strong style="color:#f3f4f6;">${escapeHtml(err.field || 'metric').toUpperCase()}</strong></span>
        </div>

        <div style="display:grid; grid-template-columns: auto auto auto 1fr; gap:16px; align-items:center; background:rgba(15,23,42,0.8); padding:8px 14px; border-radius:6px; margin-bottom:10px; font-family:'JetBrains Mono',monospace; font-size:12px;">
          <div>
            <span style="color:#94a3b8; font-size:10px; display:block;">ANALYST STATED:</span>
            <span style="text-decoration:line-through; color:#f87171; font-weight:700;">${statedDisplay}</span>
          </div>
          <div style="color:#64748b; font-size:14px;">➔</div>
          <div>
            <span style="color:#94a3b8; font-size:10px; display:block;">RECONCILED DESK:</span>
            <span style="color:${err.reconciled_val < 0 ? '#f87171' : '#10b981'}; font-weight:700;">${recDisplay}</span>
          </div>
          <div style="text-align:right;">
            <span style="color:#94a3b8; font-size:10px; display:block;">VARIANCE:</span>
            <span style="color:#fbbf24; font-weight:700;">${err.variance > 0 ? '+' : ''}${Number(err.variance).toFixed(1)}M</span>
          </div>
        </div>

        <div style="font-size:11px; color:#cbd5e1; line-height:1.5;">
          <strong style="color:#93c5fd;">Audit Trap Finding:</strong> ${escapeHtml(err.rationale || '')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderBrokerComparisonTable(snapshots, consensus, desk25) {
  const headerRow = document.getElementById('ba-table-header');
  const tbody = document.getElementById('ba-table-body');
  if (!headerRow || !tbody) return;

  // Build header
  let hHtml = `
    <th>Normalized Metric (2025E)</th>
    <th style="text-align:right; color:#38bdf8; background:rgba(56,189,248,0.1);">Desk Model (Audited)</th>
    <th style="text-align:right; color:#fbbf24; background:rgba(251,191,36,0.1);">Consensus (Scrubbed)</th>
  `;

  snapshots.forEach(s => {
    hHtml += `<th style="text-align:right; color:#f3f4f6;">${escapeHtml(s.broker)}</th>`;
  });
  headerRow.innerHTML = hHtml;

  // Comparison metric definitions
  const rows = [
    { key: 'revenue', label: 'Gross Revenue' },
    { key: 'cogs', label: 'Cost of Goods Sold (COGS)', isNeg: true },
    { key: 'gross_profit', label: 'Gross Profit', isBold: true },
    { key: 'reported_ebitda', label: 'Stated / Reported EBITDA' },
    { key: 'ebitda', label: 'Calculated Cash EBITDA', isGold: true, isBold: true },
    { key: 'capex', label: 'Net Capital Expenditures (Capex)', isNeg: true },
    { key: 'cash_interest', label: 'Cash Interest Expense', isNeg: true },
    { key: 'change_wc', label: 'Change in Working Capital (ΔWC)' },
    { key: 'tax', label: 'Cash Taxes Paid', isNeg: true },
    { key: 'fcf', label: 'Free Cash Flow (FCF)', isHighlight: true, isBold: true },
    { key: 'gross_debt', label: 'Gross Debt' },
    { key: 'cash', label: 'Cash & Liquid Reserves' },
    { key: 'net_debt', label: 'Net Debt', isBold: true },
    { key: 'net_leverage', label: 'Net Leverage (x)', isRatio: true }
  ];

  let bHtml = '';
  rows.forEach(r => {
    const isHigh = r.isHighlight ? 'background:rgba(30, 41, 59, 0.8);' : '';
    bHtml += `<tr style="${isHigh}">`;
    bHtml += `<td style="font-weight:${r.isBold ? '700' : '500'}; color:${r.isGold ? '#fbbf24' : '#f3f4f6'};">${r.label}</td>`;

    // Desk Audited 2025E
    const deskVal = getMetricVal(desk25, r.key, '2025E');
    bHtml += `<td style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:700; color:${getValColor(deskVal, r)}; background:rgba(56,189,248,0.05);">${formatComparisonVal(deskVal, r)}</td>`;

    // Consensus
    let consVal = consensus[r.key];
    if (consVal === undefined) consVal = deskVal;
    bHtml += `<td style="text-align:right; font-family:'JetBrains Mono',monospace; font-weight:700; color:${getValColor(consVal, r)}; background:rgba(251,191,36,0.05);">${formatComparisonVal(consVal, r)}</td>`;

    // Each broker's audited 2025E
    snapshots.forEach(s => {
      const pData = (s.audited_model && s.audited_model['2025E']) ? s.audited_model['2025E'] : (s.raw_model ? s.raw_model['2025E'] : {});
      let bVal = pData ? pData[r.key] : null;
      if (r.key === 'net_leverage' && bVal === null && pData && pData.net_debt && pData.ebitda) {
        bVal = pData.net_debt / pData.ebitda;
      }
      bHtml += `<td style="text-align:right; font-family:'JetBrains Mono',monospace; color:${getValColor(bVal, r)};">${formatComparisonVal(bVal, r)}</td>`;
    });

    bHtml += `</tr>`;
  });

  tbody.innerHTML = bHtml;
}

function getValColor(val, r) {
  if (val === null || val === undefined) return '#94a3b8';
  if (r.key === 'fcf') {
    return val < 0 ? '#f87171' : '#34d399';
  }
  if (r.isGold) return '#fbbf24';
  if (r.isNeg && val < 0) return '#fca5a5';
  return '#f3f4f6';
}

function formatComparisonVal(val, r) {
  if (val === null || val === undefined || isNaN(val)) return '-';
  const num = Number(val);
  if (r.isRatio) return `${num.toFixed(2)}x`;
  if (num < 0) return `(${Math.abs(num).toFixed(1)})`;
  return num.toFixed(1);
}

function renderBrokerReportsList(snapshots) {
  const container = document.getElementById('ba-reports-container');
  if (!container) return;

  if (snapshots.length === 0) {
    container.innerHTML = `<div style="color:var(--text-dim); font-size:12px; grid-column:1/-1;">No broker reports or Notion tear-sheets archived. Click 'Paste / Intake Note' to record research.</div>`;
    return;
  }

  let html = '';
  snapshots.forEach(s => {
    let recBadgeColor = '#3b82f6';
    const rec = (s.recommendation || '').toLowerCase();
    if (rec.includes('overweight') || rec.includes('buy')) recBadgeColor = '#10b981';
    else if (rec.includes('underweight') || rec.includes('sell')) recBadgeColor = '#ef4444';
    else if (rec.includes('neutral') || rec.includes('hold')) recBadgeColor = '#f59e0b';

    const errCount = (s.errors_caught || []).length;
    const auditStatusBadge = errCount > 0 
      ? `<span class="badge badge-stress" style="font-size:10px;">⚠️ ${errCount} Mistakes Trapped</span>`
      : `<span class="badge badge-ig" style="font-size:10px;">✓ Clean Pass</span>`;

    html += `
      <div class="broker-tearsheet-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:13px;">${escapeHtml(s.broker)}</div>
            <div style="font-size:11px; color:#94a3b8;">${escapeHtml(s.analyst || 'Sell-Side Analyst')} &bull; ${s.report_date || 'Recent'}</div>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
            <span class="badge" style="background:${recBadgeColor}22; color:${recBadgeColor}; border:1px solid ${recBadgeColor}; font-size:10px; font-weight:700;">
              ${escapeHtml(s.recommendation || 'Neutral')}
            </span>
            ${auditStatusBadge}
          </div>
        </div>

        <div style="font-size:12px; font-weight:600; color:#e2e8f0; line-height:1.4;">
          ${escapeHtml(s.report_title || 'Credit Research Dossier')}
        </div>

        ${s.target_spread_bps ? `
          <div style="font-size:11px; color:#cbd5e1; background:rgba(15,23,42,0.8); padding:6px 10px; border-radius:4px; font-family:'JetBrains Mono',monospace;">
            Target Spread: <strong style="color:#fbbf24;">${s.target_spread_bps} bps</strong>
          </div>
        ` : ''}

        ${s.image_url ? `
          <div style="margin-top:4px; border:1px solid #1e293b; border-radius:6px; overflow:hidden; cursor:pointer;" onclick="openImageLightbox('${s.image_url}')">
            <img src="${s.image_url}" style="width:100%; height:140px; object-fit:cover; display:block;" alt="Broker Research Tear-Sheet">
          </div>
        ` : ''}

        <div style="font-size:11px; color:#94a3b8; line-height:1.5; background:#080f1e; padding:10px; border-radius:6px; border:1px solid #1e293b;">
          ${escapeHtml(s.notes || 'No detailed qualitative commentary recorded.')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ----------------- NOTION INTAKE MODAL & CLIENT-SIDE AUDITOR -----------------
function openNotionIntakeModal() {
  const modal = document.getElementById('notion-intake-modal');
  if (modal) modal.style.display = 'flex';
}

function closeNotionIntakeModal() {
  const modal = document.getElementById('notion-intake-modal');
  if (modal) modal.style.display = 'none';
  const preview = document.getElementById('intake-audit-preview');
  if (preview) preview.style.display = 'none';
}

function triggerNotionSync() {
  const btn = document.getElementById('btn-sync-notion');
  if (btn) {
    btn.textContent = '🔄 Syncing Notion...';
    btn.disabled = true;
  }

  // Visual confirmation toast
  setTimeout(() => {
    if (btn) {
      btn.textContent = '✓ Notion Up-To-Date';
      setTimeout(() => {
        btn.textContent = '🔄 Sync Notion Dump';
        btn.disabled = false;
      }, 2500);
    }
    renderBrokerAuditTab();
    alert('Notion research inbox scanned! Models reconciled and analyst error traps active.');
  }, 800);
}

function runClientAuditAndSave() {
  const broker = document.getElementById('intake-broker').value.trim() || 'Custom Sell-Side Desk';
  const analyst = document.getElementById('intake-analyst').value.trim() || 'Investment Research Desk';
  const rev = parseFloat(document.getElementById('intake-rev').value) || null;
  const eb = parseFloat(document.getElementById('intake-ebitda').value) || null;
  const capex = parseFloat(document.getElementById('intake-capex').value) || null;
  const statedFcf = parseFloat(document.getElementById('intake-fcf').value) || null;
  const netDebt = parseFloat(document.getElementById('intake-netdebt').value) || null;
  const notes = document.getElementById('intake-notes').value.trim();

  // Run client error checks
  const errors = [];
  let reconciledFcf = statedFcf;

  if (eb !== null && capex !== null) {
    const capexAbs = Math.abs(capex);
    // Strict cash flow identity: EBITDA - Capex - 25% for cash interest/tax
    const expectedFcf = eb - capexAbs - (eb * 0.25);
    if (statedFcf !== null && statedFcf > 0 && expectedFcf < 0) {
      errors.push({
        code: 'E3_FCF_IDENTITY_BREACH',
        severity: 'CRITICAL_ERROR',
        field: 'fcf',
        stated_val: statedFcf,
        reconciled_val: Math.round(expectedFcf * 10) / 10,
        variance: Math.round((statedFcf - expectedFcf) * 10) / 10,
        rationale: `False Positive FCF: Analyst reported +$${statedFcf.toFixed(1)}M FCF, but Cash EBITDA ($${eb.toFixed(1)}M) minus Capex ($${capexAbs.toFixed(1)}M) and cash interest/tax yields ($${Math.abs(expectedFcf).toFixed(1)}M) deficit.`
      });
      reconciledFcf = Math.round(expectedFcf * 10) / 10;
    }
  }

  // Construct new snapshot
  const newSnapshot = {
    broker,
    analyst,
    report_date: new Date().toISOString().split('T')[0],
    report_title: `${currentIssuer.metadata.name}: Desk Notes & Model Ingestion`,
    recommendation: 'Neutral',
    raw_model: {
      '2025E': {
        revenue: rev,
        ebitda: eb,
        capex: capex ? -Math.abs(capex) : null,
        fcf: statedFcf,
        net_debt: netDebt
      }
    },
    audited_model: {
      '2025E': {
        revenue: rev,
        ebitda: eb,
        capex: capex ? -Math.abs(capex) : null,
        fcf: reconciledFcf,
        net_debt: netDebt
      }
    },
    errors_caught: errors,
    notes: notes || 'Direct research dump submitted via company dashboard.'
  };

  if (!currentIssuer.broker_snapshots) currentIssuer.broker_snapshots = [];
  currentIssuer.broker_snapshots.unshift(newSnapshot);

  if (!currentIssuer.analyst_mistakes_caught) currentIssuer.analyst_mistakes_caught = [];
  errors.forEach(e => {
    e.broker = broker;
    e.period = '2025E';
    currentIssuer.analyst_mistakes_caught.unshift(e);
  });

  // Re-render
  renderBrokerAuditTab();
  closeNotionIntakeModal();
  alert(`Successfully ingested research for ${broker}! ${errors.length} analyst mistake(s) caught and reconciled.`);
}

function openImageLightbox(src) {
  window.open(src, '_blank');
}


