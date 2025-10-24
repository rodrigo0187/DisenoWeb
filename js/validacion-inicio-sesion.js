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

    if (passwordInput.length < 4 || passwordInput.length > 10) {
      alert("La contraseña debe tener entre 6 y 10 caracteres.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuarios.find(u => u.email === usernameInput && u.psw === passwordInput);

    if (usuarioValido) {
      const nombreFormateado = usuarioValido.nombre.charAt(0).toUpperCase() + usuarioValido.nombre.slice(1);

      // ✅ Importante: guardar nombre
      localStorage.setItem("usuarioLogeado", nombreFormateado);

      alert(`Bienvenido ${nombreFormateado}`);
      window.location.href = "perfil.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });

  const cancelBtn = document.querySelector(".cancelbtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
    });
  }
});
