# Generator for strict 2-column meeting notes data adhering 100% to Turkey Master Note standard
import os
import sys

part1_code = '''# Notes Data Part 1: Limak Renewable, Africell, Ittihad, Metinvest, Arada, Liquid Telecom
# Strict Turkey Master Note standard: 2-column Guidance table and 2-column Funding table.

NOTES_PART1 = [
    # 1. LIMAK RENEWABLE (17-Sep-2026)
    {
        "id": "limak_ren",
        "short_name": "Limak Renewable",
        "name": "Limak Yenilenebilir Enerji",
        "ticker": "LIMAKR",
        "country": "Turkey",
        "sector": "Utilities / Renewable Power Generation",
        "date": "17-Sep-2026",
        "is_corporate": True,
        "title": "Limak Renewable — Management Meeting, EM Investor Conference (17-Sep-2026)",
        "metadata": "Date: 17-Sep-2026 | Format: Group credit-investor meeting (IR / Corporate Finance Leadership) | Issuer Profile: Clean energy generation subsidiary of Turkish industrial conglomerate Limak Holding. Asset Portfolio: Operational hydro (Alpaslan-2 280MW, Cetin 420MW, Kargi 100MW, Tatar 128MW) and hybrid solar assets. Ratings: Fitch B / S&P B.",
        "key_points": [
            ("Robust cash generation from hydro baseload", "Operational portfolio anchored by flagship dispatchable hydropower plants (Alpaslan-2 280MW, Çetin 420MW, Kargı 100MW, Tatar 128MW) benefiting from dollar-linked YEKDEM feed-in tariffs, providing high-visibility cash flow and operating EBITDA margins above 75%."),
            ("Active project pipeline execution & capacities", "Two key hydro assets are under active construction: İncir HES (120 MW installed capacity on the Çoruh basin) has achieved over 70% physical completion with commercial operation (COD) targeted for 1-Apr-2027, while Tatar HES (128 MW dam commissioned in 2013 on Peri River) is adding ~20 MW hybrid floating solar PV."),
            ("Pervari mega-project tendering", "Advancing the 319 MW Pervari hydropower project on the Botan River in Siirt province (budget >$300m, COD 2029); electromechanical equipment tenders are active with primary EPC and turbine procurement contracts slated for finalization by end-2026."),
            ("International diversification into Kosovo", "Due to regulatory grid allocation bottlenecks for domestic hybrid solar projects with TEİAŞ in Turkey, Limak is redirecting growth capital toward Kosovo, developing solar and wind capacity to capture regional Balkan power prices."),
            ("Conservative project debt structure", "Debt profile consists primarily of long-tenor, amortising project finance facilities with DFI and commercial bank syndicates, matched against long-term YEKDEM dollar cash flow profiles."),
            ("Merchant power price dynamics", "Turkish spot electricity prices have stabilized following Q2 hydro-driven volatility, with Limak optimizing reservoir storage to sell into peak day-ahead hours at premium tariffs.")
        ],
        "takeaways": [
            ("Operational cash flow anchored by dollar-linked YEKDEM tariffs.", "Limak Renewable's operating fleet of hydropower plants—including the massive Alpaslan-2 (280 MW) and Cetin (420 MW) dams—operates with superior cash conversion. A significant portion of generation continues to benefit from statutory YEKDEM feed-in tariffs, which guarantee hard-currency floor revenues in USD terms, shielding the company from Turkish lira depreciation and domestic inflation."),
            ("İncir project tracks toward April 2027 commercial launch.", "The construction of the 120 MW İncir hydroelectric project on the Çoruh River basin has surpassed 70% physical completion, with tunnel boring and dam wall construction largely finalized. Management confirmed that the first generating turbine unit remains on track for commercial operation (COD) by 1 April 2027. Once commissioned, İncir will provide immediate incremental EBITDA under the updated YEKDEM tariff framework."),
            ("Pervari tender launch represents next capital expenditure cycle.", "The planned 319 MW Pervari hydro project in Siirt represents the next major growth leg for the group, with a total investment budget exceeding $300m and COD scheduled for 2029. Management is conducting electromechanical tendering and aims to award main turbine procurement contracts before year-end 2026. Financing will follow the group's standard template: 75–80% long-term non-recourse project debt with a 3–4 year construction grace period, backed by export credit agencies (ECAs) and local syndicates."),
            ("Pragmatic geographic pivot to Kosovo renewables.", "Facing delays from Turkish transmission operator TEİAŞ in allocating grid capacity for hybrid solar installations at existing dam sites (such as the ~20 MW hybrid addition at Tatar HES), Limak has proactively diversified across the Balkans. The company is advancing solar and wind projects in Kosovo, leveraging Limak Holding's existing footprint in the country (Pristina Airport and KEDS electricity distribution) to achieve favorable grid access and euro-denominated offtake contracts."),
            ("Prudent leverage and parent ring-fencing.", "Limak Renewable operates in a distinct corporate silo from the parent holding company's construction and infrastructure concessions. Net leverage sits at manageable levels (~3.0x net debt/EBITDA), with project cash flows ring-fenced to amortise project debt while allowing steady dividend upstreaming to the genco HoldCo.")
        ],
        "guidance_table": [
            ("EBITDA & Margin Outlook", "FY26 EBITDA guided to track steady y/y, supported by solid hydrology and reservoir dispatch optimization; EBITDA margins guided >75%."),
            ("Capex Commitments", "FY26–27 capex concentrated on İncir completion ($40–50m remaining spend) and initial civil earthworks for Pervari."),
            ("Commissioning Milestones", "İncir (120 MW) Unit 1 COD targeted for 1-Apr-2027; Tatar solar hybrid additions to complete in H2-27."),
            ("Pervari Project Budget", "Total project budget >$300m for 319 MW capacity; main electromechanical procurement closing end-2026; COD 2029."),
            ("Free Cash Flow (FCF)", "Sustained positive operational cash flow; project equity injections funded from genco cash reserves without parent dilution."),
            ("Net Leverage Trajectory", "Net debt to EBITDA targeted to remain around ~3.0x through the active construction cycle.")
        ],
        "funding_table": [
            ("Project Finance Debt", "Structured as long-term senior secured amortising bank consortium facilities; average remaining tenor 7–9 years matched to dollar YEKDEM revenues."),
            ("Refinancing Pipeline", "Evaluating debut green Eurobond issuance or syndicated DFI facility once İncir achieves commercial operation."),
            ("Liquidity Buffer & DSRA", "Robust cash reserves maintained at project level to satisfy mandatory 6-month debt service reserve accounts (DSRA)."),
            ("Parent Separation & Silo", "Ring-fenced financing silo; zero cross-guarantees with Limak Cement or Limak Port bond structures.")
        ],
        "watch_items": [
            "Execution of 120 MW İncir Unit 1 commercial commissioning by 1-Apr-2027.",
            "Award and contract finalization for the 319 MW Pervari electromechanical procurement by end-2026.",
            "TEİAŞ regulatory rulings on Turkish hybrid renewable grid capacity allocations.",
            "Autumn and winter precipitation levels across eastern Turkish river basins.",
            "Progress on Kosovo renewable project licensing and grid interconnection agreements."
        ],
        "in_our_view": [
            "Limak Renewable represents the gold standard of Turkish private power generation, distinguished by its massive baseload hydro assets (Alpaslan-2 280MW, Çetin 420MW, Kargı 100MW, Tatar 128MW) and premier engineering pedigree. The company's heavy reliance on dollar-linked YEKDEM feed-in tariffs insulates it almost entirely from Turkish sovereign macro volatility and currency depreciation, while its dispatchable reservoirs allow management to capture peak merchant spot pricing during high-demand hours.",
            "From a credit standpoint, the credit profile is conservative. Non-recourse project debt amortises predictably against guaranteed cash flows, and management's decision to pivot to Kosovo demonstrates sharp commercial agility in bypassing domestic grid bottlenecks. With 120 MW İncir set to enter service in April 2027 and add high-margin generation, Limak Renewable remains an exemplary defensive credit within the Turkish corporate universe. We maintain an Overweight stance on Limak generation assets."
        ]
    },

    # 2. AFRICELL (16-Sep-2026)
    {
        "id": "africell",
        "short_name": "Africell",
        "name": "Africell Holding Ltd",
        "ticker": "AFRCEL",
        "country": "Angola",
        "sector": "Technology / Telecoms",
        "date": "16-Sep-2026",
        "is_corporate": True,
        "title": "Africell — Management Meeting, EM Investor Conference (16-Sep-2026)",
        "metadata": "Date: 16-Sep-2026 | Format: Group credit-investor meeting (IR/Finance — Mahasi, Lucy) | Issuer Profile: Frontier Africa MNO (Angola, DRC, Sierra Leone, Gambia), UK HoldCo (Africell Holding Ltd). Bond Silo: Senior secured notes (AFRCEL 10.500% 2029, $360m o/s). Ratings: S&P B- (Stable) / Fitch B3.",
        "key_points": [
            ("Top line & commercial momentum", "Q3 2026 tracking higher than Q1 (an unusual trend overcoming the seasonal wet season in Sierra Leone and Gambia), driven by aggressive network rollout in Angola and competitor Unitel's 10-day network outage. A deliberate cyber attack struck Unitel on 28-Jul-2026 at 02:20 AM UTC—less than 24 hours prior to its planned BODIVA state IPO—paralyzing services for 21 million subscribers (76% market share). This triggered massive churn to Africell, spiking daily Angolan revenue to a peak of $880k before settling at a sticky run-rate of ~$740k/day (~$270m annualised). Africell maintains a 35–40% tariff discount against Unitel."),
            ("EBITDA & margin trajectory", "FY26 guidance is comfortable against the $159m LTM actual (35.7% margin), with management framing an FY27 EBITDA target of $220–250m as full-year benefits of Angola provincial expansion (launching Uíge and Zaire/Cabinda) and DRC infrastructure investments materialize."),
            ("Capex & tower strategy pivot", "DRC is pivoting from a 100% leased-tower model to building owned towers ($100–110k per site) to curb rising IFRS 16 lease liabilities (discounted at 10–11%) and create bargaining leverage against towercos. Angola is currently 68–70% leased, while Sierra Leone is ~100% owned."),
            ("FCF, cash upstreaming & liquidity", "More than $40m was upstreamed to UK HoldCo bank accounts during H1-26 in disciplined, high-frequency small clips with zero FX restrictions. Liquidity is supported by an undrawn $30m RCF (J.P. Morgan, Citi, Standard Bank), while balance sheet cash is intentionally managed around one year of bond coupons (~$38m) rather than hoarded."),
            ("Deleveraging targets", "Management aims to reduce gross leverage from ~3.5x to ~2.5x by Q2 2027, driven by organic EBITDA growth and internal cash generation, explicitly confirming that 2027 capex will be funded from cash flow rather than incremental borrowing."),
            ("Refinancing roadmap & US EXIM facility", "Reaching ~2.5x gross leverage in H1-27 will serve as the trigger to approach markets in H2 2027 to refinance and upsize the $360m bond to a $500m benchmark issue. This is anchored by a formally approved $99.6m US Exim Bank direct loan (authorized 11-Sep-2026 under the China and Transformational Exports Program / CTAP) at a 4.90% fixed rate, 7-year fully amortising tenor, financing 100% Nokia Western vendor equipment along the Lobito/Katanga critical mineral corridor."),
            ("Policy & tariff protection", "Actively lobbying the Angolan regulator (INACOM) ahead of upcoming elections to institute a regulated 'floor pricing' regime indexed to currency devaluation and fuel inflation (replicating their established framework in Sierra Leone).")
        ],
        "takeaways": [
            ("Angola network upgrade and competitor outage accelerate market share gains.", "Angola daily revenues spiked to $880k during a 10-day outage at incumbent Unitel. On 28-Jul-2026 at 02:20 AM UTC, Unitel suffered a catastrophic cyber attack on its core routing and billing architecture, shutting down connectivity for 21 million subscribers less than 24 hours before the Angolan state was scheduled to list its expropriated 49% stake on the BODIVA exchange. Africell absorbed massive SIM card demand, pushing run-rate revenues to ~$740k/day (~$270m annualised). Africell retains a 35–40% tariff discount against Unitel and is commissioning network expansions into Uíge and Zaire/Cabinda provinces in late September 2026. The Angolan footprint stands at ~1,500 sites today, with management targeting ~3,000 sites over time for nationwide ubiquity ($100–110k per site)."),
            ("US Exim Bank facility cements strategic geopolitical alignment.", "On 11-Sep-2026, the Board of Directors of the Export-Import Bank of the United States formally approved a $99.6 million direct loan to Africell under the flagship CTAP initiative. The facility carries a 4.90% fixed interest rate over a 7-year fully amortising tenor, structured exclusively around Western equipment manufactured by Finland's Nokia, with zero Chinese equipment across Angola and the mineral-rich Katanga corridor in the DRC (directly aligning with the G7/US-backed Lobito Rail Corridor). While the facility provides long-term strategic cover and ties the business directly to US policy interests, management emphasized that 2027 capex planning relies on internally generated cash flow rather than immediate Exim drawdowns."),
            ("DRC infrastructure model pivots to owned towers to discipline lease liabilities.", "While DRC has historically operated on a 100% leased-tower model, Africell is shifting to building its own towers ($100–110k/site) despite severe logistics challenges (lack of roads and rail to move steel inland from ports). Management framed this as a capital allocation discipline to cap IFRS 16 lease liabilities (which are discounted at 10–11%, on par with the Eurobond yield) and extract better commercial pricing from independent tower companies. DRC demand remains strong across all four operators, with management targeting the DRC to reach 40% of group revenue by year-end."),
            ("Disciplined liquidity management, solarization, and unhindered cash upstreaming.", "Over $40m was upstreamed to UK HoldCo bank accounts in H1-26 in continuous, small-batch transactions without central bank repatriation bottlenecks. Fuel costs represent only ~5% of opex, but the group is transitioning from diesel generators to solar power in Sierra Leone and DRC to eliminate opex volatility. Liquidity is reinforced by a committed, undrawn $30m RCF with J.P. Morgan, Citi, and Standard Bank. Management resists holding excess cash, targeting a liquidity buffer of approximately one year of bond coupons (~$38m) while directing all surplus cash into high-return network deployment."),
            ("Deleveraging roadmap points to H2-27 Eurobond refinancing and benchmark upsizing.", "Management targets bringing gross leverage down to ~2.5x by Q2 2027 (from ~3.5x LTM). Under their target capital structure, an FY27 EBITDA run-rate of $220–250m supports ~$800m of total debt capacity at a 3.5x gross ceiling. This would accommodate a refinancing and up-sizing of the existing $360m bond into a $500m benchmark Eurobond in H2 2027, alongside the $99.6m Exim facility, ~$200m of tower lease liabilities, and $40–50m of local working capital lines."),
            ("Pre-election push for regulated floor pricing to neutralize Kwanza depreciation.", "Ahead of upcoming Angolan elections, Africell is actively negotiating with telecom regulator INACOM to introduce a formulaic tariff floor. Modeled after Sierra Leone—where tariffs are periodically adjusted by the regulator to offset fuel inflation and currency slides—the Angolan floor would ensure voice and data rates automatically reset higher following Kwanza devaluations, protecting the hard-currency value of Angolan EBITDA.")
        ],
        "guidance_table": [
            ("Top line / Revenue", "FY26 tracking ahead of budget; Q3 outperforming Q1; Angola daily run-rate normalized at ~$740k (~$270m annualized); DRC targeting 40% of group revenue."),
            ("EBITDA & Margin", "FY26 guided comfortably above FY25 ($159m LTM, 35.7% margin); management targeting $220–250m EBITDA in FY27 as network expansions mature."),
            ("Capex (Total / Build)", "2026 funded from bond tap proceeds; 2027 capex to be funded entirely from internally generated operating cash flow ($100–110k/site)."),
            ("Working Capital & Upstreaming", ">$40m upstreamed to UK HoldCo bank accounts in H1-26; zero FX convertibility or central bank delays."),
            ("Cash Interest & Tax", "Bond coupon obligation ~$37.8m/yr ($360m @ 10.50%); lease liabilities discounted at 10–11%; US Exim facility fixed at 4.90%."),
            ("Gross Leverage Target", "Gross leverage targeted to decline from ~3.5x LTM to ~2.5x by Q2 2027, triggering the H2-27 benchmark refinancing.")
        ],
        "funding_table": [
            ("Outstanding Eurobond", "AFRCEL 10.500% 2029 (ISIN: XS2855412479) — $360m o/s ($300m initial Oct-2024 + $60m tap Jan-2026); price ~103.25, YTM 9.26%, spread 452 bps. First call: 23-Oct-2026 @ 105.0."),
            ("US Exim Bank Loan", "$99.6m direct loan approved 11-Sep-2026 under CTAP; 4.90% fixed interest rate, 7-year fully amortising tenor, 100% Nokia Western equipment."),
            ("Revolving Credit Facility", "$30m committed multi-currency RCF with J.P. Morgan, Citi, and Standard Bank; 100% undrawn."),
            ("IFRS 16 Tower Leases", "~$200m in capitalised lease liabilities (DRC 100% leased, Angola 68–70% leased, Sierra Leone ~100% owned); discount rate 10–11%."),
            ("Target Debt Capacity", "At 3.5x gross leverage on $220–250m FY27 EBITDA = ~$800m debt capacity ($500m Eurobond + $99.6m Exim + $200m leases + $40–50m local lines).")
        ],
        "watch_items": [
            "Q3-26 financial print: Check whether the $740k/day Angola run-rate held post-August and whether Q3 revenue surpassed Q1.",
            "October 23, 2026 call date: First call date on the AFRCEL 10.5% 2029s @ 105.0; refinancing is unlikely before 2027, making call exercise near-term improbable.",
            "Angola floor pricing adoption: Monitor INACOM regulatory rulings on floor pricing ahead of Angolan national elections.",
            "US Exim facility financial close: Execution of definitive loan documentation and disbursement schedules for the $99.6m 4.90% facility approved 11-Sep-2026.",
            "DRC owned tower execution: Progress on site construction vs logistics bottlenecks and the resulting impact on lease liability additions.",
            "Gross leverage print by Q2 2027: Track progress toward the 2.5x gross leverage milestone required for the H2 2027 benchmark refinancing."
        ],
        "in_our_view": [
            "Africell represents a rare, high-momentum frontier telecom credit that is successfully converting geopolitical alignment into tangible commercial and balance-sheet advantage. The combination of US Exim backing ($99.6m direct loan at 4.90% 7-year amortising debt approved 11-Sep-2026) and Nokia-exclusive deployment along the Lobito/Katanga corridor provides both structural funding advantages and geopolitical insulation against Chinese vendor exclusion risks. In Angola, the business has capitalized decisively on Unitel's pre-IPO operational paralysis following the 28-Jul cyber attack, demonstrating pricing power while maintaining a 35–40% tariff advantage that continues to attract net adds.",
            "From a Eurobond perspective, the AFRCEL 10.500% 2029 (yielding ~9.26% at 103.25, 452 bps spread) offers attractive, high-quality African high-yield carry backed by robust cash upstreaming (>$40m in H1-26) and a clean debt structure. The management's explicit roadmap to deleverage toward 2.5x gross leverage by Q2 2027 before accessing the market for a $500m benchmark refinancing in H2 2027 is credible given the underlying EBITDA growth to $220–250m. We maintain a positive stance on the 2029s, with the primary risk channel centered on pre-election Angolan Kwanza devaluation prior to the implementation of the tariff floor."
        ]
    },

    # 3. ITTIHAD INTERNATIONAL (16-Sep-2026)
    {
        "id": "ittihad",
        "short_name": "Ittihad",
        "name": "Ittihad International Investment LLC",
        "ticker": "ITTIHD",
        "country": "United Arab Emirates",
        "sector": "Industrial / Manufacturing Conglomerate",
        "date": "16-Sep-2026",
        "is_corporate": True,
        "title": "Ittihad International — Management Meeting, EM Investor Conference (16-Sep-2026)",
        "metadata": "Date: 16-Sep-2026 | Format: Group credit-investor meeting (CFO / Senior Leadership) | Issuer Profile: Abu Dhabi diversified industrial manufacturing conglomerate (paper, tissue, copper rods, chemicals, building materials). Bond Silo: ITTIHD 8.500% 2028 senior notes ($350m o/s). Ratings: Fitch B+ / S&P B+.",
        "key_points": [
            ("Operational resilience during Hormuz disruption", "Closure and shipping disruptions across the Strait of Hormuz prompted Ittihad to rapidly activate alternative logistics corridors through Fujairah, Dibba, and Jebel Ali, maintaining uninterrupted raw material imports (pulp, copper cathode) and product exports to Egypt, Saudi Arabia, and Jordan."),
            ("Industrial footprint & core capacities", "Operates dominant manufacturing market shares via Crown Paper Mill (100,000 MT/yr tissue jumbo rolls across Abu Dhabi and Ajman), Ittihad Paper Mill in ICAD II Abu Dhabi (320,000 MT/yr woodfree uncoated printing and writing paper, the largest in MENA), and Union Copper Rod (175,000 MT/yr copper rod facility operating on tolling margins)."),
            ("Pricing power & margin expansion", "Counterintuitively, EBITDA margins improved during the geopolitical crisis. While Ittihad incurred higher logistics costs, competing imported finished goods (notably Asian tissue and printing paper) were completely blocked by maritime disruptions, enabling Ittihad to implement full cost pass-throughs and gain substantial market share."),
            ("Bulk shipping cost advantage", "Ittihad's strategic shift toward importing raw materials via chartered bulk break-bulk vessels rather than containerised freight gave it a massive structural freight cost advantage over competitors who were stranded by sky-high container rates."),
            ("Healthy cash conversion cycle", "Cash conversion cycle remained stable at 23 days across H1 2026, fully in line with historical 2023–2025 performance. First-half working capital outflows were driven by strategic bulk raw material pre-purchases and inventory timing rather than structural cash burn."),
            ("Capital structure & Sukuk headroom", "Leverage remains well contained under 3.0x net debt/EBITDA (targeted 2.5x–2.8x at year-end); comfortable liquidity supported by strong relationship banking lines across Abu Dhabi and the $350m ITTIHD 8.500% 2028 notes.")
        ],
        "takeaways": [
            ("Logistical agility bypasses Strait of Hormuz choke points.", "When maritime security risks escalated in the Strait of Hormuz, Ittihad redirected its logistics architecture within days. Raw pulp for Crown Paper Mill (100k MT capacity) and Ittihad Paper Mill (320k MT capacity), alongside copper cathodes for Union Copper Rod (175k MT capacity), were rerouted to East Coast ports (Fujairah, Dibba) and cross-trucked inland. Export shipments of finished tissue rolls and paper reels to high-demand GCC and regional markets (Saudi Arabia, Jordan, Egypt) were shifted to overland trucking and specialized feeder vessels, avoiding port congestion."),
            ("Supply disruption creates domestic pricing moat and margin gains.", "The disruption of regional container shipping severely curtailed imports of finished consumer tissue and office paper from China, Indonesia, and India. With local distributors facing empty shelves, Ittihad exercised strong pricing power. All incremental transport surcharges and energy tariffs were passed directly into wholesale pricing, allowing operating EBITDA margins in the consumer goods and paper divisions to widen year-over-year."),
            ("Bulk raw material logistics delivers structural cost arbitrage.", "Management highlighted that importing bulk commodities (pulp, scrap, copper) in full-vessel charter shipments insulated the group from the container freight rate spikes that hobbled smaller regional converters. While bulk shipments cause periodic lumpy working capital outflows upon cargo arrivals, the unit freight cost savings more than compensate for the temporary inventory build."),
            ("Working capital seasonality and cash conversion stability.", "The reported negative change in working capital during H1 2026 was directly tied to the strategic pre-stocking of critical raw materials ahead of anticipated logistics bottlenecks. Management reiterated that the core cash conversion cycle remains tightly disciplined at 23 days. Receivables aging is healthy, backed by credit insurance and sovereign/corporate offtake contracts across the UAE and Saudi Arabia."),
            ("Capital structure discipline and banking support.", "Ittihad continues to operate with modest leverage relative to its industrial asset base. The $350m 8.500% 2028 senior notes are well covered by domestic operating cash flow and undrawn bilateral lines with Abu Dhabi government-linked banks, reflecting Ittihad's status as a core domestic industrial champion under the UAE's 'Operation 300bn' industrial strategy.")
        ],
        "guidance_table": [
            ("EBITDA Trajectory", "FY26 EBITDA guided to grow moderately over FY25, driven by market share expansion in paper/tissue and full freight cost pass-throughs."),
            ("Revenue Dynamics", "Top line supported by firm paper prices and higher nominal copper prices, though copper gross profit is purely conversion-fee driven."),
            ("Capex Budget", "Growth capex normalized following recent tissue mill expansions; FY26 capex primarily maintenance and debottlenecking ($40–50m)."),
            ("Working Capital Cycle", "Cash conversion cycle guided to remain within historical 20–25 days range (23 days actual H1-26); H2 working capital release expected."),
            ("Cash Taxes & Interest", "Minimal cash tax exposure under UAE corporate tax regime with industrial exemptions; cash interest ~$30m/yr ($350m @ 8.50%)."),
            ("Net Leverage Target", "Targeting net debt / EBITDA between 2.5x and 2.8x at year-end (comfortably within covenant ceilings).")
        ],
        "funding_table": [
            ("Outstanding Eurobond", "ITTIHD 8.500% due Nov-2028 (ISIN: XS2680456766) — $350m o/s; rated B+ (Fitch / S&P); trading near par (~8.30% YTM)."),
            ("Bank Facilities & Lines", "Over $200m in committed revolving working capital and trade finance lines across First Abu Dhabi Bank (FAB), ADCB, and Mashreq."),
            ("Debt Structure", "Long-term bond debt represents majority of funded debt; bank debt utilized strictly for self-liquidating trade finance and LC discounting."),
            ("Maturity Runway", "Zero debt maturities in 2026–2027; next refinancing focus is the November 2028 bond maturity.")
        ],
        "watch_items": [
            "H2-26 working capital unwind and inventory cash conversion prints.",
            "Shipping lane normalization around Hormuz and the impact on competing Asian imports.",
            "Global wood pulp benchmark price trajectory (NBSK and BHKP pricing).",
            "Execution of domestic paper supply contracts across GCC export markets.",
            "Maintenance of net leverage below the 3.0x threshold."
        ],
        "in_our_view": [
            "Ittihad has proven its operational mettle by transforming an acute geopolitical logistics shock into a commercial triumph. The management team's rapid mobilization of alternative logistics through Fujairah and Jebel Ali—coupled with bulk freight procurement—enabled the company to steal market share while competing imported goods were stranded. The resulting pricing power drove EBITDA margin expansion, dispelling investor fears regarding raw material cost inflation.",
            "The ITTIHD 8.500% 2028 notes (yielding ~8.30%) offer solid, defensive industrial carry. The business generates high-quality cash flow across essential non-discretionary product lines (tissue, packaging, basic industrial copper), supported by deep banking relationships in Abu Dhabi. With working capital set to normalize in H2 and no debt maturities until late 2028, we view Ittihad as a steady, reliable high-yield credit and maintain an Overweight recommendation."
        ]
    },

    # 4. METINVEST (15-Sep-2026)
    {
        "id": "metinvest",
        "short_name": "Metinvest",
        "name": "Metinvest B.V.",
        "ticker": "METINV",
        "country": "Ukraine",
        "sector": "Basic Materials / Steel & Mining",
        "date": "15-Sep-2026",
        "is_corporate": True,
        "title": "Metinvest — Management Meeting, EM Investor Conference (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Group credit-investor meeting (IR / Corporate Finance) | Issuer Profile: Vertically integrated Ukrainian steel and iron ore producer, Dutch HoldCo (Metinvest B.V.). Bond Silo: METINV Eurobonds (2027s, 2029s). Ratings: Fitch CCC / S&P CCC+.",
        "key_points": [
            ("Systematic industrial utility attacks", "Across August and September 2026, Russian missile and jet-drone attacks shifted from electrical grids to systematically striking steelmaking utilities (high-pressure natural gas mains, oxygen separation plants, and industrial water pipelines). Zaporizhstal JV was struck by 17 ballistic missiles/drones across four major barrages (11 Aug, 27 Aug, 12 Sep, 17 Sep; 8 steelworkers killed, 28 injured). Kamet Steel in Kamianske was hit on 5-Sep-2026 (5 killed, sintering plant and blast furnace #1M gas collectors damaged)."),
            ("Operating blast furnace count halved", "Pre-attack operations of 5 blast furnaces (3 at Zaporizhstal, 2 at Kamet Steel) have been reduced to 2 operating furnaces (1 at Zaporizhstal, 1 at Kamet Steel). Each damaged blast furnace requires $10–15m and 2–3 months to repair, but the Supervisory Board has paused reconstruction capex while utility strikes continue."),
            ("Pokrovske coking coal and Black Sea logistics disruption", "Pokrovske coking coal colliery operates under heavy frontline artillery threat; rail sidings have been damaged, forcing Metinvest to contract emergency metallurgical coal imports from Poland (JSW) and its US subsidiary United Coal Company (UCC), adding $35–45/t in border rail transshipment drag. In August, 6 to 8 coal vessels en route to Black Sea ports were trapped or resold at discounts, causing a severe working capital cash drain."),
            ("Liquidity position", "Closed June 2026 with $190m in cash after repaying the remaining 2026 Eurobond maturity in April. Management conceded this cash cushion cannot support operations for two years under continuous bombardment without cash flow recovery."),
            ("Coupon commitment & maturity profile", "Management explicitly reaffirmed its intention to pay the upcoming November 2026 Eurobond coupon. The following coupon falls in March 2027, with the next principal bullet maturity not due until October 2027 (METINV 2027s, ~$500m equiv.), providing a 12-month window to navigate operational recovery."),
            ("Postponed benchmark issuance", "A planned September 2026 new bond issue was shelved after secondary spreads narrowed from 600 bps over MHP to ~100 bps; the Supervisory Board concluded that locking in high coupon debt on long-term paper was uneconomic ahead of the recent attacks."),
            ("Bank lines & IFI constraints", "International IFIs (IFC, EBRD, DFC) refuse to provide balance sheet debt refinancing, restricting capital strictly to greenfield development or critical minerals. Local Ukrainian banks remain the primary source of liquidity, alongside an in-process solar equipment facility.")
        ],
        "takeaways": [
            ("Systematic targeting of steelmaking utilities disrupts production perimeter.", "Russian strikes in August and September shifted from civilian power grids to industrial utilities feeding steel plants—specifically targeting high-pressure natural gas, industrial oxygen, industrial water, and electricity conduits. At Zaporizhstal JV (non-consolidated), 17 missiles across four waves (11 Aug, 27 Aug, 12 Sep, 17 Sep) resulted in 8 fatalities and shut down the plant for two weeks before restarting 1 blast furnace; a second furnace was hours from restart when a follow-up strike hit. At Kamet Steel, a 5-Sep strike killed 5 workers and damaged blast furnace #1M gas collectors and sintering lines. Repair costs are estimated at $10–15m per furnace over 2–3 months, but management highlighted the futility of repairing assets if strikes recur immediately."),
            ("Severe August working capital drain and commercial reallocation.", "The sudden plant shutdowns created an acute liquidity drain in August. Between 6 and 8 bulk vessels carrying metallurgical coal were sailing toward Ukrainian Black Sea ports when the strikes occurred, forcing Metinvest to rapidly redirect cargoes, resell coal at discounts, or finance storage to avoid cash freeze. With Black Sea port capacity temporarily paralyzed, iron ore exports (which historically rely on maritime corridors for 40% of volume) were curtailed, shifting commercial sales exclusively to domestic steel consumption and rail corridors to Central Europe."),
            ("Pokrovske frontline proximity and emergency coking coal imports.", "The Pokrovske coking coal complex in eastern Ukraine—the group's sole domestic supplier of high-grade metallurgical coal—remains operational but under direct artillery and drone threat near the frontline. Metinvest has established contingency rail supply agreements with Polish coking coal producer JSW and commenced transatlantic maritime shipments from its US mining subsidiary United Coal Company (UCC). However, rail gauge changeover bottlenecks at the Polish-Ukrainian border add $35–45/t in logistics costs and constrain weekly throughput."),
            ("Liquidity buffer and November coupon payment commitment.", "Metinvest ended June 2026 with $190m of cash on balance sheet following the full redemption of its 2026 Eurobond maturity in April. While this cash is sufficient to absorb near-term volatility, management acknowledged that running only 2 blast furnaces under ongoing strikes leaves the group free cash flow negative. Despite this, management explicitly committed to servicing the November 2026 Eurobond coupon, noting that the March 2027 coupon and October 2027 principal maturity afford a 12-month evaluation window."),
            ("Market discipline over bond issuance timing.", "Management defended its decision to abandon a planned Eurobond issue in July/September 2026. Although the spread premium against agricultural champion MHP had compressed from 600 bps to ~100 bps, investors demanded longer-dated tenors that would have saddled Metinvest with an unsustainable double-digit cost of capital. The Supervisory Board rejected the deal to preserve long-term solvency, a decision that fortuitously avoided adding debt right before the September infrastructure strikes."),
            ("Strategic development: Italy Piombino plant.", "Metinvest continues to advance its Piombino greenfield DRI/electric arc furnace steel project in Italy in partnership with Danieli and backed by Italian state export credit agency SACE, aiming to secure an EU-based operational perimeter outside wartime jurisdiction.")
        ],
        "guidance_table": [
            ("Steel Production Volume", "Significantly curtailed; operating 2 blast furnaces (1 Zaporizhstal JV, 1 Kamet Steel) vs 5 pre-attack. Run-rate volume down ~50–60% until repairs completed."),
            ("EBITDA & Margin Trajectory", "Not formally guided / highly fluid; H2 EBITDA severely impacted by August outage, coal cargo resales, and reduced operating leverage."),
            ("Capex (Repairs vs Sustaining)", "Blast furnace repairs estimated at $10–15m each ($20–30m total across plants); routine sustaining spend compressed to minimum."),
            ("Working Capital Dynamics", "Severe outflow in August due to 6-8 redirected maritime coal vessels; inventory liquidation and domestic redirection underway to stabilize cash."),
            ("Cash Interest & Next Coupon", "Annual interest bill lower following April 2026 bond repayment; November 2026 Eurobond coupon affirmed to be paid."),
            ("Free Cash Flow (FCF)", "Negative in H2 2026 under 2-furnace operations and repair capex; cash generation contingent on zero further strikes."),
            ("Balance Sheet Cash & Runway", "$190m as of end-June 2026; declining through Q3 on August disruptions.")
        ],
        "funding_table": [
            ("METINV Eurobonds", "Senior notes: 2027s (USD / EUR tranches) and 2029s ($500m 7.750%, ISIN: XS2056722734). Next coupon Nov-2026 committed; next bullet Oct-2027 (~$500m equiv.)."),
            ("Bank Facilities", "Domestic Ukrainian bank facilities active for domestic working capital needs and local scrap procurement."),
            ("Multilateral / DFI Debt", "IFI funding (IFC, DFC, EBRD) strictly restricted to greenfield/critical minerals, not debt refi; dedicated solar equipment facility being drawn."),
            ("Offshore Assets", "Piombino (Italy) greenfield DRI plant in partnership with Danieli and Italian ECA SACE under development.")
        ],
        "watch_items": [
            "November 2026 coupon payment execution on outstanding Eurobonds.",
            "Repair timeline and restart of the second blast furnace at Kamet Steel (expected within 2 months if strikes pause).",
            "Frontline trajectory around the Pokrovske coking coal complex in eastern Ukraine and rail throughput from Poland (JSW).",
            "Black Sea maritime corridor throughput for iron ore pellet shipments.",
            "Cash balance print at Q3-26 / 9M-26 earnings release.",
            "Piombino (Italy) final investment decision and SACE financing terms."
        ],
        "in_our_view": [
            "Metinvest faces its most severe operational test since the loss of Azovstal and Ilyich in Mariupol. The Russian military's shift toward systematically targeting industrial utility pipelines (gas, oxygen, power) represents a deliberate strategy to dismantle Ukraine's private industrial export base. While the physical damage to blast furnaces is repairable ($10–15m and 2–3 months per unit), the recurring nature of strikes makes capital deployment highly fraught and leaves H2 2026 cash flows deeply negative.",
            "From a credit perspective, bondholders are shielded in the near term by the $190m cash cushion (end-June 2026) and management's resolute commitment to pay the November 2026 coupon. The critical milestone is the October 2027 bond maturity. With international bond markets closed and IFIs refusing to refinance sovereign-distressed corporate debt, Metinvest cannot repay the 2027 bullet from cash flow alone under a 2-furnace operational regime. We maintain a cautious, Neutral stance on METINV paper, treating the November coupon as a carry event while preparing for comprehensive liability management discussions on the 2027s if the conflict persists into next year."
        ]
    },

    # 5. ARADA DEVELOPMENTS (15-Sep-2026)
    {
        "id": "arada",
        "short_name": "Arada",
        "name": "Arada Developments LLC",
        "ticker": "ARADA",
        "country": "United Arab Emirates",
        "sector": "Real Estate / Master Developer",
        "date": "15-Sep-2026",
        "is_corporate": True,
        "title": "Arada Developments — Management Meeting, EM Investor Conference (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Group credit-investor meeting (CFO / Treasury) | Issuer Profile: Sharjah and Dubai master real estate developer, backed by Sharjah ruling family and Prince Khaled bin Alwaleed. Bond Silo: ARADA Sukuk (ARADA 8.000% 2029, $500m o/s). Ratings: Fitch BB- / Moody's Ba3.",
        "key_points": [
            ("Proactive cash conservation posture", "Following early signs of market softening in February 2026, Arada's leadership immediately instituted a conservative capital allocation strategy: deferring non-committed capex, halting discretionary land purchases, deferring dividend payments, and prioritizing balance sheet liquidity."),
            ("Robust liquidity buffer", "Ended H1 2026 with $963m in total cash, comprising $340m in project escrow accounts (primarily dedicated to Dubai construction milestones) and $620m in unrestricted cash. Historical treasury policy strictly mandates closing each financial year with $1.0bn+ in cash."),
            ("High pre-sales and escrow funding match", "Active projects under construction maintain an average pre-sold inventory of 65%. Construction costs are fully matched against existing escrow cash and contractually committed installment receivables, eliminating speculative cash burn."),
            ("Sharjah stronghold vs Dubai diversification", "Maintains dominant master-developer positioning in Sharjah across flagship communities: Masaar (AED 9.5bn / $2.6bn GDV, 3,000 villas across 7 gated districts, 100% sold out across first 5 phases) and Aljada (AED 25bn / $6.8bn GDV, 24m sq ft mega-development), while selectively expanding into ultra-prime Dubai segments (Armani Beach Residences on Palm Jumeirah, 53 bespoke units designed by Tadao Ando achieving >AED 10,000/sq ft, and Jouri Hills in Jumeirah Golf Estates)."),
            ("Contractor cost management", "Construction cost inflation is neutralized through fixed-price turnkey EPC contracts with tier-one contractors, with selective project phasing adopted to protect gross profit margins."),
            ("Sukuk debt structure", "Capital structure anchored by the $500m ARADA 8.000% 2029 Sukuk (ISIN: XS2751473211, tapped for $100m in May-2024 at 7.85%); comfortable leverage ratios with net debt to equity well within bank covenant limits and zero significant near-term bond maturities.")
        ],
        "takeaways": [
            ("Immediate transition to capital preservation mode.", "Arada's executive committee responded swiftly to broader regional property cooling signals in early 2026 by shifting from aggressive expansion to cash preservation. Management placed an immediate hold on non-essential capital expenditure, paused uncommitted land acquisitions, deferred shareholder distributions, and instituted tight controls on overhead. This disciplined counter-cyclical posture ensures the developer operates with substantial liquidity buffers throughout any market adjustment."),
            ("Strong cash visibility and escrow ring-fencing.", "Total cash stood at $963m at the close of H1 2026. Of this, $340m is segregated within legally mandated project escrow accounts (governed by RERA in Dubai and Sharjah real estate authorities), perfectly matching upcoming construction payables. The remaining $620m is fully unencumbered corporate cash held across top UAE financial institutions, providing robust protection against potential collection slowdowns."),
            ("De-risked construction and sales backlog.", "Across Arada's active development pipeline, 65% of residential inventory is pre-sold. In Dubai, off-plan payment structures are heavily front-loaded (typically 60–70% collected during construction and 30–40% on handover), ensuring that project cash inflows precede contractor outflows. Even in a severe stress scenario assuming zero new project launches for the next 12 months, rolling 24-month cash flow models indicate no funding deficit."),
            ("Geographic resilience: Sharjah anchor with selective Dubai prime.", "Arada benefits from structural differentiation: unlike pure Dubai developers exposed to volatile speculative demand, Arada's core master communities in Sharjah (Aljada, Masaar) cater to genuine end-user residential demand with limited local competition. Masaar's 3,000 wooded villas have seen extraordinary delivery velocity with over 4,000 units across Sharjah handed over or in final inspection. Its Dubai projects are targeted at high-margin, super-prime branded residences (e.g. Armani Beach Residences on Palm Jumeirah), where buyers are less sensitive to mortgage rate fluctuations."),
            ("Debt structure and Sukuk covenants.", "The balance sheet is funded by a conservative blend of equity, accumulated retained earnings, and long-term capital markets debt via its $500m 8.000% 2029 Sukuk. The business carries modest corporate bank debt, relying instead on project-level milestone financing and escrow self-funding. Covenant headroom remains extensive, with net leverage running below 2.0x.")
        ],
        "guidance_table": [
            ("Sales Run-Rate", "Moderating from peak 2024–2025 velocity; annual sales targeted around $2.0–2.2bn, driven by phased delivery of Masaar and Aljada phases."),
            ("Revenue & Backlog", "Multi-year revenue backlog exceeding $4.5bn provides clear earnings visibility through 2028."),
            ("Gross Margin", "Targeted at 32–35%, supported by low historical land acquisition costs in Sharjah and branded pricing premiums in Dubai."),
            ("Capex & Land Outlays", "Discretionary land acquisition capex halted; construction spend strictly phased against escrow receivables."),
            ("Treasury Cash Target", "Year-end cash target maintained at $1.0bn+ (H1-26 actual $963m, of which $620m unrestricted corporate cash)."),
            ("Net Leverage Ceiling", "Net debt to equity maintained below 35–40% ceiling (bank covenant limit).")
        ],
        "funding_table": [
            ("Outstanding Sukuk", "ARADA 8.000% due 2029 (ISIN: XS2751473211) — $500m o/s ($400m issued Feb-2024 + $100m tap at 7.85%); rated BB- (Fitch) / Ba3 (Moody's)."),
            ("Bank Facilities", "Bilateral project lines with leading UAE banks (Emirates NBD, Dubai Islamic Bank, ADCB) utilized for project construction guarantees."),
            ("Liquidity Position", "$963m total cash as of 30-Jun-2026 ($620m unrestricted corporate cash, $340m in regulated escrow accounts)."),
            ("Debt Maturity Profile", "No major public debt maturities until the 2029 Sukuk; corporate liquidity fully covers outstanding bond debt.")
        ],
        "watch_items": [
            "H2-26 and FY26 collection rates on Dubai off-plan receivables.",
            "Full-year cash balance print (verifying compliance with the $1.0bn+ treasury target).",
            "Handover milestones and escrow cash releases at Aljada and Masaar communities.",
            "Contractor delivery pace and potential supply chain bottlenecks in the UAE building materials sector.",
            "New project launch cadence and pre-sale absorption rates in Dubai."
        ],
        "in_our_view": [
            "Arada is managing the real estate cycle with exemplary institutional discipline. While many regional developers accelerated speculative launches into the 2024–2025 market peak, Arada's management proactively pulled back in early 2026—cutting discretionary capex, pausing land purchases, deferring dividends, and amassing a near-$1bn cash fortress ($620m unrestricted). This conservative posture drastically reduces default risk for bondholders.",
            "The ARADA 8.000% 2029 Sukuk represents one of the highest-quality high-yield paper names in the GCC. With unrestricted cash alone covering the entire $500m Sukuk issuance and active projects 65% pre-sold with matched escrow funding, the credit provides an exceptional risk-adjusted yield (~7.8–8.1%). We view Arada as an anchor Overweight allocation within GCC real estate, supported by unbeatable royal sponsor backing and structural dominance in the Sharjah end-user market."
        ]
    },

    # 6. LIQUID TELECOM (15-Sep-2026)
    {
        "id": "liqtel",
        "short_name": "Liquid Telecom",
        "name": "Liquid Telecommunications Holdings Ltd",
        "ticker": "LIQTEL",
        "country": "Pan-Africa / Mauritius / UK",
        "sector": "Technology / Telecoms & Fiber Infrastructure",
        "date": "15-Sep-2026",
        "is_corporate": True,
        "title": "Liquid Telecom — Management Meeting, EM Investor Conference (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Group credit-investor meeting (Hardy Pemhiwa - Group CEO Cassava, Finance Leadership) | Issuer Profile: Pan-African fiber backbone, cloud and digital infrastructure provider across 14+ countries (>110,000 km network). Bond Silo: Senior secured notes (LIQTEL 2027s/2028s). Ratings: Fitch B- / Moody's Caa1.",
        "key_points": [
            ("Core cash generation run-rate", "Group generates approximately $300m in annual EBITDA with high operating cash conversion across its >110,000 km long-haul fiber backbone connecting 14 African nations from Cape Town to Cairo."),
            ("Disciplined capex reduction", "Capex guidance for FY26 is capped at $60–70m (primarily maintenance and success-based customer-connection drops), a dramatic decline from historical peaks of $120m+ as the cross-continental fiber mesh reaches operational maturity."),
            ("Debt position and upcoming amortisation wall", "Gross debt stood at approximately $880m at Q1, with net debt reduced to ~$770m. However, a major debt test looms on 28 February 2027, when nearly $130m in amortisation payments fall due across USD and ZAR term loans (representing ~1/3 of total term facilities)."),
            ("Committed $50m equity injection for AI pivot", "Under existing refinancing agreements, shareholders and strategic investors (Cassava Technologies / Strive Masiyiwa) are required to inject an additional $50m in equity into the restricted group by 28-Feb-2027. Proceeds are earmarked to upgrade the fiber grid into an ultra-low-latency 'AI transport network' serving global hyperscalers."),
            ("Zimbabwe exposure and upstreaming", "Zimbabwe represents 30–35% of group EBITDA, with collections stabilized at a 60/40 USD/local currency ratio. Cash upstreaming operates steadily in small clips, with group tax expenses largely reflecting Zimbabwe statutory profitability."),
            ("Liquidity buffer and covenant headroom", "Maintains $66–67m in usable balance sheet cash alongside an undrawn RCF, providing ~$95m of total liquidity. Significant headroom reported across all 7–8 debt covenants, with zero shareholder dividends expected from the operating perimeter.")
        ],
        "takeaways": [
            ("Capital expenditure tapering unlocks sustained cash conversion.", "Liquid Telecom has crossed the inflection point of its multi-year capital expenditure cycle. Having deployed over 110,000 km of terrestrial fiber across sub-Saharan Africa, capex has been scaled down from historical levels of $120m+ to a run-rate of $60–70m. With growth capex now restricted to success-based enterprise connections, the group's ~$300m EBITDA converts cleanly into operational cash flow, shielding the business from external funding dependency."),
            ("The February 2027 term loan amortisation milestone.", "While near-term liquidity is stable, management is acutely focused on the 28 February 2027 maturity wall, where ~$130m of principal amortisation comes due across USD and ZAR commercial term loans. This represents approximately one-third of the outstanding term loan stack. Management expects to service this through a combination of accumulated internal cash flow, ongoing operational cash generation, and the mandatory equity injection."),
            ("Mandatory $50m equity injection to fund AI transport infrastructure.", "A key condition of the previous comprehensive refinancing agreement was a requirement for an incremental $50m equity injection into the credit group by 28-Feb-2027. Management confirmed active discussions with both core shareholders (Strive Masiyiwa / Cassava Technologies) and prospective international strategic partners. The capital will be utilized to equip existing fiber routes with coherent optics to support hyperscaler AI data traffic between landing stations and inland data centres."),
            ("Managing Zimbabwean currency risk and dividend upstreaming.", "Zimbabwe contributes 30–35% of group EBITDA, making it the most significant jurisdictional risk factor. Management emphasized that recent monetary stabilization and dollarization of retail tariffs have stabilized collections at ~60% USD and 40% local currency. Upstreaming of funds to the HoldCo operates consistently through regular dividend transfers, with tax payments heavily concentrated in Zimbabwe due to the subsidiary's high statutory profitability."),
            ("Broad covenant headroom across multiple debt metrics.", "Following the previous debt reprofiling, Liquid Telecom operates with substantial headroom across all 7–8 financial covenants embedded in its debt documents. Gross debt of ~$880m excludes roughly $100m of subordinated intercompany debt (which was reduced from ~$200m). With no dividend leakage to HoldCo shareholders, all retained cash is preserved for debt service.")
        ],
        "guidance_table": [
            ("EBITDA Run-Rate", "Guided at ~$300m annual run-rate; Q1 softness expected to reverse in H2 with enterprise margin recovery."),
            ("Capex Guidance", "Strictly guided at $60–70m for FY26 (maintenance + customer connections); down from $120m+ historical peak."),
            ("Term Loan Amortisation", "~$130m bullet amortisation due 28-Feb-2027 across USD and ZAR term loan tranches (~33% of term debt)."),
            ("Mandatory Equity Injection", "$50m additional equity required by 28-Feb-2027 under lender agreement terms."),
            ("Zimbabwe EBITDA Share", "30–35% of group EBITDA; collections running ~60% USD / 40% local currency."),
            ("Free Cash Flow", "Structurally positive operating cash flow after lower capex; primary call on cash is debt amortisation.")
        ],
        "funding_table": [
            ("Outstanding Debt Stack", "Gross debt ~$880m (Q1 actual); net debt ~$770m. Syndicated term loans in USD and ZAR tranches alongside senior secured notes."),
            ("Liquidity Position", "$66–67m usable cash on balance sheet + undrawn RCF = ~$95m total available liquidity."),
            ("Subordinated Debt", "~$100m in subordinated shareholder / intercompany loans (down from ~$200m pre-refinancing)."),
            ("Equity Commitment", "Legally binding $50m equity injection commitment due by 28-Feb-2027 from Cassava / sponsor.")
        ],
        "watch_items": [
            "Execution and receipt of the mandatory $50m shareholder equity injection ahead of 28-Feb-2027.",
            "Refinancing or cash accumulation progress toward meeting the $130m term loan amortisation in Feb-2027.",
            "Stability of Zimbabwean collections and ongoing US dollar dividend upstreaming.",
            "Margin recovery in H2-26 following first-quarter enterprise pricing softness.",
            "Hyperscaler AI transport contracts signing and fiber capacity utilization rates across the >110,000 km network."
        ],
        "in_our_view": [
            "Liquid Telecom has engineered a commendable operational turnaround by reining in capital expenditure ($60–70m vs $120m+) and converting its dominant pan-African fiber network into a consistent ~$300m EBITDA cash generator. The business possesses unmatched strategic infrastructure value, as global hyperscalers (Microsoft, Google, AWS) cannot route traffic across Africa without Liquid's fiber backbone. The planned pivot to AI transport networks provides a compelling medium-term revenue driver.",
            "However, credit investors must remain vigilant regarding the 28 February 2027 maturity hurdle, when ~$130m of term loan amortisation falls due. While available liquidity ($95m) and strong operating cash flow cover a significant portion, full execution requires the timely delivery of the $50m equity injection from Cassava / strategic backers. Furthermore, reliance on Zimbabwe for a third of EBITDA exposes the group to sudden currency shocks. We hold a Neutral stance on LIQTEL debt, awaiting confirmation of the equity funding before considering an upgrade."
        ]
    }
]
'''

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part1.py", "w", encoding="utf-8") as f:
    f.write(part1_code.strip() + "\n")
print("Successfully generated strict 2-column notes_data_part1.py")
