/**
 * Maison Orée — Interactions
 * Navigation, reveal, formulaires, recherche, filtres
 */
(function () {
  "use strict";

  /* ---------- Header scroll ---------- */
  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const navActions = document.getElementById("nav-actions");

  if (toggle && navActions) {
    toggle.addEventListener("click", () => {
      const open = navActions.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    navActions.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navActions.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Ouvrir le menu");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Smooth anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Search bar (mock) ---------- */
  const searchBar = document.getElementById("search-bar");
  if (searchBar) {
    searchBar.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = (searchBar.querySelector("#search-city")?.value || "").trim();
      const intent = searchBar.querySelector("#search-intent")?.value || "achat";
      const type = searchBar.querySelector("#search-type")?.value || "";
      const params = new URLSearchParams();
      if (city) params.set("ville", city);
      params.set("projet", intent);
      if (type) params.set("type", type);
      window.location.href = "biens.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  /* ---------- Filters (biens) ---------- */
  const filterBtn = document.getElementById("filter-btn");
  const listings = document.getElementById("listings");

  if (filterBtn && listings) {
    filterBtn.addEventListener("click", () => {
      const root = document.getElementById("filters");
      if (!root) return;

      const type = root.querySelector('select[name="type"]')?.value || "";
      const budget = Number(root.querySelector('select[name="budget"]')?.value || 0);
      const pieces = Number(root.querySelector('select[name="pieces"]')?.value || 0);
      const surface = Number(root.querySelector('select[name="surface"]')?.value || 0);

      let visible = 0;
      listings.querySelectorAll(".listing-card").forEach((card) => {
        const cType = card.dataset.type || "";
        const cPrice = Number(card.dataset.price || 0);
        const cPieces = Number(card.dataset.pieces || 0);
        const cSurface = Number(card.dataset.surface || 0);

        let ok = true;
        if (type && cType !== type) ok = false;
        if (budget && cPrice > budget) ok = false;
        if (pieces && cPieces < pieces) ok = false;
        if (surface && cSurface < surface) ok = false;

        card.style.display = ok ? "" : "none";
        if (ok) visible += 1;
      });

      filterBtn.textContent = visible ? `Filtrer (${visible})` : "Aucun résultat";
      setTimeout(() => {
        filterBtn.textContent = "Filtrer";
      }, 1800);
    });
  }

  /* ---------- Forms ---------- */
  function wireForm(formId, successId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const original = btn.textContent;
      btn.textContent = "Envoi…";
      btn.disabled = true;

      setTimeout(() => {
        const success = successId ? document.getElementById(successId) : null;
        if (success) success.classList.add("is-visible");
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 900);
    });
  }

  wireForm("contact-form", "contact-success");
  wireForm("visit-form", "visit-success");

  document.querySelectorAll("form:not(#contact-form):not(#visit-form):not(#search-bar)").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = "Envoi…";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Envoyé ✓";
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2000);
      }, 900);
    });
  });
})();
