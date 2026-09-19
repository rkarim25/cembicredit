#!/usr/bin/env python3
"""
CEMBI Credit Notion Synchronization Engine
Synchronizes local issuer records and download file blocks with Notion Research DB.
"""
import os
import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

NOTION_TOKEN = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
DB_JSON_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "database", "issuers")

headers = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

def sync_all():
    files = [f for f in os.listdir(DB_JSON_DIR) if f.endswith(".json")]
    print(f"Syncing {len(files)} issuers to Notion Research Database...")
    
    synced = 0
    for f in files:
        with open(os.path.join(DB_JSON_DIR, f), "r", encoding="utf-8") as fp:
            doc = json.load(fp)
            meta = doc["metadata"]
            notion_id = meta.get("notion_id")
            if not notion_id: continue
            
            # Update properties
            url = f"https://api.notion.com/v1/pages/{notion_id}"
            props = {
                "Benchmark": {"rich_text": [{"text": {"content": meta["benchmark_bond"]}}]},
                "Price": {"number": meta["price"]},
                "YTM": {"number": meta["ytm"]},
                "Spread": {"number": meta["spread_bp"]}
            }
            res = requests.patch(url, headers=headers, json={"properties": props})
            if res.status_code == 200:
                synced += 1
            else:
                print(f"Failed to sync {meta['name']}: {res.status_code}")
                
    print(f"Successfully synchronized {synced} dossiers in Notion!")

if __name__ == "__main__":
    sync_all()
