#!/usr/bin/env python3
"""
scripts/record_snapshot.py - Autonomous Snapshot & Time-Series Engine
Captures immutable daily snapshots of market data, tranches, financials, and guidance
across all 85 CEMBI CEEMEA/LatAm issuers.

Updates:
1. SQLite historical tables (historical_market_snapshots, historical_tranche_snapshots, etc.)
2. Immutable daily snapshot directory (database/snapshots/YYYY-MM-DD/)
3. Per-issuer append-only history (database/history/<ticker>.json)
4. Client-side compiled history bundle (js/history_data.js)
5. Master snapshot manifest (database/snapshots/snapshot_manifest.json)
"""

import os
import sys
import json
import glob
import sqlite3
import argparse
import datetime

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(ROOT, "database", "credit_master.db")
ISSUERS_DIR = os.path.join(ROOT, "database", "issuers")
SNAPSHOTS_DIR = os.path.join(ROOT, "database", "snapshots")
HISTORY_DIR = os.path.join(ROOT, "database", "history")
JS_DIR = os.path.join(ROOT, "js")

def main():
    parser = argparse.ArgumentParser(description="Record credit market and financial snapshot")
    parser.add_argument("--date", default=datetime.date.today().isoformat(), help="Snapshot date (YYYY-MM-DD)")
    parser.add_argument("--source", default="Live Institutional Desk Audit", help="Triggering source description")
    parser.add_argument("--notes", default="", help="Optional notes on the snapshot")
    args = parser.parse_args()

    snapshot_date = args.date
    timestamp = datetime.datetime.now().isoformat()
    run_id = f"SNAP-{snapshot_date.replace('-', '')}-{int(datetime.datetime.now().timestamp()) % 1000:03d}"
    notes = args.notes or f"Autonomous credit snapshot for {snapshot_date} across universe."

    print(f"=== RECORDING CREDIT SNAPSHOT [{run_id}] FOR {snapshot_date} ===")

    os.makedirs(SNAPSHOTS_DIR, exist_ok=True)
    os.makedirs(HISTORY_DIR, exist_ok=True)
    daily_dir = os.path.join(SNAPSHOTS_DIR, snapshot_date)
    os.makedirs(daily_dir, exist_ok=True)

    # 1. Connect to SQLite
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Ensure historical tables exist
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS snapshot_runs (
        id TEXT PRIMARY KEY, snapshot_date TEXT, timestamp TEXT, trigger_source TEXT,
        issuers_count INTEGER, tranches_count INTEGER, guidance_count INTEGER, notes TEXT
    );
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS historical_market_snapshots (
        snapshot_run_id TEXT, snapshot_date TEXT, timestamp TEXT, ticker TEXT, issuer_id TEXT, issuer_name TEXT,
        country TEXT, sector TEXT, rating TEXT, tier TEXT, benchmark_bond TEXT, price REAL, ytm REAL, spread_bp REAL,
        net_leverage REAL, calculated_ebitda REAL, fcf REAL, guidance_status TEXT
    );
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS historical_tranche_snapshots (
        snapshot_run_id TEXT, snapshot_date TEXT, timestamp TEXT, ticker TEXT, tranche_name TEXT, instrument_type TEXT,
        currency TEXT, amount_outstanding_usd_m REAL, coupon REAL, clean_price REAL, ytm REAL
    );
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS historical_guidance_snapshots (
        snapshot_run_id TEXT, snapshot_date TEXT, timestamp TEXT, ticker TEXT, guidance_metric TEXT,
        management_target TEXT, current_runrate TEXT, tracking_status TEXT
    );
    """)

    # 2. Load all issuer files
    issuer_files = glob.glob(os.path.join(ISSUERS_DIR, "*.json"))
    mkt_snapshot_list = []
    tranche_snapshot_list = []
    guidance_snapshot_list = []
    all_history_series = {}

    # Load existing history if available
    history_js_path = os.path.join(JS_DIR, "history_data.js")
    if os.path.exists(history_js_path):
        try:
            with open(history_js_path, "r", encoding="utf-8") as hj:
                raw = hj.read()
                prefix = "window.CREDIT_HISTORY_DATA = "
                idx = raw.find(prefix)
                if idx != -1:
                    json_str = raw[idx + len(prefix):].rstrip(";\n ")
                    all_history_series = json.loads(json_str)
        except Exception as e:
            print(f"Notice: Could not parse existing history_data.js: {e}")

    for f in issuer_files:
        with open(f, "r", encoding="utf-8") as jf:
            data = json.load(jf)
            m = data.get("metadata", {})
            ticker = m.get("ticker")
            if not ticker:
                continue

            f24 = next((x for x in data.get("financials_multi_year", []) if x.get("period") == "2024A"), {})
            g_list = data.get("management_guidance_tracker", [])

            top_guidance_status = "On Track"
            if any(g.get("tracking_status") == "Lagging" for g in g_list):
                top_guidance_status = "Lagging"
            elif any(g.get("tracking_status") == "Under Watch" for g in g_list):
                top_guidance_status = "Under Watch"
            elif any(g.get("tracking_status") == "Ahead of Target" for g in g_list):
                top_guidance_status = "Ahead of Target"

            mkt_row = {
                "snapshot_run_id": run_id,
                "snapshot_date": snapshot_date,
                "timestamp": timestamp,
                "ticker": ticker,
                "issuer_id": m.get("id"),
                "issuer_name": m.get("name"),
                "country": m.get("country"),
                "sector": m.get("sector"),
                "rating": m.get("rating"),
                "tier": m.get("tier"),
                "benchmark_bond": m.get("benchmark_bond"),
                "price": m.get("price"),
                "ytm": m.get("ytm"),
                "spread_bp": m.get("spread_bp"),
                "net_leverage": f24.get("net_leverage"),
                "calculated_ebitda": f24.get("ebitda"),
                "fcf": f24.get("fcf"),
                "guidance_status": top_guidance_status
            }
            mkt_snapshot_list.append(mkt_row)

            # Update history series for ticker
            if ticker not in all_history_series:
                all_history_series[ticker] = {
                    "ticker": ticker,
                    "name": m.get("name"),
                    "sector": m.get("sector"),
                    "country": m.get("country"),
                    "benchmark_bond": m.get("benchmark_bond"),
                    "snapshots": []
                }

            # Avoid duplicate snapshot for same date
            snaps = all_history_series[ticker]["snapshots"]
            snaps = [s for s in snaps if s.get("date") != snapshot_date]
            snaps.append({
                "date": snapshot_date,
                "period_name": snapshot_date,
                "timestamp": timestamp,
                "rating": m.get("rating"),
                "price": m.get("price"),
                "ytm": m.get("ytm"),
                "spread_bp": m.get("spread_bp"),
                "net_leverage": f24.get("net_leverage"),
                "ebitda": f24.get("ebitda"),
                "fcf": f24.get("fcf"),
                "guidance_status": top_guidance_status
            })
            all_history_series[ticker]["snapshots"] = snaps

            # Tranches
            for tr in data.get("capital_structure_tranches", []):
                tranche_snapshot_list.append({
                    "snapshot_run_id": run_id,
                    "snapshot_date": snapshot_date,
                    "timestamp": timestamp,
                    "ticker": ticker,
                    "tranche_name": tr.get("tranche_name"),
                    "instrument_type": tr.get("instrument_type"),
                    "currency": tr.get("currency"),
                    "amount_outstanding_usd_m": tr.get("amount_outstanding_usd_m"),
                    "coupon": tr.get("coupon"),
                    "clean_price": tr.get("clean_price"),
                    "ytm": tr.get("ytm")
                })

            # Guidance
            for g in g_list:
                guidance_snapshot_list.append({
                    "snapshot_run_id": run_id,
                    "snapshot_date": snapshot_date,
                    "timestamp": timestamp,
                    "ticker": ticker,
                    "guidance_metric": g.get("guidance_metric"),
                    "management_target": g.get("management_target"),
                    "current_runrate": g.get("current_runrate"),
                    "tracking_status": g.get("tracking_status")
                })

            # Save updated market_history to issuer JSON
            data["market_history"] = snaps
            with open(f, "w", encoding="utf-8") as jf_out:
                json.dump(data, jf_out, indent=2)

    # Write daily snapshot JSON files
    with open(os.path.join(daily_dir, f"market_snapshot_{snapshot_date}.json"), "w", encoding="utf-8") as sf:
        json.dump(mkt_snapshot_list, sf, indent=2)
    with open(os.path.join(daily_dir, f"tranches_snapshot_{snapshot_date}.json"), "w", encoding="utf-8") as sf:
        json.dump(tranche_snapshot_list, sf, indent=2)
    with open(os.path.join(daily_dir, f"guidance_snapshot_{snapshot_date}.json"), "w", encoding="utf-8") as sf:
        json.dump(guidance_snapshot_list, sf, indent=2)

    manifest = {
        "run_id": run_id,
        "snapshot_date": snapshot_date,
        "timestamp": timestamp,
        "trigger_source": args.source,
        "total_issuers": len(mkt_snapshot_list),
        "total_tranches": len(tranche_snapshot_list),
        "total_guidance_metrics": len(guidance_snapshot_list),
        "notes": notes
    }
    with open(os.path.join(daily_dir, "manifest.json"), "w", encoding="utf-8") as sf:
        json.dump(manifest, sf, indent=2)

    # Insert into SQLite
    cursor.execute("""
    INSERT OR REPLACE INTO snapshot_runs (id, snapshot_date, timestamp, trigger_source, issuers_count, tranches_count, guidance_count, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (run_id, snapshot_date, timestamp, args.source, len(mkt_snapshot_list), len(tranche_snapshot_list), len(guidance_snapshot_list), notes))

    # Remove any existing entries for this date/run to prevent duplication
    cursor.execute("DELETE FROM historical_market_snapshots WHERE snapshot_date = ?", (snapshot_date,))
    cursor.execute("DELETE FROM historical_tranche_snapshots WHERE snapshot_date = ?", (snapshot_date,))
    cursor.execute("DELETE FROM historical_guidance_snapshots WHERE snapshot_date = ?", (snapshot_date,))

    cursor.executemany("""
    INSERT INTO historical_market_snapshots (
        snapshot_run_id, snapshot_date, timestamp, ticker, issuer_id, issuer_name,
        country, sector, rating, tier, benchmark_bond, price, ytm, spread_bp,
        net_leverage, calculated_ebitda, fcf, guidance_status
    ) VALUES (
        :snapshot_run_id, :snapshot_date, :timestamp, :ticker, :issuer_id, :issuer_name,
        :country, :sector, :rating, :tier, :benchmark_bond, :price, :ytm, :spread_bp,
        :net_leverage, :calculated_ebitda, :fcf, :guidance_status
    )
    """, mkt_snapshot_list)

    cursor.executemany("""
    INSERT INTO historical_tranche_snapshots (
        snapshot_run_id, snapshot_date, timestamp, ticker, tranche_name, instrument_type,
        currency, amount_outstanding_usd_m, coupon, clean_price, ytm
    ) VALUES (
        :snapshot_run_id, :snapshot_date, :timestamp, :ticker, :tranche_name, :instrument_type,
        :currency, :amount_outstanding_usd_m, :coupon, :clean_price, :ytm
    )
    """, tranche_snapshot_list)

    cursor.executemany("""
    INSERT INTO historical_guidance_snapshots (
        snapshot_run_id, snapshot_date, timestamp, ticker, guidance_metric,
        management_target, current_runrate, tracking_status
    ) VALUES (
        :snapshot_run_id, :snapshot_date, :timestamp, :ticker, :guidance_metric,
        :management_target, :current_runrate, :tracking_status
    )
    """, guidance_snapshot_list)

    conn.commit()
    conn.close()

    # Write per-ticker history files
    for ticker, h_data in all_history_series.items():
        with open(os.path.join(HISTORY_DIR, f"{ticker}.json"), "w", encoding="utf-8") as hf:
            json.dump(h_data, hf, indent=2)

    # Write updated js/history_data.js
    with open(history_js_path, "w", encoding="utf-8") as hj:
        hj.write(f"// CEMBI Credit Master Platform - Cumulative Historical Snapshots Time Series\n")
        hj.write(f"// Last Snapshot Recorded: {snapshot_date} ({timestamp})\n")
        hj.write(f"// Total Issuers: {len(all_history_series)}\n\n")
        hj.write("window.CREDIT_HISTORY_DATA = ")
        json.dump(all_history_series, hj, indent=2)
        hj.write(";\n")

    # Update master manifest
    manifest_path = os.path.join(SNAPSHOTS_DIR, "snapshot_manifest.json")
    master_m = {}
    if os.path.exists(manifest_path):
        try:
            with open(manifest_path, "r", encoding="utf-8") as mf:
                master_m = json.load(mf)
        except Exception:
            pass
    master_m["last_snapshot_date"] = snapshot_date
    master_m["last_updated"] = timestamp
    master_m["issuers_count"] = len(mkt_snapshot_list)
    with open(manifest_path, "w", encoding="utf-8") as mf:
        json.dump(master_m, mf, indent=2)

    print(f"SUCCESS: Snapshot {run_id} recorded. {len(mkt_snapshot_list)} issuers, {len(tranche_snapshot_list)} tranches, {len(guidance_snapshot_list)} guidance items stored.")

if __name__ == "__main__":
    main()
