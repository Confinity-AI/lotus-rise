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

### Follow-ups (outside this brief)

1. **Linux visual baselines.** Four `-linux.png` files (contact ×2, janus-evaluation ×2) were deleted as stale; the next manual CI run (`.github/workflows/ci.yml`, `workflow_dispatch`) will report them missing and write them. Re-run once to go green. No Docker/WSL here to generate them locally.
2. **`.button` icon gap.** Once UI wraps the label, so `lotus-rise.css:314` `gap: 10px` never separates text from the arrow (measured 0 px on every button). Outside the R6 selector fence; a `.button svg { margin-left: … }` rule is a one-line owner call.
3. **Contact endpoint** (unchanged): contract in `.env.example`; the email-app path is live and now honestly labelled.
4. **Merge and deploy**: R1 forbids pushing from this run. `git checkout main && git merge --ff-only feat/evaluation-journey-e2e && git push && npm run deploy:pages` reproduces the previous release path.
