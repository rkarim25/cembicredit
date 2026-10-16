---
topic: Metinvest Barclays report and model
slug: metinvest-barclays-report-and-model
updated: 16-Oct-26
run: 2026-10-16_1233_metinvest-barclays-report-and-model
status: Draft
open_items: 9
---

# Metinvest Barclays report and model

_Updated 16-Oct-26 · run 2026-10-16_1233_metinvest-barclays-report-and-model_

## Open items
1. [BBG: METINV 7.65 10/01/2027 / YAS price, yield, Z-spread] No live level for the 2027s. Barclays' c.87 cash and 23% yield cannot be checked against a Bloomberg screen.
2. [BBG: METINV 7.75 10/17/2029 / YAS price, yield, Z-spread] The stored 93.27 / 14.98% / 1022bp (27-Sep-26) conflicts with Barclays' c.77 cash and 18% yield, and with the "15.65%" label.
3. [BBG: MHPSA 6.25 09/19/2029 / YAS price and yield] This is needed to check the 12% yield behind Barclays' switch recommendation.
4. [REZA] Current Moody's, S&P and Fitch ratings and outlooks since 11-Aug-26 (Bloomberg RATC). Public sources show S&P at CCC+ after the April repayment and Fitch at CCC- earlier in 2026. The Moody's Caa3 and Fitch CCC- entries rest on Barclays only.
5. [REZA] Paste the Barclays base and downside assumptions, and say whether the H2 26E EBITDA of $98mn includes any Zaporizhstal contribution. Zaporizhstal is a JV and sits outside EBITDA ex-JVs.
6. [REZA] Should the 2024A row in `database/issuers/metinvest.json` be rebuilt from the audited FY24 and FY25 filings? It carries the end-June 26 balance sheet and conflicts with the Barclays 2024 table.
7. [REZA] Fund exposure to the METINV 2027s and 2029s, and whether the mandate allows the switch into MHPSA 6.25% 2029s.
8. [MANAGEMENT] Split of the $191mn June-26 cash between offshore hard currency and Ukrainian accounts under NBU controls, plus cash and undrawn committed facilities at 30-Sep-26.
9. [MANAGEMENT] Zaporizhstal and Kamet Steel restart timetable and capex, and any war-risk or business-interruption insurance recovery.

## View
The credit is distressed but serviced. H1 26 net debt of $866mn (1.2x LTM EBITDA ex-JVs) predates the August–September strikes and is stale for forward leverage (Metinvest H1 26, 14-Sep-26, High).
Zaporizhstal has been idle since 11-Aug-26 after repeated strikes, and force majeure is to be declared on part of the contracts. No restart date is public (SteelOrbis, 17-Sep-26; Kurs.com.ua, Sep-26, Medium).
Barclays cuts H2 26E EBITDA ex-JVs to $98mn from $300mn in H1 26, and FY26E to $398mn. It forecasts net leverage of 2.4x in 2026E and 2.5x in 2027E, and H2 26E FCF of -$79mn (Barclays, Oct-26, Medium).
No bond matures before $332mn on 01-Oct-27, then $500mn on 17-Oct-29. Annual coupons are about $25mn on the 2027s (7.65%) and about $39mn on the 2029s (7.75%), my arithmetic from issuer terms (Metinvest IR, 09-Oct-26, High).
Barclays puts both bonds near the sovereign curve (2027s c.87 cash, 23% yield; 2029s c.77 cash, 18% yield) and anticipates a 2–3 year extension at 9–10% coupons without principal haircuts. This is Barclays' view; I have no Bloomberg levels to confirm it (Medium).
The structural cushion is the European re-rolling assets, c.$150mn EBITDA in 2025, and the 2.1bn tonne JORC iron ore base. Barclays' switch of the 2027s into MHPSA 6.25% 2029s is reported but not endorsed here, because neither leg is priced on Bloomberg.
The biggest risk is further strikes combined with cash below the $200mn Moody's buffer ahead of the 2027 refinancing.
The repo data is unreliable on coupon, quotes and the 2024A row, and the H2 26E forecast comes from a broker. Overall confidence is Medium-Low.

## What changed
- The 2027 coupon is corrected to 7.65% from 7.75%. The issuer page prevails over the H1 summary, and the 2027 maturity is 01-Oct-27, not 17-Oct-27.
- The 2029 notes are confirmed as $500mn, 7.750%, due 17-Oct-29, with coupons on 17-May and 17-Nov. The repo benchmark label "15.65%" and the stored 14.98% yield are flagged as wrong or stale.
- Barclays-sourced figures are downgraded from High to Medium, because sell-side is tier 3. The previous "we endorse" language on the MHPSA switch is withdrawn pending Bloomberg levels.
- A repo data error is added: the 2024A row duplicates the end-June 26 balance sheet. Barclays shows 2024 net debt of $1,048mn against $866mn in the repo.
- Ratings are re-labelled as unverified and possibly conflicting.
- Open items are rebuilt. The prior cash-split and capex items are kept, and the bond ticker references are fixed.

## Analysis

### Operations and the Zaporizhstal outage
- Zaporizhstal has been idle since 11-Aug-26. It was struck on 11-Aug, 27-Aug, 12-Sep and 17-Sep, with 17 missiles in total, 8 killed and 28 injured (SteelOrbis, 17-Sep-26, Medium). Metinvest holds a 49.99% stake, and the JV sits outside EBITDA ex-JVs.
- Barclays reports Kamet Steel (2.0mt) hit on 05-Sep-26 and fully shut down. It also reports damage to port-logistics power substations (Barclays, Oct-26, Medium; Bloomberg headline 13-Sep-26, paywalled, details not seen).
- Barclays forecast (Medium):

| US$mn | FY25 | H1 26 | H2 26E | FY26E | FY27E |
|---|---:|---:|---:|---:|---:|
| EBITDA ex-JVs | 643 | 300 | 98 | 398 | 387 |
| Simple FCF | -1 | 213 | -79 | 134 | 35 |
| Net debt | 1,065 | 866 | 965 | 965 | 957 |

- FY27E assumes iron ore at $100/t. Barclays gives c.$300mn at $90/t.
- The company's H1 26 press summary shows adjusted EBITDA of $311mn against $300mn ex-JVs (gmk.center, Sep-26, Medium). The definitions differ and I have not reconciled them.
- Zaporizhstal's contribution to group EBITDA is unknown. The $98mn H2 26E figure therefore cannot be tied to the plants that are down (open item 5).

### Liquidity
- The $428mn Eurobond was repaid in April 2026 from internal cash, taking wartime bond service above $1bn (Metinvest H1 26, 14-Sep-26; Ukranews, Apr-26, High/Medium).
- End-June 26: gross debt $1,057mn ($168mn short-term, $889mn long-term), cash $191mn, net debt $866mn (Metinvest H1 26, High).
- Cash is below Moody's $200mn minimum buffer (Moody's, Aug-26, via Barclays, Medium).
- H2 26E: operating cash flow of $98mn, capex of $129mn including $130mn of repairs, and interest of $48mn give FCF of -$79mn (Barclays, Medium).
- No data was found on undrawn committed facilities or covenants.
- The United Coal disposal, H1 26 EBITDA of -$16mn, is assumed to bring no material cash (Barclays, Medium).

### Capital structure
- 2027 notes: $332.354mn outstanding, 7.650%, due 01-Oct-27, coupons 1-Mar and 1-Sep (Metinvest IR, 09-Oct-26, High). Earlier notes in the repo showed 7.75%, which the issuer page contradicts.
- 2029 notes: $500mn, 7.750%, due 17-Oct-29 (metinvestholding.com/en/investor/ebonds2029, High).
- Barclays levels (Oct-26, Medium): 2027s c.87 cash, 23% yield; 2029s c.77 cash, 18% yield.
- The restructuring base case is a 2–3 year extension at 9–10% coupons without haircuts, matching the late 2025 and early 2026 baseline (Barclays, 04-Feb-26 and Oct-26, Medium).
- Higher coupons would absorb cash at $90–100/t iron ore (Barclays, Medium).

### Relative value
- Barclays recommends switching METINV 2027s (23% yield) into MHPSA 6.25% 2029s (c.12% yield) (Barclays, Oct-26, Medium).
- Its reasoning is lower refinancing risk at MHP, offshore poultry at about a quarter of MHP EBITDA, and no Eurobond maturity before 2029.
- Metinvest is Market Weight and MHP is Overweight at Barclays.
- This remains unverified until open items 1–3 are answered.

### Asset cushion
- The European re-rolling assets in Italy, Bulgaria, the UK and Romania produced 1.5mt and c.$150mn EBITDA in 2025, about 23% of group EBITDA ex-JVs (Barclays, Oct-26, Medium).
- They depend partly on Ukrainian feedstock. Zaporizhstal had shipped over 22,000t of hot-rolled steel to Metinvest Tubular Iași, with plans for up to 180,000t in 2026 (Romania-Insider, Feb-26, Medium).
- JORC iron ore reserves are 2.1bn tonnes (July-21 audit) against c.16mt of 2025 output (Barclays, Medium).
- Rail exports to Europe are the fallback if Black Sea ports are disrupted. Barclays assumes 70–80% of external ore sales volumes are preserved into 2027 (Medium).

### Ratings
- Moody's Caa3 Stable (Aug-26), S&P CCC+ Negative and Fitch CCC- are all recorded via Barclays (Oct-26, Medium).
- Press reports S&P raised the rating by two notches to CCC+ after the April repayment and that Fitch cut to CCC- earlier in 2026 (BondBlox, 2026, Low).
- Agency pages were not accessed. Treat all three as unverified.

### Repo data quality
- The benchmark label "METINV 15.65% 2029" conflicts with the 7.75% coupon. At 93.27 with about three years to maturity, a 7.75% coupon implies a yield near 10%, not 14.98% (my approximation, not a bond-calculator output).
- The stored quote is dated 27-Sep-26 and does not match Barclays' c.77 cash.
- The 2024A row shows cash $191mn, gross debt $1,057mn and net debt $866mn. These equal the end-June 26 figures.
- Barclays' 2024 table shows cash $657mn, total debt $1,705mn, net debt $1,048mn, revenue $8,050mn and EBITDA ex-JVs $898mn (Medium).
- The 2021A stored FCF of $4,013mn is only reconcilable with EBITDA incl. JVs of $7,044mn.
- The ebitda_reconciliation comments are boilerplate.
- No Cognitive Credit model exists. A model must be built from the issuer's filings, namely the FY25 annual report and the H1 26 financial statements. These were not read directly this run.

### Reconstructed data
The figures come from Reza's flattened Barclays capture, rebuilt in the 08-Oct-26 run. The FY26E, FY27E and H2 26E columns carry only net debt, not gross cash and debt. That rebuild stands (Barclays, Oct-26, Medium).

## Where the models disagreed
1. **Coupons and benchmark label.** The earlier Gemini-only run carried 7.75% for the 2027s. Claude showed the issuer page says 7.65%, and that the "15.65%" label and 14.98% yield are inconsistent. Resolved for the issuer page, a tier 2 source, over a secondary summary.
2. **Weight of Barclays.** Gemini rated Barclays figures High and endorsed the switch. Claude marked them unverified. Resolved to Medium, because sell-side is tier 3 and no Bloomberg confirmation exists.
3. **Ratings.** Gemini took Barclays' list as given. Claude found public press at tier 3/4 pointing to different statuses. Not resolved, and logged as an open item.
4. **Forward leverage.** Both sides agree 1.2x is stale. Claude adds that Zaporizhstal is outside EBITDA ex-JVs, so the $98mn forecast needs the Barclays assumptions to interpret.

## Management questions
1. What is the expected restart timetable and capex for Zaporizhstal and Kamet Steel, and is any war-risk or business-interruption insurance recovery expected?
2. What are cash and committed undrawn facilities at 30-Sep-26, and how much cash is held offshore in hard currency?
3. What are the financial covenant thresholds on the 2027 and 2029 notes and the current headroom?
4. How much of group EBITDA does Zaporizhstal represent, and how is the JV accounted for in leverage?
5. What is the status and expected cash effect of the United Coal divestment?
6. What is the maximum monthly iron ore volume exportable by western rail while Black Sea ports and grid supply are disrupted?
7. What is the company's plan for the October 2027 maturity, and is a liability management exercise planned?

## Knowledge base updates
- [Capital] 2027 notes: $332.354mn outstanding, 7.650%, due 01-Oct-27, coupons 1-Mar and 1-Sep (Metinvest IR, 09-Oct-26)
- [Capital] 2029 notes: $500mn, 7.750%, due 17-Oct-29, coupons 17-May and 17-Nov (metinvestholding.com/en/investor/ebonds2029, 16-Oct-26)
- [Capital] The $428mn Eurobond was repaid in April 2026 from internal cash (Metinvest H1 26, 14-Sep-26)
- [Financials] End-June 26: gross debt $1,057mn, cash $191mn, net debt $866mn, 1.2x LTM EBITDA ex-JVs (Metinvest H1 26, 14-Sep-26)
- [Financials] H1 26: revenue $3,657mn, EBITDA ex-JVs $300mn, net loss $202mn, capex $89mn, interest paid $67mn (Metinvest H1 26, 14-Sep-26)
- [Financials] Barclays forecasts EBITDA ex-JVs of $98mn for H2 26E, $398mn for FY26E and $387mn for FY27E, with net debt/EBITDA of 2.4x in 2026E and 2.5x in 2027E (Barclays, Oct-26)
- [Business] Zaporizhstal idle since 11-Aug-26; struck on 11-Aug, 27-Aug, 12-Sep and 17-Sep with 17 missiles in total; 8 killed and 28 injured (SteelOrbis, 17-Sep-26)
- [Business] Metinvest to declare force majeure on part of contracts after the Zaporizhstal stoppage (Kurs.com.ua, Sep-26)
- [Business] Non-Ukrainian re-rolling assets produced 1.5mt in 2025 and c.$150mn EBITDA, about 23% of group EBITDA ex-JVs (Barclays, Oct-26)
- [Business] JORC iron ore reserves 2.1bn tonnes (July-21 audit) (Barclays, Oct-26)
- [Market] Barclays levels: METINV 2027s c.87 cash / 23% yield; 2029s c.77 cash / 18% yield (Barclays, Oct-26)
- [Snapshot] Ratings recorded via Barclays: Moody's Caa3 Stable (Aug-26), S&P CCC+ Negative, Fitch CCC-; unverified (Barclays, Oct-26)
- [Calendar] 01-Oct-27: $332mn 7.65% notes mature (Metinvest IR, 09-Oct-26)
- [Calendar] 17-Oct-29: $500mn 7.75% notes mature (metinvestholding.com, 16-Oct-26)

## Sources
- Reza Keep capture of the Barclays report and model, early Oct-26, via the 08-Oct-26 run (Tier 1 capture; Barclays content is Tier 3).
- Barclays Credit Research, Ukraine Corporates – Metinvest, Oct-26 (Tier 3).
- Metinvest H1 26 results, 14-Sep-26, via gmk.center (https://gmk.center/en/news/metinvest-ended-the-first-half-of-2026-with-a-loss-of-202-million/amp/) (Tier 2 content, Tier 3 summary).
- Metinvest IR, 2027 notes page, 09-Oct-26 (Tier 2).
- Metinvest IR, 2029 notes page (https://metinvestholding.com/en/investor/ebonds2029), 16-Oct-26 (Tier 2).
- SteelOrbis, 17-Sep-26 (https://www.steelorbis.com/steel-news/latest-news/metinvests-zaporizhstal-hit-by-fourth-russian-missile-attack-in-just-over-a-month-1478350.htm) (Tier 3).
- Kurs.com.ua, Sep-26 (https://kurs.com.ua/en/novost/1479472-metinvest-ogolosit-fors-mazhor-za-chastinoju-kontraktiv-pislja-zupinki-kombinativ) (Tier 3).
- Ukranews, Apr-26 (https://ukranews.com/en/news/1147954-metinvest-repays-usd-1-billion-in-2026-bonds) (Tier 3).
- Romania-Insider, Feb-26 (https://www.romania-insider.com/business/zaporizhstal-hot-rolled-steel-arcelormittal-iasi-feb-2026) (Tier 3).
- BondBlox rating items, 2026 (https://bondblox.com/news/metinvest-upgraded-to-ccc-by-sp) (Tier 4, undated).
- Moody's, Metinvest, Aug-26, as quoted by Barclays (Tier 2 content, not accessed).
- Bloomberg News, 13-Sep-26 and 22-Sep-26 (headlines only, paywalled, Tier 3).
- Repo records: `database/issuers/metinvest.json`, `knowledge/issuers/metinvest.md` (Tier 2, internally inconsistent where noted).
- No new web searches were run in this adjudication. It relies on the research cited in the positions.
