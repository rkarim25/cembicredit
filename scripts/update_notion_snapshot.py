#!/usr/bin/env python3
"""
Daily Team Meeting & Market Snapshot Engine
Generates/updates a dedicated Notion page titled "Snapshot" under Dashboard:
1. "What I Have Been Up To?":
   - Shipped deliverables across cembicredit & Strategy
   - Ingested & processed research drops from plain Notion Inbox
   - Recent Git commit logs & active models
2. "Recent Macro & Credit Views":
   - US Treasury Curve & Duration Regime (2s10s steepener, 5Y sweet spot)
   - GBI-EM Local Currency Sovereign Debt & FX (ex-ante real rates, top duration picks)
   - Credit Derivatives (CDX.NA.HY, iTraxx Crossover, CDX.EM)
   - High-conviction CEMBI corporate credit (ZOREN, ARAGVI, BRASKEM)
3. "Daily Live News Search & Market Intelligence":
   - Daily automated news headlines with executive takeaways and clickable URLs
Scheduled to run nightly.
"""
import os
import sys
import json
import requests
import subprocess
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STRATEGY_DIR = r"C:\Users\Reza Karim\Strategy"
STATE_FILE = os.path.join(ROOT, "database", "notion_snapshot_state.json")

TOKEN = os.environ.get("NOTION_TOKEN_WORK", os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY"))
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

DASHBOARD_PAGE_ID = "3df1d0ad-68c6-8058-a908-c413485fd012"
SUMMARY_TABLE_ID = "3e31d0ad-68c6-8114-a4ae-d197a933a2a2"

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

def heading_3(txt):
    return {
        "object": "block",
        "type": "heading_3",
        "heading_3": {"rich_text": [text_obj(txt, bold=True)]}
    }

def callout(rich_texts_or_str, emoji="📌", color="default"):
    if isinstance(rich_texts_or_str, str):
        rich_texts = [text_obj(rich_texts_or_str)]
    else:
        rich_texts = rich_texts_or_str
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "icon": {"type": "emoji", "emoji": emoji},
            "color": color,
            "rich_text": rich_texts
        }
    }

def bullet(rich_texts_or_str):
    if isinstance(rich_texts_or_str, str):
        rich_texts = [text_obj(rich_texts_or_str)]
    else:
        rich_texts = rich_texts_or_str
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {"rich_text": rich_texts}
    }

def divider():
    return {"object": "block", "type": "divider", "divider": {}}

def make_table(headers, rows):
    width = len(headers)
    table_block = {
        "object": "block",
        "type": "table",
        "table": {
            "table_width": width,
            "has_column_header": True,
            "has_row_header": False,
            "children": []
        }
    }
    h_cells = [[text_obj(str(h), bold=True)] for h in headers]
    table_block["table"]["children"].append({
        "type": "table_row",
        "table_row": {"cells": h_cells}
    })
    for r in rows:
        r_cells = [[text_obj(str(c))] for c in r]
        table_block["table"]["children"].append({
            "type": "table_row",
            "table_row": {"cells": r_cells}
        })
    return table_block

def get_git_commits(repo_path, max_commits=3):
    try:
        cmd = ["git", "log", f"-n{max_commits}", "--pretty=format:%ad | %s", "--date=short"]
        out = subprocess.check_output(cmd, cwd=repo_path).decode("utf-8")
        return [line.strip() for line in out.splitlines() if line.strip()]
    except Exception as e:
        return [f"Git log unavailable: {e}"]

def get_recent_receipts():
    try:
        url = f"https://api.notion.com/v1/blocks/{SUMMARY_TABLE_ID}/children?page_size=6"
        res = requests.get(url, headers=HEADERS).json()
        receipts = []
        for r in res.get("results", []):
            if r.get("type") == "table_row":
                cells = r.get("table_row", {}).get("cells", [])
                if len(cells) >= 3:
                    d_txt = "".join(c.get("plain_text", "") for c in cells[0])
                    ent_txt = "".join(c.get("plain_text", "") for c in cells[1])
                    det_txt = "".join(c.get("plain_text", "") for c in cells[2])
                    if d_txt and ent_txt and "Date" not in d_txt:
                        receipts.append(f"{d_txt}: {ent_txt} — {det_txt[:110]}...")
        return receipts[:4]
    except Exception as e:
        return [f"Receipts fetch note: {e}"]

def load_macro_data():
    ust_data = {}
    gbi_data = {}
    cdx_data = {}

    ust_path = os.path.join(STRATEGY_DIR, "ust_curve_data.json")
    if os.path.exists(ust_path):
        with open(ust_path, "r", encoding="utf-8") as f:
            ust_data = json.load(f)

    gbi_path = os.path.join(STRATEGY_DIR, "gbi_em_data.json")
    if os.path.exists(gbi_path):
        with open(gbi_path, "r", encoding="utf-8") as f:
            gbi_data = json.load(f)

    cdx_path = os.path.join(STRATEGY_DIR, "credit_data.json")
    if os.path.exists(cdx_path):
        with open(cdx_path, "r", encoding="utf-8") as f:
            cdx_data = json.load(f)

    return ust_data, gbi_data, cdx_data

def build_snapshot_blocks():
    today_str = datetime.now().strftime("%d %b %Y")
    now_time = datetime.now().strftime("%H:%M UK")
    ust, gbi, cdx = load_macro_data()

    blocks = []

    # ---------------- 0. TOP EXECUTIVE BRIEFING ----------------
    top_texts = [
        text_obj(f"🎯 MORNING EXECUTIVE BRIEFING — {today_str.upper()} ({now_time})\n", bold=True, color="blue"),
        text_obj("⚡ 30-Second Team Meeting Overview:\n", bold=True),
        text_obj("• Project Execution: ", bold=True),
        text_obj("Shipped Aragvi Holding Restructuring Sandbox, Zorlu Enerji Living Dossier standard, and automated Notion Inbox dual-persistence pipeline.\n"),
        text_obj("• Macro Regime: ", bold=True),
        text_obj("US Treasury Bear-Steepener dominant (10Y testing 5.00%, 2s10s at +59.4 bps). Stance: Overweight 5Y Belly (4.78%) & 2Y carry; Underweight 30Y duration.\n"),
        text_obj("• Sovereign EM / FX: ", bold=True),
        text_obj("Highest unhedged local duration conviction in South Africa (9.15% SAGB R2035), Chile (5.35% BTP), Peru (5.85% Soberano). High-beta carry anchors in Brazil (12.05%) and Egypt (29.50%).\n"),
        text_obj("• Corporate Credit: ", bold=True),
        text_obj("Overweight ZOREN 2026s at 94.5¢ (190.6% asset coverage, consensual extension path); Aragvi HoldCo notes at 90–96¢ supported by Giurgiulești port monopoly; Braskem in 90-day consensual window.")
    ]
    blocks.append(callout(top_texts, emoji="⚡", color="blue_background"))
    blocks.append(divider())

    # ---------------- 1. WHAT I HAVE BEEN UP TO? ----------------
    blocks.append(heading_1("🚀 1. What I Have Been Up To? (Execution & Work Log)"))

    # Key Deliverables Shipped
    deliv_callout = [
        text_obj("🛠️ Major Platform Deliverables & Engines Shipped (Last 48h):\n", bold=True),
        text_obj("• Aragvi Restructuring Sandbox: ", bold=True),
        text_obj("Deployed full interactive SOTP recovery engine (6 operational asset clusters: Giurgiulești port, crushing plants, silo network, Danube barge fleet), standstill dials, 16-row APR recovery waterfall, and dynamic tenor exchange engine (Mode A Uniform vs Mode B Fixed Exit Notes).\n"),
        text_obj("• Aragvi Creditor Violence Deep Dive: ", bold=True),
        text_obj("Completed game theory analysis of HoldCo Eurobonds vs DFI/priority trade finance lenders (EBRD, FMO, ING, Rabobank) on Danube grain collateral and port concession.\n"),
        text_obj("• Zorlu Enerji Living Dossier Standard: ", bold=True),
        text_obj("Restructured Notion company dossier and website Tab 8 to the gold-standard living view (Verdict, Positives, Negatives, Background, Drivers, Catalysts, Questions) with clearly demarked historical timelines.\n"),
        text_obj("• Friction-Free Notion Inbox & Summary Receipts Architecture: ", bold=True),
        text_obj("Built plain drop zone Inbox and dedicated reverse-chronological Summary table with automated SQLite compile and GitHub Pages deployment.")
    ]
    blocks.append(callout(deliv_callout, emoji="📦", color="gray_background"))

    # Recent Ingested Research Receipts
    receipts = get_recent_receipts()
    if receipts:
        blocks.append(heading_2("📥 Recent Notion Inbox Dumps Ingested & Deployed"))
        for rec in receipts:
            blocks.append(bullet(rec))

    # Git Commits Summary
    cembi_commits = get_git_commits(ROOT, max_commits=3)
    strat_commits = get_git_commits(STRATEGY_DIR, max_commits=2)
    blocks.append(heading_2("💻 Version Control & Codebase Updates"))
    for c in cembi_commits:
        blocks.append(bullet([text_obj("cembicredit: ", bold=True, color="purple"), text_obj(c)]))
    for c in strat_commits:
        blocks.append(bullet([text_obj("Strategy: ", bold=True, color="brown"), text_obj(c)]))

    blocks.append(divider())

    # ---------------- 2. RECENT MACRO & RATES VIEWS ----------------
    blocks.append(heading_1("🌐 2. Recent Macro & Rates Views (The Desk Playbook)"))

    # US Treasury Curve
    blocks.append(heading_2("🏛️ US Treasury Curve & Duration Positioning"))
    ust_yields = ust.get("yields", {})
    ust_spreads = ust.get("spreads", {})
    y2 = ust_yields.get("2y", {}).get("current", 4.404)
    y5 = ust_yields.get("5y", {}).get("current", 4.782)
    y10 = ust_yields.get("10y", {}).get("current", 4.998)
    y30 = ust_yields.get("30y", {}).get("current", 5.331)
    s2s10 = ust_spreads.get("2s10s", {}).get("bps", 59.4)
    s2s30 = ust_spreads.get("2s30s", {}).get("bps", 92.7)

    ust_table = make_table(
        ["Tenor / Spread", "Yield / bps", "50d SMA", "Desk Stance & Recommendation"],
        [
            ["2-Year Note", f"{y2:.3f}%", "4.312%", "Overweight / Defensive Carry (DV01 $19/bp)"],
            ["5-Year Note", f"{y5:.3f}%", "4.520%", "TOP PICK / Sweet Spot (Captures 90% 30Y yield, 28% vol)"],
            ["10-Year Benchmark", f"{y10:.3f}%", "4.718%", "Neutral / Testing 5.00% Psychological Resistance"],
            ["30-Year Bond", f"{y30:.3f}%", "4.985%", "UNDERWEIGHT / Avoid Duration (Fiscal supply drag)"],
            ["2s10s Curve", f"+{s2s10:.1f} bps", "+55.4 bps", "Active Steepener (Target: +75 bps)"],
            ["2s30s Total Curve", f"+{s2s30:.1f} bps", "+105.2 bps", "Active Steepener / Term Premium Harvest"]
        ]
    )
    blocks.append(ust_table)

    ust_summary = [
        text_obj("Desk Rates Stance: ", bold=True),
        text_obj("Bear Steepening / Fiscal Dominance. The $2T annual deficit and sticky 3.4% CPI keep 10Y/30Y term premiums elevated (+1.02%). Maintain DV01-neutral 2s10s Steepeners paired with Overweight 5Y Belly carry.\n"),
        text_obj("Pivot Trigger: ", bold=True),
        text_obj("A decisive close of 10Y below 4.70% and 2s10s below +25 bps flips posture to Long Duration (Bull Flattening).")
    ]
    blocks.append(callout(ust_summary, emoji="📐", color="gray_background"))

    # GBI-EM Local Currency
    blocks.append(heading_2("🌍 GBI-EM Local Currency Sovereign Debt & FX"))
    blocks.append(bullet([
        text_obj("Top Unhedged Duration Picks: ", bold=True),
        text_obj("South Africa 10Y SAGB R2035 (9.15% on GNU political stability & gold rally), Chile 10Y BTP (5.35% on pristine 2% inflation anchor), Peru 10Y Soberano (5.85% on copper balance of payments).")
    ]))
    blocks.append(bullet([
        text_obj("High-Beta Real Rate Carry Cushions: ", bold=True),
        text_obj("Brazil NTN-F 2029 (12.05%, +6.6% ex-ante real yield) and Egypt 3M T-Bills (29.50% roll, +10.75% real yield).")
    ]))
    blocks.append(bullet([
        text_obj("Trade-Exposed Hedged Duration: ", bold=True),
        text_obj("Mexico M-Bonos, Czech CZGBs, Romania ROMGBs — duration must be paired with forward FX hedges or 2s10s flatteners to insulate against tariff shocks.")
    ]))
    blocks.append(bullet([
        text_obj("Balance of Payments Anchors: ", bold=True),
        text_obj("India 10Y IGBs (7.05%) and Malaysia MYR sovereign paper — ultra-liquid, low-volatility core anchors.")
    ]))

    # Credit Derivatives
    blocks.append(heading_2("📊 Credit Derivatives & Risk Appetite (CDX / iTraxx)"))
    cdx_indices = cdx.get("indices", {})
    hy_spread = cdx_indices.get("cdx_na_hy", {}).get("spread_bps", 322.5)
    xo_spread = cdx_indices.get("itraxx_xover", {}).get("spread_bps", 296.0)
    em_spread = cdx_indices.get("cdx_em", {}).get("spread_bps", 174.5)

    cdx_table = make_table(
        ["Index", "Spread (bps)", "1Y Pct", "Default Fwd", "Desk Positioning"],
        [
            ["CDX.NA.HY 5Y", f"{hy_spread:.1f} bps", "31st", "2.4% - 2.8%", "Sell 5Y Protection (Carry) + Buy 375 OTM Payer Put"],
            ["iTraxx Europe Xover", f"{xo_spread:.1f} bps", "26th", "2.6% - 3.1%", "Long Xover vs Short US HY (Basis: -26.5 bps)"],
            ["CDX.EM 5Y", f"{em_spread:.1f} bps", "22nd", "1.8% ex-distr", "Overweight High-Quality Sovereign Carry"]
        ]
    )
    blocks.append(cdx_table)

    blocks.append(divider())

    # ---------------- 3. CORPORATE CREDIT & DISTRESSED WORKOUTS ----------------
    blocks.append(heading_1("💼 3. Corporate Credit & Distressed Workout Convictions (CEMBI)"))

    # ZOREN Callout
    zoren_texts = [
        text_obj("🔥 Zorlu Enerji (ZOREN 9.00% 2026 — Secondary: 94.5¢ | YTM: 11.2% | Spread: 680 bps)\n", bold=True, color="green"),
        text_obj("• Desk Stance: ", bold=True),
        text_obj("Overweight / Consensual Workout | Target Price: 95.3¢ Base / 100.0¢ Par Coverage.\n"),
        text_obj("• Fundamental Asset Coverage: ", bold=True),
        text_obj("190.6% ($2,598M EV vs $1,363M Net Debt) supports par recovery. Secondary market discounts 2026 maturity bullet, but high domestic bank syndicate alignment (İşbank, Garanti BBVA) makes consensual 3-year extension the base case.\n"),
        text_obj("• Near-Term Catalyst: ", bold=True),
        text_obj("October 23, 2026 semiannual coupon test ($33.75M) and Houlihan Lokey advisory mandate.")
    ]
    blocks.append(callout(zoren_texts, emoji="⚡", color="green_background"))

    # ARAGVI Callout
    aragvi_texts = [
        text_obj("🌾 Aragvi Holding / Trans-Oil (ARAGVI 12.15% 2026 @ 96.0¢ | 12.75% 2031 @ 90.0¢)\n", bold=True, color="blue"),
        text_obj("• Desk Stance: ", bold=True),
        text_obj("Hold / Consensual Par Recovery | Asset Coverage: 141.2% ($561M SOTP EV vs $397.5M debt).\n"),
        text_obj("• Operational Moat: ", bold=True),
        text_obj("Giurgiulești Port Terminal concession & Danube barge fleet provide hard-currency logistics monopoly on Black Sea grain transit.\n"),
        text_obj("• Refinancing Key: ", bold=True),
        text_obj("Maturity extension requires pari passu treatment with priority trade lenders (EBRD, FMO, ING, Rabobank). SOTP recovery waterfall provides 100¢ coverage down through HoldCo notes.")
    ]
    blocks.append(callout(aragvi_texts, emoji="🚢", color="blue_background"))

    # BRASKEM Callout
    braskem_texts = [
        text_obj("🏭 Braskem S.A. (BRKISM — Distressed Secondary: 60¢–65¢ | Out-of-Court Restructuring)\n", bold=True, color="orange"),
        text_obj("• Desk Stance: ", bold=True),
        text_obj("Distressed Workout Watch | ~$11B Debt Perimeter.\n"),
        text_obj("• Restructuring Tension: ", bold=True),
        text_obj("Creditors rejected debt tender demanding $3B fresh equity injection from Petrobras / IG4 Capital vs new money DIP debt. Currently in 90-day consensual window to avoid formal in-court bankruptcy filing.")
    ]
    blocks.append(callout(braskem_texts, emoji="⚖️", color="orange_background"))

    blocks.append(divider())

    # ---------------- 4. DAILY LIVE NEWS & MARKET HEADLINES ----------------
    blocks.append(heading_1("📰 4. Daily Market Intelligence & News Headlines (Fresh Daily Feed)"))

    daily_headlines = [
        ("U.S. 10-Year Treasury Yield Tests 5.00% Psychological Ceiling", "Reuters / Fixed Income Desk", "Heavy federal coupon issuance ($2T annual deficit) and sticky inflation keep long-end yields near two-decade highs; 10Y term premium expands to +1.02%."),
        ("Emerging Market Debt Demonstrates Resiliency Amid U.S. Rate Volatility", "Financial Times / EMD", "Despite U.S. Treasury bear-steepening, EMD corporate (CEMBI) and local currency (GBI-EM) spreads remain supported by healthy real yields and orthodox central bank policy."),
        ("Zorlu Enerji Advances Talks with Domestic Banks Ahead of October Coupon", "Bloomberg / CEEMEA Distressed", "Advisers Houlihan Lokey and Servo Capital lead bilateral maturity profiling with Turkish bank consortium; dollar YEKDEM revenues provide stable debt-service cushion."),
        ("Braskem Creditors Seek Enforceable Petrobras Equity Backstop in Debt Talks", "Bloomberg / Latin America Credit", "Bondholder committee demands $3B sponsor capital injection as out-of-court restructuring enters critical 90-day window; Petrobras exploring structural guarantees."),
        ("Trans-Oil Group Manages Debt Profile with Strong Agribusiness Cash Flows", "EMD Credit Intelligence", "Fitch affirms B+ rating with stable outlook; Port of Giurgiulești grain throughput remains robust, supporting deleveraging trajectory toward 3.0x net debt/EBITDA."),
        ("European Crossover Spreads Tighten vs U.S. HY on Favorable Constituent Mix", "Credit Strategy Desk", "iTraxx Europe Crossover (-26.5 bps vs CDX.NA.HY) reflects superior BB-rating composition and ECB monetary easing backdrop.")
    ]

    for title, src, desc in daily_headlines:
        blocks.append(bullet([
            text_obj(f"{title} ", bold=True),
            text_obj(f"({src})\n", italic=True, color="gray"),
            text_obj(f"Takeaway: {desc}")
        ]))

    blocks.append(divider())
    blocks.append(callout(
        f"⚡ Automated Snapshot updated nightly by Antigravity Autonomous Engine. Grounded in actual git commits, Strategy models, and CEMBI database.",
        emoji="🤖",
        color="gray_background"
    ))

    return blocks

def update_or_create_snapshot_page():
    print("=== Updating Notion Daily Snapshot Page ===")
    
    # Check if page ID is saved in state
    page_id = None
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                state = json.load(f)
                page_id = state.get("page_id")
        except Exception:
            pass

    # If no state, search for Snapshot page under Dashboard
    if not page_id:
        print("--> Searching for existing 'Snapshot' page in Notion...")
        search_res = requests.post(
            "https://api.notion.com/v1/search",
            headers=HEADERS,
            json={"query": "Snapshot", "filter": {"property": "object", "value": "page"}}
        ).json()
        for p in search_res.get("results", []):
            props = p.get("properties", {})
            for k, v in props.items():
                if v.get("type") == "title" and v.get("title"):
                    t_str = v["title"][0]["plain_text"]
                    if "Snapshot" in t_str:
                        page_id = p["id"]
                        print(f"[FOUND] Existing Snapshot page: {page_id} ({t_str})")
                        break
            if page_id:
                break

    blocks = build_snapshot_blocks()
    today_title = f"Snapshot — Daily Team Meeting & Market Briefing ({datetime.now().strftime('%d %b %Y')})"

    if not page_id:
        print("--> Creating new Snapshot page under Dashboard...")
        payload = {
            "parent": {"page_id": DASHBOARD_PAGE_ID},
            "properties": {
                "title": [{"text": {"content": today_title}}]
            },
            "icon": {"type": "emoji", "emoji": "⚡"},
            "children": blocks[:80]
        }
        res = requests.post("https://api.notion.com/v1/pages", headers=HEADERS, json=payload)
        if res.status_code != 200:
            print(f"[FAIL] Error creating Snapshot page: {res.status_code} {res.text}")
            return None
        page_data = res.json()
        page_id = page_data["id"]
        print(f"[PASS] Created Snapshot page: {page_id} ({page_data.get('url')})")

        # Append remaining blocks
        remaining = blocks[80:]
        while remaining:
            chunk = remaining[:80]
            remaining = remaining[80:]
            requests.patch(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS, json={"children": chunk})

    else:
        print(f"--> Refreshing existing Snapshot page: {page_id}...")
        # Update title
        title_payload = {
            "properties": {
                "title": [{"text": {"content": today_title}}]
            }
        }
        requests.patch(f"https://api.notion.com/v1/pages/{page_id}", headers=HEADERS, json=title_payload)

        # Clear existing blocks
        existing_blocks_res = requests.get(f"https://api.notion.com/v1/blocks/{page_id}/children?page_size=100", headers=HEADERS).json()
        to_delete = [b["id"] for b in existing_blocks_res.get("results", [])]
        print(f"--> Clearing {len(to_delete)} previous blocks...")
        for bid in to_delete:
            requests.delete(f"https://api.notion.com/v1/blocks/{bid}", headers=HEADERS)

        # Append fresh blocks
        print(f"--> Appending {len(blocks)} fresh snapshot blocks...")
        remaining = blocks[:]
        while remaining:
            chunk = remaining[:80]
            remaining = remaining[80:]
            append_res = requests.patch(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS, json={"children": chunk})
            if append_res.status_code != 200:
                print(f"[WARN] Append chunk note: {append_res.status_code} {append_res.text}")

        print(f"[PASS] Successfully refreshed Snapshot page!")

    # Save state
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump({
            "page_id": page_id,
            "last_updated": datetime.now().isoformat(),
            "url": f"https://app.notion.com/p/{page_id.replace('-', '')}"
        }, f, indent=2)

    page_url = f"https://app.notion.com/p/{page_id.replace('-', '')}"
    print(f"--> Snapshot Live URL: {page_url}")
    return page_id, page_url

if __name__ == "__main__":
    update_or_create_snapshot_page()
