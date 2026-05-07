/* ═══════════════════════════════════════════════════════════════
   PORTAFOLIO — script.js
   Funcionalidades: navbar, reveal on scroll, barras de habilidad,
                    menú móvil, cursor suave.
   ════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {


  /* ─────────────────────────────────────────────────────────────
     1. NAVBAR — se oscurece al hacer scroll
  ───────────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // ejecutar al cargar


  /* ─────────────────────────────────────────────────────────────
     2. MENÚ MÓVIL — hamburguesa
  ───────────────────────────────────────────────────────────── */
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    // bloquear scroll del body cuando el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar menú al hacer clic en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ─────────────────────────────────────────────────────────────
     3. REVEAL ON SCROLL — elementos con clase .reveal
  ───────────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Escalonado suave: cada elemento se retrasa un poco
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  // Añadir delays escalonados a elementos dentro de grillas
  document.querySelectorAll('.projects__grid .card').forEach((card, i) => {
    card.dataset.delay = i * 100;
  });
  document.querySelectorAll('.skills__list .skill-item').forEach((item, i) => {
    item.dataset.delay = i * 80;
  });
  document.querySelectorAll('.tools-grid li').forEach((li, i) => {
    li.dataset.delay = i * 50;
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────────────────────────────
     4. BARRAS DE HABILIDADES — animar al entrar en viewport
  ───────────────────────────────────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-item__fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pct = entry.target.dataset.pct;
          entry.target.style.width = pct + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach(fill => skillObserver.observe(fill));


  /* ─────────────────────────────────────────────────────────────
     5. SCROLL SUAVE — para navegadores que no soporten CSS scroll-behavior
  ───────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────────────────────────
     6. CURSOR PERSONALIZADO (opcional — desactívalo si no lo quieres)
        ✏️ CAMBIAR: elimina este bloque si prefieres el cursor por defecto
  ───────────────────────────────────────────────────────────── */
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<div class="cursor__dot"></div>';
  document.body.appendChild(cursor);

  // Añadir estilos del cursor dinámicamente
  const cursorStyles = document.createElement('style');
  cursorStyles.textContent = `
    @media (pointer: fine) {
      * { cursor: none !important; }

      .cursor {
        position: fixed;
        top: 0; left: 0;
        width: 36px; height: 36px;
        border: 1px solid rgba(196,96,58,0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.15s ease, width 0.3s ease,
                    height 0.3s ease, border-color 0.3s ease,
                    opacity 0.3s ease;
        mix-blend-mode: multiply;
      }
      .cursor__dot {
        position: absolute;
        top: 50%; left: 50%;
        width: 4px; height: 4px;
        background: var(--clr-accent, #C4603A);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
      }
      .cursor.hover {
        width: 56px; height: 56px;
        border-color: rgba(196,96,58,0.3);
      }
      .cursor.click {
        width: 24px; height: 24px;
        border-color: rgba(196,96,58,0.8);
      }
    }
  `;
  document.head.appendChild(cursorStyles);

  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
  });

  // Hover en elementos interactivos
  document.querySelectorAll('a, button, .card, .tools-grid li').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('click'));


  /* ─────────────────────────────────────────────────────────────
     7. PARALLAX SUAVE en el texto decorativo del hero
  ───────────────────────────────────────────────────────────── */
  const heroDeco = document.querySelector('.hero__deco');
  if (heroDeco) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroDeco.style.transform = `translateY(${scrollY * 0.2}px)`;
    }, { passive: true });
  }


  /* ─────────────────────────────────────────────────────────────
     8. ACTIVE NAV LINK según sección visible
  ───────────────────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const activeLink = document.querySelector(
            `.nav__links a[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => activeSectionObserver.observe(sec));

  // Estilos para link activo
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav__links a.active { color: var(--clr-ink) !important; }
    .nav__links a.active::after { transform: scaleX(1) !important; }
  `;
  document.head.appendChild(activeStyle);

}); // end DOMContentLoaded
