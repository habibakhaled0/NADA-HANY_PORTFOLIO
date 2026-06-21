/* ===== Agriculture Portfolio — Interactions ===== */

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 600);
});

// Nav scroll + progress + back-to-top
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');
const backTop = document.getElementById('backTop');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  backTop.classList.toggle('visible', y > 400);
  const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = max > 0 ? (y / max) * 100 + '%' : '0%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Back to top
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuIcon.className = navLinks.classList.contains('open') ? 'icon-x' : 'icon-menu';
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuIcon.className = 'icon-menu';
  })
);

// Dark mode toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'icon-sun' : 'icon-moon';
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
}
setTheme(localStorage.getItem('theme') === 'dark');
themeToggle.addEventListener('click', () =>
  setTheme(!document.documentElement.classList.contains('dark'))
);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealIO.observe(el));

// Animated counters
document.querySelectorAll('.stat-num').forEach(el => {
  const target = +el.dataset.count;
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    io.disconnect();
    const duration = 1600;
    const t0 = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + '+';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  io.observe(el);
});

// Skill bars
document.querySelectorAll('.bar').forEach(bar => {
  const fill = bar.querySelector('.bar-fill');
  const value = bar.dataset.value;
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      fill.style.width = value + '%';
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(bar);
});

