const FAVORITOS_KEY = 'favoritos';

function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];
}

function cargarFavoritos() {
    const favoritosContainer = document.getElementById('favoritos-container');
    const favoritos = obtenerFavoritos();

    if (favoritos.length === 0) {
        favoritosContainer.innerHTML = `<p class="text-center">No tienes productos en favoritos.</p>`;
        return;
    }

    const cardsHTML = favoritos.map(producto => `
        <div class="col-md-3">
            <div class="card shadow-sm">
                <img src="${producto.image}" class="card-img-top img" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text price">Precio: $${producto.price}</p>
                    <button class="btn btn-danger w-100 mt-2" onclick="eliminarDeFavoritos(${producto.id})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');

    favoritosContainer.innerHTML = cardsHTML;
}

function eliminarDeFavoritos(id) {
    let favoritos = obtenerFavoritos();
    favoritos = favoritos.filter(item => item.id !== id);
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    cargarFavoritos();
}

document.addEventListener('DOMContentLoaded', cargarFavoritos);

document.getElementById('vaciar-favoritos').addEventListener('click', () => {
    localStorage.removeItem(FAVORITOS_KEY);
    alert("Todos los favoritos han sido eliminados.");
    document.getElementById('favoritos-container').innerHTML = '';
});