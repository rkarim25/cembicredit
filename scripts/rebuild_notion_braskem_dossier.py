#!/usr/bin/env python3
"""
Comprehensive Notion Master Dossier Rebuild for Braskem S.A.
Page ID: 3e31d0ad-68c6-819b-aaa2-de6d03346ec9
Database ID: 3df1d0ad68c6815eb5c2cffb3b540b1b
"""
import requests
import json
import time
import sys

sys.stdout.reconfigure(encoding='utf-8')

NOTION_TOKEN = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
PAGE_ID = '3e31d0ad-68c6-819b-aaa2-de6d03346ec9'

headers = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

def t(content, bold=False, italic=False, color="default", url=None):
    return {
        "type": "text",
        "text": {
            "content": str(content),
            "link": {"url": url} if url else None
        },
        "annotations": {
            "bold": bold,
            "italic": italic,
            "strikethrough": False,
            "underline": False,
            "code": False,
            "color": color
        }
    }

def cell(content, bold=False, color="default"):
    return [t(content, bold=bold, color=color)]

def table_row(cells_list):
    return {
        "type": "table_row",
        "table_row": {
            "cells": cells_list
        }
    }

def build_table(headers_list, rows_data):
    width = len(headers_list)
    header_cells = [cell(h, bold=True) for h in headers_list]
    row_blocks = [table_row(header_cells)]
    for r in rows_data:
        r_cells = [cell(c) for c in r]
        row_blocks.append(table_row(r_cells))
    
    return {
        "object": "block",
        "type": "table",
        "table": {
            "table_width": width,
            "has_column_header": True,
            "has_row_header": False,
            "children": row_blocks
        }
    }

def heading_2(text):
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {"rich_text": [t(text, bold=True)]}
    }

def heading_3(text):
    return {
        "object": "block",
        "type": "heading_3",
        "heading_3": {"rich_text": [t(text, bold=True)]}
    }

def paragraph(text_list):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {"rich_text": text_list if isinstance(text_list, list) else [t(text_list)]}
    }

def bullet(text_list):
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {"rich_text": text_list if isinstance(text_list, list) else [t(text_list)]}
    }

def callout(text_or_list, emoji="⚖️"):
    rich = text_or_list if isinstance(text_or_list, list) else [t(text_or_list)]
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "icon": {"type": "emoji", "emoji": emoji},
            "rich_text": rich
        }
    }

def clear_existing_blocks():
    print(f"Fetching existing blocks from page {PAGE_ID}...")
    res = requests.get(f"https://api.notion.com/v1/blocks/{PAGE_ID}/children?page_size=100", headers=headers)
    if res.status_code != 200:
        print("Error fetching blocks:", res.text)
        return
    blocks = res.json().get("results", [])
    print(f"Clearing {len(blocks)} existing blocks...")
    for b in blocks:
        requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=headers)
    print("Page blocks cleared successfully.")

def append_blocks_in_chunks(blocks, chunk_size=15):
    print(f"Appending {len(blocks)} master blocks in chunks of {chunk_size}...")
    for i in range(0, len(blocks), chunk_size):
        chunk = blocks[i:i + chunk_size]
        payload = {"children": chunk}
        res = requests.patch(f"https://api.notion.com/v1/blocks/{PAGE_ID}/children", headers=headers, json=payload)
        if res.status_code == 200:
            print(f"[OK] Chunk {i // chunk_size + 1} ({len(chunk)} blocks) appended successfully.")
        else:
            print(f"[FAIL] Error on chunk {i // chunk_size + 1}:", res.status_code, res.text)
            return False
        time.sleep(0.5)
    return True

def generate_master_dossier():
    blocks = []

    # 1. Executive Callout & Actionable Recommendation
    blocks.append(callout([
        t("DESK SUMMARY & CONVICTION TRADE STANCE: ", bold=True),
        t("SPECULATIVE OVERWEIGHT on Senior Unsecured Eurobonds (BRASKM 2030s @ ~48.6c, 2033s @ ~56.3c, 2050s @ ~44.7c) vs. UNDERWEIGHT / SHORT Subordinated Hybrid 2081s (@ ~31.8c).\n"),
        t("• Base Case Fundamental Recovery: ", bold=True),
        t("Yields 66.3 cents on the dollar ($63–$70c range) for Senior Unsecured debt, backed by $7,000M Enterprise Value (5.0x mid-cycle EBITDA of $1,400M) + $900M cash. This provides +35% to +48% upside from secondary market prices.\n"),
        t("• The Hybrid Trap: ", bold=True),
        t("Subordinated 2081 Hybrid notes are deeply overvalued at ~32c. Under absolute priority, the $1.0B hybrid stack faces near-total write-down (10–18c recovery via out-of-the-money warrants).\n"),
        t("• Operational Moat: ", bold=True),
        t("Braskem is the sole petrochemical cracker operator in Brazil (~70% PE/PP/PVC share) and consumes ~70% of Petrobras' domestic naphtha output. An uncontrolled shutdown is politically and industrially impossible for Petrobras.")
    ], "⚖️"))

    # 2. Live Links Callout (Connecting Website & Sandbox)
    blocks.append(callout([
        t("PLATFORM INTERACTION & LIVE CALCULATOR LINKS:\n", bold=True),
        t("• Interactive Restructuring & SOTP Sandbox: ", bold=True),
        t("https://rkarim25.github.io/cembicredit/braskem_calculator.html", url="https://rkarim25.github.io/cembicredit/braskem_calculator.html"),
        t(" (Play with asset selection, multiples, duration, haircuts, and qualitative friction).\n"),
        t("• CEMBI Credit Company Page: ", bold=True),
        t("https://rkarim25.github.io/cembicredit/company.html?id=braskem", url="https://rkarim25.github.io/cembicredit/company.html?id=braskem"),
        t(" (Interactive financial model, formula bar, and debt stack).\n"),
        t("• Institutional Excel Model: ", bold=True),
        t("Download Braskem_Credit_Model.xlsx", url="https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Braskem_Credit_Model.xlsx"),
        t(" (9 formula-linked sheets preserving Downside Stress & Recovery Waterfall).")
    ], "🎛️"))

    # 3. Section 1: Strategic Profile & Sum-of-the-Parts (SOTP) Footprint
    blocks.append(heading_2("1. Strategic Profile & Sum-of-the-Parts (SOTP) Asset Valuation"))
    blocks.append(paragraph([
        t("Braskem S.A. (B3: BRKM5 / NYSE: BAK) is the undisputed petrochemical leader in Latin America. To establish a granular asset floor, the desk evaluated the business across 8 discrete operating clusters:")
    ]))

    # TABLE 1: SOTP Asset Breakdown
    sotp_headers = ["Asset / Complex", "Moat & Integration", "Capacity (kt)", "EBITDA ($M)", "EV Mult", "Asset EV ($M)"]
    sotp_rows = [
        ["Camaçari Complex (Bahia)", "Petrobras RLAM integration", "1,400 kt Ethylene", "$380.0M", "5.0x", "$1,900.0M"],
        ["Triunfo Complex (RS)", "Mercosur agricultural & packaging", "1,450 kt Ethylene", "$420.0M", "5.0x", "$2,100.0M"],
        ["São Paulo / ABC Complex", "Auto & industrial heartland", "700 kt Ethylene", "$180.0M", "4.5x", "$810.0M"],
        ["Duque de Caxias (RJ)", "REDUC refinery & pre-salt gas", "520 kt Ethylene", "$140.0M", "4.5x", "$630.0M"],
        ["US Polypropylene Fleet (5 Plants)", "#1 US producer (TX, PA, WV)", "2,100 kt PP", "$220.0M", "6.0x", "$1,320.0M"],
        ["European PP Fleet (Germany)", "Automotive & specialty copolymers", "540 kt PP", "$60.0M", "4.5x", "$270.0M"],
        ["Braskem Idesa Mexico (75% JV)", "Ethylene XXI (debt cut to $1.6B)", "1,050 kt PE", "$50.0M", "5.0x", "$250.0M"],
        ["Bio-Polymers 'I'm green' (Triunfo)", "Global leader in sugarcane bio-PE", "260 kt Bio-PE", "$70.0M", "7.5x", "$525.0M"],
        ["CONSOLIDATED SOTP ASSET BASE", "Irreplaceable Americas Footprint", "8,020 kt Total", "$1,520.0M", "5.1x Blended", "$7,805.0M"]
    ]
    blocks.append(build_table(sotp_headers, sotp_rows))

    blocks.append(bullet([
        t("Ownership Standoff: ", bold=True),
        t("Novonor (formerly Odebrecht) holds 38.3% total equity / 50.1% voting capital (pledged to bank creditors: Itaú, Bradesco, Santander, Banco do Brasil, BNDES). Petrobras holds 36.1% total equity / 47.0% voting capital with right of first refusal and tag-along rights.")
    ]))

    # 4. Section 2: Restructuring Status & Creditor Impasse
    blocks.append(heading_2("2. Restructuring Status & Creditor Standoff (Recuperação Extrajudicial & Chapter 15)"))
    blocks.append(paragraph([
        t("In late August 2026, following missed coupon payments and rating downgrades to 'RD' (Fitch) and 'D' (S&P), Braskem filed for "),
        t("Recuperação Extrajudicial (pre-packaged out-of-court restructuring) ", bold=True),
        t("under Brazilian Bankruptcy Law No. 11,101 covering ~$11.0B in unsecured debt, backed by Chapter 15 filings in US Bankruptcy Court (SDNY).")
    ]))
    blocks.append(bullet([
        t("Company Initial Low-Ball Proposal (Rejected): ", bold=True),
        t("Braskem proposed that existing creditors inject $2.0B in new money ($1.25B dedicated to debt repurchases at up to a 50% discount / 50c, and $750M for working capital).")
    ]))
    blocks.append(bullet([
        t("Creditor Committee Unanimous Rejection: ", bold=True),
        t("In mid-September 2026, ad hoc bondholder groups rejected the proposal. Creditors demand an enforceable, legally binding $3.0B equity check from controlling shareholders Petrobras and Novonor/IG4 Capital before consenting to maturity extensions or haircuts.")
    ]))
    blocks.append(bullet([
        t("Threat of Judicial Recovery (RJ): ", bold=True),
        t("If extrajudicial negotiations reach an impasse by 4Q26, creditors may push Braskem into a formal in-court Recuperação Judicial, freezing debt service but putting existing equity at risk of total wipeout.")
    ]))

    # 5. Section 3: Detailed Recovery Waterfall Analysis
    blocks.append(heading_2("3. Comprehensive Step-by-Step Recovery Waterfall Analysis"))
    blocks.append(paragraph([
        t("The table below details the exact priority of payments, enterprise asset valuation, deductions, and resulting recovery percentages and cents-on-the-dollar across three scenarios:")
    ]))

    # TABLE 2: Recovery Waterfall Matrix
    rec_headers = ["Waterfall Valuation Step", "Scenario A: Distressed Floor", "Scenario B: Base Case Reorg", "Scenario C: Bull Case Recap"]
    rec_rows = [
        ["1. Operating Cash EBITDA ($M)", "$800.0M (Trough)", "$1,400.0M (Mid-Cycle)", "$1,800.0M (Peak Rebound)"],
        ["2. Implied EV / EBITDA Multiple", "3.5x EV Multiple", "5.0x EV Multiple", "5.5x EV Multiple"],
        ["3. Enterprise Value (EV)", "$2,800.0M", "$7,000.0M", "$9,900.0M"],
        ["4. Add: Balance Sheet Cash", "$850.0M", "$900.0M", "$1,100.0M"],
        ["5. Add: Sponsor Cash Equity Check", "$0.0M (None)", "$0.0M (Debt-funded)", "$2,500.0M (Petrobras Cash)"],
        ["6. Total Distributable Value", "$3,650.0M", "$7,900.0M", "$13,500.0M"],
        ["7. Less: Restructuring & Legal Fees", "-$150.0M ($15M/mo bleed)", "-$100.0M (Consensual)", "-$100.0M (Accelerated)"],
        ["8. Less: Priority PPE Bank Debt ($1,100M)", "-$1,100.0M (100% Par)", "-$1,100.0M (100% Par)", "-$1,100.0M (100% Par)"],
        ["9. Less: Maceió Settlement NPV", "-$850.0M (Escalated)", "-$600.0M (Scheduled)", "-$500.0M (State Cap)"],
        ["10. Total Priority Deductions", "-$2,100.0M", "-$1,800.0M", "-$1,700.0M"],
        ["11. Net Value for Senior Unsecured Debt", "$1,550.0M", "$6,100.0M", "$11,800.0M"],
        ["12. Total Senior Unsecured Claims", "$9,200.0M", "$9,200.0M", "$9,200.0M"],
        ["13. Senior Unsecured Recovery (%)", "16.8% - 22.0%", "66.3%", "100.0%"],
        ["14. Senior Unsecured Recovery (Cents)", "17.0c - 22.0c", "66.3c ($63 - $70c)", "100.0c (Par Reinstated)"],
        ["15. Subordinated 2081 Hybrid Recovery", "0.0% ($0.0c - Wiped Out)", "10.0% - 18.0% (14.0c)", "40.0% - 55.0% (50.0c)"],
        ["16. Value Left for Existing Equity", "0% (Wiped Out)", "5% - 10% Stub Equity", "Retained / Diluted Stake"]
    ]
    blocks.append(build_table(rec_headers, rec_rows))

    blocks.append(callout([
        t("WATERFALL VERDICT & CONSIDERATION PACKAGE:\n", bold=True),
        t("Under the Base Case consensual restructuring, Senior Unsecured bondholders receive a package of "),
        t("~35% new 8-year Senior Secured Exit Notes (coupon ~7.5%–8.5%) + ~30% Reorganized Equity. ", bold=True),
        t("The remaining claim is satisfied via equitization. The Subordinated 2081 Hybrid receives nominal out-of-the-money warrants (10–18c value) solely to secure voting consent under Brazilian restructuring law.")
    ], "💡"))

    # 6. Section 4: Restructuring Mechanics & Balance Sheet Sustainability Engine
    blocks.append(heading_2("4. Restructuring Mechanics & Balance Sheet Sustainability Engine"))
    blocks.append(paragraph([
        t("The core objective of the restructuring is to resize gross debt to a level where the balance sheet becomes fully self-funding under mid-cycle spreads. The table below displays pre-restructuring baseline vs reorganization proposal:")
    ]))

    # TABLE 3: Balance Sheet Sustainability Engine
    sus_headers = ["Plan Parameter / Credit Metric", "Pre-Reorganization (FY24)", "Reorganized Plan (Base Case)", "Sustainability Benchmark"]
    sus_rows = [
        ["Standstill Duration", "0 Months", "12 Months ($180M fee drain)", "Standard Pre-Pack Window"],
        ["Senior Principal Haircut", "0% Haircut", "35.0% Principal Haircut", "-$3,220M Debt Extinguished"],
        ["Senior Maturity Extension", "Maturities 2026-2030", "+6 Years (New Bullets 2036+)", "Refinancing Wall Eliminated"],
        ["Reinstated Senior Coupon", "4.50% - 8.00% Weighted", "7.50% Fixed Cash Coupon", "$448M Annual Senior Interest"],
        ["Debt-for-Equity Swap Allocation", "0% Equity", "30.0% of Senior Claims", "Lenders own 75% Reorg Equity"],
        ["Subordinated 2081 Cramdown", "$1,000M Par Claim", "85.0% Cramdown (15c recovery)", "Absolute Priority Enforced"],
        ["Consolidated Gross Debt", "$10,400.0M", "$5,400.0M", "Cut by $5,000M (-48%)"],
        ["Consolidated Net Debt", "$9,450.0M", "$4,480.0M", "Cut by $4,970M (-53%)"],
        ["Pro-Forma Net Debt / EBITDA", "6.74x - 10.74x Trough", "3.20x Mid-Cycle Net Leverage", "PASS: Inside < 3.25x Ceiling"],
        ["Interest Coverage Ratio", "1.39x Trough", "2.69x Interest Coverage", "PASS: Clears > 2.20x Covenant"],
        ["Annual Free Cash Flow (FCF)", "-$480.0M Cash Burn", "+$170.0M Positive Cash Flow", "PASS: Self-Funding Profile"],
        ["Overall Capital Plan Status", "Distressed / Restricted Default", "SUSTAINABLE CAPITAL PLAN", "🟢 Sustainable (Upgrade Path)"]
    ]
    blocks.append(build_table(sus_headers, sus_rows))

    # 7. Section 5: Qualitative Risk Adjuster & Dynamic Secondary Pricing Bands
    blocks.append(heading_2("5. Qualitative Risk Layer & Implied Secondary Pricing Bands"))
    blocks.append(paragraph([
        t("To bridge the gap between theoretical recovery and executable secondary market pricing, the desk prices in four non-financial frictions: (1) Petrobras political governance reluctance (25%), (2) Maceió Dutch class action damages (15%), (3) Judicial RJ in-court conversion friction (20%), and (4) Secondary illiquidity discount (15%):")
    ]))

    # TABLE 4: Dynamic Secondary Pricing Bands
    band_headers = ["Instrument / Tranche", "Claim ($M)", "Market Px", "Bear Floor", "Base Fair Value", "Bull Target", "Desk Trading Signal"]
    band_rows = [
        ["Export Pre-Payment (PPE Facilities)", "$1,100.0M", "100.0c", "100.0c", "100.0c", "100.0c", "Priority Par Reinstated"],
        ["BRASKM 4.500% 2030 Senior Notes", "$1,450.0M", "48.6c", "22.1c", "61.8c", "89.5c", "STRONG BUY (+27% to Fair)"],
        ["BRASKM 7.250% 2033 Senior Notes", "$1,200.0M", "56.3c", "22.1c", "61.8c", "89.5c", "HOLD / FAIR (+10% to Fair)"],
        ["BRASKM 5.875% 2050 Senior Notes", "$1,420.0M", "44.7c", "22.1c", "61.8c", "89.5c", "STRONG BUY (+38% to Fair)"],
        ["BRASKM 8.000% 2034 Senior Notes", "$980.0M", "57.5c", "22.1c", "61.8c", "89.5c", "HOLD / FAIR (+7% to Fair)"],
        ["Domestic Brazilian Debentures (CDI)", "$1,400.0M", "52.0c", "22.1c", "61.8c", "89.5c", "BUY (+19% to Fair)"],
        ["BRASKM 2081 Subordinated Hybrid", "$1,000.0M", "31.8c", "0.0c", "12.4c", "33.0c", "AVOID / SHORT (-61% Downside)"]
    ]
    blocks.append(build_table(band_headers, band_rows))

    blocks.append(callout([
        t("CAPITAL STRUCTURE ARBITRAGE (LONG SENIOR / SHORT HYBRID):\n", bold=True),
        t("The pricing band table highlights a glaring market mispricing: BRASKM 2050s trading at 44.7c offer +38% upside to risk-adjusted fair value (61.8c), while the junior Subordinated 2081 Hybrid trading at 31.8c sits 150% above its 12.4c risk-adjusted fair value. Going long Senior 2030s/2050s against shorting the 2081s captures pure structural seniority value.")
    ], "⚖️"))

    # 8. Section 6: Full Capital Structure Debt Stack Matrix
    blocks.append(heading_2("6. Capital Structure & Debt Tranche Details"))
    blocks.append(paragraph([
        t("Detailed indenture and tranche parameters across Braskem's capital structure as of September 2026:")
    ]))

    debt_headers = ["Tranche Name", "Currency", "Outstanding ($M)", "Coupon", "Maturity", "Seniority", "Governing Law"]
    debt_rows = [
        ["Export Pre-Payment & Bank Facilities (PPE)", "USD / BRL", "$1,100.0M", "SOFR + 285 bps", "2027", "Senior Secured", "Brazilian / NY Law"],
        ["BRASKM 4.500% 2030 Eurobond", "USD", "$1,450.0M", "4.500%", "2030-01-31", "Senior Unsecured", "New York Law"],
        ["BRASKM 7.250% 2033 Eurobond", "USD", "$1,200.0M", "7.250%", "2033-02-13", "Senior Unsecured", "New York Law"],
        ["BRASKM 5.875% 2050 Eurobond", "USD", "$1,420.0M", "5.875%", "2050-01-31", "Senior Unsecured", "New York Law"],
        ["BRASKM 8.000% 2034 Eurobond", "USD", "$980.0M", "8.000%", "2034-04-15", "Senior Unsecured", "New York Law"],
        ["BRASKM 3.700% 2031 Eurobond", "USD", "$750.0M", "3.700%", "2031-01-10", "Senior Unsecured", "New York Law"],
        ["Domestic Brazilian Debentures", "BRL", "$1,400.0M", "CDI + 1.65%", "2029-06-30", "Senior Unsecured", "Brazilian Law"],
        ["BRASKM 8.50% / 12.00% 2081 Hybrid", "USD", "$1,000.0M", "12.004%", "2081-01-23", "Junior Subordinated", "New York Law"]
    ]
    blocks.append(build_table(debt_headers, debt_rows))

    # 9. Section 7: Multi-Period Financial Model Scorecard
    blocks.append(heading_2("7. 7-Year Multi-Period Financial Model Scorecard (USD M)"))
    blocks.append(paragraph([
        t("Historical and projected cash flow, revenue, EBITDA, debt, and credit metrics (2021A–2027E):")
    ]))

    fin_headers = ["Metric (USD M)", "2021A", "2022A", "2023A", "2024A", "2025A", "2026E", "2027E"]
    fin_rows = [
        ["Gross Revenue", "$19,500.0", "$18,700.0", "$14,320.0", "$13,850.0", "$14,650.0", "$15,400.0", "$16,200.0"],
        ["Calculated Cash EBITDA", "$5,620.0", "$2,150.0", "$785.0", "$850.0", "$1,150.0", "$1,400.0", "$1,650.0"],
        ["EBITDA Margin (%)", "28.8%", "11.5%", "5.5%", "6.1%", "7.8%", "9.1%", "10.2%"],
        ["Cash Flow from Operations (CFO)", "$4,250.0", "$1,850.0", "$410.0", "$540.0", "$790.0", "$1,180.0", "$1,390.0"],
        ["Capital Expenditures (Capex)", "$820.0", "$940.0", "$810.0", "$720.0", "$650.0", "$600.0", "$600.0"],
        ["Free Cash Flow (FCF)", "$3,630.0", "$190.0", "-$745.0", "-$480.0", "-$235.0", "+$170.0", "+$440.0"],
        ["Cash & Liquid Reserves", "$2,420.0", "$2,150.0", "$1,420.0", "$950.0", "$880.0", "$920.0", "$1,150.0"],
        ["Consolidated Gross Debt", "$8,250.0", "$8,640.0", "$9,850.0", "$10,400.0", "$10,350.0", "$5,400.0", "$5,100.0"],
        ["Consolidated Net Debt", "$5,830.0", "$6,490.0", "$8,430.0", "$9,450.0", "$9,470.0", "$4,480.0", "$3,950.0"],
        ["Net Debt / EBITDA", "1.04x", "3.02x", "10.74x", "6.74x", "8.23x", "3.20x", "2.39x"],
        ["Interest Coverage Ratio", "11.02x", "3.98x", "1.33x", "1.39x", "1.83x", "2.69x", "3.67x"]
    ]
    blocks.append(build_table(fin_headers, fin_rows))

    # 10. Section 8: Maceió Environmental Liabilities Audit
    blocks.append(heading_2("8. Maceió Environmental Liabilities & Settlement Schedule"))
    blocks.append(paragraph([
        t("The rock salt cavity collapse in Maceió (Alagoas) was the key operational and reputational catalyst that initiated credit stress. The table below traces actual disbursements, remaining balance sheet provisions, and the long-dated settlement timeline:")
    ]))

    maceio_headers = ["Program Component", "Historical Disbursed", "Balance Sheet Provision", "2026E-2027E Run-Rate", "Post-2030 Installments", "Status"]
    maceio_rows = [
        ["Relocation & Compensation (PCF)", "R$15.0B (~$3.0B)", "R$800M (~$150M)", "R$50M - R$80M/yr", "Residual Tail Claims", "99.6% Disbursed"],
        ["Cavity Closure & Monitoring", "R$2.5B (~$500M)", "R$2.7B (~$500M)", "R$80M - R$120M/yr", "R$100M/year", "Active Sonar Sweeps"],
        ["State of Alagoas Settlement", "R$0.0M", "R$1.2B (~$220M)", "R$0.0M (Grace Period)", "10 Annual Tranches", "Executed Nov 2025"],
        ["TOTAL MACEIÓ POOL", ">R$17.5B (~$3.5B)", "~R$4.7B (~$870M)", "~$30M - $40M/year", "Long-Dated NPV: ~$600M", "Ring-Fenced Liability"]
    ]
    blocks.append(build_table(maceio_headers, maceio_rows))

    # 11. Section 9: 5 Diligence Questions for Restructuring Calls
    blocks.append(heading_2("9. 5 Key Diligence Questions for Restructuring Advisors & Creditors"))
    blocks.append(bullet([
        t("1. Absolute Priority Enforcement: ", bold=True),
        t("Will the ad hoc bondholder committee insist on strict cramdown of the 2081 Hybrid notes (zero cash, minimal out-of-the-money warrants), or will sponsors attempt to divert reorganised equity value to hybrid holders?")
    ]))
    blocks.append(bullet([
        t("2. Petrobras Governance & Sponsor Commitment: ", bold=True),
        t("What is the formal approval pathway under Petrobras' board and Brazilian state governance rules for providing an equity backstop to Braskem without triggering mandatory takeover (tag-along) obligations?")
    ]))
    blocks.append(bullet([
        t("3. Long-Term Feedstock Agreement: ", bold=True),
        t("Has Petrobras indicated willingness to renegotiate the domestic naphtha pricing benchmark (currently pegged to ARA Rotterdam + freight) to provide margin relief during global chemical troughs?")
    ]))
    blocks.append(bullet([
        t("4. Braskem Idesa Ring-Fencing: ", bold=True),
        t("Following the August 2026 debt cut at Braskem Idesa ($2.5B to $1.6B), can management confirm that zero cash-sweep or parent guarantee obligations remain active from Mexico to Braskem S.A.?")
    ]))
    blocks.append(bullet([
        t("5. US Chapter 15 & Braskem America Assets: ", bold=True),
        t("Are any creditor groups preparing legal motions in US Bankruptcy Court (SDNY) to challenge the extraterritorial automatic stay over the profitable US polypropylene plants?")
    ]))

    # Final Footer Callout
    blocks.append(callout([
        t("READING & INTERACTION GUIDE:\n", bold=True),
        t("This Notion page contains the complete, unredacted credit memorandum, recovery waterfall, and financial tables. For dynamic interactive scenario modeling, parameter overrides, and live multiple calibration, open the website sandbox at: "),
        t("https://rkarim25.github.io/cembicredit/braskem_calculator.html", url="https://rkarim25.github.io/cembicredit/braskem_calculator.html")
    ], "📖"))

    return blocks

def run():
    clear_existing_blocks()
    blocks = generate_master_dossier()
    success = append_blocks_in_chunks(blocks, chunk_size=15)
    if success:
        print("\nALL MASTER NOTION BLOCKS & TABLES UPLOADED SUCCESSFULLY!")
        print(f"Direct Notion URL: https://app.notion.com/p/{PAGE_ID.replace('-', '')}")

if __name__ == "__main__":
    run()
