const translations = {};

async function loadTranslations(lang) {
  try {
    const res = await fetch(`assets/lang/${lang}.json`);
    translations[lang] = await res.json();
    applyTranslations(lang);
  } catch (err) {
    console.error(`Could not load language file: ${lang}`, err);
  }
}