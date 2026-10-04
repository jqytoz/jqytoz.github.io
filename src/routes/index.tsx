import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { ArchiveTabs, ITEM_TEMPLATE } from "../components/ArchiveTabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Maker Fedora Archive — Collectible Item Dossier" },
      {
        name: "description",
        content:
          "An icon of industrial sophistication — The Maker Fedora's art archive, market value, verified trades, and provenance.",
      },
      { property: "og:title", content: "The Maker Fedora Archive — Collectible Item Dossier" },
      {
        property: "og:description",
        content:
          "The best steampunk fedora on ROBLOX — art archive, valuation, verified trades, and provenance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={`${ITEM_TEMPLATE.name} archive home`}>
          <span className="brand-mark">{ITEM_TEMPLATE.shortMark}</span>
          <span><strong>{ITEM_TEMPLATE.name}</strong> / ARCHIVE</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#archive">Collection</a>
          <a href="#archive">Proofs (Overpays)</a>
          <a href="#archive">Info Vault</a>
        </nav>
        <a className="community-button" href={ITEM_TEMPLATE.communityUrl} target="_blank" rel="noreferrer">
          {ITEM_TEMPLATE.communityLabel} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="item-title">
          <div className="hero-copy">
            <p className="eyebrow"><span />{ITEM_TEMPLATE.eyebrow}</p>
            <h1 id="item-title">
              {ITEM_TEMPLATE.headline}<br />
              <em>{ITEM_TEMPLATE.headlineAccent}</em> {ITEM_TEMPLATE.headlineEnd}
            </h1>
            <p className="hero-description">{ITEM_TEMPLATE.description}</p>
            <dl className="stats">
              {ITEM_TEMPLATE.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd className={stat.accent ? "accent-value" : undefined}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="specimen">
            <span className="object-code">{ITEM_TEMPLATE.objectCode}</span>
            <div className="specimen-glow" />
            <img src={ITEM_TEMPLATE.image} alt={ITEM_TEMPLATE.imageAlt} />
            <div className="specimen-meta">
              <span>PRIMARY SPECIMEN</span>
              <span>STATUS · <strong>{ITEM_TEMPLATE.status}</strong></span>
            </div>
          </div>

          <a className="scroll-cue" href="#archive" aria-label="Open the archive">
            <span>OPEN THE ARCHIVE</span><ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        <ArchiveTabs />
      </main>

      <footer>
        <span>{ITEM_TEMPLATE.name} ARCHIVE · INDEPENDENT COLLECTOR DOSSIER</span>
        <a href={ITEM_TEMPLATE.communityUrl} target="_blank" rel="noreferrer">
          ENTER THE {ITEM_TEMPLATE.name} SERVER <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
