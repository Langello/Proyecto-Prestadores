import { Prestador } from "../../models/prestadorMODEL.js";
import { Usuario } from "../../models/usuarioMODEL.js";
import { Op, Sequelize } from 'sequelize';

export async function obtenerPrestadores(req, res) {
    let filtro = req.query.filtro;

    if (!filtro) {
        filtro = '';
    }

    return await Prestador.findAll({
        include: [Usuario],
        where: {
            [Op.or]: [
                { "$Usuario.nombre$": { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`)} },
                { horarios_atencion: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`)} },
                { "$Usuario.apellido$": { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`)}},
                { "$Usuario.email$": { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`)} },
                { descripcion: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`)} },
            ]
        }
    })
        .then((prestadores) => {
            res.status(200).json(prestadores);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}

export async function obtenerPrestadorPorId(req, res) {
    const { idPrestador } = req.params;

    return await Prestador.findByPk(
        idPrestador,
        {
            include: [Usuario]
        })
        .then((prestador) => {
            if (!prestador) {
                return res.status(404).json({
                    msg: "Prestador no encontrado",
                });
            }

            res.status(200).json(prestador);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })

}