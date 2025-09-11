document.querySelector("form").addEventListener("submit", function(event) {
    const email = document.querySelector("input[name='email']").value.trim();
    const password = document.querySelector("input[name='psw']").value.trim();

    // Validar campos vacíos
    if (!email || !password) {
        alert("Por favor completa todos los campos.");
        event.preventDefault();
        return;
    }

    // Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor ingresa un correo válido.");
        event.preventDefault();
        return;
    }

    // Ejemplo: restricción simple de contraseña mínima
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        event.preventDefault();
        return;
    }

    // Aquí podría ir la lógica para enviar datos al backend (PHP)
});
