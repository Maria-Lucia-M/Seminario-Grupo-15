import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { PersonaDTO } from '../application/DTOs/PersonaDTO.js';
import { PersonaModel } from '../CRUDS/Persona/personaModel.js';
import { AuthService } from './authService.js';
import { RefreshTokenRepository } from './refresh-token.repository.js';
import { RefreshTokenModel } from './refresh-token.entity.js';
import { FailedLoginRepository } from '../shared/security/failed-login.repository.js';
import { Adoptante, Colaborador, Veterinario } from '../application/DTOs/PersonaDTO.js';
import { PersonaRepositoryMongo } from '../CRUDS/Persona/PersonaRepositoryMongo.js';
import { verifyPasswordResetToken } from './authService.js';
import redisClient from '../config/redisClient.js';

dotenv.config();

// Claves secretas para firmar los tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

//TypeGuards para verificar los tipos de usuarios
export function inferirRol(user: PersonaDTO): string {
    switch (user.__t) {
        case "Adoptante":
            return "Adoptante";
        case "Colaborador":
            return "Colaborador";
        case "Veterinario":
            return "Veterinario";
        case "Admin":
            return "Admin";
        default:
            return "Desconocido";
    }
}

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
        id: user.id,
        codigo: user.dni,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol
    };
    console.log(`[LOGIN] Usuario ${user.email} (${user.dni}) autenticado como ${userData.rol}`);
    return res.status(200).json({ accessToken, refreshToken, user: userData });
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.body.refreshToken;
    if (typeof token !== 'string' || token.trim() === '') {
        return res.status(401).json({ message: 'Refresh token no proporcionado o invalido.' });
    };

    try{
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
            DNI: number;
            rol: string;
            id: string;
        };
        console.log("Decoded: ", decoded);

        const user = await PersonaModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: `Usuario con id ${decoded.id} no encontrado.` });
        };

        const storedToken = await RefreshTokenModel.findOne({ token });
        const persona = await PersonaModel.findById(storedToken?.persona);

        if (!storedToken) {
            return res.status(403).json({ message: 'El token ha sido revocado o eliminado.' });
        };

        if(!persona){
            return res.status(404).json({ message: 'Usuario asociado al token no encontrado.' });
        };

        const payload = {
            codigo: user.dni,
            email: user.email,
            rol: decoded.rol,
            nombre: user.nombre
        };

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
        
        return res.status(200).json({ accessToken, user: payload });

    }catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'El token ha expirado, inicia sesión nuevamente.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'El token proporcionado es inválido.' });
        } else {
            console.error('Error inesperado:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    };
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken || typeof refreshToken !== 'string' || refreshToken.split('.').length !== 3) {
        return res.status(400).json({ message: 'El refresh token es obligatorio y debe tener formato válido.' });
    };

    try{
        const storedToken = await RefreshTokenModel.findOne({ token: refreshToken });
        if (!storedToken) {
            console.warn(`Intento de logout con un token inválido: ${refreshToken}`);
            return res.status(404).json({ message: 'El refresh token no está registrado.' });
        }

        await RefreshTokenModel.deleteOne({ _id: storedToken._id });

        return res.status(200).json({ message: 'Logout exitoso' });
    }catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'El refresh token ha expirado, inicia sesión nuevamente.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'El refresh token proporcionado es inválido.' });
        } else {
            console.error('Error inesperado:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        };
    };
};

export const validateResetToken = (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: 'Token requerido' });
    }

    const email = verifyPasswordResetToken(token);
    if (!email) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    return res.status(200).json({ message: 'Token válido', email });
};

export const validateAccessToken = (req:Request, res:Response):void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
    };

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        res.status(200).json({ valid: true, user: decoded });
        //console.log("El famoso decoded en validate token: ", decoded);
        return
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
        return;
    };
};