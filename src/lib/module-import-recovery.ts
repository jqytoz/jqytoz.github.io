// Recovers the archive when a built module chunk fails to load. The usual cause
// is a browser holding an index.html from a previous build whose hashed chunk
// files no longer exist: the dynamic import rejects with "Importing a module
// script failed." and the screen stays blank. One loop-guarded reload asks the
// server for the current bundle instead.

const ATTEMPT_KEY = "archive-module-recovery-attempt";
const RETRY_WINDOW_MS = 20_000;

const STALE_BUNDLE = [
  /importing a module script failed/i,
  /failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /failed to load module script/i,
  /unable to preload css/i,
];

export function isStaleBundleFailure(message: string): boolean {
  return STALE_BUNDLE.some((pattern) => pattern.test(message));
}

type RecoveryStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function createModuleImportRecovery(opts: {
  storage?: RecoveryStorage | undefined;
  reload: () => void;
}) {
  let alreadyReloaded = false;

  const lastAttemptAt = () => {
    try {
      return Number(opts.storage?.getItem(ATTEMPT_KEY) ?? "");
    } catch {
      return Number.NaN;
    }
  };

  const markAttempt = () => {
    try {
      opts.storage?.setItem(ATTEMPT_KEY, String(Date.now()));
    } catch {
      // Private-mode storage can throw; the in-memory guard still stops loops.
    }
  };

  const recover = () => {
    if (alreadyReloaded) return;
    const last = lastAttemptAt();
    if (Number.isFinite(last) && Date.now() - last < RETRY_WINDOW_MS) return;
    alreadyReloaded = true;
    markAttempt();
    opts.reload();
  };

  return {
    handleResourceError(event: Event) {
      const element = event.target as { tagName?: string } | null;
      if (element?.tagName === "SCRIPT" || element?.tagName === "LINK") recover();
    },
    handleRejection(message: string) {
      if (isStaleBundleFailure(message)) recover();
    },
  };
}

export function installModuleImportRecovery(): void {
  if (typeof window === "undefined") return;

  let storage: RecoveryStorage | undefined;
  try {
    storage = window.sessionStorage;
  } catch {
    storage = undefined;
  }

  const recovery = createModuleImportRecovery({
    storage,
    reload: () => window.location.reload(),
  });

  // Capture phase: script and link load errors do not bubble.
  window.addEventListener("error", (event) => recovery.handleResourceError(event), true);
  window.addEventListener("unhandledrejection", (event) =>
    recovery.handleRejection(String((event as PromiseRejectionEvent).reason ?? event)),
  );
}
