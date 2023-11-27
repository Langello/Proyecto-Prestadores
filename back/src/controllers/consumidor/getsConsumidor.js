import { Consumidor } from "../../models/consumidorMODEL.js";
import { Usuario } from "../../models/usuarioMODEL.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function obtenerConsumidorPorId(req, res) {
    const { idConsumidor } = req.params;

    return await Consumidor.findByPk(idConsumidor, { include: [Usuario] })
        .then((consumidor) => {
            if (!consumidor) {
                return res.status(404).json({
                    msg: "Consumidor no encontrado",
                });
            }

            res.status(200).json(consumidor);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

export async function obtenerConsumidores(req, res) {
    return await Consumidor.findAll({include: [Usuario]})
        .then((consumidores) => {
            res.status(200).json(consumidores);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function obtenerConsumidorByToken(req, res) {
    
    const { token } = req.params;
    

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    
    const idConsumidor = decoded.idConsumidor;

    return await Consumidor.findByPk(
        idConsumidor,
    )
        .then((consumidor) => {
            if (!consumidor) {
                return res.status(404).json({
                    msg: "Consumidor no encontrado",
                });
            }

            res.status(200).json(consumidor.id);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })

    
}

