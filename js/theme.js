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



