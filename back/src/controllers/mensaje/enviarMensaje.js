import { MensajeAPrestador, MensajeAConsumidor } from '../../models/mensajeMODEL.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function enviarMensajeAPrestador(req, res) {
    const { asunto, mensaje, token, idDestino } = req.body;
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    const idOrigen = decoded.idConsumidor;

    if (!idOrigen) {
        return res.status(401).json({
            msg: 'Cuenta no válida'
        })
    }

    return await MensajeAPrestador.create({
        asunto,
        mensaje,
        idOrigen,
        idDestino
    })
        .then(() => {
            res.status(200).json({
                msg: 'Mensaje enviado'
            })
        })
        .catch((error) => {
            res.status(500).json(
                {
                    error: error,
                    msg: 'Error al enviar el mensaje'
                }
            );
        })
}

export async function enviarMensajeAConsumidor(req, res) {
    const { asunto, mensaje, token, idDestino } = req.body;
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    const idOrigen = decoded.idPrestador;
    console.log(req.body)

    if (!idOrigen) {
        return res.status(401).json({
            msg: 'Cuenta no válida'
        })
    }

    return await MensajeAConsumidor.create({
        asunto,
        mensaje,
        idOrigen,
        idDestino
    })
        .then(() => {
            res.status(200).json({
                msg: 'Mensaje enviado'
            })
        })
        .catch((error) => {
            res.status(500).json(
                {
                    error: error,
                    msg: 'Error al enviar el mensaje'
                }
            );
        })
}


