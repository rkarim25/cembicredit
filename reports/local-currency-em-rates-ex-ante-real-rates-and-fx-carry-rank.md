---
topic: Local-currency EM rates: ex-ante real rates and FX carry ranking
slug: local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
updated: 30-Oct-26
run: 2026-10-30_1755_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
status: Draft
open_items: 10
---

# Local-currency EM rates: ex-ante real rates and FX carry ranking

_Updated 30-Oct-26 · run 2026-10-30_1755_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank_

## Open items
1. [REZA] Is the ranking for outright local-bond positioning, FX-only carry, or both? The duration leg changes the order.
2. [BBG: GBI-EM 17 currencies (USDBRL, USDMXN, USDTRY, USDZAR, EURHUF etc.) / spot, 3M forward points, 3M ATM implied vol] No carry-to-vol ranking is possible without them.
3. [BBG: BZEXIP12 / latest Focus 12M-ahead IPCA] The last verified reading is 4.62% (21-Sep-26) and is now over five weeks old.
4. [BBG: ECFC <country> / 12M-ahead CPI consensus, Mexico, Hungary, South Africa] Replaces the trailing proxies.
5. [BBG: USDTRY spot, TRY 3M forward points, CBRT net reserves ex-swaps] Needed to test whether Turkish carry is sustainable after the cut.
6. [BBG: MXCPYOY, HUCPIYOY / Sep-26 CPI and Oct-26 Banxico and MNB decisions] Mexico and Hungary inputs are still the Aug/Sep-26 prints.
7. [BBG: policy rate, Colombia, Chile, Peru, Poland, Czechia, Romania, Egypt, Indonesia, India, Malaysia, Thailand, Philippines / current level and last change] 12 of the 17 markets are still unsourced.
8. [BBG: WIRP US / implied fed funds path to Jun-27] Sets the USD factor. Reports of a further hike by year-end rest on tier 4 sources.
9. [BBG: GBI-EM local 10Y yields, 17 countries] Needed for the duration leg.
10. [REZA] CBRT statement of 22-Oct-26: what does it say on the pace of further cuts?

## View
- Partial ranking on ex-ante real policy rates, five of 17 markets: Turkey ~12.1pp, Brazil ~9.1pp, Hungary ~4.2pp (trailing), Mexico ~3.1pp (trailing), South Africa ~2.8pp (trailing, Sep-26 CPI).
- The CBRT cut 100bp to 36% on 22-Oct-26, so Turkey's survey-based real rate is ~12.1pp, down from ~13.1pp. It remains the widest.
- Brazil's Selic is 13.75%, after the fifth consecutive cut on 16-Sep-26. The disputed 14.25% was an earlier-year level.
- South Africa's Sep-26 CPI was 4.5%, below the 4.7% expected, with core at 4.0%. The real rate is ~2.8pp headline and ~3.3pp on core. It ranks last of the five.
- Biggest risk: a firmer dollar after the 16-Sep-26 Fed hike hits high-beta carry (BRL, TRY, ZAR) together.
- The ranking mixes survey and trailing bases and is indicative only.
- Confidence: Medium on the policy rates, Low to Medium on the ranking. There are no forwards, vol or yields, and only five markets are covered.

## What changed
- Turkey: the 22-Oct-26 cut to 36% is now confirmed after the meeting. The real rate on the survey 12M CPI falls to ~12.1pp from ~13.1pp.
- Brazil: the 13.75% Selic is confirmed, with the prior rate at 14.00%. The 14.25% conflict is closed.
- South Africa: the Sep-26 CPI of 4.5% (core 4.0%) is now found. The trailing real rate is unchanged at ~2.8pp.
- Closed open items: the CBRT decision, the Selic level and the South Africa Sep-26 CPI.
- Still open: the Brazil Focus update, the Mexico and Hungary refreshes, the 12 unsourced markets and all market data.

## Analysis
### Method
- Ex-ante real policy rate = policy rate minus 12M-ahead CPI expectation. Where no survey is sourced, trailing y/y CPI is used and labelled "trailing".
- FX carry rank = 3M forward carry divided by 3M implied vol, adjusted for REER z-score and terms-of-trade momentum. It is not computed, because no forwards or vol are sourced.
- Universe (17): BRL, MXN, COP, CLP, PEN; ZAR, PLN, CZK, HUF, RON, TRY, EGP; IDR, INR, MYR, THB, PHP.

### Real policy rate table
| Market | Policy rate (date) | Inflation input | Real rate | Basis | Confidence |
|---|---|---|---|---|---|
| Turkey | 36.00% (cut 22-Oct-26) | 12M-ahead CPI 23.89% (CBRT survey, 16-Oct-26) | ~12.1pp | Ex-ante | Medium |
| Brazil | 13.75% (16-Sep-26) | Focus 12M-ahead IPCA 4.62% (21-Sep-26) | ~9.1pp | Ex-ante | Medium |
| Hungary | 5.50% (held 22-Sep-26) | CPI 1.3% y/y, Aug-26 | ~4.2pp | Trailing | Medium |
| Mexico | 6.50% (24-Sep-26) | CPI 3.42% y/y, 1H Sep-26 | ~3.1pp | Trailing | Medium |
| South Africa | 7.25% (24-Sep-26) | CPI 4.5% y/y, Sep-26 | ~2.8pp | Trailing | Medium |

Arithmetic is policy rate minus the inflation input.

### Turkey
- The CBRT cut the policy rate 100bp from 37% to 36% on 22-Oct-26. The overnight lending rate fell to 39% and the borrowing rate to 34.5%. The statement says recent inflation data confirm a deceleration in the underlying trend (Hürriyet Daily News, 22-Oct-26, Medium).
- The 16-Oct-26 survey has 12M-ahead CPI at 23.89% and a policy-rate path of 35% in December and 34.35% in January (Hürriyet Daily News, 16-Oct-26, Medium).
- On trailing Sep-26 CPI of 29.73% the real rate is ~6.3pp. Against the CBRT's own 28% year-end forecast it is ~8pp.
- Judgement: the survey-based 12pp is the upper bound and shrinks with each cut. Admission to the carry ranking needs reserves and forwards (Low–Medium).

### Brazil
- Copom cut the Selic 25bp from 14.00% to 13.75% on 16-Sep-26, unanimously. It was the fifth consecutive cut, and the rate matched the market's end-2026 median (press reports, 16-Sep-26, Medium).
- Focus end-2026 Selic expectations were later reported at 13.50%, then 13.25% (Folha PE and DGABC, Sep–Oct-26, Medium).
- Judgement: the end-2026 Selic median has fallen below the current rate, so the real rate will compress as the cycle continues. The risk is expectations drift (Medium).

### Hungary
- The MNB held the base rate at 5.50% on 22-Sep-26 and cut the inflation target to 2.5% from 2028 (Tradingpedia, 23-Sep-26, Medium).
- Aug-26 CPI was 1.3% y/y and core 2.0%. On core the real rate is ~3.5pp, which is the better ranking input (Medium).

### Mexico
- Banxico held 6.50% on 24-Sep-26. CPI was 3.42% and core 3.79% in 1H Sep-26. On core the real rate is ~2.7pp (Por Esto, 24-Sep-26, Medium).
- An unsourced search summary claims October CPI of 3.0% and a cutting bias. It is not relied on (Low).

### South Africa
- The SARB raised the repo rate 25bp to 7.25% on 24-Sep-26. Sep-26 CPI was 4.5% y/y, +0.4% m/m, below the 4.7% expected. Core was 4.0%, down from 4.1% (Stats SA via Trading Economics, 21-Oct-26, Medium).
- SARB flags inflation above 5% into early 2027, so the forward real rate is below ~2.8pp (Low–Medium).

### Common USD factor
- The FOMC raised the range 25bp to 3.75–4.00% on 16-Sep-26 (Federal Reserve, 16-Sep-26, High).
- A hiking Fed narrows the carry cushion for Mexico and the Asian funders first, and raises correlation across the high-carry group (Medium).

### Not covered
- Twelve markets are unsourced. Spot, forwards, vol and local yields must come from [BBG]. No Cognitive Credit model applies.

## Where the models disagreed
1. Brazil's Selic: 13.75% in the knowledge base against 14.25% in older Brazilian press. Resolved to 13.75% from post-meeting reports of 16-Sep-26 with 14.00% as the prior rate (tier 3, more recent and specific). The 14.25% items fit earlier meetings.
2. Turkey's 22-Oct-26 decision: the position treated the cut to 36% as a pre-decision preview. A post-decision report now confirms it, so it is adopted. Goldman and SocGen hold calls are superseded by the outcome.
3. Fed direction: the position cited an "easing" narrative. The 16-Sep-26 hike is tier 2 and stands. The easing items were generic and undated, so they are discarded.

## Management questions
None

## Knowledge base updates
- [Monetary] Turkey: CBRT cut the policy rate 100bp to 36% on 22-Oct-26, overnight lending rate 39%, borrowing rate 34.5% (Hürriyet Daily News, 22-Oct-26)
- [Monetary] Brazil: Selic was 14.00% before the 16-Sep-26 cut to 13.75%. Focus end-2026 Selic median later fell to 13.25% (Folha PE and DGABC, Sep–Oct-26)
- [Monetary] South Africa: CPI 4.5% y/y and 0.4% m/m in Sep-26, core 4.0%, against 4.7% expected (Stats SA via Trading Economics, 21-Oct-26)

## Sources
- Hürriyet Daily News, "Türkiye's Central Bank cuts policy rate by 100bps to 36 percent", 22-Oct-26, https://www.hurriyetdailynews.com/turkiyes-central-bank-cuts-policy-rate-by-100bps-to-36-percent-228479 (tier 3)
- Azernews, CBRT preview, 22-Oct-26, https://www.azernews.az/region/266001.html (tier 3)
- Economic News Brasil, "Nova taxa Selic chega em setembro ao patamar projetado para dezembro", 16-Sep-26, https://economicnewsbrasil.com.br/2026/09/16/nova-taxa-selic-projecao-dezembro-2026/ (tier 3)
- Atlas Público (BCB news), "Copom reduz Selic para 13,75% ao ano em decisão unânime", Sep-26, https://atlaspublico.com.br/bcb/noticias/copom-reduz-selic-para-13-75pct-ao-ano-em-decisao-unanime-87748 (tier 3)
- DGABC, Focus Selic end-2026 at 13.25%, Oct-26, https://www.dgabc.com.br/Noticia/4365014/estimativa-para-a-selic-no-fim-de-2026-segue-em-13-25-na-pesquisa-focus- (tier 3)
- Stats SA, CPI P0141 September 2026, 21-Oct-26, https://www.statssa.gov.za/publications/P0141/P0141September2026.pdf (tier 2, found in search, not opened); Trading Economics summary, 21-Oct-26, https://tradingeconomics.com/south-africa/inflation-cpi/news/593759 (tier 3)
- SAnews, "CPI rises in September", Oct-26, https://www.sanews.gov.za/node/85109 (tier 3)
- Hürriyet Daily News, CBRT survey, 16-Oct-26, https://www.hurriyetdailynews.com/turkiyes-year-end-inflation-expectations-hold-steady-at-29-6-percent-survey-228201 (tier 3)
- Tradingpedia, MNB hold, 23-Sep-26, https://www.tradingpedia.com/2026/09/23/forint-gains-as-mnb-shifts-target-pauses-rate-cuts/ (tier 3)
- Federal Reserve, FOMC press release, 16-Sep-26, https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm (tier 2)
- Previous truth document (run 2026-10-21_1000) and knowledge base facts log (tiers 2–3)
- Position by claude, run 2026-10-30 (tier 4 where not independently verified)
