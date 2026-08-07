# Charte graphique — PRAFUL DESIGN

Design system du site, extrait de `assets/css/style.css`. Le site supporte un thème clair (par défaut) et un thème sombre, basculés via `data-theme` sur `<html>`.

## Couleurs de marque (identiques dans les deux thèmes)

| Nom | Variable | Valeur |
|---|---|---|
| Accent (indigo) | `--accent` | `#4f46e5` |
| Violet | `--violet` | `#38005f` |
| Prune | `--prune` | `#1c0030` |
| Texte sur aplat de marque | `--sur-couleur` | `#ffffff` |

Dégradés :
- `--degrade` : `linear-gradient(120deg, var(--violet) 0%, var(--accent) 100%)` — utilisé pour boutons primaires, logo, badges, bandeau CTA.
- `--degrade-texte` (clair) : `linear-gradient(100deg, #4f46e5 0%, #7c22ce 100%)`
- `--degrade-texte` (sombre) : `linear-gradient(100deg, #6366f1 0%, #a855f7 100%)`
- Bandeau CTA : `linear-gradient(130deg, #2d004d 0%, #6a0a75 55%, var(--accent) 100%)`

Couleurs d'appoint : jaune étoiles/notes `#ffc83d`, erreur `#ff6b8f`, succès `#4ade80` / `#86efac`.

## Thème clair (par défaut)

| Rôle | Variable | Valeur |
|---|---|---|
| Accent ajusté (contraste fond blanc) | `--accent-clair` | `#4338ca` |
| Violet ajusté | `--violet-clair` | `#6b1fa8` |
| Fond | `--fond` | `#ffffff` |
| Surface | `--surface` | `#ffffff` |
| Surface 2 | `--surface-2` | `#fbf7fd` |
| Bordure | `--bordure` | `rgba(28,0,48,.11)` |
| Bordure forte | `--bordure-forte` | `rgba(28,0,48,.2)` |
| Texte fort (titres) | `--texte-fort` | `#12001f` |
| Texte | `--texte` | `#241031` |
| Texte doux | `--texte-doux` | `#55425f` |
| Texte faible | `--texte-faible` | `#7d6c87` |

## Thème sombre

| Rôle | Variable | Valeur |
|---|---|---|
| Accent ajusté | `--accent-clair` | `#818cf8` |
| Violet ajusté | `--violet-clair` | `#6b1fa8` |
| Fond | `--fond` | `#06000b` |
| Surface | `--surface` | `#0e0117` |
| Surface 2 | `--surface-2` | `#170426` |
| Bordure | `--bordure` | `rgba(255,255,255,.09)` |
| Bordure forte | `--bordure-forte` | `rgba(255,255,255,.18)` |
| Texte fort | `--texte-fort` | `#ffffff` |
| Texte | `--texte` | `#f3eef7` |
| Texte doux | `--texte-doux` | `#b3a6c0` |
| Texte faible | `--texte-faible` | `#7e7189` |

Chaque thème définit aussi ses propres voiles translucides (`--voile`, `--voile-menu`, `--survol`, `--champ-fond`, `--teinte-alt`, `--voile-visuel`), halos d'ambiance (`--halo-1/2/3`) et ombres (`--ombre`, `--ombre-carte`, `--lueur`).

## Typographie

- Police : **Montserrat**, repli système (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`)
- Corps de texte : 16px, `line-height: 1.7`
- Titres : `font-weight: 800`, `letter-spacing: -0.02em`
  - `h1` : `clamp(2.4rem, 6vw, 4.2rem)`
  - `h2` : `clamp(1.9rem, 4vw, 2.9rem)`
  - `h3` : `clamp(1.15rem, 2vw, 1.4rem)`
- Surtitres / labels : petits caps, `letter-spacing` large (0.08–0.22em), souvent en `--accent-clair`

## Rythme et forme

| Token | Valeur | Usage |
|---|---|---|
| `--u` | 8px | unité de base |
| `--rayon` | 14px | rayon standard (cartes) |
| `--rayon-s` | 8px | rayon petit (champs) |
| `--rayon-pill` | 999px | boutons, badges, pastilles |
| `--largeur` | 1180px | largeur max du conteneur |
| `--gouttiere` | `clamp(20px, 5vw, 40px)` | marge latérale |
| `--transition` | `0.25s cubic-bezier(0.4,0,0.2,1)` | transition standard |

## Composants clés

- **Boutons** (`.btn`) : pill, majuscules, `font-weight: 700`
  - `.btn--primaire` : dégradé de marque, ombre `rgba(79,70,229,.35)`, se soulève au survol (`translateY(-2px)`)
  - `.btn--secondaire` : bordure + fond léger, s'accentue au survol
- **Cartes** (`.carte`, `.offre`, `.realisation`, `.temoignage`) : fond dégradé `surface-2 → surface`, bordure fine, se soulèvent au survol, rayon `--rayon`
- **En-tête** (`.entete`) : fixe, fond flouté (`backdrop-filter: blur(16px)`) une fois scrollé, hauteur 76px
- **Sous-menu nav** : carte flottante floutée (`blur(18px)`), items avec icône + titre + description
- **Bascule thème** : bouton rond, icône lune/soleil selon le thème actif
- **Formulaires** (`.champ`) : labels petits caps, champs à fond `--champ-fond`, focus = bordure accent + halo `0 0 0 3px rgba(79,70,229,.16)`
- **Bandeau CTA** : aplat dégradé sombre opaque (identique dans les deux thèmes), texte toujours blanc
- **FAQ** : accordéon, signe `+` qui pivote à 45° à l'ouverture

## Grille et layout

- Conteneur standard : `max-width: 1180px`, centré, padding latéral fluide
- Conteneur pleine largeur (`.conteneur--pleine`) : header/footer bord à bord
- Sections : padding vertical fluide `clamp(72px, 10vw, 128px)` (`.section`), variante resserrée `.section--serre`
- Grilles utilitaires : `.grille--2/3/4` en `auto-fit` avec `minmax()`

## Accessibilité et mouvement

- Focus visible : contour 2px `--accent-clair`, offset 3px
- Animations d'apparition (`.anim`) au scroll : fade + translateY(22px)
- `prefers-reduced-motion: reduce` respecté : animations quasi désactivées

## Fichiers sources

- Feuille de style : `assets/css/style.css`
- Palette confirmée par les commits récents : suppression du rose, remplacé par l'indigo (`4f46e5`) comme couleur d'accent unique de la marque
