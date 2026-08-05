/* ==========================================================================
   PRAFUL DESIGN — Interactions
   Vanilla JS, sans dépendance.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Bascule clair / sombre
     Le site est en clair par défaut. Le choix est mémorisé dans le
     navigateur et réappliqué avant le rendu par le script inline
     placé dans le <head> de chaque page.
     --------------------------------------------------------------- */
  var racine = document.documentElement;
  var bascule = document.getElementById("bascule-theme");

  function themeCourant() {
    return racine.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function appliquerTheme(theme) {
    racine.setAttribute("data-theme", theme);
    if (bascule) {
      bascule.setAttribute(
        "aria-label",
        theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
      );
    }
    try {
      localStorage.setItem("praful-theme", theme);
    } catch (e) { /* stockage indisponible : le choix vaut pour la page en cours */ }
  }

  if (bascule) {
    appliquerTheme(themeCourant());
    bascule.addEventListener("click", function () {
      appliquerTheme(themeCourant() === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------------------------------------------------
     En-tête : fond opaque dès qu'on scrolle
     --------------------------------------------------------------- */
  var entete = document.querySelector(".entete");

  function majEntete() {
    if (!entete) return;
    entete.classList.toggle("est-fixee", window.scrollY > 20);
  }

  window.addEventListener("scroll", majEntete, { passive: true });
  majEntete();

  /* ---------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("est-ouverte");
      burger.setAttribute("aria-expanded", String(ouvert));
      document.body.style.overflow = ouvert ? "hidden" : "";
    });

    // On referme le menu quand on clique un lien de navigation.
    nav.querySelectorAll("a").forEach(function (lien) {
      lien.addEventListener("click", function () {
        nav.classList.remove("est-ouverte");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
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
