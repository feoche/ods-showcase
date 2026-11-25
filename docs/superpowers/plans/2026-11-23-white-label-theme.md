# White Label Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a neutral "white label" ODS 20 theme (light + dark) in `@ovhcloud/ods-themes`, show it in the showcase, then re-base Aluminium and Blue Jeans on it with zero change to their resolved tokens.

**Architecture:** The white label is a fifth/sixth theme folder (`packages/themes/src/white-label/`), registered through `package.json` exports, which the existing build scripts already discover (`scripts/themes.js`). Step 2 makes `aluminium/` and `blue-jeans/` `@use` the white label and keep only their differences, split into `_shared.scss` (both modes) and per-mode deltas, verified by a golden comparison of every `tokens.json`.

**Tech Stack:** Sass (module system, `@use`), PostCSS (bake), Node scripts (CommonJS) in `packages/themes/scripts/`, pnpm + lerna monorepo; showcase: Vite + React 19 + TypeScript, Playwright visual tests.

**Spec:** `docs/superpowers/specs/2026-11-23-white-label-theme-design.md` (in this repo, `ods-showcase`). Read it first: the look, the slate table and the brand re-index table are normative.

## Global Constraints

- Source base: `ovh/design-system` branch `release/20.0.0` (fetched at `dc94aff34`). Never the local `fix/docs-demo-frame-overlays` branch (v19 layout).
- Work in a separate worktree: `/home/feoche/dev/ods/design-system-white-label` (leave `~/dev/ods/design-system` as is).
- PRs go from the user's **fork** of `ovh/design-system` to `ovh/design-system`, base `release/20.0.0`. One PR for step 1 (`feat/white-label-theme`), one for step 2 (`refactor/themes-on-white-label`, branched from step 1).
- No semantic token added, renamed or removed. `generate-token-lists.js` already fails if a theme's semantic token set differs from the others: that is the completeness test.
- Apps' imports keep working: existing `exports` entries unchanged.
- Commits: conventional commits like the repo (`feat(themes): …`, `refactor(themes): …`). **No `Co-Authored-By` trailer, no "Generated with" line, in commits, PR bodies or docs.**
- Slate ramp (normative): 50 `#f1f4f8`, 100 `#e8edf3`, 200 `#dde3eb`, 300 `#cfd7e2`, 400 `#8494a9`, 500 `#64748b`, 600 `#475569`, 700 `#334155`, 800 `#131c2b`, 900 `#0b1220`.
- White-label brand ramp: 50–400 → `gray-50`…`gray-400`; 500 → `gray-800`; 600 → `gray-900`; 700 → `gray-900`; 800 → `black`; 900 → `black`. Accent ramp → `slate` 1:1.
- Contrast floor: text ≥ 4.5:1, non-text (control borders, focus ring, solid controls against the page) ≥ 3:1.
- Showcase: the `@ovhcloud/ods-themes` link to the worktree is **never committed**; the showcase branch is not merged before the white label is published.

## Review Focus

1. **Dark white label on tinted brand/hover surfaces** — `interaction-brand-subtle-*`, `surface-brand` hover, `border-brand` in dark: a near-black value copied from Aluminium dark would be invisible on slate-900. Covered by dark contrast pairs in Task 1 and the Task 3 visual review.
2. **Blue Jeans' own palette values** (its red, green, orange families and `twilight` differ from Aluminium's) silently replaced by the white label's after re-basing. Covered by the golden compare (Task 6), which must run on Blue Jeans light **and** dark.
3. **Blue Jeans component-token overrides** (`--ods-badge-padding-*`, `--ods-avatar-*`, `--ods-skeleton-*`, inside `@layer` blocks) lost in dark after the light/dark split. Covered by the golden compare: `tokens.json` lists only top-level `:root`, so Task 6's script must also compare the `resolve-tokens.js` output (every scope, including `@layer`).
4. **`lint:css` breaks after re-basing**: `repoint-tokens.js` reads `src/aluminium/light.scss` and requires every semantic token to be declared there. Covered in Task 7.
5. **Theme pickers that whitelist values** (docs `readStoredBrand`, showcase `readStoredTheme`) dropping the new value back to the default after reload. Covered by reload checks in Tasks 4 and 5.

---

## Part 1 — Step 1: the white label (design-system fork, branch `feat/white-label-theme`)

### Task 0: Worktree, fork remote, baseline build

**Files:** none (setup)

- [ ] **Step 1: Create the worktree on `release/20.0.0`**

```bash
cd ~/dev/ods/design-system
git fetch origin release/20.0.0:refs/remotes/origin/release/20.0.0
git worktree add ../design-system-white-label -b feat/white-label-theme origin/release/20.0.0
```

- [ ] **Step 2: Add the fork remote.** Find the user's fork with `gh repo list --fork --json nameWithOwner -q '.[] | select(.nameWithOwner|endswith("/design-system")) | .nameWithOwner'`; add it as remote `fork` (SSH URL). If there is none, stop and ask the user (do not create a fork without asking).

- [ ] **Step 3: Install and build the themes**

Run: `cd /home/feoche/dev/ods/design-system-white-label && pnpm install && pnpm --filter @ovhcloud/ods-themes run build:prod`
Expected: exit 0; `packages/themes/dist/aluminium/light.tokens.json` exists.

### Task 1: Contrast check script

**Files:**
- Create: `packages/themes/scripts/check-contrast.js`
- Modify: `packages/themes/package.json` (scripts: `"check:contrast": "node scripts/check-contrast.js"`)

**Interfaces:**
- Produces: `node scripts/check-contrast.js <tokens.json> [...]` → prints one line per pair `OK|KO <ratio> <fg> on <bg> (min <n>)`, exit code 1 if any `KO`. Reads `root` of a generated `tokens.json`. A value that isn't a 6- or 3-digit hex prints `SKIP` (not a failure).

- [ ] **Step 1: Write the script** with `CONTRAST_PAIRS` (names without the `--ods-semantic-color-` prefix):

| fg | bg | min |
|---|---|---|
| content-text | surface-page | 4.5 |
| content-text | surface-raised | 4.5 |
| content-heading | surface-page | 4.5 |
| content-placeholder | surface-control | 4.5 |
| content-brand | surface-raised | 4.5 |
| content-on-brand-solid | surface-brand | 4.5 |
| content-on-control-solid | surface-control-solid | 4.5 |
| content-on-selected | surface-selected | 4.5 |
| content-on-selected-solid | surface-selected-solid | 4.5 |
| content-on-information | surface-information-subtle | 4.5 |
| content-on-success | surface-success-subtle | 4.5 |
| content-on-warning | surface-warning-subtle | 4.5 |
| content-on-critical | surface-critical-subtle | 4.5 |
| content-critical | surface-raised | 4.5 |
| border-control | surface-control | 3 |
| surface-brand | surface-page | 3 |
| surface-control-solid | surface-page | 3 |
| interaction-brand-hover | surface-brand | 1.2 |
| focus | surface-page | 3 |
| focus | surface-raised | 3 |

  (`interaction-brand-hover` vs `surface-brand` at 1.2 is the "hover is visible" check, not a WCAG rule; `focus` is `--ods-semantic-color-focus`.) WCAG relative-luminance formula, 2 decimals.

- [ ] **Step 2: Run it on Aluminium to prove it works**

Run: `cd packages/themes && node scripts/check-contrast.js dist/aluminium/light.tokens.json`
Expected: 20 lines, mostly `OK`, ratios plausible (e.g. `content-text on surface-page` ≈ 7–8). Whatever Aluminium fails is noted, not fixed (out of scope).

- [ ] **Step 3: Commit** — `feat(themes): add a contrast check for a theme's token pairs`

### Task 2: White label light

**Files:**
- Create: `packages/themes/src/white-label/_variables.scss`, `_palette.scss`, `light.scss`
- Modify: `packages/themes/package.json` (`exports`)

**Interfaces:**
- Produces: exports `./white-label/css` (`sass`: `./src/white-label/light.scss`, `default`: `./dist/white-label/light.css`, `types`: `./src/stylesheet.d.ts`) and `./white-label/tokens` (`./dist/white-label/light.tokens.json`), same shape as `./blue-jeans/*`. Module `src/white-label/light.scss` is `@use`d by Task 3 and Part 2.

- [ ] **Step 1: Register the exports** (white-label light only).

- [ ] **Step 2: Build to see it fail**

Run: `pnpm --filter @ovhcloud/ods-themes run build:prod`
Expected: FAIL — the bake or token step cannot find `dist/white-label/light.css`.

- [ ] **Step 3: `_variables.scss` / `_palette.scss`**: copies of `aluminium/` ones, plus `$ods-palette-slate-50…900` (values in Global Constraints) and the matching `--ods-palette-slate-*` custom properties, placed after `navy`. Header comment: what slate is for.

- [ ] **Step 4: `light.scss`**: copy of `aluminium/light.scss`, then:
  - brand ramp → re-index table (Global Constraints); accent ramp → `slate`; any direct `--ods-palette-navy-N` → `--ods-palette-accent-N`.
  - `content-text` → `accent-600`; `border-control` → `accent-500`; `surface-control-solid`, `surface-selected-solid`, `border-selected-solid` → `brand-500`; `interaction-control-solid-hover`/`-active` → `brand-600`; `content-brand-minor` → `brand-500`.
  - Everything else unchanged from Aluminium (status, charts, sizes, fonts, motion, z-index).
  - Comments say why where the value differs from Aluminium (e.g. "slate-500 is only 4.3:1 on the slate-50 page").

- [ ] **Step 5: Build and check completeness + contrast**

Run: `pnpm --filter @ovhcloud/ods-themes run build:prod && cd packages/themes && node scripts/check-contrast.js dist/white-label/light.tokens.json`
Expected: build exit 0 (no "does not declare the semantic tokens" error); contrast: every line `OK` (or `SKIP`), exit 0. Fix any `KO` by moving that role one step within the same family, and say so in a comment.

- [ ] **Step 6: Commit** — `feat(themes): add the white label theme, light mode`

### Task 3: White label dark

**Files:**
- Create: `packages/themes/src/white-label/dark.scss`
- Modify: `packages/themes/package.json` (`exports`: `./white-label-dark/css` → `./src/white-label/dark.scss` / `./dist/white-label/dark.css`, `./white-label-dark/tokens` → `./dist/white-label/dark.tokens.json`)

- [ ] **Step 1: Register the exports and build to see it fail** (missing `dist/white-label/dark.css`).

- [ ] **Step 2: `dark.scss`**: copy of `aluminium/dark.scss` (`@use './light'` + re-declarations), `navy-N` → `accent-N`, then:
  - `surface-brand` → `brand-100`; `interaction-brand-hover`/`-active` → `brand-300` (`brand-200` is only 1.11:1 against `brand-100`); `content-on-brand-solid` → `gray-900`.
  - `surface-control-solid` → `brand-100`; `interaction-control-solid-hover`/`-active` → `brand-300`; `content-on-control-solid` → `gray-900`.
  - `content-brand`, `content-brand-minor` → `brand-300`; `border-brand` → `brand-100`.
  - `interaction-brand-subtle-hover`/`-active` → `accent-700`.
  - `color-focus` → `blue-400`.
  - Page / raised / header stay on Aluminium dark's steps (now slate-900 / slate-800 / slate-700 through the accent rewrite).

- [ ] **Step 3: Build and check**

Run: `pnpm --filter @ovhcloud/ods-themes run build:prod && cd packages/themes && node scripts/check-contrast.js dist/white-label/dark.tokens.json`
Expected: exit 0, all `OK`/`SKIP`.

- [ ] **Step 4: Visual check in the docs** (after Task 4 adds it to the selector) or Storybook: Button (all colors/variants), Checkbox, Switch/Toggle, Tabs, Message, Badge, Input focus, Select open, Modal, in light and dark, against the mockup `ods-showcase/.superpowers/brainstorm/532067-1795445260/content/white-label-light-dark.html`. Nothing invisible (hover, focus, selected).

- [ ] **Step 5: Commit** — `feat(themes): add the white label theme, dark mode`

### Task 4: Wire the white label into docs and Tailwind tests, document, open PR 1

**Files:**
- Modify: `packages/docs/src/shell/themeStyles.ts` (`Brand` gets `'white-label'`; `THEMES['white-label'] = { light, dark }` from `@ovhcloud/ods-themes/white-label/css?inline` and `white-label-dark/css?inline`; `readStoredBrand` accepts `'white-label'`)
- Modify: `packages/docs/src/shell/BrandSelect.tsx` (`BRAND_ITEMS` add `{ label: 'White label', value: 'white-label' }`)
- Modify: `packages/tailwind/tests/run.mjs:28` (`THEMES` add `'white-label'`, `'white-label-dark'`)
- Modify: `packages/themes/README.md` (white label section: what it is, slate, brand re-index; the `check:contrast` script)
- Modify: `packages/docs/src/content/guides/themes.mdx` (list the white label among the themes, one paragraph)

- [ ] **Step 1: Edit the files above.**
- [ ] **Step 2: Run the checks**

Run: `pnpm lint && (cd packages/tailwind && pnpm test:spec)`
Expected: exit 0; tailwind output has no `KO` line.

- [ ] **Step 3: Reload check in the docs** — `pnpm docs`, pick White label, reload: still White label (light and dark).
- [ ] **Step 4: Commit** — `feat(docs): offer the white label theme in the brand select`
- [ ] **Step 5: Push and open PR 1**

```bash
git push -u fork feat/white-label-theme
gh pr create --repo ovh/design-system --base release/20.0.0 --head <fork-owner>:feat/white-label-theme \
  --title "feat(themes): white label theme" --body-file <body.md>
```

  Body: what/why (from spec Intent), the look, slate + brand re-index tables, the blue focus ring, contrast output for light and dark, screenshots, "step 2 (re-basing Aluminium and Blue Jeans) follows in a separate PR". No attribution line. **Ask the user before running `gh pr create`.**

## Part 2 — Showcase (this repo, branch `feat/white-label-theme`)

### Task 5: White label in the showcase theme picker

**Files:**
- Modify: `src/hooks/useTheme.ts` (`Theme` union + `THEME_URLS`: `'white-label'` ← `@ovhcloud/ods-themes/white-label/css?url`, `'white-label-dark'` ← `@ovhcloud/ods-themes/white-label-dark/css?url`)
- Modify: `src/components/Navbar.tsx:26` (`THEME_ITEMS` add `White label` (icon `sun`) and `White label dark` (icon `moon`))
- Modify: `tests/visual/components.spec.ts:41`, `tests/visual/interactive-states.spec.ts:80` (`themes` add `'white-label'`, `'white-label-dark'`)
- Modify: `README.md` (theme list)

**Interfaces:**
- Consumes: exports `./white-label/css`, `./white-label-dark/css` (Tasks 2–3).

- [ ] **Step 1: Branch from `main`** (`git switch main && git switch -c feat/white-label-theme`; leave the unrelated dirty `dist/` and `pnpm-lock.yaml` changes alone).
- [ ] **Step 2: Link the local build, uncommitted**: in `package.json` `pnpm.overrides`, add `"@ovhcloud/ods-themes": "link:../design-system-white-label/packages/themes"`, `pnpm install`. Do not stage `package.json`/`pnpm-lock.yaml` from this step.
- [ ] **Step 3: Edit the files above, then build**

Run: `pnpm build`
Expected: exit 0 (tsc + vite resolve the new `?url` imports).

- [ ] **Step 4: Visual baselines for the new themes**

Run: `pnpm test:visual:update -g "white-label"` then `pnpm test:visual`
Expected: new `white-label--*` / `white-label-dark--*` snapshots created; existing themes' snapshots unchanged (PASS).

- [ ] **Step 5: Reload check** — `pnpm dev`, pick White label dark, reload: still White label dark.
- [ ] **Step 6: Commit** only `src/`, `tests/`, `README.md` and the new snapshots — `feat: Add the white label theme to the theme picker`. Not merged until `@ovhcloud/ods-themes` ships the white label; then replace the link by the released version and update `pnpm-lock.yaml`.

## Part 3 — Step 2: re-base the themes (design-system fork, branch `refactor/themes-on-white-label` from `feat/white-label-theme`)

### Task 6: Golden baseline and compare script

**Files:**
- Create: `packages/themes/scripts/compare-builds.js`
- Modify: `packages/themes/package.json` (scripts: `"compare:builds": "node scripts/compare-builds.js"`)

**Interfaces:**
- Produces: `node scripts/compare-builds.js <baselineDistDir>` — for every `*/light.css` / `*/dark.css` present in the baseline dir, runs the `collect` + `resolveScopes` logic of `resolve-tokens.js` (export them from that module) on the baseline and current `dist/` file, and prints each difference: `changed <file> <scope> <token>: <before> → <after>`, `missing …`, `added …`. Exit 1 on any `changed` or `missing`, or on an `added` token not matching `^--ods-palette-slate-`.

- [ ] **Step 1: Create the branch and capture the baseline** (build first, so the baseline is this exact commit):

```bash
cd /home/feoche/dev/ods/design-system-white-label
git switch -c refactor/themes-on-white-label
pnpm --filter @ovhcloud/ods-themes run build:prod
rm -rf /home/feoche/.cache/ods-white-label-baseline && cp -r packages/themes/dist /home/feoche/.cache/ods-white-label-baseline
```

- [ ] **Step 2: Write the script** (and export `collect`, `resolveScopes` from `resolve-tokens.js` without changing its CLI).
- [ ] **Step 3: Self-test** — `node scripts/compare-builds.js /home/feoche/.cache/ods-white-label-baseline` → exit 0, no output. Then change one value in `dist/aluminium/dark.css` by hand → exit 1 with a `changed` line; rebuild to restore.
- [ ] **Step 4: Commit** — `feat(themes): compare two builds of the themes token by token`

### Task 7: Re-base Aluminium

**Files:**
- Create: `packages/themes/src/aluminium/_shared.scss`
- Modify: `packages/themes/src/aluminium/light.scss`, `dark.scss`
- Delete: `packages/themes/src/aluminium/_variables.scss`, `_palette.scss` (identical to the white label's minus slate)
- Modify: `packages/themes/scripts/repoint-tokens.js:359` (read `src/white-label/light.scss`: the theme that declares every semantic token)

**Interfaces:**
- Consumes: `src/white-label/light.scss`, `src/white-label/dark.scss`.
- Produces: the pattern Task 8 repeats:
  - `_shared.scss`: `:root` with the brand ramp → `blue`, accent ramp → `navy`, and any delta identical in both modes.
  - `light.scss`: `@use '../white-label/light'; @use './shared';` then `:root` light-only deltas.
  - `dark.scss`: `@use '../white-label/dark'; @use './shared';` then `:root` dark-only deltas.

- [ ] **Step 1: Write the three files.** Light deltas = old Aluminium light declarations whose declared value differs from white-label light's; dark deltas = old Aluminium dark's final values (light + dark re-declarations) that differ from white-label dark's. Keep the existing comments that explain a value.
- [ ] **Step 2: Build and compare**

Run: `pnpm --filter @ovhcloud/ods-themes run build:prod && cd packages/themes && node scripts/compare-builds.js /home/feoche/.cache/ods-white-label-baseline`
Expected: no `changed`/`missing` for `aluminium/*`; only `added --ods-palette-slate-*`. Fix every reported line by adding the missing delta, re-run until exit 0 (Blue Jeans and white-label untouched, so they compare clean too).

- [ ] **Step 3: Lint** — `pnpm --filter @ovhcloud/ods-themes run lint:css && pnpm --filter @ovhcloud/ods-themes run lint:scss` → exit 0.
- [ ] **Step 4: Commit** — `refactor(themes): build Aluminium on the white label`

### Task 8: Re-base Blue Jeans

**Files:**
- Create: `packages/themes/src/blue-jeans/_shared.scss`
- Modify: `packages/themes/src/blue-jeans/light.scss`, `dark.scss`, `_variables.scss` (keep only the values that differ from the white label: its `red`, `green`, `orange` families and `twilight`), `_palette.scss` (only those custom properties; `@use`d by `_shared.scss`)

- [ ] **Step 1: Write the files** following Task 7's pattern. `_shared.scss` also holds: brand and accent ramps → `blue`, Blue Jeans' palette values, and its component-token overrides (`@layer` blocks with `--ods-badge-padding-*`, `--ods-avatar-*`, `--ods-skeleton-*`) so that dark keeps them as it does today.
- [ ] **Step 2: Build and compare** (same command as Task 7) → exit 0, only `added --ods-palette-slate-*`.
- [ ] **Step 3: Lint** (same as Task 7) → exit 0.
- [ ] **Step 4: Commit** — `refactor(themes): build Blue Jeans on the white label`

### Task 9: Diff report, docs, PR 2

**Files:**
- Create: `packages/themes/scripts/diff-from-white-label.js`
- Modify: `packages/themes/package.json` (scripts: `"tokens:diff": "node scripts/diff-from-white-label.js"`)
- Modify: `packages/themes/README.md` ("How to update the theme values?" rewritten for the new structure: white label holds every token; a theme = `_shared` + per-mode deltas; `compare:builds` before/after; `tokens:diff`)

**Interfaces:**
- Produces: `node scripts/diff-from-white-label.js` — for each theme from `themes()` other than `white-label*`, compares its `tokens.json` `root` to the white-label one of the same mode (`dark` if the theme name ends in `-dark`, else light) and prints `<theme> <token>: <white-label value> → <theme value>`, grouped by theme, with a count per theme. Exit 0 always (a report).

- [ ] **Step 1: Write the script; run it** — `pnpm --filter @ovhcloud/ods-themes run tokens:diff` → four groups (default, aluminium-dark, blue-jeans, blue-jeans-dark), no white-label group; counts non-zero.
- [ ] **Step 2: Full check** — `pnpm lint && (cd packages/tailwind && pnpm test:spec) && cd packages/themes && node scripts/compare-builds.js /home/feoche/.cache/ods-white-label-baseline` → all exit 0.
- [ ] **Step 3: Commit** — `docs(themes): describe the themes built on the white label`
- [ ] **Step 4: Push and open PR 2** against `release/20.0.0` (after PR 1 is merged; until then, as a draft with base `feat/white-label-theme` on the fork, noted in the body). Body: the structure, the compare output (empty), the `tokens:diff` counts. **Ask the user before running `gh pr create`.**
