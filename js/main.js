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
    const floatingStrong = $("[data-floating-phone] strong");
    if (floatingStrong) floatingStrong.textContent = phoneOne;
  }

  function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";
    article.dataset.category = product.category;
    article.dataset.search = `${product.title} ${product.category} ${product.summary} ${product.scene} ${product.service} ${(product.features || []).join(" ")}`;

    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.style.setProperty("--visual-position", product.visualPosition || "center");
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

    body.append(category, title, summary, list);
    article.append(visual, body);
    return article;
  }

  function createTableRow(product) {
    const tr = document.createElement("tr");
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
    if (!grid || !table || !filters) return;

    grid.replaceChildren(...products.map(createProductCard));
    table.replaceChildren(...products.map(createTableRow));

    const categories = ["全部", ...new Set(products.map((product) => product.category).filter(Boolean))];
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

  function applyProductFilter() {
    const selected = $("[data-category-filter][aria-selected='true']")?.dataset.categoryFilter || "全部";
    const keyword = ($("[data-product-search]")?.value || "").trim().toLowerCase();

    $$(".product-card").forEach((card) => {
      const matchesCategory = selected === "全部" || card.dataset.category === selected;
      const matchesKeyword = !keyword || (card.dataset.search || "").toLowerCase().includes(keyword);
      card.hidden = !(matchesCategory && matchesKeyword);
    });
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
      $$("[data-category-filter]").forEach((item) => item.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");
      applyProductFilter();
    });

    $("[data-product-search]")?.addEventListener("input", applyProductFilter);
    $("[data-print-catalog]")?.addEventListener("click", () => window.print());

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
