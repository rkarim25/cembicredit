#!/usr/bin/env python3
"""
Append Closed-Loop Bond Recovery & Valuation Engine documentation to Notion Dossier.
Page ID: 3e31d0ad-68c6-819b-aaa2-de6d03346ec9
"""
import requests
import json
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

def paragraph(text_list):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {"rich_text": text_list if isinstance(text_list, list) else [t(text_list)]}
    }

def callout(text_or_list, emoji="📉"):
    rich = text_or_list if isinstance(text_or_list, list) else [t(text_or_list)]
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "rich_text": rich,
            "icon": {"type": "emoji", "emoji": emoji},
            "color": "default"
        }
    }

def append_blocks(blocks):
    url = f"https://api.notion.com/v1/blocks/{PAGE_ID}/children"
    payload = {"children": blocks}
    resp = requests.patch(url, headers=headers, json=payload)
    if resp.status_code in [200, 201]:
        print(f"Successfully appended {len(blocks)} blocks to Notion page {PAGE_ID}")
        return True
    else:
        print(f"Error appending blocks: {resp.status_code} - {resp.text}")
        return False

def main():
    blocks = []
    
    blocks.append(heading_2("10. Closed-Loop Bond Recovery & Valuation Engine: Exit Yield, Tenor Extension, Haircuts & Standstill Drag"))
    
    blocks.append(callout([
        t("MATHEMATICAL MECHANICS SUMMARY:\n", bold=True),
        t("In an extrajudicial or Chapter 11 restructuring, senior creditors do not receive a single static recovery. Instead, consideration is paid in reinstated exit notes and reorganized equity. Day-1 trading value depends on four interacting drivers:\n\n"),
        t("1. Exit Paper Price (P_new): ", bold=True),
        t("DCF of reinstated 8Y 7.50% cash coupon notes discounted at 9.75% exit yield = 87.7c (-12.3% haircut to face).\n"),
        t("2. Emergence Consideration Pot (Rec_emergence): ", bold=True),
        t("After a 35% principal haircut and 30% equitization, senior debt provides 39.9c paper value + 19.5c reorg equity = 59.4c undiscounted emergence pot (vs 66.3c nominal face).\n"),
        t("3. Standstill Time Drag (DF_nego): ", bold=True),
        t("During the 12-month standstill, bondholders suffer zero coupon flow and -$15M/mo advisor bleed. Semi-annual discounting factor is DF = 1 / (1 + 0.0975/2)^2 = 0.9092 (-9.08% time drag).\n"),
        t("4. Present Economic Recovery (Rec_PV): ", bold=True),
        t("59.4c emergence value * 0.9092 discount factor = 54.0c Net Present Economic Recovery.")
    ], "⚙️"))

    # Table of all bonds
    headers_list = ["Instrument", "Indenture Delta", "Market Px", "Bear Floor", "Base Fair", "Bull Par", "Base Return", "Desk Action"]
    rows_data = [
        ["BRASKM 7.250% 2030 (USD)", "+2.0c Holdout Premium", "48.6c", "21.0c", "52.2c", "98.0c", "+7.4%", "BUY (Top Pick)"],
        ["BRASKM 8.500% 2033 (USD)", "0.0c Benchmark Ref", "56.3c", "19.0c", "50.2c", "96.0c", "-10.8%", "HOLD / FAIR"],
        ["BRASKM 5.875% 2050 (USD)", "-2.5c Duration Disct", "44.7c", "16.5c", "47.7c", "93.5c", "+6.7%", "BUY (Duration)"],
        ["BRASKM 7.125% 2034 (USD)", "+1.5c Carry Delta", "49.5c", "20.5c", "51.7c", "97.5c", "+4.4%", "BUY"],
        ["Debentures (BRL / CDI)", "-0.5c Jurisdictional", "52.0c", "18.5c", "49.7c", "95.5c", "-4.4%", "HOLD / FAIR"],
        ["BRASKM 8.250% 2081 Hybrid", "APR Cramdown", "31.8c", "0.0c", "12.0c", "45.0c", "-62.3%", "AVOID / EXPENSIVE"]
    ]
    blocks.append(build_table(headers_list, rows_data))

    # Exit yield vs duration 2D table
    blocks.append(paragraph([
        t("2D Cross-Sensitivity: True Net PV Recovery Across Exit Yield & Standstill Duration (Months)", bold=True)
    ]))
    matrix_headers = ["Exit Yield", "6M Standstill", "12M Standstill (Base)", "18M Standstill", "24M Standstill (RJ)"]
    matrix_rows = [
        ["8.50% (Tight Exit)", "59.8c", "57.4c", "55.1c", "52.8c"],
        ["9.25% (Base Tight)", "57.9c", "55.4c", "52.9c", "50.6c"],
        ["9.75% (Desk Base Case)", "56.6c", "54.0c", "51.5c", "49.1c"],
        ["10.50% (Stress Exit)", "54.8c", "52.1c", "49.5c", "47.0c"],
        ["11.25% (Distressed Exit)", "53.2c", "50.4c", "47.7c", "45.2c"]
    ]
    blocks.append(build_table(matrix_headers, matrix_rows))

    blocks.append(callout([
        t("INTERACTIVE WEBPAGES & SANDBOXES:\n", bold=True),
        t("• Restructuring Sandbox (Live Linked Sliders): https://rkarim25.github.io/cembicredit/braskem_calculator.html\n"),
        t("• Asset Footprint & 'What's Priced In?' Engine: https://rkarim25.github.io/cembicredit/braskem_background.html")
    ], "🔗"))

    append_blocks(blocks)

if __name__ == "__main__":
    main()
