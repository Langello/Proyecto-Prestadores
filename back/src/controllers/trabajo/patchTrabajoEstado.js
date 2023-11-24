import { Trabajo } from '../../models/trabajoMODEL.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function patchEstadoTrabajo(req, res) {

    const { idTrabajo } = req.params;
    const { token } = req.body;
    const { estadoId } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idPrestador = decoded.idPrestador;

    const idConsumidor = decoded.idConsumidor;
    if (!idPrestador && !idConsumidor) {
        return res.status(401).json({
            msg: 'No puedes cambiar el estado de este trabajo'
        })
    }

    return await Trabajo.findOne({ where: { id: idTrabajo } })

        .then((trabajo) => {

            if (!trabajo) {
                return res.status(404).json({
                    msg: 'Trabajo no encontrado'
                })
            } else {

                if (trabajo.prestadorId !== idPrestador && trabajo.consumidorId !== idConsumidor) {
                    return res.status(401).json({
                        msg: 'Este trabajo no te pertenece'
                    })
                }
            }


            return Trabajo.update({ estadoId }, { where: { id: idTrabajo } })

                .then(() => {
                    return res.status(200).json({
                        msg: 'Se actualizó el estado del trabajo'
                    })
                })

                .catch((error) => {
                    res.status(500).json(
                        {
                            error: error,
                            msg: 'Error al actualizar el estado del trabajo'
                        }
                    )
                })
        })

}