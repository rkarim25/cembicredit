import os
import sys
import json
import requests
import time

from note_compiler_core import (
    RESEARCH_DB_ID, note_to_notion_blocks, append_blocks_chunked,
    heading_1, divider, HEADERS
)
from notes_data_part2 import NOTES_PART2

new_issuers = {
    'wesoda': {'name': 'WE Soda', 'ticker': 'WESODA', 'country': 'United Kingdom', 'region': 'CEEMEA', 'sector': 'Chemicals'},
    'first_quantum': {'name': 'First Quantum Minerals', 'ticker': 'FMCN', 'country': 'Zambia', 'region': 'Africa', 'sector': 'Mining'},
    'sibanye': {'name': 'Sibanye-Stillwater', 'ticker': 'SSW', 'country': 'South Africa', 'region': 'Africa', 'sector': 'Mining'},
    'endeavour_mining': {'name': 'Endeavour Mining', 'ticker': 'EDV', 'country': 'Côte d\'Ivoire', 'region': 'Africa', 'sector': 'Mining'},
    'omniyat': {'name': 'Omniyat Properties', 'ticker': 'OMNIYT', 'country': 'United Arab Emirates', 'region': 'Middle East', 'sector': 'Real Estate'},
    'mota_engil_africa': {'name': 'Mota-Engil Africa Group', 'ticker': 'MOTAFR', 'country': 'Angola', 'region': 'Africa', 'sector': 'Infrastructure'}
}

for note in NOTES_PART2:
    cid = note['id']
    meta = new_issuers.get(cid)
    if not meta:
        continue
    
    title_str = f"{meta['name']} ({meta['ticker']}) — Credit Assessment & Model"
    body = {
        'parent': {'database_id': RESEARCH_DB_ID},
        'icon': {'type': 'emoji', 'emoji': '🏢'},
        'properties': {
            'Name': {'title': [{'text': {'content': title_str}}]},
            'Country': {'select': {'name': meta['country']}},
            'Region': {'select': {'name': meta['region']}},
            'Sector': {'select': {'name': meta['sector']}},
            'Status': {'select': {'name': 'Under Review'}}
        }
    }
    res = requests.post('https://api.notion.com/v1/pages', headers=HEADERS, json=body)
    if res.status_code == 200:
        page_id = res.json()['id']
        print(f"Successfully created company page for {meta['name']}: {page_id}")
        blocks = [
            heading_1(f"📜 Meeting Note: {note['title']}"),
            divider()
        ] + note_to_notion_blocks(note)
        append_blocks_chunked(page_id, blocks)
        print(f" - Appended {len(blocks)} blocks to {meta['name']}")
    else:
        print(f"Failed to create page for {meta['name']}: {res.status_code} - {res.text[:250]}")
