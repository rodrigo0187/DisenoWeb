// Cargar usuario desde sessionStorage
const user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
    document.getElementById("username").textContent = user.nombre;
    document.getElementById("useremail").textContent = user.email;
} else {
    // Si no hay usuario, redirigir al login
    window.location.href = "inicio_sesion.html";
}

// Abrir el modal al enviar formulario
const perfilForm = document.getElementById("perfilForm");
const modal = document.getElementById("passwordModal");

perfilForm.addEventListener("submit", function (e) {
    e.preventDefault();
    modal.style.display = "block";
});

// Cancelar modal
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("user");
    window.location.href = "inicio_sesion.html";
});

// Confirmación de contraseña
const confirmBtn = document.getElementById("confirmBtn");
if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
        const inputPass = document.getElementById("verifyPassword").value;
        if (user && inputPass === user.psw) {
            // Actualizar los datos del usuario con los inputs del formulario
            user.nombre = document.getElementById("nombrecompleto").value;
            user.email = document.getElementById("email").value;
            user.telefono = document.getElementById("telefono").value;
            user.psw = document.getElementById("psw").value;

            // guardar en el storage
            sessionStorage.setItem("user", JSON.stringify(user));
            //actualizacion en la pagina
            document.getElementById("username").textContent = user.nombre;
            document.getElementById("useremail").textContent = user.email;

            alert("✅ Contraseña correcta. Cambios guardados.");
            modal.style.display = "none";
            // Aquí puedes agregar la lógica real para guardar los cambios
        } else {
            alert("❌ Contraseña incorrecta.");
        }
    });
}

// Cerrar modal al hacer click fuera
window.addEventListener("click", function (e) {
    if (e.target === modal) modal.style.display = "none";
});
