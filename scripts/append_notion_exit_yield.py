import urllib.request
import json
import sys
import time

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

token = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
headers = {
    "Authorization": f"Bearer {token}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

def text_obj(content, bold=False, color="default"):
    return {
        "type": "text",
        "text": {"content": str(content)},
        "annotations": {
            "bold": bold,
            "italic": False,
            "strikethrough": False,
            "underline": False,
            "code": False,
            "color": color
        }
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

def build_table(headers_list, rows_data):
    width = len(headers_list)
    header_cells = [cell(h, bold=True) for h in headers_list]
    row_blocks = [row(header_cells)]
    for r in rows_data:
        cells = []
        for c in r:
            if isinstance(c, tuple):
                val = c[0]
                bld = c[1] if len(c) > 1 else False
                clr = c[2] if len(c) > 2 else "default"
                cells.append(cell(val, bld, clr))
            else:
                cells.append(cell(c))
        row_blocks.append(row(cells))
    
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

def append_to_notion(page_id, blocks, name="Page"):
    print(f"Appending {len(blocks)} blocks to {name} ({page_id})...")
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    chunk_size = 10
    for i in range(0, len(blocks), chunk_size):
        chunk = blocks[i:i + chunk_size]
        payload = json.dumps({"children": chunk}).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers=headers, method="PATCH")
        try:
            with urllib.request.urlopen(req) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                print(f"[OK] {name} chunk {i // chunk_size + 1} ({len(res.get('results', []))} blocks)")
        except urllib.error.HTTPError as e:
            err = e.read().decode("utf-8")
            print(f"[FAIL] {name} chunk {i // chunk_size + 1} HTTP {e.code}: {err}")
            return False
        time.sleep(0.5)
    return True

# ========================================================
# 1. BRASKEM BLOCKS
# ========================================================
def get_braskem_blocks():
    braskem_exit_headers = ["Exit Yield (Y_exit)", "Implied Spread", "Trading Px of 8Y 7.5% Note", "Debt Value (35c Face)", "Reorg Equity Value", "True Economic Recovery", "Variance vs Nominal", "Desk Trading Action"]
    braskem_exit_rows = [
        [("8.50% (Tight / Bull)", True, "blue"), "+475 bps", ("94.2c", True), "33.0c", "31.3c", ("64.3c", True, "green"), ("-2.0c", False, "red"), ("CONVICTION BUY", True, "green")],
        [("9.25% (Base Tight)", True), "+550 bps", ("90.3c", True), "31.6c", "31.3c", ("62.9c", True, "green"), ("-3.4c", False, "red"), ("STRONG BUY", True, "green")],
        [("9.75% (Desk Base Case)", True, "blue"), "+600 bps", ("87.7c", True), "30.7c", "31.3c", ("62.0c", True, "green"), ("-4.3c", False, "red"), ("BUY (+27% to Mkt)", True, "green")],
        [("10.50% (Stress Exit)", True), "+675 bps", ("84.0c", True), "29.4c", "31.3c", ("60.7c", True, "green"), ("-5.6c", False, "red"), ("HOLD / FAIR", True, "yellow")],
        [("11.25% (Distressed Exit)", True, "red"), "+750 bps", ("80.5c", True, "red"), "28.2c", "31.3c", ("59.5c", True, "orange"), ("-6.8c", False, "red"), ("NEUTRAL", True, "yellow")]
    ]

    return [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📉 Exit Yield Sensitivity Matrix on Senior Bond Recovery", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("In an extrajudicial or Chapter 11 restructuring, senior creditors receive a consideration package: ~35c in 8-year senior exit notes (7.50% cash coupon) + ~31.3c in reorganized equity. The market-clearing Exit Yield dictates the post-emergence trading price of the debt. The matrix below shows the resulting economic recovery:")]
            }
        },
        build_table(braskem_exit_headers, braskem_exit_rows),
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📐 Scenario Anatomy: What Gets You Bear, Base & Bull?", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🔴"},
                "rich_text": [
                    text_obj("BEAR / DISTRESSED FLOOR SCENARIO (17.0c – 22.0c Senior / 0c Hybrid):\n", bold=True, color="red"),
                    text_obj("• Cash EBITDA: $800.0M (Global resin spreads crushed at $150/t by Chinese supply dumping).\n"),
                    text_obj("• Valuation Multiple: 3.5x EV multiple (Distressed fire-sale / liquidation valuation = $2,800M EV).\n"),
                    text_obj("• Maceió Liabilities: -$850.0M (Rotterdam District Court class action expands damages un-capped).\n"),
                    text_obj("• Sponsor Support: $0.0M (Petrobras refuses to inject cash; Novonor is insolvent).\n"),
                    text_obj("• Legal Pathway: Consensual 50%+1 plan fails; hostile in-court Judicial Recovery (RJ) with 24 months of litigation and -$150M legal bleed.\n"),
                    text_obj("• Final Outcome: Only $1.55B available for $9.2B senior unsecured claims (17c–22c). Subordinated 2081 Hybrid completely wiped out (0c).", bold=True)
                ]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🟡"},
                "rich_text": [
                    text_obj("BASE CASE CONSENSUAL REORGANIZATION (61.8c – 66.3c Senior / 10c–14c Hybrid):\n", bold=True, color="yellow"),
                    text_obj("• Cash EBITDA: $1,400.0M (Normalized mid-cycle spreads $350–$400/t; Brazilian domestic demand stable).\n"),
                    text_obj("• Valuation Multiple: 5.0x EV multiple ($7,000M EV; sole Brazilian cracker with 70% share).\n"),
                    text_obj("• Maceió Liabilities: -$600.0M (Scheduled civil settlement provisions capped).\n"),
                    text_obj("• Sponsor Support: R$2.35B raw-material commercial facility from Petrobras bridges near-term liquidity.\n"),
                    text_obj("• Legal Pathway: Consensual Extrajudicial Plan approved (50%+1) with 35% haircut + 30% equitization (resizing gross debt to $5.4B, 3.2x net leverage).\n"),
                    text_obj("• Final Outcome: Senior creditors receive ~35c new 8Y 7.5% notes + ~30c reorg equity. At 9.75% exit yield, senior paper trades at 62.0c. Hybrid 2081 receives nominal 10c–14c warrants.", bold=True)
                ]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🟢"},
                "rich_text": [
                    text_obj("BULL / STRATEGIC BUYOUT & RECAPITALIZATION (95.0c – 100.0c Par Reinstatement):\n", bold=True, color="green"),
                    text_obj("• Cash EBITDA: $1,800.0M–$2,150.0M (Petrochemical super-cycle spike; PE cash spreads >$600/t).\n"),
                    text_obj("• Valuation Multiple: 5.5x–6.0x multiple expansion ($9,900M–$12,900M EV).\n"),
                    text_obj("• Maceió Liabilities: -$500.0M (Final federal judicial release and liability cap).\n"),
                    text_obj("• Sponsor Support: Petrobras / ADNOC consortium buys out Novonor, injecting $2,500M in cash equity.\n"),
                    text_obj("• Legal Pathway: Out-of-court recapitalization; 0% principal haircut; notes extended with coupon step-up or refinanced.\n"),
                    text_obj("• Final Outcome: Full 100c par reinstatement + coupon carry for senior notes. Subordinated 2081 Hybrid recovered at 40c–55c.", bold=True)
                ]
            }
        }
    ]

# ========================================================
# 2. ZORLU ENERJI BLOCKS
# ========================================================
def get_zorlu_blocks():
    zorlu_exit_headers = ["Exit Yield (Y_exit)", "Implied Spread", "Extended 4Y Note Px", "Senior Economic Recovery", "Variance vs Nominal", "Desk Trading Action"]
    zorlu_exit_rows = [
        [("9.50% (At Coupon)", True, "blue"), "+275 bps", ("100.0c", True), ("100.0c", True, "green"), ("0.0c", False, "green"), ("PAR ROLLOVER", True, "green")],
        [("10.00% (Tight Spread)", True), "+325 bps", ("98.4c", True), ("98.4c", True, "green"), ("-1.6c", False, "orange"), ("BUY", True, "green")],
        [("10.50% (Primary Concession)", True), "+375 bps", ("96.8c", True), ("96.8c", True, "green"), ("-3.2c", False, "orange"), ("ACCUMULATE", True, "green")],
        [("11.00% (Desk Base Case)", True, "blue"), "+425 bps", ("95.3c", True), ("95.3c", True, "green"), ("-4.7c", False, "orange"), ("MATCHES MKT (94.5c)", True, "green")],
        [("11.50% (Stress Refinancing)", True), "+475 bps", ("93.7c", True), ("93.7c", True, "yellow"), ("-6.3c", False, "red"), ("HOLD / FAIR", True, "yellow")],
        [("12.00% (Bank Friction)", True, "red"), "+525 bps", ("92.2c", True, "red"), ("92.2c", True, "red"), ("-7.8c", False, "red"), ("DEFENSIVE", True, "red")]
    ]

    return [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📉 Exit Yield Sensitivity Matrix: 2026 Extension Paper Valuation", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("Why do ZOREN 2026 notes trade at 94.5c today despite 190.6% asset coverage? The secondary quote is not pricing an asset deficit; it is the exact present value of an extended 4-year note (9.50% coupon) discounted at an 11.00% market Exit Yield (+425 bps over Turkish sovereign Eurobonds). The sensitivity matrix below displays pricing across clearing yields:")]
            }
        },
        build_table(zorlu_exit_headers, zorlu_exit_rows),
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📐 Scenario Anatomy: What Gets You Bear, Base & Bull?", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🔴"},
                "rich_text": [
                    text_obj("BEAR / DROUGHT SQUEEZE SCENARIO (24.0c – 58.0c Senior Recovery):\n", bold=True, color="red"),
                    text_obj("• Cash EBITDA: $240.0M (Severe drought slashes hydro output by -35%; geothermal steam pressures drop).\n"),
                    text_obj("• Valuation Multiple: 5.0x EV multiple (Distressed valuation = $1,200M EV).\n"),
                    text_obj("• Structural Subordination: $1,200M OpCo project loans (EBRD + OEDAŞ TLREF) ring-fenced and consume all cash flow.\n"),
                    text_obj("• Sponsor Support: $0.0M (Zorlu Holding liquidity depleted; banks freeze credit lines).\n"),
                    text_obj("• Legal Pathway: Bank syndicate impasse; forced debt standstill.\n"),
                    text_obj("• Final Outcome: Only $140M left for $582M HoldCo claims (24.0c fundamental / 58c secondary floor). Existing equity completely wiped out.", bold=True)
                ]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🟡"},
                "rich_text": [
                    text_obj("BASE CASE CONSENSUAL REFINANCING (95.3c Mkt / 100.0c Par Coverage):\n", bold=True, color="yellow"),
                    text_obj("• Cash EBITDA: $350.0M (Geothermal >90% CF earning statutory USD YEKDEM $105–$132/MWh; OEDAŞ 12.3% ROE on $650M RAB).\n"),
                    text_obj("• Valuation Multiple: 6.0x EV multiple ($2,100M EV + $240M Cash = $2,340M total distributable value).\n"),
                    text_obj("• OpCo Debt Ring-Fenced: $1,200M priority secured project loans serviced normally from plant revenues.\n"),
                    text_obj("• Refinancing Pathway: Consensual 4-year Amend-and-Extend to June 2030 at 9.50% coupon (+50 bps step-up).\n"),
                    text_obj("• Final Outcome: $1,110M net value for $582M senior claims (190.6% asset coverage / 100c Par). At 11.0% exit yield, paper trades at 95.3c today (in line with 94.5c quote).", bold=True)
                ]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "🟢"},
                "rich_text": [
                    text_obj("BULL / RENEWABLE IPO CALL & TENDER (102.5c Par Call / Tender):\n", bold=True, color="green"),
                    text_obj("• Cash EBITDA: $410.0M (Peak hydrology; industrial electricity demand pushes spot PTF; ZES charging network profitable).\n"),
                    text_obj("• Valuation Multiple: 7.3x peer multiple ($3,000M EV, matching Turkish pure-play renewable comps).\n"),
                    text_obj("• Sponsor Catalyst: Zorlu Yenilenebilir minority IPO raises +$250M cash or stake sale to Gulf strategic (ADQ/ACWA).\n"),
                    text_obj("• Capital Action: Cash tender or early make-whole call at 102.5c takes out June 2026 Eurobonds at premium.\n"),
                    text_obj("• Final Outcome: Full par redemption + carry. $1,747.6M residual equity value preserved for parent Zorlu Holding.", bold=True)
                ]
            }
        }
    ]

if __name__ == "__main__":
    braskem_id = "3e31d0ad-68c6-819b-aaa2-de6d03346ec9"
    zorlu_id = "3df1d0ad-68c6-814f-921e-f33f2b2f199b"

    append_to_notion(braskem_id, get_braskem_blocks(), "Braskem")
    append_to_notion(zorlu_id, get_zorlu_blocks(), "Zorlu Enerji")
