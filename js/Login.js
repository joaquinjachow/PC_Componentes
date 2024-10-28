document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && email === user.email && password === user.password) {
        window.location.href = '/pages/Home.html';
    } else {
        alert('Credenciales incorrectas');
    }
});
