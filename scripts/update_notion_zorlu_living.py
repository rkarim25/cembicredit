#!/usr/bin/env python3
"""
Restructure Zorlu Enerji Notion Dossier to the Gold Standard:
1. Top of page: Living Up-To-Date "Stock" / Credit View (Most Recent First: 22 Sep 2026)
   - Verdict & Stance Callout
   - Positives (Credit Strengths)
   - Negatives (Credit Risks)
   - Background & Operational Perimeter
   - Recent Drivers & Earnings Pulse
   - Upcoming Catalysts & Refinancing Milestones
   - Management Questions & Due Diligence Queue
2. Embedded Interactive Tools & Financial Model
3. Historical Notes & Chronological Intelligence Timeline (clearly demarked archived runs)
"""
import os
import sys
import json
import requests
import time

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get("NOTION_TOKEN_WORK", os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY"))
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

PAGE_ID = "3df1d0ad-68c6-814f-921e-f33f2b2f199b"
BLOCK_0_ID = "3df1d0ad-68c6-81e6-b96f-e4fbceb917b2"

def text_obj(content, bold=False, italic=False, color="default", url=None):
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

def heading_1(txt):
    return {
        "object": "block",
        "type": "heading_1",
        "heading_1": {"rich_text": [text_obj(txt, bold=True)]}
    }

def heading_2(txt):
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {"rich_text": [text_obj(txt, bold=True)]}
    }

def callout(rich_texts, emoji="📌", color="default"):
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "icon": {"type": "emoji", "emoji": emoji},
            "color": color,
            "rich_text": rich_texts
        }
    }

def bullet(rich_texts):
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {"rich_text": rich_texts}
    }

def divider():
    return {"object": "block", "type": "divider", "divider": {}}

def run():
    print(f"--> Updating Zorlu Enerji dossier ({PAGE_ID}) with Living Credit View...")

    # 1. Update Block 0: Top Callout with Stance & Executive Verdict
    top_callout_texts = [
        text_obj("📌 UP-TO-DATE CREDIT VIEW & DESK VERDICT (Most Recent Synthesis: 22 Sep 2026)\n", bold=True, color="blue"),
        text_obj("• Desk Stance: ", bold=True),
        text_obj("Overweight / Consensual Workout\n", bold=True, color="green"),
        text_obj("• Pricing & Yield: ", bold=True),
        text_obj("Secondary Price: 94.5¢ | YTM: 11.2% | Z-Spread: 680 bps | Benchmark: ZOREN 9.00% 2026\n"),
        text_obj("• Fundamental Asset Coverage: ", bold=True),
        text_obj("190.6% ($2,598M normalized EV vs $1,363M Net Debt) supports 100¢ fundamental par recovery.\n"),
        text_obj("• Restructuring Target: ", bold=True),
        text_obj("95.3¢ Base Case consensual 3-year extension with par coupon retention. High domestic bank cooperation incentives (İşbank, Garanti BBVA) mitigate creditor-on-creditor violence risks.")
    ]

    res = requests.patch(
        f"https://api.notion.com/v1/blocks/{BLOCK_0_ID}",
        headers=HEADERS,
        json={"callout": {"rich_text": top_callout_texts}}
    )
    if res.status_code == 200:
        print("[PASS] Successfully updated top Block 0 callout.")
    else:
        print(f"[FAIL] Block 0 update failed: {res.status_code} {res.text}")
        return

    # 2. Build the 6 Living Sections
    living_blocks = [
        # POSITIVES
        heading_2("🟢 Key Credit Strengths (Positives)"),
        bullet([
            text_obj("Substantial Asset Backing: ", bold=True),
            text_obj("Normalized EV of $2,598M provides 190.6% asset coverage over $1,363M net debt across generation and regulated grid monopolies.")
        ]),
        bullet([
            text_obj("Guaranteed USD Feed-in Tariffs (YEKDEM): ", bold=True),
            text_obj("Kızıldere I, II, III and Alaşehir geothermal plants receive $105–$132/MWh guaranteed hard-currency revenue through 2028.")
        ]),
        bullet([
            text_obj("Regulated Monopoly Cash Flows: ", bold=True),
            text_obj("OEDAŞ electricity distribution grid provides inflation-indexed, TRY-hedged regulated revenue serving 3M+ population in Central Anatolia.")
        ]),
        bullet([
            text_obj("Market-Leading EV Infrastructure: ", bold=True),
            text_obj("ZES is Turkey's #1 fast-charging network with 38% market share and 1,850+ public sockets, expanding into Southern Europe.")
        ]),

        # NEGATIVES
        heading_2("🔴 Key Credit Vulnerabilities (Negatives)"),
        bullet([
            text_obj("Structural Subordination: ", bold=True),
            text_obj("$750M ZOREN 2026 Eurobonds sit at HoldCo level, structurally subordinated to ~$613M in senior secured OpCo bank facilities.")
        ]),
        bullet([
            text_obj("Creditor Violence & Bank Holdout Risk: ", bold=True),
            text_obj("Domestic Turkish bank syndicate holds asset pledges over Kızıldere and OEDAŞ shares, requiring cooperative standstill terms to avoid ring-fencing.")
        ]),
        bullet([
            text_obj("2028 YEKDEM Regulatory Cliff: ", bold=True),
            text_obj("Guaranteed hard-currency geothermal tariffs expire at end-2028, cutting unit electricity realization by >50% to merchant PTF rates.")
        ]),
        bullet([
            text_obj("Corporate Governance & Related-Party Leakage: ", bold=True),
            text_obj("$85M upstream uncollateralized loan to parent Zorlu Holding creates group contagion risk and drains HoldCo liquidity.")
        ]),

        # BACKGROUND
        heading_2("🏢 Background & Operational Asset Perimeter"),
        bullet([
            text_obj("Operating Capacity: ", bold=True),
            text_obj("991 MW total installed capacity across geothermal (305 MW), wind (344 MW), hydro (119 MW), solar (116 MW), and gas (107 MW).")
        ]),
        bullet([
            text_obj("Distribution Perimeter: ", bold=True),
            text_obj("Full operational control of OEDAŞ distribution grid covering 5 Anatolian provinces (Afyon, Bilecik, Eskişehir, Kütahya, Uşak).")
        ]),
        bullet([
            text_obj("International Holdings: ", bold=True),
            text_obj("25% stake in Dorad Energy (860 MW CCGT in Israel) and ZEPL (56.4 MW wind in Pakistan).")
        ]),

        # RECENT DRIVERS
        heading_2("⚡ Recent Drivers & Earnings Pulse"),
        bullet([
            text_obj("Houlihan Lokey Mandate: ", bold=True),
            text_obj("Appointed in September 2026 as financial advisor to lead bilateral capital structure review ahead of the June 2026 maturity.")
        ]),
        bullet([
            text_obj("October 23 Coupon Test: ", bold=True),
            text_obj("Semiannual coupon payment ($33.75M) on the 2026 Eurobonds represents the nearest immediate cash liquidity test.")
        ]),
        bullet([
            text_obj("ADB Grid Facility Secured: ", bold=True),
            text_obj("August 2026 closing of TRY 3.98B (~$115M) Asian Development Bank facility ring-fenced strictly for OEDAŞ grid modernization.")
        ]),
        bullet([
            text_obj("Desk Restructuring Sandbox Active: ", bold=True),
            text_obj("Interactive 16-row priority recovery waterfall, exit yield sensitivity matrix, and 3-scenario payoff engine deployed live.")
        ]),

        # CATALYSTS
        heading_2("📅 Upcoming Catalysts & Key Refinancing Milestones"),
        bullet([
            text_obj("23 Oct 2026 — October 2026 Eurobond Coupon Payment ($33.75M): ", bold=True),
            text_obj("Critical liquidity test; timely payment confirms consensual extension path.")
        ]),
        bullet([
            text_obj("06 Nov 2026 — Q3 2026 / 9M Financials Release: ", bold=True),
            text_obj("Provides updated run-rate EBITDA and confirmation of tariff adjustment factors.")
        ]),
        bullet([
            text_obj("01 Jun 2027 — ZOREN 9.00% 2026 Final Maturity Bullet ($750M): ", bold=True),
            text_obj("Maturity wall requiring exchange into 3-year extension paper or par refinancing.")
        ]),
        bullet([
            text_obj("31 Dec 2028 — YEKDEM Geothermal Guarantee Expiry (Kızıldere I & II): ", bold=True),
            text_obj("Transition from guaranteed $105–$132/MWh hard-currency tariff to Turkish merchant PTF market.")
        ]),

        # MANAGEMENT QUESTIONS
        heading_2("❓ Management Questions & Due Diligence Queue"),
        bullet([
            text_obj("1. Domestic Bank Parity: ", bold=True),
            text_obj("Will the domestic bank syndicate (İşbank, Garanti BBVA) agree to extend OpCo debt maturities pari passu with HoldCo Eurobond amendments?")
        ]),
        bullet([
            text_obj("2. Central Bank FX Surrender Lag: ", bold=True),
            text_obj("Does Zorlu face any conversion delays or surrender quotas when turning TRY electricity receipts into USD under YEKDEM?")
        ]),
        bullet([
            text_obj("3. Dorad Energy Cash Leakage: ", bold=True),
            text_obj("Are dividend cash flows from Israel's Dorad Energy being repatriated to Istanbul without legal or geopolitical restrictions?")
        ]),
        bullet([
            text_obj("4. Related-Party Loan Repayment: ", bold=True),
            text_obj("What is the binding repayment timetable for the $85M upstream loan to parent Zorlu Holding ahead of the October 2026 coupon?")
        ]),
        divider()
    ]

    print(f"--> Prepending {len(living_blocks)} Living Credit View blocks immediately after Block 0...")
    # Prepend after Block 0
    prepend_res = requests.patch(
        f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
        headers=HEADERS,
        json={
            "children": living_blocks,
            "after": BLOCK_0_ID
        }
    )
    if prepend_res.status_code == 200:
        print(f"[PASS] Successfully prepended Living Credit View directly after Block 0!")
    else:
        print(f"[FAIL] Prepend failed: {prepend_res.status_code} {prepend_res.text}")
        return

    # 3. Add Historical Timeline Demarkation
    # Insert demarkation callouts for archived runs
    # Find block 8 (the divider before the historical sections)
    block_8_id = "3df1d0ad-68c6-81a5-b966-f784f26c52e0"
    hist_header_blocks = [
        heading_1("📜 Historical Notes & Chronological Intelligence Timeline"),
        callout([
            text_obj("🗄️ ARCHIVED INTELLIGENCE & PREVIOUS NOTE RUNS (Chronological Timeline)\n", bold=True),
            text_obj("The sections below preserve previous research runs, broker memos, and earlier restructuring analyses. Each intake is explicitly demarked as an archived run.")
        ], emoji="🗄️", color="gray_background"),
        callout([
            text_obj("📌 [Archived / Previous Note Run: 19 Sep 2026] — Initial Distressed Workout & Restructuring Memo\n", bold=True, color="orange"),
            text_obj("Summary: Initial distressed situation analysis following Houlihan Lokey appointment. Detailed the October 23 coupon test ($33.75M), EBITDA quality breakdown (YEKDEM vs regulated OEDAŞ vs merchant), $85M related-party loan leakage, and HoldCo structural subordination.")
        ], emoji="📋", color="brown_background")
    ]

    print("--> Inserting Historical Timeline demarkation banner before 19 Sep research...")
    hist_res = requests.patch(
        f"https://api.notion.com/v1/blocks/{PAGE_ID}/children",
        headers=HEADERS,
        json={
            "children": hist_header_blocks,
            "after": block_8_id
        }
    )
    if hist_res.status_code == 200:
        print("[PASS] Successfully inserted Historical Notes header and 19 Sep archived run demarkation!")
    else:
        print(f"[WARN] Historical header insert: {hist_res.status_code} {hist_res.text}")

    # Mark the 22 Sep research section as an archived run
    block_46_id = "3e31d0ad-68c6-8162-8b37-df324cb8631c"
    # Update block 46 heading text
    patch_46 = requests.patch(
        f"https://api.notion.com/v1/blocks/{block_46_id}",
        headers=HEADERS,
        json={
            "heading_2": {
                "rich_text": [
                    text_obj("📌 [Archived / Previous Note Run: 22 Sep 2026] — Creditor Violence Deep Dive & Scenario Restructuring Matrix", bold=True, color="blue")
                ]
            }
        }
    )
    if patch_46.status_code == 200:
        print("[PASS] Successfully marked 22 Sep section as an explicit Archived Run!")
    else:
        print(f"[WARN] Block 46 patch returned: {patch_46.status_code} {patch_46.text}")

    print("--> Zorlu Enerji Notion dossier restructure completed successfully!")

if __name__ == "__main__":
    run()
