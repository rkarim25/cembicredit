---
topic: Local-currency EM rates: ex-ante real rates and FX carry ranking
slug: local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
updated: 09-Oct-26
run: 2026-10-09_0843_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
status: Draft
open_items: 10
---

# Local-currency EM rates: ex-ante real rates and FX carry ranking

_Updated 09-Oct-26 · run 2026-10-09_0843_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank_

## Open items
1. [REZA] Is the ranking for outright local-bond positioning, FX-only carry, or both? The duration leg changes the order.
2. [BBG: GBI-EM 17 currencies (USDBRL, USDMXN, USDTRY, USDZAR, EURHUF etc.) / spot, 3M forward points, 3M ATM implied vol] Needed for the carry-to-vol ranking. No FX ranking is possible without it.
3. [BBG: ECFC <country> / 12M-ahead CPI consensus, 17 countries] Needed to replace the trailing CPI proxies for Mexico, Turkey, Hungary and South Africa.
4. [BBG: BZEXIP12 or Focus 12M-ahead IPCA / latest weekly reading after 21-Sep-26] Brazil's real rate uses a Focus reading that is three weeks old.
5. [BBG: HBRBASE Index / MNB base rate after 22-Sep-26 meeting] The September decision was not found. The 5.50% level may be stale.
6. [BBG: SACPIYOY Index / latest South Africa CPI y/y] Needed for South Africa's real rate after the hike to 7.25%.
7. [BBG: policy rate, 17 constituents / current level and last change] Colombia, Chile, Peru, Poland, Czechia, Romania, Egypt, Indonesia, India, Malaysia, Thailand and the Philippines are still unsourced.
8. [BBG: WIRP US / implied fed funds path to Jun-27] Sets the common USD factor after the 16-Sep-26 hike.
9. [BBG: GBI-EM local 10Y yields, 17 countries / yield] Needed for the duration leg.
10. [REZA] Paste Bloomberg text on Turkey and Egypt for the last 90 days, including CBRT net reserves ex-swaps and the Egypt parallel-market gap. Both need a sustainability test before they enter the ranking.

## View
- Partial ranking on real policy rates, with five markets sourced and FX carry still unranked: Brazil about 9.1pp (ex-ante), Turkey about 7.3pp (trailing), Hungary about 4.2pp (trailing, rate may be stale), Mexico about 3.1pp (trailing). South Africa has an unsourced CPI.
- Brazil leads (Medium). Selic is 13.75% after five 25bp cuts. Focus 12M-ahead IPCA is 4.62% and the median year-end Selic is 13.50%, so the real rate stays near 9pp through year-end.
- Turkey's real rate widened as September CPI fell to 29.73% against a 37% policy rate (Medium). Cuts are being discussed from 22-Oct-26, and the market still has to price that path. It stays on the watchlist pending reserves evidence.
- Hungary and Mexico are mid-table. Hungary's real rate is a function of a 1.3% CPI print well below target. Mexico is on hold at 6.50% with CPI at 3.42% and core falling.
- The common factor has tightened. The Fed hiked 25bp to 3.75–4.00% on 16-Sep-26 (High). South Africa hiked to 7.25% on 24-Sep-26 on fuel prices.
- Biggest risk: a further Fed hike or an oil shock hits the high-carry group together. South Africa and Turkey are already reacting to fuel.
- Confidence in the overall view: Low to Medium. Policy rates are mostly verified, but CPI expectations are mostly trailing, and spot, forwards, vol and yields come from no source.

## What changed
- Moved from method-only to a partial real-rate table for Brazil, Mexico, Turkey, Hungary and South Africa, all from web research dated Sep–Oct 26.
- Fed: the 16-Sep-26 hike to 3.75–4.00% is confirmed by the Federal Reserve press release, which upgrades the common-factor input from unverified to High.
- Turkey: September CPI of 29.73%, released 05-Oct-26, replaces August's 31.51%, so the trailing real rate widens to about 7.3pp from about 5.5pp.
- South Africa: the SARB hiked 25bp to 7.25% on 24-Sep-26, which closes the gap the position flagged.
- Hungary: the 1.3% August CPI is now corroborated by two sources (Trading Economics and an OTP Bank flash report), but the 22-Sep-26 MNB outcome is still missing.
- Closed: the request for the previous report, since it was supplied this run. Merged: policy-rate and CPI questions are now narrowed to the specific gaps.
- The Warsh chairmanship and the 4.1% SEP median rest on snippets only and were not adopted.

## Analysis
### Method (unchanged)
- Ex-ante real policy rate = policy rate minus 12M-ahead CPI expectation. Where no survey was sourced, the latest trailing y/y CPI is used as a proxy and labelled "trailing" (AGENTS.md section 3C, repo, Medium, method).
- FX carry rank = 3M forward-implied carry divided by 3M implied vol, then adjusted for REER z-score and terms-of-trade momentum from `database/sovereigns/*.json`. Not computed this run because no forwards or vol are sourced.
- Universe (17): BRL, MXN, COP, CLP, PEN; ZAR, PLN, CZK, HUF, RON, TRY, EGP; IDR, INR, MYR, THB, PHP.

### Real policy rate table (sourced markets only)
| Market | Policy rate (date) | Inflation input | Real rate | Basis | Confidence |
|---|---|---|---|---|---|
| Brazil | 13.75% (16-Sep-26) | Focus 12M-ahead IPCA 4.62% (21-Sep-26) | ~9.1pp | Ex-ante | Medium |
| Turkey | 37.00% (10-Sep-26) | CPI 29.73% y/y, Sep-26 (05-Oct-26) | ~7.3pp | Trailing | Medium |
| Hungary | 5.50% (25-Aug-26; Sep outcome unknown) | CPI 1.3% y/y, Aug-26 | ~4.2pp | Trailing | Low–Medium |
| Mexico | 6.50% (24-Sep-26) | CPI 3.42% y/y, 1H Sep-26 | ~3.1pp | Trailing | Medium |
| South Africa | 7.25% (24-Sep-26) | Not sourced | n/a | n/a | n/a |

Arithmetic is policy rate minus the inflation input. A trailing proxy overstates the real rate where disinflation is under way (Turkey) and understates it where inflation is rising (South Africa).

### Brazil
- Copom cut 25bp to 13.75% on 16-Sep-26. It was the fifth consecutive cut, decided unanimously at the 281st meeting. The statement said headline and core inflation are below the upper tolerance limit but above target (BCB statement via Soubrasilia and DGABC, Sep-26, Medium).
- Focus on 21-Sep-26: 12M-ahead IPCA 4.62%, 2026 IPCA 4.92%, year-end Selic 13.50% (Itaú Private Insights, 21-Sep-26, Medium).
- The 12M-ahead IPCA rose for six consecutive weeks to 4.65% by 11-Sep-26, while full-year 2026 expectations fell (Focus via Paraíba Business, 14-Sep-26, Medium). A rising forward expectation compresses the real rate from the CPI side even if Copom pauses.
- Judgement: Brazil has the highest sourced real rate. The risk to the duration leg is expectations drift, not the policy path (Medium).

### Turkey
- CBRT held at 37% for a fifth meeting on 10-Sep-26 (Intellinews, Sep-26, Medium).
- September CPI was 29.73% y/y, 1.84% m/m, against a 30.3% consensus. It is the first print below 30% since Nov-21. Core CPI was 29.00% y/y and domestic PPI 27.38% y/y (TurkStat via Hürriyet Daily News and Anews, 05-Oct-26, Medium).
- The CBRT raised its end-2026 forecast to 28% from 26%, and 100bp cuts are discussed for 22-Oct-26 and 10-Dec-26 (Intellinews, Sep-26, Medium).
- Judgement: the trailing real rate of ~7.3pp is the second highest sourced, but the CBRT's own 28% year-end forecast leaves only about 9pp on a forward basis before cuts. Admission still requires net reserves ex-swaps and a consensus 12M CPI path, neither of which is sourced (Low).

### Hungary
- MNB cut 25bp to 5.50% on 25-Aug-26, the lowest since May-22. It said the next decision would rest on the September Inflation Report (MNB press release, 25-Aug-26, High). Most panellists expected a further 25bp cut on 22-Sep-26, and the outcome was not found (Focus Economics, Aug-26, Medium).
- August CPI was 1.3% y/y (July 1.2%, the lowest since Nov-16), with core at 2.0% and services at 5.0% (Trading Economics, Sep-26; OTP Bank flash report, 10-Sep-26, Medium).
- Judgement: the real rate is wide because headline CPI is depressed by food (-1.4%) and household energy (-4.3%). With services at 5%, base effects will narrow it. Use core rather than headline when ranking (Medium).

### Mexico
- Banxico held 6.50% unanimously on 24-Sep-26, the third consecutive hold. It said it would not react "mechanically" to the Fed hike. Headline CPI was 3.42% and core 3.79% in 1H Sep-26, and the target is reached only by late 2027 (Por Esto, El CEO, 24-Sep-26, Medium).
- A Citibanamex survey headline reports analysts expecting a 25bp hike at the next decision. Its date and content were not verified (Forbes México, undated, Low). [REZA] to confirm if relevant.

### South Africa
- The SARB raised the repo rate 25bp to 7.25% on 24-Sep-26 in a unanimous vote, citing renewed fuel-price pressure. It warned headline CPI could breach 5% into early 2027 (Briefly News, 24-Sep-26, Medium). This follows a hold at 7.00% on 23-Jul-26 (EWN, 23-Jul-26, Medium).
- Judgement: the real rate is not computable without CPI, and expected inflation is rising, so the ex-ante real rate is compressing despite the hike (Low).

### Common USD factor
- The FOMC raised the target range 25bp to 3.75–4.00% on 16-Sep-26, by 12–0. It said inflation "remains elevated" and the move supports "a timelier return" to 2% (Federal Reserve press release, 16-Sep-26, High).
- Judgement: a hiking Fed lowers the carry cushion for low-real-rate markets first (Mexico on a narrow spread to Fed funds, the Asian funders) and raises the correlation of the high-carry basket (Medium).

### Not covered this run
- Colombia, Chile, Peru, Poland, Czechia, Romania, Egypt, Indonesia, India, Malaysia, Thailand and the Philippines: no searches returned dated policy rates or CPI.
- Spot FX, forwards, implied vol, local 10Y yields: market data, which must come via [BBG].
- No Cognitive Credit model applies. Sovereign inputs must come from official sources, and the per-country data layer in `database/sovereigns/*.json` should be the next input.

## Where the models disagreed
Only one position (claude) was submitted, with no rebuttal. The judge's own research revised three of its points:
1. Fed hike: the position rated it Low (snippets). The Federal Reserve release confirms it, so it is upgraded to High (tier 2 beats tier 4).
2. Turkey CPI: the position used August's 31.51%. The 05-Oct-26 September print of 29.73% supersedes it (equal tier, more recent wins).
3. South Africa: the position had a hold at 7.00% and the September outcome unknown. The 24-Sep-26 hike to 7.25% supersedes it (more recent wins). The Warsh/SEP detail was not adopted, since it rests on a tier 4 source only.

## Management questions
None

## Knowledge base updates
- [Monetary] US FOMC raised the fed funds target range 25bp to 3.75–4.00% by 12–0 on 16-Sep-26 (Federal Reserve press release, 16-Sep-26)
- [Monetary] Brazil: Copom cut the Selic 25bp to 13.75% on 16-Sep-26, unanimously, the fifth consecutive cut (BCB Copom statement via press, 16-Sep-26)
- [Monetary] Brazil: Focus 12M-ahead IPCA 4.62%, 2026 IPCA 4.92%, end-2026 Selic median 13.50% (BCB Focus via Itaú Private Insights, 21-Sep-26)
- [Monetary] Turkey: CBRT policy rate held at 37% for a fifth meeting on 10-Sep-26; CBRT end-2026 inflation forecast raised to 28% from 26% (Intellinews, Sep-26)
- [Monetary] Turkey: CPI 29.73% y/y and 1.84% m/m in Sep-26, core 29.00% y/y, D-PPI 27.38% y/y (TurkStat via Hürriyet Daily News, 05-Oct-26)
- [Monetary] Hungary: MNB base rate cut 25bp to 5.50% on 25-Aug-26 (MNB press release, 25-Aug-26)
- [Monetary] Hungary: CPI 1.3% y/y in Aug-26, core 2.0%, services 5.0% (KSH via Trading Economics, Sep-26)
- [Monetary] Mexico: Banxico held 6.50% unanimously on 24-Sep-26, third consecutive hold; CPI 3.42% y/y, core 3.79% in 1H Sep-26 (Banxico via Por Esto, 24-Sep-26)
- [Monetary] South Africa: SARB raised the repo rate 25bp to 7.25% on 24-Sep-26, unanimous (Briefly News, 24-Sep-26)
- [Calendar] 22-Oct-26 CBRT MPC meeting (Intellinews, Sep-26)
- [Calendar] 10-Dec-26 CBRT MPC meeting (Intellinews, Sep-26)

## Sources
- Federal Reserve, FOMC press release, 16-Sep-26, https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm (tier 2)
- MNB, Monetary Council press release, 25-Aug-26, https://mnb.hu/en/monetary-policy/the-monetary-council/press-releases/2026/press-release-on-the-monetary-council-meeting-of-25-august-2026 (tier 2)
- Focus Economics, Hungary MNB August meeting, Aug-26, https://www.focus-economics.com/countries/hungary/news/monetary-policy/hungary-central-bank-meeting-25-08-2026-magyar-nemzeti-bank-cuts-rates-in-august/ (tier 3)
- Trading Economics, "Hungary Inflation Edges Higher in August", Sep-26, https://tradingeconomics.com/hungary/inflation-cpi/news/581899 (tier 3)
- OTP Bank, Inflation flash report, 10-Sep-26, https://www.otpbank.hu/static/privatebanking/other/reports/1439_FlashReport_Inflation_20260910.pdf (tier 3)
- Itaú Private Insights, Focus 21-Sep-26, https://blog.itau.com.br/privateinsights/focus-cambio-selic-pib-ipca-21-09-26 (tier 3)
- Soubrasilia, Copom cut to 13.75%, Sep-26, https://soubrasilia.com/?p=13281 (tier 3)
- DGABC, Focus Selic median 13.50%, Sep-26, https://www.dgabc.com.br/Noticia/4350953/mediana-das-expectativas-para-selic-no-fim-de-2026-segue-em-13-50-no-focus-do-bc (tier 3)
- Paraíba Business, Focus 11-Sep-26 survey, 14-Sep-26, https://paraibabusiness.com.br/focus-reduz-ipca-de-2026-para-490-mas-inflacao-em-12-meses-sobe-pela-sexta-semana-seguida/ (tier 3)
- Hürriyet Daily News, "Annual inflation eases below 30 pct in September", 05-Oct-26, https://www.hurriyetdailynews.com/annual-inflation-eases-below-30-pct-in-september-227724 (tier 3)
- Anews, "Türkiye's annual inflation slows to 29.73% in September", 05-Oct-26, https://www.anews.com.tr/economy/2026/10/05/turkiyes-annual-inflation-slows-to-2973-in-september/amp (tier 3)
- Trading Economics, "Turkey Inflation Eases More Than Expected" (Aug-26 CPI), 03-Sep-26, https://tradingeconomics.com/turkey/inflation-cpi/news/580788 (tier 3)
- Intellinews, CBRT holds 37% for fifth time, Sep-26, https://new.intellinews.com/articles/turkish-central-bank-sticks-to-37-policy-rate-for-fifth-straight-time-467058 (tier 3)
- Por Esto, Banxico holds 6.50%, 24-Sep-26, https://www.poresto.com/mexico/2026/9/24/banxico-mantiene-tasa-de-interes-en-650-y-preve-que-inflacion-llegue-a-la-meta-hasta-finales-de-2027.html (tier 3)
- El CEO, Banxico on Fed independence, 24-Sep-26, https://elceo.com/economia/banxico-deja-la-tasa-de-interes-en-6-50-la-politica-monetaria-no-tendria-que-reaccionar-a-los-ajustes-en-estados-unidos/ (tier 3)
- Forbes México, Citibanamex survey headline, undated, https://forbes.com.mx/analistas-ven-alza-de-25-puntos-base-a-tasa-de-banxico-en-proximo-anuncio-sondeo-citibanamex/ (tier 4, not relied on)
- Briefly News, SARB raises repo rate to 7.25%, 24-Sep-26, https://briefly.co.za/business-economy/money/254111-sarb-raises-repo-rate-725-what-means-bills-sa/ (tier 3)
- EWN, SARB holds in July, 23-Jul-26, https://www.ewn.co.za/2026/07/23/sarb-keeps-interest-rates-unchanged-surprising-markets-and-analysts (tier 3)
- Previous truth document, run 2026-10-09_0706, 09-Oct-26 (repo, tier 2)
- AGENTS.md section 3C, method and universe (repo, undated, tier 2)
