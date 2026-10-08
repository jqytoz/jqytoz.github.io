import { useEffect, useRef, useState, type ReactNode } from "react";

export function PageEntrance({ name, mark, children }: { name: string; mark: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"loading" | "leaving" | "ready">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("ready");
      return;
    }
    let disposed = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const image = root.current?.querySelector<HTMLImageElement>(".specimen img");
    const finish = async () => {
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 650)),
        Promise.race([
          image?.decode().catch(() => undefined) ?? Promise.resolve(),
          new Promise(resolve => setTimeout(resolve, 2400)),
        ]),
      ]);
      if (disposed) return;
      setPhase("leaving");
      document.body.style.overflow = previousOverflow;
      exitTimer = setTimeout(() => setPhase("ready"), 450);
    };
    void finish();
    return () => {
      disposed = true;
      clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("scroll-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    const scan = () => {
      element.querySelectorAll(".archive-heading, .art-entry, .proof-card, .circulation-heading, .circulation-stats, .circulation-group, .circulation-note").forEach(target => {
        if (seen.has(target)) return;
        seen.add(target);
        if (target.getBoundingClientRect().top < window.innerHeight - 24) return;
        target.classList.add("scroll-reveal");
        observer.observe(target);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(element, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, []);

  return (
    <div ref={root}>
      {phase !== "ready" && (
        <div className={`entrance-screen${phase === "leaving" ? " entrance-leaving" : ""}`} role="status" aria-label={`Loading ${name}`}>
          <span className="entrance-mark">{mark}</span>
          <strong>{name}</strong>
          <span className="entrance-line" aria-hidden="true" />
        </div>
      )}
      {children}
    </div>
  );
}