---
name: update-credit-model
description: Autonomous CEEMEA and CEMBI corporate credit model updating workflow. Checks all 85 issuers for latest quarterly/annual financial results, earnings releases, investor presentations, and regulatory filings. Updates revenue, calculated cash EBITDA, reported EBITDA reconciliation bridge, and strict Free Cash Flow (FCF) waterfall (EBITDA - Capex - Cash Interest - ΔNWC - Tax = FCF). Regenerates all 85 institutional Excel workbooks, runs strict formula audits, and deploys live to GitHub Pages. Use when the user says "update credit model", "update credit models", "update credit results", or invokes /update-credit-model.
---

# Update Credit Model — Autonomous Institutional Credit Model Refresh Skill

This skill provides an autonomous execution protocol for monitoring financial filings, updating financial models across all 85 CEMBI CEEMEA/LatAm issuers, computing standardized Cash EBITDA and Free Cash Flow waterfalls, re-building institutional `.xlsx` workbooks, and deploying the verified updates to GitHub Pages.

---

## 0. Non-Negotiables & Rules
1. **Reza's time is the scarce resource**: Never make him read a long report — present about ten lines with clear credit conclusions, then the question.
2. **EBITDA must always be calculated**: Standardized Desk EBITDA is strictly calculated as Gross Profit - SG&A Expenses (or Operating Revenue - Cash Costs).
3. **Reported vs. Calculated Reconciliation**: Always maintain both Company Reported Headline EBITDA and Calculated Cash EBITDA. Explicit commentary must be provided detailing any non-operating addbacks, hyperinflation (IAS 29) adjustments, or donor grants.
4. **Free Cash Flow Identity**: Free Cash Flow must strictly follow the institutional formula:
   EBITDA - Capex - Cash Interest - Change in Working Capital - Tax = FCF
5. **Zero Invented Numbers**: Every metric must be grounded in audited IFRS financial statements, regulatory stock exchange filings (BIST, ADX, DFM, LSE, WSE, JSE), or official investor decks.
6. **Strict Verification**: Every model must pass `audit_model_formulas.py` (85/85 verified, 0 errors) before deploying.

---

## 1. Execution Protocol

### Step 1: Scan & Ingest Latest Earnings Disclosures
Run the earnings scanner across all 85 issuer repositories in `database/issuers/*.json`:
```powershell
python "C:\Users\Reza Karim\cembicredit\scripts\enrich_next_earnings_and_news.py"
```
Check for:
- Published quarterly/annual earnings decks and interim press releases.
- Guidance revisions (Capex ceilings, EBITDA targets, Net Leverage targets).
- Next scheduled earnings release dates, reporting periods, and investor call webcast links.

### Step 2: Compute EBITDA & Free Cash Flow Waterfall
Execute the credit desk calculation and reconciliation engine:
```powershell
python "C:\Users\Reza Karim\cembicredit\scripts\enrich_calculated_ebitda_and_fcf_bridge.py"
```
This ensures:
1. `calculated_ebitda` is computed.
2. `reported_ebitda` variance and explanatory notes are assigned.
3. `fcf = ebitda - capex - cash_interest - change_in_working_capital - tax` is strictly balanced down to the cent.

### Step 3: Regenerate All 85 Institutional Openpyxl Workbooks
Compile all 85 corporate and banking models with dynamic cross-sheet links:
```powershell
python "C:\Users\Reza Karim\cembicredit\scripts\build_all_institutional_models.py"
```
Verifies that:
- Tab 1 contains Calculated vs Reported EBITDA and dual Net Leverage.
- Tab 3 (P&L) includes Section VI & VII EBITDA Reconciliation & Footnotes.
- Tab 5 (Cash Flow Statement) includes Section IV: FCF Waterfall Bridge (`col29 - col30 - col31 - col32 - col33 = FCF`).
- Tab 6 / Tab 5 includes tranche-by-tranche debt breakdown, RCF schedules, and bond covenants.
- Tab 9 / Tab 7 includes Management Guidance and Next Scheduled Earnings Release.
- Recompiles `database/credit_master.db` and `js/issuers_data.js`.

### Step 4: Execute Formula & Link Integrity Audit
Run the automated formula checker across all generated workbooks:
```powershell
python "C:\Users\Reza Karim\cembicredit\scripts\audit_model_formulas.py"
```
**Gate Check**: Must confirm `Strict Verification Passed: 85, Failed Audits: 0`.

### Step 5: Record Immutable Snapshot & Cumulative History
Persist market pricing, ratings, debt tranches, and multi-year financials to SQLite history tables and immutable daily archive:
```powershell
python scripts/record_snapshot.py --source="Autonomous Model Update" --notes="Updated financials, EBITDA reconciliation, and FCF waterfalls across all 85 issuers."
```

### Step 6: Commit & Deploy to GitHub Pages
```powershell
cd "C:\Users\Reza Karim\cembicredit"
git add .
git commit -m "Update institutional credit models, EBITDA reconciliation, and FCF waterfalls [Automated]"
git push origin main
```


---

## 2. Interactive Output Format
Deliver a concise executive update (~10 lines) stating:
1. Total companies scanned and updated.
2. Key earnings surprises or operational updates (e.g., EBITDA revisions, capex adjustments).
3. Summary of FCF generation and leverage trajectory.
4. Next key earnings catalysts on the radar.
5. Direct link to live platform: `https://rkarim25.github.io/cembicredit/`
