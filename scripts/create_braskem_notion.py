#!/usr/bin/env python3
"""
Create Braskem S.A. Research Dossier in Notion Research Database
Database ID: 3df1d0ad68c6815eb5c2cffb3b540b1b
"""
import requests
import json
import sys

NOTION_TOKEN = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
RESEARCH_DB_ID = '3df1d0ad68c6815eb5c2cffb3b540b1b'

headers = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

def text_block(content, bold=False, italic=False, color="default"):
    return {
        "type": "text",
        "text": {"content": content},
        "annotations": {
            "bold": bold,
            "italic": italic,
            "strikethrough": False,
            "underline": False,
            "code": False,
            "color": color
        }
    }

def paragraph(text_list):
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {"rich_text": text_list if isinstance(text_list, list) else [text_block(text_list)]}
    }

def heading_2(text):
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {"rich_text": [text_block(text, bold=True)]}
    }

def heading_3(text):
    return {
        "object": "block",
        "type": "heading_3",
        "heading_3": {"rich_text": [text_block(text, bold=True)]}
    }

def bullet(text_list):
    return {
        "object": "block",
        "type": "bulleted_list_item",
        "bulleted_list_item": {"rich_text": text_list if isinstance(text_list, list) else [text_block(text_list)]}
    }

def callout(text, emoji="⚖️"):
    return {
        "object": "block",
        "type": "callout",
        "callout": {
            "icon": {"type": "emoji", "emoji": emoji},
            "rich_text": [text_block(text)]
        }
    }

def create_braskem_page():
    # Initial page properties
    payload = {
        "parent": {"database_id": RESEARCH_DB_ID},
        "properties": {
            "Name": {
                "title": [{"text": {"content": "Braskem S.A. — Restructuring, Recovery Waterfall & Capital Structure Analysis"}}]
            },
            "Country": {"select": {"name": "Brazil"}},
            "Region": {"select": {"name": "Latin America"}},
            "Sector": {"select": {"name": "Materials"}},
            "Status": {"select": {"name": "Active Coverage"}},
            "Recommendation": {"select": {"name": "Speculative Overweight"}},
            "Tags": {
                "multi_select": [
                    {"name": "High Yield"},
                    {"name": "Brazil"}
                ]
            }
        },
        "children": [
            callout(
                "Desk Summary & Actionable Trade Stance: SPECULATIVE OVERWEIGHT on Senior Unsecured Eurobonds (BRASKM 2030s @ ~48.6c, 2033s @ ~56.3c, 2050s @ ~44.7c) vs. UNDERWEIGHT / AVOID Subordinated Hybrid 2081s (@ ~31.8c). "
                "Base Case fundamental recovery yields 66.3 cents on the dollar ($63–$70c range) for Senior Unsecured debt, underpinned by Braskem's irreplaceable national petrochemical footprint and strategic feedstock integration with Petrobras. "
                "Conversely, the Subordinated 2081 Hybrid is deeply overvalued at ~32c, facing severe dilution or complete write-down (10–18c recovery) under absolute priority.",
                "⚖️"
            ),
            heading_2("1. Strategic Profile & Market Position"),
            paragraph([
                text_block("Braskem S.A. (B3: BRKM5 / NYSE: BAK) is the undisputed petrochemical champion of Latin America and the largest thermoplastic resin producer in the Americas. Key operational pillars include:"),
            ]),
            bullet([
                text_block("Capacity Moat: ", bold=True),
                text_block("Dominates Brazilian market with ~70% market share in Polyethylene (PE), Polypropylene (PP), and Polyvinyl Chloride (PVC). 4 integrated domestic cracker complexes (Camaçari/BA, Triunfo/RS, São Paulo/ABC, Duque de Caxias/RJ) with 4.0M tonnes of ethylene capacity.")
            ]),
            bullet([
                text_block("Global Footprint: ", bold=True),
                text_block("5 PP production units in the United States and 2 in Germany (~2.1M tonnes capacity), making it the #1 PP producer in the US.")
            ]),
            bullet([
                text_block("Green Chemicals Leadership: ", bold=True),
                text_block("World leader in sugarcane ethanol-based 'I'm green' bio-polyethylene (260kt/year capacity), commanding resilient premium pricing.")
            ]),
            bullet([
                text_block("Ownership Standoff: ", bold=True),
                text_block("Controlled by Novonor (38.3% total equity, 50.1% voting) and state energy company Petrobras (36.1% total equity, 47.0% voting). Novonor's stake remains pledged to major Brazilian bank creditors (Itaú, Bradesco, Santander, BB, BNDES).")
            ]),

            heading_2("2. Restructuring Status & Creditor Impasse (Recuperação Extrajudicial & Chapter 15)"),
            paragraph([
                text_block("In late August 2026, following missed coupon payments and rating downgrades to 'RD' (Fitch) and 'D' (S&P), Braskem filed for "),
                text_block("Recuperação Extrajudicial (out-of-court restructuring) ", bold=True),
                text_block("in Brazil covering ~$11.0B in unsecured debt, coupled with Chapter 15 filings in US Bankruptcy Court to stay US asset enforcement.")
            ]),
            bullet([
                text_block("Company Initial Plan (Rejected): ", bold=True),
                text_block("Braskem proposed that existing creditors inject $2.0B in new money ($1.25B dedicated to debt repurchases at up to a 50% discount and $750M for working capital).")
            ]),
            bullet([
                text_block("Creditor Counter-Demands: ", bold=True),
                text_block("Ad hoc bondholder committees unanimously rejected the proposal in September 2026. Creditors demand an enforceable $3.0B equity injection from controlling shareholders Petrobras and Novonor/IG4 Capital before consenting to maturity extensions or haircuts.")
            ]),
            bullet([
                text_block("Threat of Judicial Recovery (RJ): ", bold=True),
                text_block("Failure to achieve consensual extrajudicial agreement by 4Q26 risks conversion into a formal in-court Recuperação Judicial (RJ), which would freeze all debt service but expose equity holders to total cram-down.")
            ]),

            heading_2("3. Comprehensive Recovery Waterfall Analysis"),
            paragraph([
                text_block("To evaluate whether to buy, hold, or sell Braskem debt tranches, the desk evaluated three distinct recovery scenarios based on enterprise valuation multiples, asset replacement values, and priority of claims:"),
            ]),
            callout(
                "SUMMARY OF RECOVERY VALUES:\n"
                "• Senior Secured / PPE Debt ($1,100M Claims): 100% Recovery across all scenarios ($100.0c).\n"
                "• Senior Unsecured Eurobonds & Debentures ($9,200M Claims):\n"
                "   - Distressed / Liquidation Floor: 16.8% - 25.0% ($17 - $25c)\n"
                "   - Base Case Consensual Reorg: 66.3% ($63 - $70c)  [Current Px: 45 - 56c -> +35% to +45% Upside]\n"
                "   - Bull Case / Sponsor Equity Check: 95.0% - 100.0% ($95 - $100c)\n"
                "• Subordinated Hybrid Notes 2081 ($1,000M Claims):\n"
                "   - Distressed Floor: 0.0% ($0c)\n"
                "   - Base Case Consensual Reorg: 10.0% - 18.0% ($10 - $18c) [Current Px: ~31.8c -> -45% to -70% Downside!]\n"
                "   - Bull Case: 40.0% - 55.0% ($40 - $55c)\n"
                "• Existing Equity (Novonor/Petrobras): Near total dilution (retaining 5–15% stub equity unless $2B+ fresh capital injected).",
                "📊"
            ),
            heading_3("Scenario A: Distressed / Liquidation Hard Floor"),
            bullet([
                text_block("Assumptions: ", bold=True),
                text_block("Protracted down-cycle, trough EBITDA of $800M capitalized at 3.5x distressed EV/EBITDA, or forced asset sale yielding $3,200M net EV. Unrestricted cash of $850M.")
            ]),
            bullet([
                text_block("Priority Deductions: ", bold=True),
                text_block("Admin/court costs ($150M) + Senior Secured / PPE export facilities ($1,100M) + Immediate environmental/Maceió priority ($400M) = $1,650M.")
            ]),
            bullet([
                text_block("Net Distributable to Senior Unsecured: ", bold=True),
                text_block("$1,550M available against $9,200M claims = 16.8% (~$17c) recovery floor.")
            ]),
            heading_3("Scenario B: Base Case Consensual Reorganization (Desk Core Thesis)"),
            bullet([
                text_block("Assumptions: ", bold=True),
                text_block("Normalized mid-cycle EBITDA of $1,400M capitalized at 5.0x EV/EBITDA = $7,000M Enterprise Value. Add $900M cash = $7,900M total distributable value.")
            ]),
            bullet([
                text_block("Priority Deductions: ", bold=True),
                text_block("Admin fees ($100M) + Reinstated Secured PPE Debt ($1,100M) + Maceió settlement NPV provisions ($600M) = $1,800M total priority deductions.")
            ]),
            bullet([
                text_block("Distributable to General Senior Unsecured: ", bold=True),
                text_block("$6,100M net value distributed to $9,200M Senior Unsecured Eurobonds & Debentures = 66.3% Recovery (~63–70 cents on the dollar).")
            ]),
            bullet([
                text_block("Consideration Package: ", bold=True),
                text_block("Composed of ~35% new senior 8-year exit notes (coupon 8.5%) + ~30% equity in restructured Braskem.")
            ]),
            heading_3("Scenario C: Bull Case (Petrobras Strategic Recapitalization)"),
            bullet([
                text_block("Assumptions: ", bold=True),
                text_block("Petrobras steps in with $2.5B equity check, renegotiates long-term naphtha feedstock formula favorably; EBITDA reaches $1,800M @ 5.5x EV = $9,900M EV.")
            ]),
            bullet([
                text_block("Recovery: ", bold=True),
                text_block("Senior Unsecured bonds recovered at 95–100c via par-for-par reprofiling; Hybrid notes recover 40–55c.")
            ]),

            heading_2("4. Capital Structure & Secondary Trading Matrix"),
            paragraph([
                text_block("Overview of core traded instruments in Braskem's debt stack as of September 2026:"),
            ]),
            bullet([
                text_block("BRASKM 4.500% 2030 (USD): ", bold=True),
                text_block("Price ~48.6 | YTM 19.8% | Senior Unsecured | Base Case Recovery: ~66c (+36% upside).")
            ]),
            bullet([
                text_block("BRASKM 7.250% 2033 (USD): ", bold=True),
                text_block("Price ~56.3 | YTM 18.2% | Senior Unsecured | Base Case Recovery: ~66c (+17% upside).")
            ]),
            bullet([
                text_block("BRASKM 5.875% 2050 (USD): ", bold=True),
                text_block("Price ~44.7 | YTM 16.5% | Senior Unsecured | Base Case Recovery: ~66c (+48% upside).")
            ]),
            bullet([
                text_block("BRASKM 8.500% / 12.004% 2081 (USD Hybrid): ", bold=True),
                text_block("Price ~31.8 | Subordinated Perp | Base Case Recovery: ~14c (-56% downside risk!).")
            ]),
            bullet([
                text_block("Export Credit Facilities (PPE) & Working Capital: ", bold=True),
                text_block("~$1,100M outstanding | Senior Secured / Priority | 100% Recovery.")
            ]),
            bullet([
                text_block("Local Brazilian Debentures (CDI-linked): ", bold=True),
                text_block("~$1,400M equivalent | Pari Passu with Senior Eurobonds | 66% Base Case Recovery.")
            ]),

            heading_2("5. Maceió Environmental Liabilities & Settlement Audit"),
            paragraph([
                text_block("The ground subsidence in Maceió (Alagoas) caused by rock salt cavity collapse was the primary ESG catalyst that precipitated credit downgrades:"),
            ]),
            bullet([
                text_block("Compensation Program (PCF): ", bold=True),
                text_block("99.6% of over 19,000 relocation/compensation claims accepted and disbursed. Historical cash outflow exceeds R$15.0B (~$3.0B).")
            ]),
            bullet([
                text_block("Remaining Balance Sheet Provisions: ", bold=True),
                text_block("Reduced to ~R$3.5B (~$650M) by end-2025/1H26, representing well-defined ongoing remediation, mine cavity closure, and environmental stabilization.")
            ]),
            bullet([
                text_block("State of Alagoas Settlement: ", bold=True),
                text_block("R$1.2B agreement structured in 10 annual installments beginning predominantly post-2030, avoiding near-term cash drain.")
            ]),
            bullet([
                text_block("Verdict on Maceió Risk: ", bold=True),
                text_block("Tail risk has transitioned from an unquantifiable existential liability into a structured, scheduled payout obligation that can be absorbed within a restructured capital plan.")
            ]),

            heading_2("6. 5 Key Diligence Questions for Restructuring Advisors & Creditor Calls"),
            bullet([
                text_block("1. Subordination Enforcement: ", bold=True),
                text_block("Will bondholder groups enforce strict absolute priority against the 2081 Hybrid notes, or will sponsors attempt to offer nominal equity warrants to hybrid holders to avoid litigation?")
            ]),
            bullet([
                text_block("2. Petrobras Backstop: ", bold=True),
                text_block("What is the formal threshold under Petrobras' bylaws and state governance rules regarding an equity backstop without triggering mandatory takeover offer (tag-along) rules?")
            ]),
            bullet([
                text_block("3. Naphtha Supply Contract Formula: ", bold=True),
                text_block("Has Petrobras signaled flexibility to revise the domestic naphtha transfer pricing formula (currently pegged to ARA Rotterdam benchmark) to lower Braskem's feedstock cost during down-cycles?")
            ]),
            bullet([
                text_block("4. Braskem Idesa Ring-Fencing: ", bold=True),
                text_block("Following the August 2026 consensual debt cut from $2.5B to $1.6B at Braskem Idesa, is there any lingering recourse or cash-sweep exposure from the Mexican JV to the parent company?")
            ]),
            bullet([
                text_block("5. US Chapter 15 Recognition & Braskem America Assets: ", bold=True),
                text_block("Do European and US institutional bondholders have viable legal pathways to challenge the inclusion of Braskem America's profitable polypropylene assets in the extrajudicial perimeter?")
            ])
        ]
    }

    print("Creating Braskem page in Notion Research Database...")
    res = requests.post("https://api.notion.com/v1/pages", headers=headers, json=payload)
    print("Status Code:", res.status_code)
    if res.status_code == 200:
        data = res.json()
        page_id = data["id"]
        url = data["url"]
        print(f"SUCCESS! Page created.")
        print(f"Page ID: {page_id}")
        print(f"Notion URL: {url}")
        return page_id, url
    else:
        print("Error creating page:", res.status_code, res.text)
        return None, None

if __name__ == "__main__":
    create_braskem_page()
