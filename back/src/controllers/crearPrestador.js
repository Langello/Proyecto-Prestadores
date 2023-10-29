import { Prestador } from "../models/prestadorMODEL.js";

export async function crearPrestador(req, res) {
    const idUsuario = req.params.idUsuario;
    const {
        cuil_cuit,
        descripcion,
        fotos_trabajos_realizados,
        horarios_atencion,
        disponibilidad,
        radio_cobertura,

    } = req.body;

    return await Prestador.create({
        cuil_cuit,
        descripcion,
        fotos_trabajos_realizados,
        horarios_atencion,
        disponibilidad,
        radio_cobertura,
        usuario_Id: idUsuario
    })
        .then((usuario) => {
            res.status(200).json(usuario);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
