import urllib.request
import json
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

token = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
page_id = '3e31d0ad-68c6-819b-aaa2-de6d03346ec9'

def text_obj(content, bold=False, color="default"):
    return {
        "type": "text",
        "text": {"content": content},
        "annotations": {"bold": bold, "color": color}
    }

def cell(content, bold=False, color="default"):
    return [text_obj(content, bold=bold, color=color)]

def row(cells_list):
    return {
        "type": "table_row",
        "table_row": {
            "cells": cells_list
        }
    }

def append_blocks():
    # Table 1: Asset Inputs and Outputs
    table1_rows = [
        row([cell("Asset Cluster", True), cell("Feedstock Inputs (Supplier)", True), cell("Chemical Outputs", True), cell("Capacity", True), cell("Normal EBITDA", True), cell("Competitive Moat", True)]),
        row([cell("Camaçari Complex (BA)"), cell("Naphtha (Petrobras RLAM) + Gas"), cell("Ethylene, Propylene, PE, Chlor-Alkali"), cell("1,400 kt Eth"), cell("$380.0M", True), cell("Largest pole in South Hemisphere; captive industrial converters")]),
        row([cell("Triunfo Complex (RS)"), cell("Naphtha (REFAP) + Sugarcane Ethanol"), cell("Ethylene, Propylene, PE, Bio-PE"), cell("1,450 kt Eth"), cell("$420.0M", True), cell("Mercosur gateway; flexible cracking and ESG green PE pole")]),
        row([cell("São Paulo / ABC (SP)"), cell("Naphtha (RECAP/REVAP) + Gas"), cell("Ethylene, PE, PP wire & cable"), cell("700 kt Eth"), cell("$180.0M", True), cell("Zero ocean freight; embedded in Greater São Paulo auto basin")]),
        row([cell("Duque de Caxias (RJ)"), cell("Pre-Salt Ethane Gas (REDUC/GasLub)"), cell("Gas-cracked Ethylene, HDPE"), cell("520 kt Eth"), cell("$140.0M", True), cell("100% light gas cracker; lowest cash cost when oil prices high")]),
        row([cell("US PP Fleet (TX/PA/WV)"), cell("PGP & RGP Monomer (Gulf Coast)"), cell("Polypropylene Homopolymers/Copolymers"), cell("2,100 kt PP"), cell("$220.0M", True), cell("#1 PP producer in US; Delta plant Oyster Creek modern asset")]),
        row([cell("European PP (Germany)"), cell("Pipeline Propylene (Steam crackers)"), cell("Specialty PP automotive resins"), cell("540 kt PP"), cell("$60.0M", True), cell("High-margin automotive compounding in German chemical parks")]),
        row([cell("Braskem Idesa (Mexico)"), cell("Ethane (Pemex + Advario Terminal)"), cell("Ethylene, HDPE, LDPE"), cell("1,050 kt PE"), cell("$50.0M (Shr)", True), cell("Ring-fenced non-recourse project finance; terminal unlocks ethane")]),
        row([cell("Bio-Polymers 'I'm green'"), cell("Sugarcane Ethanol (Brazil mills)"), cell("Bio-Ethylene, Bio-PE, Bio-EVA"), cell("260 kt Bio-PE"), cell("$70.0M", True), cell("Global #1 bio-PE leader; commands 25%-40% green premium")])
    ]

    # Table 2: EV Volatility Historical Distribution
    table2_rows = [
        row([cell("Cycle Regime", True), cell("Cash EBITDA", True), cell("Implied Multiple", True), cell("Enterprise Value", True), cell("Senior Unsecured Recovery", True)]),
        row([cell("P10: Severe Distress / Trough"), cell("$800.0M"), cell("3.5x"), cell("$2,800.0M", True, "red"), cell("20.0c (Distressed Floor)", True, "red")]),
        row([cell("P25: Downside Cycle"), cell("$1,050.0M"), cell("4.2x"), cell("$4,410.0M", True, "orange"), cell("38.0c (Downside)", True, "orange")]),
        row([cell("P50: Normalized Mid-Cycle (Base)"), cell("$1,400.0M"), cell("5.0x"), cell("$7,000.0M", True, "green"), cell("66.3c (Desk Fair Value)", True, "green")]),
        row([cell("P75: Cyclical Margin Rebound"), cell("$1,750.0M"), cell("5.5x"), cell("$9,625.0M", True, "blue"), cell("95.0c (Near Par)", True, "blue")]),
        row([cell("P90: Peak Petrochem Super-Cycle"), cell("$2,150.0M"), cell("6.0x"), cell("$12,900.0M", True, "blue"), cell("100.0c (Par + Coupon Carry)", True, "blue")])
    ]

    # Table 3: "What's Priced In?" Scenario Payoff Matrix
    table3_rows = [
        row([cell("Scenario", True), cell("Exit Px", True), cell("Total Return (%)", True), cell("Net PnL / $1M Face", True), cell("Annualized IRR (14M)", True), cell("Desk Action", True)]),
        row([cell("1. Hostile In-Court RJ Cramdown"), cell("19.5c", True, "red"), cell("-59.9%", True, "red"), cell("-$291,000", True, "red"), cell("-55.2%", True, "red"), cell("AVOID / SHORT", True, "red")]),
        row([cell("2. Distressed Floor / Asset Sale"), cell("32.0c", True, "orange"), cell("-34.2%", True, "orange"), cell("-$166,000", True, "orange"), cell("-30.1%", True, "orange"), cell("UNDERWEIGHT", True, "orange")]),
        row([cell("3. Standstill Plan (No Sponsor Equity)"), cell("55.0c", True, "yellow"), cell("+13.2%", True, "yellow"), cell("+$64,000", True, "yellow"), cell("+11.2%", True, "yellow"), cell("HOLD / FAIR", True, "yellow")]),
        row([cell("4. Desk Base Case (Fair APR Reorg)"), cell("66.3c", True, "green"), cell("+36.4%", True, "green"), cell("+$177,000", True, "green"), cell("+30.2%", True, "green"), cell("STRONG BUY", True, "green")]),
        row([cell("5. Petrobras Recap & Bull Parity"), cell("98.0c", True, "blue"), cell("+101.6%", True, "blue"), cell("+$494,000", True, "blue"), cell("+77.9%", True, "blue"), cell("CONVICTION LONG", True, "blue")])
    ]

    blocks = [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("🏭 Asset-by-Asset Operational Blueprint: Feedstock Inputs & Outputs", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("Braskem operates 8 discrete production clusters across Brazil, North America, Europe, and Mexico with 4,000 kt of annual ethylene capacity and 8,500 kt of resin capacity (PE/PP/PVC). The table below outlines the specific feedstock supply channels, outputs, normalized EBITDA contribution, and competitive economic moats:")]
            }
        },
        {
            "object": "block",
            "type": "table",
            "table": {
                "table_width": 6,
                "has_column_header": True,
                "has_row_header": False,
                "children": table1_rows
            }
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📊 Enterprise Value (EV) Volatility Framework: Quantification & Drivers", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("Braskem's enterprise value exhibits an annualized volatility of ~38.5% across the petrochemical cycle, driven by four structural forces: (1) PE cash spreads swinging between $150/t trough and $750/t peak; (2) High fixed-cost operating leverage where every $50/t spread move shifts EBITDA by ±$380M; (3) Petrobras formula pricing negotiations on domestic naphtha contracts; and (4) USD resin import parity vs BRL domestic cost base. Below is the historical EV percentile distribution matrix:")]
            }
        },
        {
            "object": "block",
            "type": "table",
            "table": {
                "table_width": 5,
                "has_column_header": True,
                "has_row_header": False,
                "children": table2_rows
            }
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("🎯 'What Is Priced In?' & Scenario Return Payoff Matrix", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("At the benchmark Senior 2030s price of 48.6c ($48.60), the bond market is currently pricing in an implied Enterprise Value of only $5,371M (3.84x EV/EBITDA on normalized $1,400M EBITDA) and an implied 68% probability of a hostile in-court RJ restructuring. The table below details total return ROI, net dollar profit/loss per $1M face value, and annualized IRR across all 5 restructuring outcomes over a 14-month restructuring horizon:")]
            }
        },
        {
            "object": "block",
            "type": "table",
            "table": {
                "table_width": 6,
                "has_column_header": True,
                "has_row_header": False,
                "children": table3_rows
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [
                    text_obj("🔗 Live Interactive Platform Links:\n", bold=True),
                    text_obj("• Interactive Restructuring Sandbox: "),
                    text_obj("https://rkarim25.github.io/cembicredit/braskem_calculator.html\n", bold=True, color="blue"),
                    text_obj("• Asset Deep Dive & Interactive Pricing Engine: "),
                    text_obj("https://rkarim25.github.io/cembicredit/braskem_background.html\n", bold=True, color="blue"),
                    text_obj("• Master Company Dossier & Financial Model: "),
                    text_obj("https://rkarim25.github.io/cembicredit/company.html?id=braskem", bold=True, color="blue")
                ],
                "icon": {"type": "emoji", "emoji": "⚡"}
            }
        }
    ]

    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    req = urllib.request.Request(url, data=json.dumps({"children": blocks}).encode("utf-8"), headers={
        "Authorization": f"Bearer {token}",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }, method="PATCH")

    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"Successfully appended {len(res.get('results', []))} blocks to Notion dossier!")

if __name__ == "__main__":
    append_blocks()
