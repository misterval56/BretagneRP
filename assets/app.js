
const DEFAULT_CONFIG = {
  name: "Bretagne RP",
  discord: "https://discord.gg/7kNWQVs4sY",
  description: "Une communauté, des histoires à écrire. Rejoins l'aventure et prends part à la vie de Bretagne RP.",
  longDescription: "Bretagne RP rassemble des joueurs autour d'une même envie : partager de bons moments, créer des histoires et construire une communauté accueillante.",
  logo: "https://i.postimg.cc/bvxJkcDc/Bretagne-RP-communaute-cotiere-en-lumiere.png",
  banner: "https://i.postimg.cc/50PfSxfT/Bretagne-RP-communaute-cotiere-en.png",
  members: 250,
  target: 1000
};

async function readJSON(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Fichier introuvable");
    return await response.json();
  } catch (error) {
    console.error("Erreur de chargement :", path, error);
    return fallback;
  }
}

function safeURL(value, fallback = "") {
  try {
    const url = new URL(value, location.href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : fallback;
  } catch {
    return fallback;
  }
}

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function setLink(id, url) {
  const element = document.getElementById(id);
  if (element) {
    element.href = safeURL(url, "#");
  }
}

function header(page) {
  const nav = [
    ["Accueil", "index.html", "home"],
    ["Le serveur", "serveur.html", "server"],
    ["Partenaires", "partenaires.html", "partners"],
    ["Actualités", "actualites.html", "news"]
  ];

  const container = document.getElementById("site-header");
  if (!container) return;

  container.innerHTML = `
    <header class="site-header">
      <div class="nav-wrap">
        <a class="brand" href="index.html">
          <span class="brand-mark">BR</span>
          <span>BRETAGNE <b>RP</b></span>
        </a>
        <button class="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
        <nav class="nav-links">
          ${nav.map(([name, url, key]) =>
            `<a class="${page === key ? "active" : ""}" href="${url}">${name}</a>`
          ).join("")}
          <a class="nav-join" id="nav-join" href="#" target="_blank" rel="noopener">Rejoindre ↗</a>
        </nav>
      </div>
    </header>
  `;

  const button = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (button && links) {
    button.addEventListener("click", () => {
      links.classList.toggle("open");
      button.setAttribute("aria-expanded", links.classList.contains("open"));
    });
  }
}

function footer() {
  const container = document.getElementById("site-footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <div>
          <a class="brand" href="index.html">
            <span class="brand-mark">BR</span>
            <span>BRETAGNE <b>RP</b></span>
          </a>
          <p>Une communauté, des histoires à écrire.</p>
        </div>
        <div class="footer-links">
          <a href="serveur.html">Le serveur</a>
          <a href="partenaires.html">Partenaires</a>
          <a href="actualites.html">Actualités</a>
          <a href="admin/">Administration</a>
        </div>
      </div>
    </footer>
  `;
}

function applyConfig(config) {
  const c = { ...DEFAULT_CONFIG, ...config };
  const name = c.name || DEFAULT_CONFIG.name;

  document.title = document.title.replace("Bretagne RP", name);

  const textElements = {
    "server-name-card": name,
    "hero-description": c.description,
    "server-description": c.description,
    "server-long-description": c.longDescription,
    "server-card-desc": c.description
  };

  Object.entries(textElements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  const logo = safeURL(c.logo, DEFAULT_CONFIG.logo);
  const avatar = document.getElementById("hero-logo");

  if (avatar) {
    avatar.innerHTML = `
      <img
        src="${esc(logo)}"
        alt="${esc(name)}"
        style="width:100%;height:100%;object-fit:cover;border-radius:12px"
      >
    `;
  }

  const banner = document.getElementById("hero-banner");

  if (banner) {
    banner.style.backgroundImage =
      `url("${safeURL(c.banner, DEFAULT_CONFIG.banner)}")`;
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
  }

  [
    "join-main",
    "join-card",
    "goal-join",
    "join-bottom",
    "join-server",
    "nav-join"
  ].forEach(id => setLink(id, c.discord));

  const members = Math.max(0, Number(c.members) || 0);
  const target = Math.max(1, Number(c.target) || 1000);
  const percent = Math.min(100, (members / target) * 100);

  const memberElement = document.getElementById("stat-members");
  if (memberElement) {
    memberElement.textContent = members.toLocaleString("fr-FR");
  }

  const current = document.getElementById("goal-current");
  if (current) {
    current.textContent = members.toLocaleString("fr-FR") + " membres";
  }

  const targetElement = document.getElementById("goal-target");
  if (targetElement) {
    targetElement.textContent = target.toLocaleString("fr-FR") + " objectif";
  }

  const fill = document.getElementById("goal-fill");
  if (fill) {
    fill.style.width = percent + "%";
  }

  const percentElement = document.getElementById("goal-percent");
  if (percentElement) {
    percentElement.textContent =
      Math.round(percent) + "% de l'objectif atteint";
  }

  const goalTitle = document.getElementById("goal-title");
  if (goalTitle) {
    goalTitle.textContent =
      `Cap sur les ${target.toLocaleString("fr-FR")} membres !`;
  }
}

function renderPartners(items) {
  const grid = document.getElementById("partner-grid");
  if (!grid) return;

  const empty = document.getElementById("partners-empty");
  const count = document.getElementById("partners-count");
  const stat = document.getElementById("stat-partners");

  const valid = Array.isArray(items) ? items : [];

  if (count) {
    count.textContent =
      valid.length + " partenaire" + (valid.length > 1 ? "s" : "");
  }

  if (stat) stat.textContent = valid.length;
  if (empty) empty.hidden = valid.length > 0;

  grid.innerHTML = valid.map(partner => `
    <article class="partner-card">
      <div class="partner-cover"
        style="${partner.banner ? `background-image:url('${esc(safeURL(partner.banner))}')` : ""}">
      </div>

      <div class="partner-body">
        <div class="partner-head">
          <div class="partner-logo">
            ${partner.logo
              ? `<img src="${esc(safeURL(partner.logo))}" alt=""
                style="width:100%;height:100%;object-fit:cover;border-radius:13px">`
              : esc((partner.name || "P").slice(0, 2).toUpperCase())
            }
          </div>

          <strong class="partner-name">${esc(partner.name)}</strong>

          ${partner.featured
            ? '<span class="partner-badge">✦ PARTENAIRE</span>'
            : ""
          }
        </div>

        <p>${esc(partner.description)}</p>

        <div class="partner-actions">
          <span>Communauté partenaire</span>
          <a href="${esc(safeURL(partner.discord, "#"))}"
            target="_blank" rel="noopener noreferrer">
            Découvrir ↗
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderNews(items) {
  const grid = document.getElementById("news-list");
  if (!grid) return;

  const valid = Array.isArray(items) ? items : [];
  const empty = document.getElementById("news-empty");

  if (empty) empty.hidden = valid.length > 0;

  grid.innerHTML = valid.map(news => `
    <article class="news-card">
      <small>${esc(news.date || "BRETAGNE RP")}</small>
      <h3>${esc(news.title)}</h3>
      <p>${esc(news.body)}</p>
    </article>
  `).join("");
}

(async function initSite() {
  const page = document.body.dataset.page;

  if (page === "admin") return;

  header(page);
  footer();

  const [config, partners, news] = await Promise.all([
    readJSON("data/config.json", DEFAULT_CONFIG),
    readJSON("data/partners.json", []),
    readJSON("data/news.json", [])
  ]);

  applyConfig(config);
  renderPartners(partners);
  renderNews(news);
})();
