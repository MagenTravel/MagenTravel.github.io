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

function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

  const select = document.getElementById('language-select');
  if (select) select.value = lang;

  if (translations[lang]) {
    applyTranslations(lang);
  } else {
    loadTranslations(lang);
  }
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  document.getElementById("title").innerText = t.title;
  document.getElementById("text").innerHTML = t.text;
  document.getElementById("footer").innerText = t.footer;
}

document.addEventListener('DOMContentLoaded', () => {
  // wire up the dropdown
  const select = document.getElementById('language-select');
  select.addEventListener('change', e => switchLanguage(e.target.value));

  // load default
  switchLanguage('en');
});
