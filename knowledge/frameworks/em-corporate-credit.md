# EM corporate and quasi-sovereign credit framework

The house method for CEMBI-type credits, consistent with the issuer document schema in `docs/ARCHITECTURE.md` and the models in `models/`.

## 1. Sovereign ceiling and transfer risk

Start with the sovereign. A corporate rarely trades inside its sovereign for long; when it does, the reason must be exportable hard-currency revenue, offshore cash, or ownership by a stronger parent. Transfer and convertibility risk (Argentina, Nigeria, Egypt, Turkey at times) can stop a solvent company paying. Check where cash sits and whether it can leave.

## 2. Business and jurisdiction

Sector economics, market position, regulation (tariffs, licences, export quotas), state involvement, sanctions exposure, physical security. Country risk is not one number: a Kurdistan gas producer and a Dubai property developer carry different kinds.

## 3. Financial analysis: the house identity

- Cash EBITDA reconciliation from reported EBITDA (strip non-cash items, IFRS 16, associates).
- FCF = EBITDA − Capex − Cash interest − ΔNWC − Tax. Never accept a company's "FCF" definition without reconciling it to this.
- Leverage on net debt including leases, guarantees, supplier finance and factoring; interest cover on cash interest including PIK.
- Liquidity: cash by jurisdiction and currency, undrawn committed lines (and their covenants), maturities over 24 months, and the refinancing route for each.
- Audit the sell-side and management: add-backs, working-capital releases, capitalised costs, related-party flows. The "analyst error trap" list in `scripts/ingest_notion_research.py` is the house checklist.

## 4. Capital structure and documentation

Tranche-by-tranche: ranking, security, guarantors, covenants (incurrence tests, restricted payments, change of control), maturity, currency, call schedule. Local bank debt often ranks ahead in practice through security and relationship. Map the structure before pricing recovery.

## 5. Ownership and governance

Who controls, how they treat creditors (dividend history under stress, related-party dealings), succession, state links. Governance is a leading indicator in EM corporates more than in DM.

## 6. Quasi-sovereigns

Treat as sovereign-plus-standalone: ownership share, policy role, explicit versus implicit support, history of support (and of abandonment), consolidation in the sovereign's debt statistics. Price the standalone and the support separately.

## 7. Relative value

Spread versus sovereign, versus sector and rating peers in the CEMBI, versus the issuer's own history; yield-to-worst versus yield-to-maturity when callable; bond price versus recovery. The screener (`index.html`) and comp sheet are the house tools; levels from Reza via [BBG].

## 8. Output standard

A corporate note states: the sovereign and transfer context, the cash EBITDA and FCF reconciliation with sources, leverage and liquidity with maturities, the capital structure map, the two or three things that would change the view, management questions, and a view with confidence. Data from Cognitive Credit when covered, from filings otherwise.
