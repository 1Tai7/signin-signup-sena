// Selecciona el primer botón del documento,
document
  .getElementsByTagName("button")[0]
  // Agrega un evento de escucha para el evento "click"
  .addEventListener("click", () => {
    // Borra la cookie "jwt"
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // Redirige a la página raíz
    document.location.href = "/";
  });
