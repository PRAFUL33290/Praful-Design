# Praful Design — Présentation du projet

## Le but

Praful Design est le site vitrine professionnel d'un webdesigner/webmaster indépendant, basé à
Parempuyre (33), en Gironde. L'objectif du site est de :

- présenter une offre claire de services WordPress à destination des indépendants, artisans,
  commerçants, TPE et petites entreprises locales ;
- démontrer un savoir-faire (réalisations, compétences) pour installer la confiance ;
- générer des demandes de devis qualifiées via des pages dédiées par service et un formulaire de
  contact ;
- se positionner aussi sur un segment complémentaire : les collectivités (mairies), avec une grille
  tarifaire et un discours adaptés.

Positionnement éditorial : un profil hybride — dix ans d'animation de groupes + quatre ans au
service communication d'une mairie — qui met en avant une capacité à créer des sites et contenus
qui parlent vraiment aux publics visés, pas seulement une compétence technique.

## Les services proposés

1. **Création de site WordPress** (`creation-site-wordpress.html`)
   Site vitrine sur mesure, pensé pour convertir.

2. **Refonte de site** (`refonte-site.html`)
   Reprise d'un site existant pour le moderniser (design, performance, structure).

3. **Maintenance WordPress** (`maintenance-wordpress.html`)
   Mises à jour, sauvegardes, sécurité — suivi mensuel.

4. **SEO local** (`seo-local.html`)
   Être trouvé par les clients à proximité (référencement local en Gironde / Bordeaux Métropole).

5. **Collectivités** (`collectivites.html`)
   Offre et grille tarifaire spécifiques pour les mairies et structures publiques.

Autres compétences mises en avant sur le site : design graphique, montage vidéo, no-code & IA.

## Structure du site

- `index.html` — page d'accueil (hero avec maquette 3D d'un tableau de bord WordPress, présentation,
  compétences)
- `services.html` — vue d'ensemble de tous les services
- `creation-site-wordpress.html`, `refonte-site.html`, `maintenance-wordpress.html`,
  `seo-local.html` — une page dédiée par service
- `collectivites.html` — offre destinée aux mairies
- `realisations.html` — portfolio / exemples de projets réalisés
- `tarifs.html` — grille tarifaire (séparée pros vs collectivités, fourchettes de prix assumées).
  Fonctionnement en 3 étapes : audit & plan d'action → devis clair sous 24h → livraison + formation.
  Un encart précise ce qui est "toujours inclus" et ce qui n'est "jamais inclus".
- `a-propos.html` — présentation personnelle / parcours
- `contact.html` — formulaire / demande de devis
- `mentions-legales.html` — mentions légales

## Aspects techniques notables

- Site statique HTML/CSS (`assets/css/style.css`), sans framework front lourd.
- Thème clair/sombre avec mémorisation du choix utilisateur (`localStorage`), clair par défaut.
- Modèle 3D interactif dans le hero de la page d'accueil (`<model-viewer>`, fichier `.glb`).
- Données structurées (JSON-LD `ProfessionalService`) pour le SEO local (adresse, zone desservie,
  note moyenne).
- Un `build.js` à la racine (probable étape de build/optimisation).

## Zone géographique ciblée

Gironde, avec un focus sur Bordeaux Métropole et Parempuyre.

## Contact

contact@praful-design.fr
