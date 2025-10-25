// -----------------------------
// Obtener usuario
// -----------------------------
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "inicio_sesion.html";
}

// Inicializar arrays si no existen
user.activity = user.activity || [];
user.compras = user.compras || [];
user.productosVistos = user.productosVistos || [];

// -----------------------------
// Funciones de renderizado
// -----------------------------
function renderActividad() {
    const userPosts = document.getElementById("userPosts");
    if (!userPosts) return;
    userPosts.innerHTML = "";
    user.activity.slice().reverse().forEach(evento => {
        const li = document.createElement("li");
        li.textContent = `${evento.fecha} - ${evento.descripcion}`;
        userPosts.appendChild(li);
    });
}

function renderCompras() {
    const userCompras = document.getElementById("userCompras");
    if (!userCompras) return;
    userCompras.innerHTML = "";
    user.compras.forEach(juego => {
        const li = document.createElement("li");
        li.textContent = `${juego.fecha} - ${juego.nombre}`;
        userCompras.appendChild(li);
    });
}

function renderProductosVistos() {
    const userProductos = document.getElementById("userProductosVistos");
    if (!userProductos) return;
    userProductos.innerHTML = "";
    user.productosVistos.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = producto;
        userProductos.appendChild(li);
    });
}

// -----------------------------
// Agregar actividad
// -----------------------------
function addActividad(descripcion) {
    const fecha = new Date().toLocaleString();
    user.activity.push({ fecha, descripcion });
    localStorage.setItem("user", JSON.stringify(user));
    renderActividad();
}

// -----------------------------
// Agregar compra
// -----------------------------
function comprarJuego(nombreJuego) {
    const fecha = new Date().toLocaleString();
    user.compras.push({ nombre: nombreJuego, fecha });
    addActividad(`Compró el juego: ${nombreJuego}`);
    localStorage.setItem("user", JSON.stringify(user));
    renderCompras();
}

// -----------------------------
// Actualizar datos del perfil
// -----------------------------
const usernameElem = document.getElementById("username");
const useremailElem = document.getElementById("useremail");
const perfilImagen = document.getElementById("perfilImagen");

if (usernameElem) usernameElem.textContent = user.username;
if (useremailElem) useremailElem.textContent = user.email;
if (perfilImagen && user.imagen) perfilImagen.src = user.imagen;

// -----------------------------
// Cambio de foto de perfil
// -----------------------------
const inputFoto = document.getElementById("cambiarFoto");
const btnSubirFoto = document.getElementById("btnSubirFoto");

if (inputFoto && btnSubirFoto && perfilImagen) {
    let nuevaFoto = null;

    inputFoto.addEventListener("change", function () {
        const archivo = this.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                perfilImagen.src = e.target.result; // vista previa
                nuevaFoto = e.target.result;        // guardar base64
            }
            reader.readAsDataURL(archivo);
        }
    });

    btnSubirFoto.addEventListener("click", function () {
        if (nuevaFoto) {
            user.imagen = nuevaFoto;
            localStorage.setItem("user", JSON.stringify(user));
            alert("Foto de perfil actualizada");
        } else {
            alert("Seleccione una imagen primero");
        }
    });
}

// -----------------------------
// Cerrar sesión
// -----------------------------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        addActividad("Cierre de sesión");
        localStorage.removeItem("user");
        window.location.href = "/html/inicio_sesion.html";
    });
}

// -----------------------------
// Render inicial
// -----------------------------
renderActividad();
renderCompras();
renderProductosVistos();
