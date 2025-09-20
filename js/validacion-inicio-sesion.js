document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return; // seguridad: salir si no hay formulario


  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evitar envío real

    //input desde html
    const usernameInput = (form.email?.value || "").trim();
    const passwordInput = (form.psw?.value || "").trim();

    // ======== VALIDACIÓN DE NEGOCIO =========

    if (!usernameInput || !passwordInput) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Ejemplo: exigir mínimo 4 y máximo 10 caracteres (ajusta si quieres otra regla)
    if (passwordInput.length < 4 || passwordInput.length > 10) {
      alert("La contraseña debe tener entre 6 y 10 caracteres.");
      return;
    }
    // buscar en el localstorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(u => u.email === usernameInput && u.psw === passwordInput);

    if (usuarioValido) {
      const nombreFormateado = usuarioValido.nombre.charAt(0).toUpperCase() + usuarioValido.nombre.slice(1);
      usuarioValido.nombre = nombreFormateado; // actualizar objeto
      sessionStorage.setItem("user", JSON.stringify(usuarioValido));

      alert(`Bienvenido ${nombreFormateado}`);
      window.location.href = "perfil.html";
    } else {
      alert("Usuario o contrasenas incorrectas.");
    }
  });
  // Cancel button opcional
  const cancelBtn = document.querySelector(".cancelbtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
    });
  }
});
