import { Schema, model } from 'mongoose';

const FichaMedicaSchema = new Schema({
    nro_ficha: { type: Number, required: true, unique: true },
    nro_animal: { type: Number, required: true },
    matricula: { type: String, required: true },
    nro_vacunas: { type: [Number], required: true },
    observaciones: { type: String, required: false },
    fecha: { type: Date, required: true }
});

export const FichaMedicaModel = model('FichaMedica', FichaMedicaSchema);