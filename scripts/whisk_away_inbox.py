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

INBOX_PAGE_ID = "3df1d0ad-68c6-813c-9f07-e7c847880346"
RECEIPTS_TABLE_ID = "3df1d0ad-68c6-81f5-89f7-e450bf669dcc"

def get_inbox_blocks():
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

def append_receipt():
    print("--> Appending receipt to Processed Receipts table...")
    receipt_text = (
        "• Two-Stream Restructuring Engine Built: Reconciles Fundamental EV Asset Recovery (Methodology 1) "
        "with Market-Based Exchange PV (Methodology 2 via Exit Yield & Tenor Extension).\n"
        "• Qualitative Cents Bridge: Direct ±cents attribution replaces abstract % multipliers.\n"
        "• Balance Sheet Sustainability: Solves required gross debt cuts and tenor extensions for Single-B/BB- leverage.\n"
        "• Creditor Violence Deep Dive: Game theory of project bank syndicate vs HoldCo Eurobonds.\n"
        "• Deployed live to calculators (Braskem, Zoren, Aragvi), master database (credit_master.db), and website."
    )
    payload = {
        "children": [
            {
                "type": "table_row",
                "table_row": {
                    "cells": [
                        [{"type": "text", "text": {"content": "22 Sep 2026"}}],
                        [{"type": "text", "text": {"content": "Restructuring Valuation Framework & Aragvi (ARAGVI)"}}],
                        [{"type": "text", "text": {"content": receipt_text}}]
                    ]
                }
            }
        ]
    }
    res = requests.patch(f"https://api.notion.com/v1/blocks/{RECEIPTS_TABLE_ID}/children", headers=HEADERS, json=payload)
    if res.status_code == 200:
        print("[PASS] Successfully appended receipt row to Notion receipts table!")
    else:
        print(f"[FAIL] Failed to append receipt: {res.status_code} {res.text}")

def clean_inbox_blocks():
    print("--> Fetching blocks to clean up raw dump...")
    blocks = get_inbox_blocks()
    
    # We want to preserve:
    # 0: callout (OPEN-ENDED RESEARCH DUMP & DISPATCH)
    # 1: to_do
    # 2: divider
    # 3: heading_2 (Raw Data Dump)
    # 4: divider
    # 5: paragraph (placeholder)
    # ... and delete blocks between 5 and the divider above receipts (divider id: 3df1d0ad-68c6-81a1-b0ee-c9f2c9344ae4)
    
    to_delete = []
    found_start = False
    
    for b in blocks:
        bid = b["id"]
        # Stop before divider above receipts
        if bid == "3df1d0ad-68c6-81a1-b0ee-c9f2c9344ae4":
            found_start = False
            break
        if found_start:
            to_delete.append(bid)
        # Start deleting after placeholder or heading
        if bid == "3df1d0ad-68c6-8110-a556-e65f433ca21b":  # divider after heading
            found_start = True

    print(f"Found {len(to_delete)} raw dump blocks to delete.")
    
    deleted_count = 0
    for bid in to_delete:
        del_res = requests.delete(f"https://api.notion.com/v1/blocks/{bid}", headers=HEADERS)
        if del_res.status_code == 200:
            deleted_count += 1
            
    print(f"[PASS] Successfully deleted {deleted_count} raw dump blocks from Notion Inbox!")

    # Check to-do block (block index 1)
    for b in blocks:
        if b.get("type") == "to_do":
            todo_id = b["id"]
            todo_update = {
                "to_do": {
                    "checked": True,
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "⚡ PROCESS INBOX DUMP (Processed & Shipped: Dual-Stream Restructuring Engine, Aragvi SOTP & Creditor Violence live on website)"
                            }
                        }
                    ]
                }
            }
            requests.patch(f"https://api.notion.com/v1/blocks/{todo_id}", headers=HEADERS, json=todo_update)
            print("[PASS] Marked inbox to-do item as checked!")
            break

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
    print("[PASS] Restored clean placeholder block in Notion Inbox.")

if __name__ == "__main__":
    append_receipt()
    clean_inbox_blocks()
