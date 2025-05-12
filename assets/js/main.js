// assets/js/main.js
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // For each mapping, only set text if the element actually exists
  [
    { id: "title",       field: "title",       useHTML: false },
    { id: "button-text", field: "buttonText",  useHTML: false },
    { id: "text",        field: "text",        useHTML: true  },
    { id: "footer",      field: "footer",      useHTML: false },
  ].forEach(({ id, field, useHTML }) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (useHTML) el.innerHTML  = t[field];
    else         el.innerText  = t[field];
  });
}

function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'he' ? 'rtl' : 'ltr');
  if (translations[lang]) {
    applyTranslations(lang);
  } else {
    loadTranslations(lang);
  }
}

// Wait for the DOM, then kick off translation
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage("en");
});

// Expose applyTranslations so translation.js can call it
window.applyTranslations = applyTranslations;
