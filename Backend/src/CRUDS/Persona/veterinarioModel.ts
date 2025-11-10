import {Schema, model} from 'mongoose';
import { PersonaModel } from '../Persona/personaModel.js';

const veterinarioSchema = new Schema({
    matricula: { type: String, required: true, unique: true },
    años_experiencia: { type: Number, required: true }
});

export const VeterinarioModel = PersonaModel.discriminator('Veterinario', veterinarioSchema);