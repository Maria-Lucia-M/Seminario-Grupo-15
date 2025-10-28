import { Schema, model } from 'mongoose';

const rescatistaSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
});

export const RescatistaModel = model('Rescatista', rescatistaSchema);