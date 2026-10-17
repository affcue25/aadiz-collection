(function () {
  "use strict";
  window.AADIZ = true;

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slice = function (list) { return Array.prototype.slice.call(list); };
  // Page-load animations wait until the curtain has lifted (matches --enter in style.css).
  var enterDelay = root.classList.contains("curtain-intro") ? 1450 : root.classList.contains("curtain-nav") ? 400 : 0;

  /* ----- logo curtain on page-to-page clicks ----- */
  var curtain = document.querySelector(".curtain");
  if (curtain && !reduce) {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.protocol !== location.protocol || a.host !== location.host) return;
      if (a.pathname === location.pathname) return;
      e.preventDefault();
      curtain.classList.add("is-leaving");
      var href = a.href;
      setTimeout(function () { location.href = href; }, 720);
    });
    // Coming back through the back/forward cache: open the curtain again.
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) curtain.classList.remove("is-leaving");
    });
  }

  /* ----- header: compact on scroll, reading progress ----- */
  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".progress");
  var ticking = false;
  var parallaxEls = [];
  var revealCheck = function () {};

  function onFrame() {
    ticking = false;
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", y > 24);
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    revealCheck();

    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.translate = "0 " + (Math.max(-1, Math.min(1, p)) * -22).toFixed(1) + "px";
    });
  }
  function requestFrame() {
    if (!ticking) { ticking = true; requestAnimationFrame(onFrame); }
  }
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame);

  if (!reduce) {
    parallaxEls = slice(document.querySelectorAll(".panel img, .craft-collage .frame img"));
    parallaxEls.forEach(function (el) { el.classList.add("parallax"); });
  }

  /* ----- mobile menu ----- */
  var btn = document.querySelector(".menu-btn");
  var panel = document.getElementById("mobile-nav");
  if (btn && panel) {
    var label = btn.querySelector(".menu-label");
    btn.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close" : "Menu";
    });
  }
  onFrame();

  /* ----- ripples on buttons and chips ----- */
  if (!reduce) {
    document.addEventListener("pointerdown", function (e) {
      var t = e.target.closest && e.target.closest(".btn, .chip, .menu-btn");
      if (!t) return;
      var r = t.getBoundingClientRect();
      var s = document.createElement("span");
      var size = Math.max(r.width, r.height) * 2.2;
      s.className = "ripple";
      s.style.width = s.style.height = size + "px";
      s.style.left = e.clientX - r.left + "px";
      s.style.top = e.clientY - r.top + "px";
      t.appendChild(s);
      s.addEventListener("animationend", function () { s.remove(); });
    });
  }

  /* ----- scroll reveals ----- */
  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words
      .map(function (w, i) { return '<span class="w" aria-hidden="true"><span class="wi" style="--wi:' + i + '">' + w.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span></span>"; })
      .join(" ");
  }

  function countUp(el) {
    var node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    var m = node.nodeValue.match(/^([\d,]+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1].replace(/,/g, ""), 10);
    var suffix = m[2];
    var start = null;
    var dur = 1600;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 4);
      node.nodeValue = Math.round(target * eased).toLocaleString("en-US") + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!reduce) {
    var tag = function (sel, type) {
      slice(document.querySelectorAll(sel)).forEach(function (el) {
        if (el.hasAttribute("data-reveal") || el.closest(".lb, .curtain, .site-header")) return;
        el.setAttribute("data-reveal", type);
      });
    };
    slice(document.querySelectorAll(".t-h2, .hero h1[data-split], .cta h2")).forEach(function (h) {
      splitWords(h);
      h.setAttribute("data-reveal", "split");
    });
    tag(".bars", "bars");
    tag(".shot, .tile, .craft-collage .frame", "img");
    tag(
      ".stack > :not(.crafts):not(.contact-lines):not(.offices), .tile-blurb, .coll-head > p, .crafts li, .country, .person .portrait, " +
        ".person > div:not(.portrait), .cert, .office, .contact-lines li, .form > :not(h2), .cta .btn-row, .filters, " +
        ".site-footer .grid > div, figure",
      "up",
    );

    // Position checks rather than IntersectionObserver: Chrome treats clip-path: inset(100%) as fully hidden.
    var pending = null;
    revealCheck = function () {
      if (!pending || !pending.length) return;
      var limit = window.innerHeight * 0.92;
      var batch = [];
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.width > 0 && r.top < limit) { batch.push(el); return false; }
        return true;
      });
      batch.forEach(function (el, i) {
        el.style.setProperty("--rd", Math.min(i, 8) * 85 + "ms");
        el.classList.add("in");
        if (el.getAttribute("data-reveal") === "bars") {
          slice(el.querySelectorAll(".bar-num")).forEach(function (n, j) { setTimeout(function () { countUp(n); }, j * 180); });
        }
      });
    };
    setTimeout(function () {
      pending = slice(document.querySelectorAll("[data-reveal]"));
      revealCheck();
    }, enterDelay);
    window.addEventListener("load", function () { revealCheck(); });
  }

  /* ----- collection filter ----- */
  var chips = slice(document.querySelectorAll("[data-filter]"));
  var colls = slice(document.querySelectorAll(".coll"));
  function applyFilter(id, animate) {
    chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === id)); });
    colls.forEach(function (s) {
      var show = id === "all" || s.id === id;
      s.hidden = !show;
      if (show && animate && !reduce) {
        s.classList.remove("coll-enter");
        void s.offsetWidth;
        s.classList.add("coll-enter");
      }
    });
    requestFrame();
  }
  if (chips.length) {
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var id = c.getAttribute("data-filter");
        applyFilter(id, true);
        try { history.replaceState(null, "", id === "all" ? location.pathname : "#" + id); } catch (e) {}
      });
    });
    var fromHash = function (scroll) {
      var h = (location.hash || "").replace("#", "");
      if (h && colls.some(function (s) { return s.id === h; })) {
        applyFilter(h, !scroll);
        if (scroll) window.scrollTo(0, 0);
      } else {
        applyFilter("all", false);
      }
    };
    fromHash(true);
    window.addEventListener("hashchange", function () { fromHash(false); });
  }

  /* ----- lightbox: the photo grows out of its thumbnail ----- */
  var items = slice(document.querySelectorAll("[data-lb]"));
  if (items.length) {
    var lb = document.createElement("div");
    lb.className = "lb on-dark";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML =
      '<div class="lb-bg"></div>' +
      '<div class="lb-top"><img class="lb-logo" src="images/logo.jpg" alt="Aadiz Collection" width="410" height="142"><span class="lb-count" aria-hidden="true"></span></div>' +
      '<div class="lb-stage">' +
      '<button class="x" type="button" aria-label="Close viewer">Close</button>' +
      '<button class="prev" type="button" aria-label="Previous image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<img class="lb-img" alt="">' +
      '<button class="next" type="button" aria-label="Next image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
      "</div>" +
      '<div class="lb-bar" aria-live="polite"></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector(".lb-img");
    var bar = lb.querySelector(".lb-bar");
    var count = lb.querySelector(".lb-count");
    var stage = lb.querySelector(".lb-stage");
    var closeBtn = lb.querySelector(".x");
    var group = [];
    var idx = 0;
    var closing = false;
    var EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

    var thumbRect = function (el) { return (el.querySelector("img") || el).getBoundingClientRect(); };
    var whenLoaded = function (fn) {
      if (img.complete && img.naturalWidth) fn();
      else img.onload = function () { img.onload = null; fn(); };
    };
    // Animate the viewer image between its own box and a thumbnail's box.
    function flip(from, reverse, done) {
      var to = img.getBoundingClientRect();
      if (!img.animate || reduce || !to.width || !from.width) { if (done) done(); return; }
      var t = "translate(" + (from.left - to.left) + "px," + (from.top - to.top) + "px) scale(" + from.width / to.width + "," + from.height / to.height + ")";
      var frames = [{ transformOrigin: "0 0", transform: t }, { transformOrigin: "0 0", transform: "none" }];
      var anim = img.animate(reverse ? frames.reverse() : frames, { duration: reverse ? 420 : 620, easing: reverse ? "cubic-bezier(0.5, 0, 0.2, 1)" : EASE, fill: "both" });
      anim.onfinish = function () { if (!reverse) anim.cancel(); if (done) done(); };
    }

    function visibleGroup(name) {
      return items.filter(function (el) {
        return el.getAttribute("data-lb") === name && !el.closest("[hidden]");
      });
    }
    function show(i, dir) {
      idx = (i + group.length) % group.length;
      var el = group[idx];
      img.getAnimations && img.getAnimations().forEach(function (a) { a.cancel(); });
      img.src = el.getAttribute("href");
      img.alt = el.getAttribute("data-alt") || "";
      bar.textContent = (el.getAttribute("data-caption") || el.getAttribute("data-alt") || "") + "  (" + (idx + 1) + " of " + group.length + ")";
      count.innerHTML = "<b>" + String(idx + 1).padStart(2, "0") + "</b> / " + String(group.length).padStart(2, "0");
      if (dir && img.animate && !reduce) {
        img.style.opacity = "0";
        whenLoaded(function () {
          img.style.opacity = "";
          img.animate(
            [{ opacity: 0, transform: "translateX(" + dir * 70 + "px) scale(0.96)" }, { opacity: 1, transform: "none" }],
            { duration: 520, easing: EASE },
          );
        });
      }
    }
    function open(el) {
      group = visibleGroup(el.getAttribute("data-lb"));
      closing = false;
      lb.classList.remove("closing");
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      var from = thumbRect(el);
      img.style.opacity = "0";
      show(group.indexOf(el), 0);
      whenLoaded(function () {
        img.style.opacity = "";
        flip(from, false);
      });
      closeBtn.focus({ preventScroll: true });
    }
    function close() {
      if (closing) return;
      closing = true;
      var el = group[idx];
      var r = thumbRect(el);
      var onScreen = r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      lb.classList.add("closing");
      var finish = function () {
        lb.classList.remove("open", "closing");
        document.body.style.overflow = "";
        img.getAnimations && img.getAnimations().forEach(function (a) { a.cancel(); });
        img.removeAttribute("src");
        closing = false;
        if (el) el.focus({ preventScroll: true });
      };
      if (onScreen && img.animate && !reduce) flip(r, true, finish);
      else if (img.animate && !reduce) {
        img.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(0.94)" }], { duration: 300, easing: "ease", fill: "both" }).onfinish = finish;
      } else finish();
    }
    items.forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); open(el); });
    });
    closeBtn.addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", function () { show(idx - 1, -1); });
    lb.querySelector(".next").addEventListener("click", function () { show(idx + 1, 1); });
    lb.addEventListener("click", function (e) {
      if (e.target === stage || e.target.classList.contains("lb-bg") || e.target.classList.contains("lb-top") || e.target === bar) close();
    });
    var touchX = null;
    stage.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1, -1);
      else if (e.key === "ArrowRight") show(idx + 1, 1);
      else if (e.key === "Tab") {
        var f = slice(lb.querySelectorAll("button"));
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ----- enquiry form: opens WhatsApp with the message filled in ----- */
  var form = document.getElementById("enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var text =
        "Hello Aadiz Collection,\n\n" +
        (d.get("message") || "") + "\n\n" +
        "Interested in: " + (d.get("topic") || "") + "\n" +
        "Name: " + (d.get("name") || "") + "\n" +
        "Contact: " + (d.get("contact") || "");
      window.open("https://wa.me/" + form.getAttribute("data-wa") + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }
})();
