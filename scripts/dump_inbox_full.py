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
print(f"Total blocks: {len(blocks)}")
for i, b in enumerate(blocks):
    btype = b.get("type")
    text = ""
    checked = ""
    if btype in b and isinstance(b[btype], dict) and "rich_text" in b[btype]:
        text = "".join([t.get("plain_text", "") for t in b[btype]["rich_text"]])
    elif btype == "child_page":
        text = b["child_page"].get("title", "")
    elif btype == "child_database":
        text = b["child_database"].get("title", "")
    elif btype == "table":
        # fetch table rows
        rows = get_children(b["id"])
        row_strs = []
        for r in rows:
            cells = []
            for c in r.get("table_row", {}).get("cells", []):
                cells.append("".join([t.get("plain_text", "") for t in c]))
            row_strs.append(" | ".join(cells))
        text = "TABLE: " + " /// ".join(row_strs)
    if btype == "to_do":
        checked = f"[checked={b['to_do'].get('checked', False)}] "
    print(f"[{i:03d}] {btype:18s} {checked}{text[:140]}")
