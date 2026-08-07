/**
 * Maison Éclat — Salon de Coiffure & Esthétique Capillaire
 */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const form = document.getElementById("rdv-form");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && siteNav) {
    const closeNav = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
      siteNav.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navToggle.setAttribute(
        "aria-label",
        open ? "Ouvrir le menu" : "Fermer le menu"
      );
      siteNav.classList.toggle("is-open", !open);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  if (form) {
    const success = document.getElementById("form-success");
    const requiredFields = form.querySelectorAll("[required]");

    const clearInvalid = (el) => el.classList.remove("is-invalid");

    requiredFields.forEach((field) => {
      field.addEventListener("input", () => clearInvalid(field));
      field.addEventListener("change", () => clearInvalid(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      requiredFields.forEach((field) => {
        const isCheckbox = field.type === "checkbox";
        const empty = isCheckbox
          ? !field.checked
          : !String(field.value || "").trim();

        if (
          empty ||
          (field.type === "email" &&
            field.value &&
            field.validity &&
            !field.validity.valid)
        ) {
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

      if (success) {
        window.setTimeout(() => {
          success.hidden = true;
        }, 10000);
      }
    });
  }
})();
