#!/usr/bin/env python3
"""
Generate database/issuers/braskem.json for CEMBI Credit Platform
"""
import json
import os

BRASKEM_DATA = {
  "metadata": {
    "id": "braskem",
    "name": "Braskem S.A.",
    "ticker": "BRASKM",
    "country": "Brazil",
    "region": "Latin America",
    "sector": "Materials",
    "type": "corp",
    "rating": "RD / D",
    "tier": "Distressed",
    "benchmark_bond": "BRASKM 4.500% 2030",
    "price": 48.60,
    "ytm": 19.80,
    "spread_bp": 1580,
    "model_file": "Braskem_Credit_Model.xlsx",
    "notion_id": "3e31d0ad68c6819baaa2de6d03346ec9",
    "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Braskem_Credit_Model.xlsx",
    "last_updated": "2026-09-22",
    "cognitive_credit_id": "braskem",
    "cognitive_credit_url": "https://app.cognitivecredit.com/company/braskem/description",
    "model_type": "corp",
    "fcf_2024a": -480.0,
    "net_leverage_2024a": 6.74
  },
  "financials_multi_year": [
    {
      "period": "2021A",
      "is_audited": True,
      "revenue": 19500.0,
      "ebitda": 5620.0,
      "ebitda_margin_pct": 28.8,
      "cfo": 4250.0,
      "capex": 820.0,
      "fcf": 3630.0,
      "cash": 2420.0,
      "gross_debt": 8250.0,
      "net_debt": 5830.0,
      "net_leverage": 1.04,
      "interest_coverage": 11.02,
      "observations": {
        "revenue": "Global petrochemical super-cycle peak driven by post-pandemic economic reopening and severe supply constraints.",
        "ebitda": "Historic EBITDA generation across Brazil, US/Europe, and Mexico; resin spreads reached all-time records.",
        "capex": "Disciplined sustaining capex envelope supplemented by biopolymer expansion.",
        "fcf": "Extraordinary $3.6B FCF enabled debt paydowns and substantial cash accumulation.",
        "net_leverage": "Net leverage fell to record low of 1.04x Net Debt / EBITDA."
      },
      "reported_ebitda": 5620.0,
      "calculated_ebitda": 5620.0,
      "ebitda_reconciliation_variance_usd_m": 0.0,
      "ebitda_reconciliation_variance_pct": 0.0,
      "ebitda_reconciliation_comment": "Fully Reconciled: Standard IFRS Operating Profit + D&A ties directly with reported figures.",
      "cash_interest": 510.0,
      "change_in_working_capital": 180.0,
      "tax_expense": 480.0,
      "fcf_conversion_pct": 64.6,
      "fcf_bridge": {
        "calculated_ebitda": 5620.0,
        "capex": 820.0,
        "cash_interest": 510.0,
        "change_in_working_capital": 180.0,
        "tax": 480.0,
        "fcf": 3630.0,
        "formula_check": "5620.0 - 820.0 - 510.0 - (180.0) - 480.0 = 3630.0"
      }
    },
    {
      "period": "2022A",
      "is_audited": True,
      "revenue": 18700.0,
      "ebitda": 2150.0,
      "ebitda_margin_pct": 11.5,
      "cfo": 1850.0,
      "capex": 940.0,
      "fcf": 190.0,
      "cash": 2150.0,
      "gross_debt": 8640.0,
      "net_debt": 6490.0,
      "net_leverage": 3.02,
      "interest_coverage": 3.98,
      "observations": {
        "revenue": "Topline remained elevated but margins contracted sharply as global chemical supply normalized.",
        "ebitda": "Sharp compression in polyethylene and polypropylene spreads following massive capacity additions in China.",
        "capex": "Higher capex driven by scheduled maintenance turnarounds at Camaçari and Triunfo crackers.",
        "fcf": "FCF compressed to $190M due to working capital build and rising interest rates.",
        "net_leverage": "Net leverage expanded to 3.02x."
      },
      "reported_ebitda": 2150.0,
      "calculated_ebitda": 2150.0,
      "ebitda_reconciliation_variance_usd_m": 0.0,
      "ebitda_reconciliation_variance_pct": 0.0,
      "ebitda_reconciliation_comment": "Fully Reconciled: Clean IFRS tie-out without aggressive adjustments.",
      "cash_interest": 540.0,
      "change_in_working_capital": 320.0,
      "tax_expense": 160.0,
      "fcf_conversion_pct": 8.8,
      "fcf_bridge": {
        "calculated_ebitda": 2150.0,
        "capex": 940.0,
        "cash_interest": 540.0,
        "change_in_working_capital": 320.0,
        "tax": 160.0,
        "fcf": 190.0,
        "formula_check": "2150.0 - 940.0 - 540.0 - (320.0) - 160.0 = 190.0"
      }
    },
    {
      "period": "2023A",
      "is_audited": True,
      "revenue": 14320.0,
      "ebitda": 785.0,
      "ebitda_margin_pct": 5.5,
      "cfo": 410.0,
      "capex": 810.0,
      "fcf": -745.0,
      "cash": 1420.0,
      "gross_debt": 9850.0,
      "net_debt": 8430.0,
      "net_leverage": 10.74,
      "interest_coverage": 1.33,
      "observations": {
        "revenue": "Industry-wide cyclical trough; weak international polymer demand and Chinese self-sufficiency surge.",
        "ebitda": "EBITDA fell 63% yoy as global cracker operating rates hit decade lows (~78%).",
        "capex": "Discretionary growth capex frozen; sustaining capex maintained for safety compliance.",
        "fcf": "Severe cash burn of -$745M exacerbated by R$3.2B cash disbursements for Maceió relocation program.",
        "net_leverage": "Trailing net leverage blew out to 10.74x; rating agencies revised outlooks to negative."
      },
      "reported_ebitda": 820.0,
      "calculated_ebitda": 785.0,
      "ebitda_reconciliation_variance_usd_m": 35.0,
      "ebitda_reconciliation_variance_pct": 4.5,
      "ebitda_reconciliation_comment": "Reconciled: Difference relates to $35M non-recurring restructuring and legal advisory add-backs.",
      "cash_interest": 590.0,
      "change_in_working_capital": 85.0,
      "tax_expense": 45.0,
      "fcf_conversion_pct": -94.9,
      "fcf_bridge": {
        "calculated_ebitda": 785.0,
        "capex": 810.0,
        "cash_interest": 590.0,
        "change_in_working_capital": 85.0,
        "tax": 45.0,
        "fcf": -745.0,
        "formula_check": "785.0 - 810.0 - 590.0 - (85.0) - 45.0 = -745.0"
      }
    },
    {
      "period": "2024A",
      "is_audited": True,
      "revenue": 13850.0,
      "ebitda": 850.0,
      "ebitda_margin_pct": 6.1,
      "cfo": 540.0,
      "capex": 720.0,
      "fcf": -480.0,
      "cash": 950.0,
      "gross_debt": 10400.0,
      "net_debt": 9450.0,
      "net_leverage": 6.74,
      "interest_coverage": 1.39,
      "observations": {
        "revenue": "Depressed global resin prices partially offset by domestic market volume defense.",
        "ebitda": "Sluggish margin recovery; high US natural gas / naphtha spread volatility.",
        "capex": "Strict capex containment program executed across Latin American and US assets.",
        "fcf": "Negative FCF of -$480M depleted unrestricted cash balances below $1.0B threshold.",
        "net_leverage": "Adjusted net leverage stood at 6.74x based on annualized recurring EBITDA run-rate."
      },
      "reported_ebitda": 875.0,
      "calculated_ebitda": 850.0,
      "ebitda_reconciliation_variance_usd_m": 25.0,
      "ebitda_reconciliation_variance_pct": 2.9,
      "ebitda_reconciliation_comment": "Reconciled: Excludes $25M management provisions related to environmental remediation.",
      "cash_interest": 610.0,
      "change_in_working_capital": -40.0,
      "tax_expense": 40.0,
      "fcf_conversion_pct": -56.5,
      "fcf_bridge": {
        "calculated_ebitda": 850.0,
        "capex": 720.0,
        "cash_interest": 610.0,
        "change_in_working_capital": -40.0,
        "tax": 40.0,
        "fcf": -480.0,
        "formula_check": "850.0 - 720.0 - 610.0 - (-40.0) - 40.0 = -480.0"
      }
    },
    {
      "period": "2025A",
      "is_audited": False,
      "revenue": 14650.0,
      "ebitda": 1150.0,
      "ebitda_margin_pct": 7.8,
      "cfo": 790.0,
      "capex": 650.0,
      "fcf": -235.0,
      "cash": 880.0,
      "gross_debt": 10350.0,
      "net_debt": 9470.0,
      "net_leverage": 8.23,
      "interest_coverage": 1.83,
      "observations": {
        "revenue": "Modest cyclical rebound in South American resin demand and stabilizing European volumes.",
        "ebitda": "EBITDA expanded to $1,150M as North American PP margins improved.",
        "capex": "Maintenance and compliance capex strictly prioritized.",
        "fcf": "Cash burn narrowed to -$235M, but interest burden ($630M) prevented positive FCF.",
        "net_leverage": "Debt overhang triggered standstill negotiations with banking syndicate and bondholder committees."
      },
      "reported_ebitda": 1180.0,
      "calculated_ebitda": 1150.0,
      "ebitda_reconciliation_variance_usd_m": 30.0,
      "ebitda_reconciliation_variance_pct": 2.6,
      "ebitda_reconciliation_comment": "Reconciled: Moderate add-back of $30M for M&A diligence and advisory fees.",
      "cash_interest": 630.0,
      "change_in_working_capital": 50.0,
      "tax_expense": 55.0,
      "fcf_conversion_pct": -20.4,
      "fcf_bridge": {
        "calculated_ebitda": 1150.0,
        "capex": 650.0,
        "cash_interest": 630.0,
        "change_in_working_capital": 50.0,
        "tax": 55.0,
        "fcf": -235.0,
        "formula_check": "1150.0 - 650.0 - 630.0 - (50.0) - 55.0 = -235.0"
      }
    },
    {
      "period": "2026E",
      "is_audited": False,
      "revenue": 15400.0,
      "ebitda": 1400.0,
      "ebitda_margin_pct": 9.1,
      "cfo": 1180.0,
      "capex": 600.0,
      "fcf": 170.0,
      "cash": 920.0,
      "gross_debt": 5400.0,
      "net_debt": 4480.0,
      "net_leverage": 3.20,
      "interest_coverage": 2.69,
      "observations": {
        "revenue": "Consolidated revenue supported by mid-cycle chemical spread recovery and bio-PE expansion.",
        "ebitda": "Mid-cycle cash EBITDA reaches $1,400M under sustainable feedstock arrangements.",
        "capex": "Normalized sustaining capex of $600M fully self-funded from operating cash flows.",
        "fcf": "FCF turns positive to +$170M post-reorganization interest reduction.",
        "net_leverage": "Pro-forma gross debt reduced to $5.4B via equitization/haircuts, driving leverage down to 3.20x."
      },
      "reported_ebitda": 1400.0,
      "calculated_ebitda": 1400.0,
      "ebitda_reconciliation_variance_usd_m": 0.0,
      "ebitda_reconciliation_variance_pct": 0.0,
      "ebitda_reconciliation_comment": "Desk Projection: Fully clean cash EBITDA baseline without speculative adjustments.",
      "cash_interest": 520.0,
      "change_in_working_capital": 40.0,
      "tax_expense": 70.0,
      "fcf_conversion_pct": 12.1,
      "fcf_bridge": {
        "calculated_ebitda": 1400.0,
        "capex": 600.0,
        "cash_interest": 520.0,
        "change_in_working_capital": 40.0,
        "tax": 70.0,
        "fcf": 170.0,
        "formula_check": "1400.0 - 600.0 - 520.0 - (40.0) - 70.0 = 170.0"
      }
    }
  ],
  "debt_maturities": {
    "2026": 850.0,
    "2027": 1100.0,
    "2028": 1250.0,
    "2029": 950.0,
    "2030": 1750.0,
    "2031_plus": 4500.0,
    "total_outstanding_usd_m": 10400.0
  },
  "recovery_analysis": {
    "distressed_floor_px": 22.0,
    "base_case_px": 66.3,
    "recovery_floor_pct": 22.0,
    "recovery_base_pct": 66.3,
    "senior_debt_coverage_pct": 100.0,
    "implied_stress_ev_multiple": "3.5x - 5.0x EV/EBITDA",
    "restructuring_framework": "Recuperação Extrajudicial (Brazilian Law No. 11,101) & US Chapter 15",
    "thesis": "Braskem's irreplaceable domestic infrastructure (4 integrated petrochemical complexes, 70% Brazilian resin share) and strategic feedstock integration with Petrobras provide an unbreachable operational floor. Under our Base Case recovery analysis (5.0x mid-cycle EBITDA of $1,400M = $7,000M EV + $900M cash), Senior Unsecured Eurobonds and Debentures recover 66.3 cents on the dollar ($63–$70c range). Trading at 45–56c, Senior Unsecured notes offer compelling +35% to +45% asymmetric upside. Conversely, Subordinated 2081 Hybrid notes (trading at 31.8c) face severe impairment (10–18c) under absolute priority, making the 2081 an attractive funding short or underweight.",
    "recovery_commentary": "Base Case Distributable Value Waterfall: Total Enterprise Value ($7,000M) + Unrestricted Cash ($900M) = $7,900M. Deduct Priority Claims: Admin/legal costs ($100M), Senior Secured / PPE Bank Facilities ($1,100M at 100% par), and Maceió settlement NPV provisions ($600M) = $1,800M. Net value distributable to General Senior Unsecured claims ($9,200M total claims across Eurobonds and local Debentures) is $6,100M, yielding exactly 66.3% recovery (~63–70 cents on the dollar). Consideration expected as 35% new 8-year senior secured notes + 30% reorganised equity. Subordinated Hybrid 2081s receive out-of-the-money warrants/stub equity valued at 10–18c.",
    "scenarios": [
      {
        "tranche": "Export Pre-Payment & Priority Bank Facilities",
        "claim_usd_m": 1100.0,
        "market_px": "100.0c",
        "floor_recovery": "100.0c (100%)",
        "base_recovery": "100.0c (100%)",
        "bull_recovery": "100.0c (100%)",
        "asymmetry": "Par Reinstated"
      },
      {
        "tranche": "BRASKM 4.500% 2030 Senior Notes",
        "claim_usd_m": 1450.0,
        "market_px": "48.6c",
        "floor_recovery": "22.0c (22%)",
        "base_recovery": "66.3c (66%)",
        "bull_recovery": "98.0c (98%)",
        "asymmetry": "+36.4% Upside to Base"
      },
      {
        "tranche": "BRASKM 7.250% 2033 Senior Notes",
        "claim_usd_m": 1200.0,
        "market_px": "56.3c",
        "floor_recovery": "22.0c (22%)",
        "base_recovery": "66.3c (66%)",
        "bull_recovery": "98.0c (98%)",
        "asymmetry": "+17.8% Upside to Base"
      },
      {
        "tranche": "BRASKM 5.875% 2050 Senior Notes",
        "claim_usd_m": 1420.0,
        "market_px": "44.7c",
        "floor_recovery": "22.0c (22%)",
        "base_recovery": "66.3c (66%)",
        "bull_recovery": "98.0c (98%)",
        "asymmetry": "+48.3% Upside to Base"
      },
      {
        "tranche": "Domestic Brazilian Debentures (CDI)",
        "claim_usd_m": 1400.0,
        "market_px": "52.0c",
        "floor_recovery": "22.0c (22%)",
        "base_recovery": "66.3c (66%)",
        "bull_recovery": "98.0c (98%)",
        "asymmetry": "+27.5% Upside to Base"
      },
      {
        "tranche": "Total Senior Unsecured Tranches (Pari Passu)",
        "claim_usd_m": 9200.0,
        "market_px": "~50.5c",
        "floor_recovery": "22.0c (22%)",
        "base_recovery": "66.3c (66%)",
        "bull_recovery": "98.0c (98%)",
        "asymmetry": "+31.3% Blended Upside"
      },
      {
        "tranche": "BRASKM 8.50% / 12.00% 2081 Hybrid Notes",
        "claim_usd_m": 1000.0,
        "market_px": "31.8c",
        "floor_recovery": "0.0c (0%)",
        "base_recovery": "14.0c (14%)",
        "bull_recovery": "48.0c (48%)",
        "asymmetry": "-56.0% Downside (Avoid / Short)"
      }
    ]
  },
  "capital_structure_tranches": [
    {
      "tranche_name": "Export Pre-Payment Facilities & Bank Credit (PPE)",
      "instrument_type": "Senior Secured / Priority Bank Loans",
      "currency": "USD / BRL",
      "amount_issued_usd_m": 1200.0,
      "amount_outstanding_usd_m": 1100.0,
      "coupon": "SOFR / CDI + 285 bps",
      "clean_price": 100.0,
      "ytm": 7.85,
      "spread_bp": 320,
      "maturity_date": "2027-12-31",
      "seniority": "Senior Secured / Priority",
      "governing_law": "Brazilian / New York Law",
      "observation": "Export-receivable collateralized facilities held by domestic and international banks; reinstated at 100% par in restructuring."
    },
    {
      "tranche_name": "BRASKM 4.500% 2030 Senior Notes",
      "instrument_type": "Senior Unsecured 144A/RegS Eurobond",
      "currency": "USD",
      "amount_issued_usd_m": 1500.0,
      "amount_outstanding_usd_m": 1450.0,
      "coupon": "4.500%",
      "clean_price": 48.60,
      "ytm": 19.80,
      "spread_bp": 1580,
      "maturity_date": "2030-01-31",
      "seniority": "Senior Unsecured",
      "governing_law": "New York Law",
      "observation": "Benchmark liquid USD tranche; issued by Braskem Netherlands Finance B.V., guaranteed by Braskem S.A. Base case recovery of 66.3c implies +36.4% upside."
    },
    {
      "tranche_name": "BRASKM 7.250% 2033 Senior Notes",
      "instrument_type": "Senior Unsecured 144A/RegS Eurobond",
      "currency": "USD",
      "amount_issued_usd_m": 1250.0,
      "amount_outstanding_usd_m": 1200.0,
      "coupon": "7.250%",
      "clean_price": 56.30,
      "ytm": 18.20,
      "spread_bp": 1420,
      "maturity_date": "2033-02-13",
      "seniority": "Senior Unsecured",
      "governing_law": "New York Law",
      "observation": "Higher coupon tranche trading at premium to 2030s; pari passu recovery claim."
    },
    {
      "tranche_name": "BRASKM 5.875% 2050 Senior Notes",
      "instrument_type": "Senior Unsecured 144A/RegS Eurobond",
      "currency": "USD",
      "amount_issued_usd_m": 1500.0,
      "amount_outstanding_usd_m": 1420.0,
      "coupon": "5.875%",
      "clean_price": 44.70,
      "ytm": 16.50,
      "spread_bp": 1240,
      "maturity_date": "2050-01-31",
      "seniority": "Senior Unsecured",
      "governing_law": "New York Law",
      "observation": "Long-duration tranche offering the highest dollar upside (+48.3%) to Base Case 66.3c recovery."
    },
    {
      "tranche_name": "BRASKM 8.000% 2034 Senior Notes",
      "instrument_type": "Senior Unsecured Eurobond",
      "currency": "USD",
      "amount_issued_usd_m": 1000.0,
      "amount_outstanding_usd_m": 980.0,
      "coupon": "8.000%",
      "clean_price": 57.50,
      "ytm": 17.40,
      "spread_bp": 1340,
      "maturity_date": "2034-04-15",
      "seniority": "Senior Unsecured",
      "governing_law": "New York Law",
      "observation": "Issued via Braskem America Finance / Netherlands; creditor dispute over US asset perimeter inclusion."
    },
    {
      "tranche_name": "Domestic Brazilian Debentures (CDI-linked)",
      "instrument_type": "Local Unsecured Debentures",
      "currency": "BRL",
      "amount_issued_usd_m": 1500.0,
      "amount_outstanding_usd_m": 1400.0,
      "coupon": "CDI + 1.65%",
      "clean_price": 52.00,
      "ytm": 21.50,
      "spread_bp": 1650,
      "maturity_date": "2029-06-30",
      "seniority": "Senior Unsecured",
      "governing_law": "Brazilian Law",
      "observation": "Held by local Brazilian institutional funds; pari passu with foreign Eurobonds in extrajudicial restructuring."
    },
    {
      "tranche_name": "BRASKM 8.500% / 12.004% 2081 Subordinated Hybrid Notes",
      "instrument_type": "Junior Subordinated Perpetual / Hybrid",
      "currency": "USD",
      "amount_issued_usd_m": 1000.0,
      "amount_outstanding_usd_m": 1000.0,
      "coupon": "12.004%",
      "clean_price": 31.80,
      "ytm": 24.50,
      "spread_bp": 2050,
      "maturity_date": "2081-01-23",
      "seniority": "Junior Subordinated",
      "governing_law": "New York Law",
      "observation": "Deeply junior capital instrument with coupon deferral rights. Heavily overvalued at ~31.8c relative to 10–18c recovery under absolute priority."
    }
  ],
  "covenant_analysis": {
    "debt_incurrence_covenant": "Consolidated Net Debt / EBITDA < 3.50x (Suspended / Breached under Restructuring Standstill)",
    "restricted_payments_covenant": "Dividends and shareholder distributions prohibited until Net Debt / EBITDA < 2.50x and default cured",
    "change_of_control_put": "Put at 101% triggered upon Change of Control accompanied by rating downgrade below Investment Grade",
    "negative_pledge": "Restricts liens on core petrochemical complexes (Camaçari, Triunfo) with standard export financing carve-outs"
  },
  "management_guidance_tracker": [
    {
      "guidance_metric": "Consolidated Recurring Cash EBITDA (Mid-Cycle Run-Rate)",
      "management_target": "$1,300M - $1,500M normalized mid-cycle EBITDA",
      "current_runrate": "$1,043M in 2Q26 annualized (~$1,200M run-rate)",
      "tracking_status": "On Track",
      "variance_analysis": "Polymer spreads in South America and US recovering from historic 2023–2024 lows, driven by Asian supply discipline.",
      "forecasting_impact": "Directly anchors desk Base Case Enterprise Valuation of $7,000M at 5.0x EV/EBITDA."
    },
    {
      "guidance_metric": "Annual Strategic Capex Envelope",
      "management_target": "< $600.0M sustaining & compliance capex",
      "current_runrate": "$600.0M - $650.0M annualized",
      "tracking_status": "On Track",
      "variance_analysis": "Discretionary growth initiatives frozen; sustaining capex fully contained to maintain plant integrity.",
      "forecasting_impact": "Protects post-reorganization cash flow conversion; ensures positive FCF generation of +$170M in 2026E."
    },
    {
      "guidance_metric": "Maceió Environmental Provisions Settlement Program",
      "management_target": "Complete PCF program and execute Alagoas State settlement",
      "current_runrate": "99.6% PCF claims disbursed; R$3.5B provisions remaining",
      "tracking_status": "Ahead of Target",
      "variance_analysis": "Primary relocation completed; remaining obligations scheduled as R$80M–$120M annual disbursements through 2030+.",
      "forecasting_impact": "Deducts $600M NPV from total enterprise value in recovery waterfall."
    },
    {
      "guidance_metric": "Debt Deleveraging & Balance Sheet Right-Sizing",
      "management_target": "Reduce gross debt from $10.4B to < $5.5B via restructuring",
      "current_runrate": "Recuperação Extrajudicial negotiations ongoing with bondholder committees",
      "tracking_status": "Under Watch",
      "variance_analysis": "Creditors rejected initial $2B tender plan, demanding $3B sponsor equity check from Petrobras/Novonor.",
      "forecasting_impact": "Binds post-reorganization capital structure to 3.20x Net Leverage ceiling."
    }
  ],
  "annotations": [
    {
      "sector": "Materials / Chemicals",
      "topic": "Restructuring & Creditor Impasse",
      "source": "Desk Distressed Credit Strategy",
      "note": "Braskem's filing for Recuperação Extrajudicial covering ~$11B of debt in late August 2026 marks the beginning of an intense game of chicken between bondholders and controlling shareholders Petrobras and Novonor. Creditors rightly rejected the company's low-ball proposal to inject $2B of debt buybacks at a 50% discount and are demanding an enforceable $3B equity check from Petrobras. Senior Unsecured notes at 45–56c are fundamentally backed by 66.3c Base Case recovery value."
    },
    {
      "sector": "Materials / Chemicals",
      "topic": "Capital Structure Arbitrage (Long Senior / Short Hybrid)",
      "source": "Desk Distressed Credit Strategy",
      "note": "The most compelling trade in the capital structure is Long Senior Unsecured Eurobonds (2030s @ 48.6c / 2050s @ 44.7c) versus Underweight/Short Subordinated Hybrid 2081s (@ 31.8c). Under any contested judicial restructuring or Chapter 11 plan, the 2081 notes sit below $9.2B of senior unsecured claims and will be almost entirely wiped out (10–18c recovery). The market is severely under-pricing the subordination risk of the 2081s."
    },
    {
      "sector": "Materials / Chemicals",
      "topic": "Strategic Value & Petrobras Integration Moat",
      "source": "J.P. Morgan Credit Research",
      "note": "Braskem is the sole petrochemical cracker operator in Brazil, supplying over 70% of the country's resins and buying ~70% of Petrobras' domestic naphtha output. Petrobras cannot permit an uncontrolled operational liquidation of Braskem without paralyzing Brazilian industrial manufacturing. This strategic alignment ensures significant enterprise value preservation in restructuring."
    },
    {
      "sector": "Materials / Chemicals",
      "topic": "Maceió Liabilities De-risking",
      "source": "Fitch Ratings",
      "note": "Downgrade to 'RD' reflects standstill on coupon payments during restructuring negotiations. However, the operational execution of the Maceió relocation program (99.6% complete) and the long-dated installment structure of the R$1.2B Alagoas State settlement significantly reduce the probability of unforeseen cash-drain surprises."
    }
  ],
  "diligence_questions": [
    {
      "id": "Q1",
      "question": "What is the minimum cash equity check Petrobras and Novonor/IG4 are prepared to commit to avoid conversion of the Recuperação Extrajudicial into a formal in-court Recuperação Judicial (RJ)?"
    },
    {
      "id": "Q2",
      "question": "Will the restructuring plan enforce strict absolute priority against the BRASKM 2081 Hybrid notes, or will sponsors attempt to offer nominal equity warrants to hybrid holders?"
    },
    {
      "id": "Q3",
      "question": "Can management confirm whether any cash-sweep or parent guarantee obligations remain active under the newly restructured Braskem Idesa project financing?"
    },
    {
      "id": "Q4",
      "question": "What is the status of the US Chapter 15 recognition proceedings in SDNY, and have any creditor groups filed motions to challenge the extraterritorial stay over Braskem America Finance?"
    },
    {
      "id": "Q5",
      "question": "Under what timeline will Petrobras renegotiate the formula for domestic naphtha and ethane supply contracts to shield Braskem's margins during global chemical troughs?"
    }
  ],
  "supplementary_data": {
    "annual_ethylene_capacity_kt": 4000,
    "annual_pe_pp_pvc_capacity_kt": 8500,
    "brazilian_resin_market_share_pct": 70.0,
    "us_polypropylene_capacity_kt": 2100,
    "bio_polyethylene_capacity_kt": 260,
    "maceio_pcf_claims_completed_pct": 99.6
  }
}

def write_braskem():
    out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "database", "issuers", "braskem.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(BRASKEM_DATA, f, indent=2, ensure_ascii=False)
    print("Saved database/issuers/braskem.json successfully.")

if __name__ == "__main__":
    write_braskem()
