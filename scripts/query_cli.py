#!/usr/bin/env python3
"""
CEMBI Credit Master CLI Query Engine
Sub-10ms zero-AI query tool for CEMBI CEEMEA corporate & bank debt models.
"""
import sys
import os
import sqlite3
import argparse
import json

sys.stdout.reconfigure(encoding='utf-8')

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "database", "credit_master.db")

def get_conn():
    if not os.path.exists(DB_PATH):
        print(f"Error: Database not found at {DB_PATH}. Run scripts/build_database.py first.")
        sys.exit(1)
    return sqlite3.connect(DB_PATH)

def format_row(cols, widths):
    out = ""
    for c, w in zip(cols, widths):
        out += str(c)[:w].ljust(w) + " | "
    return out

def cmd_screen(args):
    conn = get_conn()
    cur = conn.cursor()
    
    query = """
    SELECT i.ticker, i.name, i.country, i.sector, i.rating, i.price, i.ytm, i.spread_bp,
           f.net_leverage, f.interest_coverage, r.distressed_floor_px, r.base_case_px
    FROM issuers i
    LEFT JOIN financials_multi_year f ON i.id = f.issuer_id AND f.period = '2024A'
    LEFT JOIN recovery_waterfalls r ON i.id = r.issuer_id
    WHERE 1=1
    """
    params = []
    if args.sector:
        query += " AND i.sector LIKE ?"
        params.append(f"%{args.sector}%")
    if args.country:
        query += " AND i.country LIKE ?"
        params.append(f"%{args.country}%")
    if args.rating:
        query += " AND i.rating LIKE ?"
        params.append(f"%{args.rating}%")
    if args.max_leverage is not None:
        query += " AND (f.net_leverage <= ? OR f.net_leverage IS NULL)"
        params.append(args.max_leverage)
    if args.min_spread is not None:
        query += " AND i.spread_bp >= ?"
        params.append(args.min_spread)
        
    query += " ORDER BY i.spread_bp DESC"
    cur.execute(query, params)
    rows = cur.fetchall()
    conn.close()
    
    headers = ["Ticker", "Name", "Country", "Sector", "Rating", "Px", "YTM", "Spread", "24A NL", "24A Cov", "Floor", "Base"]
    widths = [8, 22, 12, 14, 8, 7, 7, 8, 8, 8, 8, 8]
    
    print("=" * 125)
    print(f"CEMBI CREDIT SCREENER RESULTS ({len(rows)} Issuers Matched)")
    print("=" * 125)
    print(format_row(headers, widths))
    print("-" * 125)
    for r in rows:
        formatted_r = [
            r[0], r[1], r[2], r[3], r[4],
            f"${r[5]:.2f}", f"{r[6]:.2f}%", f"+{r[7]}bp",
            f"{r[8]:.2f}x" if r[8] is not None else "-",
            f"{r[9]:.2f}x" if r[9] is not None else "-",
            f"${r[10]:.2f}" if r[10] is not None else "-",
            f"${r[11]:.2f}" if r[11] is not None else "-"
        ]
        print(format_row(formatted_r, widths))
    print("=" * 125)

def cmd_trend(args):
    conn = get_conn()
    cur = conn.cursor()
    
    # Lookup issuer
    cur.execute("SELECT id, name, ticker, sector, type FROM issuers WHERE ticker LIKE ? OR id LIKE ?", (args.ticker, args.ticker.lower()))
    iss = cur.fetchone()
    if not iss:
        print(f"Error: Issuer '{args.ticker}' not found.")
        sys.exit(1)
        
    iss_id, name, ticker, sector, typ = iss
    metric = args.metric.lower()
    
    query = f"SELECT period, {metric} FROM financials_multi_year WHERE issuer_id = ? ORDER BY period"
    try:
        cur.execute(query, (iss_id,))
        rows = cur.fetchall()
    except sqlite3.OperationalError:
        print(f"Error: Invalid metric '{metric}'. Valid examples: revenue, ebitda, net_leverage, interest_coverage, fcf, nim_pct, npl_pct, car_pct.")
        sys.exit(1)
        
    conn.close()
    
    print("=" * 70)
    print(f"{name} ({ticker}) — 7-Year Multi-Period Trend: {metric.upper()}")
    print("=" * 70)
    print("Period | Value | Historical / Projection Graph")
    print("-" * 70)
    
    vals = [r[1] for r in rows if r[1] is not None]
    max_val = max(vals) if vals else 1.0
    for period, val in rows:
        if val is None:
            print(f"{period.ljust(6)} | N/A")
            continue
        bar_len = int((val / max_val) * 35) if max_val > 0 else 0
        bar = "█" * max(0, bar_len)
        tag = "[Audited]" if "A" in period else "[Est]"
        print(f"{period.ljust(6)} | {str(round(val, 2)).rjust(8)} | {bar} {tag}")
    print("=" * 70)

def cmd_notes(args):
    conn = get_conn()
    cur = conn.cursor()
    query = """
    SELECT issuer_name, sector, topic, source, note
    FROM notes_search
    WHERE notes_search MATCH ?
    ORDER BY rank
    LIMIT 20
    """
    try:
        cur.execute(query, (args.query,))
        rows = cur.fetchall()
    except sqlite3.OperationalError:
        # Fallback if FTS syntax error
        cur.execute("SELECT issuer_name, sector, topic, source, note FROM qualitative_annotations WHERE note LIKE ? LIMIT 20", (f"%{args.query}%",))
        rows = cur.fetchall()
        
    conn.close()
    
    print("=" * 110)
    print(f"QUALITATIVE INTELLIGENCE SEARCH: '{args.query}' ({len(rows)} matches found)")
    print("=" * 110)
    for r in rows:
        print(f"[{r[0]} | {r[1]}] Topic: {r[2]} (Source: {r[3]})")
        print(f"  Note: {r[4]}")
        print("-" * 110)

def cmd_summary(args):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, name, ticker, country, sector, rating, benchmark_bond, price, ytm, spread_bp, model_file FROM issuers WHERE ticker LIKE ? OR id LIKE ?", (args.ticker, args.ticker.lower()))
    iss = cur.fetchone()
    if not iss:
        print(f"Error: Issuer '{args.ticker}' not found.")
        sys.exit(1)
        
    iss_id = iss[0]
    print("=" * 80)
    print(f"DOSSIER: {iss[1]} ({iss[2]}) | {iss[3]} — {iss[4]}")
    print("=" * 80)
    print(f"Rating: {iss[5]} | Benchmark: {iss[6]} @ ${iss[7]:.2f} (YTM: {iss[8]:.2f}%, Spread: +{iss[9]}bp)")
    print(f"Local Model: models/{iss[10]}")
    
    # Financials
    cur.execute("SELECT period, revenue, ebitda, net_debt, net_leverage, fcf FROM financials_multi_year WHERE issuer_id = ? ORDER BY period", (iss_id,))
    fins = cur.fetchall()
    if fins and fins[0][1] is not None:
        print("-" * 80)
        print("7-Year Financial Trajectory (USD M):")
        print("Period | Revenue | EBITDA | Net Debt | Net Lev | FCF")
        for f in fins:
            print(f"{f[0].ljust(6)} | {str(f[1]).rjust(7)} | {str(f[2]).rjust(6)} | {str(f[3]).rjust(8)} | {str(f[4]).rjust(7)}x | {str(f[5]).rjust(6)}")
            
    # Supplementary Data
    cur.execute("SELECT metric_key, metric_value FROM supplementary_metrics WHERE issuer_id = ?", (iss_id,))
    supps = cur.fetchall()
    if supps:
        print("-" * 80)
        print("Supplementary Industry Metrics:")
        for k, v in supps:
            print(f"• {k.replace('_', ' ').title()}: {v}")
            
    # Recovery
    cur.execute("SELECT distressed_floor_px, base_case_px, restructuring_framework, thesis FROM recovery_waterfalls WHERE issuer_id = ?", (iss_id,))
    rec = cur.fetchone()
    if rec:
        print("-" * 80)
        print(f"Forensic Recovery Floor: ${rec[0]:.2f} | Base Case: ${rec[1]:.2f}")
        print(f"Framework: {rec[2]}")
        print(f"Downside Thesis: {rec[3]}")
        
    # Annotations
    cur.execute("SELECT topic, source, note FROM qualitative_annotations WHERE issuer_id = ?", (iss_id,))
    notes = cur.fetchall()
    if notes:
        print("-" * 80)
        print("Analyst & Broker Annotations:")
        for t, s, n in notes:
            print(f"• [{s}] {t}: {n}")
    print("=" * 80)

def main():
    parser = argparse.ArgumentParser(description="CEMBI Credit Master CLI Query Engine")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # Screen
    p_screen = subparsers.add_parser("screen", help="Screen issuers by multi-factor filters")
    p_screen.add_argument("--sector", help="Filter by sector")
    p_screen.add_argument("--country", help="Filter by country")
    p_screen.add_argument("--rating", help="Filter by rating")
    p_screen.add_argument("--max-leverage", type=float, help="Max 2024A net leverage")
    p_screen.add_argument("--min-spread", type=int, help="Min spread in bp")
    
    # Trend
    p_trend = subparsers.add_parser("trend", help="Plot 7-year metric trend for an issuer")
    p_trend.add_argument("--ticker", required=True, help="Ticker symbol (e.g. BINGHA, AKBNK)")
    p_trend.add_argument("--metric", default="net_leverage", help="Metric column (e.g. net_leverage, ebitda, revenue, fcf)")
    
    # Notes
    p_notes = subparsers.add_parser("notes", help="Full-text search across qualitative annotations")
    p_notes.add_argument("--query", required=True, help="Search keywords (e.g. escrow, YEKDEM, fertilizer, restructuring)")
    
    # Summary
    p_sum = subparsers.add_parser("summary", help="Full multi-page dossier for an issuer")
    p_sum.add_argument("--ticker", required=True, help="Ticker symbol (e.g. BINGHA, OCP, DPW)")
    
    args = parser.parse_args()
    if args.command == "screen":
        cmd_screen(args)
    elif args.command == "trend":
        cmd_trend(args)
    elif args.command == "notes":
        cmd_notes(args)
    elif args.command == "summary":
        cmd_summary(args)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
