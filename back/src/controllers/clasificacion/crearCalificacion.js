import { Clasificacion } from "../../models/clasificacionMODEL.js";

export async function crearCalificacion(req, res) {
    const {
        estrellas,
        reseña
    } = req.body;

    return await Clasificacion.create({
        estrellas,
        reseña
    })
        .then((clasificacion) => {
            res.status(201).json(clasificacion);
        })
        .catch((error) => {
            res.status(500).json(error);
        })

}