import { useState } from "react";
import { ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";

import itemArt from "../assets/winner.webp.asset.json";
import a01 from "../assets/maker-fedora-a01.jpg.asset.json";
import a02 from "../assets/maker-fedora-a02.jpg.asset.json";
import a03 from "../assets/maker-fedora-a03.jpg.asset.json";
import a04 from "../assets/maker-fedora-a04.jpg.asset.json";
import a05 from "../assets/maker-fedora-a05.jpg.asset.json";

type Tab = "art" | "proofs" | "info";

// Replace this one object to reuse the template for another collectible.
export const ITEM_TEMPLATE = {
  shortMark: "MF",
  name: "The Maker Fedora",
  eyebrow: "CURATED ARTIFACT DOSSIER · 2026",
  headline: "The best",
  headlineAccent: "steampunk fedora",
  headlineEnd: "on ROBLOX.",
  description:
    "An icon of industrial sophistication. The Maker Fedora represents unmatched craft, high-tier rarity, and elite status — captured through exclusive visual archives and market heritage.",
  image: itemArt.url,
  imageAlt: "The Maker Fedora, a steampunk fedora collectible item",
  status: "INDUSTRIAL",
  objectCode: "OBJECT MF · PRIVATE ARCHIVE",
  communityUrl: "https://discord.gg/BMzQW37xcr",
  communityLabel: "Join Discord",
  stats: [
    { label: "ROLIMONS VALUE", value: "150K" },
    { label: "LAST VALUE CHANGE", value: "+65K", accent: true },
    { label: "LATEST OVERPAY", value: "85K" },
  ],
  art: [
    {
      code: "A–01",
      title: "The Industrial Monarch",
      description:
        "Precision engineered from the gears up. A custom-made crown for the discerning collector.",
      image: a01.url,
      featured: true,
    },
    {
      code: "A–02",
      title: "Clockwork Leverage",
      description:
        "The deal is settled before the table knows it. Poise, leverage, and total control defined by timeless design.",
      image: a02.url,
    },
    {
      code: "A–03",
      title: "Steam & Shadows",
      description:
        "Victory, considered quietly. A private toast to conviction that outlasted the room. Calculated artistry.",
      image: a03.url,
    },
    {
      code: "A–04",
      title: "Gears of Endurance",
      description:
        "The shadow fades. True quality remains — built one refusal to quit at a time, resilient through every cycle.",
      image: a04.url,
    },
    {
      code: "A–05",
      title: "Mechanical Harmony",
      description:
        "Beyond the market noise sits a rarer prize: the calm of knowing what you hold. Mechanical mastery, pure certainty.",
      image: a05.url,
    },
  ],
};

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "art", label: "Collection (Art)" },
  { id: "proofs", label: "Proofs (Overpays)" },
  { id: "info", label: "Info Vault" },
];

export function ArchiveTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("art");

  return (
    <>
      <section className="archive-section" id="archive" aria-labelledby="archive-title">
        <div className="archive-heading">
          <div>
            <p className="micro-label">THE PRIVATE REGISTRY</p>
            <h2 id="archive-title">Open the archive</h2>
          </div>
          <div className="archive-tabs" role="tablist" aria-label="Archive sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? "archive-tab active" : "archive-tab"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "art" && (
          <div className="art-grid" role="tabpanel">
            {ITEM_TEMPLATE.art.map((work) => (
              <article className="art-entry" key={work.code}>
                <div className="art-image-wrap">
                  <img src={work.image} alt={work.title} className="art-image" />
                  <span className="exhibit-tag">EXHIBIT {work.code}</span>
                  {work.featured && <span className="signature-tag">✧ SIGNATURE WORK</span>}
                </div>
                <div className="art-copy">
                  <span className="art-code">{work.code}</span>
                  <div>
                    <h3>{work.title}</h3>
                    <p>{work.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "proofs" && (
          <div className="proof-grid" role="tabpanel">
            <article className="proof-card">
              <FileCheck2 aria-hidden="true" />
              <p className="micro-label">LATEST VERIFIED TRADE</p>
              <h3>85K overpay secured</h3>
              <p>A concise record of the item, offer, date, and verification source belongs here.</p>
              <span>VERIFIED · ARCHIVE ENTRY P–01</span>
            </article>
            <article className="proof-card">
              <CheckCircle2 aria-hidden="true" />
              <p className="micro-label">VALUE RECORD</p>
              <h3>150K current value</h3>
              <p>Use this panel for the current valuation, recent movement, and supporting evidence.</p>
              <span>TRACKED · VALUE ENTRY V–01</span>
            </article>
          </div>
        )}

        {activeTab === "info" && (
          <div className="vault-panel" role="tabpanel">
            <ShieldCheck aria-hidden="true" />
            <div>
              <p className="micro-label">COLLECTOR INFORMATION</p>
              <h3>A documented object of distinction.</h3>
              <p>
                Add the item’s release history, serial details, ownership notes, market links, and provenance here.
                This area is designed to become the permanent reference page for any collectible.
              </p>
            </div>
            <a href={ITEM_TEMPLATE.communityUrl} target="_blank" rel="noreferrer">
              Community <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </section>
    </>
  );
}