// Este es mi primer proyecto grande de JavaScript
// Hecho por un estudiante de 18 años
// Todavia estoy aprendiendo, asi que puede haber errores

// Selección de elementos DOM
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const btnUp = document.getElementById('btn-up');
const contactForm = document.getElementById('contact-form');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.card-project');

// Cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar barras de progreso
  initSkillBars();
  
  // Inicializar interactividad de proyectos
  initProjectCards();
  
  // Inicializar validación de formulario
  initFormValidation();
  
  // Inicializar scroll suave para enlaces internos
  initSmoothScroll();
  
  // Inicializar efectos de scroll
  initScrollEffects();
});

// Menú hamburguesa
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace o fuera del menú
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Cerrar menú al hacer clic fuera del menú
document.addEventListener('click', (event) => {
  const isClickInsideNav = navLinks.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);
  
  if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Cerrar menú al presionar la tecla Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Cambio de tema (Modo oscuro/claro)
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  
  if (body.classList.contains('dark')) {
    toggleButton.textContent = '☀️ Modo Claro';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleButton.textContent = '🌙 Modo Oscuro';
    localStorage.setItem('theme', 'light');
  }
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    toggleButton.textContent = '☀️ Modo Claro';
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    toggleButton.textContent = '🌙 Modo Oscuro';
  }
}

// Boton para subir al inicio de la pagina cuando haces scroll
// esto lo aprendi en un tutorial de youtube
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // si has bajado mas de 200px
    btnUp.style.display = 'flex';
    btnUp.style.justifyContent = 'center';
    btnUp.style.alignItems = 'center';
    setTimeout(() => { // esto es para que aparesca con animacion
      btnUp.style.opacity = '1';
      btnUp.style.transform = 'translateY(0)';
    }, 10);
  } else {
    btnUp.style.opacity = '0';
    btnUp.style.transform = 'translateY(20px)';
    setTimeout(() => {
      if (window.scrollY <= 200) {
        btnUp.style.display = 'none';
      }
    }, 300);
  }
});

btnUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicializar scroll suave para enlaces internos
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop - 80, // Ajuste para el header fijo
          behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        history.pushState(null, null, targetId);
        
        // Añadir enfoque al elemento para accesibilidad
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

// Inicializar efectos de scroll
function initScrollEffects() {
  const sections = document.querySelectorAll('section');
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Función para aplicar efectos al hacer scroll
  function applyScrollEffects() {
    // Efecto para secciones
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const isSectionVisible = sectionTop < window.innerHeight - 100 && sectionBottom > 0;
      
      if (isSectionVisible) {
        section.classList.add('active');
      }
    });
    
    // Efecto para elementos con fade-in
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = elementTop < window.innerHeight - 50;
      
      if (elementVisible) {
        element.classList.add('show');
      }
    });
  }
  
  // Aplicar efectos al cargar y al hacer scroll
  applyScrollEffects();
  window.addEventListener('scroll', applyScrollEffects);
}

// Mejorar accesibilidad del sitio
// Esta función se eliminó para simplificar el código

// Animación de barras de habilidades
function initSkillBars() {
  // Función para animar las barras de progreso cuando son visibles
  function animateSkillBars() {
    skillProgressBars.forEach(bar => {
      const progressValue = bar.getAttribute('data-progress');
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible && bar.style.width === '0px' || bar.style.width === '') {
        setTimeout(() => {
          bar.style.width = progressValue + '%';
          bar.textContent = progressValue + '%';
        }, 200);
      }
    });
  }
  
  // Inicializar barras a 0%
  skillProgressBars.forEach(bar => {
    bar.style.width = '0px';
  });
  
  // Animar al cargar la página y al hacer scroll
  animateSkillBars();
  window.addEventListener('scroll', animateSkillBars);
}

// Interactividad de tarjetas de proyectos
function initProjectCards() {
  projectCards.forEach(card => {
    // Efecto al pasar el mouse
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
    
    // Añadir efecto de enfoque para accesibilidad
    card.addEventListener('focus', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = 'var(--shadow-lg)';
    }, true);
    
    card.addEventListener('blur', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'var(--shadow-md)';
    }, true);
  });
}

// Validación de formulario
function initFormValidation() {
  if (!contactForm) return;
  
  const nombreInput = document.getElementById('inpt-nombreUsuario');
  const emailInput = document.getElementById('inpt-correoUsuario');
  const asuntoInput = document.getElementById('inpt-asunto');
  const mensajeInput = document.getElementById('inpt-descripcion');
  
  const nombreError = document.getElementById('nombre-error');
  const emailError = document.getElementById('email-error');
  const asuntoError = document.getElementById('asunto-error');
  const mensajeError = document.getElementById('mensaje-error');
  
  // Validación en tiempo real
  nombreInput.addEventListener('input', () => validateNombre(nombreInput, nombreError));
  emailInput.addEventListener('input', () => validateEmail(emailInput, emailError));
  asuntoInput.addEventListener('input', () => validateAsunto(asuntoInput, asuntoError));
  mensajeInput.addEventListener('input', () => validateMensaje(mensajeInput, mensajeError));
  
  // Validación al enviar
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validar todos los campos
    if (!validateNombre(nombreInput, nombreError)) isValid = false;
    if (!validateEmail(emailInput, emailError)) isValid = false;
    if (!validateAsunto(asuntoInput, asuntoError)) isValid = false;
    if (!validateMensaje(mensajeInput, mensajeError)) isValid = false;
    
    if (isValid) {
      // Simulación de envío exitoso
      alert('¡Formulario enviado correctamente!');
      contactForm.reset();
      
      // Limpiar clases de validación
      nombreInput.className = '';
      emailInput.className = '';
      asuntoInput.className = '';
      mensajeInput.className = '';
      
      // Limpiar mensajes de error
      nombreError.textContent = '';
      emailError.textContent = '';
      asuntoError.textContent = '';
      mensajeError.textContent = '';
    }
  });
}

// Funciones de validación
function validateNombre(input, errorElement) {
  if (input.value.trim() === '') {
    errorElement.textContent = 'El nombre es obligatorio';
    input.className = 'invalid';
    return false;
  } else if (input.value.trim().length < 3) {
    errorElement.textContent = 'El nombre debe tener al menos 3 caracteres';
    input.className = 'invalid';
    return false;
  } else {
    errorElement.textContent = '';
    input.className = 'valid';
    return true;
  }
}

function validateEmail(input, errorElement) {
  // Validación simple de email
  if (input.value.trim() === '') {
    errorElement.textContent = 'El email es obligatorio';
    input.className = 'invalid';
    return false;
  } else if (!input.value.includes('@')) {
    errorElement.textContent = 'Ingrese un email válido';
    input.className = 'invalid';
    return false;
  } else {
    errorElement.textContent = '';
    input.className = 'valid';
    return true;
  }
}

function validateAsunto(input, errorElement) {
  if (input.value.trim() === '') {
    errorElement.textContent = 'El asunto es obligatorio';
    input.className = 'invalid';
    return false;
  } else if (input.value.trim().length < 5) {
    errorElement.textContent = 'El asunto debe tener al menos 5 caracteres';
    input.className = 'invalid';
    return false;
  } else {
    errorElement.textContent = '';
    input.className = 'valid';
    return true;
  }
}

function validateMensaje(input, errorElement) {
  if (input.value.trim() === '') {
    errorElement.textContent = 'El mensaje es obligatorio';
    input.className = 'invalid';
    return false;
  } else if (input.value.trim().length < 10) {
    errorElement.textContent = 'El mensaje debe tener al menos 10 caracteres';
    input.className = 'invalid';
    return false;
  } else {
    errorElement.textContent = '';
    input.className = 'valid';
    return true;
  }
}
