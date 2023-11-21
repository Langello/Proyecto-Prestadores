import { Usuario } from "../../models/usuarioMODEL.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export async function actualizarUsuario(req, res) {
  const { token } = req.body;
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.idUsuario;

  const {
    nombre,
    apellido,
    password,
    dni,
    telefono,
    tipoDni,
    fotoPerfil,
    fechaNacimiento,
  } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.password = password;
    usuario.dni = dni;
    usuario.telefono = telefono;
    usuario.tipoDni = tipoDni;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.fotoPerfil = fotoPerfil;

    await usuario.save();

    res.status(200).json({ msg: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario: " + error });
  }
}
