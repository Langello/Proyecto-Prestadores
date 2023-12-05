import { MensajeAConsumidor } from "../../models/mensajeMODEL.js";
import { MensajeAPrestador } from "../../models/mensajeMODEL.js";
import { Consumidor } from "../../models/consumidorMODEL.js";
import { Prestador } from "../../models/prestadorMODEL.js";
import { Usuario } from "../../models/usuarioMODEL.js";
import { Sequelize, Op } from "sequelize";


import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { literal } from "sequelize";

dotenv.config();

export async function getMensajeConsumidorRecibido(req, res) {

    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idConsumidor
    return await MensajeAConsumidor.findAll({
        include: [{
            model: Prestador,
            include: [
                {
                    model: Usuario, attributes:
                    {
                        exclude: ['id', 'dni', 'email', 'telefono',
                            'createdAt', 'updatedAt', 'tipoDni',
                            'tipoId', 'password', 'fotoPerfil', 'fechaNacimiento']
                    }
                }
            ],
            attributes: {
                exclude: [ 'createdAt', 'updatedAt',
                    'cuilCuit', 'descripcion', 'fotosTrabajosRealizados',
                    'horariosAtencion', 'radioCobertura', 'usuarioId']
            }
        }],
        where: {
            consumidorId: id
        },
    })

        .then((mensajes) => {
            res.status(200).json(mensajes);
        })

        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function getMensajeConsumidorEnviado(req, res) {

    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idConsumidor
    return await MensajeAPrestador.findAll({
        include: [{
            model: Prestador,
            include: [
                {
                    model: Usuario, attributes:
                    {
                        exclude: ['id', 'dni', 'email', 'telefono',
                            'createdAt', 'updatedAt', 'tipoDni',
                            'tipoId', 'password', 'fotoPerfil', 'fechaNacimiento']
                    }
                }
            ],
            attributes: {
                exclude: [ 'createdAt', 'updatedAt',
                    'cuilCuit', 'descripcion', 'fotosTrabajosRealizados',
                    'horariosAtencion', 'radioCobertura', 'usuarioId']
            }
        }],
        where: {
            idOrigen: id
        },
    })

        .then((mensajes) => {
            res.status(200).json(mensajes);
        })

        .catch((error) => {
            res.status(500).json(error);
        })
}

export async function getMensajePrestadorRecibido(req, res) {

    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.idPrestador
    
    return await MensajeAPrestador.findAll({
        include: [{
            model: Consumidor,
            include: [
                {
                    model: Usuario, attributes:
                    {
                        exclude: ['id', 'dni', 'email', 'telefono',
                            'createdAt', 'updatedAt', 'tipoDni', 'tipoId',
                             'password', 'fotoPerfil', 'fechaNacimiento']
                    }
                }
            ],
            attributes: {
                exclude: [ 'createdAt', 'updatedAt',
                    'cuilCuit', 'descripcion', 'fotosTrabajosRealizados',
                    'horariosAtencion', 'radioCobertura', 'usuarioId']
            }
        }],
        where: {
            idDestino: id
        },
    })

        .then((mensajes) => {
            res.status(200).json(mensajes);
        })

        .catch((error) => {
            res.status(500).json(error);
        })
}


export async function getMensajePrestadorEnviado(req, res) {

    const { token } = req.params;

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    
    

    const id = decoded.idPrestador

    return await MensajeAConsumidor.findAll({
        include: [{
            model: Consumidor,
            include: [
                {
                    model: Usuario, attributes:
                    {
                        exclude: ['id', 'dni', 'email', 'telefono',
                            'createdAt', 'updatedAt', 'tipoDni', 'tipoId',
                            'sexoId', 'password', 'fotoPerfil', 'fechaNacimiento' ]
                    }
                }
            ],
            attributes: {
                exclude: [ 'createdAt', 'updatedAt',
                    'cuilCuit', 'descripcion', 'fotosTrabajosRealizados',
                    'horariosAtencion', 'radioCobertura', 'usuarioId']
            }
        }],
        where: {
            idOrigen: id
        },
    })

        .then((mensajes) => {
            res.status(200).json(mensajes);
        })

        .catch((error) => {
            res.status(500).json(error);
        })
}