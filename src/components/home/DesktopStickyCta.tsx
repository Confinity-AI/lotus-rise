"use client";

import { useEffect, useState } from "react";

const DEMO = "mailto:contact@lotusrise.org?subject=Lotus Rise Inquiry";
const DEMO_FUNDER = "mailto:contact@lotusrise.org?subject=Foundation%20Pilot%20Inquiry";

export const DesktopStickyCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const close = document.getElementById("get-started");
    const targets = [hero, close].filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const state = { heroVisible: true, closeVisible: false };

    const sync = () => {
      setVisible(!state.heroVisible && !state.closeVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (id === "hero") state.heroVisible = entry.isIntersecting;
          if (id === "get-started") state.closeVisible = entry.isIntersecting;
        }
        sync();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <aside className="he-desktop-cta" aria-label="Quick contact">
      <a href={DEMO_FUNDER} className="he-btn he-btn--fill he-btn--sm">
        Request a pilot
      </a>
      <a href={DEMO} className="he-desktop-cta__soft">
        Write to us
      </a>
    </aside>
  );
};
