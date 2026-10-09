---
topic: Local-currency EM rates: ex-ante real rates and FX carry ranking
slug: local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
updated: 09-Oct-26
run: 2026-10-09_0706_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
status: Draft
open_items: 8
---

# Local-currency EM rates: ex-ante real rates and FX carry ranking

_Updated 09-Oct-26 · run 2026-10-09_0706_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank_

## Open items
1. [REZA] Is the ranking for outright local-bond positioning, FX-only carry, or both? The duration leg changes the order.
2. [REZA] Paste the previous `reports/` version of this topic, or confirm its open items, so they can be carried forward or closed. The brief held no prior document.
3. [BBG: GBI-EM 17 currencies (USDBRL, USDMXN, USDTRY, etc.) / spot, 3M forward points, 3M implied vol] Needed for the carry-to-vol ratio.
4. [BBG: ECFC <country> / 12M forward CPI consensus, 17 countries] Needed for ex-ante real rates.
5. [BBG: policy rate by country, 17 constituents / current level and last change] No policy rates were supplied.
6. [BBG: FDTR and WIRP / Fed implied path to Jun-27] Sets the common USD factor.
7. [BBG: GBI-EM local 10Y yields, 17 countries / yield] Needed for the duration leg.
8. [REZA] Provide Bloomberg headlines or text for the last 90 days on Turkey and Egypt policy and FX. Both need a sustainability test before they enter the ranking.

## View
- No ranking is published. The brief held no policy rates, CPI forecasts, FX forwards or volatility, and no independent search results were available this run. Any figure would break the never-invent-a-number rule.
- Method: ex-ante real rate = policy rate minus 12M forward CPI. Rank FX carry by 3M forward points over implied volatility, then adjust for REER z-score and terms-of-trade momentum.
- Provisional structural view (Low): high real rate, credible central bank and stable or improving REER ranks above low-real-rate Asian funders. The funders are the likely short-side currencies.
- Candidates to test first: Latin America, Hungary, Turkey. Turkey and Egypt are excluded until sustainability is evidenced.
- Biggest risk: a USD or risk-off shock hits the high-carry group together. A diversified long-carry basket holds less independent risk than 17 names suggest.
- Second risk: a 1pp 12M CPI miss reorders markets where real rates are 2 to 3pp.
- Confidence in the view: Low. It is method and inference only.
- The brief's issuer files (Emirates NBD, Sobha) are UAE hard-currency credit and were not used.

## What changed
First version.

## Analysis
### Method (house framework)
- Ex-ante real policy rate = nominal policy rate minus 12M forward CPI (AGENTS.md section 3C, repo, undated, Medium, method only).
- Carry is measured separately as 3M forward points divided by 3M implied volatility, which avoids mixing the rate and FX legs (Medium, method only).
- Overlay: REER z-score and terms-of-trade momentum from the `database/sovereigns/*.json` data layer. The signals exist in the repo but were not included in the brief (Medium, method only).
- Universe (17): BRL, MXN, COP, CLP, PEN; ZAR, PLN, CZK, HUF, RON, TRY, EGP; IDR, INR, MYR, THB, PHP (AGENTS.md section 3C).

### Provisional structure (inference only)
- High-real-rate markets with a stable or appreciating REER are the long-carry candidates. A REER z-score above about +1.5 would make the carry expensive and weaken the case (Low).
- Low or negative real-rate markets are the funding side (Low).
- Correlation: the Fed path and the USD drive the common downside across high-carry names. Realised pairwise correlations need checking, and below about 0.3 would argue for treating the names as independent (Low).
- Turkey and Egypt: high nominal real rates have historically coincided with policy reversals, capital controls or devaluation. The framework file cites Egypt and Nigeria FX rationing as precedents for transfer risk (knowledge/frameworks/em-bank-credit.md, undated, Low).
- Evidence needed to admit them: sustained reserve accumulation, a closed parallel-market gap, and CPI forecasts converging to target.

### Data gaps
- Policy rates, spot FX, 3M forwards and implied volatility for all 17 currencies.
- 12M forward CPI (central bank surveys or consensus) as of Oct-26.
- Fed path and USD level.
- Data-layer signals (ex-ante real rate, REER z-score) in the brief.
- Local 10Y yields.
- Independent 90-day news and filings search. Nothing is cited because no results were available; this must be re-run with search enabled.
- The previous report content.
- No Cognitive Credit model applies. Sovereign and rates inputs must come from central banks, ministries of finance, statistics offices and the IMF, with market levels from Reza via [BBG].

## Where the models disagreed
Only one position was supplied, and there was no material disagreement to resolve. The framework conclusions stand at Low confidence pending data.

## Management questions
None

## Knowledge base updates
None

## Sources
- AGENTS.md section 3C, GBI-EM framework and 17-country universe (repo, undated, tier 2).
- knowledge/README.md, index of frameworks and data layer (repo, undated, tier 2).
- knowledge/frameworks/em-bank-credit.md, transfer-risk precedents (repo, undated, tier 2).
- Brief issuer files database/issuers/enbd.json and sobha.json (repo, 19-Sep-26, tier 2). Reviewed and judged irrelevant; not used.
- No Bloomberg captures, web sources or independent news search were available this run.
