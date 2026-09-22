---
name: update-credit-news
description: Autonomous CEMBI and CEEMEA credit news intelligence workflow. Searches multi-source corporate filings, bond tenders, rating agency actions (Moody's, S&P, Fitch), and macro/sovereign transmission channels (central bank interest rates, oil/gas commodities, FX devaluations). Constructs structured news database with direct clickable URLs, assigns credit impact ratings (Positive, Neutral, Negative, Watch), and produces explicit credit desk commentary detailing spread trajectory, liquidity, leverage headroom, and refinancing risks. Use when the user says "update credit news", "credit news", "scan credit news", or invokes /update-credit-news.
---

# Update Credit News — Autonomous CEMBI Credit & Macro News Skill

This skill provides an autonomous execution protocol for continuously scanning corporate credit developments, regulatory filings, rating agency rating actions, bond capital market events, and macro transmission channels across the CEMBI universe. It builds a structured database with direct clickable URLs, evaluates the credit implications of every development, and refreshes the live research vault on GitHub Pages.

---

## 0. Non-Negotiables & Rules
1. **Reza's time is the scarce resource**: Never make him read a long report — present about ten lines with the highest-impact credit headlines and spread implications, then the question.
2. **Every news item must have credit desk commentary**: Merely quoting a headline is unacceptable. Every item must detail:
   - Impact on credit spread trajectory (tightening vs. widening pressure).
   - Impact on liquidity, covenant headroom, or FCF generation.
   - For macro news: the sovereign-to-corporate transmission channel.
3. **Clickable Links Mandatory**: Every entry must provide a verified, clickable URL to the primary disclosure, regulatory filing, or financial press report.
4. **Structured Database Persistence**: All news must be persisted in both `database/credit_news.json` and SQLite table `credit_news` in `credit_master.db`.
5. **Web and Drawer Sync**: News items must be immediately filterable on the web platform (`index.html`) and routed into the relevant issuer's profile drawer.

---

## 1. Execution Protocol

### Step 1: Run Credit News Intelligence Engine
Execute the multi-source crawler and credit desk commentary synthesizer:
```powershell
python "C:\Users\Reza Karim\cembicredit\scripts\update_credit_news.py"
```
The engine monitors:
- **Corporate Credit Catalysts**:
  - Bond tender offers, exchange offers, and new Eurobond / Sukuk pricing.
  - Earnings beats / misses, operational volume reports, and tariff indexation.
  - Rating actions from Moody's, S&P, and Fitch (upgrades, downgrades, outlook changes).
  - Mergers, asset sales, and capex budget revisions.
- **Macro & Sovereign Transmission Channels**:
  - Central bank benchmark rate decisions (CBRT, SARB, Fed, ECB).
  - Energy & commodity price swings (Brent crude, European natural gas, metals).
  - Local currency volatility (TRY, NGN, ZAR, EGP) and foreign currency rationing.
  - Geopolitical corridors and multilateral emergency facilities (World Bank, EBRD, IMF).

### Step 2: Credit Desk Transmission Synthesis
For each development, the engine classifies:
- `category`: `Company Specific` | `Rating Action` | `Capital Markets` | `Macro / Sovereign Transmission`
- `credit_impact`: `Positive` (emerald) | `Neutral` (slate) | `Negative` (ruby) | `Watch` (amber)
- `credit_commentary`: Institutional credit thesis evaluating the specific transmission channel to debt holders.

### Step 3: Export & Compile Web Bundle
1. Persists records to `database/credit_news.json`.
2. Inserts into SQLite table `credit_news` in `database/credit_master.db`.
3. Writes `js/news_data.js` for instant frontend rendering.
4. If news contains rating actions (upgrades, downgrades, outlook changes), records entries into SQLite `historical_rating_actions`.
5. Takes immutable snapshot of updated spreads and catalysts:
```powershell
python scripts/record_snapshot.py --source="Credit & Macro News Update" --notes="Updated news transmission and rating actions."
```

### Step 4: Commit & Deploy to GitHub Pages
```powershell
cd "C:\Users\Reza Karim\cembicredit"
git add database/credit_news.json database/credit_master.db js/news_data.js
git commit -m "Update credit and macro news database with clickable links and credit commentary [Automated]"
git push origin main
```


---

## 2. Interactive Output Format
Deliver a concise executive briefing (~10 lines):
1. Number of fresh credit events ingested.
2. Top positive credit catalysts (e.g. debt buybacks, tariff approvals, rating upgrades).
3. Key credit stress / watch items (e.g. FX pressure, refinancing friction).
4. Sovereign macro transmission summary.
5. Direct link to live platform: `https://rkarim25.github.io/cembicredit/`
