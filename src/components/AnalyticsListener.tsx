"use client";

import { ANALYTICS_EVENT, type AnalyticsDetail, track } from "@/lib/analytics";
import { useEffect } from "react";

/**
 * Single consumer of the `lotus:analytics` bus. Forwards events only when the host page
 * has set `window.__lotusConsent = true` and provided a sink; otherwise it does nothing.
 * Sets no cookies and writes to no storage. Also turns clicks on `[data-cta]` links into
 * `cta_click` events so server-rendered pages stay free of client handlers.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const forward = (event: Event) => {
      if (window.__lotusConsent !== true) return;
      const detail = (event as CustomEvent<AnalyticsDetail>).detail;
      window.__lotusAnalytics?.push(detail);
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!target) return;
      track("cta_click", {
        page: window.location.pathname,
        label: target.dataset.cta || target.textContent?.trim() || "",
      });
    };

    window.addEventListener(ANALYTICS_EVENT, forward);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(ANALYTICS_EVENT, forward);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
