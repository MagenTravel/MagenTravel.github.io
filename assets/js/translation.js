// assets/js/translation.js
const translations = {};

async function loadTranslations(lang) {
  try {
    // Make sure we reference the correct relative path
    const path = `./assets/lang/${lang}.json`;
    console.log(`⏳ Loading translations from: ${path}`);
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    translations[lang] = await res.json();
    applyTranslations(lang);
  } catch (err) {
    console.error(`❌ Could not load language file (“${lang}”):`, err);
  }
}

// Expose to global so main.js can call it
window.translations      = translations;
window.loadTranslations  = loadTranslations;
