/* site-header.js — one header for every page: sections with dropdowns, breadcrumb, back button, global search.
   Loaded with `defer` after css/site-header.css. Hides the legacy per-page nav link rows. */
(function () {
  const SECTIONS = [
    { id: "corporates", label: "Corporates", pages: [
      { href: "index.html", label: "Screener & comp sheet", hint: "85 CEEMEA corporates and banks" },
      { href: "company.html", label: "Company dossiers", hint: "Financials, debt, covenants, models" },
      { href: "comps.html", label: "Peer comparison", hint: "Peer groups, metrics, charts" },
      { href: "trends.html", label: "Trends", hint: "Spread and leverage history" },
      { href: "notes.html", label: "Footnotes", hint: "Annotations and watchlists" },
      { href: "models/CEMBI_Master_Comp_Sheet.xlsx", label: "Comp sheet (xlsx)", hint: "Download", external: true },
    ]},
    { id: "sovereigns", label: "Sovereigns", pages: [
      { href: "sovereigns.html", label: "Dashboard", hint: "Comparable macro and credit data" },
      { href: "reports.html", label: "Sovereign reports", hint: "One truth document per country", match: "sovereign-credit" },
      { href: "knowledge.html", label: "Country pages", hint: "Dated facts, sources, catalysts", match: "knowledge/sovereigns" },
      { href: "local_em.html", label: "Local EM desk", hint: "GBI-EM rates and FX" },
      { href: "gbi_country.html", label: "GBI-EM country deep-dives", hint: "17 local-market sovereigns" },
      { href: "models/sovereigns/Sovereign_Comp_Sheet.xlsx", label: "Sovereign comp sheet (xlsx)", hint: "Download", external: true },
    ]},
    { id: "macro", label: "Macro desks", pages: [
      { href: "local_em.html", label: "GBI-EM desk", hint: "Real rates, ToT/REER, execution" },
      { href: "cdx.html", label: "CDX desk", hint: "CDX HY, Xover, CDX EM" },
      { href: "ust.html", label: "US Treasuries", hint: "Curve regime and duration" },
    ]},
    { id: "restructuring", label: "Restructuring", pages: [
      { href: "restructuring.html", label: "Hub", hint: "Special situations overview" },
      { href: "braskem_calculator.html", label: "Braskem", hint: "SOTP and reorg engine" },
      { href: "zoren_calculator.html", label: "Zorlu Enerji", hint: "Creditor recovery waterfall" },
      { href: "aragvi_calculator.html", label: "Aragvi / Trans-Oil", hint: "Agro SOTP valuation" },
    ]},
    { id: "research", label: "Research", pages: [
      { href: "reports.html", label: "Reports", hint: "All pipeline reports and open items" },
      { href: "knowledge.html", label: "Knowledge base", hint: "Frameworks, themes, sources" },
      { href: "knowledge.html#knowledge/themes/calendar.md", label: "Catalyst calendar", hint: "Dated events from the runs" },
    ]},
  ];
  const PAGE_META = {
    "index.html": ["corporates", "Screener & comp sheet"], "company.html": ["corporates", "Company dossiers"], "comps.html": ["corporates", "Peer comparison"], "trends.html": ["corporates", "Trends"],
    "notes.html": ["corporates", "Footnotes"], "sovereigns.html": ["sovereigns", "Dashboard"], "local_em.html": ["macro", "GBI-EM desk"],
    "gbi_em.html": ["macro", "GBI-EM desk"], "gbi_country.html": ["sovereigns", "GBI-EM country deep-dive"], "cdx.html": ["macro", "CDX desk"],
    "credit.html": ["macro", "CDX desk"], "ust.html": ["macro", "US Treasuries"], "restructuring.html": ["restructuring", "Hub"],
    "braskem_calculator.html": ["restructuring", "Braskem"], "braskem_background.html": ["restructuring", "Braskem background"],
    "zoren_calculator.html": ["restructuring", "Zorlu Enerji"], "zoren_background.html": ["restructuring", "Zorlu background"], "zoren_qa.html": ["restructuring", "Zorlu Q&A"],
    "aragvi_calculator.html": ["restructuring", "Aragvi / Trans-Oil"], "aragvi_background.html": ["restructuring", "Aragvi background"],
    "reports.html": ["research", "Reports"], "knowledge.html": ["research", "Knowledge base"],
  };

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const meta = PAGE_META[page] || ["research", document.title.split("|")[0].trim()];
  let sectionId = meta[0];
  if (page === "reports.html" && location.hash.includes("sovereign-credit")) sectionId = "sovereigns";
  if (page === "knowledge.html" && location.hash.includes("knowledge/sovereigns")) sectionId = "sovereigns";

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function crumbDetail() {
    const h = decodeURIComponent(location.hash.slice(1));
    const q = new URLSearchParams(location.search);
    if (page === "company.html" && q.get("id")) return q.get("id").toUpperCase();
    if (page === "gbi_country.html" && (q.get("id") || q.get("country"))) return (q.get("id") || q.get("country")).toUpperCase();
    if (page === "reports.html" && h) return h.replace(/-/g, " ");
    if (page === "knowledge.html" && h) return h.split("/").pop().replace(/\.md$/, "").replace(/-/g, " ");
    if (page === "sovereigns.html" && h) return h.replace(/-/g, " ");
    return "";
  }

  function searchIndex() {
    const items = [];
    SECTIONS.forEach(s => s.pages.forEach(p => items.push({ label: p.label, group: s.label, href: p.href })));
    (window.MASTER_ISSUERS || []).forEach(i => { const m = i.metadata || {}; if (m.name) items.push({ label: `${m.name} (${m.ticker || m.id})`, group: "Issuer", href: `company.html?id=${m.id}` }); });
    (window.SOVEREIGNS || []).forEach(s => items.push({ label: `${s.country} sovereign`, group: "Sovereign", href: `sovereigns.html#${s.slug}` }));
    return items;
  }

  function build() {
    const bar = el("div", "sh-bar");
    const brand = el("a", "sh-brand", "CEMBI Credit"); brand.href = "index.html";
    bar.appendChild(brand);
    const nav = el("nav", "sh-sections"); nav.setAttribute("aria-label", "Site sections");
    SECTIONS.forEach(s => {
      const wrap = el("div", "sh-section" + (s.id === sectionId ? " active" : ""));
      const btn = el("button", "sh-section-btn", s.label); btn.type = "button"; btn.setAttribute("aria-haspopup", "true");
      const menu = el("div", "sh-menu");
      s.pages.forEach(p => {
        const a = el("a", "sh-menu-item"); a.href = p.href; if (p.external) a.setAttribute("download", "");
        a.appendChild(el("span", "sh-menu-label", p.label)); a.appendChild(el("span", "sh-menu-hint", p.hint));
        if (p.href.split("#")[0] === page && (!p.match || location.hash.includes(p.match) || location.pathname.includes(p.match))) a.classList.add("current");
        menu.appendChild(a);
      });
      btn.onclick = (e) => { e.stopPropagation(); const open = wrap.classList.contains("open"); document.querySelectorAll(".sh-section.open").forEach(x => x.classList.remove("open")); if (!open) wrap.classList.add("open"); };
      wrap.appendChild(btn); wrap.appendChild(menu); nav.appendChild(wrap);
    });
    bar.appendChild(nav);
    const right = el("div", "sh-right");
    const search = el("div", "sh-search");
    const input = el("input"); input.type = "search"; input.placeholder = "Search issuer, sovereign or page…"; input.setAttribute("aria-label", "Search");
    const results = el("div", "sh-results");
    let idx = null;
    input.addEventListener("input", () => {
      idx = idx || searchIndex();
      const q = input.value.trim().toLowerCase(); results.innerHTML = "";
      if (!q) { results.classList.remove("open"); return; }
      idx.filter(i => i.label.toLowerCase().includes(q)).slice(0, 12).forEach(i => {
        const a = el("a", "sh-result"); a.href = i.href; a.appendChild(el("span", "sh-result-group", i.group)); a.appendChild(el("span", null, i.label)); results.appendChild(a);
      });
      results.classList.toggle("open", results.children.length > 0);
    });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { const first = results.querySelector("a"); if (first) location.href = first.href; } if (e.key === "Escape") { results.classList.remove("open"); input.blur(); } });
    search.appendChild(input); search.appendChild(results); right.appendChild(search);
    bar.appendChild(right);

    const crumbs = el("div", "sh-crumbs");
    const back = el("button", "sh-back", "← Back"); back.type = "button"; back.onclick = () => history.back();
    if (history.length <= 1) back.classList.add("disabled");
    crumbs.appendChild(back);
    const trail = el("div", "sh-trail");
    const sec = SECTIONS.find(s => s.id === sectionId);
    const a1 = el("a", null, sec ? sec.label : "Home"); a1.href = sec ? sec.pages[0].href : "index.html"; trail.appendChild(a1);
    trail.appendChild(el("span", "sh-sep", "›"));
    const a2 = el("a", null, meta[1]); a2.href = location.pathname.split("/").pop() || "index.html"; trail.appendChild(a2);
    const d = crumbDetail();
    if (d) { trail.appendChild(el("span", "sh-sep", "›")); trail.appendChild(el("span", "sh-current", d)); }
    crumbs.appendChild(trail);
    const upd = document.querySelector("meta[name='site-updated']");
    if (upd) crumbs.appendChild(el("span", "sh-updated", "updated " + upd.content));

    const host = el("div", "site-header"); host.id = "site-header"; host.appendChild(bar); host.appendChild(crumbs);
    document.body.insertBefore(host, document.body.firstChild);
    document.body.classList.add("has-site-header");
    document.addEventListener("click", () => { document.querySelectorAll(".sh-section.open").forEach(x => x.classList.remove("open")); results.classList.remove("open"); });
    window.addEventListener("hashchange", () => { const t = crumbDetail(); const cur = trail.querySelector(".sh-current"); if (cur) cur.textContent = t; else if (t) { trail.appendChild(el("span", "sh-sep", "›")); trail.appendChild(el("span", "sh-current", t)); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
