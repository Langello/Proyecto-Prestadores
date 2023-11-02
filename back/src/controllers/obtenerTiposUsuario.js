import { Tipo } from "../models/tipoMODEL.js";

export const obtenerTiposUsuario = async (req, res) => {
    const tipos = await Tipo.findAll();
    res.json(tipos);
}