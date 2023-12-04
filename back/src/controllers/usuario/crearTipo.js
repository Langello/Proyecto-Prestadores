import { Tipo } from "../../models/tipoMODEL.js";

export const crearTipo = async (req, res) => {

    const { tipo } = req.body;

    const nuevoTipo = await Tipo.create({
        tipo
    });

    res.json({
        message: 'Tipo creado correctamente',
        nuevoTipo
    })
}