#!/usr/bin/env python3
"""
Master Note Generator and Notion Sync Script
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
}

def text_obj(content, bold=False, italic=False, color="default"):
    # Truncate content to 2000 chars (Notion limit per text block)
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
    for i in range(0, len(blocks), 90):
        chunk = blocks[i:i+90]
        url = f"https://api.notion.com/v1/blocks/{block_id}/children"
        res = requests.patch(url, headers=HEADERS, json={"children": chunk})
        if res.status_code != 200:
            print(f"Error appending blocks to {block_id}: {res.status_code} - {res.text[:200]}")
        else:
            time.sleep(0.35)

def create_company_page(name, ticker, country, sector):
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
        return page_id
    else:
        print(f"Failed to create Notion page for {name}: {res.status_code} - {res.text[:200]}")
        return None

print("Notion helper setup ready.")
