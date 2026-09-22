import os
import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get("NOTION_TOKEN", "ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY")
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

BRASKEM_NOTE_ID = "3e31d0ad-68c6-819b-aaa2-de6d03346ec9"
ZORLU_NOTE_ID = "3df1d0ad-68c6-814f-921e-f33f2b2f199b"

from notion_dossier_helper import (
    text_p, heading_2, heading_3, callout, bullet, make_table
)

def append_braskem_qual():
    b = []
    b.append(heading_2("📘 Qualitative Risk Assessment Demystified: What Does Each % Mean?"))
    b.append(text_p("In distressed credit, a company's recovery is never determined purely by accounting EV minus priority debt. The Qualitative % is a Probability-Weighted Economic Friction Haircut that captures real-world execution, legal, and political frictions standing between theoretical asset value and actual cash recovery in secondary bond markets."))
    
    b.append(make_table(
        ["Slider Dimension", "Range", "Weight", "What it Measures", "Pricing Impact"],
        [
            ["Petrobras Sponsor Friction", "0% – 60%", "35%", "Risk that state-controlled Petrobras refuses an equity check for Novonor's stake", "Forces creditors to absorb 100% of recapitalization via higher equity dilution"],
            ["Maceió Litigation Tail", "0% – 40%", "25%", "Risk that Dutch / federal courts award damages beyond R$15B settlement cap", "Increases priority cash deduction ahead of unsecured notes ($600M–$1,200M NPV)"],
            ["Judicial RJ Cramdown Risk", "0% – 50%", "25%", "Probability that consensual Extrajudicial talks fail to hit 50%+1 threshold", "Triggers formal in-court bankruptcy, 24+ mo delay, $15M/mo fee burn, and DIP priority"],
            ["Distressed Liquidity Discount", "5% – 30%", "15%", "Secondary market illiquidity and mandate forced selling upon CCC downgrades", "Depresses secondary bids 5c–12c below theoretical mathematical present value"]
        ]
    ))

    b.append(callout("PRICING BAND FORMULA & SYNTHESIS:\nComposite Friction Factor (Φ) = (Petrobras × 0.35) + (Maceió × 0.25) + (RJ Risk × 0.25) + (Liquidity × 0.15)\n• Bear (Floor): max(16.0c, Raw Recovery × 0.45 × (1 - Φ))\n• Base (Fair): Raw Recovery × (1 - Φ × 0.40)\n• Bull (Upside): min(100.0c, Raw Recovery × 1.35)\nIn the Desk Base Case, Φ = 19.75%, discounting 66.3c raw recovery to a 61.8c–66.3c secondary fair value band.", "⚙️"))

    url = f"https://api.notion.com/v1/blocks/{BRASKEM_NOTE_ID}/children"
    res = requests.patch(url, headers=HEADERS, json={"children": b})
    print(f"Braskem Qualitative Guide append: {res.status_code}")

def append_zorlu_qual():
    b = []
    b.append(heading_2("📘 Qualitative Risk Assessment Demystified: What Does Each % Mean?"))
    b.append(text_p("While Zorlu Enerji provides 190.6% asset coverage ($2,598M EV vs $1,363M net debt), the 2026 notes trade at ~94.5c. The Qualitative % is an explicit Probability-Weighted Friction Haircut capturing macro, regulatory, and parent contagion risks that explain the paper discount."))

    b.append(make_table(
        ["Slider Dimension", "Range", "Weight", "What it Measures", "Pricing Impact"],
        [
            ["Turkish Macro / Lira FX Beta", "0% – 50%", "35%", "Inflation pass-through lag, high CBRT rates, and Lira depreciation", "Compresses short-term dollar EBITDA conversion at regulated distribution grid (OEDAŞ)"],
            ["YEKDEM Tariff Expiry Cliff", "0% – 40%", "30%", "Roll-off of $105–$133/MWh USD feed-in tariffs to $60–$75/MWh merchant spot", "Contracts annual generation cash flows by $40M–$70M post-2027"],
            ["Dorad Energy Geopolitical Tail", "0% – 30%", "20%", "Risk to Zorlu's 25% stake in Israel's Dorad CCGT power plant", "Strips out $20M–$30M annual dividend flows from HoldCo debt service"],
            ["Refinancing / Execution Illiquidity", "5% – 30%", "15%", "Spread premium demanded to roll $530M 2026 Eurobond into 2030 A&E paper", "Elevates required clearing Exit Yield to 11.00%–11.50% (trading at 95.3c)"]
        ]
    ))

    b.append(callout("PRICING BAND FORMULA & SYNTHESIS:\nComposite Friction Factor (Φ) = (Macro × 0.35) + (YEKDEM × 0.30) + (Dorad × 0.20) + (Illiquidity × 0.15)\n• Bear (Floor): max(50.0c, Raw Recovery × 0.65 × (1 - Φ))\n• Base (Fair): Raw Recovery × (1 - Φ × 0.35)\n• Bull (Upside): min(100.0c, Raw Recovery × 1.15)\nIn the Desk Base Case, Φ = 15.00%. At an 11.0% Exit Yield, the 4-year A&E paper trades at 95.3c, perfectly validating today's 94.5c secondary price.", "⚙️"))

    url = f"https://api.notion.com/v1/blocks/{ZORLU_NOTE_ID}/children"
    res = requests.patch(url, headers=HEADERS, json={"children": b})
    print(f"Zorlu Qualitative Guide append: {res.status_code}")

if __name__ == "__main__":
    append_braskem_qual()
    append_zorlu_qual()
