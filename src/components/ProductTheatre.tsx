"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Flex, Heading, Text } from "@once-ui-system/core";
import { JanusScreen, type JanusScreenId } from "@/components/janus/JanusScreen";

interface Chapter {
  id: string;
  screen: JanusScreenId;
  tabLabel: string;
  subhead: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "eval-path",
    screen: "logic-model",
    tabLabel: "Evaluation",
    subhead: "Logic models, indicators, and board reports in one workspace.",
    description:
      "Build your theory of change, track outcomes against it, and export reports that cite the source data in your workspace. No re-typing into funder portals.",
  },
  {
    id: "grant-tracker",
    screen: "grant-classifier",
    tabLabel: "Grant Management",
    subhead: "Milestones, artifacts, and grant reports in one audit trail.",
    description:
      "Log what your program delivered, attach evidence files, and match funder reporting schedules, so program officers are not reconciling spreadsheets at quarter-end.",
  },
  {
    id: "strat-path",
    screen: "strategy",
    tabLabel: "Strategy",
    subhead: "Portfolio-level theory of change (coming soon).",
    description:
      "See how individual grants connect to foundation-wide outcomes. On our roadmap for funders managing multi-program portfolios.",
  },
  {
    id: "guide-path",
    screen: "guidance",
    tabLabel: "Guidance",
    subhead: "Drafting help that only uses your uploaded sources.",
    description:
      "Janus Guidance suggests logic model language and report sections based on files your team has already verified, not generic text from the open web.",
  },
];

const AUTO_MS = 6000;

export const ProductTheatre: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fadeState, setFadeState] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setFadeState(false);
    setProgress(0);
    progressRef.current = 0;
    setTimeout(() => {
      setActiveIdx(idx);
      setFadeState(true);
    }, 150);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeIdx restarts the auto-advance timer so the progress bar resets when the tab changes.
  useEffect(() => {
    if (!mounted || isHovered || reducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    progressRef.current = 0;
    setProgress(0);

    const tick = 50;
    intervalRef.current = setInterval(() => {
      progressRef.current += tick;
      setProgress(Math.min(100, (progressRef.current / AUTO_MS) * 100));
      if (progressRef.current >= AUTO_MS) {
        progressRef.current = 0;
        setProgress(0);
        setFadeState(false);
        setTimeout(() => {
          setActiveIdx((prev) => (prev + 1) % CHAPTERS.length);
          setFadeState(true);
        }, 150);
      }
    }, tick);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, reducedMotion, activeIdx, mounted]);

  const activeChapter = CHAPTERS[activeIdx];

  return (
    <Flex
      direction="column"
      gap="32"
      fillWidth
      className="he-product-theatre"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <Flex
        direction="column"
        role="tablist"
        fillWidth
        className="product-theatre-tabs product-theatre-tablist"
        style={{ position: "sticky", top: "72px", zIndex: 2, backgroundColor: "var(--he-paper, var(--neutral-background))", paddingBottom: "8px", paddingTop: "4px" }}
      >
        <Flex
          direction="row"
          fillWidth
          className="product-theatre-tabrow"
          style={{ borderBottom: "1px solid var(--neutral-border-weak)", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}
        >
          {CHAPTERS.map((chap, idx) => (
            <button
              type="button"
              key={chap.id}
              role="tab"
              aria-selected={idx === activeIdx}
              aria-controls={`panel-${chap.id}`}
              id={`tab-${chap.id}`}
              onClick={() => goTo(idx)}
              className={`theatre-tab ${idx === activeIdx ? "active" : ""}`}
            >
              {chap.tabLabel}
              {chap.id === "strat-path" ? (
                <span className="theatre-tab-badge" aria-hidden>
                  Soon
                </span>
              ) : null}
            </button>
          ))}
        </Flex>
        {!reducedMotion && (
          <div className="tab-progress-track" aria-hidden>
            <div className="tab-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </Flex>

      <Flex direction="row" gap="48" fillWidth className="he-product-theatre__body" style={{ flexWrap: "wrap-reverse", alignItems: "center" }}>
        <Flex
          direction="column"
          gap="20"
          role="tabpanel"
          id={`panel-${activeChapter.id}`}
          aria-labelledby={`tab-${activeChapter.id}`}
          style={{
            flex: "1 1 380px",
            opacity: fadeState ? 1 : 0,
            transform: fadeState ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
        >
          <Heading as="h3" variant="heading-strong-s" style={{ margin: 0, color: "var(--brand-primary)" }}>
            {activeChapter.subhead}
          </Heading>
          <Text variant="body-default-m" style={{ lineHeight: "1.6", color: "var(--neutral-text-medium)", maxWidth: "460px" }}>
            {activeChapter.description}
          </Text>
        </Flex>

        <Flex
          style={{
            flex: "1 1 520px",
            opacity: fadeState ? 1 : 0,
            transform: fadeState ? "scale(1)" : "scale(0.98)",
            transition: "opacity 200ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {mounted && <JanusScreen screen={activeChapter.screen} variant="default" />}
        </Flex>
      </Flex>
    </Flex>
  );
};
