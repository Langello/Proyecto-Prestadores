import { Prestador } from "../../models/prestadorMODEL.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function crearPrestador(req, res) {
    const {
        cuilCuit,
        descripcion,
        fotosTrabajosRealizados,
        horariosAtencion,
        disponibilidad,
        radioCobertura,
        token

    } = req.body;
    
    
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    

    const idUsuario = decoded.idUsuario
    
    

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
