document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registerForm");
    const msgExito = document.getElementById("msgExito");

    // Limpia errores
    function limpiarErrores() {
        document.querySelectorAll("small.text-danger").forEach(el => el.textContent = "");
        document.querySelectorAll(".form-control").forEach(el => {
            el.classList.remove("is-invalid", "is-valid");
        });
    }

    // Muestra error
    function mostrarError(inputId, mensaje) {
        const input = document.getElementById(inputId);
        const error = document.getElementById("error-" + inputId);
        input.classList.add("is-invalid");
        error.textContent = mensaje;
    }

    // Marca como válido
    function marcarValido(inputId) {
        const input = document.getElementById(inputId);
        input.classList.add("is-valid");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        limpiarErrores();
        msgExito.textContent = "";

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const repeatemail = form["repeat-email"].value.trim();
        const telefono = form.telefono.value.trim();
        const psw = form.psw.value.trim();
        const pswRepeat = form["psw-repeat"].value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const telRegex = /^\+569-\d{4}-\d{4}$/;

        let valido = true;

        if (!nombre) {
            mostrarError("nombre", "El nombre es obligatorio.");
            valido = false;
        } else {
            marcarValido("nombre");
        }

        if (!emailRegex.test(email)) {
            mostrarError("email", "Email inválido o dominio no permitido.");
            valido = false;
        } else {
            marcarValido("email");
        }

        if (email !== repeatemail) {
            mostrarError("repeat-email", "Los emails no coinciden.");
            valido = false;
        } else if (repeatemail) {
            marcarValido("repeat-email");
        }

        if (telefono && !telRegex.test(telefono)) {
            mostrarError("telefono", "Formato esperado: +569-1234-5678");
            valido = false;
        } else if (telefono) {
            marcarValido("telefono");
        }

        if (psw.length < 4 || psw.length > 10) {
            mostrarError("psw", "Debe tener entre 4 y 10 caracteres.");
            valido = false;
        } else {
            marcarValido("psw");
        }

        if (psw !== pswRepeat) {
            mostrarError("psw-repeat", "Las contraseñas no coinciden.");
            valido = false;
        } else if (pswRepeat) {
            marcarValido("psw-repeat");
        }

        if (!valido) return;

        // Guardar usuario en localStorage
        const nuevoUsuario = { nombre, email, telefono, psw };
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const existe = usuarios.some((u) => u.email === email);

        if (existe) {
            mostrarError("email", "Este email ya está registrado.");
            return;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        msgExito.textContent = "✅ Registro exitoso. Ahora puedes iniciar sesión.";
        form.reset();
        limpiarErrores();

        setTimeout(() => {
            window.location.href = "../html/inicio_sesion.html";
        }, 1500);
    });

    // Botón cancelar
    const cancelBtn = document.querySelector(".cancelbtn");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            form.reset();
            limpiarErrores();
            msgExito.textContent = "";
        });
    }
});
