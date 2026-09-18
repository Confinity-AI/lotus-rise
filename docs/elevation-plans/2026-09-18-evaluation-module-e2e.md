# Evaluation module journey, round 5 (2026-09-18)

Branch `feat/evaluation-journey-e2e` from `b330e4c` (= `origin/main` = the build served at https://www.lotusrise.org/). Rounds 1–4 live in `2026-09-16-evaluation-module-e2e.md`; this file records only what is still true of the shipped site and what this round changes. Baseline commands at `b330e4c`: `npm run typecheck` 0, `npm run lint` 0 (32 files), `npm run build:pages` 0 (10 pages).

## 0. Intake facts, re-verified against `b330e4c`

| # | Brief said | Now | Evidence |
| :-: | --- | --- | --- |
| F1 | No test runner | False. Playwright + axe, 10 specs, 3 projects. | `package.json` devDeps/scripts; `playwright.config.ts:21-41` |
| F2 | Contact fails by default | False. Unset endpoint → validated `mailto:` to real recipients. **Live is the unset build**: `data-configured="false"`, button text "Send request" (fetched 2026-09-18). | `ContactForm.tsx:13-14, 86-95`; `site-content.ts:314-318` |
| F3 | Scope is `/` + `/contact` | False. Six routes. | `AGENTS.md:12`; `out/` has exactly `/`, `/janus/`, `/janus/evaluation/`, `/janus/strategy/`, `/team/`, `/contact/`, `/404/` |
| F4 | Hub and module duplicate | Resolved (C1a). Hub: hero + suite + AI/people + closing. Module: hero + path + theatre + review + closing. | `JanusPage.tsx:16-121`; `EvaluationPage.tsx:17-145` |
| F5 | No theatre analytics | Resolved. | `JanusTheatre.tsx:36, 72, 78`; `src/lib/analytics.ts` |
| F6 | Theatre interactions sound | Still true; tested. | `JanusTheatre.tsx:31-80, 102-108, 177-188`; `theatre.spec.ts` |
| F7 | Static export via `build-pages.mjs`, `sitePath()` | True; basePath empty. | `smoke.spec.ts:28` |

Live vs local: identical `h1` on all four journey routes; HTML differs only by build id (3–19 bytes). No divergence.

R2 deviation: `scripts/build-pages.mjs` had no uncommitted edits. `src/resources/lotus-rise.css` **was** stashed together with `ValuesGrowth.tsx` (`git stash push -m "pre-e2e-wip" -- src/components/ValuesGrowth.tsx src/resources/lotus-rise.css`) because its 100-line WIP diff is unrelated homepage work; committing it under a journey commit would violate "do not rewrite unrelated dirty changes" (`AGENTS.md`). The one CSS edit this round needs (`.janus-path` list reset) is made on the committed file; the stash pops on top at the end.

## A. Journey map (as shipped at `b330e4c`)

Decision = a distinct interactive control the visitor must choose to use or ignore, counted once per viewport it first appears in. Chrome (nav links, footer) counted once, on the first screen.

| Step | Route | Component | Sees | Decisions | Primary | Exits | Evidence |
| --- | --- | --- | --- | :-: | --- | --- | --- |
| 1 Home hero | `/` | `LotusRiseHome.tsx:18-31` | H1, lead, one button | 1 (+4 chrome: Janus, About us, Contact us, menu) | Explore Janus | — | screenshot `home-desktop` |
| 2 Meet Janus | `/` | `LotusRiseHome.tsx:39-77` | static program-path capture, 3 module cards | 3 | Explore Evaluation | Strategy (coming soon), Register interest → `/contact/` | |
| 3 Home closing | `/` | `LotusRiseHome.tsx:107-119` | one button | 1 | Request a preview | — | |
| 4 Hub hero | `/janus/` | `JanusPage.tsx:16-50` | status, H1, one button, program path | 1 | Explore Evaluation | — | |
| 5 Suite | `/janus/` | `JanusPage.tsx:52-83` | 3 cards | 3 | Explore Evaluation | Strategy, Register interest | |
| 6 AI/people + closing | `/janus/` | `JanusPage.tsx:85-121` | copy, reviewed-report capture, one button | 1 | Request a preview | — | |
| 7 Module hero | `/janus/evaluation/` | `EvaluationPage.tsx:17-51` | status, H1, one button, reviewed report | 1 | Request a preview | — | |
| 8 Path band | `/janus/evaluation/` | `EvaluationPage.tsx:53-73` | five steps | 0 | — | — | |
| 9 Theatre | `/janus/evaluation/` | `JanusTheatre.tsx:86-171` | 3 tabs, Full screen, image tap, swipe | 5 | Full screen | — | |
| 10 Dialog | `/janus/evaluation/` | `JanusTheatre.tsx:173-243` | close, prev, next, backdrop, arrows, Esc | 3 | Close | — | |
| 11 Review + closing | `/janus/evaluation/` | `EvaluationPage.tsx:91-145` | four steps, lineage capture, one button | 1 | Request a preview | — | |
| 12 Contact | `/contact/` | `contact/page.tsx`, `ContactForm.tsx:169-250` | notice, 5 fields, submit; header CTA **Back to homepage** | 7 (5 fields + submit + header back) | Send request | Back to homepage (backward) | screenshot `contact-desktop` |
| 13 Sent / mailto | `/contact/` | `ContactForm.tsx:136-166` | one button | 1 | Return home / Send by email | — | |

Baseline this round: **28** (22 journey + 4 chrome + 1 contact header back + 1 mobile-menu duplicate of it). Target: remove what is backward or duplicated; ≥ 30 % was reached in round 1 (34 → 22) and is not re-claimed here.

## B. Findings (round 5)

| ID | Sev | file:line | Observation | Why it matters | Fix | Test |
| --- | :-: | --- | --- | --- | --- | --- |
| FL-01 | P1 | `SiteChrome.tsx:51-57, 67-69` | On `/contact/` the header CTA slot renders **Back to homepage** as a filled button, repeated in the mobile panel. | It is the only backward action in the journey, it competes with **Send request** in the first viewport, and it duplicates the post-send **Return to the homepage** (`ContactForm.tsx:158-164`). The 404 page already omits it (`motion-routing.spec.ts:166`). | Render no header CTA on the contact page; keep the two nav links. | routing: "the contact page header has no competing action" (desktop + mobile panel). |
| FL-02 | P1 | `ContactForm.tsx:243-245`; `site-content.ts:21-22` | In the endpoint-unset build (**the live build**) the submit says **Send request** while pressing it opens the visitor's email app (`ContactForm.tsx:86-95`). The notice above explains it; the control itself contradicts it. | A button must name its outcome. The label **Send by email** already exists (`actions.sendByEmail`) and is used one screen later. | Label the submit `actions.sendByEmail` when `!configured`; `actions.send` when configured. | contact-failures: unset build → button named `sendByEmail`, no button named `send`; mock build → `send`. |
| AX-01 | P1 | `EvaluationPage.tsx:61` | `aria-label="Janus Evaluation path"` on a `div` with no role. axe `aria-prohibited-attr` (serious) reports it under **incomplete**, which `a11y.spec.ts:12-21` never reads. | The name is ignored by AT; the five steps are not exposed as a list, so a screen-reader user hears five unrelated numbers. | `<ol className="janus-path">` / `<li className="janus-path-step">`; `.janus-path { list-style: none; margin: 0; padding: 0 }` (journey selector). | a11y: zero `aria-*` rule ids in violations **or** incomplete; routing: steps are `ol > li`. |
| AX-02 | P2 | `JanusTheatre.tsx:220` | `aria-label="Full-screen Janus view controls"` on a `div` with no role, inside the dialog (axe skips it until opened). | Same prohibited-attribute pattern; the two buttons already carry full names. | Remove the attribute. | theatre: no `div[aria-label]:not([role])` after opening the dialog. |
| TG-01 | P2 | `tests/e2e/a11y.spec.ts:12-21` | Only `violations` are asserted; `incomplete` is discarded. Two serious items above passed through. | The gate is weaker than it reads. | Assert `incomplete` contains no `aria-*` rules (colour-contrast incompletes are owned by `contrast.spec.ts`). | itself. |
| TG-02 | P2 | `tests/e2e/visual.spec.ts-snapshots/*-linux.png` | Baselines are Linux-only; this machine is win32, no Docker/WSL. | Pixel changes from FL-01/AX-01 make four Linux baselines stale and unrefreshable here. | Commit win32 baselines; delete the four stale Linux files so the manual CI run writes fresh ones rather than diffing against known-wrong images. | visual spec on this platform. |

Clean on inspection this round: no violations from axe on any journey route (desktop 1440); no horizontal overflow; dialog readable at 1440 (`clip-dialog-d`); tabs, swipe, focus return unchanged (F6). Button icon spacing is 0 px on every `.button` (Once UI wraps the label; `lotus-rise.css:314` gap never applies) — consistent, outside the R6 selector fence, logged as follow-up.

## C. Decision log

- **C1** Page structure: unchanged from round 1 (a). Hub = hero, suite, AI/people, closing (`JanusPage.tsx`); module = hero, path, theatre, review, closing (`EvaluationPage.tsx`).
- **C2** Scope: six public routes, unchanged (`AGENTS.md:12`).
- **C3** CTA hierarchy: **Request a preview** remains the one primary. Cut this round: contact header **Back to homepage** (desktop button + mobile panel link). Nothing demoted.
- **C4** Theatre: keep all controls; AX-02 only.
- **C5** Contact fields: unchanged; no new field.
- **C6** Endpoint: unset in production. Keep the `mailto:` path (round 4, evidence-bound recipients `site-content.ts:314-318`); make the control honest (FL-02). Server endpoint remains follow-up #1.
- **C7** Decisions: 28 → 26 (−2: header back button, its mobile duplicate). Nothing that moves the visitor forward is removed.
- **C8** Visual baselines (TG-02): commit win32, drop stale linux for changed pages. Recorded, not hidden.

## D. Copy reframe

No new strings. FL-02 reuses `actions.sendByEmail` (`site-content.ts:22`, already shipped). R4: unchanged claims.

## E. Defects

| D | file:line | Fix | Proving test |
| --- | --- | --- | --- |
| D-01 | `EvaluationPage.tsx:61-71` | `ol`/`li` | a11y incomplete gate; routing `ol.janus-path > li` |
| D-02 | `JanusTheatre.tsx:220` | drop `aria-label` | theatre dialog sweep |
| D-03 | `ContactForm.tsx:243-245` | label by `configured` | contact-failures both builds |
| D-04 | `SiteChrome.tsx:51-57, 67-69` | no CTA on contact | routing header test |

## F. Task list

| T | Files | Change | Acceptance | Depends |
| --- | --- | --- | --- | --- |
| T-01 | — | Runner exists (`playwright.config.ts`). No-op, recorded. | `npm run typecheck && npm run lint` | — |
| T-02 | `a11y.spec.ts`, `theatre.spec.ts`, `contact-failures.spec.ts`, `motion-routing.spec.ts` | Red tests for D-01…D-04 + TG-01 | fail on `b330e4c` build | T-01 |
| T-03 | `EvaluationPage.tsx`, `lotus-rise.css`, `JanusTheatre.tsx` | D-01, D-02 | a11y + theatre green | T-02 |
| T-04 | `SiteChrome.tsx` | D-04 | routing green | T-02 |
| T-05 | `ContactForm.tsx` | D-03 | contact-failures green | T-02 |
| T-06 | `visual.spec.ts-snapshots/` | C8 | visual green on win32 | T-03..05 |
| T-07 | — | `typecheck && lint && build && build:pages && test:e2e`; stash pop; report | all green | T-06 |

## G. Test architecture

Unchanged harness (`tests/e2e/server.mjs`: two exports, mock on 3010 and unset on 3011; projects mobile/desktop/webkit-mobile). Additions: (1) a11y incomplete gate for `aria-*` rules; (2) `ol.janus-path > li` × 5; (3) dialog-open generic-label sweep; (4) submit label per build; (5) contact header has no `.button` and the mobile panel has exactly the two nav links. Not tested: real delivery, Lighthouse, non-Chromium visuals (unchanged reasons).

## H. Telemetry

No new events. All ten acceptance events plus `contact_mailto` remain asserted (`analytics.spec.ts`, `contact-failures.spec.ts`, `evaluation-journey.spec.ts`).

## I. Refusals ledger

No new pages, chatbot, pricing, Strategy/Reporting screens, pop-ups, calendar, form SaaS, blue, generic imagery, `lotus-rise.css` rewrite (one 3-line list reset), `.github/workflows/` edits (read only), dependencies. Not fixed: `.button` icon gap (outside R6 fence), Linux baselines (no Linux here).

## 3.1 Self-review gate

Cut-list: T-06 adds files, not decisions; kept because R5.5 requires committed baselines and the alternative is a red local suite. Voice/claims: no new strings. Hard-rule: every row cites file:line; every test runs against `out/`; no cookies; R2/R3 fences untouched except the logged CSS-stash deviation. Grades — specificity 9, decision reduction 7 (−2 of 28; the big cut was round 1), testability 9, claim safety 10, scope discipline 9. Decision-reduction < 8: reviewed for further backward/duplicate controls; none remain that move nothing forward (the module cards' "Strategy → coming soon" page is sideways, kept). Re-grade 7, proceeding per the brief.

## Baseline red (T-02)

Against the `b330e4c` export, five specs failed on exactly the defects they were written for (`e25bfb5`):

1. `a11y.spec.ts:7` `/janus/evaluation/` — incomplete contained `aria-prohibited-attr` on `.janus-path` (AX-01, TG-01).
2. `theatre.spec.ts:129` — two role-less named elements: `janus-path reveal is-visible: Janus Evaluation path`, `product-controls: Full-screen Janus view controls` (AX-01, AX-02).
3. `motion-routing.spec.ts:144` — `ol.janus-path > li.janus-path-step` count 0, expected 5 (AX-01).
4. `contact-failures.spec.ts:141` — `header .button` count 1, expected 0 (FL-01).
5. `contact-failures.spec.ts:170` — no button named "Send by email" in the unset build (FL-02).

## Execution log

| T | Commit | Check |
| --- | --- | --- |
| T-01 | — (runner already present) | typecheck 0 · lint 0 |
| T-02 | `e25bfb5 test(e2e): red specs for round 5 defects` | 5 red as listed |
| T-03 | `6b8beba fix(evaluation): expose the path as an ordered list and drop prohibited ARIA names` | a11y + theatre + routing green |
| T-04 | `6d9a121 refine(cta): no backward header action on the contact page` | contact-failures green; dead key `actions.backHome` removed from `site-content.ts` and the two specs that read it |
| T-05 | `ac7a6b0 fix(contact): submit label names the email-app path when no endpoint is set` | contact-failures green on both exports |
| T-06 | `c32213f test(visual): win32 baselines; drop stale linux baselines for changed pages` | visual 8/8 |
| T-07a | `test(e2e): skip the mailto delivery spec on WebKit for Windows` | see D-05 |
| T-07b | `fix(contact): focus the result panel after commit instead of racing it with rAF` | journey + contact ×3 repeats, 3 engines: 78/78 |

Defects found while verifying, beyond the plan:

| D | file:line | Observation | Fix | Test |
| --- | --- | --- | --- | --- |
| D-05 (env) | `contact-failures.spec.ts:170` on `webkit-mobile`, win32 only | WebKit for Windows has no `mailto:` handler; `location.assign("mailto:neeraj@lotusrise.org?…")` was rewritten to `https://www.lotusrise.org/?cc=…` and navigated the page away (trace: `test-results/…/error-context.md`). Linux WebKit (CI) and Chromium keep the page. | `test.skip(webkit && win32)` with the reason inline. Not a product defect. | — |
| D-06 | `ContactForm.tsx:94, 115` (at `b330e4c`) | `requestAnimationFrame(() => successRef.current?.focus())` raced React's commit of the `<output>`; in WebKit the frame ran first and focus landed on nothing (`toBeFocused` failed 1 in 2 runs before the fix). | `useEffect` on `status` ∈ {`sent`, `mailto`} focuses after commit; both rAF calls removed. | `evaluation-journey.spec.ts` (WebKit) and `contact-failures.spec.ts`, `--repeat-each=3`: 78/78. |

## 6. Final report

### Result

Green, in this order, on `feat/evaluation-journey-e2e` at the last commit: `npm run typecheck` 0 · `npm run lint` 0 (32 files) · `npm run build` 0 · `npm run build:pages` 0 (10 pages) · `npm run test:e2e` **204 passed, 7 skipped, 0 failed** (Chromium mobile, Chromium desktop, WebKit mobile; two real static exports, mock endpoint on 3010 and endpoint-unset on 3011). Skips are intentional: 6 pre-existing project-scoped skips (target-size sweeps on desktop, WebKit-excluded visual/contrast) + D-05.

Eight Conventional Commits from `b330e4c`. Never pushed. No force, rebase, reset, or amend.

### What changed for the visitor

- `/janus/evaluation/` path band is an ordered list of five steps (`EvaluationPage.tsx:61-71`); screen readers announce "list, 5 items" and the label is now permitted. Visually identical (`lotus-rise.css:2020-2026` list reset).
- Full-screen dialog controls carry no prohibited group name (`JanusTheatre.tsx:220`); the two buttons remain fully named.
- `/contact/` header shows the two nav links only (`SiteChrome.tsx:49-58, 60-68`); the backward "Back to homepage" button and its mobile duplicate are gone. After sending, "Return to the homepage" (`ContactForm.tsx:158-164`) is still the single way back.
- With no endpoint configured (**the live build**), the submit button reads **Send by email** (`ContactForm.tsx:243-245`); with an endpoint it reads **Send request**. The control now names its outcome.
- Result-panel focus is deterministic across engines (D-06).

Decisions on the path: **28 → 26**. Nothing that moves the visitor forward was removed.

### Copy

No new strings. `actions.backHome` deleted as dead. R4 unaffected.

### Telemetry

Unchanged; all ten acceptance events plus `contact_mailto` asserted (`analytics.spec.ts`, `contact-failures.spec.ts`, `evaluation-journey.spec.ts`).

### Unresolved (R10)

None. No fix was attempted twice; no file was reverted.

### R2 outcome

`git stash pop` applied cleanly. `src/components/ValuesGrowth.tsx` and `src/resources/lotus-rise.css` carry the owner's uncommitted WIP again (7 and 100 lines), on top of the committed `.janus-path` reset. `scripts/build-pages.mjs` had no WIP.

## Round 5b: end states and finish (owner asked to keep going and to ship)

Method: captured every terminal state on both viewports from the two real exports — validation, submit error, sending, sent, email-app fallback, 404, mobile menu, mobile dialog — and read each as the visitor's last screen.

| ID | Sev | Where | Observation | Fix | Test |
| --- | :-: | --- | --- | --- | --- |
| R5-01 | P1 | `contact/page.tsx:22-34` + `ContactForm.tsx:148-166` (at `2ab475f`) | After sending, the "Thank you." panel sat beside the still-standing question **"What would you like to discuss with us?"**, the lead "Tell us what…", and a "What happens next" note that repeated the panel's own reply line. The last screen of the journey argued with itself. | `ContactForm` now renders both columns. Sent and email-app states replace them with one centred panel (`.contact-done`, spans the grid) carrying the page's single `h1`, the body, the reply address, and the actions. | contact-failures: done state has one `h1`, zero `.contact-copy`/`.contact-note`; journey and contact specs assert the `h1` text. |
| R5-02 | P2 | `ContactForm.tsx` return links | "Return to the homepage" rendered as a filled dark button (design-system primary won over `.button-secondary`), so the sent state showed what looked like a second primary; the email-app state offered no way onward at all. | `variant="secondary"` + scoped outline (`.contact-done-actions .button-secondary`); email-app state gains the same return link beneath **Send by email**. | visual baselines; contact-failures link assertions. |
| R5-03 | P2 | `lotus-rise.css:314, 4300` | Icon glued to label on every button and module link: Once UI wraps the label, so the flex `gap` never separated them (measured 0 px on submit, hero and header CTAs). | `.button svg { margin-left: 0.5em }`, `.suite-module-link svg { margin-left: 0.4em }`. Owner authorised going past the R6 fence for finish. | within `maxDiffPixelRatio`; visually verified on all CTAs. |

Clean on inspection: validation state (persistent per-field messages, focus on first invalid), submit error (alert above the button, details kept), 404 (one way home), mobile menu, mobile full-screen dialog (pans, readable), path band and review section on mobile.

Suite after 5b: **204 passed, 7 skipped** (`754eb78`). Baselines unchanged within tolerance.

## Round 5c: the last dead end, and the CI attempt

| ID | Sev | Where | Observation | Fix | Test |
| --- | :-: | --- | --- | --- | --- |
| R5-04 | P1 | `ContactForm.tsx:212` (at `754eb78`) | With JavaScript off, the form was `method="post"` with no `action`: submit POSTed to the static host and died with a 405, while the `<noscript>` note only said the form "needs JavaScript". The one path with no way forward. | `action="mailto:<to>?cc=…&subject=…"` + `encType="text/plain"`: a no-JS submit opens the visitor's email app with each field on its own line, to the same recipients the JS path uses. With JS on, `preventDefault()` runs first, so nothing changes. Note now says what will happen (`contact.form.noscript`). | contact-failures: served HTML has `method="post"`, `enctype="text/plain"`, a `mailto:` action to `recipients.to` with the `cc` list, and the noscript note. |
| R5-05 | — | `.github/workflows/ci.yml` | Triggered the manual run (`gh workflow run ci.yml`, run 35287587855) to let Linux write the four missing visual baselines. GitHub declined to start the job: **"your account is locked due to a billing issue."** | None possible from this repo. Baselines for this platform (win32) are committed and green; the Linux set needs either the billing hold cleared and one CI run, or a Linux machine running `npx playwright test visual --update-snapshots`. | — |

Suite after 5c: **207 passed, 7 skipped**.

### Follow-ups (outside this brief)

1. **Linux visual baselines.** Four `-linux.png` files (contact ×2, janus-evaluation ×2) were deleted as stale. CI cannot run until the GitHub billing hold on the account is cleared (R5-05); then one `workflow_dispatch` run writes them and a second goes green.
2. ~~`.button` icon gap~~ — done in 5b (R5-03).
3. **Contact endpoint** (unchanged): contract in `.env.example`; the email-app path is live and now honestly labelled.
4. **Merge and deploy** — done at the owner's instruction after 5b: fast-forward to `main`, push, `npm run deploy:pages`, live build hash verified, branch deleted. See the shipping note at the end of this file.

---

# Round 6 (2026-09-18, second pass)

Branch `feat/evaluation-journey-e2e` recreated from `f08925a` (= `main` = live). Baseline at `f08925a`: `typecheck` 0 · `lint` 0 (32 files) · `build:pages` 0 (10 pages) · `test:e2e` **207 passed, 7 skipped**. Live vs local: identical `h1` and `data-cta` sequence on `/`, `/janus/`, `/janus/evaluation/`, `/contact/`; HTML length differs by 3–19 bytes (build id). Live contact is the endpoint-unset build (`data-configured="false"`).

## 0. Intake facts

F1–F7 as re-verified in round 5 (table above) remain true at `f08925a`; nothing in the brief's starting table describes the shipped site any more. Sections A (journey map), C1, C2, C4–C6, G (harness), H (telemetry) and I (refusals) are unchanged from round 5 and not restated.

R2: `scripts/build-pages.mjs` had no uncommitted edits. `ValuesGrowth.tsx` and `lotus-rise.css` were stashed together (same reasoning and deviation as round 5); the round's CSS edits touch `.janus-review-path` only, on the committed file. Pop at the end: clean.

## B. Findings (round 6)

| ID | Sev | file:line (at `f08925a`) | Observation | Why it matters | Fix | Test |
| --- | :-: | --- | --- | --- | --- | --- |
| FL-03 | P1 | `SiteChrome.tsx:52-57` | The header **Contact us** was a filled `button-primary` on every page, so the first viewport of `/`, `/janus/` and `/janus/evaluation/` showed two filled actions (header + hero). On the module page both filled buttons lead to `/contact/` under different labels (**Contact us**, **Request a preview**). | Brief §3: one primary per viewport. Two filled buttons to the same place is the pattern the round-5 contact fix removed one screen later. `.site-header .button-secondary` (`lotus-rise.css:215-223`) already existed, unused. | `variant="secondary"` + `button-secondary`; no CSS added. Mobile panel unchanged (already a plain link). | motion-routing: "the first viewport of every journey page has one filled primary action" (counts `.button-primary` with `top < innerHeight`; asserts zero in header, one secondary contact link in the DOM). |
| CP-04 | P2 | `EvaluationPage.tsx:42, 118`; `JanusPage.tsx:41` | Three captures carried inline `alt` strings in components while the same images already have `alt` in `site-content.ts:64, 73, 82`. The program-path capture was described one way on `/` and another on `/janus/`. | R6 (copy only in `site-content.ts`); one capture, one description, so a screen-reader user meets the same image the same way on every page. | `alt={view.alt}`. | motion-routing: "every product capture is described by its one content alt" (`/`, `/janus/`, `/janus/evaluation/`). |
| AX-03 | P2 | `EvaluationPage.tsx:100-110`; `lotus-rise.css:2106, 3240-3245, 3833-3841` | The four review steps were `article`s in a `div` with visible numerals not hidden from AT: no list semantics, and "01 Source material" read aloud. The path band one section above was fixed to `ol/li` in round 5 (AX-01); this block had the same shape and was missed. | Same AT outcome as AX-01: four unrelated headings instead of "list, 4 items". | `ol.janus-review-path > li`, numerals `aria-hidden`; CSS `article` → `li` plus list reset (journey selector). Visually identical (verified at 1440). | motion-routing: "the review path is an ordered list of four steps". |

Clean on inspection: theatre (F6 unchanged), dialog, contact lifecycle (all states from round 5b/5c), sitemap = route list, canonical/OG, `noscript` path, analytics bus and listener (`AnalyticsListener.tsx`), reduced motion (`MotionReady.tsx:47-51`). No new strings anywhere, so R4 is untouched.

Considered and kept: `/janus/` hero **Explore Evaluation** and suite card 1 **Explore Evaluation** are the same label to the same URL in different viewports (`JanusPage.tsx:23-29, 71-78`). The card link is one of three parallel module links; removing it would break the grid's parallelism and the hero action is the page's primary. Sideways duplicate, not a competing primary. Unchanged.

## C. Decision log (additions)

- **C3** CTA hierarchy: header **Contact us** demoted to secondary on every page except `/contact/` (where it is absent, round 5). **Request a preview** remains the one filled label on the module page. Rationale: demotion keeps a way to contact from every page for visitors who arrive off-path (`/team/`, `/janus/strategy/`), while the hero owns the filled action. Removing the header link outright was the more destructive option and was not taken.
- **C7** Decisions: 26 → 26. No control removed this round; one filled action per first viewport instead of two. FL-03 is a hierarchy fix, not a count fix, and is recorded as such.
- **C8** Visual baselines: all eight win32 baselines refreshed with `--update-snapshots=all` (the header change is under the 1 % ratio, so `changed` mode would have left the images stale). Linux baselines (home ×2, janus ×2) are now stale as well; same follow-up as round 5c.

## E. Defects

| D | file:line | Fix | Proving test |
| --- | --- | --- | --- |
| D-07 | `SiteChrome.tsx:52-57` | secondary header link | motion-routing "one filled primary action" |
| D-08 | `EvaluationPage.tsx:42, 118`; `JanusPage.tsx:41` | `alt={view.alt}` | motion-routing "one content alt" |
| D-09 | `EvaluationPage.tsx:100-110`; `lotus-rise.css` `.janus-review-path` | `ol/li`, `aria-hidden` numerals | motion-routing "ordered list of four steps" |

## F. Task list and execution log

| T | Files | Commit | Check |
| --- | --- | --- | --- |
| T-01 | — | runner present; no-op | typecheck 0 · lint 0 |
| T-02 | `motion-routing.spec.ts` | `b679025 test(e2e): red specs for round 6 defects` | 3 red on `f08925a` export (below) |
| T-03 | `EvaluationPage.tsx`, `JanusPage.tsx`, `lotus-rise.css` | `0df283a fix(evaluation): captures use their one content alt; review path is an ordered list` | motion-routing, a11y, contrast, theatre green |
| T-04 | `SiteChrome.tsx`, `motion-routing.spec.ts` | `611ca4e refine(cta): header contact link is secondary so each hero keeps the one filled action` | motion-routing green both projects |
| T-05 | `visual.spec.ts-snapshots/*-win32.png` | `test(visual): refresh win32 baselines for the secondary header link` | visual 8/8 |
| T-06 | — | full gate + stash pop + this report | below |

### Baseline red (T-02), against the `f08925a` export

1. `motion-routing.spec.ts` "one content alt": `/janus/ /lotus-rise/product/janus-program-path-v2.webp` expected `"Real Janus screen showing the evaluation program path"`, received `"Janus Evaluation program path showing each stage of the workflow"` (mobile + desktop).
2. `motion-routing.spec.ts` "ordered list of four steps": `ol.janus-review-path > li` count 0, expected 4 (mobile + desktop).
3. `motion-routing.spec.ts` "one filled primary action": `/` received `["Contact us", "Explore Janus"]`, expected length 1 (desktop).

One test-only correction after T-04: the header assertion used `getByRole("link")`, which excludes the `display:none` desktop nav on the mobile project; changed to a DOM count on `.nav-links-desktop .button-secondary`. Not a product fix; not an R10 event.

## 3.1 Self-review gate

Cut-list: no task adds a control, page, component or dependency; T-05 adds no decisions. Voice/claims: zero new strings. Hard-rule: every row cites file:line at `f08925a`; all tests run against `.e2e/out-mock` and `.e2e/out-unset` (real exports); no cookies; R3 fences untouched; R2 deviation logged. Grades — specificity 9, decision reduction 6 (count unchanged; hierarchy fixed), testability 9, claim safety 10, scope discipline 9. Decision reduction < 8: re-checked every clickable on the four journey routes for backward or duplicate controls; the only duplicate (`/janus/` Explore Evaluation ×2) is kept with the reason above. Re-grade 6, proceeding per the brief.

## 6. Final report (round 6)

### Result

Green, in this order, on `feat/evaluation-journey-e2e` at `611ca4e` + baselines: `npm run typecheck` 0 · `npm run lint` 0 (32 files) · `npm run build` 0 · `npm run build:pages` 0 (10 pages) · `npm run test:e2e` **213 passed, 7 skipped, 0 failed** (Chromium mobile, Chromium desktop, WebKit mobile; mock endpoint on 3010, endpoint-unset on 3011). Skips are the same seven as round 5.

Six Conventional Commits from `f08925a` (including this report). Never pushed. No force, rebase, reset, or amend.

### What changed for the visitor

- Every page except `/contact/` shows one filled button in its first viewport: the hero's. The header **Contact us** is still there, as a quiet outlined link (`SiteChrome.tsx:51-61`).
- Each Janus capture is described the same way wherever it appears (`EvaluationPage.tsx:42, 118`; `JanusPage.tsx:41` read `site-content.ts:64, 73, 82`).
- The four review steps on `/janus/evaluation/` are announced as a list of four (`EvaluationPage.tsx:100-110`); the numerals are decorative. Visually identical.

Decisions on the path: 26 → 26 (nothing removed; nothing that moves the visitor forward was touched).

### Copy

No new strings. R4 unaffected.

### Telemetry

Unchanged; all ten acceptance events plus `contact_mailto` remain asserted.

### Unresolved (R10)

None. No fix was attempted twice; no file was reverted.

### R2 outcome

`git stash pop` applied cleanly (auto-merge on `lotus-rise.css`). `ValuesGrowth.tsx` (7 lines) and `lotus-rise.css` (100 lines) carry the owner's WIP again, on top of the committed `.janus-review-path` change. `scripts/build-pages.mjs` had no WIP.

### Follow-ups

1. Linux visual baselines (home ×2, janus ×2 now stale; contact ×2 and janus-evaluation ×2 still missing) — needs the GitHub billing hold cleared and one manual CI run, or a Linux machine with `npx playwright test visual --update-snapshots=all`.
2. Contact endpoint — unchanged; the email-app path is live and labelled.
3. Merge to `main` and `npm run deploy:pages` — owner's call; not done this round.

## Round 6b: continue until nothing measurable is left (owner: "execute all that remains")

Method: measured rather than read. Byte weight per route and per resource on both viewports from the export; focus-ring computed styles on twelve journey controls; axe on all six public routes; mobile screenshots of every journey screen and end state.

| ID | Sev | Where (at `d0acc7e`) | Observation | Fix | Test |
| --- | :-: | --- | --- | --- | --- |
| PF-01 | P1 | `ValuesGrowth.tsx:7-12`; `public/lotus-rise/brand/lotus-journey-0*.png` | The home page (journey step 1) transferred **3.5 MB**, of which **1.7 MB** was four decorative 512×768 PNGs (`alt=""`, `aria-hidden`) in the values section: 365 + 319 + 481 + 560 KB. Every product capture is 49–58 KB. | Same images as WebP via the `sharp` already in `dependencies` (q82, alpha q90): 26 + 18 + 47 + 59 = **150 KB**. `ValuesGrowth.tsx` was stashed, edited on the committed lines, popped clean (owner WIP is on lines 27-35, untouched). PNGs left in place: deleting tracked files is an ask-first action (`AGENTS.md`); listed below. | stability: "ships no image over 200 KB and under 600 KB of imagery in total" on every journey route (red on the PNG export: `lotus-journey-02-innovation.png` 326 616 B). |
| CP-05 | P2 | `site-content.ts:44` | The Strategy card says **Coming soon** and its link said **Explore Strategy**. `/janus/strategy/` has no screens (R4); "Explore" promises a product the visitor will not find. Reporting, also coming soon, already says **Register interest**. | `See what is planned`. One string, no claim, roadmap label kept. | motion-routing: "only the module with real screens invites the visitor to explore it" (cards with a non-preview status never start with "Explore"). |
| AX-04 | P1 | `StrategyPage.tsx:27-30` | `aria-label` on a role-less `div` (`aria-prohibited-attr`, serious). Same pattern as AX-01/AX-02; missed because `a11y.spec.ts` swept only the four journey routes and Strategy is the journey's lateral exit from two module cards. | Attribute removed (a name on a generic element is ignored by AT; nothing lost). | a11y sweep widened from `journeyRoutes` to all six `routes` (axe, heading levels, target sizes); red on `/janus/strategy/` both projects before the fix. |

Measured and clean: focus rings settle to the 3 px gold ring (`lotus-rise.css:65-68`) on skip link, brand, nav links, header secondary, hero primary, module links, footer, tabs, expand, select, textarea, submit (first readings mid-transition were a probe artefact, re-read after 700 ms). Mobile: dialog pans and stays readable, menu names its state, validation state focuses the first invalid field with a persistent message, theatre tabs remain a three-part segmented control. `/janus/evaluation/` transfers 236 KB, `/contact/` 167 KB.

Measured and refused: the 584 KB script chunk on every page is the `@once-ui-system/core` provider stack (contains `recharts`, `motion`, `prism`; no chart or toast is used anywhere in `src/`). Removing `DataThemeProvider`/`ToastProvider` would likely drop it, but `once-ui/docs/THEME_SYSTEM.md:16` says "If a repo already has this stack, preserve it." Refusal recorded; follow-up below. The hero lotus (`lotus-hero-photoreal.webp`, 175 KB, 1024², rendered ≤ 430 px) is within budget and is the LCP element; left as is.

### Execution log (6b)

| Commit | Change | Check |
| --- | --- | --- |
| `test(e2e): image byte budget on journey routes (red on PNG artwork)` | stability spec | 1 red as listed |
| `perf(home): values artwork as WebP (1.7 MB to 150 KB)` | four `.webp`, `ValuesGrowth.tsx:8-11` | stability green |
| `test(e2e): coming-soon module cards do not say Explore (red)` | motion-routing | red: `"Explore Strategy "` |
| `copy(janus): Strategy card names the roadmap it opens` | `site-content.ts:44` | motion-routing green |
| `test(a11y): sweep every public route` | `a11y.spec.ts:3,6` | red on `/janus/strategy/` ×2 |
| `fix(strategy): drop prohibited ARIA name on the decision-path block` | `StrategyPage.tsx:27` | a11y green, 6 routes × 2 projects |
| `test(visual): refresh win32 baselines (WebP artwork, Strategy card label)` | 4 baselines | visual 8/8 |

### Result (6b)

`npm run typecheck` 0 · `npm run lint` 0 · `npm run build` 0 · `npm run build:pages` 0 (10 pages) · `npm run test:e2e` **233 passed, 9 skipped, 0 failed** (two new skips are the desktop-project target-size tests for the two added routes; by design). Twelve commits from `f08925a`. Stash popped clean twice; owner WIP intact (7 + 100 lines).

Decisions on the path: 26 → 26. R4: one changed string, no claim. R11: no dependency. R3: untouched.

### What is left, and why it is left

1. **Linux visual baselines** — no WSL, no Docker on this machine (`wsl --status`: not installed); GitHub Actions blocked by the billing hold (round 5c). Needs one of those.
2. **Unused PNG artwork** — `public/lotus-rise/brand/lotus-journey-0{1..4}.png` (1.7 MB) are tracked and now unreferenced. Deleting tracked files is ask-first; `git rm` them when approved.
3. **Once UI bundle** — 584 KB chunk with unused chart/toast code, kept per `THEME_SYSTEM.md`. If the workspace owner relaxes that rule, drop `DataThemeProvider` and `ToastProvider` from `Providers.tsx` and re-measure.
4. **Contact endpoint** — cannot be provisioned from a static repo; email-app path is live and labelled.
5. **Merge and deploy** — R1 says never push; not done. `git merge --ff-only feat/evaluation-journey-e2e` on `main` then `npm run deploy:pages` when you are ready.
