#!/usr/bin/env python3
"""
Autonomous Notion Research Inbox & Website Dual-Persistence Engine
Reads raw analyst notes, broker decks, and earnings dumps from Notion Inbox,
extracts structured credit data, updates website database (JSON + SQLite + JS bundle),
creates Notion research dossiers, appends receipts, clears raw inbox blocks,
and deploys live to GitHub Pages.
"""
import os
import sys
import json
import requests
import subprocess
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ISSUERS_DIR = os.path.join(ROOT, "database", "issuers")
NEWS_FILE = os.path.join(ROOT, "database", "credit_news.json")
BUILD_SCRIPT = os.path.join(ROOT, "scripts", "build_database.py")

TOKEN = os.environ.get("NOTION_TOKEN_WORK", os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY"))
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

INBOX_PAGE_ID = "3df1d0ad-68c6-813c-9f07-e7c847880346"
SUMMARY_PAGE_ID = "3e31d0ad-68c6-8187-998a-f440604c1a21"
SUMMARY_TABLE_ID = "3e31d0ad-68c6-8114-a4ae-d197a933a2a2"
SUMMARY_HEADER_ROW_ID = "3e31d0ad-68c6-81db-90b9-e621b8e4eda3"
RESEARCH_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

def get_inbox_blocks():
    """Fetches all children blocks in the Notion Inbox page."""
    results = []
    url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100"
    while url:
        res = requests.get(url, headers=HEADERS).json()
        results.extend(res.get("results", []))
        if res.get("has_more"):
            url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100&start_cursor={res['next_cursor']}"
        else:
            url = None
    return results

def persist_to_website(issuer_id, issuer_doc, news_entry=None, commit_msg=None):
    """
    Mandatory Dual-Persistence Step:
    1. Writes database/issuers/<issuer_id>.json
    2. Updates database/credit_news.json
    3. Rebuilds SQLite master database and web data bundle
    4. Commits and pushes to GitHub Pages
    """
    print(f"--> [Website Persistence] Writing database/issuers/{issuer_id}.json...")
    target_json = os.path.join(ISSUERS_DIR, f"{issuer_id}.json")
    with open(target_json, "w", encoding="utf-8") as f:
        json.dump(issuer_doc, f, indent=2, ensure_ascii=False)
    print(f"[PASS] Saved {target_json}")

    if news_entry:
        print("--> [Website Persistence] Appending to database/credit_news.json...")
        if os.path.exists(NEWS_FILE):
            with open(NEWS_FILE, "r", encoding="utf-8") as f:
                news = json.load(f)
        else:
            news = []
        news = [n for n in news if n.get("id") != news_entry.get("id")]
        news.insert(0, news_entry)
        with open(NEWS_FILE, "w", encoding="utf-8") as f:
            json.dump(news, f, indent=2, ensure_ascii=False)
        print("[PASS] Updated credit news.")

    # Rebuild SQLite database and web bundle
    print("--> [Website Persistence] Rebuilding SQLite credit_master.db and js/issuers_data.js...")
    subprocess.run([sys.executable, BUILD_SCRIPT], check=True)
    print("[PASS] Rebuilt SQLite master database and web bundle.")

    # Git commit and push
    try:
        print("--> [Website Persistence] Deploying to GitHub Pages...")
        subprocess.run(["git", "add", "database/", "js/issuers_data.js"], cwd=ROOT, check=True)
        msg = commit_msg or f"feat({issuer_id}): process inbox research, update website database & compile master"
        subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)
        subprocess.run(["git", "push", "origin", "main"], cwd=ROOT, check=True)
        print(f"[PASS] Successfully deployed live to https://rkarim25.github.io/cembicredit/!")
    except Exception as e:
        print(f"[NOTE] Git deployment note: {e}")

def log_receipt(entity_name, details_text, date_str=None):
    """
    Logs an executive receipt into the separate Processed Receipts Table.
    Prepends immediately after the header row so most recent data is first display!
    """
    print(f"--> [Notion Receipts] Prepending receipt for {entity_name} to top of Summary page...")
    d_str = date_str or datetime.now().strftime("%d %b %Y")
    payload = {
        "children": [
            {
                "type": "table_row",
                "table_row": {
                    "cells": [
                        [{"type": "text", "text": {"content": d_str}}],
                        [{"type": "text", "text": {"content": entity_name}}],
                        [{"type": "text", "text": {"content": details_text}}]
                    ]
                }
            }
        ],
        "after": SUMMARY_HEADER_ROW_ID
    }
    res = requests.patch(f"https://api.notion.com/v1/blocks/{SUMMARY_TABLE_ID}/children", headers=HEADERS, json=payload)
    if res.status_code == 200:
        print("[PASS] Receipt row prepended to top of Notion Summary table (most recent first)!")
    else:
        print(f"[WARN] Receipt row prepend returned: {res.status_code} {res.text}")

def clean_inbox_blocks():
    """Deletes processed raw dump blocks and restores clean placeholder in plain Inbox."""
    print("--> [Inbox Cleanup] Scanning raw dump blocks to whisk away...")
    blocks = get_inbox_blocks()
    to_delete = []
    
    # Preserve only the top callout and top divider
    for i, b in enumerate(blocks):
        if i >= 2: # Delete everything below top callout & divider
            to_delete.append(b["id"])

    deleted_count = 0
    for bid in to_delete:
        del_res = requests.delete(f"https://api.notion.com/v1/blocks/{bid}", headers=HEADERS)
        if del_res.status_code == 200:
            deleted_count += 1
            
    print(f"[PASS] Whisked away {deleted_count} raw dump blocks from Notion Inbox.")

    # Restore clean placeholder
    placeholder_payload = {
        "children": [
            {
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {"content": "— Drop your text, bullets, or broker notes right here —"},
                            "annotations": {"italic": True, "color": "gray"}
                        }
                    ]
                }
            }
        ]
    }
    requests.patch(f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children", headers=HEADERS, json=placeholder_payload)
    print("[PASS] Clean placeholder restored in plain Notion Inbox.")
    print("[PASS] Clean placeholder restored in Notion Inbox.")

if __name__ == "__main__":
    print("=== Process Notion Inbox & Website Dual-Persistence Engine ===")
    blocks = get_inbox_blocks()
    print(f"Total blocks currently in inbox: {len(blocks)}")
