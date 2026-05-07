// ==============================
// PORTAFOLIO DISEÑO - JAVASCRIPT
// ==============================

// Año automático en el footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Menú mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cierra el menú al hacer click en un link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Animación de aparición al hacer scroll
// CAMBIAR: si no quieres animaciones, puedes eliminar este bloque y las clases reveal del CSS.
const animatedElements = document.querySelectorAll(
  ".section-heading, .about-grid p, .project-card, .skills-list span, .contact-card"
);

animatedElements.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((element) => observer.observe(element));
