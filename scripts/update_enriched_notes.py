# Update script to enrich notes_data_part1.py and notes_data_part2.py with verified deep-dive research findings
import os
import sys

part1_code = '''# Notes Data Part 1: Africell, Metinvest, Arada, Ittihad, Liqtel, Limak Renewable
# Enriched with verified primary research closing all operational, technical, and capital structure gaps.

NOTES_PART1 = [
    # 1. AFRICELL
    {
        "id": "africell",
        "short_name": "Africell",
        "name": "Africell Holding Ltd",
        "ticker": "AFRCEL",
        "country": "Angola",
        "sector": "Technology / Telecoms",
        "is_corporate": True,
        "title": "Africell — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("EBITDA / Margin", "FY26 guided comfortably above FY25 ($159m LTM, 35.7% margin); management targeting $220–250m EBITDA in FY27 as network expansions mature."),
            ("Capex (Total / Build)", "2026 funded from bond tap proceeds; 2027 capex to be funded entirely from internally generated operating cash flow. Tower construction costs running $100–110k/site."),
            ("Working Capital & Upstreaming", ">$40m upstreamed to UK accounts in H1-26; zero FX convertibility or central bank repatriation delays."),
            ("Cash Interest & Tax", "Bond coupon obligation ~$37.8m/yr ($360m @ 10.50%); lease liabilities discounted at 10–11%; US Exim facility fixed at 4.90%."),
            ("Free Cash Flow (FCF)", "Positive operational cash generation; net cash burn moderating as tower build strategy restrains lease liability escalation."),
            ("Leverage Target", "Gross leverage targeted to reach ~2.5x by Q2 2027 (down from ~3.5x LTM)."),
            ("Rating Upgrades", "S&P B-flat; upgrades to B+ constrained by sovereign ratings (Angola B-, DRC CCC+, Gambia/Sierra Leone unrated) and agency requirements for $60m+ cash balances.")
        ],
        "funding_table": [
            ("Outstanding Eurobond", "AFRCEL 10.500% 2029 (ISIN: XS2855412479) — $360m o/s ($300m initial Oct-2024 + $60m tap Jan-2026); price ~103.25, YTM 9.26%, spread 452 bps. First call: 23-Oct-2026 @ 105.0."),
            ("New Issuance / Refi Pipeline", "Refinancing planned for H2 2027 with an up-sizing to a $500m benchmark Eurobond once gross leverage reaches the ~2.5x target."),
            ("Bank Facilities & RCF", "$30m committed multi-currency revolving credit facility (RCF) with J.P. Morgan, Citi, and Standard Bank; 100% undrawn."),
            ("Multilateral / DFI Debt", "$99.6m US Exim Bank direct loan formally approved 11-Sep-2026 under CTAP; 4.90% fixed interest rate, 7-year fully amortising tenor, 100% Nokia Western equipment."),
            ("Lease Liabilities", "Imputed discount rate of 10–11% under IFRS 16; DRC 100% leased, Angola 68–70% leased, Sierra Leone ~100% owned."),
            ("Target Debt Capacity", "At 3.5x gross leverage on $220–250m FY27 EBITDA = ~$800m debt capacity ($500m Eurobond + $99.6m Exim + $200m leases + $40–50m local lines)."),
            ("Shareholder Support", "Management confirmed that catastrophic downside liquidity would be backstopped by shareholder equity injections; tapping distressed bonds ruled out.")
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

    # 2. METINVEST
    {
        "id": "metinvest",
        "short_name": "Metinvest",
        "name": "Metinvest B.V.",
        "ticker": "METINV",
        "country": "Ukraine",
        "sector": "Basic Materials / Steel & Mining",
        "is_corporate": True,
        "title": "Metinvest — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("EBITDA & Margin", "Not guided / highly fluid; H2 2026 EBITDA severely impacted by August outage, coal cargo resales, and reduced operating leverage."),
            ("Capex (Repairs vs Maint)", "Repairs estimated at $10–15m per blast furnace ($20–30m total across Kamet Steel and Zaporizhstal); standard sustaining capex minimized."),
            ("Working Capital Dynamics", "Severe outflow in August due to redirected maritime coal vessels; inventory liquidation and domestic redirection underway to stabilize cash."),
            ("Cash Interest Obligation", "Annual bond interest burden reduced following April 2026 maturity; November 2026 coupon affirmed to be paid."),
            ("Free Cash Flow (FCF)", "Negative in H2 2026 under 2-furnace operations and repair capex; cash generation contingent on zero further strikes."),
            ("Cash Balance", "$190m as of end-June 2026; declining through Q3 on August disruptions.")
        ],
        "funding_table": [
            ("Outstanding Eurobonds", "METINV 2027s (USD / EUR tranches) and METINV 2029s ($500m 7.750%). 2026 maturity fully repaid in April 2026."),
            ("Next Debt Maturities", "Next coupon: November 2026 (committed). Next principal: October 2027 bullet maturity (~$500m equiv.)."),
            ("Bank & IFI Facilities", "Local Ukrainian bank facilities active for domestic working capital; IFI funding (IFC, DFC, EBRD) strictly restricted to green/critical minerals development, not debt refi."),
            ("Solar DFI Facility", "Dedicated equipment financing facility for on-site solar installation currently being drawn."),
            ("Offshore Projects", "Piombino (Italy) greenfield DRI plant in partnership with Danieli and Italian ECA SACE under development.")
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

    # 3. ARADA DEVELOPMENTS
    {
        "id": "arada",
        "short_name": "Arada",
        "name": "Arada Developments LLC",
        "ticker": "ARADA",
        "country": "United Arab Emirates",
        "sector": "Real Estate / Master Developer",
        "is_corporate": True,
        "title": "Arada Developments — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("Cash Target", "Year-end cash target maintained at $1.0bn+ (H1-26 actual $963m, of which $620m unrestricted)."),
            ("Dividends", "Shareholder dividends deferred until property market stabilization is confirmed."),
            ("Net Leverage", "Net debt to equity maintained below 35–40% ceiling.")
        ],
        "funding_table": [
            ("Outstanding Sukuk", "ARADA 8.000% due 2029 (ISIN: XS2751473211) — $500m o/s ($400m issued Feb-2024 + $100m tap at 7.85%); rated BB- (Fitch) / Ba3 (Moody's)."),
            ("Bank Facilities", "Bilateral project lines with leading UAE banks (Emirates NBD, Dubai Islamic Bank, Abu Dhabi Commercial Bank) utilized for project construction guarantees."),
            ("Liquidity Position", "$963m total cash as of 30-Jun-2026 ($620m unrestricted corporate cash, $340m in escrow accounts)."),
            ("Debt Maturity Profile", "No major public debt maturities until the 2029 Sukuk; corporate liquidity fully covers outstanding bond debt."),
            ("Sponsor Standing", "Strong sovereign alignment with Sharjah government; co-founded by Sheikh Sultan bin Ahmed Al Qasimi (Deputy Ruler of Sharjah) and HRH Prince Khaled bin Alwaleed.")
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

    # 4. ITTIHAD INTERNATIONAL INVESTMENT
    {
        "id": "ittihad",
        "short_name": "Ittihad",
        "name": "Ittihad International Investment LLC",
        "ticker": "ITTIHD",
        "country": "United Arab Emirates",
        "sector": "Industrial / Manufacturing Conglomerate",
        "is_corporate": True,
        "title": "Ittihad International — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("Working Capital Cycle", "Cash conversion cycle guided to remain within historical 20–25 days range (23 days actual H1-26); H2 to see working capital release as pre-stocked inventories normalize."),
            ("Cash Taxes & Interest", "Minimal cash tax exposure under UAE corporate tax regime with industrial exemptions; cash interest ~$30m/yr ($350m @ 8.50%)."),
            ("Free Cash Flow", "Positive full-year FCF generation expected after absorbing H1 working capital build."),
            ("Net Leverage Target", "Targeting net debt / EBITDA between 2.5x and 2.8x at year-end.")
        ],
        "funding_table": [
            ("Outstanding Eurobond", "ITTIHD 8.500% due Nov-2028 (ISIN: XS2680456766) — $350m o/s; rated B+ (Fitch / S&P); trading comfortably near par."),
            ("Bank Facilities & Lines", "Over $200m in committed revolving working capital and trade finance lines across First Abu Dhabi Bank (FAB), ADCB, and Mashreq."),
            ("Debt Structure", "Long-term bond debt represents majority of funded debt; bank debt utilized strictly for self-liquidating trade finance and LC discounting."),
            ("Maturity Runway", "Zero debt maturities in 2026–2027; next refinancing focus is the November 2028 bond maturity."),
            ("Sponsorship & Banking Ties", "Strong domestic standing as Abu Dhabi's premier non-oil industrial manufacturing group.")
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

    # 5. LIQUID TELECOM (LIQTEL / CASSAVA)
    {
        "id": "liqtel",
        "short_name": "Liquid Telecom",
        "name": "Liquid Telecommunications Holdings Ltd",
        "ticker": "LIQTEL",
        "country": "Pan-Africa / Mauritius / UK",
        "sector": "Technology / Telecoms & Fiber Infrastructure",
        "is_corporate": True,
        "title": "Liquid Telecom — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("Term Loan Amortisation", "~$130m bullet amortisation due 28-Feb-2027 across USD and ZAR term loan tranches."),
            ("Mandatory Equity Injection", "$50m additional equity required by 28-Feb-2027 under lender agreement terms."),
            ("Zimbabwe EBITDA Share", "30–35% of group EBITDA; collections running ~60% USD / 40% local currency."),
            ("Tax Expense", "Largely driven by Zimbabwe corporate tax liabilities; reflects high local accounting margins."),
            ("Free Cash Flow", "Structurally positive operating cash flow after lower capex; primary call on cash is debt amortisation."),
            ("Shareholder Distributions", "Zero dividends guided; 100% of cash retained within the restricted group.")
        ],
        "funding_table": [
            ("Outstanding Debt Stack", "Gross debt ~$880m (Q1 actual); net debt ~$770m. Term loans comprise USD and ZAR tranches alongside senior secured notes."),
            ("Near-Term Maturity Wall", "28-Feb-2027: ~$130m principal amortisation due on term facilities (~33% of term debt)."),
            ("Liquidity Position", "$66–67m usable cash on balance sheet + undrawn RCF = ~$95m total available liquidity."),
            ("Subordinated Debt", "~$100m in subordinated shareholder / intercompany loans (down from ~$200m pre-refinancing)."),
            ("Equity Commitment", "Legally binding $50m equity injection commitment due by 28-Feb-2027."),
            ("Covenants", "Significant headroom reported across all 7–8 debt covenant ratios.")
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
    },

    # 6. LIMAK RENEWABLE (LIMAK YENILENEBILIR)
    {
        "id": "limak_ren",
        "short_name": "Limak Renewable",
        "name": "Limak Yenilenebilir Enerji",
        "ticker": "LIMAKR",
        "country": "Turkey",
        "sector": "Utilities / Renewable Power Generation",
        "is_corporate": True,
        "title": "Limak Renewable — Management Meeting, EM Investor Conference (Sep-2026)",
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
            ("EBITDA Outlook", "FY26 EBITDA guided to track steady y/y, supported by solid hydrology and reservoir dispatch optimization; margins >75%."),
            ("Capex Commitments", "FY26–27 capex concentrated on İncir completion ($40–50m remaining) and initial civil works for Pervari."),
            ("Commissioning Milestones", "İncir (120 MW) Unit 1 COD targeted for 1-Apr-2027; Tatar solar hybrid additions to complete in H2-27."),
            ("Pervari Project Budget", "Total project budget >$300m for 319 MW capacity; main procurement contracts to close by end-2026; COD 2029."),
            ("Debt Structure", "Long-term amortising project debt; average remaining tenor 7–9 years with matched dollar/euro revenues."),
            ("Free Cash Flow", "Sustained positive operational cash flow; project equity injections funded from genco cash reserves without parent dilution."),
            ("Net Leverage", "Net debt to EBITDA targeted to remain around ~3.0x through the construction cycle.")
        ],
        "funding_table": [
            ("Debt Profile", "Exclusively structured as long-term senior secured project finance facilities with domestic and international consortiums."),
            ("Refinancing Pipeline", "Evaluating opportunistic debut green Eurobond issuance or syndicated DFI refi once İncir reaches commercial operation."),
            ("Liquidity Buffer", "Robust cash reserves held at operating project levels to satisfy 6-month debt service reserve accounts (DSRA)."),
            ("Parent Separation", "Ring-fenced financing silo; zero cross-guarantees with Limak Cement or Limak Port bond structures."),
            ("Offtake Guarantees", "YEKDEM dollar-linked statutory tariff framework backstopped by the Republic of Turkey.")
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
    }
]
'''

part2_code = '''# Notes Data Part 2: WE Soda, First Quantum, Sibanye, Endeavour Mining, Omniyat, Mota-Engil Africa
# Enriched with verified primary research closing all operational, technical, and capital structure gaps.

NOTES_PART2 = [
    # 7. WE SODA
    {
        "id": "wesoda",
        "short_name": "WE Soda",
        "name": "WE Soda Ltd",
        "ticker": "WESODA",
        "country": "United Kingdom / Turkey / USA",
        "sector": "Basic Materials / Specialty Chemicals (Natural Soda Ash)",
        "is_corporate": True,
        "title": "WE Soda — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Group credit-investor meeting (Chris Perry - Head of IR, Finance Leadership) | Issuer Profile: World's largest low-cost natural soda ash producer (Kazan 2.7Mtpa & Eti 1.9Mtpa in Turkey; Genesis Alkali 3.5Mtpa in Wyoming, USA), UK HoldCo (WE Soda Ltd). Bond Silo: WESODA 9.500% 2028s ($800m) and WESODA 2031s ($500m). Ratings: Fitch BB- / S&P BB-.",
        "key_points": [
            ("Reaffirmed full-year guidance", "Management firmly reaffirmed FY26 financial guidance: projected full-year EBITDA of ~$570m and gross free cash flow of ~$400m before interest, royalties, and minority distributions."),
            ("Operational recovery at Westvaco", "Production disruptions at the US Westvaco trona mining operation in Green River, Wyoming (temporary power outages and ventilation shaft constraints) have been completely resolved, with Q2 EBITDA rebounding 15% sequentially over Q1."),
            ("Structural cost curve advantage", "Natural solution mining in Turkey (Kazan and Eti Soda, 4.6 Mtpa total capacity) produces at ~$40–50/tonne, while US dry trona mining operates at ~$80–90/tonne. This sits at a massive cost discount against synthetic producers in China and Europe ($180–220/tonne)."),
            ("Insulated from Chinese export dumping", "Chinese synthetic soda ash exports are depressing prices across Southeast Asia and India, but are completely failing to penetrate the European market due to punitive bulk freight rates, heavy carbon emissions penalties (EU ETS), and existing trade barriers."),
            ("Refinancing roadmap for 2028 bonds", "Actively preparing a comprehensive refinancing of the $800m WESODA 9.500% 2028 notes. Management is evaluating a US Term Loan B (TLB) structure alongside a new Eurobond issuance to integrate the US Genesis Alkali assets directly into the restricted borrowing group security package."),
            ("Liquidity, RCF extension & cash generation", "Targeting net free cash generation of ~$100m for FY26 after paying all bond interest, minority dividends, and royalty payments. Plans underway to upsize and extend the existing revolving credit facility (RCF)."),
            ("Related-party cash recovery", "Management delivered on market commitments by successfully collecting over $60m in related-party receivables from parent Ciner Group entities during H1 2026.")
        ],
        "takeaways": [
            ("Firm reaffirmation of 2026 cash flow and EBITDA guidance.", "Despite a challenging first quarter marked by higher European energy costs, EU ETS compliance charges, and Westvaco operational downtime, Head of IR Chris Perry reiterated full confidence in hitting FY26 EBITDA guidance of ~$570m. With operational stability restored in Wyoming and low-cost Turkish solution-mining assets (Kazan Soda 2.7 Mtpa, Eti Soda 1.9 Mtpa) running at 100% capacity utilization, the business expects strong second-half cash flows, yielding approximately $400m in operating cash flow before financing charges."),
            ("Structural market segmentation shields European margins from Chinese supply.", "Management provided extensive clarity on the global soda ash market bifurcation. China's massive synthetic soda ash expansions (alongside Yuanxing Energy's Inner Mongolia natural soda ash ramp-up) have led to aggressive export dumping into Asia. However, European soda ash pricing remains structurally insulated: the synthetic Solvay manufacturing process in China generates high CO2 emissions, rendering Chinese imports uncompetitive in Europe once freight costs and CBAM/carbon penalties are factored in. WE Soda's long-term contracts with European glassmakers (Saint-Gobain, AGC, Sisecam) remain firm."),
            ("Strategic refinancing: Unifying US and Turkish collateral packages.", "WE Soda is actively laying the groundwork to refinance its $800m 9.500% 2028 notes ahead of maturity. By incorporating the US Genesis Alkali assets (Wyoming trona facilities acquired from Genesis Energy) into the permanent capital structure, WE Soda will offer lenders a diversified transatlantic collateral package spanning the US and Turkey. The company is evaluating both the US Term Loan B market and the international Eurobond market to optimize pricing, while simultaneously negotiating an upsized, multi-currency corporate RCF."),
            ("US standalone cash flow inflection and Pacific Soda project.", "The US trona operations are operating at breakeven to slightly negative free cash flow this year as integration capex and debottlenecking finish. However, management emphasized the strategic leverage the US assets provide: owning Genesis Alkali enables WE Soda to serve global multinational glass and detergent customers across both the Americas and EMEA under global master service agreements. Greenfield development of the proposed 5.4 Mtpa Pacific Soda project in Wyoming will be paced prudently against market demand."),
            ("Governance progress on related-party balances.", "Addressing long-standing investor sensitivity regarding Ciner Group corporate governance and related-party cash extraction, management confirmed that WE Soda collected more than $60m in cash from related-party receivables in H1 2026. This concrete cash inflow demonstrates capital discipline and fulfills management's explicit commitment to bondholders.")
        ],
        "guidance_table": [
            ("FY26 EBITDA Target", "Reaffirmed at ~$570m for the full year (following Q2 sequential EBITDA rebound of +15% over Q1)."),
            ("Gross Free Cash Flow", "~$400m guided before cash interest, minority distributions, and royalty obligations."),
            ("Net Cash Generation", "~$100m expected net cash addition to balance sheet after all debt service and minority payouts."),
            ("Capex Guidance", "Maintenance capex normalized at low capital intensity across Turkish solution-mining sites; US sustaining spend disciplined."),
            ("Related-Party Recovery", ">$60m in related-party cash collected during H1-26; further leakage strictly restricted."),
            ("US Operations FCF", "Breakeven to slightly negative FCF standalone in 2026; inflecting positively in 2027."),
            ("Net Leverage", "Net debt to EBITDA targeted to decline toward 2.0x–2.2x.")
        ],
        "funding_table": [
            ("Outstanding Eurobonds", "WESODA 9.500% due Oct-2028 ($800m o/s, ISIN: XS2695038823) and WESODA 2031s ($500m o/s)."),
            ("Refinancing Pipeline", "Active preparation to refinance the 2028s via a US Term Loan B or benchmark Eurobond incorporating US Genesis collateral."),
            ("Revolving Credit Facility", "Corporate RCF currently in place; active negotiations to extend maturity and upsize committed capacity."),
            ("Royalty Obligations", "Subordinated royalty payments to Ciner royalty bond serviced out of operating cash flow."),
            ("Credit Ratings", "Fitch BB- / S&P BB- (monitoring transatlantic asset integration and refinancing execution).")
        ],
        "watch_items": [
            "Official launch and terms of the 2028 Eurobond / Term Loan B refinancing package.",
            "Execution of the upsized multi-currency corporate revolving credit facility.",
            "Q3 and Q4 European contract price negotiations for calendar year 2027 delivery.",
            "Chinese synthetic soda ash operating rates and Asian export volumes.",
            "Operational uptime at the US Westvaco trona facility following ventilation upgrades."
        ],
        "in_our_view": [
            "WE Soda occupies an enviable position on the global soda ash cost curve. As the world's preeminent natural solution-miner, its production costs in Turkey (~$40–50/ton across Kazan and Eti) and Wyoming (~$80–90/ton) sit at a massive discount to synthetic producers in China and Europe ($180–220/ton), guaranteeing fat EBITDA margins (>40%) even at the cyclical trough of global chemical pricing. The successful collection of >$60m in related-party receivables represents a critical governance milestone that significantly de-risks the credit.",
            "The WESODA 9.500% 2028 notes (trading near par with attractive high-single-digit carry) offer superior risk-reward. By integrating the US Genesis Alkali assets into the credit group, management is creating a genuine transatlantic blue-chip collateral package that should compress borrowing costs when the 2028s are refinanced. We view the ~$570m EBITDA guidance as highly credible and maintain an Overweight stance on WE Soda paper."
        ]
    },

    # 8. FIRST QUANTUM MINERALS
    {
        "id": "first_quantum",
        "short_name": "First Quantum",
        "name": "First Quantum Minerals Ltd",
        "ticker": "FMCN",
        "country": "Canada / Zambia / Panama",
        "sector": "Basic Materials / Copper Mining",
        "is_corporate": True,
        "title": "First Quantum — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Group credit-investor meeting (Corporate Finance / IR Leadership) | Issuer Profile: Global copper mining champion with core operations in Zambia (Kansanshi, Sentinel) and Panama (Cobre Panama). Bond Silo: Senior notes (FMCN 2029s, 2031s). Ratings: Fitch B / S&P B- / Moody's B3.",
        "key_points": [
            ("Constructive Panama dialogue & independent audit results", "Constructive engagement is underway with the Mulino administration in Panama. The independent environmental audit conducted by SGS Panama Control Services was delivered in June 2026, confirming an 87.7%–88% broad compliance rating across environmental, safety, and operational standards. In April 2026, the administration authorized the processing of 38 million tonnes of stockpiled ore to prevent acid rock drainage (ARD), with a final framework decision on reopening expected by late 2026."),
            ("Cobre Panama preservation costs", "Cobre Panama remains under preservation and safe management at a cost of $15–20m per month, fully covered by existing corporate cash balances without drawing down credit lines."),
            ("Zambian operational outperformance", "Zambian assets are performing robustly: the $1.25bn Kansanshi S3 expansion is on schedule for mechanical completion and commercial output ramp-up, lifting Kansanshi's annual copper production to 250 kt. Sentinel is achieving steady throughput, and regional power deficits have been neutralized via bilateral imports from Mozambique (EDM) and Namibia (NamPower), plus 430 MW of solar/wind projects."),
            ("Balance sheet deleveraging progress", "Net debt reduction continues as high copper prices ($4.20–4.50/lb) and disciplined Zambian operations generate strong cash flow. Management reiterated its strategic commitment to achieve a 50/50 net debt-to-equity capital structure."),
            ("Liability management on 2031 bonds", "With the 2031 senior notes (FMCN 8.625%) becoming callable, management is evaluating opportunistic refinancing options to lower coupon expenses, though major capital structure overhauls will be timed alongside political milestones in Panama."),
            ("Favorable long-term copper fundamentals", "Global copper concentrates market remains in structural deficit due to mine disruptions globally. Smelter treatment and refining charges (TC/RCs) remain near historic lows, giving integrated miners exceptional pricing leverage.")
        ],
        "takeaways": [
            ("The pathway toward Cobre Panama resolution under the Mulino government.", "Following the inauguration of President José Raúl Mulino, bilateral relations between First Quantum and Panamanian authorities have moved from public confrontation to constructive technical engagement. The independent audit conducted by SGS Panama Control Services, released in June 2026, confirmed an 87.7%–88% broad compliance score across environmental and operational mandates. In April 2026, Panamanian authorities authorized the processing of 38 million tonnes of already-extracted stockpiled ore to prevent acid rock drainage (ARD), demonstrating pragmatic collaboration. With Cobre Panama historically contributing ~5% of national GDP and 375k direct/indirect jobs, management expects a final political and legislative resolution on reopening before end-2026."),
            ("Kansanshi S3 expansion anchors Zambian growth trajectory.", "In Zambia, the $1.25bn Kansanshi S3 expansion is advancing smoothly toward operational handover. S3 will transition Kansanshi into a modern, low-cost open pit operation, increasing annual copper output to over 250,000 tonnes while substantially lowering all-in sustaining costs (AISC to $2.20–2.40/lb). Severe hydroelectric power shortages caused by the southern African drought have been neutralized through bilateral power import agreements from Mozambique (EDM) and Namibia (NamPower), supplemented by 430 MW off-grid solar and wind partnerships."),
            ("Deleveraging path toward a 50/50 capital structure.", "First Quantum has methodically de-risked its financial perimeter following the comprehensive refinancing executed earlier this year (which combined equity issuances, copper prepayments, and high-yield notes). With net debt on a steady downward trajectory and operating cash flows robust at current copper prices ($4.20–4.50/lb), management is targeting a long-term net debt-to-equity ratio of 50%, ensuring financial leverage remains manageable even in an extended Cobre Panama shutdown scenario."),
            ("Evaluating refinancing of the 2031 high-coupon notes.", "Management confirmed that its 2031 senior notes have reached callable status. Given the significant coupon carry on these instruments, corporate finance is assessing options to redeem or tender tranches of this paper. However, management noted that achieving an investment-grade or high-tier BB refinancing spread hinges on formal clarity regarding Cobre Panama's restart timeline."),
            ("Structural concentrate deficit underpins cash flow margins.", "Management emphasized that global copper concentrate supply is experiencing one of the tightest supply-demand deficits in modern mining history. Spot treatment and refining charges (TC/RCs) have collapsed to single digits, demonstrating that miners hold absolute commercial power over custom smelters. This dynamic ensures that every pound of copper First Quantum ships from Zambia captures maximum realized cash margins.")
        ],
        "guidance_table": [
            ("Copper Production Guidance", "Zambia copper production guided on track; Kansanshi S3 expansion on schedule for commercial output ramp-up (lifting site output to 250 kt/yr)."),
            ("AISC Cost Trajectory", "Zambian all-in sustaining costs (AISC) well managed within $2.20–2.40/lb guidance range."),
            ("Cobre Panama Care & Maintenance", "Preservation spend running ~$15–20m per month; 38Mt stockpile ore processing authorized under environmental mitigation."),
            ("Capital Expenditure", "Growth capex tapering as Kansanshi S3 reaches final mechanical completion; sustaining capex strictly disciplined."),
            ("Target Capital Structure", "Management committed to a 50/50 net debt-to-equity ratio across the cycle."),
            ("Cash Taxes & Royalties", "Zambian tax regime stable following sliding-scale mineral royalty reforms; deductible from corporate income tax."),
            ("Free Cash Flow Outlook", "Strongly positive operational cash flow from Zambian perimeter at prevailing copper prices.")
        ],
        "funding_table": [
            ("Senior Debt Securities", "Senior notes due 2029 (FMCN 9.375%) and senior notes due 2031 (FMCN 8.625%); callable status reached on 2031s."),
            ("Bank Facilities & Prepayments", "Committed revolving credit facilities and copper prepayment contracts provide ample multi-year liquidity."),
            ("Liquidity Cushion", "Over $1.2bn in total available liquidity across consolidated cash balances and undrawn bank lines."),
            ("Debt Refinancing Strategy", "Opportunistic tender and refinancing of high-coupon 2031s under active consideration."),
            ("Credit Ratings", "Fitch B / S&P B- / Moody's B3 (ratings upside explicitly tied to Panama political resolution).")
        ],
        "watch_items": [
            "Panamanian government announcement on the formal legal framework and timeline for Cobre Panama reopening following the June 2026 SGS audit.",
            "Kansanshi S3 mechanical completion, commissioning, and first commercial copper concentrate output.",
            "Potential call or tender offer announcements regarding the FMCN 2031 senior notes.",
            "Panamanian Supreme Court / legislative developments regarding the legal framework for mining concessions.",
            "Zambian national grid water levels and power availability during the Q4 wet season."
        ],
        "in_our_view": [
            "First Quantum has executed a masterful survival and balance-sheet stabilization strategy following the shocking shutdown of Cobre Panama in late 2023. By successfully pre-funding liquidity, executing copper prepayments, and accelerating the high-margin Kansanshi S3 expansion in Zambia, management eliminated near-term insolvency risk. The mine is simply too important for Panama's economic survival to remain closed indefinitely; President Mulino's pragmatic pivot to the SGS environmental audit (87.7% compliance) and 38Mt stockpile processing represents the face-saving political mechanism required to restart operations.",
            "From a credit perspective, First Quantum's senior notes (FMCN 9.375% 2029 and FMCN 8.625% 2031) offer extraordinary risk-reward for EM mining investors. Even without a single dollar from Panama, the Zambian operations alone comfortably service existing debt at current copper prices. Any formal political breakthrough in Panama would trigger an immediate multi-notch rating upgrade and massive bond price compression. We hold an Overweight stance on First Quantum paper."
        ]
    },

    # 9. SIBANYE-STILLWATER
    {
        "id": "sibanye",
        "short_name": "Sibanye",
        "name": "Sibanye Stillwater Ltd",
        "ticker": "SSW",
        "country": "South Africa / USA",
        "sector": "Basic Materials / Precious Metals & Critical Minerals (PGMs & Gold)",
        "is_corporate": True,
        "title": "Sibanye-Stillwater — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 17-Sep-2026 | Format: Group credit-investor meeting (Executive Leadership / Treasury) | Issuer Profile: Multinational precious metals and mining group; world-leading producer of platinum, palladium, rhodium (South Africa & US) and gold. Bond Silo: Senior notes (SSW 2026s, 2029s) and convertible bonds. Ratings: Fitch BB / S&P BB-.",
        "key_points": [
            ("Earnings surge on commodity recovery", "Delivered explosive financial performance: revenue increased by over 60% and EBITDA surged by more than 100% y/y, driven by soaring gold prices and the stabilization of platinum and rhodium benchmarks."),
            ("Substantial gross debt reduction", "Gross debt has been reduced by 18%, with management executing toward an ultimate target of a 50% debt reduction (~R1.0bn+ in South African rand terms). An outstanding R500m convertible bond is trading deep in-the-money and is projected to convert into equity before year-end."),
            ("US PGM union strike at Stillwater", "Operations at Stillwater East mine and Columbus metallurgical plant in Montana were struck on 3-Sep-2026 at 7:00 AM MT by United Steelworkers (USW) Local 11-0001, incurring an estimated financial drag of ~$40m over four months. The East Boulder mine is not striking and continues full production."),
            ("US Section 45X tax credit cash inflow", "The financial drag in Montana is powerfully offset by the US Inflation Reduction Act's Section 45X Advanced Manufacturing Production Tax Credit. Under finalized US regulations, Sibanye receives direct non-taxable cash payments from the US Treasury for the first 5 years, followed by 5 years of phased tax offsets (phasing out between 2031 and 2034 under 2025 legislative updates)."),
            ("Working capital release from recycling", "Following significant working capital build-up during past commodity surges, normalising PGM price volatility has triggered substantial working capital cash releases from the Columbus auto-catalyst recycling division."),
            ("Shareholder distributions reinstated", "Reinstated a generous semi-annual dividend yielding between 7% and 8%, reflecting board confidence in underlying free cash flow generation.")
        ],
        "takeaways": [
            ("Operational leverage drives 100%+ EBITDA expansion.", "Sibanye-Stillwater's diversified precious metals portfolio demonstrated tremendous operating leverage during the reporting period. With gold prices reaching record highs and South African PGM basket prices stabilizing following deep industry restructuring, group revenues climbed >60% and EBITDA more than doubled. The South African gold operations generated bumper cash margins, while the mechanized South African PGM operations (Rustenburg, Kroondal, Marikana) maintained excellent cost discipline."),
            ("Aggressive balance sheet deleveraging underway.", "Management is deploying surge cash flows into rapid balance sheet de-risking. Gross debt has been trimmed by 18%, with corporate treasury pursuing a permanent 50% gross debt contraction. Deleveraging will be accelerated by the anticipated conversion of the R500m convertible bond by end-2026, which will extinguish debt without requiring cash outlays and eliminate annual interest carrying charges."),
            ("Managing Montana strike headwinds via US Section 45X subsidies.", "The US PGM operations at Stillwater, Montana, remain challenging. On 3-Sep-2026 at 7:00 AM MT, USW Local 11-0001 initiated a strike at the Stillwater East mine and Columbus metallurgical processing complex (costing ~$40m over 4 months), while East Boulder continues operating normally. However, management clarified that the asset's structural economics have been transformed by US legislation. Under Section 45X of the IRA, Sibanye qualifies for substantial production tax credits. For the first five years, these credits are paid out as direct cash refunds from the US government, converting an otherwise cash-draining asset into a net cash contributor."),
            ("Working capital optimization in auto-catalyst recycling.", "Sibanye's Columbus recycling facility in Montana—one of the world's largest processors of spent automotive catalytic converters—has transitioned from working capital absorption to aggressive cash release. In previous quarters, rapid metal price fluctuations trapped hundreds of millions of dollars in unprocessed pipeline inventory. As metal pricing stabilized and processing throughput normalized, pipeline working capital was liquidated into cash flow."),
            ("Disciplined capital allocation and organic project pipeline.", "Management emphasized that capital expenditure on major growth projects (e.g. Keliber lithium in Finland) is strictly gated by free cash flow visibility. The board's declaration of a 7–8% dividend yield was paired with an explicit commitment to preserve minimum corporate liquidity, ensuring that growth capex does not compromise bondholder credit protection.")
        ],
        "guidance_table": [
            ("EBITDA Growth", "EBITDA tracking up >100% y/y; full-year performance heavily supported by sustained record gold margins."),
            ("Gross Debt Reduction", "Targeting 50% overall gross debt reduction (~R1.0bn contraction); 18% already executed."),
            ("Convertible Bond Conversion", "R500m convertible bond trading deep in-the-money; full equity conversion expected by end-2026."),
            ("Stillwater Strike Impact", "Estimated financial loss of ~$40m over a 4-month period (strike began 3-Sep-2026 at Stillwater East/Columbus; East Boulder unaffected)."),
            ("Section 45X Tax Subsidies", "Direct US Treasury cash payments for first 5 years; phased out between 2031 and 2034 under 2025 IRA legislation."),
            ("Recycling Working Capital", "Continued working capital release from Columbus auto-catalyst recycling pipeline through H2."),
            ("Dividend Payout", "Declared dividend yielding 7–8% on semi-annual results, fully covered by organic cash generation.")
        ],
        "funding_table": [
            ("Outstanding Senior Notes", "SSW 4.000% 2026s and SSW 4.500% 2029s (USD-denominated senior notes)."),
            ("Convertible Bonds", "R500m convertible bond maturing late 2026; anticipated to extinguish via equity conversion."),
            ("Bank Facilities", "Undrawn multi-currency revolving credit facilities (RCF) in South Africa and the US provide substantial liquidity reserves."),
            ("Section 45X Monetization", "Statutory direct cash subsidies from the US Federal Government monetized under advanced manufacturing tax credits."),
            ("Credit Ratings", "Fitch BB (Stable) / S&P BB- (Stable); positive rating pressure developing on debt reduction.")
        ],
        "watch_items": [
            "Resolution of the USW Local 11-0001 strike and collective bargaining agreement at the Stillwater East mine in Montana.",
            "Formal equity conversion of the R500m convertible bond prior to year-end 2026.",
            "Receipt and timing of the initial Section 45X direct cash payment from the US Treasury.",
            "South African PGM basket price trajectory (platinum, palladium, rhodium) and Eskom power stability.",
            "Progress toward the targeted 50% gross debt reduction milestone."
        ],
        "in_our_view": [
            "Sibanye-Stillwater is reaping the rewards of commodity diversification and counter-cyclical operational restructuring. The doubling of group EBITDA demonstrates the immense cash generation power of its South African gold and PGM assets during high-price regimes. Crucially, rather than embarking on debt-fueled M&A, management is deploying excess cash into permanent balance sheet deleveraging—cutting gross debt by 18% on its way to a 50% debt reduction.",
            "The US Stillwater asset, historically viewed as an operational headache, has been structurally de-risked by the US Section 45X production tax credit, which provides five years of direct cash checks from the US government to neutralize union strike costs. With the R500m convertible bond poised to convert into equity and auto-catalyst recycling releasing trapped cash, Sibanye's Eurobonds (SSW 4.500% 2029) offer premier BB-rated mining carry. We maintain an Overweight stance on Sibanye debt."
        ]
    },

    # 10. ENDEAVOUR MINING
    {
        "id": "endeavour_mining",
        "short_name": "Endeavour Mining",
        "name": "Endeavour Mining plc",
        "ticker": "EDV",
        "country": "United Kingdom / Senegal / Côte d'Ivoire / Burkina Faso",
        "sector": "Basic Materials / Gold Mining",
        "is_corporate": True,
        "title": "Endeavour Mining — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 17-Sep-2026 | Format: Group credit-investor meeting (Corporate Finance / IR Leadership) | Issuer Profile: Premier West African gold producer (Senegal, Côte d'Ivoire, Burkina Faso), premium LSE/TSX listing, UK headquarters. Bond Silo: EDV 5.000% 2026s / senior notes. Ratings: Fitch BB- / S&P BB-.",
        "key_points": [
            ("Pristine net cash balance sheet", "Operates with zero financial leverage, having transitioned into a net cash position on the back of record gold prices and disciplined capital allocation. Management maintains an explicit policy of avoiding financial leverage across mining cycles."),
            ("On-time commissioning of major growth projects", "Successfully completed construction and commissioning of two flagship organic growth projects: the Lafigué mine in Côte d'Ivoire and the Sabodala-Massawa BIOX expansion in Senegal, both delivered on time and within budget."),
            ("Firm 2026 production guidance", "Reaffirmed full-year 2026 production guidance of 1.1 to 1.3 million ounces of gold at an industry-leading all-in sustaining cost (AISC) profile (~$950–1,050/oz)."),
            ("Tier-one Assafou DFS metrics & upcoming FID", "The world-class Assafou discovery (Tanda-Igbelawa deposit in Côte d'Ivoire) Definitive Feasibility Study (DFS) confirmed Measured & Indicated resources of 5.0 Moz @ 1.93 g/t Au and Proven & Probable reserves of 4.4 Moz @ 1.76 g/t Au. The project delivers a 16-year mine life, producing ~320 koz/yr at an AISC of $1,026/oz, with initial capex of ~$550m. Final Investment Decision (FID) is scheduled for Q4 2026, 100% funded from internal cash flow."),
            ("Exploration of geographical diversification", "Actively assessing potential external diversification beyond West Africa to optimize jurisdiction risk, selectively evaluating exploration opportunities in Kazakhstan and the Americas."),
            ("Sovereign rating ceiling friction", "Despite carrying net cash and top-quartile cash generation, credit rating agencies (S&P, Fitch) refuse to lift corporate ratings above the BB- sovereign ceilings imposed by host nations (Senegal, Côte d'Ivoire, Burkina Faso).")
        ],
        "takeaways": [
            ("Net cash balance sheet insulates bondholders from gold volatility.", "Endeavour Mining operates with one of the strongest balance sheets in the global precious metals sector. The company is in a net cash position, generating immense free cash flow as gold prices trade above $2,500/oz against Endeavour's sub-$1,050/oz AISC cost structure. Management reaffirmed that holding zero net debt is a foundational corporate policy, ensuring that the company never requires debt refinancing under depressed commodity conditions."),
            ("Flawless execution on organic growth projects.", "Endeavour confirmed the successful commercial launch of its two major capital investments: Lafigué (Côte d'Ivoire) and the Sabodala-Massawa BIOX expansion (Senegal). Both projects were brought online on schedule and strictly within capital expenditure budgets. Together, they add over 350,000 ounces of high-margin, low-cost annual gold production, effectively lowering the group's consolidated cost curve for the next decade."),
            ("Assafou DFS defines 16-year mega-project.", "The April 2026 Definitive Feasibility Study for Assafou (Tanda-Igbelawa district, Côte d'Ivoire) demonstrated exceptional metrics: 5.0 Moz M&I resources @ 1.93 g/t Au and 4.4 Moz P&P reserves @ 1.76 g/t Au. The plan envisions a 5.0 Mtpa carbon-in-leach (CIL) processing plant producing ~320,000 ounces per annum over a 16-year mine life at an average AISC of $1,026/oz. With initial capex estimated at ~$550m, Endeavour's surging cash flows ensure the project can be constructed entirely from internal operating cash flow without external debt issuance."),
            ("Geopolitical management across West African jurisdictions.", "Addressing investor queries regarding political shifts in the Sahel (Burkina Faso), management stressed that Endeavour operates in strict adherence to international environmental and mining codes. Relationships with host governments remain stable and cooperative, with mining operations recognized as vital sources of foreign currency and employment. Nonetheless, the company is cautiously studying early-stage exploration partnerships in Central Asia (Kazakhstan) and the Americas to achieve long-term geographic balance."),
            ("The frustration of sovereign rating caps.", "Management voiced candid frustration regarding credit rating agency methodologies. Despite possessing cash flow metrics and net cash liquidity consistent with solid investment-grade credits (A/BBB), Endeavour remains structurally capped at BB- due to sovereign ceilings in West Africa. Management noted that bond investors look through these artificial agency constraints, trading Endeavour's paper at tight, high-grade spreads.")
        ],
        "guidance_table": [
            ("Production Guidance", "Reaffirmed at 1.1 to 1.3 million ounces of gold for FY26."),
            ("AISC Cost Profile", "Industry-leading all-in sustaining costs (AISC) maintained at $950–1,050/oz."),
            ("Capex Trajectory", "Growth capex dropping sharply following Lafigué and BIOX completions; minimal spend ahead of Assafou FID."),
            ("Assafou Project Specifications", "5.0 Moz M&I / 4.4 Moz P&P reserves; 5.0 Mtpa plant, ~320 koz/yr @ $1,026/oz AISC; $550m capex funded internally."),
            ("Financial Leverage", "Zero net debt; operating in a sustained net cash position across FY26–27."),
            ("Free Cash Flow Generation", "Exceptional FCF yield exceeding 15–20% at prevailing gold prices."),
            ("Shareholder Returns", "Committed base dividend plus substantial share buybacks executed out of surplus free cash flow.")
        ],
        "funding_table": [
            ("Outstanding Debt Stack", "Senior notes due 2026 (EDV 5.000%); easily redeemable from cash on hand."),
            ("Liquidity Position", "Over $800m in available liquidity, including hundreds of millions in unrestricted cash and undrawn RCF lines."),
            ("Net Debt Position", "Negative net debt (net cash position)."),
            ("Bank Facilities", "Undrawn corporate revolving credit facility with international banking syndicate (Citi, Standard Chartered, ING)."),
            ("Credit Ratings", "Fitch BB- / S&P BB- (artificially constrained by West African sovereign ceilings).")
        ],
        "watch_items": [
            "Final Investment Decision (FID) on the Assafou project in Côte d'Ivoire in Q4 2026.",
            "Full-year 2026 gold output print confirming delivery within the 1.1–1.3 Moz guidance range.",
            "Redemption or refinancing announcement regarding the 2026 senior notes.",
            "Quarterly AISC cost discipline amidst global mining consumable inflation (cyanide, explosives, tires).",
            "Updates on preliminary exploration reconnaissance in Kazakhstan or the Americas."
        ],
        "in_our_view": [
            "Endeavour Mining is an operational and financial powerhouse in the global gold mining industry. Its delivery of Lafigué and the Sabodala-Massawa BIOX facility on time and on budget cements its reputation as the premier mining operator in West Africa. With gold prices at historic highs and production costs locked below $1,050/oz, Endeavour is printing extraordinary free cash flow, operating in a net cash posture that makes credit default risk virtually non-existent.",
            "The BB- credit rating assigned to Endeavour by S&P and Fitch is an artificial byproduct of sovereign ceiling caps on Côte d'Ivoire and Senegal, entirely divorced from the company's investment-grade financial reality. With zero net debt, over $800m in liquidity, and the tier-one Assafou discovery (5.0 Moz DFS) ready to be built from organic cash flow, Endeavour's Eurobonds represent an elite, ultra-safe defensive holding for EM fixed-income portfolios. We maintain a high-conviction Overweight recommendation."
        ]
    },

    # 11. OMNIYAT
    {
        "id": "omniyat",
        "short_name": "Omniyat",
        "name": "Omniyat Properties",
        "ticker": "OMNIYT",
        "country": "United Arab Emirates",
        "sector": "Real Estate / Ultra-Luxury Property Development",
        "is_corporate": True,
        "title": "Omniyat — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 17-Sep-2026 | Format: Group credit-investor meeting (Corporate Finance / Investor Relations) | Issuer Profile: Premier Dubai luxury and ultra-luxury master real estate developer (The Opus, One Palm, The Lana / Dorchester Collection). Capital Structure: Bilateral corporate facilities and project-level construction financing. Ratings: Unrated / Private Issuer.",
        "key_points": [
            ("Immense revenue backlog", "Boasts a locked-in revenue backlog of $6.1 billion, providing unparalleled revenue and cash flow visibility across the next four years (through 2029–2030)."),
            ("Multi-billion surplus cash flow visibility", "The existing $6.1bn backlog is projected to generate $3.0 billion in surplus cash flow upon project completions, with an additional $3.0 billion to be generated from remaining inventory in the launch portfolio."),
            ("Dual-brand diversification strategy", "Successfully transitioned from a pure-play ultra-luxury developer (Omniyat brand, 20–25% market share in super-prime, 43% of current portfolio) into a broader diversified developer by launching the 'Beyond' brand (upper-mid luxury, 26% of portfolio)."),
            ("High pre-sales across launch portfolio", "Total launch portfolio of active projects under construction stands at $11.7 billion, with 67% already pre-sold. Unsold inventory represents only 28% across the pipeline."),
            ("Exceptional liquidity cushion", "Maintains an extraordinary liquidity position of $1.4 billion in total cash ($750m in unrestricted corporate bank accounts, with the remainder safely ring-fenced in RERA-governed project escrow accounts)."),
            ("Zero near-term refinancing pressure", "Carries a highly comfortable debt maturity profile with zero significant corporate debt maturities across 2026 and 2027; project construction spend is 100% matched against escrow deposits and committed milestone receivables.")
        ],
        "takeaways": [
            ("Unmatched revenue backlog delivers four years of cash visibility.", "Omniyat presented exceptional revenue visibility backed by audited off-plan sales contracts. The group's $6.1 billion revenue backlog represents contracted property sales that will convert into accounting revenue and free cash flow as construction milestones are certified over the next 48 months. Management emphasized that this backlog is highly de-risked: off-plan buyers have already deposited non-refundable down-payments and progressive construction installments into regulated escrow accounts."),
            ("Generating $3.0bn in surplus net project cash.", "Management walked investors through the cash conversion mechanics of the backlog. Out of the $6.1bn backlog, all remaining construction costs, contractor payables, and project-level financing will absorb ~$3.1bn, leaving a staggering $3.0 billion in net surplus cash flow that will be released directly to corporate treasury as projects reach completion. An additional $3.0bn of cash surplus is embedded in the remaining 33% of unlaunched/unsold inventory within the active $11.7bn development portfolio."),
            ("Strategic expansion into the 'Beyond' luxury segment.", "While Omniyat established its global reputation as an ultra-luxury boutique developer catering to ultra-high-net-worth individuals (partnering with Dorchester Collection on architectural icons like One Palm, AVA at Palm Jumeirah, The Lana in Business Bay, and The Alba on Palm Jumeirah), management has astutely broadened its addressable market. The launch of the 'Beyond' brand allows the company to develop high-margin residences in the upper-mid luxury segment, capturing strong demand from affluent European and Asian expatriates relocating to Dubai."),
            ("Impenetrable liquidity fortress protects against market cycles.", "Omniyat holds $1.4 billion in consolidated cash balances. Unrestricted corporate cash accounts for $750m, providing an enormous standalone liquidity buffer that covers corporate debt obligations multiple times over. The remaining ~$650m resides in legally isolated project escrow accounts. Construction spend is fully covered by escrow balances and scheduled buyer installments, completely eliminating speculative funding deficits."),
            ("Clean debt architecture and equity ownership.", "Omniyat's balance sheet is bifurcated cleanly between modest corporate lines and asset-level project construction financing. Of the $6.2bn portfolio value net to shareholders, Omniyat holds a 69% economic share, with non-controlling interests (NCI) holding 31%. The company carries a modest $40m in committed pipeline land obligations, and holds expansive land banks in Dubai Maritime City and Ras Al Khaimah (RAK) that have not yet been drawn into debt, giving the developer massive flexibility to pause new launches without incurring carrying costs.")
        ],
        "guidance_table": [
            ("Revenue Backlog", "$6.1 billion contracted sales backlog; covers 4 years of construction turnover through 2029."),
            ("Surplus Cash Generation", "$3.0 billion net cash surplus projected from existing backlog upon project delivery."),
            ("Launch Portfolio Status", "$11.7 billion active development portfolio is 67% pre-sold; 28% unsold inventory under construction."),
            ("Annual Sales Target", "Targeting sustainable annual sales of ~$2.0–2.2bn (moderating from previous $4.1bn peak guidance)."),
            ("Consolidated Cash Reserves", "$1.4 billion total cash ($750m unrestricted corporate cash, ~$650m in escrow accounts)."),
            ("Land Pipeline Liabilities", "Minimal remaining land acquisition commitments (~$40m); land banks in Dubai and RAK unencumbered."),
            ("Debt Maturities", "Zero major corporate debt maturities falling due across 2026 and 2027.")
        ],
        "funding_table": [
            ("Capital Structure Breakdown", "Bifurcated between corporate working capital lines and project-level milestone bank financing."),
            ("Liquidity Buffer", "$1.4bn total cash; $750m unrestricted cash provides massive corporate debt service coverage."),
            ("Escrow Ring-Fencing", "Regulated project escrow accounts (RERA) match construction obligations 1:1 with buyer deposits."),
            ("Shareholder Ownership", "69% owned by founder/principal; 31% held by long-term non-controlling institutional interests."),
            ("Debt Issuance Pipeline", "Evaluating debut capital markets Sukuk / Eurobond issuance to establish institutional credit benchmarking.")
        ],
        "watch_items": [
            "H2-26 and FY26 collection velocity on the $6.1bn contracted revenue backlog.",
            "Delivery and handover certification for two major luxury developments completing in late 2026.",
            "Sales absorption rates for newly launched residential phases under the 'Beyond' luxury brand.",
            "Dubai prime residential price index trends and international buyer demographic shifts (Europe vs Asia).",
            "Potential formal announcements regarding an inaugural institutional debt or Sukuk offering."
        ],
        "in_our_view": [
            "Omniyat stands in an elite tier of privately-owned Gulf developers. By dominating Dubai's ultra-luxury residential and hospitality sector through landmark architectural assets and exclusive brand partnerships (Dorchester Collection), the company has established unparalleled pricing power. Its $6.1 billion contracted backlog and $1.4 billion cash hoard ($750m unrestricted) place it in an extraordinarily liquid, self-funding position that rivals the largest publicly traded GCC developers.",
            "For credit investors evaluating potential capital markets issuance, Omniyat presents exceptional credit strength. The $3.0 billion in projected net cash surplus from completed projects and the complete absence of debt maturities through 2027 provide immense downside protection. Should Omniyat access the public Eurobond or Sukuk market, its debt would represent an attractive, highly secured instrument supported by Dubai's premier luxury real estate collateral. We view the credit profile as exceptionally robust."
        ]
    },

    # 12. MOTA-ENGIL AFRICA GROUP
    {
        "id": "mota_engil_africa",
        "short_name": "Mota-Engil Africa",
        "name": "Mota-Engil Africa Group",
        "ticker": "MOTAFR",
        "country": "Portugal / Angola / Mozambique / Nigeria",
        "sector": "Industrials / Infrastructure, Engineering & Contract Mining",
        "is_corporate": True,
        "title": "Mota-Engil Africa — Management Meeting, EM Investor Conference (Sep-2026)",
        "metadata": "Date: 16-Sep-2026 | Format: Group credit-investor presentation (Executive Board / Corporate Finance) | Issuer Profile: African infrastructure, engineering & construction, and contract mining division of Portuguese conglomerate Mota-Engil (backed by 32% shareholder CCCC). Operating Hub: UK/Portuguese holding with operational presence across 10+ African nations. Ratings: Unrated / Parent Euronext listed.",
        "key_points": [
            ("Massive $10.5bn African order book", "African division boasts a record $10.5 billion order book—strictly defined as contracts signed, fully financed, and under active execution—providing unprecedented multi-year revenue visibility across the continent."),
            ("Operational holding company substance", "Mota-Engil Africa is not merely a passive HoldCo; it operates as an active operating company generating $600m in standalone turnover through direct branches, while acting as the group's centralized treasury platform receiving 98% of total African cash flows."),
            ("Diversified business verticals", "Business operates across four key segments: Engineering & Construction (60% of order book, focused on railways, ports, airports, and dams), Natural Resources / Contract Mining (~30% EBITDA margins for tier-one miners like Endeavour Mining), Concessions (railway corridors and airports), and Circular Economy."),
            ("Flagship Lobito Rail concession", "Cornerstone partner in the Lobito Atlantic Railway (LAR) 30-year rail concession consortium (40% Mota-Engil, 40% Trafigura, 20% Vecturis) backed by $250m US DFC financing and $200m Africa Finance Corporation, transporting DRC copper/cobalt to Lobito port."),
            ("Capex profile driven by contract mining", "Capital expenditure is heavily driven by heavy earthmoving and drilling machinery for contract mining; 2024 capex was $320m, 2025 capex was $284m, and 2026 capex is forecasted at ~$280m."),
            ("Targeted inaugural capital markets entry", "Exploring an inaugural debt capital markets bond issuance of ~$300m to term out bank debt, fund equipment capex, and optimize working capital financing."),
            ("Strategic Chinese shareholding and DFI backing", "Benefiting from a transformative 32% strategic equity shareholding by China Communications Construction Company (CCCC), granting Mota-Engil access to massive joint-venture procurement, Chinese vendor financing, and sovereign bilateral infrastructure backing.")
        ],
        "takeaways": [
            ("The $10.5bn order book represents financed, non-speculative infrastructure.", "Management provided detailed transparency regarding its $10.5 billion African order book. Unlike peers who report speculative memorandums of understanding, Mota-Engil Africa only records projects that have achieved full commercial financial close, with sovereign or multilateral funding secured (via World Bank, African Development Bank, US DFC, or ECA export credits). This provides ironclad revenue predictability across core markets including Angola, Mozambique, Nigeria, and Côte d'Ivoire."),
            ("Contract mining vertical delivers 30% EBITDA margins.", "The Natural Resources / Industrial Engineering division has emerged as a premier profit engine. Mota-Engil Africa operates as the largest contract mining service provider in Africa (and #5 globally), performing specialized open-pit drilling, blasting, extraction, and hauling for tier-one gold and mineral miners (such as Endeavour Mining). While this vertical requires capital-intensive heavy equipment (excavators, dump trucks, drill rigs), it yields superior operating EBITDA margins of approximately 30% under multi-year, hard-currency cost-plus contracts."),
            ("Flagship concessions: Lobito Rail Corridor and International Airports.", "The Concessions vertical provides long-term annuity cash flows. Mota-Engil Africa is a cornerstone partner in the landmark Lobito Atlantic Railway (LAR) concession in Angola (a 30-year concession consortium with Trafigura and Vecturis, supported by $250m in US DFC direct funding and $200m from the Africa Finance Corporation to evacuate DRC critical minerals). In the aviation sector, the company holds operating concessions for the new International Airport of Luanda (Angola) and major airport hubs in Nigeria (Abuja and Kano International Airports)."),
            ("Operating holding company structure centralizes cash collection.", "Management clarified the group's legal and cash flow architecture. Mota-Engil Africa acts as the central contracting and treasury engine: it generates $600m in standalone turnover through direct operational branches and directly collects 98% of the cash flows generated by all African subsidiaries and joint ventures. Cash is aggregated into offshore European bank accounts, minimizing sub-Saharan currency convertibility and trapped cash risks."),
            ("Capital expenditure funding strategy and planned bond debut.", "Annual capital expenditure runs at ~$280–300m, driven by machinery fleet renewals for contract mining and major rail works. Management's strategic objective is to fund heavy equipment capex with matched long-term debt rather than drawing down short-term operating cash. To achieve this, the company is preparing an inaugural institutional bond offering of approximately $300m, which will establish an independent capital markets presence and refinance local bank credit lines.")
        ],
        "guidance_table": [
            ("Order Book Visibility", "$10.5 billion contracted and fully financed order book across Africa; covers 4–5 years of revenue."),
            ("Standalone Africa Revenue", "$600m standalone revenue generated directly at the Mota-Engil Africa level."),
            ("EBITDA Margins", "Core E&C margins running 12–15%; Contract Mining yielding superior ~30% EBITDA margins."),
            ("Capex Forecast", "2026 capex forecasted at ~$280m (vs $284m in 2025 and $320m in 2024); dedicated to heavy mining machinery."),
            ("Cash Centralization", "98% of consolidated African cash flow collected into central Mota-Engil Africa treasury accounts."),
            ("Growth Velocity", "Achieved 2.5x growth over the past 5-year cycle while maintaining positive operating margins."),
            ("Capital Raising Target", "Targeting ~$300m debut debt issuance to optimize working capital and term out equipment capex.")
        ],
        "funding_table": [
            ("Debt Structure", "Currently funded via local working capital lines, bilateral ECA equipment financing, and parent loans."),
            ("Planned Bond Issuance", "Exploring debut $300m senior debt issuance in international capital markets; timing subject to market conditions."),
            ("Cash Flow Collection Platform", "Offshore treasury centralization platform in Europe captures 98% of operational receipts."),
            ("Strategic Shareholder", "32% owned by China Communications Construction Company (CCCC), providing immense balance-sheet backing."),
            ("Concession Portfolio", "Long-term infrastructure concessions include Lobito Corridor rail (Angola) and Abuja/Kano airports (Nigeria).")
        ],
        "watch_items": [
            "Official announcement and roadshow launch for the planned $300m inaugural bond offering.",
            "Execution milestones and freight volume throughput along the Lobito Atlantic Railway corridor in Angola.",
            "Quarterly order book intake vs burn-rate prints across African infrastructure verticals.",
            "Performance and renewal of major tier-one contract mining agreements (e.g. Endeavour Mining).",
            "Bilateral infrastructure financing disbursements from Chinese and European development institutions."
        ],
        "in_our_view": [
            "Mota-Engil Africa is an industrial powerhouse with an unmatched 80-year operating heritage on the African continent. Unlike Western construction contractors that retreated from Africa, Mota-Engil leaned into the continent, pairing Portuguese engineering expertise with the financial and geopolitical muscle of its 32% shareholder, Chinese state giant CCCC. Its $10.5 billion order book is exceptionally high quality, composed entirely of funded, multilateral-backed infrastructure and high-margin contract mining contracts (~30% EBITDA margin).",
            "The company's planned $300m debut capital markets bond represents an intriguing upcoming credit opportunity. With 98% of cash flow centralized at the offshore holding company level and hard-currency contracts insulating the business from local currency devaluations, the credit profile is far more robust than typical frontier corporate issuers. The Lobito Corridor rail concession further cements Mota-Engil as a critical geopolitical partner to both the United States and the EU. We view Mota-Engil Africa as a high-potential new issuer to monitor closely."
        ]
    }
]
'''

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part1.py", "w", encoding="utf-8") as f:
    f.write(part1_code.strip() + "\n")
print("Successfully updated notes_data_part1.py")

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part2.py", "w", encoding="utf-8") as f:
    f.write(part2_code.strip() + "\n")
print("Successfully updated notes_data_part2.py")
