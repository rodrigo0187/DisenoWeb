document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // Usuario simulado para pruebas
  const mockUser = {
    username: "usuario1",
    password: "123456",
    nombre: "Rodrigo Aedo",
    email: "usuario@correo.com"
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evitar envío real

    const username = form.uname.value.trim();
    const password = form.psw.value.trim();

    // ======== VALIDACIÓN DE NEGOCIO =========
    if (!username || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Aquí podrías agregar más reglas de negocio según necesites

    // ======== LOGIN SIMULADO =========
    if (username === mockUser.username && password === mockUser.password) {
      // Guardar usuario en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(mockUser));
      // Redirigir a perfil
      window.location.href = "perfil.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

  // Cancel button opcional
  const cancelBtn = document.querySelector(".cancelbtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => form.reset());
  }
});
