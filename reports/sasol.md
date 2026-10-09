---
topic: Sasol
slug: sasol
updated: 09-Oct-26
run: 2026-10-09_0915_sasol
status: Draft
open_items: 8
---

# Sasol

_Updated 09-Oct-26 · run 2026-10-09_0915_sasol_

## Open items
1. [BBG: SOLSJ Corp / RATC] Latest Moody's, S&P and Fitch ratings and outlooks, and the date of the last action. The Sasol investor page showed S&P BB+ negative (Oct-25) and Moody's Ba1 negative (May-25), and no 2026 action was found.
2. [BBG: SOLSJ 7.85% 2029 / YAS yield and Z-spread] Current price and spread. The repo holds 98.4 and 365bp as of 19-Sep-26, which is stored data and not a live level.
3. [BBG: SOLSJ Corp / DES, bond ladder] USD and ZAR maturity profile for FY27–FY30, revolving credit facility size and covenants, and the full list of outstanding bonds.
4. [REZA] Any Bloomberg or broker text on agency reaction to the FY26 results, the Secunda impairment amount, or Mozambique gas capex plans?
5. [MANAGEMENT] FY27 free cash flow outlook at the Brent and rand assumptions, and how much of the FY26 working-capital build reverses.
6. [MANAGEMENT] Expected duration of the Natref outage and the earnings effect if Prax's capacity is withdrawn.
7. [MANAGEMENT] Secunda impairment amount, remediation timeline and audit implications of the disclosed control weaknesses.
8. [MANAGEMENT] Lease-inclusive net debt and the reconciliation of reported net debt (ex-leases) to a cash EBITDA and USD FCF bridge.

## View
- Fundamentals improved in FY26 (year to 30-Jun-26). Adjusted EBITDA was R60.7bn (+17%), and net debt ex-leases was US$3.3bn (-11%), inside the <US$3.7bn target.
- Net debt remains above the US$3bn policy level, so no final dividend was paid. That keeps creditors ahead of equity.
- Free cash flow is thin: R11.9bn (-5%) after a working-capital build. Further deleveraging depends on Brent, refining margins and working-capital reversal.
- Agency outlooks on record are negative (S&P BB+, Oct-25; Moody's Ba1, May-25). Both predate the FY26 results, so a stabilisation is more likely than a downgrade if Brent holds. This is a judgement, not an observed agency action.
- Biggest risk: the oil and chemicals cycle, with Natref disruption, weak gas (EBIT -60%) and the Secunda impairment and control weaknesses as secondary risks.
- The repo issuer record is not filing-based and must not be used until rebuilt.
- Confidence: Medium. The numbers come from press summaries of the results, and I did not read the primary booklet or the 20-F. There is no bond pricing.

## What changed
First version.

## Analysis
### FY26 results and leverage
- Adjusted EBITDA was R60.7bn, up 17% (BusinessDay, 01-Sep-26, Medium).
- Net debt ex-leases was US$3.3bn, down 11%, against the <US$3.7bn target. Total debt was US$5.7bn, liquidity about US$5bn, and operating cash flow R56.7bn (+22%) (Pulse2, 03-Sep-26, Medium).
- No final dividend, because net debt is above the US$3bn policy level (BusinessDay, 01-Sep-26, Medium).
- Leverage ratios cannot be computed from the sources. Lease-inclusive net debt and USD EBITDA are unavailable, so I state none.

### Cash flow
- Free cash flow was R11.9bn, down 5%, on year-end working capital up 26% ex the prior-year Transnet settlement. Capex was R21bn, down 18% (Pulse2, 03-Sep-26, Medium).
- Capex cuts and working-capital releases carry much of the deleveraging. A capex step-up (Mozambique, renewables) would reverse it.
- Reconciliation to the house identity (EBITDA − capex − cash interest − ΔNWC − tax) is not possible from press data.

### Operations
- Secunda output was at a five-year high after the destoning plant (Dec-25). Natref was up 76%, helped by Prax capacity while Prax is in business rescue. Gas EBIT fell 60% to R1.2bn (BusinessDay, 01-Sep-26, Medium).
- Natref had an unplanned unit shutdown coinciding with maintenance from mid-Aug-26 (Rigzone, 01-Sep-26, Medium).
- FY27 guidance: fuel sales 5–10% above FY25, gas production up to 5% lower (Sunday World, undated, Low-Medium).
- Part of the gain depends on Prax's rescue status and a higher Brent (+7%) and refining margins, so it is not fully durable.

### Ratings and sovereign
- Sasol investor centre page, read 09-Oct-26: S&P BB+ negative (Oct-25), Moody's Ba1 negative (May-25) (Sasol, Medium; the page may lag).
- Moody's saw leverage near 3x in 2025-26 and an EBITDA margin around 20% (BusinessDay, 01-Jun-25, Medium). Reported FY26 net debt is below that path, but Moody's metric basis is unknown.
- South Africa: S&P BB positive (Nov-25), Moody's Ba2 positive (May-26) (Sasol investor page, Medium-High). The positive sovereign trend supports the ceiling.
- No Fitch rating found.

### Governance and asset quality
- The Secunda impairment is mainly linked to a stronger forecast rand. Management disclosed weaknesses in risk assessment, revenue recognition and asset valuation, with remediation under way (BusinessDay, 01-Sep-26, Low-Medium). The amount, audit opinion and 20-F detail are unread.

### Repo record
- `database/issuers/sasol.json` should not be used (High, internal inconsistency):
  - Every year shows an EBITDA reconciliation variance of exactly 1.5%.
  - The observations are boilerplate and contradict the numbers; for example, "net leverage well below targets" appears beside negative 2024A FCF.
  - 2024A net leverage is 2.37x in the table and 2.04x in the metadata.
  - Net debt of US$5.8bn in 2024A differs from the reported US$3.3bn basis.
- Action: a model must be built from the Sasol 20-F and annual integrated report (SEC EDGAR, sasol.com), as no Cognitive Credit model exists.

### Searches with no result
- No 2026 Moody's or S&P action on Sasol.
- No bond issuance or buyback news for Sep–Oct-26.
- No Fitch rating.
- The primary SENS page for the S&P Oct-25 action returned 404.

## Where the models disagreed
No material disagreement is recorded. The only position supplied (Claude) was adopted. I did not re-run independent searches, so every FY26 figure remains tier 3 press relaying a tier 2 release.

## Management questions
1. What is the FY27 free cash flow outlook at your Brent and rand assumptions, and how much of the FY26 working-capital build reverses?
2. What is the expected duration of the Natref outage, and the earnings effect if Prax's capacity is withdrawn?
3. What is the Secunda impairment amount, and what are the remediation timeline and audit implications of the disclosed control weaknesses?
4. What is the path and timing to net debt below US$3bn, and what is the dividend and capex sequencing against it?
5. What is the maturity ladder and refinancing plan for FY27–FY30, and the status of the revolving credit facility?
6. Have you had discussions with the agencies since the FY26 results on the negative outlooks?

## Knowledge base updates
- [Financials] FY26 (year to 30-Jun-26) adjusted EBITDA R60.7bn, +17% (BusinessDay, 01-Sep-26)
- [Financials] Net debt ex-leases US$3.3bn at 30-Jun-26, down 11%, versus <US$3.7bn target; total debt US$5.7bn; liquidity about US$5bn (Pulse2, 03-Sep-26)
- [Financials] FY26 operating cash flow R56.7bn (+22%), free cash flow R11.9bn (-5%), capex R21bn (-18%) (Pulse2, 03-Sep-26)
- [Capital] Dividend policy threshold: net debt below US$3bn; no final FY26 dividend paid (BusinessDay, 01-Sep-26)
- [Snapshot] S&P BB+ negative (Oct-25); Moody's Ba1 negative (May-25) (Sasol investor centre credit rating page, read 09-Oct-26)
- [Snapshot] South Africa sovereign: S&P BB positive (Nov-25), Moody's Ba2 positive (May-26) (Sasol investor centre credit rating page, read 09-Oct-26)
- [Business] Natref FY26 earnings up 76%, helped by Prax capacity during Prax's business rescue; gas EBIT -60% to R1.2bn (BusinessDay, 01-Sep-26)
- [Business] Unplanned unit shutdown at Natref coinciding with maintenance from mid-Aug-26 (Rigzone, 01-Sep-26)
- [Management] Fuel sales guided 5–10% above FY25; gas production guided up to 5% lower (Sunday World, undated)
- [Governance] FY26 disclosure of control weaknesses in risk assessment, revenue recognition and asset valuation; Secunda impairment mainly linked to stronger forecast rand (BusinessDay, 01-Sep-26)

## Sources
- Pulse2, 03-Sep-26, https://pulse2.com/sasol-fy2026-adjusted-ebitda-rises-17-to-r61-billion-as-net-debt-falls-to-3-3-billion/ (tier 3)
- BusinessDay, 01-Sep-26, https://www.businessday.co.za/companies/2026-09-01-sasol-earnings-rise-but-dividend-remains-on-hold/ (tier 3)
- Rigzone, 01-Sep-26, https://www.rigzone.com/news/sasol_confirms_continued_disruption_at_key_south_african_refinery-01-sep-2026-184507-article/ (tier 3)
- Sunday World, undated, https://sundayworld.co.za/business/sasol-raises-fuel-sales-forecast-warns-on-gas-sales-volumes (tier 3)
- BusinessDay, 01-Jun-25, https://www.businessday.co.za/bd/companies/energy/2025-06-01-moodys-downgrades-sasol-outlook-amid-weak-demand-low-oil-prices (tier 3)
- Sasol investor centre credit rating page, read 09-Oct-26, https://www.sasol.com/index.php/investor-centre/credit-rating (tier 2, may lag)
- Repo: `database/issuers/sasol.json`, `knowledge/issuers/sasol.md` (tier 2, flagged unreliable)
