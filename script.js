let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = carrito.length;
    }
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    actualizarContadorCarrito();
    alert(`"${nombre}" ha sido añadido al carrito.`);
}

function mostrarCarrito() {
    const carritoPanel = document.getElementById('carrito-panel');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');

    carritoItems.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('carrito-item');
        itemElement.innerHTML = `
            <div>
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)}</span>
            </div>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoItems.appendChild(itemElement);
        total += item.precio;
    });

    carritoTotal.textContent = `$${total.toFixed(2)}`;
    carritoPanel.classList.add('visible');
}

function cerrarCarrito() {
    const carritoPanel = document.getElementById('carrito-panel');
    carritoPanel.classList.remove('visible');
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito(); // Refresh the cart display
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito(); // Refresh the cart display
}

function generarRecibo() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No se puede generar un recibo.');
        return;
    }

    const direccionEnvio = document.getElementById('direccion-envio').value;
    if (!direccionEnvio) {
        alert('Por favor, ingresa tu dirección de envío.');
        return;
    }

    let mensaje = `¡Hola! Aquí está el detalle de mi pedido:\n\n`;
    let total = 0;

    carrito.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}\n`;
    mensaje += `Dirección de envío: ${direccionEnvio}\n`;

    const numeroWhatsApp = '584125666428'; // Replace with the actual WhatsApp number
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, '_blank');
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    scrollToTopBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.promo, .destacados, .comentarios, #faq').forEach(section => {
        observer.observe(section);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-item h3').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            item.classList.toggle('active');
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});
