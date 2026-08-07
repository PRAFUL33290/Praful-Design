# Praful Design — Design System

## Overview

Praful Design is a French-language web design studio/agency (copy uses "offre", "réalisation", "témoignage", "devis" — the vocabulary of a small studio selling websites and brand identities to clients). This system was extracted from the studio's own marketing website styles (`assets/css/style.css`, provided as a written specification — no live codebase, Figma file, or asset export was attached this run). It supports a light theme (default) and a dark theme, toggled via `data-theme` on `<html>`.

**Sources given:** a prose/table extract of `assets/css/style.css` (colors, type scale, spacing tokens, component descriptions). No Figma link, GitHub repo, logo files, product screenshots, or slide deck were attached — so no product-screen recreation from real markup was possible; the UI kit below is composed from the component descriptions in that extract, not from live HTML/CSS.

## Components

Built from the "Composants clés" inventory in the source extract — one family per described component, nothing invented beyond it:

- **Button** (`components/buttons`) — pill CTA, primaire (gradient) / secondaire (outline)
- **Field** (`components/forms`) — labeled form input (`.champ`)
- **Card** (`components/cards`) — generic surface card covering carte / offre / réalisation / témoignage
- **Badge** (`components/feedback`) — small pill label
- **Header** (`components/navigation`) — sticky site header
- **SubMenu** (`components/navigation`) — floating blurred nav dropdown
- **ThemeToggle** (`components/navigation`) — light/dark round toggle
- **Accordion** (`components/content`) — FAQ accordion, rotating `+`
- **CTABanner** (`components/layout`) — opaque dark-gradient call-to-action band

### Intentional additions
None beyond the source's own component list.

## UI Kit

`ui_kits/site-vitrine/` — an interactive one-page recreation of the studio's own marketing homepage (hero, offres, réalisations, témoignages, CTA banner, FAQ), composed from the components above. Theme toggle and FAQ accordion are live.

## Content fundamentals

- **Language & voice:** French, second person informal-professional ("vos clients", "votre projet") — the studio speaks directly to the prospective client, not about itself in the abstract.
- **Casing:** Sentence case in headings and buttons (no ALL CAPS in copy itself — buttons are visually uppercased via CSS `text-transform`, not by typing capitals).
- **Tone:** Confident, concise, outcome-focused — "sites qui convertissent", "présence en ligne claire, rapide". Short benefit statements over long descriptions.
- **Structure:** Eyebrow label (small caps) → heading → one-line description is the recurring copy pattern for every section.
- **Emoji:** Not used. The only ornamental glyphs are the `+`/`×` FAQ toggle and a ★ star note in yellow.
- **CTAs:** Action verbs — "Demander un devis", "Voir nos réalisations" — always paired with a low-commitment secondary action.

## Visual foundations

- **Color:** One accent (`#4f46e5` indigo) carries the whole brand; violet/prune are the darker gradient partners. No secondary "brand colors" — pink was explicitly removed in favor of indigo as the single accent. Semantic colors (yellow notes, pink-red error, green success) are used sparingly, only where meaning is needed.
- **Type:** Montserrat throughout, no serif or mono anywhere. Headings are heavy (800) with tight negative tracking; body text is calm at 16px/1.7. Eyebrow labels are small, uppercase, and wide-tracked in the accent color — this is the studio's main "structure" signal at the top of every section.
- **Gradients:** Used purposefully, not decoratively — one diagonal brand gradient (`--degrade`) for primary buttons/logo/badges, a separate warmer violet→accent text gradient for emphasized headline words, and a third, darker opaque gradient reserved only for the CTA banner (identical in both themes, so it always reads on white text).
- **Backgrounds:** No photography, no illustration, no repeating pattern/texture in the spec — surfaces are flat or gradient-subtle (`surface-2 → surface`). The only "image-like" background is the CTA banner's dark gradient.
- **Blur/transparency:** Reserved for two specific overlays — the header once scrolled, and the floating nav submenu — both `backdrop-filter: blur(16–18px)` over a translucent surface. Not used elsewhere (no glass cards, no blurred imagery).
- **Motion:** One shared easing (`0.25s cubic-bezier(0.4,0,0.2,1)`) everywhere. Scroll-in content fades and rises 22px (`.anim`). Reduced-motion is explicitly respected (near-zero durations).
- **Hover states:** Primary buttons lift `-2px` and deepen their shadow; secondary buttons tint their background/border toward the accent; cards lift `-4px` with a stronger shadow. No opacity-based hovers, no color inversion.
- **Press/active states:** Not specified in the source; treat as a slight reduction of the hover lift (no scale/shrink pattern is documented — do not invent one).
- **Borders:** Hairline, low-opacity dark (light theme) or white (dark theme) — never a solid brand-colored border except on focus.
- **Shadows:** Soft and purple-tinted, never pure black — a light ambient shadow (`--ombre`) and a stronger card shadow (`--ombre-carte`) used only on hover/elevation, plus a focus "glow" ring (`--lueur`) on form fields.
- **Corner radii:** 14px standard for cards, 8px for small elements/fields, full pill (999px) for buttons, badges, and toggles. No sharp corners anywhere in UI chrome.
- **Cards:** Subtle diagonal gradient background (surface-2 → surface), 1px hairline border, 14px radius, soft shadow that intensifies on hover with a lift — never a colored left-border accent.
- **Layout:** Centered 1180px max-width container, fluid side gutters, fluid vertical section padding (72–128px) — generous breathing room, not dense.
- **Fixed elements:** Only the header is fixed/sticky; nothing else pins to viewport edges.

## Iconography

No icon font, sprite, or SVG set was included in the source extract — only two icons are explicitly described (sun/moon on the theme toggle) and a rotating `+`/`×` glyph for FAQ items. Rather than hand-drawing icon shapes, this system uses simple inline-SVG line glyphs for the theme toggle (sun/moon, stroke-based, matching the studio's crisp minimal aesthetic) and CSS-drawn "+" for the accordion — **this is a substitution**; if the studio has a real icon set (e.g. a Lucide/Heroicons install, or custom SVGs), please share it so these can be swapped for the authentic asset. No emoji or unicode-glyph icons are used anywhere else in the spec.

## Assets

No logo file, product screenshot, illustration, or photography was provided this run. **No logo was invented** — the wordmark renders as plain gradient-clipped Montserrat type everywhere a mark would go (header, thumbnail). If a logo file exists, please attach it.

## Fonts

Montserrat is loaded via Google Fonts CDN (`tokens/fonts.css`) since no local `.woff2`/`.ttf` files were provided. If you have the studio's licensed font files, share them and this can switch to self-hosted `@font-face`.

## Index

- `styles.css` — root stylesheet, imports everything below
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`
- `components/` — `buttons/Button`, `forms/Field`, `cards/Card`, `feedback/Badge`, `navigation/Header`, `navigation/SubMenu`, `navigation/ThemeToggle`, `content/Accordion`, `layout/CTABanner`
- `ui_kits/site-vitrine/` — interactive homepage recreation
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups)
- `thumbnail.html` — project tile
- `SKILL.md` — Claude Code-compatible skill wrapper

## Caveats

- Built from a written CSS extract, not a live codebase/Figma — exact component markup/behavior (e.g. real header sub-menu content, real FAQ copy, real hover shadow values beyond what was described) is inferred from the prose spec, not copied from source.
- No logo, imagery, or icon assets were available — flagged above, substitutes noted.
