import { Prestador } from "../../models/prestadorMODEL.js";
export async function borrarPrestador(req, res) {
    const { idPrestador } = req.params;

    return await Prestador.findByPk(idPrestador)
        .then((prestador) => {
            if (!prestador) {
                return res.status(404).json({
                    msg: "Prestador no encontrado",
                });
            }

            return prestador
                .destroy()
                .then(() => {
                    res.status(200).json({
                        msg: "Prestador eliminado",
                    });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });

        })
        .catch((error) => {
            res.status(500).json(error);
        })

}