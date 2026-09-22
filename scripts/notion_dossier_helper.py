#!/usr/bin/env python3
"""
Standard Notion Research Dossier Helper & Living Credit View Engine
Supports dual-persistence for CEMBI corporate credit platform:
1. Builds Living Up-To-Date "Stock" / Credit View (Most Recent First):
   - Verdict & Stance Callout
   - Positives (Credit Strengths)
   - Negatives (Credit Risks & Subordination)
   - Background & Operational Perimeter
   - Recent Drivers & Earnings Pulse
   - Upcoming Catalysts & Refinancing Milestones
   - Management Questions & Due Diligence Queue
2. Attaches Financial Models & Embedded Interactive Sandbox Calculators
3. Chronological Historical Notes & Archived Intake Timeline:
   - Prepends new intakes in reverse chronological order
   - Explicitly demarks older intakes as archived runs
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
RESEARCH_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

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

def build_living_credit_view_blocks(credit_view):
    """
    Builds the 7 structured sections for the Living Credit View:
    1. Verdict & Desk Stance
    2. Positives (Credit Strengths)
    3. Negatives (Credit Risks)
    4. Background & Operational Perimeter
    5. Recent Drivers & Earnings Pulse
    6. Upcoming Catalysts & Refinancing Milestones
    7. Management Questions & Due Diligence Queue
    """
    blocks = []
    v = credit_view.get("verdict", {})
    pos = credit_view.get("positives", [])
    neg = credit_view.get("negatives", [])
    bg = credit_view.get("background", {})
    drivers = credit_view.get("recent_drivers", [])
    catalysts = credit_view.get("catalysts", [])
    questions = credit_view.get("management_questions", [])
    last_up = credit_view.get("last_updated", "Recent")

    # 1. Top Callout: Verdict & Stance
    stance = v.get("stance", "Neutral")
    top_texts = [
        text_obj(f"📌 UP-TO-DATE CREDIT VIEW & DESK VERDICT (Most Recent Synthesis: {last_up})\n", bold=True, color="blue"),
        text_obj("• Desk Stance: ", bold=True),
        text_obj(f"{stance}\n", bold=True, color="green" if "buy" in stance.lower() or "overweight" in stance.lower() else ("red" if "underweight" in stance.lower() or "sell" in stance.lower() else "orange")),
        text_obj("• Valuation & Pricing: ", bold=True),
        text_obj(f"Target Price: {v.get('target_price', '—')}¢ | Market Price: {v.get('current_price', '—')}¢ | YTM: {v.get('ytm', '—')}% | Spread: {v.get('spread_bp', '—')} bps\n"),
        text_obj("• Desk Executive Verdict: ", bold=True),
        text_obj(v.get("summary", "Fundamental credit thesis tracking."))
    ]
    blocks.append(callout(top_texts, emoji="📌"))

    # 2. Positives
    if pos:
        blocks.append(heading_2("🟢 Key Credit Strengths (Positives)"))
        for p in pos:
            blocks.append(bullet([text_obj(p)]))

    # 3. Negatives
    if neg:
        blocks.append(heading_2("🔴 Key Credit Vulnerabilities (Negatives)"))
        for n in neg:
            blocks.append(bullet([text_obj(n)]))

    # 4. Background
    if bg:
        blocks.append(heading_2("🏢 Background & Operational Asset Perimeter"))
        if isinstance(bg, dict):
            for k, val in bg.items():
                label = k.replace("_", " ").title()
                blocks.append(bullet([text_obj(f"{label}: ", bold=True), text_obj(val)]))
        elif isinstance(bg, list):
            for b_item in bg:
                blocks.append(bullet([text_obj(b_item)]))

    # 5. Recent Drivers
    if drivers:
        blocks.append(heading_2("⚡ Recent Drivers & Earnings Pulse"))
        for d in drivers:
            blocks.append(bullet([text_obj(d)]))

    # 6. Upcoming Catalysts
    if catalysts:
        blocks.append(heading_2("📅 Upcoming Catalysts & Key Refinancing Milestones"))
        for c in catalysts:
            if isinstance(c, dict):
                blocks.append(bullet([
                    text_obj(f"{c.get('date', 'TBD')} — {c.get('event', 'Catalyst')}: ", bold=True),
                    text_obj(c.get('impact', ''))
                ]))
            else:
                blocks.append(bullet([text_obj(str(c))]))

    # 7. Management Questions
    if questions:
        blocks.append(heading_2("❓ Management Questions & Due Diligence Queue"))
        for idx, q in enumerate(questions, 1):
            if isinstance(q, dict):
                q_text = q.get('question') or q.get('focus_area') or 'Diligence Question'
                q_blocks = [text_obj(f"{idx}. {q_text}", bold=True)]
                if q.get('relevance'):
                    q_blocks.extend([text_obj("\n   Relevance: ", bold=True), text_obj(q['relevance'])])
                if q.get('conviction_trigger'):
                    q_blocks.extend([text_obj("\n   Conviction Trigger: ", bold=True), text_obj(q['conviction_trigger'])])
                blocks.append(bullet(q_blocks))
            else:
                blocks.append(bullet([text_obj(f"{idx}. {str(q)}")]))

    blocks.append(divider())
    return blocks

def build_historical_note_blocks(historical_note):
    """
    Builds a clearly demarked archived run block for the Historical Notes Timeline.
    """
    d = historical_note.get("date", "Recent")
    title = historical_note.get("title", "Research Note")
    src = historical_note.get("source", "Desk Research")
    summary = historical_note.get("summary", "")

    header_text = [
        text_obj(f"📌 [Archived / Previous Note Run: {d}] — {title}\n", bold=True, color="blue"),
        text_obj(f"Source: {src}\n", italic=True),
        text_obj(summary)
    ]
    return [callout(header_text, emoji="📋", color="gray_background")]

def find_page_by_title_or_ticker(query_str):
    """Queries RESEARCH_DB_ID for an existing company dossier page."""
    url = f"https://api.notion.com/v1/databases/{RESEARCH_DB_ID}/query"
    has_more = True
    next_cursor = None
    q_lower = query_str.lower().strip()
    while has_more:
        body = {"page_size": 100}
        if next_cursor:
            body["start_cursor"] = next_cursor
        res = requests.post(url, headers=HEADERS, json=body).json()
        for r in res.get("results", []):
            title = ""
            if r.get("properties", {}).get("Name", {}).get("title"):
                title = r["properties"]["Name"]["title"][0]["plain_text"]
            if q_lower in title.lower():
                return r["id"]
        has_more = res.get("has_more", False)
        next_cursor = res.get("next_cursor")
    return None

def update_or_create_dossier(title, sector, country, region, rec, credit_view, historical_note=None, model_url=None, calculator_url=None, existing_page_id=None):
    """
    Living Dossier standard:
    1. If page exists:
       - Prepends/updates living credit view at the top
       - Prepends historical note to the archived timeline
    2. If page does not exist:
       - Creates page with living view + model/tool links + historical note
    """
    page_id = existing_page_id or find_page_by_title_or_ticker(title)
    
    living_blocks = build_living_credit_view_blocks(credit_view)

    if not page_id:
        print(f"--> Creating brand new Notion dossier for '{title}'...")
        all_blocks = []
        all_blocks.extend(living_blocks)

        # Attached Model & Tools
        if model_url:
            all_blocks.append(heading_1("📥 Financial Model & Recovery Workbook"))
            all_blocks.append(callout(f"Excel Model: {model_url}", emoji="📊"))
        if calculator_url:
            all_blocks.append(heading_1("⚡ Live Interactive Restructuring Sandbox"))
            all_blocks.append(callout(f"Interactive Sandbox: {calculator_url}", emoji="⚖️"))
        all_blocks.append(divider())

        # Historical timeline
        all_blocks.append(heading_1("📜 Historical Notes & Chronological Intelligence Timeline"))
        all_blocks.append(callout("🗄️ ARCHIVED INTELLIGENCE & PREVIOUS NOTE RUNS\nPreserves previous research runs, broker memos, and earlier notes in reverse chronological order.", emoji="🗄️"))
        if historical_note:
            all_blocks.extend(build_historical_note_blocks(historical_note))

        payload = {
            "parent": {"database_id": RESEARCH_DB_ID},
            "properties": {
                "Name": {"title": [{"text": {"content": title}}]},
                "Sector": {"select": {"name": sector}},
                "Country": {"select": {"name": country}},
                "Region": {"select": {"name": region}},
                "Recommendation": {"select": {"name": rec}}
            },
            "children": all_blocks[:80]
        }
        res = requests.post("https://api.notion.com/v1/pages", headers=HEADERS, json=payload)
        if res.status_code != 200:
            print(f"[FAIL] Error creating page: {res.status_code} {res.text}")
            return None
        page_id = res.json()["id"]
        print(f"[PASS] Created Notion dossier '{title}' with ID: {page_id}")

        remaining = all_blocks[80:]
        while remaining:
            chunk = remaining[:80]
            remaining = remaining[80:]
            requests.patch(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS, json={"children": chunk})
        return page_id

    else:
        print(f"--> Updating existing Notion dossier '{title}' ({page_id})...")
        # Update page properties (e.g. Recommendation)
        prop_payload = {
            "properties": {
                "Recommendation": {"select": {"name": rec}}
            }
        }
        requests.patch(f"https://api.notion.com/v1/pages/{page_id}", headers=HEADERS, json=prop_payload)

        # Get top block ID
        blocks_res = requests.get(f"https://api.notion.com/v1/blocks/{page_id}/children?page_size=10", headers=HEADERS).json()
        first_blocks = blocks_res.get("results", [])
        if first_blocks:
            top_block_id = first_blocks[0]["id"]
            # If first block is callout, update it with verdict
            top_callout = living_blocks[0]
            requests.patch(f"https://api.notion.com/v1/blocks/{top_block_id}", headers=HEADERS, json=top_callout)
            # Prepend the rest of living blocks after top block
            rest_living = living_blocks[1:]
            requests.patch(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS, json={"children": rest_living, "after": top_block_id})
            print(f"[PASS] Successfully refreshed Living Credit View at top of {title} dossier!")

        if historical_note:
            note_blocks = build_historical_note_blocks(historical_note)
            requests.patch(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS, json={"children": note_blocks})
            print(f"[PASS] Appended historical note run ({historical_note.get('date')}) to timeline!")

        return page_id

if __name__ == "__main__":
    print("Standard Notion Research Dossier Helper & Living Credit View Engine loaded successfully.")
