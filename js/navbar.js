// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginBtn = document.getElementById("navLoginBtn");
    const userDisplay = document.getElementById("navUserDisplay");
    const navUsername = document.getElementById("navUsername");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (userDisplay) userDisplay.style.display = "inline-block";
        if (navUsername) navUsername.textContent = user.username || user.nombre;
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (userDisplay) userDisplay.style.display = "none";
    }
});
