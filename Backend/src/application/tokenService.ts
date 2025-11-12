import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PersonaDTO } from './DTOs/PersonaDTO.js';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export class TokenService{
    static generarTokens(adoptante:PersonaDTO):{accessToken:string, refreshToken:string} {
        const accessToken = jwt.sign(
            {
                codigo: adoptante._id,
                dni: adoptante.dni,
                nombre: adoptante.nombre,
                apellido: adoptante.apellido,
                email: adoptante.email,
                rol: 'Adoptante'
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn:"1h"
            }
        );

        const refreshToken = jwt.sign(
            {
                codigo: adoptante._id,
                dni: adoptante.dni,
                nombre: adoptante.nombre,
                apellido: adoptante.apellido,
                email: adoptante.email,
                rol: 'Adoptante'
            },
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return {accessToken, refreshToken};
    };
};