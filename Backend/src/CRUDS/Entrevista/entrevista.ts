import { Schema, model } from 'mongoose';
import { estadoValido } from '../../application/DTOs/EntrevistaDTO.js';

const entrevistaSchema = new Schema({
    nro_animal: { type: String, required: true },
    id_colaborador: { type: String, required: true },
    fecha_entrevista: { type: Date, required: true },
    hora_entrevista: { type: String, required: true },
    dni_adoptante: { type: Number, required: true },
    estado: { 
        type: String, 
        required: true,
        enum: estadoValido
    },
    descripcion: { type: String, default: null },
    fecha_rep: { type: Date, default: null },
    hora_rep: { type: String, default: null }
});

export const EntrevistaModel = model('Entrevista', entrevistaSchema);