---
topic: Local-currency EM rates: ex-ante real rates and FX carry ranking
slug: local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
updated: 21-Oct-26
run: 2026-10-21_1000_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank
status: Draft
open_items: 11
---

# Local-currency EM rates: ex-ante real rates and FX carry ranking

Status: I checked the main disputed points against primary-ish pages, and the Turkey real rate needed correcting. Final document below.

# Local-currency EM rates: ex-ante real rates and FX carry ranking

_Updated 21-Oct-26 · run 2026-10-21_1000_local-currency-em-rates-ex-ante-real-rates-and-fx-carry-rank_

## Open items
1. [REZA] Is the ranking for outright local-bond positioning, FX-only carry, or both? The duration leg changes the order.
2. [BBG: GBI-EM 17 currencies (USDBRL, USDMXN, USDTRY, USDZAR, EURHUF etc.) / spot, 3M forward points, 3M ATM implied vol] Needed for the carry-to-vol ranking. No FX ranking is possible without it.
3. [BBG: SACPIYOY Index / Sep-26 headline and core, released 21-Oct-26] The print was not retrievable. It decides South Africa's real rate and whether the 4.6% expectation held.
4. [BBG: BZEXIP12 / latest Focus 12M-ahead IPCA] The last verified reading is 4.62% (21-Sep-26). A 4.59% reading dated 05-Oct-26 could not be verified.
5. [BBG: ECFC <country> / 12M-ahead CPI consensus, Mexico, Hungary, South Africa] Replaces the trailing proxies.
6. [BBG: USDTRY spot, TRY 3M forward points and CBRT net reserves ex-swaps] Needed to test whether Turkish carry is sustainable. Spot of about 49.5 per USD is unverified.
7. [REZA] Bloomberg or Reuters text on the CBRT 22-Oct-26 decision, and on any hold calls (SocGen, Goldman). Both are unverified here.
8. [BBG: HUCPIYOY / Sep-26 CPI] The 1.6% reading is unverified.
9. [BBG: policy rate, Colombia, Chile, Peru, Poland, Czechia, Romania, Egypt, Indonesia, India, Malaysia, Thailand, Philippines / current level and last change] 12 of the 17 markets are still unsourced.
10. [BBG: WIRP US / implied fed funds path to Jun-27] Sets the USD factor. Reports of a further hike by year-end and a 27–28 Oct FOMC rest on tier 4 sources.
11. [BBG: GBI-EM local 10Y yields, 17 countries] Needed for the duration leg.

## View
- Partial ranking on ex-ante real policy rates, five markets only. Turkey about 13.1pp (CBRT survey), Brazil about 9.1pp, Hungary about 4.2pp (trailing), Mexico about 3.1pp (trailing), South Africa about 2.8pp (trailing, Aug-26 CPI).
- Correction to the earlier position in this run: the 29.01% figure is the survey's 12M-ahead policy rate, not CPI. The 12M-ahead CPI expectation is 23.89%.
- Turkey's real rate is the widest, but it is sensitive to the cut cycle and the inflation measure. Against the CBRT's own 28% year-end forecast, the rate is about 9pp. A 100bp cut to 36% is the consensus for 22-Oct (Medium).
- Brazil is the highest-quality real rate: a slow easing path with the policy rate well above expectations (Medium).
- South Africa is the thinnest of the five after the hike, because CPI is only 4.4%. SARB flags inflation above 5% into early 2027, which compresses the ex-ante real rate (Medium–Low).
- Hungary held at 5.50% on 22-Sep-26 and cut the inflation target to 2.5% from 2028. Its real rate rests on depressed headline CPI (Medium).
- Biggest risk: a firmer dollar after the 16-Sep-26 Fed hike hits high-beta carry (BRL, TRY, ZAR) together.
- Confidence in the overall view: Low to Medium. There are no forwards, vol or yields, and only five of 17 markets.

## What changed
- Turkey: the 12M-ahead CPI expectation of 23.89% (CBRT survey, 16-Oct-26) replaces the trailing 29.73% proxy, which widens the ex-ante real rate to about 13.1pp from about 7.3pp. The position's "29.01% 12M-ahead" was a policy-rate expectation and was rejected.
- Turkey: the 22-Oct-26 meeting now has a sourced consensus of a 100bp cut to 36%. The survey path is 35% in December and 34.35% in January.
- Hungary: the 22-Sep-26 outcome is now found. The MNB held at 5.50% and cut the inflation target, which closes the open item.
- South Africa: Aug-26 CPI of 4.4% gives a trailing real rate of about 2.8pp. This ranks it last, not third as the position argued. The Sep-26 print is still missing.
- Brazil: the 4.62% Focus reading is retained. The newer 4.59% reading is unverified.
- Closed: the Hungary September decision. The Fed hike stays at High.

## Analysis
### Method
- Ex-ante real policy rate = policy rate minus 12M-ahead CPI expectation. Where no survey is sourced, trailing y/y CPI is used and labelled "trailing" (AGENTS.md section 3C, repo, Medium).
- FX carry rank = 3M forward carry divided by 3M implied vol, adjusted for REER z-score and terms-of-trade momentum from `database/sovereigns/*.json`. It is not computed, because no forwards or vol are sourced.
- Universe (17): BRL, MXN, COP, CLP, PEN; ZAR, PLN, CZK, HUF, RON, TRY, EGP; IDR, INR, MYR, THB, PHP.

### Real policy rate table
| Market | Policy rate (date) | Inflation input | Real rate | Basis | Confidence |
|---|---|---|---|---|---|
| Turkey | 37.00% (held 10-Sep-26) | 12M-ahead CPI 23.89% (CBRT survey, 16-Oct-26) | ~13.1pp | Ex-ante | Medium |
| Brazil | 13.75% (16-Sep-26) | Focus 12M-ahead IPCA 4.62% (21-Sep-26) | ~9.1pp | Ex-ante | Medium |
| Hungary | 5.50% (held 22-Sep-26) | CPI 1.3% y/y, Aug-26 | ~4.2pp | Trailing | Medium |
| Mexico | 6.50% (24-Sep-26) | CPI 3.42% y/y, 1H Sep-26 | ~3.1pp | Trailing | Medium |
| South Africa | 7.25% (24-Sep-26) | CPI 4.4% y/y, Aug-26 | ~2.8pp | Trailing | Medium–Low |

Arithmetic is policy rate minus the inflation input. Survey and trailing bases are not strictly comparable. The ranking mixes them and is indicative only.

### Turkey
- The CBRT market participants survey (16-Oct-26) shows year-end CPI of 29.63%, 12M-ahead CPI of 23.89% and 24M-ahead CPI of 17.94%. It expects a policy rate of 36% after the October meeting (Hürriyet Daily News, 16-Oct-26, Medium).
- Most economists expect a 100bp cut on 22-Oct-26. The survey path is 35% in December, 34.35% on 21-Jan-27, 29.01% at 12M and 27.93% at end-2027 (Hürriyet Daily News, week of 19-Oct-26, Medium).
- Sep-26 CPI was 29.73% y/y, below the 30.3% consensus, and the first print under 30% since Nov-21 (TurkStat via Hürriyet, 05-Oct-26, Medium).
- Judgement: the 13pp ex-ante real rate relies on a survey 12M expectation well below the CBRT's 28% year-end forecast (Intellinews, Sep-26). On the trailing basis it is about 7.3pp. The cut compresses it. Admission to the carry ranking still needs reserves and forwards (Low–Medium).

### Brazil
- Copom cut 25bp to 13.75% on 16-Sep-26, the fifth consecutive cut, unanimously. The Focus of 21-Sep-26 had 12M-ahead IPCA at 4.62%, 2026 IPCA at 4.92% and year-end Selic at 13.50% (BCB via press and Itaú, Sep-26, Medium).
- The 12M-ahead IPCA had risen for six weeks to 4.65% by 11-Sep-26 (Focus via Paraíba Business, 14-Sep-26, Medium).
- Judgement: the risk is expectations drift, not the policy path.

### Hungary
- The MNB held the base rate at 5.50% on 22-Sep-26. It cut the inflation target to 2.5% from 2028, slightly raised its 2027 forecast, and moves to eight meetings a year from 2027 (Tradingpedia, 23-Sep-26, Medium).
- Aug-26 CPI was 1.3% y/y, core 2.0% and services 5.0% (KSH via Trading Economics, Sep-26, Medium).
- Judgement: headline CPI is depressed by food and household energy. Core gives a lower real rate of about 3.5pp (5.50 − 2.0), which is the better ranking input (Medium).

### Mexico
- Banxico held 6.50% unanimously on 24-Sep-26, the third consecutive hold. Headline CPI was 3.42% and core 3.79% in 1H Sep-26 (Por Esto, 24-Sep-26, Medium).
- Judgement: on core the real rate is about 2.7pp, which is thin against a hiking Fed (Medium).

### South Africa
- The SARB raised the repo rate 25bp to 7.25% on 24-Sep-26. Aug-26 CPI was 4.4% and core 4.1% (Stats SA via Trading Economics and EWN, 23-Sep-26, Medium).
- The September CPI was released on 21-Oct-26. The Rio Times preview treated a print above 4.6% as hot (21-Oct-26, Low–Medium). The actual print was not found. The next SARB meeting is 19-Nov-26 (position, Low).
- Judgement: SARB expects inflation above 5%, so the forward real rate is lower than the trailing 2.8pp (Low–Medium).

### Common USD factor
- The FOMC raised the range 25bp to 3.75–4.00% on 16-Sep-26 by 12–0 (Federal Reserve, 16-Sep-26, High).
- Claims of a further hike by year-end, a 20–25% October pricing and a 27–28 Oct meeting rest on unretrieved pages and are not relied on (Low).
- Judgement: a hiking Fed narrows the carry cushion for Mexico and the Asian funders first, and raises correlation across the high-carry group (Medium).

### Not covered
- Twelve markets remain unsourced. Spot, forwards, vol and local yields must come from [BBG]. No Cognitive Credit model applies.

## Where the models disagreed
1. Turkey's 12M expectation: the position used 29.01% as 12M-ahead CPI (about 8pp real). The source shows it is the 12M policy-rate expectation, and 12M-ahead CPI is 23.89%. Resolved to the source (tier 3, specific over inferred).
2. South Africa's rank: the position put it third at 7.25% against CPI of about 4.5%. That gives about 2.8pp, below Hungary and Mexico, so it ranks last. Resolved by arithmetic on sourced inputs.
3. Hungary's September decision: the position said a hold, and the knowledge base had it unknown. A tier 3 source confirms the hold at 5.50%. Adopted at Medium. The 1.6% Sep CPI is unverified.
4. Brazil's 4.59% Focus reading and the Turkey hold calls and 49.5 lira level: unverified, so recorded as open items.

## Management questions
None

## Knowledge base updates
- [Monetary] Turkey: CBRT market participants survey 16-Oct-26: year-end CPI 29.63%, 12M-ahead CPI 23.89%, 24M-ahead CPI 17.94%, expected policy rate 36% after the October meeting (Hürriyet Daily News, 16-Oct-26)
- [Market] Turkey: survey policy-rate path of 35% at the Dec-26 meeting, 34.35% on 21-Jan-27, 29.01% at 12M and 27.93% at end-2027 (Hürriyet Daily News, week of 19-Oct-26)
- [Monetary] Hungary: MNB held the base rate at 5.50% on 22-Sep-26 and cut its inflation target to 2.5% from 2028 (Tradingpedia, 23-Sep-26)
- [Monetary] South Africa: CPI 4.4% y/y in Aug-26, core 4.1% (Stats SA via Trading Economics and Rio Times, 23-Sep-26)
- [Calendar] 22-Oct-26 CBRT MPC meeting, with a 100bp cut to 36% as the survey and economist consensus (Hürriyet Daily News, 16-Oct-26)
- [Calendar] 21-Jan-27 CBRT MPC meeting (Hürriyet Daily News, week of 19-Oct-26)

## Sources
- Hürriyet Daily News, "Türkiye's year-end inflation expectations hold steady at 29.6 percent", 16-Oct-26, https://www.hurriyetdailynews.com/turkiyes-year-end-inflation-expectations-hold-steady-at-29-6-percent-survey-228201 (tier 3)
- Hürriyet Daily News, "Markets focus on rate decision as economists see 100 bps cut", week of 19-Oct-26, https://www.hurriyetdailynews.com/markets-focus-on-rate-decision-as-economists-see-100-bps-cut-228258 (tier 3)
- Tradingpedia, MNB holds and shifts target, 23-Sep-26, https://www.tradingpedia.com/2026/09/23/forint-gains-as-mnb-shifts-target-pauses-rate-cuts/ (tier 3)
- Rio Times, South Africa inflation preview, 21-Oct-26, https://www.riotimesonline.com/south-africa-inflation-data-21-october-2026/ (tier 3)
- EWN, South Africa CPI held steady in August, 23-Sep-26, https://www.ewn.co.za/2026/09/23/south-africa-s-cpi-held-steady-in-august (tier 3)
- Stats SA, CPI P0141 August 2026, https://www.statssa.gov.za/publications/P0141/P0141August2026.pdf (tier 2, found in search, not opened)
- Federal Reserve, FOMC press release, 16-Sep-26, https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm (tier 2)
- Previous truth document, run 2026-10-09_0843, and its Sep–Oct 26 sources: Itaú Private Insights (Focus 21-Sep-26), Paraíba Business (14-Sep-26), Por Esto (24-Sep-26), Briefly News (24-Sep-26), Intellinews (Sep-26), MNB press release (25-Aug-26), Trading Economics (Hungary, Sep-26) (tiers 2–3)
- Position by claude, run 2026-10-21 (tier 4 where not independently verified)
- AGENTS.md section 3C, method and universe (repo, tier 2)
