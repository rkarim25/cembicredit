# Generator for wide 3-column meeting notes data - Part 3
import os
import sys

part3_data = '''# Notes Data Part 3: Energy JPM, Hungary, Brazil Election, EM Conf
# Formatted with wide 3-column Guidance and Funding tables to optimize Notion page width.

NOTES_PART3 = [
    # 13. ENERGY JPM (16-Sep-2026)
    {
        "id": "energy_jpm",
        "short_name": "Energy JPM",
        "name": "Global Energy & Refining Strategy",
        "ticker": "ENERGY",
        "country": "Global / Middle East",
        "sector": "Energy / Oil, Gas & Refining Infrastructure",
        "date": "16-Sep-2026",
        "is_corporate": False,
        "title": "Energy JPM — Sector Thematic Panel, EM Investor Conference (16-Sep-2026)",
        "metadata": "Date: 16-Sep-2026 | Format: Macro / Industry thematic panel (Energy strategists, refining executives) | Scope: Global oil flows, maritime choke point disruptions (Strait of Hormuz, Red Sea), refining crack spreads, and energy transition.",
        "key_points": [
            ("Maritime choke point reallocation", "The partial closure and heightened security risks across the Strait of Hormuz have forced massive structural rerouting of Middle Eastern crude flows, with Saudi Aramco maximizing pipeline flows through the East-West pipeline to Yanbu on the Red Sea and ADNOC directing volumes via the Fujairah pipeline to the Gulf of Oman."),
            ("Refining crack spread divergence", "Middle distillate cracks (diesel, jet fuel) remain heavily elevated due to structural European supply deficits and shipping reroutings around the Cape of Good Hope, whereas global gasoline crack spreads have softened under sluggish consumer demand."),
            ("Chinese refining optimization", "Chinese teapot and state refiners have aggressively optimized feedstocks by maximizing intake of heavily discounted Russian ESPO/Urals and Iranian barrels, while keeping domestic refinery utilization disciplined to limit domestic product gluts and preserve storage buffers."),
            ("European refining margin squeeze", "European coastal refiners face acute margin headwinds from punitive EU ETS carbon permit costs ($70–80/tonne), elevated natural gas utility charges, and strict secondary biofuel blending mandates, widening their competitive disadvantage versus US and Gulf refiners."),
            ("US Gulf Coast advantage", "US Gulf Coast refiners (Valero, Marathon) continue to enjoy record competitive advantages from cheap, abundant Permian associated natural gas and unconstrained access to light tight oil feedstocks."),
            ("Global upstream underinvestment", "Panelists highlighted that chronic underinvestment in conventional upstream greenfield oil and gas projects over the past five years leaves global supply vulnerable to any sustained geopolitical outage.")
        ],
        "takeaways": [
            ("Geopolitical crisis tests Middle East bypass infrastructure.", "The panel analyzed the operational efficacy of Middle Eastern crude bypass pipelines during the recent Strait of Hormuz crisis. While the closure of maritime traffic through the Strait presented an unprecedented risk to ~20% of global petroleum consumption, Saudi Arabia's 5.0 mb/d East-West crude pipeline to the Red Sea port of Yanbu and the UAE's 1.5 mb/d Habshan-Fujairah pipeline absorbed critical volumes. However, logistical bottlenecks at Yanbu and tanker availability constraints in the Red Sea demonstrated that bypass pipelines can mitigate, but never fully replace, open transit through Hormuz."),
            ("Crack spread bifurcation: Distillate strength versus gasoline weakness.", "Refining specialists highlighted the divergence across the refined product barrel. Middle distillates—particularly ultra-low sulfur diesel (ULSD) and aviation kerosene—command massive premium cracks. This tightness is driven by the structural loss of Russian refined products into Europe, protracted voyage times as tankers detour around the Cape of Good Hope (adding 10–14 days per voyage), and limited hydrocracking capacity additions globally. Conversely, gasoline cracks have normalized lower as vehicle fuel efficiency gains and EV adoption in China dampen road transport demand."),
            ("Chinese refining mercantilism and strategic crude stockpiling.", "China's downstream refining sector continues to operate on a distinct commercial logic. Refiners have capitalized on sanctions-hit barrels, absorbing discounted Russian and Iranian crude into bonded commercial and strategic petroleum reserves (SPR). Rather than flooding export markets, Beijing has maintained strict export quota allocations for clean products, effectively restricting product supply to the rest of Asia to support domestic petrochemical feedstocks."),
            ("European refining industry caught in regulatory pincer.", "European refining assets are experiencing terminal structural decline. On top of high electricity and pipeline natural gas feedstocks, European operators must purchase EU ETS carbon emission allowances for every ton of CO2 emitted. This adds a structural $4.00–6.00/bbl operational penalty compared to Middle Eastern and US refiners, accelerating the timeline for European refinery closures or conversions into renewable diesel / SAF terminals.")
        ],
        "guidance_headers": ["Metric", "Conference Guidance / Management Stance", "Buy-Side Desk Assessment & Credit Implication"],
        "guidance_table": [
            ("Global Oil Demand Growth", "Forecasted at +1.0 to 1.2 mb/d, driven predominantly by Asian petrochemical demand and non-OECD aviation.", "Provides steady underlying floor for benchmark crude prices despite Chinese property sector stagnation."),
            ("Middle Distillate Cracks", "Expected to remain structurally elevated ($20–25/bbl over Brent) due to maritime shipping detours and hydrocracker tightness.", "Exceptional cash flow margins for complex coastal refiners capable of processing heavy sour crude."),
            ("Gasoline Cracks", "Guided to trade within historical ranges ($10–14/bbl), pressurized by seasonal demand roll-off and EV penetration.", "Weak gasoline margins incentivize refiners to maximize diesel/jet yields."),
            ("Middle East Crude Flows", "Yanbu and Fujairah bypass pipeline utilization running at multi-year highs; Red Sea tanker freight rates elevated.", "Highlights strategic value of sovereign bypass infrastructure; benefits national oil companies with pipeline access."),
            ("EU ETS Compliance Drag", "Carbon allowance costs adding $4.00–6.00/bbl operational penalty on European refinery run rates.", "Accelerates European refining rationalization and structural dependence on imported fuels."),
            ("US Refining Advantage", "US Gulf Coast refiners benefiting from sub-$2.50/MMBtu Henry Hub gas and domestic crude supply.", "Structural energy cost advantage cements US downstream operators as global margin leaders.")
        ],
        "funding_headers": ["Facility / Debt Silo", "Current Balance & Terms", "Maturity & Refi Strategy / Desk Assessment"],
        "funding_table": [
            ("Global Upstream Capex", "Upstream capital expenditure remains disciplined; oil majors allocating cash to buybacks rather than mega-projects.", "Maintains structural supply discipline, keeping market tight and supporting medium-term energy debt."),
            ("Downstream Mega-Projects", "New global refining additions concentrated in the Middle East (Al-Zour, Duqm, Jazan) and China (Yulong Petrochemical).", "Massive, modern complexes capture lowest unit operating costs, depressing older European refining economics."),
            ("Shipping & Tanker Financing", "Clean and dirty tanker freight rates elevated; VLCC and Suezmax charter rates delivering strong cash flow.", "Maritime logistics bottlenecks generate bumper earnings for commodity transport credits.")
        ],
        "watch_items": [
            "Maritime security developments and military escort operations in the Strait of Hormuz and Bab el-Mandeb.",
            "Chinese clean product export quota releases for Q4 2026 and Q1 2027.",
            "European refinery rationalization and permanent capacity closure announcements ahead of winter.",
            "US Gulf Coast refinery turnaround schedules and Atlantic Basin distillate inventory draws."
        ],
        "in_our_view": [
            "The global energy complex is navigating an era of acute geopolitical fragmentation. The partial disruptions around Hormuz and the Red Sea have laid bare the structural vulnerability of global supply chains, while highlighting the immense strategic value of bypass pipeline infrastructure (Saudi East-West and UAE Fujairah lines). For credit investors, the clear winners are low-cost National Oil Companies (Aramco, ADNOC) and merchant refiners located in energy-advantaged jurisdictions (US Gulf Coast and the Middle East).",
            "Conversely, European independent refiners and chemical producers face a protracted competitive squeeze driven by EU ETS carbon taxes, high gas costs, and decarbonization mandates. In the Eurobond market, we maintain an Overweight stance on integrated Middle Eastern energy infrastructure debt and select commodity transport credits, while avoiding energy-intensive European chemical issuers exposed to margin erosion."
        ]
    },

    # 14. HUNGARY SOVEREIGN (15-Sep-2026)
    {
        "id": "hungary_sovereign",
        "short_name": "Hungary",
        "name": "Republic of Hungary / AKK",
        "ticker": "HUNGARY",
        "country": "Hungary",
        "sector": "Sovereign / Central & Eastern Europe",
        "date": "15-Sep-2026",
        "is_corporate": False,
        "title": "Hungary — Sovereign Presentation, EM Investor Conference (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Sovereign presentation & Q&A (Gergo - Senior Representative of AKK / former OTP Chief Economist) | Scope: Macroeconomic outlook, fiscal consolidation roadmap, Eurobond issuance strategy, and EU fund relations.",
        "key_points": [
            ("Fiscal deficit challenges", "The budget deficit is expected to reach ~7.5% of GDP in 2026, driven by high pre-election spending and social transfers inherited from the previous administration, requiring an urgent fiscal pivot."),
            ("Expenditure-based fiscal consolidation", "The government has established a binding target to compress the deficit to 3.0% of GDP by 2030, emphasizing expenditure-side cuts and public investment rationalization rather than growth-choking tax increases."),
            ("Central bank monetary orthodoxy", "The Magyar Nemzeti Bank (MNB) under new leadership has adopted an orthodox, hawkish monetary stance to anchor inflation expectations, maintain real interest rate premia, and defend forint (HUF) currency stability."),
            ("Foreign currency reserve accumulation", "The central bank has proactively accumulated substantial foreign currency reserves, providing an extensive cushion to defend against external currency speculation."),
            ("Resumption of selective EU fund inflows", "Select EU development grants and Recovery and Resilience Facility (RRF) loan tranches are beginning to disburse following administrative compromises with Brussels, alleviating sovereign financing pressure."),
            ("Prudent AKK debt management", "Government Debt Management Agency (AKK) has largely completed its 2026 external borrowing program; FX-denominated debt is strictly managed to remain below the 30% statutory ceiling of total public debt.")
        ],
        "takeaways": [
            ("The imperative of fiscal consolidation toward 3% by 2030.", "Gergo provided a candid assessment of Hungary's fiscal imbalances. The 2026 budget deficit of ~7.5% of GDP reflects the legacy of fiscal expansion, elevated debt service costs, and subsidized energy schemes. Management outlined a multi-year consolidation roadmap designed to bring the deficit under the Maastricht 3% ceiling by 2030. Importantly, the administration has pledged to achieve this adjustment primarily through spending containment—postponing non-essential state infrastructure projects and trimming public sector operational outlays—to avoid depressing private sector corporate investment."),
            ("Monetary orthodoxy and forint defense.", "The presentation highlighted a decisive shift in central bank policy under new leadership. The MNB has firmly abandoned unconventional monetary experiments, committing to positive real interest rates to permanently curb inflation. Large-scale FX reserve accumulation ensures that the central bank possesses ample firepower to counter disorderly HUF depreciations, reassuring international bondholders regarding foreign currency debt sustainability."),
            ("Navigating the EU funding impasse.", "Addressing international investor concerns regarding relations with the European Commission, the speaker described an evolving, pragmatic equilibrium. While political friction persists, technical milestones on judicial and public procurement benchmarks have unlocked critical tranches of EU cohesion funds and RRF loans. These hard-currency transfers are being channeled directly into infrastructure and green transition projects, reducing the sovereign's reliance on external commercial bond markets."),
            ("AKK external borrowing and FX debt ceiling.", "AKK has executed a disciplined pre-funding strategy, issuing benchmark USD and EUR Eurobonds earlier in the year to pre-fund upcoming redemptions. The sovereign's FX-denominated debt share is kept strictly within statutory limits (target <30% of total public debt), ensuring that currency swings do not mechanically inflate the debt-to-GDP ratio (currently standing around 73–74%).")
        ],
        "guidance_headers": ["Metric", "Conference Guidance / Management Stance", "Buy-Side Desk Assessment & Credit Implication"],
        "guidance_table": [
            ("Budget Deficit Target", "Projected at ~7.5% of GDP in 2026; binding consolidation path targets 3.0% of GDP by 2030.", "Consolidation path is necessary to avert rating downgrades; requires strict spending discipline across public ministries."),
            ("GDP Growth Outlook", "Economic expansion recovering toward 1.5–2.0%, supported by export manufacturing and battery plant investments.", "Export growth sensitive to German automotive industrial cycle and EU EV demand."),
            ("Public Debt / GDP", "Debt-to-GDP ratio stabilizing around 73–74%; targeted to decline toward 65% by 2030.", "High debt stock keeps interest burden elevated, limiting discretionary fiscal flexibility."),
            ("Monetary Policy Stance", "MNB committed to positive real interest rates and forint stability; inflation targeting priority.", "Hawkish orthodoxy stabilizes the forint (HUF) and protects international bondholder returns."),
            ("FX Debt Ratio Ceiling", "Statutory cap mandates foreign-currency debt must remain below 30% of total public debt.", "Prudent debt ceiling protects sovereign balance sheet from currency depreciation shock."),
            ("EU Fund Inflows", "RRF loan tranches and cohesion disbursements releasing gradually under agreed compliance milestones.", "Crucial non-debt hard-currency inflow supporting public investment and central bank reserves.")
        ],
        "funding_headers": ["Facility / Debt Silo", "Current Balance & Terms", "Maturity & Refi Strategy / Desk Assessment"],
        "funding_table": [
            ("Outstanding Eurobonds", "Liquid sovereign curve spanning EUR and USD benchmarks maturing between 2027 and 2053.", "Spreads trade with a persistent political risk premium against CEE peers (Poland, Czech Republic)."),
            ("2026 Funding Plan", "External commercial borrowing program for 2026 largely completed; focus shifting to domestic retail bonds.", "Front-loaded external issuance eliminates near-term sovereign new-issue supply pressure."),
            ("Credit Ratings", "Fitch BBB (Negative) / S&P BBB- (Stable) / Moody's Baa2 (Stable).", "Fitch Negative outlook reflects deficit slippage; consolidation delivery is critical to prevent loss of BBB status."),
            ("FX Reserve Cushion", "Substantial central bank foreign currency reserves provide robust import and debt-service coverage.", "Provides strong external liquidity defense against speculative currency attacks.")
        ],
        "watch_items": [
            "Official 2027 budget proposal submission to parliament and deficit reduction targets.",
            "Magyar Nemzeti Bank (MNB) interest rate decision cycles and forint (HUF) currency volatility.",
            "European Commission audit reviews on rule-of-law milestones and subsequent EU fund disbursement schedules.",
            "Rating agency review dates (monitoring Fitch's Negative outlook on the BBB rating).",
            "German industrial demand and electric vehicle battery supply chain export prints."
        ],
        "in_our_view": [
            "Hungary presents a classic sovereign spread-premium opportunity characterized by fiscal challenges balanced by monetary orthodoxy. While a 7.5% budget deficit is indisputably elevated, AKK's professional debt management agency has pre-funded external borrowing needs, and the MNB has established credible inflation-fighting credentials that anchor the forint. Gradual releases of EU funding remove catastrophic balance-of-payments tail risk.",
            "From an EM sovereign portfolio perspective, Hungarian hard-currency Eurobonds trade at attractive concessions compared to BBB-rated peers (yielding ~5.8–6.3% in USD). The primary catalyst to unlock spread tightening is concrete parliamentary passage of the 2027 austerity budget to validate the path toward 3.0% by 2030. We maintain a Neutral stance with an upward bias on longer-dated Eurobonds."
        ]
    },

    # 15. BRAZIL ELECTION (15-Sep-2026)
    {
        "id": "brazil_election",
        "short_name": "Brazil Election",
        "name": "Brazil Presidential Election & Fiscal Outlook",
        "ticker": "BRAZIL",
        "country": "Brazil",
        "sector": "Sovereign / Latin America Macro & Fiscal Strategy",
        "date": "15-Sep-2026",
        "is_corporate": False,
        "title": "Brazil Presidential Election — Political & Fiscal Panel, EM Investor Conference (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Macro / Political strategy panel (Leading Brazilian political analysts, chief economists) | Scope: 2026 general election scenarios, fiscal framework sustainability, public debt trajectory, and central bank independence.",
        "key_points": [
            ("Lula re-election bid & polarized contest", "President Luiz Inácio Lula da Silva is widely expected to seek a fourth presidential term in October 2026, setting up a deeply polarized contest against a conservative opposition coalition led by regional governors (Tarcísio de Freitas of São Paulo or Romeu Zema of Minas Gerais)."),
            ("Fiscal framework credibility under pressure", "The fiscal framework (arcabouço fiscal) is facing extreme credibility strains: mandatory social spending growth (health, education, social security) is colliding with revenue shortfalls, leaving the primary surplus targets consistently missed without aggressive accounting maneuvers."),
            ("Debt-to-GDP trajectory approaching 80%", "Gross general government debt is projected to approach 80–82% of GDP by late 2026 / 2027, raising alarms among institutional investors regarding long-term fiscal solvency in the absence of constitutional spending caps."),
            ("Central bank autonomy under Galípolo", "The upcoming leadership transition at the Banco Central do Brasil (BCB) is under intense market scrutiny. The incoming governor (Gabriel Galípolo) must establish anti-inflation credibility and prove institutional independence from executive pressure to slash Selic interest rates prematurely."),
            ("Agribusiness and commodity buffer", "Brazil's structural trade surplus remains exceptionally robust ($80–90bn annualised), driven by bumper soybean, corn, and iron ore export volumes, providing an essential balance-of-payments cushion that defends the Brazilian Real (BRL)."),
            ("Market reform pricing", "Fixed-income markets are already pricing a substantial fiscal risk premium into the NTN-F and sovereign Eurobond curves, creating asymmetrical upside if post-election politics deliver structural administrative and tax reform.")
        ],
        "takeaways": [
            ("The 2026 electoral landscape: Continuity versus centre-right reform.", "The panel dissected the political dynamics governing the October 2026 general election. While President Lula retains a formidable base among lower-income voters supported by expanded Bolsa Família and minimum wage increases, his approval ratings have eroded among middle-class voters concerned with inflation and public security. The centre-right opposition is coalescing around São Paulo Governor Tarcísio de Freitas, whose market-friendly infrastructure track record and fiscal conservatism make him the favored candidate of the domestic and international business community. However, political analysts cautioned that unseating an incumbent president with access to state resources remains an uphill battle."),
            ("The fiscal arithmetic impasse: Why revenue-based adjustment has failed.", "Economists presented a detailed critique of Finance Minister Fernando Haddad's fiscal strategy. The administration's attempt to achieve primary fiscal balance exclusively through revenue enhancements (closing tax loopholes, taxing offshore funds, reforming corporate subsidies) has reached political and mathematical exhaustion. Congress is refusing to approve further tax hikes, while mandatory constitutionally indexed expenditures continue to expand faster than GDP. Without structural spending caps—such as de-indexing pensions and social benefits from the minimum wage—Brazil's primary deficit will keep debt-to-GDP on an unsustainable upward drift."),
            ("Banco Central do Brasil: The credibility test.", "The panel addressed market anxiety surrounding the monetary policy committee (Copom) as Gabriel Galípolo assumes the governorship. To anchor de-anchored inflation expectations and prevent a sharp depreciation of the BRL, Copom will be forced to maintain a restrictive Selic policy rate (running at high real interest rates of 6.0–7.0%). Panelists argued that any political surrender to executive pressure for rate cuts would immediately steepen the yield curve and trigger capital flight."),
            ("The agricultural and energy balance-of-payments shield.", "Crucially, panelists highlighted that Brazil does not face an external solvency crisis. Foreign exchange reserves exceed $350bn, external debt is low, and the trade surplus continues to smash records thanks to agricultural productivity and offshore pre-salt oil production from Petrobras. This external strength isolates Brazil from traditional balance-of-payments crises, meaning the sovereign risk is entirely fiscal and domestic.")
        ],
        "guidance_headers": ["Metric", "Conference Guidance / Management Stance", "Buy-Side Desk Assessment & Credit Implication"],
        "guidance_table": [
            ("Primary Fiscal Balance", "Targeting primary balance around 0.0% of GDP; market consensus projects primary deficit of 0.6–0.8% of GDP.", "Persistent primary deficits require structural expenditure reforms; revenue measures have reached political limit."),
            ("Gross Debt / GDP", "Projected to drift toward 80–82% of GDP by 2026–2027 without structural entitlement reforms.", "High debt trajectory keeps domestic term premia elevated across the yield curve."),
            ("Real GDP Growth", "Economic growth tracking ~2.0–2.2%, supported by private consumption and record agricultural harvests.", "Resilient economic activity supports tax collections but complicates central bank disinflation efforts."),
            ("Copom Monetary Stance", "Selic policy rate maintained in restrictive territory; real interest rates held at 6.0–7.0% to anchor expectations.", "High real yields provide powerful carry support for the BRL but inflate public debt servicing costs."),
            ("Annual Trade Surplus", "Projected at $80–90 billion, driven by record grain harvests, animal protein, and crude oil exports.", "Massive external buffer protects sovereign balance of payments against global macro shocks."),
            ("FX Reserve Cushion", "Over $350 billion in central bank foreign exchange reserves.", "Completely eliminates sovereign foreign-currency external default risk.")
        ],
        "funding_headers": ["Facility / Debt Silo", "Current Balance & Terms", "Maturity & Refi Strategy / Desk Assessment"],
        "funding_table": [
            ("Sovereign Eurobonds", "Liquid benchmark curve spanning USD-denominated global bonds maturing out to 2054.", "Spreads trade with fiscal risk premium; highly liquid paper for active duration positioning."),
            ("Domestic Debt (NTN-F)", "Domestic fixed-rate (NTN-F) and inflation-linked (NTN-B) bonds issued by the National Treasury.", "Yield curves feature steep term premia, offering high double-digit nominal yields to local EM debt investors."),
            ("Sovereign Credit Ratings", "S&P BB (Stable) / Fitch BB (Stable) / Moody's Ba1 (Positive).", "Upgrade to investment grade (BBB-) is completely blocked until public debt trajectory stabilizes.")
        ],
        "watch_items": [
            "Official candidate declarations and coalition-building ahead of the 2026 presidential election.",
            "Congressional debates on structural expenditure containment and minimum wage indexation reforms.",
            "Copom interest rate decisions and voting split under Governor Gabriel Galípolo.",
            "Monthly primary budget balance prints vs the arcabouço fiscal targets.",
            "Evolution of the 10-year local NTN-F yield and USD/BRL currency volatility."
        ],
        "in_our_view": [
            "Brazil represents the quintessential emerging market macro trade: exceptional external strength masking profound domestic fiscal vulnerability. With $350bn+ in FX reserves and an $85bn+ trade surplus, the sovereign is virtually immune to a hard-currency external debt crisis. However, the political unwillingness to tackle mandatory entitlement spending leaves public debt on a remorseless march toward 80%+ of GDP, keeping real interest rates suffocatingly high.",
            "For EM credit investors, the Brazilian sovereign curve offers compelling carry. In Eurobonds, Brazil's BB-rated paper trades at tight spreads given its pristine external liquidity. The true alpha opportunity resides in local currency debt (NTN-F) and the BRL, where high real yields (>6.5%) provide exceptional carry cushion. We recommend an Overweight carry posture in short-to-intermediate domestic rates, while maintaining an underweight stance on long-dated fiscal duration until the 2026 election provides political clarity."
        ]
    },

    # 16. J.P. MORGAN EM CREDIT CONFERENCE (15-Sep-2026)
    {
        "id": "em_credit_conf",
        "short_name": "EM Conf",
        "name": "J.P. Morgan EM Credit Conference Overview",
        "ticker": "MACRO",
        "country": "Global Emerging Markets",
        "sector": "Cross-Asset / Macro Credit Strategy",
        "date": "15-Sep-2026",
        "is_corporate": False,
        "title": "J.P. Morgan EM Credit Conference — Macro & Cycle Overview (15-Sep-2026)",
        "metadata": "Date: 15-Sep-2026 | Format: Macro / Cross-asset strategy presentation & CIO Roundtable | Scope: Emerging market corporate fundamentals, global interest rate easing cycles, default rate trajectories, and portfolio positioning.",
        "key_points": [
            ("Corporate fundamental resilience", "EM corporate credit fundamentals enter late 2026 in robust health: average net leverage across CEMBI Broad Diversified sits at ~2.4x (well below US High Yield at ~3.5x), supported by multi-year conservative capital expenditure and aggressive balance sheet pre-funding."),
            ("Historically low default rates", "Corporate default rates across CEMBI are projected to remain benign at 2.2% in 2026 and 2.5% in 2027 (excluding distressed sovereign-linked situations in Ukraine and Argentina), significantly outperforming historical 10-year averages."),
            ("Global central bank easing cycle tailwind", "Simultaneous policy rate cuts by the Federal Reserve and the European Central Bank are establishing a powerful global monetary tailwind, loosening financial conditions, re-opening international primary bond markets, and sparking institutional crossover inflows into EM debt."),
            ("Net negative primary supply dynamic", "Net financing in EM hard-currency corporate debt remains negative for the third consecutive year (redemptions, tenders, and coupon payments exceed gross new issuance), creating a structural technical scarcity that anchors secondary bond spreads."),
            ("Superior risk-adjusted carry", "EM corporate high-yield paper offers an average yield of 7.8–8.2% with lower duration (4.2 years) and higher credit quality (substantial BB exposure) relative to developed market high-yield equivalents."),
            ("Geopolitical & tariff bifurcation", "Investors are increasingly differentiating between credits insulated from Western-Chinese geopolitical friction (GCC infrastructure, Latin American nearshoring, African critical minerals) versus export manufacturers exposed to potential trade tariff escalations.")
        ],
        "takeaways": [
            ("The structural decoupling of EM corporate fundamentals from sovereign stress.", "Conference strategists highlighted the persistent mispricing of EM corporate credit relative to EM sovereigns. Over the past five years, emerging market corporate issuers have operated with rigorous financial conservatism—curbing debt-financed M&A, paying down expensive dollar debt, and extending debt maturity profiles. Consequently, average net leverage (2.4x) and interest coverage (>5.0x) are superior to US and European corporate peers. Crucially, corporate default rates have decoupled from sovereign distress, demonstrating that private sector champions can thrive even within macro-challenged jurisdictions."),
            ("The technical tailwind of negative net debt issuance.", "The conference placed heavy emphasis on favorable supply-demand technicals. Because EM corporate CFOs prioritized cash preservation and utilized local banking markets, gross Eurobond issuance has fallen far short of scheduled debt amortisation. With more than $60bn in net negative supply exiting the market in 2026, institutional investors facing large cash coupon reinvestment needs are forced to bid for secondary paper, creating an impenetrable technical floor for bond prices."),
            ("Navigating the global easing cycle and crossover inflows.", "With the US Fed and ECB actively cutting policy rates, cash yields on developed money market funds are collapsing from 5% toward 3%. This is driving global asset allocators into emerging market corporate fixed income to preserve yield. Strategists noted that institutional 'crossover' investors (US and European high-yield and investment-grade managers) are allocating aggressively to BB-rated EM corporates, where they can capture 150–200 bps of spread pick-up without taking excessive default risk."),
            ("Key regional themes: Middle East ascendancy and LatAm nearshoring.", "Across conference panels, two regional themes dominated asset allocator interest: First, the Gulf Cooperation Council (GCC) has cemented its status as the premier high-grade and high-yield infrastructure sanctuary, offering bulletproof liquidity and sovereign alignment. Second, Latin American industrials and miners (outside Brazil's domestic fiscal noise) are capturing long-term structural gains from North American supply chain nearshoring and the global energy transition (copper and critical minerals).")
        ],
        "guidance_headers": ["Metric", "Conference Guidance / Management Stance", "Buy-Side Desk Assessment & Credit Implication"],
        "guidance_table": [
            ("EM Corporate Default Rate", "Forecasted at 2.2% in 2026 and 2.5% in 2027 (CEMBI Broad Diversified excluding Ukraine/Argentina).", "Extremely benign credit loss cycle; default risk is highly concentrated in idiosyncratic credits rather than systemic."),
            ("CEMBI Average Net Leverage", "Reported at ~2.4x net debt / EBITDA across the corporate universe (vs 3.5x in US High Yield).", "Superior balance sheet capitalization provides robust cushion against global economic slowdown."),
            ("Net Market Supply", "Negative net issuance guided at -$50bn to -$65bn for full-year 2026 across EM corporate hard currency.", "Structural cash scarcity anchors secondary spreads and drives strong primary market oversubscriptions."),
            ("Average High-Yield Yield", "Trading between 7.8% and 8.2% across EM HY corporate indices with average duration of ~4.2 years.", "Offers superior carry per unit of duration compared to US HY (yielding ~7.0% with higher leverage)."),
            ("Interest Coverage Ratio", "EBITDA / interest coverage averaging >5.0x across investment-grade and upper-tier high-yield issuers.", "Ample debt service capacity cushions credits against prolonged higher-for-longer baseline rates.")
        ],
        "funding_headers": ["Facility / Debt Silo", "Current Balance & Terms", "Maturity & Refi Strategy / Desk Assessment"],
        "funding_table": [
            ("Primary Market Pipeline", "Primary Eurobond issuance accelerating as Fed cuts reduce benchmark borrowing coupons.", "Borrowers using market re-opening to term out short-term bank debt and refinance 2027–2028 maturities."),
            ("Crossover Investor Inflows", "Institutional capital returning to EM debt funds as developed cash yields decline toward 3%.", "Provides sustained buying power for benchmark liquid Eurobond issues in LatAm, CEEMEA, and Asia."),
            ("Local Currency Financing", "Domestic banking syndicates and local bond markets in UAE, Turkey, and LatAm absorbing corporate funding needs.", "Reduces reliance on hard-currency Eurobond markets, lowering foreign-exchange refinancing vulnerability.")
        ],
        "watch_items": [
            "Federal Reserve and European Central Bank policy rate cut trajectories and dot-plot projections.",
            "Quarterly CEMBI default rate prints and corporate debt distress ratio metrics.",
            "US presidential administration trade policy and potential universal tariff implementation.",
            "Geopolitical developments across the Middle East (Hormuz/Red Sea) and Ukraine frontline stability.",
            "Gross vs net issuance volumes and global crossover fund flow allocations into EM debt."
        ],
        "in_our_view": [
            "The J.P. Morgan EM Credit Conference confirmed that emerging market corporate fixed income is operating from a position of exceptional balance-sheet strength. Corporate management teams have spent the past three years de-leveraging, refinancing high-cost debt, and building liquidity moats. With average leverage at 2.4x and default rates anchored near historic lows (2.2%), EM corporates offer a fundamentally superior risk-reward profile compared to US High Yield.",
            "The combination of global monetary easing and severe negative net supply creates an ideal environment for carry strategies. As cash yields decline, institutional capital must seek yield in high-conviction EM credits. Our core strategy remains Overweight high-quality BB corporate credits in the Middle East and selective African and Latin American resource producers (copper, gold, natural soda ash) where cash flow conversion is pristine and structural refinancing risk is virtually absent."
        ]
    }
]
'''

with open(r"C:\Users\Reza Karim\cembicredit\scripts\notes_data_part3.py", "w", encoding="utf-8") as f:
    f.write(part3_data.strip() + "\n")
print("Saved notes_data_part3.py with wide 3-column tables.")
