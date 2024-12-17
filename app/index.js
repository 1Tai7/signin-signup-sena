import express from "express";

//fix para _dirname
import path from "path";
import { fileURLToPath } from "url";
const _dirname = path.dirname(fileURLToPath(import.meta.url));

import { soloAdmin, soloPublico } from "./middlewares/authorization.js";
import { login, register } from "./controllers/authentication.controller.js";
import cookieParser from "cookie-parser";

//server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("servidor corriendo en el puerto", app.get("port"));

//configuracion
app.use(express.static(_dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
//rutas
app.get("/", soloPublico, (req, res) =>
  res.sendFile(_dirname + "/pages/login.html")
);
app.get("/register", soloPublico, (req, res) =>
  res.sendFile(_dirname + "/pages/register.html")
);
app.get("/admin", soloAdmin, (req, res) =>
  res.sendFile(_dirname + "/pages/admin/admin.html")
);
app.post("/api/login", login);
app.post("/api/register", register);
