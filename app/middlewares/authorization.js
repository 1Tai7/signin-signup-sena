import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";

dotenv.config();

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const usuarioAResvisar = usuarios.find(
      (usuario) => usuario.user === decodificada.user
    );
    if (!usuarioAResvisar) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/");
}

function soloPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/admin");
}

export { soloAdmin, soloPublico };