import { Usuario } from "./usuarioModel.js";

export async function crearUsuario(req, res) {
  const {
    nombre,
    apellido,
    email,
    password,
    dni,
    telefono,
    tipo_dni,
    tipo_id,
    foto_perfil,
    fecha_nacimiento
  } = req.body;

  return await Usuario.create({
    nombre,
    apellido,
    email,
    password,
    dni,
    telefono,
    tipo_dni,
    tipo_id,
    foto_perfil,
    fecha_nacimiento
  })
    .then((usuario) => {
      res.status(201).json(usuario);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

