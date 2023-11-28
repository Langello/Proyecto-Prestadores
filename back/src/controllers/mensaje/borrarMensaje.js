import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { MensajeAConsumidor, MensajeAPrestador } from "../../models/mensajeMODEL.js";

dotenv.config();

export async function borrarMensajeConsumidorRecibido(req, res) {
    const { token } = req.params;
    const { id } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idConsumidor = decoded.idConsumidor;

    return await MensajeAConsumidor.destroy({
        where: {
            id,
            idDestino: idConsumidor
        }

    }).then(() => {
        res.status(200).json({
            msg: 'Mensaje borrado'
        })
    }).catch((error) => {
        res.status(500).json(error);
    })
}

export async function borrarMensajeConsumidorEnviado(req, res) {
    const { token } = req.params;
    const { id } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idConsumidor = decoded.idConsumidor;

    return await MensajeAPrestador.destroy({
        where: {
            id,
            idOrigen: idConsumidor
        }
    })
        .then(() => {
            res.status(200).json({
                msg: 'Mensaje borrado'
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function borrarMensajePrestadorRecibido(req, res) {
    const { token } = req.params;
    const { id } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idPrestador = decoded.idPrestador;


    return await MensajeAPrestador.destroy({
        where: {
            id,
            idDestino: idPrestador
        }
    })
        .then(() => {
            res.status(200).json({
                msg: 'Mensaje borrado'
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function borrarMensajePrestadorEnviado(req, res) {
    const { token } = req.params;
    const { id } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idPrestador = decoded.idPrestador;


    return await MensajeAConsumidor.destroy({
        where: {
            id,
            idOrigen: idPrestador
        }
    })
        .then(() => {
            res.status(200).json({
                msg: 'Mensaje borrado'
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}