function switchLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
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

// Load default language
switchLanguage('en');
