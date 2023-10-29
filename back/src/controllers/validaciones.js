import validator from 'validator';
import { Usuario } from "../models/usuarioMODEL.js";
import { Prestador } from "../models/prestadorMODEL.js";

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
        const { fecha_nacimiento } = req.body;

        return validator.isISO8601(fecha_nacimiento)
            ? next()
            : res.status(400).json({ msg: 'Fecha de nacimiento no válida formato: YYYY-MM-DD' });
    } catch (error) {
        res.status(500).json(error);
    }
}

export async function validarCuilCuitRepetido(req, res, next) {
    try {
        const { cuil_cuit } = req.body;
        return await Prestador.findOne({ where: { cuil_cuit } })
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

export async function validarIdUsuarioRepetido(req, res, next) {
    try {
        const usuario_Id = req.params.idUsuario;
        return await Prestador.findOne({ where: { usuario_Id } })
            .then((prestador) => {
                return prestador
                    ? res.status(400).json({ msg: 'ID de usuario ya registrado' })
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