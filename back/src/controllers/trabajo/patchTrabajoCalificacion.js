import { Trabajo } from "../../models/trabajoMODEL.js";
import { Calificacion } from "../../models/calificacionMODEL.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function patchTrabajoCalificacion(req, res) {
    try {
        const { idTrabajo } = req.params;
        const { estrellas, token, comentario } = req.body;

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.idConsumidor;

        const trabajo = await Trabajo.findOne({
            where: { id: idTrabajo, consumidorId: id }
        });

        if (!trabajo) {
            return res.status(404).json({
                msg: "No se encontró el trabajo"
            });
        }

        const calificacion = await Calificacion.create({
            estrellas: estrellas,
            trabajoId: idTrabajo,
            comentario: comentario
        });

        const { id: calificacionId } = calificacion;

        await Trabajo.update(
            { calificacionId },
            { where: { id: idTrabajo } }
        );

        return res.status(200).json({
            msg: "Calificación guardada"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error interno del servidor: " + error
        });
    }
}