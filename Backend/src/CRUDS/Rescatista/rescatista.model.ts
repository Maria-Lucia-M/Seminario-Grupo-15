import { Schema, model } from 'mongoose';

const rescatistaSchema = new Schema({
    dni: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
});

export const RescatistaModel = model('Rescatista', rescatistaSchema);