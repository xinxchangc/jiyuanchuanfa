(function () {
  const data = window.SITE_DATA || {};
  const company = data.company || {};
  const products = data.products || [];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function setText(selector, value) {
    $$(selector).forEach((node) => {
      node.textContent = value || "";
    });
  }

  function setHref(selector, value) {
    $$(selector).forEach((node) => {
      node.setAttribute("href", value || "#");
    });
  }

  function hydrateCompany() {
    document.title = `${company.name || "企业网站"} - 船用附件与船用阀门制造`;
    setText("[data-site-short-name]", company.shortName);
    setText("[data-company-tagline]", company.tagline);
    setText("[data-company-name]", company.name);
    setText("[data-company-name-small]", company.name);
    setText("[data-footer-company]", company.name);
    setText("[data-footer-short]", company.shortName);
    setText("[data-company-summary]", company.summary);
    setText("[data-about-text]", company.about);
    setText("[data-about-extra]", company.aboutExtra);
    setText("[data-founded]", company.founded);
    setText("[data-region]", company.region);
    setText("[data-contact-person]", company.contactPerson);
    setText("[data-contact-person-small]", company.contactPerson);
    setText("[data-legal-person]", company.legalPerson);
    setText("[data-company-address]", company.address);
    setText("[data-company-address-small]", company.address);
    setText("[data-year]", String(new Date().getFullYear()));

    const phoneOne = company.phones && company.phones[0] ? company.phones[0] : "";
    setText("[data-primary-phone]", phoneOne);
    setText("[data-phone-one]", phoneOne);
    setHref("[data-primary-phone-link]", `tel:${phoneOne}`);
    setHref("[data-phone-one-link]", `tel:${phoneOne}`);
    setHref("[data-floating-phone]", `tel:${phoneOne}`);
    $("[data-floating-phone]")?.setAttribute("aria-label", `拨打联系电话 ${phoneOne}`);
    const floatingStrong = $("[data-floating-phone] strong");
    if (floatingStrong) floatingStrong.textContent = phoneOne;
  }

  function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = product.id;
    card.dataset.category = product.category;
    card.dataset.search = `${product.title} ${product.category} ${product.summary} ${product.scene} ${product.service} ${(product.features || []).join(" ")}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看${product.title}详情`);

    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.style.setProperty("--visual-position", product.visualPosition || "center");
    if (product.image) {
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title ? `${product.title}产品图` : "产品图";
      image.loading = "lazy";
      visual.appendChild(image);
    }
    const code = document.createElement("span");
    code.textContent = product.code || "";
    visual.appendChild(code);

    const body = document.createElement("div");
    body.className = "product-body";

    const category = document.createElement("div");
    category.className = "product-category";
    category.textContent = product.category || "";

    const title = document.createElement("h3");
    title.textContent = product.title || "";

    const summary = document.createElement("p");
    summary.textContent = product.summary || "";

    const list = document.createElement("ul");
    (product.features || []).forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      list.appendChild(item);
    });

    const action = document.createElement("strong");
    action.className = "product-card-action";
    action.textContent = "查看详情";

    body.append(category, title, summary, list);
    card.append(visual, body, action);
    return card;
  }

  function createTableRow(product) {
    const tr = document.createElement("tr");
    tr.dataset.category = product.category;
    tr.dataset.search = `${product.title} ${product.category} ${product.summary} ${product.scene} ${product.service} ${(product.features || []).join(" ")}`;
    [product.category, product.title, product.scene, product.service].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value || "";
      tr.appendChild(td);
    });
    return tr;
  }

  function renderProducts() {
    const grid = $("[data-product-grid]");
    const table = $("[data-product-table]");
    const filters = $("[data-product-filters]");

    if (grid) grid.replaceChildren(...products.map(createProductCard));
    if (table) table.replaceChildren(...products.map(createTableRow));

    const categories = ["全部", ...new Set(products.map((product) => product.category).filter(Boolean))];
    if (filters) {
      filters.replaceChildren(
        ...categories.map((category, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.role = "tab";
          button.textContent = category;
          button.dataset.categoryFilter = category;
          button.setAttribute("aria-selected", index === 0 ? "true" : "false");
          return button;
        })
      );
    }
    updateProductCount();
  }

  function applyProductFilter() {
    const selected = $("[data-category-filter][aria-selected='true']")?.dataset.categoryFilter || "全部";
    const keyword = ($("[data-product-search]")?.value || $("[data-overview-search]")?.value || "").trim().toLowerCase();
    let visibleCards = 0;

    $$(".product-card").forEach((card) => {
      const matchesCategory = selected === "全部" || card.dataset.category === selected;
      const matchesKeyword = !keyword || (card.dataset.search || "").toLowerCase().includes(keyword);
      card.hidden = !(matchesCategory && matchesKeyword);
      if (!card.hidden) visibleCards += 1;
    });

    $$("[data-product-table] tr").forEach((row) => {
      const matchesCategory = selected === "全部" || row.dataset.category === selected;
      const matchesKeyword = !keyword || (row.dataset.search || "").toLowerCase().includes(keyword);
      row.hidden = !(matchesCategory && matchesKeyword);
    });

    updateProductCount();
  }

  function updateProductCount() {
    const cards = $$(".product-card");
    const rows = $$("[data-product-table] tr");
    const count = cards.length ? cards.filter((card) => !card.hidden).length : rows.length ? rows.filter((row) => !row.hidden).length : products.length;
    const selected = $("[data-category-filter][aria-selected='true']")?.dataset.categoryFilter || "全部";
    const keyword = ($("[data-product-search]")?.value || $("[data-overview-search]")?.value || "").trim();
    const prefix = selected === "全部" ? "全部产品" : selected;
    const suffix = keyword ? `，关键词：${keyword}` : "";
    setText("[data-product-result-count]", `${prefix}：${count} 个${suffix}`);
    const empty = $("[data-product-empty]");
    if (empty) empty.hidden = count !== 0;
  }

  function openProductModal(productId) {
    const product = products.find((item) => item.id === productId);
    const modal = $("[data-product-modal]");
    if (!product || !modal) return;

    const image = $("[data-modal-image]");
    if (image) {
      image.src = product.image || "";
      image.alt = product.title ? `${product.title}产品图` : "产品图";
    }
    setText("[data-modal-category]", product.category);
    setText("[data-modal-title]", product.title);
    setText("[data-modal-summary]", product.summary);
    setText("[data-modal-scene]", product.scene);
    setText("[data-modal-service]", product.service);
    setText("[data-modal-detail]", product.detail);

    const featureList = $("[data-modal-features]");
    if (featureList) {
      featureList.replaceChildren(
        ...(product.features || []).map((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          return item;
        })
      );
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    $(".modal-close")?.focus();
  }

  function closeProductModal() {
    const modal = $("[data-product-modal]");
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function bindInteractions() {
    const toggle = $("[data-nav-toggle]");
    const links = $("[data-nav-links]");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
      links.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    $("[data-product-filters]")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category-filter]");
      if (!button) return;
      const searchInput = $("[data-product-search]") || $("[data-overview-search]");
      if (searchInput) searchInput.value = "";
      $$("[data-category-filter]").forEach((item) => item.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      applyProductFilter();
      ($("[data-product-grid]") || $(".catalog-table-wrap"))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    $("[data-product-search]")?.addEventListener("input", applyProductFilter);
    $("[data-overview-search]")?.addEventListener("input", applyProductFilter);
    $("[data-clear-product-search]")?.addEventListener("click", () => {
      const input = $("[data-product-search]") || $("[data-overview-search]");
      if (input) input.value = "";
      $$("[data-category-filter]").forEach((item, index) => item.setAttribute("aria-selected", index === 0 ? "true" : "false"));
      applyProductFilter();
    });
    $("[data-print-catalog]")?.addEventListener("click", () => window.print());
    $("[data-product-grid]")?.addEventListener("click", (event) => {
      const card = event.target.closest("[data-product-id]");
      if (!card) return;
      openProductModal(card.dataset.productId);
    });
    $("[data-product-grid]")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest("[data-product-id]");
      if (!card) return;
      event.preventDefault();
      openProductModal(card.dataset.productId);
    });

    $$("[data-close-product]").forEach((node) => {
      node.addEventListener("click", () => closeProductModal());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeProductModal();
    });

    $("[data-copy-address]")?.addEventListener("click", async () => {
      if (!company.address || !navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(company.address);
      } catch (error) {
        console.warn("Address copy is unavailable in this browser.", error);
      }
    });
  }

  hydrateCompany();
  renderProducts();
  bindInteractions();
})();
