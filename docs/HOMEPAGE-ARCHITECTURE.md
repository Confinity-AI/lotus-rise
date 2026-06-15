# Lotus Rise — Homepage Architecture & Copywriting Ledger

**Owner:** Head of Copy & Brand Strategist  
**Last Updated:** June 2026 (v17 — single homepage master elevation)  
**Status:** Canonical Reference (Content Tier)

### Canonical route

- **Single homepage:** `/` only — `src/app/(main)/page.tsx` re-exports `src/components/home/HomePage.tsx`.
- **Section compositor:** `src/components/home/sections/*` + shared copy in `src/components/home/copy.ts`.
- **Styles:** `src/resources/custom.css` (`lr-page lr-v4` design system).
- **Removed:** `/home2`, `/home3`, `ArchiveBanner`, `Home2Components`, `Home3Components`.

### Product visuals (homepage)

Real **EvalPath UI screenshots** at `@2x` WebP in `public/images/product/` (sourced from evaltool v2 QA captures). Trust IP diagrams in `public/images/trust/`. No stock dashboards or developer chrome on `/`.

---

## 1. Homepage Scrolling Story Arc (12 beats)

```
[ Hero ]                 -> Split copy + hero DeviceFrame (Eval Path logic model)
          ↓
[ Trust strip ]          -> Partner marquee + ledger trust line
          ↓
[ Benefits trio ]        -> Pilot tools · curated services · data decisions
          ↓
[ Problem ]              -> Pain bullets + Eval Path relief (folds old ParadigmBattlecard)
          ↓
[ Product Theatre ]      -> 4-tab tour: Eval Path · Grant Tracker · Strat Path · GuidePath
          ↓
[ Feature spotlights ]   -> Grant Classifier + Grant Impact Reporting (alternating bands)
          ↓
[ Impact pipeline ]      -> 4-step horizontal tour with synced screenshots
          ↓
[ Trust center ]         -> 2×2 cards + D03/D05 diagrams + GuidePath screenshot
          ↓
[ Sectors ]              -> Funder · nonprofit · capacity bookmark cards with thumbnails
          ↓
[ Principles ]           -> Empowerment · Innovation · Integrity · Community (verbatim intent)
          ↓
[ Proof ]                -> JTF editorial quote + founder excerpt
          ↓
[ Process ]              -> 01–03 animated timeline with step screenshots
          ↓
[ Impact sandbox ]       -> Mid-funnel 10:1 calculator (before pricing)
          ↓
[ Pricing ]              -> Three bookmark tiers → /pricing
          ↓
[ Resources ]            -> About · products · sectors
          ↓
[ Footer CTA ]           -> “Ready to amplify your impact?” + Schedule a demo
```

Alternating section backgrounds: cream ↔ white; ink footer panel.

---

## 2. Key copy locks

| Element | Copy |
| :--- | :--- |
| Hero welcome | Grant reporting and evaluation software for foundations and nonprofits |
| Hero H1 | Logic models, outcomes, and grant reports in one place. *Your team keeps the files.* |
| Hero lead | Manage grant output, measure results, and make decisions based on real data, so you can focus on changing lives. |
| Hero CTAs | Schedule a demo · See the platform (#product-theatre) |
| Trust strip | Trusted by leading philanthropic organizations and programmatic evaluators |
| Trust H2 | An institutional grade of trust. |
| Feature A | Enhance predictability of grant outcomes — Grant Classifier |
| Feature B | Measure results effortlessly — Grant Impact Reporting |
| Pipeline intro | From data collection to funder-ready reports |
| Principles | Empowerment · Innovation · Integrity · Community (lotusrise.org intent) |
| JTF quote | Steve Fitzmier, John Templeton Foundation (field pilot) |
| Footer CTA | Ready to amplify your impact? · Schedule a demo |
| Pilot partner | John Templeton Foundation (hero trust line) |

Full section copy lives in `src/components/home/copy.ts` and `src/components/home/sections/*`.

---

## 3. Component map

| Section file | Reused components |
| :--- | :--- |
| `HeroSection.tsx` | `DeviceFrame` (hero), `LotusWatermark` |
| `ProductTheatreSection.tsx` | `ProductTheatre` |
| `ImpactPipelineSection.tsx` | `ImpactPipeline` |
| `ImpactSandboxSection.tsx` | `ImpactSandbox` |
| All sections | `SectionShell`, `SectionReveal` |

---

## 4. Assets

| Key | Path |
| :--- | :--- |
| Hero | `/images/product/hero-eval-path@2x.webp` |
| Trust diagrams | `/images/trust/product-loop@2x.webp`, `with-grounding-pipeline@2x.webp` |
| WebP generation | `node scripts/generate-product-webp.mjs` |

Editorial photography in `public/images/editorial/` remains for `/about` and sector pages — not used on homepage `/`.
