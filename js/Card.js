const productosContainer = document.getElementById('productos-container');

function cargarProductosPorCategoria(data, categoria) {
  const productosFiltrados = data.filter(producto => producto.category === categoria);
  if (productosFiltrados.length === 0) {
    console.error(`No se encontraron productos en la categoría "${categoria}"`);
    return;
  }

  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad;
    } else {
      carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  }

  const cardsHTML = productosFiltrados.map(producto => `
    <div class="col-md-3">
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
  `).join('');

  productosContainer.innerHTML = cardsHTML;
  window.actualizarCantidad = function (id, cambio) {
    const inputCantidad = document.getElementById(`cantidad-${id}`);
    let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
    inputCantidad.value = nuevaCantidad > 0 ? nuevaCantidad : 1;
  };
  window.agregarProductoAlCarrito = function (id) {
    const producto = productosFiltrados.find(producto => producto.id === id);
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (producto) {
      agregarAlCarrito({
        id: producto.id,
        nombre: producto.title,
        precio: producto.price,
        image: producto.image,
        cantidad: cantidad
      });
    } else {
      console.error('Producto no encontrado:', id);
    }
  };
}

fetch('../products.json')
  .then(response => response.json())
  .then(data => {
    const categoriaActual = document.body.getAttribute('data-categoria');
    if (categoriaActual) {
      cargarProductosPorCategoria(data, categoriaActual);
    }
  })
  .catch(error => console.error('Error al cargar los productos:', error));
