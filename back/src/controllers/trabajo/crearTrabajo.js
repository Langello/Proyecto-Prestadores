import { Trabajo } from "../../models/trabajoMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";
import { Calificacion } from "../../models/calificacionMODEL.js";


export async function crearTrabajo(req, res) {
  const {
    nombre,
    fecha,
    lugar,
    rangoHorario,
    prestadorId,
    consumidorId,
    tareas,
    estadoId
  } = req.body;

  return await Trabajo.create({
    nombre,
    fecha,
    lugar,
    rangoHorario,
    prestadorId,
    consumidorId,
    tareas,
    estadoId,

  }, {
    include: [Estados, Calificacion]
  })
    .then((trabajo) => {
      res.status(201).json(trabajo);
    })
    .catch((error) => {
      console.log(id);
      res.status(500).json(error);
    });
}
