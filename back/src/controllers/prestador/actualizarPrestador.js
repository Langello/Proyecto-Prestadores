import { Prestador } from "../../models/prestadorMODEL.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function actualizarPrestador(req, res) {

    const {
        token,
        cuil_cuit,
        descripcion,
        fotos_trabajos_realizados,
        horarios_atencion,
        disponibilidad,
        radio_cobertura,
    } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idPrestador = decoded.idPrestador;

    return await Prestador.update(
        {
            cuil_cuit,
            descripcion,
            fotos_trabajos_realizados,
            horarios_atencion,
            disponibilidad,
            radio_cobertura,
        },
        {
            where: { id: idPrestador },
        }
    )
        .then((prestador) => {
            if (!prestador) {
                return res.status(404).json({
                    msg: "Prestador no encontrado",
                });
            }

            res.status(200).json({
                msg: "Cuenta actualizada con exito",
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })

}