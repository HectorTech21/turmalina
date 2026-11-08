/* Lógica de la web. No hace falta tocar este archivo: todo el contenido está en content.js */
(function () {
  "use strict";
  var S = window.SALON;
  if (!S) return;

  var lang = pickLanguage();
  var pairIndex = 0;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // estado del comparador antes/después (posición en %)
  var cmp = { pos: 50, frame: 0, pointerId: null, dragging: false, startX: 0, startY: 0, rect: null, tweenTimer: 0 };

  /* ---------- utilidades ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function isI18n(v) { return v && typeof v === "object" && !Array.isArray(v) && ("es" in v || "en" in v); }
  function t(v) { return isI18n(v) ? (v[lang] != null ? v[lang] : v.es) : (v == null ? "" : v); }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fill(str, data) { return String(str).replace(/\{(\w+)\}/g, function (_, k) { return data[k] != null ? data[k] : ""; }); }
  function locale() { return lang === "es" ? "es-ES" : "en-GB"; }
  function storage(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  function pickLanguage() {
    var langs = S.languages || ["es"];
    var q = new URLSearchParams(location.search).get("lang");
    if (q && langs.indexOf(q) > -1) return q;
    var saved = storage("salon-lang");
    if (saved && langs.indexOf(saved) > -1) return saved;
    var nav = (navigator.language || "es").slice(0, 2);
    if (nav !== "es" && langs.indexOf("en") > -1) return "en";
    return S.defaultLanguage || "es";
  }

  /* Foto o hueco marcado con el tamaño recomendado */
  function media(img, extraClass) {
    if (!img) return "";
    if (img.src) {
      return '<img class="' + (extraClass || "") + '" src="' + esc(img.src) + '" alt="' + esc(t(img.alt)) + '" loading="lazy" decoding="async">';
    }
    var label = img.label ? t(img.label) : t(img.alt);
    return '<div class="ph ' + (extraClass || "") + '" role="img" aria-label="' + esc(t(img.alt)) + '">' +
      '<span class="ph__label">' + esc(t(S.ui.photo)) + ": " + esc(label) + "</span>" +
      '<span class="ph__size">' + esc(img.size || "") + " px " + esc(t(S.ui.recommended)) + "</span></div>";
  }

  /* ---------- tema ---------- */
  function applyTheme() {
    var th = S.theme || {}, r = document.documentElement.style;
    // Cada clave de theme se convierte en una variable CSS: stoneLight -> --stone-light
    Object.keys(th).forEach(function (k) {
      if (th[k]) r.setProperty("--" + k.replace(/[A-Z]/g, function (m) { return "-" + m.toLowerCase(); }), th[k]);
    });
    var meta = $('meta[name="theme-color"]'); if (meta && th.stone) meta.content = th.stone;
  }

  /* ---------- enlaces ---------- */
  function links() {
    var b = S.business;
    var wa = (b.whatsapp || "").replace(/\D/g, "");
    var hrefs = {
      tel: "tel:" + b.phone,
      directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(b.mapsQuery),
      whatsapp: wa ? "https://wa.me/" + wa + "?text=" + encodeURIComponent(t(b.whatsappMessage)) : ""
    };
    $$("[data-link]").forEach(function (a) {
      var k = a.getAttribute("data-link");
      // Sin número de WhatsApp en content.js, sus botones no se muestran
      if (k === "whatsapp" && !wa) { a.hidden = true; a.removeAttribute("href"); return; }
      a.hidden = false;
      a.href = hrefs[k];
    });
  }

  /* ---------- horario ---------- */
  function madridNow() {
    var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(o.weekday);
    return { day: day, minutes: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function dayName(i, style) {
    var s = new Intl.DateTimeFormat(locale(), { weekday: style || "long", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 1 + i)));
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function statusText() {
    var now = madridNow(), h = S.hours[now.day];
    if (h && now.minutes >= toMin(h[0]) && now.minutes < toMin(h[1])) {
      return { open: true, text: t(S.ui.openNow) + ", " + t(S.ui.closesAt) + " " + h[1] };
    }
    // próxima apertura
    for (var i = 0; i < 8; i++) {
      var d = (now.day + i) % 7, hh = S.hours[d];
      if (!hh) continue;
      if (i === 0 && now.minutes >= toMin(hh[0])) continue;
      var when = i === 0 ? t(S.ui.today) : (lang === "es" ? dayName(d).toLowerCase() : dayName(d));
      return { open: false, text: t(S.ui.closedNow) + ", " + t(S.ui.opensAt) + " " + when + " " + hh[0] };
    }
    return { open: false, text: t(S.ui.closedNow) };
  }

  /* ---------- render ---------- */
  function renderStatic() {
    $$("[data-i18n]").forEach(function (el) {
      var v = get(el.getAttribute("data-i18n"));
      if (v != null) el.textContent = t(v);
    });
    $$("[data-bind]").forEach(function (el) { el.textContent = t(get(el.getAttribute("data-bind"))); });
  }

  function renderBanner() {
    var el = $("#proposal");
    if (!el || !S.proposalBanner || !S.proposalBanner.show) { if (el) el.remove(); return; }
    el.hidden = false;
    el.textContent = t(S.proposalBanner.text);
  }

  function renderNav() {
    $("#nav-list").innerHTML = S.nav.map(function (n) {
      return '<li><a href="#' + n.id + '">' + esc(t(n.label)) + "</a></li>";
    }).join("");
  }

  function renderLang() {
    var names = { es: "Español", en: "English" };
    var box = $("#lang-switch");
    box.setAttribute("aria-label", t(S.ui.languageLabel));
    box.innerHTML = S.languages.map(function (l) {
      return '<button type="button" lang="' + l + '" data-lang="' + l + '" aria-pressed="' + (l === lang) + '" aria-label="' + names[l] + '">' + l.toUpperCase() + "</button>";
    }).join("");
  }

  function ratingData() {
    var r = S.business.rating;
    return { value: new Intl.NumberFormat(locale(), { minimumFractionDigits: 1 }).format(r.value), count: r.count, source: r.source };
  }

  function renderHero() {
    $("#hero-image").innerHTML = media(S.hero.image);
    $("#hero-rating").innerHTML = starSvg() + "<span>" + esc(fill(t(S.ui.ratingText), ratingData())) + "</span>";
    var st = statusText();
    var el = $("#hero-status");
    el.textContent = st.text;
    el.classList.toggle("is-open", st.open);
  }

  function starSvg(n) {
    var one = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
    return '<span class="stars" aria-hidden="true">' + new Array((n || 1) + 1).join(one) + "</span>";
  }

  function renderServices() {
    var fmt = new Intl.NumberFormat(locale(), { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
    var jump = $("#cat-jump");
    if (jump) jump.innerHTML = S.services.categories.map(function (c) {
      return '<a href="#cat-' + c.id + '">' + esc(t(c.name)) + "</a>";
    }).join("");
    $("#services-list").innerHTML = S.services.categories.map(function (c) {
      return '<article class="cat" id="cat-' + c.id + '">' +
        '<div class="cat__media gem">' + media(c.image) + "</div>" +
        '<div class="cat__body"><h3 class="cat__name">' + esc(t(c.name)) + "</h3>" +
        '<p class="cat__blurb">' + esc(t(c.blurb)) + "</p>" +
        '<ul class="price-list">' + c.items.map(function (it) {
          return '<li><span class="price-list__name">' + esc(t(it.name)) + '</span><span class="price-list__dots" aria-hidden="true"></span>' +
            '<span class="price-list__price"><small>' + esc(t(S.ui.from)) + "</small> " + esc(fmt.format(it.price)) + "</span></li>";
        }).join("") + "</ul></div></article>";
    }).join("");
  }

  function renderGallery() {
    var tabs = $("#pair-tabs");
    tabs.innerHTML = S.gallery.pairs.map(function (p, i) {
      return '<button type="button" role="tab" id="pair-tab-' + i + '" aria-controls="compare" aria-selected="' + (i === pairIndex) + '" tabindex="' + (i === pairIndex ? 0 : -1) + '" data-pair="' + i + '">' + esc(t(p.label)) + "</button>";
    }).join("");
    var compare = $("#compare");
    compare.setAttribute("role", "tabpanel");
    compare.setAttribute("aria-labelledby", "pair-tab-" + pairIndex);
    var p = S.gallery.pairs[pairIndex];
    $("#compare-before").innerHTML = media(Object.assign({ label: t(S.ui.before) + ", " + t(p.label).toLowerCase() }, p.before));
    $("#compare-after").innerHTML = media(Object.assign({ label: t(S.ui.after) + ", " + t(p.label).toLowerCase() }, p.after));
    var range = $("#compare-range");
    range.setAttribute("aria-label", t(S.ui.compareLabel) + ": " + t(p.label));
    // las fotos nuevas se colocan en la posición actual sin animación
    compare.classList.remove("is-tweening");
    applyPos();
  }

  /* ---------- comparador: solo se mueve con transform ---------- */
  function applyPos() {
    cmp.frame = 0;
    var compare = $("#compare"), before = $("#compare-before"), pos = cmp.pos;
    before.style.transform = "translateX(" + (pos - 100) + "%)";
    if (before.firstElementChild) before.firstElementChild.style.transform = "translateX(" + (100 - pos) + "%)";
    $(".compare__handle", compare).style.transform = "translateX(" + pos + "%)";
    compare.setAttribute("data-edge", pos < 14 ? "start" : pos > 86 ? "end" : "");
  }
  function setPos(pos, tween) {
    var compare = $("#compare"), range = $("#compare-range");
    cmp.pos = Math.max(0, Math.min(100, pos));
    range.value = Math.round(cmp.pos);
    range.setAttribute("aria-valuetext", Math.round(cmp.pos) + "% " + t(S.ui.before).toLowerCase());
    clearTimeout(cmp.tweenTimer);
    if (tween && !reduceMotion) {
      compare.classList.add("is-tweening");
      cmp.tweenTimer = setTimeout(function () { compare.classList.remove("is-tweening"); }, 300);
    } else {
      compare.classList.remove("is-tweening");
    }
    // como mucho una actualización por fotograma
    if (!cmp.frame) cmp.frame = requestAnimationFrame(applyPos);
  }
  function posFromX(x) { return ((x - cmp.rect.left) / cmp.rect.width) * 100; }

  function renderWhy() {
    var r = ratingData();
    $("#score").innerHTML = '<p class="score__value">' + esc(r.value) + "</p>" +
      '<div class="score__meta">' + starSvg(5) + "<p>" + esc(fill(t(S.ui.ratingShort), r)) + "</p></div>";
    $("#points").innerHTML = S.why.points.map(function (p) {
      return '<li class="point"><h3 class="point__title">' + esc(t(p.title)) + '</h3><p>' + esc(t(p.text)) + "</p></li>";
    }).join("");
    $("#reviews").innerHTML = S.why.reviews.items.map(function (rv) {
      return '<li class="review"><span class="sample-tag">' + esc(t(S.ui.sampleText)) + "</span>" +
        starSvg(5) +
        "<blockquote><p>" + esc(t(rv.text)) + "</p></blockquote>" +
        '<p class="review__by"><strong>' + esc(rv.name) + "</strong> <span>" + esc(t(rv.service)) + "</span></p></li>";
    }).join("");
  }

  function renderVisit() {
    var a = S.business.address;
    $("#address").innerHTML = "<strong>" + esc(a.building) + "</strong><br>" + esc(t(a.unit)) + "<br>" +
      esc(a.street) + ", " + esc(a.postalCode) + " " + esc(a.city) + " (" + esc(a.district) + ")";
    var today = madridNow().day;
    var caption = '<caption class="visually-hidden">' + esc(t(S.visit.hoursTitle)) + "</caption>";
    $("#hours").innerHTML = caption + "<tbody>" + S.hours.map(function (h, i) {
      var isToday = i === today;
      return "<tr" + (isToday ? ' class="is-today"' : "") + '><th scope="row">' + esc(dayName(i)) +
        (isToday ? ' <span class="today-tag">' + esc(t(S.ui.today)) + "</span>" : "") +
        "</th><td>" + (h ? h[0] + "–" + h[1] : esc(t(S.ui.closed))) + "</td></tr>";
    }).join("") + "</tbody>";
    var map = $("#map");
    var src = "https://www.google.com/maps?q=" + encodeURIComponent(S.business.mapsQuery) + "&hl=" + lang + "&z=16&output=embed";
    if (map.getAttribute("src") !== src) map.setAttribute("src", src);
    map.title = t(S.visit.mapTitle);
  }

  function renderFooter() {
    var a = S.business.address;
    $("#footer-addr").textContent = a.street + ", " + a.building + ", " + t(a.unit) + ". " + a.postalCode + " " + a.city + ". " + S.business.phoneDisplay;
    $("#footer-legal").innerHTML = S.footer.legal.map(function (l) {
      return '<li><a href="' + esc(l.href) + (lang !== "es" ? "?lang=" + lang : "") + '">' + esc(t(l.label)) + "</a></li>";
    }).join("");
    $("#footer-copy").textContent = "© " + new Date().getFullYear() + " " + S.business.name + ". " + t(S.footer.rights);
  }

  function renderHead() {
    document.documentElement.lang = lang;
    document.title = t(S.seo.title);
    var d = $('meta[name="description"]'); if (d) d.content = t(S.seo.description);
    var ogt = $('meta[property="og:title"]'); if (ogt) ogt.content = t(S.seo.title);
    var ogd = $('meta[property="og:description"]'); if (ogd) ogd.content = t(S.seo.description);

    // Datos estructurados BeautySalon generados desde content.js
    var b = S.business, a = b.address, en = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var groups = {};
    S.hours.forEach(function (h, i) { if (!h) return; var k = h.join("-"); (groups[k] = groups[k] || { opens: h[0], closes: h[1], days: [] }).days.push(en[i]); });
    var ld = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: b.name,
      telephone: b.phone,
      url: b.siteUrl,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: a.street + ", " + a.building + ", " + (a.unit.es || a.unit),
        postalCode: a.postalCode, addressLocality: a.city, addressRegion: a.region, addressCountry: a.country
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(b.mapsQuery),
      openingHoursSpecification: Object.keys(groups).map(function (k) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: groups[k].days, opens: groups[k].opens, closes: groups[k].closes };
      }),
      knowsLanguage: ["es"]
    };
    var s = $("#ld-json"); if (s) s.textContent = JSON.stringify(ld, null, 2);
  }

  function renderAll() {
    renderHead();
    renderStatic();
    renderBanner();
    renderNav();
    renderLang();
    renderHero();
    renderServices();
    renderGallery();
    renderWhy();
    renderVisit();
    renderFooter();
    links();
  }

  /* ---------- interacción ---------- */
  function bind() {
    // idioma
    $("#lang-switch").addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (!btn || btn.dataset.lang === lang) return;
      lang = btn.dataset.lang;
      storage("salon-lang", lang);
      renderAll();
      $('#lang-switch button[data-lang="' + lang + '"]').focus();
    });

    // menú móvil
    var header = $(".header"), menuBtn = $("#menu-btn");
    function setMenu(open) {
      header.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      $(".visually-hidden", menuBtn).textContent = t(open ? S.ui.close : S.ui.menu);
    }
    menuBtn.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
    $("#nav").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
    });

    // comparador: teclado (sin animación, responde al instante)
    var range = $("#compare-range");
    range.addEventListener("input", function () { setPos(+range.value, false); });

    // comparador: ratón y dedo con Pointer Events
    var compare = $("#compare");
    function endDrag() {
      if (cmp.pointerId !== null && compare.hasPointerCapture && compare.hasPointerCapture(cmp.pointerId)) {
        try { compare.releasePointerCapture(cmp.pointerId); } catch (err) { /* ya liberado */ }
      }
      cmp.pointerId = null; cmp.dragging = false;
      compare.classList.remove("is-dragging");
    }
    function startDrag(e) {
      cmp.dragging = true;
      try { compare.setPointerCapture(e.pointerId); } catch (err) { /* sin captura también funciona */ }   // sigue el arrastre aunque el dedo salga de la foto
      compare.classList.add("is-dragging");
    }
    compare.addEventListener("pointerdown", function (e) {
      if (cmp.pointerId !== null) return;        // ignora un segundo dedo
      if (e.pointerType === "mouse" && e.button !== 0) return;
      cmp.pointerId = e.pointerId;
      cmp.rect = compare.getBoundingClientRect();
      cmp.startX = e.clientX; cmp.startY = e.clientY;
      if (e.pointerType === "mouse") {
        e.preventDefault();                      // evita arrastrar la imagen
        startDrag(e);
        setPos(posFromX(e.clientX), true);       // el clic lleva el tirador hasta el cursor
      }
      // con el dedo esperamos a ver si el gesto es horizontal (comparar) o vertical (scroll)
    });
    compare.addEventListener("pointermove", function (e) {
      if (e.pointerId !== cmp.pointerId) return;
      if (!cmp.dragging) {
        var dx = Math.abs(e.clientX - cmp.startX), dy = Math.abs(e.clientY - cmp.startY);
        if (dx < 6 || dx < dy) return;
        startDrag(e);
      }
      setPos(posFromX(e.clientX), false);        // al arrastrar, sin retraso
    });
    compare.addEventListener("pointerup", function (e) {
      if (e.pointerId !== cmp.pointerId) return;
      if (!cmp.dragging) setPos(posFromX(e.clientX), true);   // toque suelto
      endDrag();
    });
    compare.addEventListener("pointercancel", function (e) {
      if (e.pointerId === cmp.pointerId) endDrag();          // el navegador decidió hacer scroll
    });
    compare.addEventListener("lostpointercapture", function (e) {
      if (e.pointerId === cmp.pointerId) endDrag();
    });

    var tabs = $("#pair-tabs");
    tabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pair]"); if (!b) return;
      pairIndex = +b.dataset.pair; renderGallery();
      setPos(50, e.detail > 0);                  // con ratón o dedo vuelve al centro animado; con teclado, al instante
      $('#pair-tabs [data-pair="' + pairIndex + '"]').focus();
    });
    tabs.addEventListener("keydown", function (e) {
      var n = S.gallery.pairs.length, next = null;
      if (e.key === "ArrowRight") next = (pairIndex + 1) % n;
      if (e.key === "ArrowLeft") next = (pairIndex - 1 + n) % n;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = n - 1;
      if (next === null) return;
      e.preventDefault(); pairIndex = next; renderGallery(); setPos(50, false);
      $('#pair-tabs [data-pair="' + pairIndex + '"]').focus();
    });

    // estado abierto/cerrado actualizado cada minuto
    setInterval(function () {
      var st = statusText(), el = $("#hero-status");
      el.textContent = st.text; el.classList.toggle("is-open", st.open);
    }, 60000);
  }

  /* ---------- entrada de secciones al hacer scroll ---------- */
  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var single = [".section__head", ".cat-jump", ".compare-frame", ".why__top", ".reviews__title", ".visit__info", ".map", ".contact__inner"];
    var lists = ["#services-list", "#points", "#reviews"];
    single.forEach(function (sel) { $$(sel).forEach(function (el) { el.setAttribute("data-reveal", ""); }); });
    lists.forEach(function (sel) { $$(sel).forEach(function (el) { el.setAttribute("data-reveal", "stagger"); }); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);                 // solo la primera vez
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    $$("[data-reveal]").forEach(function (el) { io.observe(el); });
    document.documentElement.classList.add("motion");
  }

  applyTheme();
  renderAll();
  bind();
  setupReveal();
  document.documentElement.classList.add("is-ready");
})();
