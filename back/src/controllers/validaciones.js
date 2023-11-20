import validator from 'validator';
import { Usuario } from "../models/usuarioMODEL.js";
import { Prestador } from "../models/prestadorMODEL.js";
import { Consumidor } from "../models/consumidorMODEL.js";
import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export async function validarContrasena(req, res, next) {
    try {
        const { password } = req.body;

        return validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
            ? next()
            : res.status(400).json({ msg: 'Contraseña no válida: Debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo' });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarFormatoEmail(req, res, next) {
    try {
        const { email } = req.body;

        return validator.isEmail(email)
            ? next()
            : res.status(400).json({ msg: 'Formato de email no válido, ej: juan@example.com' });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarEmailRepetido(req, res, next) {
    try {
        const { email } = req.body;
        return await Usuario.findOne({ where: { email } })
            .then((usuario) => {
                return usuario
                    ? res.status(400).json({ msg: 'Email ya registrado' })
                    : next();
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarDniRepetido(req, res, next) {
    try {
        const { dni } = req.body;
        return await Usuario.findOne({ where: { dni } })
            .then((usuario) => {
                return usuario
                    ? res.status(400).json({ msg: 'DNI ya registrado' })
                    : next();
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarFechaNacimiento(req, res, next) {
    try {
        const { fechaNacimiento } = req.body;

        return validator.isISO8601(fechaNacimiento)
            ? next()
            : res.status(400).json({ msg: 'Fecha de nacimiento no válida formato: YYYY-MM-DD' });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarCuilCuitRepetido(req, res, next) {
    try {
        const { cuilCuit } = req.body;
        return await Prestador.findOne({ where: { cuilCuit } })
            .then((prestador) => {
                return prestador
                    ? res.status(400).json({ msg: 'CUIT ya registrado' })
                    : next();
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarIdUsuarioRepetidoPrestador(req, res, next) {
    try {

        const { token } = req.body

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        const usuarioId = decoded.idUsuario

        return await Prestador.findOne({ where: { usuarioId } })
            .then((prestador) => {
                return prestador
                    ? res.status(400).json({ msg: 'Ya tienes una cuenta como prestador' })
                    : next();
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function validarIdUsuarioRepetidoConsumidor(req, res, next) {
    try {
        
        const { token } = req.body

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        const usuarioId = decoded.idUsuario

        return await Consumidor.findOne({ where: { usuarioId } })
            .then((prestador) => {
                return prestador
                    ? res.status(400).json({ msg: 'Ya tienes una cuenta como consumidor' })
                    : next();
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarIdUsuarioExiste(req, res, next) {
    try {
        const { token } = req.body;

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        const idUsuario = decoded.idUsuario

        return await Usuario.findByPk(idUsuario)
            .then((usuario) => {
                return usuario
                    ? next()
                    : res.status(404).json({ msg: 'Usuario inexistente' });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarToken(req, res, next) {
    try {
        const { token } = req.body;

        return validator.isJWT(token)
            ? next()
            : res.status(400).json({ msg: 'Por favor inicie sesión' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function validarDisponibilidad(req, res, next) {
    try {
        const { disponibilidad } = req.body;
    
        return disponibilidad
            ? next()    
            : res.status(400).json({ msg: 'Por favor ingrese disponibilidad' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
