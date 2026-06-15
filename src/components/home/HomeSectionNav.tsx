"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#who-we-serve", label: "Who it's for" },
  { href: "#proof", label: "Field proof" },
  { href: "#platform", label: "The platform" },
  { href: "#trust", label: "Privacy & pilots" },
  { href: "#questions", label: "FAQ" },
  { href: "#vision", label: "Pricing" },
  { href: "#get-started", label: "Get started" },
] as const;

export const HomeSectionNav = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const ids = LINKS.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observed = [hero, ...sections].filter((el): el is HTMLElement => el !== null);
    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target;
        if (!top?.id) return;

        if (top.id === "hero") {
          setActive(null);
          return;
        }

        const href = `#${top.id}`;
        if (LINKS.some((link) => link.href === href)) {
          setActive(href);
        }
      },
      {
        rootMargin: "-42% 0px -48% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const section of observed) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="he-section-nav" aria-label="On this page">
      <ul>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href ? "is-active" : undefined}
              aria-current={active === link.href ? "location" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
