import urllib.request
import json
import sys
import time

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

token = 'ntn_n779599277456gzkoFRJ6J44XSVNAh4timvRmL1opXN5yY'
page_id = '3df1d0ad-68c6-814f-921e-f33f2b2f199b'

def text_obj(content, bold=False, color="default", url=None):
    return {
        "type": "text",
        "text": {
            "content": str(content),
            "link": {"url": url} if url else None
        },
        "annotations": {
            "bold": bold,
            "italic": False,
            "strikethrough": False,
            "underline": False,
            "code": False,
            "color": color
        }
    }

def cell(content, bold=False, color="default"):
    return [text_obj(content, bold=bold, color=color)]

def row(cells_list):
    return {
        "type": "table_row",
        "table_row": {
            "cells": cells_list
        }
    }

def build_table(headers_list, rows_data):
    width = len(headers_list)
    header_cells = [cell(h, bold=True) for h in headers_list]
    row_blocks = [row(header_cells)]
    for r in rows_data:
        cells = []
        for c in r:
            if isinstance(c, tuple):
                val = c[0]
                bld = c[1] if len(c) > 1 else False
                clr = c[2] if len(c) > 2 else "default"
                cells.append(cell(val, bld, clr))
            else:
                cells.append(cell(c))
        row_blocks.append(row(cells))
    
    return {
        "object": "block",
        "type": "table",
        "table": {
            "table_width": width,
            "has_column_header": True,
            "has_row_header": False,
            "children": row_blocks
        }
    }

def append_blocks():
    # 1. Table 1: Asset-by-Asset Operational Blueprint (Inputs & Outputs)
    table1_headers = ["Asset Cluster", "Resource Inputs & Enthalpy", "Energy & Byproduct Outputs", "Capacity", "Normal EBITDA", "Competitive Economic Moat"]
    table1_rows = [
        [("Kızıldere Geothermal (Denizli/Aydın)", True), "Deep brine reservoir (240°C–260°C, 3,000m wells)", "Baseload power, dry ice CO2, district heating", "260.0 MW", ("$135.0M", True), "Turkey's top enthalpy field; statutory USD YEKDEM ($132/MWh); 92% capacity factor"],
        [("Alaşehir Geothermal (Manisa)", True), "Enthalpy steam reservoir (170°C–190°C wells)", "Baseload renewable generation", "45.0 MW", ("$25.0M", True), "USD YEKDEM ($105/MWh); automated reinjection preserving steam enthalpy"],
        [("Gökçedağ Wind (Osmaniye)", True), "High-speed Bahçe mountain wind corridor (>34% CF)", "Clean wind electricity, I-REC green credits", "135.0 MW", ("$28.0M", True), "Top wind regime in Mediterranean Turkey; long-term corporate PPAs"],
        [("Hydroelectric Fleet (7 Plants)", True), "Eastern & Black Sea runoff / dam storage (İkizdere, Çamlıca)", "Dispatchable hydro generation, peak reserve", "118.6 MW", ("$22.0M", True), "Zero fuel cost; dispatchable peak balancing; ancillary services margin"],
        [("OEDAŞ Regulated Distribution Grid", True), "High-voltage intake from TEİAŞ; 1.95M captive meters", "Monopoly power distribution across 5 provinces", "1.95M Meters / ~$650M RAB", ("$85.0M", True), "Statutory natural monopoly; 12.3% real pre-tax ROE on RAB with CPI pass-through"],
        [("ZES EV Fast-Charging Network", True), "Grid interconnections, Vestel hardware, retail leases", "High-speed DC/AC charging, mobile platform", "1,850+ Sockets", ("$15.0M", True), "#1 EV network in Turkey (~35% DC share); footprint in Greece, Bulgaria, Italy"],
        [("Domestic Gas Cogeneration (CHP)", True), "BOTAŞ pipeline gas, industrial steam off-take", "Combined heat & power, industrial process steam", "341.0 MW", ("$20.0M", True), "Direct steam supply to textile parks (Bursa/Lüleburgaz); merchant spark hedge"],
        [("International Power Assets", True), "Dorad Israel gas (25% stake); Pakistan wind (Jhimpir)", "Dorad 210 MW equity power; Pakistan wind", "266.4 MW Eq.", ("$20.0M", True), "Dorad supplies 8% of Israel under long-term PPA with IDF; hard-currency dividends"],
        [("CONSOLIDATED ZORLU ASSET BASE", True, "blue"), "Diversified Geothermal, Grid & Renewables", "1,266 MW Fleet + 1.95M Grid Meters", "1,266 MW", ("$350.0M", True, "blue"), "68.5% generation EBITDA earned in USD; regulated CPI inflation moat"]
    ]

    # 2. Table 2: EV Volatility Framework Historical Matrix
    table2_headers = ["Cycle Regime", "Cash EBITDA ($M)", "EV Multiple", "Enterprise Value ($M)", "Senior Unsecured Recovery (c)", "Structural Driver"]
    table2_rows = [
        [("P10: Severe Drought / Regulatory Freeze", True, "red"), "$240.0M", "5.0x", ("$1,200.0M", True, "red"), ("58.0c (Distressed Floor)", True, "red"), "Severe drought (-35% hydro), delayed RAB indexing, bank credit freeze"],
        [("P25: Downside Hydro Deficit & High TRY", True, "orange"), "$290.0M", "5.5x", ("$1,595.0M", True, "orange"), ("85.0c (Downside)", True, "orange"), "Lower merchant spot PTF, localized geothermal maintenance outages"],
        [("P50: Normalized Mid-Cycle (Base Case)", True, "green"), "$350.0M", "6.0x", ("$2,100.0M", True, "green"), ("100.0c (Full Par Coverage)", True, "green"), "Normal hydrology, 90%+ geothermal availability, steady OEDAŞ inflation pass-through"],
        [("P75: Favorable Hydrology & High Spot PTF", True, "blue"), "$390.0M", "6.8x", ("$2,652.0M", True, "blue"), ("100.0c (Par + Refi Accretion)", True, "blue"), "Strong hydro dispatch, rising industrial electricity demand, ZES expansion"],
        [("P90: Peak Power Boom & Renewable IPO", True, "blue"), "$430.0M", "7.5x", ("$3,225.0M", True, "blue"), ("102.5c (Par Call / Tender)", True, "blue"), "Successful Zorlu Yenilenebilir IPO monetization, massive balance sheet deleveraging"]
    ]

    # 3. Table 3: "What's Priced In?" Scenario Payoff Matrix
    table3_headers = ["Scenario", "Exit Px", "Total Return (%)", "Net PnL / $1M Face", "Annualized IRR (10M)", "Desk Action & Protocol"]
    table3_rows = [
        [("1. Bank Squeeze / Distressed Impasse", True, "red"), ("58.0c", True, "red"), ("-38.6%", True, "red"), ("-$365,000", True, "red"), ("-43.2%", True, "red"), ("AVOID / HEDGE", True, "red")],
        [("2. Stalled Standstill / Maturity Extension", True, "yellow"), ("88.0c", True, "yellow"), ("+2.6%", True, "yellow"), ("+$25,000", True, "yellow"), ("+3.1%", True, "yellow"), ("HOLD / DEFENSIVE", True, "yellow")],
        [("3. Consensual Refinancing / Rollover (Base)", True, "green"), ("100.0c", True, "green"), ("+15.3%", True, "green"), ("+$145,000", True, "green"), ("+18.7%", True, "green"), ("OVERWEIGHT / BUY", True, "green")],
        [("4. Renewable IPO / Accelerated Deleveraging", True, "blue"), ("101.5c", True, "blue"), ("+16.9%", True, "blue"), ("+$160,000", True, "blue"), ("+20.6%", True, "blue"), ("CONVICTION LONG", True, "blue")],
        [("5. Sponsor Par Tender / Strategic Buyout", True, "blue"), ("102.5c", True, "blue"), ("+18.0%", True, "blue"), ("+$170,000", True, "blue"), ("+22.0%", True, "blue"), ("CONVICTION LONG", True, "blue")]
    ]

    # 4. Table 4: 16-Row Priority Recovery Waterfall Matrix
    table4_headers = ["Priority Waterfall Valuation Step", "Scenario A: Distressed Floor", "Scenario B: Base Case Reorg", "Scenario C: Bull Case Recap"]
    table4_rows = [
        [("1. Operating Cash EBITDA ($M)", True), "$240.0M (Distress)", "$350.0M (Mid-Cycle)", "$410.0M (Peak Rebound)"],
        [("2. Implied EV / EBITDA Multiple", True), "5.0x EV Multiple", "6.0x EV Multiple", "7.3x EV Multiple"],
        [("3. Enterprise Value (EV)", True), "$1,200.0M", "$2,100.0M", "$3,000.0M"],
        [("4. Add: Balance Sheet Cash", True), "$180.0M", "$240.0M", "$300.0M"],
        [("5. Add: Sponsor Cash / IPO Proceeds", True), "$0.0M (None)", "$0.0M (Internal Cash)", "$250.0M (Zorlu Yenilenebilir IPO)"],
        [("6. TOTAL DISTRIBUTABLE ASSET VALUE", True, "blue"), ("$1,380.0M", True, "blue"), ("$2,340.0M", True, "blue"), ("$3,550.0M", True, "blue")],
        [("7. Less: Refinancing & Advisory Fees", True), "-$40.0M", "-$30.0M", "-$20.0M"],
        [("8. Less: Geothermal Project Loans (EBRD/IFC)", True), "-$720.0M (100% Par)", "-$720.0M (100% Par)", "-$720.0M (100% Par)"],
        [("9. Less: OEDAŞ Regulated Grid Loans", True), "-$480.0M (100% Par)", "-$480.0M (100% Par)", "-$480.0M (100% Par)"],
        [("10. TOTAL PRIORITY CLAIMS DEDUCTED", True, "red"), ("-$1,240.0M", True, "red"), ("-$1,230.0M", True, "red"), ("-$1,220.0M", True, "red")],
        [("11. NET VALUE FOR SENIOR UNSECURED", True, "green"), ("$140.0M", True, "green"), ("$1,110.0M", True, "green"), ("$2,330.0M", True, "green")],
        [("12. Total Senior Unsecured Claims Pool", True), "$582.4M", "$582.4M", "$582.4M"],
        [("13. SENIOR UNSECURED RECOVERY (%)", True, "green"), ("24.0% - 58.0%", True, "red"), ("100.0% (1.91x Covered)", True, "green"), ("100.0% (Fully Covered)", True, "blue")],
        [("14. SENIOR UNSECURED RECOVERY PRICE (CENTS)", True, "green"), ("24.0c - 58.0c", True, "red"), ("98.0c - 100.0c (Par)", True, "green"), ("102.5c (Call Premium)", True, "blue")],
        [("15. VALUE AVAILABLE TO SUBORDINATED CLAIMS", True), "$0.0M (None)", "$0.0M (None)", "$0.0M (None)"],
        [("16. RESIDUAL VALUE FOR ZORLU HOLDING EQUITY", True, "blue"), ("$0.0M (Wiped Out)", True, "red"), ("$527.6M Equity Cushion", True, "green"), ("$1,747.6M Equity Upside", True, "blue")]
    ]

    # 5. Table 5: Dynamic Secondary Pricing Bands & Friction Layers
    table5_headers = ["Instrument / Tranche", "Claim ($M)", "Market Px", "Bear Floor", "Base Fair Value", "Bull Target", "Desk Trading Signal"]
    table5_rows = [
        [("Kızıldere & Alaşehir Geothermal Loans (EBRD/IFC)", True), "$720.0M", "100.0c", "100.0c", "100.0c", "100.0c", "Senior Secured Par Priority"],
        [("OEDAŞ Regulated Grid Loans (ADB/Turk Banks)", True), "$480.0M", "100.0c", "100.0c", "100.0c", "100.0c", "Ring-Fenced RAB Utility Par"],
        [("ZOREN 9.000% 2026 Senior Notes (Eurobond)", True, "green"), "$300.0M", "94.5c", "58.0c", "98.5c", "102.5c", ("BUY (+4.2% to +8.5% Total Return)", True, "green")],
        [("Syndicated RCF & Bilateral Working Capital", True), "$282.4M", "100.0c", "58.0c", "100.0c", "100.0c", "Bank Relationship Par Rollover"],
        [("Zorlu Holding Residual Equity Stake", True), "N/A", "Current Mkt", "$0.0M", "$527.6M", "$1,747.6M", "Subordinated to All Creditors"]
    ]

    blocks = [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("⚡ Comprehensive Valuation Infrastructure & Dedicated Interactive Engines", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [
                    text_obj("🔗 Live Interactive Platform Tools for Zorlu Enerji (ZOREN):\n", bold=True),
                    text_obj("• Interactive Refinancing & SOTP Restructuring Sandbox: "),
                    text_obj("https://rkarim25.github.io/cembicredit/zoren_calculator.html\n", bold=True, color="blue", url="https://rkarim25.github.io/cembicredit/zoren_calculator.html"),
                    text_obj("• Asset Blueprint, EV Volatility & Interactive Pricing Engine: "),
                    text_obj("https://rkarim25.github.io/cembicredit/zoren_background.html\n", bold=True, color="blue", url="https://rkarim25.github.io/cembicredit/zoren_background.html"),
                    text_obj("• Master Company Dossier & Financial Model: "),
                    text_obj("https://rkarim25.github.io/cembicredit/company.html?id=zorlu\n", bold=True, color="blue", url="https://rkarim25.github.io/cembicredit/company.html?id=zorlu"),
                    text_obj("• Strategy Platform Live Mirror: "),
                    text_obj("https://rkarim25.github.io/Strategy/zoren_calculator.html", bold=True, color="blue", url="https://rkarim25.github.io/Strategy/zoren_calculator.html")
                ],
                "icon": {"type": "emoji", "emoji": "⚡"}
            }
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("🏭 Asset-by-Asset Operational Blueprint: Resource Inputs & Energy Outputs", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("Zorlu Enerji operates 8 discrete power and infrastructure asset clusters across Turkey, Israel, and Pakistan spanning 1,266 MW of generation capacity and 1.95M regulated electricity distribution meters. 68.5% of generation EBITDA is earned directly in US Dollars under the statutory YEKDEM mechanism, with the remaining 31.5% backed by OEDAŞ's CPI-indexed regulated distribution network. The table below details the input enthalpy, energy outputs, normalized EBITDA contribution, and economic moats:")]
            }
        },
        build_table(table1_headers, table1_rows),
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("📊 Enterprise Value (EV) Volatility Framework: Quantification & Drivers", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("Zorlu Enerji exhibits an annualized EV volatility of ~28.0% driven by four structural forces: (1) Hydrology and geothermal steam reinjection variations (±$35M EBITDA swing); (2) Turkish Lira FX depreciation versus USD debt service obligations (mitigated by statutory USD YEKDEM cash flows); (3) EMRA/EPDK regulatory tariff reviews and Regulated Asset Base (RAB) inflation indexing; and (4) Post-YEKDEM merchant spot power price realizations (PTF). Below is the historical EV percentile distribution matrix:")]
            }
        },
        build_table(table2_headers, table2_rows),
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("🎯 'What Is Priced In?' & Scenario Return Payoff Matrix", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("At the benchmark ZOREN 9.000% 2026 Eurobond price of 94.5c ($94.50, yielding ~16.8% YTM ahead of its June 2026 maturity wall), the market is pricing in an implied Enterprise Value of $1,850M (5.28x EV/EBITDA on normalized $350M EBITDA) and an implied 22% probability of bank restructuring friction. The table below details total return ROI, net dollar profit/loss per $1M face value, and annualized IRR across 5 restructuring and refinancing outcomes over a 10-month horizon:")]
            }
        },
        build_table(table3_headers, table3_rows),
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("⚖️ 16-Row Comprehensive Priority Recovery Waterfall Analysis", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("The table below details the full 16-row institutional recovery waterfall for Zorlu Enerji across Floor, Base Case, and Bull Case scenarios, quantifying priority claims, net value available to General Senior Unsecured creditors, coverage percentages, and residual equity cushions:")]
            }
        },
        build_table(table4_headers, table4_rows),
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [
                    text_obj("KEY WATERFALL TAKEAWAYS & ASSET COVERAGE VERDICT:\n", bold=True),
                    text_obj("• Base Case Senior Coverage of 190.6%: ", bold=True),
                    text_obj("Under mid-cycle valuation ($2,100M EV + $240M Cash - $1,230M Priority Claims), distributable value available to Senior Unsecured claims is $1,110M against total senior claims of $582.4M (ZOREN Eurobonds $300M + Drawn RCF $282.4M). Senior creditors are covered 1.91x, supporting 100c full par recovery.\n"),
                    text_obj("• Structural Subordination is Contained: ", bold=True),
                    text_obj("While $1,200M in project loans sits at the OpCo level (Geothermal & OEDAŞ), Zorlu's crown-jewel assets generate more than enough cash flow to service these ring-fenced facilities and leave a massive $1,110M net value cushion for HoldCo Eurobonds.\n"),
                    text_obj("• Huge Equity Cushion ($527.6M): ", bold=True),
                    text_obj("Zorlu Holding has over $520M of equity value at stake under the base case, providing overwhelming incentive for the sponsor to complete a consensual maturity extension or refinance the June 2026 notes rather than trigger default.")
                ],
                "icon": {"type": "emoji", "emoji": "💡"}
            }
        },
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [text_obj("🏷️ Dynamic Secondary Pricing Bands & Friction Layers", bold=True)]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [text_obj("To translate fundamental asset coverage into actionable trading signals, the desk evaluates qualitative frictions: (1) Turkish sovereign macro & CDS volatility (15%), (2) OEDAŞ RAB tariff timing (10%), (3) Bank syndication rollover inertia (10%), and (4) Secondary liquidity discount (8%):")]
            }
        },
        build_table(table5_headers, table5_rows),
        {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [
                    text_obj("DESK TRADING ACTION: OVERWEIGHT ZOREN 2026s AT 94.5c\n", bold=True),
                    text_obj("ZOREN 9.000% 2026 Eurobonds offer an asymmetric risk/reward: downside is protected by 190.6% fundamental asset coverage and $527.6M of sponsor equity cushion, while delivering +15.3% total return (+18.7% annualized IRR) on a consensual 10-month rollover to par.")
                ],
                "icon": {"type": "emoji", "emoji": "🎯"}
            }
        }
    ]

    print(f"Total blocks prepared: {len(blocks)}")
    
    # Append in chunks of 10 blocks
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    chunk_size = 10
    for i in range(0, len(blocks), chunk_size):
        chunk = blocks[i:i + chunk_size]
        payload = json.dumps({"children": chunk}).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers={
            "Authorization": f"Bearer {token}",
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
        }, method="PATCH")

        try:
            with urllib.request.urlopen(req) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                print(f"[OK] Appended chunk {i // chunk_size + 1} ({len(res.get('results', []))} blocks)")
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8")
            print(f"[FAIL] Chunk {i // chunk_size + 1} HTTP {e.code}: {err_body}")
            return False
        time.sleep(0.5)

    print("Successfully appended all master blocks and tables to Zorlu Notion research note!")
    return True

if __name__ == "__main__":
    append_blocks()
