import { describe, expect, it, vi } from "vitest";
import {
  createModuleImportRecovery,
  isStaleBundleFailure,
} from "@/lib/module-import-recovery";

function fakeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  };
}

describe("Module import recovery", () => {
  it("recognises the stale-bundle import failure", () => {
    expect(isStaleBundleFailure("Importing a module script failed.")).toBe(true);
    expect(
      isStaleBundleFailure(
        "TypeError: Failed to fetch dynamically imported module: http://localhost/assets/app.js",
      ),
    ).toBe(true);
    expect(
      isStaleBundleFailure(
        "TypeError: error loading dynamically imported module: http://localhost/assets/app.js",
      ),
    ).toBe(true);
    expect(isStaleBundleFailure("ReferenceError: nothing is not defined")).toBe(false);
  });

  it("reloads once when a chunk import fails", () => {
    const reload = vi.fn();
    const recovery = createModuleImportRecovery({ storage: fakeStorage(), reload });

    recovery.handleRejection("Importing a module script failed.");

    expect(reload).toHaveBeenCalledTimes(1);
    recovery.handleRejection("Importing a module script failed.");
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("reloads when a script tag fails to load", () => {
    const reload = vi.fn();
    const recovery = createModuleImportRecovery({ storage: fakeStorage(), reload });

    recovery.handleResourceError({ target: { tagName: "SCRIPT" } } as unknown as Event);

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("leaves unrelated failures alone", () => {
    const reload = vi.fn();
    const recovery = createModuleImportRecovery({ storage: fakeStorage(), reload });

    recovery.handleRejection("TypeError: cannot read properties of undefined");
    recovery.handleResourceError({ target: { tagName: "IMG" } } as unknown as Event);
    recovery.handleResourceError({ target: null } as unknown as Event);

    expect(reload).not.toHaveBeenCalled();
  });

  it("refuses a second reload while the previous attempt is still fresh", () => {
    const storage = fakeStorage();
    const first = createModuleImportRecovery({ storage, reload: vi.fn() });
    first.handleRejection("Importing a module script failed.");
    expect(storage.getItem("archive-module-recovery-attempt")).not.toBeNull();

    const second = createModuleImportRecovery({ storage, reload: vi.fn() });
    second.handleRejection("Importing a module script failed.");

    expect(storage.getItem("archive-module-recovery-attempt")).not.toBeNull();
    // A fresh attempt means the new page also failed: stop reloading.
    const third = createModuleImportRecovery({ storage, reload: vi.fn() });
    third.handleRejection("Importing a module script failed.");
    expect(third).toBeDefined();
  });
});
