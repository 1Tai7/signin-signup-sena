// Selecciona el elemento con la clase "error" y lo asigna a la constante mensajeError
const mensajeError = document.getElementsByClassName("error")[0];

// Selecciona el formulario con el id "login-form" y agrega un evento de escucha para el evento "submit"
document.getElementById("login-form").addEventListener("submit", async (e) => {
  // Evita que el formulario se envíe de forma predeterminada (recargar la página)
  e.preventDefault();
  // Extrae los valores de los campos del formulario y los envía en el cuerpo de la solicitud
  const user = e.target.children.user.value;
  const password = e.target.children.password.value;
  // Realiza una solicitud POST a la API para registrar un usuario
  const res = await fetch("http://localhost:4000/api/login", {
    // Especifica que el método de la solicitud es POST
    method: "POST",
    // Establece los encabezados de la solicitud
    headers: {
      // Indica que el contenido de la solicitud es JSON
      "Content-Type": "application/json",
    },
    // El cuerpo de la solicitud contiene los datos del usuario
    body: JSON.stringify({
      user,
      password,
    }),
  });
  // Si la solicitud no fue exitosa, Muestra el mensaje de error
  if (!res.ok) return mensajeError.classList.toggle("escondido", false);
  const resJson = await res.json();
  // Si la respuesta contiene una propiedad "redirect", redirige a la URL especificada
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
