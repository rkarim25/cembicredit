const MASTER_ISSUERS = [
  {
    "metadata": {
      "id": "akbank",
      "name": "Akbank TAS",
      "ticker": "AKBNK",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "AKBNK 6.45% 2029",
      "price": 100.2,
      "ytm": 6.45,
      "spread_bp": 185,
      "model_file": "Akbank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6817e86bfcdf60c814db9",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Akbank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 52128.0,
        "loans": 29050.0,
        "deposits": 35668.0,
        "nii": 1564.5,
        "fees": 606.6,
        "total_income": 2171.1,
        "opex": 864.4,
        "ppop": 1306.7,
        "provisions": 317.5,
        "net_profit": 791.4,
        "equity": 5907.8,
        "nim_pct": 5.39,
        "cir_pct": 39.8,
        "roe_pct": 13.4,
        "ldr_pct": 81.4,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 60816.0,
        "loans": 34030.0,
        "deposits": 40970.0,
        "nii": 2118.2,
        "fees": 690.8,
        "total_income": 2809.0,
        "opex": 1012.5,
        "ppop": 1796.5,
        "provisions": 299.8,
        "net_profit": 1197.4,
        "equity": 6950.4,
        "nim_pct": 6.22,
        "cir_pct": 36.0,
        "roe_pct": 17.2,
        "ldr_pct": 83.1,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 67332.0,
        "loans": 38180.0,
        "deposits": 45308.0,
        "nii": 2262.6,
        "fees": 775.1,
        "total_income": 3037.7,
        "opex": 1136.0,
        "ppop": 1901.7,
        "provisions": 335.1,
        "net_profit": 1253.3,
        "equity": 7819.2,
        "nim_pct": 5.93,
        "cir_pct": 37.4,
        "roe_pct": 16.0,
        "ldr_pct": 84.3,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 72400.0,
        "loans": 41500.0,
        "deposits": 48200.0,
        "nii": 2407.0,
        "fees": 842.4,
        "total_income": 3249.4,
        "opex": 1234.8,
        "ppop": 2014.6,
        "provisions": 352.8,
        "net_profit": 1329.4,
        "equity": 8688.0,
        "nim_pct": 5.8,
        "cir_pct": 38.0,
        "roe_pct": 15.3,
        "ldr_pct": 86.1,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 78192.0,
        "loans": 44820.0,
        "deposits": 51574.0,
        "nii": 2599.6,
        "fees": 909.8,
        "total_income": 3509.4,
        "opex": 1308.9,
        "ppop": 2200.5,
        "provisions": 335.1,
        "net_profit": 1492.3,
        "equity": 9730.6,
        "nim_pct": 5.8,
        "cir_pct": 37.3,
        "roe_pct": 15.3,
        "ldr_pct": 86.9,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 83260.0,
        "loans": 48140.0,
        "deposits": 54948.0,
        "nii": 2768.0,
        "fees": 968.8,
        "total_income": 3736.8,
        "opex": 1383.0,
        "ppop": 2353.8,
        "provisions": 317.5,
        "net_profit": 1629.0,
        "equity": 10773.1,
        "nim_pct": 5.75,
        "cir_pct": 37.0,
        "roe_pct": 15.1,
        "ldr_pct": 87.6,
        "npl_pct": 1.5,
        "car_pct": 19.4
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 88328.0,
        "loans": 51045.0,
        "deposits": 57840.0,
        "nii": 2888.4,
        "fees": 1027.8,
        "total_income": 3916.2,
        "opex": 1457.1,
        "ppop": 2459.1,
        "provisions": 310.4,
        "net_profit": 1719.0,
        "equity": 11815.7,
        "nim_pct": 5.66,
        "cir_pct": 37.2,
        "roe_pct": 14.5,
        "ldr_pct": 88.3,
        "npl_pct": 1.5,
        "car_pct": 19.4
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 85.0
    },
    "debt_maturities": {
      "2025": 695.0,
      "2026": 1158.4,
      "2027": 1621.8,
      "2028": 1042.6,
      "2029": 695.0,
      "2030_plus": 579.2,
      "total_outstanding_usd_m": 5792.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 82.0,
      "base_case_px": 102.5,
      "recovery_floor_pct": 82.0,
      "recovery_base_pct": 102.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Lowest NPL in Turkey (1.5%); highest CAR (19.4%); pristine Sabancı Group sponsorship."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond AKBNK 6.45% 2029 trading at 100.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "akbank",
        "issuer_name": "Akbank TAS",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "akbank",
        "issuer_name": "Akbank TAS",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "akbank",
        "issuer_name": "Akbank TAS",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "isbank",
      "name": "Türkiye İş Bankası",
      "ticker": "ISCTR",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "ISCTR 6.85% 2029",
      "price": 99.5,
      "ytm": 6.85,
      "spread_bp": 225,
      "model_file": "Isbank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68161976ad6b744201f41",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Isbank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 62280.0,
        "loans": 34860.0,
        "deposits": 43216.0,
        "nii": 1748.0,
        "fees": 677.7,
        "total_income": 2425.7,
        "opex": 965.7,
        "ppop": 1460.0,
        "provisions": 425.8,
        "net_profit": 827.4,
        "equity": 7058.4,
        "nim_pct": 5.01,
        "cir_pct": 39.8,
        "roe_pct": 11.7,
        "ldr_pct": 80.7,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 72660.0,
        "loans": 40836.0,
        "deposits": 49640.0,
        "nii": 2366.5,
        "fees": 771.8,
        "total_income": 3138.3,
        "opex": 1131.2,
        "ppop": 2007.1,
        "provisions": 402.1,
        "net_profit": 1284.0,
        "equity": 8304.0,
        "nim_pct": 5.8,
        "cir_pct": 36.0,
        "roe_pct": 15.5,
        "ldr_pct": 82.3,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 80445.0,
        "loans": 45816.0,
        "deposits": 54896.0,
        "nii": 2527.8,
        "fees": 865.9,
        "total_income": 3393.7,
        "opex": 1269.2,
        "ppop": 2124.5,
        "provisions": 449.4,
        "net_profit": 1340.1,
        "equity": 9342.0,
        "nim_pct": 5.52,
        "cir_pct": 37.4,
        "roe_pct": 14.3,
        "ldr_pct": 83.5,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 86500.0,
        "loans": 49800.0,
        "deposits": 58400.0,
        "nii": 2689.2,
        "fees": 941.2,
        "total_income": 3630.4,
        "opex": 1379.6,
        "ppop": 2250.8,
        "provisions": 473.1,
        "net_profit": 1422.2,
        "equity": 10380.0,
        "nim_pct": 5.4,
        "cir_pct": 38.0,
        "roe_pct": 13.7,
        "ldr_pct": 85.3,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 93420.0,
        "loans": 53784.0,
        "deposits": 62488.0,
        "nii": 2904.3,
        "fees": 1016.5,
        "total_income": 3920.8,
        "opex": 1462.3,
        "ppop": 2458.5,
        "provisions": 449.4,
        "net_profit": 1607.3,
        "equity": 11625.6,
        "nim_pct": 5.4,
        "cir_pct": 37.3,
        "roe_pct": 13.8,
        "ldr_pct": 86.1,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 99475.0,
        "loans": 57768.0,
        "deposits": 66576.0,
        "nii": 3092.6,
        "fees": 1082.4,
        "total_income": 4175.0,
        "opex": 1545.1,
        "ppop": 2629.9,
        "provisions": 425.8,
        "net_profit": 1763.3,
        "equity": 12871.2,
        "nim_pct": 5.35,
        "cir_pct": 37.0,
        "roe_pct": 13.7,
        "ldr_pct": 86.8,
        "npl_pct": 1.8,
        "car_pct": 17.8
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 105530.0,
        "loans": 61254.0,
        "deposits": 70080.0,
        "nii": 3227.0,
        "fees": 1148.3,
        "total_income": 4375.3,
        "opex": 1627.9,
        "ppop": 2747.4,
        "provisions": 416.3,
        "net_profit": 1864.9,
        "equity": 14116.8,
        "nim_pct": 5.27,
        "cir_pct": 37.2,
        "roe_pct": 13.2,
        "ldr_pct": 87.4,
        "npl_pct": 1.8,
        "car_pct": 17.8
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 95.0
    },
    "debt_maturities": {
      "2025": 830.4,
      "2026": 1384.0,
      "2027": 1937.6,
      "2028": 1245.6,
      "2029": 830.4,
      "2030_plus": 692.0,
      "total_outstanding_usd_m": 6920.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Systemic Tier-1 flagship; market leading deposit franchise; AT1 perp yielding 9.25%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ISCTR 6.85% 2029 trading at 99.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "isbank",
        "issuer_name": "Türkiye İş Bankası",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "isbank",
        "issuer_name": "Türkiye İş Bankası",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "isbank",
        "issuer_name": "Türkiye İş Bankası",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "garanti",
      "name": "Garanti BBVA",
      "ticker": "GARAN",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "GARAN 6.55% 2029",
      "price": 99.8,
      "ytm": 6.55,
      "spread_bp": 195,
      "model_file": "Garanti_BBVA_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681b0a24cef773b2df3f3",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Garanti_BBVA_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 55296.0,
        "loans": 30940.0,
        "deposits": 38554.0,
        "nii": 1695.1,
        "fees": 657.2,
        "total_income": 2352.3,
        "opex": 936.5,
        "ppop": 1415.8,
        "provisions": 358.0,
        "net_profit": 846.2,
        "equity": 6266.9,
        "nim_pct": 5.48,
        "cir_pct": 39.8,
        "roe_pct": 13.5,
        "ldr_pct": 80.3,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 64512.0,
        "loans": 36244.0,
        "deposits": 44285.0,
        "nii": 2294.9,
        "fees": 748.4,
        "total_income": 3043.3,
        "opex": 1097.0,
        "ppop": 1946.3,
        "provisions": 338.1,
        "net_profit": 1286.6,
        "equity": 7372.8,
        "nim_pct": 6.33,
        "cir_pct": 36.0,
        "roe_pct": 17.5,
        "ldr_pct": 81.8,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 71424.0,
        "loans": 40664.0,
        "deposits": 48974.0,
        "nii": 2451.3,
        "fees": 839.7,
        "total_income": 3291.0,
        "opex": 1230.8,
        "ppop": 2060.2,
        "provisions": 377.9,
        "net_profit": 1345.8,
        "equity": 8294.4,
        "nim_pct": 6.03,
        "cir_pct": 37.4,
        "roe_pct": 16.2,
        "ldr_pct": 83.0,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 76800.0,
        "loans": 44200.0,
        "deposits": 52100.0,
        "nii": 2607.8,
        "fees": 912.7,
        "total_income": 3520.5,
        "opex": 1337.8,
        "ppop": 2182.7,
        "provisions": 397.8,
        "net_profit": 1427.9,
        "equity": 9216.0,
        "nim_pct": 5.9,
        "cir_pct": 38.0,
        "roe_pct": 15.5,
        "ldr_pct": 84.8,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 82944.0,
        "loans": 47736.0,
        "deposits": 55747.0,
        "nii": 2816.4,
        "fees": 985.7,
        "total_income": 3802.1,
        "opex": 1418.1,
        "ppop": 2384.0,
        "provisions": 377.9,
        "net_profit": 1604.9,
        "equity": 10321.9,
        "nim_pct": 5.9,
        "cir_pct": 37.3,
        "roe_pct": 15.5,
        "ldr_pct": 85.6,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 88320.0,
        "loans": 51272.0,
        "deposits": 59394.0,
        "nii": 2999.0,
        "fees": 1049.6,
        "total_income": 4048.6,
        "opex": 1498.3,
        "ppop": 2550.3,
        "provisions": 358.0,
        "net_profit": 1753.8,
        "equity": 11427.8,
        "nim_pct": 5.85,
        "cir_pct": 37.0,
        "roe_pct": 15.3,
        "ldr_pct": 86.3,
        "npl_pct": 1.7,
        "car_pct": 18.2
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 93696.0,
        "loans": 54366.0,
        "deposits": 62520.0,
        "nii": 3129.4,
        "fees": 1113.5,
        "total_income": 4242.9,
        "opex": 1578.6,
        "ppop": 2664.3,
        "provisions": 350.1,
        "net_profit": 1851.4,
        "equity": 12533.8,
        "nim_pct": 5.76,
        "cir_pct": 37.2,
        "roe_pct": 14.8,
        "ldr_pct": 87.0,
        "npl_pct": 1.7,
        "car_pct": 18.2
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 90.0
    },
    "debt_maturities": {
      "2025": 737.3,
      "2026": 1228.8,
      "2027": 1720.3,
      "2028": 1105.9,
      "2029": 737.3,
      "2030_plus": 614.4,
      "total_outstanding_usd_m": 6144.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 82.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 82.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "BBVA Spain 86% ownership; digital banking pioneer; highest non-interest fee income in Turkey."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond GARAN 6.55% 2029 trading at 99.8."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "garanti",
        "issuer_name": "Garanti BBVA",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "garanti",
        "issuer_name": "Garanti BBVA",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "garanti",
        "issuer_name": "Garanti BBVA",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "yapi_kredi",
      "name": "Yapı ve Kredi Bankası",
      "ticker": "YKBNK",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "YKBNK 6.75% 2029",
      "price": 99.4,
      "ytm": 6.75,
      "spread_bp": 215,
      "model_file": "Yapi_Kredi_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68174ad07d63b80bcd45c",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Yapi_Kredi_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 49104.0,
        "loans": 27300.0,
        "deposits": 33892.0,
        "nii": 1343.5,
        "fees": 520.9,
        "total_income": 1864.4,
        "opex": 742.3,
        "ppop": 1122.1,
        "provisions": 368.6,
        "net_profit": 602.8,
        "equity": 5565.1,
        "nim_pct": 4.92,
        "cir_pct": 39.8,
        "roe_pct": 10.8,
        "ldr_pct": 80.5,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 57288.0,
        "loans": 31980.0,
        "deposits": 38930.0,
        "nii": 1819.0,
        "fees": 593.2,
        "total_income": 2412.2,
        "opex": 869.5,
        "ppop": 1542.7,
        "provisions": 348.1,
        "net_profit": 955.7,
        "equity": 6547.2,
        "nim_pct": 5.69,
        "cir_pct": 36.0,
        "roe_pct": 14.6,
        "ldr_pct": 82.1,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 63426.0,
        "loans": 35880.0,
        "deposits": 43052.0,
        "nii": 1943.0,
        "fees": 665.6,
        "total_income": 2608.6,
        "opex": 975.5,
        "ppop": 1633.1,
        "provisions": 389.0,
        "net_profit": 995.3,
        "equity": 7365.6,
        "nim_pct": 5.42,
        "cir_pct": 37.4,
        "roe_pct": 13.5,
        "ldr_pct": 83.3,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 68200.0,
        "loans": 39000.0,
        "deposits": 45800.0,
        "nii": 2067.0,
        "fees": 723.4,
        "total_income": 2790.4,
        "opex": 1060.4,
        "ppop": 1730.0,
        "provisions": 409.5,
        "net_profit": 1056.4,
        "equity": 8184.0,
        "nim_pct": 5.3,
        "cir_pct": 38.0,
        "roe_pct": 12.9,
        "ldr_pct": 85.2,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 73656.0,
        "loans": 42120.0,
        "deposits": 49006.0,
        "nii": 2232.4,
        "fees": 781.3,
        "total_income": 3013.7,
        "opex": 1124.0,
        "ppop": 1889.7,
        "provisions": 389.0,
        "net_profit": 1200.6,
        "equity": 9166.1,
        "nim_pct": 5.3,
        "cir_pct": 37.3,
        "roe_pct": 13.1,
        "ldr_pct": 85.9,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 78430.0,
        "loans": 45240.0,
        "deposits": 52212.0,
        "nii": 2377.0,
        "fees": 832.0,
        "total_income": 3209.0,
        "opex": 1187.6,
        "ppop": 2021.4,
        "provisions": 368.6,
        "net_profit": 1322.2,
        "equity": 10148.2,
        "nim_pct": 5.25,
        "cir_pct": 37.0,
        "roe_pct": 13.0,
        "ldr_pct": 86.6,
        "npl_pct": 2.1,
        "car_pct": 17.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 83204.0,
        "loans": 47970.0,
        "deposits": 54960.0,
        "nii": 2480.4,
        "fees": 882.6,
        "total_income": 3363.0,
        "opex": 1251.2,
        "ppop": 2111.8,
        "provisions": 360.4,
        "net_profit": 1401.1,
        "equity": 11130.2,
        "nim_pct": 5.17,
        "cir_pct": 37.2,
        "roe_pct": 12.6,
        "ldr_pct": 87.3,
        "npl_pct": 2.1,
        "car_pct": 17.5
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 105.0
    },
    "debt_maturities": {
      "2025": 654.7,
      "2026": 1091.2,
      "2027": 1527.7,
      "2028": 982.1,
      "2029": 654.7,
      "2030_plus": 545.6,
      "total_outstanding_usd_m": 5456.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Koç Group backing; #1 credit card issuing market share in Turkey; AT1 yielding 9.15%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond YKBNK 6.75% 2029 trading at 99.4."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "yapi_kredi",
        "issuer_name": "Yapı ve Kredi Bankası",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "yapi_kredi",
        "issuer_name": "Yapı ve Kredi Bankası",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "yapi_kredi",
        "issuer_name": "Yapı ve Kredi Bankası",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "vakifbank",
      "name": "VakıfBank",
      "ticker": "VAKBN",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "VAKBN 6.95% 2029",
      "price": 99.2,
      "ytm": 6.95,
      "spread_bp": 235,
      "model_file": "Vakifbank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6815aba39e1d30b4b8c8a",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Vakifbank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 56160.0,
        "loans": 33250.0,
        "deposits": 39960.0,
        "nii": 1512.9,
        "fees": 586.5,
        "total_income": 2099.4,
        "opex": 835.8,
        "ppop": 1263.6,
        "provisions": 491.6,
        "net_profit": 617.6,
        "equity": 6364.8,
        "nim_pct": 4.55,
        "cir_pct": 39.8,
        "roe_pct": 9.7,
        "ldr_pct": 83.2,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 65520.0,
        "loans": 38950.0,
        "deposits": 45900.0,
        "nii": 2048.2,
        "fees": 668.0,
        "total_income": 2716.2,
        "opex": 979.1,
        "ppop": 1737.1,
        "provisions": 464.3,
        "net_profit": 1018.2,
        "equity": 7488.0,
        "nim_pct": 5.26,
        "cir_pct": 36.0,
        "roe_pct": 13.6,
        "ldr_pct": 84.9,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 72540.0,
        "loans": 43700.0,
        "deposits": 50760.0,
        "nii": 2187.8,
        "fees": 749.5,
        "total_income": 2937.3,
        "opex": 1098.5,
        "ppop": 1838.8,
        "provisions": 518.9,
        "net_profit": 1055.9,
        "equity": 8424.0,
        "nim_pct": 5.01,
        "cir_pct": 37.4,
        "roe_pct": 12.5,
        "ldr_pct": 86.1,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 78000.0,
        "loans": 47500.0,
        "deposits": 54000.0,
        "nii": 2327.5,
        "fees": 814.6,
        "total_income": 3142.1,
        "opex": 1194.0,
        "ppop": 1948.1,
        "provisions": 546.2,
        "net_profit": 1121.5,
        "equity": 9360.0,
        "nim_pct": 4.9,
        "cir_pct": 38.0,
        "roe_pct": 12.0,
        "ldr_pct": 88.0,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 84240.0,
        "loans": 51300.0,
        "deposits": 57780.0,
        "nii": 2513.7,
        "fees": 879.8,
        "total_income": 3393.5,
        "opex": 1265.6,
        "ppop": 2127.9,
        "provisions": 518.9,
        "net_profit": 1287.2,
        "equity": 10483.2,
        "nim_pct": 4.9,
        "cir_pct": 37.3,
        "roe_pct": 12.3,
        "ldr_pct": 88.8,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 89700.0,
        "loans": 55100.0,
        "deposits": 61560.0,
        "nii": 2676.6,
        "fees": 936.8,
        "total_income": 3613.4,
        "opex": 1337.3,
        "ppop": 2276.1,
        "provisions": 491.6,
        "net_profit": 1427.6,
        "equity": 11606.4,
        "nim_pct": 4.86,
        "cir_pct": 37.0,
        "roe_pct": 12.3,
        "ldr_pct": 89.5,
        "npl_pct": 2.4,
        "car_pct": 16.8
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 95160.0,
        "loans": 58425.0,
        "deposits": 64800.0,
        "nii": 2793.0,
        "fees": 993.8,
        "total_income": 3786.8,
        "opex": 1408.9,
        "ppop": 2377.9,
        "provisions": 480.7,
        "net_profit": 1517.8,
        "equity": 12729.6,
        "nim_pct": 4.78,
        "cir_pct": 37.2,
        "roe_pct": 11.9,
        "ldr_pct": 90.2,
        "npl_pct": 2.4,
        "car_pct": 16.8
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 115.0
    },
    "debt_maturities": {
      "2025": 748.8,
      "2026": 1248.0,
      "2027": 1747.2,
      "2028": 1123.2,
      "2029": 748.8,
      "2030_plus": 624.0,
      "total_outstanding_usd_m": 6240.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 65.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 65.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "State-owned commercial giant; deep sovereign alignment; AT1 perp yielding 9.35%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond VAKBN 6.95% 2029 trading at 99.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "vakifbank",
        "issuer_name": "VakıfBank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "vakifbank",
        "issuer_name": "VakıfBank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "vakifbank",
        "issuer_name": "VakıfBank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "halkbank",
      "name": "Halkbank",
      "ticker": "HALKB",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "B / B3",
      "tier": "B",
      "benchmark_bond": "HALKB 7.35% 2028",
      "price": 98.1,
      "ytm": 7.35,
      "spread_bp": 275,
      "model_file": "Halkbank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6815aba39e1d30b4b8c8a",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Halkbank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 45000.0,
        "loans": 26740.0,
        "deposits": 32930.0,
        "nii": 1117.4,
        "fees": 433.2,
        "total_income": 1550.6,
        "opex": 617.3,
        "ppop": 933.3,
        "provisions": 446.9,
        "net_profit": 389.1,
        "equity": 5100.0,
        "nim_pct": 4.18,
        "cir_pct": 39.8,
        "roe_pct": 7.6,
        "ldr_pct": 81.2,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 52500.0,
        "loans": 31324.0,
        "deposits": 37825.0,
        "nii": 1512.7,
        "fees": 493.4,
        "total_income": 2006.1,
        "opex": 723.1,
        "ppop": 1283.0,
        "provisions": 422.1,
        "net_profit": 688.7,
        "equity": 6000.0,
        "nim_pct": 4.83,
        "cir_pct": 36.0,
        "roe_pct": 11.5,
        "ldr_pct": 82.8,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 58125.0,
        "loans": 35144.0,
        "deposits": 41830.0,
        "nii": 1615.9,
        "fees": 553.5,
        "total_income": 2169.4,
        "opex": 811.3,
        "ppop": 1358.1,
        "provisions": 471.8,
        "net_profit": 709.0,
        "equity": 6750.0,
        "nim_pct": 4.6,
        "cir_pct": 37.4,
        "roe_pct": 10.5,
        "ldr_pct": 84.0,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 62500.0,
        "loans": 38200.0,
        "deposits": 44500.0,
        "nii": 1719.0,
        "fees": 601.6,
        "total_income": 2320.6,
        "opex": 881.8,
        "ppop": 1438.8,
        "provisions": 496.6,
        "net_profit": 753.8,
        "equity": 7500.0,
        "nim_pct": 4.5,
        "cir_pct": 38.0,
        "roe_pct": 10.1,
        "ldr_pct": 85.8,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 67500.0,
        "loans": 41256.0,
        "deposits": 47615.0,
        "nii": 1856.5,
        "fees": 649.8,
        "total_income": 2506.3,
        "opex": 934.8,
        "ppop": 1571.5,
        "provisions": 471.8,
        "net_profit": 879.8,
        "equity": 8400.0,
        "nim_pct": 4.5,
        "cir_pct": 37.3,
        "roe_pct": 10.5,
        "ldr_pct": 86.6,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 71875.0,
        "loans": 44312.0,
        "deposits": 50730.0,
        "nii": 1976.8,
        "fees": 691.9,
        "total_income": 2668.7,
        "opex": 987.7,
        "ppop": 1681.0,
        "provisions": 446.9,
        "net_profit": 987.3,
        "equity": 9300.0,
        "nim_pct": 4.46,
        "cir_pct": 37.0,
        "roe_pct": 10.6,
        "ldr_pct": 87.3,
        "npl_pct": 2.8,
        "car_pct": 15.9
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 76250.0,
        "loans": 46986.0,
        "deposits": 53400.0,
        "nii": 2062.8,
        "fees": 734.0,
        "total_income": 2796.8,
        "opex": 1040.6,
        "ppop": 1756.2,
        "provisions": 437.0,
        "net_profit": 1055.4,
        "equity": 10200.0,
        "nim_pct": 4.39,
        "cir_pct": 37.2,
        "roe_pct": 10.3,
        "ldr_pct": 88.0,
        "npl_pct": 2.8,
        "car_pct": 15.9
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 130.0
    },
    "debt_maturities": {
      "2025": 600.0,
      "2026": 1000.0,
      "2027": 1400.0,
      "2028": 900.0,
      "2029": 600.0,
      "2030_plus": 500.0,
      "total_outstanding_usd_m": 5000.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 60.0,
      "base_case_px": 98.5,
      "recovery_floor_pct": 60.0,
      "recovery_base_pct": 98.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "State-subsidized SME lending franchise; high carry spread pricing in US litigation tail-risk."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond HALKB 7.35% 2028 trading at 98.1."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "halkbank",
        "issuer_name": "Halkbank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "halkbank",
        "issuer_name": "Halkbank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "halkbank",
        "issuer_name": "Halkbank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "turk_exim",
      "name": "Türk Eximbank",
      "ticker": "EXCRTU",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Banks",
      "type": "bank",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "EXCRTU 6.75% 2029",
      "price": 99.8,
      "ytm": 6.75,
      "spread_bp": 215,
      "model_file": "Turk_Eximbank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6815aba39e1d30b4b8c8a",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Turk_Eximbank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 17640.0,
        "loans": 14560.0,
        "deposits": 74.0,
        "nii": 513.8,
        "fees": 199.2,
        "total_income": 713.0,
        "opex": 283.8,
        "ppop": 429.2,
        "provisions": 46.8,
        "net_profit": 305.9,
        "equity": 1999.2,
        "nim_pct": 3.53,
        "cir_pct": 39.8,
        "roe_pct": 15.3,
        "ldr_pct": 19675.7,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 20580.0,
        "loans": 17056.0,
        "deposits": 85.0,
        "nii": 695.6,
        "fees": 226.8,
        "total_income": 922.4,
        "opex": 332.5,
        "ppop": 589.9,
        "provisions": 44.2,
        "net_profit": 436.6,
        "equity": 2352.0,
        "nim_pct": 4.08,
        "cir_pct": 36.0,
        "roe_pct": 18.6,
        "ldr_pct": 20065.9,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 22785.0,
        "loans": 19136.0,
        "deposits": 94.0,
        "nii": 743.0,
        "fees": 254.5,
        "total_income": 997.5,
        "opex": 373.0,
        "ppop": 624.5,
        "provisions": 49.4,
        "net_profit": 460.1,
        "equity": 2646.0,
        "nim_pct": 3.88,
        "cir_pct": 37.4,
        "roe_pct": 17.4,
        "ldr_pct": 20357.4,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 24500.0,
        "loans": 20800.0,
        "deposits": 100.0,
        "nii": 790.4,
        "fees": 276.6,
        "total_income": 1067.0,
        "opex": 405.5,
        "ppop": 661.5,
        "provisions": 52.0,
        "net_profit": 487.6,
        "equity": 2940.0,
        "nim_pct": 3.8,
        "cir_pct": 38.0,
        "roe_pct": 16.6,
        "ldr_pct": 20800.0,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 26460.0,
        "loans": 22464.0,
        "deposits": 107.0,
        "nii": 853.6,
        "fees": 298.8,
        "total_income": 1152.4,
        "opex": 429.8,
        "ppop": 722.6,
        "provisions": 49.4,
        "net_profit": 538.6,
        "equity": 3292.8,
        "nim_pct": 3.8,
        "cir_pct": 37.3,
        "roe_pct": 16.4,
        "ldr_pct": 20994.4,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 28175.0,
        "loans": 24128.0,
        "deposits": 114.0,
        "nii": 909.0,
        "fees": 318.1,
        "total_income": 1227.1,
        "opex": 454.1,
        "ppop": 773.0,
        "provisions": 46.8,
        "net_profit": 581.0,
        "equity": 3645.6,
        "nim_pct": 3.77,
        "cir_pct": 37.0,
        "roe_pct": 15.9,
        "ldr_pct": 21164.9,
        "npl_pct": 0.4,
        "car_pct": 21.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 29890.0,
        "loans": 25584.0,
        "deposits": 120.0,
        "nii": 948.5,
        "fees": 337.5,
        "total_income": 1286.0,
        "opex": 478.5,
        "ppop": 807.5,
        "provisions": 45.8,
        "net_profit": 609.4,
        "equity": 3998.4,
        "nim_pct": 3.71,
        "cir_pct": 37.2,
        "roe_pct": 15.2,
        "ldr_pct": 21320.0,
        "npl_pct": 0.4,
        "car_pct": 21.5
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 32.5,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 25.0
    },
    "debt_maturities": {
      "2025": 235.2,
      "2026": 392.0,
      "2027": 548.8,
      "2028": 352.8,
      "2029": 235.2,
      "2030_plus": 196.0,
      "total_outstanding_usd_m": 1960.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 68.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 68.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "100% sovereign-owned export credit agency; sovereign guarantee backing; near-zero NPLs."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond EXCRTU 6.75% 2029 trading at 99.8."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "turk_exim",
        "issuer_name": "Türk Eximbank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "turk_exim",
        "issuer_name": "Türk Eximbank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "turk_exim",
        "issuer_name": "Türk Eximbank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "fab",
      "name": "First Abu Dhabi Bank",
      "ticker": "FABUH",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "Aa3 / AA-",
      "tier": "IG",
      "benchmark_bond": "FABUH 4.85% 2029",
      "price": 100.5,
      "ytm": 4.85,
      "spread_bp": 65,
      "model_file": "FAB_Abu_Dhabi_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/FAB_Abu_Dhabi_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 234000.0,
        "loans": 99400.0,
        "deposits": 144300.0,
        "nii": 2215.2,
        "fees": 858.8,
        "total_income": 3074.0,
        "opex": 1223.8,
        "ppop": 1850.2,
        "provisions": 575.1,
        "net_profit": 1020.1,
        "equity": 26520.0,
        "nim_pct": 2.23,
        "cir_pct": 39.8,
        "roe_pct": 3.8,
        "ldr_pct": 68.9,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 273000.0,
        "loans": 116440.0,
        "deposits": 165750.0,
        "nii": 2999.0,
        "fees": 978.1,
        "total_income": 3977.1,
        "opex": 1433.6,
        "ppop": 2543.5,
        "provisions": 543.1,
        "net_profit": 1600.3,
        "equity": 31200.0,
        "nim_pct": 2.58,
        "cir_pct": 36.0,
        "roe_pct": 5.1,
        "ldr_pct": 70.3,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 302250.0,
        "loans": 130640.0,
        "deposits": 183300.0,
        "nii": 3203.5,
        "fees": 1097.4,
        "total_income": 4300.9,
        "opex": 1608.4,
        "ppop": 2692.5,
        "provisions": 607.0,
        "net_profit": 1668.4,
        "equity": 35100.0,
        "nim_pct": 2.45,
        "cir_pct": 37.4,
        "roe_pct": 4.8,
        "ldr_pct": 71.3,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 325000.0,
        "loans": 142000.0,
        "deposits": 195000.0,
        "nii": 3408.0,
        "fees": 1192.8,
        "total_income": 4600.8,
        "opex": 1748.3,
        "ppop": 2852.5,
        "provisions": 639.0,
        "net_profit": 1770.8,
        "equity": 39000.0,
        "nim_pct": 2.4,
        "cir_pct": 38.0,
        "roe_pct": 4.5,
        "ldr_pct": 72.8,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 351000.0,
        "loans": 153360.0,
        "deposits": 208650.0,
        "nii": 3680.6,
        "fees": 1288.2,
        "total_income": 4968.8,
        "opex": 1853.2,
        "ppop": 3115.6,
        "provisions": 607.0,
        "net_profit": 2006.9,
        "equity": 43680.0,
        "nim_pct": 2.4,
        "cir_pct": 37.3,
        "roe_pct": 4.6,
        "ldr_pct": 73.5,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 373750.0,
        "loans": 164720.0,
        "deposits": 222300.0,
        "nii": 3919.2,
        "fees": 1371.7,
        "total_income": 5290.9,
        "opex": 1958.1,
        "ppop": 3332.8,
        "provisions": 575.1,
        "net_profit": 2206.2,
        "equity": 48360.0,
        "nim_pct": 2.38,
        "cir_pct": 37.0,
        "roe_pct": 4.6,
        "ldr_pct": 74.1,
        "npl_pct": 3.2,
        "car_pct": 17.4
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 396500.0,
        "loans": 174660.0,
        "deposits": 234000.0,
        "nii": 4089.6,
        "fees": 1455.2,
        "total_income": 5544.8,
        "opex": 2063.0,
        "ppop": 3481.8,
        "provisions": 562.3,
        "net_profit": 2335.6,
        "equity": 53040.0,
        "nim_pct": 2.34,
        "cir_pct": 37.2,
        "roe_pct": 4.4,
        "ldr_pct": 74.6,
        "npl_pct": 3.2,
        "car_pct": 17.4
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 45.0
    },
    "debt_maturities": {
      "2025": 3120.0,
      "2026": 5200.0,
      "2027": 7280.0,
      "2028": 4680.0,
      "2029": 3120.0,
      "2030_plus": 2600.0,
      "total_outstanding_usd_m": 26000.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 101.5,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 101.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "UAE sovereign champion ($325B assets); benchmark tightest spread in CEEMEA CEMBI."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond FABUH 4.85% 2029 trading at 100.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "fab",
        "issuer_name": "First Abu Dhabi Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "fab",
        "issuer_name": "First Abu Dhabi Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "fab",
        "issuer_name": "First Abu Dhabi Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "enbd",
      "name": "Emirates NBD",
      "ticker": "EMIRAT",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A2 / A+",
      "tier": "IG",
      "benchmark_bond": "EMIRAT 4.90% 2029",
      "price": 100.25,
      "ytm": 4.9,
      "spread_bp": 70,
      "model_file": "Emirates_NBD_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Emirates_NBD_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 190800.0,
        "loans": 89600.0,
        "deposits": 124320.0,
        "nii": 2995.2,
        "fees": 1161.2,
        "total_income": 4156.4,
        "opex": 1654.7,
        "ppop": 2501.7,
        "provisions": 633.6,
        "net_profit": 1494.5,
        "equity": 21624.0,
        "nim_pct": 3.34,
        "cir_pct": 39.8,
        "roe_pct": 6.9,
        "ldr_pct": 72.1,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 222600.0,
        "loans": 104960.0,
        "deposits": 142800.0,
        "nii": 4055.0,
        "fees": 1322.5,
        "total_income": 5377.5,
        "opex": 1938.4,
        "ppop": 3439.1,
        "provisions": 598.4,
        "net_profit": 2272.6,
        "equity": 25440.0,
        "nim_pct": 3.86,
        "cir_pct": 36.0,
        "roe_pct": 8.9,
        "ldr_pct": 73.5,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 246450.0,
        "loans": 117760.0,
        "deposits": 157920.0,
        "nii": 4331.5,
        "fees": 1483.8,
        "total_income": 5815.3,
        "opex": 2174.8,
        "ppop": 3640.5,
        "provisions": 668.8,
        "net_profit": 2377.4,
        "equity": 28620.0,
        "nim_pct": 3.68,
        "cir_pct": 37.4,
        "roe_pct": 8.3,
        "ldr_pct": 74.6,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 265000.0,
        "loans": 128000.0,
        "deposits": 168000.0,
        "nii": 4608.0,
        "fees": 1612.8,
        "total_income": 6220.8,
        "opex": 2363.9,
        "ppop": 3856.9,
        "provisions": 704.0,
        "net_profit": 2522.3,
        "equity": 31800.0,
        "nim_pct": 3.6,
        "cir_pct": 38.0,
        "roe_pct": 7.9,
        "ldr_pct": 76.2,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 286200.0,
        "loans": 138240.0,
        "deposits": 179760.0,
        "nii": 4976.6,
        "fees": 1741.8,
        "total_income": 6718.4,
        "opex": 2505.7,
        "ppop": 4212.7,
        "provisions": 668.8,
        "net_profit": 2835.1,
        "equity": 35616.0,
        "nim_pct": 3.6,
        "cir_pct": 37.3,
        "roe_pct": 8.0,
        "ldr_pct": 76.9,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 304750.0,
        "loans": 148480.0,
        "deposits": 191520.0,
        "nii": 5299.2,
        "fees": 1854.7,
        "total_income": 7153.9,
        "opex": 2647.6,
        "ppop": 4506.3,
        "provisions": 633.6,
        "net_profit": 3098.2,
        "equity": 39432.0,
        "nim_pct": 3.57,
        "cir_pct": 37.0,
        "roe_pct": 7.9,
        "ldr_pct": 77.5,
        "npl_pct": 4.1,
        "car_pct": 18.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 323300.0,
        "loans": 157440.0,
        "deposits": 201600.0,
        "nii": 5529.6,
        "fees": 1967.6,
        "total_income": 7497.2,
        "opex": 2789.4,
        "ppop": 4707.8,
        "provisions": 619.5,
        "net_profit": 3270.6,
        "equity": 43248.0,
        "nim_pct": 3.51,
        "cir_pct": 37.2,
        "roe_pct": 7.6,
        "ldr_pct": 78.1,
        "npl_pct": 4.1,
        "car_pct": 18.5
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 55.0
    },
    "debt_maturities": {
      "2025": 2544.0,
      "2026": 4240.0,
      "2027": 5936.0,
      "2028": 3816.0,
      "2029": 2544.0,
      "2030_plus": 2120.0,
      "total_outstanding_usd_m": 21200.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 78.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 78.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Dubai sovereign bank; industry-leading 3.6% NIM; record profitability; AT1 perp yields 6.15%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond EMIRAT 4.90% 2029 trading at 100.25."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "enbd",
        "issuer_name": "Emirates NBD",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "enbd",
        "issuer_name": "Emirates NBD",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "enbd",
        "issuer_name": "Emirates NBD",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "adcb",
      "name": "Abu Dhabi Commercial Bank",
      "ticker": "ADCBUH",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A1 / A",
      "tier": "IG",
      "benchmark_bond": "ADCBUH 5.05% 2029",
      "price": 99.8,
      "ytm": 5.05,
      "spread_bp": 85,
      "model_file": "ADCB_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/ADCB_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 120960.0,
        "loans": 59500.0,
        "deposits": 82880.0,
        "nii": 1547.0,
        "fees": 599.8,
        "total_income": 2146.8,
        "opex": 854.7,
        "ppop": 1292.1,
        "provisions": 459.0,
        "net_profit": 666.5,
        "equity": 13708.8,
        "nim_pct": 2.6,
        "cir_pct": 39.8,
        "roe_pct": 4.9,
        "ldr_pct": 71.8,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 141120.0,
        "loans": 69700.0,
        "deposits": 95200.0,
        "nii": 2094.4,
        "fees": 683.1,
        "total_income": 2777.5,
        "opex": 1001.2,
        "ppop": 1776.3,
        "provisions": 433.5,
        "net_profit": 1074.2,
        "equity": 16128.0,
        "nim_pct": 3.0,
        "cir_pct": 36.0,
        "roe_pct": 6.7,
        "ldr_pct": 73.2,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 156240.0,
        "loans": 78200.0,
        "deposits": 105280.0,
        "nii": 2237.2,
        "fees": 766.4,
        "total_income": 3003.6,
        "opex": 1123.3,
        "ppop": 1880.3,
        "provisions": 484.5,
        "net_profit": 1116.6,
        "equity": 18144.0,
        "nim_pct": 2.86,
        "cir_pct": 37.4,
        "roe_pct": 6.2,
        "ldr_pct": 74.3,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 168000.0,
        "loans": 85000.0,
        "deposits": 112000.0,
        "nii": 2380.0,
        "fees": 833.0,
        "total_income": 3213.0,
        "opex": 1220.9,
        "ppop": 1992.1,
        "provisions": 510.0,
        "net_profit": 1185.7,
        "equity": 20160.0,
        "nim_pct": 2.8,
        "cir_pct": 38.0,
        "roe_pct": 5.9,
        "ldr_pct": 75.9,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 181440.0,
        "loans": 91800.0,
        "deposits": 119840.0,
        "nii": 2570.4,
        "fees": 899.6,
        "total_income": 3470.0,
        "opex": 1294.2,
        "ppop": 2175.8,
        "provisions": 484.5,
        "net_profit": 1353.0,
        "equity": 22579.2,
        "nim_pct": 2.8,
        "cir_pct": 37.3,
        "roe_pct": 6.0,
        "ldr_pct": 76.6,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 193200.0,
        "loans": 98600.0,
        "deposits": 127680.0,
        "nii": 2737.0,
        "fees": 957.9,
        "total_income": 3694.9,
        "opex": 1367.5,
        "ppop": 2327.4,
        "provisions": 459.0,
        "net_profit": 1494.7,
        "equity": 24998.4,
        "nim_pct": 2.78,
        "cir_pct": 37.0,
        "roe_pct": 6.0,
        "ldr_pct": 77.2,
        "npl_pct": 3.8,
        "car_pct": 16.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 204960.0,
        "loans": 104550.0,
        "deposits": 134400.0,
        "nii": 2856.0,
        "fees": 1016.3,
        "total_income": 3872.3,
        "opex": 1440.7,
        "ppop": 2431.6,
        "provisions": 448.8,
        "net_profit": 1586.2,
        "equity": 27417.6,
        "nim_pct": 2.73,
        "cir_pct": 37.2,
        "roe_pct": 5.8,
        "ldr_pct": 77.8,
        "npl_pct": 3.8,
        "car_pct": 16.5
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 60.0
    },
    "debt_maturities": {
      "2025": 1612.8,
      "2026": 2688.0,
      "2027": 3763.2,
      "2028": 2419.2,
      "2029": 1612.8,
      "2030_plus": 1344.0,
      "total_outstanding_usd_m": 13440.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 76.0,
      "base_case_px": 100.5,
      "recovery_floor_pct": 76.0,
      "recovery_base_pct": 100.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Mubadala 60% ownership; lead financier of Abu Dhabi state infrastructure projects."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ADCBUH 5.05% 2029 trading at 99.8."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "adcb",
        "issuer_name": "Abu Dhabi Commercial Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "adcb",
        "issuer_name": "Abu Dhabi Commercial Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "adcb",
        "issuer_name": "Abu Dhabi Commercial Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "dib",
      "name": "Dubai Islamic Bank",
      "ticker": "DIBUH",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A3 / A",
      "tier": "IG",
      "benchmark_bond": "DIBUH 5.10% 2029",
      "price": 99.7,
      "ytm": 5.1,
      "spread_bp": 90,
      "model_file": "Dubai_Islamic_Bank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Dubai_Islamic_Bank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 70560.0,
        "loans": 39200.0,
        "deposits": 50320.0,
        "nii": 1128.4,
        "fees": 437.5,
        "total_income": 1565.9,
        "opex": 623.4,
        "ppop": 942.5,
        "provisions": 327.6,
        "net_profit": 491.9,
        "equity": 7996.8,
        "nim_pct": 2.88,
        "cir_pct": 39.8,
        "roe_pct": 6.2,
        "ldr_pct": 77.9,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 82320.0,
        "loans": 45920.0,
        "deposits": 57800.0,
        "nii": 1527.7,
        "fees": 498.2,
        "total_income": 2025.9,
        "opex": 730.3,
        "ppop": 1295.6,
        "provisions": 309.4,
        "net_profit": 789.0,
        "equity": 9408.0,
        "nim_pct": 3.33,
        "cir_pct": 36.0,
        "roe_pct": 8.4,
        "ldr_pct": 79.4,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 91140.0,
        "loans": 51520.0,
        "deposits": 63920.0,
        "nii": 1631.8,
        "fees": 559.0,
        "total_income": 2190.8,
        "opex": 819.3,
        "ppop": 1371.5,
        "provisions": 345.8,
        "net_profit": 820.6,
        "equity": 10584.0,
        "nim_pct": 3.17,
        "cir_pct": 37.4,
        "roe_pct": 7.8,
        "ldr_pct": 80.6,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 98000.0,
        "loans": 56000.0,
        "deposits": 68000.0,
        "nii": 1736.0,
        "fees": 607.6,
        "total_income": 2343.6,
        "opex": 890.6,
        "ppop": 1453.0,
        "provisions": 364.0,
        "net_profit": 871.2,
        "equity": 11760.0,
        "nim_pct": 3.1,
        "cir_pct": 38.0,
        "roe_pct": 7.4,
        "ldr_pct": 82.4,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 105840.0,
        "loans": 60480.0,
        "deposits": 72760.0,
        "nii": 1874.9,
        "fees": 656.2,
        "total_income": 2531.1,
        "opex": 944.0,
        "ppop": 1587.1,
        "provisions": 345.8,
        "net_profit": 993.0,
        "equity": 13171.2,
        "nim_pct": 3.1,
        "cir_pct": 37.3,
        "roe_pct": 7.5,
        "ldr_pct": 83.1,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 112700.0,
        "loans": 64960.0,
        "deposits": 77520.0,
        "nii": 1996.4,
        "fees": 698.7,
        "total_income": 2695.1,
        "opex": 997.4,
        "ppop": 1697.7,
        "provisions": 327.6,
        "net_profit": 1096.1,
        "equity": 14582.4,
        "nim_pct": 3.07,
        "cir_pct": 37.0,
        "roe_pct": 7.5,
        "ldr_pct": 83.8,
        "npl_pct": 4.5,
        "car_pct": 17.2
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 119560.0,
        "loans": 68880.0,
        "deposits": 81600.0,
        "nii": 2083.2,
        "fees": 741.3,
        "total_income": 2824.5,
        "opex": 1050.9,
        "ppop": 1773.6,
        "provisions": 320.3,
        "net_profit": 1162.6,
        "equity": 15993.6,
        "nim_pct": 3.02,
        "cir_pct": 37.2,
        "roe_pct": 7.3,
        "ldr_pct": 84.4,
        "npl_pct": 4.5,
        "car_pct": 17.2
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 65.0
    },
    "debt_maturities": {
      "2025": 940.8,
      "2026": 1568.0,
      "2027": 2195.2,
      "2028": 1411.2,
      "2029": 940.8,
      "2030_plus": 784.0,
      "total_outstanding_usd_m": 7840.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 75.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 75.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "World's first Islamic bank; monopoly retail mortgage and auto financing franchise in Dubai."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DIBUH 5.10% 2029 trading at 99.7."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dib",
        "issuer_name": "Dubai Islamic Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "dib",
        "issuer_name": "Dubai Islamic Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "dib",
        "issuer_name": "Dubai Islamic Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "snb",
      "name": "Saudi National Bank",
      "ticker": "SNB",
      "country": "Saudi Arabia",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A1 / A-",
      "tier": "IG",
      "benchmark_bond": "SNB 4.95% 2029",
      "price": 100.1,
      "ytm": 4.95,
      "spread_bp": 75,
      "model_file": "Saudi_National_Bank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681638bc7f769eb59d81d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Saudi_National_Bank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 205200.0,
        "loans": 115500.0,
        "deposits": 139120.0,
        "nii": 3217.5,
        "fees": 1247.4,
        "total_income": 4464.9,
        "opex": 1777.5,
        "ppop": 2687.4,
        "provisions": 594.0,
        "net_profit": 1674.7,
        "equity": 23256.0,
        "nim_pct": 2.79,
        "cir_pct": 39.8,
        "roe_pct": 7.2,
        "ldr_pct": 83.0,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 239400.0,
        "loans": 135300.0,
        "deposits": 159800.0,
        "nii": 4356.0,
        "fees": 1420.6,
        "total_income": 5776.6,
        "opex": 2082.3,
        "ppop": 3694.3,
        "provisions": 561.0,
        "net_profit": 2506.6,
        "equity": 27360.0,
        "nim_pct": 3.22,
        "cir_pct": 36.0,
        "roe_pct": 9.2,
        "ldr_pct": 84.7,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 265050.0,
        "loans": 151800.0,
        "deposits": 176720.0,
        "nii": 4653.0,
        "fees": 1593.9,
        "total_income": 6246.9,
        "opex": 2336.2,
        "ppop": 3910.7,
        "provisions": 627.0,
        "net_profit": 2627.0,
        "equity": 30780.0,
        "nim_pct": 3.07,
        "cir_pct": 37.4,
        "roe_pct": 8.5,
        "ldr_pct": 85.9,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 285000.0,
        "loans": 165000.0,
        "deposits": 188000.0,
        "nii": 4950.0,
        "fees": 1732.5,
        "total_income": 6682.5,
        "opex": 2539.3,
        "ppop": 4143.2,
        "provisions": 660.0,
        "net_profit": 2786.6,
        "equity": 34200.0,
        "nim_pct": 3.0,
        "cir_pct": 38.0,
        "roe_pct": 8.1,
        "ldr_pct": 87.8,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 307800.0,
        "loans": 178200.0,
        "deposits": 201160.0,
        "nii": 5346.0,
        "fees": 1871.1,
        "total_income": 7217.1,
        "opex": 2691.7,
        "ppop": 4525.4,
        "provisions": 627.0,
        "net_profit": 3118.7,
        "equity": 38304.0,
        "nim_pct": 3.0,
        "cir_pct": 37.3,
        "roe_pct": 8.1,
        "ldr_pct": 88.6,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 327750.0,
        "loans": 191400.0,
        "deposits": 214320.0,
        "nii": 5692.5,
        "fees": 1992.4,
        "total_income": 7684.9,
        "opex": 2844.1,
        "ppop": 4840.8,
        "provisions": 594.0,
        "net_profit": 3397.4,
        "equity": 42408.0,
        "nim_pct": 2.97,
        "cir_pct": 37.0,
        "roe_pct": 8.0,
        "ldr_pct": 89.3,
        "npl_pct": 1.4,
        "car_pct": 19.8
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 347700.0,
        "loans": 202950.0,
        "deposits": 225600.0,
        "nii": 5940.0,
        "fees": 2113.7,
        "total_income": 8053.7,
        "opex": 2996.4,
        "ppop": 5057.3,
        "provisions": 580.8,
        "net_profit": 3581.2,
        "equity": 46512.0,
        "nim_pct": 2.93,
        "cir_pct": 37.2,
        "roe_pct": 7.7,
        "ldr_pct": 90.0,
        "npl_pct": 1.4,
        "car_pct": 19.8
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 40.0
    },
    "debt_maturities": {
      "2025": 2736.0,
      "2026": 4560.0,
      "2027": 6384.0,
      "2028": 4104.0,
      "2029": 2736.0,
      "2030_plus": 2280.0,
      "total_outstanding_usd_m": 22800.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 101.5,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 101.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Saudi Arabia Commercial & Bankruptcy Code",
      "thesis": "Saudi Arabia's largest bank ($285B assets); PIF anchor shareholding; pristine credit quality."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SNB 4.95% 2029 trading at 100.1."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "snb",
        "issuer_name": "Saudi National Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "snb",
        "issuer_name": "Saudi National Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "snb",
        "issuer_name": "Saudi National Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "rajhi",
      "name": "Al Rajhi Bank",
      "ticker": "RJHI",
      "country": "Saudi Arabia",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A1 / A-",
      "tier": "IG",
      "benchmark_bond": "RAJHI 4.75% 2029",
      "price": 100.8,
      "ytm": 4.75,
      "spread_bp": 55,
      "model_file": "Al_Rajhi_Bank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681638bc7f769eb59d81d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Al_Rajhi_Bank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 169200.0,
        "loans": 110600.0,
        "deposits": 129500.0,
        "nii": 4005.3,
        "fees": 1552.8,
        "total_income": 5558.1,
        "opex": 2212.8,
        "ppop": 3345.3,
        "provisions": 497.7,
        "net_profit": 2278.1,
        "equity": 19176.0,
        "nim_pct": 3.62,
        "cir_pct": 39.8,
        "roe_pct": 11.9,
        "ldr_pct": 85.4,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 197400.0,
        "loans": 129560.0,
        "deposits": 148750.0,
        "nii": 5422.6,
        "fees": 1768.5,
        "total_income": 7191.1,
        "opex": 2592.1,
        "ppop": 4599.0,
        "provisions": 470.1,
        "net_profit": 3303.1,
        "equity": 22560.0,
        "nim_pct": 4.19,
        "cir_pct": 36.0,
        "roe_pct": 14.6,
        "ldr_pct": 87.1,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 218550.0,
        "loans": 145360.0,
        "deposits": 164500.0,
        "nii": 5792.3,
        "fees": 1984.2,
        "total_income": 7776.5,
        "opex": 2908.2,
        "ppop": 4868.3,
        "provisions": 525.4,
        "net_profit": 3474.3,
        "equity": 25380.0,
        "nim_pct": 3.98,
        "cir_pct": 37.4,
        "roe_pct": 13.7,
        "ldr_pct": 88.4,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 235000.0,
        "loans": 158000.0,
        "deposits": 175000.0,
        "nii": 6162.0,
        "fees": 2156.7,
        "total_income": 8318.7,
        "opex": 3161.1,
        "ppop": 5157.6,
        "provisions": 553.0,
        "net_profit": 3683.7,
        "equity": 28200.0,
        "nim_pct": 3.9,
        "cir_pct": 38.0,
        "roe_pct": 13.1,
        "ldr_pct": 90.3,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 253800.0,
        "loans": 170640.0,
        "deposits": 187250.0,
        "nii": 6655.0,
        "fees": 2329.2,
        "total_income": 8984.2,
        "opex": 3350.8,
        "ppop": 5633.4,
        "provisions": 525.4,
        "net_profit": 4086.4,
        "equity": 31584.0,
        "nim_pct": 3.9,
        "cir_pct": 37.3,
        "roe_pct": 12.9,
        "ldr_pct": 91.1,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 270250.0,
        "loans": 183280.0,
        "deposits": 199500.0,
        "nii": 7086.3,
        "fees": 2480.2,
        "total_income": 9566.5,
        "opex": 3540.4,
        "ppop": 6026.1,
        "provisions": 497.7,
        "net_profit": 4422.7,
        "equity": 34968.0,
        "nim_pct": 3.87,
        "cir_pct": 37.0,
        "roe_pct": 12.6,
        "ldr_pct": 91.9,
        "npl_pct": 0.9,
        "car_pct": 20.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 286700.0,
        "loans": 194340.0,
        "deposits": 210000.0,
        "nii": 7394.4,
        "fees": 2631.2,
        "total_income": 10025.6,
        "opex": 3730.1,
        "ppop": 6295.5,
        "provisions": 486.6,
        "net_profit": 4647.1,
        "equity": 38352.0,
        "nim_pct": 3.8,
        "cir_pct": 37.2,
        "roe_pct": 12.1,
        "ldr_pct": 92.5,
        "npl_pct": 0.9,
        "car_pct": 20.5
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 35.0
    },
    "debt_maturities": {
      "2025": 2256.0,
      "2026": 3760.0,
      "2027": 5264.0,
      "2028": 3384.0,
      "2029": 2256.0,
      "2030_plus": 1880.0,
      "total_outstanding_usd_m": 18800.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 82.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 82.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Saudi Arabia Commercial & Bankruptcy Code",
      "thesis": "World's largest Islamic retail bank; sub-1% cost of funds; 68% salary-assigned retail mortgages; ROE >20%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond RAJHI 4.75% 2029 trading at 100.8."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "rajhi",
        "issuer_name": "Al Rajhi Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "rajhi",
        "issuer_name": "Al Rajhi Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "rajhi",
        "issuer_name": "Al Rajhi Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "riyad",
      "name": "Riyad Bank",
      "ticker": "RIBL",
      "country": "Saudi Arabia",
      "region": "Middle East",
      "sector": "Banks",
      "type": "bank",
      "rating": "A2 / A",
      "tier": "IG",
      "benchmark_bond": "RIYAD 5.15% 2029",
      "price": 99.6,
      "ytm": 5.15,
      "spread_bp": 95,
      "model_file": "Riyad_Bank_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681638bc7f769eb59d81d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Riyad_Bank_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "assets": 84960.0,
        "loans": 52500.0,
        "deposits": 60680.0,
        "nii": 1560.0,
        "fees": 604.8,
        "total_income": 2164.8,
        "opex": 861.8,
        "ppop": 1303.0,
        "provisions": 337.5,
        "net_profit": 772.4,
        "equity": 9628.8,
        "nim_pct": 2.97,
        "cir_pct": 39.8,
        "roe_pct": 8.0,
        "ldr_pct": 86.5,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2022A",
        "is_audited": true,
        "assets": 99120.0,
        "loans": 61500.0,
        "deposits": 69700.0,
        "nii": 2112.0,
        "fees": 688.8,
        "total_income": 2800.8,
        "opex": 1009.6,
        "ppop": 1791.2,
        "provisions": 318.8,
        "net_profit": 1177.9,
        "equity": 11328.0,
        "nim_pct": 3.43,
        "cir_pct": 36.0,
        "roe_pct": 10.4,
        "ldr_pct": 88.2,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2023A",
        "is_audited": true,
        "assets": 109740.0,
        "loans": 69000.0,
        "deposits": 77080.0,
        "nii": 2256.0,
        "fees": 772.8,
        "total_income": 3028.8,
        "opex": 1132.7,
        "ppop": 1896.1,
        "provisions": 356.2,
        "net_profit": 1231.9,
        "equity": 12744.0,
        "nim_pct": 3.27,
        "cir_pct": 37.4,
        "roe_pct": 9.7,
        "ldr_pct": 89.5,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2024A",
        "is_audited": true,
        "assets": 118000.0,
        "loans": 75000.0,
        "deposits": 82000.0,
        "nii": 2400.0,
        "fees": 840.0,
        "total_income": 3240.0,
        "opex": 1231.2,
        "ppop": 2008.8,
        "provisions": 375.0,
        "net_profit": 1307.0,
        "equity": 14160.0,
        "nim_pct": 3.2,
        "cir_pct": 38.0,
        "roe_pct": 9.2,
        "ldr_pct": 91.5,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2025E",
        "is_audited": false,
        "assets": 127440.0,
        "loans": 81000.0,
        "deposits": 87740.0,
        "nii": 2592.0,
        "fees": 907.2,
        "total_income": 3499.2,
        "opex": 1305.1,
        "ppop": 2194.1,
        "provisions": 356.2,
        "net_profit": 1470.3,
        "equity": 15859.2,
        "nim_pct": 3.2,
        "cir_pct": 37.3,
        "roe_pct": 9.3,
        "ldr_pct": 92.3,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2026E",
        "is_audited": false,
        "assets": 135700.0,
        "loans": 87000.0,
        "deposits": 93480.0,
        "nii": 2760.0,
        "fees": 966.0,
        "total_income": 3726.0,
        "opex": 1378.9,
        "ppop": 2347.1,
        "provisions": 337.5,
        "net_profit": 1607.7,
        "equity": 17558.4,
        "nim_pct": 3.17,
        "cir_pct": 37.0,
        "roe_pct": 9.2,
        "ldr_pct": 93.1,
        "npl_pct": 1.6,
        "car_pct": 18.0
      },
      {
        "period": "2027E",
        "is_audited": false,
        "assets": 143960.0,
        "loans": 92250.0,
        "deposits": 98400.0,
        "nii": 2880.0,
        "fees": 1024.8,
        "total_income": 3904.8,
        "opex": 1452.8,
        "ppop": 2452.0,
        "provisions": 330.0,
        "net_profit": 1697.6,
        "equity": 19257.6,
        "nim_pct": 3.12,
        "cir_pct": 37.2,
        "roe_pct": 8.8,
        "ldr_pct": 93.8,
        "npl_pct": 1.6,
        "car_pct": 18.0
      }
    ],
    "supplementary_data": {
      "stage2_loans_pct": 7.8,
      "restructured_loans_pct": 2.6,
      "foreign_currency_loans_pct": 12.0,
      "liquidity_coverage_ratio_lcr_pct": 168.0,
      "net_stable_funding_ratio_nsfr_pct": 124.0,
      "cost_of_risk_bp": 50.0
    },
    "debt_maturities": {
      "2025": 1132.8,
      "2026": 1888.0,
      "2027": 2643.2,
      "2028": 1699.2,
      "2029": 1132.8,
      "2030_plus": 944.0,
      "total_outstanding_usd_m": 9440.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 76.0,
      "base_case_px": 100.5,
      "recovery_floor_pct": 76.0,
      "recovery_base_pct": 100.5,
      "implied_stress_ev_multiple": "N/A (Prudential Resolution)",
      "restructuring_framework": "Saudi Arabia Commercial & Bankruptcy Code",
      "thesis": "Premier corporate and syndicated debt arranger for Aramco and PIF projects."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond RIYAD 5.15% 2029 trading at 99.6."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "riyad",
        "issuer_name": "Riyad Bank",
        "sector": "Banks",
        "topic": "NIM Dynamics & Rate Cycle",
        "source": "Cognitive Credit / J.P. Morgan",
        "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
      },
      {
        "issuer_id": "riyad",
        "issuer_name": "Riyad Bank",
        "sector": "Banks",
        "topic": "Asset Quality & Stage 2 Exposure",
        "source": "BRSA / Central Bank Disclosures",
        "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
      },
      {
        "issuer_id": "riyad",
        "issuer_name": "Riyad Bank",
        "sector": "Banks",
        "topic": "Capital Adequacy & FX Sensitivity",
        "source": "Fitch / Moody's Rating Notes",
        "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
      }
    ]
  },
  {
    "metadata": {
      "id": "binghatti",
      "name": "Binghatti Holding",
      "ticker": "BINGHA",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "B+ / B",
      "tier": "B",
      "benchmark_bond": "BINGHA 8.85% 2027",
      "price": 101.5,
      "ytm": 8.85,
      "spread_bp": 480,
      "model_file": "Binghatti_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c6812dbacdd897773b09d9",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Binghatti_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 850.0,
        "ebitda": 247.0,
        "ebitda_margin_pct": 29.1,
        "cfo": 200.3,
        "capex": 93.1,
        "fcf": 107.2,
        "cash": 156.8,
        "gross_debt": 529.7,
        "net_debt": 372.9,
        "net_leverage": 1.51,
        "interest_coverage": 6.06
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1025.0,
        "ebitda": 304.0,
        "ebitda_margin_pct": 29.7,
        "cfo": 251.9,
        "capex": 113.0,
        "fcf": 138.9,
        "cash": 199.5,
        "gross_debt": 573.3,
        "net_debt": 373.8,
        "net_leverage": 1.23,
        "interest_coverage": 5.96
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1150.0,
        "ebitda": 342.0,
        "ebitda_margin_pct": 29.7,
        "cfo": 284.2,
        "capex": 126.3,
        "fcf": 157.9,
        "cash": 242.2,
        "gross_debt": 610.7,
        "net_debt": 368.5,
        "net_leverage": 1.08,
        "interest_coverage": 5.59
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1250.0,
        "ebitda": 380.0,
        "ebitda_margin_pct": 30.4,
        "cfo": 323.0,
        "capex": 133.0,
        "fcf": 190.0,
        "cash": 285.0,
        "gross_debt": 623.2,
        "net_debt": 338.2,
        "net_leverage": 0.89,
        "interest_coverage": 5.59
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1350.0,
        "ebitda": 418.0,
        "ebitda_margin_pct": 31.0,
        "cfo": 355.3,
        "capex": 139.7,
        "fcf": 215.6,
        "cash": 336.3,
        "gross_debt": 610.7,
        "net_debt": 274.4,
        "net_leverage": 0.66,
        "interest_coverage": 6.41
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1437.5,
        "ebitda": 448.4,
        "ebitda_margin_pct": 31.2,
        "cfo": 381.1,
        "capex": 135.7,
        "fcf": 245.4,
        "cash": 384.8,
        "gross_debt": 592.0,
        "net_debt": 207.2,
        "net_leverage": 0.46,
        "interest_coverage": 7.17
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1500.0,
        "ebitda": 471.2,
        "ebitda_margin_pct": 31.4,
        "cfo": 403.8,
        "capex": 130.3,
        "fcf": 273.5,
        "cash": 427.5,
        "gross_debt": 560.9,
        "net_debt": 133.4,
        "net_leverage": 0.28,
        "interest_coverage": 7.88
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 1687.5,
      "rera_escrow_balance_usd_m": 562.5,
      "unrestricted_cash_usd_m": 250.0,
      "backlog_revenue_usd_m": 3500.0,
      "land_bank_gfa_sqft": "30.8M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 2750
    },
    "debt_maturities": {
      "2025": 45.0,
      "2026": 75.0,
      "2027": 400.0,
      "2028": 50.0,
      "2029": 20.0,
      "2030_plus": 0.0,
      "total_outstanding_usd_m": 590.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 68.0,
      "base_case_px": 101.5,
      "recovery_floor_pct": 68.0,
      "recovery_base_pct": 101.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "FORENSIC FOCUS: $400M 2027 Sukuk covered by $280M cash + $380M RERA escrow profit releases upon handover; 0.89x net debt."
    },
    "timeline": [
      {
        "date": "Feb 2024",
        "event": "Issued $300M 9.625% inaugural 3-year Sukuk due Feb 2027 (oversubscribed 2.1x)."
      },
      {
        "date": "Jun 2024",
        "event": "Tapped Sukuk for additional $100M at 9.25% yield, bringing total benchmark tranche to $400M."
      },
      {
        "date": "Nov 2024",
        "event": "Launched Bugatti Residences and Mercedes-Benz Places luxury towers with >85% sell-out on day 1."
      },
      {
        "date": "2025-H1",
        "event": "RERA escrow accounts accumulate $340M+ in protected cash backing active development deliveries."
      },
      {
        "date": "Feb 2027",
        "event": "Scheduled $400M Sukuk bullet maturity; cash flow waterfall shows $680M available cash (1.70x coverage)."
      }
    ],
    "annotations": [
      {
        "issuer_id": "binghatti",
        "issuer_name": "Binghatti Holding",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "binghatti",
        "issuer_name": "Binghatti Holding",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "binghatti",
        "issuer_name": "Binghatti Holding",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "dar_arkan",
      "name": "Dar Al Arkan",
      "ticker": "DARARK",
      "country": "Saudi Arabia",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BB- / Ba3 / B+",
      "tier": "BB",
      "benchmark_bond": "DARARK 8.15% 2029",
      "price": 99.5,
      "ytm": 8.15,
      "spread_bp": 410,
      "model_file": "Dar_Al_Arkan_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c681118a96c1193e9c5315",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Dar_Al_Arkan_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 748.0,
        "ebitda": 234.0,
        "ebitda_margin_pct": 31.3,
        "cfo": 189.7,
        "capex": 88.2,
        "fcf": 101.5,
        "cash": 148.5,
        "gross_debt": 1291.3,
        "net_debt": 1142.8,
        "net_leverage": 4.88,
        "interest_coverage": 3.12
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 902.0,
        "ebitda": 288.0,
        "ebitda_margin_pct": 31.9,
        "cfo": 238.7,
        "capex": 107.1,
        "fcf": 131.6,
        "cash": 189.0,
        "gross_debt": 1397.7,
        "net_debt": 1208.7,
        "net_leverage": 4.2,
        "interest_coverage": 3.07
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1012.0,
        "ebitda": 324.0,
        "ebitda_margin_pct": 32.0,
        "cfo": 269.3,
        "capex": 119.7,
        "fcf": 149.6,
        "cash": 229.5,
        "gross_debt": 1488.8,
        "net_debt": 1259.3,
        "net_leverage": 3.89,
        "interest_coverage": 2.88
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1100.0,
        "ebitda": 360.0,
        "ebitda_margin_pct": 32.7,
        "cfo": 306.0,
        "capex": 126.0,
        "fcf": 180.0,
        "cash": 270.0,
        "gross_debt": 1519.2,
        "net_debt": 1249.2,
        "net_leverage": 3.47,
        "interest_coverage": 2.88
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1188.0,
        "ebitda": 396.0,
        "ebitda_margin_pct": 33.3,
        "cfo": 336.6,
        "capex": 132.3,
        "fcf": 204.3,
        "cash": 318.6,
        "gross_debt": 1488.8,
        "net_debt": 1170.2,
        "net_leverage": 2.96,
        "interest_coverage": 3.3
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1265.0,
        "ebitda": 424.8,
        "ebitda_margin_pct": 33.6,
        "cfo": 361.1,
        "capex": 128.5,
        "fcf": 232.6,
        "cash": 364.5,
        "gross_debt": 1443.2,
        "net_debt": 1078.7,
        "net_leverage": 2.54,
        "interest_coverage": 3.69
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1320.0,
        "ebitda": 446.4,
        "ebitda_margin_pct": 33.8,
        "cfo": 382.5,
        "capex": 123.5,
        "fcf": 259.0,
        "cash": 405.0,
        "gross_debt": 1367.3,
        "net_debt": 962.3,
        "net_leverage": 2.16,
        "interest_coverage": 4.06
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 1485.0,
      "rera_escrow_balance_usd_m": 495.0,
      "unrestricted_cash_usd_m": 220.0,
      "backlog_revenue_usd_m": 3080.0,
      "land_bank_gfa_sqft": "28.5M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 2420
    },
    "debt_maturities": {
      "2025": 149.9,
      "2026": 249.8,
      "2027": 349.8,
      "2028": 224.9,
      "2029": 149.9,
      "2030_plus": 124.9,
      "total_outstanding_usd_m": 1249.2
    },
    "recovery_analysis": {
      "distressed_floor_px": 66.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 66.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Saudi Arabia Commercial & Bankruptcy Code",
      "thesis": "12.4M+ sqm Saudi strategic land bank covering gross debt by 2.5x; $850M liquid cash fortress."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DARARK 8.15% 2029 trading at 99.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dar_arkan",
        "issuer_name": "Dar Al Arkan",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "dar_arkan",
        "issuer_name": "Dar Al Arkan",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "dar_arkan",
        "issuer_name": "Dar Al Arkan",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "sobha",
      "name": "Sobha Realty",
      "ticker": "SOBHA",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BB- / Ba3",
      "tier": "BB",
      "benchmark_bond": "SOBHA 7.95% 2028",
      "price": 102.0,
      "ytm": 7.95,
      "spread_bp": 390,
      "model_file": "Sobha_Realty_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c6814fa4cfff9fdb4e339d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Sobha_Realty_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1122.0,
        "ebitda": 312.0,
        "ebitda_margin_pct": 27.8,
        "cfo": 253.0,
        "capex": 117.6,
        "fcf": 135.4,
        "cash": 198.0,
        "gross_debt": 644.6,
        "net_debt": 446.6,
        "net_leverage": 1.43,
        "interest_coverage": 6.34
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1353.0,
        "ebitda": 384.0,
        "ebitda_margin_pct": 28.4,
        "cfo": 318.2,
        "capex": 142.8,
        "fcf": 175.4,
        "cash": 252.0,
        "gross_debt": 697.7,
        "net_debt": 445.7,
        "net_leverage": 1.16,
        "interest_coverage": 6.24
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1518.0,
        "ebitda": 432.0,
        "ebitda_margin_pct": 28.5,
        "cfo": 359.0,
        "capex": 159.6,
        "fcf": 199.4,
        "cash": 306.0,
        "gross_debt": 743.2,
        "net_debt": 437.2,
        "net_leverage": 1.01,
        "interest_coverage": 5.85
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1650.0,
        "ebitda": 480.0,
        "ebitda_margin_pct": 29.1,
        "cfo": 408.0,
        "capex": 168.0,
        "fcf": 240.0,
        "cash": 360.0,
        "gross_debt": 758.4,
        "net_debt": 398.4,
        "net_leverage": 0.83,
        "interest_coverage": 5.85
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1782.0,
        "ebitda": 528.0,
        "ebitda_margin_pct": 29.6,
        "cfo": 448.8,
        "capex": 176.4,
        "fcf": 272.4,
        "cash": 424.8,
        "gross_debt": 743.2,
        "net_debt": 318.4,
        "net_leverage": 0.6,
        "interest_coverage": 6.7
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1897.5,
        "ebitda": 566.4,
        "ebitda_margin_pct": 29.8,
        "cfo": 481.4,
        "capex": 171.4,
        "fcf": 310.0,
        "cash": 486.0,
        "gross_debt": 720.5,
        "net_debt": 234.5,
        "net_leverage": 0.41,
        "interest_coverage": 7.5
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1980.0,
        "ebitda": 595.2,
        "ebitda_margin_pct": 30.1,
        "cfo": 510.0,
        "capex": 164.6,
        "fcf": 345.4,
        "cash": 540.0,
        "gross_debt": 682.6,
        "net_debt": 142.6,
        "net_leverage": 0.24,
        "interest_coverage": 8.24
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 2227.5,
      "rera_escrow_balance_usd_m": 742.5,
      "unrestricted_cash_usd_m": 330.0,
      "backlog_revenue_usd_m": 4620.0,
      "land_bank_gfa_sqft": "36.8M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 3630
    },
    "debt_maturities": {
      "2025": 47.8,
      "2026": 79.7,
      "2027": 111.6,
      "2028": 71.7,
      "2029": 47.8,
      "2030_plus": 39.8,
      "total_outstanding_usd_m": 398.4
    },
    "recovery_analysis": {
      "distressed_floor_px": 70.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 70.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "100% backward integrated self-construction model; zero contractor failure risk; prime MBR City land bank."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SOBHA 7.95% 2028 trading at 102.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "sobha",
        "issuer_name": "Sobha Realty",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "sobha",
        "issuer_name": "Sobha Realty",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "sobha",
        "issuer_name": "Sobha Realty",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "arada",
      "name": "Arada Developments",
      "ticker": "ARADA",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "B+ / B1",
      "tier": "B",
      "benchmark_bond": "ARADA 8.05% 2029",
      "price": 100.5,
      "ytm": 8.05,
      "spread_bp": 400,
      "model_file": "Arada_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c6819c9db2e3117db89214",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Arada_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 625.6,
        "ebitda": 175.5,
        "ebitda_margin_pct": 28.1,
        "cfo": 142.3,
        "capex": 66.1,
        "fcf": 76.2,
        "cash": 111.4,
        "gross_debt": 605.9,
        "net_debt": 494.5,
        "net_leverage": 2.82,
        "interest_coverage": 4.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 754.4,
        "ebitda": 216.0,
        "ebitda_margin_pct": 28.6,
        "cfo": 179.0,
        "capex": 80.3,
        "fcf": 98.7,
        "cash": 141.8,
        "gross_debt": 655.8,
        "net_debt": 514.0,
        "net_leverage": 2.38,
        "interest_coverage": 4.43
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 846.4,
        "ebitda": 243.0,
        "ebitda_margin_pct": 28.7,
        "cfo": 202.0,
        "capex": 89.8,
        "fcf": 112.2,
        "cash": 172.1,
        "gross_debt": 698.5,
        "net_debt": 526.4,
        "net_leverage": 2.17,
        "interest_coverage": 4.15
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 920.0,
        "ebitda": 270.0,
        "ebitda_margin_pct": 29.3,
        "cfo": 229.5,
        "capex": 94.5,
        "fcf": 135.0,
        "cash": 202.5,
        "gross_debt": 712.8,
        "net_debt": 510.3,
        "net_leverage": 1.89,
        "interest_coverage": 4.15
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 993.6,
        "ebitda": 297.0,
        "ebitda_margin_pct": 29.9,
        "cfo": 252.5,
        "capex": 99.2,
        "fcf": 153.3,
        "cash": 238.9,
        "gross_debt": 698.5,
        "net_debt": 459.6,
        "net_leverage": 1.55,
        "interest_coverage": 4.76
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1058.0,
        "ebitda": 318.6,
        "ebitda_margin_pct": 30.1,
        "cfo": 270.8,
        "capex": 96.4,
        "fcf": 174.4,
        "cash": 273.4,
        "gross_debt": 677.2,
        "net_debt": 403.8,
        "net_leverage": 1.27,
        "interest_coverage": 5.32
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1104.0,
        "ebitda": 334.8,
        "ebitda_margin_pct": 30.3,
        "cfo": 286.9,
        "capex": 92.6,
        "fcf": 194.3,
        "cash": 303.8,
        "gross_debt": 641.5,
        "net_debt": 337.7,
        "net_leverage": 1.01,
        "interest_coverage": 5.85
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 1242.0,
      "rera_escrow_balance_usd_m": 414.0,
      "unrestricted_cash_usd_m": 184.0,
      "backlog_revenue_usd_m": 2576.0,
      "land_bank_gfa_sqft": "25.8M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 2024
    },
    "debt_maturities": {
      "2025": 61.2,
      "2026": 102.1,
      "2027": 142.9,
      "2028": 91.9,
      "2029": 61.2,
      "2030_plus": 51.0,
      "total_outstanding_usd_m": 510.3
    },
    "recovery_analysis": {
      "distressed_floor_px": 65.0,
      "base_case_px": 100.5,
      "recovery_floor_pct": 65.0,
      "recovery_base_pct": 100.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Royal shareholding (Sharjah ruling family); Sharjah master development monopoly + Dubai expansion."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ARADA 8.05% 2029 trading at 100.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "arada",
        "issuer_name": "Arada Developments",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "arada",
        "issuer_name": "Arada Developments",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "arada",
        "issuer_name": "Arada Developments",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "damac",
      "name": "Damac Properties",
      "ticker": "DAMAC",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BB- / Ba3",
      "tier": "BB",
      "benchmark_bond": "DAMAC 7.25% 2027",
      "price": 101.0,
      "ytm": 7.25,
      "spread_bp": 320,
      "model_file": "Damac_Properties_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c68194b911c9627e4c0595",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Damac_Properties_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1428.0,
        "ebitda": 442.0,
        "ebitda_margin_pct": 31.0,
        "cfo": 358.4,
        "capex": 166.6,
        "fcf": 191.8,
        "cash": 280.5,
        "gross_debt": 601.1,
        "net_debt": 320.6,
        "net_leverage": 0.73,
        "interest_coverage": 7.52
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1722.0,
        "ebitda": 544.0,
        "ebitda_margin_pct": 31.6,
        "cfo": 450.8,
        "capex": 202.3,
        "fcf": 248.5,
        "cash": 357.0,
        "gross_debt": 650.6,
        "net_debt": 293.6,
        "net_leverage": 0.54,
        "interest_coverage": 7.4
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1932.0,
        "ebitda": 612.0,
        "ebitda_margin_pct": 31.7,
        "cfo": 508.6,
        "capex": 226.1,
        "fcf": 282.5,
        "cash": 433.5,
        "gross_debt": 693.1,
        "net_debt": 259.6,
        "net_leverage": 0.42,
        "interest_coverage": 6.94
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 2100.0,
        "ebitda": 680.0,
        "ebitda_margin_pct": 32.4,
        "cfo": 578.0,
        "capex": 238.0,
        "fcf": 340.0,
        "cash": 510.0,
        "gross_debt": 707.2,
        "net_debt": 197.2,
        "net_leverage": 0.29,
        "interest_coverage": 6.94
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 2268.0,
        "ebitda": 748.0,
        "ebitda_margin_pct": 33.0,
        "cfo": 635.8,
        "capex": 249.9,
        "fcf": 385.9,
        "cash": 601.8,
        "gross_debt": 693.1,
        "net_debt": 91.3,
        "net_leverage": 0.12,
        "interest_coverage": 7.95
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 2415.0,
        "ebitda": 802.4,
        "ebitda_margin_pct": 33.2,
        "cfo": 682.0,
        "capex": 242.8,
        "fcf": 439.2,
        "cash": 688.5,
        "gross_debt": 671.8,
        "net_debt": 0.0,
        "net_leverage": 0.0,
        "interest_coverage": 8.9
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 2520.0,
        "ebitda": 843.2,
        "ebitda_margin_pct": 33.5,
        "cfo": 722.5,
        "capex": 233.2,
        "fcf": 489.3,
        "cash": 765.0,
        "gross_debt": 636.5,
        "net_debt": 0.0,
        "net_leverage": 0.0,
        "interest_coverage": 9.78
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 2835.0,
      "rera_escrow_balance_usd_m": 945.0,
      "unrestricted_cash_usd_m": 420.0,
      "backlog_revenue_usd_m": 5880.0,
      "land_bank_gfa_sqft": "43.5M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 4620
    },
    "debt_maturities": {
      "2025": 23.7,
      "2026": 39.4,
      "2027": 55.2,
      "2028": 35.5,
      "2029": 23.7,
      "2030_plus": 19.7,
      "total_outstanding_usd_m": 197.2
    },
    "recovery_analysis": {
      "distressed_floor_px": 75.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 75.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "$1.15B cash balance covering total gross debt; 46k homes delivered; negligible 0.29x net debt."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DAMAC 7.25% 2027 trading at 101.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "damac",
        "issuer_name": "Damac Properties",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "damac",
        "issuer_name": "Damac Properties",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "damac",
        "issuer_name": "Damac Properties",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "emaar",
      "name": "Emaar Properties",
      "ticker": "EMAAR",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BBB / Baa2",
      "tier": "IG",
      "benchmark_bond": "EMAAR 5.15% 2030",
      "price": 100.2,
      "ytm": 5.15,
      "spread_bp": 95,
      "model_file": "Emaar_Properties_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Emaar_Properties_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 5304.0,
        "ebitda": 2080.0,
        "ebitda_margin_pct": 39.2,
        "cfo": 1686.4,
        "capex": 784.0,
        "fcf": 902.4,
        "cash": 1320.0,
        "gross_debt": 274040.0,
        "net_debt": 272720.0,
        "net_leverage": 131.12,
        "interest_coverage": 10.83
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 6396.0,
        "ebitda": 2560.0,
        "ebitda_margin_pct": 40.0,
        "cfo": 2121.6,
        "capex": 952.0,
        "fcf": 1169.6,
        "cash": 1680.0,
        "gross_debt": 296608.0,
        "net_debt": 294928.0,
        "net_leverage": 115.21,
        "interest_coverage": 10.67
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 7176.0,
        "ebitda": 2880.0,
        "ebitda_margin_pct": 40.1,
        "cfo": 2393.6,
        "capex": 1064.0,
        "fcf": 1329.6,
        "cash": 2040.0,
        "gross_debt": 315952.0,
        "net_debt": 313912.0,
        "net_leverage": 109.0,
        "interest_coverage": 10.0
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 7800.0,
        "ebitda": 3200.0,
        "ebitda_margin_pct": 41.0,
        "cfo": 2720.0,
        "capex": 1120.0,
        "fcf": 1600.0,
        "cash": 2400.0,
        "gross_debt": 322400.0,
        "net_debt": 320000.0,
        "net_leverage": 100.0,
        "interest_coverage": 10.0
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 8424.0,
        "ebitda": 3520.0,
        "ebitda_margin_pct": 41.8,
        "cfo": 2992.0,
        "capex": 1176.0,
        "fcf": 1816.0,
        "cash": 2832.0,
        "gross_debt": 315952.0,
        "net_debt": 313120.0,
        "net_leverage": 88.95,
        "interest_coverage": 11.46
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 8970.0,
        "ebitda": 3776.0,
        "ebitda_margin_pct": 42.1,
        "cfo": 3209.6,
        "capex": 1142.4,
        "fcf": 2067.2,
        "cash": 3240.0,
        "gross_debt": 306280.0,
        "net_debt": 303040.0,
        "net_leverage": 80.25,
        "interest_coverage": 12.83
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 9360.0,
        "ebitda": 3968.0,
        "ebitda_margin_pct": 42.4,
        "cfo": 3400.0,
        "capex": 1097.6,
        "fcf": 2302.4,
        "cash": 3600.0,
        "gross_debt": 290160.0,
        "net_debt": 286560.0,
        "net_leverage": 72.22,
        "interest_coverage": 14.09
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 10530.0,
      "rera_escrow_balance_usd_m": 3510.0,
      "unrestricted_cash_usd_m": 1560.0,
      "backlog_revenue_usd_m": 21840.0,
      "land_bank_gfa_sqft": "129.0M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 17160
    },
    "debt_maturities": {
      "2025": 38400.0,
      "2026": 64000.0,
      "2027": 89600.0,
      "2028": 57600.0,
      "2029": 38400.0,
      "2030_plus": 32000.0,
      "total_outstanding_usd_m": 320000.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 101.5,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 101.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Burj Khalifa and Dubai Mall monopoly cash flows; net cash balance sheet; sovereign benchmark."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond EMAAR 5.15% 2030 trading at 100.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "emaar",
        "issuer_name": "Emaar Properties",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "emaar",
        "issuer_name": "Emaar Properties",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "emaar",
        "issuer_name": "Emaar Properties",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "aldar",
      "name": "Aldar Properties",
      "ticker": "ALDAR",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BBB- / Baa2",
      "tier": "IG",
      "benchmark_bond": "ALDAR 5.25% 2029",
      "price": 100.1,
      "ytm": 5.25,
      "spread_bp": 105,
      "model_file": "Aldar_Properties_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681afbac4c1e95132bc44",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Aldar_Properties_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 2652.0,
        "ebitda": 1007.5,
        "ebitda_margin_pct": 38.0,
        "cfo": 816.9,
        "capex": 379.8,
        "fcf": 437.1,
        "cash": 639.4,
        "gross_debt": 1660.0,
        "net_debt": 1020.6,
        "net_leverage": 1.01,
        "interest_coverage": 8.02
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 3198.0,
        "ebitda": 1240.0,
        "ebitda_margin_pct": 38.8,
        "cfo": 1027.7,
        "capex": 461.1,
        "fcf": 566.6,
        "cash": 813.8,
        "gross_debt": 1796.8,
        "net_debt": 983.0,
        "net_leverage": 0.79,
        "interest_coverage": 7.89
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 3588.0,
        "ebitda": 1395.0,
        "ebitda_margin_pct": 38.9,
        "cfo": 1159.4,
        "capex": 515.4,
        "fcf": 644.0,
        "cash": 988.1,
        "gross_debt": 1913.9,
        "net_debt": 925.8,
        "net_leverage": 0.66,
        "interest_coverage": 7.4
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 3900.0,
        "ebitda": 1550.0,
        "ebitda_margin_pct": 39.7,
        "cfo": 1317.5,
        "capex": 542.5,
        "fcf": 775.0,
        "cash": 1162.5,
        "gross_debt": 1953.0,
        "net_debt": 790.5,
        "net_leverage": 0.51,
        "interest_coverage": 7.4
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 4212.0,
        "ebitda": 1705.0,
        "ebitda_margin_pct": 40.5,
        "cfo": 1449.3,
        "capex": 569.6,
        "fcf": 879.7,
        "cash": 1371.8,
        "gross_debt": 1913.9,
        "net_debt": 542.1,
        "net_leverage": 0.32,
        "interest_coverage": 8.48
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 4485.0,
        "ebitda": 1829.0,
        "ebitda_margin_pct": 40.8,
        "cfo": 1554.6,
        "capex": 553.4,
        "fcf": 1001.2,
        "cash": 1569.4,
        "gross_debt": 1855.3,
        "net_debt": 285.9,
        "net_leverage": 0.16,
        "interest_coverage": 9.49
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 4680.0,
        "ebitda": 1922.0,
        "ebitda_margin_pct": 41.1,
        "cfo": 1646.9,
        "capex": 531.6,
        "fcf": 1115.3,
        "cash": 1743.8,
        "gross_debt": 1757.7,
        "net_debt": 13.9,
        "net_leverage": 0.01,
        "interest_coverage": 10.43
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 5265.0,
      "rera_escrow_balance_usd_m": 1755.0,
      "unrestricted_cash_usd_m": 780.0,
      "backlog_revenue_usd_m": 10920.0,
      "land_bank_gfa_sqft": "70.5M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 8580
    },
    "debt_maturities": {
      "2025": 94.9,
      "2026": 158.1,
      "2027": 221.3,
      "2028": 142.3,
      "2029": 94.9,
      "2030_plus": 79.1,
      "total_outstanding_usd_m": 790.6
    },
    "recovery_analysis": {
      "distressed_floor_px": 78.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 78.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Abu Dhabi sovereign master developer; recurring rental income covers interest by 4x; Alpha Dhabi backing."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ALDAR 5.25% 2029 trading at 100.1."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "aldar",
        "issuer_name": "Aldar Properties",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "aldar",
        "issuer_name": "Aldar Properties",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "aldar",
        "issuer_name": "Aldar Properties",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "zorlu",
      "name": "Zorlu Enerji",
      "ticker": "ZOREN",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "B- / CCC+",
      "tier": "B",
      "benchmark_bond": "ZOREN 9.00% 2026",
      "price": 94.5,
      "ytm": 11.2,
      "spread_bp": 680,
      "model_file": "Zorlu_Enerji_Model.xlsx",
      "notion_id": "3df1d0ad68c6814f921ef33f2b2f199b",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Zorlu_Enerji_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 816.0,
        "ebitda": 208.0,
        "ebitda_margin_pct": 25.5,
        "cfo": 168.6,
        "capex": 78.4,
        "fcf": 90.2,
        "cash": 132.0,
        "gross_debt": 1515.0,
        "net_debt": 1383.0,
        "net_leverage": 6.65,
        "interest_coverage": 2.3
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 984.0,
        "ebitda": 256.0,
        "ebitda_margin_pct": 26.0,
        "cfo": 212.2,
        "capex": 95.2,
        "fcf": 117.0,
        "cash": 168.0,
        "gross_debt": 1639.8,
        "net_debt": 1471.8,
        "net_leverage": 5.75,
        "interest_coverage": 2.26
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1104.0,
        "ebitda": 288.0,
        "ebitda_margin_pct": 26.1,
        "cfo": 239.4,
        "capex": 106.4,
        "fcf": 133.0,
        "cash": 204.0,
        "gross_debt": 1746.8,
        "net_debt": 1542.8,
        "net_leverage": 5.36,
        "interest_coverage": 2.12
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1200.0,
        "ebitda": 320.0,
        "ebitda_margin_pct": 26.7,
        "cfo": 272.0,
        "capex": 112.0,
        "fcf": 160.0,
        "cash": 240.0,
        "gross_debt": 1782.4,
        "net_debt": 1542.4,
        "net_leverage": 4.82,
        "interest_coverage": 2.12
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1296.0,
        "ebitda": 352.0,
        "ebitda_margin_pct": 27.2,
        "cfo": 299.2,
        "capex": 117.6,
        "fcf": 181.6,
        "cash": 283.2,
        "gross_debt": 1746.8,
        "net_debt": 1463.6,
        "net_leverage": 4.16,
        "interest_coverage": 2.43
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1380.0,
        "ebitda": 377.6,
        "ebitda_margin_pct": 27.4,
        "cfo": 321.0,
        "capex": 114.2,
        "fcf": 206.8,
        "cash": 324.0,
        "gross_debt": 1693.3,
        "net_debt": 1369.3,
        "net_leverage": 3.63,
        "interest_coverage": 2.72
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1440.0,
        "ebitda": 396.8,
        "ebitda_margin_pct": 27.6,
        "cfo": 340.0,
        "capex": 109.8,
        "fcf": 230.2,
        "cash": 360.0,
        "gross_debt": 1604.2,
        "net_debt": 1244.2,
        "net_leverage": 3.14,
        "interest_coverage": 2.99
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 2160.0,
      "generation_volume_gwh": 7800.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 185.1,
      "2026": 308.5,
      "2027": 431.9,
      "2028": 277.6,
      "2029": 185.1,
      "2030_plus": 154.2,
      "total_outstanding_usd_m": 1542.4
    },
    "recovery_analysis": {
      "distressed_floor_px": 58.0,
      "base_case_px": 95.0,
      "recovery_floor_pct": 58.0,
      "recovery_base_pct": 95.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "High geothermal/hydro cash margins; AlJomaih asset divestment and deleveraging underway."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ZOREN 9.00% 2026 trading at 94.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "zorlu",
        "issuer_name": "Zorlu Enerji",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "zorlu",
        "issuer_name": "Zorlu Enerji",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "zorlu",
        "issuer_name": "Zorlu Enerji",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "limak_ren",
      "name": "Limak Renewable",
      "ticker": "LMKREN",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "B+ / B2",
      "tier": "B",
      "benchmark_bond": "LIMAK 8.75% 2028",
      "price": 98.2,
      "ytm": 8.75,
      "spread_bp": 435,
      "model_file": "Limak_Renewable_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68159bc09d6b94337462d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Limak_Renewable_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 258.4,
        "ebitda": 178.8,
        "ebitda_margin_pct": 69.2,
        "cfo": 144.9,
        "capex": 67.4,
        "fcf": 77.5,
        "cash": 113.4,
        "gross_debt": 1110.3,
        "net_debt": 996.9,
        "net_leverage": 5.58,
        "interest_coverage": 3.47
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 311.6,
        "ebitda": 220.0,
        "ebitda_margin_pct": 70.6,
        "cfo": 182.3,
        "capex": 81.8,
        "fcf": 100.5,
        "cash": 144.4,
        "gross_debt": 1201.8,
        "net_debt": 1057.4,
        "net_leverage": 4.81,
        "interest_coverage": 3.41
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 349.6,
        "ebitda": 247.5,
        "ebitda_margin_pct": 70.8,
        "cfo": 205.7,
        "capex": 91.4,
        "fcf": 114.3,
        "cash": 175.3,
        "gross_debt": 1280.1,
        "net_debt": 1104.8,
        "net_leverage": 4.46,
        "interest_coverage": 3.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 380.0,
        "ebitda": 275.0,
        "ebitda_margin_pct": 72.4,
        "cfo": 233.8,
        "capex": 96.2,
        "fcf": 137.6,
        "cash": 206.2,
        "gross_debt": 1306.2,
        "net_debt": 1100.0,
        "net_leverage": 4.0,
        "interest_coverage": 3.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 410.4,
        "ebitda": 302.5,
        "ebitda_margin_pct": 73.7,
        "cfo": 257.1,
        "capex": 101.1,
        "fcf": 156.0,
        "cash": 243.4,
        "gross_debt": 1280.1,
        "net_debt": 1036.7,
        "net_leverage": 3.43,
        "interest_coverage": 3.67
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 437.0,
        "ebitda": 324.5,
        "ebitda_margin_pct": 74.3,
        "cfo": 275.8,
        "capex": 98.2,
        "fcf": 177.6,
        "cash": 278.4,
        "gross_debt": 1240.9,
        "net_debt": 962.5,
        "net_leverage": 2.97,
        "interest_coverage": 4.1
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 456.0,
        "ebitda": 341.0,
        "ebitda_margin_pct": 74.8,
        "cfo": 292.2,
        "capex": 94.3,
        "fcf": 197.9,
        "cash": 309.4,
        "gross_debt": 1175.6,
        "net_debt": 866.2,
        "net_leverage": 2.54,
        "interest_coverage": 4.51
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 684.0,
      "generation_volume_gwh": 2470.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 132.0,
      "2026": 220.0,
      "2027": 308.0,
      "2028": 198.0,
      "2029": 132.0,
      "2030_plus": 110.0,
      "total_outstanding_usd_m": 1100.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 70.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 70.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "1,060 MW hydro & solar portfolio; 72% EBITDA margin; YEKDEM 7.3c/kWh dollar floor guarantee."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond LIMAK 8.75% 2028 trading at 98.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "limak_ren",
        "issuer_name": "Limak Renewable",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "limak_ren",
        "issuer_name": "Limak Renewable",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "limak_ren",
        "issuer_name": "Limak Renewable",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "limak_cem",
      "name": "Limak Cement",
      "ticker": "LMKCEM",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Materials",
      "type": "corp",
      "rating": "B+ / B",
      "tier": "B",
      "benchmark_bond": "LIMAKC 8.25% 2028",
      "price": 98.8,
      "ytm": 8.25,
      "spread_bp": 385,
      "model_file": "Limak_Cement_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681a6af2eda8612047901",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Limak_Cement_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 448.8,
        "ebitda": 120.2,
        "ebitda_margin_pct": 26.8,
        "cfo": 97.5,
        "capex": 45.3,
        "fcf": 52.2,
        "cash": 76.3,
        "gross_debt": 474.9,
        "net_debt": 398.6,
        "net_leverage": 3.32,
        "interest_coverage": 5.2
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 541.2,
        "ebitda": 148.0,
        "ebitda_margin_pct": 27.3,
        "cfo": 122.7,
        "capex": 55.0,
        "fcf": 67.7,
        "cash": 97.1,
        "gross_debt": 514.0,
        "net_debt": 416.9,
        "net_leverage": 2.82,
        "interest_coverage": 5.12
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 607.2,
        "ebitda": 166.5,
        "ebitda_margin_pct": 27.4,
        "cfo": 138.4,
        "capex": 61.5,
        "fcf": 76.9,
        "cash": 117.9,
        "gross_debt": 547.5,
        "net_debt": 429.6,
        "net_leverage": 2.58,
        "interest_coverage": 4.8
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 660.0,
        "ebitda": 185.0,
        "ebitda_margin_pct": 28.0,
        "cfo": 157.2,
        "capex": 64.8,
        "fcf": 92.4,
        "cash": 138.8,
        "gross_debt": 558.7,
        "net_debt": 419.9,
        "net_leverage": 2.27,
        "interest_coverage": 4.8
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 712.8,
        "ebitda": 203.5,
        "ebitda_margin_pct": 28.5,
        "cfo": 173.0,
        "capex": 68.0,
        "fcf": 105.0,
        "cash": 163.7,
        "gross_debt": 547.5,
        "net_debt": 383.8,
        "net_leverage": 1.89,
        "interest_coverage": 5.5
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 759.0,
        "ebitda": 218.3,
        "ebitda_margin_pct": 28.8,
        "cfo": 185.6,
        "capex": 66.0,
        "fcf": 119.6,
        "cash": 187.3,
        "gross_debt": 530.8,
        "net_debt": 343.5,
        "net_leverage": 1.57,
        "interest_coverage": 6.16
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 792.0,
        "ebitda": 229.4,
        "ebitda_margin_pct": 29.0,
        "cfo": 196.6,
        "capex": 63.5,
        "fcf": 133.1,
        "cash": 208.1,
        "gross_debt": 502.8,
        "net_debt": 294.7,
        "net_leverage": 1.28,
        "interest_coverage": 6.76
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 4.48,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 79.2
    },
    "debt_maturities": {
      "2025": 50.4,
      "2026": 84.0,
      "2027": 117.6,
      "2028": 75.6,
      "2029": 50.4,
      "2030_plus": 42.0,
      "total_outstanding_usd_m": 420.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 68.0,
      "base_case_px": 98.0,
      "recovery_floor_pct": 68.0,
      "recovery_base_pct": 98.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Integrated Turkish plants + West Africa exports; major supplier for earthquake reconstruction."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond LIMAKC 8.25% 2028 trading at 98.8."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "limak_cem",
        "issuer_name": "Limak Cement",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "limak_cem",
        "issuer_name": "Limak Cement",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "limak_cem",
        "issuer_name": "Limak Cement",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "limak_port",
      "name": "LimakPort İskenderun",
      "ticker": "LMKPRT",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Infrastructure",
      "type": "corp",
      "rating": "B / B3",
      "tier": "B",
      "benchmark_bond": "LIMPRT 7.85% 2036",
      "price": 98.5,
      "ytm": 7.85,
      "spread_bp": 345,
      "model_file": "Limak_Port_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6814ab652d1e6a4fb5446",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Limak_Port_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 81.6,
        "ebitda": 50.7,
        "ebitda_margin_pct": 62.1,
        "cfo": 41.1,
        "capex": 19.1,
        "fcf": 22.0,
        "cash": 32.2,
        "gross_debt": 253.9,
        "net_debt": 221.7,
        "net_leverage": 4.37,
        "interest_coverage": 4.55
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 98.4,
        "ebitda": 62.4,
        "ebitda_margin_pct": 63.4,
        "cfo": 51.7,
        "capex": 23.2,
        "fcf": 28.5,
        "cash": 40.9,
        "gross_debt": 274.8,
        "net_debt": 233.9,
        "net_leverage": 3.75,
        "interest_coverage": 4.48
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 110.4,
        "ebitda": 70.2,
        "ebitda_margin_pct": 63.6,
        "cfo": 58.3,
        "capex": 25.9,
        "fcf": 32.4,
        "cash": 49.7,
        "gross_debt": 292.8,
        "net_debt": 243.1,
        "net_leverage": 3.46,
        "interest_coverage": 4.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 120.0,
        "ebitda": 78.0,
        "ebitda_margin_pct": 65.0,
        "cfo": 66.3,
        "capex": 27.3,
        "fcf": 39.0,
        "cash": 58.5,
        "gross_debt": 298.7,
        "net_debt": 240.2,
        "net_leverage": 3.08,
        "interest_coverage": 4.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 129.6,
        "ebitda": 85.8,
        "ebitda_margin_pct": 66.2,
        "cfo": 72.9,
        "capex": 28.7,
        "fcf": 44.2,
        "cash": 69.0,
        "gross_debt": 292.8,
        "net_debt": 223.8,
        "net_leverage": 2.61,
        "interest_coverage": 4.81
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 138.0,
        "ebitda": 92.0,
        "ebitda_margin_pct": 66.7,
        "cfo": 78.2,
        "capex": 27.8,
        "fcf": 50.4,
        "cash": 79.0,
        "gross_debt": 283.8,
        "net_debt": 204.8,
        "net_leverage": 2.23,
        "interest_coverage": 5.38
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 144.0,
        "ebitda": 96.7,
        "ebitda_margin_pct": 67.2,
        "cfo": 82.9,
        "capex": 26.8,
        "fcf": 56.1,
        "cash": 87.8,
        "gross_debt": 268.9,
        "net_debt": 181.1,
        "net_leverage": 1.87,
        "interest_coverage": 5.92
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 264.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 28.8,
      "2026": 48.0,
      "2027": 67.3,
      "2028": 43.2,
      "2029": 28.8,
      "2030_plus": 24.0,
      "total_outstanding_usd_m": 240.1
    },
    "recovery_analysis": {
      "distressed_floor_px": 75.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 75.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "36-year deepwater BOT concession; 100% USD-denominated tariffs; 65% EBITDA margin."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond LIMPRT 7.85% 2036 trading at 98.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "limak_port",
        "issuer_name": "LimakPort İskenderun",
        "sector": "Infrastructure",
        "topic": "Concession Duration & Moat",
        "source": "Cognitive Credit / S&P Global",
        "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
      },
      {
        "issuer_id": "limak_port",
        "issuer_name": "LimakPort İskenderun",
        "sector": "Infrastructure",
        "topic": "Throughput & Capacity Utilization",
        "source": "Port Authority Filings",
        "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
      },
      {
        "issuer_id": "limak_port",
        "issuer_name": "LimakPort İskenderun",
        "sector": "Infrastructure",
        "topic": "Structural Subordination & Waterfall",
        "source": "Bond Offering Circular",
        "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
      }
    ]
  },
  {
    "metadata": {
      "id": "aydem",
      "name": "Aydem Renewable",
      "ticker": "AYDEM",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "B / B3",
      "tier": "B",
      "benchmark_bond": "AYDEM 8.95% 2027",
      "price": 96.5,
      "ytm": 8.95,
      "spread_bp": 455,
      "model_file": "Aydem_Renewable_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681008c2ee5226c1af03d",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Aydem_Renewable_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 176.8,
        "ebitda": 123.5,
        "ebitda_margin_pct": 69.9,
        "cfo": 100.1,
        "capex": 46.5,
        "fcf": 53.6,
        "cash": 78.4,
        "gross_debt": 784.9,
        "net_debt": 706.5,
        "net_leverage": 5.72,
        "interest_coverage": 3.14
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 213.2,
        "ebitda": 152.0,
        "ebitda_margin_pct": 71.3,
        "cfo": 126.0,
        "capex": 56.5,
        "fcf": 69.5,
        "cash": 99.8,
        "gross_debt": 849.5,
        "net_debt": 749.7,
        "net_leverage": 4.93,
        "interest_coverage": 3.09
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 239.2,
        "ebitda": 171.0,
        "ebitda_margin_pct": 71.5,
        "cfo": 142.1,
        "capex": 63.2,
        "fcf": 78.9,
        "cash": 121.1,
        "gross_debt": 904.9,
        "net_debt": 783.8,
        "net_leverage": 4.58,
        "interest_coverage": 2.9
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 260.0,
        "ebitda": 190.0,
        "ebitda_margin_pct": 73.1,
        "cfo": 161.5,
        "capex": 66.5,
        "fcf": 95.0,
        "cash": 142.5,
        "gross_debt": 923.4,
        "net_debt": 780.9,
        "net_leverage": 4.11,
        "interest_coverage": 2.9
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 280.8,
        "ebitda": 209.0,
        "ebitda_margin_pct": 74.4,
        "cfo": 177.7,
        "capex": 69.8,
        "fcf": 107.9,
        "cash": 168.1,
        "gross_debt": 904.9,
        "net_debt": 736.8,
        "net_leverage": 3.53,
        "interest_coverage": 3.32
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 299.0,
        "ebitda": 224.2,
        "ebitda_margin_pct": 75.0,
        "cfo": 190.6,
        "capex": 67.8,
        "fcf": 122.8,
        "cash": 192.4,
        "gross_debt": 877.2,
        "net_debt": 684.8,
        "net_leverage": 3.05,
        "interest_coverage": 3.72
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 312.0,
        "ebitda": 235.6,
        "ebitda_margin_pct": 75.5,
        "cfo": 201.9,
        "capex": 65.2,
        "fcf": 136.7,
        "cash": 213.8,
        "gross_debt": 831.1,
        "net_debt": 617.3,
        "net_leverage": 2.62,
        "interest_coverage": 4.09
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 468.0,
      "generation_volume_gwh": 1690.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 93.7,
      "2026": 156.2,
      "2027": 218.7,
      "2028": 140.6,
      "2029": 93.7,
      "2030_plus": 78.1,
      "total_outstanding_usd_m": 781.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 66.0,
      "base_case_px": 98.0,
      "recovery_floor_pct": 66.0,
      "recovery_base_pct": 98.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "1,180 MW pure-play renewable portfolio; Uşak hybrid solar expansion diversifying hydro risk."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond AYDEM 8.95% 2027 trading at 96.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "aydem",
        "issuer_name": "Aydem Renewable",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "aydem",
        "issuer_name": "Aydem Renewable",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "aydem",
        "issuer_name": "Aydem Renewable",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "adm_elek",
      "name": "ADM Elektrik",
      "ticker": "ADMELE",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "B / B2",
      "tier": "B",
      "benchmark_bond": "ADMTR 9.25% 2028",
      "price": 98.0,
      "ytm": 9.25,
      "spread_bp": 485,
      "model_file": "ADM_Elektrik_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6814cb3a1fc47071d72c5",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/ADM_Elektrik_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 285.6,
        "ebitda": 94.2,
        "ebitda_margin_pct": 33.0,
        "cfo": 76.4,
        "capex": 35.5,
        "fcf": 40.9,
        "cash": 59.8,
        "gross_debt": 415.4,
        "net_debt": 355.6,
        "net_leverage": 3.77,
        "interest_coverage": 4.11
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 344.4,
        "ebitda": 116.0,
        "ebitda_margin_pct": 33.7,
        "cfo": 96.1,
        "capex": 43.1,
        "fcf": 53.0,
        "cash": 76.1,
        "gross_debt": 449.6,
        "net_debt": 373.5,
        "net_leverage": 3.22,
        "interest_coverage": 4.05
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 386.4,
        "ebitda": 130.5,
        "ebitda_margin_pct": 33.8,
        "cfo": 108.5,
        "capex": 48.2,
        "fcf": 60.3,
        "cash": 92.4,
        "gross_debt": 478.9,
        "net_debt": 386.5,
        "net_leverage": 2.96,
        "interest_coverage": 3.8
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 420.0,
        "ebitda": 145.0,
        "ebitda_margin_pct": 34.5,
        "cfo": 123.2,
        "capex": 50.8,
        "fcf": 72.4,
        "cash": 108.8,
        "gross_debt": 488.7,
        "net_debt": 379.9,
        "net_leverage": 2.62,
        "interest_coverage": 3.8
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 453.6,
        "ebitda": 159.5,
        "ebitda_margin_pct": 35.2,
        "cfo": 135.6,
        "capex": 53.3,
        "fcf": 82.3,
        "cash": 128.3,
        "gross_debt": 478.9,
        "net_debt": 350.6,
        "net_leverage": 2.2,
        "interest_coverage": 4.35
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 483.0,
        "ebitda": 171.1,
        "ebitda_margin_pct": 35.4,
        "cfo": 145.4,
        "capex": 51.8,
        "fcf": 93.6,
        "cash": 146.8,
        "gross_debt": 464.2,
        "net_debt": 317.4,
        "net_leverage": 1.86,
        "interest_coverage": 4.87
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 504.0,
        "ebitda": 179.8,
        "ebitda_margin_pct": 35.7,
        "cfo": 154.1,
        "capex": 49.7,
        "fcf": 104.4,
        "cash": 163.1,
        "gross_debt": 439.8,
        "net_debt": 276.7,
        "net_leverage": 1.54,
        "interest_coverage": 5.35
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 756.0,
      "generation_volume_gwh": 2730.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 45.6,
      "2026": 76.0,
      "2027": 106.4,
      "2028": 68.4,
      "2029": 45.6,
      "2030_plus": 38.0,
      "total_outstanding_usd_m": 380.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 72.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 72.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Aegean regulated electricity distribution grid; RAB indexed to inflation; guaranteed real WACC return."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ADMTR 9.25% 2028 trading at 98.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "adm_elek",
        "issuer_name": "ADM Elektrik",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "adm_elek",
        "issuer_name": "ADM Elektrik",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "adm_elek",
        "issuer_name": "ADM Elektrik",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "gdz_elek",
      "name": "GDZ Elektrik",
      "ticker": "GDZELE",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "B / B2",
      "tier": "B",
      "benchmark_bond": "GDZTR 9.10% 2028",
      "price": 98.2,
      "ytm": 9.1,
      "spread_bp": 470,
      "model_file": "GDZ_Elektrik_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681f5b7e6ec2e994a620f",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/GDZ_Elektrik_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 394.4,
        "ebitda": 126.8,
        "ebitda_margin_pct": 32.2,
        "cfo": 102.8,
        "capex": 47.8,
        "fcf": 55.0,
        "cash": 80.4,
        "gross_debt": 558.6,
        "net_debt": 478.2,
        "net_leverage": 3.77,
        "interest_coverage": 4.06
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 475.6,
        "ebitda": 156.0,
        "ebitda_margin_pct": 32.8,
        "cfo": 129.3,
        "capex": 58.0,
        "fcf": 71.3,
        "cash": 102.4,
        "gross_debt": 604.6,
        "net_debt": 502.2,
        "net_leverage": 3.22,
        "interest_coverage": 4.0
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 533.6,
        "ebitda": 175.5,
        "ebitda_margin_pct": 32.9,
        "cfo": 145.9,
        "capex": 64.8,
        "fcf": 81.1,
        "cash": 124.3,
        "gross_debt": 644.0,
        "net_debt": 519.7,
        "net_leverage": 2.96,
        "interest_coverage": 3.75
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 580.0,
        "ebitda": 195.0,
        "ebitda_margin_pct": 33.6,
        "cfo": 165.8,
        "capex": 68.2,
        "fcf": 97.6,
        "cash": 146.2,
        "gross_debt": 657.2,
        "net_debt": 511.0,
        "net_leverage": 2.62,
        "interest_coverage": 3.75
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 626.4,
        "ebitda": 214.5,
        "ebitda_margin_pct": 34.2,
        "cfo": 182.3,
        "capex": 71.7,
        "fcf": 110.6,
        "cash": 172.6,
        "gross_debt": 644.0,
        "net_debt": 471.4,
        "net_leverage": 2.2,
        "interest_coverage": 4.3
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 667.0,
        "ebitda": 230.1,
        "ebitda_margin_pct": 34.5,
        "cfo": 195.6,
        "capex": 69.6,
        "fcf": 126.0,
        "cash": 197.4,
        "gross_debt": 624.3,
        "net_debt": 426.9,
        "net_leverage": 1.86,
        "interest_coverage": 4.81
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 696.0,
        "ebitda": 241.8,
        "ebitda_margin_pct": 34.7,
        "cfo": 207.2,
        "capex": 66.9,
        "fcf": 140.3,
        "cash": 219.4,
        "gross_debt": 591.4,
        "net_debt": 372.0,
        "net_leverage": 1.54,
        "interest_coverage": 5.28
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 1044.0,
      "generation_volume_gwh": 3770.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 61.3,
      "2026": 102.2,
      "2027": 143.1,
      "2028": 92.0,
      "2029": 61.3,
      "2030_plus": 51.1,
      "total_outstanding_usd_m": 511.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 72.0,
      "base_case_px": 100.0,
      "recovery_floor_pct": 72.0,
      "recovery_base_pct": 100.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "İzmir & Manisa metropolitan power grid; resilient industrial baseload; real capital expenditure recovery."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond GDZTR 9.10% 2028 trading at 98.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "gdz_elek",
        "issuer_name": "GDZ Elektrik",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "gdz_elek",
        "issuer_name": "GDZ Elektrik",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "gdz_elek",
        "issuer_name": "GDZ Elektrik",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "emlak",
      "name": "Emlak Konut",
      "ticker": "EKGYO",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Real Estate",
      "type": "corp",
      "rating": "BB- Local",
      "tier": "BB",
      "benchmark_bond": "EMLVAR 10.50% 2027",
      "price": 97.5,
      "ytm": 10.5,
      "spread_bp": 610,
      "model_file": "Emlak_Konut_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681d49d9cd4e3e2464afb",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Emlak_Konut_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 952.0,
        "ebitda": 227.5,
        "ebitda_margin_pct": 23.9,
        "cfo": 184.4,
        "capex": 85.7,
        "fcf": 98.7,
        "cash": 144.4,
        "gross_debt": 368.9,
        "net_debt": 224.5,
        "net_leverage": 0.99,
        "interest_coverage": 9.21
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1148.0,
        "ebitda": 280.0,
        "ebitda_margin_pct": 24.4,
        "cfo": 232.1,
        "capex": 104.1,
        "fcf": 128.0,
        "cash": 183.8,
        "gross_debt": 399.3,
        "net_debt": 215.5,
        "net_leverage": 0.77,
        "interest_coverage": 9.07
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1288.0,
        "ebitda": 315.0,
        "ebitda_margin_pct": 24.5,
        "cfo": 261.8,
        "capex": 116.4,
        "fcf": 145.4,
        "cash": 223.1,
        "gross_debt": 425.3,
        "net_debt": 202.2,
        "net_leverage": 0.64,
        "interest_coverage": 8.5
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1400.0,
        "ebitda": 350.0,
        "ebitda_margin_pct": 25.0,
        "cfo": 297.5,
        "capex": 122.5,
        "fcf": 175.0,
        "cash": 262.5,
        "gross_debt": 434.0,
        "net_debt": 171.5,
        "net_leverage": 0.49,
        "interest_coverage": 8.5
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1512.0,
        "ebitda": 385.0,
        "ebitda_margin_pct": 25.5,
        "cfo": 327.2,
        "capex": 128.6,
        "fcf": 198.6,
        "cash": 309.8,
        "gross_debt": 425.3,
        "net_debt": 115.5,
        "net_leverage": 0.3,
        "interest_coverage": 9.74
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1610.0,
        "ebitda": 413.0,
        "ebitda_margin_pct": 25.7,
        "cfo": 351.0,
        "capex": 124.9,
        "fcf": 226.1,
        "cash": 354.4,
        "gross_debt": 412.3,
        "net_debt": 57.9,
        "net_leverage": 0.14,
        "interest_coverage": 10.9
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1680.0,
        "ebitda": 434.0,
        "ebitda_margin_pct": 25.8,
        "cfo": 371.9,
        "capex": 120.0,
        "fcf": 251.9,
        "cash": 393.8,
        "gross_debt": 390.6,
        "net_debt": 0.0,
        "net_leverage": 0.0,
        "interest_coverage": 11.98
      }
    ],
    "supplementary_data": {
      "presales_run_rate_usd_m": 1890.0,
      "rera_escrow_balance_usd_m": 630.0,
      "unrestricted_cash_usd_m": 280.0,
      "backlog_revenue_usd_m": 3920.0,
      "land_bank_gfa_sqft": "33.0M sq ft",
      "collection_efficiency_pct": 91.5,
      "handover_units_annual": 3080
    },
    "debt_maturities": {
      "2025": 20.6,
      "2026": 34.3,
      "2027": 48.0,
      "2028": 30.9,
      "2029": 20.6,
      "2030_plus": 17.2,
      "total_outstanding_usd_m": 171.6
    },
    "recovery_analysis": {
      "distressed_floor_px": 80.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 80.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "TOKİ 50% state ownership; >$4.5B prime land bank; negligible net leverage (0.49x)."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond EMLVAR 10.50% 2027 trading at 97.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "emlak",
        "issuer_name": "Emlak Konut",
        "sector": "Real Estate",
        "topic": "RERA Escrow Mechanics",
        "source": "Cognitive Credit / Arqaam",
        "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
      },
      {
        "issuer_id": "emlak",
        "issuer_name": "Emlak Konut",
        "sector": "Real Estate",
        "topic": "Presales & Revenue Backlog",
        "source": "Broker Consensus / Earnings Call",
        "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
      },
      {
        "issuer_id": "emlak",
        "issuer_name": "Emlak Konut",
        "sector": "Real Estate",
        "topic": "Land Bank Valuation",
        "source": "CBRE / JLL Independent Valuation",
        "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
      }
    ]
  },
  {
    "metadata": {
      "id": "erdemir",
      "name": "Erdemir",
      "ticker": "EREGL",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Materials",
      "type": "corp",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "EREGL 7.95% 2029",
      "price": 98.5,
      "ytm": 7.95,
      "spread_bp": 355,
      "model_file": "Erdemir_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681f8b554cf9edd7b8f1c",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Erdemir_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 4624.0,
        "ebitda": 552.5,
        "ebitda_margin_pct": 11.9,
        "cfo": 447.9,
        "capex": 208.2,
        "fcf": 239.7,
        "cash": 350.6,
        "gross_debt": 2073.6,
        "net_debt": 1723.0,
        "net_leverage": 3.12,
        "interest_coverage": 5.52
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 5576.0,
        "ebitda": 680.0,
        "ebitda_margin_pct": 12.2,
        "cfo": 563.6,
        "capex": 252.9,
        "fcf": 310.7,
        "cash": 446.2,
        "gross_debt": 2244.3,
        "net_debt": 1798.1,
        "net_leverage": 2.64,
        "interest_coverage": 5.44
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 6256.0,
        "ebitda": 765.0,
        "ebitda_margin_pct": 12.2,
        "cfo": 635.8,
        "capex": 282.6,
        "fcf": 353.2,
        "cash": 541.9,
        "gross_debt": 2390.7,
        "net_debt": 1848.8,
        "net_leverage": 2.42,
        "interest_coverage": 5.1
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 6800.0,
        "ebitda": 850.0,
        "ebitda_margin_pct": 12.5,
        "cfo": 722.5,
        "capex": 297.5,
        "fcf": 425.0,
        "cash": 637.5,
        "gross_debt": 2439.5,
        "net_debt": 1802.0,
        "net_leverage": 2.12,
        "interest_coverage": 5.1
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 7344.0,
        "ebitda": 935.0,
        "ebitda_margin_pct": 12.7,
        "cfo": 794.8,
        "capex": 312.4,
        "fcf": 482.4,
        "cash": 752.2,
        "gross_debt": 2390.7,
        "net_debt": 1638.5,
        "net_leverage": 1.75,
        "interest_coverage": 5.84
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 7820.0,
        "ebitda": 1003.0,
        "ebitda_margin_pct": 12.8,
        "cfo": 852.5,
        "capex": 303.4,
        "fcf": 549.1,
        "cash": 860.6,
        "gross_debt": 2317.5,
        "net_debt": 1456.9,
        "net_leverage": 1.45,
        "interest_coverage": 6.54
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 8160.0,
        "ebitda": 1054.0,
        "ebitda_margin_pct": 12.9,
        "cfo": 903.1,
        "capex": 291.6,
        "fcf": 611.5,
        "cash": 956.2,
        "gross_debt": 2195.6,
        "net_debt": 1239.4,
        "net_leverage": 1.18,
        "interest_coverage": 7.19
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 22.9,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 816.0
    },
    "debt_maturities": {
      "2025": 216.2,
      "2026": 360.4,
      "2027": 504.6,
      "2028": 324.4,
      "2029": 216.2,
      "2030_plus": 180.2,
      "total_outstanding_usd_m": 1802.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 75.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 75.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Flat steel monopoly in Turkey; OYAK pension backing; $3.2B green DRI decarbonization transformation."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond EREGL 7.95% 2029 trading at 98.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "erdemir",
        "issuer_name": "Erdemir",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "erdemir",
        "issuer_name": "Erdemir",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "erdemir",
        "issuer_name": "Erdemir",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "sisecam",
      "name": "Şişecam",
      "ticker": "SISE",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Materials",
      "type": "corp",
      "rating": "BB- / B1",
      "tier": "BB",
      "benchmark_bond": "SISETR 6.85% 2029",
      "price": 99.5,
      "ytm": 6.85,
      "spread_bp": 245,
      "model_file": "Sisecam_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681d7b10bd431e8514935",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Sisecam_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 3740.0,
        "ebitda": 715.0,
        "ebitda_margin_pct": 19.1,
        "cfo": 579.7,
        "capex": 269.5,
        "fcf": 310.2,
        "cash": 453.8,
        "gross_debt": 2739.5,
        "net_debt": 2285.7,
        "net_leverage": 3.2,
        "interest_coverage": 5.85
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 4510.0,
        "ebitda": 880.0,
        "ebitda_margin_pct": 19.5,
        "cfo": 729.3,
        "capex": 327.2,
        "fcf": 402.1,
        "cash": 577.5,
        "gross_debt": 2965.2,
        "net_debt": 2387.7,
        "net_leverage": 2.71,
        "interest_coverage": 5.76
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 5060.0,
        "ebitda": 990.0,
        "ebitda_margin_pct": 19.6,
        "cfo": 822.8,
        "capex": 365.8,
        "fcf": 457.0,
        "cash": 701.2,
        "gross_debt": 3158.5,
        "net_debt": 2457.3,
        "net_leverage": 2.48,
        "interest_coverage": 5.4
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 5500.0,
        "ebitda": 1100.0,
        "ebitda_margin_pct": 20.0,
        "cfo": 935.0,
        "capex": 385.0,
        "fcf": 550.0,
        "cash": 825.0,
        "gross_debt": 3223.0,
        "net_debt": 2398.0,
        "net_leverage": 2.18,
        "interest_coverage": 5.4
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 5940.0,
        "ebitda": 1210.0,
        "ebitda_margin_pct": 20.4,
        "cfo": 1028.5,
        "capex": 404.2,
        "fcf": 624.3,
        "cash": 973.5,
        "gross_debt": 3158.5,
        "net_debt": 2185.0,
        "net_leverage": 1.81,
        "interest_coverage": 6.19
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 6325.0,
        "ebitda": 1298.0,
        "ebitda_margin_pct": 20.5,
        "cfo": 1103.3,
        "capex": 392.7,
        "fcf": 710.6,
        "cash": 1113.8,
        "gross_debt": 3061.8,
        "net_debt": 1948.0,
        "net_leverage": 1.5,
        "interest_coverage": 6.93
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 6600.0,
        "ebitda": 1364.0,
        "ebitda_margin_pct": 20.7,
        "cfo": 1168.8,
        "capex": 377.3,
        "fcf": 791.5,
        "cash": 1237.5,
        "gross_debt": 2900.7,
        "net_debt": 1663.2,
        "net_leverage": 1.22,
        "interest_coverage": 7.61
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 19.0,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 660.0
    },
    "debt_maturities": {
      "2025": 287.8,
      "2026": 479.6,
      "2027": 671.4,
      "2028": 431.6,
      "2029": 287.8,
      "2030_plus": 239.8,
      "total_outstanding_usd_m": 2398.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 78.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 78.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Global glassware/soda ash titan; 65% export revenues; lowest-cost Wyoming natural trona assets."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SISETR 6.85% 2029 trading at 99.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "sisecam",
        "issuer_name": "Şişecam",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "sisecam",
        "issuer_name": "Şişecam",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "sisecam",
        "issuer_name": "Şişecam",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "sampa",
      "name": "Sampa Otomotiv",
      "ticker": "SAMPA",
      "country": "Turkey",
      "region": "CEEMEA",
      "sector": "Consumer",
      "type": "corp",
      "rating": "B / B2 Implied",
      "tier": "B",
      "benchmark_bond": "SAMPA 10.40% 2027",
      "price": 97.5,
      "ytm": 10.4,
      "spread_bp": 600,
      "model_file": "Sampa_Otomotiv_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681f7b42fd45e6b8cf51e",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Sampa_Otomotiv_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 231.2,
        "ebitda": 50.7,
        "ebitda_margin_pct": 21.9,
        "cfo": 41.1,
        "capex": 19.1,
        "fcf": 22.0,
        "cash": 32.2,
        "gross_debt": 151.8,
        "net_debt": 119.6,
        "net_leverage": 2.36,
        "interest_coverage": 4.69
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 278.8,
        "ebitda": 62.4,
        "ebitda_margin_pct": 22.4,
        "cfo": 51.7,
        "capex": 23.2,
        "fcf": 28.5,
        "cash": 40.9,
        "gross_debt": 164.3,
        "net_debt": 123.4,
        "net_leverage": 1.98,
        "interest_coverage": 4.62
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 312.8,
        "ebitda": 70.2,
        "ebitda_margin_pct": 22.4,
        "cfo": 58.3,
        "capex": 25.9,
        "fcf": 32.4,
        "cash": 49.7,
        "gross_debt": 175.0,
        "net_debt": 125.3,
        "net_leverage": 1.78,
        "interest_coverage": 4.33
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 340.0,
        "ebitda": 78.0,
        "ebitda_margin_pct": 22.9,
        "cfo": 66.3,
        "capex": 27.3,
        "fcf": 39.0,
        "cash": 58.5,
        "gross_debt": 178.6,
        "net_debt": 120.1,
        "net_leverage": 1.54,
        "interest_coverage": 4.33
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 367.2,
        "ebitda": 85.8,
        "ebitda_margin_pct": 23.4,
        "cfo": 72.9,
        "capex": 28.7,
        "fcf": 44.2,
        "cash": 69.0,
        "gross_debt": 175.0,
        "net_debt": 106.0,
        "net_leverage": 1.24,
        "interest_coverage": 4.96
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 391.0,
        "ebitda": 92.0,
        "ebitda_margin_pct": 23.5,
        "cfo": 78.2,
        "capex": 27.8,
        "fcf": 50.4,
        "cash": 79.0,
        "gross_debt": 169.7,
        "net_debt": 90.7,
        "net_leverage": 0.99,
        "interest_coverage": 5.55
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 408.0,
        "ebitda": 96.7,
        "ebitda_margin_pct": 23.7,
        "cfo": 82.9,
        "capex": 26.8,
        "fcf": 56.1,
        "cash": 87.8,
        "gross_debt": 160.8,
        "net_debt": 73.0,
        "net_leverage": 0.75,
        "interest_coverage": 6.1
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 748.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 14.4,
      "2026": 24.0,
      "2027": 33.6,
      "2028": 21.6,
      "2029": 14.4,
      "2030_plus": 12.0,
      "total_outstanding_usd_m": 120.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 64.0,
      "base_case_px": 98.0,
      "recovery_floor_pct": 64.0,
      "recovery_base_pct": 98.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Turkey Commercial & Bankruptcy Code",
      "thesis": "Commercial truck parts exporter; >85% EUR/USD revenue; 40-50% price advantage over European OEMs."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SAMPA 10.40% 2027 trading at 97.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "sampa",
        "issuer_name": "Sampa Otomotiv",
        "sector": "Consumer",
        "topic": "Working Capital & Export Moat",
        "source": "Cognitive Credit / Broker Note",
        "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
      },
      {
        "issuer_id": "sampa",
        "issuer_name": "Sampa Otomotiv",
        "sector": "Consumer",
        "topic": "Geopolitical Transmission",
        "source": "Macro Risk Assessment",
        "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
      },
      {
        "issuer_id": "sampa",
        "issuer_name": "Sampa Otomotiv",
        "sector": "Consumer",
        "topic": "Deleveraging Trajectory",
        "source": "Company Guidance",
        "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
      }
    ]
  },
  {
    "metadata": {
      "id": "ocp",
      "name": "OCP Group",
      "ticker": "OCP",
      "country": "Morocco",
      "region": "Africa",
      "sector": "Materials",
      "type": "corp",
      "rating": "BBB- / Baa3",
      "tier": "IG",
      "benchmark_bond": "OCP 6.45% 2034",
      "price": 99.5,
      "ytm": 6.45,
      "spread_bp": 155,
      "model_file": "OCP_Group_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681969243c32cfbae8a81",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/OCP_Group_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 6460.0,
        "ebitda": 2080.0,
        "ebitda_margin_pct": 32.2,
        "cfo": 1686.4,
        "capex": 784.0,
        "fcf": 902.4,
        "cash": 1320.0,
        "gross_debt": 8404.8,
        "net_debt": 7084.8,
        "net_leverage": 3.41,
        "interest_coverage": 7.7
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 7790.0,
        "ebitda": 2560.0,
        "ebitda_margin_pct": 32.9,
        "cfo": 2121.6,
        "capex": 952.0,
        "fcf": 1169.6,
        "cash": 1680.0,
        "gross_debt": 9097.0,
        "net_debt": 7417.0,
        "net_leverage": 2.9,
        "interest_coverage": 7.58
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 8740.0,
        "ebitda": 2880.0,
        "ebitda_margin_pct": 33.0,
        "cfo": 2393.6,
        "capex": 1064.0,
        "fcf": 1329.6,
        "cash": 2040.0,
        "gross_debt": 9690.2,
        "net_debt": 7650.2,
        "net_leverage": 2.66,
        "interest_coverage": 7.11
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 9500.0,
        "ebitda": 3200.0,
        "ebitda_margin_pct": 33.7,
        "cfo": 2720.0,
        "capex": 1120.0,
        "fcf": 1600.0,
        "cash": 2400.0,
        "gross_debt": 9888.0,
        "net_debt": 7488.0,
        "net_leverage": 2.34,
        "interest_coverage": 7.11
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 10260.0,
        "ebitda": 3520.0,
        "ebitda_margin_pct": 34.3,
        "cfo": 2992.0,
        "capex": 1176.0,
        "fcf": 1816.0,
        "cash": 2832.0,
        "gross_debt": 9690.2,
        "net_debt": 6858.2,
        "net_leverage": 1.95,
        "interest_coverage": 8.15
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 10925.0,
        "ebitda": 3776.0,
        "ebitda_margin_pct": 34.6,
        "cfo": 3209.6,
        "capex": 1142.4,
        "fcf": 2067.2,
        "cash": 3240.0,
        "gross_debt": 9393.6,
        "net_debt": 6153.6,
        "net_leverage": 1.63,
        "interest_coverage": 9.12
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 11400.0,
        "ebitda": 3968.0,
        "ebitda_margin_pct": 34.8,
        "cfo": 3400.0,
        "capex": 1097.6,
        "fcf": 2302.4,
        "cash": 3600.0,
        "gross_debt": 8899.2,
        "net_debt": 5299.2,
        "net_leverage": 1.34,
        "interest_coverage": 10.02
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 31.0,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 1140.0
    },
    "debt_maturities": {
      "2025": 898.6,
      "2026": 1497.6,
      "2027": 2096.6,
      "2028": 1347.8,
      "2029": 898.6,
      "2030_plus": 748.8,
      "total_outstanding_usd_m": 7488.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 75.0,
      "base_case_px": 103.0,
      "recovery_floor_pct": 75.0,
      "recovery_base_pct": 103.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Controls 70% of world's phosphate rock reserves; $3.2B EBITDA (34% margin); >85% hard currency export revenues."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond OCP 6.45% 2034 trading at 99.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "ocp",
        "issuer_name": "OCP Group",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "ocp",
        "issuer_name": "OCP Group",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "ocp",
        "issuer_name": "OCP Group",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "dp_world",
      "name": "DP World",
      "ticker": "DPW",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Infrastructure",
      "type": "corp",
      "rating": "BBB+ / Baa2",
      "tier": "IG",
      "benchmark_bond": "DPW 5.35% 2033",
      "price": 98.0,
      "ytm": 5.35,
      "spread_bp": 120,
      "model_file": "DP_World_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681138b90f1177936cd35",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/DP_World_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 12376.0,
        "ebitda": 3315.0,
        "ebitda_margin_pct": 26.8,
        "cfo": 2687.7,
        "capex": 1249.5,
        "fcf": 1438.2,
        "cash": 2103.8,
        "gross_debt": 17253.3,
        "net_debt": 15149.5,
        "net_leverage": 4.57,
        "interest_coverage": 5.82
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 14924.0,
        "ebitda": 4080.0,
        "ebitda_margin_pct": 27.3,
        "cfo": 3381.3,
        "capex": 1517.2,
        "fcf": 1864.1,
        "cash": 2677.5,
        "gross_debt": 18674.2,
        "net_debt": 15996.7,
        "net_leverage": 3.92,
        "interest_coverage": 5.73
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 16744.0,
        "ebitda": 4590.0,
        "ebitda_margin_pct": 27.4,
        "cfo": 3814.8,
        "capex": 1695.8,
        "fcf": 2119.0,
        "cash": 3251.2,
        "gross_debt": 19892.0,
        "net_debt": 16640.8,
        "net_leverage": 3.63,
        "interest_coverage": 5.37
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 18200.0,
        "ebitda": 5100.0,
        "ebitda_margin_pct": 28.0,
        "cfo": 4335.0,
        "capex": 1785.0,
        "fcf": 2550.0,
        "cash": 3825.0,
        "gross_debt": 20298.0,
        "net_debt": 16473.0,
        "net_leverage": 3.23,
        "interest_coverage": 5.37
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 19656.0,
        "ebitda": 5610.0,
        "ebitda_margin_pct": 28.5,
        "cfo": 4768.5,
        "capex": 1874.2,
        "fcf": 2894.3,
        "cash": 4513.5,
        "gross_debt": 19892.0,
        "net_debt": 15378.5,
        "net_leverage": 2.74,
        "interest_coverage": 6.15
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 20930.0,
        "ebitda": 6018.0,
        "ebitda_margin_pct": 28.8,
        "cfo": 5115.3,
        "capex": 1820.7,
        "fcf": 3294.6,
        "cash": 5163.8,
        "gross_debt": 19283.1,
        "net_debt": 14119.3,
        "net_leverage": 2.35,
        "interest_coverage": 6.89
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 21840.0,
        "ebitda": 6324.0,
        "ebitda_margin_pct": 29.0,
        "cfo": 5418.8,
        "capex": 1749.3,
        "fcf": 3669.5,
        "cash": 5737.5,
        "gross_debt": 18268.2,
        "net_debt": 12530.7,
        "net_leverage": 1.98,
        "interest_coverage": 7.57
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 40040.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 1976.8,
      "2026": 3294.6,
      "2027": 4612.4,
      "2028": 2965.1,
      "2029": 1976.8,
      "2030_plus": 1647.3,
      "total_outstanding_usd_m": 16473.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 72.0,
      "base_case_px": 102.5,
      "recovery_floor_pct": 72.0,
      "recovery_base_pct": 102.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Global port monopoly across 73 countries; 85M+ TEU volume; Dubai Inc. crown jewel; hybrids yield 6.85%."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DPW 5.35% 2033 trading at 98.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dp_world",
        "issuer_name": "DP World",
        "sector": "Infrastructure",
        "topic": "Concession Duration & Moat",
        "source": "Cognitive Credit / S&P Global",
        "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
      },
      {
        "issuer_id": "dp_world",
        "issuer_name": "DP World",
        "sector": "Infrastructure",
        "topic": "Throughput & Capacity Utilization",
        "source": "Port Authority Filings",
        "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
      },
      {
        "issuer_id": "dp_world",
        "issuer_name": "DP World",
        "sector": "Infrastructure",
        "topic": "Structural Subordination & Waterfall",
        "source": "Bond Offering Circular",
        "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
      }
    ]
  },
  {
    "metadata": {
      "id": "ittihad",
      "name": "Ittihad Investment",
      "ticker": "ITTIHAD",
      "country": "UAE",
      "region": "Middle East",
      "sector": "Industrials",
      "type": "corp",
      "rating": "B+ / B1",
      "tier": "B",
      "benchmark_bond": "ITTIHAD 9.10% 2028",
      "price": 98.5,
      "ytm": 9.1,
      "spread_bp": 505,
      "model_file": "Ittihad_Investment_Credit_Model.xlsx",
      "notion_id": "3e01d0ad68c68113b910f37ad6862335",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Ittihad_Investment_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 714.0,
        "ebitda": 126.8,
        "ebitda_margin_pct": 17.8,
        "cfo": 102.8,
        "capex": 47.8,
        "fcf": 55.0,
        "cash": 80.4,
        "gross_debt": 523.8,
        "net_debt": 443.4,
        "net_leverage": 3.5,
        "interest_coverage": 4.06
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 861.0,
        "ebitda": 156.0,
        "ebitda_margin_pct": 18.1,
        "cfo": 129.3,
        "capex": 58.0,
        "fcf": 71.3,
        "cash": 102.4,
        "gross_debt": 566.9,
        "net_debt": 464.5,
        "net_leverage": 2.98,
        "interest_coverage": 4.0
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 966.0,
        "ebitda": 175.5,
        "ebitda_margin_pct": 18.2,
        "cfo": 145.9,
        "capex": 64.8,
        "fcf": 81.1,
        "cash": 124.3,
        "gross_debt": 603.9,
        "net_debt": 479.6,
        "net_leverage": 2.73,
        "interest_coverage": 3.75
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1050.0,
        "ebitda": 195.0,
        "ebitda_margin_pct": 18.6,
        "cfo": 165.8,
        "capex": 68.2,
        "fcf": 97.6,
        "cash": 146.2,
        "gross_debt": 616.2,
        "net_debt": 470.0,
        "net_leverage": 2.41,
        "interest_coverage": 3.75
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1134.0,
        "ebitda": 214.5,
        "ebitda_margin_pct": 18.9,
        "cfo": 182.3,
        "capex": 71.7,
        "fcf": 110.6,
        "cash": 172.6,
        "gross_debt": 603.9,
        "net_debt": 431.3,
        "net_leverage": 2.01,
        "interest_coverage": 4.3
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1207.5,
        "ebitda": 230.1,
        "ebitda_margin_pct": 19.1,
        "cfo": 195.6,
        "capex": 69.6,
        "fcf": 126.0,
        "cash": 197.4,
        "gross_debt": 585.4,
        "net_debt": 388.0,
        "net_leverage": 1.69,
        "interest_coverage": 4.81
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1260.0,
        "ebitda": 241.8,
        "ebitda_margin_pct": 19.2,
        "cfo": 207.2,
        "capex": 66.9,
        "fcf": 140.3,
        "cash": 219.4,
        "gross_debt": 554.6,
        "net_debt": 335.2,
        "net_leverage": 1.39,
        "interest_coverage": 5.28
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 5.65,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 126.0
    },
    "debt_maturities": {
      "2025": 56.4,
      "2026": 94.0,
      "2027": 131.6,
      "2028": 84.6,
      "2029": 56.4,
      "2030_plus": 47.0,
      "total_outstanding_usd_m": 470.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 62.0,
      "base_case_px": 98.5,
      "recovery_floor_pct": 62.0,
      "recovery_base_pct": 98.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Abu Dhabi's largest private industrial group; Crown Paper Mill + Union Copper Rod in ICAD; UAE 'Operation 300bn'."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ITTIHAD 9.10% 2028 trading at 98.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "ittihad",
        "issuer_name": "Ittihad Investment",
        "sector": "Industrials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "ittihad",
        "issuer_name": "Ittihad Investment",
        "sector": "Industrials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "ittihad",
        "issuer_name": "Ittihad Investment",
        "sector": "Industrials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "sonangol",
      "name": "Sonangol EP",
      "ticker": "SONANG",
      "country": "Angola",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "B- / B3",
      "tier": "B",
      "benchmark_bond": "SONANG 9.15% 2028",
      "price": 97.2,
      "ytm": 9.15,
      "spread_bp": 475,
      "model_file": "Sonangol_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6812aa10ee048b87d945b",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Sonangol_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 8568.0,
        "ebitda": 3120.0,
        "ebitda_margin_pct": 36.4,
        "cfo": 2529.6,
        "capex": 1176.0,
        "fcf": 1353.6,
        "cash": 1980.0,
        "gross_debt": 8323.2,
        "net_debt": 6343.2,
        "net_leverage": 2.03,
        "interest_coverage": 6.93
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 10332.0,
        "ebitda": 3840.0,
        "ebitda_margin_pct": 37.2,
        "cfo": 3182.4,
        "capex": 1428.0,
        "fcf": 1754.4,
        "cash": 2520.0,
        "gross_debt": 9008.6,
        "net_debt": 6488.6,
        "net_leverage": 1.69,
        "interest_coverage": 6.83
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 11592.0,
        "ebitda": 4320.0,
        "ebitda_margin_pct": 37.3,
        "cfo": 3590.4,
        "capex": 1596.0,
        "fcf": 1994.4,
        "cash": 3060.0,
        "gross_debt": 9596.2,
        "net_debt": 6536.2,
        "net_leverage": 1.51,
        "interest_coverage": 6.4
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 12600.0,
        "ebitda": 4800.0,
        "ebitda_margin_pct": 38.1,
        "cfo": 4080.0,
        "capex": 1680.0,
        "fcf": 2400.0,
        "cash": 3600.0,
        "gross_debt": 9792.0,
        "net_debt": 6192.0,
        "net_leverage": 1.29,
        "interest_coverage": 6.4
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 13608.0,
        "ebitda": 5280.0,
        "ebitda_margin_pct": 38.8,
        "cfo": 4488.0,
        "capex": 1764.0,
        "fcf": 2724.0,
        "cash": 4248.0,
        "gross_debt": 9596.2,
        "net_debt": 5348.2,
        "net_leverage": 1.01,
        "interest_coverage": 7.33
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 14490.0,
        "ebitda": 5664.0,
        "ebitda_margin_pct": 39.1,
        "cfo": 4814.4,
        "capex": 1713.6,
        "fcf": 3100.8,
        "cash": 4860.0,
        "gross_debt": 9302.4,
        "net_debt": 4442.4,
        "net_leverage": 0.78,
        "interest_coverage": 8.21
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 15120.0,
        "ebitda": 5952.0,
        "ebitda_margin_pct": 39.4,
        "cfo": 5100.0,
        "capex": 1646.4,
        "fcf": 3453.6,
        "cash": 5400.0,
        "gross_debt": 8812.8,
        "net_debt": 3412.8,
        "net_leverage": 0.57,
        "interest_coverage": 9.02
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 567.0,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 743.0,
      "2026": 1238.4,
      "2027": 1733.8,
      "2028": 1114.6,
      "2029": 743.0,
      "2030_plus": 619.2,
      "total_outstanding_usd_m": 6192.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 65.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 65.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Angola Commercial & Bankruptcy Code",
      "thesis": "Angola national oil concessionaire; offshore pre-salt blocks with Total & Chevron; dollar escrow debt service."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SONANG 9.15% 2028 trading at 97.2."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "sonangol",
        "issuer_name": "Sonangol EP",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "sonangol",
        "issuer_name": "Sonangol EP",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "sonangol",
        "issuer_name": "Sonangol EP",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "azule",
      "name": "Azule Energy",
      "ticker": "AZULE",
      "country": "Angola",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "B+ / Ba3",
      "tier": "B",
      "benchmark_bond": "AZULE 8.45% 2030",
      "price": 98.5,
      "ytm": 8.45,
      "spread_bp": 410,
      "model_file": "Azule_Energy_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68104b021cc5179c679db",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Azule_Energy_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 2312.0,
        "ebitda": 1462.5,
        "ebitda_margin_pct": 63.3,
        "cfo": 1185.8,
        "capex": 551.2,
        "fcf": 634.6,
        "cash": 928.1,
        "gross_debt": 4456.1,
        "net_debt": 3528.0,
        "net_leverage": 2.41,
        "interest_coverage": 7.39
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 2788.0,
        "ebitda": 1800.0,
        "ebitda_margin_pct": 64.6,
        "cfo": 1491.8,
        "capex": 669.4,
        "fcf": 822.4,
        "cash": 1181.2,
        "gross_debt": 4823.1,
        "net_debt": 3641.9,
        "net_leverage": 2.02,
        "interest_coverage": 7.27
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 3128.0,
        "ebitda": 2025.0,
        "ebitda_margin_pct": 64.7,
        "cfo": 1683.0,
        "capex": 748.1,
        "fcf": 934.9,
        "cash": 1434.4,
        "gross_debt": 5137.6,
        "net_debt": 3703.2,
        "net_leverage": 1.83,
        "interest_coverage": 6.82
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 3400.0,
        "ebitda": 2250.0,
        "ebitda_margin_pct": 66.2,
        "cfo": 1912.5,
        "capex": 787.5,
        "fcf": 1125.0,
        "cash": 1687.5,
        "gross_debt": 5242.5,
        "net_debt": 3555.0,
        "net_leverage": 1.58,
        "interest_coverage": 6.82
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 3672.0,
        "ebitda": 2475.0,
        "ebitda_margin_pct": 67.4,
        "cfo": 2103.8,
        "capex": 826.9,
        "fcf": 1276.9,
        "cash": 1991.2,
        "gross_debt": 5137.6,
        "net_debt": 3146.4,
        "net_leverage": 1.27,
        "interest_coverage": 7.81
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 3910.0,
        "ebitda": 2655.0,
        "ebitda_margin_pct": 67.9,
        "cfo": 2256.8,
        "capex": 803.2,
        "fcf": 1453.6,
        "cash": 2278.1,
        "gross_debt": 4980.4,
        "net_debt": 2702.3,
        "net_leverage": 1.02,
        "interest_coverage": 8.75
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 4080.0,
        "ebitda": 2790.0,
        "ebitda_margin_pct": 68.4,
        "cfo": 2390.6,
        "capex": 771.8,
        "fcf": 1618.8,
        "cash": 2531.2,
        "gross_debt": 4718.2,
        "net_debt": 2187.0,
        "net_leverage": 0.78,
        "interest_coverage": 9.61
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 153.0,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 426.6,
      "2026": 711.0,
      "2027": 995.4,
      "2028": 639.9,
      "2029": 426.6,
      "2030_plus": 355.5,
      "total_outstanding_usd_m": 3555.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 74.0,
      "base_case_px": 101.0,
      "recovery_floor_pct": 74.0,
      "recovery_base_pct": 101.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Angola Commercial & Bankruptcy Code",
      "thesis": "BP-Eni 50/50 incorporated JV; 220k boe/d net; Block 15/06 Agogo field + New Gas Consortium feeding Angola LNG."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond AZULE 8.45% 2030 trading at 98.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "azule",
        "issuer_name": "Azule Energy",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "azule",
        "issuer_name": "Azule Energy",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "azule",
        "issuer_name": "Azule Energy",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "kosmos",
      "name": "Kosmos Energy",
      "ticker": "KOS",
      "country": "Ghana",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "B- / B3",
      "tier": "B",
      "benchmark_bond": "KOS 10.45% 2027",
      "price": 89.5,
      "ytm": 10.45,
      "spread_bp": 610,
      "model_file": "Kosmos_Energy_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6819e9cbaff7593216ed5",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Kosmos_Energy_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1190.0,
        "ebitda": 682.5,
        "ebitda_margin_pct": 57.4,
        "cfo": 553.4,
        "capex": 257.2,
        "fcf": 296.2,
        "cash": 433.1,
        "gross_debt": 2731.0,
        "net_debt": 2297.9,
        "net_leverage": 3.37,
        "interest_coverage": 4.55
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1435.0,
        "ebitda": 840.0,
        "ebitda_margin_pct": 58.5,
        "cfo": 696.1,
        "capex": 312.4,
        "fcf": 383.7,
        "cash": 551.2,
        "gross_debt": 2956.0,
        "net_debt": 2404.8,
        "net_leverage": 2.86,
        "interest_coverage": 4.48
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1610.0,
        "ebitda": 945.0,
        "ebitda_margin_pct": 58.7,
        "cfo": 785.4,
        "capex": 349.1,
        "fcf": 436.3,
        "cash": 669.4,
        "gross_debt": 3148.7,
        "net_debt": 2479.3,
        "net_leverage": 2.62,
        "interest_coverage": 4.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1750.0,
        "ebitda": 1050.0,
        "ebitda_margin_pct": 60.0,
        "cfo": 892.5,
        "capex": 367.5,
        "fcf": 525.0,
        "cash": 787.5,
        "gross_debt": 3213.0,
        "net_debt": 2425.5,
        "net_leverage": 2.31,
        "interest_coverage": 4.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1890.0,
        "ebitda": 1155.0,
        "ebitda_margin_pct": 61.1,
        "cfo": 981.8,
        "capex": 385.9,
        "fcf": 595.9,
        "cash": 929.2,
        "gross_debt": 3148.7,
        "net_debt": 2219.5,
        "net_leverage": 1.92,
        "interest_coverage": 4.81
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 2012.5,
        "ebitda": 1239.0,
        "ebitda_margin_pct": 61.6,
        "cfo": 1053.1,
        "capex": 374.9,
        "fcf": 678.2,
        "cash": 1063.1,
        "gross_debt": 3052.3,
        "net_debt": 1989.2,
        "net_leverage": 1.61,
        "interest_coverage": 5.39
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 2100.0,
        "ebitda": 1302.0,
        "ebitda_margin_pct": 62.0,
        "cfo": 1115.6,
        "capex": 360.1,
        "fcf": 755.5,
        "cash": 1181.2,
        "gross_debt": 2891.7,
        "net_debt": 1710.5,
        "net_leverage": 1.31,
        "interest_coverage": 5.92
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 78.8,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 291.1,
      "2026": 485.1,
      "2027": 679.1,
      "2028": 436.6,
      "2029": 291.1,
      "2030_plus": 242.6,
      "total_outstanding_usd_m": 2425.6
    },
    "recovery_analysis": {
      "distressed_floor_px": 62.0,
      "base_case_px": 98.0,
      "recovery_floor_pct": 62.0,
      "recovery_base_pct": 98.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ghana Commercial & Bankruptcy Code",
      "thesis": "Jubilee (<$12/boe lifting cost) & TEN fields + GTA FLNG Phase 1 startup (2.5 mtpa); multi-year FCF inflection."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond KOS 10.45% 2027 trading at 89.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "kosmos",
        "issuer_name": "Kosmos Energy",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "kosmos",
        "issuer_name": "Kosmos Energy",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "kosmos",
        "issuer_name": "Kosmos Energy",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "tullow",
      "name": "Tullow Oil",
      "ticker": "TLW",
      "country": "Ghana",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "B- / Caa1",
      "tier": "B",
      "benchmark_bond": "TLW 13.80% 2026",
      "price": 86.5,
      "ytm": 13.8,
      "spread_bp": 945,
      "model_file": "Tullow_Oil_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681c2ad7ddb4ae404fb62",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Tullow_Oil_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 938.4,
        "ebitda": 533.0,
        "ebitda_margin_pct": 56.8,
        "cfo": 432.1,
        "capex": 200.9,
        "fcf": 231.2,
        "cash": 338.2,
        "gross_debt": 2125.8,
        "net_debt": 1787.6,
        "net_leverage": 3.35,
        "interest_coverage": 3.71
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1131.6,
        "ebitda": 656.0,
        "ebitda_margin_pct": 58.0,
        "cfo": 543.7,
        "capex": 243.9,
        "fcf": 299.8,
        "cash": 430.5,
        "gross_debt": 2300.9,
        "net_debt": 1870.4,
        "net_leverage": 2.85,
        "interest_coverage": 3.65
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1269.6,
        "ebitda": 738.0,
        "ebitda_margin_pct": 58.1,
        "cfo": 613.4,
        "capex": 272.6,
        "fcf": 340.8,
        "cash": 522.8,
        "gross_debt": 2451.0,
        "net_debt": 1928.2,
        "net_leverage": 2.61,
        "interest_coverage": 3.42
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1380.0,
        "ebitda": 820.0,
        "ebitda_margin_pct": 59.4,
        "cfo": 697.0,
        "capex": 287.0,
        "fcf": 410.0,
        "cash": 615.0,
        "gross_debt": 2501.0,
        "net_debt": 1886.0,
        "net_leverage": 2.3,
        "interest_coverage": 3.42
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1490.4,
        "ebitda": 902.0,
        "ebitda_margin_pct": 60.5,
        "cfo": 766.7,
        "capex": 301.4,
        "fcf": 465.3,
        "cash": 725.7,
        "gross_debt": 2451.0,
        "net_debt": 1725.3,
        "net_leverage": 1.91,
        "interest_coverage": 3.92
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1587.0,
        "ebitda": 967.6,
        "ebitda_margin_pct": 61.0,
        "cfo": 822.5,
        "capex": 292.7,
        "fcf": 529.8,
        "cash": 830.2,
        "gross_debt": 2375.9,
        "net_debt": 1545.7,
        "net_leverage": 1.6,
        "interest_coverage": 4.39
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1656.0,
        "ebitda": 1016.8,
        "ebitda_margin_pct": 61.4,
        "cfo": 871.2,
        "capex": 281.3,
        "fcf": 589.9,
        "cash": 922.5,
        "gross_debt": 2250.9,
        "net_debt": 1328.4,
        "net_leverage": 1.31,
        "interest_coverage": 4.82
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 62.1,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 226.3,
      "2026": 377.2,
      "2027": 528.1,
      "2028": 339.5,
      "2029": 226.3,
      "2030_plus": 188.6,
      "total_outstanding_usd_m": 1886.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 55.0,
      "base_case_px": 94.0,
      "recovery_floor_pct": 55.0,
      "recovery_base_pct": 94.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ghana Commercial & Bankruptcy Code",
      "thesis": "FPSO operator of Jubilee & TEN; $280M+ organic FCF sweep directed to 2026 Eurobond maturity refinancing."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond TLW 13.80% 2026 trading at 86.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "tullow",
        "issuer_name": "Tullow Oil",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "tullow",
        "issuer_name": "Tullow Oil",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "tullow",
        "issuer_name": "Tullow Oil",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "dangote_fert",
      "name": "Dangote Fertiliser",
      "ticker": "DANFER",
      "country": "Nigeria",
      "region": "Africa",
      "sector": "Materials",
      "type": "corp",
      "rating": "B / B2",
      "tier": "B",
      "benchmark_bond": "DANFER 11.50% 2028",
      "price": 96.0,
      "ytm": 11.5,
      "spread_bp": 715,
      "model_file": "Dangote_Fertiliser_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681dcba20e1bd4b761c01",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Dangote_Fertiliser_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 952.0,
        "ebitda": 422.5,
        "ebitda_margin_pct": 44.4,
        "cfo": 342.6,
        "capex": 159.2,
        "fcf": 183.4,
        "cash": 268.1,
        "gross_debt": 1944.8,
        "net_debt": 1676.7,
        "net_leverage": 3.97,
        "interest_coverage": 4.14
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1148.0,
        "ebitda": 520.0,
        "ebitda_margin_pct": 45.3,
        "cfo": 430.9,
        "capex": 193.4,
        "fcf": 237.5,
        "cash": 341.2,
        "gross_debt": 2105.0,
        "net_debt": 1763.8,
        "net_leverage": 3.39,
        "interest_coverage": 4.07
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1288.0,
        "ebitda": 585.0,
        "ebitda_margin_pct": 45.4,
        "cfo": 486.2,
        "capex": 216.1,
        "fcf": 270.1,
        "cash": 414.4,
        "gross_debt": 2242.2,
        "net_debt": 1827.8,
        "net_leverage": 3.12,
        "interest_coverage": 3.82
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1400.0,
        "ebitda": 650.0,
        "ebitda_margin_pct": 46.4,
        "cfo": 552.5,
        "capex": 227.5,
        "fcf": 325.0,
        "cash": 487.5,
        "gross_debt": 2288.0,
        "net_debt": 1800.5,
        "net_leverage": 2.77,
        "interest_coverage": 3.82
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1512.0,
        "ebitda": 715.0,
        "ebitda_margin_pct": 47.3,
        "cfo": 607.8,
        "capex": 238.9,
        "fcf": 368.9,
        "cash": 575.2,
        "gross_debt": 2242.2,
        "net_debt": 1667.0,
        "net_leverage": 2.33,
        "interest_coverage": 4.38
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1610.0,
        "ebitda": 767.0,
        "ebitda_margin_pct": 47.6,
        "cfo": 651.9,
        "capex": 232.0,
        "fcf": 419.9,
        "cash": 658.1,
        "gross_debt": 2173.6,
        "net_debt": 1515.5,
        "net_leverage": 1.98,
        "interest_coverage": 4.9
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1680.0,
        "ebitda": 806.0,
        "ebitda_margin_pct": 48.0,
        "cfo": 690.6,
        "capex": 222.9,
        "fcf": 467.7,
        "cash": 731.2,
        "gross_debt": 2059.2,
        "net_debt": 1328.0,
        "net_leverage": 1.65,
        "interest_coverage": 5.38
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 6.7,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 168.0
    },
    "debt_maturities": {
      "2025": 216.1,
      "2026": 360.1,
      "2027": 504.1,
      "2028": 324.1,
      "2029": 216.1,
      "2030_plus": 180.1,
      "total_outstanding_usd_m": 1800.6
    },
    "recovery_analysis": {
      "distressed_floor_px": 60.0,
      "base_case_px": 98.0,
      "recovery_floor_pct": 60.0,
      "recovery_base_pct": 98.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "World's largest single-train urea complex (3.0 mtpa); Lekki Free Zone tax holiday; dollar exports to US and Brazil."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DANFER 11.50% 2028 trading at 96.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dangote_fert",
        "issuer_name": "Dangote Fertiliser",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "dangote_fert",
        "issuer_name": "Dangote Fertiliser",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "dangote_fert",
        "issuer_name": "Dangote Fertiliser",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "dangote_ref",
      "name": "Dangote Refinery",
      "ticker": "DANREF",
      "country": "Nigeria",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "B / B2",
      "tier": "B",
      "benchmark_bond": "DANREF 12.50% 2029",
      "price": 95.0,
      "ytm": 12.5,
      "spread_bp": 815,
      "model_file": "Dangote_Refinery_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6810dbe29cf68d8e1ebf3",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Dangote_Refinery_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 68.0,
        "ebitda": 65.0,
        "ebitda_margin_pct": 95.6,
        "cfo": 52.7,
        "capex": 24.5,
        "fcf": 28.2,
        "cash": 41.2,
        "gross_debt": 270.3,
        "net_debt": 229.1,
        "net_leverage": 3.52,
        "interest_coverage": 4.44
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 82.0,
        "ebitda": 80.0,
        "ebitda_margin_pct": 97.6,
        "cfo": 66.3,
        "capex": 29.8,
        "fcf": 36.5,
        "cash": 52.5,
        "gross_debt": 292.6,
        "net_debt": 240.1,
        "net_leverage": 3.0,
        "interest_coverage": 4.37
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 92.0,
        "ebitda": 90.0,
        "ebitda_margin_pct": 97.8,
        "cfo": 74.8,
        "capex": 33.2,
        "fcf": 41.6,
        "cash": 63.8,
        "gross_debt": 311.6,
        "net_debt": 247.8,
        "net_leverage": 2.75,
        "interest_coverage": 4.1
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 100.0,
        "ebitda": 100.0,
        "ebitda_margin_pct": 100.0,
        "cfo": 85.0,
        "capex": 35.0,
        "fcf": 50.0,
        "cash": 75.0,
        "gross_debt": 318.0,
        "net_debt": 243.0,
        "net_leverage": 2.43,
        "interest_coverage": 4.1
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 108.0,
        "ebitda": 110.0,
        "ebitda_margin_pct": 101.9,
        "cfo": 93.5,
        "capex": 36.8,
        "fcf": 56.7,
        "cash": 88.5,
        "gross_debt": 311.6,
        "net_debt": 223.1,
        "net_leverage": 2.03,
        "interest_coverage": 4.7
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 115.0,
        "ebitda": 118.0,
        "ebitda_margin_pct": 102.6,
        "cfo": 100.3,
        "capex": 35.7,
        "fcf": 64.6,
        "cash": 101.2,
        "gross_debt": 302.1,
        "net_debt": 200.9,
        "net_leverage": 1.7,
        "interest_coverage": 5.26
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 120.0,
        "ebitda": 124.0,
        "ebitda_margin_pct": 103.3,
        "cfo": 106.2,
        "capex": 34.3,
        "fcf": 71.9,
        "cash": 112.5,
        "gross_debt": 286.2,
        "net_debt": 173.7,
        "net_leverage": 1.4,
        "interest_coverage": 5.78
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 4.5,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 29.2,
      "2026": 48.6,
      "2027": 68.0,
      "2028": 43.7,
      "2029": 29.2,
      "2030_plus": 24.3,
      "total_outstanding_usd_m": 243.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 68.0,
      "base_case_px": 102.0,
      "recovery_floor_pct": 68.0,
      "recovery_base_pct": 102.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "650,000 bpd coastal mega-refinery; eliminates Nigerian fuel import dependency; target $3.5B run-rate EBITDA."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DANREF 12.50% 2029 trading at 95.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dangote_ref",
        "issuer_name": "Dangote Refinery",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "dangote_ref",
        "issuer_name": "Dangote Refinery",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "dangote_ref",
        "issuer_name": "Dangote Refinery",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "sasol",
      "name": "Sasol Ltd",
      "ticker": "SOLSJ",
      "country": "South Africa",
      "region": "Africa",
      "sector": "Energy",
      "type": "corp",
      "rating": "BB+ / Ba1",
      "tier": "BB",
      "benchmark_bond": "SOLSJ 7.85% 2029",
      "price": 98.4,
      "ytm": 7.85,
      "spread_bp": 365,
      "model_file": "Sasol_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68168a6b6e3b7106bfdda",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Sasol_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 9656.0,
        "ebitda": 1852.5,
        "ebitda_margin_pct": 19.2,
        "cfo": 1502.0,
        "capex": 698.2,
        "fcf": 803.8,
        "cash": 1175.6,
        "gross_debt": 6758.8,
        "net_debt": 5583.2,
        "net_leverage": 3.01,
        "interest_coverage": 5.61
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 11644.0,
        "ebitda": 2280.0,
        "ebitda_margin_pct": 19.6,
        "cfo": 1889.5,
        "capex": 847.9,
        "fcf": 1041.6,
        "cash": 1496.2,
        "gross_debt": 7315.4,
        "net_debt": 5819.2,
        "net_leverage": 2.55,
        "interest_coverage": 5.53
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 13064.0,
        "ebitda": 2565.0,
        "ebitda_margin_pct": 19.6,
        "cfo": 2131.8,
        "capex": 947.6,
        "fcf": 1184.2,
        "cash": 1816.9,
        "gross_debt": 7792.5,
        "net_debt": 5975.6,
        "net_leverage": 2.33,
        "interest_coverage": 5.18
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 14200.0,
        "ebitda": 2850.0,
        "ebitda_margin_pct": 20.1,
        "cfo": 2422.5,
        "capex": 997.5,
        "fcf": 1425.0,
        "cash": 2137.5,
        "gross_debt": 7951.5,
        "net_debt": 5814.0,
        "net_leverage": 2.04,
        "interest_coverage": 5.18
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 15336.0,
        "ebitda": 3135.0,
        "ebitda_margin_pct": 20.4,
        "cfo": 2664.8,
        "capex": 1047.4,
        "fcf": 1617.4,
        "cash": 2522.2,
        "gross_debt": 7792.5,
        "net_debt": 5270.3,
        "net_leverage": 1.68,
        "interest_coverage": 5.94
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 16330.0,
        "ebitda": 3363.0,
        "ebitda_margin_pct": 20.6,
        "cfo": 2858.5,
        "capex": 1017.4,
        "fcf": 1841.1,
        "cash": 2885.6,
        "gross_debt": 7553.9,
        "net_debt": 4668.3,
        "net_leverage": 1.39,
        "interest_coverage": 6.64
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 17040.0,
        "ebitda": 3534.0,
        "ebitda_margin_pct": 20.7,
        "cfo": 3028.1,
        "capex": 977.5,
        "fcf": 2050.6,
        "cash": 3206.2,
        "gross_debt": 7156.4,
        "net_debt": 3950.2,
        "net_leverage": 1.12,
        "interest_coverage": 7.3
      }
    ],
    "supplementary_data": {
      "net_production_kboed": 639.0,
      "lifting_cost_usd_per_boe": 14.5,
      "realized_price_usd_per_bbl": 76.5,
      "reserve_life_2p_years": 14.2,
      "offshore_escrow_routing_pct": 100.0,
      "hedged_production_pct": 45.0
    },
    "debt_maturities": {
      "2025": 697.7,
      "2026": 1162.8,
      "2027": 1627.9,
      "2028": 1046.5,
      "2029": 697.7,
      "2030_plus": 581.4,
      "total_outstanding_usd_m": 5814.0
    },
    "recovery_analysis": {
      "distressed_floor_px": 64.0,
      "base_case_px": 99.0,
      "recovery_floor_pct": 64.0,
      "recovery_base_pct": 99.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "South Africa Commercial & Bankruptcy Code",
      "thesis": "Secunda coal-to-liquids synthetic fuels monopoly; global specialty chemicals cash flow; crossover rating tier."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond SOLSJ 7.85% 2029 trading at 98.4."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "sasol",
        "issuer_name": "Sasol Ltd",
        "sector": "Energy",
        "topic": "Offshore Escrow & Debt Routing",
        "source": "Cognitive Credit / Morgan Stanley",
        "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
      },
      {
        "issuer_id": "sasol",
        "issuer_name": "Sasol Ltd",
        "sector": "Energy",
        "topic": "Lifting Costs & Break-even",
        "source": "Wood Mackenzie / Company Filings",
        "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
      },
      {
        "issuer_id": "sasol",
        "issuer_name": "Sasol Ltd",
        "sector": "Energy",
        "topic": "Reserve Replacement (1P/2P)",
        "source": "Independent Petroleum Engineers",
        "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
      }
    ]
  },
  {
    "metadata": {
      "id": "tharisa",
      "name": "Tharisa plc",
      "ticker": "THARISA",
      "country": "South Africa",
      "region": "Africa",
      "sector": "Materials",
      "type": "corp",
      "rating": "BB- / Ba3 Implied",
      "tier": "BB",
      "benchmark_bond": "THARISA 9.85% 2027",
      "price": 98.0,
      "ytm": 9.85,
      "spread_bp": 550,
      "model_file": "Tharisa_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6815aa0c2e66138027562",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Tharisa_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 482.8,
        "ebitda": 120.2,
        "ebitda_margin_pct": 24.9,
        "cfo": 97.5,
        "capex": 45.3,
        "fcf": 52.2,
        "cash": 76.3,
        "gross_debt": 177.7,
        "net_debt": 101.4,
        "net_leverage": 0.84,
        "interest_coverage": 9.11
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 582.2,
        "ebitda": 148.0,
        "ebitda_margin_pct": 25.4,
        "cfo": 122.7,
        "capex": 55.0,
        "fcf": 67.7,
        "cash": 97.1,
        "gross_debt": 192.3,
        "net_debt": 95.2,
        "net_leverage": 0.64,
        "interest_coverage": 8.97
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 653.2,
        "ebitda": 166.5,
        "ebitda_margin_pct": 25.5,
        "cfo": 138.4,
        "capex": 61.5,
        "fcf": 76.9,
        "cash": 117.9,
        "gross_debt": 204.9,
        "net_debt": 87.0,
        "net_leverage": 0.52,
        "interest_coverage": 8.41
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 710.0,
        "ebitda": 185.0,
        "ebitda_margin_pct": 26.1,
        "cfo": 157.2,
        "capex": 64.8,
        "fcf": 92.4,
        "cash": 138.8,
        "gross_debt": 209.1,
        "net_debt": 70.3,
        "net_leverage": 0.38,
        "interest_coverage": 8.41
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 766.8,
        "ebitda": 203.5,
        "ebitda_margin_pct": 26.5,
        "cfo": 173.0,
        "capex": 68.0,
        "fcf": 105.0,
        "cash": 163.7,
        "gross_debt": 204.9,
        "net_debt": 41.2,
        "net_leverage": 0.2,
        "interest_coverage": 9.64
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 816.5,
        "ebitda": 218.3,
        "ebitda_margin_pct": 26.7,
        "cfo": 185.6,
        "capex": 66.0,
        "fcf": 119.6,
        "cash": 187.3,
        "gross_debt": 198.6,
        "net_debt": 11.3,
        "net_leverage": 0.05,
        "interest_coverage": 10.79
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 852.0,
        "ebitda": 229.4,
        "ebitda_margin_pct": 26.9,
        "cfo": 196.6,
        "capex": 63.5,
        "fcf": 133.1,
        "cash": 208.1,
        "gross_debt": 188.1,
        "net_debt": 0.0,
        "net_leverage": 0.0,
        "interest_coverage": 11.85
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 4.63,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 85.2
    },
    "debt_maturities": {
      "2025": 8.4,
      "2026": 14.1,
      "2027": 19.7,
      "2028": 12.7,
      "2029": 8.4,
      "2030_plus": 7.0,
      "total_outstanding_usd_m": 70.3
    },
    "recovery_analysis": {
      "distressed_floor_px": 70.0,
      "base_case_px": 99.0,
      "recovery_floor_pct": 70.0,
      "recovery_base_pct": 99.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "South Africa Commercial & Bankruptcy Code",
      "thesis": "Mechanized open-pit Bushveld mine; 14-yr open-pit life; structural chrome co-product hedge against PGM cycles; 0.38x net debt."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond THARISA 9.85% 2027 trading at 98.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "tharisa",
        "issuer_name": "Tharisa plc",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "tharisa",
        "issuer_name": "Tharisa plc",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "tharisa",
        "issuer_name": "Tharisa plc",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "ihs",
      "name": "IHS Towers",
      "ticker": "IHS",
      "country": "Nigeria",
      "region": "Africa",
      "sector": "Technology",
      "type": "corp",
      "rating": "B+ / B2",
      "tier": "B",
      "benchmark_bond": "IHS 10.25% 2027",
      "price": 91.5,
      "ytm": 10.25,
      "spread_bp": 590,
      "model_file": "IHS_Towers_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6811bbee5fc02b3b044c7",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/IHS_Towers_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1462.0,
        "ebitda": 728.0,
        "ebitda_margin_pct": 49.8,
        "cfo": 590.2,
        "capex": 274.4,
        "fcf": 315.8,
        "cash": 462.0,
        "gross_debt": 3722.3,
        "net_debt": 3260.3,
        "net_leverage": 4.48,
        "interest_coverage": 3.47
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1763.0,
        "ebitda": 896.0,
        "ebitda_margin_pct": 50.8,
        "cfo": 742.6,
        "capex": 333.2,
        "fcf": 409.4,
        "cash": 588.0,
        "gross_debt": 4028.9,
        "net_debt": 3440.9,
        "net_leverage": 3.84,
        "interest_coverage": 3.41
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1978.0,
        "ebitda": 1008.0,
        "ebitda_margin_pct": 51.0,
        "cfo": 837.8,
        "capex": 372.4,
        "fcf": 465.4,
        "cash": 714.0,
        "gross_debt": 4291.6,
        "net_debt": 3577.6,
        "net_leverage": 3.55,
        "interest_coverage": 3.2
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 2150.0,
        "ebitda": 1120.0,
        "ebitda_margin_pct": 52.1,
        "cfo": 952.0,
        "capex": 392.0,
        "fcf": 560.0,
        "cash": 840.0,
        "gross_debt": 4379.2,
        "net_debt": 3539.2,
        "net_leverage": 3.16,
        "interest_coverage": 3.2
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 2322.0,
        "ebitda": 1232.0,
        "ebitda_margin_pct": 53.1,
        "cfo": 1047.2,
        "capex": 411.6,
        "fcf": 635.6,
        "cash": 991.2,
        "gross_debt": 4291.6,
        "net_debt": 3300.4,
        "net_leverage": 2.68,
        "interest_coverage": 3.67
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 2472.5,
        "ebitda": 1321.6,
        "ebitda_margin_pct": 53.5,
        "cfo": 1123.4,
        "capex": 399.8,
        "fcf": 723.6,
        "cash": 1134.0,
        "gross_debt": 4160.2,
        "net_debt": 3026.2,
        "net_leverage": 2.29,
        "interest_coverage": 4.1
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 2580.0,
        "ebitda": 1388.8,
        "ebitda_margin_pct": 53.8,
        "cfo": 1190.0,
        "capex": 384.2,
        "fcf": 805.8,
        "cash": 1260.0,
        "gross_debt": 3941.3,
        "net_debt": 2681.3,
        "net_leverage": 1.93,
        "interest_coverage": 4.51
      }
    ],
    "supplementary_data": {
      "tower_count": 37825,
      "tenancy_ratio": 1.62,
      "contracted_backlog_years": 8.5,
      "usd_linked_revenue_pct": 68.0,
      "churn_pct": 1.2
    },
    "debt_maturities": {
      "2025": 424.7,
      "2026": 707.8,
      "2027": 991.0,
      "2028": 637.1,
      "2029": 424.7,
      "2030_plus": 353.9,
      "total_outstanding_usd_m": 3539.2
    },
    "recovery_analysis": {
      "distressed_floor_px": 60.0,
      "base_case_px": 96.0,
      "recovery_floor_pct": 60.0,
      "recovery_base_pct": 96.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "English Law / DIFC / NY Jurisdiction",
      "thesis": "Over 40,000 telecom towers across Africa and LatAm; renegotiated MTN contracts embed USD indexation."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond IHS 10.25% 2027 trading at 91.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "ihs",
        "issuer_name": "IHS Towers",
        "sector": "Technology",
        "topic": "Tower Tenancy & Master Lease",
        "source": "Cognitive Credit / Arqaam",
        "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
      },
      {
        "issuer_id": "ihs",
        "issuer_name": "IHS Towers",
        "sector": "Technology",
        "topic": "FX Pass-Through Indexation",
        "source": "Company Filings",
        "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
      },
      {
        "issuer_id": "ihs",
        "issuer_name": "IHS Towers",
        "sector": "Technology",
        "topic": "Contracted Revenue Backlog",
        "source": "Investor Presentation",
        "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
      }
    ]
  },
  {
    "metadata": {
      "id": "helios",
      "name": "Helios Towers",
      "ticker": "HT",
      "country": "Pan-Africa",
      "region": "Africa",
      "sector": "Technology",
      "type": "corp",
      "rating": "B / B2",
      "tier": "B",
      "benchmark_bond": "HT 8.75% 2028",
      "price": 94.25,
      "ytm": 8.75,
      "spread_bp": 440,
      "model_file": "Helios_Towers_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6819fb0afce386998b737",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Helios_Towers_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 503.2,
        "ebitda": 250.2,
        "ebitda_margin_pct": 49.7,
        "cfo": 202.9,
        "capex": 94.3,
        "fcf": 108.6,
        "cash": 158.8,
        "gross_debt": 1714.8,
        "net_debt": 1556.0,
        "net_leverage": 6.22,
        "interest_coverage": 2.98
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 606.8,
        "ebitda": 308.0,
        "ebitda_margin_pct": 50.8,
        "cfo": 255.3,
        "capex": 114.5,
        "fcf": 140.8,
        "cash": 202.1,
        "gross_debt": 1856.0,
        "net_debt": 1653.9,
        "net_leverage": 5.37,
        "interest_coverage": 2.93
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 680.8,
        "ebitda": 346.5,
        "ebitda_margin_pct": 50.9,
        "cfo": 288.0,
        "capex": 128.0,
        "fcf": 160.0,
        "cash": 245.4,
        "gross_debt": 1977.1,
        "net_debt": 1731.7,
        "net_leverage": 5.0,
        "interest_coverage": 2.75
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 740.0,
        "ebitda": 385.0,
        "ebitda_margin_pct": 52.0,
        "cfo": 327.2,
        "capex": 134.8,
        "fcf": 192.4,
        "cash": 288.8,
        "gross_debt": 2017.4,
        "net_debt": 1728.6,
        "net_leverage": 4.49,
        "interest_coverage": 2.75
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 799.2,
        "ebitda": 423.5,
        "ebitda_margin_pct": 53.0,
        "cfo": 360.0,
        "capex": 141.5,
        "fcf": 218.5,
        "cash": 340.7,
        "gross_debt": 1977.1,
        "net_debt": 1636.4,
        "net_leverage": 3.86,
        "interest_coverage": 3.15
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 851.0,
        "ebitda": 454.3,
        "ebitda_margin_pct": 53.4,
        "cfo": 386.2,
        "capex": 137.4,
        "fcf": 248.8,
        "cash": 389.8,
        "gross_debt": 1916.5,
        "net_debt": 1526.7,
        "net_leverage": 3.36,
        "interest_coverage": 3.53
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 888.0,
        "ebitda": 477.4,
        "ebitda_margin_pct": 53.8,
        "cfo": 409.1,
        "capex": 132.1,
        "fcf": 277.0,
        "cash": 433.1,
        "gross_debt": 1815.7,
        "net_debt": 1382.6,
        "net_leverage": 2.9,
        "interest_coverage": 3.87
      }
    ],
    "supplementary_data": {
      "tower_count": 15970,
      "tenancy_ratio": 1.62,
      "contracted_backlog_years": 8.5,
      "usd_linked_revenue_pct": 68.0,
      "churn_pct": 1.2
    },
    "debt_maturities": {
      "2025": 207.4,
      "2026": 345.7,
      "2027": 484.0,
      "2028": 311.2,
      "2029": 207.4,
      "2030_plus": 172.9,
      "total_outstanding_usd_m": 1728.6
    },
    "recovery_analysis": {
      "distressed_floor_px": 65.0,
      "base_case_px": 97.5,
      "recovery_floor_pct": 65.0,
      "recovery_base_pct": 97.5,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Pan-Africa Commercial & Bankruptcy Code",
      "thesis": ">65% hard currency / pegged contracts; 14.2k towers with 2.1x tenancy; FCF inflection underway."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond HT 8.75% 2028 trading at 94.25."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "helios",
        "issuer_name": "Helios Towers",
        "sector": "Technology",
        "topic": "Tower Tenancy & Master Lease",
        "source": "Cognitive Credit / Arqaam",
        "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
      },
      {
        "issuer_id": "helios",
        "issuer_name": "Helios Towers",
        "sector": "Technology",
        "topic": "FX Pass-Through Indexation",
        "source": "Company Filings",
        "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
      },
      {
        "issuer_id": "helios",
        "issuer_name": "Helios Towers",
        "sector": "Technology",
        "topic": "Contracted Revenue Backlog",
        "source": "Investor Presentation",
        "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
      }
    ]
  },
  {
    "metadata": {
      "id": "africell",
      "name": "Africell",
      "ticker": "AFRCEL",
      "country": "Angola",
      "region": "Africa",
      "sector": "Technology",
      "type": "corp",
      "rating": "B- / B3",
      "tier": "B",
      "benchmark_bond": "AFRCEL 11.45% 2028",
      "price": 92.0,
      "ytm": 11.45,
      "spread_bp": 710,
      "model_file": "Africell_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6811ba825cb8d9a616ac8",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Africell_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 333.2,
        "ebitda": 107.2,
        "ebitda_margin_pct": 32.2,
        "cfo": 87.0,
        "capex": 40.4,
        "fcf": 46.6,
        "cash": 68.1,
        "gross_debt": 458.6,
        "net_debt": 390.5,
        "net_leverage": 3.64,
        "interest_coverage": 3.13
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 401.8,
        "ebitda": 132.0,
        "ebitda_margin_pct": 32.9,
        "cfo": 109.4,
        "capex": 49.1,
        "fcf": 60.3,
        "cash": 86.6,
        "gross_debt": 496.4,
        "net_debt": 409.8,
        "net_leverage": 3.1,
        "interest_coverage": 3.08
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 450.8,
        "ebitda": 148.5,
        "ebitda_margin_pct": 32.9,
        "cfo": 123.4,
        "capex": 54.9,
        "fcf": 68.5,
        "cash": 105.2,
        "gross_debt": 528.8,
        "net_debt": 423.6,
        "net_leverage": 2.85,
        "interest_coverage": 2.89
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 490.0,
        "ebitda": 165.0,
        "ebitda_margin_pct": 33.7,
        "cfo": 140.2,
        "capex": 57.7,
        "fcf": 82.5,
        "cash": 123.8,
        "gross_debt": 539.5,
        "net_debt": 415.7,
        "net_leverage": 2.52,
        "interest_coverage": 2.89
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 529.2,
        "ebitda": 181.5,
        "ebitda_margin_pct": 34.3,
        "cfo": 154.3,
        "capex": 60.6,
        "fcf": 93.7,
        "cash": 146.0,
        "gross_debt": 528.8,
        "net_debt": 382.8,
        "net_leverage": 2.11,
        "interest_coverage": 3.31
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 563.5,
        "ebitda": 194.7,
        "ebitda_margin_pct": 34.6,
        "cfo": 165.5,
        "capex": 58.9,
        "fcf": 106.6,
        "cash": 167.1,
        "gross_debt": 512.6,
        "net_debt": 345.5,
        "net_leverage": 1.77,
        "interest_coverage": 3.71
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 588.0,
        "ebitda": 204.6,
        "ebitda_margin_pct": 34.8,
        "cfo": 175.3,
        "capex": 56.6,
        "fcf": 118.7,
        "cash": 185.6,
        "gross_debt": 485.6,
        "net_debt": 300.0,
        "net_leverage": 1.47,
        "interest_coverage": 4.07
      }
    ],
    "supplementary_data": {
      "tower_count": 12095,
      "tenancy_ratio": 1.62,
      "contracted_backlog_years": 8.5,
      "usd_linked_revenue_pct": 68.0,
      "churn_pct": 1.2
    },
    "debt_maturities": {
      "2025": 49.9,
      "2026": 83.2,
      "2027": 116.4,
      "2028": 74.8,
      "2029": 49.9,
      "2030_plus": 41.6,
      "total_outstanding_usd_m": 415.8
    },
    "recovery_analysis": {
      "distressed_floor_px": 58.0,
      "base_case_px": 95.0,
      "recovery_floor_pct": 58.0,
      "recovery_base_pct": 95.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Angola Commercial & Bankruptcy Code",
      "thesis": "6M+ subscribers captured in Angola post-2022 rollout; strategic US DFC $100M+ senior debt backing."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond AFRCEL 11.45% 2028 trading at 92.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "africell",
        "issuer_name": "Africell",
        "sector": "Technology",
        "topic": "Tower Tenancy & Master Lease",
        "source": "Cognitive Credit / Arqaam",
        "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
      },
      {
        "issuer_id": "africell",
        "issuer_name": "Africell",
        "sector": "Technology",
        "topic": "FX Pass-Through Indexation",
        "source": "Company Filings",
        "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
      },
      {
        "issuer_id": "africell",
        "issuer_name": "Africell",
        "sector": "Technology",
        "topic": "Contracted Revenue Backlog",
        "source": "Investor Presentation",
        "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
      }
    ]
  },
  {
    "metadata": {
      "id": "liqtel",
      "name": "Liquid Telecom",
      "ticker": "LIQTEL",
      "country": "South Africa",
      "region": "Africa",
      "sector": "Technology",
      "type": "corp",
      "rating": "B- / Caa1",
      "tier": "B",
      "benchmark_bond": "LIQTEL 14.25% 2026",
      "price": 81.5,
      "ytm": 14.25,
      "spread_bp": 990,
      "model_file": "Liquid_Telecom_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c68106a069d7d8c091ffa8",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Liquid_Telecom_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 462.4,
        "ebitda": 136.5,
        "ebitda_margin_pct": 29.5,
        "cfo": 110.7,
        "capex": 51.4,
        "fcf": 59.3,
        "cash": 86.6,
        "gross_debt": 1047.8,
        "net_debt": 961.2,
        "net_leverage": 7.04,
        "interest_coverage": 1.98
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 557.6,
        "ebitda": 168.0,
        "ebitda_margin_pct": 30.1,
        "cfo": 139.2,
        "capex": 62.5,
        "fcf": 76.7,
        "cash": 110.2,
        "gross_debt": 1134.1,
        "net_debt": 1023.9,
        "net_leverage": 6.09,
        "interest_coverage": 1.95
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 625.6,
        "ebitda": 189.0,
        "ebitda_margin_pct": 30.2,
        "cfo": 157.1,
        "capex": 69.8,
        "fcf": 87.3,
        "cash": 133.9,
        "gross_debt": 1208.0,
        "net_debt": 1074.1,
        "net_leverage": 5.68,
        "interest_coverage": 1.83
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 680.0,
        "ebitda": 210.0,
        "ebitda_margin_pct": 30.9,
        "cfo": 178.5,
        "capex": 73.5,
        "fcf": 105.0,
        "cash": 157.5,
        "gross_debt": 1232.7,
        "net_debt": 1075.2,
        "net_leverage": 5.12,
        "interest_coverage": 1.83
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 734.4,
        "ebitda": 231.0,
        "ebitda_margin_pct": 31.5,
        "cfo": 196.4,
        "capex": 77.2,
        "fcf": 119.2,
        "cash": 185.8,
        "gross_debt": 1208.0,
        "net_debt": 1022.2,
        "net_leverage": 4.43,
        "interest_coverage": 2.1
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 782.0,
        "ebitda": 247.8,
        "ebitda_margin_pct": 31.7,
        "cfo": 210.6,
        "capex": 75.0,
        "fcf": 135.6,
        "cash": 212.6,
        "gross_debt": 1171.1,
        "net_debt": 958.5,
        "net_leverage": 3.87,
        "interest_coverage": 2.35
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 816.0,
        "ebitda": 260.4,
        "ebitda_margin_pct": 31.9,
        "cfo": 223.1,
        "capex": 72.0,
        "fcf": 151.1,
        "cash": 236.2,
        "gross_debt": 1109.4,
        "net_debt": 873.2,
        "net_leverage": 3.35,
        "interest_coverage": 2.58
      }
    ],
    "supplementary_data": {
      "tower_count": 15040,
      "tenancy_ratio": 1.62,
      "contracted_backlog_years": 8.5,
      "usd_linked_revenue_pct": 68.0,
      "churn_pct": 1.2
    },
    "debt_maturities": {
      "2025": 129.0,
      "2026": 215.0,
      "2027": 301.1,
      "2028": 193.5,
      "2029": 129.0,
      "2030_plus": 107.5,
      "total_outstanding_usd_m": 1075.1
    },
    "recovery_analysis": {
      "distressed_floor_px": 52.0,
      "base_case_px": 88.0,
      "recovery_floor_pct": 52.0,
      "recovery_base_pct": 88.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "South Africa Commercial & Bankruptcy Code",
      "thesis": "110k km terrestrial pan-African fiber grid; Africa Data Centres; high yield compensates for 2026 maturity wall."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond LIQTEL 14.25% 2026 trading at 81.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "liqtel",
        "issuer_name": "Liquid Telecom",
        "sector": "Technology",
        "topic": "Tower Tenancy & Master Lease",
        "source": "Cognitive Credit / Arqaam",
        "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
      },
      {
        "issuer_id": "liqtel",
        "issuer_name": "Liquid Telecom",
        "sector": "Technology",
        "topic": "FX Pass-Through Indexation",
        "source": "Company Filings",
        "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
      },
      {
        "issuer_id": "liqtel",
        "issuer_name": "Liquid Telecom",
        "sector": "Technology",
        "topic": "Contracted Revenue Backlog",
        "source": "Investor Presentation",
        "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
      }
    ]
  },
  {
    "metadata": {
      "id": "aragvi",
      "name": "Aragvi / Trans-Oil",
      "ticker": "ARAGVI",
      "country": "Moldova",
      "region": "CEEMEA",
      "sector": "Consumer",
      "type": "corp",
      "rating": "B / B-",
      "tier": "B",
      "benchmark_bond": "ARAGVI 12.15% 2026",
      "price": 89.0,
      "ytm": 12.15,
      "spread_bp": 780,
      "model_file": "Aragvi_Holding_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681089456caf1fef61b55",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Aragvi_Holding_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 986.0,
        "ebitda": 104.0,
        "ebitda_margin_pct": 10.5,
        "cfo": 84.3,
        "capex": 39.2,
        "fcf": 45.1,
        "cash": 66.0,
        "gross_debt": 459.7,
        "net_debt": 393.7,
        "net_leverage": 3.79,
        "interest_coverage": 3.34
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1189.0,
        "ebitda": 128.0,
        "ebitda_margin_pct": 10.8,
        "cfo": 106.1,
        "capex": 47.6,
        "fcf": 58.5,
        "cash": 84.0,
        "gross_debt": 497.5,
        "net_debt": 413.5,
        "net_leverage": 3.23,
        "interest_coverage": 3.29
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 1334.0,
        "ebitda": 144.0,
        "ebitda_margin_pct": 10.8,
        "cfo": 119.7,
        "capex": 53.2,
        "fcf": 66.5,
        "cash": 102.0,
        "gross_debt": 530.0,
        "net_debt": 428.0,
        "net_leverage": 2.97,
        "interest_coverage": 3.08
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 1450.0,
        "ebitda": 160.0,
        "ebitda_margin_pct": 11.0,
        "cfo": 136.0,
        "capex": 56.0,
        "fcf": 80.0,
        "cash": 120.0,
        "gross_debt": 540.8,
        "net_debt": 420.8,
        "net_leverage": 2.63,
        "interest_coverage": 3.08
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 1566.0,
        "ebitda": 176.0,
        "ebitda_margin_pct": 11.2,
        "cfo": 149.6,
        "capex": 58.8,
        "fcf": 90.8,
        "cash": 141.6,
        "gross_debt": 530.0,
        "net_debt": 388.4,
        "net_leverage": 2.21,
        "interest_coverage": 3.53
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 1667.5,
        "ebitda": 188.8,
        "ebitda_margin_pct": 11.3,
        "cfo": 160.5,
        "capex": 57.1,
        "fcf": 103.4,
        "cash": 162.0,
        "gross_debt": 513.8,
        "net_debt": 351.8,
        "net_leverage": 1.86,
        "interest_coverage": 3.95
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 1740.0,
        "ebitda": 198.4,
        "ebitda_margin_pct": 11.4,
        "cfo": 170.0,
        "capex": 54.9,
        "fcf": 115.1,
        "cash": 180.0,
        "gross_debt": 486.7,
        "net_debt": 306.7,
        "net_leverage": 1.55,
        "interest_coverage": 4.34
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 3190.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 50.5,
      "2026": 84.2,
      "2027": 117.8,
      "2028": 75.7,
      "2029": 50.5,
      "2030_plus": 42.1,
      "total_outstanding_usd_m": 420.8
    },
    "recovery_analysis": {
      "distressed_floor_px": 54.0,
      "base_case_px": 93.0,
      "recovery_floor_pct": 54.0,
      "recovery_base_pct": 93.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Moldova Commercial & Bankruptcy Code",
      "thesis": "Danube Giurgiulesti export port terminal; 100% USD grain & sunflower oil exports; Oaktree Capital backing."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond ARAGVI 12.15% 2026 trading at 89.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "aragvi",
        "issuer_name": "Aragvi / Trans-Oil",
        "sector": "Consumer",
        "topic": "Working Capital & Export Moat",
        "source": "Cognitive Credit / Broker Note",
        "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
      },
      {
        "issuer_id": "aragvi",
        "issuer_name": "Aragvi / Trans-Oil",
        "sector": "Consumer",
        "topic": "Geopolitical Transmission",
        "source": "Macro Risk Assessment",
        "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
      },
      {
        "issuer_id": "aragvi",
        "issuer_name": "Aragvi / Trans-Oil",
        "sector": "Consumer",
        "topic": "Deleveraging Trajectory",
        "source": "Company Guidance",
        "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
      }
    ]
  },
  {
    "metadata": {
      "id": "mhp",
      "name": "MHP SE",
      "ticker": "MHPSA",
      "country": "Ukraine",
      "region": "CEEMEA",
      "sector": "Consumer",
      "type": "corp",
      "rating": "CCC+ / Caa2",
      "tier": "CCC",
      "benchmark_bond": "MHP 13.10% 2026",
      "price": 82.5,
      "ytm": 13.1,
      "spread_bp": 875,
      "model_file": "MHP_SE_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681489868f2bb1608ed64",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/MHP_SE_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 2108.0,
        "ebitda": 299.0,
        "ebitda_margin_pct": 14.2,
        "cfo": 242.4,
        "capex": 112.7,
        "fcf": 129.7,
        "cash": 189.8,
        "gross_debt": 1423.2,
        "net_debt": 1233.4,
        "net_leverage": 4.13,
        "interest_coverage": 3.83
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 2542.0,
        "ebitda": 368.0,
        "ebitda_margin_pct": 14.5,
        "cfo": 305.0,
        "capex": 136.8,
        "fcf": 168.2,
        "cash": 241.5,
        "gross_debt": 1540.4,
        "net_debt": 1298.9,
        "net_leverage": 3.53,
        "interest_coverage": 3.78
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 2852.0,
        "ebitda": 414.0,
        "ebitda_margin_pct": 14.5,
        "cfo": 344.1,
        "capex": 152.9,
        "fcf": 191.2,
        "cash": 293.2,
        "gross_debt": 1640.9,
        "net_debt": 1347.7,
        "net_leverage": 3.26,
        "interest_coverage": 3.54
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 3100.0,
        "ebitda": 460.0,
        "ebitda_margin_pct": 14.8,
        "cfo": 391.0,
        "capex": 161.0,
        "fcf": 230.0,
        "cash": 345.0,
        "gross_debt": 1674.4,
        "net_debt": 1329.4,
        "net_leverage": 2.89,
        "interest_coverage": 3.54
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 3348.0,
        "ebitda": 506.0,
        "ebitda_margin_pct": 15.1,
        "cfo": 430.1,
        "capex": 169.1,
        "fcf": 261.0,
        "cash": 407.1,
        "gross_debt": 1640.9,
        "net_debt": 1233.8,
        "net_leverage": 2.44,
        "interest_coverage": 4.06
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 3565.0,
        "ebitda": 542.8,
        "ebitda_margin_pct": 15.2,
        "cfo": 461.4,
        "capex": 164.2,
        "fcf": 297.2,
        "cash": 465.8,
        "gross_debt": 1590.7,
        "net_debt": 1124.9,
        "net_leverage": 2.07,
        "interest_coverage": 4.54
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 3720.0,
        "ebitda": 570.4,
        "ebitda_margin_pct": 15.3,
        "cfo": 488.8,
        "capex": 157.8,
        "fcf": 331.0,
        "cash": 517.5,
        "gross_debt": 1507.0,
        "net_debt": 989.5,
        "net_leverage": 1.73,
        "interest_coverage": 4.99
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 6820.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 159.5,
      "2026": 265.9,
      "2027": 372.2,
      "2028": 239.3,
      "2029": 159.5,
      "2030_plus": 132.9,
      "total_outstanding_usd_m": 1329.3
    },
    "recovery_analysis": {
      "distressed_floor_px": 50.0,
      "base_case_px": 90.0,
      "recovery_floor_pct": 50.0,
      "recovery_base_pct": 90.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ukraine Commercial & Bankruptcy Code",
      "thesis": "Europe's lowest-cost poultry producer; 360k ha arable land; Perutnina Ptuj generating offshore EU cash flow."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond MHP 13.10% 2026 trading at 82.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "mhp",
        "issuer_name": "MHP SE",
        "sector": "Consumer",
        "topic": "Working Capital & Export Moat",
        "source": "Cognitive Credit / Broker Note",
        "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
      },
      {
        "issuer_id": "mhp",
        "issuer_name": "MHP SE",
        "sector": "Consumer",
        "topic": "Geopolitical Transmission",
        "source": "Macro Risk Assessment",
        "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
      },
      {
        "issuer_id": "mhp",
        "issuer_name": "MHP SE",
        "sector": "Consumer",
        "topic": "Deleveraging Trajectory",
        "source": "Company Guidance",
        "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
      }
    ]
  },
  {
    "metadata": {
      "id": "metinvest",
      "name": "Metinvest",
      "ticker": "METINV",
      "country": "Ukraine",
      "region": "CEEMEA",
      "sector": "Materials",
      "type": "corp",
      "rating": "CCC+ / Caa3",
      "tier": "CCC",
      "benchmark_bond": "METINV 15.65% 2029",
      "price": 76.0,
      "ytm": 15.65,
      "spread_bp": 1125,
      "model_file": "Metinvest_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c681ff8aeff3d6ff934b3c",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Metinvest_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 5168.0,
        "ebitda": 598.0,
        "ebitda_margin_pct": 11.6,
        "cfo": 484.8,
        "capex": 225.4,
        "fcf": 259.4,
        "cash": 379.5,
        "gross_debt": 1986.3,
        "net_debt": 1606.8,
        "net_leverage": 2.69,
        "interest_coverage": 4.15
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 6232.0,
        "ebitda": 736.0,
        "ebitda_margin_pct": 11.8,
        "cfo": 610.0,
        "capex": 273.7,
        "fcf": 336.3,
        "cash": 483.0,
        "gross_debt": 2149.9,
        "net_debt": 1666.9,
        "net_leverage": 2.26,
        "interest_coverage": 4.09
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 6992.0,
        "ebitda": 828.0,
        "ebitda_margin_pct": 11.8,
        "cfo": 688.2,
        "capex": 305.9,
        "fcf": 382.3,
        "cash": 586.5,
        "gross_debt": 2290.1,
        "net_debt": 1703.6,
        "net_leverage": 2.06,
        "interest_coverage": 3.83
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 7600.0,
        "ebitda": 920.0,
        "ebitda_margin_pct": 12.1,
        "cfo": 782.0,
        "capex": 322.0,
        "fcf": 460.0,
        "cash": 690.0,
        "gross_debt": 2336.8,
        "net_debt": 1646.8,
        "net_leverage": 1.79,
        "interest_coverage": 3.83
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 8208.0,
        "ebitda": 1012.0,
        "ebitda_margin_pct": 12.3,
        "cfo": 860.2,
        "capex": 338.1,
        "fcf": 522.1,
        "cash": 814.2,
        "gross_debt": 2290.1,
        "net_debt": 1475.9,
        "net_leverage": 1.46,
        "interest_coverage": 4.39
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 8740.0,
        "ebitda": 1085.6,
        "ebitda_margin_pct": 12.4,
        "cfo": 922.8,
        "capex": 328.4,
        "fcf": 594.4,
        "cash": 931.5,
        "gross_debt": 2220.0,
        "net_debt": 1288.5,
        "net_leverage": 1.19,
        "interest_coverage": 4.91
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 9120.0,
        "ebitda": 1140.8,
        "ebitda_margin_pct": 12.5,
        "cfo": 977.5,
        "capex": 315.6,
        "fcf": 661.9,
        "cash": 1035.0,
        "gross_debt": 2103.1,
        "net_debt": 1068.1,
        "net_leverage": 0.94,
        "interest_coverage": 5.4
      }
    ],
    "supplementary_data": {
      "production_capacity_mtpa": 25.3,
      "hard_currency_export_pct": 78.0,
      "cash_cost_quartile": "Q1 Global Low Cost",
      "expansion_capex_usd_m": 912.0
    },
    "debt_maturities": {
      "2025": 197.6,
      "2026": 329.4,
      "2027": 461.1,
      "2028": 296.4,
      "2029": 197.6,
      "2030_plus": 164.7,
      "total_outstanding_usd_m": 1646.8
    },
    "recovery_analysis": {
      "distressed_floor_px": 45.0,
      "base_case_px": 86.0,
      "recovery_floor_pct": 45.0,
      "recovery_base_pct": 86.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ukraine Commercial & Bankruptcy Code",
      "thesis": "High-grade Kryvyi Rih iron ore pellet exporter; Black Sea maritime shipping corridor reopened; 1.79x net leverage."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond METINV 15.65% 2029 trading at 76.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "metinvest",
        "issuer_name": "Metinvest",
        "sector": "Materials",
        "topic": "Global Cost Curve Position",
        "source": "Cognitive Credit / Industry Benchmark",
        "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
      },
      {
        "issuer_id": "metinvest",
        "issuer_name": "Metinvest",
        "sector": "Materials",
        "topic": "Export Hard-Currency Revenue",
        "source": "Financial Statements",
        "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
      },
      {
        "issuer_id": "metinvest",
        "issuer_name": "Metinvest",
        "sector": "Materials",
        "topic": "Sovereign Strategic Asset",
        "source": "Credit Rating Agency Memo",
        "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
      }
    ]
  },
  {
    "metadata": {
      "id": "dtek",
      "name": "DTEK Energy",
      "ticker": "DTEKUA",
      "country": "Ukraine",
      "region": "CEEMEA",
      "sector": "Utilities",
      "type": "corp",
      "rating": "CCC / Caa3",
      "tier": "CCC",
      "benchmark_bond": "DTEK 18.50% 2027",
      "price": 68.5,
      "ytm": 18.5,
      "spread_bp": 1410,
      "model_file": "DTEK_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6810884b0f8366b6f9dce",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/DTEK_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1632.0,
        "ebitda": 273.0,
        "ebitda_margin_pct": 16.7,
        "cfo": 221.3,
        "capex": 102.9,
        "fcf": 118.4,
        "cash": 173.2,
        "gross_debt": 1345.9,
        "net_debt": 1172.7,
        "net_leverage": 4.3,
        "interest_coverage": 3.5
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 1968.0,
        "ebitda": 336.0,
        "ebitda_margin_pct": 17.1,
        "cfo": 278.5,
        "capex": 125.0,
        "fcf": 153.5,
        "cash": 220.5,
        "gross_debt": 1456.7,
        "net_debt": 1236.2,
        "net_leverage": 3.68,
        "interest_coverage": 3.45
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 2208.0,
        "ebitda": 378.0,
        "ebitda_margin_pct": 17.1,
        "cfo": 314.2,
        "capex": 139.7,
        "fcf": 174.5,
        "cash": 267.8,
        "gross_debt": 1551.7,
        "net_debt": 1283.9,
        "net_leverage": 3.4,
        "interest_coverage": 3.23
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 2400.0,
        "ebitda": 420.0,
        "ebitda_margin_pct": 17.5,
        "cfo": 357.0,
        "capex": 147.0,
        "fcf": 210.0,
        "cash": 315.0,
        "gross_debt": 1583.4,
        "net_debt": 1268.4,
        "net_leverage": 3.02,
        "interest_coverage": 3.23
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 2592.0,
        "ebitda": 462.0,
        "ebitda_margin_pct": 17.8,
        "cfo": 392.7,
        "capex": 154.3,
        "fcf": 238.4,
        "cash": 371.7,
        "gross_debt": 1551.7,
        "net_debt": 1180.0,
        "net_leverage": 2.55,
        "interest_coverage": 3.7
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 2760.0,
        "ebitda": 495.6,
        "ebitda_margin_pct": 18.0,
        "cfo": 421.3,
        "capex": 149.9,
        "fcf": 271.4,
        "cash": 425.2,
        "gross_debt": 1504.2,
        "net_debt": 1079.0,
        "net_leverage": 2.18,
        "interest_coverage": 4.14
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 2880.0,
        "ebitda": 520.8,
        "ebitda_margin_pct": 18.1,
        "cfo": 446.2,
        "capex": 144.1,
        "fcf": 302.1,
        "cash": 472.5,
        "gross_debt": 1425.1,
        "net_debt": 952.6,
        "net_leverage": 1.83,
        "interest_coverage": 4.55
      }
    ],
    "supplementary_data": {
      "installed_capacity_mw": 4320.0,
      "generation_volume_gwh": 15600.0,
      "renewable_capacity_pct": 68.0,
      "fx_indexed_tariffs_pct": 78.5,
      "capacity_utilization_factor_pct": 52.0
    },
    "debt_maturities": {
      "2025": 152.2,
      "2026": 253.7,
      "2027": 355.2,
      "2028": 228.3,
      "2029": 152.2,
      "2030_plus": 126.8,
      "total_outstanding_usd_m": 1268.4
    },
    "recovery_analysis": {
      "distressed_floor_px": 40.0,
      "base_case_px": 80.0,
      "recovery_floor_pct": 40.0,
      "recovery_base_pct": 80.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ukraine Commercial & Bankruptcy Code",
      "thesis": "Critical national power utility; 500MW+ renewables + domestic gas upstream; ENTSO-E EU grid connectivity."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond DTEK 18.50% 2027 trading at 68.5."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "dtek",
        "issuer_name": "DTEK Energy",
        "sector": "Utilities",
        "topic": "Feed-in Tariff (YEKDEM/PPA)",
        "source": "Cognitive Credit / Citi",
        "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
      },
      {
        "issuer_id": "dtek",
        "issuer_name": "DTEK Energy",
        "sector": "Utilities",
        "topic": "Capex Phasing & Grid Connection",
        "source": "Company Filings",
        "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
      },
      {
        "issuer_id": "dtek",
        "issuer_name": "DTEK Energy",
        "sector": "Utilities",
        "topic": "Regulatory Asset Base (RAB)",
        "source": "EMRA Regulatory Tariff Determination",
        "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
      }
    ]
  },
  {
    "metadata": {
      "id": "ukr_rail",
      "name": "Ukraine Rail (Ukrzaliznytsia)",
      "ticker": "RAILUA",
      "country": "Ukraine",
      "region": "CEEMEA",
      "sector": "Infrastructure",
      "type": "corp",
      "rating": "CCC / Caa3",
      "tier": "CCC",
      "benchmark_bond": "RAILUA 19.25% 2026",
      "price": 64.0,
      "ytm": 19.25,
      "spread_bp": 1485,
      "model_file": "Ukraine_Rail_Credit_Model.xlsx",
      "notion_id": "3df1d0ad68c6816bb15ffe27db5eeb55",
      "github_model_url": "https://raw.githubusercontent.com/rkarim25/cembicredit/main/models/Ukraine_Rail_Credit_Model.xlsx",
      "last_updated": "2026-09-19"
    },
    "financials_multi_year": [
      {
        "period": "2021A",
        "is_audited": true,
        "revenue": 1938.0,
        "ebitda": 247.0,
        "ebitda_margin_pct": 12.7,
        "cfo": 200.3,
        "capex": 93.1,
        "fcf": 107.2,
        "cash": 156.8,
        "gross_debt": 1482.6,
        "net_debt": 1325.8,
        "net_leverage": 5.37,
        "interest_coverage": 2.84
      },
      {
        "period": "2022A",
        "is_audited": true,
        "revenue": 2337.0,
        "ebitda": 304.0,
        "ebitda_margin_pct": 13.0,
        "cfo": 251.9,
        "capex": 113.0,
        "fcf": 138.9,
        "cash": 199.5,
        "gross_debt": 1604.7,
        "net_debt": 1405.2,
        "net_leverage": 4.62,
        "interest_coverage": 2.79
      },
      {
        "period": "2023A",
        "is_audited": true,
        "revenue": 2622.0,
        "ebitda": 342.0,
        "ebitda_margin_pct": 13.0,
        "cfo": 284.2,
        "capex": 126.3,
        "fcf": 157.9,
        "cash": 242.2,
        "gross_debt": 1709.3,
        "net_debt": 1467.1,
        "net_leverage": 4.29,
        "interest_coverage": 2.62
      },
      {
        "period": "2024A",
        "is_audited": true,
        "revenue": 2850.0,
        "ebitda": 380.0,
        "ebitda_margin_pct": 13.3,
        "cfo": 323.0,
        "capex": 133.0,
        "fcf": 190.0,
        "cash": 285.0,
        "gross_debt": 1744.2,
        "net_debt": 1459.2,
        "net_leverage": 3.84,
        "interest_coverage": 2.62
      },
      {
        "period": "2025E",
        "is_audited": false,
        "revenue": 3078.0,
        "ebitda": 418.0,
        "ebitda_margin_pct": 13.6,
        "cfo": 355.3,
        "capex": 139.7,
        "fcf": 215.6,
        "cash": 336.3,
        "gross_debt": 1709.3,
        "net_debt": 1373.0,
        "net_leverage": 3.28,
        "interest_coverage": 3.0
      },
      {
        "period": "2026E",
        "is_audited": false,
        "revenue": 3277.5,
        "ebitda": 448.4,
        "ebitda_margin_pct": 13.7,
        "cfo": 381.1,
        "capex": 135.7,
        "fcf": 245.4,
        "cash": 384.8,
        "gross_debt": 1657.0,
        "net_debt": 1272.2,
        "net_leverage": 2.84,
        "interest_coverage": 3.36
      },
      {
        "period": "2027E",
        "is_audited": false,
        "revenue": 3420.0,
        "ebitda": 471.2,
        "ebitda_margin_pct": 13.8,
        "cfo": 403.8,
        "capex": 130.3,
        "fcf": 273.5,
        "cash": 427.5,
        "gross_debt": 1569.8,
        "net_debt": 1142.3,
        "net_leverage": 2.42,
        "interest_coverage": 3.69
      }
    ],
    "supplementary_data": {
      "hard_currency_revenue_pct": 65.0,
      "concession_life_years": 28.0,
      "contracted_backlog_usd_m": 6270.0,
      "utilization_rate_pct": 82.0
    },
    "debt_maturities": {
      "2025": 175.1,
      "2026": 291.8,
      "2027": 408.6,
      "2028": 262.7,
      "2029": 175.1,
      "2030_plus": 145.9,
      "total_outstanding_usd_m": 1459.2
    },
    "recovery_analysis": {
      "distressed_floor_px": 38.0,
      "base_case_px": 78.0,
      "recovery_floor_pct": 38.0,
      "recovery_base_pct": 78.0,
      "implied_stress_ev_multiple": 4.2,
      "restructuring_framework": "Ukraine Commercial & Bankruptcy Code",
      "thesis": "100% sovereign-owned rail monopoly; essential wartime logistics spine; $1B+ in non-debt multilateral grants."
    },
    "timeline": [
      {
        "date": "2023-H2",
        "event": "Completed refinancing operations and expanded banking credit lines."
      },
      {
        "date": "2024-H1",
        "event": "Reported record operating metrics; benchmark bond RAILUA 19.25% 2026 trading at 64.0."
      },
      {
        "date": "2024-H2",
        "event": "Maintained robust liquidity buffers with total cash reaching target reserve levels."
      },
      {
        "date": "2025-E",
        "event": "Multi-year expansion projects reach commercial operations, bolstering cash flow coverage."
      }
    ],
    "annotations": [
      {
        "issuer_id": "ukr_rail",
        "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
        "sector": "Infrastructure",
        "topic": "Concession Duration & Moat",
        "source": "Cognitive Credit / S&P Global",
        "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
      },
      {
        "issuer_id": "ukr_rail",
        "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
        "sector": "Infrastructure",
        "topic": "Throughput & Capacity Utilization",
        "source": "Port Authority Filings",
        "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
      },
      {
        "issuer_id": "ukr_rail",
        "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
        "sector": "Infrastructure",
        "topic": "Structural Subordination & Waterfall",
        "source": "Bond Offering Circular",
        "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
      }
    ]
  }
];
const MASTER_ANNOTATIONS = [
  {
    "issuer_id": "akbank",
    "issuer_name": "Akbank TAS",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "akbank",
    "issuer_name": "Akbank TAS",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "akbank",
    "issuer_name": "Akbank TAS",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "isbank",
    "issuer_name": "Türkiye İş Bankası",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "isbank",
    "issuer_name": "Türkiye İş Bankası",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "isbank",
    "issuer_name": "Türkiye İş Bankası",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "garanti",
    "issuer_name": "Garanti BBVA",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "garanti",
    "issuer_name": "Garanti BBVA",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "garanti",
    "issuer_name": "Garanti BBVA",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "yapi_kredi",
    "issuer_name": "Yapı ve Kredi Bankası",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "yapi_kredi",
    "issuer_name": "Yapı ve Kredi Bankası",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "yapi_kredi",
    "issuer_name": "Yapı ve Kredi Bankası",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "vakifbank",
    "issuer_name": "VakıfBank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "vakifbank",
    "issuer_name": "VakıfBank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "vakifbank",
    "issuer_name": "VakıfBank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "halkbank",
    "issuer_name": "Halkbank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "halkbank",
    "issuer_name": "Halkbank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "halkbank",
    "issuer_name": "Halkbank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "turk_exim",
    "issuer_name": "Türk Eximbank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "turk_exim",
    "issuer_name": "Türk Eximbank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "turk_exim",
    "issuer_name": "Türk Eximbank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "fab",
    "issuer_name": "First Abu Dhabi Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "fab",
    "issuer_name": "First Abu Dhabi Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "fab",
    "issuer_name": "First Abu Dhabi Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "enbd",
    "issuer_name": "Emirates NBD",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "enbd",
    "issuer_name": "Emirates NBD",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "enbd",
    "issuer_name": "Emirates NBD",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "adcb",
    "issuer_name": "Abu Dhabi Commercial Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "adcb",
    "issuer_name": "Abu Dhabi Commercial Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "adcb",
    "issuer_name": "Abu Dhabi Commercial Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "dib",
    "issuer_name": "Dubai Islamic Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "dib",
    "issuer_name": "Dubai Islamic Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "dib",
    "issuer_name": "Dubai Islamic Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "snb",
    "issuer_name": "Saudi National Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "snb",
    "issuer_name": "Saudi National Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "snb",
    "issuer_name": "Saudi National Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "rajhi",
    "issuer_name": "Al Rajhi Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "rajhi",
    "issuer_name": "Al Rajhi Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "rajhi",
    "issuer_name": "Al Rajhi Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "riyad",
    "issuer_name": "Riyad Bank",
    "sector": "Banks",
    "topic": "NIM Dynamics & Rate Cycle",
    "source": "Cognitive Credit / J.P. Morgan",
    "note": "Net Interest Margin supported by high proportion of floating-rate commercial loans; fixed-cost customer deposits lag policy rate adjustments."
  },
  {
    "issuer_id": "riyad",
    "issuer_name": "Riyad Bank",
    "sector": "Banks",
    "topic": "Asset Quality & Stage 2 Exposure",
    "source": "BRSA / Central Bank Disclosures",
    "note": "NPL ratio remains low with >100% specific coverage. Stage 2 loans closely monitored under macroprudential guidance."
  },
  {
    "issuer_id": "riyad",
    "issuer_name": "Riyad Bank",
    "sector": "Banks",
    "topic": "Capital Adequacy & FX Sensitivity",
    "source": "Fitch / Moody's Rating Notes",
    "note": "CAR and CET1 ratios well above Basel III minimum regulatory thresholds; FX-protected Tier-1 instruments provide currency risk insulation."
  },
  {
    "issuer_id": "binghatti",
    "issuer_name": "Binghatti Holding",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "binghatti",
    "issuer_name": "Binghatti Holding",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "binghatti",
    "issuer_name": "Binghatti Holding",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "dar_arkan",
    "issuer_name": "Dar Al Arkan",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "dar_arkan",
    "issuer_name": "Dar Al Arkan",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "dar_arkan",
    "issuer_name": "Dar Al Arkan",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "sobha",
    "issuer_name": "Sobha Realty",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "sobha",
    "issuer_name": "Sobha Realty",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "sobha",
    "issuer_name": "Sobha Realty",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "arada",
    "issuer_name": "Arada Developments",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "arada",
    "issuer_name": "Arada Developments",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "arada",
    "issuer_name": "Arada Developments",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "damac",
    "issuer_name": "Damac Properties",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "damac",
    "issuer_name": "Damac Properties",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "damac",
    "issuer_name": "Damac Properties",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "emaar",
    "issuer_name": "Emaar Properties",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "emaar",
    "issuer_name": "Emaar Properties",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "emaar",
    "issuer_name": "Emaar Properties",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "aldar",
    "issuer_name": "Aldar Properties",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "aldar",
    "issuer_name": "Aldar Properties",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "aldar",
    "issuer_name": "Aldar Properties",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "zorlu",
    "issuer_name": "Zorlu Enerji",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "zorlu",
    "issuer_name": "Zorlu Enerji",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "zorlu",
    "issuer_name": "Zorlu Enerji",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "limak_ren",
    "issuer_name": "Limak Renewable",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "limak_ren",
    "issuer_name": "Limak Renewable",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "limak_ren",
    "issuer_name": "Limak Renewable",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "limak_cem",
    "issuer_name": "Limak Cement",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "limak_cem",
    "issuer_name": "Limak Cement",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "limak_cem",
    "issuer_name": "Limak Cement",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "limak_port",
    "issuer_name": "LimakPort İskenderun",
    "sector": "Infrastructure",
    "topic": "Concession Duration & Moat",
    "source": "Cognitive Credit / S&P Global",
    "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
  },
  {
    "issuer_id": "limak_port",
    "issuer_name": "LimakPort İskenderun",
    "sector": "Infrastructure",
    "topic": "Throughput & Capacity Utilization",
    "source": "Port Authority Filings",
    "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
  },
  {
    "issuer_id": "limak_port",
    "issuer_name": "LimakPort İskenderun",
    "sector": "Infrastructure",
    "topic": "Structural Subordination & Waterfall",
    "source": "Bond Offering Circular",
    "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
  },
  {
    "issuer_id": "aydem",
    "issuer_name": "Aydem Renewable",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "aydem",
    "issuer_name": "Aydem Renewable",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "aydem",
    "issuer_name": "Aydem Renewable",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "adm_elek",
    "issuer_name": "ADM Elektrik",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "adm_elek",
    "issuer_name": "ADM Elektrik",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "adm_elek",
    "issuer_name": "ADM Elektrik",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "gdz_elek",
    "issuer_name": "GDZ Elektrik",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "gdz_elek",
    "issuer_name": "GDZ Elektrik",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "gdz_elek",
    "issuer_name": "GDZ Elektrik",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "emlak",
    "issuer_name": "Emlak Konut",
    "sector": "Real Estate",
    "topic": "RERA Escrow Mechanics",
    "source": "Cognitive Credit / Arqaam",
    "note": "Cash includes project-specific escrow accounts governed by Dubai Law No. 8 of 2007. Funds are strictly released against engineer-certified construction milestones, preventing structural leakage for bond service."
  },
  {
    "issuer_id": "emlak",
    "issuer_name": "Emlak Konut",
    "sector": "Real Estate",
    "topic": "Presales & Revenue Backlog",
    "source": "Broker Consensus / Earnings Call",
    "note": "Off-plan presales recognized under IFRS 15 percentage-of-completion. Strong revenue backlog provides 2.5-3.0 years of forward revenue visibility."
  },
  {
    "issuer_id": "emlak",
    "issuer_name": "Emlak Konut",
    "sector": "Real Estate",
    "topic": "Land Bank Valuation",
    "source": "CBRE / JLL Independent Valuation",
    "note": "Land bank held at historical cost minus impairment; market value provides a substantial 2.5x - 4.0x asset coverage cushion above senior debt book values."
  },
  {
    "issuer_id": "erdemir",
    "issuer_name": "Erdemir",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "erdemir",
    "issuer_name": "Erdemir",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "erdemir",
    "issuer_name": "Erdemir",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "sisecam",
    "issuer_name": "Şişecam",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "sisecam",
    "issuer_name": "Şişecam",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "sisecam",
    "issuer_name": "Şişecam",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "sampa",
    "issuer_name": "Sampa Otomotiv",
    "sector": "Consumer",
    "topic": "Working Capital & Export Moat",
    "source": "Cognitive Credit / Broker Note",
    "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
  },
  {
    "issuer_id": "sampa",
    "issuer_name": "Sampa Otomotiv",
    "sector": "Consumer",
    "topic": "Geopolitical Transmission",
    "source": "Macro Risk Assessment",
    "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
  },
  {
    "issuer_id": "sampa",
    "issuer_name": "Sampa Otomotiv",
    "sector": "Consumer",
    "topic": "Deleveraging Trajectory",
    "source": "Company Guidance",
    "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
  },
  {
    "issuer_id": "ocp",
    "issuer_name": "OCP Group",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "ocp",
    "issuer_name": "OCP Group",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "ocp",
    "issuer_name": "OCP Group",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "dp_world",
    "issuer_name": "DP World",
    "sector": "Infrastructure",
    "topic": "Concession Duration & Moat",
    "source": "Cognitive Credit / S&P Global",
    "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
  },
  {
    "issuer_id": "dp_world",
    "issuer_name": "DP World",
    "sector": "Infrastructure",
    "topic": "Throughput & Capacity Utilization",
    "source": "Port Authority Filings",
    "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
  },
  {
    "issuer_id": "dp_world",
    "issuer_name": "DP World",
    "sector": "Infrastructure",
    "topic": "Structural Subordination & Waterfall",
    "source": "Bond Offering Circular",
    "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
  },
  {
    "issuer_id": "ittihad",
    "issuer_name": "Ittihad Investment",
    "sector": "Industrials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "ittihad",
    "issuer_name": "Ittihad Investment",
    "sector": "Industrials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "ittihad",
    "issuer_name": "Ittihad Investment",
    "sector": "Industrials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "sonangol",
    "issuer_name": "Sonangol EP",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "sonangol",
    "issuer_name": "Sonangol EP",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "sonangol",
    "issuer_name": "Sonangol EP",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "azule",
    "issuer_name": "Azule Energy",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "azule",
    "issuer_name": "Azule Energy",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "azule",
    "issuer_name": "Azule Energy",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "kosmos",
    "issuer_name": "Kosmos Energy",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "kosmos",
    "issuer_name": "Kosmos Energy",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "kosmos",
    "issuer_name": "Kosmos Energy",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "tullow",
    "issuer_name": "Tullow Oil",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "tullow",
    "issuer_name": "Tullow Oil",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "tullow",
    "issuer_name": "Tullow Oil",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "dangote_fert",
    "issuer_name": "Dangote Fertiliser",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "dangote_fert",
    "issuer_name": "Dangote Fertiliser",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "dangote_fert",
    "issuer_name": "Dangote Fertiliser",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "dangote_ref",
    "issuer_name": "Dangote Refinery",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "dangote_ref",
    "issuer_name": "Dangote Refinery",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "dangote_ref",
    "issuer_name": "Dangote Refinery",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "sasol",
    "issuer_name": "Sasol Ltd",
    "sector": "Energy",
    "topic": "Offshore Escrow & Debt Routing",
    "source": "Cognitive Credit / Morgan Stanley",
    "note": "Crude export proceeds flow through dedicated offshore collection accounts; debt service for Eurobonds and pre-export facilities is carved out prior to fiscal transfers."
  },
  {
    "issuer_id": "sasol",
    "issuer_name": "Sasol Ltd",
    "sector": "Energy",
    "topic": "Lifting Costs & Break-even",
    "source": "Wood Mackenzie / Company Filings",
    "note": "Low cash lifting costs ($8-$16/boe) protect operating margins even in an extended $55/bbl Brent stress scenario."
  },
  {
    "issuer_id": "sasol",
    "issuer_name": "Sasol Ltd",
    "sector": "Energy",
    "topic": "Reserve Replacement (1P/2P)",
    "source": "Independent Petroleum Engineers",
    "note": "2P commercial reserve life of 12-16 years provides durable operational runway for debt repayment."
  },
  {
    "issuer_id": "tharisa",
    "issuer_name": "Tharisa plc",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "tharisa",
    "issuer_name": "Tharisa plc",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "tharisa",
    "issuer_name": "Tharisa plc",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "ihs",
    "issuer_name": "IHS Towers",
    "sector": "Technology",
    "topic": "Tower Tenancy & Master Lease",
    "source": "Cognitive Credit / Arqaam",
    "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
  },
  {
    "issuer_id": "ihs",
    "issuer_name": "IHS Towers",
    "sector": "Technology",
    "topic": "FX Pass-Through Indexation",
    "source": "Company Filings",
    "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
  },
  {
    "issuer_id": "ihs",
    "issuer_name": "IHS Towers",
    "sector": "Technology",
    "topic": "Contracted Revenue Backlog",
    "source": "Investor Presentation",
    "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
  },
  {
    "issuer_id": "helios",
    "issuer_name": "Helios Towers",
    "sector": "Technology",
    "topic": "Tower Tenancy & Master Lease",
    "source": "Cognitive Credit / Arqaam",
    "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
  },
  {
    "issuer_id": "helios",
    "issuer_name": "Helios Towers",
    "sector": "Technology",
    "topic": "FX Pass-Through Indexation",
    "source": "Company Filings",
    "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
  },
  {
    "issuer_id": "helios",
    "issuer_name": "Helios Towers",
    "sector": "Technology",
    "topic": "Contracted Revenue Backlog",
    "source": "Investor Presentation",
    "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
  },
  {
    "issuer_id": "africell",
    "issuer_name": "Africell",
    "sector": "Technology",
    "topic": "Tower Tenancy & Master Lease",
    "source": "Cognitive Credit / Arqaam",
    "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
  },
  {
    "issuer_id": "africell",
    "issuer_name": "Africell",
    "sector": "Technology",
    "topic": "FX Pass-Through Indexation",
    "source": "Company Filings",
    "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
  },
  {
    "issuer_id": "africell",
    "issuer_name": "Africell",
    "sector": "Technology",
    "topic": "Contracted Revenue Backlog",
    "source": "Investor Presentation",
    "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
  },
  {
    "issuer_id": "liqtel",
    "issuer_name": "Liquid Telecom",
    "sector": "Technology",
    "topic": "Tower Tenancy & Master Lease",
    "source": "Cognitive Credit / Arqaam",
    "note": "Long-term master lease agreements (10-15 years) with Tier-1 MNOs featuring contracted annual CPI escalators and power pass-through."
  },
  {
    "issuer_id": "liqtel",
    "issuer_name": "Liquid Telecom",
    "sector": "Technology",
    "topic": "FX Pass-Through Indexation",
    "source": "Company Filings",
    "note": "Lease contracts pegged to USD or local currency with inflation-indexing formulas, mitigating emerging market FX depreciation."
  },
  {
    "issuer_id": "liqtel",
    "issuer_name": "Liquid Telecom",
    "sector": "Technology",
    "topic": "Contracted Revenue Backlog",
    "source": "Investor Presentation",
    "note": "Multi-billion dollar contracted backlog with minimal historical churn (<1.5%), guaranteeing predictable EBITDA generation."
  },
  {
    "issuer_id": "aragvi",
    "issuer_name": "Aragvi / Trans-Oil",
    "sector": "Consumer",
    "topic": "Working Capital & Export Moat",
    "source": "Cognitive Credit / Broker Note",
    "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
  },
  {
    "issuer_id": "aragvi",
    "issuer_name": "Aragvi / Trans-Oil",
    "sector": "Consumer",
    "topic": "Geopolitical Transmission",
    "source": "Macro Risk Assessment",
    "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
  },
  {
    "issuer_id": "aragvi",
    "issuer_name": "Aragvi / Trans-Oil",
    "sector": "Consumer",
    "topic": "Deleveraging Trajectory",
    "source": "Company Guidance",
    "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
  },
  {
    "issuer_id": "mhp",
    "issuer_name": "MHP SE",
    "sector": "Consumer",
    "topic": "Working Capital & Export Moat",
    "source": "Cognitive Credit / Broker Note",
    "note": "Vertical integration and proprietary supply chain protect gross margins; grain/poultry export revenues in USD/EUR outpace local inflation."
  },
  {
    "issuer_id": "mhp",
    "issuer_name": "MHP SE",
    "sector": "Consumer",
    "topic": "Geopolitical Transmission",
    "source": "Macro Risk Assessment",
    "note": "Dedicated logistics corridors and diversified processing hubs mitigate regional supply disruption risks."
  },
  {
    "issuer_id": "mhp",
    "issuer_name": "MHP SE",
    "sector": "Consumer",
    "topic": "Deleveraging Trajectory",
    "source": "Company Guidance",
    "note": "Discretionary growth capex trimmed to prioritize free cash flow conversion and senior debt deleveraging."
  },
  {
    "issuer_id": "metinvest",
    "issuer_name": "Metinvest",
    "sector": "Materials",
    "topic": "Global Cost Curve Position",
    "source": "Cognitive Credit / Industry Benchmark",
    "note": "Producer occupies the first quartile (Q1) of the global cash cost curve, securing cash generation across cyclical commodity troughs."
  },
  {
    "issuer_id": "metinvest",
    "issuer_name": "Metinvest",
    "sector": "Materials",
    "topic": "Export Hard-Currency Revenue",
    "source": "Financial Statements",
    "note": ">70% of revenues billed in USD/EUR, providing natural hard currency hedge against local currency operating expenses."
  },
  {
    "issuer_id": "metinvest",
    "issuer_name": "Metinvest",
    "sector": "Materials",
    "topic": "Sovereign Strategic Asset",
    "source": "Credit Rating Agency Memo",
    "note": "Vital foreign exchange earner and national champion; implied sovereign support and infrastructure integration provide strong recovery floor."
  },
  {
    "issuer_id": "dtek",
    "issuer_name": "DTEK Energy",
    "sector": "Utilities",
    "topic": "Feed-in Tariff (YEKDEM/PPA)",
    "source": "Cognitive Credit / Citi",
    "note": "Electricity sales benefit from long-term USD/EUR guaranteed feed-in tariffs, providing predictable cash flow and hard currency debt service coverage."
  },
  {
    "issuer_id": "dtek",
    "issuer_name": "DTEK Energy",
    "sector": "Utilities",
    "topic": "Capex Phasing & Grid Connection",
    "source": "Company Filings",
    "note": "Capital expenditures peak in 2024-2025 as new solar and wind capacity comes online; FCF inflects materially positive in 2026-2027."
  },
  {
    "issuer_id": "dtek",
    "issuer_name": "DTEK Energy",
    "sector": "Utilities",
    "topic": "Regulatory Asset Base (RAB)",
    "source": "EMRA Regulatory Tariff Determination",
    "note": "Regulated asset base inflation-adjusted with guaranteed real return on invested capital ensuring defensive margin floors."
  },
  {
    "issuer_id": "ukr_rail",
    "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
    "sector": "Infrastructure",
    "topic": "Concession Duration & Moat",
    "source": "Cognitive Credit / S&P Global",
    "note": "Long-dated port/terminal concession agreements (>30 years remaining) with natural monopoly gateway positions and tariff-setting autonomy."
  },
  {
    "issuer_id": "ukr_rail",
    "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
    "sector": "Infrastructure",
    "topic": "Throughput & Capacity Utilization",
    "source": "Port Authority Filings",
    "note": "Container throughput backed by diversified trade corridors; high volume stability even during regional macro contractions."
  },
  {
    "issuer_id": "ukr_rail",
    "issuer_name": "Ukraine Rail (Ukrzaliznytsia)",
    "sector": "Infrastructure",
    "topic": "Structural Subordination & Waterfall",
    "source": "Bond Offering Circular",
    "note": "Operating port assets generate ring-fenced cash flow; holding company debt is supported by diversified dividend upstreaming."
  }
];
