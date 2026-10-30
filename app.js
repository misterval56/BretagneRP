/* ====== DONNÉES (modifie ici ou utilise admin.html) ====== */
const DATA = {
  name: "Bretagne RP",
  discord: "https://discord.gg/7kNWQVs4sY",
  description: "Une communauté, des histoires à écrire. Rejoins l'aventure et prends part à la vie de Bretagne RP.",
  longDescription: "Bretagne RP rassemble des joueurs autour d'une même envie : partager de bons moments, créer des histoires et construire une communauté accueillante.",
  banner: "https://i.postimg.cc/50PfSxfT/Bretagne-RP-communaute-cotiere-en.png",
  logo: "https://i.postimg.cc/bvxJkcDc/Bretagne-RP-communaute-cotiere-en-lumiere.png",
  members: 250,
  target: 1000,
  partners: [
    {
      name: "My Musique",
      description: "🔥 Bot de musique simple et pratique pour Discord. Écoute YouTube avec tes amis !",
      logo: "https://i.postimg.cc/PJYTs1WL/My-Musique-Logo.png",
      banner: "https://i.postimg.cc/L8NRp91q/My-Musique-Baner.png",
      discord: "https://discord.gg/W5Y8Kb9azj"
    }
  ]
};

/* ====== HELPERS ====== */
const $ = (id) => document.getElementById(id);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));
const safeURL = (v, fb = "#") => {
  try {
    const u = new URL(v, location.href);
    return (u.protocol === "http:" || u.protocol === "https:") ? u.href : fb;
  } catch { return fb; }
};

/* ====== HEADER / FOOTER ====== */
function buildHeader(page) {
  const h = $("site-header");
  if (!h) return;
  const nav = [
    ["Accueil", "index.html", "home"],
    ["Partenaires", "partenaires.html", "partners"]
  ];
  h.innerHTML = `
    <header class="site-header"><div class="wrap nav">
      <a class="brand" href="index.html">
        <span class="brand-mark">BR</span><span>BRETAGNE <b>RP</b></span>
      </a>
      <nav class="nav-links">
        ${nav.map(([n,u,k]) => `<a class="${page===k?"active":""}" href="${u}">${n}</a>`).join("")}
        <a class="join" href="${esc(safeURL(DATA.discord))}" target="_blank" rel="noopener">Rejoindre ↗</a>
      </nav>
    </div></header>`;
}

function buildFooter() {
  const f = $("site-footer");
  if (!f) return;
  f.innerHTML = `
    <footer class="site-footer"><div class="wrap footer-inner">
      <div class="brand"><span class="brand-mark">BR</span><span>BRETAGNE <b>RP</b></span></div>
      <div>© ${new Date().getFullYear()} ${esc(DATA.name)}</div>
    </div></footer>`;
}

/* ====== PAGE ACCUEIL ====== */
function renderHome() {
  document.title = `${DATA.name} — Serveur Discord`;
  $("hero-title").innerHTML = `Bienvenue sur<br><span class="gradient">${esc(DATA.name)}.</span>`;
  $("hero-desc").textContent = DATA.description;
  $("hero-long").textContent = DATA.longDescription;
  $("hero-banner").style.backgroundImage = `url("${safeURL(DATA.banner)}")`;
  $("hero-logo").innerHTML = `<img src="${esc(safeURL(DATA.logo))}" alt="">`;
  $("hero-name").textContent = DATA.name;
  $("stat-members").textContent = DATA.members.toLocaleString("fr-FR");
  $("stat-partners").textContent = DATA.partners.length;
  $("join-btn").href = safeURL(DATA.discord);
  $("join-btn2").href = safeURL(DATA.discord);

  const pct = Math.min(100, DATA.members / DATA.target * 100);
  $("goal-fill").style.width = pct + "%";
  $("goal-text").textContent =
    `${DATA.members.toLocaleString("fr-FR")} / ${DATA.target.toLocaleString("fr-FR")} membres (${Math.round(pct)}%)`;
}

/* ====== PAGE PARTENAIRES ====== */
function renderPartners() {
  document.title = `Partenaires — ${DATA.name}`;
  const grid = $("partner-grid");
  const empty = $("partner-empty");
  const list = DATA.partners || [];
  empty.style.display = list.length ? "none" : "block";

  grid.innerHTML = list.map(p => `
    <article class="partner-card">
      <div class="partner-cover" style="${p.banner?`background-image:url('${esc(safeURL(p.banner))}')`:""}"></div>
      <div class="partner-body">
        <div class="partner-head">
          <div class="partner-logo">
            ${p.logo
              ? `<img src="${esc(safeURL(p.logo))}" alt="">`
              : esc(p.name.slice(0,2).toUpperCase())}
          </div>
          <strong class="partner-name">${esc(p.name)}</strong>
        </div>
        <p>${esc(p.description)}</p>
        <a href="${esc(safeURL(p.discord))}" target="_blank" rel="noopener">Découvrir ↗</a>
      </div>
    </article>`).join("");
}

/* ====== BOOT ====== */
(function boot() {
  const page = document.body.dataset.page;
  buildHeader(page);
  buildFooter();
  if (page === "home") renderHome();
  if (page === "partners") renderPartners();
})();