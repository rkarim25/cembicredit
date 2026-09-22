# CEMBI Credit & EM Macro Platform — System Architecture & Data Blueprint

This document provides a comprehensive technical reference for any AI agent or software engineer extending or maintaining the CEMBI Credit Master Platform and EM Macro desks.

---

## 1. System Overview & Technology Stack

The platform is designed around **zero-AI client execution**, **deterministic financial arithmetic**, and **dual-persistence**:
- **Hosting**: Static site on GitHub Pages (`rkarim25/cembicredit`), completely serverless, zero build step.
- **Frontend**: Vanilla JavaScript (ES6+), semantic HTML5, CSS custom properties (variables), Chart.js (v4.4.1), and Canvas.
- **Backend / Scripts**: Python 3.10+ (`openpyxl`, `sqlite3`, `requests`, `pandas`, `yfinance`).
- **Data Layers**:
  1. JSON Master Documents (`database/issuers/*.json`): Canonical document store for each of the 85 issuers.
  2. Compiled SQLite Database (`database/credit_master.db`): Relational storage with FTS5 virtual tables for qualitative footnote and full-text search.
  3. Client Data Bundles (`js/issuers_data.js`, `js/news_data.js`, `gbi_em_data.json`, `credit_data.json`, `ust_curve_data.json`): Pre-compiled JSON/JS objects enabling sub-5ms client rendering without server APIs.
  4. Excel Vault (`models/*.xlsx`): 85 dynamic institutional models built via `openpyxl`.
  5. Notion Integration (`notion_dossier_helper.py`, `process_notion_inbox.py`): Two-way synchronization with Reza's Notion workspace.

---

## 2. Core Data Contracts

### A. Issuer Document Schema (`database/issuers/<issuer_id>.json`)
Each issuer file follows a strict schema:
```json
{
  "ticker": "BINGHA",
  "issuer_id": "binghatti",
  "company_name": "Binghatti Holding Ltd",
  "country": "United Arab Emirates",
  "sector": "Real Estate",
  "subsector": "Residential Development",
  "region": "GCC / Middle East",
  "composite_rating": "BB",
  "ratings": {
    "moodys": "Ba3 (Stable)",
    "sp": "BB- (Positive)",
    "fitch": "BB (Stable)"
  },
  "market_data": {
    "benchmark_bond": "BINGHA 8.375% 2027",
    "benchmark_yield": 7.45,
    "benchmark_spread_bps": 340,
    "currency": "USD"
  },
  "financials_multi_year": {
    "periods": ["2021A", "2022A", "2023A", "2024A", "2025E", "2026E", "2027E"],
    "revenue": [120.5, 340.2, 850.4, 1420.0, 1850.0, 2100.0, 2300.0],
    "reported_ebitda": [45.2, 110.5, 290.1, 460.0, 580.0, 640.0, 710.0],
    "calculated_ebitda": [42.1, 105.0, 280.4, 445.0, 560.0, 620.0, 690.0],
    "ebitda_reconciliation_notes": "Excludes fair value property revaluations and unearned escrow profits.",
    "capex": [15.0, 45.0, 110.0, 180.0, 210.0, 230.0, 240.0],
    "cash_interest": [8.5, 22.0, 48.0, 75.0, 85.0, 90.0, 92.0],
    "change_in_nwc": [-5.0, 12.0, 35.0, 60.0, 50.0, 40.0, 30.0],
    "tax": [0.0, 0.0, 0.0, 25.0, 35.0, 42.0, 45.0],
    "fcf": [18.6, 26.0, 87.4, 105.0, 180.0, 218.0, 283.0],
    "net_debt": [150.0, 280.0, 490.0, 680.0, 620.0, 510.0, 380.0],
    "net_leverage_calculated": [3.56, 2.67, 1.75, 1.53, 1.11, 0.82, 0.55]
  },
  "capital_structure": {
    "cash_and_equivalents": 340.0,
    "escrow_restricted_cash": 420.0,
    "debt_tranches": [
      { "facility": "RCF / Trade Lines", "currency": "AED", "amount_usd": 120.0, "maturity": "2025", "coupon": "EIBOR + 2.5%" },
      { "facility": "Senior Sukuk 2027", "currency": "USD", "amount_usd": 500.0, "maturity": "2027", "coupon": "8.375%" }
    ]
  },
  "management_guidance_tracker": [
    {
      "guidance_metric": "FY26 Total Capex Program",
      "previous_target": "$250.0M",
      "management_target": "$210.0M",
      "revision_status": "REVISED_DOWN",
      "revision_highlight": "Tightened land acquisition budget preserves free cash flow.",
      "tracking_status": "On Track",
      "forecasting_impact": "Binds 2026E capex in financial model to $210M."
    }
  ],
  "qualitative_footnotes": [
    {
      "source": "Cognitive Credit",
      "category": "Accounting / RERA Escrow",
      "note": "RERA Escrow regulations require 100% of construction costs to be segregated before surplus can be distributed."
    }
  ]
}
```

### B. Free Cash Flow Standard Identity
To ensure absolute mathematical consistency across the entire 85-issuer platform, the strict Free Cash Flow waterfall is enforced by `enrich_calculated_ebitda_and_fcf_bridge.py`:
$$\text{FCF} = \text{Calculated Cash EBITDA} - \text{Capex} - \text{Cash Interest} - \Delta\text{NWC} - \text{Tax}$$

---

## 3. Restructuring Valuation Mathematics

The interactive recovery engines (`braskem_calculator.html`, `zoren_calculator.html`, `aragvi_calculator.html`) utilize a multi-tier capital structure priority waterfall:

### A. Sum-of-the-Parts (SOTP) Enterprise Value (EV)
$$\text{Total EV} = \sum_{i=1}^{n} \left( \text{Segment EBITDA}_i \times \text{Segment Multiple}_i \right) + \sum \text{Stand-Alone Asset Values}$$

### B. Structural Deductions & Ring-Fenced Liabilities
$$\text{Distributable Enterprise Value (DEV)} = \text{Total EV} - \text{Ring-Fenced Trade Debt} - \text{Litigation / Geological Provisions} - \text{Priority Tax / Employee Claims}$$

### C. Priority Debt Recovery Waterfall
For tranches ordered by seniority $k = 1, \dots, m$:
$$\text{Claim}_k = \text{Principal}_k + \text{Accrued Interest}_k$$
$$\text{Recovery Amount}_k = \min\left( \text{Claim}_k, \max\left(0, \text{DEV} - \sum_{j < k} \text{Claim}_j \right) \right)$$
$$\text{Recovery Percentage}_k = \frac{\text{Recovery Amount}_k}{\text{Claim}_k} \times 100\%$$

### D. Consolidated Top-Down Sandbox Calculation
When the user adjusts the Consolidated EBITDA slider:
$$\text{Synthetic EV} = \text{Input EBITDA} \times \text{Blended Segment Multiple}$$
The engine flows this Synthetic EV through the waterfall in real time (<1ms) to recalculate recovery percentages for all bonds.

---

## 4. GBI-EM Quantitative Models

### A. Ex-Ante Real Rates Arithmetic
Rather than relying on backward-looking trailing inflation (which distorts monetary stance during disinflation), every sovereign constituent is evaluated using forward expectations:
$$\text{Ex-Ante Real Policy Rate} = \text{Nominal Policy Rate} - \text{12M Forward CPI Expectation}$$
Sources: Focus Survey (BCB Brazil), Banxico Survey (Mexico), BER Survey (SARB South Africa), RBI Survey (India), BI Consensus (Indonesia).

### B. Terms of Trade (ToT) & 10Y REER Decision Matrix
Positions countries across five strategic quadrants based on 10Y Real Effective Exchange Rate (REER) deviation and Terms of Trade commodity momentum:
- **Quadrant 1 (Double Alpha)**: Cheap REER + Positive ToT $\rightarrow$ Unhedged Long Rates + Long FX.
- **Quadrant 2 (High Carry Belly Rates)**: Cheap/Fair REER + Neutral ToT $\rightarrow$ Belly 5Y Rates (Unhedged or NDF Hedged).
- **Quadrant 3 (FX-Hedged Rates Duration)**: Rich REER + Weak ToT $\rightarrow$ Strictly FX-Hedged Duration or Curve Flatteners.
- **Quadrant 4 (Capital Inflow / Peg Proxy)**: High FX Reserves + Tight FX Band $\rightarrow$ Unhedged front/belly rates.
- **Quadrant 5 (High-Yield Carry Roll / Underweight)**: Macro Imbalance / High Inflation $\rightarrow$ Short-dated T-Bills carry roll only.

### C. Rates Execution Desk Directives
Each sovereign profile specifies:
- Trader Action: `Receive Fixed`, `Pay Fixed`, `Curve Flattener`, `Carry Roll`.
- Instruments: Local OIS/IRS (DI, TIIE, Camara, IBR, WIBOR, PRIBOR) vs Benchmark Cash Bonds.
- Standard Clips & Risk Sizing: Standard market clips (e.g. BRL 50M, MXN 100M, ZAR 50M) normalized to **$10,000 DV01 standard**.

---

## 5. Notion Integration Pipeline

### Architecture:
```
[Reza drops notes in Plain Notion Inbox]
                │
                ▼
[scripts/process_notion_inbox.py]
  ├── Reads blocks via Notion REST API
  ├── Parses financials, guidance, ratings, and catalysts
  ├── Updates database/issuers/<id>.json & credit_news.json
  ├── Executes scripts/build_database.py (compiles SQLite & JS)
  ├── Prepends receipt to "Processed Research Summaries & Receipts"
  ├── Cleans processed blocks from Plain Inbox page
  └── Git commits and pushes to cembicredit
```

### Nightly Scheduled Telemetry:
A scheduled task runs `scripts/run_nightly_snapshot.bat` daily at 21:00 UK. It runs `scripts/update_notion_snapshot.py`, crawling recent project progress, sovereign real rates, credit spreads, and market news, directly updating the Notion Snapshot page for morning team meetings.
