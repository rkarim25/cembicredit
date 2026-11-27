# Benchmark universe: EMBI and CEMBI, CEEMEA first

The funds are benchmarked to J.P. Morgan EMBI Global Diversified (hard-currency sovereign and quasi-sovereign) and CEMBI Broad Diversified (hard-currency corporate). The desk's core region is CEEMEA. This page maps the benchmarks to the knowledge base so every index name has a home. Index weights change monthly and are not public data: the figures the runs should quote come from the J.P. Morgan monthly index report or Bloomberg (`[BBG: JPEIGLBL Index / country weight]`), captured by Reza. Weights are therefore held on each sovereign or issuer page's dated facts log, never here.

Method notes: `frameworks/index-mechanics.md`. Data: `sovereigns.html` (official data for every sovereign below), `comps.html` (corporate peers), `themes/macro-monitor.md`, `themes/corporate-monitor.md`.

## EMBI Global Diversified, CEEMEA constituents

Grouped by how the desk trades them. "Page" links to the sovereign knowledge page; every one of these has a data record and a dashboard row.

### Investment grade (large weights, spread product traded against US credit and GCC peers)

| Sovereign | Rating band | Page | What matters |
|---|---|---|---|
| Saudi Arabia | A | [page](../sovereigns/saudi-arabia.md) | Fiscal breakeven oil price, PIF and quasi-sovereign supply (Aramco, PIF, SEC), Vision 2030 capex, GRE issuance crowding the sovereign |
| UAE (Abu Dhabi, Dubai, Sharjah; quasi: Mubadala, ADNOC, DP World) | AA to BBB | [page](../sovereigns/uae.md) | Abu Dhabi is the anchor; Dubai's GRE debt and real-estate cycle; Sharjah's deficits; emirate-level pages when needed |
| Qatar | AA | [page](../sovereigns/qatar.md) | LNG expansion (North Field), hydrocarbon revenue, QIA, low supply |
| Kuwait | A+ | [page](../sovereigns/kuwait.md) | Debt law, drawdown of the General Reserve Fund, oil dependence, rare issuance |
| Israel | A | [page](../sovereigns/israel.md) | War-related fiscal expansion, rating pressure, shekel, US support; largest non-GCC IG weight |
| Kazakhstan | BBB | [page](../sovereigns/kazakhstan.md) | Oil and the National Fund, tenge, Russia exposure, quasi-sovereigns (KazMunayGas, KMG, Development Bank) |
| Poland, Hungary, Romania | A to BBB- | [Poland](../sovereigns/poland.md), [Hungary](../sovereigns/hungary.md), [Romania](../sovereigns/romania.md) | EU funds, fiscal slippage (Romania's deficit), rating trajectory, euro issuance versus USD |
| Oman | BB+ to BBB- | [page](../sovereigns/oman.md) | Debt reduction with oil above breakeven, rising-star trade, Oman Investment Authority |
| Morocco | BB+ | [page](../sovereigns/morocco.md) | IMF FCL, phosphates, tourism, drought |

### High yield and crossover (the HY CEEMEA core; 34 pages)

Turkey, South Africa, Egypt, Nigeria, Ghana, Kenya, Côte d'Ivoire, Senegal, Angola, Ukraine, Serbia, Bahrain, Jordan, Iraq, Uzbekistan, Azerbaijan, Georgia, Armenia, Gabon, Cameroon, Ethiopia, Zambia, Mozambique, Tunisia, Benin, Rwanda, North Macedonia, Albania, Montenegro, Namibia, Tajikistan, Pakistan (EMBI, South Asia), Lebanon (in default). Pages: `sovereigns/_universe.md`. Each has a report (`reports/<country>-sovereign-credit.md`) refreshed by rotation.

### Quasi-sovereigns in EMBI (not CEMBI)

State-owned issuers with explicit or implicit support sit in EMBI by index rule when the state owns a majority. CEEMEA examples: Saudi Aramco, PIF, SEC, Mubadala, ADNOC, DP World, QatarEnergy, KazMunayGas, Eskom (guaranteed bonds), Transnet, Ukrenergo, Naftogaz, Türkiye Wealth Fund entities, Ziraat and Vakıf (bank quasi-sovereigns are in EMBI only when majority state-owned; check the index classification per bond). These get issuer pages under `issuers/` and are analysed with `frameworks/em-corporate-credit.md` section on quasi-sovereigns plus the sovereign page.

## CEMBI Broad Diversified, CEEMEA

The corporate universe lives in `database/issuers/*.json` (177 issuers today: 121 corporates, 56 banks; 177 CC/Filings-backed, 0 Legacy) and on the screener. The table by region and sector with the latest stored quotes is `themes/corporate-monitor.md`. Sector method notes: `frameworks/ceemea-sector-primers.md`; banks: `frameworks/em-bank-credit.md`.

| CEEMEA country | Where CEMBI weight sits | Issuers covered (examples) |
|---|---|---|
| Turkey | Banks (senior and Tier 2), conglomerates, utilities, airlines, consumer | Pegasus, Zorlu Enerji, Turkish banks |
| UAE | Banks, real estate, GREs not in EMBI, aviation, ports | Emaar, DAE, banks |
| Saudi Arabia | Banks (Tier 1 sukuk), petrochemicals, utilities | SABIC, banks |
| Qatar, Kuwait, Bahrain, Oman | Banks, telecoms, real estate | banks, Ooredoo, Omantel |
| South Africa | Banks, mining, telecoms, retail | Sasol, MTN, banks |
| Nigeria | Banks, oil refining and fertiliser, telecoms | Dangote Refinery, Dangote Fertiliser, banks |
| Ghana, Kenya, Zambia, Angola | Oil, banks, mining | Tullow, Pearl (Iraq), Kosmos |
| Ukraine | Steel, agriculture, utilities, rail | Metinvest, MHP, DTEK, Ukraine Rail |
| Israel | Banks, technology, real estate | Teva (pharma), banks |
| Kazakhstan, Georgia, Armenia, Azerbaijan, Uzbekistan | Banks, oil and mining, utilities | KMG, Georgian banks, Uzbek banks |
| CEE (Poland, Hungary, Czech, Romania) | Banks, utilities, telecoms (much of it euro-denominated, outside CEMBI's USD universe) | OTP, PKO, PGE |
| Iraq, Jordan, Egypt, Morocco, Tunisia | Oil, banks, telecoms, chemicals | Pearl Petroleum, OCP, banks |

## CEMBI CEEMEA coverage today and gaps

Covered in `database/issuers` (27-Nov-26, 177 issuers — 100% CC/Filings): Turkey 34 (incl. TSKB, WE Soda [UK/TR], Ford Otosan, Mersin Port, Ülker, Ziraat Bank, Anadolu Efes, Arçelik), UAE 27 (incl. ADNOC Distribution, Masdar, Dubai Aerospace Enterprise [DAE], e&/Etisalat, ADNOC Gas, DEWA, ADIB, ADNOC Murban, AD Ports, Dubai Holding, Mashreqbank, Mubadala/MDGH), South Africa 17 (incl. Prosus/Naspers, Impala Platinum, Sibanye-Stillwater, AngloGold Ashanti, Petra Diamonds, Absa, Nedbank, Sappi, Transnet), Saudi Arabia 13 (incl. Alinma Bank, Banque Saudi Fransi [BSF], Saudi Aramco, PIF, Ma'aden), Israel 8 (incl. Energean Israel Finance, Leviathan Bond Ltd, ICL Group, Teva, Bank Leumi, Bank Hapoalim, Israel Discount Bank, Mizrahi Tefahot), Nigeria 8 (incl. Access Holdings, First HoldCo, Seplat, UBA, Zenith), Kuwait 6 (incl. Boubyan Bank, NBK, Burgan Bank, KIPCO), Ukraine 7 (incl. Vodafone Ukraine, Naftogaz, Ukrenergo, Metinvest, MHP, DTEK, Ukrainian Railways), Kazakhstan 6 (incl. Tengizchevroil, DBK, Kaspi.kz, KMG, Halyk, QazaqGaz), Qatar 5 (incl. Qatar Islamic Bank [QIB], Commercial Bank of Qatar, QatarEnergy, QNB, Ooredoo), Georgia 4 (incl. Georgian Railway, Bank of Georgia / Lion Finance, Georgia Capital, TBC Bank), Uzbekistan 4 (Navoi Mining, NBU, SQB, Uzbekneftegaz), Poland 4 (incl. Bank Pekao, PKO Bank Polski, ORLEN, PGE), Oman 4 (incl. Energy Development Oman [EDO], Bank Muscat, Omantel, OQ), Pan-Africa 4 (incl. Africa Finance Corporation [AFC], Ecobank/ETI, Afreximbank, Helios Towers), Angola 3, Hungary 3 (MVM Group, MOL, OTP Bank), Bahrain 2 (Aluminium Bahrain [Alba], Bapco Energies), Morocco 2 (Attijariwafa Bank, OCP), Azerbaijan 2 (SOCAR, International Bank of Azerbaijan / ABB), Egypt 2 (Banque Misr, CIB Egypt), Czech Republic 2 (EP Infrastructure [EPIF], ČEZ), Romania 2, Ghana 2, Côte d'Ivoire 1 (Endeavour Mining), and single names in Iraq, Moldova, Brazil, Bermuda, Ireland. The full list with quotes is `themes/corporate-monitor.md`.

Index names with no record yet (build from filings with `/run credit <issuer>`, Cognitive Credit first where covered; priority order is by likely CEMBI weight):

- Armenia / Uzbekistan: Ameriabank (within Lion Finance / BGEO); Ipoteka Bank (within OTP); UzAuto Motors.
- Kazakhstan: Tengizchevroil, KMG, Halyk, QazaqGaz, Kaspi.kz, and DBK are all covered (Samruk-Energy / KEGOC secondary).
- GCC: Dubai Islamic Bank, ADNOC Distribution, Masdar, DAE, EDO, Alba, QIB, Alinma, BSF, Saudi Aramco, PIF, ADNOC Murban, ADNOC Gas, AD Ports, e&, DEWA, ADIB, Dubai Holding, Mubadala/MDGH, QatarEnergy, QNB, CBQ, NBK, Boubyan Bank, Burgan Bank, KIPCO, Majid Al Futtaim, Mashreqbank, Ma'aden, Saudi Electricity, Ooredoo, Bank Muscat, Omantel, OQ covered; secondary GCC names: Saudi Awwal Bank (SAB), Emirates Airlines, Bank ABC (Bahrain), Nakilat.
- Israel: Teva, Leumi, Hapoalim, Discount, Mizrahi, Energean Israel, Leviathan Bond, ICL Group covered.
- Africa: AFC, Endeavour Mining, Banque Misr, CIB Egypt, Attijariwafa Bank, Ecobank/ETI, and all 17 SA/5 NG banks & corps covered; secondary: Fidelity Bank Nigeria, Trade & Development Bank (TDB).
- CEE: EPIF, CEZ, ORLEN, MOL, OTP, Pekao, PKO BP, MVM, Romgaz, Hidroelectrica covered; secondary: e& PPF Telecom Group, Digi Communications, Banca Transilvania.

## GBI-EM Global Diversified, CEEMEA local markets

South Africa, Turkey, Poland, Hungary, Czech Republic, Romania (and Serbia since its 2024 inclusion; Egypt and Nigeria are not constituents because of convertibility) are the CEEMEA local-currency markets the desk trades against GBI-EM. Their official data (policy rate, CPI, REER z-score, reserves, BOP) sits on the sovereign dashboard and in `themes/macro-monitor.md`; the method is `frameworks/local-currency-rates-fx.md`; the desk page is `local_em.html`. Local yields and FX forwards are market data: `[BBG]` items for Reza.

## What a run should do with this page

- Record the EMBI GD and CEMBI BD weights and the index flags (IG/HY, diversified cap) on the sovereign or issuer page with the report date, from Reza's capture of the monthly index report.
- Treat month-end rebalances, new issues entering and exclusions as dated catalysts in `themes/calendar.md`.
- When a CEEMEA sovereign or corporate is not covered here, create its page (`pipeline/make_sovereign_pages.py` or `pipeline/make_issuer_pages.py`) before analysing it, so the facts have a home.

## Gaps (to fill with sourced facts, not from memory)

- Index weights by country and the top issuer weights: `[BBG: JPEIGLBL Index / JPM index report]`.
- Eurobond curves and spread levels for every sovereign: the dashboard's market columns are empty until Reza answers the `[BBG]` items.
- Emirate-level pages (Abu Dhabi, Dubai, Sharjah) and the GCC quasi-sovereign issuer pages.
