# CEEMEA corporate sector primers

Method notes, one per sector, for the CEMBI CEEMEA universe. Each primer says what drives credit in the sector, which metrics the model must compute, where the public data sits, and the questions to put to management. Numbers are never kept here; they live in `database/issuers/*.json` with their period and source. The general corporate method is `em-corporate-credit.md`; banks are `em-bank-credit.md`.

## 1. Oil and gas (upstream and integrated)

- Drivers: realised price versus Brent (differentials, hedges), production and reserves (1P/2P, reserve life), lifting and development cost per barrel, fiscal terms (royalty, PSC cost recovery, tax), licence expiry and government counterparty risk (Tullow Ghana, Kosmos, Pearl in Kurdistan, Seplat).
- Metrics: EBITDAX, net debt / EBITDAX through the cycle, FCF at Brent minus 20 dollars, reserve-based lending redeterminations, hedge book (volume, floors, tenor), decommissioning liabilities, receivables from the state or a state offtaker.
- Data: company reserves reports and operating updates, EIA and OPEC for price, the host's petroleum regulator for licences, the sovereign page for payment risk.
- Management: redetermination outcome, hedge cover for the next 24 months, cash-call arrears from JV partners, licence extension terms, FX repatriation.

## 2. Metals, mining and steel

- Drivers: commodity price deck (iron ore, met coal, gold, copper, PGMs), cost position on the global curve, FX (local costs against USD revenue), export logistics, war and sanctions (Metinvest, Ukraine; Russian names excluded), ESG tailings and power.
- Metrics: EBITDA per tonne, all-in sustaining cost (gold), net debt / EBITDA at spot and at a conservative deck, capex split into sustaining and growth, working-capital swings with price.
- Data: company production reports, LME and exchange prices, World Steel, the sovereign's export statistics.
- Management: cost guidance in USD, logistics capacity, capex deferral options, covenant headroom under a price fall.

## 3. Utilities and power

- Drivers: tariff regime and its indexation (YEKDEM feed-in tariffs in Turkey, regulated asset base elsewhere), offtaker credit (state utility arrears: Eskom, Ukrenergo, NEPCO), fuel pass-through, FX mismatch between USD debt and local tariffs, war damage (DTEK).
- Metrics: FFO / net debt, EBITDA / interest, receivable days from the offtaker, availability, tariff adjustments passed versus requested, FX hedging of debt service.
- Data: regulator decisions, offtaker payment statistics, central bank FX data, the sovereign page for support capacity.
- Management: tariff-review timetable, offtaker arrears and collection plan, USD liquidity, support letters versus guarantees.

## 4. Telecoms and towers

- Drivers: competition and ARPU in local currency against USD debt, spectrum payments, FX convertibility and repatriation (Nigeria, Egypt, Ethiopia), tower sale-and-leasebacks, data growth, regulation.
- Metrics: EBITDA margin, capex / revenue, net debt / EBITDA with and without leases, FX-adjusted interest cover, upstreaming of cash from operating subsidiaries, holdco versus opco debt.
- Data: company KPIs, regulator statistics, central bank FX rules.
- Management: repatriation backlog, spectrum renewal cost, dividend policy to the holdco, tower monetisation plans.

## 5. Real estate and construction (GCC-heavy)

- Drivers: off-plan sales and escrow rules, land bank, recurring rental income share, oil-linked demand cycle, government-related ownership (Emaar, Aldar, Damac, Dubai GREs), construction cost inflation.
- Metrics: net debt / total assets, net debt / recurring EBITDA, presales coverage of the construction cost to complete, cash collections against receivables, unsold inventory, gross margin by project.
- Data: company presales releases, land department transaction statistics (Dubai Land Department), central bank mortgage data.
- Management: presales cancellations, escrow release schedule, land payment obligations, dividend expectations from the state shareholder.

## 6. Consumer, retail, agriculture and food

- Drivers: real-wage growth and inflation, FX pass-through on imported inputs, harvest and crop prices (MHP, Trans-Oil, Kernel), logistics (Black Sea), price controls.
- Metrics: like-for-like growth, gross margin versus input cost, working capital seasonality, net debt / EBITDA at peak and trough, trade finance lines and their renewal.
- Data: FAO food prices, national statistics office retail and CPI series, port and export statistics.
- Management: pre-export finance renewal, crop insurance and hedging, FX cost base, store or capacity expansion funding.

## 7. Transport, aviation and infrastructure

- Drivers: traffic and yield (Pegasus), aircraft lease liabilities, fuel and FX exposure, concession terms for ports and airports, sanctions and route closures, war (Ukraine Rail).
- Metrics: EBITDAR and adjusted leverage including leases, cash per block hour, fleet funding plan, concession remaining life, minimum revenue guarantees.
- Data: IATA and civil aviation statistics, port throughput, company traffic releases.
- Management: fleet delivery schedule and funding, hedge policy, concession renegotiation, government support in a demand shock.

## 8. Chemicals, fertiliser and refining

- Drivers: feedstock advantage (gas price in the GCC, Nigeria), product spreads (urea, polyethylene, refined product cracks), ramp-up risk on new plants (Dangote), import parity and subsidies, FX availability for crude purchases.
- Metrics: EBITDA per tonne, utilisation, spread sensitivity, net debt / EBITDA on run-rate versus reported, project completion and cost overruns.
- Data: pricing agencies (Argus, Platts; paywalled, ask Reza), company production and utilisation updates, the sovereign's fuel-subsidy policy.
- Management: utilisation path, feedstock contracts, FX sourcing, debt amortisation profile against the ramp-up.

## 9. Holding companies, conglomerates and quasi-sovereigns

- Drivers: dividend capacity of subsidiaries, structural subordination, cross-default and guarantees, state ownership and the index classification (EMBI versus CEMBI), reputational and political risk.
- Metrics: holdco cash and dividends received / holdco interest, loan-to-value against listed stakes, recourse map (which entity owes what), support history from the state.
- Data: subsidiary filings, stock exchange disclosures, the sovereign page for support capacity and willingness.
- Management: upstreaming constraints, asset disposal plans, state support mechanics in writing.

## 10. Output standard

A sector note states the driver that matters this quarter, the model's metric set with sources and periods, the issuer's position against peers on the comparison page (`comps.html`), the sovereign-ceiling judgement, the management questions, and the view with confidence. Every number has a period and a source or it is a question.
