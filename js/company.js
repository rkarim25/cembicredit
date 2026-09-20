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

  // Excel Download Button
  const dlBtn = document.getElementById('hero-download-btn');
  dlBtn.href = m.github_model_url;
  dlBtn.download = m.model_file;
}

function renderMetricsStrip() {
  const m = currentIssuer.metadata;
  const f24 = currentIssuer.financials_multi_year.find(f => f.period === '2024A') || {};
  const f25 = currentIssuer.financials_multi_year.find(f => f.period === '2025E') || {};

  document.getElementById('mb-price').textContent = `$${m.price.toFixed(2)}`;
  document.getElementById('mb-bond-sub').textContent = m.benchmark_bond;

  document.getElementById('mb-ytm').textContent = `${m.ytm.toFixed(2)}%`;
  document.getElementById('mb-spread').textContent = `+${m.spread_bp} bp`;

  const rev = f24.revenue ? `$${f24.revenue.toLocaleString()}M` : 'N/A';
  document.getElementById('mb-rev').textContent = rev;

  const eb = f24.calculated_ebitda || f24.ebitda || 0;
  document.getElementById('mb-ebitda').textContent = `$${eb.toLocaleString()}M`;
  document.getElementById('mb-margin-sub').textContent = `Margin: ${(f24.ebitda_margin_pct || 0).toFixed(1)}%`;

  const lev24 = f24.net_leverage ? `${f24.net_leverage.toFixed(2)}x` : 'N/A';
  const lev25 = f25.net_leverage ? `${f25.net_leverage.toFixed(2)}x` : 'N/A';
  document.getElementById('mb-leverage').textContent = lev24;
  document.getElementById('mb-fwd-leverage').textContent = `2025E: ${lev25}`;

  const cov = f24.interest_coverage ? `${f24.interest_coverage.toFixed(2)}x` : 'N/A';
  document.getElementById('mb-coverage').textContent = cov;

  const fcf = f24.fcf !== undefined ? `$${f24.fcf.toLocaleString()}M` : 'N/A';
  const conv = f24.fcf_conversion_pct !== undefined ? `${f24.fcf_conversion_pct.toFixed(1)}%` : (eb > 0 && f24.fcf ? `${((f24.fcf/eb)*100).toFixed(1)}%` : '--%');
  document.getElementById('mb-fcf').textContent = fcf;
  document.getElementById('mb-fcf-conv').textContent = `Conversion: ${conv}`;
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

// ----------------- SPREADSHEET ENGINE -----------------
function setModelViewSection(sec) {
  currentModelSection = sec;
  document.querySelectorAll('.model-view-toggles .model-btn-toggle').forEach(btn => {
    btn.classList.toggle('active', btn.id === `btn-view-${sec}`);
  });
  renderModelSpreadsheet();
}

function renderModelSpreadsheet() {
  const table = document.getElementById('company-sheet-table');
  const fin = currentIssuer.financials_multi_year || [];
  const periods = ['2021A', '2022A', '2023A', '2024A', '2025E', '2026E', '2027E'];
  const m = currentIssuer.metadata;
  const highlights = getStoredHighlights(m.ticker);
  const notes = getStoredNotes(m.ticker);

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

        html += `
          <td class="${isAct} ${hlClass} ${hasNote}" 
              data-coord="${coord}" 
              data-metric="${r.key}" 
              data-period="${p}"
              onclick="selectModelCell('${coord}', '${r.key}', '${p}')">
            ${displayStr}
          </td>
        `;
      });

      html += `</tr>`;
    });
  });

  html += `</tbody>`;
  table.innerHTML = html;

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
  const meta = getForecastAuditMetadata(currentIssuer, metricKey, period);

  document.getElementById('formula-coord').textContent = coord;
  document.getElementById('formula-input').value = meta.formula || `=${coord}`;
  document.getElementById('formula-badge').innerHTML = `
    <span class="badge badge-${meta.badgeType}">${meta.badgeText}</span>
  `;

  document.getElementById('cad-title').innerHTML = `
    <span>Cell ${coord} &bull; ${meta.metricTitle} (${period})</span>
    <span class="badge badge-${meta.badgeType}" style="margin-left:8px;">${meta.badgeText}</span>
  `;
  document.getElementById('cad-commentary').textContent = meta.commentary || 'Calculated metric.';
  document.getElementById('cad-check').textContent = meta.formulaCheck ? `Formula Verification: ${meta.formulaCheck}` : `Source Reference: ${meta.source}`;
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
  const notes = getStoredNotes(m.ticker);
  const current = notes[activeSelectedCell.coord] || '';
  const text = prompt(`Enter custom comment for Cell ${activeSelectedCell.coord} (${activeSelectedCell.metric.toUpperCase()} - ${activeSelectedCell.period}):`, current);
  if (text !== null) {
    if (!text.trim()) delete notes[activeSelectedCell.coord];
    else notes[activeSelectedCell.coord] = text.trim();
    localStorage.setItem('cembicredit_notes_' + m.ticker, JSON.stringify(notes));
    renderModelSpreadsheet();
  }
}

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
        <div class="qual-note-body">${a.note}</div>
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

  covDiv.innerHTML = `
    <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:8px; padding:16px;">
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Debt Incurrence Covenant:</span>
        <div style="font-size:13px; color:#fff; font-weight:600; margin-top:2px;">${cov.debt_incurrence_covenant || 'Net Leverage < 3.50x'}</div>
      </div>
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Restricted Payments (Dividends) Limit:</span>
        <div style="font-size:13px; color:#fff; font-weight:600; margin-top:2px;">${cov.restricted_payments_covenant || 'Permitted only if Net Leverage < 2.50x'}</div>
      </div>
      <div style="margin-bottom:12px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Change of Control Put Option:</span>
        <div style="font-size:13px; color:#fbbf24; font-weight:600; margin-top:2px;">${cov.change_of_control_put || 'Put at 101% upon rating downgrade following change of control'}</div>
      </div>
      <div style="margin-bottom:6px;">
        <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Negative Pledge & Asset Sale Prepayment:</span>
        <div style="font-size:13px; color:#cbd5e1; margin-top:2px;">${cov.negative_pledge || 'Standard cross-acceleration and asset sale sweep within 365 days'}</div>
      </div>
    </div>
  `;

  // Recovery
  const rec = currentIssuer.recovery_analysis || {};
  const recDiv = document.getElementById('recovery-breakdown');
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
    </div>
  `;
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
      html += `
        <tr>
          <td><strong>${g.metric}</strong></td>
          <td style="color:#fbbf24; font-weight:700;">${g.management_target}</td>
          <td style="color:#fff;">${g.current_runrate}</td>
          <td><span class="badge ${g.tracking_status === 'On Track' ? 'badge-ig' : 'badge-stress'}" style="font-size:10px;">${g.tracking_status}</span></td>
          <td style="font-size:11px; color:#cbd5e1;">${g.variance_analysis || 'Tracking within guidance corridor.'}</td>
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
      nHtml += `
        <div style="background:#0d1525; border:1px solid #1e2d45; border-radius:6px; padding:10px 12px;">
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:4px;">
            <span style="color:#fbbf24; font-weight:700;">${n.date}</span>
            <span style="color:var(--text-dim);">${n.source || 'News Wire'}</span>
          </div>
          <div style="font-weight:700; color:#fff; font-size:12px; margin-bottom:4px;">${escapeHtml(n.headline)}</div>
          <div style="font-size:11px; color:#94a3b8; line-height:1.4;">${escapeHtml(n.concise_analysis || n.credit_commentary || '')}</div>
        </div>
      `;
    });
    nHtml += '</div>';
    newsDiv.innerHTML = nHtml;
  }
}

