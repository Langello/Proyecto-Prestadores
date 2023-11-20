import { Trabajo } from "../../models/trabajoMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";


export async function obtenerTrabajos(req, res) {
    let filtro = req.query.filtro;
    console.log(filtro);

    if (!filtro) {
        filtro = '';
    }
    return await Trabajo.findAll({
        include: [Estados],
        where: {
            [Op.or]: [
                { nombre: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { tareas: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { lugar: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { rangoHorario: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } }
            ],
            [Op.and]: [
                { "$Estado.id$": 6 }, // Publicado
            ]
        }
    })
        .then((trabajos) => {
            res.status(200).json(trabajos);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
export async function obtenerTrabajoPorId(req, res) {
    const { idTrabajo } = req.params;

    return await Trabajo.findByPk(idTrabajo, {

        include: [Estados],


    })
        .then((trabajo) => {
            if (!trabajo) {
                return res.status(404).json({
                    msg: "Trabajo no encontrado",
                });
            }

            res.status(200).json(trabajo);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
}