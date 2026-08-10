(function () {
  "use strict";

  const PRODUCTS = {
    moka: { name: "Éthiopie Moka Sidamo", price: 12.9 },
    finca: { name: "Colombie Finca El Roble", price: 13.8 },
    bourbon: { name: "Rwanda Bourbon lavé", price: 11.9 },
    deca: { name: "Décaféiné Mexique eau pure", price: 10.9 },
    v60: { name: "Dripper V60 céramique", price: 24.0 },
    chemex: { name: "Chemex 6 tasses", price: 49.0 },
    moulin: { name: "Moulin manuel précision", price: 89.0 },
    atelier: { name: "Atelier dégustation", price: 39.0 },
    abonnement: { name: "Abonnement Passionné", price: 29.0 },
  };

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const cartPanel = document.querySelector("[data-cart-panel]");
  const overlay = document.querySelector("[data-overlay]");
  const cartItems = document.querySelector("[data-cart-items]");
  const cartTotal = document.querySelector("[data-cart-total]");
  const cartCounts = document.querySelectorAll("[data-cart-count]");
  const storageKey = "demo-cafe-cart";
  let cart = loadCart();

  function format(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (_) {
      return {};
    }
  }

  function saveCart() {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }

  function cartQty() {
    return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  }

  function cartAmount() {
    return Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  function renderCart() {
    cartCounts.forEach((badge) => {
      const qty = cartQty();
      badge.textContent = qty;
      badge.hidden = qty === 0;
    });
    if (cartTotal) cartTotal.textContent = format(cartAmount());
    if (!cartItems) return;

    const entries = Object.entries(cart);
    if (!entries.length) {
      cartItems.innerHTML = "<p>Votre panier est vide pour le moment.</p>";
      return;
    }

    cartItems.innerHTML = entries
      .map(([id, item]) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <p>${format(item.price)} · ${item.qty} article(s)</p>
            <div class="qty" aria-label="Quantité">
              <button type="button" data-dec="${id}">−</button>
              <span>${item.qty}</span>
              <button type="button" data-inc="${id}">+</button>
              <button type="button" data-remove="${id}">Retirer</button>
            </div>
          </div>
          <strong>${format(item.price * item.qty)}</strong>
        </div>
      `)
      .join("");
  }

  function addToCart(id, qty = 1) {
    const product = PRODUCTS[id];
    if (!product) return;
    cart[id] = cart[id] || { ...product, qty: 0 };
    cart[id].qty += qty;
    saveCart();
    renderCart();
    openCart();
  }

  function updateQty(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    saveCart();
    renderCart();
  }

  function openCart() {
    cartPanel?.classList.add("is-open");
    overlay?.classList.add("is-open");
  }

  function closeCart() {
    cartPanel?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
  }

  function updateHeader() {
    if (!header || header.classList.contains("site-header--solid")) return;
    header.classList.toggle("is-scrolled", window.scrollY > 36);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  navToggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(button.dataset.add, Number(button.dataset.qty || 1));
    });
  });

  document.querySelectorAll("[data-open-cart]").forEach((button) => {
    button.addEventListener("click", openCart);
  });
  document.querySelectorAll("[data-close-cart]").forEach((button) => {
    button.addEventListener("click", closeCart);
  });
  overlay?.addEventListener("click", closeCart);

  cartItems?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.inc) updateQty(target.dataset.inc, 1);
    if (target.dataset.dec) updateQty(target.dataset.dec, -1);
    if (target.dataset.remove) {
      delete cart[target.dataset.remove];
      saveCart();
      renderCart();
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const resultCount = document.querySelector("[data-result-count]");
  function applyFilter(value) {
    let visible = 0;
    cards.forEach((card) => {
      const show = value === "all" || card.dataset.category === value || card.dataset.method === value;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (resultCount) resultCount.textContent = `${visible} produit${visible > 1 ? "s" : ""}`;
    filterButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === value));
  }
  filterButtons.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter || "all")));

  document.querySelector("[data-sort]")?.addEventListener("change", (event) => {
    const grid = document.querySelector("[data-product-grid]");
    if (!grid) return;
    const cardsArray = Array.from(grid.children);
    const mode = event.target.value;
    cardsArray.sort((a, b) => {
      const pa = Number(a.dataset.price || 0);
      const pb = Number(b.dataset.price || 0);
      return mode === "price-desc" ? pb - pa : mode === "price-asc" ? pa - pb : 0;
    });
    cardsArray.forEach((card) => grid.appendChild(card));
  });

  document.querySelectorAll("[data-choice-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches("button")) return;
      group.querySelectorAll("button").forEach((btn) => btn.classList.remove("is-active"));
      target.classList.add("is-active");
    });
  });

  document.querySelector("[data-promo]")?.addEventListener("click", () => {
    const msg = document.querySelector("[data-promo-msg]");
    if (msg) msg.textContent = "Code PRAFUL10 appliqué fictivement : -10 % affiché au paiement.";
  });

  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) status.textContent = "Message reçu — formulaire de démonstration.";
      form.reset();
    });
  });

  renderCart();
})();
