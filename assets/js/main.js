// assets/js/main.js
// assets/js/main.js
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  [
    { id: "headerStory",        key: "headerStory",        html: true  },
    { id: "headerCTA",          key: "headerCTA",          html: false },
    { id: "feature1Title",      key: "feature1Title",      html: false },
    { id: "feature1Text",       key: "feature1Text",       html: true  },
    { id: "feature1CTA",        key: "feature1CTA",        html: false },
    { id: "feature2Title",      key: "feature2Title",      html: false },
    { id: "feature2Text",       key: "feature2Text",       html: true  },
    { id: "feature2CTA",        key: "feature2CTA",        html: false },
    { id: "feature3Title",      key: "feature3Title",      html: false },
    { id: "feature3Text",       key: "feature3Text",       html: true  },
    { id: "feature3CTA",        key: "feature3CTA",        html: false },
    { id: "footerCopyright",    key: "footerCopyright",    html: false },
    { id: "footerEmailLabel",   key: "footerEmailLabel",   html: false },
    { id: "footerEmail",        key: "footerEmail",        html: false, attr: "href" },
    { id: "footerLinkedInLabel",key: "footerLinkedInLabel",html: false },
    { id: "footerLinkedIn",     key: "footerLinkedIn",     html: false, attr: "href" },
  ].forEach(({ id, key, html, attr }) => {
    const el = document.getElementById(id);
    if (!el || t[key] == null) return;
    if (attr) {
      el.setAttribute(attr, t[key]);
      if (!html) el.innerText = t[key];
    } else if (html) {
      el.innerHTML = t[key];
    } else {
      el.innerText = t[key];
    }
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
