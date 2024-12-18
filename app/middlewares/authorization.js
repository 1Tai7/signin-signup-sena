import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function revisarCookie(req) {
  try {
    // Extrae el token JWT de la cookie
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    // Verifica la validez del token utilizando la clave secreta
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    // Busca al usuario en la lista de usuarios
    const usuarioAResvisar = usuarios.find(
      (usuario) => usuario.user === decodificada.user
    );
    // Si el usuario no existe, devuelve false
    if (!usuarioAResvisar) {
      return false;
    }
    // Si el usuario existe, devuelve true
    return true;
  } catch (error) {
    // Si ocurre un error durante la verificación, lo registra y devuelve false
    console.error(error);
    return false;
  }
}

function soloAdmin(req, res, next) {
  // Verifica si el usuario está autenticado como administrador
  const logueado = revisarCookie(req);
  // Si está autenticado, permite el acceso a la siguiente función middleware
  if (logueado) return next();
  // Si no está autenticado, redirige a la página de inicio
  return res.redirect("/");
}

function soloPublico(req, res, next) {
  // Verifica si el usuario está autenticado
  const logueado = revisarCookie(req);
  // Si no está autenticado, permite el acceso a la siguiente función middleware
  if (!logueado) return next();
  // Si está autenticado, redirige a la página de administración
  return res.redirect("/admin");
}

export { soloAdmin, soloPublico };
