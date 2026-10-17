// Static site generator for Aadiz Collection (Heritage Noir).
// Usage: node build.mjs   ->  writes ./dist (open dist/index.html, or host the folder anywhere).
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  BRAND, NAV, CRAFTS, COLLECTIONS, CRAFT_FEATURES, EVENTS, EVENT_PHOTOS, CERTS, MESSAGES,
} from "./src/data/site.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const dims = JSON.parse(readFileSync(join(root, "src/data/images.json"), "utf8"));

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "public/images"), join(dist, "images"), { recursive: true });
cpSync(join(root, "src/assets"), join(dist, "assets"), { recursive: true });

/* ---------- helpers ---------- */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rel = (src) => src.replace(/^\//, "");
const pageHref = (href) => (href === "/" ? "index.html" : href.replace(/^\//, "") + ".html");

function img(src, alt, { cls = "", eager = false, sizes = "" } = {}) {
  const d = dims[src.split("/").pop()] || { w: 800, h: 600 };
  return `<img src="${rel(src)}" alt="${esc(alt)}" width="${d.w}" height="${d.h}"${cls ? ` class="${cls}"` : ""}${
    eager ? "" : ' loading="lazy"'
  } decoding="async"${sizes ? ` sizes="${sizes}"` : ""}>`;
}

const shot = (p, group, { cap = false } = {}) =>
  `<a class="shot" href="${rel(p.src)}" data-lb="${group}" data-alt="${esc(p.alt)}" data-caption="${esc(p.caption || p.alt)}">${img(
    p.src,
    p.alt,
  )}${cap && p.caption ? `<span class="cap">${esc(p.caption)}</span>` : ""}</a>`;

const waLink = (text) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;

/* ---------- shared chrome ---------- */
function header(current) {
  const links = NAV.map(
    (n) => `<a href="${pageHref(n.href)}"${current === n.href ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`,
  ).join("");
  const mobile = [{ href: "/", label: "Home" }, ...NAV]
    .map(
      (n, i) =>
        `<a href="${pageHref(n.href)}" style="--i:${i}"${current === n.href ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`,
    )
    .join("");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header on-dark">
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="Aadiz Collection, home">${img("/images/logo.jpg", "Aadiz Collection", { eager: true })}</a>
    <nav class="nav" aria-label="Main">${links}</nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav"><span class="burger" aria-hidden="true"><i></i><i></i></span><span class="menu-label">Menu</span></button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Main (mobile)"><div class="mobile-nav-inner">${mobile}</div></nav>
  <span class="progress" aria-hidden="true"></span>
</header>`;
}

const curtain = `<div class="curtain" aria-hidden="true">
  <div class="cp cp-black"></div><div class="cp cp-red"></div>
  <div class="cl">
    <div class="cl-logo"><img class="cl-l" src="images/logo.jpg" alt="" width="410" height="142"><img class="cl-r" src="images/logo.jpg" alt="" width="410" height="142"></div>
    <p class="cl-tag">Hand-embroidered in Multan since 2004</p>
  </div>
</div>`;

// Runs before first paint so the curtain covers the page immediately. The full intro plays once per session.
const bootScript = `<script>(function(d){var c="js";if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var s;try{s=sessionStorage.getItem("aadiz-intro");sessionStorage.setItem("aadiz-intro","1")}catch(e){s=1}c+=s?" curtain-nav":" curtain-intro"}d.className+=" "+c;setTimeout(function(){if(!window.AADIZ)d.classList.add("motion-off")},4000)})(document.documentElement)</script>`;

function cta(title) {
  return `<section class="cta section-tight">
  <div class="wrap">
    <h2 class="t-h2">${esc(title)}</h2>
    <div class="btn-row">
      <a class="btn btn-red" href="${waLink("Hello Aadiz Collection, I would like to ask about ")}" target="_blank" rel="noopener">Message us on WhatsApp</a>
      <a class="btn btn-ghost" href="contact.html">Send an enquiry</a>
    </div>
  </div>
</section>`;
}

function footer(withCta) {
  const o = BRAND.offices
    .map((x) => `<li><strong>${esc(x.company)}</strong><br>${x.lines.map(esc).join("<br>")}</li>`)
    .join("");
  const pages = NAV.map((n) => `<li><a href="${pageHref(n.href)}">${esc(n.label)}</a></li>`).join("");
  return `<div class="slash-top on-dark">
${withCta ? cta(withCta) : ""}
<footer class="site-footer">
  <div class="wrap">
    <div class="grid">
      <div>
        <a class="logo" href="index.html" aria-label="Aadiz Collection, home">${img("/images/logo.jpg", "Aadiz Collection")}</a>
        <p class="muted" style="margin-top:14px;max-width:26ch">${esc(BRAND.tagline)}</p>
      </div>
      <div><h4>Pages</h4><ul>${pages}</ul></div>
      <div><h4>Offices</h4><ul>${o}</ul></div>
      <div><h4>Reach us</h4><ul>
        <li><a href="tel:+92614544251">${esc(BRAND.phone)}</a></li>
        <li><a href="${waLink("Hello Aadiz Collection")}" target="_blank" rel="noopener">WhatsApp ${esc(BRAND.whatsappDisplay)}</a></li>
        <li><a href="mailto:${BRAND.email}">${esc(BRAND.email)}</a></li>
        <li><a href="${BRAND.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="${BRAND.instagram}" target="_blank" rel="noopener">Instagram</a></li>
      </ul></div>
    </div>
    <p class="small">&copy; ${new Date().getFullYear()} ${esc(BRAND.legal)} All rights reserved.</p>
  </div>
</footer>
</div>`;
}

function page({ file, current, title, desc, body, ctaTitle = "Ask about an order, a piece or a stall at your next exhibition." }) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="images/formal-2.jpg">
<meta name="theme-color" content="#000000">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="images/icon-512.png">
<link rel="apple-touch-icon" href="images/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<link rel="preload" as="image" href="images/logo.jpg">
${bootScript}
</head>
<body>
${curtain}
${header(current)}
<main id="main">
${body}
</main>
${footer(ctaTitle)}
<script src="assets/app.js" defer></script>
</body>
</html>
`;
  writeFileSync(join(dist, file), html);
}

const band = (title, lede) => `<section class="page-band">
  <div class="slash-red"><div class="slash-black on-dark">
    <div class="wrap">
      <h1 class="page-title tab-slant display"><span>${esc(title)}</span></h1>
      <p class="lede rise" style="--d:3">${esc(lede)}</p>
    </div>
  </div></div>
</section>`;

/* ---------- home ---------- */
const heroPics = [
  { src: "/images/formal-1.jpg", alt: "Rose-gold hand-embellished formal outfit with a matching clutch" },
  { src: "/images/formal-2.jpg", alt: "Pastel and gold embroidered ensemble with a tasselled dupatta" },
  { src: "/images/formal-4.jpg", alt: "Lime green festive outfit with a striped dupatta and cut-work hem" },
];

const home = `
<section class="hero">
  <div class="slash-red"><div class="slash-black on-dark">
    <div class="wrap">
      <div class="hero-copy">
        <h1 class="t-hero" data-split>Hand-embroidered in Multan by 300 women artisans</h1>
        <p class="lede rise" style="--d:2">Bridal and formal wear, everyday outfits, handmade shoes and bags. Every embroidered piece carries the stitching of rural women artisans, from Tarkashi to Mukesh work.</p>
        <div class="btn-row rise" style="--d:3">
          <a class="btn btn-red" href="collections.html">View collections</a>
          <a class="btn btn-ghost" href="about.html">Our story</a>
        </div>
      </div>
      <div class="panels">
        ${heroPics.map((p, i) => `<div class="panel" style="--d:${i + 2}">${img(p.src, p.alt, { eager: true })}</div>`).join("")}
      </div>
    </div>
  </div></div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">${[...CRAFTS, ...CRAFTS].map((c) => `<span>${esc(c)}</span>`).join("")}</div>
</div>

<section class="section">
  <div class="wrap split">
    <div class="stack">
      <h2 class="t-h2">Thirty artisans in 2004. More than three hundred today.</h2>
      <p class="measure">Aadiz began to give women in remote areas a market for their embroidery. Twenty years on, the mission is the same: take their crafts to the international market, and grow the community to 2,000 artisans.</p>
      <p><a class="text-link" href="about.html">Read the founders' messages</a></p>
    </div>
    <div class="bars" role="img" aria-label="Women artisans: 30 in 2004, more than 300 today, a goal of 2,000. Bars are drawn to scale.">
      <div class="bar-row"><span class="when">2004</span><div class="bar-track"><div class="bar-fill" style="width:1.5%"></div></div><span></span><span class="bar-num">30 <small>artisans at the start</small></span></div>
      <div class="bar-row"><span class="when">Today</span><div class="bar-track"><div class="bar-fill" style="width:15%"></div></div><span></span><span class="bar-num">300+ <small>artisans from rural areas</small></span></div>
      <div class="bar-row bar-goal"><span class="when">Our goal</span><div class="bar-track"><div class="bar-fill" style="width:100%"></div></div><span></span><span class="bar-num">2,000 <small>artisans</small></span></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="stack" style="margin-bottom:44px">
      <h2 class="t-h2">Browse the collections</h2>
      <p class="measure muted">From bridal ensembles to leather briefcases. Each opens to a full gallery.</p>
    </div>
    <div class="stair">
      ${COLLECTIONS.map(
        (c, i) => `<div class="tile-wrap" style="--i:${i}">
        <a class="tile" href="collections.html#${c.id}">${img(c.cover, c.title, { sizes: "(min-width:900px) 20vw, 50vw" })}<span class="tile-label">${esc(c.title)}</span></a>
        <p class="tile-blurb">${esc(c.blurb)}</p>
      </div>`,
      ).join("")}
    </div>
  </div>
</section>

<section class="slash-both on-dark">
  <div class="wrap split">
    <div class="stack">
      <h2 class="t-h2">Tarkashi, Mukesh and the crafts of the sub-continent</h2>
      <p class="measure muted">Our artisans work in Tarkashi, Mukesh (Kamdani), Gota work, Balochi and Afghani embroidery and more. Our block and digital printing teams help us reshape textile with hand embroidery concepts in a modern look.</p>
      <ul class="crafts" style="margin-top:1.4rem">${CRAFTS.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      <p style="margin-top:1.6rem"><a class="btn btn-red" href="craft.html">See the craft</a></p>
    </div>
    <div class="craft-collage">
      <div class="frame">${img("/images/tarkashi-4.jpg", "Colourful embroidered garden border with trees and flowers")}</div>
      <div class="frame">${img("/images/mukesh-1.jpg", "Pink floral Mukesh embroidery on navy fabric")}</div>
      <div class="frame">${img("/images/mukesh-5.jpg", "Dense red floral hand embroidery")}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="stack" style="margin-bottom:36px">
      <h2 class="t-h2">From the Dubai Shopping Festival in 2004 to Amsterdam in 2025</h2>
      <p class="measure muted">We have exhibited in 10+ countries across Asia, Africa, Europe and North America.</p>
    </div>
    <div class="masonry cols-3">
      ${[0, 2, 3, 5, 7, 6].map((i) => shot(EVENT_PHOTOS[i], "events", { cap: true })).join("")}
    </div>
    <p style="margin-top:12px"><a class="text-link" href="global.html">See every event</a></p>
  </div>
</section>`;

page({
  file: "index.html",
  current: "/",
  title: "Aadiz Collection | Hand-embroidered fashion from Multan",
  desc: "Bridal and formal wear, casual outfits, handmade shoes, bags and leather goods, embroidered by 300+ women artisans in Pakistan.",
  body: home,
  ctaTitle: "Ask about an order, a piece or a stall at your next exhibition.",
});

/* ---------- collections ---------- */
const collections = `
${band("Collections", "Bridal and formal wear, casual outfits, handmade shoes and bags, and leather goods. Select a photo to view it larger.")}
<section class="section" style="padding-top:clamp(24px,4vw,48px)">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Filter collections" style="margin-bottom:48px">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>
      ${COLLECTIONS.map((c) => `<button class="chip" type="button" data-filter="${c.id}" aria-pressed="false">${esc(c.title)}</button>`).join("")}
    </div>
    ${COLLECTIONS.map(
      (c) => `<section class="coll" id="${c.id}" aria-labelledby="h-${c.id}">
      <div class="coll-head"><h2 class="t-h2" id="h-${c.id}">${esc(c.title)}</h2><p class="muted">${esc(c.blurb)}</p></div>
      <div class="masonry">${c.photos.map((p) => shot(p, "coll", { cap: true })).join("")}</div>
    </section>`,
    ).join("")}
  </div>
</section>`;
page({
  file: "collections.html",
  current: "/collections",
  title: "Collections | Aadiz Collection",
  desc: "Browse Aadiz Collection's bridal and formal wear, casual range, handmade shoes, handmade bags and leather bags.",
  body: collections,
  ctaTitle: "Found a piece you like? Ask us about it.",
});

/* ---------- craft ---------- */
const isWide = (p) => { const d = dims[p.src.split("/").pop()]; return d && d.w / d.h > 2; };
const craftBlocks = CRAFT_FEATURES.map(
  (f, i) => `<section class="section${i ? "" : ""}" style="${i ? "padding-top:0" : "padding-top:clamp(24px,4vw,48px)"}" id="${f.id}">
  <div class="wrap">
    <div class="split wide-left" style="align-items:start;margin-bottom:32px">
      <div class="stack">
        <h2 class="t-h2">${esc(f.title)}</h2>
        <p class="muted">${esc(f.alt)}</p>
        <p class="measure">${esc(f.text)}</p>
      </div>
      ${f.hero ? `<figure style="margin:0;max-width:200px">${img(f.hero.src, f.hero.alt)}<figcaption class="caption-under">Mukesh wire worked into fabric by hand</figcaption></figure>` : "<div></div>"}
    </div>
    <div class="masonry cols-3">${f.photos.filter((p) => !isWide(p)).map((p) => shot(p, "craft-" + f.id)).join("")}</div>
    ${f.photos.filter(isWide).map((p) => `<div style="margin-top:2px">${shot(p, "craft-" + f.id)}</div>`).join("")}
  </div>
</section>`,
).join("");

const craft = `
${band("Craft", "Women artisans in rural Pakistan stitch every embroidered piece by hand, using traditional techniques of the sub-continent.")}
${craftBlocks}
<section class="section" style="padding-top:0">
  <div class="wrap split" style="align-items:start">
    <div class="stack">
      <h2 class="t-h2">More from our artisans</h2>
      <p class="measure">Alongside Tarkashi and Mukesh, our artisans work in these crafts and "all kinds of hand craft of sub-continent culture". We also have a dedicated team for block printing and digital printing.</p>
    </div>
    <ul class="crafts light">${CRAFTS.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
  </div>
</section>`;
page({
  file: "craft.html",
  current: "/craft",
  title: "Craft | Aadiz Collection",
  desc: "Tarkashi, Mukesh (Kamdani), Gota work, Balochi and Afghani embroidery: the hand crafts behind Aadiz Collection.",
  body: craft,
  ctaTitle: "Want something made with these crafts? Tell us what you have in mind.",
});

/* ---------- global ---------- */
const global_ = `
${band("Global presence", "Since the Dubai Shopping Festival in 2004, Aadiz Collection has taken part in hundreds of national and international exhibitions.")}
<section class="section" style="padding-top:clamp(24px,4vw,48px)">
  <div class="wrap">
    <div class="masonry cols-3">${EVENT_PHOTOS.map((p) => shot(p, "events", { cap: true })).join("")}</div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    <h2 class="t-h2" style="margin-bottom:36px">Events by country</h2>
    <div class="ledger">
      ${EVENTS.map(
        (g) => `<div class="country"><h3 class="t-h3">${esc(g.country)}</h3><ul>${g.items
          .map((it) => `<li><span>${esc(it.title)}</span>${it.when ? `<span class="when">${esc(it.when)}</span>` : ""}</li>`)
          .join("")}</ul></div>`,
      ).join("")}
    </div>
  </div>
</section>`;
page({
  file: "global.html",
  current: "/global",
  title: "Global presence | Aadiz Collection",
  desc: "Exhibitions and trade fairs from Dubai and Dhaka to Amsterdam, Dallas and Colombo.",
  body: global_,
  ctaTitle: "Planning an exhibition? Talk to us about taking part.",
});

/* ---------- about ---------- */
const person = (m, flip) => `<article class="person${flip ? " flip" : ""}">
  <div class="portrait"><img src="${rel(m.photo)}" alt="Portrait of ${esc(m.name)}" width="${dims[m.photo.split("/").pop()].w}" height="${dims[m.photo.split("/").pop()].h}" loading="lazy"></div>
  <div>
    <h3 class="t-h3">${esc(m.name)}</h3>
    <p class="role">${esc(m.role)}</p>
    ${m.paragraphs.map((p, i) => `<p${i === 0 ? ' class="serif-quote"' : ""}>${esc(p)}</p>`).join("")}
  </div>
</article>`;

const about = `
${band("About", "Aadiz Collection (Pvt) Ltd. started to promote women's empowerment and the skills of women in remote areas.")}
<section class="section" style="padding-top:clamp(32px,5vw,64px)">
  <div class="wrap split" style="align-items:start">
    <div class="stack">
      <h2 class="t-h2">Reshaping textile with hand embroidery</h2>
      <p class="measure">Aadiz Collection (formerly Aadiz Collection, now Aadiz Collection (Pvt) Ltd.) has promoted the handmade embroidered fabrics and crafts of women artisans for more than 20 years. We started with 30 women artisans. Today more than 300 women from rural areas work with us.</p>
      <p class="measure">Our first exhibition was the Dubai Shopping Festival in 2004. Since then we have taken part in hundreds of national and international exhibitions. The basic theme of Aadiz is to reshape textile with hand embroidery concepts and modernize them in a creative look.</p>
    </div>
    <div class="stack">
      <h3 class="t-h3">Our mission</h3>
      <p class="serif-quote">To boost women's empowerment in rural areas by introducing their crafts in the international market.</p>
      <p>We have 300 women artisans and aim to grow that to 2,000.</p>
      <p><a class="text-link" href="certifications.html">See our registrations and certificates</a></p>
    </div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap">
    ${person(MESSAGES.founder, false)}
    ${person(MESSAGES.ceo, true)}
  </div>
</section>`;
page({
  file: "about.html",
  current: "/about",
  title: "About | Aadiz Collection",
  desc: "Founded in Multan in 2004 to bring the crafts of rural women artisans to the world. Read the founder and CEO messages.",
  body: about,
  ctaTitle: "Want to work with us? Get in touch.",
});

/* ---------- credentials ---------- */
const certTitle = (src) => CERTS.find((c) => c.src === src);
const groups = [
  { title: "Registration", srcs: ["cert-pk-incorp", "cert-uae"] },
  { title: "Chamber memberships", srcs: ["cert-fpcci", "cert-multan"] },
];
const used = new Set(groups.flatMap((g) => g.srcs));
groups.push({ title: "Exhibition certificates", srcs: CERTS.map((c) => c.src.replace("/images/", "").replace(".jpg", "")).filter((s) => !used.has(s)) });
const certs = `
${band("Credentials", "Registered in Pakistan and the UAE, with chamber memberships and certificates from exhibitions across the region. Select a document to read it.")}
<section class="section" style="padding-top:clamp(32px,5vw,64px)">
  <div class="wrap">
    ${groups
      .map(
        (g) => `<div class="cert-group"><h2 class="t-h2">${esc(g.title)}</h2><div class="cert-grid">${g.srcs
          .map((s) => certTitle(`/images/${s}.jpg`))
          .filter(Boolean)
          .map(
            (c) => `<a class="cert" href="${rel(c.src)}" data-lb="certs" data-alt="${esc(c.alt)}" data-caption="${esc(c.caption)}"><div class="doc">${img(c.src, c.alt)}</div><p class="t">${esc(c.caption)}</p></a>`,
          )
          .join("")}</div></div>`,
      )
      .join("")}
  </div>
</section>`;
page({
  file: "certifications.html",
  current: "/certifications",
  title: "Credentials | Aadiz Collection",
  desc: "Aadiz Collection's company registration in Pakistan and the UAE, chamber memberships and exhibition certificates.",
  body: certs,
  ctaTitle: "Need documents for a trade enquiry? Ask us.",
});

/* ---------- contact ---------- */
const topics = [...COLLECTIONS.map((c) => c.title), "Exhibition or partnership", "Something else"];
const contact = `
${band("Contact", "Ask about a collection, place an order or talk to us about an exhibition. We reply on WhatsApp and email.")}
<section class="section" style="padding-top:clamp(32px,5vw,64px)">
  <div class="wrap split" style="align-items:start">
    <form class="form" id="enquiry" data-wa="${BRAND.whatsapp}" novalidate>
      <h2 class="t-h2">Send an enquiry</h2>
      <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="f-contact">Email or phone number</label><input id="f-contact" name="contact" autocomplete="email" required></div>
      <div class="field"><label for="f-topic">What are you asking about?</label><select id="f-topic" name="topic">${topics.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
      <div class="field"><label for="f-msg">Message</label><textarea id="f-msg" name="message" required></textarea></div>
      <div><button class="btn btn-dark" type="submit">Send on WhatsApp</button></div>
      <p class="form-note">This opens WhatsApp with your message filled in. Prefer email? Write to <a href="mailto:${BRAND.email}">${esc(BRAND.email)}</a>.</p>
    </form>
    <div class="stack">
      <h2 class="t-h2">Reach us directly</h2>
      <ul class="contact-lines">
        <li><span>Phone</span><a href="tel:+92614544251">${esc(BRAND.phone)}</a></li>
        <li><span>WhatsApp</span><a href="${waLink("Hello Aadiz Collection")}" target="_blank" rel="noopener">${esc(BRAND.whatsappDisplay)}</a></li>
        <li><span>Email</span><a href="mailto:${BRAND.email}">${esc(BRAND.email)}</a></li>
        <li><span>Website</span><span>${esc(BRAND.web)}</span></li>
        <li><span>Facebook</span><a href="${BRAND.facebook}" target="_blank" rel="noopener">aadizcollection</a></li>
        <li><span>Instagram</span><a href="${BRAND.instagram}" target="_blank" rel="noopener">aadizcollectionofficial</a></li>
      </ul>
      <div class="offices" style="margin-top:2rem">
        ${BRAND.offices
          .map((o) => `<div class="office"><h3>${esc(o.label)}</h3><p class="co">${esc(o.company)}</p><p>${o.lines.map(esc).join("<br>")}</p></div>`)
          .join("")}
      </div>
    </div>
  </div>
</section>`;
page({
  file: "contact.html",
  current: "/contact",
  title: "Contact | Aadiz Collection",
  desc: "Contact Aadiz Collection in Multan, Pakistan and Sharjah, UAE by phone, WhatsApp or email.",
  body: contact,
  ctaTitle: "",
});

console.log("Built 7 pages into", dist);
