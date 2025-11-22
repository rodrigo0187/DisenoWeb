document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = (form.email?.value || "").trim();
    const passwordInput = (form.psw?.value || "").trim();

    if (!usernameInput || !passwordInput) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (passwordInput.length < 6 || passwordInput.length > 10) {
      alert("La contraseña debe tener entre 6 y 10 caracteres.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(u => u.email === usernameInput && u.psw === passwordInput);

    if (usuarioValido) {
      const nombreFormateado = usuarioValido.nombre.charAt(0).toUpperCase() + usuarioValido.nombre.slice(1);
      // guardar el rol usuario
      localStorage.setItem("usuarioLogeado", nombreFormateado);
      // guarda al rol administrador
      localStorage.setItem("rolUsuario", usuarioValido.role || "user");

      alert(`Bienvenido ${nombreFormateado}`);
      if (usuarioValido.role === "admin") {
        window.location.href = "../html/perfilAdmin.html";
      }
      else {
        window.location.href = "../html/perfil.html";
      }
    } else {
      alert("!Usuario o contrasena invalidas")
    }

  }
  );

  const cancelBtn = document.querySelector(".cancelbtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
    });
  }
});
