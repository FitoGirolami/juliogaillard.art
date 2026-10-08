// Navegación ligera para el sitio público de Julio Gaillard.
// La página es HTML accesible sin JavaScript; este archivo mejora solamente la navegación.
document.addEventListener('DOMContentLoaded', function () {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const links = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));
  const sections = links.map(a => document.getElementById(a.hash.slice(1))).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!current) return;
    links.forEach(a => {
      const active = a.hash === '#' + current.target.id;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }, {rootMargin: '-22% 0px -58% 0px', threshold: [0, .1, .35]});
  sections.forEach(section=>observer.observe(section));
});
