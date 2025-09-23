// -----------------------------
// Cargar usuario y historial
// -----------------------------
const user = JSON.parse(localStorage.getItem("user"));
const userPosts = document.getElementById("userPosts");

if (!user) {
    window.location.href = "inicio_sesion.html";
}

// Asegurarse de que exista el historial
if (!user.activity) user.activity = [];

// -----------------------------
// Función para renderizar historial
// -----------------------------
function renderActividad() {
    userPosts.innerHTML = "";
    user.activity.slice().reverse().forEach(evento => {
        const li = document.createElement("li");
        li.textContent = `${evento.fecha} - ${evento.descripcion}`;
        userPosts.appendChild(li);
    });
}

// -----------------------------
// Función para agregar actividad
// -----------------------------
function addActividad(descripcion) {
    const fecha = new Date().toLocaleString();
    user.activity.push({ fecha, descripcion });
    localStorage.setItem("user", JSON.stringify(user));
    renderActividad();
}

// -----------------------------
// Mostrar usuario
// -----------------------------
document.getElementById("username").textContent = user.username;
document.getElementById("useremail").textContent = user.email;

// Renderizar historial inicial
renderActividad();

// -----------------------------
// Cerrar sesión
// -----------------------------
document.getElementById("logoutBtn").addEventListener("click", function () {
    addActividad("Cierre de sesión");
    localStorage.removeItem("user");
    window.location.href = "/html/inicio_sesion.html";
});

// -----------------------------
// Función de ejemplo para compras
// -----------------------------
function comprarJuego(nombreJuego) {
    addActividad(`Compró el juego: ${nombreJuego}`);
}
