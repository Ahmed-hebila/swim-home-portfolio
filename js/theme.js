/* ═══════════════════════════════════════════════════
   SWIM HOME — Theme + Language Switcher
   ═══════════════════════════════════════════════════ */

/* ─── Theme ─── */
let currentTheme = localStorage.getItem('sh-theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sh-theme', theme);
  currentTheme = theme;
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '🌙';
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

/* ─── Language + DOM Render ─── */
function applyLanguage(lang) {
  setLang(lang);
  const data  = TRANSLATIONS[lang];
  const html  = document.documentElement;
  html.setAttribute('lang', data.lang);
  html.setAttribute('dir',  data.dir);

  /* Navbar */
  document.getElementById('nav-logo').textContent    = data.nav.logo;
  document.getElementById('nav-about').textContent   = data.nav.about;
  document.getElementById('nav-services').textContent= data.nav.services;
  document.getElementById('nav-timeline').textContent= data.nav.timeline;
  document.getElementById('nav-strengths').textContent= data.nav.strengths;
  document.getElementById('nav-vision').textContent  = data.nav.vision;
  document.getElementById('lang-btn').textContent    = data.nav.langSwitch;

  /* Hero */
  document.getElementById('hero-badge').textContent  = data.hero.badge;
  document.getElementById('hero-t1').textContent     = data.hero.title1;
  document.getElementById('hero-t2').textContent     = data.hero.title2;
  document.getElementById('hero-t3').textContent     = data.hero.title3;
  document.getElementById('hero-sub').textContent    = data.hero.sub;
  document.getElementById('hero-cta-text').textContent = data.hero.cta;

  /* About */
  document.getElementById('about-label').textContent = data.about.label;
  document.getElementById('about-t1').textContent    = data.about.title1;
  document.getElementById('about-t2').textContent    = data.about.title2;
  document.getElementById('about-p1').textContent    = data.about.p1;
  document.getElementById('about-p2').textContent    = data.about.p2;
  data.about.pillars.forEach((p, i) => {
    const el = document.getElementById(`pillar-${i}`);
    if (el) el.querySelector('h4').textContent = p.label;
  });

  /* Services */
  document.getElementById('services-label').textContent = data.services.label;
  document.getElementById('services-t1').textContent    = data.services.title1;
  document.getElementById('services-t2').textContent    = data.services.title2;
  data.services.items.forEach((s, i) => {
    const el = document.getElementById(`service-${i}`);
    if (!el) return;
    el.querySelector('h3').textContent               = s.title;
    el.querySelector('p').textContent                = s.desc;
    el.querySelector('.service-tag').textContent     = s.tag;
  });

  /* Timeline */
  document.getElementById('timeline-label').textContent = data.timeline.label;
  document.getElementById('timeline-t1').textContent    = data.timeline.title1;
  document.getElementById('timeline-t2').textContent    = data.timeline.title2;
  data.timeline.items.forEach((item, i) => {
    const el = document.getElementById(`tl-${i}`);
    if (!el) return;
    el.querySelector('.timeline-year').textContent   = item.year;
    el.querySelector('.timeline-badge').textContent  = item.badge;
    el.querySelector('.timeline-title').textContent  = item.title;
    el.querySelector('.timeline-location').innerHTML = `📍 ${item.location}`;
    const descEl = document.getElementById(`tl-${i}-desc`);
    if (descEl) descEl.textContent = item.desc;
  });

  /* Strengths */
  document.getElementById('strengths-label').textContent = data.strengths.label;
  document.getElementById('strengths-t1').textContent    = data.strengths.title1;
  document.getElementById('strengths-t2').textContent    = data.strengths.title2;
  data.strengths.items.forEach((s, i) => {
    const el = document.getElementById(`str-${i}`);
    if (!el) return;
    el.querySelector('h3').textContent = s.title;
    el.querySelector('p').textContent  = s.desc;
  });
  data.strengths.stats.forEach((s, i) => {
    const el = document.getElementById(`stat-${i}`);
    if (!el) return;
    el.querySelector('.stat-label').textContent = s.label;
    /* Only reset num text if counter hasn't already animated it */
    const numEl = el.querySelector('.stat-num');
    if (numEl && numEl.dataset.animated !== 'true') numEl.textContent = s.num;
  });

  /* Vision */
  document.getElementById('vision-label').textContent      = data.vision.label;
  document.getElementById('vision-t1').textContent         = data.vision.title1;
  document.getElementById('vision-t2').textContent         = data.vision.title2;
  document.getElementById('vision-tag').textContent        = data.vision.visionTag;
  document.getElementById('vision-title').textContent      = data.vision.visionTitle;
  document.getElementById('vision-text').textContent       = data.vision.visionText;
  document.getElementById('mission-tag').textContent       = data.vision.missionTag;
  document.getElementById('mission-title').textContent     = data.vision.missionTitle;
  document.getElementById('mission-text').textContent      = data.vision.missionText;

  /* Footer */
  document.getElementById('footer-tagline').textContent    = data.footer.tagline;
  document.getElementById('footer-patronage').textContent  = data.footer.patronage;
  document.getElementById('footer-nav-title').textContent  = data.footer.navTitle;
  document.getElementById('footer-contact-title').textContent = data.footer.contactTitle;
  document.getElementById('footer-address').textContent    = data.footer.address;
  document.getElementById('footer-phone').textContent      = data.footer.phone;
  document.getElementById('footer-email').textContent      = data.footer.email;
  document.getElementById('footer-hours').textContent      = data.footer.hours;
  document.getElementById('footer-copy').innerHTML         = data.footer.copy;
  document.getElementById('footer-love').textContent       = data.footer.love;
  document.getElementById('footer-nav-about').textContent  = data.nav.about;
  document.getElementById('footer-nav-services').textContent = data.nav.services;
  document.getElementById('footer-nav-timeline').textContent = data.nav.timeline;
  document.getElementById('footer-nav-strengths').textContent = data.nav.strengths;
  document.getElementById('footer-nav-vision').textContent = data.nav.vision;
}

function toggleLanguage() {
  const next = getLang() === 'en' ? 'ar' : 'en';
  applyLanguage(next);
  /* Refresh GSAP ScrollTrigger after layout change */
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}
