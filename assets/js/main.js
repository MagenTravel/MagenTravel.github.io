function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  const staticFields = [
    { id: "headerStory",        key: "headerStory",        html: true  },
    { id: "headerCTA",          key: "headerCTA",          html: false },
    { id: "footerCopyright",    key: "footerCopyright",    html: false },
    { id: "footerEmailLabel",   key: "footerEmailLabel",   html: false },
    { id: "footerEmail",        key: "footerEmail",        html: false, attr: "href" },
    { id: "footerLinkedInLabel",key: "footerLinkedInLabel",html: false },
    { id: "footerLinkedIn",     key: "footerLinkedIn",     html: false, attr: "href" },
  ];

  staticFields.forEach(({ id, key, html, attr }) => {
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

  // Render dynamic features
  if (t.features && Array.isArray(t.features)) {
    renderFeatures(t.features, t.CTA || "Pre-Register");
  }
}


function renderFeatures(features, cta) {
  const container = document.getElementById("featuresContainer");
  container.innerHTML = "";

  features.forEach((feature, index) => {
    const reverse = index % 2 !== 0;  // Toggle between left and right
    const hasCTA = index % 2 === 1;
    const icon = feature.icon || "🛡️"; // fallback icon

    const section = document.createElement("div");
    
    // Add classes for sliding from left or right, and positioning left or right
    section.className = `flex flex-col md:flex-row ${reverse ? 'animate-slide-right section-right md:flex-row-reverse' : 'animate-slide-left section-left md:flex-row'} items-center bg-white rounded-xl shadow-lg p-8 mb-8 transition-transform duration-500 transform animate-fade-in hover:-translate-y-2 hover:shadow-2xl section`;

    const textDiv = document.createElement("div");
    textDiv.className = "md:w-1/2 space-y-4 mb-3 " + (reverse ? "text-center" : "");

    const titleEl = document.createElement("h2");
    titleEl.className = "text-2xl font-bold";
    titleEl.innerText = feature.title;

    const textEl = document.createElement("p");
    textEl.className = "text-gray-700";
    textEl.innerHTML = feature.text;

    textDiv.appendChild(titleEl);
    textDiv.appendChild(textEl);

    if (hasCTA) {
      const btn = document.createElement("a");
      btn.href = "https://forms.gle/s3XTNU2fCi29mLNx5";
      btn.target = "_blank";
      btn.className = "inline-block px-6 py-3 bg-brandBlue text-white rounded-lg shadow transition-transform duration-300 transform hover:scale-105 hover:shadow-lg";
      btn.innerText = cta;
      textDiv.appendChild(btn);
    }

    const iconDiv = document.createElement("div");
    iconDiv.className = "md:w-1/2 flex justify-center items-center text-6xl";
    iconDiv.innerHTML = icon;

    section.appendChild(textDiv);
    section.appendChild(iconDiv);

    container.appendChild(section);
  });
}


// Intersection Observer to trigger animations when sections are in view
function observeElement(element) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.getAttribute("data-animated") === "false") {
        // Add class to trigger animation only if not already animated
        entry.target.classList.add("in-view");
        entry.target.setAttribute("data-visible", "true");
        entry.target.setAttribute("data-animated", "true"); // Mark as animated

        // Apply animation styles after the observer triggers
        entry.target.style.opacity = '1';
        const isReversed = entry.target.getAttribute("data-reverse") === "true";
        // Slide based on direction
        if (isReversed) {
          entry.target.style.transform = 'translateX(0)';  // Slide in from right
        } else {
          entry.target.style.transform = 'translateX(0)';  // Slide in from left
        }
      }
    });
  }, { threshold: 0.3 }); // Trigger when 30% of the element is visible

  observer.observe(element);
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

document.addEventListener("DOMContentLoaded", () => {
  //switchLanguage("en");
});

window.applyTranslations = applyTranslations;
