# Lotus Rise — Downstream Development & Agent Guide

**Owner:** Lead Technical Architect
**Last Updated:** June 2026
**Status:** Canonical Reference (Technical Tier)

---

## 1. Localhost Boot Configuration & Safety

This project is a **localhost-only, local-first prototype** hosted under `sites/lotus-rise/`. Because this template relies on Once UI Indie/PRO code (`magic-studio`), there is a strict **No-Drift / Private Git policy** in place.

### 1.1 Localhost Environment Guardrails
1.  **Dev Port: 3010**
    *   To prevent collision with other in-flight AmalgamSites:
        *   `3001` -> Graphyte
        *   `3002` -> Confinity-v3
        *   `3005` -> Evalpath (Janus product)
        *   `3010` -> **Lotus Rise Corporate (this site)**
    *   downstream agents must configure `package.json` with: `"dev": "next dev -p 3010"`
2.  **No Public Remote Repository:**
    *   Do **NOT** add a GitHub remote origin. Do **NOT** push this code to a public repository. The Once UI templates are protected under commercial license parameters and must stay private in local workspaces or secure private organization repos.
3.  **Local Index Protection:**
    *   Ensure `src/resources/seo.js` is configured with:
        *   `robots: { index: false, follow: false }`
        *   `meta: { noindex: true }`
    *   This prevents temporary local tunnels (e.g., ngrok or local-cert exposures) from accidentally leaking stubs to public search indexes.

---

## 2. Directory Structure After Scaffold

Once the bootstrap script (`new-once-ui-site.ps1`) runs, the directory will look like this. Use this map to coordinate code edits:

```
sites/lotus-rise/
├── AGENTS.md                  # This document (or referenced here)
├── README.md                  # Localhost startup directions
├── PROJECT_SOURCE.md          # magic-studio origin notes
├── package.json               # Locked: npm package manager, Next.js v15/16, Once UI
├── docs/                      # Professional strategic planning docs
│   ├── RESEARCH-AND-COMPETITORS.md
│   ├── BRAND-DESIGN-SYSTEM.md
│   ├── HOMEPAGE-ARCHITECTURE.md
│   ├── DEVELOPMENT-GUIDE.md    # (This file)
│   ├── SOCIETAL-IMPACT-POSITIONING.md # Category Moat, Omidyar & Nesta rules
│   ├── TRUST-SECURITY-FOUNDER-LETTER.md # Open Proof Protocol, Trust Center, Neeraj Letter
│   └── BUSINESS-PLAN-AND-VISION.md      # Corporate Business Plan & GTM Flywheel Strategy
├── public/                    # Static assets
│   └── images/                # Screenshots (Evalpath/Janus)
└── src/
    ├── app/                   # Next.js App Router (Light-mode locked)
    │   ├── page.tsx           # Homepage entry
    │   ├── layout.tsx         # Global provider chain
    │   ├── products/
    │   │   └── [slug]/        # Dynamic product stubs
    │   ├── sectors/
    │   │   └── [slug]/        # Dynamic sector stubs
    │   ├── pricing/
    │   │   └── page.tsx       # Detailed pricing matrix
    │   └── about/
    │       └── page.tsx       # Catalyst story, staff, advisory
    ├── components/            # Extracted/Adapted once-ui magic components
    │   ├── Header.tsx         # Products & Who We Serve dropdown menus
    │   ├── Footer.tsx         # Quiet, professional PBC copyright
    │   ├── ProductTheatre.tsx # THE CENTERPIECE: Auto-scrolling showcase
    │   └── ImpactCalculator.tsx # Interactive 3-step Wizard Widget
    ├── resources/
    │   ├── once-ui.config.js  # Theme, scaling, border rounding configs
    │   └── content/           # MDX text files for modular copy
    └── styles/
        └── global.scss        # Warm cream colors override
```

---

## 3. Once UI Core Component Mapping

Every section of the homepage must be composed out of canonical `@once-ui-system/core` components. **Do NOT write ad-hoc Tailwind classes or raw inline CSS values.**

Use this mapping guide when implementing `src/app/page.tsx`:

| Section | Layout Element | Once UI Core Components |
|:---|:---|:---|
| **Header** | Navigation | `<Header>`, `<Nav>`, `<Dropdown>`, `<Button>` |
| **Hero Hook** | Centerpiece Hero | `<Flex direction="column" gap="24">`, `<Heading as="h1">`, `<Text variant="body-large">`, `<Button>` |
| **Trust Strip** | Marquee / Grid | `<Flex align="center" justify="space-between">`, `<Tag variant="subtle">` |
| **Problem Statement**| Content block | `<Flex max-width="680" padding="y-128">`, `<Heading as="h2">` |
| **Product Theatre** | Custom interactive | See Section 4 of this file. Uses `<Flex>`, `<TabList>`, `<Tab>`, `<Transition>` |
| **Trust Center Block** | 3-column Grid | `<Grid columns="3" gap="32">`, `<Card variant="flat">` |
| **Who We Serve** | Grid | `<Grid columns="3" gap="32">`, `<Card variant="interactive">` |
| **Process Steps** | Stack | `<Flex direction="row" gap="48">`, `<StepIndicator>` or vertical numbers |
| **Steve Quote** | Centered block | `<Flex max-width="800">`, `<Text variant="serif-large">`, `<Avatar>` |
| **Founder Excerpt** | Left-Right split | `<Flex direction="row" gap="64">`, `<Text variant="serif-medium">`, `<Signature>` |
| **Guiding Principles**| 4-column Grid | `<Grid columns="4" gap="24">`, `<Card variant="flat">` |
| **Pricing Teaser** | Flex row | `<Flex gap="32" justify="center">`, `<Card variant="bookmark">` |
| **Resources** | Grid | `<Grid columns="3" gap="24">`, `<Card variant="news">` |
| **Calculator Widget** | Interactive Wizard| Custom `<ImpactCalculator>` component using state-driven `<Flex>` switches |
| **Footer CTA** | Block | `<Footer>`, `<Flex max-width="680">`, `<Button>`, `<Link>` |

---

## 4. Centerpiece Implementation: ProductTheatre.tsx

The interactive Janus Suite Showcase component is the most technically complex piece on the homepage. Below is the blueprint of how to build it inside Once UI:

```typescript
// src/components/ProductTheatre.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flex, Heading, Text, Transition } from "@once-ui-system/core";

interface Chapter {
  id: string;
  tabLabel: string;
  subhead: string;
  description: string;
  imageUrl: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "eval-path",
    tabLabel: "Eval Path",
    subhead: "Standardize your evaluation workflows.",
    description: "Design structured program logic models, log data collections, and compile board-ready reports automatically. Every claim is grounded in your workspace repository.",
    imageUrl: "/images/eval-path-snap.png"
  },
  // ... rest of chapters from HOMEPAGE-ARCHITECTURE.md §2.5
];

export const ProductTheatre: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % CHAPTERS.length);
  };

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 6000); // Auto-advance every 6 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <Flex
      direction="column"
      gap="48"
      width="full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* 1. Tab Bar Navigation */}
      <Flex role="tablist" justify="center" gap="16">
        {CHAPTERS.map((chap, idx) => (
          <button
            key={chap.id}
            role="tab"
            aria-selected={idx === activeIdx}
            aria-controls={`panel-${chap.id}`}
            id={`tab-${chap.id}`}
            onClick={() => setActiveIdx(idx)}
            className={`theatre-tab ${idx === activeIdx ? "active" : ""}`}
            style={{
              background: "none",
              border: "none",
              borderBottom: idx === activeIdx ? "2px solid var(--accent-primary)" : "2px solid transparent",
              padding: "12px 24px",
              cursor: "pointer",
              color: idx === activeIdx ? "var(--neutral-text-strong)" : "var(--neutral-text-medium)",
              fontFamily: "var(--font-label)",
              fontWeight: idx === activeIdx ? "bold" : "normal"
            }}
          >
            {chap.tabLabel}
          </button>
        ))}
      </Flex>

      {/* 2. Visual and Content Area */}
      <Flex direction="row" gap="48" align="center" width="full">
        {/* Text Details Pane */}
        <Flex direction="column" gap="16" width="40">
          <Transition state={true} type="fade-slide">
            <Heading as="h3" variant="h3">
              {CHAPTERS[activeIdx].subhead}
            </Heading>
            <Text variant="body-medium" color="medium" style={{ maxWidth: "420px" }}>
              {CHAPTERS[activeIdx].description}
            </Text>
          </Transition>
        </Flex>

        {/* Screenshot Viewport Pane */}
        <Flex width="60" style={{ border: "1px solid var(--neutral-border-medium)", borderRadius: "var(--border-radius-conservative)", overflow: "hidden" }}>
          <Transition state={true} type="fade">
            <img 
              src={CHAPTERS[activeIdx].imageUrl} 
              alt={`Janus ${CHAPTERS[activeIdx].tabLabel} Interface Preview`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Transition>
        </Flex>
      </Flex>
    </Flex>
  );
};
```

### 4.2 Mobile Touch & Reduced Motion fallbacks
*   **Touch Swiping:** On screens smaller than `768px`, the split desktop layout transitions to a vertical stack. Swiping the image area triggers `handleNext()` or `handlePrev()`.
*   **Accessibility (Reduced Motion):** If the browser reports `prefers-reduced-motion: reduce`, the `6000ms` auto-advancing interval is **completely disabled**. Transitions between chapters toggle instantly without opacity fade-slides.
