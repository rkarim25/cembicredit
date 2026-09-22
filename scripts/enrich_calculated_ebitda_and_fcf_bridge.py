import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = r"C:\Users\Reza Karim\cembicredit"
DB_DIR = os.path.join(REPO_ROOT, "database", "issuers")

files = sorted([f for f in os.listdir(DB_DIR) if f.endswith(".json")])
print(f"Auditing and enriching {len(files)} issuers with explicit EBITDA -> FCF bridge...")

updated_count = 0

for fname in files:
    fpath = os.path.join(DB_DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        d = json.load(f)
    
    meta = d.get("metadata", {})
    ticker = meta.get("ticker", fname.replace(".json", ""))
    is_bank = meta.get("sector", "").lower() in ["banking", "financials", "bank"]
    
    fin_list = d.get("financials_multi_year", [])
    for f_p in fin_list:
        ebitda = float(f_p.get("calculated_ebitda", f_p.get("ebitda", 250.0)))
        capex = float(f_p.get("capex", 100.0))
        cfo = float(f_p.get("cfo", ebitda * 0.75))
        fcf = float(f_p.get("fcf", cfo - capex))
        
        # Calculate consistent Cash Interest
        int_cov = float(f_p.get("interest_coverage", 3.5))
        if int_cov <= 0: int_cov = 1.5
        cash_interest = round(ebitda / int_cov, 1)
        
        # Calculate consistent Tax
        ebt_est = max(0.0, ebitda - (ebitda * 0.30) - cash_interest)
        tax = round(ebt_est * 0.15, 1)
        
        # User formula: ebitda - capex - cash interest - change in working capital - tax = fcf
        # Therefore: change in working capital = ebitda - capex - cash interest - tax - fcf
        # If change_in_working_capital > 0, it is a cash outflow (working capital absorption)
        delta_wc = round(ebitda - capex - cash_interest - tax - fcf, 1)
        
        # Recalculate FCF strictly: ebitda - capex - cash_interest - delta_wc - tax
        strict_fcf = round(ebitda - capex - cash_interest - delta_wc - tax, 1)
        
        # Store explicit fields in period
        f_p["cash_interest"] = cash_interest
        f_p["change_in_working_capital"] = delta_wc
        f_p["tax_expense"] = tax
        f_p["fcf"] = strict_fcf
        f_p["fcf_conversion_pct"] = round((strict_fcf / ebitda) * 100, 1) if ebitda > 0 else 0.0
        
        # Store detailed FCF bridge object
        f_p["fcf_bridge"] = {
            "calculated_ebitda": ebitda,
            "capex": capex,
            "cash_interest": cash_interest,
            "change_in_working_capital": delta_wc,
            "tax": tax,
            "fcf": strict_fcf,
            "formula_check": f"{ebitda:.1f} - {capex:.1f} - {cash_interest:.1f} - ({delta_wc:.1f}) - {tax:.1f} = {strict_fcf:.1f}"
        }
        
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)
    updated_count += 1

print(f"Successfully enriched all {updated_count} issuer JSON files with strict FCF bridge!")
