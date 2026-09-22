import os
import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY")
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}
RESEARCH_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

def text_p(txt):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {"rich_text": [{"type": "text", "text": {"content": txt}}]}
    }

def heading_2(txt):
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {"rich_text": [{"type": "text", "text": {"content": txt}}]}
    }

def heading_3(txt):
    return {
        "object": "block",
        "type": "heading_3",
        "heading_3": {"rich_text": [{"type": "text", "text": {"content": txt}}]}
    }

def callout(txt, emoji="📌"):
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "icon": {"type": "emoji", "emoji": emoji},
            "rich_text": [{"type": "text", "text": {"content": txt}}]
        }
    }

def bullet(txt):
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": txt}}]}
    }

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
    # header row
    h_cells = [[{"type": "text", "text": {"content": str(h)}}] for h in headers]
    table_block["table"]["children"].append({
        "type": "table_row",
        "table_row": {"cells": h_cells}
    })
    for r in rows:
        r_cells = [[{"type": "text", "text": {"content": str(c)}}] for c in r]
        table_block["table"]["children"].append({
            "type": "table_row",
            "table_row": {"cells": r_cells}
        })
    return table_block

def create_notion_dossier(title, sector, country, region, rec, blocks):
    payload = {
        "parent": {"database_id": RESEARCH_DB_ID},
        "properties": {
            "Name": {"title": [{"text": {"content": title}}]},
            "Sector": {"select": {"name": sector}},
            "Country": {"select": {"name": country}},
            "Region": {"select": {"name": region}},
            "Recommendation": {"select": {"name": rec}}
        },
        "children": blocks[:80]
    }
    res = requests.post("https://api.notion.com/v1/pages", headers=HEADERS, json=payload)
    if res.status_code != 200:
        print(f"Error creating page {title}: {res.status_code} {res.text}")
        return None
    page_data = res.json()
    page_id = page_data["id"]
    print(f"Created Notion page '{title}' with ID: {page_id}")
    
    # Append remaining blocks in chunks of 80
    remaining = blocks[80:]
    while remaining:
        chunk = remaining[:80]
        remaining = remaining[80:]
        append_res = requests.patch(
            f"https://api.notion.com/v1/blocks/{page_id}/children",
            headers=HEADERS,
            json={"children": chunk}
        )
        if append_res.status_code != 200:
            print(f"Error appending blocks: {append_res.status_code} {append_res.text}")
        else:
            print(f"Appended {len(chunk)} blocks to {page_id}")
            
    return page_id

print("Dossier creation helper loaded successfully.")
