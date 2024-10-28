document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('date').value;

    const newUser = {
        nombre,
        apellido,
        email,
        password,
        date
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    alert('Registro exitoso!');
    window.location.href = '../index.html';
});
