# Antigravity Workspace Guidelines & Context — CEMBI Credit & EM Macro Platform

This document establishes the durable architecture, operating principles, data contracts, and non-negotiables for the CEMBI Credit Master Platform (`rkarim25/cembicredit`). Any AI assistant pair-programming with Reza Karim must read and adhere to these guidelines.

---

## 1. Core Platform Mandate & Repository Boundary

- **Sole Platform for All Credit & EM Macro**: `cembicredit` (`https://rkarim25.github.io/cembicredit/` / local path `C:\Users\Reza Karim\cembicredit`) is the **single, definitive home** for:
  1. **Corporate Credit Research**: 85 CEEMEA & LatAm corporate and bank credit models, multi-period financial history (2021A–2027E), covenant databases, and rating actions.
  2. **Restructuring & SOTP Valuation Engines**: Interactive recovery and haircut engines for complex special situations (Braskem, Zorlu Enerji, Aragvi Holding).
  3. **EM Macro & Sovereign Rates Desks**: GBI-EM local currency debt & FX (17 countries), synthetic credit default swap spreads (CDX), and US Treasury yield curve models.
  4. **Intelligence Vault & News**: Multi-source news feed with desk commentary, cognitive footnotes, and trade tracking.
- **Repository Boundary with Strategy**:
  - `Strategy` (`https://rkarim25.github.io/Strategy/` / `C:\Users\Reza Karim\Strategy`) is strictly Reza's **quantitative equity and ETP systematic backtesting engine** (`SPX`, `NDX`, `LQQ3`, `DAX`, `3BAL`, guarded momentum).
  - **STRICT PROHIBITION**: Never mirror, copy, or deploy corporate credit files, financial models, recovery calculators, or macro desks to `Strategy`. All legacy credit links on `Strategy` permanently redirect to `cembicredit`.

---

## 2. Non-Negotiables (Verbatim)

1. **Reza's time is the scarce resource**: Never make him read a long report. Present about **ten lines** of high-density executive findings, then the question.
2. **Never invent a number**: Every yield, spread, EBITDA, FCF, or valuation multiple must be computed from raw filings, official central bank surveys, or verified financial models in this session.
3. **Default Dual-Persistence Rule**: Any research intake, earnings note, broker report, or model adjustment **must** be stored on the website (`cembicredit`) by default. Updating Notion alone without updating the website is strictly forbidden.
4. **Never git add . / -A**: Always stage explicit files. Clean compiled files (`__pycache__`, `*.pyc`) before committing.
5. **Never leave the site broken**: Verify JavaScript syntax (`node -c <file>`) and DOM element references before deploying. Pushes to `origin main` deploy live immediately via GitHub Pages.

---

## 3. Platform Architecture & Desks

### A. Corporate Credit Master Platform
- **Master Screener (`index.html`)**: Fast client-side screener across 85 issuers (66 Corporates, 19 Banks). Multi-factor filtering by Sector, Region, Country, Rating, Net Leverage, and Spread.
- **Company Dossier (`company.html?id=<ticker>`)**: Deep-dive financial tear sheet, multi-year historical P&L, balance sheet, cash flows, tranche-by-tranche debt maturity schedule, and broker consensus comparisons.
- **Zero-AI Trends (`trends.html`)**: Multi-period historical spread and leverage visualization with zero AI token overhead.
- **Footnotes & Intelligence (`notes.html`)**: Searchable database of qualitative analyst footnotes, accounting adjustments, and cognitive credit reconciliation items.
- **Models Vault (`models/*.xlsx`)**: 85 standalone dynamic openpyxl models + `CEMBI_Master_Comp_Sheet.xlsx`. Every model features calculated cash EBITDA reconciliation, strict FCF waterfall (`EBITDA - Capex - Cash Interest - ΔNWC - Tax = FCF`), and covenant compliance tables.

### B. Restructuring & SOTP Valuation Sandbox Engines
- **Braskem (`braskem_calculator.html`, `braskem_background.html`)**:
  - Sum-of-the-parts (SOTP) valuation across Brazil Basic Chemicals, Polyolefins, USA/Europe Polypropylene, and Mexico (Braskem Idesa JV).
  - Explicit Geological Alagoas sinking-ground provision liability deduction.
  - Multi-scenario debt haircut and debt-for-equity exchange engine with 5 presets (Base Case, Aggressive, Petrobras Recap, Liquidation Floor, Hostile RJ Court).
  - Consolidated EBITDA Sandbox with slider and live Fundamental Value Realization cards.
- **Zorlu Enerji (`zoren_calculator.html`, `zoren_background.html`)**:
  - SOTP covering Geothermal (YEKDEM USD feed-in-tariffs), Wind, Hydro, Gas-fired generation, Electricity Distribution (OEDAŞ), and ZES EV Charging.
  - Creditor violence analysis evaluating Turkish state bank cooperation vs foreign Eurobondholder subordination.
  - 3 permanent scenario presets: Bull, Base, Bear.
  - Consolidated EBITDA Sandbox with fundamental value realization.
- **Aragvi Holding / Trans-Oil (`aragvi_calculator.html`, `aragvi_background.html`)**:
  - SOTP covering Sunflower seed extraction/crushing plants, Grain port terminals (Giurgiulesti, Reni, Chornomorsk), and international agro trading infrastructure.
  - Deep-dive creditor violence analysis: Trade bank liquidity ring-fencing (pre-export facilities) vs 2026 Eurobond maturity cliff.
  - Par asset coverage vs secondary market discount pricing bands (68c–103.5c).
  - Consolidated EBITDA Sandbox with live fundamental value realization.

### C. GBI-EM Local Currency Sovereign Debt & FX Desk
- **Pages**: `local_em.html`, `gbi_country.html`.
- **Universe**: 17 benchmark constituents of J.P. Morgan GBI-EM Global Diversified index:
  - LatAm (5): Brazil (BRL), Mexico (MXN), Colombia (COP), Chile (CLP), Peru (PEN)
  - EMEA (7): South Africa (ZAR), Poland (PLN), Czech Republic (CZK), Hungary (HUF), Romania (RON), Turkey (TRY), Egypt (EGP)
  - Asia (5): Indonesia (IDR), India (INR), Malaysia (MYR), Thailand (THB), Philippines (PHP)
- **Framework**:
  1. **Ex-Ante Real Rates Arithmetic**: `Nominal Policy Rate − 12M Forward CPI = Ex-Ante Real Policy Rate`.
  2. **Terms of Trade (ToT) & 10Y REER Decision Matrix**: 5-quadrant macro positioning.
  3. **Rates Execution Desk**: Concrete trade directives (Receive/Pay Fixed, Flattener, Carry Roll), benchmark swaps/futures, benchmark cash bond, liquidity tier, bid-ask, standard clip, and $10,000 DV01 sizing.
  4. **Geopolitical Transmission & Dated Catalyst Calendar**: 40+ scheduled central bank and inflation events.
- **Engine Script**: `python generate_gbi_em_data.py` -> produces `gbi_em_data.json`.

### D. Credit Derivatives Desk (CDX)
- **Page**: `cdx.html`.
- **Coverage**: CDX.NA.HY (US High Yield), iTraxx Europe Crossover (European Sub-IG), and CDX.EM (Emerging Markets Sovereign).
- **Analytics**: 52-week spread percentiles, Transatlantic basis (US HY - Xover), 50d/200d SMAs, 14-day RSI, distress ratios (% constituents > 1,000 bps), and 12-month expected default forecasts.
- **Engine Script**: `python generate_credit_data.py` -> produces `credit_data.json`.

### E. US Treasury Yield Curve Desk (UST)
- **Page**: `ust.html`.
- **Coverage**: Generic benchmarks (2Y, 5Y, 10Y, 30Y) from Yahoo Finance (`2YY=F`, `^FVX`, `^TNX`, `^TYX`).
- **Analytics**: Spreads (2s10s, 5s30s, 2s30s, 10s30s), Macro Regime classification (Bear/Bull Steepening/Flattening), dual-band duration matrix, and technical invalidation triggers.
- **Engine Script**: `python generate_ust_data.py` -> produces `ust_curve_data.json`, `ust_daily.csv`.

### F. Live Cross-Desk Trade Tracker
- **Data File**: `macro_trade_tracker.json`.
- **Engine Script**: `trade_tracker.py`.
- **Capabilities**: Tracks active trade recommendations across GBI-EM, CDX, and UST with entry level, live MTM level, target, stop loss, and real-time P&L in basis points and USD.

---

## 4. Notion Research & Inbox Integration Workflow

Reza uses Notion as his interactive research notebook. The AI agent acts as the autonomous research clerk and bridge to the website database.

### Notion Page Hierarchy:
| Page Name | Notion URL / Page ID | Purpose |
|---|---|---|
| **Office Data Dump & Inbox** | `https://app.notion.com/p/Inbox-Office-Data-Dump-3df1d0ad68c6813c9f07e7c847880346` (`3df1d0ad68c6813c9f07e7c847880346`) | **Plain input page**: Reza dumps raw text, bullets, or broker decks here. The agent reads, processes to the website, and deletes the processed blocks to keep it clean. |
| **Processed Summaries & Receipts** | `https://app.notion.com/p/Processed-Research-Summaries-Receipts-3df1d0ad68c68181a4d1d916298dc1c7` (`3df1d0ad68c68181a4d1d916298dc1c7`) | **Receipt vault**: Every processed dump prepends a short summary table here with the most recent data displayed first. |
| **Snapshot — Team Meeting Views** | `https://app.notion.com/p/Snapshot-Team-Meeting-Views-3df1d0ad68c681dbb3b4f6ca5ff72d24` (`3df1d0ad68c681dbb3b4f6ca5ff72d24`) | **Morning briefing**: Project progress, recent macro/rates views, corporate credit convictions, and daily news. Updated nightly via automated schedule. |
| **Company Dossiers** | Child pages under Notion Research Repository (`3df1d0ad68c6815eb5c2cffb3b540b1b`) | Living research dossier for each company. |

### Inbox Ingestion Protocol (`scripts/process_notion_inbox.py`):
1. **Read Unstructured Dump**: Fetches blocks from the plain Notion Inbox page.
2. **Extract Structured Entities**:
   - Company ticker, financial periods, revenue, EBITDA, capex, leverage, rating actions.
   - Management guidance revisions: `previous_target` -> `management_target`, `tracking_status`, `forecasting_impact`.
   - Management questions and key catalysts.
3. **Persist to Website Database**:
   - Update `database/issuers/<id>.json`.
   - Update `database/credit_news.json`.
   - Run `python scripts/build_database.py` (updates `credit_master.db`, `database/annotations.json`, `js/issuers_data.js`).
4. **Update Notion Company Dossier**:
   - Demarcate and expand the existing note with the **most recent research first**.
   - Create/update structured top section: Positives, Negatives, Background, Catalysts, Recent Drivers, Management Questions.
   - Demarcate historical timelines below: `--- PREVIOUS RESEARCH & HISTORICAL TIMELINES ---`.
5. **Prepend Receipt**: Insert receipt at top of `Processed Research Summaries & Receipts`.
6. **Clean Inbox**: Delete processed blocks from the Inbox page and restore the placeholder `— Drop your text, bullets, or broker notes right here —`.
7. **Deploy**: Commit and push changes to `rkarim25/cembicredit`.

---

## 5. Daily Nightly Schedule

- **Schedule**: Recurring cron job (`0 21 * * *`, daily at 21:00 UK).
- **Execution Script**: `C:\Users\Reza Karim\cembicredit\scripts\run_nightly_snapshot.bat` -> runs `python scripts/update_notion_snapshot.py`.
- **Output**: Refreshes the `Snapshot — Team Meeting Views` page in Notion with:
  1. What Reza has been up to / recent project progress.
  2. Recent macro and rates views (GBI-EM real yields, UST regime, CDX basis).
  3. Corporate credit convictions and restructuring situation updates.
  4. Fresh daily market news and catalysts from the live crawler.

---

## 6. Available Skills for Any AI Agent

The following 6 skills are co-located in `.agents/skills/` (and globally in `~/.gemini/config/skills/`). Any AI agent reviewing the work can invoke them via their standard workflow:

| Skill | Trigger Phrases | Purpose |
|---|---|---|
| `analyse-gbi-em` | "analyse GBI EM", "analyse Local EM", "GBI EM analysis" | Runs 17-country GBI-EM sovereign rates, ex-ante real rates, ToT-REER matrix, updates `gbi_em_data.json` and deploys `local_em.html`. |
| `analyse-cdx` | "analyse CDX", "analyse credit", "credit spreads" | Tracks CDX.NA.HY, iTraxx Xover, CDX.EM, Transatlantic basis, updates `credit_data.json` and deploys `cdx.html`. |
| `analyse-ust` | "analyse UST", "update UST", "UST curve analysis" | Scans US Treasury curve (2Y, 5Y, 10Y, 30Y), curve spreads, regime signals, updates `ust_curve_data.json` and deploys `ust.html`. |
| `process-notion-inbox` | "process notion inbox", "process inbox", "inbox dump" | Ingests raw dumps from Notion Inbox, updates website database, updates Notion company dossiers, prepends receipt, and cleans inbox. |
| `update-credit-model` | "update credit model", "update credit models", "update credit results" | Scans earnings, updates calculated Cash EBITDA & FCF waterfalls, rebuilds 85 Excel models via `scripts/build_all_institutional_models.py`, audits formulas via `scripts/audit_model_formulas.py`, and deploys. |
| `update-credit-news` | "update credit news", "credit news", "scan credit news" | Crawls company filings and macro transmission, generates credit desk commentary with clickable URLs, updates `credit_news.json`, and deploys. |

---

## 7. Key Files & Directory Layout

```
C:\Users\Reza Karim\cembicredit/
├── index.html                           # CEMBI Master Screener & Comp Sheet (85 issuers)
├── company.html                         # Detailed Issuer Financial Models & Consensus Dossiers
├── trends.html                          # Zero-AI Multi-Year Trend Analysis (Canvas / Chart.js)
├── notes.html                           # Qualitative Intelligence & Footnotes Search
│
├── local_em.html                        # GBI-EM Sovereign Rates & FX Desk (17 countries)
├── gbi_country.html                     # 17-Country Sovereign Deep-Dive Dossiers
├── cdx.html                             # Credit Derivatives & Synthetic Spreads Desk
├── ust.html                             # US Treasury Yield Curve & Macro Regime Desk
│
├── braskem_calculator.html              # Braskem Restructuring & Haircut Valuation Sandbox
├── braskem_background.html              # Braskem Asset Intelligence & EV Volatility
├── zoren_calculator.html                # Zorlu Enerji Refinancing & Creditor Waterfall Sandbox
├── zoren_background.html                # Zorlu Enerji Asset Intelligence & YEKDEM Models
├── aragvi_calculator.html               # Aragvi Holding Refinancing & SOTP Valuation Sandbox
├── aragvi_background.html               # Aragvi Asset Intelligence & Creditor Violence Notes
│
├── site-nav.js                          # Unified Navigation Sidebar for all Macro Desks & Calculators
├── site-scroll-init.js                  # Prevents anchor auto-scroll on page load
├── css/style.css                        # Institutional Dark Theme & Responsive Layout
│
├── database/
│   ├── issuers/*.json                   # 85 JSON master documents (P&L, Debt, Covenants, Recovery)
│   ├── credit_master.db                 # Compiled SQLite Database + FTS5 Search Tables
│   ├── annotations.json                 # Qualitative Footnotes Catalog
│   └── credit_news.json                 # Real-Time Credit & Macro News Feed
│
├── models/
│   ├── CEMBI_Master_Comp_Sheet.xlsx     # Master Multi-Issuer Comp Sheet
│   └── *.xlsx                           # 85 Standalone Dynamic Financial Models
│
├── scripts/
│   ├── build_database.py                # Compiles JSON issuers -> SQLite & js/issuers_data.js
│   ├── process_notion_inbox.py          # Notion Inbox Ingestion & Website Dual-Persistence
│   ├── update_notion_snapshot.py        # Nightly Meeting Views & Market Telemetry Updater
│   ├── run_nightly_snapshot.bat         # Batch runner for Notion nightly schedule
│   ├── update_credit_news.py            # Credit & Macro News Intelligence Synthesizer
│   ├── build_all_institutional_models.py # Compiles 85 Excel openpyxl models with cross-sheet links
│   ├── audit_model_formulas.py          # Verifies formula integrity (85/85 verification)
│   ├── enrich_calculated_ebitda_and_fcf_bridge.py # Enforces strict FCF waterfall
│   ├── enrich_next_earnings_and_news.py # Scans next earnings dates and webcast links
│   ├── query_cli.py                     # Sub-10ms terminal query CLI
│   └── record_snapshot.py               # Records daily immutable snapshot to SQLite
│
├── generate_gbi_em_data.py              # GBI-EM 17-Country Real Rates & ToT-REER Engine
├── generate_credit_data.py              # CDX Credit Derivatives Engine
├── generate_ust_data.py                 # US Treasury Curve Engine
└── trade_tracker.py                     # Multi-Desk Mark-to-Market Trade Tracker
```
