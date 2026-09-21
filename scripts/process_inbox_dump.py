import os
import sys
import json
import re
import datetime
import urllib.request
import subprocess

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
REPO_DB_ID = "3df1d0ad-68c6-815e-b5c2-cffb3b540b1b"
LOG_DB_ID = "f78610f2-7e60-427b-9310-b15f7dfa32fd"

def push_to_website(issuer_id, issuer_doc, news_entry=None, commit_msg=None):
    """
    Guaranteed Default Sync to CEMBI Credit Platform:
    1. Writes database/issuers/<id>.json
    2. Updates database/credit_news.json
    3. Runs build_database.py
    4. Commits and pushes to GitHub
    """
    print(f"--> [Website Auto-Sync] Persisting issuer {issuer_id} to website database...")
    target_json = os.path.join(ISSUERS_DIR, f"{issuer_id}.json")
    with open(target_json, "w", encoding="utf-8") as f:
        json.dump(issuer_doc, f, indent=2, ensure_ascii=False)
    print(f"Saved {target_json}")

    if news_entry:
        print(f"--> [Website Auto-Sync] Appending credit news headline...")
        if os.path.exists(NEWS_FILE):
            with open(NEWS_FILE, "r", encoding="utf-8") as f:
                news = json.load(f)
        else:
            news = []
        
        # Avoid duplicate IDs
        news = [n for n in news if n.get("id") != news_entry.get("id")]
        news.insert(0, news_entry)
        with open(NEWS_FILE, "w", encoding="utf-8") as f:
            json.dump(news, f, indent=2, ensure_ascii=False)

    # Compile database and web assets
    print("--> [Website Auto-Sync] Compiling SQLite and web bundles...")
    subprocess.run([sys.executable, BUILD_SCRIPT], check=True)

    # Git commit & push
    try:
        print("--> [Website Auto-Sync] Staging and committing to git...")
        subprocess.run(["git", "add", "database/", "js/issuers_data.js"], cwd=ROOT, check=True)
        msg = commit_msg or f"Auto-Sync research dump: update {issuer_id} model & news"
        subprocess.run(["git", "commit", "-m", msg], cwd=ROOT, check=True)
        print("--> [Website Auto-Sync] Pushing live to GitHub Pages...")
        subprocess.run(["git", "push", "origin", "main"], cwd=ROOT, check=True)
        print("--> [Website Auto-Sync] Successfully published to https://rkarim25.github.io/cembicredit/")
    except Exception as e:
        print(f"Note: Git push step encountered: {e}")

if __name__ == "__main__":
    print("Inbox dump processor module loaded. Website auto-sync is ENABLED by default.")
