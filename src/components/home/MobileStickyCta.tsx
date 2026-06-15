"use client";

import { useEffect, useState } from "react";
import { DEMO } from "./copy";

export const MobileStickyCta = () => {
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
    <div className="mobile-sticky-cta">
      <a href={DEMO} className="lr-btn lr-btn--primary" style={{ width: "100%", textAlign: "center" }}>
        Schedule a demo
      </a>
    </div>
  );
};
