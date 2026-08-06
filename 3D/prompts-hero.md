# Prompts modèle 3D — Hero section

Objectif : générer un objet 3D (export `.glb`) pour illustrer le hero de la page d'accueil, dans `.hero__decor` (voir `assets/css/style.css`).

**Ce que fait Praful Design** (à représenter, pas juste "un studio créatif abstrait") :
- Création et refonte de sites **WordPress** pour professionnels (voir `creation-site-wordpress.html`, `refonte-site.html`)
- **Maintenance WordPress** (`maintenance-wordpress.html`)
- Service dédié aux **mairies / collectivités** : gestion de CMS, site institutionnel, autonomie de mise à jour du contenu par les agents municipaux (`collectivites.html`)
- SEO local (`seo-local.html`)

L'objet doit donc évoquer clairement **le web + l'institutionnel/municipal**, pas une forme purement décorative. Deux pistes concrètes ci-dessous : une centrée site web/CMS, une qui fusionne bâtiment public et interface web (pour parler autant aux pros qu'aux mairies).

Couleurs strictement issues de la charte graphique (`notes/Charte graphique.md`) :

- Violet de marque : `#38005F` (`--violet`)
- Indigo de marque : `#4F46E5` (`--accent`)
- Dégradé de référence : `linear-gradient(120deg, #38005F 0%, #4F46E5 100%)` (`--degrade`)

Aucune autre couleur ne doit apparaître sur l'objet (pas de rose, pas de bleu cyan, pas de couleurs additionnelles) : uniquement le dégradé violet → indigo, avec reflets blancs/glass neutres.

## Prompt principal — "site web en construction / panneau CMS"

Représente le cœur du métier : construire et administrer un site (blocs de contenu qui s'assemblent, comme dans un CMS).

```
Abstract 3D object representing a website being built in a CMS: a
thin glass browser window / rounded rectangle panel, floating,
with a few smaller rounded content blocks (text bar, image block,
button pill) detaching from it and orbiting around, as if content
modules are being assembled into a webpage in real time.
Material: frosted glossy glass with subtle inner glow, gradient from
deep violet (#38005F) to indigo (#4F46E5), soft iridescent highlights,
no other colors.
Style: minimal, elegant, premium tech branding, futuristic, clean
topology, no text, no logo, no readable UI text, centered composition,
studio lighting, soft rim light, subtle ambient occlusion, transparent
background. Single hero object, high detail on silhouette, low
visual noise.
```

## Variante alternative — "mairie + site web" (parle aussi au marché collectivités)

Fusionne un bâtiment institutionnel stylisé (mairie / fronton à colonnes, très abstrait) avec une interface web, pour représenter l'offre CMS collectivités.

```
Abstract 3D emblem merging a minimal stylized town hall facade
(a few simple columns and a triangular pediment, heavily abstracted,
architectural but not literal) with a glass browser window panel
emerging from its center, as if the building is transforming into a
website interface. Small rounded UI blocks (menu bar, content card)
gently orbit the structure.
Material: frosted glossy glass with subtle inner glow, gradient from
deep violet (#38005F) to indigo (#4F46E5), soft iridescent highlights,
no other colors.
Style: minimal, elegant, premium civic-tech branding, futuristic,
clean topology, no text, no logo, no readable UI text, centered
composition, studio lighting, soft rim light, subtle ambient
occlusion, transparent background. Single hero object, high detail
on silhouette, low visual noise.
```

## Variante 3 — "blocs qui s'assemblent" (générique construction de site)

```
Abstract geometric sculpture made of a few rounded cubes and thin
rings orbiting each other, mid-assembly, as if a website is being
built block by block. Glossy translucent glass material blending
violet (#38005F) into indigo (#4F46E5) with soft internal glow,
no other colors present.
Minimal, premium, futuristic tech aesthetic, clean silhouette,
studio three-point lighting, soft shadows, centered, no text.
```

## Paramètres techniques à préciser dans l'outil de génération

- **Export** : `.glb` (glTF binary), textures embarquées
- **Poly count** : low-to-mid poly (10k–50k tris) pour rester fluide en `<model-viewer>` / three.js
- **Pivot** : objet centré à l'origine, échelle normalisée (~1–2 unités)
- **Animation** (si disponible) : léger idle rotation / "untwist" en boucle — sinon rotation gérée en CSS/JS côté site
- **Éclairage** : neutre/studio, pas de fond cuit dans les textures — géré ensuite via `<model-viewer>` env-image ou Three.js pour matcher le thème clair/sombre du site

## Intégration prévue

Le fichier `.glb` généré ira dans `3D/` (ou `assets/3d/` au moment de l'intégration) et sera chargé dans `.hero__decor`, déjà réservé à cet effet dans `assets/css/style.css`.
