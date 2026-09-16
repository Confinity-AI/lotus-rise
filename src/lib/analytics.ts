export const ANALYTICS_EVENT = "lotus:analytics";

export type AnalyticsDetail = { name: string } & Record<string, unknown>;

declare global {
  interface Window {
    __lotusConsent?: boolean;
    __lotusAnalytics?: { push: (detail: AnalyticsDetail) => void };
  }
}

/** Dispatches on the shared `lotus:analytics` bus. Sets no cookies and stores nothing. */
export function track(name: string, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<AnalyticsDetail>(ANALYTICS_EVENT, { detail: { name, ...detail } }),
  );
}
