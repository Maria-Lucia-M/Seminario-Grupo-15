import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PersonaConId } from '../CRUDS/Persona/extensionPersona.js';
import { inferirRol } from './auth.controller.js';
import { PersonaRepository } from '../application/interfaces/PersonaRepository.js';
import { FailedLoginRepository } from '../shared/security/failed-login.repository.js';
import { RefreshTokenRepository } from './refresh-token.repository.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

//Claves de acceso para firmar los tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const MAX_ATTEMPTS = 5;

interface Payload {
    id: string;
    dni: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: string;
};

// Genera un token con expiración de 1 hora
export const generatePasswordResetToken = (email: string): string => {
    const token = jwt.sign(
        { email }, 
        JWT_SECRET, 
        { expiresIn: '1h' });
    return token;
};

// Verifica el token y extrae el email si es válido
export const verifyPasswordResetToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        return decoded.email;
    } catch (error) {
        console.error('Token inválido o expirado:', error);
        return null;
    };
};

export class AuthService {
    constructor(
        private readonly personaRepo: PersonaRepository,
        private readonly failedLoginRepo: FailedLoginRepository,
        private readonly refreshTokenRepo: RefreshTokenRepository) {};

    async login(email: string, password: string):Promise<
    {ok:true; accessToken:string; refreshToken:string; user: Payload} |
    {ok: false; status: number; message: string }>{
        
        console.log(`[AuthService] Intento de login para el email: ${email} y contraseña: ${password}`);
        if(!email || !password){
            return { ok: false, status: 400, message: 'Email y contraseña son requeridos' };
        };

        const failedAttempts = await this.failedLoginRepo.getAttempts(email);
        if(failedAttempts >= MAX_ATTEMPTS){
            return {
                ok: false,
                status: 429,
                message: 'Demasiados intentos. Espera 15 minutos o verifica tu correo.'
            };
        };

        let user: PersonaConId | null;
        user = await this.personaRepo.buscarPorEmail(email);
        console.log("Usuario encontrado:", user);
        if(!user){
            await bcrypt.compare('dummy', '$2a$10$dummyhashdummyhashdummyha');
            await this.failedLoginRepo.incrementAttempts(email);
            return { ok: false, status: 401, message: 'Email o contraseña incorrectos' };
        };

        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match: ${passwordsMatch}`);
        if(!passwordsMatch){
            await bcrypt.compare('dummy', '$2a$10$dummyhashdummyhashdummyha');
            await this.failedLoginRepo.incrementAttempts(email);
            return { ok: false, status: 401, message: 'Email o contraseña incorrectos' };
        };

        const payload = {
            id: user._id,
            dni: user.dni,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: inferirRol(user)
        };

        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            payload,
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        await this.refreshTokenRepo.add(refreshToken, user._id);
        await this.failedLoginRepo.resetAttempts(email);

        return { ok:true, accessToken, refreshToken, user: payload }
    };
};