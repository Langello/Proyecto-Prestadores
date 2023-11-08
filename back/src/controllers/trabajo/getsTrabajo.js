import { Trabajo } from "../../models/trabajoMODEL.js";
import { Prestador } from "../../models/prestadorMODEL.js";
import { Consumidor } from "../../models/consumidorMODEL.js";
import { Usuario } from "../../models/usuarioMODEL.js";
import { Estados } from "../../models/estadoMODEL.js";
import { Calificacion } from "../../models/calificacionMODEL.js";

export async function obtenerTrabajos(req, res) {
    return await Trabajo.findAll()
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
        include: [Prestador, Consumidor, {
            model: Prestador,
            include: [Usuario],
        }, {
                model: Consumidor,
                include: [Usuario]
            }
            , {
                model: Estados,
            },
            {
                model: Calificacion,
                
            }
        ],

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