document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/html/inicio_sesion.html";
        return;
    }

    // Asegurarse de que tenga historial
    if (!user.activity) user.activity = [];

    // Elementos del DOM
    const form = document.getElementById("perfilForm");
    const modal = document.getElementById("passwordModal");
    const confirmBtn = document.getElementById("confirmBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const listaActividad = document.getElementById("listaActividad");

    let pendingChanges = null;

    // -----------------------------
    // Función para renderizar historial
    // -----------------------------
    function renderActividad() {
        listaActividad.innerHTML = "";
        user.activity.slice(-5).reverse().forEach(evento => {
            const li = document.createElement("li");
            li.textContent = `${evento.fecha} - ${evento.descripcion}`;
            listaActividad.appendChild(li);
        });
    }

    renderActividad();

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
    // Precargar datos en el formulario
    // -----------------------------
    document.getElementById("username").value = user.username || "";
    document.getElementById("email").value = user.email || "";

    // -----------------------------
    // Guardar cambios → abrir modal
    // -----------------------------
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        pendingChanges = {
            username: document.getElementById("username").value.trim(),
            email: document.getElementById("email").value.trim(),
        };

        modal.style.display = "flex";
    });

    // -----------------------------
    // Confirmar contraseña
    // -----------------------------
    confirmBtn.addEventListener("click", function () {
        const enteredPassword = document.getElementById("verifyPassword").value;

        if (enteredPassword === user.psw) {
            const oldUsername = user.username;

            user.username = pendingChanges.username;
            user.email = pendingChanges.email;

            localStorage.setItem("user", JSON.stringify(user));

            if (oldUsername !== user.username) {
                addActividad(`Nombre cambiado de ${oldUsername} a ${user.username}`);
            }
            addActividad("Perfil actualizado");

            alert("✅ Perfil actualizado correctamente");
            modal.style.display = "none";
            pendingChanges = null;
        } else {
            alert("❌ Contraseña incorrecta");
        }
    });

    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
        pendingChanges = null;
    });

    // -----------------------------
    // Cerrar sesión
    // -----------------------------
    document.getElementById("logoutBtn").addEventListener("click", function () {
        addActividad("Cierre de sesión");
        localStorage.removeItem("user");
        window.location.href = "/html/inicio_sesion.html";
    });
});
