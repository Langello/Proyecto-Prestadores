import { Usuario } from '../../models/usuarioMODEL.js';
import { Consumidor } from '../../models/consumidorMODEL.js';
import { Prestador } from '../../models/prestadorMODEL.js';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export async function loginUsuario(req, res) {

    const email = req.body.email;
    const password = req.body.password;



    const usuario = await Usuario.findOne({ where: { email }, attributes: { include: ['password'] } });
    if (!usuario) {
        return res.status(404).json({ msg: 'Email o contraseña incorrecta' });
    }

    if (password !== usuario.password) {
        return res.status(401).json({ msg: 'Email o contraseña incorrecta' });
    }

    const consumidor = await Consumidor.findOne({ where: { usuarioId: usuario.id } });

    const prestador = await Prestador.findOne({ where: { usuarioId: usuario.id } });

    
    const token = jwt.sign({ idUsuario: usuario.id, idConsumidor: consumidor?.id, idPrestador: prestador?.id }, process.env.JWT_SECRET, {

    })

    return res.status(200).json({ token });
}

export async function getRoles(req, res, next) {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const idUsuario = decoded.idUsuario

    const idConsumidor = decoded.idConsumidor

    const idPrestador = decoded.idPrestador
    
    let usuario = false
    let consumidor = false
    let prestador = false
    

    if (idUsuario !== null) {
        usuario = true
    }

    if (idConsumidor !== null) {
        consumidor = true
    }

    if (idPrestador !== null) {
        prestador = true
    }

    return res.status(200).json({usuario, consumidor, prestador});

    
}

