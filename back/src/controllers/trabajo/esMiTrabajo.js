import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Trabajo } from "../../models/trabajoMODEL.js";

dotenv.config();

export async function esMiTrabajoConsumidor(req, res) {
    const { token, idTrabajo } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idConsumidor;

    return await Trabajo.findOne({ where: { id: idTrabajo, consumidorId: id } })

        .then((trabajo) => {
            
            if (!trabajo) {
                return res.status(200).json({
                    msg: false,
                });
            } else {
                return res.status(200).json({
                    msg: true,
                });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function esMiTrabajoPrestador(req, res) {
    const { token, idTrabajo } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idPrestador;

    return await Trabajo.findOne({ where: { id: idTrabajo, prestadorId: id } })

        .then((trabajo) => {
            if (!trabajo) {
                return res.status(200).json({
                    msg: false,
                });
            } else {
                return res.status(200).json({
                    msg: true,
                });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

