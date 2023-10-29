import { Prestador } from "../models/prestadorMODEL.js";

export async function obtenerPrestadores(req, res) {
    return await Prestador.findAll()
        .then((prestadores) => {
            res.status(200).json(prestadores);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

export async function obtenerPrestadorPorId(req, res) {
    const { idPrestador } = req.params;

    return await Prestador.findByPk(idPrestador)
        .then((prestador) => {
            if (!prestador) {
                return res.status(404).json({
                    msg: "Prestador no encontrado",
                });
            }

            res.status(200).json(prestador);
        })
        .catch((error) => {
            res.status(500).json(error);
        })

}