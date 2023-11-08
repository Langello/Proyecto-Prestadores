import { Servicio } from "../../models/serviciosMODEL.js";

export async function crearServicio(req, res) {
    const {
        nombre,
        descripcion
    } = req.body;

    return await Servicio.create({
        nombre,
        descripcion
    })

        .then((servicio) => {
            res.status(201).json(servicio);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}