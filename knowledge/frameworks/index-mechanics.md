# Index mechanics: EMBI, GBI-EM, CEMBI

What the benchmarks include, how weights are set, and why that matters for flows and relative value. Rules change; verify against the latest JP Morgan index methodology before relying on a threshold.

## EMBI Global Diversified (hard-currency sovereign and quasi-sovereign)

- Instruments: USD-denominated bonds issued by sovereign and quasi-sovereign entities of EM countries, with minimum size, maturity and liquidity rules. The Global series uses a broader country definition (income and index-income classification) than the original EMBI+.
- Diversified weighting caps the weight of the largest issuers by reducing weights for countries with larger debt stocks, which is why small frontier issuers are over-represented relative to their debt and why their bonds carry real index-driven demand.
- Sub-indices by rating (IG, HY), region and country. Most EM sovereign funds benchmark here; passive and index-aware flows follow rebalances at month-end.
- Default and restructuring: bonds in default stay in the index at market price until exchanged; new bonds enter when they meet the rules. This keeps distressed names relevant to index flows.

## GBI-EM Global Diversified (local-currency sovereign)

- Local-currency government bonds from countries that are accessible to foreign investors (replicability is the gate: convertibility, settlement, taxes). The 17-country universe the desk tracks is the current constituent set; India's phased inclusion changed weights across the board.
- Country weights capped at 10 percent, which redistributes weight to smaller markets. A country near the cap behaves differently in flows from one far below it.
- Inclusion and exclusion events (Russia's removal, India's inclusion, Egypt's and Nigeria's accessibility status) are the largest single flow events in local markets; watch the index announcements and the FX-convertibility conditions behind them.

## CEMBI Broad Diversified (hard-currency corporate)

- USD corporate bonds from EM-domiciled issuers, broad liquidity rules, diversified country caps. Quasi-sovereigns with majority state ownership generally sit in EMBI, not CEMBI; check the issuer's classification.
- Sector and country composition drives relative value; the house screener aligns to it.

## Using index facts in analysis

- Record each sovereign's EMBI GD weight and whether its local bonds are in GBI-EM on its knowledge page; both are flow facts.
- Index-driven demand is strongest for small diversified-cap beneficiaries and weakest for off-index names (sukuk-only issuers, non-USD bonds, sub-benchmark sizes).
- Month-end rebalances, new issues entering, and exclusions are catalysts with known dates; list them in `themes/calendar.md`.
