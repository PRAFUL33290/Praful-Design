#!/usr/bin/env node
/**
 * Générateur de pages Praful Design.
 *
 *   node build.js
 *
 * Assemble `_src/layout.html` (en-tête + pied de page communs) avec chaque
 * fichier de `_src/pages/` et écrit les .html finaux à la racine du site.
 * Le résultat est du HTML statique pur : aucune dépendance à l'exécution.
 *
 * Pour modifier le menu ou le pied de page, on édite `_src/layout.html`
 * puis on relance cette commande.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const racine = __dirname;
const layout = fs.readFileSync(path.join(racine, "_src/layout.html"), "utf8");

/* Métadonnées de chaque page. La clé correspond au nom de fichier. */
const pages = {
  "index": {
    title: "Praful Design — Webdesigner WordPress pour indépendants et TPE | Parempuyre (33)",
    description: "J'aide les indépendants et petites entreprises à transformer leur site WordPress en outil crédible, rapide et visible localement. Création, refonte, maintenance et SEO local en Gironde.",
    canonical: "",
    nav: "index",
    head: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Praful Design",
  "description": "Webdesigner et webmaster WordPress pour indépendants, TPE et petites structures locales.",
  "url": "https://praful-design.fr/",
  "email": "contact@praful-design.fr",
  "areaServed": "Gironde, Bordeaux Métropole",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Parempuyre",
    "postalCode": "33290",
    "addressCountry": "FR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "42"
  }
}
</script>`
  },
  "services": {
    title: "Services — Création, refonte, maintenance et SEO local WordPress | Praful Design",
    description: "Création de site WordPress, refonte, maintenance mensuelle et SEO local pour indépendants et TPE en Gironde. Un interlocuteur unique du design à la mise en ligne.",
    canonical: "services.html",
    nav: "services"
  },
  "creation-site-wordpress": {
    title: "Création de site WordPress pour indépendants et TPE | Praful Design",
    description: "Un site vitrine WordPress sur mesure, structuré pour transformer vos visiteurs en demandes de devis. À partir de 1 500 € HT, livré en 3 à 5 semaines.",
    canonical: "creation-site-wordpress.html",
    nav: "services"
  },
  "refonte-site": {
    title: "Refonte de site WordPress — moderniser sans perdre votre SEO | Praful Design",
    description: "Votre site vieillit mal, il est lent ou ne vous ressemble plus. Refonte complète avec audit préalable, nouvelle structure et redirections gérées.",
    canonical: "refonte-site.html",
    nav: "services"
  },
  "maintenance-wordpress": {
    title: "Maintenance WordPress — mises à jour, sauvegardes, sécurité | Praful Design",
    description: "Abonnement de maintenance WordPress de 49 à 149 € par mois : mises à jour, sauvegardes automatiques, surveillance sécurité et petites corrections incluses.",
    canonical: "maintenance-wordpress.html",
    nav: "services"
  },
  "seo-local": {
    title: "SEO local — être trouvé par les clients près de chez vous | Praful Design",
    description: "Référencement local pour artisans, commerçants et indépendants en Gironde : Google Business Profile, pages locales, données structurées et suivi des positions.",
    canonical: "seo-local.html",
    nav: "services"
  },
  "realisations": {
    title: "Réalisations — sites WordPress créés et refondus | Praful Design",
    description: "Exemples concrets de sites créés et refondus pour des indépendants et TPE de Gironde, avec l'avant et l'après de chaque projet.",
    canonical: "realisations.html",
    nav: "realisations"
  },
  "collectivites": {
    title: "Collectivités & mairies — sites communaux clairs et sécurisés | Praful Design",
    description: "Création, refonte et maintenance de sites pour mairies, communautés de communes et petites collectivités : simplicité d'administration, accessibilité et sécurité.",
    canonical: "collectivites.html",
    nav: "collectivites"
  },
  "tarifs": {
    title: "Tarifs — forfaits site WordPress, refonte, SEO et maintenance | Praful Design",
    description: "Audit à partir de 150 €, refonte vitrine de 1 500 à 3 500 € HT, refonte complète avec SEO local de 3 500 à 6 000 € HT, maintenance de 49 à 149 € par mois.",
    canonical: "tarifs.html",
    nav: "tarifs"
  },
  "a-propos": {
    title: "À propos — Julien, webdesigner WordPress à Parempuyre (33) | Praful Design",
    description: "Webdesigner et webmaster WordPress installé à Parempuyre en Gironde. Un interlocuteur unique pour le site, la technique et la visibilité locale.",
    canonical: "a-propos.html",
    nav: "a-propos"
  },
  "contact": {
    title: "Contact — demander un devis gratuit | Praful Design",
    description: "Décrivez votre projet en quelques lignes, je vous réponds sous 24 h ouvrées. Devis gratuit et sans engagement, à Parempuyre, Bordeaux ou à distance.",
    canonical: "contact.html",
    nav: "contact"
  },
  "mentions-legales": {
    title: "Mentions légales et politique de confidentialité | Praful Design",
    description: "Mentions légales, hébergement, propriété intellectuelle et traitement des données personnelles du site praful-design.fr.",
    canonical: "mentions-legales.html",
    nav: "mentions-legales"
  }
};

/* Remplace les marqueurs {{actif:slug}} par la classe active de la page. */
function appliquerNav(html, navCourante) {
  return html.replace(/\{\{actif:([a-z-]+)\}\}/g, (_, slug) =>
    slug === navCourante ? " est-actif" : ""
  );
}

let generees = 0;

for (const [slug, meta] of Object.entries(pages)) {
  const source = path.join(racine, "_src/pages", slug + ".html");

  if (!fs.existsSync(source)) {
    console.warn("  ⚠ source manquante, page ignorée : " + slug + ".html");
    continue;
  }

  const contenu = fs.readFileSync(source, "utf8").trim();

  const sortie = appliquerNav(layout, meta.nav)
    .replace(/\{\{title\}\}/g, meta.title)
    .replace(/\{\{description\}\}/g, meta.description)
    .replace(/\{\{canonical\}\}/g, meta.canonical)
    .replace("{{head}}", meta.head || "")
    .replace("{{content}}", contenu);

  fs.writeFileSync(path.join(racine, slug + ".html"), sortie);
  console.log("  ✓ " + slug + ".html");
  generees++;
}

console.log("\n" + generees + " page(s) générée(s).");
