import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchiveTabs, ITEM_TEMPLATE } from "@/components/ArchiveTabs";
import { fireEvent } from "@testing-library/react";

describe("Circulation ownership rules", () => {
  it("lists latest ownership first", () => {
    render(<ArchiveTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "Maker Fedora Owners" }));
    const group = screen.getByRole("region", { name: "For trade" });
    const rows = within(group).getAllByRole("row").slice(1);
    expect(rows.map(row => row.querySelector("strong")?.textContent)).toEqual([
      "Kolvatn", "k4xie", "FiveBarred", "Gloca1", "CLaiReea1", "EldestClient565", "ephyte", "1clone09",
    ]);
  });

  it("places FiveBarred in For trade", () => {
    const group = ITEM_TEMPLATE.vault.groups.find(group => group.title === "For trade");
    expect(group?.owners.some(owner => owner.user === "FiveBarred")).toBe(true);
  });

  it("keeps only xJaytoz in Not for trade", () => {
    const group = ITEM_TEMPLATE.vault.groups.find(group => group.title === "Not for trade");
    expect(group?.owners.map(owner => owner.user)).toEqual(["xJaytoz"]);
  });

  it("separates catalog history and both recolours from owners", () => {
    render(<ArchiveTabs />);
    fireEvent.click(screen.getByRole("tab", { name: "Info Vault" }));
    expect(screen.getByRole("heading", { name: "The Maker Fedora" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Maker Fedora UK 2014" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lehigh Valley Maker Fedora 2014" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Roblox Wiki" })).toHaveLength(3);
    expect(screen.queryByRole("region", { name: "For trade" })).not.toBeInTheDocument();
  });
});