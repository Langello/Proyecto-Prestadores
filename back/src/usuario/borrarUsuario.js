import { Usuario } from "./usuarioMODEL.js";

export async function borrarUsuario(req, res) {
    const { id } = req.params;

    return await Usuario.destroy({
        where: {
            id: id,
        },
    })
        .then((usuario) => {
            if (!usuario) {
                return res.status(404).json({
                    msg: "Usuario no encontrado",
                });
            }
            res.status(200).json({
                msg: "Usuario eliminado",
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
