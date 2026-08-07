/**
 * Ondéa Plomberie-Chauffage — Interactions
 */
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const isSolid = header?.classList.contains("site-header--solid");

  function updateHeader() {
    if (!header || isSolid) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

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
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const baSlider = document.querySelector(".ba-slider");
  if (baSlider) {
    const after = baSlider.querySelector(".ba-slider__after");
    const handle = baSlider.querySelector(".ba-slider__handle");
    let dragging = false;

    function setPosition(clientX) {
      const rect = baSlider.getBoundingClientRect();
      let x = ((clientX - rect.left) / rect.width) * 100;
      x = Math.max(4, Math.min(96, x));
      if (after) after.style.clipPath = `inset(0 0 0 ${x}%)`;
      if (handle) handle.style.left = `${x}%`;
    }

    function onStart(e) {
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
    }
    function onMove(e) {
      if (!dragging) return;
      setPosition(e.touches ? e.touches[0].clientX : e.clientX);
    }
    function onEnd() {
      dragging = false;
    }

    baSlider.addEventListener("mousedown", onStart);
    baSlider.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  }

  const galleryItems = document.querySelectorAll("[data-lightbox]");
  let lightbox = document.querySelector(".lightbox");

  if (galleryItems.length) {
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.innerHTML = `
        <button type="button" class="lightbox__close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <img src="" alt="">
      `;
      document.body.appendChild(lightbox);
    }

    const lbImg = lightbox.querySelector("img");
    const lbClose = lightbox.querySelector(".lightbox__close");

    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLb() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      lbImg.src = "";
    }

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (img) openLb(img.currentSrc || img.src, img.alt);
      });
      if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "0");
    });

    lbClose.addEventListener("click", closeLb);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLb();
    });
  }

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      const success = form.querySelector(".form-success");
      const original = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Envoi en cours…";
      }
      setTimeout(() => {
        if (success) success.classList.add("is-visible");
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = original;
        }
      }, 850);
    });
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
