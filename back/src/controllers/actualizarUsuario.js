import { Usuario } from "../models/usuarioMODEL.js";

export async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    password,
    dni,
    telefono,
    tipo_dni,
    foto_perfil,
    fecha_nacimiento,
  } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.password = password;
    usuario.dni = dni;
    usuario.telefono = telefono;
    usuario.tipo_dni = tipo_dni;
    usuario.fecha_nacimiento = fecha_nacimiento;
    usuario.foto_perfil = foto_perfil;

    await usuario.save();

    res.status(200).json({ msg: "Usuario actualizado: " + usuario.email });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el usuario: " + error });
  }
}
