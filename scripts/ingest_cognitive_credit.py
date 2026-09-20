r"""
ingest_cognitive_credit.py — Ingestion pipeline for Cognitive Credit Excel model downloads.

Detects and parses Cognitive Credit exported workbooks (e.g. from C:\Users\Reza Karim\Downloads\cognitive-credit-*-financials-*.xlsx),
extracts all 3 sheets ('Annual and Quarterly', 'Quarterly YTD', 'Rolling LTM'),
retains full dynamic formulas, historical/forecast periods, and segmental disclosures,
and updates the issuer's JSON dossier and models in cembicredit.
"""

import os
import sys
import glob
import json
import openpyxl
from datetime import datetime

CEMBI_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DOWNLOADS_DIR = os.path.expanduser(r'C:\Users\Reza Karim\Downloads')
ISSUERS_DIR = os.path.join(CEMBI_ROOT, 'database', 'issuers')
CC_ARCHIVE_DIR = os.path.join(CEMBI_ROOT, 'database', 'cognitive_credit_models')

os.makedirs(CC_ARCHIVE_DIR, exist_ok=True)

# Ticker / name mapping to issuer IDs in cembicredit
CC_MAPPING = {
    'zorlu': 'zorlu',
    'zorluenerji': 'zorlu',
    'liquidtech': 'liqtel',
    'liquidtelecom': 'liqtel',
    'tullow': 'tullow',
    'tullowoil': 'tullow',
    'ocp': 'ocp',
    'sasol': 'sasol',
    'dtek': 'dtek',
    'metinvest': 'metinvest',
    'tupras': 'tupras',
    'sisecam': 'sisecam',
    'turkcell': 'turkcell',
    'ttkom': 'ttkom',
    'akbank': 'akbank',
    'garanti': 'garanti',
    'isbank': 'isbank',
    'yapi': 'yapi_kredi',
    'yapikredi': 'yapi_kredi',
    'adcb': 'adcb',
    'dib': 'dib',
    'enbd': 'enbd',
    'fab': 'fab',
    'kfh': 'kfh',
    'qnb': 'qnb',
    'riyad': 'riyad',
    'snb': 'snb',
    'sabic': 'sabic',
    'sec': 'sec',
    'stc': 'stc',
    'taqa': 'taqa',
    'emaar': 'emaar',
    'damac': 'damac',
    'daralkan': 'dar_al_arkan',
    'aldar': 'aldar',
    'sobharealty': 'sobha',
    'sobha': 'sobha',
    'binghatti': 'binghatti',
    'goldfields': 'gold_fields',
    'tharisa': 'tharisa',
    'kosmos': 'kosmos',
    'sonangol': 'sonangol',
    'kazmunaygas': 'kmg',
    'qazaqgaz': 'qazaqgaz',
    'romgaz': 'romgaz',
    'hidroelectrica': 'hidro',
    'pknorlen': 'pkn',
    'pge': 'pge',
    'cez': 'cez'
}

def scan_downloads():
    pattern = os.path.join(DOWNLOADS_DIR, "cognitive-credit-*.xlsx")
    files = glob.glob(pattern)
    return sorted(files, key=os.path.getmtime, reverse=True)

def identify_issuer_from_filename(filename):
    base = os.path.basename(filename).lower()
    # E.g. cognitive-credit-zorluenerji-financials-18-Sep-2026.xlsx
    parts = base.replace('.xlsx', '').split('-')
    # look for matching token
    for p in parts:
        if p in CC_MAPPING:
            return CC_MAPPING[p]
    # Check substring
    for k, v in CC_MAPPING.items():
        if k in base:
            return v
    return None

def parse_cognitive_credit_workbook(filepath):
    """
    Parses Cognitive Credit workbook with both formula definitions and evaluated values.
    """
    print(f"Loading workbook: {filepath}")
    wb_formulas = openpyxl.load_workbook(filepath, data_only=False)
    wb_values = openpyxl.load_workbook(filepath, data_only=True)

    result = {
        'source_file': os.path.basename(filepath),
        'parsed_at': datetime.now().isoformat(),
        'sheets': {}
    }

    for sheet_name in wb_formulas.sheetnames:
        ws_f = wb_formulas[sheet_name]
        ws_v = wb_values[sheet_name]

        # Extract headers from row 1
        headers = []
        for c in range(1, ws_f.max_column + 1):
            h_val = ws_v.cell(row=1, column=c).value
            headers.append(str(h_val).strip() if h_val is not None else f"Col_{c}")

        currency_unit = headers[0] if headers else "USDmm"
        periods = [h for h in headers[1:] if h and not h.startswith("Col_")]

        rows_data = []
        formula_count = 0

        current_category = "General"
        for r in range(2, ws_f.max_row + 1):
            line_label = ws_v.cell(row=r, column=1).value
            if line_label is None:
                continue
            line_str = str(line_label).strip()
            if not line_str:
                continue

            # Check if this row is a category header
            # Category headers typically have all values None
            has_vals = any(ws_v.cell(row=r, column=c).value is not None for c in range(2, min(ws_f.max_column + 1, 10)))
            if not has_vals and len(line_str) > 2:
                current_category = line_str
                continue

            row_record = {
                'row_index': r,
                'category': current_category,
                'label': line_str,
                'values': {},
                'formulas': {}
            }

            for c_idx, period in enumerate(periods, start=2):
                if c_idx > ws_f.max_column:
                    break
                val = ws_v.cell(row=r, column=c_idx).value
                form = ws_f.cell(row=r, column=c_idx).value

                # If formula exists
                if str(form).startswith('='):
                    row_record['formulas'][period] = str(form)
                    formula_count += 1

                if isinstance(val, (int, float)):
                    row_record['values'][period] = round(val, 3)
                elif val is not None:
                    row_record['values'][period] = str(val)

            rows_data.append(row_record)

        result['sheets'][sheet_name] = {
            'currency_unit': currency_unit,
            'periods': periods,
            'row_count': len(rows_data),
            'formula_count': formula_count,
            'rows': rows_data
        }

    return result

def update_issuer_database(issuer_id, parsed_data):
    json_path = os.path.join(ISSUERS_DIR, f"{issuer_id}.json")
    if not os.path.exists(json_path):
        print(f"Warning: Issuer JSON not found: {json_path}")
        return False

    with open(json_path, 'r', encoding='utf-8') as f:
        issuer = json.load(f)

    # Attach cognitive credit detailed data
    issuer['cognitive_credit_model'] = {
        'source_file': parsed_data['source_file'],
        'ingested_at': parsed_data['parsed_at'],
        'sheets_available': list(parsed_data['sheets'].keys()),
        'summary': {}
    }

    for s_name, s_data in parsed_data['sheets'].items():
        issuer['cognitive_credit_model']['summary'][s_name] = {
            'currency_unit': s_data['currency_unit'],
            'periods': s_data['periods'],
            'row_count': s_data['row_count'],
            'formula_count': s_data['formula_count']
        }

    # Store full detailed disclosures in dedicated file to keep main JSON snappy
    detail_path = os.path.join(CC_ARCHIVE_DIR, f"{issuer_id}_cognitive_credit.json")
    with open(detail_path, 'w', encoding='utf-8') as f:
        json.dump(parsed_data, f, indent=2)

    # Reconcile key figures with Cognitive Credit Annual & Quarterly
    aq = parsed_data['sheets'].get('Annual and Quarterly')
    if aq:
        # Find Revenue, Operating Income, EBITDA, Capex, FCF in Cognitive Credit
        cc_lookup = {}
        for r in aq['rows']:
            lbl = r['label'].lower()
            cc_lookup[lbl] = r

        # Check latest LTM or FY24 values
        print(f"Cognitive Credit line items mapped: {len(cc_lookup)} rows.")

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(issuer, f, indent=2)

    print(f"Successfully updated issuer {issuer_id} ({issuer['metadata']['name']}) with Cognitive Credit model!")
    print(f"Archived full detailed model to: {detail_path}")
    return True

def main():
    print("=== COGNITIVE CREDIT EXCEL MODEL INGESTION ENGINE ===")
    cc_files = scan_downloads()
    if not cc_files:
        print(f"No cognitive-credit-*.xlsx files found in {DOWNLOADS_DIR}")
        return

    print(f"Found {len(cc_files)} Cognitive Credit file(s) in Downloads:")
    for f in cc_files:
        print(f"  - {os.path.basename(f)}")

    for filepath in cc_files:
        issuer_id = identify_issuer_from_filename(filepath)
        if not issuer_id:
            print(f"Could not automatically identify issuer for {filepath}")
            continue

        print(f"\nProcessing {os.path.basename(filepath)} -> Issuer: {issuer_id}")
        parsed = parse_cognitive_credit_workbook(filepath)
        for s_name, s_data in parsed['sheets'].items():
            print(f"  Sheet '{s_name}': {s_data['row_count']} line items, {s_data['formula_count']} formulas retained.")
        update_issuer_database(issuer_id, parsed)

if __name__ == '__main__':
    main()
