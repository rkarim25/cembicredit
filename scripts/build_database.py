#!/usr/bin/env python3
"""
CEMBI Credit Database Compiler
Compiles all JSON issuer records into SQLite database and web bundles.
"""
import os
import sys
import json
import sqlite3

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ISSUERS_DIR = os.path.join(ROOT_DIR, "database", "issuers")
DB_PATH = os.path.join(ROOT_DIR, "database", "credit_master.db")
WEB_DATA_PATH = os.path.join(ROOT_DIR, "js", "issuers_data.js")
ANNOTATIONS_PATH = os.path.join(ROOT_DIR, "database", "annotations.json")

def compile_all():
    issuers = []
    annotations = []
    
    for fname in sorted(os.listdir(ISSUERS_DIR)):
        if fname.endswith(".json"):
            with open(os.path.join(ISSUERS_DIR, fname), "r", encoding="utf-8") as f:
                doc = json.load(f)
                issuers.append(doc)
                annotations.extend(doc.get("annotations", []))
                
    print(f"Loaded {len(issuers)} issuers and {len(annotations)} annotations.")
    
    # Save annotations.json
    with open(ANNOTATIONS_PATH, "w", encoding="utf-8") as f:
        json.dump(annotations, f, indent=2, ensure_ascii=False)
        
    # Save web bundle
    with open(WEB_DATA_PATH, "w", encoding="utf-8") as f:
        f.write("const MASTER_ISSUERS = " + json.dumps(issuers, indent=2, ensure_ascii=False) + ";\n")
        f.write("const MASTER_ANNOTATIONS = " + json.dumps(annotations, indent=2, ensure_ascii=False) + ";\n")
        all_map = {doc["metadata"]["id"]: doc for doc in issuers}
        f.write("window.CEMBI_DATA = " + json.dumps(all_map, indent=2, ensure_ascii=False) + ";\n")
        
    # SQLite
    if os.path.exists(DB_PATH): os.remove(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    cur.execute("""
    CREATE TABLE issuers (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, ticker TEXT, country TEXT NOT NULL,
        region TEXT, sector TEXT NOT NULL, type TEXT NOT NULL, rating TEXT,
        tier TEXT, benchmark_bond TEXT, price REAL, ytm REAL, spread_bp INTEGER,
        model_file TEXT, notion_id TEXT, last_updated TEXT
    )""")
    cur.execute("""
    CREATE TABLE financials_multi_year (
        issuer_id TEXT, period TEXT, is_audited INTEGER, revenue REAL, ebitda REAL,
        ebitda_margin_pct REAL, cfo REAL, capex REAL, fcf REAL, cash REAL,
        gross_debt REAL, net_debt REAL, net_leverage REAL, interest_coverage REAL,
        assets REAL, loans REAL, deposits REAL, nii REAL, fees REAL, ppop REAL,
        provisions REAL, net_profit REAL, equity REAL, nim_pct REAL, cir_pct REAL,
        roe_pct REAL, ldr_pct REAL, npl_pct REAL, car_pct REAL,
        PRIMARY KEY (issuer_id, period)
    )""")
    cur.execute("CREATE TABLE supplementary_metrics (issuer_id TEXT, metric_key TEXT, metric_value TEXT, PRIMARY KEY(issuer_id, metric_key))")
    cur.execute("CREATE TABLE debt_maturities (issuer_id TEXT, year_period TEXT, amount_usd_m REAL, PRIMARY KEY(issuer_id, year_period))")
    cur.execute("CREATE TABLE recovery_waterfalls (issuer_id TEXT PRIMARY KEY, distressed_floor_px REAL, base_case_px REAL, recovery_floor_pct REAL, recovery_base_pct REAL, stress_ev_multiple TEXT, restructuring_framework TEXT, thesis TEXT)")
    cur.execute("CREATE TABLE qualitative_annotations (id INTEGER PRIMARY KEY AUTOINCREMENT, issuer_id TEXT, sector TEXT, topic TEXT, source TEXT, note TEXT)")
    cur.execute("CREATE VIRTUAL TABLE notes_search USING fts5(issuer_id, issuer_name, sector, topic, source, note)")
    
    for doc in issuers:
        m = doc["metadata"]
        cur.execute("INSERT INTO issuers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (
            m["id"], m["name"], m["ticker"], m["country"], m["region"], m["sector"], m["type"],
            m["rating"], m["tier"], m["benchmark_bond"], m["price"], m["ytm"], m["spread_bp"],
            m["model_file"], m["notion_id"], m["last_updated"]
        ))
        for f in doc.get("financials_multi_year", []):
            cur.execute("INSERT INTO financials_multi_year VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (
                m["id"], f["period"], 1 if f.get("is_audited") else 0,
                f.get("revenue"), f.get("ebitda"), f.get("ebitda_margin_pct"),
                f.get("cfo"), f.get("capex"), f.get("fcf"), f.get("cash"),
                f.get("gross_debt"), f.get("net_debt"), f.get("net_leverage"), f.get("interest_coverage"),
                f.get("assets"), f.get("loans"), f.get("deposits"), f.get("nii"), f.get("fees"),
                f.get("ppop"), f.get("provisions"), f.get("net_profit"), f.get("equity"),
                f.get("nim_pct"), f.get("cir_pct"), f.get("roe_pct"), f.get("ldr_pct"),
                f.get("npl_pct"), f.get("car_pct")
            ))
        for k, v in doc.get("supplementary_data", {}).items():
            cur.execute("INSERT INTO supplementary_metrics VALUES (?, ?, ?)", (m["id"], k, str(v)))
        for y, amt in doc.get("debt_maturities", {}).items():
            if y != "total_outstanding_usd_m":
                cur.execute("INSERT INTO debt_maturities VALUES (?, ?, ?)", (m["id"], str(y), amt))
        rec = doc.get("recovery_analysis", {})
        cur.execute("INSERT INTO recovery_waterfalls VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (
            m["id"], rec.get("distressed_floor_px"), rec.get("base_case_px"), rec.get("recovery_floor_pct"),
            rec.get("recovery_base_pct"), str(rec.get("implied_stress_ev_multiple")), rec.get("restructuring_framework"), rec.get("thesis")
        ))
        for ann in doc.get("annotations", []):
            cur.execute("INSERT INTO qualitative_annotations (issuer_id, sector, topic, source, note) VALUES (?, ?, ?, ?, ?)",
                        (m["id"], ann["sector"], ann["topic"], ann["source"], ann["note"]))
            cur.execute("INSERT INTO notes_search (issuer_id, issuer_name, sector, topic, source, note) VALUES (?, ?, ?, ?, ?, ?)",
                        (m["id"], m["name"], ann["sector"], ann["topic"], ann["source"], ann["note"]))
                        
    cur.execute("CREATE INDEX idx_issuers_sec ON issuers(sector)")
    cur.execute("CREATE INDEX idx_issuers_cty ON issuers(country)")

    # Ingest credit_news if available
    news_json_path = os.path.join(ROOT_DIR, "database", "credit_news.json")
    if os.path.exists(news_json_path):
        with open(news_json_path, "r", encoding="utf-8") as nf:
            news_items = json.load(nf)
        cur.execute("DROP TABLE IF EXISTS credit_news;")
        cur.execute("""
        CREATE TABLE credit_news (
            id TEXT PRIMARY KEY, date TEXT, ticker TEXT, issuer_name TEXT, headline TEXT,
            source TEXT, url TEXT, category TEXT, macro_transmission_channel TEXT,
            credit_impact TEXT, impacted_issuers TEXT, concise_analysis TEXT, credit_commentary TEXT
        );
        """)
        for n in news_items:
            cur.execute("""
                INSERT INTO credit_news VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                n["id"], n["date"], n["ticker"], n["issuer_name"], n["headline"], n["source"],
                n["url"], n["category"], n.get("macro_transmission_channel", ""), n["credit_impact"],
                json.dumps(n.get("impacted_issuers", [])), n.get("concise_analysis", ""), n.get("credit_commentary", "")
            ))
        print(f"Ingested {len(news_items)} credit news items into SQLite.")

    conn.commit()
    conn.close()
    print("Database compiled successfully.")

if __name__ == "__main__":
    compile_all()
