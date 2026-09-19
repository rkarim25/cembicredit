# CEMBI Credit Master Platform (`rkarim25/cembicredit`)

A dedicated, institutional-grade credit database, dynamic multi-period financial models, and zero-AI analytical suite for **52 CEMBI CEEMEA corporate and banking credit issuers**.

Hosted live on GitHub Pages: [https://rkarim25.github.io/cembicredit/](https://rkarim25.github.io/cembicredit/)

---

## 1. Core Platform Architecture

The repository is organized into a modular, future-proof document-relational structure:

```
cembicredit/
├── database/
│   ├── issuers/                       # 52 comprehensive JSON master documents
│   │   ├── binghatti.json             # P&L, RERA escrow balances, presales, recovery
│   │   ├── akbank.json                # Banking NII, NIM, NPL, CAR, Sabancı support
│   │   └── ... (52 issuers)
│   ├── credit_master.db               # Compiled local SQLite database + FTS5 full-text index
│   └── annotations.json               # 156+ qualitative footnotes catalog
│
├── models/                            # Excel Vault (52 standalone workbooks + master comp sheet)
│   ├── Binghatti_Credit_Model.xlsx    # 7-year model + native cell comments + 2027 payback tab
│   ├── CEMBI_Master_Comp_Sheet.xlsx   # Dynamic Excel comp sheet with drop-down filtering
│   └── ... (52 standalone .xlsx models)
│
├── index.html                         # Master Comp Sheet & Screener (0ms latency, zero-AI)
├── trends.html                        # Real-Time Multi-Year Trend Charting (Chart.js / Canvas)
├── notes.html                         # Full-Text Qualitative Intelligence & Footnotes Search
├── css/style.css                      # Institutional dark-mode hedge-fund theme
├── js/app.js                          # Client-side deterministic filter and query engine
│
├── scripts/
│   ├── build_database.py              # Compiles JSON issuers into SQLite & web bundles
│   ├── query_cli.py                   # Sub-10ms terminal query CLI
│   ├── ingest_source.py               # Drop-folder processor for Cognitive Credit / broker files
│   └── sync_notion.py                 # Two-way sync engine for Notion Research Database
│
└── inbox/                             # Drop folder for Cognitive Credit & broker files
```

---

## 2. Terminal CLI Query Engine (`scripts/query_cli.py`)

Execute sub-10ms queries directly from PowerShell or bash without waiting for AI tokens or network latency:

### Screen Issuers:
```powershell
python scripts/query_cli.py screen --sector "Real Estate" --max-leverage 2.5
python scripts/query_cli.py screen --min-spread 400 --rating "BB"
```

### Plot Multi-Year Trends:
```powershell
python scripts/query_cli.py trend --ticker BINGHA --metric net_leverage
python scripts/query_cli.py trend --ticker AKBNK --metric nim_pct
```

### Full-Text Qualitative Notes Search:
```powershell
python scripts/query_cli.py notes --query "escrow"
python scripts/query_cli.py notes --query "YEKDEM"
```

### Detailed Issuer Dossier:
```powershell
python scripts/query_cli.py summary --ticker BINGHA
```

---

## 3. Cognitive Credit & Broker File Ingestion

To update models and qualitative footnotes from Cognitive Credit or sell-side brokers:
1. Export the company model or tear sheet as `.xlsx` or `.csv` from Cognitive Credit.
2. Drop the file into `cembicredit/inbox/` (e.g. `cembicredit/inbox/binghatti_cognitive_credit.xlsx`).
3. Run the ingestion processor:
   ```powershell
   python scripts/ingest_source.py
   ```
4. The script automatically extracts financial line items, cell comments, and adjustments, updates `database/issuers/<id>.json`, recompiles `credit_master.db`, and updates the web assets.

---

## 4. Two-Way Notion Synchronization

To synchronize ratings, benchmark bonds, prices, and direct model download blocks with Notion:
```powershell
python scripts/sync_notion.py
```
