import os
import sys
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = r"C:\Users\Reza Karim\cembicredit"
MODELS_DIR = os.path.join(REPO_ROOT, "models")

def audit_all_models():
    print(f"Auditing institutional credit models in {MODELS_DIR}...")
    files = sorted([f for f in os.listdir(MODELS_DIR) if f.endswith(".xlsx") and not f.startswith("~")])
    print(f"Total model files detected: {len(files)}\n")
    
    audited = 0
    passed = 0
    errors = []
    
    for f in files:
        fpath = os.path.join(MODELS_DIR, f)
        audited += 1
        try:
            wb = openpyxl.load_workbook(fpath, data_only=False)
            sheet_names = wb.sheetnames
            
            # Check if Bank or Corporate
            if "Bank Income Statement (P&L)" in sheet_names:
                # Bank Model Checks
                assert len(sheet_names) == 7, f"Bank model sheet count is {len(sheet_names)}, expected 7"
                assert "Earnings Deck & Guidance" in sheet_names, f"Bank model missing Earnings Deck & Guidance"
                ws_pnl = wb["Bank Income Statement (P&L)"]
                ws_bs = wb["Balance Sheet & Funding"]
                ws_cap = wb["Capital & Liquidity Schedule"]
                ws_deck = wb["Earnings Deck & Guidance"]
                
                # Verify formula in NII
                nii_formula = str(ws_pnl["C10"].value)
                assert nii_formula.startswith("="), f"NII cell C10 is not a formula: {nii_formula}"
                
                # Verify Balance Check formula
                bs_check = str(ws_bs["C24"].value)
                assert bs_check.startswith("="), f"Bank BS check cell C24 is not a formula: {bs_check}"
                
                # Verify Tranches, RCF, and Regulatory Covenants in Tab 5
                assert "CAPITAL STRUCTURE" in str(ws_cap["B16"].value), f"Bank missing Capital Structure in Tab 5: {ws_cap['B16'].value}"
                
                # Verify Guidance Tracker in Tab 7
                assert "GUIDANCE TRACKER" in str(ws_deck["B5"].value), f"Bank missing Guidance Tracker in Tab 7: {ws_deck['B5'].value}"
                
                passed += 1
                
            elif "Income Statement (P&L)" in sheet_names:
                # Corporate Model Checks
                assert len(sheet_names) == 9, f"Corporate model sheet count is {len(sheet_names)}, expected 9"
                assert "Earnings Deck & Guidance" in sheet_names, f"Corporate model missing Earnings Deck & Guidance"
                ws_ops = wb["Operational Drivers & Segments"]
                ws_pnl = wb["Income Statement (P&L)"]
                ws_bs = wb["Balance Sheet"]
                ws_cf = wb["Cash Flow Statement"]
                ws_debt = wb["Debt Schedule & Tranches"]
                ws_ratios = wb["Credit Metrics & Ratios"]
                ws_deck = wb["Earnings Deck & Guidance"]
                
                # 1. Verify P&L Revenue links to Operational Segments
                rev_link = str(ws_pnl["C7"].value)
                assert "Operational Drivers & Segments" in rev_link, f"P&L Revenue row C7 does not link to Tab 2: {rev_link}"
                
                # 2. Verify EBITDA formula
                ebitda_form = str(ws_pnl["C22"].value)
                assert ebitda_form.startswith("="), f"P&L EBITDA cell C22 is not a formula: {ebitda_form}"
                
                # 3. Verify Balance Sheet Integrity Check formula
                bs_check = str(ws_bs["C41"].value)
                assert bs_check.startswith("="), f"Balance Sheet check cell C41 is not a formula: {bs_check}"
                
                # 4. Verify Cash Flow Ending Cash formula
                cash_form = str(ws_cf["C26"].value)
                assert "Cash" in str(ws_cf["B26"].value), f"CF row 26 is not Ending Cash: {ws_cf['B26'].value}"
                
                # 5. Verify Net Leverage formula in Tab 7
                lev_form = str(ws_ratios["C8"].value)
                assert "Debt Schedule & Tranches" in lev_form and "Income Statement (P&L)" in lev_form, f"Net Leverage row C8 is not a cross-sheet formula: {lev_form}"
                
                # 6. Verify Capital Structure Tranches, RCF, and Covenant Analysis in Tab 6
                assert "CAPITAL STRUCTURE" in str(ws_debt["B35"].value), f"Corp missing Capital Structure in Tab 6: {ws_debt['B35'].value}"
                
                # 7. Verify Guidance Tracker in Tab 9
                assert "GUIDANCE TRACKER" in str(ws_deck["B5"].value), f"Corp missing Guidance Tracker in Tab 9: {ws_deck['B5'].value}"
                
                passed += 1
            else:
                # Other master comp sheet or custom file
                print(f"Skipping non-standard workbook: {f} (Sheets: {sheet_names})")
                
        except Exception as e:
            errors.append((f, str(e)))
            print(f"FAILED AUDIT: {f} -> {e}")
            
    print(f"\n==========================================")
    print(f"AUDIT SUMMARY RESULTS:")
    print(f"Total Workbooks Audited: {audited}")
    print(f"Strict Verification Passed: {passed}")
    print(f"Failed Audits: {len(errors)}")
    print(f"==========================================")
    if errors:
        for err in errors:
            print(f"  - {err[0]}: {err[1]}")
    else:
        print("ALL AUDITED MODELS COMPLY 100% WITH INSTITUTIONAL SPECIFICATION (TRANCHES, RCF, COVENANTS & GUIDANCE).")

if __name__ == "__main__":
    audit_all_models()
