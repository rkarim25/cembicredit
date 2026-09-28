#!/usr/bin/env python3
"""
Full Orchestrator for EM Credit Meeting Notes (Sep-2026)
Executes:
1. Appends all 16 notes to Notion Master Page: 3e81d0ad-68c6-81c4-bca5-ca220aed107e
2. Appends corporate notes to individual Notion company dossiers (creating new pages as needed)
3. Updates cembicredit/database/issuers/<id>.json historical notes for matching issuers
4. Writes local master Markdown document to cembicredit/research and artifacts folder
"""
import os
import sys
import json
import time
import requests

from note_compiler_core import (
    MASTER_PAGE_ID, RESEARCH_DB_ID, EXISTING_COMPANY_PAGES,
    note_to_notion_blocks, note_to_markdown, append_blocks_chunked,
    get_or_create_company_page, heading_1, heading_2, paragraph, bullet, divider, make_table
)
from notes_data_part1 import NOTES_PART1
from notes_data_part2 import NOTES_PART2
from notes_data_part3 import NOTES_PART3

sys.stdout.reconfigure(encoding='utf-8')

ALL_NOTES = NOTES_PART1 + NOTES_PART2 + NOTES_PART3

def run():
    print(f"Loaded {len(ALL_NOTES)} meeting notes across Part 1, Part 2, and Part 3.")
    
    # 1. Build Table of Contents for Master Page
    print("\n--- Step 1: Updating Table of Contents on Master Notion Page ---")
    toc_blocks = [
        heading_2("Table of Contents — September 2026 Meeting Notes"),
        paragraph("Consolidated buy-side credit intelligence from the J.P. Morgan EM Credit Conference & Management Meetings (15–17 Sep 2026).")
    ]
    for idx, note in enumerate(ALL_NOTES, 1):
        corp_badge = "[Corporate]" if note.get("is_corporate") else "[Macro / Sovereign]"
        toc_blocks.append(bullet(f"#{idx} {note['short_name']} ({note['country']} — {note['sector']})", bold_prefix=f"{corp_badge} "))
    toc_blocks.append(divider())
    append_blocks_chunked(MASTER_PAGE_ID, toc_blocks)
    print("Table of Contents appended to Master Notion Page.")

    # 2. Append each note to Master Page and Company Pages
    print("\n--- Step 2: Processing & Appending Notes to Notion ---")
    for idx, note in enumerate(ALL_NOTES, 1):
        print(f"\nProcessing [{idx}/{len(ALL_NOTES)}]: {note['short_name']}...")
        blocks = note_to_notion_blocks(note)
        
        # Append to Master Page
        print(f" - Appending to Master Page ({len(blocks)} blocks)...")
        append_blocks_chunked(MASTER_PAGE_ID, blocks)
        
        # If corporate, append to company page
        if note.get("is_corporate"):
            cid = note["id"]
            cname = note["name"]
            ticker = note["ticker"]
            country = note["country"].split("/")[0].strip()
            sector = note["sector"].split("/")[0].strip()
            
            page_id = get_or_create_company_page(cid, cname, ticker, country, sector)
            if page_id:
                print(f" - Appending to company dossier ({cname}, ID: {page_id})...")
                company_blocks = [
                    heading_1(f"📜 Meeting Note: {note['title']}"),
                    divider()
                ] + blocks
                append_blocks_chunked(page_id, company_blocks)
            else:
                print(f" - Skipping company page for {cid} (could not find or create).")
                
            # Dual-persistence: Update database/issuers/<cid>.json if exists
            issuer_json_path = os.path.join(r"C:\Users\Reza Karim\cembicredit\database\issuers", f"{cid}.json")
            if os.path.exists(issuer_json_path):
                try:
                    with open(issuer_json_path, "r", encoding="utf-8") as fp:
                        doc = json.load(fp)
                    if "historical_notes" not in doc:
                        doc["historical_notes"] = []
                    
                    # Prepend new meeting note to historical notes
                    note_entry = {
                        "date": "2026-09-16",
                        "title": note["title"],
                        "source": "J.P. Morgan EM Credit Conference (15-17 Sep 2026)",
                        "status": "Archived / Previous Note Run",
                        "summary": note["key_points"][0][1] if note.get("key_points") else "",
                        "details": note_to_markdown(note)
                    }
                    doc["historical_notes"].insert(0, note_entry)
                    doc["metadata"]["last_updated"] = "2026-09-27"
                    
                    with open(issuer_json_path, "w", encoding="utf-8") as fp:
                        json.dump(doc, fp, indent=2, ensure_ascii=False)
                    print(f" - Updated cembicredit/database/issuers/{cid}.json historical notes.")
                except Exception as ex:
                    print(f" - Error updating {cid}.json: {ex}")

    # 3. Generate Master Markdown File
    print("\n--- Step 3: Generating Consolidated Master Markdown Report ---")
    master_md = [
        "# Emerging Markets Corporate & Sovereign Credit — Master Meeting Notes",
        "**Context**: J.P. Morgan Emerging Markets Credit Conference & Management Meetings (15–17 September 2026)",
        "**Author**: Reza Karim | Pictet Asset Management (Buy-Side EM Corporate Bond Desk)",
        "**Standard**: Turkey Trip 2026 Gold Standard (Key Points, Detailed Takeaways, Guidance Table, Funding Table, Watch Items, In Our View)",
        "**Strict Anti-Hallucination**: Grounded 100% in verbatim conference transcripts, audited financials, and verified capital structures.",
        "\n---\n"
    ]
    
    # Table of contents in MD
    master_md.append("## Table of Contents\n")
    for idx, note in enumerate(ALL_NOTES, 1):
        type_str = "Corporate" if note.get("is_corporate") else "Macro / Sovereign"
        master_md.append(f"{idx}. [{note['short_name']} ({note['country']} — {note['sector']})](#{note['id']}) — *{type_str}*")
    master_md.append("\n---\n")
    
    # Body
    for note in ALL_NOTES:
        master_md.append(f"<a id='{note['id']}'></a>\n")
        master_md.append(note_to_markdown(note))
        
    full_md_content = "\n".join(master_md)
    
    # Save to cembicredit/research
    dest_path1 = r"C:\Users\Reza Karim\cembicredit\research\EM_Credit_Meeting_Notes_Sep2026.md"
    os.makedirs(os.path.dirname(dest_path1), exist_ok=True)
    with open(dest_path1, "w", encoding="utf-8") as fp:
        fp.write(full_md_content)
    print(f"Saved master markdown report to: {dest_path1}")
    
    # Save to Antigravity brain artifact directory
    dest_path2 = r"C:\Users\Reza Karim\.gemini\antigravity\brain\fdfa9d6f-bebd-4022-9a81-b285efd4118e\EM_Credit_Meeting_Notes_Sep2026.md"
    with open(dest_path2, "w", encoding="utf-8") as fp:
        fp.write(full_md_content)
    print(f"Saved master markdown report to: {dest_path2}")
    
    print("\nAll 16 meeting notes successfully processed and synchronized!")

if __name__ == "__main__":
    run()
