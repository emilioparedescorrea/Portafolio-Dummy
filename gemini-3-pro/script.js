document.addEventListener("DOMContentLoaded", () => {
    // 1. Efecto Fade-in al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // El elemento aparecerá cuando el 15% sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' para activar la animación de CSS
                entry.target.classList.add("visible");
                // Deja de observar el elemento una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selecciona todas las secciones que tengan la clase 'section-fade'
    const fadeElements = document.querySelectorAll(".section-fade");
    fadeElements.forEach(el => observer.observe(el));

    // 2. Comportamiento dinámico del Navbar (Opcional)
    // Añade una sombra al navbar cuando se hace scroll hacia abajo
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });
});