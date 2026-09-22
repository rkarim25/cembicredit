/**
 * site-nav.js - Unified navigation sidebar for CEMBI Credit Master Platform & EM Macro Desks.
 * Seamlessly connects Corporate Credit, EM Sovereign/Rates Desks, and Restructuring Calculators.
 */
(function () {
  const NAV_GROUPS = [
    { id: "corporate", label: "Corporate Credit & Issuers" },
    { id: "macro", label: "EM Macro & Sovereign Desks" },
    { id: "restructuring", label: "Restructuring Engines" },
    { id: "external", label: "External Desks" },
  ];

  const NAV_ITEMS = [
    { id: "index", asset: "Comp Sheet & Screener", strategy: "85 CEEMEA Corporates & Banks", group: "corporate", href: "index.html" },
    { id: "company", asset: "Company Models", strategy: "Detailed DCF & Cash Flow Dossiers", group: "corporate", href: "company.html" },
    { id: "trends", asset: "Zero-AI Trends", strategy: "Fundamental & Spread Multi-Period", group: "corporate", href: "trends.html" },
    { id: "notes", asset: "Intelligence Footnotes", strategy: "Desk Annotations & Watchlists", group: "corporate", href: "notes.html" },

    { id: "local_em", asset: "Local EM Desk", strategy: "GBI-EM Sovereign Debt & FX", group: "macro", href: "local_em.html" },
    { id: "cdx", asset: "CDX Desk", strategy: "EM CDX, Xover & US HY Spreads", group: "macro", href: "cdx.html" },
    { id: "ust", asset: "US Treasuries", strategy: "Yield Curve & Dual-Band Model", group: "macro", href: "ust.html" },

    { id: "braskem", asset: "Braskem (BRASKM)", strategy: "SOTP & Reorg Haircut Engine", group: "restructuring", href: "braskem_calculator.html" },
    { id: "zoren", asset: "Zorlu Enerji (ZOREN)", strategy: "Creditor Recovery Waterfall", group: "restructuring", href: "zoren_calculator.html" },
    { id: "aragvi", asset: "Aragvi (TRANSG)", strategy: "Sunflower & Agro SOTP Valuation", group: "restructuring", href: "aragvi_calculator.html" },

    { id: "strategy", asset: "Strategy Engine ↗", strategy: "Systematic Equities & ETPs", group: "external", href: "https://rkarim25.github.io/Strategy/", secondary: true },
  ];

  for (const item of NAV_ITEMS) {
    item.label = `${item.asset} — ${item.strategy}`;
  }

  function currentPageFile(loc = location) {
    const base = (loc.pathname.split("/").pop() || "index.html").toLowerCase();
    return base || "index.html";
  }

  function activeNavId(loc = location) {
    const page = currentPageFile(loc);
    if (page === "local_em.html" || page === "gbi_em.html" || page === "gbi_country.html") return "local_em";
    if (page === "cdx.html" || page === "credit.html") return "cdx";
    if (page === "ust.html") return "ust";
    if (page === "braskem_calculator.html" || page === "braskem_background.html") return "braskem";
    if (page === "zoren_calculator.html" || page === "zoren_background.html") return "zoren";
    if (page === "aragvi_calculator.html" || page === "aragvi_background.html") return "aragvi";
    if (page === "company.html") return "company";
    if (page === "trends.html") return "trends";
    if (page === "notes.html") return "notes";
    if (page === "index.html" || page === "") return "index";
    const match = NAV_ITEMS.find((item) => item.href.toLowerCase() === page);
    return match ? match.id : null;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

  function onRouteChange(handler) {
    window.addEventListener("hashchange", () => handler(location));
    window.addEventListener("popstate", () => handler(location));
  }

  function renderNav(loc = location) {
    const nav = document.querySelector('[aria-label="Strategies"]');
    if (!nav) return;

    const activeId = activeNavId(loc);
    nav.replaceChildren();

    const shell = document.createElement("div");
    shell.className = "site-nav-sidebar";

    const brandWrap = document.createElement("div");
    brandWrap.style.cssText = "margin: 0 8px 18px;";

    const brand = document.createElement("a");
    brand.className = "site-nav-brand";
    brand.href = "index.html";
    brand.textContent = "CEMBI Credit";
    brand.style.cssText = "margin: 0 0 2px; display: block; font-size: 20px; font-weight: 800; color: #1d1d1f; text-decoration: none;";

    const subtitle = document.createElement("div");
    subtitle.textContent = "Corporate & EM Macro Desks";
    subtitle.style.cssText = "font-size: 11px; font-weight: 600; color: #6e6e73; text-transform: uppercase; letter-spacing: 0.05em;";

    brandWrap.appendChild(brand);
    brandWrap.appendChild(subtitle);

    const list = document.createElement("div");
    list.className = "site-nav-list";

    for (const group of NAV_GROUPS) {
      const items = NAV_ITEMS.filter((item) => item.group === group.id);
      if (!items.length) continue;

      const groupEl = document.createElement("section");
      groupEl.className = "site-nav-group";

      const heading = document.createElement("h2");
      heading.className = "site-nav-group-label";
      heading.textContent = group.label;
      groupEl.appendChild(heading);

      for (const item of items) {
        const link = document.createElement("a");
        link.className = "site-nav-item";
        if (item.secondary) link.classList.add("secondary");
        link.href = item.href;
        if (item.href.startsWith("http")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }

        const asset = document.createElement("span");
        asset.className = "site-nav-item-asset";
        asset.textContent = item.asset;

        const strategy = document.createElement("span");
        strategy.className = "site-nav-item-strategy";
        strategy.textContent = item.strategy;

        link.appendChild(asset);
        link.appendChild(strategy);

        if (item.id === activeId) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        }

        groupEl.appendChild(link);
      }

      list.appendChild(groupEl);
    }

    shell.appendChild(brandWrap);
    shell.appendChild(list);
    nav.appendChild(shell);
  }

  function ensureSidebarStyles() {
    if (document.getElementById("site-nav-sidebar-styles")) return;
    const style = document.createElement("style");
    style.id = "site-nav-sidebar-styles";
    style.textContent = `
      :root {
        --siteSidebarW: 292px;
        --siteSidebarGap: 28px;
      }
      .site-nav[aria-label="Strategies"] {
        all: unset;
        position: fixed;
        top: 0;
        left: 0;
        width: var(--siteSidebarW);
        height: 100vh;
        z-index: 1000;
        background: #fbfbfd;
        box-sizing: border-box;
      }
      .site-nav-sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px 14px 24px;
        border-right: 1px solid rgba(0, 0, 0, .08);
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .site-nav-brand:hover {
        color: #0071e3 !important;
      }
      .site-nav-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 4px;
        scrollbar-width: thin;
      }
      .site-nav-group {
        margin-bottom: 18px;
      }
      .site-nav-group:last-child {
        margin-bottom: 0;
      }
      .site-nav-group-label {
        margin: 0 8px 8px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #86868b;
      }
      .site-nav-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin: 0 0 4px;
        padding: 10px 12px 10px 14px;
        border-radius: 8px;
        border: 1px solid transparent;
        border-left: 3px solid transparent;
        color: inherit;
        text-decoration: none;
        transition: background .15s ease, border-color .15s ease;
      }
      .site-nav-item:hover {
        background: rgba(0, 0, 0, .04);
        border-left-color: rgba(0, 113, 227, .35);
      }
      .site-nav-item.active {
        background: #ffffff;
        border-color: rgba(0, 0, 0, .08);
        border-left-color: #0071e3;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
      }
      .site-nav-item-asset {
        font-size: 13.5px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #1d1d1f;
        line-height: 1.25;
      }
      .site-nav-item-strategy {
        font-size: 11.5px;
        font-weight: 500;
        color: #6e6e73;
        line-height: 1.35;
      }
      .site-nav-item.active .site-nav-item-asset {
        color: #0071e3;
      }
      .site-nav-item.secondary {
        opacity: 0.85;
      }
      body {
        padding-left: calc(var(--siteSidebarW) + var(--siteSidebarGap));
      }
      @media (max-width: 980px) {
        .site-nav[aria-label="Strategies"] {
          position: sticky;
          top: 0;
          width: auto;
          height: auto;
          margin: 0 0 16px;
        }
        .site-nav-sidebar {
          height: auto;
          max-height: none;
          padding: 12px;
          border-right: none;
          border: 1px solid rgba(0, 0, 0, .08);
        }
        .site-nav-list {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 8px;
          overflow-x: auto;
        }
        .site-nav-group {
          display: contents;
        }
        .site-nav-group-label {
          display: none;
        }
        .site-nav-item {
          flex: 0 0 auto;
          min-width: 148px;
          margin: 0;
          padding: 10px 14px;
          border-left-width: 1px;
        }
        body {
          padding-left: 0;
        }
        main {
          width: min(1180px, calc(100vw - 40px));
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initNav() {
    ensureSidebarStyles();
    renderNav();
    onRouteChange(() => renderNav());
  }

  const AUTO_REFRESH_HOURS_LABEL =
    "Auto-refreshes every 30 minutes during UK LSE hours (Mon-Fri 08:00-16:30 London) while this page is open.";

  function londonParts(date = new Date()) {
    const map = {};
    for (const part of new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(date)) {
      if (part.type !== "literal") map[part.type] = part.value;
    }
    return map;
  }

  function isUkLseTradingHours(date = new Date()) {
    const { weekday, hour, minute } = londonParts(date);
    if (weekday === "Sat" || weekday === "Sun") return false;
    const mins = Number(hour) * 60 + Number(minute);
    return mins >= 8 * 60 && mins < 16 * 60 + 30;
  }

  function registerAutoRefresh(callback, intervalMs) {
    window.setInterval(() => {
      if (!document.hidden && isUkLseTradingHours()) callback();
    }, intervalMs);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }

  window.SiteNav = {
    NAV_ITEMS,
    NAV_GROUPS,
    scrollToTop,
    onRouteChange,
    renderNav,
    activeNavId,
    AUTO_REFRESH_HOURS_LABEL,
    isUkLseTradingHours,
    registerAutoRefresh,
  };
})();
