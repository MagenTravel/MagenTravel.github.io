// assets/js/translations.js

// 1️⃣ Declare your translations store exactly once
const translations = {};

// 2️⃣ Load and parse JSON, then apply
async function loadTranslations(lang) {
  try {
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

// 3️⃣ Populate the DOM
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  document.getElementById("title").innerText       = t.title;
  document.getElementById("button-text").innerText  = t.buttonText;
  document.getElementById("text").innerHTML         = t.text;
  document.getElementById("footer").innerText      = t.footer;
}

// 4️⃣ Expose for main.js
window.translations      = translations;
window.loadTranslations  = loadTranslations;
window.applyTranslations = applyTranslations;
