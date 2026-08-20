"use client";

import { useEffect } from "react";

export function MotionReady() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const header = document.querySelector<HTMLElement>(".site-header");
    const sectionLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]'),
    ).map((link) => ({
      link,
      section: document.getElementById(link.hash.slice(1)),
    }));
    let frame = 0;

    const syncNavigation = () => {
      frame = 0;
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const pageProgress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      header?.style.setProperty("--page-progress", String(pageProgress));

      const marker =
        window.scrollY + (header?.offsetHeight ?? 0) + Math.min(window.innerHeight * 0.32, 240);
      let currentId = "";
      for (const item of sectionLinks) {
        if (item.section && item.section.offsetTop <= marker) currentId = item.section.id;
      }

      for (const item of sectionLinks) {
        if (item.section?.id === currentId) {
          item.link.setAttribute("aria-current", "location");
        } else {
          item.link.removeAttribute("aria-current");
        }
      }
    };

    const queueNavigationSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncNavigation);
    };

    syncNavigation();
    window.addEventListener("scroll", queueNavigationSync, { passive: true });
    window.addEventListener("resize", queueNavigationSync);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const node of nodes) {
        node.classList.add("is-visible");
      }
      return () => {
        window.removeEventListener("scroll", queueNavigationSync);
        window.removeEventListener("resize", queueNavigationSync);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          node.classList.add("is-visible");
          if (node.hasAttribute("data-path")) {
            node.style.setProperty("--path-progress", "100%");
          }
          if (node.hasAttribute("data-ai-flow")) {
            node.style.setProperty("--flow-progress", "100%");
          }
          observer.unobserve(node);
        }
      },
      { threshold: 0.13 },
    );

    for (const node of nodes) {
      observer.observe(node);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", queueNavigationSync);
      window.removeEventListener("resize", queueNavigationSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
