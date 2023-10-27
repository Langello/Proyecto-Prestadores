import { Usuario } from "./usuarioMODEL.js";

export async function obtenerUsuarios(req, res) {
    return await Usuario.findAll().then((usuarios) => {
        res.status(200).json(usuarios);
    })
        .catch((error) => {
            res.status(500).json(error);
        });
}

export async function obtenerUsuarioPorId(req, res) {
    const { id } = req.params;

    return await Usuario.findByPk(id).then((usuario) => {
        if (!usuario) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
            });
        }

        res.status(200).json(usuario);
    })
        .catch((error) => {
            res.status(500).json(error);
        })

}