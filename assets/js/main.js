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
     Année courante dans le pied de page
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
