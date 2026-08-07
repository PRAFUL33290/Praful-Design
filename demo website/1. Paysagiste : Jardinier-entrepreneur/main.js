/**
 * L'Atelier des Jardins — interactions légères
 */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const form = document.getElementById("devis-form");
  const yearEl = document.getElementById("year");

  /* Année footer */
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Header au scroll */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navToggle.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      siteNav.classList.toggle("is-open", !open);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Ouvrir le menu");
        siteNav.classList.remove("is-open");
      });
    });
  }

  /* Validation + feedback formulaire (démo front-end) */
  if (form) {
    const success = document.getElementById("form-success");
    const requiredFields = form.querySelectorAll("[required]");

    const clearInvalid = (el) => {
      el.classList.remove("is-invalid");
    };

    requiredFields.forEach((field) => {
      field.addEventListener("input", () => clearInvalid(field));
      field.addEventListener("change", () => clearInvalid(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      requiredFields.forEach((field) => {
        const isCheckbox = field.type === "checkbox";
        const empty = isCheckbox ? !field.checked : !String(field.value || "").trim();
        if (empty || (field.type === "email" && field.validity && !field.validity.valid)) {
          field.classList.add("is-invalid");
          valid = false;
        } else {
          clearInvalid(field);
        }
      });

      if (!valid) {
        const first = form.querySelector(".is-invalid");
        if (first) first.focus();
        return;
      }

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      form.reset();
      requiredFields.forEach(clearInvalid);

      /* Masquer le message après quelques secondes (démo) */
      if (success) {
        window.setTimeout(() => {
          success.hidden = true;
        }, 8000);
      }
    });
  }
})();
