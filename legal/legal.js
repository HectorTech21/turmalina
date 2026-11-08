/* Rellena las páginas legales con los datos de content.js.
   Cualquier elemento con data-fill="ruta.del.dato" recibe ese valor. */
(function () {
  var S = window.SALON; if (!S) return;
  var q = new URLSearchParams(location.search).get("lang");
  var lang = q === "en" ? "en" : "es";
  var th = S.theme || {}, r = document.documentElement.style;
  ["rubellite", "indigo", "amber", "stone", "ink"].forEach(function (k) { if (th[k]) r.setProperty("--" + k, th[k]); });
  var a = S.business.address;
  var extra = {
    fullAddress: a.street + ", " + a.building + ", " + (a.unit.es || a.unit) + ", " + a.postalCode + " " + a.city,
    year: new Date().getFullYear()
  };
  document.querySelectorAll("[data-fill]").forEach(function (el) {
    var path = el.getAttribute("data-fill");
    var v = extra[path] != null ? extra[path] : path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
    if (v && typeof v === "object") v = v[lang] || v.es;
    if (v != null) el.textContent = v;
  });
  var back = document.querySelector("[data-back]");
  if (back && lang === "en") back.textContent = "Back to home";
})();
