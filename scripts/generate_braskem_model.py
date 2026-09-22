#!/usr/bin/env python3
"""
Generate models/Braskem_Credit_Model.xlsx for CEMBI Credit Platform
"""
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_braskem_model():
    wb = openpyxl.Workbook()
    wb.remove(wb.active) # remove default sheet

    # Colors
    NAVY_HEADER = PatternFill(start_color="0A192F", end_color="0A192F", fill_type="solid")
    GOLD_ACCENT = PatternFill(start_color="D97706", end_color="D97706", fill_type="solid")
    LIGHT_GRAY = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
    SOFT_BLUE = PatternFill(start_color="E0F2FE", end_color="E0F2FE", fill_type="solid")
    SOFT_GREEN = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid")
    SOFT_RED = PatternFill(start_color="FEE2E2", end_color="FEE2E2", fill_type="solid")

    FONT_TITLE = Font(name="Calibri", size=14, bold=True, color="0A192F")
    FONT_HEADER = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    FONT_SUBHEADER = Font(name="Calibri", size=11, bold=True, color="0A192F")
    FONT_BOLD = Font(name="Calibri", size=10, bold=True)
    FONT_REGULAR = Font(name="Calibri", size=10)
    FONT_DIM = Font(name="Calibri", size=9, italic=True, color="64748B")

    THIN_BORDER = Border(
        left=Side(style='thin', color='CBD5E1'),
        right=Side(style='thin', color='CBD5E1'),
        top=Side(style='thin', color='CBD5E1'),
        bottom=Side(style='thin', color='CBD5E1')
    )
    DOUBLE_BOTTOM = Border(
        top=Side(style='thin', color='CBD5E1'),
        bottom=Side(style='double', color='0A192F')
    )

    # -------------------------------------------------------------
    # 1. SHEET: Credit Summary & Memo
    # -------------------------------------------------------------
    ws_memo = wb.create_sheet(title="Credit Summary & Memo")
    ws_memo.views.sheetView[0].showGridLines = True

    ws_memo["B2"] = "Braskem S.A. (BRASKM) — Institutional Credit Model & Recovery Assessment"
    ws_memo["B2"].font = FONT_TITLE
    ws_memo["B3"] = "Sector: Materials / Chemicals | Country: Brazil | Rating: RD / D | Benchmark: BRASKM 4.500% 2030 @ $48.60 (19.80% YTM / +1,580 bp)"
    ws_memo["B3"].font = FONT_SUBHEADER

    ws_memo["B5"] = "I. EXECUTIVE CREDIT THESIS & CAPITAL STRUCTURE RECOMMENDATION"
    ws_memo["B5"].font = Font(name="Calibri", size=11, bold=True, color="1E3A8A")
    ws_memo["B6"] = "• SPECULATIVE OVERWEIGHT on Senior Unsecured Eurobonds (2030s @ 48.6c, 2033s @ 56.3c, 2050s @ 44.7c) vs. UNDERWEIGHT / SHORT Subordinated Hybrid 2081s (@ 31.8c)."
    ws_memo["B7"] = "• In late August 2026, Braskem entered Recuperação Extrajudicial in Brazil (~$11B debt scope). Creditors rejected a $2B company tender proposal, demanding a $3B equity check from Petrobras/Novonor."
    ws_memo["B8"] = "• Irreplaceable asset moat: Braskem holds ~70% market share in Brazil with 4 integrated cracker complexes and deep Petrobras feedstock integration."
    ws_memo["B9"] = "• Base Case recovery yields 66.3c on the dollar for Senior Unsecured debt (providing +35% to +45% upside), while Subordinated 2081s face 10–18c recovery under absolute priority."

    for r in range(6, 10):
        ws_memo[f"B{r}"].font = FONT_REGULAR

    ws_memo["B11"] = "II. 7-YEAR MULTI-PERIOD FINANCIAL SCORECARD (USD M)"
    ws_memo["B11"].font = Font(name="Calibri", size=11, bold=True, color="1E3A8A")

    headers_scorecard = ["Metric", "2021A", "2022A", "2023A", "2024A", "2025A", "2026E", "2027E"]
    for c_idx, h in enumerate(headers_scorecard, start=2):
        cell = ws_memo.cell(row=12, column=c_idx, value=h)
        cell.fill = NAVY_HEADER
        cell.font = FONT_HEADER
        cell.alignment = Alignment(horizontal="center" if c_idx > 2 else "left")

    scorecard_data = [
        ("Gross Revenue", [19500.0, 18700.0, 14320.0, 13850.0, 14650.0, 15400.0, 16200.0]),
        ("Calculated Cash EBITDA", [5620.0, 2150.0, 785.0, 850.0, 1150.0, 1400.0, 1650.0]),
        ("EBITDA Margin (%)", ["28.8%", "11.5%", "5.5%", "6.1%", "7.8%", "9.1%", "10.2%"]),
        ("Cash Flow from Operations (CFO)", [4250.0, 1850.0, 410.0, 540.0, 790.0, 1180.0, 1390.0]),
        ("Capital Expenditures (Capex)", [820.0, 940.0, 810.0, 720.0, 650.0, 600.0, 600.0]),
        ("Free Cash Flow (FCF)", [3630.0, 190.0, -745.0, -480.0, -235.0, 170.0, 440.0]),
        ("Cash & Liquid Reserves", [2420.0, 2150.0, 1420.0, 950.0, 880.0, 920.0, 1150.0]),
        ("Consolidated Gross Debt", [8250.0, 8640.0, 9850.0, 10400.0, 10350.0, 5400.0, 5100.0]),
        ("Consolidated Net Debt", [5830.0, 6490.0, 8430.0, 9450.0, 9470.0, 4480.0, 3950.0]),
        ("Net Debt / EBITDA", ["1.04x", "3.02x", "10.74x", "6.74x", "8.23x", "3.20x", "2.39x"]),
        ("Interest Coverage (EBITDA / Cash Int)", ["11.02x", "3.98x", "1.33x", "1.39x", "1.83x", "2.69x", "3.67x"])
    ]

    for r_idx, (label, vals) in enumerate(scorecard_data, start=13):
        ws_memo.cell(row=r_idx, column=2, value=label).font = FONT_BOLD if "EBITDA" in label or "Net Debt" in label or "Free Cash" in label else FONT_REGULAR
        ws_memo.cell(row=r_idx, column=2).border = THIN_BORDER
        for c_idx, val in enumerate(vals, start=3):
            cell = ws_memo.cell(row=r_idx, column=c_idx, value=val)
            cell.font = FONT_BOLD if "EBITDA" in label or "Net Debt" in label or "Free Cash" in label else FONT_REGULAR
            cell.border = THIN_BORDER
            if isinstance(val, float):
                cell.number_format = "#,##0.0"
                cell.alignment = Alignment(horizontal="right")
            else:
                cell.alignment = Alignment(horizontal="right")

    # Recovery Summary Table on Memo
    ws_memo["B26"] = "III. RECOVERY WATERFALL COMPARISON MATRIX (CENTS ON THE DOLLAR)"
    ws_memo["B26"].font = Font(name="Calibri", size=11, bold=True, color="1E3A8A")

    rec_headers = ["Tranche / Claim Class", "Claim Amount ($M)", "Market Price", "Distressed Floor", "Base Case Recovery", "Bull Case Recovery", "Trading Asymmetry"]
    for c_idx, h in enumerate(rec_headers, start=2):
        cell = ws_memo.cell(row=27, column=c_idx, value=h)
        cell.fill = GOLD_ACCENT
        cell.font = FONT_HEADER
        cell.alignment = Alignment(horizontal="center" if c_idx > 2 else "left")

    rec_rows = [
        ("Export Pre-Payment & Priority Bank Facilities", 1100.0, "100.0c", "100.0c (100%)", "100.0c (100%)", "100.0c (100%)", "Par Reinstated"),
        ("BRASKM 4.500% 2030 Senior Notes", 1450.0, "48.6c", "22.0c (22%)", "66.3c (66%)", "98.0c (98%)", "+36.4% Upside to Base"),
        ("BRASKM 7.250% 2033 Senior Notes", 1200.0, "56.3c", "22.0c (22%)", "66.3c (66%)", "98.0c (98%)", "+17.8% Upside to Base"),
        ("BRASKM 5.875% 2050 Senior Notes", 1420.0, "44.7c", "22.0c (22%)", "66.3c (66%)", "98.0c (98%)", "+48.3% Upside to Base"),
        ("Domestic Brazilian Debentures (CDI)", 1400.0, "52.0c", "22.0c (22%)", "66.3c (66%)", "98.0c (98%)", "+27.5% Upside to Base"),
        ("Total Senior Unsecured Claims", 9200.0, "~50.5c", "22.0c (22%)", "66.3c (66%)", "98.0c (98%)", "+31.3% Blended Upside"),
        ("BRASKM 8.50% / 12.00% 2081 Hybrid Notes", 1000.0, "31.8c", "0.0c (0%)", "14.0c (14%)", "48.0c (48%)", "-56.0% Downside (Avoid/Short)")
    ]

    for r_idx, rvals in enumerate(rec_rows, start=28):
        for c_idx, val in enumerate(rvals, start=2):
            cell = ws_memo.cell(row=r_idx, column=c_idx, value=val)
            cell.border = THIN_BORDER
            if c_idx == 2:
                cell.font = FONT_BOLD if "Total" in str(val) or "2081" in str(val) else FONT_REGULAR
            else:
                cell.alignment = Alignment(horizontal="right")
                if "Upside" in str(val):
                    cell.font = Font(name="Calibri", size=10, bold=True, color="047857")
                elif "Downside" in str(val):
                    cell.font = Font(name="Calibri", size=10, bold=True, color="B91C1C")
                else:
                    cell.font = FONT_BOLD if "Total" in rvals[0] else FONT_REGULAR

    # -------------------------------------------------------------
    # 2. SHEET: Downside Stress & Recovery (Detailed Waterfall)
    # -------------------------------------------------------------
    ws_rec = wb.create_sheet(title="Downside Stress & Recovery")
    ws_rec.views.sheetView[0].showGridLines = True

    ws_rec["B2"] = "Braskem S.A. — Granular Recovery Waterfall & Absolute Priority Analysis"
    ws_rec["B2"].font = FONT_TITLE
    ws_rec["B3"] = "Valuation Basis: Multiples of Normalized Operating Cash EBITDA & Replacement Asset Value (USD M)"
    ws_rec["B3"].font = FONT_SUBHEADER

    rec_detail_headers = ["Recovery Waterfall Line Item", "Scenario A: Distressed Liquidation Floor", "Scenario B: Base Case Consensual Reorg", "Scenario C: Bull Case Sponsor Recap"]
    for c_idx, h in enumerate(rec_detail_headers, start=2):
        cell = ws_rec.cell(row=5, column=c_idx, value=h)
        cell.fill = NAVY_HEADER
        cell.font = FONT_HEADER
        cell.alignment = Alignment(horizontal="center" if c_idx > 2 else "left")

    waterfall_items = [
        ("Operating Cash EBITDA Assumption", 800.0, 1400.0, 1800.0, "$M"),
        ("Implied EV / EBITDA Multiple", "3.5x", "5.0x", "5.5x", "Multiple"),
        ("Enterprise Value (EV)", 2800.0, 7000.0, 9900.0, "$M"),
        ("Add: Unrestricted Balance Sheet Cash", 850.0, 900.0, 1100.0, "$M"),
        ("Add: Sponsor Equity Check (Petrobras / IG4)", 0.0, 0.0, 2500.0, "$M"),
        ("Total Distributable Enterprise Asset Value", 3650.0, 7900.0, 13500.0, "$M"),
        ("", None, None, None, None),
        ("Less: Priority Administrative & Restructuring Fees", -150.0, -100.0, -100.0, "$M"),
        ("Less: Senior Secured / PPE Bank Export Facilities ($1,100M)", -1100.0, -1100.0, -1100.0, "$M"),
        ("Less: Maceió Environmental Settlement NPV Obligations", -850.0, -600.0, -500.0, "$M"),
        ("Total Priority Claims Deducted", -2100.0, -1800.0, -1700.0, "$M"),
        ("", None, None, None, None),
        ("Net Distributable Value to Senior Unsecured Creditors", 1550.0, 6100.0, 11800.0, "$M"),
        ("Total Senior Unsecured Claims (Eurobonds + Debentures)", 9200.0, 9200.0, 9200.0, "$M"),
        ("SENIOR UNSECURED RECOVERY PERCENTAGE (%)", "16.8%", "66.3%", "100.0%", "%"),
        ("SENIOR UNSECURED RECOVERY PRICE (CENTS ON DOLLAR)", "16.8c", "66.3c", "100.0c", "Cents"),
        ("", None, None, None, None),
        ("Net Value Remaining for Subordinated Claims", 0.0, 0.0, 2600.0, "$M"),
        ("Subordinated 2081 Hybrid Notes Claims ($1,000M)", 1000.0, 1000.0, 1000.0, "$M"),
        ("SUBORDINATED HYBRID 2081 RECOVERY (%)", "0.0%", "14.0%", "50.0%", "%"),
        ("SUBORDINATED HYBRID 2081 RECOVERY PRICE (CENTS)", "0.0c", "14.0c", "50.0c", "Cents"),
        ("", None, None, None, None),
        ("Value Remaining for Existing Equity (Novonor / Petrobras)", "WIPED OUT", "5% - 10% Stub Equity", "Retained Stake", "Equity")
    ]

    for r_idx, rdata in enumerate(waterfall_items, start=6):
        item_label = rdata[0]
        if not item_label:
            continue
        ws_rec.cell(row=r_idx, column=2, value=item_label)
        ws_rec.cell(row=r_idx, column=2).font = FONT_BOLD if "RECOVERY" in item_label or "Distributable" in item_label else FONT_REGULAR
        ws_rec.cell(row=r_idx, column=2).border = THIN_BORDER

        for c_idx in range(3, 6):
            val = rdata[c_idx - 2]
            cell = ws_rec.cell(row=r_idx, column=c_idx, value=val)
            cell.border = THIN_BORDER
            cell.alignment = Alignment(horizontal="right")
            if "RECOVERY" in item_label:
                cell.font = Font(name="Calibri", size=10, bold=True, color="0A192F")
                cell.fill = SOFT_GREEN if "SENIOR" in item_label else SOFT_RED
            elif "Distributable" in item_label:
                cell.font = FONT_BOLD
                cell.fill = SOFT_BLUE
            else:
                cell.font = FONT_REGULAR

            if isinstance(val, float):
                cell.number_format = "#,##0.0"

    # -------------------------------------------------------------
    # 3. SHEET: Operational Drivers & Segments
    # -------------------------------------------------------------
    ws_ops = wb.create_sheet(title="Operational Drivers & Segments")
    ws_ops.views.sheetView[0].showGridLines = True

    ws_ops["B2"] = "Braskem S.A. — Production Capacity & Petrochemical Segment Intelligence"
    ws_ops["B2"].font = FONT_TITLE
    ws_ops["B3"] = "Global Asset Footprint: Brazil, United States, Europe & Mexico (Etileno XXI)"
    ws_ops["B3"].font = FONT_SUBHEADER

    ops_headers = ["Asset Complex / Segment", "Geography", "Key Products Produced", "Annual Capacity (kt)", "Feedstock Type", "Operational Moat & Integration"]
    for c_idx, h in enumerate(ops_headers, start=2):
        cell = ws_ops.cell(row=5, column=c_idx, value=h)
        cell.fill = NAVY_HEADER
        cell.font = FONT_HEADER
        cell.alignment = Alignment(horizontal="center" if c_idx > 4 else "left")

    ops_rows = [
        ("Camaçari Complex (Bahia)", "Brazil (NE)", "Ethylene, Propylene, PE, PP", 1400, "Naphtha & Ethane", "First petrochemical complex in Brazil; pipeline connected to Petrobras RLAM refinery."),
        ("Triunfo Complex (Rio Grande do Sul)", "Brazil (South)", "Ethylene, PE, PP", 1450, "Naphtha", "Supplies high-value agricultural and packaging converters in Mercosur."),
        ("São Paulo / ABC Complex", "Brazil (SE)", "Ethylene, PE, PP", 700, "Naphtha", "Supplies automotive and industrial industrial heartland of São Paulo."),
        ("Duque de Caxias Complex (Rio de Janeiro)", "Brazil (SE)", "Ethylene, Polyethylene", 520, "Refinery Gas / Ethane", "Integrated with Petrobras REDUC refinery and pre-salt gas processing."),
        ("United States PP Fleet (5 Plants)", "USA (TX, PA, WV)", "Polypropylene (PP)", 2100, "Refinery / PGP", "#1 PP producer in the US; high-margin specialty and polymer impact copolymers."),
        ("European PP Plants (2 Plants)", "Germany (Schkopau, Wesseling)", "Polypropylene (PP)", 540, "Propylene", "Automotive and technical applications across Northern/Central Europe."),
        ("Braskem Idesa (Etileno XXI - 75% JV)", "Mexico (Veracruz)", "Ethylene, Polyethylene", 1050, "Ethane", "Restructured project debt cut from $2.5B to $1.6B in Aug 2026; ethane import terminal active."),
        ("Bio-Polymers 'I'm green' Plant", "Brazil (Triunfo)", "Bio-Polyethylene (Green PE)", 260, "Sugarcane Ethanol", "World market leader in renewable bio-PE; commands 20-30% price premium over fossil PE.")
    ]

    for r_idx, rvals in enumerate(ops_rows, start=6):
        for c_idx, val in enumerate(rvals, start=2):
            cell = ws_ops.cell(row=r_idx, column=c_idx, value=val)
            cell.border = THIN_BORDER
            cell.font = FONT_REGULAR
            if c_idx == 5:
                cell.number_format = "#,##0"
                cell.alignment = Alignment(horizontal="right")

    # Auto-adjust column widths across all sheets
    for ws in [ws_memo, ws_rec, ws_ops]:
        for col in ws.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                if cell.value:
                    val_str = str(cell.value)
                    if len(val_str) > max_len and len(val_str) < 80:
                        max_len = len(val_str)
            ws.column_dimensions[col_letter].width = max(max_len + 3, 12)

    out_path = "models/Braskem_Credit_Model.xlsx"
    wb.save(out_path)
    print(f"Braskem Excel Credit Model generated at: {out_path}")

if __name__ == "__main__":
    build_braskem_model()
