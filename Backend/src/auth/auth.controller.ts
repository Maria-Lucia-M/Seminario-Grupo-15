import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { PersonaModel } from '../CRUDS/Persona/personaModel';
import { AdoptanteModel } from '../CRUDS/Persona/adoptanteModel';
import { VeterinarioModel } from '../CRUDS/Persona/veterinarioModel';
import { ColaboradorModel } from '../CRUDS/Persona/colaboradorModel';

dotenv.config();

// Claves secretas para firmar los tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

//TypeGuard para verificar el tipo de usuario