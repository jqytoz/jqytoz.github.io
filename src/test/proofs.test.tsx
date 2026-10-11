import { describe, expect, it } from "vitest";
import { ITEM_TEMPLATE } from "@/components/ArchiveTabs";

const byCode = Object.fromEntries(ITEM_TEMPLATE.proofs.map((proof) => [proof.code, proof]));

describe("Trades added from the imgur album", () => {
  it("adds the six album trades that were not already archived", () => {
    expect(Object.keys(byCode)).toHaveLength(14);
    expect(byCode["P–09"]).toMatchObject({
      title: "Maker vs Chaplin",
      overpay: "175K",
      sender: "impalervi",
      receiver: "l13kklkl",
    });
    expect(byCode["P–10"]).toMatchObject({
      title: "Maker vs Where Are the Eggs?",
      overpay: "165K",
      sender: "impalerVI",
      receiver: "pontifexilprofits",
    });
    expect(byCode["P–11"]).toMatchObject({
      title: "Maker vs Crimson Laser Vision",
      overpay: "73K",
      sender: "Proxilic",
      receiver: "SOVSQUAD",
    });
    expect(byCode["P–12"]).toMatchObject({
      title: "Maker vs PIGG",
      overpay: "106K",
      sender: "kanistrotic",
      receiver: "zobso",
    });
    expect(byCode["P–13"]).toMatchObject({
      title: "Maker vs VPH and Noir Periastron Psi",
      overpay: "45K",
      sender: "Irohsin",
      receiver: "Proxilic",
    });
    expect(byCode["P–14"]).toMatchObject({
      title: "Maker vs Green Galaxy Gaze",
      overpay: "100K",
    });
  });

  it("keeps one trade from appearing in the archive twice", () => {
    const seen = ITEM_TEMPLATE.proofs.map((proof) => `${proof.title}|${proof.offer}`);
    expect(new Set(seen).size).toBe(seen.length);
  });

  it("counts every archived trade as trades since the raise", () => {
    const stat = ITEM_TEMPLATE.stats.find((entry) => entry.label === "TRADES SINCE RAISE");
    expect(stat?.value).toBe(String(ITEM_TEMPLATE.proofs.length));
  });

  it("keeps the newest receipt marked as the latest overpay", () => {
    const latest = ITEM_TEMPLATE.proofs.filter((proof) => proof.latest);
    expect(latest.map((proof) => proof.code)).toEqual(["P–01"]);
  });
});
