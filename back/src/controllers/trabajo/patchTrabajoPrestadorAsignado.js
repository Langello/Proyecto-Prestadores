import { Trabajo } from '../../models/trabajoMODEL.js';
import { Prestador } from '../../models/prestadorMODEL.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function patchTrabajoPrestadorAsignado(req, res) {
    const { idTrabajo } = req.params;
    const { token } = req.body;
    const { prestadorId } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idConsumidor = decoded.idConsumidor;

    if (!prestadorId || !idConsumidor) {
        return res.status(401).json({
            msg: 'Falta el prestador o el consumidor'
        });
    }

    
    try {
        const prestador = await Prestador.findOne({ where: { id: prestadorId } });

        if (!prestador) {
            return res.status(404).json({
                msg: 'Prestador no encontrado'
            });
        }

        const trabajo = await Trabajo.findOne({ where: { id: idTrabajo } });

        if (!trabajo) {
            return res.status(404).json({
                msg: 'Trabajo no encontrado'
            });
        }

        if (trabajo.prestadorId !== prestadorId && trabajo.consumidorId !== idConsumidor) {
            return res.status(401).json({
                msg: 'Este trabajo no te pertenece'
            });
        }

        await Trabajo.update({ prestadorId }, { where: { id: idTrabajo } });

        return res.status(200).json({
            msg: 'Se asignó el prestador al trabajo'
        });
    } catch (error) {
        return res.status(500).json({
            error: error,
            msg: 'Error al asignar el prestador al trabajo'
        });
    }
}