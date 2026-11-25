# White label ODS theme — design

Date: 2026-11-23
Status: draft, pending approval

## Intent

Create a **white label** theme for ODS 20: a neutral, brandless, yet **complete** design token referential that drives every ODS React component. It becomes the **parent of every ODS theme**: Aluminium, Blue Jeans and any future theme are expressed as "white label + their differences".

Why: today each theme is a standalone copy of the full token mapping (~300 lines each, mostly the same). A single neutral referential makes themes cheap to create, makes their differences visible, and gives teams/partners a usable brandless theme.

Delivered in two steps:

1. **Step 1 — the white label as a theme of its own** (light + dark), shipped in `@ovhcloud/ods-themes` and selectable in this showcase.
2. **Step 2 — re-base Aluminium and Blue Jeans** on the white label, with zero visual change.

## Goals

- Every semantic token ODS 20 defines is defined by the white label, in light and dark. A product using only the white label renders every ODS component correctly.
- The white label looks neutral: no OVHcloud brand colour, but a usable, accessible UI (WCAG 2.1 AA contrast on text and controls).
- After step 2, a theme file only contains what differs from the white label.

## Non-goals

- No change to the semantic token **names** or set (no new roles, no renames). The white label fills the existing ODS 20 contract.
- No new build tooling (no DTCG / Style Dictionary JSON source). Possible later, on top of this.
- No Figma library work in this project.

## Anti-goals (failure even if it "works")

- Step 2 changes how Aluminium or Blue Jeans look (any resolved token value differs).
- Apps must change their imports (`@ovhcloud/ods-themes/default/css`, `blue-jeans/css`, … keep working unchanged).
- The white label reads as "a washed-out OVHcloud theme" or as an unfinished wireframe.

## Constraints

- Source of truth: `ovh/design-system`, branch `release/20.0.0` (the local checkout at `~/dev/ods/design-system` is on `fix/docs-demo-frame-overlays`, with `packages/themes` at 19.7.3 and the old `default/` layout; work must start from `release/20.0.0`).
- Theme layout in v20 (`packages/themes/src/<theme>/`): `_variables.scss` (palette values), `_palette.scss` (palette as custom properties), `light.scss` (brand/accent ramps + semantic roles), `dark.scss` (`@use './light'` + dark re-declarations). `scripts/bake-themes.js` merges each mode into one `:root`; `scripts/generate-token-lists.js` writes `<mode>.tokens.json`.
- Themes override **component-level** tokens too (Blue Jeans sets `--ods-badge-padding-*`, `--ods-avatar-*`, `--ods-skeleton-*`). The white label must not block that.
- Derived themes may override **any** token (decided): the white label only provides defaults.

## Approaches considered

1. **SCSS base that themes `@use`** — *chosen.* White label lives in `src/white-label/`; each theme `@use`s it and re-declares only its differences, the same way `dark.scss` already builds on `light.scss`. Keeps the build, outputs and package exports unchanged; small diffs; known pattern. Downside: what a theme overrides isn't visible at a glance → mitigated by a diff script (below).
2. **JSON token source (DTCG / Style Dictionary) generating SCSS/CSS** — one neutral source for code and Figma, explicit overrides; but replaces the whole theme pipeline. Out of scope; can come later on top of 1.
3. **Two runtime stylesheets** (white-label.css + theme-overrides.css) — simplest build, but every app must load two files in order, breaking today's single-file imports. Rejected.

## The look (decided)

Direction **"Graphite on slate"**, picked from four mockups (pure graphite, cool slate, neutral + placeholder brand, blueprint) then refined:

- **Brand = graphite** (from the "pure graphite" direction): primary buttons, solid controls (checkbox, toggle, radio), active tab underline are near-black in light, near-white in dark.
- **Everything else from "cool slate"**: page, text, borders, header and selection carry a faint blue-gray (slate) tint; **Source Sans 3**, **radius 4 px controls / 8 px containers** (today's ODS values), tinted header, flat cards (no raised shadow), today's sizes, spacing, motion and z-index.
- **Status colours unchanged**: information, success, warning, critical use the ODS 20 blue / green / orange / red families, as Aluminium does.
- **Focus ring is blue** — *my call, flagged to the user*: `blue-600` in light, `blue-400` in dark, so focus stays visible next to a black (light) or near-white (dark) primary.

Mockups (visual target): `.superpowers/brainstorm/532067-1795445260/content/white-label-directions-v2.html` (option 1) and `white-label-light-dark.html`. The mockup hexes are a visual target; **the palette tables below win**.

### Palette

One new hue family, **`slate`** (normative; 500 is the first stop reaching 4.5:1 on white, the ODS convention):

| stop | value | on white | on slate-900 |
|---|---|---|---|
| 50 | `#f1f4f8` | 1.10 | 16.97 |
| 100 | `#e8edf3` | 1.18 | 15.90 |
| 200 | `#dde3eb` | 1.29 | 14.50 |
| 300 | `#cfd7e2` | 1.45 | 12.90 |
| 400 | `#8494a9` | 3.09 | 6.05 |
| 500 | `#64748b` | 4.76 | 3.93 |
| 600 | `#475569` | 7.58 | 2.47 |
| 700 | `#334155` | 10.35 | 1.81 |
| 800 | `#131c2b` | 17.09 | 1.10 |
| 900 | `#0b1220` | 18.72 | 1.00 |

`slate` is added to the shared ODS palette (both `_variables.scss` / `_palette.scss` of the white label; in step 2 it is simply unused by Aluminium/Blue Jeans).

**Ramps:**

- `accent` → `slate` 1:1.
- `brand` → the existing `gray` family, **re-indexed** so that the roles reading `brand-500` get graphite — *my call, flagged*. A 1:1 alias would make the primary `gray-500` (#757575). Every theme keeps pointing its roles at `brand-500` (so a child that only re-aims the brand ramp at a normal 500-pivot family, e.g. blue, gets a sensible primary). No new colour values:

| brand stop | → | value |
|---|---|---|
| 50–400 | `gray-50`…`gray-400` | as gray |
| 500 | `gray-800` | `#333333` (12.63:1 on white) |
| 600 | `gray-900` | `#1a1a1a` |
| 700 | `gray-900` | `#1a1a1a` |
| 800 | `black` | `#000000` |
| 900 | `black` | `#000000` |

  Consequence, accepted: the light primary is `#333333`, a hair lighter than the `#1a1a1a` of the mockup, so that hover/active (`brand-600`) can go **darker** (1.38:1 step). Hover direction: darker, like every ODS theme.

### Semantic mapping

- **Light**: start from **Aluminium light's role → stop mapping** (closest to the chosen direction and minimises the step-2 diff), with `brand` and `accent` re-aimed as above. Deltas a builder must apply on top: `color-focus` → `blue-600`; `surface-page` → `white` (same as raised/overlay); `content-text` → `accent-600`; `border-control` → `accent-500`; `surface-control-solid` and `surface-selected-solid` / `border-selected-solid` → `brand-500` (graphite), their hover/active → `brand-600`; `content-brand-minor` → `brand-500`. Aluminium values kept as they are include `surface-header` → `accent-100`, `content-heading` → `accent-800`, `shadow-raised` none. Exact remaining choices are the builder's, under the contrast rule (text ≥ 4.5:1, control borders/non-text ≥ 3:1).
- **Dark**: start from **Aluminium dark**, with: page `slate-900`, raised/overlay `slate-800`, header `slate-700`, brand surfaces and solid controls **near-white** (`surface-brand` → `brand-100`, hover → `brand-200`, `content-on-brand-solid` / `content-on-control-solid` → `gray-900`), `content-brand` → `brand-300`, focus → `blue-400` (Aluminium dark uses white, which would vanish against a near-white primary). Status colours as Aluminium dark.
- **Non-colour tokens** (space, radius, sizes, border, font, weights, opacity, motion, z-index, `shadow-overlay`): identical to Aluminium.
- **Charts**: `chart-series-01…10` identical to Aluminium (already a brand-agnostic categorical palette).
- **`--ods-semantic-color-brand`** (logo colour): `brand-700` → graphite.
- Component-level token overrides in the white label: only the few dark-mode ones Aluminium dark already carries (badge, message), kept so the white label renders those components as Aluminium dark does; no others. Components already declare their own defaults from semantic tokens (e.g. `--ods-avatar-background-color: var(--ods-semantic-color-surface-muted)`, `--ods-badge-padding-horizontal-sm: var(--ods-semantic-size-space-inset-inline)` in `@ovhcloud/ods-react`), so defining every semantic token is enough for every component to render; the completeness check covers semantic tokens only.

## Structure

### Step 1 (white label alone)

```
packages/themes/src/white-label/
  _variables.scss   ODS palette values + slate
  _palette.scss     palette as custom properties
  light.scss        ramps + every semantic token, light
  dark.scss         dark mode
```

- `package.json` `exports`: add `./white-label/css`, `./white-label/tokens`, `./white-label-dark/css`, `./white-label-dark/tokens` (same pattern as `blue-jeans`). Build: `bake-themes.js` and `generate-token-lists.js` pick the new folder up (verify; add it if they hold a theme list).
- Docs/Storybook: if the theme switcher there lists themes explicitly, add White label.
- **Showcase (this repo)**: add `White label` and `White label dark` to `src/hooks/useTheme.ts` and the theme picker, and to the visual test themes. Until a release ships it, consume the unreleased package through a local link / `pnpm` override to the built `packages/themes` (do not commit the link; switch to the published version once released).

### Step 2 (re-base the existing themes)

Today `dark.scss` `@use`s `light.scss`. With a parent, a naïve chain (white-label light → white-label dark → aluminium light deltas → aluminium dark deltas) breaks: Aluminium's *light* deltas would override the white label's *dark* values. So each theme splits its differences by mode:

```
src/aluminium/
  _shared.scss   palette re-aims (brand → blue, accent → navy) + mode-agnostic deltas (fonts, radius…)
  light.scss     @use '../white-label/light'; @use 'shared'; light-only deltas
  dark.scss      @use '../white-label/dark';  @use 'shared'; dark-only deltas
```

Same for `blue-jeans/` (including its component-level overrides). Mode deltas must also re-declare any white-label-dark-only value they don't want (e.g. Aluminium dark sets `surface-brand` back to `brand-500`).

**Acceptance test (golden):** for Aluminium and Blue Jeans, light and dark, the **resolved value of every token** after re-basing equals the one before re-basing. Reference: `pnpm tokens:resolve` output and `dist/*/*.tokens.json` captured on the step-2 branch's base commit, right before the change, so later upstream commits on `release/20.0.0` don't count as ours. Any difference fails the step.

**Diff report:** a script (based on `scripts/resolve-tokens.js`) that prints, per theme and mode, the tokens whose resolved value differs from the white label. It documents what each theme is and replaces "read 300 lines to compare".

## Delivery

- **Theme work** (steps 1 and 2): branches on the user's **fork** of `ovh/design-system`, based on `release/20.0.0`, opened as pull requests to `ovh/design-system`. One PR per step (step 2 depends on step 1).
- **Showcase work**: a separate change in this repo, consuming the unreleased `packages/themes` build (local link / `pnpm` override, not committed) until the white label is published, then pinned to the released version.

## Verification

- Step 1: every semantic token present in Aluminium's `light.tokens.json` / `dark.tokens.json` is present in the white label's (script check, no missing key). Contrast check of the text/control pairs (≥ 4.5:1 text, ≥ 3:1 non-text). Visual review of every component in the showcase, light and dark; Playwright visual snapshots added for the two new themes.
- Step 2: the golden test above; existing visual tests (showcase, Storybook) unchanged.

## Left to the builder

- The exact stop for each remaining semantic role, within the rules above (start from Aluminium's mapping, contrast rule).
- Whether `bake-themes.js` handles a three-level `@use` chain as is (to verify on `release/20.0.0`; the README says it merges a mode into a single `:root`).
- Naming of the package export (`white-label` proposed).
- Release/versioning of `@ovhcloud/ods-themes` (minor: additive in step 1; step 2 is a refactor with no output change).
