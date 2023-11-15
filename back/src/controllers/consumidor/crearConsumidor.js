import { Consumidor } from "../../models/consumidorMODEL.js";

export async function crearConsumidor(req, res) {
    const idUsuario = req.params.idUsuario;
    const {
        metodoPago,
    } = req.body;

    return await Consumidor.create({
        metodoPago,
        usuarioId: idUsuario
    })
        .then((usuario) => {
            res.status(201).json(usuario);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
