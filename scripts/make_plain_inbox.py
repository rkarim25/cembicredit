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
SUMMARY_PAGE_URL = "https://app.notion.com/p/Processed-Research-Summaries-Receipts-3e31d0ad68c68187998af440604c1a21"

def make_plain_inbox():
    print(f"--> Fetching all blocks on Inbox page {INBOX_PAGE_ID}...")
    url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100"
    all_blocks = []
    while url:
        res = requests.get(url, headers=HEADERS).json()
        all_blocks.extend(res.get("results", []))
        if res.get("has_more"):
            url = f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children?page_size=100&start_cursor={res['next_cursor']}"
        else:
            url = None

    print(f"Found {len(all_blocks)} blocks on Inbox page. Deleting all clutter...")
    for b in all_blocks:
        del_res = requests.delete(f"https://api.notion.com/v1/blocks/{b['id']}", headers=HEADERS)
        if del_res.status_code == 200:
            print(f"Deleted block {b['id']} ({b.get('type')})")

    print("--> Setting up ultra-clean, plain Inbox drop zone...")
    clean_blocks = [
        {
            "type": "callout",
            "callout": {
                "icon": {"type": "emoji", "emoji": "📥"},
                "rich_text": [
                    {
                        "type": "text",
                        "text": {"content": "PLAIN DATA DUMP ZONE\n"},
                        "annotations": {"bold": True}
                    },
                    {
                        "type": "text",
                        "text": {"content": "Dump any raw text, broker reports, earnings bullets, or transcripts here. Anything pasted below will be processed into the website database and whisked away to: "}
                    },
                    {
                        "type": "text",
                        "text": {
                            "content": "📋 Processed Research Summaries & Receipts ↗",
                            "link": {"url": SUMMARY_PAGE_URL}
                        },
                        "annotations": {"bold": True, "color": "blue"}
                    }
                ]
            }
        },
        {"type": "divider", "divider": {}},
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

    res_add = requests.patch(f"https://api.notion.com/v1/blocks/{INBOX_PAGE_ID}/children", headers=HEADERS, json={"children": clean_blocks})
    if res_add.status_code == 200:
        print("[PASS] Inbox is now a completely plain, frictionless drop zone!")
    else:
        print(f"[FAIL] Failed to setup plain inbox: {res_add.status_code} {res_add.text}")

if __name__ == "__main__":
    make_plain_inbox()
