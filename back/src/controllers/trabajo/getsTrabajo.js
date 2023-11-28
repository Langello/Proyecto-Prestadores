import { Trabajo } from "../../models/trabajoMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";
import { Calificacion } from "../../models/calificacionMODEL.js";
import { Usuario } from "../../models/usuarioMODEL.js";
import { Prestador } from "../../models/prestadorMODEL.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function obtenerTrabajos(req, res) {
    let filtro = req.query.filtro;


    if (!filtro) {
        filtro = '';
    }
    return await Trabajo.findAll({
        include: [
            {
                model: Estados,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
        where: {
            [Op.or]: [
                { nombre: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { tareas: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { lugar: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } },
                { rangoHorario: { [Op.like]: Sequelize.literal(`LOWER("%${filtro}%")`) } }
            ],
            [Op.and]: [
                { "$Estado.id$": 6 }, // El 6 es el id del estado "Publicado"
            ]
        },
        attributes: {
            exclude: [
                'estadoId', 'createdAt', 'updatedAt'
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

export async function obtenerTrabajosByConsumidor(req, res) {
    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idConsumidor


    return await Trabajo.findAll({
        include: [
            {
                model: Estados,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: Calificacion,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
        where: {
            consumidorId: id,
        },
        attributes: {
            exclude: [
                'estadoId', 'createdAt', 'updatedAt'
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

export async function obtenerTrabajosByPrestador(req, res) {
    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idPrestador


    return await Trabajo.findAll({
        include: [
            {
                model: Estados,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Calificacion,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
        where: {
            prestadorId: id,
        },
        attributes: {
            exclude: [
                'estadoId', 'createdAt', 'updatedAt'
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

        include: [
            {
                model: Estados,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Calificacion,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Prestador,
                attributes: {
                    exclude: ['cuilCuit',  'descripcion', 'fotosTrabajosRealizados', 'telefono',
                        'createdAt', 'updatedAt', 'radioCobertura',
                        'password', 'usuarioId', 'fechaNacimiento']
                },
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['id', 'dni', 'email', 'telefono',
                                'createdAt', 'updatedAt', 'tipoId', 'fotoPerfil',
                                'password', 'tipoDni', 'fechaNacimiento',]
                        }
                    }
                ]
            }
        ],
        attributes: {
            exclude: [
                'estadoId', 'createdAt', 'updatedAt'
            ]
        }


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