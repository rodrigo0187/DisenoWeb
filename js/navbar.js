
// Cargar navbar dinámicamente
fetch("../components/navbar.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("navbarContainer").innerHTML = html;
        aplicarLogicaNavbar();
    });

// Lógica de sesión
function aplicarLogicaNavbar() {
    const usuario = localStorage.getItem("usuarioLogeado");

    const loginBtn = document.getElementById("navLoginBtn");
    const logoutBtn = document.getElementById("navLogoutBtn");
    const userDisplay = document.getElementById("navUserDisplay");
    const usernameSpan = document.getElementById("navUsername");

    if (usuario) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        userDisplay.style.display = "block";
        usernameSpan.textContent = usuario;
    } else {
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
        userDisplay.style.display = "none";
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("usuarioLogeado");
    window.location.href = "../html/inicio_sesion.html";
}
