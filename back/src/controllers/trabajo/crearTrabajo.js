import { Trabajo } from "../../models/trabajoMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function crearTrabajo(req, res) {

  const {
    nombre,
    fecha,
    lugar,
    rangoHorario,
    token,
    tareas,
  } = req.body;

  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  const consumidorId = decoded.idConsumidor;

  return await Trabajo.create({
    nombre,
    fecha,
    lugar,
    rangoHorario,
    prestadorId : null,
    consumidorId,
    tareas,
    estadoId: 6,

  }, {
    include: [Estados]
  })
    .then(() => {
      res.status(201).json(
        {
          msg: "Trabajo publicado",
        }
      );
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
