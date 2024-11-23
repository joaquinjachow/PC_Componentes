window.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchModalElement = document.getElementById('searchModal');
    const searchModal = new bootstrap.Modal(searchModalElement);
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    let productos = [];

    const loadProductos = async () => {
        try {
            const response = await fetch('../products.json');
            if (!response.ok) throw new Error('Error al cargar productos.');
            productos = await response.json();
        } catch (error) {
            console.error(error);
            searchResults.innerHTML = '<p class="text-center text-danger">Error al cargar los productos.</p>';
        }
    };

    searchIcon.addEventListener('click', () => {
        searchModal.show();
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredProducts = productos.filter(producto =>
            producto.title.toLowerCase().includes(query) ||
            producto.description.toLowerCase().includes(query)
        );
        displaySearchResults(filteredProducts);
    });

    const displaySearchResults = (products) => {
        searchResults.innerHTML = products.length
            ? products.map(producto => `
                <div>
                  <div class="card shadow-sm">
                    <img src="${producto.image}" class="card-img-top img" alt="${producto.nombre}">
                    <div class="card-body text-center">
                      <h5 class="card-title">${producto.title}</h5>
                      <p class="card-text description">${producto.description}</p>
                      <p class="card-text price">Precio: $${producto.price}</p>
                      <div class="quantity-control d-flex justify-content-center">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${producto.id}, -1)">-</button>
                        <input type="number" id="cantidad-${producto.id}" class="form-control text-center mx-2" value="1" min="1" style="width: 50px;">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${producto.id}, 1)">+</button>
                      </div>
                      <button class="btn btn-primary w-100 mt-2" onclick="agregarProductoAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                  </div>
                </div>
            `).join('')
            : '<p class="text-center text-muted">No se encontraron productos.</p>';
    };

    window.actualizarCantidad = (id, cambio) => {
        const inputCantidad = document.getElementById(`cantidad-${id}`);
        let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
        inputCantidad.value = nuevaCantidad > 0 ? nuevaCantidad : 1;
    };

    window.agregarProductoAlCarrito = (id) => {
        const producto = productos.find(producto => producto.id === id);
        const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
        if (producto) {
            agregarAlCarrito({
                id: producto.id,
                nombre: producto.title,
                precio: producto.price,
                image: producto.image,
                cantidad: cantidad
            });
            try {
                searchModal.hide();
            } catch (err) {
                console.error('Error cerrando el modal:', err);
                searchModalElement.classList.remove('show');
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
            }
            searchInput.value = '';
            searchResults.innerHTML = '';
        } else {
            console.error('Producto no encontrado:', id);
        }
    };

    loadProductos();
});
