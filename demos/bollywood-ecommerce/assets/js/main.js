/**
 * Maison Zari — Interactions e-commerce
 * Navigation, panier démo, filtres boutique, fiche produit, formulaires
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

  /* ---------- Cart badge & toast ---------- */
  let cartCount = 0;
  const cartBadge = document.querySelector("[data-cart-count]");
  const toast = document.querySelector(".cart-toast");

  function updateCartBadge() {
    if (!cartBadge) return;
    cartBadge.textContent = String(cartCount);
    cartBadge.hidden = cartCount === 0;
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2800);
  }

  function addToCart(name) {
    cartCount += 1;
    updateCartBadge();
    showToast(`« ${name || "Article"} » ajouté au panier`);
  }

  document.querySelectorAll("[data-add-cart]").forEach((btn) => {
    /* Le bouton fiche détail a son propre handler (évite le double comptage). */
    if (btn.hasAttribute("data-detail-add")) return;
    btn.addEventListener("click", () => {
      addToCart(btn.getAttribute("data-add-cart"));
    });
  });

  updateCartBadge();

  /* ---------- Shop filters ---------- */
  const filterBtns = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll("[data-category]");
  const resultCount = document.querySelector("[data-result-count]");

  function applyFilter(category) {
    let visible = 0;
    productCards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const show = category === "all" || cat === category;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });
    if (resultCount) {
      resultCount.textContent =
        visible === 1 ? "1 article" : `${visible} articles`;
    }
    filterBtns.forEach((btn) => {
      btn.classList.toggle(
        "is-active",
        btn.getAttribute("data-filter") === category
      );
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.getAttribute("data-filter") || "all");
    });
  });

  /* URL hash filter e.g. boutique.html#sarees */
  if (filterBtns.length) {
    const hash = (window.location.hash || "").replace("#", "");
    const map = {
      sarees: "sarees",
      kurtas: "kurtas",
      lehengas: "lehengas",
      danse: "danse",
      accessoires: "accessoires",
    };
    if (hash && map[hash]) {
      applyFilter(map[hash]);
    }
  }

  /* ---------- Product detail open ---------- */
  const detail = document.getElementById("product-detail");
  const detailName = document.querySelector("[data-detail-name]");
  const detailPrice = document.querySelector("[data-detail-price]");
  const detailCat = document.querySelector("[data-detail-cat]");
  const detailDesc = document.querySelector("[data-detail-desc]");
  const detailImg = document.querySelector("[data-detail-img]");
  const detailAdd = document.querySelector("[data-detail-add]");

  const productData = {
    "saree-jaipur": {
      name: "Saree soie Jaipur",
      price: "189 €",
      cat: "Sarees",
      desc: "Saree en soie pure aux motifs floraux brodés or. Tombé fluide, parfait pour mariages et soirées. Bordure zari traditionnelle, blouse assortie en option.",
      img: "assets/img/product-saree.jpg",
    },
    "saree-safran": {
      name: "Saree safran & or",
      price: "219 €",
      cat: "Sarees",
      desc: "Éclat safran sur soie satinée, bordure dorée travaillée main. Une pièce signature pour les grandes occasions et les cérémonies.",
      img: "assets/img/product-saree-2.jpg",
    },
    "lehenga-rani": {
      name: "Lehenga Rani fuchsia",
      price: "349 €",
      cat: "Lehengas",
      desc: "Lehenga trois pièces (jupe, choli, dupatta) en fuchsia intense, broderies zari et sequins. Idéal mariages, sangeet et réceptions.",
      img: "assets/img/product-lehenga.jpg",
    },
    "lehenga-bridal": {
      name: "Lehenga mariée cramoisi",
      price: "489 €",
      cat: "Lehengas",
      desc: "Tenue de mariée en rouge profond et or, broderie dense et finitions premium. Disponible en commande sur mesure pour les grandes tailles.",
      img: "assets/img/product-mariage.jpg",
    },
    "kurta-ivoire": {
      name: "Kurta ivoire brodé",
      price: "129 €",
      cat: "Kurtas",
      desc: "Kurta homme en coton soyeux ivoire, broderie dorée discrète et touches turquoise. Confortable pour cérémonies et fêtes.",
      img: "assets/img/product-kurta.jpg",
    },
    "costume-scene": {
      name: "Costume scène Bollywood",
      price: "279 €",
      cat: "Costumes de danse",
      desc: "Ensemble performance : coupe libérée, sequins résistants et tissus légers pour la scène. Pensé avec des danseurs professionnels.",
      img: "assets/img/product-danse.jpg",
    },
    "costume-duo": {
      name: "Tenue duo spectacle",
      price: "399 €",
      cat: "Costumes de danse",
      desc: "Set coordonné homme/femme pour chorégraphies. Couleurs vives, finitions scène et possibilités de personnalisation pour troupes.",
      img: "assets/img/product-danse-2.jpg",
    },
    "parure-kundan": {
      name: "Parure kundan turquoise",
      price: "159 €",
      cat: "Accessoires",
      desc: "Collier, boucles et maang tikka style kundan avec pierres turquoise et rubis. Laiton doré, finition premium.",
      img: "assets/img/product-bijoux.jpg",
    },
    "jhumkas-or": {
      name: "Jhumkas or tradition",
      price: "79 €",
      cat: "Accessoires",
      desc: "Boucles d'oreilles jhumka dorées, volume classique et éclat chaud. Se portent avec saree, lehenga ou tenue de fête.",
      img: "assets/img/ig-bijoux.jpg",
    },
  };

  function openProduct(id) {
    const data = productData[id];
    if (!data || !detail) return;

    if (detailName) detailName.textContent = data.name;
    if (detailPrice) detailPrice.textContent = data.price;
    if (detailCat) detailCat.textContent = data.cat;
    if (detailDesc) detailDesc.textContent = data.desc;
    if (detailImg) {
      detailImg.src = data.img;
      detailImg.alt = data.name;
    }
    if (detailAdd) {
      detailAdd.setAttribute("data-add-cart", data.name);
    }

    detail.classList.add("is-open");
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-product]").forEach((card) => {
    function activate() {
      const id = card.getAttribute("data-product");
      if (id) openProduct(id);
    }
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  /* Size / color selectors in product detail */
  document.querySelectorAll(".size-options").forEach((group) => {
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  });

  document.querySelectorAll(".color-options").forEach((group) => {
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  });

  /* Gallery thumbs */
  document.querySelectorAll(".product-gallery__thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const main = document.querySelector("[data-detail-img]");
      if (src && main) {
        main.src = src;
      }
      btn.parentElement?.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
    });
  });

  /* Detail add to cart */
  if (detailAdd) {
    detailAdd.addEventListener("click", () => {
      addToCart(detailAdd.getAttribute("data-add-cart"));
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

  /* ---------- Smooth anchor offset ---------- */
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
