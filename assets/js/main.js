/* ==========================================================================
   PRAFUL DESIGN — Interactions
   Vanilla JS, sans dépendance.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     En-tête persistant
     Toujours visible ; une ombre légèrement plus marquée apparaît après
     le début du défilement pour le détacher du contenu.
     --------------------------------------------------------------- */
  var entete = document.querySelector(".entete");

  if (entete) {
    var actualiserEntete = function () {
      entete.classList.toggle("est-defile", window.scrollY > 20);
    };

    actualiserEntete();
    window.addEventListener("scroll", actualiserEntete, { passive: true });
  }

  /* ---------------------------------------------------------------
     Volet mobile
     Ouverture par le burger, fermeture par la croix, le voile, la touche
     Échap ou un clic sur un lien. `inert` retire tout le panneau du
     parcours clavier tant qu'il est fermé.
     --------------------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var volet = document.getElementById("volet");
  var voletFond = document.getElementById("volet-fond");

  if (burger && volet && voletFond) {
    var fermeture = volet.querySelector(".volet__fermer");

    function ouvrirVolet() {
      voletFond.hidden = false;
      // Un frame d'écart, sinon la transition d'opacité du voile est ignorée.
      requestAnimationFrame(function () {
        voletFond.classList.add("est-ouvert");
      });
      volet.classList.add("est-ouvert");
      volet.removeAttribute("inert");
      volet.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (fermeture) fermeture.focus();
    }

    function fermerVolet(rendreFocus) {
      voletFond.classList.remove("est-ouvert");
      volet.classList.remove("est-ouvert");
      volet.setAttribute("inert", "");
      volet.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (rendreFocus) burger.focus();
      // On attend la fin du glissement avant de retirer le voile du DOM.
      setTimeout(function () {
        if (!volet.classList.contains("est-ouvert")) voletFond.hidden = true;
      }, 320);
    }

    burger.addEventListener("click", function () {
      if (volet.classList.contains("est-ouvert")) fermerVolet(true);
      else ouvrirVolet();
    });

    voletFond.addEventListener("click", function () { fermerVolet(false); });
    if (fermeture) {
      fermeture.addEventListener("click", function () { fermerVolet(true); });
    }

    volet.querySelectorAll("a").forEach(function (lien) {
      lien.addEventListener("click", function () { fermerVolet(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && volet.classList.contains("est-ouvert")) {
        fermerVolet(true);
      }
    });

    // Retour en desktop alors que le volet est ouvert : on remet tout à plat.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && volet.classList.contains("est-ouvert")) {
        fermerVolet(false);
      }
    });
  }

  /* ---------------------------------------------------------------
     Sous-menu « Services »
     Au clavier et en mobile il s'ouvre au clic ; en desktop le survol
     est géré en CSS.
     --------------------------------------------------------------- */
  document.querySelectorAll(".nav__lien--parent").forEach(function (bouton) {
    var sousMenu = document.getElementById(bouton.getAttribute("aria-controls"));
    if (!sousMenu) return;

    bouton.addEventListener("click", function (e) {
      e.preventDefault();
      var ouvert = sousMenu.classList.toggle("est-ouvert");
      bouton.setAttribute("aria-expanded", String(ouvert));
    });

    // Clic en dehors : on referme.
    document.addEventListener("click", function (e) {
      if (!bouton.parentElement.contains(e.target)) {
        sousMenu.classList.remove("est-ouvert");
        bouton.setAttribute("aria-expanded", "false");
      }
    });

    // Échap : on referme et on rend le focus au bouton.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sousMenu.classList.contains("est-ouvert")) {
        sousMenu.classList.remove("est-ouvert");
        bouton.setAttribute("aria-expanded", "false");
        bouton.focus();
      }
    });
  });

  /* ---------------------------------------------------------------
     FAQ en accordéon
     --------------------------------------------------------------- */
  document.querySelectorAll(".faq__question").forEach(function (question) {
    var reponse = document.getElementById(question.getAttribute("aria-controls"));
    if (!reponse) return;

    question.addEventListener("click", function () {
      var etaitOuvert = question.getAttribute("aria-expanded") === "true";

      // Un seul panneau ouvert à la fois.
      question.closest(".faq").querySelectorAll(".faq__question").forEach(function (autre) {
        autre.setAttribute("aria-expanded", "false");
        var panneau = document.getElementById(autre.getAttribute("aria-controls"));
        if (panneau) panneau.style.maxHeight = null;
      });

      if (!etaitOuvert) {
        question.setAttribute("aria-expanded", "true");
        reponse.style.maxHeight = reponse.scrollHeight + "px";
      }
    });
  });

  /* Le texte se re-répartit au redimensionnement : la hauteur figée à
     l'ouverture deviendrait fausse (réponse tronquée en portrait). */
  window.addEventListener("resize", function () {
    document.querySelectorAll('.faq__question[aria-expanded="true"]').forEach(function (q) {
      var panneau = document.getElementById(q.getAttribute("aria-controls"));
      if (panneau) panneau.style.maxHeight = panneau.scrollHeight + "px";
    });
  });

  /* ---------------------------------------------------------------
     Apparition au défilement
     --------------------------------------------------------------- */
  var aAnimer = document.querySelectorAll(".anim");

  if ("IntersectionObserver" in window && aAnimer.length) {
    var observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree, i) {
          if (!entree.isIntersecting) return;
          // Léger décalage pour un effet en cascade.
          setTimeout(function () {
            entree.target.classList.add("est-visible");
          }, i * 70);
          observateur.unobserve(entree.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    aAnimer.forEach(function (el) { observateur.observe(el); });
  } else {
    aAnimer.forEach(function (el) { el.classList.add("est-visible"); });
  }

  /* ---------------------------------------------------------------
     Formulaires : validation côté client
     L'envoi réel dépend du service branché sur l'attribut action
     (Formspree, script PHP, Netlify Forms…). Sans action définie,
     on se contente d'afficher le message de confirmation.
     --------------------------------------------------------------- */
  var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validerChamp(champ) {
    var saisie = champ.querySelector("input, textarea, select");
    if (!saisie) return true;

    var valide = true;

    if (saisie.hasAttribute("required")) {
      valide = saisie.type === "checkbox" ? saisie.checked : saisie.value.trim() !== "";
    }
    if (valide && saisie.type === "email" && saisie.value.trim() !== "") {
      valide = regexEmail.test(saisie.value.trim());
    }

    champ.classList.toggle("est-invalide", !valide);
    return valide;
  }

  document.querySelectorAll("form[data-valider]").forEach(function (form) {
    var champs = form.querySelectorAll(".champ");
    var statut = form.querySelector(".form__statut");

    champs.forEach(function (champ) {
      var saisie = champ.querySelector("input, textarea, select");
      if (!saisie) return;
      // On ne re-valide en direct qu'un champ déjà signalé en erreur.
      saisie.addEventListener("input", function () {
        if (champ.classList.contains("est-invalide")) validerChamp(champ);
      });
    });

    form.addEventListener("submit", function (e) {
      var toutValide = true;
      champs.forEach(function (champ) {
        if (!validerChamp(champ)) toutValide = false;
      });

      if (!toutValide) {
        e.preventDefault();
        var premier = form.querySelector(".champ.est-invalide input, .champ.est-invalide textarea, .champ.est-invalide select");
        if (premier) premier.focus();
        return;
      }

      // Pas de destination configurée : on simule la confirmation.
      if (!form.getAttribute("action")) {
        e.preventDefault();
        form.reset();
        if (statut) {
          statut.classList.add("est-visible");
          statut.focus();
        }
      }
    });
  });

  /* ---------------------------------------------------------------
     Chiffres clés : compteur au défilement
     La valeur finale est déjà dans le HTML : sans JS, ou en mouvement
     réduit, le chiffre s'affiche simplement tel quel.
     --------------------------------------------------------------- */
  var mouvementReduit = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  var compteurs = document.querySelectorAll("[data-compteur]");

  if (compteurs.length && !mouvementReduit && "IntersectionObserver" in window) {
    var animerCompteur = function (el) {
      var cible = parseFloat(el.getAttribute("data-compteur"));
      var suffixe = el.getAttribute("data-suffixe") || "";
      if (isNaN(cible)) return;

      var duree = 1100;
      var depart = null;

      function etape(horodatage) {
        if (depart === null) depart = horodatage;
        var avancee = Math.min((horodatage - depart) / duree, 1);
        // Sortie en douceur : rapide au début, freinage sur la fin.
        var adouci = 1 - Math.pow(1 - avancee, 3);
        el.textContent = Math.round(cible * adouci) + suffixe;
        if (avancee < 1) requestAnimationFrame(etape);
      }

      requestAnimationFrame(etape);
    };

    var observateurChiffres = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (!entree.isIntersecting) return;
          animerCompteur(entree.target);
          observateurChiffres.unobserve(entree.target);
        });
      },
      { threshold: 0.4 }
    );

    compteurs.forEach(function (el) { observateurChiffres.observe(el); });
  }

  /* ---------------------------------------------------------------
     Simulateur de projet
     Les fourchettes reproduisent strictement les tarifs publiés sur
     tarifs.html. Toute combinaison non couverte par une offre existante
     renvoie « Estimation personnalisée » : on n'invente aucun montant.
     --------------------------------------------------------------- */
  var simu = document.getElementById("simu");

  if (simu) {
    var simuPrix = document.getElementById("simu-prix");
    var simuOffre = document.getElementById("simu-offre");
    var simuNotes = document.getElementById("simu-notes");
    var simuCta = document.getElementById("simu-cta");

    var PERSONNALISE = "Estimation personnalisée";

    // Correspondance type de projet → jeu d'options de l'étape 2 et
    // libellé repris tel quel dans le formulaire de contact.
    var TYPES = {
      vitrine:     { groupe: "site",        besoin: "Création de site WordPress" },
      refonte:     { groupe: "site",        besoin: "Refonte de site" },
      maintenance: { groupe: "maintenance", besoin: "Maintenance mensuelle" },
      seo:         { groupe: "seo",         besoin: "SEO local" }
    };

    function estimer(type, taille) {
      if (type === "vitrine") {
        if (taille === "7+") {
          return {
            prix: PERSONNALISE,
            offre: "Au-delà du forfait vitrine",
            notes: ["Le forfait « Création de site vitrine » couvre 1 à 5 pages (1 500 – 3 000 € HT). Au-delà, le périmètre se chiffre au cas par cas."]
          };
        }
        return {
          prix: "1 500 – 3 000 € HT",
          offre: "Offre « Création de site vitrine »",
          notes: taille === "4-6"
            ? ["Le forfait couvre 1 à 5 pages : au-delà de 5 pages, comptez le haut de la fourchette."]
            : []
        };
      }

      if (type === "refonte") {
        if (taille === "7+") {
          return {
            prix: "3 500 – 6 000 € HT",
            offre: "Offre « Refonte complète + SEO local »",
            notes: ["Au-delà de 5 pages, la refonte bascule généralement sur l'offre complète, avec copywriting et SEO local."]
          };
        }
        return {
          prix: "1 500 – 3 500 € HT",
          offre: "Offre « Refonte site vitrine »",
          notes: taille === "4-6"
            ? ["Le forfait couvre 1 à 5 pages : au-delà de 5 pages, comptez le haut de la fourchette."]
            : []
        };
      }

      if (type === "maintenance") {
        if (taille === "socle") {
          return {
            prix: "49 € / mois",
            offre: "Maintenance — le socle",
            notes: ["Mises à jour, sauvegardes, surveillance sécurité et rapport mensuel."]
          };
        }
        if (taille === "standard") {
          return {
            prix: "89 € / mois",
            offre: "Maintenance — standard",
            notes: ["Sauvegarde quotidienne, 30 minutes de modifications par mois, support sous 24 h."]
          };
        }
        return {
          prix: "149 € / mois",
          offre: "Maintenance — premium",
          notes: ["2 h de modifications par mois, suivi SEO, intervention prioritaire et support téléphonique."]
        };
      }

      // SEO : aucune offre autonome n'est tarifée sur le site.
      return {
        prix: PERSONNALISE,
        offre: "SEO local",
        notes: [
          "Le SEO local est inclus dans l'offre « Refonte complète + SEO local » (3 500 – 6 000 € HT).",
          "Seul, il se chiffre selon votre situation : l'audit à 150 – 300 € permet de cadrer le besoin."
        ]
      };
    }

    // Les éléments fournis ne changent aucun montant : ils indiquent
    // seulement où l'on se situe dans la fourchette annoncée.
    function noteContenu(type, dispo) {
      if (type === "maintenance" || type === "seo") return null;

      if (dispo.textes && dispo.photos) {
        return "Vous fournissez textes et photos : on reste plutôt en bas de fourchette.";
      }
      if (!dispo.textes && !dispo.photos) {
        return "Textes et photos à produire : comptez plutôt le haut de la fourchette.";
      }
      return "Une partie du contenu reste à produire : on se situe plutôt au milieu de la fourchette.";
    }

    function actualiser() {
      var type = simu.querySelector('input[name="type"]:checked').value;
      var config = TYPES[type];

      // On n'active que le jeu d'options de l'étape 2 correspondant.
      simu.querySelectorAll("[data-groupe]").forEach(function (bloc) {
        var actif = bloc.getAttribute("data-groupe") === config.groupe;
        bloc.hidden = !actif;
        bloc.querySelectorAll("input").forEach(function (champ) {
          champ.disabled = !actif;
        });
      });

      var choixTaille = simu.querySelector(
        '[data-groupe="' + config.groupe + '"] input:checked'
      );
      var taille = choixTaille ? choixTaille.value : "";

      var dispo = { logo: false, textes: false, photos: false, domaine: false };
      simu.querySelectorAll('input[name="dispo"]:checked').forEach(function (c) {
        dispo[c.value] = true;
      });

      var resultat = estimer(type, taille);
      var notes = resultat.notes.slice();

      var contenu = noteContenu(type, dispo);
      if (contenu) notes.push(contenu);

      if (type !== "maintenance" && type !== "seo" && !dispo.logo) {
        notes.push("Sans logo existant, la création d'identité visuelle se chiffre à part.");
      }
      if (type !== "maintenance" && !dispo.domaine) {
        notes.push("Comptez une centaine d'euros par an pour l'hébergement et le nom de domaine, qui restent à votre nom.");
      }

      simuPrix.textContent = resultat.prix;
      simuOffre.textContent = resultat.offre;

      simuNotes.textContent = "";
      notes.forEach(function (texte) {
        var li = document.createElement("li");
        li.textContent = texte;
        simuNotes.appendChild(li);
      });

      // Le CTA emmène le récapitulatif dans le formulaire de contact.
      var elements = Object.keys(dispo).filter(function (k) { return dispo[k]; });
      var message =
        "Bonjour Julien,\n\n" +
        "J'ai utilisé le simulateur sur votre site.\n" +
        "— Type de projet : " + config.besoin + "\n" +
        (taille ? "— Périmètre : " + (choixTaille.nextElementSibling
          ? choixTaille.nextElementSibling.textContent.trim() : taille) + "\n" : "") +
        "— Éléments déjà disponibles : " +
        (elements.length ? elements.join(", ") : "aucun pour l'instant") + "\n" +
        "— Estimation affichée : " + resultat.prix + "\n\n";

      simuCta.setAttribute(
        "href",
        "contact.html?besoin=" + encodeURIComponent(config.besoin) +
        "&message=" + encodeURIComponent(message)
      );
    }

    simu.addEventListener("change", actualiser);
    // Empêche une validation navigateur : le simulateur ne s'envoie pas.
    simu.addEventListener("submit", function (e) { e.preventDefault(); });
    actualiser();
  }

  /* ---------------------------------------------------------------
     Pré-remplissage du formulaire de contact
     Alimenté par le simulateur de la page d'accueil (?besoin=…&message=…).
     --------------------------------------------------------------- */
  if (window.location.search) {
    var params = new URLSearchParams(window.location.search);
    var besoin = params.get("besoin");
    var messagePre = params.get("message");

    var champBesoin = document.getElementById("c-besoin");
    var champMessage = document.getElementById("c-message");

    if (champBesoin && besoin) {
      Array.prototype.forEach.call(champBesoin.options, function (option) {
        if (option.text === besoin) champBesoin.value = option.value || option.text;
      });
    }
    if (champMessage && messagePre) champMessage.value = messagePre;
  }

  /* ---------------------------------------------------------------
     Année courante dans le pied de page
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
