import { useEffect, useState } from "react";
import { ArrowUpRight, BadgeCheck, FileCheck2, ShieldCheck } from "lucide-react";

import itemArt from "../assets/maker-fedora-main.png.asset.json";
import a01 from "../assets/maker-fedora-a01-original.jpeg.asset.json";
import a02 from "../assets/maker-fedora-a02-original.jpeg.asset.json";
import a03 from "../assets/maker-fedora-a03-original.jpeg.asset.json";
import a04 from "../assets/maker-fedora-a04-original.jpeg.asset.json";
import a05 from "../assets/maker-fedora-a05-original.png.asset.json";
import p01 from "../assets/maker-fedora-p01.jpg.asset.json";
import p02 from "../assets/maker-fedora-p02.jpg.asset.json";
import p03 from "../assets/maker-fedora-p03.jpg.asset.json";
import p04 from "../assets/maker-fedora-p04.jpg.asset.json";
import p05 from "../assets/maker-fedora-p05.jpg.asset.json";
import p06 from "../assets/maker-fedora-p06.jpg.asset.json";
import p07 from "../assets/maker-fedora-p07.jpg.asset.json";
import p08 from "../assets/maker-fedora-p08.jpg.asset.json";
import p09 from "../assets/maker-fedora-p09.jpg.asset.json";
import p10 from "../assets/maker-fedora-p10.jpg.asset.json";
import p11 from "../assets/maker-fedora-p11.jpg.asset.json";
import p12 from "../assets/maker-fedora-p12.jpg.asset.json";
import p13 from "../assets/maker-fedora-p13.jpg.asset.json";
import p14 from "../assets/maker-fedora-p14.jpg.asset.json";
import ukFedora from "../assets/maker-fedora-uk-2014.png.asset.json";
import lehighFedora from "../assets/lehigh-valley-maker-fedora-2014.png.asset.json";

type Tab = "art" | "proofs" | "owners" | "info";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// Turns "28th September 2026" into a comparable number for ownership sorting.
export function ownedKey(since: string): number {
  const parts = since.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!parts) return Number.MAX_SAFE_INTEGER;
  const day = Number(parts[1] ?? "0");
  const month = MONTHS.indexOf((parts[2] ?? "").toLowerCase()) + 1;
  const year = Number(parts[3] ?? "0");
  return year * 372 + month * 31 + day;
}

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
  communityUrl: "https://discord.gg/jND4SFryDD",
  communityLabel: "Join Discord",
  vault: {
    title: "The Maker Fedora Circulation List and FT status",
    updated: "Last updated 7th October 2026.",
    scope: "Active copies (past 6 months)",
    credit: "Made with love by Jaytozz, updated by himself",
    stats: [
      { label: "TOTAL IN CIRCULATION", value: "25" },
      { label: "ACTIVELY IN CIRCULATION", value: "8" },
      { label: "OUT OF CIRCULATION", value: "4" },
      { label: "AVAILABLE FOR TRADE", value: "6" },
    ],
    note: "14x maker copies marked NFT. Now owned by @conspiratorial",
    groups: [
      {
        title: "For trade",
        owners: [
          { user: "k4xie", handle: "@4wulf", status: "DEMAND ONLY", uaid: "1528626180", since: "5th August 2026", out: false },
          { user: "Gloca1", handle: "@gloca1.", status: "DEMAND ONLY", uaid: "1383025924", since: "24th May 2026", out: false },
          { user: "Kolvatn", handle: "@kolvatn", status: "DEMAND ONLY", uaid: "1528626180", since: "28th September 2026", out: false },
          { user: "CLaiReea1", handle: "@claireea", status: "SEMI AND DEMAND", uaid: "1365666629", since: "14th April 2026", out: false },
          { user: "EldestClient565", handle: "@eldestclient565", status: "SEMI AND DEMAND", uaid: "1365666600", since: "12th April 2026", out: false },
          { user: "ephyte", handle: "@ephyte", status: "DEMAND ONLY", uaid: "1365666599", since: "7th April 2026", out: true },
          { user: "1clone09", handle: "@clone2475", status: "DEMAND ONLY", uaid: "1527061056", since: "7th August 2025", out: true },
          { user: "FiveBarred", handle: "@fivebarred", status: "DEMAND ONLY", uaid: "1527060978", since: "31st June 2026", out: false },
        ],
      },
      {
        title: "Not for trade",
        owners: [
          { user: "xJaytoz", handle: "@jqytoz", status: "DEMAND ONLY", uaid: "1365666633", since: "3rd May 2026", out: false },
        ],
      },
      {
        title: "Out of circulation (NFT)",
        owners: [
          { user: "Speluffy", handle: "@speluffy", status: "NFT", uaid: "1465807687", since: "3rd May 2025", out: true },
          { user: "ixplrr", handle: "@ixplrr", status: "NFT", uaid: "1529104191", since: "22nd April 2025", out: true },
        ],
      },
    ],
  },
  history: [
    {
      title: "The Maker Fedora",
      label: "THE ORIGINAL · 2013",
      image: itemArt.url,
      description: "The original green Maker Fedora was a promotional reward for visitors to Roblox’s booth at the 2013 Bay Area Maker Faire. It later appeared in the catalog for 750 Robux from September 21–23, 2013, and became Limited on May 12, 2022. Its distinctive fedora design was also used for the two regional 2014 recolours below.",
      created: "May 10, 2013",
      status: "Limited",
      catalogId: "115363212",
      wiki: "https://roblox.fandom.com/wiki/Catalog:The_Maker_Fedora",
    },
    {
      title: "Maker Fedora UK 2014",
      label: "REGIONAL RECOLOUR · UK",
      image: ukFedora.url,
      description: "A regional recolour of The Maker Fedora for Maker Faire UK 2014 in Newcastle. Participants at the Roblox booth received a promotional code, which had to be redeemed before the deadline printed on the promotion card. Unlike the original Maker Fedora, this event reward is not Limited and is off sale.",
      created: "April 18, 2014",
      status: "Off sale · Not Limited",
      catalogId: "153956149",
      wiki: "https://roblox.fandom.com/wiki/Catalog:Maker_Fedora_UK_2014",
    },
    {
      title: "Lehigh Valley Maker Fedora 2014",
      label: "REGIONAL RECOLOUR · LEHIGH VALLEY",
      image: lehighFedora.url,
      description: "A regional recolour created for the Lehigh Valley Mini Maker Faire 2014 in Pennsylvania. It was given to Roblox-booth participants who redeemed the event’s promotional code before the deadline on their promotion card. It shares the Maker Fedora design, but remains a separate, non-Limited event collectible that is off sale.",
      created: "April 18, 2014",
      status: "Off sale · Not Limited",
      catalogId: "153956237",
      wiki: "https://roblox.fandom.com/wiki/Catalog:Lehigh_Valley_Maker_Fedora_2014",
    },
  ],
  stats: [
    { label: "ROLIMONS VALUE", value: "150K" },
    { label: "LAST VALUE CHANGE", value: "+65K", accent: true },
    { label: "LATEST OVERPAY", value: "85K" },
    { label: "AVERAGE OVERPAY", value: "97K" },
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
  proofs: [
    {
      code: "P–01",
      title: "Maker vs DCJ+",
      offer: "234,846 vs 150,000",
      overpay: "85K",
      sender: "kolvatn",
      receiver: "3lockayBurn",
      date: "28-09-26",
      latest: true,
      image: p01.url,
    },
    {
      code: "P–02",
      title: "Maker vs Embrace",
      offer: "242,500 vs 150,000",
      overpay: "92.5K",
      sender: "FiveBarred",
      receiver: "sociallynetworking",
      date: "31/05/26",
      image: p02.url,
    },
    {
      code: "P–03",
      title: "Maker vs Aer Draco",
      offer: "199,034 vs 150,000",
      overpay: "48K",
      sender: "L1GHTLAZE",
      receiver: "S0VSQUAD",
      date: "5/6/26",
      image: p03.url,
    },
    {
      code: "P–04",
      title: "Maker vs Dark Conjurer",
      offer: "290,000 vs 208,000",
      overpay: "82K",
      sender: "SameWildCat",
      receiver: "Irohsin",
      date: "27/4/26",
      image: p04.url,
    },
    {
      code: "P–05",
      title: "Maker vs Dark Conjurer",
      offer: "186,500 vs 296,000",
      overpay: "109.5K",
      sender: "RB_Kraft",
      receiver: "xJaytoz",
      date: "25/04/26",
      image: p05.url,
    },
    {
      code: "P–06",
      title: "Maker vs SSHF and 2x Supas",
      offer: "153,300 vs 255,000",
      overpay: "101.7K",
      sender: "Forrealmistake",
      receiver: "EldestClient565",
      date: "4/11/26",
      image: p06.url,
    },
    {
      code: "P–07",
      title: "Maker vs SSHF",
      offer: "152,207 vs 243,000",
      overpay: "90K",
      sender: "irohshin",
      receiver: "LTlago",
      date: "22/2/2026",
      image: p07.url,
    },
    {
      code: "P–08",
      title: "Maker vs BCWHP",
      offer: "150,000 vs 240,000",
      overpay: "90K",
      sender: "LocustSwarm",
      receiver: "ephyte",
      date: "4/7/2026",
      image: p08.url,
    },
    {
      code: "P–09",
      title: "Maker vs Chaplin",
      offer: "150,000 vs 325,000",
      overpay: "175K",
      sender: "impalervi",
      receiver: "l13kklkl",
      date: "5/26/2026",
      image: p09.url,
    },
    {
      code: "P–10",
      title: "Maker vs Where Are the Eggs?",
      offer: "150,000 vs 315,000",
      overpay: "165K",
      sender: "impalerVI",
      receiver: "pontifexilprofits",
      date: "5/8/26",
      image: p10.url,
    },
    {
      code: "P–11",
      title: "Maker vs Crimson Laser Vision",
      offer: "223,000 vs 150,000",
      overpay: "73K",
      sender: "Proxilic",
      receiver: "SOVSQUAD",
      date: "5/1/26",
      image: p11.url,
    },
    {
      code: "P–12",
      title: "Maker vs PIGG",
      offer: "256,000 vs 150,000",
      overpay: "106K",
      sender: "kanistrotic",
      receiver: "zobso",
      date: "3/4/2026",
      image: p12.url,
    },
    {
      code: "P–13",
      title: "Maker vs VPH and Noir Periastron Psi",
      offer: "230,000 vs 185,000",
      overpay: "45K",
      sender: "Irohsin",
      receiver: "Proxilic",
      date: "23/04/26",
      image: p13.url,
    },
    {
      code: "P–14",
      title: "Maker vs Green Galaxy Gaze",
      offer: "150,000 vs 201,342",
      overpay: "100K",
      sender: "Not shown",
      receiver: "Not shown",
      date: "2/20/26",
      image: p14.url,
    },
  ],
};

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "art", label: "Collection (Art)" },
  { id: "proofs", label: "Proofs (Overpays)" },
  { id: "owners", label: "Maker Fedora Owners" },
  { id: "info", label: "Info Vault" },
];

export function ArchiveTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("art");

  useEffect(() => {
    const selectLinkedTab = () => {
      const hash = window.location.hash;
      if (hash === "#owners" || hash === "#info") {
        setActiveTab(hash === "#owners" ? "owners" : "info");
        document.getElementById("archive")?.scrollIntoView();
      }
    };
    selectLinkedTab();
    window.addEventListener("hashchange", selectLinkedTab);
    return () => window.removeEventListener("hashchange", selectLinkedTab);
  }, []);

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
            <article className="proof-card proof-summary">
              <FileCheck2 aria-hidden="true" />
              <p className="micro-label">LATEST VERIFIED TRADE</p>
              <h3>{ITEM_TEMPLATE.stats[2]?.value} overpay secured</h3>
              <p>
                {ITEM_TEMPLATE.proofs[0]?.title} — {ITEM_TEMPLATE.proofs[0]?.overpay} overpay. Offer{" "}
                {ITEM_TEMPLATE.proofs[0]?.offer}. Sender {ITEM_TEMPLATE.proofs[0]?.sender}, receiver{" "}
                {ITEM_TEMPLATE.proofs[0]?.receiver}, {ITEM_TEMPLATE.proofs[0]?.date}.
              </p>
              <span>VERIFIED · ARCHIVE ENTRY {ITEM_TEMPLATE.proofs[0]?.code}</span>
            </article>
            {ITEM_TEMPLATE.proofs.map((proof) => (
              <article className={`proof-card proof-entry${proof.latest ? " latest" : ""}`} key={proof.code}>
                <div className="proof-shot-wrap">
                  <img src={proof.image} alt={`Trade receipt ${proof.code} — ${proof.title}`} className="proof-shot" loading="lazy" />
                  <span className="exhibit-tag">EXHIBIT {proof.code}</span>
                  {proof.latest && <span className="signature-tag">✧ LATEST OVERPAY</span>}
                </div>
                <div className="proof-meta">
                  <div className="proof-value">
                    <span>OVERPAY</span>
                    <strong>+{proof.overpay}</strong>
                  </div>
                  <div className="proof-details">
                    <time>{proof.date}</time>
                    <h3>{proof.title}</h3>
                    <dl>
                      <div>
                        <dt>ITEMS</dt>
                        <dd>{proof.offer}</dd>
                      </div>
                      <div>
                        <dt>SENDER</dt>
                        <dd>{proof.sender}</dd>
                      </div>
                      <div>
                        <dt>RECEIVER</dt>
                        <dd>{proof.receiver}</dd>
                      </div>
                    </dl>
                    <span className="proof-verified">
                      <BadgeCheck size={13} aria-hidden="true" /> VERIFIED TRADE {proof.code}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "owners" && (
          <div className="circulation-vault" role="tabpanel">
            <div className="circulation-heading">
              <ShieldCheck aria-hidden="true" />
              <div>
                <h3>{ITEM_TEMPLATE.vault.title}</h3>
                <p>{ITEM_TEMPLATE.vault.updated} · {ITEM_TEMPLATE.vault.scope}</p>
                <p>{ITEM_TEMPLATE.vault.credit}</p>
              </div>
            </div>
            <dl className="circulation-stats">
              {ITEM_TEMPLATE.vault.stats.map((stat) => (
                <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
              ))}
            </dl>
            {ITEM_TEMPLATE.vault.groups.map((group) => (
              <section className="circulation-group" key={group.title} aria-label={group.title}>
                <h4>{group.title} <span>{group.owners.length.toString().padStart(2, "0")}</span></h4>
                <div className="circulation-table-wrap">
                  <table className="circulation-table">
                    <thead><tr><th scope="col">User</th><th scope="col">Trade Status / Overpay</th><th scope="col">UAID</th><th scope="col">Owned Since</th></tr></thead>
                    <tbody>
                      {[...group.owners]
                        .sort((a, b) => ownedKey(b.since) - ownedKey(a.since))
                        .map((owner) => (
                        <tr key={`${owner.user}-${owner.uaid}`}>
                          <td><strong>{owner.user}</strong><span className="owner-handle">{owner.handle}</span></td>
                          <td><span className="owner-status">{owner.status}</span>{owner.out && <span className="owner-out">OUT OF CIRCULATION</span>}</td>
                          <td className="owner-uaid">{owner.uaid}</td>
                          <td>{owner.since}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
            <div className="circulation-note">
              <p>{ITEM_TEMPLATE.vault.note}</p>
              <a href={ITEM_TEMPLATE.communityUrl} target="_blank" rel="noreferrer">Community <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
        )}
        {activeTab === "info" && (
          <div className="history-vault" role="tabpanel" aria-label="Info Vault">
            <div className="history-heading">
              <p className="micro-label">ORIGINS & RECOLOURS</p>
              <h3>Info Vault</h3>
              <p>The original Maker Fedora and its two 2014 regional recolours. Read the linked Roblox Wiki articles and catalog entries for more details.</p>
            </div>
            {ITEM_TEMPLATE.history.map((entry) => (
              <article className="history-entry" key={entry.catalogId}>
                <img src={entry.image} alt={entry.title} loading="lazy" />
                <div>
                  <span className="micro-label">{entry.label}</span>
                  <h4>{entry.title}</h4>
                  <p>{entry.description}</p>
                  <dl>
                    <div><dt>CREATOR</dt><dd>Roblox</dd></div>
                    <div><dt>CREATED</dt><dd>{entry.created}</dd></div>
                    <div><dt>STATUS</dt><dd>{entry.status}</dd></div>
                    <div><dt>CATALOG ID</dt><dd>{entry.catalogId}</dd></div>
                  </dl>
                  <a className="history-source" href={entry.wiki} target="_blank" rel="noreferrer">Roblox Wiki <ArrowUpRight size={14} aria-hidden="true" /></a>
                  {" · "}
                  <a className="history-source" href={`https://www.roblox.com/catalog/${entry.catalogId}`} target="_blank" rel="noreferrer">Roblox Catalog <ArrowUpRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
