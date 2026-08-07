/**
 * Maison Kaëlia — Interactions spa
 * Navigation, reveal, FAQ accordion, lightbox, formulaires
 */

(function () {
  "use strict";

  /* ---------- Header scroll ---------- */
  const header = document.querySelector(".site-header");
  const isSolidHeader = header?.classList.contains("site-header--solid");

  function updateHeader() {
    if (!header || isSolidHeader) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
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

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-item__question");
    const panel = item.querySelector(".faq-item__answer");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const ob = other.querySelector(".faq-item__question");
          const op = other.querySelector(".faq-item__answer");
          if (ob) ob.setAttribute("aria-expanded", "false");
          if (op) op.hidden = true;
        }
      });
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryItems = document.querySelectorAll("[data-lightbox]");
  let lightbox = document.querySelector(".lightbox");

  if (galleryItems.length) {
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Aperçu de l'image");
      lightbox.innerHTML = `
        <button type="button" class="lightbox__close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <img src="" alt="">
      `;
      document.body.appendChild(lightbox);
    }

    const lbImg = lightbox.querySelector("img");
    const lbClose = lightbox.querySelector(".lightbox__close");

    function openLightbox(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) return;
        openLightbox(img.currentSrc || img.src, img.alt);
      });

      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });

      if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "0");
      if (!item.hasAttribute("role")) item.setAttribute("role", "button");
    });

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }

  /* ---------- Forms (demo feedback) ---------- */
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      const success = form.querySelector(".form-success");
      const originalText = btn ? btn.textContent : "";

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Envoi en cours…";
      }

      setTimeout(() => {
        if (success) success.classList.add("is-visible");
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        if (success) {
          success.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 900);
    });
  });

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Smooth anchor offset for sticky header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
