import {Usuario} from '../../models/usuarioMODEL.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export async function loginUsuario(req, res) {
    console.log(req.body)
    
    const email = req.body.email;
    const password = req.body.password;
    


    const usuario = await Usuario.findOne({ where: { email }, attributes: { include: ['password'] } });

    if (!usuario) {
        return res.status(404).json({ msg: 'Email o contraseña incorrecta' });
    }

    if (password !== usuario.password) {
        return res.status(401).json({ msg: 'Email o contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
}