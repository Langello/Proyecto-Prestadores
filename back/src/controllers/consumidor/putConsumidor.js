import { Consumidor } from "../../models/consumidorMODEL.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function putConsumidor(req, res) {

    const { token, metodoPago } = req.body;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const idConsumidor = decoded.idConsumidor;


    return await Consumidor.update(
        {metodoPago},
        {where: {id: idConsumidor}},
    )
        .then((consumidor) => {
            if (!consumidor) {
                return res.status(404).json({
                    msg: "Consumidor no encontrado",
                });
            }

            res.status(200).json({
                msg: "Cuenta actualizada con exito",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })
}