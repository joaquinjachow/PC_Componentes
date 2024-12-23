const navLinks = [
    { title: "Inicio", href: "Home.html" },
    { title: "Componentes", href: "Componentes.html" },
    { title: "Monitores", href: "Monitores.html" },
    { title: "Notebooks", href: "Notebook.html" },
    { title: "Periféricos", href: "Perifericos.html" },
    { title: "Favoritos", href: "favoritos.html" },
    { title: "Buscar", href: "#", isIconOnly: true, class: "search-icon" },
    { title: "Carrito", href: "carrito.html", isIconOnly: true },
    { title: "Logout", href: "../index.html", action: "logout", class: "logout-button" }
];

const searchSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.242 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
</svg>
`;

const carritoSVG = `
<svg id='Shopping_Cart_24' width='28' height='28' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
    <rect width='32' height='32' stroke='none' fill='#FFFFFF' opacity='0'/>
    <g transform="matrix(0.42 0 0 0.42 12 12)">
        <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" 
            transform="translate(-24, -26)" d="M 1.8125 2 C 1.78125 2.007813 1.75 2.019531 1.71875 2.03125 C 0.746094 2.167969 0 2.992188 0 4 C 0 5.105469 0.894531 6 2 6 C 3.105469 6 4 5.105469 4 4 L 8.65625 4 C 9.902344 4 10.550781 4.257813 11.03125 4.6875 C 11.503906 5.113281 11.886719 5.832031 12.21875 6.9375 L 20.21875 39.21875 C 20.519531 40.363281 20.820313 41.542969 21.65625 42.5 C 22.003906 42.898438 22.441406 43.222656 22.96875 43.46875 C 22.382813 44.164063 22 45.027344 22 46 C 22 48.199219 23.800781 50 26 50 C 28.199219 50 30 48.199219 30 46 C 30 45.265625 29.785156 44.59375 29.4375 44 L 35.5625 44 C 35.214844 44.59375 35 45.265625 35 46 C 35 48.199219 36.800781 50 39 50 C 41.199219 50 43 48.199219 43 46 C 43 44.972656 42.582031 44.054688 41.9375 43.34375 C 42.050781 43.039063 42.003906 42.695313 41.820313 42.429688 C 41.632813 42.160156 41.328125 42 41 42 L 25.71875 42 C 24.175781 42 23.546875 41.671875 23.125 41.1875 C 22.707031 40.707031 22.453125 39.867188 22.15625 38.75 L 22.15625 38.71875 L 21.46875 36 L 39.8125 36 C 40.230469 36 40.609375 35.738281 40.75 35.34375 L 47.9375 16.34375 C 48.054688 16.039063 48.011719 15.695313 47.824219 15.425781 C 47.636719 15.15625 47.328125 14.996094 47 15 L 16.28125 15 L 14.15625 6.46875 C 14.15625 6.449219 14.15625 6.425781 14.15625 6.40625 C 13.773438 5.117188 13.277344 4 12.375 3.1875 C 11.472656 2.375 10.203125 2 8.65625 2 L 2 2 C 1.96875 2 1.9375 2 1.90625 2 C 1.875 2 1.84375 2 1.8125 2 Z M 16.78125 17 L 45.5625 17 L 39.125 34 L 21 34 Z M 26 44 C 27.117188 44 28 44.882813 28 46 C 28 47.117188 27.117188 48 26 48 C 24.882813 48 24 47.117188 24 46 C 24 44.882813 24.882813 44 26 44 Z M 39 44 C 40.117188 44 41 44.882813 41 46 C 41 47.117188 40.117188 48 39 48 C 37.882813 48 37 47.117188 37 46 C 37 44.882813 37.882813 44 39 44 Z" 
            stroke-linecap="round"/>
    </g>
</svg>
`;

const generateNavbar = () => {
    return `
        <nav class="navbar navbar-expand-lg bg-dark">
            <a class="navbar-brand" href="Home.html">
                <img src="../images/logo-pccomponentes.webp" class="logo" alt="logo-pccomponentes" title="logo-pccomponentes">
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 container d-flex justify-content-around align-items-center">
                    ${navLinks.map(link => `
                        <li class="nav-item">
                            <a class="nav-link ${link.class ? link.class : ''}" href="${link.href}" 
                               ${link.action ? `data-action="${link.action}"` : ''}>
                               ${link.isIconOnly ? (link.class === 'search-icon' ? searchSVG : carritoSVG) : link.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </nav>
    `;
};

window.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML("afterbegin", generateNavbar());

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    const logoutBtn = document.querySelector('a[data-action="logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Cerraste sesión correctamente");
            window.location.href = "../index.html";
        });
    }
});