# Antigravity Workspace Guidelines & Context — CEMBI Credit Platform

This document establishes the durable facts, architecture, and non-negotiables for the CEMBI Credit Master Platform (karim25/cembicredit).

---

## 1. Core Mandate & Non-Negotiables

- **Default Dual-Persistence Rule:** Any data, earnings numbers, notes, broker reports, or models posted on companies MUST be stored on the website (cembicredit) by default as an integral part of processing any Notion inbox dump or research intake. Processing a note into Notion alone without saving to the website is STRICTLY PROHIBITED.
- **Components to Update on Every Company Research Ingest:**
  1. database/issuers/<issuer_id>.json: Master document containing metadata, financials, capital structure, debt maturities, recovery analysis, broker models, and annotations.
  2. database/credit_news.json: Live credit news intelligence feed.
  3. Rebuild with python scripts/build_database.py: Compiles database/credit_master.db, database/annotations.json, and js/issuers_data.js.
  4. Git Commit & Push: Push immediately to origin/main so that updates appear live on https://rkarim25.github.io/cembicredit/.

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
