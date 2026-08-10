# Praful Design — nouveau site

Site statique en HTML / CSS / JavaScript, sans dépendance ni framework.
Il fonctionne en ouvrant simplement `index.html`, et s'héberge partout
(OVH, o2switch, Netlify, Vercel, GitHub Pages…) par simple dépôt des fichiers.

## Structure

Le site est à la **racine du dépôt** (nécessaire pour GitHub Pages, qui sert
soit `/`, soit `/docs`).

```
index.html                        pages générées, à déployer telles quelles
services.html
creation-site-wordpress.html
refonte-site.html
maintenance-wordpress.html
seo-local.html
realisations.html
tarifs.html
a-propos.html
contact.html
mentions-legales.html

assets/
├── css/style.css                 toute la mise en forme
├── js/main.js                    menu, FAQ, animations, validation
└── img/                          (vide — à remplir, voir plus bas)

_src/                              SOURCES — ne pas déployer
├── layout.html                   en-tête + pied de page communs
└── pages/                        contenu de chaque page

build.js                          générateur

notes/                             notes de stratégie / positionnement (hors site)
demos/                             10 sites de démo (un par métier), à déployer
├── _retour/retour.css             bouton flottant « Revenir » commun aux démos
├── paysagiste/                    chaque démo : index / services / contact + assets
├── plombier-chauffagiste/
└── …                              liens depuis realisations.html#demos

docs/archive/                      ancienne version du site, conservée pour référence
```

## Modifier le site

**Changer le contenu d'une page** : éditez le fichier correspondant dans
`_src/pages/`, puis régénérez.

**Changer le menu, le logo ou le pied de page** : éditez `_src/layout.html`,
puis régénérez — la modification s'applique aux 11 pages d'un coup.

**Changer un titre ou une description SEO** : éditez l'objet `pages` en haut
de `build.js`.

Régénération :

```bash
node build.js
```

> Vous pouvez aussi éditer directement les `.html` de la racine, mais ils
> seront écrasés à la prochaine génération. Passez par `_src/` par sécurité.

## Aperçu en local

```bash
python3 -m http.server 4321
# puis ouvrez http://localhost:4321
```

## Thème clair / sombre

Le site s'affiche **en clair par défaut**. Le bouton lune, à droite du menu,
bascule vers l'univers sombre ; le choix est mémorisé dans le navigateur
(`localStorage`, clé `praful-theme`) et réappliqué à chaque visite.

Un court script dans le `<head>` de chaque page applique le thème mémorisé
**avant** le premier rendu, pour éviter que la page clignote en blanc avant
de passer en sombre. Il est dans `_src/layout.html` — à ne pas déplacer en
bas de page, sinon le flash réapparaît.

### Modifier les couleurs

Tout est en variables CSS en haut de `assets/css/style.css`, en trois blocs :

| Bloc | Rôle |
| ---- | ---- |
| `:root` | valeurs communes aux deux thèmes (typo, rayons, `--sur-couleur`) |
| `:root, :root[data-theme="light"]` | **thème clair** — celui par défaut |
| `:root[data-theme="dark"]` | thème sombre |

Une couleur changée dans un bloc se propage à tout le site.

> **Attention** : `--sur-couleur` (blanc fixe) sert au texte posé sur un aplat
> de marque — boutons primaires, badges, bandeaux CTA, vignettes. Ne le liez
> pas au thème, sinon ces textes deviennent noirs sur indigo en mode clair.

| Rôle | Clair | Sombre |
| ---- | ----- | ------ |
| Indigo (marque)  | `#4F46E5` | `#4F46E5` |
| Violet (marque)  | `#38005F` | `#38005F` |
| Accent / liens   | `#4338CA` | `#818CF8` |
| Fond             | `#FFFFFF` | `#06000B` |
| Texte            | `#241031` | `#F3EEF7` |
| Typographie      | Montserrat | Montserrat |

Les contrastes du thème clair ont été vérifiés : tous au niveau AA
(le plus faible, `--texte-faible`, est à 4,81:1).

## Élément 3D du hero

Le hero occupe toute la hauteur de l'écran (`100svh`) et contient un
conteneur vide prévu pour ça, dans `_src/pages/index.html` :

```html
<div class="hero__decor" aria-hidden="true"></div>
```

Il est en `position:absolute`, `inset:0`, `z-index:-1` et `pointer-events:none` :
votre `<canvas>` Three.js ou votre `<model-viewer>` s'y place en fond sans
recouvrir le texte ni bloquer les clics sur le formulaire.

Sur écran étroit (moins de 1024 px), le hero repasse en hauteur automatique
et l'indicateur « Découvrir » est masqué — le contenu empilé dépasse de toute
façon la hauteur d'écran.

## Page d'accueil

Les sections s'enchaînent dans cet ordre, chacune avec son `id` (utilisé par
les ancres et les CTA) : hero, `#realisations`, `#services`, `#pourquoi`,
`#a-propos`, `#chiffres`, `#methode`, `#simulateur`, `#tarifs`, `#avis`,
`#faq`, CTA final.

### Simulateur de projet (`#simulateur`)

Le configurateur vit dans `assets/js/main.js` (bloc « Simulateur de projet »).
**Il n'invente aucun tarif** : chaque fourchette reprend une offre publiée sur
`tarifs.html`, et toute combinaison non couverte affiche « Estimation
personnalisée ». Si vous changez un prix sur la page Tarifs, changez-le aussi
dans la fonction `estimer()` — c'est le seul endroit à mettre à jour.

Les cases « éléments déjà disponibles » ne modifient aucun montant : elles
ajoutent seulement une note indiquant où l'on se situe dans la fourchette.

Le bouton « Recevoir mon estimation » ouvre `contact.html` avec les
paramètres `?besoin=…&message=…` ; un court bloc de `main.js` pré-remplit
alors le formulaire de contact.

### Compteurs des chiffres clés

Les `.chiffre__val` portent `data-compteur` (valeur finale) et éventuellement
`data-suffixe`. La valeur définitive est déjà écrite dans le HTML : sans JS,
ou en mouvement réduit, le chiffre s'affiche simplement tel quel.

## À faire avant la mise en ligne

1. **Mentions légales** — remplacer tous les `[crochets]` de
   `_src/pages/mentions-legales.html` : statut juridique, SIREN, TVA,
   adresse, téléphone et hébergeur. C'est une obligation légale.

2. **Brancher les formulaires** — ils valident la saisie mais n'envoient
   rien pour l'instant. Ajoutez un attribut `action` aux deux balises
   `<form>` (accueil et contact) :

   ```html
   <form action="https://formspree.io/f/VOTRE_ID" method="POST" data-valider novalidate>
   ```

   Avec un `action` renseigné, `main.js` laisse le navigateur poster
   normalement ; sans `action`, il affiche le message de confirmation
   sans rien envoyer. Formspree, Brevo, Netlify Forms ou un script PHP
   maison conviennent tous.

3. **Visuels** — les vignettes de la page Réalisations sont pour l'instant
   des blocs colorés avec le secteur d'activité. Remplacez-les par de vraies
   captures d'écran dans `assets/img/`.

   Sur l'accueil, les trois cartes de `#realisations` utilisent
   `assets/img/realisation-elsa|laurie|sandrine.jpg` — ce sont les **photos
   des clientes** (copies de `IMG CLIENTS/`), pas des captures de site. Pour
   passer à des captures, il suffit de changer le `src` : le cadre est en 4/3
   et s'adapte aussi bien à un portrait carré qu'à une capture en paysage.

4. **Logo** — le bloc « PD » est un placeholder typographique. Le logo
   d'origine est disponible ici :
   `https://praful-design.fr/wp-content/uploads/2025/01/LOGO-5000px-BLANC.png`

5. **Favicon** — à ajouter dans `_src/layout.html`.

6. **Contenu des réalisations et témoignages** — les six projets et les trois
   témoignages sont des exemples plausibles construits d'après votre activité,
   pas des données réelles. À remplacer par vos vrais clients et vos vrais
   chiffres avant publication.
