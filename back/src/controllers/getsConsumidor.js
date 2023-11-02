import { Consumidor } from "../models/consumidorMODEL.js";

export async function obtenerConsumidorPorId(req, res) {
    const { idConsumidor } = req.params;

    return await Consumidor.findByPk(idConsumidor)
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
    return await Consumidor.findAll()
        .then((consumidores) => {
            res.status(200).json(consumidores);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}

