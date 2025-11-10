import { Schema } from 'mongoose';
import { PersonaModel } from '../Persona/personaModel.js';

const colaboradorSchema = new Schema({
    id_colaborador: { type: String, required: true, unique: true },
});

export const ColaboradorModel = PersonaModel.discriminator('Colaborador', colaboradorSchema);