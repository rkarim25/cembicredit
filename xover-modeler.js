/**
 * xover-modeler.js — iTraxx Europe Crossover: USD Investor PnL & Currency Risk Modeler
 * Full cross-currency CDS engine with spread duration sizing, FX overlay hedging,
 * dual synchronized historical charts, override-ready backtesting, and 2D scenario stress matrix.
 */

(function () {
  "use strict";

  // Core Model State
  const state = {
    // Sizing & Direction
    direction: "sell", // "sell" = Long Risk / Tightener; "buy" = Short Risk / Widener / Hedge
    portfolioNavUsd: 100000000, // $100M USD
    sizingMode: "spread_duration", // "spread_duration" or "notional"
    targetSpreadDurationYears: 0.50, // 0.50 yrs spread duration
    xoverSpreadDuration: 4.30, // 4.30 yrs benchmark duration
    notionalEur: 9934137,
    notionalUsd: 11627907,

    // FX Hedge Overlay
    fxHedgePct: 10.0, // % of portfolio NAV
    fxHedgeStance: "short_eur", // "short_eur", "long_eur", "none"

    // Historical Backtest & Indicative Levels
    entryDate: "2026-01-05",
    exitDate: "2026-09-24",
    entrySpreadBps: 252.0,
    exitSpreadBps: 296.0,
    entryEurUsd: 1.1705,
    exitEurUsd: 1.1390,
    annualCarryBps: 252.0,
    holdingDays: 262,

    // Historical baseline values for override tracking
    histEntrySpread: 252.0,
    histExitSpread: 296.0,
    histEntryEurUsd: 1.1705,
    histExitEurUsd: 1.1390,
    holdingDays: 262,

    // Override flags
    overrideEntrySpread: false,
    overrideExitSpread: false,
    overrideEntryFx: false,
    overrideExitFx: false,
    overrideHoldingDays: false,
    overrideCarry: false,

    // Charting
    chartRange: "1Y", // "3M", "6M", "1Y", "2Y", "ALL"
    hoverIdx: null,

    // Scenario Analysis
    scenarioSpreadDuration: 0.50,
    scenarioEntrySpread: 296.0,
    scenarioEntryFx: 1.1392,
    scenarioDays: 90,
    scenarioSpreadShift: -25.0, // bps
    scenarioFxPct: -2.5, // %
    scenarioCarryBps: 296.0,
    matrixViewMode: "bps", // "bps", "usd", "hedge_contrib", "unhedged_bps"
    matrixPreset: "standard", // "standard", "tight", "stress", "rally"
    activeSection: "backtest", // "backtest" or "scenario"
    scenarioList: [],
  };

  const DEFAULT_SCENARIOS = [
    { id: "base", name: "Status Quo (Pure Carry Harvest)", desc: "Spreads & FX unchanged; clip coupon carry", spreadShift: 0, fxPct: 0.0, days: 90 },
    { id: "soft_land", name: "Soft Landing (Mild Compression)", desc: "Spreads compress 25 bps with modest EUR rally", spreadShift: -25, fxPct: 1.5, days: 90 },
    { id: "risk_on", name: "Aggressive Risk-On Rally", desc: "Broad compression to cycle lows; strong EUR", spreadShift: -50, fxPct: 3.5, days: 180 },
    { id: "mild_decomp", name: "Mild European Decompression", desc: "Growth slowdown decompresses spreads; EUR dips", spreadShift: 35, fxPct: -2.5, days: 90 },
    { id: "stagflation", name: "European Stagflation / Decompression", desc: "Energy shock / recession; ECB easing weakens EUR", spreadShift: 75, fxPct: -5.0, days: 90 },
    { id: "crisis_blowout", name: "Severe Blowout (Tariff / Crisis)", desc: "Rapid decompression shock (April 2025 style); EUR drops", spreadShift: 130, fxPct: -8.0, days: 60 },
    { id: "dollar_surge", name: "Isolated FX Shock (Dollar Spike)", desc: "Spreads flat; USD strength drives EUR down 5%", spreadShift: 0, fxPct: -5.0, days: 90 },
    { id: "custom_1", name: "Custom Scenario A", desc: "User-defined custom macro scenario", spreadShift: -35, fxPct: -2.0, days: 90 },
    { id: "custom_2", name: "Custom Scenario B", desc: "User-defined custom stress scenario", spreadShift: 50, fxPct: 0.0, days: 120 },
  ];

  state.scenarioList = JSON.parse(JSON.stringify(DEFAULT_SCENARIOS));

  let rawHistory = [];
  let fxSummary = null;

  // Formatting helpers
  const fmtUsd = (val, decimals = 0) => {
    const sign = val < 0 ? "-" : val > 0 ? "+" : "";
    return `${sign}$${Math.abs(val).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  const fmtEur = (val, decimals = 0) => {
    const sign = val < 0 ? "-" : val > 0 ? "+" : "";
    return `${sign}€${Math.abs(val).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  const fmtBps = (val, decimals = 1) => {
    const sign = val > 0 ? "+" : "";
    return `${sign}${val.toFixed(decimals)} bps`;
  };

  const fmtPct = (val, decimals = 2) => {
    const sign = val > 0 ? "+" : "";
    return `${sign}${val.toFixed(decimals)}%`;
  };

  // Safe element lookup
  const el = (id) => document.getElementById(id);

  async function initModeler() {
    try {
      const resp = await fetch("credit_data.json?v=" + Date.now());
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const data = await resp.json();
      rawHistory = data.history || [];
      fxSummary = (data.fx && data.fx.eur_usd) || null;
    } catch (e) {
      console.warn("Modeler: Falling back to embedded credit data", e);
      const fallbackEl = el("creditFallbackData");
      if (fallbackEl) {
        try {
          const d = JSON.parse(fallbackEl.textContent);
          rawHistory = d.history || [];
          fxSummary = (d.fx && d.fx.eur_usd) || null;
        } catch (err) {
          console.error("Modeler fallback failed", err);
        }
      }
    }

    if (!rawHistory.length) return;

    // Set initial dates from history
    const latestRow = rawHistory[rawHistory.length - 1];
    state.exitDate = latestRow.date;

    // Preserve initial entry date if present in history, else default to Jan 2026 / 6M ago
    if (!rawHistory.some((r) => r.date === state.entryDate)) {
      const janIdx = rawHistory.findIndex((r) => r.date >= "2026-01-05");
      state.entryDate = janIdx >= 0 ? rawHistory[janIdx].date : rawHistory[Math.max(0, rawHistory.length - 180)].date;
    }

    // Populate indicative levels from historical data
    syncDatesFromHistory();
    syncSizing("duration");

    state.scenarioEntrySpread = latestRow.itraxx_xover || 296.0;
    state.scenarioEntryFx = latestRow.eur_usd || 1.1392;
    state.scenarioCarryBps = state.scenarioEntrySpread;
    state.scenarioSpreadDuration = state.targetSpreadDurationYears;

    setupDomListeners();
    renderAll();
  }

  // Find exact or closest preceding historical row
  function findHistoricalRow(dateStr) {
    if (!rawHistory.length) return null;
    let match = rawHistory.find((r) => r.date === dateStr);
    if (match) return match;

    // Find closest previous date
    for (let i = rawHistory.length - 1; i >= 0; i--) {
      if (rawHistory[i].date <= dateStr) {
        return rawHistory[i];
      }
    }
    return rawHistory[0];
  }

  function syncDatesFromHistory() {
    const entryRow = findHistoricalRow(state.entryDate);
    const exitRow = findHistoricalRow(state.exitDate);

    if (entryRow) {
      state.histEntrySpread = entryRow.itraxx_xover;
      state.histEntryEurUsd = entryRow.eur_usd || 1.1392;
      if (!state.overrideEntrySpread) state.entrySpreadBps = state.histEntrySpread;
      if (!state.overrideEntryFx) state.entryEurUsd = state.histEntryEurUsd;
      if (!state.overrideCarry) state.annualCarryBps = state.entrySpreadBps;
    }

    if (exitRow) {
      state.histExitSpread = exitRow.itraxx_xover;
      state.histExitEurUsd = exitRow.eur_usd || 1.1392;
      if (!state.overrideExitSpread) state.exitSpreadBps = state.histExitSpread;
      if (!state.overrideExitFx) state.exitEurUsd = state.histExitEurUsd;
    }

    // Compute calendar holding days
    const d1 = new Date(state.entryDate);
    const d2 = new Date(state.exitDate);
    const diffTime = Math.max(0, d2 - d1);
    state.histHoldingDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    if (!state.overrideHoldingDays) state.holdingDays = state.histHoldingDays;
  }

  // Bi-directional sizing synchronization
  function syncSizing(source = "duration") {
    const fx = state.entryEurUsd || 1.1392;
    if (source === "duration") {
      // Notional USD = (Portfolio * TargetSpreadDuration) / BenchmarkSpreadDuration
      state.notionalUsd = (state.portfolioNavUsd * state.targetSpreadDurationYears) / state.xoverSpreadDuration;
      state.notionalEur = state.notionalUsd / fx;
    } else if (source === "notional_eur") {
      state.notionalUsd = state.notionalEur * fx;
      state.targetSpreadDurationYears = (state.notionalUsd * state.xoverSpreadDuration) / state.portfolioNavUsd;
    } else if (source === "notional_usd") {
      state.notionalEur = state.notionalUsd / fx;
      state.targetSpreadDurationYears = (state.notionalUsd * state.xoverSpreadDuration) / state.portfolioNavUsd;
    }
  }

  /**
   * Core Mathematical PnL Attribution Engine (Pure Spread Duration & Portfolio % Framework)
   * All returns, sensitivities, and risk attributions are calculated natively in
   * Portfolio Basis Points (bps) and Percentages (%), invariant to portfolio dollar size.
   */
  function calculateTradePnl(params) {
    const {
      direction = "sell", // "sell" (Long Risk) or "buy" (Short Risk)
      targetSd, // Target spread duration in years (e.g. 0.50)
      sdXover = 4.30, // Benchmark duration in years (e.g. 4.30)
      entrySpread = 252.0,
      exitSpread = 296.0,
      carryBps = 252.0,
      days = 262,
      entryFx = 1.1392,
      exitFx = 1.1392,
      hedgePct = 10.0, // % of portfolio NAV
      hedgeStance = "short_eur", // "short_eur", "long_eur", "none"
      navUsd = 100000000, // Optional illustrative NAV for dollar scaling
    } = params;

    // Resolve target spread duration (defaults to active state if not passed)
    const sdTarget = targetSd != null ? targetSd :
      (params.notionalEur != null && entryFx > 0 && navUsd > 0
        ? (params.notionalEur * sdXover * entryFx) / navUsd
        : state.targetSpreadDurationYears || 0.50);

    // 1. Implied Portfolio Weight of CDS (%)
    // w_CDS = Target_SD / Benchmark_SD (e.g. 0.50 / 4.30 = 11.63% of portfolio)
    const cdsWeight = sdTarget / (sdXover > 0 ? sdXover : 4.30);
    const cdsWeightPct = cdsWeight * 100.0;

    // Spread change in bps
    const spreadDelta = exitSpread - entrySpread;

    // FX Scaling factor and percentage shift
    const fxScale = entryFx > 0 ? exitFx / entryFx : 1.0;
    const fxDeltaFrac = entryFx > 0 ? (exitFx - entryFx) / entryFx : 0.0;

    // 2. Credit Spread Capital Return (in portfolio bps)
    // Sell Protection: -sdTarget * spreadDelta * (exitFx / entryFx)
    // Buy Protection: +sdTarget * spreadDelta * (exitFx / entryFx)
    const localSpreadBps = direction === "sell"
      ? -sdTarget * spreadDelta
      : sdTarget * spreadDelta;
    const spreadPnlBps = localSpreadBps * fxScale;

    // 3. Running Coupon Carry Return (in portfolio bps)
    // Sell Protection: +w_CDS * carryBps * (days / 360) * (exitFx / entryFx)
    // Buy Protection: -w_CDS * carryBps * (days / 360) * (exitFx / entryFx)
    const localCarryBps = direction === "sell"
      ? cdsWeight * carryBps * (days / 360.0)
      : -cdsWeight * carryBps * (days / 360.0);
    const carryPnlBps = localCarryBps * fxScale;

    // 4. FX Translation Drag / Boost on CDS Profits (in portfolio bps)
    const localTotalBps = localSpreadBps + localCarryBps;
    const fxTranslationBps = localTotalBps * fxDeltaFrac;

    // 5. FX Overlay Hedge Return (in portfolio bps)
    const hedgeWeight = (hedgePct || 0.0) / 100.0;
    let fxHedgeBps = 0;
    if (hedgeStance === "short_eur") {
      // Short EUR / Long USD forward: gains when EUR depreciates (fxDeltaFrac < 0)
      fxHedgeBps = -hedgeWeight * fxDeltaFrac * 10000.0;
    } else if (hedgeStance === "long_eur") {
      // Long EUR / Short USD forward: gains when EUR appreciates (fxDeltaFrac > 0)
      fxHedgeBps = hedgeWeight * fxDeltaFrac * 10000.0;
    }

    // 6. Net Combined Portfolio Return (in bps & %)
    const totalNetPnlBps = spreadPnlBps + carryPnlBps + fxHedgeBps;
    const unhedgedNetPnlBps = spreadPnlBps + carryPnlBps;
    const totalReturnPct = totalNetPnlBps / 100.0;
    const unhedgedReturnPct = unhedgedNetPnlBps / 100.0;

    // 7. Net Currency Exposure (% of Portfolio)
    // Sell Protection = Long EUR asset; Buy Protection = Short EUR
    const cdsEurExpPct = direction === "sell" ? cdsWeightPct : -cdsWeightPct;
    let hedgeEurExpPct = 0;
    if (hedgeStance === "short_eur") hedgeEurExpPct = -hedgePct;
    else if (hedgeStance === "long_eur") hedgeEurExpPct = hedgePct;
    const netEurExposurePct = cdsEurExpPct + hedgeEurExpPct;

    // 8. Optional Illustrative Dollar / EUR amounts (scaled to navUsd)
    const nav = navUsd || 100000000;
    const spreadPnlUsd = (spreadPnlBps / 10000.0) * nav;
    const carryPnlUsd = (carryPnlBps / 10000.0) * nav;
    const fxTranslationUsd = (fxTranslationBps / 10000.0) * nav;
    const fxHedgePnlUsd = (fxHedgeBps / 10000.0) * nav;
    const totalNetPnlUsd = (totalNetPnlBps / 10000.0) * nav;
    const unhedgedNetPnlUsd = (unhedgedNetPnlBps / 10000.0) * nav;

    const notionalUsd = nav * cdsWeight;
    const notionalEur = entryFx > 0 ? notionalUsd / entryFx : notionalUsd;
    const spreadPnlEur = exitFx > 0 ? spreadPnlUsd / exitFx : spreadPnlUsd;
    const carryPnlEur = exitFx > 0 ? carryPnlUsd / exitFx : carryPnlUsd;
    const totalCdsPnlEur = spreadPnlEur + carryPnlEur;
    const totalCdsPnlUsd = spreadPnlUsd + carryPnlUsd;
    const hedgeNotionalUsd = nav * hedgeWeight;
    const hedgeNotionalEur = entryFx > 0 ? hedgeNotionalUsd / entryFx : hedgeNotionalUsd;

    return {
      sdTarget,
      cdsWeight,
      cdsWeightPct,
      netEurExposurePct,
      spreadDelta,
      spreadPnlEur,
      spreadPnlUsd,
      spreadPnlBps,
      carryPnlEur,
      carryPnlUsd,
      carryPnlBps,
      totalCdsPnlEur,
      totalCdsPnlUsd,
      fxTranslationUsd,
      fxTranslationBps,
      hedgeNotionalUsd,
      hedgeNotionalEur,
      fxHedgePnlUsd,
      fxHedgeBps,
      unhedgedNetPnlUsd,
      unhedgedNetPnlBps,
      totalNetPnlUsd,
      totalNetPnlBps,
      totalReturnPct,
      unhedgedReturnPct,
      notionalUsd,
      notionalEur,
    };
  }

  /**
   * Render All Modeler Components
   */
  function renderAll() {
    renderSizingControls();
    renderHistoricalBacktestSection();
    renderDualChart();
    renderScenarioSection();
  }

  function renderSizingControls() {
    // Direction Buttons
    const btnSell = el("xoDirSell");
    const btnBuy = el("xoDirBuy");
    if (btnSell && btnBuy) {
      if (state.direction === "sell") {
        btnSell.className = "modeler-pill-btn active sell-active";
        btnBuy.className = "modeler-pill-btn";
      } else {
        btnSell.className = "modeler-pill-btn";
        btnBuy.className = "modeler-pill-btn active buy-active";
      }
    }

    // Nav Input
    const inNav = el("xoPortfolioNav");
    if (inNav && document.activeElement !== inNav) {
      inNav.value = state.portfolioNavUsd.toLocaleString("en-US");
    }

    // Spread Duration Inputs
    const inSd = el("xoTargetSd");
    const slSd = el("xoTargetSdSlider");
    const elSdDisplay = el("xoTargetSdDisplay");
    if (inSd && document.activeElement !== inSd) inSd.value = state.targetSpreadDurationYears.toFixed(2);
    if (slSd) slSd.value = state.targetSpreadDurationYears;
    if (elSdDisplay) elSdDisplay.textContent = `${state.targetSpreadDurationYears.toFixed(2)} yrs`;

    const inBmSd = el("xoBenchmarkSd");
    if (inBmSd && document.activeElement !== inBmSd) inBmSd.value = state.xoverSpreadDuration.toFixed(2);

    // Pure Duration & Percentage Sizing Metrics
    const targetSd = state.targetSpreadDurationYears;
    const bmSd = state.xoverSpreadDuration || 4.30;
    const cdsWeight = targetSd / bmSd;
    const cdsWeightPct = cdsWeight * 100.0;
    const portSensBps = targetSd; // exactly 0.50 bps per bp of spread move!

    const elCdsWeight = el("xoCdsWeightReadout");
    if (elCdsWeight) elCdsWeight.textContent = `${cdsWeightPct.toFixed(1)}% of Portfolio`;

    const elPortSens = el("xoPortSensReadout");
    if (elPortSens) elPortSens.textContent = `${portSensBps.toFixed(2)} bps / bp spread move`;

    // FX Hedge controls
    const inHedge = el("xoFxHedgePct");
    const slHedge = el("xoFxHedgeSlider");
    const elHedgeDisp = el("xoFxHedgePctDisplay");
    if (inHedge && document.activeElement !== inHedge) inHedge.value = state.fxHedgePct.toFixed(1);
    if (slHedge) slHedge.value = state.fxHedgePct;
    if (elHedgeDisp) elHedgeDisp.textContent = `${state.fxHedgePct.toFixed(1)}%`;

    // Stance Buttons
    ["short_eur", "long_eur", "none"].forEach((st) => {
      const b = el(`xoHedgeStance_${st}`);
      if (b) {
        b.className = "modeler-chip " + (state.fxHedgeStance === st ? "active" : "");
      }
    });

    // Underlying CDS Currency Polarity
    const isSell = state.direction === "sell";
    const elCdsPol = el("xoCdsCurrencyPolarity");
    if (elCdsPol) {
      elCdsPol.textContent = `Underlying CDS: ${isSell ? "LONG EUR / SHORT USD" : "SHORT EUR / LONG USD"} (Denominated in EUR)`;
    }

    // Dynamic Net Portfolio Currency Exposure (% of Portfolio)
    const cdsEurPct = isSell ? cdsWeightPct : -cdsWeightPct;
    let hedgeEurPct = 0;
    if (state.fxHedgeStance === "short_eur") hedgeEurPct = -state.fxHedgePct;
    else if (state.fxHedgeStance === "long_eur") hedgeEurPct = state.fxHedgePct;

    const netEurPct = cdsEurPct + hedgeEurPct;

    const elNetCurrencyPct = el("xoNetCurrencyPctReadout");
    const elNetCurrencyDetail = el("xoNetCurrencyDetailReadout");
    if (elNetCurrencyPct) {
      if (Math.abs(netEurPct) < 0.05) {
        elNetCurrencyPct.textContent = "0.0% (Fully FX Hedged)";
        elNetCurrencyPct.style.color = "var(--blue)";
      } else if (netEurPct > 0) {
        elNetCurrencyPct.textContent = `+${netEurPct.toFixed(1)}% Net Long EUR`;
        elNetCurrencyPct.style.color = "var(--good)";
      } else {
        elNetCurrencyPct.textContent = `${netEurPct.toFixed(1)}% Net Short EUR`;
        elNetCurrencyPct.style.color = "var(--orange)";
      }
    }
    if (elNetCurrencyDetail) {
      elNetCurrencyDetail.textContent = `CDS EUR weight (${cdsEurPct >= 0 ? "+" : ""}${cdsEurPct.toFixed(1)}%) + FX Forward (${hedgeEurPct >= 0 ? "+" : ""}${hedgeEurPct.toFixed(1)}%)`;
    }

    const elBannerText = el("xoNetCurrencyBannerText");
    if (elBannerText) {
      const cdsText = isSell
        ? `+${cdsWeightPct.toFixed(1)}% LONG EUR / -${cdsWeightPct.toFixed(1)}% SHORT USD`
        : `-${cdsWeightPct.toFixed(1)}% SHORT EUR / +${cdsWeightPct.toFixed(1)}% LONG USD`;

      const hedgeText = state.fxHedgeStance === "short_eur"
        ? `-${state.fxHedgePct.toFixed(1)}% SHORT EUR / +${state.fxHedgePct.toFixed(1)}% LONG USD`
        : state.fxHedgeStance === "long_eur"
          ? `+${state.fxHedgePct.toFixed(1)}% LONG EUR / -${state.fxHedgePct.toFixed(1)}% SHORT USD`
          : `No Forward Hedge [100% Unhedged FX Exposure]`;

      elBannerText.textContent = `Underlying CDS: ${cdsText} · FX Overlay Forward: ${hedgeText}`;
    }

    const elStatusBadge = el("xoNetCurrencyStatusBadge");
    if (elStatusBadge) {
      if (Math.abs(netEurPct) < 0.05) {
        elStatusBadge.textContent = "FULLY FX HEDGED (0.0% Net Currency Exposure)";
        elStatusBadge.style.background = "rgba(0, 113, 227, 0.12)";
        elStatusBadge.style.color = "var(--blue)";
        elStatusBadge.style.borderColor = "rgba(0, 113, 227, 0.3)";
      } else if (netEurPct > 0) {
        elStatusBadge.textContent = `NET LONG EUR / SHORT USD: +${netEurPct.toFixed(1)}% of Portfolio (Unhedged)`;
        elStatusBadge.style.background = "rgba(36, 138, 61, 0.14)";
        elStatusBadge.style.color = "var(--good)";
        elStatusBadge.style.borderColor = "rgba(36, 138, 61, 0.3)";
      } else {
        elStatusBadge.textContent = `NET SHORT EUR / LONG USD: ${netEurPct.toFixed(1)}% of Portfolio (Overhedged)`;
        elStatusBadge.style.background = "rgba(255, 149, 0, 0.14)";
        elStatusBadge.style.color = "var(--orange)";
        elStatusBadge.style.borderColor = "rgba(255, 149, 0, 0.3)";
      }
    }
  }

  function renderHistoricalBacktestSection() {
    // Populate date inputs
    const inEntryDate = el("xoEntryDate");
    const inExitDate = el("xoExitDate");
    if (inEntryDate && document.activeElement !== inEntryDate) inEntryDate.value = state.entryDate;
    if (inExitDate && document.activeElement !== inExitDate) inExitDate.value = state.exitDate;

    // Populate level inputs
    const inEntrySp = el("xoEntrySpread");
    const inExitSp = el("xoExitSpread");
    const inEntryFx = el("xoEntryFx");
    const inExitFx = el("xoExitFx");
    const inDays = el("xoHoldingDays");
    const inCarry = el("xoAnnualCarry");

    if (inEntrySp && document.activeElement !== inEntrySp) inEntrySp.value = state.entrySpreadBps.toFixed(1);
    if (inExitSp && document.activeElement !== inExitSp) inExitSp.value = state.exitSpreadBps.toFixed(1);
    if (inEntryFx && document.activeElement !== inEntryFx) inEntryFx.value = state.entryEurUsd.toFixed(4);
    if (inExitFx && document.activeElement !== inExitFx) inExitFx.value = state.exitEurUsd.toFixed(4);
    if (inDays && document.activeElement !== inDays) inDays.value = state.holdingDays;
    if (inCarry && document.activeElement !== inCarry) inCarry.value = state.annualCarryBps.toFixed(1);

    // Override indicators & reset buttons
    updateOverrideBadge("EntrySpread", state.overrideEntrySpread, state.histEntrySpread.toFixed(1) + " bps");
    updateOverrideBadge("ExitSpread", state.overrideExitSpread, state.histExitSpread.toFixed(1) + " bps");
    updateOverrideBadge("EntryFx", state.overrideEntryFx, state.histEntryEurUsd.toFixed(4));
    updateOverrideBadge("ExitFx", state.overrideExitFx, state.histExitEurUsd.toFixed(4));
    updateOverrideBadge("HoldingDays", state.overrideHoldingDays, state.histHoldingDays + "d");

    // Compute PnL
    const res = calculateTradePnl({
      targetSd: state.targetSpreadDurationYears,
      sdXover: state.xoverSpreadDuration,
      direction: state.direction,
      entrySpread: state.entrySpreadBps,
      exitSpread: state.exitSpreadBps,
      carryBps: state.annualCarryBps,
      days: state.holdingDays,
      entryFx: state.entryEurUsd,
      exitFx: state.exitEurUsd,
      hedgePct: state.fxHedgePct,
      hedgeStance: state.fxHedgeStance,
      navUsd: state.portfolioNavUsd,
    });

    // Populate Headline KPI
    const elHeroBps = el("xoHeroBps");
    const elHeroPct = el("xoHeroPct");
    const elHeroUsd = el("xoHeroUsd");
    const elHeroBadge = el("xoHeroBadge");
    const elHeroUnhedged = el("xoHeroUnhedged");

    if (elHeroBps) {
      elHeroBps.textContent = fmtBps(res.totalNetPnlBps, 1);
      elHeroBps.className = "modeler-hero-metric " + (res.totalNetPnlBps >= 0 ? "good" : "bad");
    }
    if (elHeroPct) {
      elHeroPct.textContent = `${res.totalReturnPct >= 0 ? "+" : ""}${res.totalReturnPct.toFixed(2)}% Return`;
      elHeroPct.className = res.totalReturnPct >= 0 ? "good" : "bad";
    }
    if (elHeroUsd) {
      elHeroUsd.textContent = `(Illustrative: ${fmtUsd(res.totalNetPnlUsd)} on $${(state.portfolioNavUsd / 1e6).toFixed(0)}M NAV)`;
    }
    if (elHeroUnhedged) {
      elHeroUnhedged.textContent = `Unhedged: ${fmtBps(res.unhedgedNetPnlBps, 1)} (${fmtPct(res.unhedgedReturnPct)}) · FX Hedge Alpha: ${fmtBps(res.fxHedgeBps, 1)} (${fmtPct(res.fxHedgeBps / 100.0)})`;
    }
    if (elHeroBadge) {
      const isSell = state.direction === "sell";
      elHeroBadge.textContent = `${isSell ? "SELL PROTECTION (LONG RISK)" : "BUY PROTECTION (SHORT RISK)"} · ${state.holdingDays} DAYS`;
    }

    // Populate Detailed 4-Pillar Table
    setRowData("CapSpread", {
      detail: `Spread move: ${state.entrySpreadBps.toFixed(1)} → ${state.exitSpreadBps.toFixed(1)} (${fmtBps(res.spreadDelta, 1)})`,
      bps: fmtBps(res.spreadPnlBps, 2),
      pct: fmtPct(res.spreadPnlBps / 100.0, 2),
      eur: fmtEur(res.spreadPnlEur),
      usd: fmtUsd(res.spreadPnlUsd),
      isGood: res.spreadPnlBps >= 0,
    });

    setRowData("Carry", {
      detail: `Coupon carry @ ${state.annualCarryBps.toFixed(1)} bps over ${state.holdingDays}d`,
      bps: fmtBps(res.carryPnlBps, 2),
      pct: fmtPct(res.carryPnlBps / 100.0, 2),
      eur: fmtEur(res.carryPnlEur),
      usd: fmtUsd(res.carryPnlUsd),
      isGood: res.carryPnlBps >= 0,
    });

    const isSell = state.direction === "sell";
    const elFxTransTitle = el("xoRow_FxTrans_title");
    if (elFxTransTitle) {
      elFxTransTitle.innerHTML = `FX Translation on CDS MTM <span style="font-size: 10px; color: var(--purple); font-weight: 700;">[${isSell ? "LONG EUR / SHORT USD" : "SHORT EUR / LONG USD"}]</span>`;
    }

    const elFxHedgeTitle = el("xoRow_FxHedge_title");
    if (elFxHedgeTitle) {
      const hedgePolarity = state.fxHedgeStance === "short_eur"
        ? "SHORT EUR / LONG USD"
        : state.fxHedgeStance === "long_eur"
          ? "LONG EUR / SHORT USD"
          : "UNHEDGED";
      elFxHedgeTitle.innerHTML = `FX Hedge Overlay P&L <span style="font-size: 10px; color: var(--purple); font-weight: 700;">[${hedgePolarity}]</span>`;
    }

    setRowData("FxTrans", {
      detail: `EUR/USD moved ${state.entryEurUsd.toFixed(4)} → ${state.exitEurUsd.toFixed(4)} (${fmtPct(((state.exitEurUsd - state.entryEurUsd) / state.entryEurUsd) * 100)}) on ${isSell ? "LONG EUR" : "SHORT EUR"} CDS profits`,
      bps: fmtBps(res.fxTranslationBps, 2),
      pct: fmtPct(res.fxTranslationBps / 100.0, 2),
      eur: "—",
      usd: fmtUsd(res.fxTranslationUsd),
      isGood: res.fxTranslationBps >= 0,
    });

    const hedgeDetail = state.fxHedgeStance === "short_eur"
      ? `${state.fxHedgePct.toFixed(1)}% Portfolio Overlay [SHORT EUR / LONG USD]: EUR depreciation generates dollar gain`
      : state.fxHedgeStance === "long_eur"
        ? `${state.fxHedgePct.toFixed(1)}% Portfolio Overlay [LONG EUR / SHORT USD]: EUR appreciation generates dollar gain`
        : `0% Overlay (100% unhedged currency exposure)`;

    setRowData("FxHedge", {
      detail: hedgeDetail,
      bps: fmtBps(res.fxHedgeBps, 2),
      pct: fmtPct(res.fxHedgeBps / 100.0, 2),
      eur: "—",
      usd: fmtUsd(res.fxHedgePnlUsd),
      isGood: res.fxHedgeBps >= 0,
    });

    setRowData("NetTotal", {
      detail: "Combined Net Portfolio Impact",
      bps: fmtBps(res.totalNetPnlBps, 1),
      pct: fmtPct(res.totalReturnPct, 2),
      eur: fmtEur(res.totalCdsPnlEur),
      usd: fmtUsd(res.totalNetPnlUsd),
      isGood: res.totalNetPnlBps >= 0,
    });

    // Waterfall bar visualization
    renderWaterfallBar("xoBacktestWaterfall", res);
  }

  function setRowData(key, data) {
    const elDet = el(`xoRow_${key}_detail`);
    const elEur = el(`xoRow_${key}_eur`);
    const elUsd = el(`xoRow_${key}_usd`);
    const elBps = el(`xoRow_${key}_bps`);
    const elPct = el(`xoRow_${key}_pct`);

    if (elDet) elDet.textContent = data.detail;
    if (elBps) {
      elBps.textContent = data.bps;
      elBps.className = "modeler-table-pill " + (data.isGood ? "pill-good" : "pill-bad");
    }
    if (elPct) {
      elPct.textContent = data.pct;
      elPct.className = "num " + (data.isGood ? "good" : "bad");
    }
    if (elEur) elEur.textContent = data.eur;
    if (elUsd) {
      elUsd.textContent = data.usd;
      elUsd.className = "num " + (data.isGood ? "good" : "bad");
    }
  }

  function updateOverrideBadge(field, isOverridden, histText) {
    const badge = el(`xoBadge_${field}`);
    const resetBtn = el(`xoReset_${field}`);
    if (badge) {
      if (isOverridden) {
        badge.style.display = "inline-flex";
        badge.textContent = `Overridden (Hist: ${histText})`;
      } else {
        badge.style.display = "none";
      }
    }
    if (resetBtn) {
      resetBtn.style.display = isOverridden ? "inline-flex" : "none";
    }
  }

  function renderWaterfallBar(containerId, res) {
    const bar = el(containerId);
    if (!bar) return;

    const items = [
      { name: "Spread Capital", bps: res.spreadPnlBps, color: "#0071e3" },
      { name: "Carry Yield", bps: res.carryPnlBps, color: "#248a3d" },
      { name: "FX Translation", bps: res.fxTranslationBps, color: "#af52de" },
      { name: "FX Hedge", bps: res.fxHedgeBps, color: "#ff9500" },
    ];

    const totalAbs = items.reduce((acc, it) => acc + Math.abs(it.bps), 0) || 1;

    bar.replaceChildren();
    items.forEach((it) => {
      const seg = document.createElement("div");
      const widthPct = Math.max(3, (Math.abs(it.bps) / totalAbs) * 100);
      seg.className = "modeler-waterfall-seg";
      seg.style.width = `${widthPct}%`;
      seg.style.background = it.color;
      seg.title = `${it.name}: ${fmtBps(it.bps, 2)}`;

      const label = document.createElement("span");
      label.textContent = `${it.name.split(" ")[0]} ${fmtBps(it.bps, 1)}`;
      seg.appendChild(label);
      bar.appendChild(seg);
    });
  }

  /**
   * Dual Synchronized Canvas Chart Rendering
   * Top Panel: iTraxx Europe Crossover Spread (bps)
   * Bottom Panel: EUR/USD Exchange Rate
   */
  function renderDualChart() {
    const canvas = el("xoverPnlChartCanvas");
    if (!canvas || !rawHistory.length) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = 380;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // Filter historical data based on chartRange
    let daysToInclude = 365;
    if (state.chartRange === "3M") daysToInclude = 90;
    else if (state.chartRange === "6M") daysToInclude = 180;
    else if (state.chartRange === "1Y") daysToInclude = 365;
    else if (state.chartRange === "2Y") daysToInclude = 730;
    else if (state.chartRange === "ALL") daysToInclude = rawHistory.length;

    const startIdx = Math.max(0, rawHistory.length - daysToInclude);
    const viewRows = rawHistory.slice(startIdx);
    const n = viewRows.length;
    if (n < 2) return;

    // Layout configuration
    const pad = { top: 28, right: 55, bottom: 32, left: 60, middleGap: 24 };
    const availH = H - pad.top - pad.bottom - pad.middleGap;
    const topH = Math.round(availH * 0.56);
    const botH = availH - topH;

    const topPad = { top: pad.top, bottom: pad.top + topH };
    const botPad = { top: pad.top + topH + pad.middleGap, bottom: pad.top + topH + pad.middleGap + botH };
    const chartW = W - pad.left - pad.right;

    // Coordinate helpers
    const xToPx = (idx) => pad.left + (chartW * idx) / (n - 1);

    // Panel A: Xover Spread Extremes
    let minSp = Infinity;
    let maxSp = -Infinity;
    viewRows.forEach((r) => {
      minSp = Math.min(minSp, r.itraxx_xover);
      maxSp = Math.max(maxSp, r.itraxx_xover);
    });
    // Add margin
    minSp = Math.floor(minSp / 10) * 10 - 10;
    maxSp = Math.ceil(maxSp / 10) * 10 + 10;

    const yToPxTop = (sp) => topPad.bottom - ((sp - minSp) / (maxSp - minSp)) * topH;

    // Panel B: EUR/USD Extremes
    let minFx = Infinity;
    let maxFx = -Infinity;
    viewRows.forEach((r) => {
      const fx = r.eur_usd || 1.1392;
      minFx = Math.min(minFx, fx);
      maxFx = Math.max(maxFx, fx);
    });
    minFx = Math.floor(minFx * 100) / 100 - 0.01;
    maxFx = Math.ceil(maxFx * 100) / 100 + 0.01;

    const yToPxBot = (fx) => botPad.bottom - ((fx - minFx) / (maxFx - minFx)) * botH;

    // 1. Draw Panel Backgrounds & Separation
    ctx.fillStyle = "rgba(0, 0, 0, 0.015)";
    ctx.fillRect(pad.left, topPad.top, chartW, topH);
    ctx.fillRect(pad.left, botPad.top, chartW, botH);

    // Divider Line
    ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, topPad.bottom + pad.middleGap / 2);
    ctx.lineTo(W - pad.right, topPad.bottom + pad.middleGap / 2);
    ctx.stroke();

    // 2. Draw Grids & Axis Labels
    ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = "#86868b";

    // Panel A Grid (Spreads)
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const spSteps = 4;
    for (let i = 0; i <= spSteps; i++) {
      const val = minSp + ((maxSp - minSp) * i) / spSteps;
      const py = yToPxTop(val);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.beginPath();
      ctx.moveTo(pad.left, py);
      ctx.lineTo(W - pad.right, py);
      ctx.stroke();
      ctx.fillText(`${val.toFixed(0)} bps`, pad.left - 8, py);
    }

    // Panel B Grid (FX)
    const fxSteps = 3;
    for (let i = 0; i <= fxSteps; i++) {
      const val = minFx + ((maxFx - minFx) * i) / fxSteps;
      const py = yToPxBot(val);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.beginPath();
      ctx.moveTo(pad.left, py);
      ctx.lineTo(W - pad.right, py);
      ctx.stroke();
      ctx.fillText(val.toFixed(3), pad.left - 8, py);
    }

    // Panel Titles
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#0071e3";
    ctx.font = "600 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("iTraxx Europe Crossover 5Y Spread (bps)", pad.left + 8, topPad.top + 6);

    ctx.fillStyle = "#af52de";
    ctx.fillText("EUR / USD Exchange Rate", pad.left + 8, botPad.top + 6);

    // 3. Draw Curves & Area Fills
    // Panel A: Xover Spread Curve (Blue)
    const gradTop = ctx.createLinearGradient(0, topPad.top, 0, topPad.bottom);
    gradTop.addColorStop(0, "rgba(0, 113, 227, 0.18)");
    gradTop.addColorStop(1, "rgba(0, 113, 227, 0.00)");

    ctx.beginPath();
    viewRows.forEach((r, i) => {
      const px = xToPx(i);
      const py = yToPxTop(r.itraxx_xover);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "#0071e3";
    ctx.lineWidth = 2.2;
    ctx.stroke();

    // Area fill
    ctx.lineTo(xToPx(n - 1), topPad.bottom);
    ctx.lineTo(xToPx(0), topPad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradTop;
    ctx.fill();

    // Panel B: EUR/USD Curve (Purple)
    const gradBot = ctx.createLinearGradient(0, botPad.top, 0, botPad.bottom);
    gradBot.addColorStop(0, "rgba(175, 82, 222, 0.18)");
    gradBot.addColorStop(1, "rgba(175, 82, 222, 0.00)");

    ctx.beginPath();
    viewRows.forEach((r, i) => {
      const px = xToPx(i);
      const py = yToPxBot(r.eur_usd || 1.1392);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.strokeStyle = "#af52de";
    ctx.lineWidth = 2.0;
    ctx.stroke();

    // Area fill
    ctx.lineTo(xToPx(n - 1), botPad.bottom);
    ctx.lineTo(xToPx(0), botPad.bottom);
    ctx.closePath();
    ctx.fillStyle = gradBot;
    ctx.fill();

    // 4. Draw Entry and Exit Date Pins & Levels
    let entryIdx = viewRows.findIndex((r) => r.date >= state.entryDate);
    if (entryIdx === -1) entryIdx = 0;
    let exitIdx = viewRows.findIndex((r) => r.date >= state.exitDate);
    if (exitIdx === -1) exitIdx = n - 1;

    const pxEntry = xToPx(entryIdx);
    const pxExit = xToPx(exitIdx);

    // Vertical dashed lines
    drawVerticalPin(ctx, pxEntry, topPad.top, botPad.bottom, "#248a3d", `Entry: ${state.entryDate}`);
    drawVerticalPin(ctx, pxExit, topPad.top, botPad.bottom, "#d70015", `Exit: ${state.exitDate}`);

    // Pinned dots on curves
    const pyEntryTop = yToPxTop(state.entrySpreadBps);
    const pyExitTop = yToPxTop(state.exitSpreadBps);
    const pyEntryBot = yToPxBot(state.entryEurUsd);
    const pyExitBot = yToPxBot(state.exitEurUsd);

    drawPinDot(ctx, pxEntry, pyEntryTop, "#248a3d", `${state.entrySpreadBps.toFixed(1)} bps`);
    drawPinDot(ctx, pxExit, pyExitTop, "#d70015", `${state.exitSpreadBps.toFixed(1)} bps`);
    drawPinDot(ctx, pxEntry, pyEntryBot, "#248a3d", state.entryEurUsd.toFixed(4));
    drawPinDot(ctx, pxExit, pyExitBot, "#d70015", state.exitEurUsd.toFixed(4));

    // Horizontal dashed lines across spread compression/decompression
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(36, 138, 61, 0.45)";
    ctx.beginPath();
    ctx.moveTo(pad.left, pyEntryTop);
    ctx.lineTo(W - pad.right, pyEntryTop);
    ctx.stroke();

    ctx.strokeStyle = "rgba(215, 0, 21, 0.45)";
    ctx.beginPath();
    ctx.moveTo(pad.left, pyExitTop);
    ctx.lineTo(W - pad.right, pyExitTop);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. X-Axis Dates
    ctx.fillStyle = "#86868b";
    ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const xStepCount = Math.min(6, n);
    for (let i = 0; i < xStepCount; i++) {
      const idx = Math.round((i * (n - 1)) / (xStepCount - 1));
      const px = xToPx(idx);
      ctx.fillText(viewRows[idx].date, px, botPad.bottom + 8);
    }

    // 6. Interactive Hover Crosshair
    if (state.hoverIdx !== null && state.hoverIdx >= 0 && state.hoverIdx < n) {
      const hRow = viewRows[state.hoverIdx];
      const hPx = xToPx(state.hoverIdx);

      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(hPx, topPad.top);
      ctx.lineTo(hPx, botPad.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      // Floating Badge
      const hText = `${hRow.date} · Xover: ${hRow.itraxx_xover.toFixed(1)} bps · EUR/USD: ${(hRow.eur_usd || 1.1392).toFixed(4)}`;
      ctx.font = "600 11.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      const tw = ctx.measureText(hText).width + 16;
      const tx = Math.max(pad.left + 10, Math.min(W - pad.right - tw - 10, hPx - tw / 2));

      ctx.fillStyle = "rgba(29, 29, 31, 0.88)";
      ctx.beginPath();
      ctx.roundRect(tx, topPad.top + 8, tw, 24, 6);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(hText, tx + tw / 2, topPad.top + 20);
    }
  }

  function drawVerticalPin(ctx, px, y1, y2, color, label) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(px, y1);
    ctx.lineTo(px, y2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tag at top
    ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(label, px, y1 - 3);
  }

  function drawPinDot(ctx, x, y, color, text) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /**
   * 2D Scenario Sensitivity Matrix & Custom Simulator
   */
  function renderScenarioSection() {
    renderScenarioBaselineControls();
    renderScenarioTable();
    renderSensitivityMatrix();
    renderScenarioCustomControls();
  }

  function renderScenarioBaselineControls() {
    const sd = state.scenarioSpreadDuration || state.targetSpreadDurationYears;
    const bm = state.xoverSpreadDuration || 4.30;
    const nav = state.portfolioNavUsd || 100000000;
    const fx0 = state.scenarioEntryFx || 1.1392;
    const sp0 = state.scenarioEntrySpread || 296.0;

    const cdsWeight = sd / bm;
    const cdsWeightPct = cdsWeight * 100.0;
    const portSens = sd; // exactly sd bps / bp

    const elSdDisplay = el("xoScenTargetSdDisplay");
    const elSdInput = el("xoScenTargetSd");
    const elSdSlider = el("xoScenTargetSdSlider");
    const elBmDisplay = el("xoScenBenchmarkSdDisplay");
    const elEntrySp = el("xoScenEntrySpread");
    const elEntryFx = el("xoScenEntryFx");
    const elDaysInput = el("xoScenDaysInput");
    const elMonthsDisp = el("xoScenMonthsDisplay");
    const elFxHedgePct = el("xoScenFxHedgePct");
    const elFxHedgeDisp = el("xoScenFxHedgePctDisplay");
    const elDv01Usd = el("xoScenDv01UsdReadout");
    const elPortSens = el("xoScenPortSensReadout");

    const elScenWeight = el("xoScenWeightReadout");
    const elScenSens = el("xoScenSensReadout");
    const elStance = el("xoScenStanceReadout");
    const elHedgeBadge = el("xoScenNetHedgeBadge");

    if (elSdDisplay) elSdDisplay.textContent = `${sd.toFixed(2)} yrs`;
    if (elSdInput && document.activeElement !== elSdInput) elSdInput.value = sd.toFixed(2);
    if (elSdSlider) elSdSlider.value = sd;
    if (elBmDisplay) elBmDisplay.textContent = `${bm.toFixed(2)} yrs`;
    if (elEntrySp && document.activeElement !== elEntrySp) elEntrySp.value = sp0.toFixed(1);
    if (elEntryFx && document.activeElement !== elEntryFx) elEntryFx.value = fx0.toFixed(4);
    if (elDaysInput && document.activeElement !== elDaysInput) elDaysInput.value = state.scenarioDays;
    if (elMonthsDisp) elMonthsDisp.textContent = `${(state.scenarioDays / 30).toFixed(1)}M`;
    if (elFxHedgePct && document.activeElement !== elFxHedgePct) elFxHedgePct.value = state.fxHedgePct.toFixed(1);
    if (elFxHedgeDisp) elFxHedgeDisp.textContent = `${state.fxHedgePct.toFixed(1)}%`;

    const dv01Usd = (nav * sd) / 10000.0;
    if (elDv01Usd) elDv01Usd.textContent = fmtUsd(dv01Usd) + " / bp";
    if (elPortSens) elPortSens.textContent = `${portSens.toFixed(2)} bps/bp`;

    if (elScenWeight) elScenWeight.textContent = `${cdsWeightPct.toFixed(1)}% of Portfolio`;
    if (elScenSens) elScenSens.textContent = `${portSens.toFixed(2)} bps / bp`;

    const isSell = state.direction === "sell";
    if (elStance) {
      elStance.textContent = isSell
        ? "SELL PROTECTION [LONG EUR / SHORT USD]"
        : "BUY PROTECTION [SHORT EUR / LONG USD]";
      elStance.style.color = isSell ? "var(--good)" : "var(--warn)";
    }

    const bShort = el("xoScenHedgeShort");
    const bLong = el("xoScenHedgeLong");
    const bNone = el("xoScenHedgeNone");
    if (bShort) bShort.className = "modeler-chip" + (state.fxHedgeStance === "short_eur" ? " active" : "");
    if (bLong) bLong.className = "modeler-chip" + (state.fxHedgeStance === "long_eur" ? " active" : "");
    if (bNone) bNone.className = "modeler-chip" + (state.fxHedgeStance === "none" ? " active" : "");

    const cdsEurPct = isSell ? cdsWeightPct : -cdsWeightPct;
    let hedgeEurPct = 0;
    if (state.fxHedgeStance === "short_eur") hedgeEurPct = -state.fxHedgePct;
    else if (state.fxHedgeStance === "long_eur") hedgeEurPct = state.fxHedgePct;
    const netEurPct = cdsEurPct + hedgeEurPct;

    if (elHedgeBadge) {
      const hedgeDesc = state.fxHedgeStance === "short_eur" ? "Short EUR" : state.fxHedgeStance === "long_eur" ? "Long EUR" : "Unhedged";
      elHedgeBadge.textContent = `Hedge Sizing: ${state.fxHedgePct.toFixed(1)}% (${hedgeDesc}) · Net EUR Exposure: ${netEurPct >= 0 ? "+" : ""}${netEurPct.toFixed(1)}% of Portfolio (Unhedged)`;
    }
  }

  function renderScenarioTable() {
    const tbody = el("xoScenarioTableBody");
    if (!tbody) return;

    tbody.replaceChildren();

    const nav = state.portfolioNavUsd || 100000000;
    const sd = state.scenarioSpreadDuration || state.targetSpreadDurationYears;
    const bm = state.xoverSpreadDuration || 4.30;
    const fx0 = state.scenarioEntryFx || 1.1392;
    const sp0 = state.scenarioEntrySpread || 296.0;

    state.scenarioList.forEach((sc, idx) => {
      const tr = document.createElement("tr");

      const targetSpread = sp0 + sc.spreadShift;
      const targetFx = fx0 * (1 + sc.fxPct / 100.0);

      const res = calculateTradePnl({
        targetSd: sd,
        sdXover: bm,
        direction: state.direction,
        entrySpread: sp0,
        exitSpread: targetSpread,
        carryBps: sp0,
        days: sc.days,
        entryFx: fx0,
        exitFx: targetFx,
        hedgePct: state.fxHedgePct,
        hedgeStance: state.fxHedgeStance,
        navUsd: nav,
      });

      if (sc.spreadShift === state.scenarioSpreadShift && sc.fxPct === state.scenarioFxPct && sc.days === state.scenarioDays) {
        tr.classList.add("selected-row");
      }

      // Col 1: Regime Name & Thesis
      const tdName = document.createElement("td");
      tdName.innerHTML = `<strong>${sc.name}</strong><div style="font-size: 11px; color: var(--muted);">${sc.desc}</div>`;
      tr.appendChild(tdName);

      // Col 2: Spread Move (Editable Input)
      const tdSpMove = document.createElement("td");
      tdSpMove.style.textAlign = "right";
      const inSpMove = document.createElement("input");
      inSpMove.type = "number";
      inSpMove.step = "5";
      inSpMove.className = "scen-row-input";
      inSpMove.value = sc.spreadShift;
      inSpMove.addEventListener("change", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          sc.spreadShift = val;
          renderScenarioTable();
          renderSensitivityMatrix();
          if (idx === 0) {
            state.scenarioSpreadShift = val;
            renderScenarioCustomControls();
          }
        }
      });
      tdSpMove.appendChild(inSpMove);
      tr.appendChild(tdSpMove);

      // Col 3: Exit Spread (Computed)
      const tdExitSp = document.createElement("td");
      tdExitSp.style.textAlign = "right";
      tdExitSp.style.fontWeight = "700";
      tdExitSp.textContent = `${targetSpread.toFixed(1)} bps`;
      tr.appendChild(tdExitSp);

      // Col 4: EUR Move (%) (Editable Input)
      const tdFxMove = document.createElement("td");
      tdFxMove.style.textAlign = "right";
      const inFxMove = document.createElement("input");
      inFxMove.type = "number";
      inFxMove.step = "0.5";
      inFxMove.className = "scen-row-input";
      inFxMove.value = sc.fxPct;
      inFxMove.addEventListener("change", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          sc.fxPct = val;
          renderScenarioTable();
          renderSensitivityMatrix();
          if (idx === 0) {
            state.scenarioFxPct = val;
            renderScenarioCustomControls();
          }
        }
      });
      tdFxMove.appendChild(inFxMove);
      tr.appendChild(tdFxMove);

      // Col 5: Exit EUR/USD (Computed)
      const tdExitFx = document.createElement("td");
      tdExitFx.style.textAlign = "right";
      tdExitFx.style.fontWeight = "700";
      tdExitFx.textContent = targetFx.toFixed(4);
      tr.appendChild(tdExitFx);

      // Col 6: Horizon (Editable Input)
      const tdDays = document.createElement("td");
      tdDays.style.textAlign = "right";
      const inDays = document.createElement("input");
      inDays.type = "number";
      inDays.step = "15";
      inDays.className = "scen-row-input";
      inDays.value = sc.days;
      inDays.addEventListener("change", (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) {
          sc.days = val;
          renderScenarioTable();
          renderSensitivityMatrix();
        }
      });
      tdDays.appendChild(inDays);
      tr.appendChild(tdDays);

      // Col 7: Spread Return (bps)
      const tdSpPnl = document.createElement("td");
      tdSpPnl.style.textAlign = "right";
      tdSpPnl.className = res.spreadPnlBps >= 0 ? "good" : "bad";
      tdSpPnl.style.fontWeight = "600";
      tdSpPnl.textContent = fmtBps(res.spreadPnlBps, 1);
      tr.appendChild(tdSpPnl);

      // Col 8: Carry Yield (bps)
      const tdCarryPnl = document.createElement("td");
      tdCarryPnl.style.textAlign = "right";
      tdCarryPnl.className = res.carryPnlBps >= 0 ? "good" : "bad";
      tdCarryPnl.style.fontWeight = "600";
      tdCarryPnl.textContent = fmtBps(res.carryPnlBps, 1);
      tr.appendChild(tdCarryPnl);

      // Col 9: FX Translation (bps)
      const tdFxTrans = document.createElement("td");
      tdFxTrans.style.textAlign = "right";
      tdFxTrans.className = res.fxTranslationBps >= 0 ? "good" : "bad";
      tdFxTrans.textContent = fmtBps(res.fxTranslationBps, 1);
      tr.appendChild(tdFxTrans);

      // Col 10: FX Hedge (bps)
      const tdFxHedge = document.createElement("td");
      tdFxHedge.style.textAlign = "right";
      tdFxHedge.className = res.fxHedgeBps >= 0 ? "good" : "bad";
      tdFxHedge.textContent = fmtBps(res.fxHedgeBps, 1);
      tr.appendChild(tdFxHedge);

      // Col 11: Total Return (bps)
      const tdTotBps = document.createElement("td");
      tdTotBps.style.textAlign = "right";
      const pill = document.createElement("span");
      pill.className = "modeler-table-pill " + (res.totalNetPnlBps >= 0 ? "pill-good" : "pill-bad");
      pill.textContent = fmtBps(res.totalNetPnlBps, 1);
      tdTotBps.appendChild(pill);
      tr.appendChild(tdTotBps);

      // Col 12: Unhedged Return (bps)
      const tdUnhedgedBps = document.createElement("td");
      tdUnhedgedBps.style.textAlign = "right";
      tdUnhedgedBps.style.fontWeight = "600";
      tdUnhedgedBps.className = res.unhedgedNetPnlBps >= 0 ? "good" : "bad";
      tdUnhedgedBps.textContent = fmtBps(res.unhedgedNetPnlBps, 1);
      tr.appendChild(tdUnhedgedBps);

      // Col 13: Illustrative USD ($)
      const tdTotUsd = document.createElement("td");
      tdTotUsd.style.textAlign = "right";
      tdTotUsd.className = res.totalNetPnlUsd >= 0 ? "good" : "bad";
      tdTotUsd.style.fontWeight = "600";
      tdTotUsd.textContent = fmtUsd(res.totalNetPnlUsd);
      tr.appendChild(tdTotUsd);

      // Col 14: Action
      const tdAct = document.createElement("td");
      tdAct.style.textAlign = "center";
      const btnInspect = document.createElement("button");
      btnInspect.type = "button";
      btnInspect.className = "scen-row-btn";
      btnInspect.textContent = "Inspect ▾";
      btnInspect.title = "Load this scenario into the Waterfall simulator below";
      btnInspect.addEventListener("click", () => {
        state.scenarioSpreadShift = sc.spreadShift;
        state.scenarioFxPct = sc.fxPct;
        state.scenarioDays = sc.days;
        renderScenarioTable();
        renderSensitivityMatrix();
        renderScenarioCustomControls();
        const customCard = el("xoScenarioWaterfall");
        if (customCard) customCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      tdAct.appendChild(btnInspect);
      tr.appendChild(tdAct);

      tbody.appendChild(tr);
    });
  }

  function renderSensitivityMatrix() {
    const tableBody = el("xoMatrixTableBody");
    const tableHead = el("xoMatrixTableHead");
    if (!tableBody || !tableHead) return;

    let spreadShifts = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
    let fxMoves = [-10.0, -7.5, -5.0, -2.5, 0.0, 2.5, 5.0, 7.5, 10.0];

    if (state.matrixPreset === "tight") {
      spreadShifts = [-40, -30, -20, -10, 0, 10, 20, 30, 40];
      fxMoves = [-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
    } else if (state.matrixPreset === "stress") {
      spreadShifts = [0, 25, 50, 75, 100, 125, 150, 175, 200];
      fxMoves = [-12.0, -9.0, -6.0, -3.0, 0.0, 1.5, 3.0, 4.5, 6.0];
    } else if (state.matrixPreset === "rally") {
      spreadShifts = [-120, -100, -80, -60, -40, -20, 0, 20, 40];
      fxMoves = [-4.0, -2.0, 0.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0];
    }

    const elDaysLbl = el("xoMatrixDaysLabel");
    if (elDaysLbl) elDaysLbl.textContent = `${state.scenarioDays} days (${(state.scenarioDays / 30).toFixed(1)}M)`;

    tableHead.replaceChildren();
    const trHead = document.createElement("tr");
    const thCorner = document.createElement("th");
    thCorner.textContent = "Spread \\ EUR";
    thCorner.className = "modeler-matrix-th corner";
    trHead.appendChild(thCorner);

    fxMoves.forEach((fx) => {
      const th = document.createElement("th");
      th.className = "modeler-matrix-th";
      th.textContent = (fx > 0 ? "+" : "") + fx.toFixed(1) + "%";
      trHead.appendChild(th);
    });
    tableHead.appendChild(trHead);

    tableBody.replaceChildren();
    const baseSpread = state.scenarioEntrySpread || 296.0;
    const baseFx = state.scenarioEntryFx || 1.1392;
    const nav = state.portfolioNavUsd || 100000000;
    const sd = state.scenarioSpreadDuration || state.targetSpreadDurationYears;
    const bm = state.xoverSpreadDuration || 4.30;

    spreadShifts.forEach((sShift) => {
      const tr = document.createElement("tr");
      const thRow = document.createElement("th");
      thRow.className = "modeler-matrix-row-th";
      thRow.textContent = (sShift > 0 ? "+" : "") + sShift + " bps";
      tr.appendChild(thRow);

      fxMoves.forEach((fMove) => {
        const td = document.createElement("td");
        td.className = "modeler-matrix-td";

        const targetSpread = baseSpread + sShift;
        const targetFx = baseFx * (1 + fMove / 100.0);

        const res = calculateTradePnl({
          targetSd: sd,
          sdXover: bm,
          direction: state.direction,
          entrySpread: baseSpread,
          exitSpread: targetSpread,
          carryBps: baseSpread,
          days: state.scenarioDays,
          entryFx: baseFx,
          exitFx: targetFx,
          hedgePct: state.fxHedgePct,
          hedgeStance: state.fxHedgeStance,
          navUsd: nav,
        });

        let displayVal = "";
        let numVal = 0;

        if (state.matrixViewMode === "bps") {
          numVal = res.totalNetPnlBps;
          displayVal = (numVal > 0 ? "+" : "") + numVal.toFixed(0);
        } else if (state.matrixViewMode === "usd") {
          numVal = res.totalNetPnlUsd / 1000.0;
          displayVal = (numVal > 0 ? "+" : "") + Math.round(numVal) + "k";
        } else if (state.matrixViewMode === "hedge_contrib") {
          numVal = res.fxHedgeBps;
          displayVal = (numVal > 0 ? "+" : "") + numVal.toFixed(1);
        } else if (state.matrixViewMode === "unhedged_bps") {
          numVal = res.unhedgedNetPnlBps;
          displayVal = (numVal > 0 ? "+" : "") + numVal.toFixed(0);
        }

        td.textContent = displayVal;

        const isGood = numVal >= 0;
        const absVal = Math.min(100, Math.abs(numVal));
        const alpha = Math.min(0.75, 0.08 + (absVal / 100.0) * 0.65);

        if (isGood) {
          td.style.backgroundColor = `rgba(36, 138, 61, ${alpha})`;
          td.style.color = alpha > 0.4 ? "#ffffff" : "#1d1d1f";
        } else {
          td.style.backgroundColor = `rgba(215, 0, 21, ${alpha})`;
          td.style.color = alpha > 0.4 ? "#ffffff" : "#1d1d1f";
        }

        if (sShift === state.scenarioSpreadShift && fMove === state.scenarioFxPct) {
          td.classList.add("active-cell");
        }

        td.title = `Spread: ${sShift > 0 ? "+" : ""}${sShift} bps | EUR: ${fMove > 0 ? "+" : ""}${fMove}% -> PnL: ${fmtBps(res.totalNetPnlBps, 1)} (${fmtPct(res.totalReturnPct)})`;
        td.addEventListener("click", () => {
          state.scenarioSpreadShift = sShift;
          state.scenarioFxPct = fMove;
          renderScenarioCustomControls();
          renderSensitivityMatrix();
        });

        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });
  }

  function renderScenarioCustomControls() {
    const slSp = el("xoScenarioSpreadSlider");
    const inSp = el("xoScenarioSpreadInput");
    const slFx = el("xoScenarioFxSlider");
    const inFx = el("xoScenarioFxInput");
    const slDays = el("xoScenarioDaysSlider");
    const inDays = el("xoScenarioDaysInput");

    const elSpVal = el("xoScenarioSpreadVal");
    const elFxVal = el("xoScenarioFxVal");
    const elDaysVal = el("xoScenarioDaysVal");

    if (slSp) slSp.value = state.scenarioSpreadShift;
    if (inSp && document.activeElement !== inSp) inSp.value = state.scenarioSpreadShift;
    if (slFx) slFx.value = state.scenarioFxPct;
    if (inFx && document.activeElement !== inFx) inFx.value = state.scenarioFxPct;
    if (slDays) slDays.value = state.scenarioDays;
    if (inDays && document.activeElement !== inDays) inDays.value = state.scenarioDays;

    if (elSpVal) elSpVal.textContent = fmtBps(state.scenarioSpreadShift, 1);
    if (elFxVal) elFxVal.textContent = fmtPct(state.scenarioFxPct, 1);
    if (elDaysVal) elDaysVal.textContent = `${state.scenarioDays} days`;

    const baseSpread = state.scenarioEntrySpread || 296.0;
    const baseFx = state.scenarioEntryFx || 1.1392;
    const nav = state.portfolioNavUsd || 100000000;
    const sd = state.scenarioSpreadDuration || state.targetSpreadDurationYears;
    const bm = state.xoverSpreadDuration || 4.30;

    const targetSpread = baseSpread + state.scenarioSpreadShift;
    const targetFx = baseFx * (1 + state.scenarioFxPct / 100.0);

    const res = calculateTradePnl({
      targetSd: sd,
      sdXover: bm,
      direction: state.direction,
      entrySpread: baseSpread,
      exitSpread: targetSpread,
      carryBps: baseSpread,
      days: state.scenarioDays,
      entryFx: baseFx,
      exitFx: targetFx,
      hedgePct: state.fxHedgePct,
      hedgeStance: state.fxHedgeStance,
      navUsd: nav,
    });

    const elScenBps = el("xoScenarioBpsReadout");
    const elScenPct = el("xoScenarioPctReadout");
    const elScenUsd = el("xoScenarioUsdReadout");
    const elScenAnn = el("xoScenarioAnnualizedReadout");
    const elScenDesc = el("xoScenarioDescReadout");

    if (elScenBps) {
      elScenBps.textContent = fmtBps(res.totalNetPnlBps, 1);
      elScenBps.className = "modeler-hero-metric " + (res.totalNetPnlBps >= 0 ? "good" : "bad");
    }
    if (elScenPct) {
      elScenPct.textContent = `${res.totalReturnPct >= 0 ? "+" : ""}${res.totalReturnPct.toFixed(2)}% Return`;
      elScenPct.className = res.totalReturnPct >= 0 ? "good" : "bad";
    }
    if (elScenUsd) {
      elScenUsd.textContent = `(Illustrative: ${fmtUsd(res.totalNetPnlUsd)} on $${(nav / 1e6).toFixed(0)}M NAV)`;
    }
    if (elScenAnn && state.scenarioDays > 0) {
      const annReturn = (res.totalNetPnlBps / 100.0) * (365.0 / state.scenarioDays);
      elScenAnn.textContent = `(Ann: ${annReturn >= 0 ? "+" : ""}${annReturn.toFixed(2)}%)`;
    }
    if (elScenDesc) {
      elScenDesc.textContent = `Spread: ${baseSpread.toFixed(1)} → ${targetSpread.toFixed(1)} bps (${fmtBps(state.scenarioSpreadShift, 1)}) · EUR/USD: ${baseFx.toFixed(4)} → ${targetFx.toFixed(4)} (${fmtPct(state.scenarioFxPct)}) over ${state.scenarioDays}d`;
    }

    renderWaterfallBar("xoScenarioWaterfall", res);
  }

  /**
   * Event Listeners Setup
   */
  function setupDomListeners() {
    // Direction Toggles
    const btnSell = el("xoDirSell");
    const btnBuy = el("xoDirBuy");
    if (btnSell) {
      btnSell.addEventListener("click", () => {
        state.direction = "sell";
        renderAll();
      });
    }
    if (btnBuy) {
      btnBuy.addEventListener("click", () => {
        state.direction = "buy";
        renderAll();
      });
    }

    // Portfolio NAV input
    const inNav = el("xoPortfolioNav");
    if (inNav) {
      inNav.addEventListener("change", (e) => {
        const val = parseFloat(e.target.value.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(val) && val > 0) {
          state.portfolioNavUsd = val;
          syncSizing("duration");
          renderAll();
        }
      });
    }

    // NAV Quick chips
    document.querySelectorAll(".xo-nav-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const v = parseFloat(chip.dataset.nav);
        if (v) {
          state.portfolioNavUsd = v;
          syncSizing("duration");
          renderAll();
        }
      });
    });

    // Spread Duration Controls
    const inSd = el("xoTargetSd");
    const slSd = el("xoTargetSdSlider");
    if (inSd) {
      inSd.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) {
          state.targetSpreadDurationYears = v;
          syncSizing("duration");
          renderAll();
        }
      });
    }
    if (slSd) {
      slSd.addEventListener("input", (e) => {
        state.targetSpreadDurationYears = parseFloat(e.target.value);
        syncSizing("duration");
        renderAll();
      });
    }

    // Benchmark Duration
    const inBmSd = el("xoBenchmarkSd");
    if (inBmSd) {
      inBmSd.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) {
          state.xoverSpreadDuration = v;
          syncSizing("duration");
          renderAll();
        }
      });
    }

    // FX Hedge Controls
    const inHedge = el("xoFxHedgePct");
    const slHedge = el("xoFxHedgeSlider");
    if (inHedge) {
      inHedge.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v >= 0) {
          state.fxHedgePct = v;
          renderAll();
        }
      });
    }
    if (slHedge) {
      slHedge.addEventListener("input", (e) => {
        state.fxHedgePct = parseFloat(e.target.value);
        renderAll();
      });
    }

    // FX Hedge Stance Chips
    ["short_eur", "long_eur", "none"].forEach((st) => {
      const b = el(`xoHedgeStance_${st}`);
      if (b) {
        b.addEventListener("click", () => {
          state.fxHedgeStance = st;
          renderAll();
        });
      }
    });

    // Match CDS Notional button
    const btnMatchNotional = el("xoHedgeMatchNotional");
    if (btnMatchNotional) {
      btnMatchNotional.addEventListener("click", () => {
        const bm = state.xoverSpreadDuration > 0 ? state.xoverSpreadDuration : 4.30;
        const matchPct = (state.targetSpreadDurationYears / bm) * 100.0;
        state.fxHedgePct = Math.round(matchPct * 10) / 10;
        renderAll();
      });
    }

    // Quick hedge chips
    document.querySelectorAll(".xo-hedge-quick-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const p = parseFloat(chip.dataset.pct);
        if (!isNaN(p)) {
          state.fxHedgePct = p;
          renderAll();
        }
      });
    });

    // Historical Date Inputs
    const inEntryDate = el("xoEntryDate");
    const inExitDate = el("xoExitDate");
    if (inEntryDate) {
      inEntryDate.addEventListener("change", (e) => {
        state.entryDate = e.target.value;
        syncDatesFromHistory();
        syncSizing("duration");
        renderAll();
      });
    }
    if (inExitDate) {
      inExitDate.addEventListener("change", (e) => {
        state.exitDate = e.target.value;
        syncDatesFromHistory();
        syncSizing("duration");
        renderAll();
      });
    }

    // Date Preset Chips
    document.querySelectorAll(".xo-date-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const preset = chip.dataset.preset;
        const nowRow = rawHistory[rawHistory.length - 1];
        state.exitDate = nowRow.date;

        if (preset === "1m") {
          const idx = Math.max(0, rawHistory.length - 30);
          state.entryDate = rawHistory[idx].date;
        } else if (preset === "3m") {
          const idx = Math.max(0, rawHistory.length - 90);
          state.entryDate = rawHistory[idx].date;
        } else if (preset === "6m") {
          const idx = Math.max(0, rawHistory.length - 180);
          state.entryDate = rawHistory[idx].date;
        } else if (preset === "1y") {
          const idx = Math.max(0, rawHistory.length - 365);
          state.entryDate = rawHistory[idx].date;
        } else if (preset === "ytd") {
          const idx = rawHistory.findIndex((r) => r.date.startsWith("2026-01"));
          state.entryDate = idx >= 0 ? rawHistory[idx].date : rawHistory[0].date;
        }
        state.overrideEntrySpread = false;
        state.overrideExitSpread = false;
        state.overrideEntryFx = false;
        state.overrideExitFx = false;
        state.overrideHoldingDays = false;
        state.overrideCarry = false;

        syncDatesFromHistory();
        syncSizing("duration");
        renderAll();
      });
    });

    // Overridable Level Inputs
    setupOverrideInput("EntrySpread", (v) => {
      state.entrySpreadBps = v;
      state.overrideEntrySpread = true;
    });
    setupOverrideInput("ExitSpread", (v) => {
      state.exitSpreadBps = v;
      state.overrideExitSpread = true;
    });
    setupOverrideInput("EntryFx", (v) => {
      state.entryEurUsd = v;
      state.overrideEntryFx = true;
      syncSizing("duration");
    });
    setupOverrideInput("ExitFx", (v) => {
      state.exitEurUsd = v;
      state.overrideExitFx = true;
    });
    setupOverrideInput("HoldingDays", (v) => {
      state.holdingDays = Math.round(v);
      state.overrideHoldingDays = true;
    });
    setupOverrideInput("AnnualCarry", (v) => {
      state.annualCarryBps = v;
      state.overrideCarry = true;
    });

    // Reset Override Buttons
    setupResetBtn("EntrySpread", () => {
      state.entrySpreadBps = state.histEntrySpread;
      state.overrideEntrySpread = false;
    });
    setupResetBtn("ExitSpread", () => {
      state.exitSpreadBps = state.histExitSpread;
      state.overrideExitSpread = false;
    });
    setupResetBtn("EntryFx", () => {
      state.entryEurUsd = state.histEntryEurUsd;
      state.overrideEntryFx = false;
      syncSizing("duration");
    });
    setupResetBtn("ExitFx", () => {
      state.exitEurUsd = state.histExitEurUsd;
      state.overrideExitFx = false;
    });
    setupResetBtn("HoldingDays", () => {
      state.holdingDays = state.histHoldingDays;
      state.overrideHoldingDays = false;
    });

    // Chart Range Buttons
    document.querySelectorAll(".xo-chart-range-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".xo-chart-range-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.chartRange = btn.dataset.range;
        renderDualChart();
      });
    });

    // Chart Canvas Mouse Interactions (Hover Crosshair)
    const canvas = el("xoverPnlChartCanvas");
    if (canvas) {
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const padLeft = 60;
        const chartW = rect.width - padLeft - 55;

        let daysToInclude = 365;
        if (state.chartRange === "3M") daysToInclude = 90;
        else if (state.chartRange === "6M") daysToInclude = 180;
        else if (state.chartRange === "1Y") daysToInclude = 365;
        else if (state.chartRange === "2Y") daysToInclude = 730;
        else if (state.chartRange === "ALL") daysToInclude = rawHistory.length;

        const startIdx = Math.max(0, rawHistory.length - daysToInclude);
        const viewRows = rawHistory.slice(startIdx);
        const n = viewRows.length;

        if (mouseX >= padLeft && mouseX <= padLeft + chartW) {
          const frac = (mouseX - padLeft) / chartW;
          state.hoverIdx = Math.round(frac * (n - 1));
          renderDualChart();
        }
      });

      canvas.addEventListener("mouseleave", () => {
        state.hoverIdx = null;
        renderDualChart();
      });
    }

    // Scenario Sliders & Inputs
    setupScenarioInputs("Spread", (v) => (state.scenarioSpreadShift = v));
    setupScenarioInputs("Fx", (v) => (state.scenarioFxPct = v));
    setupScenarioInputs("Days", (v) => (state.scenarioDays = Math.round(v)));

    // Scenario Baseline Inputs
    const inScenSd = el("xoScenTargetSd");
    const slScenSd = el("xoScenTargetSdSlider");
    if (inScenSd) {
      inScenSd.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) {
          state.scenarioSpreadDuration = v;
          state.targetSpreadDurationYears = v;
          syncSizing("duration");
          renderAll();
        }
      });
    }
    if (slScenSd) {
      slScenSd.addEventListener("input", (e) => {
        const v = parseFloat(e.target.value);
        state.scenarioSpreadDuration = v;
        state.targetSpreadDurationYears = v;
        syncSizing("duration");
        renderAll();
      });
    }

    const inScenEntrySp = el("xoScenEntrySpread");
    if (inScenEntrySp) {
      inScenEntrySp.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) {
          state.scenarioEntrySpread = v;
          renderScenarioSection();
        }
      });
    }

    const btnResetSp = el("xoScenResetSpread");
    if (btnResetSp) {
      btnResetSp.addEventListener("click", () => {
        const nowRow = rawHistory[rawHistory.length - 1];
        state.scenarioEntrySpread = nowRow ? nowRow.itraxx_xover : 296.0;
        renderScenarioSection();
      });
    }

    const btnSp250 = el("xoScenSpread250");
    if (btnSp250) {
      btnSp250.addEventListener("click", () => {
        state.scenarioEntrySpread = 250.0;
        renderScenarioSection();
      });
    }

    const btnSp350 = el("xoScenSpread350");
    if (btnSp350) {
      btnSp350.addEventListener("click", () => {
        state.scenarioEntrySpread = 350.0;
        renderScenarioSection();
      });
    }

    const inScenFx = el("xoScenEntryFx");
    if (inScenFx) {
      inScenFx.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v > 0) {
          state.scenarioEntryFx = v;
          renderScenarioSection();
        }
      });
    }

    const inScenDays = el("xoScenDaysInput");
    if (inScenDays) {
      inScenDays.addEventListener("change", (e) => {
        const v = parseInt(e.target.value, 10);
        if (!isNaN(v) && v > 0) {
          state.scenarioDays = v;
          document.querySelectorAll(".xo-scen-day-chip").forEach((c) => {
            c.classList.toggle("active", parseInt(c.dataset.days, 10) === v);
          });
          renderScenarioSection();
        }
      });
    }

    document.querySelectorAll(".xo-scen-day-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".xo-scen-day-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.scenarioDays = parseInt(chip.dataset.days, 10);
        renderScenarioSection();
      });
    });

    const inScenHedgePct = el("xoScenFxHedgePct");
    if (inScenHedgePct) {
      inScenHedgePct.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v) && v >= 0) {
          state.fxHedgePct = v;
          renderAll();
        }
      });
    }

    const bScenHedgeShort = el("xoScenHedgeShort");
    const bScenHedgeLong = el("xoScenHedgeLong");
    const bScenHedgeNone = el("xoScenHedgeNone");
    if (bScenHedgeShort) {
      bScenHedgeShort.addEventListener("click", () => {
        state.fxHedgeStance = "short_eur";
        renderAll();
      });
    }
    if (bScenHedgeLong) {
      bScenHedgeLong.addEventListener("click", () => {
        state.fxHedgeStance = "long_eur";
        renderAll();
      });
    }
    if (bScenHedgeNone) {
      bScenHedgeNone.addEventListener("click", () => {
        state.fxHedgeStance = "none";
        renderAll();
      });
    }

    const btnResetScens = el("xoResetScenariosBtn");
    if (btnResetScens) {
      btnResetScens.addEventListener("click", () => {
        state.scenarioList = JSON.parse(JSON.stringify(DEFAULT_SCENARIOS));
        renderScenarioTable();
      });
    }

    // Matrix Range Preset Buttons
    document.querySelectorAll(".xo-matrix-preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".xo-matrix-preset-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.matrixPreset = btn.dataset.preset;
        renderSensitivityMatrix();
      });
    });

    // Scenario Macro Presets
    document.querySelectorAll(".xo-macro-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.scenarioSpreadShift = parseFloat(btn.dataset.spread);
        state.scenarioFxPct = parseFloat(btn.dataset.fx);
        if (btn.dataset.days) {
          state.scenarioDays = parseInt(btn.dataset.days, 10);
        }
        renderScenarioSection();
      });
    });

    // Matrix View Mode Buttons
    document.querySelectorAll(".xo-matrix-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".xo-matrix-mode-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.matrixViewMode = btn.dataset.mode;
        renderSensitivityMatrix();
      });
    });

    // Section Toggle Tabs
    const tabBacktest = el("tabHistoricalBacktest");
    const tabScenario = el("tabScenarioStress");
    const secBacktest = el("secHistoricalBacktest");
    const secScenario = el("secScenarioStress");

    if (tabBacktest && tabScenario && secBacktest && secScenario) {
      tabBacktest.addEventListener("click", () => {
        tabBacktest.classList.add("active");
        tabScenario.classList.remove("active");
        secBacktest.style.display = "block";
        secScenario.style.display = "none";
        renderDualChart();
      });

      tabScenario.addEventListener("click", () => {
        tabScenario.classList.add("active");
        tabBacktest.classList.remove("active");
        secBacktest.style.display = "none";
        secScenario.style.display = "block";
        renderScenarioSection();
      });
    }

    window.addEventListener("resize", () => {
      renderDualChart();
    });
  }

  function setupOverrideInput(field, updater) {
    const input = el(`xo${field}`);
    if (input) {
      input.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) {
          updater(v);
          renderAll();
        }
      });
    }
  }

  function setupResetBtn(field, resetter) {
    const btn = el(`xoReset_${field}`);
    if (btn) {
      btn.addEventListener("click", () => {
        resetter();
        renderAll();
      });
    }
  }

  function setupScenarioInputs(type, updater) {
    const sl = el(`xoScenario${type}Slider`);
    const inp = el(`xoScenario${type}Input`);
    if (sl) {
      sl.addEventListener("input", (e) => {
        updater(parseFloat(e.target.value));
        renderScenarioCustomControls();
        renderSensitivityMatrix();
      });
    }
    if (inp) {
      inp.addEventListener("change", (e) => {
        const v = parseFloat(e.target.value);
        if (!isNaN(v)) {
          updater(v);
          renderScenarioCustomControls();
          renderSensitivityMatrix();
        }
      });
    }
  }

  function round2(v) {
    return Math.round(v * 100) / 100;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initModeler);
  } else {
    initModeler();
  }
})();
