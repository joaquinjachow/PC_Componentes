const generateModal = () => {
    return `
            <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="searchModalLabel">Buscar Productos</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="searchInput" class="form-control" placeholder="Buscar productos...">
                            <div id="searchResults" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML('beforeend', generateModal());
});