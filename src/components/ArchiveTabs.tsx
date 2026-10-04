import { useState } from "react";
import { ArrowUpRight, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";

import itemArt from "../assets/winner.webp.asset.json";
import napoleon from "../assets/napoleon-bonawinner.png.asset.json";
import deal from "../assets/deal-with-the-winner.png.asset.json";
import afterBell from "../assets/after-hours-winner.png.asset.json";
import persistence from "../assets/persistence-portrait.png.asset.json";
import peace from "../assets/eternal-peace.png.asset.json";

type Tab = "art" | "proofs" | "info";

// Replace this one object to reuse the template for another collectible.
export const ITEM_TEMPLATE = {
  shortMark: "W1",
  name: "W1NN3R",
  eyebrow: "CURATED ARTIFACT DOSSIER · 2026",
  headline: "The sovereign",
  headlineAccent: "W1NN3R",
  headlineEnd: "artifact.",
  description:
    "More than a limited. W1NN3R is a recognizable mark of conviction, scarcity, and collector wealth — documented through the art it inspires and the premiums it commands.",
  image: itemArt.url,
  imageAlt: "W1NN3R Roblox item, a silver robot head with purple and green details",
  status: "COVETED",
  objectCode: "OBJECT W1 · PRIVATE ARCHIVE",
  communityUrl: "https://discord.gg/BMzQW37xcr",
  communityLabel: "Join Discord",
  stats: [
    { label: "ROLIMONS VALUE", value: "120K" },
    { label: "LAST VALUE CHANGE", value: "+20K", accent: true },
    { label: "LATEST OVERPAY", value: "70K" },
  ],
  art: [
    {
      code: "A–01",
      title: "Napoleon Bonawinner",
      description: "All we can do is win..",
      image: napoleon.url,
      featured: true,
    },
    {
      code: "A–02",
      title: "Deal With the W1NN3R",
      description:
        "The deal is settled before the table knows it. Poise, leverage, and the face of the winning side.",
      image: deal.url,
    },
    {
      code: "A–03",
      title: "After the Bell",
      description:
        "Victory, considered quietly. A private toast to conviction that outlasted the room.",
      image: afterBell.url,
    },
    {
      code: "A–04",
      title: "Persistence, Reflected",
      description:
        "The shadow fades. The W1NN3R remains — built one refusal to quit at a time.",
      image: persistence.url,
    },
    {
      code: "A–05",
      title: "Eternal Peace",
      description:
        "Beyond the market noise sits a rarer prize: the calm of knowing what you hold.",
      image: peace.url,
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
              <h3>70K overpay secured</h3>
              <p>A concise record of the item, offer, date, and verification source belongs here.</p>
              <span>VERIFIED · ARCHIVE ENTRY P–01</span>
            </article>
            <article className="proof-card">
              <CheckCircle2 aria-hidden="true" />
              <p className="micro-label">VALUE RECORD</p>
              <h3>120K current value</h3>
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