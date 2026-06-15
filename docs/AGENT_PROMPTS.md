# lotus-rise Agent Prompts

Use these prompts when you want an agent to work on this downstream site with the full Once UI reference layer and a high quality bar.

## 1. Project Bootstrap Prompt

```text
You are working on the project at `C:\Users\User\Desktop\AmalgamSites\sites\lotus-rise`.

Before coding:

1. Read `PROJECT_SOURCE.md`
2. Read `AGENTS.md`
3. Read `docs/ONBOARDING.md`
4. Read `docs/AGENT_PROMPTS.md`
5. Read `README.md`
6. Read the upstream Once UI workspace docs

Use Context7 when current library or API docs are needed.
Use official Once UI demos and block pages before inventing new patterns.

Task: [describe the task]

Before editing, tell me the exact local entrypoint files you will touch.
Then implement, validate, and score the result.
```

## 2. Project Kickoff Prompt With Brief

```text
You are working on the project at `C:\Users\User\Desktop\AmalgamSites\sites\lotus-rise`.

Before coding:

1. Read `PROJECT_SOURCE.md`
2. Read `AGENTS.md`
3. Read `docs/ONBOARDING.md`
4. Read `docs/AGENT_PROMPTS.md`
5. Read `docs/CLEANUP_CHECKLIST.md`
6. Read `README.md`
7. Read the upstream Once UI workspace docs

Use Context7 when current library or API docs are needed.
Use official Once UI demos and block pages before inventing new patterns.
Treat unused starter/demo routes and content as cleanup candidates, not permanent project scope.

Project brief:
- Project name: lotus-rise
- Audience: [audience]
- Primary goal: [goal]
- Pages or routes needed: [list]
- Out of scope: [list]
- Brand adjectives: [list]
- Closest Once UI references: [links or repo names]
- Technical or content constraints: [list]
- Launch quality bar: [for example "every category must score at least 9/10"]

Output format:
- first list the exact entrypoint files you will use
- then explain the plan
- then implement
- then validate
- then score the result
- if any category is below 9, refine again before stopping
```

## 3. Local Entry Points

- `src/resources/once-ui.config.js`
- `src/components/Providers.tsx`
- `src/app/(main)/layout.tsx`
- `src/resources/seo.js`
- `src/resources/custom.css`

## 4. World-Class Design Prompt

```text
Act like a world-class design engineer working inside the Once UI system.

Task: [describe the page or feature]
Audience: [describe the audience]
Brand goal: [describe the desired feeling and business goal]

Requirements:

- stay inside Once UI's design language
- avoid generic patterns
- use official Once UI references before inventing a new layout
- route global design changes through `src/resources/once-ui.config.js` first
- keep refining until the result feels premium and intentional

Score the result from 1 to 10.
If any category is below 9, improve it again before stopping.
```

## 5. Final Review Prompt

```text
Review this project like a demanding creative director and technical lead.

Score it from 1 to 10 in:

- Once UI fidelity
- hierarchy
- responsiveness
- accessibility
- SEO and metadata
- implementation cleanliness
- production readiness

If any score is below 9:

- explain why
- improve the work
- score it again

Run build, lint, and a local smoke test before you stop.
```
