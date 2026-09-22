# CEMBI Credit & EM Macro Master Platform (`rkarim25/cembicredit`)

An institutional-grade credit database, dynamic multi-period financial models, interactive restructuring engines, and sovereign macro desks for **85 CEMBI CEEMEA/LatAm corporate & bank issuers** and **17 GBI-EM sovereign benchmark nations**.

Live Deployment on GitHub Pages: [https://rkarim25.github.io/cembicredit/](https://rkarim25.github.io/cembicredit/)

---

## 1. Platform Overview & Unified Desks

The platform brings together quantitative models, zero-AI sub-millisecond client execution, and qualitative intelligence into a single consolidated research portal:

### 🏢 Corporate Credit & Banking Platform
- **Master Screener & Comp Sheet (`index.html`)**: Sub-5ms screening across 85 issuers (66 Corporates, 19 Banks) filtered by Sector, Region, Country, Rating, Net Leverage, and Spread.
- **Company Dossiers (`company.html`)**: Multi-year historical P&L, balance sheet, cash flows, debt maturity waterfall, and broker consensus comparisons.
- **Zero-AI Trends (`trends.html`)**: Client-side Canvas/Chart.js multi-year credit spread and leverage trend engine.
- **Footnotes & Qualitative Vault (`notes.html`)**: Searchable database of analyst footnotes, cognitive adjustments, and accounting treatments.
- **Dynamic Excel Models (`models/*.xlsx`)**: 85 institutional workbooks with calculated cash EBITDA reconciliation, strict FCF waterfalls (`EBITDA - Capex - Cash Interest - ΔNWC - Tax = FCF`), and covenant compliance tables.

### 🔨 Restructuring & SOTP Valuation Sandbox Engines
- **Braskem (`braskem_calculator.html`)**: SOTP valuation across Brazil, USA/Europe, and Mexico (Braskem Idesa), Geological Alagoas provision liability netting, 5 reorg scenario presets, and interactive consolidated EBITDA sandbox.
- **Zorlu Enerji (`zoren_calculator.html`)**: SOTP across Geothermal (USD YEKDEM tariffs), Wind, Hydro, and ZES EV Charging; Creditor violence analysis evaluating Turkish state banks vs Eurobonds; Bull/Base/Bear scenarios.
- **Aragvi Holding (`aragvi_calculator.html`)**: Sunflower seed crushing, Black Sea grain terminals, and pre-export trade finance ring-fencing vs Eurobond haircut engine.

### 🌐 Emerging Markets Macro & Sovereign Desks
- **Local EM Desk (`local_em.html`, `gbi_country.html`)**: 17 benchmark nations of the J.P. Morgan GBI-EM index. Features explicit ex-ante real rates arithmetic (`Nominal Policy Rate − 12M Forward CPI = Ex-Ante Real Rate`), Terms of Trade (ToT) & 10Y REER decision matrix, and rates execution desk ($10,000 DV01 sizing).
- **Credit Derivatives Desk (`cdx.html`)**: CDX.NA.HY, iTraxx Europe Crossover, and CDX.EM synthetic spreads, 52-week percentiles, Transatlantic basis, and 12-month default rate forecasts.
- **US Treasury Yield Curve Desk (`ust.html`)**: 2Y, 5Y, 10Y, 30Y yields, curve spreads (2s10s, 5s30s, 2s30s, 10s30s), macro regime classification, and dual-band duration allocation.
- **Cross-Desk Trade Tracker (`macro_trade_tracker.json`)**: Live mark-to-market tracking of active trade recommendations across desks with entry, current level, target, stop loss, and real-time P&L in bps and USD.

---

## 2. Platform Architecture & Directory Structure

```
cembicredit/
├── index.html                           # Master Screener & Comp Sheet (85 issuers)
├── company.html                         # Detailed Issuer Financial Models & Consensus
├── trends.html                          # Zero-AI Multi-Year Trend Analysis (Canvas)
├── notes.html                           # Qualitative Footnotes & Annotations Search
│
├── local_em.html                        # GBI-EM Sovereign Rates & FX Desk (17 countries)
├── gbi_country.html                     # 17-Country Sovereign Deep-Dive Dossiers
├── cdx.html                             # Credit Derivatives & Synthetic Spreads Desk
├── ust.html                             # US Treasury Yield Curve & Macro Regime Desk
│
├── braskem_calculator.html              # Braskem Restructuring & Haircut Valuation Sandbox
├── braskem_background.html              # Braskem Asset Intelligence & EV Volatility
├── zoren_calculator.html                # Zorlu Enerji Refinancing & Recovery Sandbox
├── zoren_background.html                # Zorlu Enerji Asset Intelligence & YEKDEM Models
├── aragvi_calculator.html               # Aragvi Holding Refinancing & SOTP Valuation Sandbox
├── aragvi_background.html               # Aragvi Asset Intelligence & Creditor Violence Notes
│
├── site-nav.js                          # Unified Navigation Sidebar for Desks & Calculators
├── site-scroll-init.js                  # Prevents anchor auto-scroll on page load
├── css/style.css                        # Institutional Dark Theme & Responsive Layout
│
├── database/
│   ├── issuers/*.json                   # 85 JSON master documents (P&L, Debt, Covenants)
│   ├── credit_master.db                 # Compiled SQLite Database + FTS5 Search Tables
│   ├── annotations.json                 # Qualitative Footnotes Catalog
│   └── credit_news.json                 # Real-Time Credit & Macro News Feed
│
├── models/
│   ├── CEMBI_Master_Comp_Sheet.xlsx     # Master Multi-Issuer Comp Sheet (.xlsx)
│   └── *.xlsx                           # 85 Standalone Dynamic Openpyxl Models
│
├── scripts/
│   ├── build_database.py                # Compiles JSON issuers -> SQLite & js/issuers_data.js
│   ├── process_notion_inbox.py          # Notion Inbox Ingestion & Website Dual-Persistence
│   ├── update_notion_snapshot.py        # Nightly Meeting Views & Market Telemetry Updater
│   ├── run_nightly_snapshot.bat         # Batch runner for Notion nightly schedule
│   ├── update_credit_news.py            # Credit & Macro News Intelligence Synthesizer
│   ├── build_all_institutional_models.py # Compiles 85 Excel models with cross-sheet links
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

---

## 3. Notion Interactive Research Integration

Reza's daily research workflow is synchronized between Notion and the website:

1. **Plain Office Data Dump Inbox** (`3df1d0ad68c6813c9f07e7c847880346`):
   - Unstructured dump page where Reza drops raw notes, earnings bullets, or broker decks.
   - Run `python scripts/process_notion_inbox.py` to ingest.
   - The script updates the website database (`database/issuers/<id>.json`, `credit_news.json`, `credit_master.db`), prepends a receipt to the Processed Summaries page, and deletes the processed blocks from the Inbox.
2. **Processed Research Summaries & Receipts** (`3df1d0ad68c68181a4d1d916298dc1c7`):
   - Permanent audit log displaying the most recent research receipts first.
3. **Snapshot — Team Meeting Views** (`3df1d0ad68c681dbb3b4f6ca5ff72d24`):
   - Executive morning briefing: Recent project updates, macro/rates views, corporate credit convictions, and fresh daily market news.
   - Refreshed every night at 21:00 UK via automated schedule (`scripts/run_nightly_snapshot.bat`).

---

## 4. Autonomous Agent Skills

Six production skills are co-located in `.agents/skills/` (and globally in `~/.gemini/config/skills/`):

- **`/analyse-gbi-em`**: GBI-EM sovereign debt, ex-ante real rates, and ToT-REER matrix across 17 benchmark countries.
- **`/analyse-cdx`**: CDX.NA.HY, iTraxx Europe Crossover, and CDX.EM synthetic spreads and Transatlantic basis.
- **`/analyse-ust`**: US Treasury curve (2Y, 5Y, 10Y, 30Y), curve spreads, and macro regime classification.
- **`/process-notion-inbox`**: Ingestion of raw Notion dumps with website dual-persistence and inbox cleanup.
- **`/update-credit-model`**: Earnings scanning, calculated Cash EBITDA & FCF waterfall reconciliation, 85 Excel model compilation, and formula audit.
- **`/update-credit-news`**: Web crawling of filings and rating agency actions with explicit credit desk commentary.

---

## 5. Terminal CLI Engine (`scripts/query_cli.py`)

Execute sub-10ms queries directly from PowerShell without AI token overhead:

```powershell
# Screen issuers by sector and leverage
python scripts/query_cli.py screen --sector "Real Estate" --max-leverage 2.5

# Screen issuers by rating and minimum spread
python scripts/query_cli.py screen --min-spread 400 --rating "BB"

# Search qualitative notes and cognitive adjustments
python scripts/query_cli.py notes --query "escrow"

# Generate complete issuer dossier
python scripts/query_cli.py summary --ticker BINGHA
```
