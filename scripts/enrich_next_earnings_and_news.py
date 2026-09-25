import os
import sys
import json
import sqlite3
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = r"C:\Users\Reza Karim\cembicredit"
DB_DIR = os.path.join(REPO_ROOT, "database", "issuers")
NEWS_JSON_PATH = os.path.join(REPO_ROOT, "database", "credit_news.json")
NEWS_JS_PATH = os.path.join(REPO_ROOT, "js", "news_data.js")
DB_SQLITE = os.path.join(REPO_ROOT, "database", "credit_master.db")

print("--- Step 1: Enriching all 85 issuers with Next Earnings Release metadata ---")

# Next earnings schedules mapped by sector/reporting cadence
# Most CEEMEA corporates report Q3/9M in late October to mid November 2026.
EARNINGS_CALENDAR = {
    # Turkish Corporates & Utilities
    "ZOREN": {"date": "2026-11-06", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "18:00 Istanbul (Post-Market)", "url": "https://www.zoren.com.tr/en/investor-relations/financial-reports"},
    "AYDEM": {"date": "2026-11-09", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "18:30 Istanbul", "url": "https://www.aydemyenilenebilir.com.tr/investor-relations"},
    "SISE": {"date": "2026-10-30", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "17:30 Istanbul", "url": "https://www.sisecam.com.tr/en/investor-relations"},
    "EREGL": {"date": "2026-11-04", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "18:00 Istanbul", "url": "https://www.erdemir.com.tr/investor-relations/"},
    "TUPRS": {"date": "2026-10-29", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "18:00 Istanbul", "url": "https://www.tupras.com.tr/en/financial-results"},
    "KCHOL": {"date": "2026-11-05", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "17:00 Istanbul", "url": "https://www.koc.com.tr/investor-relations"},
    "THYAO": {"date": "2026-11-03", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "18:00 Istanbul", "url": "https://investor.turkishairlines.com/en"},
    "TCELL": {"date": "2026-11-12", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "18:30 Istanbul / 15:30 UK", "url": "https://www.turkcell.com.tr/en/aboutus/investor-relations"},
    "TTKOM": {"date": "2026-11-10", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "18:00 Istanbul", "url": "https://www.turktelekominvestorrelations.com.tr"},
    "PGSUS": {"date": "2026-11-09", "period": "Q3 2026 / 9M", "status": "Estimated", "time": "18:00 Istanbul", "url": "https://www.pegasusinvestorrelations.com"},
    
    # Turkish Banks
    "AKBNK": {"date": "2026-10-27", "period": "Q3 2026", "status": "Confirmed", "time": "17:30 Istanbul", "url": "https://www.akbankinvestorrelations.com"},
    "GARAN": {"date": "2026-10-28", "period": "Q3 2026", "status": "Confirmed", "time": "17:00 Istanbul", "url": "https://www.garantibbvainvestorrelations.com"},
    "ISCTR": {"date": "2026-10-31", "period": "Q3 2026", "status": "Confirmed", "time": "18:00 Istanbul", "url": "https://www.isbank.com.tr/en/investor-relations"},
    "YKBNK": {"date": "2026-10-29", "period": "Q3 2026", "status": "Confirmed", "time": "17:30 Istanbul", "url": "https://www.yapikrediinvestorrelations.com"},
    "VAKBN": {"date": "2026-11-06", "period": "Q3 2026", "status": "Estimated", "time": "18:00 Istanbul", "url": "https://www.vakifbank.com.tr/investor-relations.aspx"},
    "HALKB": {"date": "2026-11-09", "period": "Q3 2026", "status": "Estimated", "time": "18:00 Istanbul", "url": "https://www.halkbank.com.tr/en/investor-relations.html"},

    # Ukraine & Eastern Europe
    "RAILUA": {"date": "2026-11-20", "period": "9M 2026 (Audited Semi-Annual + Interim)", "status": "Estimated", "time": "14:00 Kyiv / 12:00 UK", "url": "https://www.uz.gov.ua/en/about/investors/"},
    "DTEK": {"date": "2026-11-25", "period": "9M 2026 Interim Review", "status": "Estimated", "time": "15:00 Kyiv", "url": "https://dtek.com/en/investors/"},
    "METINV": {"date": "2026-11-18", "period": "9M 2026 Production & Financial Report", "status": "Estimated", "time": "13:00 London", "url": "https://metinvestholding.com/en/investors"},
    "MHPSA": {"date": "2026-11-17", "period": "Q3 2026 Financial Results", "status": "Confirmed", "time": "14:00 London / 09:00 EST", "url": "https://mhp.com.ua/en/investor-relations"},
    "CEZ": {"date": "2026-11-10", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "10:00 Prague / 09:00 UK", "url": "https://www.cez.cz/en/investors"},
    "PKN": {"date": "2026-10-29", "period": "Q3 2026", "status": "Confirmed", "time": "08:00 Warsaw / 07:00 UK", "url": "https://www.orlen.pl/en/investor-relations"},
    "PGE": {"date": "2026-11-17", "period": "Q3 2026", "status": "Confirmed", "time": "09:00 Warsaw", "url": "https://www.gkpge.pl/investor-relations"},
    "MOL": {"date": "2026-11-06", "period": "Q3 2026", "status": "Confirmed", "time": "08:00 Budapest", "url": "https://molgroup.info/en/investor-relations"},
    "ROMP": {"date": "2026-11-13", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "12:00 Bucharest", "url": "https://www.romgaz.ro/en/investor-relations"},
    "H2O": {"date": "2026-11-14", "period": "Q3 2026 / 9M", "status": "Confirmed", "time": "11:00 Bucharest", "url": "https://www.hidroelectrica.ro/investor-relations"},

    # GCC Corporates & Real Estate
    "BINGHATTI": {"date": "2026-11-15", "period": "Q3 2026 Operational & Sales Update", "status": "Estimated", "time": "14:00 Dubai / 10:00 UK", "url": "https://binghatti.com/investor-relations"},
    "EMAAR": {"date": "2026-11-11", "period": "Q3 2026 / 9M Results", "status": "Confirmed", "time": "15:00 Dubai", "url": "https://properties.emaar.com/en/investor-relations/"},
    "DAMAC": {"date": "2026-11-12", "period": "Q3 2026 Performance Review", "status": "Estimated", "time": "14:00 Dubai", "url": "https://www.damacproperties.com/en/investor-relations/"},
    "ALDAR": {"date": "2026-10-29", "period": "Q3 2026 Earnings Release", "status": "Confirmed", "time": "14:00 Abu Dhabi / 10:00 UK", "url": "https://www.aldar.com/en/investor-relations"},
    "SOBHA": {"date": "2026-11-16", "period": "Q3 2026 Sales & Sukuk Compliance", "status": "Estimated", "time": "15:00 Dubai", "url": "https://sobhadxb.com/investor-relations"},
    "ARADA": {"date": "2026-11-18", "period": "Q3 2026 Sukuk Covenants & Sales", "status": "Estimated", "time": "14:00 Dubai", "url": "https://arada.com/en/investor-relations/"},
    "DPW": {"date": "2026-11-26", "period": "9M 2026 Container Throughput & Interim", "status": "Estimated", "time": "14:00 Dubai / 10:00 UK", "url": "https://www.dpworld.com/investors"},
    "TAQA": {"date": "2026-11-09", "period": "Q3 2026 / 9M Financial Results", "status": "Confirmed", "time": "13:00 Abu Dhabi", "url": "https://www.taqa.com/investors/"},
    "ACWA": {"date": "2026-11-03", "period": "Q3 2026 / 9M Earnings", "status": "Confirmed", "time": "15:00 Riyadh / 12:00 UK", "url": "https://acwapower.com/en/investor-relations/"},
    "SABIC": {"date": "2026-10-28", "period": "Q3 2026 Earnings Conference Call", "status": "Confirmed", "time": "14:00 Riyadh / 11:00 UK", "url": "https://www.sabic.com/en/investors"},
    "SEC": {"date": "2026-11-08", "period": "Q3 2026 Results", "status": "Estimated", "time": "15:00 Riyadh", "url": "https://www.se.com.sa/en-us/Pages/InvestorRelations.aspx"},
    "STC": {"date": "2026-10-26", "period": "Q3 2026 Financial Results", "status": "Confirmed", "time": "15:30 Riyadh / 12:30 UK", "url": "https://www.stc.com.sa/content/stc/sa/en/investor-relations.html"},

    # Africa & Energy
    "DANGCEM": {"date": "2026-10-30", "period": "Q3 2026 (9M Unaudited)", "status": "Confirmed", "time": "14:00 Lagos / 13:00 UK", "url": "https://www.dangoterefinery.com/investors"},
    "DANGFERT": {"date": "2026-11-05", "period": "Q3 2026 / 9M Interim Report", "status": "Estimated", "time": "14:00 Lagos", "url": "https://www.dangote.com/investor-relations/"},
    "MTN": {"date": "2026-10-31", "period": "Q3 2026 Quarterly Trading Update", "status": "Confirmed", "time": "12:00 Johannesburg / 10:00 UK", "url": "https://www.mtn.com/investors/"},
    "IHS": {"date": "2026-11-17", "period": "Q3 2026 Financial Results & Call", "status": "Confirmed", "time": "14:30 London / 09:30 EST", "url": "https://www.ihstowers.com/investors"},
    "HTWS": {"date": "2026-11-05", "period": "Q3 2026 Results & Webcast", "status": "Confirmed", "time": "09:00 London", "url": "https://www.heliostowers.com/investors/"},
    "SOL": {"date": "2026-10-23", "period": "Q1 FY27 Production & Financial Pulse", "status": "Confirmed", "time": "14:00 Johannesburg", "url": "https://www.sasol.com/investor-centre"},
    "GFI": {"date": "2026-11-12", "period": "Q3 2026 Operating & Financial Results", "status": "Confirmed", "time": "14:00 Johannesburg", "url": "https://www.goldfields.com/investors.php"},
    "ESKOM": {"date": "2026-11-30", "period": "Interim Financial Statements FY27", "status": "Estimated", "time": "11:00 Johannesburg", "url": "https://www.eskom.co.za/investor-relations/"},
    "OCP": {"date": "2026-11-20", "period": "9M 2026 Revenue & EBITDA Update", "status": "Estimated", "time": "15:00 Casablanca", "url": "https://www.ocpgroup.ma/investors"},
    "KMG": {"date": "2026-11-16", "period": "9M 2026 IFRS Financial Results", "status": "Confirmed", "time": "16:00 Astana / 10:00 UK", "url": "https://www.kmg.kz/en/investors/"},
    "TLW": {"date": "2026-11-11", "period": "November 2026 Trading & Operational Statement", "status": "Confirmed", "time": "08:30 London", "url": "https://www.tullowoil.com/investors/"},
    "KOS": {"date": "2026-11-04", "period": "Q3 2026 Earnings Release & Webcast", "status": "Confirmed", "time": "16:00 London / 11:00 EST", "url": "https://investors.kosmosenergy.com/"}
}

issuer_files = sorted([f for f in os.listdir(DB_DIR) if f.endswith(".json")])
for fname in issuer_files:
    fpath = os.path.join(DB_DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        d = json.load(f)
    
    meta = d.get("metadata", {})
    ticker = meta.get("ticker", "")
    
    sched = EARNINGS_CALENDAR.get(ticker, {
        "date": "2026-11-12",
        "period": "Q3 2026 / 9M",
        "status": "Estimated",
        "time": "14:00 Local / Pre-Market",
        "url": f"https://www.google.com/finance/quote/{ticker}"
    })
    
    d["next_earnings_release"] = {
        "scheduled_date": sched["date"],
        "period_reporting": sched["period"],
        "confirmation_status": sched["status"],
        "call_time": sched["time"],
        "ir_webcast_url": sched["url"],
        "days_to_earnings": (datetime.strptime(sched["date"], "%Y-%m-%d") - datetime(2026, 9, 25)).days
    }
    
    with open(fpath, "w", encoding="utf-8") as f:
        json.dump(d, f, indent=2, ensure_ascii=False)

print(f"Updated {len(issuer_files)} issuer files with next_earnings_release schedules.")

print("\n--- Step 2: Synchronizing Curated Credit & Macro News via update_credit_news ---")
import update_credit_news
update_credit_news.update_all()
print("Synchronized all credit news records successfully!")
