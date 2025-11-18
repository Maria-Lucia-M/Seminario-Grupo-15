import {Schema, model} from 'mongoose';
import { PersonaModel } from '../Persona/personaModel.js';

const adoptanteSchema = new Schema({
    estado: { type: String, enum:['Apto', 'No apto'], required: true },
    domicilio: { type: String, required: true },
});

export const AdoptanteModel = PersonaModel.discriminator('Adoptante', adoptanteSchema);