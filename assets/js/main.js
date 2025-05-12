// assets/js/main.js

function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir  = (lang === 'he' ? 'rtl' : 'ltr');
  if (window.translations[lang]) {
    window.applyTranslations(lang);
  } else {
    window.loadTranslations(lang);
  }
}

// Wait for DOM, then load default
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage("en");
});
