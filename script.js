// ── Curseur personnalisé ──────────────────────────────────────────────────────
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('grow'));
  el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
});

// ── Navbar : scroll + lien actif ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);

  const ids = ['home', 'gallery', 'about', 'philosophy', 'contact'];
  let current = '';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 130) current = id;
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── Filtre galerie ────────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.masonry-item').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.opacity    = show ? '1' : '0.12';
      item.style.transform  = show ? 'scale(1)' : 'scale(0.97)';
      item.style.transition = 'opacity 0.4s, transform 0.4s';
    });
  });
});

// ── Lightbox ──────────────────────────────────────────────────────────────────
const lb = document.getElementById('lightbox');

document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('lbImg').src         = item.querySelector('img').src;
    document.getElementById('lbCaption').textContent = item.querySelector('.masonry-caption').textContent;
    lb.classList.add('open');
  });
});

document.getElementById('lbClose').addEventListener('click', () => lb.classList.remove('open'));
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Compteurs animés ──────────────────────────────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) {
      const target = parseInt(e.target.dataset.target);
      let count = 0;
      const step = Math.ceil(target / 28);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        e.target.textContent = count;
        if (count >= target) clearInterval(timer);
      }, 45);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
