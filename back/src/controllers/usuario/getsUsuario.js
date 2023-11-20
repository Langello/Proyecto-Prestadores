import { Usuario } from "../../models/usuarioMODEL.js";
import { Tipo } from "../../models/tipoMODEL.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function obtenerUsuarios(req, res) {
    return await Usuario.findAll().then((usuarios) => {
        res.status(200).json(usuarios);
    })
        .catch((error) => {
            res.status(500).json(error);
        });
}

export async function obtenerUsuarioPorId(req, res) {
    const { token } = req.params;

    if (!token) {
        return res.status(401).json({
            msg: "Token no válido",
        });
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({
            msg: "Cuenta no válida",
        });
    }

    const id = decoded.idUsuario


    return await Usuario.findByPk(id, { include: [Tipo] })
        .then((usuario) => {
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