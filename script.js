document.addEventListener('DOMContentLoaded', () => {

    // === CRITERIO: MANIPULACIÓN DEL DOM (NAVBAR & MENU HAMBURGUESA) ===
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto de Scroll en Navbar (Cambia de transparente a sólido)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Abrir y cerrar menú móvil hamburguesa
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú automáticamente tras pulsar un enlace de sección
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // === CRITERIO: VALIDACIÓN DE FORMULARIO ===
    const form = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const successMessage = document.getElementById('success-message');

    // Expresión Regular estándar para validar Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Inyectar visualmente los errores
    const showError = (input, messageId, messageText) => {
        const formGroup = input.parentElement;
        const errorSpan = document.getElementById(messageId);
        
        formGroup.classList.add('invalid');
        errorSpan.textContent = messageText;
    };

    // Limpiar clases de error
    const clearError = (input) => {
        const formGroup = input.parentElement;
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
        }
    };

    // Limpieza de errores en tiempo real cuando el usuario escribe correcciones
    nombreInput.addEventListener('input', () => {
        if (nombreInput.value.trim() !== '') clearError(nombreInput);
    });

    emailInput.addEventListener('input', () => {
        if (emailRegex.test(emailInput.value.trim())) clearError(emailInput);
    });

    mensajeInput.addEventListener('input', () => {
        if (mensajeInput.value.trim() !== '') clearError(mensajeInput);
    });

    // Control del evento Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Detener envío por defecto
        
        let isFormValid = true;

        // Validar Campo Nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, 'error-nombre', 'Por favor, ingresa tu nombre completo.');
            isFormValid = false;
        } else {
            clearError(nombreInput);
        }

        // Validar Campo Correo con Regex
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'error-email', 'El correo electrónico es obligatorio.');
            isFormValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'error-email', 'Por favor, introduce un correo con formato válido.');
            isFormValid = false;
        } else {
            clearError(emailInput);
        }

        // Validar Campo Mensaje / Pedido
        if (mensajeInput.value.trim() === '') {
            showError(mensajeInput, 'error-mensaje', 'Cuéntanos qué deseas ordenar o tu consulta.');
            isFormValid = false;
        } else {
            clearError(mensajeInput);
        }

        // Si todos los campos son válidos
        if (isFormValid) {
            successMessage.style.display = 'block'; // Mensaje personalizado de éxito
            form.reset(); // Limpiar inputs

            // Ocultar mensaje automáticamente tras 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});