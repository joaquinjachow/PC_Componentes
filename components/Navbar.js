const navLinks = [
    { href: "index.html", text: "Inicio" },
    { href: "pages/Componentes.html", text: "Componentes" },
    { href: "pages/Monitores.html", text: "Monitores" },
    { href: "pages/Notebook.html", text: "Notebooks" },
    { href: "pages/Perifericos.html", text: "Periféricos" }
];

function createNavbar() {
    const nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-lg", "bg-dark");

    const logoLink = document.createElement("a");
    logoLink.classList.add("navbar-brand");
    logoLink.href = "index.html";

    const logoImg = document.createElement("img");
    logoImg.classList.add("logo");
    logoImg.src = "images/logo-pccomponentes.webp";
    logoImg.alt = "logo-pccomponentes";
    logoImg.title = "logo-pccomponentes";

    logoLink.appendChild(logoImg);
    nav.appendChild(logoLink);

    const navDiv = document.createElement("div");
    navDiv.classList.add("collapse", "navbar-collapse");
    navDiv.id = "navbarSupportedContent";

    const ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0", "container", "d-flex", "justify-content-around", "align-items-center");

    navLinks.forEach(link => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        const a = document.createElement("a");
        a.classList.add("nav-link");
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        ul.appendChild(li);
    });

    const logoutLi = document.createElement("li");
    const logoutButton = document.createElement("a");
    logoutButton.classList.add("btn", "btn-danger");
    logoutButton.href = "#";
    logoutButton.textContent = "Logout";
    logoutButton.id = "logout";

    logoutLi.appendChild(logoutButton);
    ul.appendChild(logoutLi);

    navDiv.appendChild(ul);
    nav.appendChild(navDiv);

    document.body.insertAdjacentElement("afterbegin", nav);

    document.getElementById("logout").addEventListener("click", function () {
        alert("Cerraste sesión correctamente");
        window.location.href = "../pages/login.html";
    });
}
createNavbar();
