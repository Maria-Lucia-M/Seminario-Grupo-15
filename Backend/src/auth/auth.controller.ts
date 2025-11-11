import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { PersonaDTO } from '../application/DTOs/PersonaDTO.js';
import { AuthService } from './authService.js';
import { RefreshTokenRepository } from './refresh-token.repository.js';
import { FailedLoginRepository } from '../shared/security/failed-login.repository.js';
import { Adoptante, Colaborador, Veterinario } from '../application/DTOs/PersonaDTO.js';
import { PersonaRepositoryMongo } from '../CRUDS/Persona/PersonaRepositoryMongo.js';
import redisClient from '../config/redisClient.js';

dotenv.config();

// Claves secretas para firmar los tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

//TypeGuards para verificar los tipos de usuarios
export function esAdoptante(user: PersonaDTO): user is PersonaDTO & { adoptante: Adoptante} {
    return user.adoptante ! == null;
};

export function esTrabajador(user: PersonaDTO): user is PersonaDTO & ({ colaborador: Colaborador } | { veterinario: Veterinario }) {
    return user.colaborador !== null || user.veterinario !== null;
};

export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;
    console.log(`[LOGIN] Intento de login para el email: ${email} y contraseña: ${password}`);
    
    const personaRepo = new PersonaRepositoryMongo();
    const failedLoginRepo = new FailedLoginRepository(redisClient);
    const refreshTokenRepo = new RefreshTokenRepository();

    const authService = new AuthService(personaRepo, failedLoginRepo, refreshTokenRepo);

    const resultado = await authService.login(email, password);

    if(!resultado.ok){
        return res.status(resultado.status).json({ message: resultado.message });
    };

    const { accessToken, refreshToken, user } = resultado;
    const userData = {
        id: user._id,
        codigo: user.dni,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        tipoUsuario: esAdoptante(user) ? 'Adoptante' : esTrabajador(user) ? 'Trabajador' : 'Admin'
    };
    console.log(`[LOGIN] Usuario ${user.email} (${user.dni}) autenticado como ${userData.tipoUsuario}`);
    return res.status(200).json({ accessToken, refreshToken, user: userData });
};