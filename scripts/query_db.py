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
DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"

res = requests.post(f"https://api.notion.com/v1/databases/{DB_ID}/query", headers=HEADERS, json={"page_size": 100}).json()
results = res.get("results", [])
print(f"Total pages in Research DB: {len(results)}")
for p in results:
    props = p.get("properties", {})
    name = ""
    for k, v in props.items():
        if v.get("type") == "title":
            name = "".join([t.get("plain_text", "") for t in v.get("title", [])])
    print(f"id={p['id']} name={name}")
