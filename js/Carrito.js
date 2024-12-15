const carritoContainer = document.getElementById('carrito-container');
const totalContainer = document.getElementById('total');
const finalizarCarritoBtn = document.getElementById('finalizar-carrito');

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  mostrarCarrito(carrito);
}

function mostrarCarrito(carrito) {
  carritoContainer.innerHTML = '';
  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    totalContainer.textContent = 'Total: $0.00';
    return;
  }

  let total = 0;
  carrito.forEach(producto => {
    const { id, nombre, precio, cantidad, image } = producto;
    total += precio * cantidad;

    const productoHTML = `
      <div class="row mb-3 align-items-center">
        <div class="col-md-2">
          <img src="${image}" alt="${nombre}" class="card-img-top img" style="max-height: 100px; width: auto; max-width: 100px;" />
        </div>
        <div class="col-md-6">
          <h5>${nombre}</h5>
          <p>Precio: $${precio} x ${cantidad} = $${precio * cantidad}</p>
        </div>
        <div class="col-md-4 text-end">
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${id})">Eliminar</button>
        </div>
      </div>
      <hr>
    `;
    carritoContainer.innerHTML += productoHTML;
  });

  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
  finalizarCarritoBtn.style.display = carrito.length > 0 ? 'block' : 'none';
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function generarMensajeWhatsApp() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let mensaje = "Hola, me gustaría comprar los siguientes productos:\n\n";
  carrito.forEach(producto => {
    const { nombre, precio, cantidad } = producto;
    mensaje += `${nombre} - Precio: $${precio} x ${cantidad} = $${precio * cantidad}\n`;
  });
  const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
  mensaje += `\nTotal: $${total.toFixed(2)}`;
  const telefono = '3515129921';
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', cargarCarrito);
finalizarCarritoBtn.addEventListener('click', generarMensajeWhatsApp);

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  localStorage.removeItem('carrito');
  alert("El carrito ha sido vaciado.");
  document.getElementById('carrito-container').innerHTML = '';
  document.getElementById('total').innerText = 'Total: $0';
});