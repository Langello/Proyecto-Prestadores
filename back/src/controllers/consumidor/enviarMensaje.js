import { Mensaje } from '../../models/mensajeMODEL.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function enviarMensaje(req, res) {
    const { asunto, mensaje, token, idDestino } = req.body;
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    const idOrigen = decoded.idConsumidor;

    return await Mensaje.create({
        asunto,
        mensaje,
        idOrigen,
        idDestino
    })
        .then(() => {
            res.status(200).json({
                msg: 'Email enviado'
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}


