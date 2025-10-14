import { Schema, model } from 'mongoose';
import { FichaMedicaDTO } from '../../application/DTOs/FichaMedicaDTO';

const FichaMedicaSchema = new Schema<FichaMedicaDTO>({
    nro_ficha: { type: Number, required: true, unique: true },
    nro_animal: { type: Number, required: true },
    matricula: { type: String, required: true },
    nro_vacunas: { type: [Number], required: true },
    observaciones: { type: String, required: false },
    fecha: { type: Date, required: true }
});

export const FichaMedicaModel = model<FichaMedicaDTO>('FichaMedica', FichaMedicaSchema);