# Local-currency rates and FX framework

Method for GBI-EM style local-currency sovereign debt and the FX that carries it. Complements `sovereign-credit.md`; the credit question still applies, but the dominant risks are currency, inflation and the central bank's reaction function, not default.

## 1. Decomposing a local bond's return

Total return in USD = carry (yield) + duration return (yield change) + FX return (spot change) + roll-down. Separate the decision into three calls: rates (receive or pay), FX (hedged or unhedged), and credit (is the sovereign going to restructure local debt or impose controls). Most losses in local markets come from FX, most alpha from rates.

## 2. Ex-ante real policy rate

Policy rate minus 12-month-ahead expected inflation (survey or breakeven), not minus current inflation. This is the house arithmetic. Rank countries by it; the top of the ranking is where carry is best protected, provided the central bank is not about to cut it away.
- Positive and rising: supportive for currency and front-end receivers once the cycle turns.
- Negative: the currency is being defended by something other than rates (reserves, controls, luck). Treat carry as unpaid risk.

## 3. Central bank reaction function

What the bank actually responds to: inflation versus target, FX moves, fiscal pressure, political pressure. Evidence is in the minutes and in behaviour at the last three stress episodes. Classify: orthodox (targets inflation, lets FX float), FX-anchored (defends a level or band), fiscally dominated (rate set by debt service needs). The classification decides whether a sell-off is a buying opportunity or a regime change.

## 4. FX: fair value and flows

- Terms of trade and REER: the two-dimensional matrix the desk uses. ToT improving with REER undervalued is the best quadrant; ToT deteriorating with REER overvalued is the worst. 10-year REER z-score is the valuation axis.
- Balance of payments flows: current account plus FDI (basic balance) versus portfolio. A currency financed by portfolio inflows reverses fastest.
- Reserve adequacy and intervention: who is selling dollars, how much, and at what level. Net forward book again.
- Carry versus implied depreciation: compare the forward-implied yield with the actual local yield and with the expected depreciation from the fair-value model. Carry only pays when the implied depreciation overstates the likely move.
- Capital controls and convertibility: onshore versus offshore (NDF) basis, repatriation rules, withholding tax on non-residents, settlement (Euroclearable or not). These determine what an unhedged position is worth in a crisis.

## 5. Curve

- Slope relative to the policy cycle. Steepeners into the end of hiking cycles; flatteners when the central bank is behind the curve.
- Supply: auction calendar, domestic bank demand (regulatory holdings), central bank buying, non-resident share and its trend. Non-resident share above about 30 percent with a falling trend is the classic set-up for a disorderly sell-off.
- Inflation-linked bonds where they exist: breakevens as the market's inflation forecast and as a hedge.

## 6. Execution desk conventions

- Express rates views in swaps where the swap market is liquid (ZAR, MXN, PLN, CZK, HUF, BRL DI, CLP, COP, ILS, INR via NDOIS), in bonds where it is not (EGP, NGN, KES, GHS, UAH, local Africa).
- Size by DV01 (house standard 10,000 USD DV01), state the benchmark instrument, liquidity tier, bid-ask and standard clip.
- Stops and invalidation levels are part of the trade, written at entry.

## 7. Local-debt restructuring risk

Domestic debt has been restructured (Ghana 2023, Sri Lanka 2023, Zambia local treatment, Argentina repeatedly). Signals: interest to revenue above 30 percent with a domestic-heavy debt stock, banks saturated with government paper, central bank financing, and an IMF DSA that cannot close on external relief alone. When these line up, the local curve is a credit instrument.

## 8. Output standard

A local-market view states: the ex-ante real rate and its direction, the reaction-function classification, the ToT/REER quadrant, the basic balance, the non-resident share trend, the trade expression with DV01 size and invalidation, and whether the FX leg is hedged. Levels come from Reza via [BBG].
