import { Schema, model } from 'mongoose';

const personaSchema = new Schema({
    dni: { type:Number, required:true, unique:true},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    contraseña: { type: String, required: true },
    telefono: { type: String, required: true }    
}, { diiscriminatorKey: 'tipo', collection: 'personas' });

export const PersonaModel = model('Persona', personaSchema);