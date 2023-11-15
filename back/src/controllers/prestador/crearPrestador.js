import { Prestador } from "../../models/prestadorMODEL.js";


export async function crearPrestador(req, res) {
    const idUsuario = req.params.idUsuario;
    const {
        cuilCuit,
        descripcion,
        fotosTrabajosRealizados,
        horariosAtencion,
        disponibilidad,
        radioCobertura,

    } = req.body;

    return await Prestador.create({
        cuilCuit,
        descripcion,
        fotosTrabajosRealizados,
        horariosAtencion,
        disponibilidad,
        radioCobertura,
        usuarioId: idUsuario
    })
        .then((usuario) => {

            res.status(201).json(usuario);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
