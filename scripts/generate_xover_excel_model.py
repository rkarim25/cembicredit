#!/usr/bin/env python3
"""
generate_xover_excel_model.py
Generates an institutional-grade, formula-driven Excel model for iTraxx Europe Crossover
USD Investor PnL & Currency Risk Modeler with live formulas, historical lookups, and 2D scenario matrix.
"""

import json
from datetime import datetime
from pathlib import Path
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import ColorScaleRule

ROOT = Path(__file__).resolve().parent.parent
DATA_JSON = ROOT / "credit_data.json"
MODELS_DIR = ROOT / "models"
OUTPUT_XLSX_MODELS = MODELS_DIR / "iTraxx_Xover_USD_Investor_Model.xlsx"
OUTPUT_XLSX_ROOT = ROOT / "iTraxx_Xover_USD_Investor_Model.xlsx"

def load_credit_data():
    with open(DATA_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def build_excel_model():
    print("Building iTraxx Europe Crossover USD Investor Excel Model...")
    data = load_credit_data()
    history = data.get("history", [])

    wb = openpyxl.Workbook()
    # Default sheet
    ws_model = wb.active
    ws_model.title = "Xover_USD_Investor_Model"
    ws_data = wb.create_sheet(title="Historical_Data")
    ws_formulas = wb.create_sheet(title="Attribution_Formulas")

    # Ensure grid lines are visible
    ws_model.views.sheetView[0].showGridLines = True
    ws_data.views.sheetView[0].showGridLines = True
    ws_formulas.views.sheetView[0].showGridLines = True

    # Palette
    NAVY = "0F2B5C"
    WHITE = "FFFFFF"
    ICE_BLUE = "E8EDF5"
    LIGHT_GRAY = "F5F5F7"
    INPUT_FILL = "F0F4FA"
    HIGHLIGHT_GREEN = "E6F4EA"
    BORDER_COLOR = "D0D7DE"
    ACCENT_BLUE = "0071E3"
    MUTED_GRAY = "6E6E73"

    font_title = Font(name="Segoe UI", size=15, bold=True, color=WHITE)
    font_sub = Font(name="Segoe UI", size=10, italic=True, color="DDE4EE")
    font_sec_head = Font(name="Segoe UI", size=11, bold=True, color=NAVY)
    font_bold = Font(name="Segoe UI", size=10, bold=True, color="1D1D1F")
    font_regular = Font(name="Segoe UI", size=10, color="1D1D1F")
    font_muted = Font(name="Segoe UI", size=9, italic=True, color=MUTED_GRAY)
    font_input = Font(name="Segoe UI", size=10, bold=True, color="004085")

    fill_navy = PatternFill(start_color=NAVY, end_color=NAVY, fill_type="solid")
    fill_ice = PatternFill(start_color=ICE_BLUE, end_color=ICE_BLUE, fill_type="solid")
    fill_input = PatternFill(start_color=INPUT_FILL, end_color=INPUT_FILL, fill_type="solid")
    fill_summary = PatternFill(start_color="F2F7FF", end_color="F2F7FF", fill_type="solid")

    thin_border = Side(style="thin", color=BORDER_COLOR)
    double_bottom = Side(style="double", color=NAVY)
    thick_navy = Side(style="medium", color=NAVY)

    border_cell = Border(left=thin_border, right=thin_border, top=thin_border, bottom=thin_border)
    border_total = Border(top=thin_border, bottom=double_bottom, left=thin_border, right=thin_border)
    border_sec_head = Border(top=thick_navy, bottom=thick_navy, left=thin_border, right=thin_border)

    align_left = Alignment(horizontal="left", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")
    align_center = Alignment(horizontal="center", vertical="center")

    # =========================================================================
    # TAB 1: Xover_USD_Investor_Model
    # =========================================================================

    # Title Block (Rows 1-3)
    ws_model.merge_cells("B2:K2")
    ws_model["B2"] = "iTraxx Europe Crossover (5Y): USD Investor P&L and Currency Risk Model"
    ws_model["B2"].font = font_title
    ws_model["B2"].fill = fill_navy
    ws_model["B2"].alignment = align_left

    ws_model.merge_cells("B3:K3")
    ws_model["B3"] = "Cross-Currency CDS Attribution · Spread Duration Sizing · FX Overlay Hedge · 2D Scenario Matrix"
    ws_model["B3"].font = font_sub
    ws_model["B3"].fill = fill_navy
    ws_model["B3"].alignment = align_left

    ws_model.row_dimensions[2].height = 25
    ws_model.row_dimensions[3].height = 18

    # Helper function to style rows
    def set_sec_header(row_idx, text):
        ws_model.merge_cells(f"B{row_idx}:F{row_idx}")
        cell = ws_model[f"B{row_idx}"]
        cell.value = text
        cell.font = font_sec_head
        cell.fill = fill_ice
        cell.alignment = align_left
        for col_letter in ["B", "C", "D", "E", "F"]:
            ws_model[f"{col_letter}{row_idx}"].border = border_sec_head
        ws_model.row_dimensions[row_idx].height = 22

    # Section 1: Portfolio & Sizing Parameters (Rows 5-19)
    set_sec_header(5, "1. PORTFOLIO & POSITION SIZING PARAMETERS")

    sizing_rows = [
        (6, "Portfolio NAV (USD)", 100000000, "$#,##0", "Total USD Portfolio Base Capital", True),
        (7, "Position Stance (Underlying CDS)", "SELL", "@", "SELL = Long Risk [LONG EUR / SHORT USD]. BUY = Short Risk [SHORT EUR / LONG USD]", True),
        (8, "Target Spread Duration Contribution", 0.50, '0.00" yrs"', "Target portfolio spread duration contribution (years)", True),
        (9, "Benchmark Xover Spread Duration", 4.30, '0.00" yrs"', "Standard 5-year iTraxx Crossover spread duration", True),
        (10, "FX Hedge Ratio (% of Portfolio)", 0.10, "0.0%", "Overlay currency hedge sized as % of portfolio NAV", True),
        (11, "FX Hedge Stance (Overlay Forward)", "SHORT EUR", "@", "SHORT EUR = Sell EUR / Buy USD [SHORT EUR, LONG USD]. LONG EUR = Buy EUR / Sell USD [LONG EUR, SHORT USD]", True),
    ]

    for r_idx, label, val, num_fmt, note, is_input in sizing_rows:
        ws_model[f"B{r_idx}"] = label
        ws_model[f"B{r_idx}"].font = font_bold
        ws_model[f"B{r_idx}"].border = border_cell

        ws_model[f"C{r_idx}"] = val
        ws_model[f"C{r_idx}"].font = font_input if is_input else font_bold
        ws_model[f"C{r_idx}"].number_format = num_fmt
        ws_model[f"C{r_idx}"].alignment = align_right
        ws_model[f"C{r_idx}"].border = border_cell
        if is_input:
            ws_model[f"C{r_idx}"].fill = fill_input

        ws_model.merge_cells(f"D{r_idx}:F{r_idx}")
        ws_model[f"D{r_idx}"] = note
        ws_model[f"D{r_idx}"].font = font_muted
        ws_model[f"D{r_idx}"].alignment = align_left
        for col_l in ["D", "E", "F"]:
            ws_model[f"{col_l}{r_idx}"].border = border_cell

    # Sizing Outputs Sub-Header
    ws_model.merge_cells("B12:F12")
    ws_model["B12"] = "Implied Sizing & Risk Sensitivities (Formulas)"
    ws_model["B12"].font = Font(name="Segoe UI", size=9, bold=True, color=MUTED_GRAY)
    ws_model["B12"].alignment = align_left
    for col_l in ["B", "C", "D", "E", "F"]:
        ws_model[f"{col_l}12"].border = border_cell

    calc_sizing = [
        (13, "Implied USD Notional Equivalent", "=(C6*C8)/C9", "$#,##0", "= (NAV * Target_SD) / Benchmark_SD"),
        (14, "Implied EUR CDS Notional [EUR ASSET]", "=C13/C27", "€#,##0", "= USD_Notional / Entry_EURUSD (Asset risk held in EUR: Long EUR when Selling)"),
        (15, "Position DV01 (EUR)", "=C14*C9*0.0001", "€#,##0", "= EUR_Notional * Benchmark_SD * 1bp"),
        (16, "Position DV01 (USD)", "=C15*C27", "$#,##0", "= EUR_DV01 * Entry_EURUSD"),
        (17, "Portfolio Spread Sensitivity", "=(C16/C6)*10000", '0.00" bps/bp"', "= (USD_DV01 / NAV) * 10,000 (bps return per 1 bp move)"),
        (18, "FX Hedge Notional (USD)", "=C6*C10", "$#,##0", "= NAV * FX_Hedge_Pct"),
        (19, "FX Hedge Notional (EUR) [FORWARD OVERLAY]", "=C18/C27", "€#,##0", "= Hedge_USD / Entry_EURUSD (Forward hedge selling EUR when SHORT EUR)"),
        (20, "Portfolio Net Currency Exposure (EUR)", '=IF(C7="SELL", C14, -C14) + IF(C11="SHORT EUR", -C19, IF(C11="LONG EUR", C19, 0))', '+€#,##0;-€#,##0;€0', "= Net EUR Exposure. Positive = Net LONG EUR / SHORT USD; Negative = Net SHORT EUR / LONG USD"),
    ]

    for r_idx, label, formula, num_fmt, note in calc_sizing:
        ws_model[f"B{r_idx}"] = label
        ws_model[f"B{r_idx}"].font = font_regular
        ws_model[f"B{r_idx}"].border = border_cell

        ws_model[f"C{r_idx}"] = formula
        ws_model[f"C{r_idx}"].font = font_bold
        ws_model[f"C{r_idx}"].number_format = num_fmt
        ws_model[f"C{r_idx}"].alignment = align_right
        ws_model[f"C{r_idx}"].border = border_cell

        ws_model.merge_cells(f"D{r_idx}:F{r_idx}")
        ws_model[f"D{r_idx}"] = note
        ws_model[f"D{r_idx}"].font = font_muted
        ws_model[f"D{r_idx}"].alignment = align_left
        for col_l in ["D", "E", "F"]:
            ws_model[f"{col_l}{r_idx}"].border = border_cell

    # Section 2: Trade Timing & Historical Indicative Levels (Rows 21-30)
    set_sec_header(21, "2. TRADE TIMING & HISTORICAL INDICATIVE LEVELS")

    # Header Row 22
    headers_sec2 = [
        ("B22", "Metric / Parameter", align_left),
        ("C22", "Active Value", align_right),
        ("D22", "Historical Lookup", align_right),
        ("E22", "Manual Override", align_right),
        ("F22", "Formula / Lookup Rule", align_left),
    ]
    for cell_id, text, al in headers_sec2:
        ws_model[cell_id] = text
        ws_model[cell_id].font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
        ws_model[cell_id].fill = fill_ice
        ws_model[cell_id].alignment = al
        ws_model[cell_id].border = border_cell

    # Row 23: Entry Date
    ws_model["B23"] = "Trade Entry Date"
    ws_model["B23"].font = font_bold
    ws_model["B23"].border = border_cell
    ws_model["C23"] = datetime.strptime("2026-01-05", "%Y-%m-%d")
    ws_model["C23"].number_format = "YYYY-MM-DD"
    ws_model["C23"].alignment = align_center
    ws_model["C23"].fill = fill_input
    ws_model["C23"].border = border_cell
    ws_model["D23"] = "—"
    ws_model["D23"].alignment = align_center
    ws_model["D23"].border = border_cell
    ws_model["E23"] = "—"
    ws_model["E23"].alignment = align_center
    ws_model["E23"].border = border_cell
    ws_model["F23"] = "Select historical entry calibration date"
    ws_model["F23"].font = font_muted
    ws_model["F23"].border = border_cell

    # Row 24: Exit Date
    ws_model["B24"] = "Trade Exit Date"
    ws_model["B24"].font = font_bold
    ws_model["B24"].border = border_cell
    ws_model["C24"] = datetime.strptime("2026-09-24", "%Y-%m-%d")
    ws_model["C24"].number_format = "YYYY-MM-DD"
    ws_model["C24"].alignment = align_center
    ws_model["C24"].fill = fill_input
    ws_model["C24"].border = border_cell
    ws_model["D24"] = "—"
    ws_model["D24"].alignment = align_center
    ws_model["D24"].border = border_cell
    ws_model["E24"] = "—"
    ws_model["E24"].alignment = align_center
    ws_model["E24"].border = border_cell
    ws_model["F24"] = "Select historical exit / live evaluation date"
    ws_model["F24"].font = font_muted
    ws_model["F24"].border = border_cell

    # Row 25: Entry Spread
    ws_model["B25"] = "Entry Spread (bps)"
    ws_model["B25"].font = font_bold
    ws_model["B25"].border = border_cell
    ws_model["C25"] = '=IF(ISBLANK(E25), D25, E25)'
    ws_model["C25"].font = font_bold
    ws_model["C25"].number_format = '0.0" bps"'
    ws_model["C25"].alignment = align_right
    ws_model["C25"].border = border_cell
    ws_model["D25"] = '=IFERROR(INDEX(Historical_Data!$B$2:$B$600, MATCH(C23, Historical_Data!$A$2:$A$600, 0)), 252.0)'
    ws_model["D25"].number_format = '0.0" bps"'
    ws_model["D25"].alignment = align_right
    ws_model["D25"].border = border_cell
    ws_model["E25"] = None
    ws_model["E25"].font = font_input
    ws_model["E25"].fill = fill_input
    ws_model["E25"].number_format = '0.0" bps"'
    ws_model["E25"].alignment = align_right
    ws_model["E25"].border = border_cell
    ws_model["F25"] = "= IF(ISBLANK(Override), Historical_Lookup, Override)"
    ws_model["F25"].font = font_muted
    ws_model["F25"].border = border_cell

    # Row 26: Exit Spread
    ws_model["B26"] = "Exit Spread (bps)"
    ws_model["B26"].font = font_bold
    ws_model["B26"].border = border_cell
    ws_model["C26"] = '=IF(ISBLANK(E26), D26, E26)'
    ws_model["C26"].font = font_bold
    ws_model["C26"].number_format = '0.0" bps"'
    ws_model["C26"].alignment = align_right
    ws_model["C26"].border = border_cell
    ws_model["D26"] = '=IFERROR(INDEX(Historical_Data!$B$2:$B$600, MATCH(C24, Historical_Data!$A$2:$A$600, 0)), 296.0)'
    ws_model["D26"].number_format = '0.0" bps"'
    ws_model["D26"].alignment = align_right
    ws_model["D26"].border = border_cell
    ws_model["E26"] = None
    ws_model["E26"].font = font_input
    ws_model["E26"].fill = fill_input
    ws_model["E26"].number_format = '0.0" bps"'
    ws_model["E26"].alignment = align_right
    ws_model["E26"].border = border_cell
    ws_model["F26"] = "= IF(ISBLANK(Override), Historical_Lookup, Override)"
    ws_model["F26"].font = font_muted
    ws_model["F26"].border = border_cell

    # Row 27: Entry EUR/USD Rate
    ws_model["B27"] = "Entry EUR/USD Rate"
    ws_model["B27"].font = font_bold
    ws_model["B27"].border = border_cell
    ws_model["C27"] = '=IF(ISBLANK(E27), D27, E27)'
    ws_model["C27"].font = font_bold
    ws_model["C27"].number_format = "0.0000"
    ws_model["C27"].alignment = align_right
    ws_model["C27"].border = border_cell
    ws_model["D27"] = '=IFERROR(INDEX(Historical_Data!$C$2:$C$600, MATCH(C23, Historical_Data!$A$2:$A$600, 0)), 1.1705)'
    ws_model["D27"].number_format = "0.0000"
    ws_model["D27"].alignment = align_right
    ws_model["D27"].border = border_cell
    ws_model["E27"] = None
    ws_model["E27"].font = font_input
    ws_model["E27"].fill = fill_input
    ws_model["E27"].number_format = "0.0000"
    ws_model["E27"].alignment = align_right
    ws_model["E27"].border = border_cell
    ws_model["F27"] = "= IF(ISBLANK(Override), Historical_Lookup, Override)"
    ws_model["F27"].font = font_muted
    ws_model["F27"].border = border_cell

    # Row 28: Exit EUR/USD Rate
    ws_model["B28"] = "Exit EUR/USD Rate"
    ws_model["B28"].font = font_bold
    ws_model["B28"].border = border_cell
    ws_model["C28"] = '=IF(ISBLANK(E28), D28, E28)'
    ws_model["C28"].font = font_bold
    ws_model["C28"].number_format = "0.0000"
    ws_model["C28"].alignment = align_right
    ws_model["C28"].border = border_cell
    ws_model["D28"] = '=IFERROR(INDEX(Historical_Data!$C$2:$C$600, MATCH(C24, Historical_Data!$A$2:$A$600, 0)), 1.1392)'
    ws_model["D28"].number_format = "0.0000"
    ws_model["D28"].alignment = align_right
    ws_model["D28"].border = border_cell
    ws_model["E28"] = None
    ws_model["E28"].font = font_input
    ws_model["E28"].fill = fill_input
    ws_model["E28"].number_format = "0.0000"
    ws_model["E28"].alignment = align_right
    ws_model["E28"].border = border_cell
    ws_model["F28"] = "= IF(ISBLANK(Override), Historical_Lookup, Override)"
    ws_model["F28"].font = font_muted
    ws_model["F28"].border = border_cell

    # Row 29: Annual Coupon Carry (bps)
    ws_model["B29"] = "Annual Coupon Carry (bps)"
    ws_model["B29"].font = font_bold
    ws_model["B29"].border = border_cell
    ws_model["C29"] = '=IF(ISBLANK(E29), D29, E29)'
    ws_model["C29"].font = font_bold
    ws_model["C29"].number_format = '0.0" bps"'
    ws_model["C29"].alignment = align_right
    ws_model["C29"].border = border_cell
    ws_model["D29"] = '=C25'
    ws_model["D29"].number_format = '0.0" bps"'
    ws_model["D29"].alignment = align_right
    ws_model["D29"].border = border_cell
    ws_model["E29"] = None
    ws_model["E29"].font = font_input
    ws_model["E29"].fill = fill_input
    ws_model["E29"].number_format = '0.0" bps"'
    ws_model["E29"].alignment = align_right
    ws_model["E29"].border = border_cell
    ws_model["F29"] = "Defaults to Entry Spread (can override with fixed 500 bps)"
    ws_model["F29"].font = font_muted
    ws_model["F29"].border = border_cell

    # Row 30: Holding Period Days
    ws_model["B30"] = "Holding Period (Days)"
    ws_model["B30"].font = font_bold
    ws_model["B30"].border = border_cell
    ws_model["C30"] = '=IF(ISBLANK(E30), D30, E30)'
    ws_model["C30"].font = font_bold
    ws_model["C30"].number_format = '0" days"'
    ws_model["C30"].alignment = align_right
    ws_model["C30"].border = border_cell
    ws_model["D30"] = '=MAX(1, C24-C23)'
    ws_model["D30"].number_format = '0" days"'
    ws_model["D30"].alignment = align_right
    ws_model["D30"].border = border_cell
    ws_model["E30"] = None
    ws_model["E30"].font = font_input
    ws_model["E30"].fill = fill_input
    ws_model["E30"].number_format = '0" days"'
    ws_model["E30"].alignment = align_right
    ws_model["E30"].border = border_cell
    ws_model["F30"] = "= Exit_Date - Entry_Date (calendar days)"
    ws_model["F30"].font = font_muted
    ws_model["F30"].border = border_cell

    # Section 3: Cross-Currency PnL Attribution (Rows 32-42)
    set_sec_header(32, "3. CROSS-CURRENCY P&L ATTRIBUTION & PORTFOLIO IMPACT")

    # Header Row 33
    headers_sec3 = [
        ("B33", "P&L Attribution Component Driver", align_left),
        ("C33", "EUR Return", align_right),
        ("D33", "USD Realized", align_right),
        ("E33", "Portfolio Impact (bps)", align_right),
        ("F33", "Attribution Formula Bridge", align_left),
    ]
    for cell_id, text, al in headers_sec3:
        ws_model[cell_id] = text
        ws_model[cell_id].font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
        ws_model[cell_id].fill = fill_ice
        ws_model[cell_id].alignment = al
        ws_model[cell_id].border = border_cell

    attribution_rows = [
        (34, "Credit Capital Spread Return [EUR ASSET]",
         '=IF(C7="SELL", C14*C9*(-(C26-C25)/10000), C14*C9*((C26-C25)/10000))',
         '=C34*C28',
         '=(D34/C6)*10000',
         '= EUR_Notional * SD * (-Δs) * Exit_FX'),

        (35, "CDS Running Coupon Carry [EUR CASH FLOW]",
         '=IF(C7="SELL", C14*(C29/10000)*(C30/360), -C14*(C29/10000)*(C30/360))',
         '=C35*C28',
         '=(D35/C6)*10000',
         '= EUR_Notional * Carry * (Days/360) * Exit_FX'),

        (36, "Subtotal: EUR CDS Position Return [EUR ASSET]",
         '=C34+C35',
         '=C36*C28',
         '=(D36/C6)*10000',
         '= EUR_Spread_PnL + EUR_Carry_PnL'),

        (37, "FX Translation Drag / Boost on CDS MTM [LONG EUR / SHORT USD]",
         '"—"',
         '=C36*(C28-C27)',
         '=(D37/C6)*10000',
         '= Total_EUR_CDS * (Exit_FX - Entry_FX) [EUR weakens = dollar drag]'),

        (38, "FX Overlay Hedge Return [SHORT EUR / LONG USD]",
         '"—"',
         '=IF(C11="SHORT EUR", -C19*(C28-C27), IF(C11="LONG EUR", C19*(C28-C27), 0))',
         '=(D38/C6)*10000',
         '= -Hedge_EUR * (Exit_FX - Entry_FX) [Short EUR profits if EUR weakens]'),

        (39, "NET COMBINED PORTFOLIO IMPACT [USD BASE]",
         '=C36',
         '=D36+D38',
         '=(D39/C6)*10000',
         '= (Total_USD_CDS + FX_Hedge_USD) / NAV * 10,000'),
    ]

    for r_idx, label, f_eur, f_usd, f_bps, formula_note in attribution_rows:
        is_total = (r_idx == 39)
        ws_model[f"B{r_idx}"] = label
        ws_model[f"B{r_idx}"].font = Font(name="Segoe UI", size=10, bold=is_total, color=NAVY if is_total else "1D1D1F")
        ws_model[f"B{r_idx}"].border = border_total if is_total else border_cell

        ws_model[f"C{r_idx}"] = f_eur
        ws_model[f"C{r_idx}"].font = Font(name="Segoe UI", size=10, bold=is_total)
        ws_model[f"C{r_idx}"].number_format = "€#,##0"
        ws_model[f"C{r_idx}"].alignment = align_right
        ws_model[f"C{r_idx}"].border = border_total if is_total else border_cell

        ws_model[f"D{r_idx}"] = f_usd
        ws_model[f"D{r_idx}"].font = Font(name="Segoe UI", size=10, bold=is_total, color="0071E3" if is_total else "1D1D1F")
        ws_model[f"D{r_idx}"].number_format = "$#,##0"
        ws_model[f"D{r_idx}"].alignment = align_right
        ws_model[f"D{r_idx}"].border = border_total if is_total else border_cell

        ws_model[f"E{r_idx}"] = f_bps
        ws_model[f"E{r_idx}"].font = Font(name="Segoe UI", size=11 if is_total else 10, bold=True)
        ws_model[f"E{r_idx}"].number_format = '+0.0" bps";-0.0" bps";0.0" bps"'
        ws_model[f"E{r_idx}"].alignment = align_right
        ws_model[f"E{r_idx}"].border = border_total if is_total else border_cell

        ws_model[f"F{r_idx}"] = formula_note
        ws_model[f"F{r_idx}"].font = font_muted
        ws_model[f"F{r_idx}"].border = border_total if is_total else border_cell

        if is_total:
            for col_l in ["B", "C", "D", "E", "F"]:
                ws_model[f"{col_l}{r_idx}"].fill = fill_summary

    # Diagnostic Hedge Comparison (Rows 41-42)
    diag_rows = [
        (41, "Unhedged Portfolio Return (100% Unhedged FX Exposure)", "=D36", "=E36", "Performance if 100% unhedged to currency volatility"),
        (42, "FX Overlay Hedge Alpha Contribution (Short EUR Forward Protection)", "=D38", "=E38", "Net protection / alpha delivered by currency hedge overlay"),
    ]
    for r_idx, label, f_usd, f_bps, note in diag_rows:
        ws_model[f"B{r_idx}"] = label
        ws_model[f"B{r_idx}"].font = font_bold
        ws_model[f"B{r_idx}"].border = border_cell

        ws_model[f"C{r_idx}"] = "—"
        ws_model[f"C{r_idx}"].alignment = align_center
        ws_model[f"C{r_idx}"].border = border_cell

        ws_model[f"D{r_idx}"] = f_usd
        ws_model[f"D{r_idx}"].font = font_bold
        ws_model[f"D{r_idx}"].number_format = "$#,##0"
        ws_model[f"D{r_idx}"].alignment = align_right
        ws_model[f"D{r_idx}"].border = border_cell

        ws_model[f"E{r_idx}"] = f_bps
        ws_model[f"E{r_idx}"].font = font_bold
        ws_model[f"E{r_idx}"].number_format = '+0.0" bps";-0.0" bps";0.0" bps"'
        ws_model[f"E{r_idx}"].alignment = align_right
        ws_model[f"E{r_idx}"].border = border_cell

        ws_model[f"F{r_idx}"] = note
        ws_model[f"F{r_idx}"].font = font_muted
        ws_model[f"F{r_idx}"].border = border_cell

    # Section 4: Forward Scenario Sizing & Baseline Inputs (Rows 44-52)
    set_sec_header(44, "4. FORWARD SCENARIO SIZING & BASELINE INPUTS")

    scen_inputs = [
        (45, "Scenario Target Spread Duration (yrs)", "=C8", '0.00" yrs"', "Portfolio spread duration target (defaults to C8, overridable)", True),
        (46, "Scenario Benchmark Spread Duration (yrs)", "=C9", '0.00" yrs"', "Benchmark iTraxx Xover 5Y spread duration", False),
        (47, "Scenario Entry Spread Level (bps)", "=C26", '0.0" bps"', "Starting Xover spread level (defaults to exit spread C26, overridable)", True),
        (48, "Scenario Base EUR/USD Exchange Rate", "=C28", "0.0000", "Starting EUR/USD exchange rate (defaults to exit FX C28, overridable)", True),
        (49, "Scenario Default Time Horizon (Days)", 90, '0" days"', "Scenario evaluation holding horizon in calendar days", True),
        (50, "Scenario Implied USD Notional", "=($C$6*C45)/C46", "$#,##0", "= (NAV * Scenario_SD) / Benchmark_SD", False),
        (51, "Scenario Implied EUR CDS Notional", "=C50/C48", "€#,##0", "= Scenario_USD_Notional / Base_EURUSD", False),
        (52, "Scenario Spread DV01 (USD)", "=(C51*C46*0.0001)*C48", "$#,##0", "= (EUR_Notional * Benchmark_SD * 1bp) * Base_EURUSD", False),
    ]

    for r_idx, label, val_or_f, num_fmt, note, is_input in scen_inputs:
        ws_model[f"B{r_idx}"] = label
        ws_model[f"B{r_idx}"].font = font_bold
        ws_model[f"B{r_idx}"].border = border_cell

        ws_model[f"C{r_idx}"] = val_or_f
        ws_model[f"C{r_idx}"].font = font_input if is_input else font_bold
        ws_model[f"C{r_idx}"].number_format = num_fmt
        ws_model[f"C{r_idx}"].alignment = align_right
        ws_model[f"C{r_idx}"].border = border_cell
        if is_input:
            ws_model[f"C{r_idx}"].fill = fill_input

        ws_model.merge_cells(f"D{r_idx}:F{r_idx}")
        ws_model[f"D{r_idx}"] = note
        ws_model[f"D{r_idx}"].font = font_muted
        ws_model[f"D{r_idx}"].alignment = align_left
        for col_l in ["D", "E", "F"]:
            ws_model[f"{col_l}{r_idx}"].border = border_cell

    # Section 5: Sensible Macro Regimes & Scenario Table (Rows 54-66)
    ws_model.merge_cells("B54:N54")
    ws_model["B54"] = "5. MULTI-SCENARIO ANALYSIS: SENSIBLE REGIMES & DIRECT OVERRIDES"
    ws_model["B54"].font = font_sec_head
    ws_model["B54"].fill = fill_ice
    ws_model["B54"].alignment = align_left
    for col_l in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]:
        ws_model[f"{col_l}54"].border = border_sec_head
    ws_model.row_dimensions[54].height = 22

    ws_model.merge_cells("B55:N55")
    ws_model["B55"] = "Simulate joint portfolio return across spread moves, currency shifts, and time horizons. Directly edit Spread Move (Col C), EUR Move (Col E), or Horizon (Col G) in any row."
    ws_model["B55"].font = font_muted
    ws_model["B55"].alignment = align_left
    for col_l in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]:
        ws_model[f"{col_l}55"].border = border_cell

    # Header Row 56
    scen_headers = [
        ("B56", "Scenario Regime & Thesis", align_left),
        ("C56", "Spread Move (bps)", align_right),
        ("D56", "Exit Spread", align_right),
        ("E56", "EUR Move (%)", align_right),
        ("F56", "Exit EUR/USD", align_right),
        ("G56", "Horizon (Days)", align_right),
        ("H56", "Spread Capital ($)", align_right),
        ("I56", "Carry Yield ($)", align_right),
        ("J56", "FX Trans ($)", align_right),
        ("K56", "FX Hedge ($)", align_right),
        ("L56", "Total Net USD ($)", align_right),
        ("M56", "Total Return (bps)", align_right),
        ("N56", "Unhedged (bps)", align_right),
    ]
    for cell_id, text, al in scen_headers:
        ws_model[cell_id] = text
        ws_model[cell_id].font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
        ws_model[cell_id].fill = fill_ice
        ws_model[cell_id].alignment = al
        ws_model[cell_id].border = border_cell

    # 9 Sensible Scenarios
    scenarios = [
        ("Status Quo (Pure Carry Harvest)", 0, 0.0, 90),
        ("Soft Landing (Mild Compression)", -25, 0.015, 90),
        ("Aggressive Risk-On Rally", -50, 0.035, 180),
        ("Mild European Decompression", 35, -0.025, 90),
        ("European Stagflation / Widening", 75, -0.05, 90),
        ("Severe Crisis / Blowout Shock", 130, -0.08, 60),
        ("Isolated FX Shock (Dollar Spike)", 0, -0.05, 90),
        ("Custom Scenario A", -35, -0.02, 90),
        ("Custom Scenario B", 50, 0.0, 120),
    ]

    for idx, (scen_name, sp_move, fx_move, days) in enumerate(scenarios):
        row = 57 + idx
        # Name
        ws_model[f"B{row}"] = scen_name
        ws_model[f"B{row}"].font = font_bold
        ws_model[f"B{row}"].border = border_cell

        # Spread Move (Input)
        ws_model[f"C{row}"] = sp_move
        ws_model[f"C{row}"].font = font_input
        ws_model[f"C{row}"].fill = fill_input
        ws_model[f"C{row}"].number_format = '+0.0" bps";-0.0" bps";0.0" bps"'
        ws_model[f"C{row}"].alignment = align_right
        ws_model[f"C{row}"].border = border_cell

        # Exit Spread (Formula)
        ws_model[f"D{row}"] = f"=$C$47+C{row}"
        ws_model[f"D{row}"].font = font_bold
        ws_model[f"D{row}"].number_format = '0.0" bps"'
        ws_model[f"D{row}"].alignment = align_right
        ws_model[f"D{row}"].border = border_cell

        # EUR Move (Input)
        ws_model[f"E{row}"] = fx_move
        ws_model[f"E{row}"].font = font_input
        ws_model[f"E{row}"].fill = fill_input
        ws_model[f"E{row}"].number_format = "+0.0%;-0.0%;0.0%"
        ws_model[f"E{row}"].alignment = align_right
        ws_model[f"E{row}"].border = border_cell

        # Exit EUR/USD (Formula)
        ws_model[f"F{row}"] = f"=$C$48*(1+E{row})"
        ws_model[f"F{row}"].font = font_bold
        ws_model[f"F{row}"].number_format = "0.0000"
        ws_model[f"F{row}"].alignment = align_right
        ws_model[f"F{row}"].border = border_cell

        # Horizon Days (Input)
        ws_model[f"G{row}"] = days
        ws_model[f"G{row}"].font = font_input
        ws_model[f"G{row}"].fill = fill_input
        ws_model[f"G{row}"].number_format = '0" days"'
        ws_model[f"G{row}"].alignment = align_right
        ws_model[f"G{row}"].border = border_cell

        # Spread Capital ($)
        ws_model[f"H{row}"] = f'=IF($C$7="SELL", $C$51*$C$46*(-C{row}/10000), $C$51*$C$46*(C{row}/10000))*F{row}'
        ws_model[f"H{row}"].font = font_regular
        ws_model[f"H{row}"].number_format = "$#,##0;($#,##0);$0"
        ws_model[f"H{row}"].alignment = align_right
        ws_model[f"H{row}"].border = border_cell

        # Carry Yield ($)
        ws_model[f"I{row}"] = f'=IF($C$7="SELL", $C$51*($C$47/10000)*(G{row}/360), -$C$51*($C$47/10000)*(G{row}/360))*F{row}'
        ws_model[f"I{row}"].font = font_regular
        ws_model[f"I{row}"].number_format = "$#,##0;($#,##0);$0"
        ws_model[f"I{row}"].alignment = align_right
        ws_model[f"I{row}"].border = border_cell

        # FX Trans ($)
        ws_model[f"J{row}"] = f'=(IF($C$7="SELL", $C$51*$C$46*(-C{row}/10000)+$C$51*($C$47/10000)*(G{row}/360), -$C$51*$C$46*(C{row}/10000)-$C$51*($C$47/10000)*(G{row}/360)))*(F{row}-$C$48)'
        ws_model[f"J{row}"].font = font_muted
        ws_model[f"J{row}"].number_format = "$#,##0;($#,##0);$0"
        ws_model[f"J{row}"].alignment = align_right
        ws_model[f"J{row}"].border = border_cell

        # FX Hedge ($)
        ws_model[f"K{row}"] = f'=IF($C$11="SHORT EUR", -$C$19*(F{row}-$C$48), IF($C$11="LONG EUR", $C$19*(F{row}-$C$48), 0))'
        ws_model[f"K{row}"].font = font_regular
        ws_model[f"K{row}"].number_format = "$#,##0;($#,##0);$0"
        ws_model[f"K{row}"].alignment = align_right
        ws_model[f"K{row}"].border = border_cell

        # Total Net USD ($)
        ws_model[f"L{row}"] = f"=H{row}+I{row}+K{row}"
        ws_model[f"L{row}"].font = font_bold
        ws_model[f"L{row}"].number_format = "$#,##0;($#,##0);$0"
        ws_model[f"L{row}"].alignment = align_right
        ws_model[f"L{row}"].border = border_cell

        # Total Return (bps)
        ws_model[f"M{row}"] = f"=(L{row}/$C$6)*10000"
        ws_model[f"M{row}"].font = Font(name="Segoe UI", size=10, bold=True)
        ws_model[f"M{row}"].number_format = '+0.0" bps";-0.0" bps";0.0" bps"'
        ws_model[f"M{row}"].alignment = align_right
        ws_model[f"M{row}"].border = border_cell

        # Unhedged Return (bps)
        ws_model[f"N{row}"] = f"=((H{row}+I{row})/$C$6)*10000"
        ws_model[f"N{row}"].font = font_muted
        ws_model[f"N{row}"].number_format = '+0.0" bps";-0.0" bps";0.0" bps"'
        ws_model[f"N{row}"].alignment = align_right
        ws_model[f"N{row}"].border = border_cell

    # Section 6: 2D Scenario Sensitivity Matrix (Rows 68-80)
    ws_model.merge_cells("B68:K68")
    ws_model["B68"] = "6. 2D SCENARIO SENSITIVITY MATRIX (PORTFOLIO IMPACT IN BPS)"
    ws_model["B68"].font = font_sec_head
    ws_model["B68"].fill = fill_ice
    ws_model["B68"].alignment = align_left
    for col_l in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]:
        ws_model[f"{col_l}68"].border = border_sec_head
    ws_model.row_dimensions[68].height = 22

    ws_model.merge_cells("B69:K69")
    ws_model["B69"] = "Rows = Spread Shift (bps) · Columns = EUR/USD Move (%) · Holding Horizon = $C$49 days · Cell Values = Total Return in basis points (bps)"
    ws_model["B69"].font = font_muted
    ws_model["B69"].alignment = align_left
    for col_l in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]:
        ws_model[f"{col_l}69"].border = border_cell

    # Column Headers for Matrix (Row 70)
    fx_moves = [-0.10, -0.075, -0.05, -0.025, 0.0, 0.025, 0.05, 0.075, 0.10]
    spread_shifts = [-100, -75, -50, -25, 0, 25, 50, 75, 100]

    ws_model["B70"] = "Spread \\ EUR"
    ws_model["B70"].font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
    ws_model["B70"].fill = PatternFill(start_color="D6E4F0", end_color="D6E4F0", fill_type="solid")
    ws_model["B70"].alignment = align_left
    ws_model["B70"].border = border_cell

    matrix_cols = ["C", "D", "E", "F", "G", "H", "I", "J", "K"]
    for idx, fx in enumerate(fx_moves):
        c_letter = matrix_cols[idx]
        cell = ws_model[f"{c_letter}70"]
        cell.value = fx
        cell.font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
        cell.number_format = "+0.0%;-0.0%;0.0%"
        cell.alignment = align_center
        cell.fill = fill_ice
        cell.border = border_cell

    # Matrix Body (Rows 71-79)
    for r_idx, s_shift in enumerate(spread_shifts):
        row_num = 71 + r_idx
        # Row Header
        ws_model[f"B{row_num}"] = s_shift
        ws_model[f"B{row_num}"].font = Font(name="Segoe UI", size=9, bold=True, color=NAVY)
        ws_model[f"B{row_num}"].number_format = '+0" bps";-0" bps";0" bps"'
        ws_model[f"B{row_num}"].fill = fill_ice
        ws_model[f"B{row_num}"].alignment = align_left
        ws_model[f"B{row_num}"].border = border_cell

        for c_idx, fx in enumerate(fx_moves):
            c_letter = matrix_cols[c_idx]
            formula = (
                f"=(((IF($C$7=\"SELL\", $C$51*$C$46*(-$B{row_num}/10000), $C$51*$C$46*($B{row_num}/10000))"
                f"+ IF($C$7=\"SELL\", $C$51*($C$47/10000)*($C$49/360), -$C$51*($C$47/10000)*($C$49/360)))"
                f"* ($C$48*(1+{c_letter}$70))"
                f"+ IF($C$11=\"SHORT EUR\", -$C$19*($C$48*(1+{c_letter}$70)-$C$48),"
                f"IF($C$11=\"LONG EUR\", $C$19*($C$48*(1+{c_letter}$70)-$C$48), 0)))"
                f"/ $C$6) * 10000"
            )
            cell = ws_model[f"{c_letter}{row_num}"]
            cell.value = formula
            cell.font = Font(name="Segoe UI", size=9, bold=True)
            cell.number_format = '+0.0;-0.0;0.0'
            cell.alignment = align_center
            cell.border = border_cell

    # Apply 3-color conditional formatting to matrix
    color_scale = ColorScaleRule(
        start_type="num", start_value=-60, start_color="FADBD8", # soft red
        mid_type="num", mid_value=0, mid_color="FFFFFF",         # white
        end_type="num", end_value=60, end_color="D4EFDF"         # soft green
    )
    ws_model.conditional_formatting.add("C71:K79", color_scale)

    # Set column widths for Tab 1
    col_widths = {
        "A": 3,
        "B": 38,
        "C": 18,
        "D": 16,
        "E": 16,
        "F": 16,
        "G": 14,
        "H": 18,
        "I": 18,
        "J": 18,
        "K": 18,
        "L": 18,
        "M": 18,
        "N": 16,
    }
    for c_letter, w in col_widths.items():
        ws_model.column_dimensions[c_letter].width = w

    # =========================================================================
    # TAB 2: Historical_Data
    # =========================================================================
    ws_data.row_dimensions[1].height = 24
    hist_headers = [
        ("A1", "Date", 14),
        ("B1", "iTraxx_Europe_Xover_5Y_bps", 28),
        ("C1", "EUR_USD_Exchange_Rate", 24),
        ("D1", "CDX_NA_HY_5Y_bps", 22),
        ("E1", "CDX_EM_5Y_bps", 20),
        ("F1", "Transatlantic_Basis_bps", 24),
    ]
    for cell_id, text, width in hist_headers:
        ws_data[cell_id] = text
        ws_data[cell_id].font = Font(name="Segoe UI", size=10, bold=True, color=WHITE)
        ws_data[cell_id].fill = fill_navy
        ws_data[cell_id].alignment = align_center
        ws_data[cell_id].border = border_cell
        col_letter = cell_id[0]
        ws_data.column_dimensions[col_letter].width = width

    for r_idx, row in enumerate(history):
        row_num = r_idx + 2
        dt_val = datetime.strptime(row["date"], "%Y-%m-%d")
        ws_data[f"A{row_num}"] = dt_val
        ws_data[f"A{row_num}"].number_format = "YYYY-MM-DD"
        ws_data[f"A{row_num}"].alignment = align_center
        ws_data[f"A{row_num}"].border = border_cell

        ws_data[f"B{row_num}"] = float(row.get("itraxx_xover", 296.0))
        ws_data[f"B{row_num}"].number_format = "0.0"
        ws_data[f"B{row_num}"].alignment = align_right
        ws_data[f"B{row_num}"].border = border_cell

        ws_data[f"C{row_num}"] = float(row.get("eur_usd", 1.1392))
        ws_data[f"C{row_num}"].number_format = "0.0000"
        ws_data[f"C{row_num}"].alignment = align_right
        ws_data[f"C{row_num}"].border = border_cell

        ws_data[f"D{row_num}"] = float(row.get("cdx_na_hy", 322.5))
        ws_data[f"D{row_num}"].number_format = "0.0"
        ws_data[f"D{row_num}"].alignment = align_right
        ws_data[f"D{row_num}"].border = border_cell

        ws_data[f"E{row_num}"] = float(row.get("cdx_em", 174.5))
        ws_data[f"E{row_num}"].number_format = "0.0"
        ws_data[f"E{row_num}"].alignment = align_right
        ws_data[f"E{row_num}"].border = border_cell

        ws_data[f"F{row_num}"] = float(row.get("basis_hy_xover", 26.5))
        ws_data[f"F{row_num}"].number_format = "0.0"
        ws_data[f"F{row_num}"].alignment = align_right
        ws_data[f"F{row_num}"].border = border_cell

    # =========================================================================
    # TAB 3: Attribution_Formulas (Methodology & Mathematical Proofs)
    # =========================================================================
    ws_formulas.merge_cells("B2:G2")
    ws_formulas["B2"] = "Cross-Currency CDS Attribution & Risk Framework Documentation"
    ws_formulas["B2"].font = font_title
    ws_formulas["B2"].fill = fill_navy
    ws_formulas.row_dimensions[2].height = 24

    ws_formulas.column_dimensions["B"].width = 6
    ws_formulas.column_dimensions["C"].width = 30
    ws_formulas.column_dimensions["D"].width = 45
    ws_formulas.column_dimensions["E"].width = 50

    doc_sections = [
        (4, "1. Sizing via Portfolio Spread Duration", [
            ("Target USD Notional", "Notional_USD = (NAV_USD * Target_SD) / Benchmark_SD", "Scales position so 1 bp move in Xover delivers Target_SD bps on portfolio NAV."),
            ("Implied EUR Notional", "Notional_EUR = Notional_USD / EURUSD_Entry", "Converts target USD exposure into EUR-denominated CDS contract notional."),
            ("EUR DV01", "DV01_EUR = Notional_EUR * Benchmark_SD * 0.0001", "Euro change in CDS contract value per 1 bp change in credit spread."),
            ("USD DV01", "DV01_USD = DV01_EUR * EURUSD_Entry", "USD change in CDS contract value per 1 bp change in credit spread."),
            ("Portfolio Sensitivity", "Port_Sens (bps) = (DV01_USD / NAV_USD) * 10,000", "Must equal Target Spread Duration (e.g. 0.50 bps return per 1 bp move)."),
        ]),
        (12, "2. Credit Default Swap (CDS) Cash Flows & Valuation", [
            ("Credit Capital Return (EUR)", "Sell Protection: Notional_EUR * SD * -(Exit_Spread - Entry_Spread) / 10,000", "Capital gain from credit spread compression (tightening)."),
            ("Credit Capital Return (EUR)", "Buy Protection: Notional_EUR * SD * +(Exit_Spread - Entry_Spread) / 10,000", "Capital gain from credit spread decompression (widening / hedge)."),
            ("Coupon Carry Return (EUR)", "Sell Protection: +Notional_EUR * (Carry_Spread / 10,000) * (Days / 360)", "Accrued running coupon carry received over holding period (30/360)."),
            ("Coupon Carry Return (EUR)", "Buy Protection: -Notional_EUR * (Carry_Spread / 10,000) * (Days / 360)", "Accrued running coupon carry paid over holding period (30/360)."),
            ("Total EUR CDS Return", "Total_EUR_CDS = Spread_Return_EUR + Carry_Return_EUR", "Total mark-to-market and cash flow profit denominated in EUR."),
        ]),
        (20, "3. Currency Translation & FX Risk for a USD Investor", [
            ("Base USD CDS MTM", "Base_USD_MTM = Total_EUR_CDS * EURUSD_Entry", "Dollar value of EUR profits if converted at original entry exchange rate."),
            ("Realized USD CDS MTM", "Realized_USD_MTM = Total_EUR_CDS * EURUSD_Exit", "Dollar value of EUR profits converted at prevailing exit exchange rate."),
            ("FX Translation Effect", "FX_Translation_USD = Total_EUR_CDS * (EURUSD_Exit - EURUSD_Entry)", "Currency drag or boost on EUR profits resulting from EUR/USD movements."),
        ]),
        (26, "4. FX Overlay Hedge (% of Portfolio NAV)", [
            ("Hedge Notional (USD)", "Hedge_USD = NAV_USD * Hedge_Ratio_Pct", "Discretionary currency forward overlay sized as % of portfolio base capital."),
            ("Hedge Notional (EUR)", "Hedge_EUR = Hedge_USD / EURUSD_Entry", "Underlying EUR notional of currency forward contract."),
            ("Short EUR Hedge P&L", "PnL_Hedge_USD = -Hedge_EUR * (EURUSD_Exit - EURUSD_Entry)", "Gains in USD when EUR depreciates, protecting against currency slide."),
            ("Long EUR Hedge P&L", "PnL_Hedge_USD = +Hedge_EUR * (EURUSD_Exit - EURUSD_Entry)", "Gains in USD when EUR appreciates."),
        ]),
        (33, "5. Combined Portfolio Return (Basis Points)", [
            ("Total Portfolio P&L (USD)", "Total_USD = Realized_USD_CDS + PnL_Hedge_USD", "Net combined dollar return across credit spread, carry, translation, and FX hedge."),
            ("Net Portfolio Return (bps)", "Portfolio_Return_bps = (Total_USD / NAV_USD) * 10,000", "Total basis points generated on portfolio base capital."),
        ]),
        (40, "6. Currency Polarity Framework (Which Currency is LONG vs. SHORT)", [
            ("Sell Protection (Long Risk)", "Underlying CDS is LONG EUR / SHORT USD", "Investor receives EUR premium; holding EUR credit asset. EUR slide hurts USD P&L."),
            ("Buy Protection (Short Risk)", "Underlying CDS is SHORT EUR / LONG USD", "Investor pays EUR premium; long EUR credit default payout."),
            ("Short EUR Forward Hedge", "FX Overlay is SHORT EUR / LONG USD", "Sells EUR forward to buy USD. Profits in USD when EUR depreciates."),
            ("Long EUR Forward Hedge", "FX Overlay is LONG EUR / SHORT USD", "Buys EUR forward against USD. Profits in USD when EUR appreciates."),
            ("Net Portfolio Currency Stance", "Net_EUR = CDS_EUR_Exposure + FX_Hedge_EUR", "Net currency exposure remaining after overlay hedge (Long EUR if > 0)."),
        ]),
    ]

    for sec_row, sec_title, items in doc_sections:
        ws_formulas.merge_cells(f"C{sec_row}:E{sec_row}")
        ws_formulas[f"C{sec_row}"] = sec_title
        ws_formulas[f"C{sec_row}"].font = font_sec_head
        ws_formulas[f"C{sec_row}"].fill = fill_ice
        for col_l in ["C", "D", "E"]:
            ws_formulas[f"{col_l}{sec_row}"].border = border_sec_head

        for i, (term, eq, desc) in enumerate(items):
            cur_r = sec_row + 1 + i
            ws_formulas[f"C{cur_r}"] = term
            ws_formulas[f"C{cur_r}"].font = font_bold
            ws_formulas[f"C{cur_r}"].border = border_cell

            ws_formulas[f"D{cur_r}"] = eq
            ws_formulas[f"D{cur_r}"].font = Font(name="Consolas", size=9, bold=True, color=NAVY)
            ws_formulas[f"D{cur_r}"].border = border_cell

            ws_formulas[f"E{cur_r}"] = desc
            ws_formulas[f"E{cur_r}"].font = font_regular
            ws_formulas[f"E{cur_r}"].border = border_cell

    # Save to both destinations
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    wb.save(OUTPUT_XLSX_MODELS)
    wb.save(OUTPUT_XLSX_ROOT)
    print(f"Saved institutional model to:\n  1. {OUTPUT_XLSX_MODELS}\n  2. {OUTPUT_XLSX_ROOT}")

if __name__ == "__main__":
    build_excel_model()
