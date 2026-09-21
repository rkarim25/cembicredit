# Antigravity Workspace Guidelines & Context — CEMBI Credit Platform

This document establishes the durable facts, architecture, and non-negotiables for the CEMBI Credit Master Platform (karim25/cembicredit).

---

## 1. Core Mandates & Non-Negotiables

### A. Default Dual-Persistence Rule
- Any data, earnings numbers, notes, broker reports, or models posted on companies **must** be stored on the website (cembicredit) by default as an integral part of processing any Notion inbox dump or research intake. Processing a note into Notion alone without persisting to the website is STRICTLY PROHIBITED.
- **Components to Update on Every Company Research Ingest:**
  1. database/issuers/<issuer_id>.json: Master document containing metadata, financials, capital structure, debt maturities, recovery analysis, broker models, and annotations.
  2. database/credit_news.json: Live credit news intelligence feed.
  3. Rebuild with python scripts/build_database.py: Compiles database/credit_master.db, database/annotations.json, and js/issuers_data.js.
  4. Git Commit & Push: Push immediately to origin/main so that updates appear live on https://rkarim25.github.io/cembicredit/.

### B. Multi-Source Conflict & Data Lineage Rule
- **1. Reported Hard Facts (Canonical P&L / Balance Sheet):**
  - Items like **Revenue, Net Sales, Balance Sheet Cash, Total Gross Debt, Audited Net Income**.
  - These are company-reported historical facts. Multiple broker sources collaborate/quote them, but they **must not change the canonical reported number**.
  - If two sources contradict each other on a reported historical fact (e.g. restatements, currency translation variance, unadjusted vs IAS 29 hyperinflation), **never guess or silently overwrite**: prompt Reza with the variance and let him choose the canonical figure.
- **2. Calculated / Model-Derived Metrics (Methodology-Dependent):**
  - Items like **Calculated vs Adjusted EBITDA, Free Cash Flow (FCF) definitions, Net Leverage, Interest Coverage, and Forward Projections (e.g. 2025E/2026E)**.
  - It is expected and acceptable for different brokers (e.g. J.P. Morgan vs Citi vs Cognitive Credit vs Desk Model) to have differing numbers due to methodology, add-backs, lease treatment, or forecast assumptions.
  - For these metrics:
    - Always preserve and attribute the specific data source (e.g. J.P. Morgan, Cognitive Credit, Company Reported, Desk Strict Cash).
    - Store them in roker_snapshots and side-by-side consensus tables rather than overwriting desk models.
    - If ambiguous, ask Reza which source or definition he wants the primary view to anchor to.

---

## 2. Platform Architecture

| Property | Value | Purpose |
|---|---|---|
| **Live URL** | https://rkarim25.github.io/cembicredit/ | Static site on GitHub Pages, vanilla JS, zero build step. |
| **Local Path** | C:\Users\Reza Karim\cembicredit | Local repository clone. |
| **Master Issuers** | database/issuers/*.json | Individual JSON file per covered corporate/bank credit. |
| **Compiled DB** | database/credit_master.db | Local SQLite database with FTS5 search index. |
| **Web Data Bundle** | js/issuers_data.js | Exports MASTER_ISSUERS, MASTER_ANNOTATIONS, window.CEMBI_DATA. |
| **Notion Work Integration** | Notion Token: NOTION_TOKEN_WORK | Notion Research Repository (3df1d0ad68c6815eb5c2cffb3b540b1b), Inbox (3df1d0ad68c6813c9f07e7c847880346). |
