// Initialize language dropdown and translations
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('lang-select');
    select.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
    });
    // Load default language
    switchLanguage('en');
});

function switchLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';
    if (translations[lang]) {
        applyTranslations(lang);
    } else {
        loadTranslations(lang);
    }
}

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    document.getElementById('lang-select').value = lang;
    document.getElementById('title').innerText = t.title;
    document.getElementById('text').innerHTML = t.text;
    document.getElementById('footer').innerText = t.footer;
}
