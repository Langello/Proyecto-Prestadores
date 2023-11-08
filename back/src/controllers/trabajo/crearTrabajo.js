import { Trabajo } from "../../models/trabajoMODEL.js";

export async function crearTrabajo(req, res) {
  const {
    nombre,
    fecha,
    lugar,
    rango_horario,
    prestador_id,
    consumidor_id,
    tareas,
    estado_id,
    calificacion_id
  } = req.body;

  return await Trabajo.create({
    nombre,
    fecha,
    lugar,
    rango_horario,
    prestador_id,
    consumidor_id,
    tareas,
    estado_id,
    calificacion_id
  })
    .then((trabajo) => {
      res.status(201).json(trabajo);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
