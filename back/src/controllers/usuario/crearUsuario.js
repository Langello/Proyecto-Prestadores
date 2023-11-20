import { Usuario } from "../../models/usuarioMODEL.js";
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function crearUsuario(req, res) {
  const {
    nombre,
    apellido,
    email,
    password,
    dni,
    telefono,
    tipoDni,
    fotoPerfil,
    fechaNacimiento,
  } = req.body;

  return await Usuario.create({
    nombre,
    apellido,
    email,
    password,
    dni,
    telefono,
    tipoDni,
    fotoPerfil,
    fechaNacimiento,
  })
    .then((usuario) => {
      const token = Jwt.sign({ idUsuario: usuario.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      })
      res.status(201).json({
        token: token
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
