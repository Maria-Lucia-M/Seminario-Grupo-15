import { Schema, model } from 'mongoose';

const altaSchema = new Schema({
    nro: { type: Schema.Types.BigInt, required: true },
    especie: {
        perro: { type: Boolean, required: true },
        gato: { type: Boolean, required: true }
    },
    raza: { type: String, required: true },
    edad_estimada: { type: Schema.Types.BigInt, required: true },
    fecha_ingreso: { type: Date, required: true },
    fecha_defuncion: { type: Date, default: null },
    estado: {
        apto: { type: Boolean, default: true },
        no_apto: { type: Boolean, default: false },
        en_adopcion: { type: Boolean, default: false },
        adoptado: { type: Boolean, default: false },
        disponible: { type: Boolean, default: true },
        no_disponible: { type: Boolean, default: false }
    },
    imagen: { type: [String], default: [] },
    video: { type: [String], default: [] }
});

export const animalModel = model('Alta animal', altaSchema);