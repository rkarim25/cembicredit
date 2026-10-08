# Sovereign credit analysis framework (hard-currency)

Method, not data. Use it to structure every sovereign page and every sovereign run. The order is the order of questions a seasoned EM sovereign analyst asks; the weights are a starting point, not a formula.

## 1. The question being answered

Hard-currency sovereign credit is the answer to one question: over the horizon of the bonds held, will the sovereign have the dollars and the willingness to pay, and if not, what will bondholders recover and when? Everything below feeds ability to pay (external and fiscal), willingness to pay (politics, institutions, track record), and recovery (debt structure, creditor composition, legal terms).

## 2. External position: can it find the dollars?

- Current account balance and its drivers: commodity terms of trade, remittances, tourism, services. Separate structural from cyclical.
- Financing of the deficit: FDI (sticky) versus portfolio (flighty) versus official (conditional). Net errors and omissions as a capital-flight tell.
- Gross external financing requirement (GEFR) = current account deficit + external debt amortisation due in 12 months (public and private, including short-term debt by remaining maturity). Compare with reserves.
- Reserves: gross, net of swaps and forwards, net of IMF credit, and "usable" after bank FX deposits at the central bank where relevant. Months of imports, cover of GEFR, cover of short-term debt (Greenspan-Guidotti). Watch the central bank's net forward book; it is where stress hides first.
- Exchange-rate regime: float, managed, peg, parallel market. A parallel-market premium above about 10 to 15 percent is a stress signal regardless of what the central bank says.
- External debt: public and private, by creditor (multilateral, bilateral official including China, Eurobonds, syndicated loans, trade credit), currency, and maturity. The share owed to multilaterals is senior in practice and shapes restructuring outcomes.
- Access: last Eurobond issue date and spread, recent syndications, whether the sovereign can roll, and at what cost. Market access is binary near distress.

## 3. Fiscal position: can it service the debt without inflating or defaulting?

- Primary balance versus the debt-stabilising primary balance: pb* ≈ (r − g) / (1 + g) × d, where r is the effective nominal interest rate on debt, g nominal GDP growth, d debt to GDP. The gap between actual primary balance and pb* is the first number to compute.
- Interest to revenue: the single best fiscal stress ratio for EM. Above about 20 percent is a warning; above 30 percent is where defaults cluster (Ghana, Sri Lanka, Egypt's problem, Nigeria's problem).
- Revenue base: tax to GDP, commodity dependence of revenue, informality, collection capacity. Low revenue sovereigns default at lower debt ratios.
- Spending rigidity: wages, pensions, subsidies (fuel, food, electricity), interest. What can actually be cut.
- Debt stock and composition: domestic versus external, fixed versus floating, currency, average maturity, holder base (banks, central bank, non-residents in local bonds). Domestic debt can be restructured too (Ghana, Sri Lanka, Zambia local treatment).
- Contingent liabilities: state-owned enterprises (power utilities, oil companies, airlines), guarantees, PPPs, bank recapitalisation, central bank losses, arrears to suppliers. Add them to the gross financing need.
- Gross financing need (GFN) = fiscal deficit + domestic and external amortisation. GFN above about 15 percent of GDP is a red flag in IMF DSAs.

## 4. Monetary and financial

- Policy credibility: inflation target versus outcome, real policy rate ex ante (policy rate minus 12-month expected inflation), central bank independence in practice (fiscal dominance, monetary financing, governor turnover).
- Banking system: sovereign exposure as a share of assets (the sovereign-bank doom loop), FX mismatch, dollarisation of deposits and loans, NPLs, capital. Banks are both a financing source and a contingent liability.
- Local-currency curve: whether non-residents hold local bonds, what the holder shift has been, and what the central bank's balance sheet absorbed.

## 5. Growth and structure

- Real growth, potential growth, and what drives it. Commodity concentration. Demographics. Export diversification.
- Growth matters through r − g and through social tolerance for adjustment; it does not by itself pay bonds.

## 6. Institutions, politics, willingness

- Election calendar and the constitutional path to power. Scheduled transitions versus coups.
- Policy track record: did the last programme finish, did reforms survive elections, how many finance ministers in five years.
- Rule of law, corruption, security. Measure them by consequence: contract enforcement, arbitration awards honoured, sanctions exposure.
- Geopolitical anchors: who bails this sovereign out, and on what terms (Gulf deposits, China, EU accession path, US strategic interest). An anchor changes the recovery distribution, not just the probability of default.
- Willingness is revealed, not stated: arrears to suppliers and contractors, delays on multilateral disbursements, hostile rhetoric toward creditors.

## 7. IMF and official sector

- Programme status: type (EFF, ECF, SBA, RSF, PCI), size in percent of quota, review schedule, disbursements pending, prior actions, waivers requested. Read the staff report's DSA tables, the "risk of debt distress" rating, and the financing assurances paragraph.
- Exceptional access criteria and the lending-into-arrears policies (LIA for private, LIOA for official) determine whether the Fund can lend while bonds are in default.
- Paris Club, Common Framework (G20), China's bilateral behaviour. Comparability of treatment drives what bondholders are asked for.

## 8. Market pricing and relative value

- Spread versus rating peers, spread versus the EMBI GD sub-index, z-spread history and percentile. Price versus recovery value for distressed names.
- Curve shape: inverted curves signal near-term default pricing; cash prices matter more than yields below about 70.
- Positioning and technicals: index weight, forthcoming issuance, buyback and liability management history, local holders versus foreign.
- Market levels come from Reza via [BBG] items. Never from memory.

## 9. Restructuring and recovery (when relevant)

See `frameworks/restructuring.md`. Key inputs: bond documentation (CACs single-limb or two-limb, aggregation thresholds, governing law, pari passu language, trustee versus fiscal agent), the sovereign's debt perimeter, the IMF DSA targets, comparability of treatment with official creditors, and precedent (Ghana, Zambia, Sri Lanka, Ukraine, Ethiopia, Suriname, Argentina, Ecuador).

## 10. Output standard for a sovereign page

A completed country page in `sovereigns/` has: snapshot (ratings by agency with dates, index weight, outstanding Eurobonds, programme status), the ten sections above with dated and sourced facts, a catalyst calendar, questions for the IMF mission or finance ministry meeting, data sources with refresh cadence, and the dated facts log the pipeline appends to. The view is in the latest report, linked at the top of the page.

## 10a. Monthly signals the dashboard computes

The dashboard (`sovereigns.html`) carries the monthly official series for every covered sovereign; use them before asking for Bloomberg data.

- Ex-ante real policy rate: policy rate less twelve-month inflation expectations where a run supplied them, else less the latest IMF CPI y/y (the note says which). Below zero with a current-account deficit is the classic pre-crisis configuration.
- REER z-score: latest real effective exchange rate against its trailing ten-year mean, in standard deviations (BIS broad basket where covered, else the IMF CPI-based index). Above +1.5 says overvalued relative to its own history; the level alone is not a forecast, read it with the current account and reserves.
- Reserves momentum: twelve-month change in gross reserves including gold at national valuation (IMF International Liquidity). Falling reserves with a stable FX rate means the central bank is defending the currency; read with the net reserves and swap positions a run should have asked for.
- Commodity terms of trade momentum: twelve-month change in the IMF net-export price index (net exports to GDP weights). It tells you whether the external shock is priced into the fundamentals yet.
- Reserves, three numbers, never one: (1) gross official reserve assets at market value (IMF reserve template line I.A, also the IL "reserves ex gold plus gold" series); (2) reserves net of predetermined one-year drains (template section II: scheduled FX loan, deposit and security repayments plus the net forward and swap book), which the dashboard derives as "Reserves net of 1y drains"; (3) the central bank's own net reserves definition, which differs by country (Turkey nets the banks' FX required reserves and swaps; Egypt and Nigeria publish gross only). A run that quotes "net reserves" states which of the three it means and the date. Where the country does not file the template (Ghana, Nigeria, Egypt and most frontier names) only (1) exists officially and (3) comes from the central bank's own release, captured by Reza or from the release itself.
- Current account: the IMF BOP quarterly series are net (credits less debits) in USD; the dashboard sums the last four quarters. Compare the sum with the WEO annual projection before quoting either.
- Banking system: IMF core FSIs (capital ratios, NPL ratio, provisioning, returns, net FX open position) for the sovereign-bank link.

## 11. Common analytical errors

- Treating gross reserves as usable. Net them.
- Comparing debt ratios across countries without revenue ratios.
- Ignoring domestic debt in sustainability, then being surprised by a domestic restructuring.
- Mistaking a parallel-market unification announcement for the event; the event is when the central bank stops selling at the official rate.
- Reading an IMF programme as a guarantee. It is a conditional financing line with a political half-life.
- Averaging two conflicting figures. Source the right one or ask.
