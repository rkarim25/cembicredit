---
topic: KazMunayGas
slug: kazmunaygas
updated: 09-Oct-26
run: 2026-10-09_0926_kazmunaygas
status: Draft
open_items: 7
---

# KazMunayGas

_Updated 09-Oct-26 · run 2026-10-09_0926_kazmunaygas_

## Open items
1. [REZA] Moody's and Fitch current ratings and outlooks for KMG (Bloomberg RATC). Is Baa1 stable correct, and does Fitch still rate KMG?
2. [REZA] Did your captures cover the Kazakhstan sovereign upgrade (agency, date, new rating)? This sets how much of the S&P uplift is sovereign-driven rather than stand-alone.
3. [BBG: KZOK 5.75 04/19/2047 / YAS price, yield and Z-spread] Current levels after the S&P upgrade, against the Kazakhstan sovereign curve. The repo values (88.5 / 6.75% / 270bp) are unsourced.
4. [BBG: KZOK 5.375 04/24/2030 / YAS price and amount outstanding] Post-tender size, and trading against the USD 982–1,012 tender prices.
5. [MANAGEMENT] Tenor, coupon, ranking and liquidity of the Samruk-Kazyna coupon bonds bought in H1-26, and whether they are netted in reported net debt.
6. [MANAGEMENT] H2-26 production and sales guidance after the CPC disruption, and the expected Tengizchevroil dividend.
7. [MANAGEMENT] What debt the 2030 buyback is meant to reduce, and whether a new issue is planned.

## View
Credit direction is stable to improving. This view is Medium confidence, because the H1-26 figures were read from summaries and not from the release tables.
- S&P upgraded KMG to BBB (stable) from BBB- on 02-Sep-26. The upgrade followed the sovereign upgrade and lifted the stand-alone profile from bb+ to bbb-.
- H1-26 EBITDA was KZT 1,655bn (+45% y/y) and free cash flow KZT 765bn. Tengizchevroil-led JV dividends of KZT 500bn support cash generation.
- KMG accepted USD 500m of its USD 1.25bn 5.375% 2030 notes in the early tender, which modestly cuts the near-term maturity stack.
- The biggest risk is Kazakh upstream and CPC export disruption. July output fell 14% from June, and the 2026 output target was cut to 96 mt from 98 mt.
- Net debt of KZT 983bn (+162%) reflects cash moved into Samruk-Kazyna coupon bonds. That is a related-party exposure to the parent, and its liquidity is unverified.
- The repo issuer file (BBB-/Baa2; 2021A–2024A series) is not usable. It looks model-generated and is not from filings. A filings-based model must be built.
- This is a single-voice position. The Gemini position was not in the material, and the judge did not re-verify the cited primary documents.

## What changed
First version.

## Analysis
### Ratings
- S&P: upgraded to BBB, stable outlook, from BBB- on 02-Sep-26. The stand-alone credit profile moved from bb+ to bbb- (KMG notice on KASE, 02-Sep-26, https://kase.kz/en/information/news/show/1574953, Medium; read via a search summary).
- Moody's: Baa1 stable is likely, against Baa2 in the repo. Evidence is an undated snippet (https://www.trend.az/casia/kazakhstan/4218336.html, Low).
- Fitch: sources conflict. Energy Intelligence reports Kazakhs ditching Fitch (undated, Low), while another snippet shows a Fitch BBB stable affirmation (undated, Low). The status is unresolved.

### H1-26 results (KMG release, 18-Aug-26, https://kase.kz/files/emitters/KMGZ/kmgz_relizs__180826_eng.pdf; summaries at https://kase.kz/en/information/news/show/1573640, Medium)
- Revenue was KZT 5,568bn (+23.7%).
- EBITDA was KZT 1,655bn (+45%), and adjusted EBITDA KZT 1,619bn.
- Net profit was KZT 904bn against KZT 534bn. Net profit excluding JV income was KZT 867bn.
- Free cash flow was KZT 765bn (+12.2%).
- Dividends from JVs and associates rose 5.4% to KZT 500bn, mainly Tengizchevroil.
- Cash capex was KZT 422bn (+61%).
- Net debt was KZT 983bn (+162%), which the release attributes to lower cash and short-term deposits after buying Samruk-Kazyna coupon bonds.
- Not checked: whether the EBITDA jump contains one-offs such as FX gains or trading margin. KMG's own oil and condensate sales fell 5.7% in H1.

### Capital structure and liability management
- Offer launched 19-Aug-26 for up to USD 500m of the USD 1.25bn 5.375% 2030 notes. USD 658.075m was tendered by the 02-Sep-26 early tender time, and USD 500m was accepted after proration. The early price was USD 1,012 per 1,000, including a USD 30 premium. The late price is USD 982 (https://kase.kz/en/information/news/show/1574994; https://www.kmg.kz/en/press-center/press-releases/obli-26/, Medium).
- A report that holders were invited to tender up to USD 1.25bn is treated as a summary error, pending the release.
- No gross debt, maturity profile or cash by currency was obtained.

### Operating and event risk
- July oil and condensate output fell 14% from June, with Tengiz -18%, Kashagan -25% and Karachaganak -18% (BOE Report, 03-Aug-26, https://boereport.com/2026/08/03/kazakhstans-oil-and-gas-condensate-output-fell-14-in-july-from-june-source-says/amp/, Medium).
- The Energy Minister cut the 2026 output target to 96 mt from 98 mt (Times of Central Asia and Petroleum Economist snippets, Low–Medium). Tengiz output was later restored (PGJ Online, Aug-26, Low).
- KMG acquired Phystech II in Jun-26 and divested it effective 25-Sep-26. This looks immaterial to credit (Trend.az, Sep-26, https://www.trend.az/casia/kazakhstan/4229696.html, Medium).

### Repo data quality
- `database/issuers/kmg.json` carries rating BBB- / Baa2, a 2024A EBITDA of exactly 4,800.0 and an identical 1.5% reconciliation variance in every year. These are signs of model-generated data (direct inspection, High). The 2024A net leverage of 1.45x and the series should not be relied on.
- The USD 3.4bn of H1-26 EBITDA implied by the release is inconsistent with the stored USD 4.8bn full-year 2024A figure. The conversion rate was not sourced, so this is a flag and not a conclusion.

### Data gaps
- The KASE PDFs were not parsed, so all H1 figures come from summaries.
- No Cognitive Credit model exists. A model must be built from the FY2025 annual report and H1-26 IFRS interim statements (kmg.kz IR and KASE), not yet fetched.
- Not found: Kazakhstan sovereign upgrade details, NBK base rate, latest IMF Article IV, Bloomberg levels, debt maturity profile, and any news dated October 2026.

## Where the models disagreed
Only one position (claude) was supplied, so there was no disagreement to adjudicate. Its unresolved conflicts, on Fitch status and Moody's rating, are recorded as open items under the tier 3–4 rule.

## Management questions
1. What are the terms, liquidity and netting treatment of the Samruk-Kazyna coupon bonds, and do they count as cash in the net debt definition?
2. What is the H2-26 production, sales and Tengizchevroil dividend outlook after the CPC disruption?
3. What does the 2030 buyback aim to achieve in debt reduction or refinancing, and is a new bond issue planned?
4. What is the policy on dividends to Samruk-Kazyna and on further related-party placements?

## Knowledge base updates
- [Snapshot] S&P upgraded KMG to BBB from BBB-, stable outlook, with the stand-alone credit profile raised to bbb- from bb+ (KMG rating notice on KASE, 02-Sep-26)
- [Snapshot] Moody's Baa1 stable reported by search summary, unconfirmed; repo shows Baa2 (Trend.az snippet, undated)
- [Financials] H1-26: revenue KZT 5,568bn, EBITDA KZT 1,655bn, net profit KZT 904bn, free cash flow KZT 765bn, JV and associate dividends KZT 500bn (KMG H1-26 release, 18-Aug-26)
- [Financials] Net debt KZT 983bn at H1-26, up 162%, after buying Samruk-Kazyna coupon bonds (KMG H1-26 release summary, 18-Aug-26)
- [Capital] USD 500m of the USD 1.25bn 5.375% 2030 notes accepted in the early tender, from USD 658.075m tendered; early price USD 1,012 per 1,000, late price USD 982 (KMG press release, 02-Sep-26)
- [Business] Kazakh oil and condensate output fell 14% in Jul-26 from June; 2026 national target cut to 96 mt from 98 mt (BOE Report, 03-Aug-26)
- [Business] KMG acquired Phystech II in Jun-26 and divested it effective 25-Sep-26 (Trend.az, Sep-26)

## Sources
- KMG rating notice, KASE, 02-Sep-26, https://kase.kz/files/emitters/KMGZ/kmgz_rating_020926_6486.pdf and https://kase.kz/en/information/news/show/1574953 (tier 2, via search summary)
- KMG H1-26 results release, KASE, 18-Aug-26, https://kase.kz/files/emitters/KMGZ/kmgz_relizs__180826_eng.pdf (tier 2, via summaries)
- H1-26 summaries: https://kase.kz/en/information/news/show/1573640 and https://chemxplore.com/news/kazmunaygas-first-half-financial-results (tier 2–3)
- KMG 2030 notes tender releases, 19-Aug-26 to 02-Sep-26, https://kase.kz/en/information/news/show/1574994 and https://www.kmg.kz/en/press-center/press-releases/obli-26/ (tier 2)
- BOE Report, 03-Aug-26, Kazakhstan output fell 14% in July (tier 3)
- Times of Central Asia and Petroleum Economist snippets on the 2026 output target; PGJ Online, Aug-26, on Tengiz restoration (tier 3)
- Trend.az, https://www.trend.az/casia/kazakhstan/4218336.html (Moody's, undated) and https://www.trend.az/casia/kazakhstan/4229696.html (Phystech II, Sep-26) (tier 3)
- Energy Intelligence, "Kazakhs Ditch Fitch Rating", undated, and financialintelligence.ro Fitch affirmation, undated (tier 3–4)
- Repo file `database/issuers/kmg.json`, last_updated 2026-09-19 (tier 2, flagged unreliable)
