import os
import sys
import json
import requests
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ISSUERS_DIR = os.path.join(ROOT, "database", "issuers")
NEWS_FILE = os.path.join(ROOT, "database", "credit_news.json")
BUILD_SCRIPT = os.path.join(ROOT, "scripts", "build_database.py")

TOKEN = os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY")
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

INBOX_PAGE_ID = "3df1d0ad-68c6-813c-9f07-e7c847880346"
RECEIPTS_TABLE_ID = "3df1d0ad-68c6-81f5-89f7-e450bf669dcc"
RESEARCH_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

from notion_dossier_helper import (
    text_p, heading_2, heading_3, callout, bullet, make_table, create_notion_dossier
)

# -------------------------------------------------------------
# 1. BUILD NOTION DOSSIER FOR GOLAR LNG
# -------------------------------------------------------------
def build_golar_blocks():
    b = []
    b.append(callout("GOLAR LNG (GLNG) — FLNG FLEET OPERATOR & $500M 5NC2 BOND OFFERING\nB2/B (Corp) | B3/B- (Expected HoldCo Notes) | Benchmark: $500M 5NC2 Senior Unsecured | IPTs: High-7% | Fair Value: 7.8%–7.9%", "🚢"))
    
    b.append(heading_2("Investment Thesis & Credit Verdict"))
    b.append(text_p("Golar LNG operates two FLNG vessels (Hilli, Gimi) and is constructing a third (MKII). The company is marketing a $500m 5NC2 senior unsecured HoldCo bond to refinance its October 2025 notes. IPTs were indicated in the high-7% area, with desk fair value estimated at 7.8%–7.9%."))
    b.append(text_p("Desk View: While Golar benefits from $17bn in long-term EBITDA backlog and high-quality tolling counterparties (BP, SESA), the proposed notes sit at HoldCo without guarantees from the asset-owning operating companies, structurally subordinated behind $1.74bn of priority asset debt. With gross leverage peaking at 15–17x during the construction and relocation phase and Argentina country risk reaching 80% of earnings by 2028, pricing in the mid-7% area offers limited value for an EMD credit investor."))
    
    b.append(heading_2("Credit Strengths"))
    b.append(bullet("Long-dated, capacity-based tolling contracts provide highly predictable EBITDA with minimal commodity or volume risk."))
    b.append(bullet("FLNG Gimi is operational under a 20-year contract with BP at Greater Tortue Ahmeyim."))
    b.append(bullet("EBITDA is projected to expand from $208m LTM to an $865m run-rate in 2028 as Argentina projects ramp."))
    b.append(bullet("Substantial $17bn EBITDA contract backlog securing long-term cash flow visibility."))
    b.append(bullet("Strong liquidity cushion of $783m unrestricted cash at 1H25 ($1,644m pro forma post-issuance and Gimi facility expansion)."))
    b.append(bullet("Argentine projects benefit from the RIGI investment framework and USD-denominated payments with offshore collection."))

    b.append(heading_2("Key Credit Risks"))
    b.append(bullet("Structural Subordination: Notes are issued at HoldCo with zero guarantees or asset liens from operating vessel entities."))
    b.append(bullet("Priority Debt: Asset-level debt increases to $1.74bn, representing 55.8% of total gross debt."))
    b.append(bullet("Peak Leverage: Gross debt to EBITDA peaks at 15–17x during the 2025–2027 development and relocation window."))
    b.append(bullet("Execution Risk: Hilli must undergo a 10–12 month relocation and yard overhaul from Cameroon to Argentina; MKII must be delivered on schedule (4Q27)."))
    b.append(bullet("Sovereign & Counterparty Concentration: Argentina accounts for ~80% of 2028 EBITDA, with Southern Energy S.A. (SESA) as the dominant counterparty."))
    b.append(bullet("Negative Free Cash Flow: Capital expenditures on MKII ($1.4bn remaining) and Hilli relocation drive negative FCF through 2027."))
    b.append(bullet("Shareholder Distributions: $400m of dividends paid from 2021 to 1H25 despite negative underlying FCF."))

    b.append(heading_2("Fleet Portfolio & Operational Assets"))
    b.append(make_table(
        ["Asset", "Status", "Capacity", "Location / Counterparty", "Contract & Timing", "Indicative EBITDA"],
        [
            ["FLNG Hilli", "Operating", "2.45 mtpa", "Cameroon; Perenco & SNH", "Current contract to July 2026", "$138m"],
            ["FLNG Hilli", "Relocation", "2.45 mtpa", "Argentina; SESA", "20-year contract from 2H27", "$285m"],
            ["FLNG Gimi", "Operating", "2.70 mtpa", "Mauritania/Senegal; BP", "20-year tolling agreement", "Main contributor 2026–27"],
            ["FLNG MKII", "Construction", "3.50 mtpa", "Argentina; SESA", "Delivery 4Q27; ops in 2028", "Included in 2028 run-rate"],
            ["Total Portfolio", "Full Run-Rate", "8.65 mtpa", "Africa & Argentina", "Long-term tolling contracts", "$865m run-rate"]
        ]
    ))

    b.append(heading_2("Capital Structure & Debt Subordination"))
    b.append(make_table(
        ["Instrument", "1H25 Amount ($m)", "1H25 PF Amount ($m)", "Security / Location / Priority"],
        [
            ["Hilli Sale-and-Leaseback Debt", "535", "535", "Asset level (Priority claim)"],
            ["Gimi Debt Facility", "642", "1,200", "Asset level (Priority claim)"],
            ["Total Asset-Level Priority Debt", "1,177", "1,735", "Senior secured on operating vessels (55.8%)"],
            ["2025 Unsecured Notes", "190", "—", "HoldCo (Refinanced by new issue)"],
            ["2029 Unsecured Notes", "300", "300", "HoldCo senior unsecured"],
            ["2030 Convertible Notes", "575", "575", "HoldCo unsecured"],
            ["Proposed New 5NC2 Notes", "—", "500", "HoldCo senior unsecured"],
            ["Total HoldCo Subordinated Debt", "1,065", "1,375", "Structurally subordinated, no OpCo guarantees"],
            ["Total Gross Debt", "2,242", "3,110", "Gross debt balloons during build phase"],
            ["Gross Cash", "907", "1,768", "Includes debt facility proceeds"],
            ["Unrestricted Cash", "783", "1,644", "Available liquidity cushion"],
            ["Net Debt", "1,335", "1,342", "Broadly unchanged pro forma"]
        ]
    ))

    b.append(heading_2("Leverage Trajectory"))
    b.append(make_table(
        ["Metric", "1H25 Actual", "1H25 PF (LTM EBITDA)", "2028 PF Run-Rate"],
        [
            ["Asset-Level Priority Debt / EBITDA", "5.6x", "8.3x", "2.0x"],
            ["HoldCo Debt / EBITDA", "5.1x", "6.6x", "1.6x"],
            ["Total Gross Debt / EBITDA", "10.8x", "14.9x (Peak ~17x)", "3.6x"],
            ["Net Debt / EBITDA", "6.4x", "6.4x", "1.6x"],
            ["EBITDA Base Used", "$208m (LTM)", "$208m (LTM)", "$865m (Run-Rate)"]
        ]
    ))

    b.append(heading_2("Historical Financial Performance"))
    b.append(heading_3("Income Statement & Operating EBITDA ($m)"))
    b.append(make_table(
        ["Metric ($m)", "2020", "2021", "2022", "2023", "2024", "1H24", "1H25"],
        [
            ["Total Revenue", "261", "260", "268", "298", "260", "130", "138"],
            ["FLNG Revenue", "226", "221", "215", "245", "225", "112", "125"],
            ["Shipping Revenue", "15", "11", "10", "18", "12", "—", "—"],
            ["FLNG Operating Costs", "(52)", "(51)", "(59)", "(66)", "(82)", "(42)", "(45)"],
            ["Project Development Costs", "(3)", "(3)", "(5)", "(4)", "(7)", "(2)", "(7)"],
            ["Realised Oil & Gas Derivative Gain", "3", "25", "232", "200", "141", "71", "37"],
            ["Consolidated EBITDA", "162", "182", "363", "356", "241", "122", "90"],
            ["FLNG EBITDA", "172", "191", "367", "390", "276", "139", "112"],
            ["Corporate & Other EBITDA", "(17)", "(19)", "(4)", "(44)", "(31)", "(16)", "(22)"]
        ]
    ))

    b.append(heading_3("Cash Flow & Capital Expenditure ($m)"))
    b.append(make_table(
        ["Metric ($m)", "2020", "2021", "2022", "2023", "2024", "1H24", "1H25"],
        [
            ["CFO Pre-Working Capital", "115", "82", "345", "389", "268", "141", "106"],
            ["Working Capital Movement", "(61)", "39", "(66)", "(254)", "12", "(48)", "86"],
            ["Asset Development Additions (Capex)", "(298)", "(213)", "(249)", "(281)", "(330)", "(89)", "(425)"],
            ["Financing Costs", "(13)", "(13)", "(10)", "(10)", "(7)", "(1)", "(11)"],
            ["Free Cash Flow (FCF)", "(258)", "(106)", "20", "(158)", "(80)", "3", "(244)"],
            ["Other Investing Cash Flow", "191", "20", "748", "151", "(25)", "(35)", "83"],
            ["Dividends Paid", "(26)", "(33)", "(55)", "(103)", "(115)", "(57)", "(52)"]
        ]
    ))

    b.append(heading_2("Valuation & Pricing Matrix"))
    b.append(make_table(
        ["Valuation Approach", "Methodology / Comps", "Fair Value Yield", "Desk Weight"],
        [
            ["Asset / Structural Comparison", "Yinson secured & HoldCo debt adjusted for duration, HoldCo subordination & execution", "7.90%", "80%"],
            ["Argentina Counterparty Comp", "Weighted sovereign/corporate yields of YPF, Pampa & PAE", "7.65%", "20%"],
            ["Blended Fair Value", "Weighted Composite", "7.80% – 7.90%", "100%"]
        ]
    ))

    b.append(heading_2("Key Questions for Management"))
    b.append(bullet("Cash Bridge: Detailed annual cash bridge through 2028 detailing MKII capex ($1.4bn), Hilli relocation costs, debt service, and minimum liquidity."))
    b.append(bullet("MKII Capex Overruns: How much of the remaining $1.4bn capex is fixed-price/EPC lump sum versus exposed to cost inflation?"))
    b.append(bullet("Gimi Refinancing: Status, covenants, and conditions precedent for upsizing the facility to $1.2bn."))
    b.append(bullet("HoldCo Ring-Fencing: Why are no OpCo guarantees offered? How much unrestricted cash can be upstreamed past asset-level debt service?"))
    b.append(bullet("Argentina FX Protection: Offshore escrow and payment protections shielding tolling revenues from Argentine transfer/convertibility restrictions."))
    
    return b

# -------------------------------------------------------------
# 2. BUILD NOTION DOSSIER FOR AIR GLOBAL
# -------------------------------------------------------------
def build_air_global_blocks():
    b = []
    b.append(callout("AIR GLOBAL (AIRGLO) — GLOBAL SHISHA TOBACCO & INHALATION RITUALS\nImplied Rating: BB- / B1 | Core Brand: Al Fakher | 99% Hard-Currency Revenue | FY25A EBITDA: $139M (35% Margin) | Net Debt/EBITDA: 2.1x", "💨"))
    
    b.append(heading_2("Company Overview & Business Profile"))
    b.append(text_p("Air Global (Advanced Inhalation Rituals) is the world's leading shisha (hookah) tobacco and flavoured molasses producer, established in 1999 and acquired by Jordanian owners. Its core brand, Al Fakher, is the undisputed global benchmark in molasses-based waterpipe tobacco. Sourcing raw leaf primarily from Poland, the company blends flavours across highly automated manufacturing hubs."))
    b.append(text_p("FX & Geographical Diversification: The business generates ~99% of its revenue in hard currencies (USD, EUR, GCC pegged currencies), insulating it almost entirely from local currency devaluations. Core earnings are concentrated in MEAA (Middle East, Africa, Asia), complemented by established operations in Europe and the Americas."))

    b.append(heading_2("Credit Positives"))
    b.append(bullet("High-Margin Staple Profile: Generates consistent 34–35% reported EBITDA margins, with core shisha operations achieving ~40% EBITDA margin."))
    b.append(bullet("Superb Cash Conversion: FY25A operating cash flow of $116m represents an 83% cash conversion ratio (116% in FY24A)."))
    b.append(bullet("Low Capital Intensity: Annual capex is <5% of revenue ($15m in FY25A; maintenance capex is just $9m), generating strong organic FCF ($101m)."))
    b.append(bullet("Conservative Balance Sheet: Net leverage is low at 2.1x Net Debt / EBITDA, providing ample debt service headroom."))
    b.append(bullet("Working Capital Optimization: Net working capital to revenue has improved from 29.5% in 2023 to 15.8% in 2024 and 12.4% in 2025."))
    b.append(bullet("Hard Currency Cash Flows: 99% of revenues are collected in hard currency."))

    b.append(heading_2("Credit Risks & Watch-Items"))
    b.append(bullet("ESG & Exclusion Risk: Tobacco/nicotine sector exclusion limits institutional bondholder demand and bank lending universe."))
    b.append(bullet("Flavoured Tobacco Regulation: Potential regulatory bans on flavoured shisha or increased excise taxation represent key structural volume risks."))
    b.append(bullet("Regional Concentration: MEAA represents 63.8% of total revenue ($255m) and the entirety of net operating profit."))
    b.append(bullet("New Growth Drag: New Growth Categories (Crown, vapes) are growing rapidly (+42.8% CAGR) but generated a -$19m EBITDA loss in FY25A."))
    b.append(bullet("Americas Contraction: Americas revenue declined -4.5% CAGR between 2023 and 2025 ($87m to $79m) due to vape competition."))

    b.append(heading_2("Financial Summary"))
    b.append(make_table(
        ["Financial Metric ($m)", "2023A", "2024A", "2025A", "Trend / Direction"],
        [
            ["Revenue", "364", "377", "400", "+4.8% CAGR"],
            ["Revenue Growth", "—", "+3.5%", "+6.1%", "Accelerating"],
            ["Adjusted EBITDA", "118", "130", "139", "+8.5% CAGR"],
            ["EBITDA Margin (%)", "32.0%", "34.0%", "35.0%", "Expanding (+300 bps)"],
            ["Operating Cash Flow", "65", "151", "116", "High cash conversion"],
            ["Cash Conversion (%)", "55%", "116%", "83%", "Average >85%"],
            ["Total Capex", "16", "17", "15", "Low capital intensity"],
            ["Capex / Revenue (%)", "4.6%", "4.5%", "3.7%", "Disciplined reinvestment"],
            ["Free Cash Flow (FCF)", "49", "134", "101", "Substantial organic liquidity"],
            ["Net Debt / EBITDA", "2.4x", "2.2x", "2.1x", "Steady deleveraging"]
        ]
    ))

    b.append(heading_2("Segment Performance & Regional Breakdown"))
    b.append(make_table(
        ["Segment / Region", "2023A Revenue ($m)", "2025A Revenue ($m)", "23–25 CAGR", "Strategic Profile"],
        [
            ["MEAA (Core)", "233", "255", "+4.8%", "Dominant market share, 40%+ EBITDA margin"],
            ["Europe", "40", "45", "+6.2%", "Fastest growing mature region; premium lounge demand"],
            ["Americas", "87", "79", "-4.5%", "Volume pressure from alternative nicotine products"],
            ["New Growth Categories", "4", "21", "+42.8%", "Vape/Crown expansion; currently EBITDA negative"],
            ["Total Consolidated", "364", "400", "+4.8%", "Solid organic growth across core franchise"]
        ]
    ))

    b.append(heading_3("EBITDA Contribution by Division ($m)"))
    b.append(make_table(
        ["Operating Division", "2023A EBITDA ($m)", "2025A EBITDA ($m)", "Core Margin Assessment"],
        [
            ["Core Shisha / Molasses Business", "128", "158", "39.5% EBITDA Margin (Cash engine)"],
            ["New Growth Categories", "(10)", "(19)", "Early-stage brand investment drag"],
            ["Consolidated EBITDA", "118", "139", "34.8% Reported EBITDA Margin"]
        ]
    ))

    b.append(heading_2("Consumer Economics & Health Risk Matrix"))
    b.append(make_table(
        ["Product Category", "Annual Consumer Spend ($)", "Relative Affordability / Usage Profile"],
        [
            ["At-Home Shisha", "$108", "Lowest annual spend; occasional social ritual"],
            ["At-Home Coffee", "$200", "Daily routine staple"],
            ["Nicotine Pouches", "$400", "Daily habitual use"],
            ["Starbucks Coffee", "$940", "Discretionary premium daily spend"],
            ["Pod-Based Vapes", "$1,000", "High daily consumption"],
            ["Combustible Cigarettes", "$2,200", "High-cost habitual addiction (20x shisha spend)"]
        ]
    ))

    b.append(heading_3("Product Risk & Harm Reduction Comparison"))
    b.append(make_table(
        ["Characteristic / Risk Factor", "Shisha Molasses", "Combustible Cigarettes", "Vapes / Modern Nicotine"],
        [
            ["Tobacco Content (%)", "~15% (85% molasses & fruit)", "70% – 90% raw tobacco", "0% (purified nicotine)"],
            ["Consumption Method", "Indirect Waterpipe Heating", "Direct Combustion / Burning", "Aerosol Vaporisation"],
            ["Operating Temperature", "~200°C", "400°C – 900°C", "~180°C – 220°C"],
            ["HPHC Toxicant Exposure", "Substantially Lower", "Highest across all categories", "Lower"],
            ["Addictiveness Profile", "Lower (Social / Occasional)", "Very High (Habitual Daily)", "High (Continuous usage)"],
            ["Youth Prevalence (%)", "0.7%", "Moderate", "High (Vapes) / 1.8% (Pouches)"]
        ]
    ))

    b.append(heading_2("Working Capital & Capex Discipline"))
    b.append(make_table(
        ["Working Capital Metric ($m)", "2023A", "2024A", "2025A", "Managerial Commentary"],
        [
            ["Receivables Movement", "(29)", "+24", "(7)", "Stricter distributor credit terms"],
            ["Inventory Movement", "(13)", "+16", "+14", "Lean leaf inventory in Poland/UAE"],
            ["Payables Movement", "0", "+42", "(2)", "Extended supplier terms normalized"],
            ["Trade Working Capital Impact", "(42)", "+42", "+5", "Working capital released back to cash"],
            ["NWC as % of Revenue", "29.5%", "15.8%", "12.4%", "Exceptional operational improvement"]
        ]
    ))

    b.append(heading_2("Overall EMD Credit Desk View"))
    b.append(callout("VERDICT: SOLID BB- / B1 CREDIT PROFILE\nAir Global is a high-margin consumer staples business with exceptional cash generation, low capital expenditure requirements, and conservative balance-sheet leverage (2.1x net debt/EBITDA). The core Al Fakher franchise provides a durable $158M EBITDA base in MEAA with 99% hard-currency revenue. While tobacco ESG exclusions and flavoured nicotine regulatory risks cap bond market multiples, default risk is exceptionally low.", "✅"))
    
    return b

# -------------------------------------------------------------
# MAIN PROCESSING EXECUTION
# -------------------------------------------------------------
def process_inbox():
    print("=== STEP 1: CREATING NOTION DOSSIERS IN RESEARCH DB ===")
    
    # 1. Golar LNG
    print("Creating Golar LNG dossier...")
    golar_blocks = build_golar_blocks()
    golar_page_id = create_notion_dossier(
        title="Golar LNG (GLNG) — FLNG Fleet & $500M Senior Unsecured Notes Assessment",
        sector="Energy / E&P & FLNG",
        country="Argentina",
        region="Africa / LatAm",
        rec="Underweight",
        blocks=golar_blocks
    )
    print(f"Golar LNG Page ID: {golar_page_id}")

    # 2. Air Global
    print("Creating Air Global dossier...")
    air_blocks = build_air_global_blocks()
    air_page_id = create_notion_dossier(
        title="Air Global (AIRGLO) — Global Shisha & Inhalation Rituals Credit Assessment & Model",
        sector="Consumer",
        country="UAE",
        region="Middle East",
        rec="Neutral / Hold",
        blocks=air_blocks
    )
    print(f"Air Global Page ID: {air_page_id}")

    # ---------------------------------------------------------
    # STEP 2: WRITE JSON ISSUER MODELS
    # ---------------------------------------------------------
    print("=== STEP 2: WRITING LOCAL ISSUER JSON MODELS ===")

    # Golar JSON
    golar_json_path = os.path.join(ISSUERS_DIR, "golar.json")
    golar_doc = {
        "metadata": {
            "id": "golar",
            "name": "Golar LNG Limited",
            "ticker": "GLNG",
            "country": "Bermuda",
            "region": "Global EM / LatAm & Africa",
            "sector": "Energy",
            "type": "corp",
            "rating": "B2 / B",
            "tier": "B",
            "benchmark_bond": "GLNG $500M 5NC2",
            "price": 99.5,
            "ytm": 7.85,
            "spread_bp": 420,
            "model_file": "Golar_LNG_Credit_Model.xlsx",
            "notion_id": golar_page_id or "3e31d0ad68c68057a927c03fb44e84e6",
            "last_updated": "2026-09-22",
            "fcf_2024a": -80.0,
            "net_leverage_2024a": 6.4,
            "ebitda_backlog_usd_b": 17.0
        },
        "financials_multi_year": [
            {
                "period": "2020A", "is_audited": True, "revenue": 261.0, "ebitda": 162.0, "ebitda_margin_pct": 62.1,
                "cfo": 54.0, "capex": -298.0, "fcf": -258.0, "cash": 226.0, "gross_debt": 1652.0, "net_debt": 1314.0,
                "net_leverage": 7.2, "interest_coverage": 3.2
            },
            {
                "period": "2021A", "is_audited": True, "revenue": 260.0, "ebitda": 182.0, "ebitda_margin_pct": 70.0,
                "cfo": 121.0, "capex": -213.0, "fcf": -106.0, "cash": 338.0, "gross_debt": 1210.0, "net_debt": 197.0,
                "net_leverage": 0.5, "interest_coverage": 3.5
            },
            {
                "period": "2022A", "is_audited": True, "revenue": 268.0, "ebitda": 363.0, "ebitda_margin_pct": 135.4,
                "cfo": 279.0, "capex": -249.0, "fcf": 20.0, "cash": 1013.0, "gross_debt": 1217.0, "net_debt": 445.0,
                "net_leverage": 1.3, "interest_coverage": 5.8
            },
            {
                "period": "2023A", "is_audited": True, "revenue": 298.0, "ebitda": 356.0, "ebitda_margin_pct": 119.5,
                "cfo": 135.0, "capex": -281.0, "fcf": -158.0, "cash": 771.0, "gross_debt": 1716.0, "net_debt": 999.0,
                "net_leverage": 4.2, "interest_coverage": 4.6
            },
            {
                "period": "2024A", "is_audited": True, "revenue": 260.0, "ebitda": 241.0, "ebitda_margin_pct": 92.7,
                "cfo": 280.0, "capex": -330.0, "fcf": -80.0, "cash": 717.0, "gross_debt": 2241.0, "net_debt": 1334.0,
                "net_leverage": 6.4, "interest_coverage": 3.4
            },
            {
                "period": "1H25A", "is_audited": False, "revenue": 138.0, "ebitda": 90.0, "ebitda_margin_pct": 65.2,
                "cfo": 192.0, "capex": -425.0, "fcf": -244.0, "cash": 907.0, "gross_debt": 2242.0, "net_debt": 1335.0,
                "net_leverage": 6.4, "interest_coverage": 2.8
            },
            {
                "period": "2028E_RunRate", "is_audited": False, "revenue": 1150.0, "ebitda": 865.0, "ebitda_margin_pct": 75.2,
                "cfo": 750.0, "capex": -150.0, "fcf": 450.0, "cash": 600.0, "gross_debt": 1942.0, "net_debt": 1342.0,
                "net_leverage": 1.6, "interest_coverage": 6.5
            }
        ],
        "capital_structure_pf": {
            "asset_level_debt_usd_m": 1735,
            "holdco_debt_usd_m": 1375,
            "total_debt_usd_m": 3110,
            "gross_cash_usd_m": 1768,
            "unrestricted_cash_usd_m": 1644,
            "net_debt_usd_m": 1342,
            "priority_debt_pct": 55.8
        },
        "valuation": {
            "fair_value_yield": "7.8% - 7.9%",
            "ipt_yield": "High-7%",
            "recommendation": "Underweight / Cautious on mid-7% tight pricing given HoldCo structural subordination and 15-17x peak gross leverage."
        }
    }
    with open(golar_json_path, "w", encoding="utf-8") as f:
        json.dump(golar_doc, f, indent=2, ensure_ascii=False)
    print(f"Saved {golar_json_path}")

    # Air Global JSON
    air_json_path = os.path.join(ISSUERS_DIR, "air_global.json")
    air_doc = {
        "metadata": {
            "id": "air_global",
            "name": "Air Global (Advanced Inhalation Rituals)",
            "ticker": "AIRGLO",
            "country": "UAE",
            "region": "Middle East",
            "sector": "Consumer",
            "type": "corp",
            "rating": "BB- / B1",
            "tier": "BB",
            "benchmark_bond": "AIRGLO 2029",
            "price": 100.0,
            "ytm": 7.50,
            "spread_bp": 385,
            "model_file": "Air_Global_Credit_Model.xlsx",
            "notion_id": air_page_id or "3e31d0ad68c680ce85a8e2d84db4a50a",
            "last_updated": "2026-09-22",
            "fcf_2024a": 134.0,
            "net_leverage_2024a": 2.2
        },
        "financials_multi_year": [
            {
                "period": "2023A", "is_audited": True, "revenue": 364.0, "ebitda": 118.0, "ebitda_margin_pct": 32.4,
                "cfo": 65.0, "capex": -16.0, "fcf": 49.0, "cash": 45.0, "gross_debt": 330.0, "net_debt": 285.0,
                "net_leverage": 2.42, "interest_coverage": 4.8
            },
            {
                "period": "2024A", "is_audited": True, "revenue": 377.0, "ebitda": 130.0, "ebitda_margin_pct": 34.5,
                "cfo": 151.0, "capex": -17.0, "fcf": 134.0, "cash": 60.0, "gross_debt": 345.0, "net_debt": 285.0,
                "net_leverage": 2.19, "interest_coverage": 5.2
            },
            {
                "period": "2025A", "is_audited": True, "revenue": 400.0, "ebitda": 139.0, "ebitda_margin_pct": 34.8,
                "cfo": 116.0, "capex": -15.0, "fcf": 101.0, "cash": 70.0, "gross_debt": 362.0, "net_debt": 292.0,
                "net_leverage": 2.10, "interest_coverage": 5.6
            }
        ],
        "segment_performance": {
            "meaa_revenue_2025": 255.0,
            "europe_revenue_2025": 45.0,
            "americas_revenue_2025": 79.0,
            "new_growth_revenue_2025": 21.0,
            "core_ebitda_2025": 158.0,
            "new_growth_ebitda_2025": -19.0
        },
        "desk_verdict": {
            "profile": "Solid BB- / B1 Consumer Staple",
            "cash_conversion_pct": 83.5,
            "capex_intensity_pct": 3.7,
            "hard_currency_pct": 99.0,
            "recommendation": "Neutral / Hold (Default risk low; capped by tobacco ESG exclusions and flavour regulations)"
        }
    }
    with open(air_json_path, "w", encoding="utf-8") as f:
        json.dump(air_doc, f, indent=2, ensure_ascii=False)
    print(f"Saved {air_json_path}")

    # ---------------------------------------------------------
    # STEP 3: UPDATE CREDIT NEWS
    # ---------------------------------------------------------
    print("=== STEP 3: APPENDING CREDIT NEWS HEADLINES ===")
    if os.path.exists(NEWS_FILE):
        with open(NEWS_FILE, "r", encoding="utf-8") as f:
            news = json.load(f)
    else:
        news = []

    news_entries = [
        {
            "id": "news_glng_20260922",
            "date": "2026-09-22",
            "issuer": "Golar LNG (GLNG)",
            "headline": "Golar LNG Launches $500M 5NC2 Senior Unsecured Bond Offering; Desk Flags HoldCo Structural Subordination",
            "summary": "GLNG issues $500M 5NC2 senior notes at IPTs in high-7% area to refinance Oct 2025s. Desk calculates fair value at 7.8%–7.9%. While backed by $17bn contract backlog, bond is structurally subordinated behind $1.74B priority asset debt (55.8%) with gross leverage peaking at 15–17x.",
            "impact": "Neutral / Cautious",
            "category": "New Issue / Refinancing",
            "url": "https://rkarim25.github.io/cembicredit/company.html?id=golar"
        },
        {
            "id": "news_airglo_20260922",
            "date": "2026-09-22",
            "issuer": "Air Global (AIRGLO)",
            "headline": "Air Global Reports FY25A Results: 35% EBITDA Margin, $116M OCF, Net Leverage at 2.1x",
            "summary": "Air Global (Al Fakher shisha leader) posts $400M revenue and $139M Adj. EBITDA for FY25A. Core MEAA business generated $158M EBITDA (40% margin). Capex intensity was low at 3.7% of revenue with 83% cash conversion. 99% hard-currency revenue protects against FX shocks.",
            "impact": "Positive",
            "category": "Earnings / Credit Note",
            "url": "https://rkarim25.github.io/cembicredit/company.html?id=air_global"
        }
    ]

    for ne in news_entries:
        news = [n for n in news if n.get("id") != ne["id"]]
        news.insert(0, ne)

    with open(NEWS_FILE, "w", encoding="utf-8") as f:
        json.dump(news, f, indent=2, ensure_ascii=False)
    print("Updated credit_news.json successfully.")

    # ---------------------------------------------------------
    # STEP 4: WHISK AWAY TO INBOX PROCESSED RECEIPTS TABLE
    # ---------------------------------------------------------
    print("=== STEP 4: APPENDING PROCESSED RECEIPTS IN NOTION INBOX ===")
    table_rows_to_add = [
        [
            "22 Sep 2026",
            "Braskem (BRASKM) & BAKIDE",
            "• Extrajudicial plan filed (39.6% initial support, 9 Oct agreement target, 22 Nov protection).\n• Auditor Trap Caught: Jefferies 50% PIK assumption balloons gross debt to $11.4B and exit leverage to 8.2x by 2029 ($500M/yr cash burn post-PIK).\n• Reconciled: 9.75% exit yield discounts 8Y paper to 87.7¢ (-12.3% par haircut), yielding 62.0¢ true senior economic recovery.\n• Deployed to Restructuring Calculator & Notion note (3e31d0ad)."
        ],
        [
            "22 Sep 2026",
            "Golar LNG (GLNG)",
            "• $500M 5NC2 HoldCo senior unsecured bond offering to refi Oct 2025s (IPTs high-7%, desk fair value 7.8%–7.9%).\n• Structural Subordination: Asset-level debt reaches $1.74B (55.8% of total); notes lack OpCo guarantees.\n• Leverage Bridge: Gross leverage peaks at 15–17x before de-leveraging to 1.6x on 2028 run-rate ($865M EBITDA).\n• Whisked to Research DB dossier & database/issuers/golar.json."
        ],
        [
            "22 Sep 2026",
            "Air Global (AIRGLO)",
            "• Global shisha/hookah leader (Al Fakher, Crown). FY25A: Rev $400M, Adj EBITDA $139M (35% margin), OCF $116M (83% conversion), Net Debt/EBITDA 2.1x.\n• Segments: MEAA core generates $158M EBITDA (40% margin), offsetting -$19M NGC loss.\n• Credit View: Solid BB consumer profile. Low capex (<4% rev), improving NWC (12.4% rev). Key risks are ESG exclusion and flavour regulation.\n• Whisked to Research DB dossier & database/issuers/air_global.json."
        ]
    ]

    for r in table_rows_to_add:
        row_payload = {
            "children": [
                {
                    "type": "table_row",
                    "table_row": {
                        "cells": [
                            [{"type": "text", "text": {"content": r[0]}}],
                            [{"type": "text", "text": {"content": r[1]}}],
                            [{"type": "text", "text": {"content": r[2]}}]
                        ]
                    }
                }
            ]
        }
        res = requests.patch(f"https://api.notion.com/v1/blocks/{RECEIPTS_TABLE_ID}/children", headers=HEADERS, json=row_payload)
        if res.status_code == 200:
            print(f"Appended receipt row for: {r[1]}")
        else:
            print(f"Error appending row for {r[1]}: {res.status_code} {res.text}")

    # ---------------------------------------------------------
    # STEP 5: CLEAN UP RAW DUMP BLOCKS IN INBOX & UPDATE TO-DO
    # ---------------------------------------------------------
    print("=== STEP 5: CLEANING UP RAW DUMP BLOCKS IN NOTION INBOX ===")
    # Fetch blocks of inbox
    url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100"
    all_inbox_blocks = []
    while url:
        res = requests.get(url, headers=HEADERS).json()
        all_inbox_blocks.extend(res.get("results", []))
        if res.get("has_more"):
            url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100&start_cursor={res['next_cursor']}"
        else:
            url = None

    print(f"Total current blocks in inbox: {len(all_inbox_blocks)}")
    
    # Identify blocks to delete:
    # We want to keep:
    # - Block 0: callout (OPEN-ENDED RESEARCH DUMP & DISPATCH)
    # - Block 1: to_do
    # - Block 2: divider
    # - Block 3: heading_2 (📝 Raw Data Dump)
    # - Block 4: divider
    # - And we want to keep the final divider, heading_2 (✅ Processed Receipts...), and the table (RECEIPTS_TABLE_ID)
    # Every block between Block 4 and the final divider should be deleted!
    
    blocks_to_delete = []
    is_raw_section = False
    for b in all_inbox_blocks:
        b_id = b["id"]
        b_type = b.get("type")
        if b_id == "3df1d0ad-68c6-8110-a556-e65f433ca21b": # Block 4 divider
            is_raw_section = True
            continue
        if b_id == "3df1d0ad-68c6-81a1-b0ee-c9f2c9344ae4": # Divider before Processed Receipts
            is_raw_section = False
            break
        if is_raw_section:
            blocks_to_delete.append(b_id)

    print(f"Identified {len(blocks_to_delete)} raw dump blocks to delete.")
    deleted_count = 0
    for bid in blocks_to_delete:
        del_res = requests.delete(f"https://api.notion.com/v1/blocks/{bid}", headers=HEADERS)
        if del_res.status_code == 200:
            deleted_count += 1
        else:
            print(f"Failed to delete block {bid}: {del_res.status_code}")
    print(f"Successfully deleted {deleted_count} raw dump blocks from Notion Inbox!")

    # Now add a clean placeholder paragraph under Block 4:
    # "— Drop your text, bullets, or broker notes right here —"
    placeholder_payload = {
        "children": [
            text_p("— Drop your text, bullets, or broker notes right here —")
        ]
    }
    requests.patch(f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children", headers=HEADERS, json=placeholder_payload)
    print("Added fresh placeholder paragraph to inbox.")

    # Update Block 1 (to-do)
    todo_id = "3df1d0ad-68c6-81ce-92fe-ca7552435ae0"
    todo_update = {
        "to_do": {
            "checked": True,
            "rich_text": [
                {"type": "text", "text": {"content": "⚡ PROCESS INBOX DUMP (Processed: Braskem, BAKIDE, Golar LNG & Air Global — All Whisked to Research DB)"}}
            ]
        }
    }
    requests.patch(f"https://api.notion.com/v1/blocks/{todo_id}", headers=HEADERS, json=todo_update)
    print("Updated Inbox To-Do block to completed.")

    # ---------------------------------------------------------
    # STEP 6: COMPILE DATABASE
    # ---------------------------------------------------------
    print("=== STEP 6: RECOMPILING CEMBI DATABASE & WEB ASSETS ===")
    subprocess.run([sys.executable, BUILD_SCRIPT], check=True)
    print("Database and web assets recompiled successfully.")

if __name__ == "__main__":
    process_inbox()
