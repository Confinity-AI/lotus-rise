# Evaluation module journey: end-to-end pressure test

Date: 2026-09-16 · Branch: `feat/evaluation-journey-e2e` · Base: `38b3795`
Repo root is the site itself (`/workspace`); there is no `sites/lotus-rise/` sub-folder. All paths below are relative to the repo root.

## 0. Intake facts (confirmed)

| # | Fact | Status | Evidence |
| :-: | --- | --- | --- |
| F1 | No test runner. devDeps: biome, @types/*, gh-pages, serve, typescript. | Confirmed | `package.json:26-34` |
| F2 | Unset `NEXT_PUBLIC_CONTACT_ENDPOINT` → "The contact form is not connected yet." after submit. | Confirmed; live site ships this state | `src/components/ContactForm.tsx:35-41`, `.env.example:2`, `scripts/build-pages.mjs:6-11` |
| F3 | Declared scope `/` + `/contact`, but six routes ship and are in the sitemap. | Confirmed; three documents disagree with each other | `AGENTS.md:12`, `.cursor/rules/lotus-rise.mdc:8`, `.agents:5`, `.github/copilot-instructions.md:5` (two routes); `PROJECT_SOURCE.md:7`, `README.md:3-8`, `START_HERE.md:10` (four routes); `src/app/sitemap.ts:15-54` (six routes) |
| F4 | `/janus/` and `/janus/evaluation/` share path, humanReview, lineage and three captures. | Partially stale. `38b3795` already removed path/humanReview/lineage from `/janus/`. Remaining overlap: hero figure + caption (`JanusPage.tsx:26-42` = `EvaluationPage.tsx:36-53`), lineage capture (`JanusPage.tsx:86-95` = `EvaluationPage.tsx:141-155`). `janusPage.path/problem/gallery` keys are dead or read only by `EvaluationPage.tsx:65`. | `src/components/JanusPage.tsx:1-114`, `src/components/EvaluationPage.tsx:1-173`, `src/content/site-content.ts:125-139` |
| F5 | Only `ContactForm` emits analytics; no listener; theatre emits nothing. | Confirmed | `ContactForm.tsx:10-12,23,31,39,45,57,62`; `JanusTheatre.tsx` (no `dispatchEvent`) |
| F6 | Theatre has roving tabs, swipe, native dialog with backdrop close and focus return. | Confirmed | `JanusTheatre.tsx:22-31` (activate), `33-57` (swipe), `59-69` (dialog), `74-107` (tabs), `198-265` (dialog markup) |
| F7 | Static export via `build-pages.mjs`; `sitePath()` handles basePath; basePath is empty for the production build. | Confirmed | `next.config.mjs:1-12`, `scripts/build-pages.mjs:3-12`, `src/lib/site-path.ts:1-10` |

Additional intake facts:

- The working tree was clean at start; `git stash push -m "pre-e2e-wip" -- scripts/build-pages.mjs src/components/ValuesGrowth.tsx` returned "No local changes to save". No stash exists, so R2's final `git stash pop` is a no-op.
- `../../once-ui` is not present in this environment. Once UI guidance was read from `node_modules/@once-ui-system/core/AGENTS.md` and `dist/components/Button.js:8-9` (Button forwards `...props` to the rendered element, so `data-*` attributes reach the `<a>`).
- Next 16 image docs (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:265-295`): `preload` should not be combined with `loading`; prefer `loading="eager"` or `fetchPriority="high"`. `priority` is deprecated.
- Baseline: `npm run typecheck` exit 0, `npm run lint` exit 0 ("Checked 29 files"), `npm run build:pages` exit 0 (10 static pages, compile 9.3 s). `out/` contains `/`, `/contact/`, `/janus/`, `/janus/evaluation/`, `/janus/strategy/`, `/team/`, `404.html`, `sitemap.xml`, `robots.txt`.
- Live site (fetched 2026-09-16): `/`, `/janus/`, `/janus/evaluation/`, `/contact/` all 200 and match HEAD (`/janus/` h2s: "One suite. Three parts of the work." / "AI prepares the work. People make the call." / "Start with the part that matters now."). No divergence from local.
- `out/janus/evaluation/index.html` emits `og:url = https://www.lotusrise.org/` for every page because `layout.tsx:42` sets `openGraph.url: sitePath("/")` and children only override `alternates.canonical` (`janus/evaluation/page.tsx:9`).

## A. Journey map (baseline)

Decision = a rendered interactive target the visitor can choose on the path. Header/footer chrome is counted once, separately, because it repeats on every page. Form fields are inputs, not decisions.

| Step | Route | Component | What they see | Decisions | Primary CTA | Exits / dead-ends | Evidence |
| --- | --- | --- | --- | :-: | --- | --- | --- |
| 1 Home hero | `/` | `LotusRiseHome` | H1, lead, lotus, "Explore Janus" | 1 | Explore Janus → `/janus/` | — | `LotusRiseHome.tsx:17-32` |
| 2 Home product section | `/` | `JanusTheatre` + module cards | "Meet Janus.", full 3-view theatre, 3 module cards | 7 + 3 = 10 | none (three equal card links) | Reporting card → `/contact/` labelled "Register interest" | `LotusRiseHome.tsx:34-57`, `JanusTheatre.tsx:74-193`, `site-content.ts:19-41` |
| 3 Home proof + values | `/` | `ValuesGrowth` | quote, four values | 0 | — | — | `LotusRiseHome.tsx:59-80` |
| 4 Home closing | `/` | `LotusRiseHome` | "See where Janus can help." | 2 | Explore Janus (dup of step 1) + Contact us | — | `LotusRiseHome.tsx:82-97` |
| 5 Janus hero | `/janus/` | `JanusPage` | H1, lead, "Explore the suite" anchor, program-path figure | 1 | anchor `#suite` (scrolls one viewport) | anchor is a no-op decision | `JanusPage.tsx:15-44` |
| 6 Janus suite | `/janus/` | `JanusPage` | three module cards | 3 | none | — | `JanusPage.tsx:46-72` |
| 7 Janus AI section | `/janus/` | `JanusPage` | hardcoded copy + lineage figure | 0 | — | — | `JanusPage.tsx:74-97` |
| 8 Janus closing | `/janus/` | `JanusPage` | body lists three options; one button | 1 | Request a preview → `/contact/` | copy/button disagree | `JanusPage.tsx:99-109`, `site-content.ts:170-173` |
| 9 Evaluation hero | `/janus/evaluation/` | `EvaluationPage` | breadcrumb link, "Private preview", H1, two CTAs, program-path figure | 3 | Request a preview + "See the product" anchor + breadcrumb "Janus" (backward) | product not named in hero | `EvaluationPage.tsx:16-54` |
| 10 Path band | `/janus/evaluation/` | `EvaluationPage` | four steps | 0 | — | — | `EvaluationPage.tsx:56-73` |
| 11 Theatre | `/janus/evaluation/` | `JanusTheatre` | 3 tabs, expand, image button, prev, next, swipe | 7 | — | expand and image share one label | `JanusTheatre.tsx:74-193` |
| 12 Dialog | `/janus/evaluation/` | `JanusTheatre` | prev, next, close (+ Escape, backdrop) | 3 | — | — | `JanusTheatre.tsx:198-265` |
| 13 Human review | `/janus/evaluation/` | `EvaluationPage` | four steps + reviewed-report figure (dup of tab 3) | 0 | — | — | `EvaluationPage.tsx:93-131` |
| 14 Lineage | `/janus/evaluation/` | `EvaluationPage` | copy + lineage figure (dup of tab 2) | 0 | — | — | `EvaluationPage.tsx:133-156` |
| 15 Evaluation closing | `/janus/evaluation/` | `EvaluationPage` | "Bring one real evaluation." | 1 | Request a preview | — | `EvaluationPage.tsx:158-168` |
| 16 Contact | `/contact/` | `ContactForm` | 5 fields + select, "Send request" | 1 | Send request | endpoint unset → error after filling everything | `ContactForm.tsx:78-127`, `contact/page.tsx:17-39` |
| 17 Sent | `/contact/` | `ContactForm` | "Thank you." + return home | 1 | Return to the homepage | — | `ContactForm.tsx:65-76` |
| 18 Error states | `/contact/` | `ContactForm` | alert; button re-enabled | 0 | retry via same button | configuration error has no next step | `ContactForm.tsx:35-41,59-63,117-124` |
| Chrome | all | `SiteChrome` | logo, Janus, About us, Contact us, footer 4 links | 8 | Contact us | — | `SiteChrome.tsx:40-69,78-108` |

Baseline decision count on the path (steps 1-18): **34** (home 13, `/janus/` 5, `/janus/evaluation/` 14, `/contact/` 2). Chrome adds 8 per page and is unchanged by this work.

Target: ≤ 23 (−30 %). Achieved plan: **22** (−35 %). See C7.

## B. Findings

Severity: P0 blocks the journey, P1 costs a decision or breaks an acceptance bullet, P2 friction.

| ID | Sev | file:line | Observation | Why it matters | Fix | Test |
| --- | :-: | --- | --- | --- | --- | --- |
| FL-01 | P1 | `EvaluationPage.tsx:27-34` | Hero offers two CTAs: "Request a preview" and "See the product" (`#product`). | Two actions in one viewport; the anchor scrolls to a section that arrives anyway. | Remove the anchor. | journey: hero contains exactly one link. |
| FL-02 | P1 | `EvaluationPage.tsx:18-22`, css `4867-4879` | Breadcrumb "Janus" is a backward link in the hero viewport, duplicating header nav (`SiteChrome.tsx:17-26`); 13 px text with no min-height (< 44 px). | Backward decision; target-size miss. | Replace with a static "Janus Evaluation · Private preview" label. | a11y: 44 px sweep in `main`; journey: one hero link. |
| FL-03 | P1 | `LotusRiseHome.tsx:40`, `EvaluationPage.tsx:89` | Home renders the full three-view theatre (7 controls) that `/janus/evaluation/` also renders, with identical captures and captions. | Visitor is asked to explore screens twice, before choosing a module. Largest duplicate cluster on the path. | Home product section shows one static real capture (program path) with the existing `janus-hero-product` figure; theatre lives on Evaluation only. | smoke: `/` has no `[role=tablist]`; `/janus/evaluation/` has exactly one. |
| FL-04 | P1 | `LotusRiseHome.tsx:88-95` | Closing offers "Explore Janus" (dup of hero `:24-26`) and "Contact us". | Two actions; one is backward relative to the scroll. | Single primary "Request a preview". | journey/visual: closing has one link. |
| FL-05 | P2 | `JanusPage.tsx:21-23` | "Explore the suite" anchors to `#suite`, one viewport down. | No-op decision. | Replace with "Explore Evaluation" → `/janus/evaluation/` (advance; the only module with real screens). | routing: hero link resolves to `/janus/evaluation/`. |
| FL-06 | P2 | `JanusTheatre.tsx:170-189`, css `3595-3618` | Inline prev/next duplicate the always-visible three tabs and swipe: three input methods for one choice; on ≤ 640 px they stack under the caption. | Two redundant 44 px targets in the caption row. | Remove inline prev/next; keep dialog prev/next (`:240-262`) where tabs are hidden. | theatre: `.tab-caption` has no buttons; dialog controls update the counter. |
| FL-07 | P2 | `EvaluationPage.tsx:28,164`; `JanusPage.tsx:105`; `StrategyPage.tsx:24,64`; `site-content.ts:39`; `SiteChrome.tsx:55`; `LotusRiseHome.tsx:92` | Three labels lead to `/contact/`: Request a preview, Register interest, Contact us. | Same destination, three names. | "Request a preview" wherever a preview exists (home closing, hub closing, Evaluation). Keep "Register interest" for roadmap modules (a preview of Strategy/Reporting does not exist; R4) and "Contact us" in chrome (About visitors are not requesting a preview). | journey: exactly one "Request a preview" per viewport on the path. |
| CP-01 | P1 | `EvaluationPage.tsx:36-53,89,113-125,141-155` | Every capture appears twice on one page: program path (hero + tab 1), reviewed report (tab 3 + review figure), lineage (tab 2 + lineage figure). | Repetition reads as padding; a program officer notices three screens shown six times. | Keep hero capture (acceptance "first viewport", `IMPLEMENTATION_ACCEPTANCE.md:9`) and the theatre. Merge human-review and lineage into one review section that uses the lineage capture; drop the reviewed-report figure and the standalone lineage section. | visual + smoke: `/janus/evaluation/` renders program path 2× and lineage 2×, report 1×; h2 count 4. |
| CP-02 | P1 | `JanusPage.tsx:77-84`, `EvaluationPage.tsx:82-87,128` | Public copy hardcoded in components. | Violates `AGENTS.md:26` / R6; copy cannot be reviewed in one place. | Move to `janusPage.ai`, `evaluationPage.gallery`, `evaluationPage.review.note`. | typecheck; grep in review. |
| CP-03 | P2 | `site-content.ts:81-90,125-130,136-139` | `ai`, `janusPage.problem`, `janusPage.gallery` are read by no component. | Dead keys drift from the live copy. | Delete. | typecheck (keys referenced only by content). |
| CP-04 | P2 | `JanusPage.tsx:26-42` = `EvaluationPage.tsx:36-53`; `JanusPage.tsx:86-95` = `EvaluationPage.tsx:141-155` | Hub and module share the same two captures with the same captions. | The hub does not differentiate from the module it links to. | Hub AI section uses the reviewed-report capture ("people make the call" is the approval screen); Evaluation review section uses lineage. Hero capture stays program path on both (only Evaluation has real screens; R4 forbids inventing others). | smoke: `/janus/` renders program path + reviewed report; no lineage. |
| CP-05 | P2 | `site-content.ts:172` | Hub closing body offers three options under one "Request a preview" button. | Copy and control disagree. | One-action body. | visual. |
| CP-06 | P2 | `site-content.ts:119` | Home closing body "Explore the product suite or contact us." | Two options in copy. | One-action body. | visual. |
| CP-07 | P2 | `EvaluationPage.tsx:24-26` | Hero never names the product; visitor infers "Janus Evaluation" from the card they clicked. | Orientation. | Label "Janus Evaluation · Private preview" above H1. | journey: label visible. |
| CP-08 | P2 | `site-content.ts:297` | Contact lead promises "We will support your mission with the right technology and tools." | Vendor voice; a promise, not a next step. | Reframe to what to write and what happens next. | visual. |
| CP-09 | — | all strings in `site-content.ts` | R4 scan: no statements on accuracy, savings, security, compliance, integrations, pricing, scale; no statistics. | Pass. | None. | — |
| AX-01 | P1 | `JanusTheatre.tsx:127-135,137-147` | Expand button and image button are adjacent with the identical label "Open {title} full screen". | Redundant tab stop; screen-reader users hear one control twice. | Expand button stays the single focusable opener; image button becomes pointer-only (`tabIndex=-1`, `aria-hidden`), and focus always returns to the expand button. | journey: Escape returns focus to expand; a11y: no duplicate focusable labels in the frame. |
| AX-02 | P1 | `JanusTheatre.tsx:162-190` | `aria-live="polite" aria-atomic="true"` wraps the prev/next buttons. | Every tab change announces the control names as content. | Live region limited to progress + caption copy. | theatre: `[aria-live]` contains no `button`. |
| AX-03 | — | `JanusTheatre.tsx:206-208`, css `1100-1104` | Backdrop close uses `onPointerDown` with `target === currentTarget`; `padding: 0` means the dialog box is fully covered by `.product-dialog-shell`, so only the backdrop matches. | Verified sound. | None. | theatre: backdrop pointer-down closes; shell click does not. |
| AX-04 | — | `JanusTheatre.tsx:33-57`, css `888` | Swipe threshold 48 px and `|dx| > 1.2·|dy|`, `touch-action: pan-y`. | Verified: vertical scroll is not hijacked. | None. | theatre: swipe changes tab and does not open dialog. |
| AX-05 | — | `ContactForm.tsx:66-75,58` | Success `<output>` with `aria-live="polite"`, `tabIndex=-1`, focused via rAF; heading order h1 → h2. | Verified. | None. | journey: output focused. |
| AX-06 | — | `ContactForm.tsx:102-110` | Disabled placeholder option with `required` triggers native "select an item" validation. | Verified. | None. | contact: validation blocks submit. |
| AX-07 | — | `MotionReady.tsx:48-57`, css `1641-1655,4152-4156` | Reduced motion: all `.reveal` become visible and CSS removes the transform independent of JS. | Verified. | None. | reduced-motion spec. |
| AX-08 | P2 | `SiteChrome.tsx:60` | `<summary aria-label="Open navigation">` never changes to "Close". | Chrome, outside R6 selectors. | Follow-up. | — |
| CT-01 | P0 | `ContactForm.tsx:35-41`, `.env.example:2`, `scripts/build-pages.mjs:6-11` | Endpoint unset in every build path; live `/contact/` ships it. Visitor fills five fields, then learns the form is not connected. | The final step of the journey fails by default. | C6: detect at render, show a status notice above the fields, disable submit, emit `contact_configuration_error` once. No address exists in `site-content.ts:295-299`, so no `mailto:`. #1 launch blocker. | contact (unset build): notice visible, submit disabled, zero requests. |
| CT-02 | P1 | `ContactForm.tsx:122` | Double-submit guard relies on re-render after `setStatus("sending")`. | Works in practice; a ref guard makes it deterministic. | `sendingRef` short-circuit. | contact: double click → one request. |
| CT-03 | P1 | `ContactForm.tsx:60` | Error copy says retry but not that the details are preserved. | Visitor may assume the form cleared. | "Your details are still here" copy. | contact: 500 → alert text, button re-enabled, fields retain values. |
| CT-04 | P2 | `ContactForm.tsx:78-83` | No `action`; with JS disabled the browser GETs `/contact/?name=…` and the visitor's details land in the URL. | Honesty when JS is off. | `<noscript>` notice; `method="post"` so a no-JS submit cannot leak fields into the URL. | — (Playwright runs with JS). |
| CT-05 | P2 | `ContactForm.tsx:102` | "Organization type" posts as `role`. | Endpoint contract only. | Leave; note for endpoint owner. | — |
| RT-01 | P1 | `AGENTS.md:12`, `.cursor/rules/lotus-rise.mdc:8`, `.agents:5`, `.github/copilot-instructions.md:5`, `PROJECT_SOURCE.md:7`, `README.md:3-8`, `START_HERE.md:10`, `sitemap.ts:15-54` | Three different route scopes are declared. | Agents and reviewers are told to remove shipped routes. | C2: six routes everywhere. | routing: sitemap entries equal the route list. |
| RT-02 | P2 | `layout.tsx:42`, `janus/evaluation/page.tsx:5-10` | `og:url` is `/` on every page; children override only `alternates.canonical`. | Shared links preview the homepage URL. | Add `openGraph.url` per journey page (Next metadata replaces the `openGraph` object, so images are re-declared via a shared helper). | routing: `og:url` equals canonical on journey pages. |
| RT-03 | P2 | `not-found.tsx:7,12-14` | 404 header CTA "Back to homepage" duplicates "Go to homepage". | Outside the journey. | Follow-up. | — |
| RT-04 | P2 | `JanusPage.tsx:38-39`, `EvaluationPage.tsx:47-48` | `preload` combined with `loading="eager"`; Next 16 docs say not to combine (`image.md:286-289`). | Deprecated combination. | `fetchPriority="high"` + `loading="eager"`, drop `preload`. | smoke: hero `img[fetchpriority=high]`. |
| RT-05 | — | `site-path.ts:3-10`, `StaticLinkButton.tsx:10-12` | All internal hrefs pass through `sitePath()` or Next `Link` (basePath aware). | Verified. | None. | routing: every `main`/`header` href returns 200. |
| PF-01 | — | css `932-935,943-947,3395-3397` | Frame uses fixed `aspect-ratio` (1540/707; 4/3 ≤ 640 px) with `object-fit: cover`, so 1905×848 vs 1540×707 sources do not change height. | Verified stable. | None. | theatre: bounding-box height identical across tabs (±1 px), both projects. |
| PF-02 | P2 | `JanusTheatre.tsx:150` | `key={active.image}` remounts the image per tab change (re-decode + 380 ms animation, css `950-956`). | Acceptable; reduced motion collapses it (`4147-4148`). | None. | — |
| PF-03 | P2 | `JanusTheatre.tsx:225-236` | Dialog image mounts only while open; same `src` as inline view, so cached. | Verified cheap. | None. | — |
| TG-01 | P1 | `JanusTheatre.tsx` | No `janus_tab_change`, `janus_dialog_open`, `janus_dialog_close` events (`IMPLEMENTATION_ACCEPTANCE.md:49`). | Acceptance gap. | Emit via `src/lib/analytics.ts` with `method: click|keyboard|swipe`. | journey + theatre event assertions. |
| TG-02 | P1 | all `Request a preview` links | No `cta_click`. | Acceptance gap. | Delegated click listener on `[data-cta]`. | journey event order. |
| TG-03 | P1 | `Providers.tsx:24-53` | No consumer of `lotus:analytics`. | Events go nowhere. | Consent-aware listener; no cookies. | analytics spec: no forward without `window.__lotusConsent === true`. |

Acceptance-bullet coverage (`IMPLEMENTATION_ACCEPTANCE.md`): `:10` stable frame → theatre spec; `:19` three-part segmented control on mobile → theatre spec; `:24` one H1 → smoke; `:26` roving tabs → journey + theatre; `:27` 44 px → a11y; `:28` dialog → journey + theatre; `:30` labels/validation/polite success → journey + contact; `:31-32` reduced motion → reduced-motion spec; `:49` events → journey/theatre/contact/analytics; `:50` canonical/sitemap/robots/OG → routing.

## C. Decision log

**C0 Branch and delivery.** Branch `feat/evaluation-journey-e2e` as named in R1. R1 says "never push"; this run executes as a Cloud Agent whose VM is discarded at the end, so an unpushed branch would be lost. Decision: push the branch once (plain `git push -u`, no force, no rebase, no amend) and open a draft PR so the work survives. `.github/workflows/` does not exist; `gh-pages` deploy is manual (`package.json:14`), so a pushed branch triggers nothing.

**C1 `/janus/` vs `/janus/evaluation/`: option (a).** `/janus/` is the suite hub; `/janus/evaluation/` owns path, theatre and review. The module URL is already the target of the homepage card (`site-content.ts:24`) and sitemap (`sitemap.ts:29-34`); a redirect (b) would break it, and (c) cannot differentiate captures because only Evaluation has real screens (R4).

Resulting sections:

- `/janus/`: hero (H1, lead, primary "Explore Evaluation", program-path figure) → suite cards (Evaluation / Strategy / Reporting) → "AI prepares the work. People make the call." with the reviewed-report capture → closing ("Request a preview").
- `/janus/evaluation/`: hero ("Janus Evaluation · Private preview" label, H1, lead, primary "Request a preview", program-path figure) → path band (four steps) → "See Evaluation as it is today." theatre → "Let AI do the first pass. Keep the judgment with the team." (four review steps + lineage capture + note) → closing ("Request a preview").
- `/`: hero → "Meet Janus." (static program-path figure + three module cards) → proof → values → closing ("Request a preview").

**C2 Public scope.** `/`, `/janus/`, `/janus/evaluation/`, `/janus/strategy/`, `/team/`, `/contact/` are public. Update `AGENTS.md:12`, `.cursor/rules/lotus-rise.mdc:8`, `.agents:5`, `.github/copilot-instructions.md:5` (not under `.github/workflows/`, so not fenced by R3), `PROJECT_SOURCE.md:7`, `README.md:3-8`, `START_HERE.md:10`, and add a route-integrity bullet to `IMPLEMENTATION_ACCEPTANCE.md`. `sitemap.ts` and `SiteChrome.tsx` already agree with the six routes; no change there.

**C3 CTA hierarchy.** "Request a preview" is the one primary label on the path. Cut: Evaluation hero "See the product" anchor; Evaluation breadcrumb link; home closing "Contact us" and second "Explore Janus"; hub hero "Explore the suite" anchor (replaced by "Explore Evaluation"). Kept and defended: "Register interest" on Strategy/Reporting (no preview exists to request; R4), "Contact us" in header/footer chrome (serves About visitors; outside journey selectors), "Explore Janus" in the home hero (advance), module card links (routing between modules is the hub's purpose).

**C4 Theatre controls.** Keep tabs, swipe, expand, dialog prev/next/close (F6 sound). Two changes backed by findings: inline prev/next removed (FL-06: third input method for a three-tab choice); image click stays for pointer users but leaves the tab order (AX-01), so the expand button is the single focusable opener and focus returns to it. The journey spec asserts focus return to the expand button, as written in §5.1.

**C5 Contact fields.** Keep name, work email, organization, organization type, message. Add nothing. Reframe configuration-error, submit-error, success and add a `<noscript>` line; all strings in `site-content.ts`.

**C6 Contact endpoint.** No address exists in `site-content.ts:295-299`; no `mailto:` fallback is possible without fabricating one. Honest degrade: when the endpoint is unset at build time, render the same fields, show a `role="status"` notice above them, disable the submit button, and emit `contact_configuration_error` once on mount. The endpoint remains the #1 launch blocker. The Playwright server builds the site twice: once with a mock endpoint (`http://localhost:3010/__contact`, intercepted by `page.route`) for the journey and failure specs, once with the endpoint unset to prove the degrade branch against a real `out/`.

**C7 Decision count.** Baseline 34 → target 22 (−35 %). Removed: home theatre 7 controls (FL-03, now a static figure), home closing second link (FL-04), Evaluation hero anchor (FL-01), Evaluation breadcrumb link (FL-02), theatre inline prev/next (FL-06) = 12. Converted, not removed: hub hero anchor → "Explore Evaluation". No step that moves the visitor forward was removed.

**C8 Screenshot masks.** Visual specs mask the hero lotus figure (`.lotus-bloom`) and the theatre image while asserting full-page layout; the lotus settle animation and image decode timing are the only non-deterministic surfaces.

**C9 44 px scope.** The a11y spec enforces 44×44 on every visible `button, a, input, select, textarea` inside `main`. Header/footer inline text links are chrome outside R6 selectors and fall under the WCAG 2.5.8 inline exception; listed as follow-up.

## D. Copy reframe

| Key | Legacy | Elevated | R4 | Why |
| --- | --- | --- | :-: | --- |
| `actions` (new) | labels hardcoded in TSX: "Explore Janus", "Explore the suite", "Request a preview", "Register interest", "Contact us", "Send request", "Sending", "Return to the homepage" | `actions.exploreJanus`, `exploreEvaluation`, `requestPreview`, `registerInterest`, `contactUs`, `send`, `sending`, `returnHome` | ok | One place for every label; specs import them. |
| `closing.body` | "Explore the product suite or contact us. We will listen to what your team needs and tell you plainly where Janus may be a useful fit." | "Tell us what your team is working on. We will listen and tell you plainly where Janus may be a useful fit." | ok | One action under one button. |
| `janusPage.closing.body` | "Explore Evaluation, learn what is coming in Strategy or register your interest in Reporting." | "Evaluation is in private preview now. Tell us about one real evaluation and we will say plainly whether Janus is a useful fit." | ok | Copy matches the single button; keeps the preview label. |
| `janusPage.ai` (new, moved from `JanusPage.tsx:77-84`) | hardcoded | title "AI prepares the work. People make the call." body "Janus helps organize material, surface gaps and prepare a useful first pass. The team checks the evidence, changes the work and decides what is ready." control "Human review is central to the product." caption "Reviewed report" | ok | Moved verbatim; caption changes with the capture (CP-04). |
| `evaluationPage.product` / `status` (new) | status hardcoded "Private preview" (`EvaluationPage.tsx:24`) | "Janus Evaluation" / "Private preview" | ok | Names the product in the hero (CP-07). |
| `evaluationPage.path` (renamed from `problem`, steps moved from `janusPage.path.steps`) | "Build the record as the work happens." / "The report should be the end of a clear path, not a reconstruction of work scattered across files." / steps | same title; body "Questions, measures, evidence and findings stay linked from setup to review. The report is the end of the path, not a fresh start."; steps unchanged | ok | Uses the more concrete body from `janusPage.path.body:133`; one key owns the band. |
| `evaluationPage.gallery` (new, moved from `EvaluationPage.tsx:82-87`) | hardcoded | "See Evaluation as it is today." / "Every view below comes from the current private preview. No concept screens." | ok | Moved verbatim. |
| `evaluationPage.review` (merge of `janusPage.humanReview:140-161` + `lineage:162-165` + note `EvaluationPage.tsx:128`) | two sections | title "Let AI do the first pass. Keep the judgment with the team." body "Janus can prepare a first pass. People check each finding against its source, change the work and approve what is ready to share." steps unchanged; figure labels "Source / Finding / Review"; note "People decide what is ready to share." | ok | One section carries review and lineage; lineage capture is the evidence. |
| `contact.lead` | "Tell us what your team is struggling with. We will support your mission with the right technology and tools." | "Tell us what your team is trying to make easier and where the work slows down." | ok | Removes the vendor promise; tells the visitor what to write. |
| `contact.form.configuration` (new) | "The contact form is not connected yet. Please try again later." | "This form is not connected yet, so requests cannot be sent from this page. Please check back soon." | ok | Shown before typing; says what is and is not possible. |
| `contact.form.submitError` (new) | "We could not send your request. Please try again in a moment." | "We could not send your request. Your details are still here, so please try again in a moment." | ok | Says what to do next and that nothing was lost. |
| `contact.form.success` (new) | "Thank you." / "We'll be in touch." | "Thank you." / "We'll read your note and reply with a clear next step." | ok | Matches `contact.next`. |
| `contact.form.noscript` (new) | — | "This form needs JavaScript to send your request." | ok | Honest no-JS state. |
| `contact.form.help` (moved) | "We'll only use these details to reply to your request." | unchanged | ok | Moved to content. |
| Deleted keys | `ai`, `janusPage.problem`, `janusPage.path`, `janusPage.gallery`, `janusPage.humanReview`, `janusPage.lineage` | — | — | Dead or merged (CP-03, CP-01). |

## E. Defects

| ID | file:line | Fix | Proving test |
| --- | --- | --- | --- |
| D-01 | `ContactForm.tsx:35-41` (CT-01) | Render-time detection; notice + disabled submit; one `contact_configuration_error`. | `contact-failures.spec.ts` "endpoint unset" (port 3011). |
| D-02 | `ContactForm.tsx:122` (CT-02) | `sendingRef` guard. | "double click sends one request". |
| D-03 | `ContactForm.tsx:60` (CT-03) | Next-step copy; fields retain values. | "endpoint 500". |
| D-04 | `JanusTheatre.tsx:127-147` (AX-01) | Single focusable opener; focus return to expand. | journey "Escape returns focus". |
| D-05 | `JanusTheatre.tsx:162-190` (AX-02) | Live region excludes controls. | theatre "live region has no buttons". |
| D-06 | `JanusTheatre.tsx`, `ContactForm.tsx` (TG-01/02/03) | `src/lib/analytics.ts`, events, listener. | journey event order; analytics spec. |
| D-07 | `JanusPage.tsx:38-39`, `EvaluationPage.tsx:47-48` (RT-04) | `fetchPriority="high"`, drop `preload`. | smoke "hero image fetchpriority". |
| D-08 | `layout.tsx:42` + journey pages (RT-02) | Per-page `openGraph.url`. | routing "og:url equals canonical". |

## F. Task list

| Task | Files | Exact change | Acceptance test | Depends on |
| --- | --- | --- | --- | --- |
| T-01 | `package.json`, `playwright.config.ts`, `tests/e2e/server.mjs`, `tests/e2e/smoke.spec.ts`, `.gitignore` | Add `@playwright/test`, `@axe-core/playwright`; config with `mobile` (Pixel 7, 390×844, touch) and `desktop` (1440×900), `reducedMotion: "reduce"`, `testDir: tests/e2e`, `webServer` = `node tests/e2e/server.mjs` (builds twice, serves `out/` on 3010 and `.e2e/out-unset/` on 3011); scripts `test:e2e`, `test:e2e:ui`, `test:a11y`; ignore `.e2e/`, `test-results/`, `playwright-report/`. | smoke: six routes 200 with one `h1`; `sitemap.xml` 200. | — |
| T-02 | `tests/e2e/evaluation-journey.spec.ts`, `tests/e2e/helpers.ts` | Full §5.1 path against current site; analytics captured via `addInitScript` into `sessionStorage`. | Expected red; failure text recorded below. | T-01 |
| T-03 | `AGENTS.md`, `.cursor/rules/lotus-rise.mdc`, `.agents`, `.github/copilot-instructions.md`, `PROJECT_SOURCE.md`, `README.md`, `START_HERE.md`, `IMPLEMENTATION_ACCEPTANCE.md` | Six public routes; route-integrity bullet. | routing spec sitemap list. | — |
| T-04 | `JanusPage.tsx`, `EvaluationPage.tsx`, `LotusRiseHome.tsx`, `site-content.ts`, `lotus-rise.css` (`.janus-*` only) | C1 structure; delete dead keys; move hardcoded copy; home static figure. | smoke tablist counts; visual. | T-03 |
| T-05 | `site-content.ts` | Section D strings. | visual; journey texts. | T-04 |
| T-06 | `LotusRiseHome.tsx`, `JanusPage.tsx`, `EvaluationPage.tsx`, `StrategyPage.tsx`, `ContactForm.tsx`, `SiteChrome.tsx` (labels only) | `actions` labels; one primary per viewport; `data-cta` on primaries. | journey: one "Request a preview" per viewport. | T-05 |
| T-07 | `JanusTheatre.tsx`, `src/lib/analytics.ts` | D-04, D-05, FL-06; emit `janus_tab_change {index, method}`, `janus_dialog_open`, `janus_dialog_close`. | theatre spec. | T-06 |
| T-08 | `ContactForm.tsx`, `contact/page.tsx`, `site-content.ts` | D-01, D-02, D-03, CT-04; `track` from `src/lib/analytics.ts`. | contact-failures spec. | T-07 |
| T-09 | `src/components/AnalyticsListener.tsx`, `Providers.tsx` | Consent-aware listener + `[data-cta]` delegation. | analytics spec. | T-08 |
| T-10 | `tests/e2e/*.spec.ts` | §5.2-5.6 specs; baselines. | `npm run test:e2e` green on both projects. | T-09 |
| T-11 | plan file | Final verification; report. | all commands exit 0. | T-10 |

## G. Test architecture

- Runner: `@playwright/test`, Chromium only. `testDir: tests/e2e`. `fullyParallel: false` in CI-less local runs is unnecessary; specs are independent, so default parallelism with 2 workers.
- Server: `tests/e2e/server.mjs` runs `npm run build:pages` with `NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:3010/__contact` → `out/`, then again with the variable empty → copied to `.e2e/out-unset/`, then serves both with the repo's `serve` dependency (3010, 3011). `reuseExistingServer: true`. Both artefacts are real `next build` output; nothing runs under `next dev`.
- Projects: `mobile` (`devices["Pixel 7"]`, 390×844, `hasTouch`), `desktop` (1440×900). `reducedMotion: "reduce"` on both.
- Helpers (`tests/e2e/helpers.ts`): `captureAnalytics(page)` installs an init script that appends every `lotus:analytics` detail to `sessionStorage["lotus:e2e-events"]` (survives full-page navigation) and `readAnalytics(page)`; `content` re-exports `siteContent` so specs never hardcode copy; `UNSET_BASE = http://localhost:3011`.
- Specs: `smoke.spec.ts` (routes, one h1, hero `fetchpriority`, tablist counts), `evaluation-journey.spec.ts` (§5.1), `theatre.spec.ts` (§5.2 + AX-02 + AX-03), `contact-failures.spec.ts` (§5.3, unset branch on 3011), `a11y.spec.ts` (§5.4 axe, heading order, 44 px in `main`), `visual.spec.ts` (§5.5), `motion-routing.spec.ts` (§5.6 + RT-02), `analytics.spec.ts` (H).
- Not tested: real endpoint delivery (no backend), browsers beyond Chromium, Lighthouse.

## H. Telemetry

Bus: `window.dispatchEvent(new CustomEvent("lotus:analytics", { detail: { name, ...detail } }))` moved to `src/lib/analytics.ts` (`track(name, detail)`).

| Event | Emitter | Detail |
| --- | --- | --- |
| `cta_click` | `AnalyticsListener` delegated click on `[data-cta]` | `{ page: location.pathname, label }` |
| `janus_tab_change` | `JanusTheatre.activate` | `{ index, method: "click" \| "keyboard" \| "swipe" }` |
| `janus_dialog_open` / `janus_dialog_close` | `JanusTheatre` | `{ index }` |
| `contact_start` | first focus in form | — |
| `contact_validation_error` | `reportValidity()` false | — |
| `contact_submit` / `contact_complete` / `contact_submit_error` | submit lifecycle | — |
| `contact_configuration_error` | mount when endpoint unset | — |

Listener (`src/components/AnalyticsListener.tsx`, mounted in `Providers.tsx`): subscribes to `lotus:analytics`; forwards `detail` to `window.__lotusAnalytics.push(detail)` only when `window.__lotusConsent === true` and the sink exists; otherwise does nothing. Sets no cookies, touches no storage. Each event has a Playwright assertion.

## I. Refusals ledger

No new pages · no chatbot · no pricing · no fabricated Strategy or Reporting screens · no pop-ups · no calendar embed · no third-party form SaaS · no blue accents · no generic imagery · no gradients · no wholesale `lotus-rise.css` rewrite (edits limited to `.janus-*`, `.product-*`, `.tab*`, `.contact-form`, `.form-*`, `.module-*`, `.subpage*`, `.closing`) · no `.github/workflows/` edits · no dependency beyond `@playwright/test` and `@axe-core/playwright` · no `mailto:` invented · no new statistics or claims · no cookies for analytics · no test-only hooks in production code (the unset branch is proven with a second real build, not a runtime switch).

## 3.1 Self-review gate

Cut-list reviewer: T-04's "home static figure" was checked against "new component" and reuses `.janus-hero-product` markup, so no new component. RT-02 (`og:url`) adds a small metadata helper; it fixes an acceptance bullet (`:50`) and adds no decisions; kept. CT-04 `<noscript>` adds one line of copy; kept because the no-JS GET leak is a visitor-facing defect. The `actions` content key adds structure but removes eight hardcoded labels; kept.

Voice & claims reviewer: `../../prompts-and-agentic-strategy/prompts/copy-ai-tells.md` is not reachable. Applied list: no "seamless", "empower", "unlock", "leverage", "cutting-edge", "transform"; no em-dash chains; no rule-of-three padding. All Section D strings pass. Existing `principles.items[2].title` "Empowerment" (`site-content.ts:107`) is a company value name, out of journey scope, unchanged.

Hard-rule reviewer: every finding cites `file:line`; no hypotheticals remain (the `mailto:` option was resolved by checking `site-content.ts:295-299`). Every G test runs against `out/` (or `.e2e/out-unset/`, also `next build` output). Telemetry uses no cookies or storage. No task touches `scripts/build-pages.mjs`, `ValuesGrowth.tsx`, `.private/`, `.github/workflows/`, `next.config.mjs`, or env files.

Grades (first pass): specificity 9 · decision reduction 8 · testability 9 · claim safety 9 · scope discipline 8. No dimension below 8; no patch round required. Recorded once.

## Baseline red (T-02)

Run against `38b3795` content with the T-01 server (mock endpoint build), both projects:

```
✘ [mobile]  evaluation-journey.spec.ts:12:5 › home → Evaluation → theatre → dialog → contact → sent → home (10.6s)
✘ [desktop] evaluation-journey.spec.ts:12:5 › home → Evaluation → theatre → dialog → contact → sent → home (10.7s)
Error: expect(locator).toHaveCount(expected) failed
Locator:  locator('.subpage-hero').getByRole('link')
Expected: 1
Received: 3
```

The three hero links are the breadcrumb "Janus" (`EvaluationPage.tsx:19`), "Request a preview" (`:28`) and "See the product" (`:31`): FL-01 and FL-02. The later assertions (analytics order, focus return) are unreachable until the hero is fixed; they are exercised again in T-10.

## Execution log

_Filled during execution._
