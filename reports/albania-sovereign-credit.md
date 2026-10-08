---
topic: Albania sovereign credit
slug: albania-sovereign-credit
updated: 08-Oct-26
run: 2026-10-08_1928_albania-sovereign-credit
status: Draft
open_items: 9
---

# Albania sovereign credit

_Updated 08-Oct-26 · run 2026-10-08_1928_albania-sovereign-credit_

## Open items
1. [BBG: ALBANIA / RATC] What are the current ratings, outlooks and dates of last action for S&P, Moody's, Fitch and Scope? Specifically: is Moody's on Ba3 with a Positive outlook since Sep-26, is S&P BB or BB-, and does Fitch rate Albania?
2. [BBG: ALBANIA 3.5 06/16/27, ALBANIA 5.9 06/09/28, ALBANIA 3.5 11/23/31, ALBANIA 4.75 02/14/35 Corp / DES and YAS] Confirm the Eurobond list (ISIN, coupon, size, law, CAC type) and the yield, Z-spread and cash price of each bond against North Macedonia and Serbia.
3. [BBG: Albania EMBI GD / index weight] What is Albania's EMBI GD weight, and is it in other benchmarks?
4. [REZA] Paste the Ministry of Finance debt bulletin: public debt at end-2025 and mid-2026 (definition, FX share, average maturity), the 2026-27 gross financing need, and the 16-Jun-27 maturity amount and refinancing plan.
5. [REZA] Paste the Bank of Albania decision of 07-Oct-26 and the latest INSTAT CPI release, with dates, to confirm the 2.50% policy rate and 2.9% CPI one position cited.
6. [BBG: Bank of Albania gross FX reserves, EUR / latest month] What is the latest gross reserve figure in euro, and the current import cover?
7. [REZA] Is the IMF WEO vintage behind `database/sovereigns/albania.json` the Apr-26 or a later release? Is Albania held or being screened?
8. [MANAGEMENT] What is the stock of PPP and concession liabilities and state guarantees outside the public debt headline?
9. [MANAGEMENT] What is the planned split of 2026 financing between net domestic issuance and external borrowing?

## View
No directional or relative-value call is issued. The 90-day news and filings requirement was not met: no search was possible, and the brief holds no captures.

Medium-confidence evidence from official multilateral series archived in the repo points to a consolidating credit. General government debt falls from 75.4% of GDP (2020) to 52.6% (2025) and 51.5% (2026E). Gross reserves were $8.60bn (2025), equal to 7.2 months of imports. The lek has appreciated against the dollar.

The ratings direction (Moody's Ba3 outlook Positive, S&P BB), the 2026 policy rate and CPI, and the "2026 pre-funded" claim rest on unlinked, unsourced assertions. They are leads only.

The main risks are the 2027 refinancing window, euroisation, and contingent liabilities (PPP, guarantees). None of these is quantified.

Confidence in the consolidation trend is Medium. Confidence in any market-facing conclusion is Low until the [BBG] items are answered.

## What changed
First version.

## Analysis
### Debt and fiscal (from official series; the period and definition of each figure are stated)
- General government debt: 75.4% of GDP (2020), 58.0% (2023), 54.5% (2024), 52.6% (2025), 51.5% (2026E) (IMF WEO via `database/sovereigns/albania.json`, populated 08-Oct-26, Medium). The WEO vintage is not stated (open item 7).
- External debt was 39.7% of GNI in 2024, down from 69.9% in 2020 (World Bank, via the same file, Medium). This is external debt, not FX-denominated public debt. The FX share of public debt is not in the brief.
- Nominal GDP is $33.3bn (IMF WEO 2026E, via the repo file, Medium).
- The lek's contribution to the debt decline cannot be separated from primary balances and growth without a decomposition. The attribution to "fiscal discipline and lek strength" is a hypothesis (Low).
- Interest to revenue, gross financing need and the primary balance versus the debt-stabilising level are not available. They are the main fiscal gaps.

### External
- Gross FX reserves were $8.60bn in 2025, equal to 7.2 months of imports. Short-term external debt was 19.0% of reserves (World Bank via the repo file, Medium).
- A claimed $8.4-8.9bn for Aug-26 has no source. It is a range, the Bank of Albania reports in euro, and the claim is not used (Low).
- BIS monthly data show USD/ALL averaging 79.84 in Sep-26, 93.89 in Dec-24 and 108.52 in Dec-22 (BIS via the repo file, Medium). The lek has appreciated on a multi-year view. That helps FX-debt ratios and tightens the tradable sector's competitiveness.
- Not available: current account, net errors and omissions, financing mix, import cover after 2025, the gross external financing requirement, and euroisation of loans and deposits.

### Ratings and market (unverified)
- One position cited Moody's Ba3 with a Positive outlook (SeeNews, Sep-26), S&P BB Stable (Mar-25), and no Fitch rating. None is linked or in the brief (Low).
- The same position cited a €650m 10-year 4.75% Eurobond issued Feb-25 and a 2026 funding position described as complete. Neither is sourced (Low). The nearest maturity on the bond list one position used is 16-Jun-27, which is a refinancing risk window until a plan is confirmed.
- The policy rate (2.50%, 07-Oct-26) and CPI (2.9%, Sep-26) are plausible but unlinked, and the timing of the CPI release is doubtful (Low).

### Risks to test
- Debt path sensitivity to the lek, given FX debt.
- Roll risk in 2027.
- Contingent liabilities (PPP, guarantees).
- Tourism and European demand exposure.
- Hydropower and drought.
- EU accession politics.

## Where the models disagreed
1. **Whether any view is supportable.** Claude said none. Gemini said a Medium-confidence view is possible from archived official series. Resolution: the archived IMF and World Bank data (tier 2) support a Medium-confidence consolidation trend, but not a market view. Rule: the evidence hierarchy puts official data above the unsourced press items.
2. **Ratings and the Moody's outlook.** Claude called them unverified. Gemini held them at Medium. Resolution: they are open items at Low confidence. Neither side has a source above tier 4 for them. The "BB-" label in Gemini's summary conflicts with "S&P BB".
3. **Debt figures.** Gemini's position gave ranges (about 49-53%) and a mid-2026 figure of 49.0%. Its rebuttal replaced them with IMF WEO figures. Resolution: use the WEO series (51.5% for 2026E) and drop the 49% figure, which has no source.
4. **Reserves.** The $8.4-8.9bn range for Aug-26 was dropped. The World Bank $8.60bn for 2025 is used, with its stated import cover.
5. **Policy rate, CPI and "pre-funded 2026".** Claude called them Low pending links. Gemini lowered its own confidence to Medium. Resolution: open items. Neither is a primary source.

## Management questions
1. What are the 2026-27 gross financing need and its split between domestic and external sources?
2. What is the plan for the 16-Jun-27 Eurobond maturity: buyback, pre-funding or a new issue?
3. What is the stock of PPP and concession liabilities and state guarantees, and how are they reported?
4. What share of public debt is FX-denominated, and how does the debt ratio respond to a 10% lek depreciation?
5. What is the current status of the EU accession negotiating chapters, and what fiscal measures does accession require?

## Knowledge base updates
- [Fiscal] General government debt was 75.4% of GDP in 2020, 58.0% in 2023, 54.5% in 2024, 52.6% in 2025 and 51.5% in 2026E (IMF WEO via `database/sovereigns/albania.json`; vintage not stated, 08-Oct-26)
- [External] External debt was 39.7% of GNI in 2024, down from 69.9% in 2020 (World Bank via `database/sovereigns/albania.json`, 08-Oct-26)
- [External] Gross FX reserves were $8.60bn in 2025, 7.2 months of imports. Short-term external debt was 19.0% of reserves (World Bank via `database/sovereigns/albania.json`, 08-Oct-26)
- [Growth] Nominal GDP is $33.3bn in 2026E (IMF WEO via `database/sovereigns/albania.json`, 08-Oct-26)
- [Monetary] USD/ALL averaged 79.84 in Sep-26, 93.89 in Dec-24 and 108.52 in Dec-22 (BIS via `database/sovereigns/albania.json`, 08-Oct-26)

## Sources
- `knowledge/sovereigns/albania.md`, 08-Oct-26: blank template, tier 2
- `knowledge/frameworks/sovereign-credit.md`: method, tier 2
- `database/sovereigns/albania.json`, 08-Oct-26 (IMF WEO, World Bank WDI, BIS): tier 2. Cited by the Gemini position and rebuttal and not independently re-read by this judge; the figures above are as quoted.
- Gemini position, unsourced items on ratings, the Eurobond, the policy rate and CPI (SeeNews, Bank of Albania and INSTAT cited without links): tier 3-4, not relied on
- No Bloomberg captures and no web search results for this run
