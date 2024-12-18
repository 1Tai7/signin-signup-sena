import bcryptjs from "bcryptjs"; // Importamos la librería bcryptjs para encriptar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Importamos la librería jsonwebtoken para generar tokens JWT
import dotenv from "dotenv"; // Importamos la librería dotenv para cargar variables de entorno

dotenv.config(); // Cargamos las variables de entorno desde un archivo .env
// Array de usuarios (simulado, en una aplicación real se usaría una base de datos)
const usuarios = [
  {
    user: "a",
    email: "a@a.com",
    password: "$2a$05$nLY2It8riku2vwwDIINdgO/XIyPXRg1Gn9LFgnhwKqC4TwcAwEUL2",
  },
];

// Función asíncrona para el proceso de inicio de sesión
async function login(req, res) {
  // Extraemos el nombre de usuario y contraseña del cuerpo de la solicitud
  const user = req.body.user;
  const password = req.body.password;
  // Validamos que los campos no estén vacíos
  if (!user || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }
  // Buscamos al usuario en el array de usuarios
  const usuarioAResvisar = usuarios.find((usuario) => usuario.user === user);
  if (!usuarioAResvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  // Comparamos la contraseña ingresada con la contraseña encriptada en la base de datos
  const loginCorrecto = await bcryptjs.compare(
    password,
    usuarioAResvisar.password
  );
  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  // Generamos un token JWT con la información del usuario
  const token = jsonwebtoken.sign(
    { user: usuarioAResvisar.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
  // Configuramos las opciones de la cookie
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    path: "/",
  };
  // Establecemos la cookie con el token en la respuesta
  res.cookie("jwt", token, cookieOption);
  // Enviamos una respuesta exitosa con el token y un mensaje de confirmación
  res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
}
// Función asíncrona para el proceso de registro
async function register(req, res) {
  // Extraemos los datos del usuario de la solicitud
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;
  // Validamos que los campos no estén vacíos
  if (!user || !password || !email) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }
  // Verificamos si el usuario ya existe
  const usuarioAResvisar = usuarios.find((usuario) => usuario.user === user);
  if (usuarioAResvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Este usuario ya existe" });
  }
  // Generamos una sal para encriptar la contraseña
  const salt = await bcryptjs.genSalt(5);
  // Encriptamos la contraseña
  const hashPassword = await bcryptjs.hash(password, salt);
  // Creamos un nuevo objeto de usuario con la contraseña encriptada
  const nuevoUsuario = {
    user,
    email,
    password: hashPassword,
  };
  // Agregamos el nuevo usuario al array de usuarios (en una aplicación real se guardaría en una base de datos)
  usuarios.push(nuevoUsuario);
  // Enviamos una respuesta exitosa con un mensaje de confirmación
  return res.status(201).send({
    status: "ok",
    message: `Usuario ${nuevoUsuario.user} agregado`,
    redirect: "/",
  });
}

export { login, register, usuarios };
