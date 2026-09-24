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
    entrySpreadBps: 329.7,
    exitSpreadBps: 296.0,
    entryEurUsd: 1.1705,
    exitEurUsd: 1.1392,
    annualCarryBps: 329.7,
    holdingDays: 262,

    // Historical baseline values for override tracking
    histEntrySpread: 329.7,
    histExitSpread: 296.0,
    histEntryEurUsd: 1.1705,
    histExitEurUsd: 1.1392,
    histHoldingDays: 262,

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
    scenarioSpreadShift: -25.0, // bps
    scenarioFxPct: -2.5, // %
    scenarioDays: 90, // days
    scenarioCarryBps: 296.0,
    matrixViewMode: "bps", // "bps", "usd", "hedge_contrib", "unhedged_bps"
    activeSection: "backtest", // "backtest" or "scenario"
  };

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

    // Pick entry date ~6M ago or Jan 2026
    const targetEntryIdx = Math.max(0, rawHistory.length - 180);
    state.entryDate = rawHistory[targetEntryIdx].date;

    // Populate indicative levels from historical data
    syncDatesFromHistory();
    syncSizing("duration");
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
   * Core Mathematical PnL Attribution Engine
   */
  function calculateTradePnl(params) {
    const {
      navUsd,
      direction, // "sell" (Long Risk) or "buy" (Short Risk)
      notionalEur,
      sdXover,
      entrySpread,
      exitSpread,
      carryBps,
      days,
      entryFx,
      exitFx,
      hedgePct,
      hedgeStance, // "short_eur", "long_eur", "none"
    } = params;

    const spreadDelta = exitSpread - entrySpread; // in bps

    // 1. Credit Capital Spread PnL (in EUR)
    // Sell Protection: benefits from spread tightening (spreadDelta < 0)
    // Buy Protection: benefits from spread widening (spreadDelta > 0)
    const spreadPnlEur =
      direction === "sell"
        ? notionalEur * sdXover * (-spreadDelta / 10000.0)
        : notionalEur * sdXover * (spreadDelta / 10000.0);

    // 2. Carry PnL (in EUR)
    // Sell Protection: receives carry; Buy Protection: pays carry
    const carryPnlEur =
      direction === "sell"
        ? notionalEur * (carryBps / 10000.0) * (days / 360.0)
        : -notionalEur * (carryBps / 10000.0) * (days / 360.0);

    const totalCdsPnlEur = spreadPnlEur + carryPnlEur;

    // 3. Conversion to USD at Exit FX
    const totalCdsPnlUsd = totalCdsPnlEur * exitFx;
    const baseCdsPnlUsd = totalCdsPnlEur * entryFx;
    // FX Translation Drag/Boost on EUR CDS PnL
    const fxTranslationUsd = totalCdsPnlUsd - baseCdsPnlUsd;

    const spreadPnlUsd = spreadPnlEur * exitFx;
    const carryPnlUsd = carryPnlEur * exitFx;

    // 4. FX Hedge Overlay
    const hedgeNotionalUsd = navUsd * (hedgePct / 100.0);
    const hedgeNotionalEur = hedgeNotionalUsd / entryFx;

    let fxHedgePnlUsd = 0;
    if (hedgeStance === "short_eur") {
      // Short EUR / Buy USD: gains when EUR weakens (exitFx < entryFx)
      fxHedgePnlUsd = -hedgeNotionalEur * (exitFx - entryFx);
    } else if (hedgeStance === "long_eur") {
      // Long EUR / Sell USD: gains when EUR strengthens (exitFx > entryFx)
      fxHedgePnlUsd = hedgeNotionalEur * (exitFx - entryFx);
    }

    // 5. Net Combined Portfolio Totals
    const totalNetPnlUsd = totalCdsPnlUsd + fxHedgePnlUsd;
    const totalNetPnlBps = (totalNetPnlUsd / navUsd) * 10000.0;

    const unhedgedNetPnlUsd = totalCdsPnlUsd;
    const unhedgedNetPnlBps = (unhedgedNetPnlUsd / navUsd) * 10000.0;

    const spreadPnlBps = (spreadPnlUsd / navUsd) * 10000.0;
    const carryPnlBps = (carryPnlUsd / navUsd) * 10000.0;
    const fxTranslationBps = (fxTranslationUsd / navUsd) * 10000.0;
    const fxHedgeBps = (fxHedgePnlUsd / navUsd) * 10000.0;

    return {
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
    if (inSd && document.activeElement !== inSd) inSd.value = state.targetSpreadDurationYears.toFixed(2);
    if (slSd) slSd.value = state.targetSpreadDurationYears;

    const inBmSd = el("xoBenchmarkSd");
    if (inBmSd && document.activeElement !== inBmSd) inBmSd.value = state.xoverSpreadDuration.toFixed(2);

    // Notional readouts
    const elNotionalEur = el("xoNotionalEurReadout");
    const elNotionalUsd = el("xoNotionalUsdReadout");
    const elDv01Eur = el("xoDv01EurReadout");
    const elDv01Usd = el("xoDv01UsdReadout");
    const elPortSens = el("xoPortSensReadout");

    const dv01Eur = state.notionalEur * state.xoverSpreadDuration * 0.0001;
    const dv01Usd = dv01Eur * state.entryEurUsd;

    if (elNotionalEur) elNotionalEur.textContent = `€${Math.round(state.notionalEur).toLocaleString("en-US")}`;
    if (elNotionalUsd) elNotionalUsd.textContent = `$${Math.round(state.notionalUsd).toLocaleString("en-US")}`;
    if (elDv01Eur) elDv01Eur.textContent = `€${Math.round(dv01Eur).toLocaleString("en-US")} / bp`;
    if (elDv01Usd) elDv01Usd.textContent = `$${Math.round(dv01Usd).toLocaleString("en-US")} / bp`;
    if (elPortSens) {
      const portSensBps = (dv01Usd / state.portfolioNavUsd) * 10000.0;
      elPortSens.textContent = `${portSensBps.toFixed(2)} bps / bp spread move`;
    }

    // FX Hedge controls
    const inHedge = el("xoFxHedgePct");
    const slHedge = el("xoFxHedgeSlider");
    if (inHedge && document.activeElement !== inHedge) inHedge.value = state.fxHedgePct.toFixed(1);
    if (slHedge) slHedge.value = state.fxHedgePct;

    const elHedgeNotionalUsd = el("xoHedgeNotionalUsdReadout");
    const elHedgeNotionalEur = el("xoHedgeNotionalEurReadout");
    const hedgeUsd = state.portfolioNavUsd * (state.fxHedgePct / 100.0);
    const hedgeEur = hedgeUsd / state.entryEurUsd;
    if (elHedgeNotionalUsd) elHedgeNotionalUsd.textContent = `$${Math.round(hedgeUsd).toLocaleString("en-US")}`;
    if (elHedgeNotionalEur) elHedgeNotionalEur.textContent = `€${Math.round(hedgeEur).toLocaleString("en-US")}`;

    // Stance Buttons
    ["short_eur", "long_eur", "none"].forEach((st) => {
      const b = el(`xoHedgeStance_${st}`);
      if (b) {
        b.className = "modeler-chip " + (state.fxHedgeStance === st ? "active" : "");
      }
    });
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
      navUsd: state.portfolioNavUsd,
      direction: state.direction,
      notionalEur: state.notionalEur,
      sdXover: state.xoverSpreadDuration,
      entrySpread: state.entrySpreadBps,
      exitSpread: state.exitSpreadBps,
      carryBps: state.annualCarryBps,
      days: state.holdingDays,
      entryFx: state.entryEurUsd,
      exitFx: state.exitEurUsd,
      hedgePct: state.fxHedgePct,
      hedgeStance: state.fxHedgeStance,
    });

    // Populate Headline KPI
    const elHeroBps = el("xoHeroBps");
    const elHeroUsd = el("xoHeroUsd");
    const elHeroEur = el("xoHeroEur");
    const elHeroBadge = el("xoHeroBadge");
    const elHeroUnhedged = el("xoHeroUnhedged");

    if (elHeroBps) {
      elHeroBps.textContent = fmtBps(res.totalNetPnlBps, 1);
      elHeroBps.className = "modeler-hero-metric " + (res.totalNetPnlBps >= 0 ? "good" : "bad");
    }
    if (elHeroUsd) elHeroUsd.textContent = fmtUsd(res.totalNetPnlUsd);
    if (elHeroEur) elHeroEur.textContent = fmtEur(res.totalCdsPnlEur);
    if (elHeroUnhedged) {
      elHeroUnhedged.textContent = `Unhedged: ${fmtBps(res.unhedgedNetPnlBps, 1)} (${fmtUsd(res.unhedgedNetPnlUsd)}) · FX Hedge Alpha: ${fmtBps(res.fxHedgeBps, 1)}`;
    }
    if (elHeroBadge) {
      const isSell = state.direction === "sell";
      elHeroBadge.textContent = `${isSell ? "SELL PROTECTION (LONG RISK)" : "BUY PROTECTION (SHORT RISK)"} · ${state.holdingDays} DAYS`;
    }

    // Populate Detailed 4-Pillar Table
    setRowData("CapSpread", {
      detail: `Spread move: ${state.entrySpreadBps.toFixed(1)} → ${state.exitSpreadBps.toFixed(1)} (${fmtBps(res.spreadDelta, 1)})`,
      eur: fmtEur(res.spreadPnlEur),
      usd: fmtUsd(res.spreadPnlUsd),
      bps: fmtBps(res.spreadPnlBps, 2),
      isGood: res.spreadPnlBps >= 0,
    });

    setRowData("Carry", {
      detail: `Coupon carry @ ${state.annualCarryBps.toFixed(1)} bps over ${state.holdingDays}d`,
      eur: fmtEur(res.carryPnlEur),
      usd: fmtUsd(res.carryPnlUsd),
      bps: fmtBps(res.carryPnlBps, 2),
      isGood: res.carryPnlBps >= 0,
    });

    setRowData("FxTrans", {
      detail: `EUR/USD moved ${state.entryEurUsd.toFixed(4)} → ${state.exitEurUsd.toFixed(4)} (${fmtPct(((state.exitEurUsd - state.entryEurUsd) / state.entryEurUsd) * 100)}) on CDS MTM`,
      eur: "—",
      usd: fmtUsd(res.fxTranslationUsd),
      bps: fmtBps(res.fxTranslationBps, 2),
      isGood: res.fxTranslationBps >= 0,
    });

    setRowData("FxHedge", {
      detail: `${state.fxHedgePct.toFixed(1)}% Portfolio Overlay (${state.fxHedgeStance.replace("_", " ").toUpperCase()})`,
      eur: "—",
      usd: fmtUsd(res.fxHedgePnlUsd),
      bps: fmtBps(res.fxHedgeBps, 2),
      isGood: res.fxHedgeBps >= 0,
    });

    setRowData("NetTotal", {
      detail: "Combined Net Portfolio Impact (USD Base)",
      eur: fmtEur(res.totalCdsPnlEur),
      usd: fmtUsd(res.totalNetPnlUsd),
      bps: fmtBps(res.totalNetPnlBps, 1),
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

    if (elDet) elDet.textContent = data.detail;
    if (elEur) elEur.textContent = data.eur;
    if (elUsd) {
      elUsd.textContent = data.usd;
      elUsd.className = data.isGood ? "good" : "bad";
    }
    if (elBps) {
      elBps.textContent = data.bps;
      elBps.className = "modeler-table-pill " + (data.isGood ? "pill-good" : "pill-bad");
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
    renderScenarioCustomControls();
    renderSensitivityMatrix();
  }

  function renderScenarioCustomControls() {
    const slSp = el("xoScenarioSpreadSlider");
    const inSp = el("xoScenarioSpreadInput");
    const slFx = el("xoScenarioFxSlider");
    const inFx = el("xoScenarioFxInput");
    const slDays = el("xoScenarioDaysSlider");
    const inDays = el("xoScenarioDaysInput");

    if (slSp) slSp.value = state.scenarioSpreadShift;
    if (inSp && document.activeElement !== inSp) inSp.value = state.scenarioSpreadShift;
    if (slFx) slFx.value = state.scenarioFxPct;
    if (inFx && document.activeElement !== inFx) inFx.value = state.scenarioFxPct;
    if (slDays) slDays.value = state.scenarioDays;
    if (inDays && document.activeElement !== inDays) inDays.value = state.scenarioDays;

    // Compute custom scenario PnL
    const baseSpread = state.exitSpreadBps;
    const baseFx = state.exitEurUsd;

    const targetSpread = baseSpread + state.scenarioSpreadShift;
    const targetFx = baseFx * (1 + state.scenarioFxPct / 100.0);

    const res = calculateTradePnl({
      navUsd: state.portfolioNavUsd,
      direction: state.direction,
      notionalEur: state.notionalEur,
      sdXover: state.xoverSpreadDuration,
      entrySpread: baseSpread,
      exitSpread: targetSpread,
      carryBps: state.scenarioCarryBps || baseSpread,
      days: state.scenarioDays,
      entryFx: baseFx,
      exitFx: targetFx,
      hedgePct: state.fxHedgePct,
      hedgeStance: state.fxHedgeStance,
    });

    const elScenBps = el("xoScenarioBpsReadout");
    const elScenUsd = el("xoScenarioUsdReadout");
    const elScenDesc = el("xoScenarioDescReadout");

    if (elScenBps) {
      elScenBps.textContent = fmtBps(res.totalNetPnlBps, 1);
      elScenBps.className = "modeler-hero-metric " + (res.totalNetPnlBps >= 0 ? "good" : "bad");
    }
    if (elScenUsd) elScenUsd.textContent = fmtUsd(res.totalNetPnlUsd);
    if (elScenDesc) {
      elScenDesc.textContent = `Spread: ${baseSpread.toFixed(1)} → ${targetSpread.toFixed(1)} bps (${fmtBps(state.scenarioSpreadShift, 1)}) · EUR/USD: ${baseFx.toFixed(4)} → ${targetFx.toFixed(4)} (${fmtPct(state.scenarioFxPct)}) over ${state.scenarioDays}d`;
    }

    renderWaterfallBar("xoScenarioWaterfall", res);
  }

  function renderSensitivityMatrix() {
    const tableBody = el("xoMatrixTableBody");
    const tableHead = el("xoMatrixTableHead");
    if (!tableBody || !tableHead) return;

    // Grid definition
    const spreadShifts = [-100, -75, -50, -25, 0, 25, 50, 75, 100];
    const fxMoves = [-10.0, -7.5, -5.0, -2.5, 0.0, 2.5, 5.0, 7.5, 10.0];

    // Build Header
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

    // Build Rows
    tableBody.replaceChildren();
    const baseSpread = state.exitSpreadBps;
    const baseFx = state.exitEurUsd;

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
          navUsd: state.portfolioNavUsd,
          direction: state.direction,
          notionalEur: state.notionalEur,
          sdXover: state.xoverSpreadDuration,
          entrySpread: baseSpread,
          exitSpread: targetSpread,
          carryBps: state.scenarioCarryBps || baseSpread,
          days: state.scenarioDays,
          entryFx: baseFx,
          exitFx: targetFx,
          hedgePct: state.fxHedgePct,
          hedgeStance: state.fxHedgeStance,
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

        // Color coding
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

        // Active highlight if matching custom scenario
        if (sShift === state.scenarioSpreadShift && fMove === state.scenarioFxPct) {
          td.classList.add("active-cell");
        }

        // Click to load into custom simulator
        td.title = `Spread: ${sShift > 0 ? "+" : ""}${sShift} bps | EUR: ${fMove > 0 ? "+" : ""}${fMove}% -> PnL: ${fmtBps(res.totalNetPnlBps, 1)} (${fmtUsd(res.totalNetPnlUsd)})`;
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
        const matchPct = (state.notionalUsd / state.portfolioNavUsd) * 100.0;
        state.fxHedgePct = round2(matchPct);
        renderAll();
      });
    }

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

    // Scenario Macro Presets
    document.querySelectorAll(".xo-macro-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.scenarioSpreadShift = parseFloat(btn.dataset.spread);
        state.scenarioFxPct = parseFloat(btn.dataset.fx);
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
        renderSensitivityMatrix();
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
