import { Trabajo } from "../../models/trabajoMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";


export async function crearTrabajo(req, res) {
  const {
    nombre,
    fecha,
    lugar,
    rangoHorario,
    prestadorId,
    consumidorId,
    tareas,
  } = req.body;

  return await Trabajo.create({
    nombre,
    fecha,
    lugar,
    rangoHorario,
    prestadorId,
    consumidorId,
    tareas,
    estadoId: 6,

  }, {
    include: [Estados]
  })
    .then((trabajo) => {
      res.status(201).json(trabajo);
    })
    .catch((error) => {
      console.log(id);
      res.status(500).json(error);
    });
}
