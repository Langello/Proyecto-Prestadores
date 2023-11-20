import { Consumidor } from "../../models/consumidorMODEL.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function crearConsumidor(req, res) {
    const { metodoPago, token } = req.body;
    

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idUsuario = decoded.idUsuario

    
    return await Consumidor.create({
        metodoPago,
        usuarioId: idUsuario
    })
        .then((consumidor) => {
            res.status(201).json(consumidor);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
}
