import { Usuario } from "../../models/usuarioMODEL.js";

export async function crearUsuario(req, res) {
  console.log(req.body);
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
      res.status(201).json(usuario);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
