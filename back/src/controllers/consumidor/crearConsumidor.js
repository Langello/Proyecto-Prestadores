import { Consumidor } from "../../models/consumidorMODEL.js";

export async function crearConsumidor(req, res) {
    const idUsuario = req.params.idUsuario;
    const {
        metodo_pago,
    } = req.body;

    return await Consumidor.create({
        metodo_pago,
        usuario_Id: idUsuario
    })
        .then((usuario) => {
            res.status(201).json(usuario);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
