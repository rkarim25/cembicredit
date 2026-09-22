import os
import sys
import requests
import json

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get("NOTION_TOKEN_WORK", os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY"))
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

SUMMARY_PAGE_ID = "3e31d0ad-68c6-8187-998a-f440604c1a21"
INBOX_PAGE_ID = "3df1d0ad-68c6-813c-9f07-e7c847880346"

# All existing receipts in reverse chronological order (most recent first!)
RECEIPTS_REVERSED = [
    {
        "date": "22 Sep 2026",
        "entity": "Restructuring Valuation Framework & Aragvi (ARAGVI)",
        "details": (
            "• Two-Stream Restructuring Engine Built: Reconciles Fundamental EV Asset Recovery (Methodology 1) "
            "with Market-Based Exchange PV (Methodology 2 via Exit Yield & Tenor Extension).\n"
            "• Qualitative Cents Bridge: Direct ±cents attribution replaces abstract % multipliers.\n"
            "• Balance Sheet Sustainability: Solves required gross debt cuts and tenor extensions for Single-B/BB- leverage.\n"
            "• Creditor Violence Deep Dive: Game theory of project bank syndicate vs HoldCo Eurobonds.\n"
            "• Deployed live to calculators (Braskem, Zoren, Aragvi), master database (credit_master.db), and website."
        )
    },
    {
        "date": "22 Sep 2026",
        "entity": "Air Global (AIRGLO)",
        "details": (
            "• Global shisha/hookah leader (Al Fakher, Crown). FY25A: Rev $400M, Adj EBITDA $139M (35% margin), OCF $116M (83% conversion), Net Debt/EBITDA 2.1x.\n"
            "• Segments: MEAA core generates $158M EBITDA (40% margin), offsetting -$19M NGC loss.\n"
            "• Credit View: Solid BB consumer profile. Low capex (<4% rev), improving NWC (12.4% rev). Key risks are ESG exclusion and flavour regulation.\n"
            "• Whisked to Research DB dossier & database/issuers/air_global.json."
        )
    },
    {
        "date": "22 Sep 2026",
        "entity": "Golar LNG (GLNG)",
        "details": (
            "• $500M 5NC2 HoldCo senior unsecured bond offering to refi Oct 2025s (IPTs high-7%, desk fair value 7.8%–7.9%).\n"
            "• Structural Subordination: Asset-level debt reaches $1.74B (55.8% of total); notes lack OpCo guarantees.\n"
            "• Leverage Bridge: Gross leverage peaks at 15–17x before de-leveraging to 1.6x on 2028 run-rate ($865M EBITDA).\n"
            "• Whisked to Research DB dossier & database/issuers/golar.json."
        )
    },
    {
        "date": "22 Sep 2026",
        "entity": "Braskem (BRASKM) & BAKIDE",
        "details": (
            "• Extrajudicial plan filed (39.6% initial support, 9 Oct agreement target, 22 Nov protection).\n"
            "• Auditor Trap Caught: Jefferies 50% PIK assumption balloons gross debt to $11.4B and exit leverage to 8.2x by 2029 ($500M/yr cash burn post-PIK).\n"
            "• Reconciled: 9.75% exit yield discounts 8Y paper to 87.7¢ (-12.3% par haircut), yielding 62.0¢ true senior economic recovery.\n"
            "• Deployed to Restructuring Calculator & Notion note (3e31d0ad)."
        )
    },
    {
        "date": "21 Sep 2026",
        "entity": "Çimko Çimento (CIMKOC)",
        "details": (
            "2Q26 results normalise post-earthquake peak. EBITDA TRY 2.07bn (-24% yoy); Net leverage 2.3x (YE26E 2.5-3.0x). OW CIMKOC 30s as carry."
        )
    },
    {
        "date": "18 Sep 2026",
        "entity": "US Treasuries (UST Macro)",
        "details": (
            "• UST sold off 7bps across curve on duration supply & macro pressure.\n"
            "• EM Transmission: Higher US risk-free yields widen EM external spreads and tighten dollar liquidity.\n"
            "• Directive: Underweight duration; favor front-end carry over 10Y/30Y exposure."
        )
    },
    {
        "date": "18 Sep 2026",
        "entity": "Zorlu Enerji (ZOREN TI)",
        "details": (
            "• Houlihan Lokey & Servo mandated for $1.48B workout; bonds collapsed 11 pts to 63.5¢ (27.2% YTM); London roadshow canceled.\n"
            "• Directive: Avoid buying at 63.5¢; accumulate at 50¢–53¢ post-Oct 23 coupon default for target exit 72¢–76¢ (+42% gain, +60% IRR).\n"
            "• Discrepancy: 56.4% EBITDA is OEDAŞ distribution ring-fenced by ADB loan; 2028 YEKDEM cliff cuts EBITDA; Pakistan wind trapped."
        )
    }
]

def setup_summary_page():
    print("--> Clearing placeholder from summary page...")
    children = requests.get(f"https://api.notion.com/v1/blocks/{SUMMARY_PAGE_ID}/children", headers=HEADERS).json().get("results", [])
    for c in children:
        requests.delete(f"https://api.notion.com/v1/blocks/{c['id']}", headers=HEADERS)

    print("--> Building summary page content blocks...")
    top_blocks = [
        {
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "📋"},
                "rich_text": [
                    {
                        "type": "text",
                        "text": {"content": "PROCESSED RESEARCH SUMMARIES & RECEIPTS ARCHIVE\n"},
                        "annotations": {"bold": True}
                    },
                    {
                        "type": "text",
                        "text": {"content": "Chronological audit trail of all research notes, broker decks, and data dumps processed from your Notion Inbox and persisted to the CEMBI Credit platform database. "}
                    },
                    {
                        "type": "text",
                        "text": {"content": "Most recent entries are displayed first at the top."},
                        "annotations": {"bold": True, "color": "blue"}
                    }
                ]
            }
        },
        {
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {"type": "text", "text": {"content": "⚡ Quick Navigation: "}, "annotations": {"bold": True}},
                    {"type": "text", "text": {"content": "📥 Go to Plain Inbox Drop Zone", "link": {"url": "https://app.notion.com/p/Inbox-Office-Data-Dump-3df1d0ad68c6813c9f07e7c847880346"}}, "annotations": {"bold": True, "color": "blue"}},
                    {"type": "text", "text": {"content": "   •   "}},
                    {"type": "text", "text": {"content": "🌐 Open CEMBI Credit Platform ↗", "link": {"url": "https://rkarim25.github.io/cembicredit/"}}, "annotations": {"bold": True, "color": "green"}}
                ]
            }
        },
        {"type": "divider", "divider": {}},
        {
            "type": "heading_2",
            "heading_2": {
                "rich_text": [
                    {"type": "text", "text": {"content": "⏱️ Recent Processed Receipts (Most Recent First)"}}
                ]
            }
        }
    ]

    # Append top header blocks
    res = requests.patch(f"https://api.notion.com/v1/blocks/{SUMMARY_PAGE_ID}/children", headers=HEADERS, json={"children": top_blocks})
    print(f"Top blocks status: {res.status_code}")

    # Build Table
    table_children = [
        {
            "type": "table_row",
            "table_row": {
                "cells": [
                    [{"type": "text", "text": {"content": "Date"}}],
                    [{"type": "text", "text": {"content": "Company / Entity"}}],
                    [{"type": "text", "text": {"content": "Details & Discrepancies (Reverse Chronological)"}}]
                ]
            }
        }
    ]

    for r in RECEIPTS_REVERSED:
        table_children.append({
            "type": "table_row",
            "table_row": {
                "cells": [
                    [{"type": "text", "text": {"content": r["date"]}}],
                    [{"type": "text", "text": {"content": r["entity"]}}],
                    [{"type": "text", "text": {"content": r["details"]}}]
                ]
            }
        })

    table_payload = {
        "children": [
            {
                "type": "table",
                "table": {
                    "table_width": 3,
                    "has_column_header": True,
                    "has_row_header": False,
                    "children": table_children
                }
            }
        ]
    }

    res_tbl = requests.patch(f"https://api.notion.com/v1/blocks/{SUMMARY_PAGE_ID}/children", headers=HEADERS, json=table_payload)
    if res_tbl.status_code == 200:
        print("[PASS] Successfully created summary table with most recent entries at the top!")
    else:
        print(f"[FAIL] Table creation failed: {res_tbl.status_code} {res_tbl.text}")

if __name__ == "__main__":
    setup_summary_page()
