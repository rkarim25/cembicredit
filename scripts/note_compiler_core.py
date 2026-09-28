#!/usr/bin/env python3
"""
Full Master Note Generator and Notion Sync Script
Compiles all 16 meeting notes from September 2026 Otter transcripts into:
1. Master Notion Page: 3e81d0ad-68c6-81c4-bca5-ca220aed107e (Meeting Notes)
2. Individual Notion Company Dossiers (Research DB: 3df1d0ad-68c6-815e-b5c2-cffb3b540b1b)
3. Local Master Markdown Report in cembicredit/research and artifacts directory.
Strictly adheres to Turkey Master Note standard:
- Key Points (bullets)
- Detailed Takeaways (bold lead sentence per theme)
- Guidance Table (2-column)
- Funding & Issuance Table (2-column)
- Watch Items
- In our view
Zero hallucination: ground strictly in transcript statements and audited accounts.
"""
import os
import sys
import json
import time
import requests

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get("NOTION_TOKEN_WORK", os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY"))
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

MASTER_PAGE_ID = "3e81d0ad-68c6-81c4-bca5-ca220aed107e"
RESEARCH_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

EXISTING_COMPANY_PAGES = {
    "africell": "3df1d0ad-68c6-811b-a825-cb8d9a616ac8",
    "metinvest": "3df1d0ad-68c6-81ff-8aef-f3d6ff934b3c",
    "arada": "3e01d0ad-68c6-819c-9db2-e3117db89214",
    "ittihad": "3e01d0ad-68c6-8113-b910-f37ad6862335",
    "liqtel": "3df1d0ad-68c6-8106-a069-d7d8c091ffa8",
    "limak_ren": "3df1d0ad-68c6-8159-bc09-d6b94337462d",
    "wesoda": "3e81d0ad-68c6-8124-b897-e7f40fe2a2fd",
    "first_quantum": "3e81d0ad-68c6-8131-bd85-dc2b6705c3ea",
    "sibanye": "3e81d0ad-68c6-812c-8773-d4d4c1c63b3a",
    "endeavour_mining": "3e81d0ad-68c6-8143-9022-fa4c5d31497a",
    "omniyat": "3e81d0ad-68c6-8146-a27e-e9d3687b7935",
    "mota_engil_africa": "3e81d0ad-68c6-81da-8aea-efd7f6668256",
}

def text_obj(content, bold=False, italic=False, color="default"):
    return {
        "type": "text",
        "text": {"content": str(content)[:1990]},
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
    return {"object": "block", "type": "heading_1", "heading_1": {"rich_text": [text_obj(txt, bold=True)]}}

def heading_2(txt):
    return {"object": "block", "type": "heading_2", "heading_2": {"rich_text": [text_obj(txt, bold=True)]}}

def heading_3(txt):
    return {"object": "block", "type": "heading_3", "heading_3": {"rich_text": [text_obj(txt, bold=True)]}}

def paragraph(txt, bold_prefix=None):
    rich_texts = []
    if bold_prefix:
        rich_texts.append(text_obj(bold_prefix, bold=True))
    rich_texts.append(text_obj(txt))
    return {"object": "block", "type": "paragraph", "paragraph": {"rich_text": rich_texts}}

def bullet(txt, bold_prefix=None):
    rich_texts = []
    if bold_prefix:
        rich_texts.append(text_obj(bold_prefix, bold=True))
    rich_texts.append(text_obj(txt))
    return {"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": rich_texts}}

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

def append_blocks_chunked(block_id, blocks):
    for i in range(0, len(blocks), 80):
        chunk = blocks[i:i+80]
        url = f"https://api.notion.com/v1/blocks/{block_id}/children"
        res = requests.patch(url, headers=HEADERS, json={"children": chunk})
        if res.status_code != 200:
            print(f"Error appending blocks to {block_id}: {res.status_code} - {res.text[:200]}")
        else:
            time.sleep(0.35)

def get_or_create_company_page(issuer_id, name, ticker, country, sector):
    if issuer_id in EXISTING_COMPANY_PAGES:
        return EXISTING_COMPANY_PAGES[issuer_id]
    
    url = "https://api.notion.com/v1/pages"
    body = {
        "parent": {"database_id": RESEARCH_DB_ID},
        "icon": {"type": "emoji", "emoji": "🏢"},
        "properties": {
            "Name": {"title": [{"text": {"content": f"{name} ({ticker}) — Credit Assessment & Model"}}]},
            "Ticker": {"rich_text": [{"text": {"content": ticker}}]},
            "Country": {"select": {"name": country}},
            "Sector": {"select": {"name": sector}},
            "Tier": {"select": {"name": "HY"}},
            "Status": {"select": {"name": "Under Review"}}
        }
    }
    res = requests.post(url, headers=HEADERS, json=body)
    if res.status_code == 200:
        page_id = res.json()["id"]
        print(f"Created Notion page for {name}: {page_id}")
        EXISTING_COMPANY_PAGES[issuer_id] = page_id
        return page_id
    else:
        print(f"Failed to create Notion page for {name}: {res.status_code} - {res.text[:200]}")
        return None

def note_to_notion_blocks(note_data):
    blocks = []
    # Title & Metadata
    blocks.append(heading_1(note_data["title"]))
    blocks.append(paragraph(note_data["metadata"], bold_prefix="Metadata: "))
    
    # Key Points
    blocks.append(heading_2("Key Points"))
    for kp in note_data["key_points"]:
        blocks.append(bullet(kp[1], bold_prefix=kp[0] + ": "))
        
    # Takeaways
    blocks.append(heading_2("Takeaways"))
    for t in note_data["takeaways"]:
        blocks.append(paragraph(t[1], bold_prefix=t[0] + " "))
        
    # Guidance Table (Strict 2-column table)
    guidance_headers = note_data.get("guidance_headers", ["Metric", "Guidance / Desk Assessment"])
    blocks.append(heading_2(f"Guidance — {note_data['short_name']}"))
    blocks.append(make_table(guidance_headers, note_data["guidance_table"]))
    
    # Funding & Issuance Table (Strict 2-column table)
    funding_headers = note_data.get("funding_headers", ["Item", "Detail"])
    blocks.append(heading_2("Funding & Issuance"))
    blocks.append(make_table(funding_headers, note_data["funding_table"]))
    
    # Watch Items
    blocks.append(heading_2("Watch Items"))
    for wi in note_data["watch_items"]:
        blocks.append(bullet(wi))
        
    # In Our View
    blocks.append(heading_2("In Our View"))
    for p in note_data["in_our_view"]:
        blocks.append(paragraph(p))
        
    blocks.append(divider())
    return blocks

def note_to_markdown(note_data):
    md = []
    md.append(f"# {note_data['title']}\n")
    md.append(f"**Metadata**: {note_data['metadata']}\n")
    md.append("---\n")
    md.append("### Key Points\n")
    for kp in note_data["key_points"]:
        md.append(f"* **{kp[0]}**: {kp[1]}")
    md.append("\n### Takeaways\n")
    for t in note_data["takeaways"]:
        md.append(f"**{t[0]}**  \n{t[1]}\n")
        
    guidance_headers = note_data.get("guidance_headers", ["Metric", "Guidance / Desk Assessment"])
    md.append(f"\n### Guidance — {note_data['short_name']}\n")
    md.append("| " + " | ".join(guidance_headers) + " |")
    md.append("| " + " | ".join([":---"] * len(guidance_headers)) + " |")
    for row in note_data["guidance_table"]:
        row_str = [f"**{row[0]}**"] + [str(c).replace("\n", " ") for c in row[1:]]
        md.append("| " + " | ".join(row_str) + " |")
        
    funding_headers = note_data.get("funding_headers", ["Item", "Detail"])
    md.append("\n### Funding & Issuance\n")
    md.append("| " + " | ".join(funding_headers) + " |")
    md.append("| " + " | ".join([":---"] * len(funding_headers)) + " |")
    for row in note_data["funding_table"]:
        row_str = [f"**{row[0]}**"] + [str(c).replace("\n", " ") for c in row[1:]]
        md.append("| " + " | ".join(row_str) + " |")
        
    md.append("\n### Watch Items\n")
    for wi in note_data["watch_items"]:
        md.append(f"* {wi}")
    md.append("\n### In Our View\n")
    for p in note_data["in_our_view"]:
        md.append(f"{p}\n")
    md.append("\n---\n")
    return "\n".join(md)

def create_note_subpage(parent_page_id, note_data):
    """
    Creates a dedicated subpage (child page) in Notion under parent_page_id for a meeting note.
    Returns the created subpage ID.
    """
    url = "https://api.notion.com/v1/pages"
    icon_emoji = "🏢" if note_data.get("is_corporate") else ("🏛️" if "sovereign" in note_data["id"] or "election" in note_data["id"] else "⚡")
    meeting_date = note_data.get("date", "Sep-2026")
    subpage_title = f"[{meeting_date}] {note_data['short_name']} ({note_data['ticker']}) — {note_data['title'].split('—')[-1].strip()}"
    
    blocks = note_to_notion_blocks(note_data)
    
    body = {
        "parent": {"page_id": parent_page_id},
        "icon": {"type": "emoji", "emoji": icon_emoji},
        "properties": {
            "title": [{"text": {"content": subpage_title}}]
        },
        "children": blocks[:95]
    }
    
    res = requests.post(url, headers=HEADERS, json=body)
    if res.status_code == 200:
        page_id = res.json()["id"]
        print(f"Created subpage: {subpage_title} -> {page_id}")
        if len(blocks) > 95:
            append_blocks_chunked(page_id, blocks[95:])
        return page_id
    else:
        print(f"Failed to create subpage for {note_data['short_name']}: {res.status_code} - {res.text[:250]}")
        return None
