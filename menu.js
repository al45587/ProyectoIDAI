let carrito = [];

        function agregarAlCarrito(nombre, precio) {
            const productoExistente = carrito.find(p => p.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            actualizarCarrito();
        }

        function actualizarCarrito() {
            const lista = document.getElementById("lista-carrito");
            const totalSpan = document.getElementById("total");
            lista.innerHTML = "";

            let total = 0;
            carrito.forEach(p => {
                const subtotal = p.precio * p.cantidad;
                total += subtotal;
                lista.innerHTML += `
                    <div class="carrito-producto">
                        ${p.nombre} x ${p.cantidad} = $${subtotal}
                    </div>
                `;
            });

            totalSpan.textContent = total;
        }

        function vaciarCarrito() {
            carrito = [];
            actualizarCarrito();
        }