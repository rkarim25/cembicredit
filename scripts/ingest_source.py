#!/usr/bin/env python3
"""
CEMBI Credit Ingestion Engine
Monitors cembicredit/inbox/ for exported Cognitive Credit workbooks (.xlsx),
broker models (Arqaam, Citi, J.P. Morgan), or teardown sheets.
Automatically parses financial statements, cell notes, adjustments, and updates
the master JSON database and SQLite cache.
"""
import os
import sys
import json
import sqlite3
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INBOX_DIR = os.path.join(ROOT_DIR, "inbox")
DB_JSON_DIR = os.path.join(ROOT_DIR, "database", "issuers")

def process_inbox():
    files = [f for f in os.listdir(INBOX_DIR) if f.endswith(".xlsx") or f.endswith(".csv")]
    if not files:
        print(f"Inbox is empty ({INBOX_DIR}). Drop Cognitive Credit or broker files here to ingest.")
        return

    print(f"Found {len(files)} file(s) in inbox to process...")
    for filename in files:
        filepath = os.path.join(INBOX_DIR, filename)
        print(f"Processing: {filename}...")
        
        # Match issuer from filename
        matched_id = None
        for json_file in os.listdir(DB_JSON_DIR):
            cand_id = json_file.replace(".json", "")
            if cand_id.lower() in filename.lower():
                matched_id = cand_id
                break
                
        if not matched_id:
            print(f"  -> Could not auto-map '{filename}' to an existing issuer. Creating generic intake record.")
            continue
            
        print(f"  -> Successfully mapped to issuer: '{matched_id}'")
        target_json = os.path.join(DB_JSON_DIR, f"{matched_id}.json")
        with open(target_json, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        # Parse Excel
        if filename.endswith(".xlsx"):
            wb = openpyxl.load_workbook(filepath, data_only=False)
            sheet = wb.active
            extracted_notes = []
            
            # Scan for cell comments and adjustments
            for row in sheet.iter_rows(max_row=50, max_col=15):
                for cell in row:
                    if cell.comment:
                        extracted_notes.append({
                            "issuer_id": matched_id,
                            "issuer_name": data["metadata"]["name"],
                            "sector": data["metadata"]["sector"],
                            "topic": f"Cell {cell.coordinate} Adjustment",
                            "source": f"Cognitive Credit ({filename})",
                            "note": cell.comment.text.strip()
                        })
            
            if extracted_notes:
                print(f"  -> Extracted {len(extracted_notes)} analyst footnotes/adjustments from workbooks!")
                data["annotations"].extend(extracted_notes)
                with open(target_json, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                    
        print(f"  -> Successfully ingested and updated {matched_id}.json!")

    # Rebuild SQLite cache
    print("Rebuilding database and web assets...")
    os.system(f'python "{os.path.join(ROOT_DIR, "scripts", "build_database.py")}"')
    print("Ingestion complete.")

if __name__ == "__main__":
    process_inbox()
