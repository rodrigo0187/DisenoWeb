document.querySelector("form").addEventListener("submit", function(event) {
    const dob = new Date(document.getElementById("dob").value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    const realAge = (m < 0 || (m === 0 && today.getDate() < dob.getDate())) ? age - 1 : age;

    if (realAge < 18) {
        alert("Debes tener al menos 18 años para registrarte.");
        event.preventDefault();
        return;
    }

    const email = document.querySelector("input[name='email']").value;
    if (email.endsWith("@duocuc.cl")) {
        alert("¡Felicidades! Obtienes un 20% de descuento de por vida 🎉");
    }
});
