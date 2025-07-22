document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    const listaProductos = document.querySelector('#lista-1');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const carritoIcono = document.querySelector('#img-carrito'); // Asegúrate de tener un ID para tu imagen del carrito

    // Eventos
    listaProductos.addEventListener('click', agregarProducto);
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    function agregarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement;
            // Llama a la función de animación antes de leer los datos del producto
            animarProductoAlCarrito(e.target);
            leerDatosProducto(producto);
        }
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.previousElementSibling?.getAttribute('src') || '',
            nombre: producto.querySelector('h3')?.textContent || '',
            precio: parseFloat(producto.querySelector('.precio')?.textContent.replace('$', '') || 0),
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        };

        const existe = carrito.find(item => item.id === infoProducto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(infoProducto);
        }

        actualizarCarrito();
        resaltarCarrito(); // Efecto visual
        mostrarCarrito(); // Scroll al carrito
    }

    function actualizarCarrito() {
        contenedorCarrito.innerHTML = '';

        carrito.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
            `;
            contenedorCarrito.appendChild(row);
        });

        // Eliminar un producto desde el carrito
        contenedorCarrito.querySelectorAll('.borrar').forEach(boton => {
            boton.addEventListener('click', e => {
                const id = e.target.getAttribute('data-id');
                const index = carrito.findIndex(p => p.id === id);
                if (index > -1) {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                }
            });
        });
    }

    function resaltarCarrito() {
        const carritoDiv = document.querySelector('#carrito');
        carritoDiv.style.boxShadow = '0 0 15px 5px #ffae00';
        carritoDiv.style.transition = 'box-shadow 0.5s ease-in-out';

        setTimeout(() => {
            carritoDiv.style.boxShadow = 'none';
        }, 600);
    }

    function mostrarCarrito() {
        document.querySelector('#carrito').scrollIntoView({ behavior: 'smooth' });
    }

    // --- Nueva función para la animación de vuelo ---
    function animarProductoAlCarrito(botonAgregar) {
        const productoCard = botonAgregar.closest('.card'); // Asume que cada producto está dentro de una clase 'card'
        if (!productoCard) return;

        const productImage = productoCard.querySelector('img');
        if (!productImage) return;

        const startRect = productImage.getBoundingClientRect();
        const endRect = carritoIcono.getBoundingClientRect();

        // Crea una copia de la imagen para animar
        const flyingImage = productImage.cloneNode();
        flyingImage.classList.add('flying-product-animation'); // Clase para el CSS de la animación
        flyingImage.style.position = 'fixed';
        flyingImage.style.zIndex = '9999';
        flyingImage.style.top = `${startRect.top}px`;
        flyingImage.style.left = `${startRect.left}px`;
        flyingImage.style.width = `${startRect.width}px`;
        flyingImage.style.height = `${startRect.height}px`;
        document.body.appendChild(flyingImage);

        // Fuerza el reflow para asegurar que las propiedades iniciales se apliquen
        flyingImage.getBoundingClientRect();

        // Aplica las propiedades finales para la animación
        flyingImage.style.transition = 'all 0.8s ease-in-out';
        flyingImage.style.top = `${endRect.top + endRect.height / 2 - startRect.height / 2}px`;
        flyingImage.style.left = `${endRect.left + endRect.width / 2 - startRect.width / 2}px`;
        flyingImage.style.width = '30px'; // Tamaño final más pequeño
        flyingImage.style.height = '30px';
        flyingImage.style.opacity = '0'; // Se desvanece al llegar

        // Elimina la imagen voladora después de la animación
        flyingImage.addEventListener('transitionend', () => {
            flyingImage.remove();
        });
    }
    // --- Fin de la nueva función ---
<<<<<<< HEAD
});



=======
});
>>>>>>> b833b0af6990c460ae6df1361961b82818f6bdd6
