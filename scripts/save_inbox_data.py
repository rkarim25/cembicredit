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
INBOX_PAGE_ID = "3df1d0ad-68c6-813c-9f07-e7c847880346"

def get_children(block_id):
    results = []
    url = f"https://api.notion.com/v1/blocks/{block_id}/children?page_size=100"
    while url:
        res = requests.get(url, headers=HEADERS).json()
        results.extend(res.get("results", []))
        if res.get("has_more"):
            url = f"https://api.notion.com/v1/blocks/{block_id}/children?page_size=100&start_cursor={res['next_cursor']}"
        else:
            url = None
    return results

blocks = get_children(INBOX_PAGE_ID)

with open("inbox_parsed_data.txt", "w", encoding="utf-8") as f:
    for i, b in enumerate(blocks):
        btype = b.get("type")
        text = ""
        if btype in b and isinstance(b[btype], dict) and "rich_text" in b[btype]:
            text = "".join([t.get("plain_text", "") for t in b[btype]["rich_text"]])
        elif btype == "table":
            rows = get_children(b["id"])
            table_lines = []
            for r in rows:
                cells = []
                for c in r.get("table_row", {}).get("cells", []):
                    cells.append("".join([t.get("plain_text", "") for t in c]))
                table_lines.append(" | ".join(cells))
            text = "\n[TABLE START]\n" + "\n".join(table_lines) + "\n[TABLE END]"
        f.write(f"=== BLOCK {i} [{btype}] id={b['id']} ===\n{text}\n\n")

print("Saved inbox_parsed_data.txt successfully!")
