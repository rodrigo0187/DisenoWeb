fetch("../components/footer.html")
    .then(Response => Response.text())
    .then(html => {
        document.getElementById("footerContainer").innerHTML = html;
        aplicarLogicaNavbar();
    }
    )