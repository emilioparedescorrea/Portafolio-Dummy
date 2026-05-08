# Portafolio — Guía de personalización

## Estructura de archivos
      
```
portfolio/
├── index.html          ← Contenido y estructura
├── styles.css          ← Estilos y colores
├── script.js           ← Animaciones e interactividad
├── assets/             ← Imágenes (crea esta carpeta)
│   ├── foto-perfil.jpg       ← Tu foto para el hero
│   ├── sobre-mi.jpg          ← Foto para la sección "Sobre mí"
│   ├── proyecto-1.jpg        ← Imágenes de proyectos
│   ├── proyecto-2.jpg
│   └── ...
└── README.md
```

## Cómo personalizar

### 1. Textos
Busca los comentarios `✏️ CAMBIAR:` en `index.html`. Están en:
- Nombre y especialidad (hero)
- Frase personal
- Bio y datos rápidos
- Nombres y descripciones de proyectos
- Links a proyectos (Behance, PDF, etc.)
- Habilidades y porcentajes
- Email y redes sociales

### 2. Imágenes
Para agregar una imagen al hero, reemplaza este bloque en `index.html`:

```html
<!-- ANTES: -->
<div class="hero__photo hero__photo--placeholder" aria-hidden="true">
  <span>Tu foto aquí</span>
</div>

<!-- DESPUÉS: -->
<img src="assets/foto-perfil.jpg" alt="Tu nombre" class="hero__photo" />
```

Para las tarjetas de proyectos, reemplaza:
```html
<!-- ANTES: -->
<div class="card__img card__img--placeholder">
  <span>Imagen proyecto 1</span>
</div>

<!-- DESPUÉS: -->
<img src="assets/proyecto-1.jpg" alt="Nombre del proyecto" class="card__img" />
```

### 3. Colores
En `styles.css`, edita las variables en `:root` (línea ~17):
```css
--clr-accent: #C4603A;   /* ← cambia esto por tu color de acento */
```

### 4. Fuentes
Las fuentes se cargan desde Google Fonts en `index.html`. Para cambiarlas,
reemplaza el link de Google Fonts y las variables `--font-display` y `--font-body`.

### 5. Proyectos
Para añadir o quitar tarjetas, copia/elimina el bloque `<article class="card">` 
en la sección `#proyectos` de `index.html`.

---
Diseñado con HTML, CSS y JavaScript puro. Sin dependencias externas.
