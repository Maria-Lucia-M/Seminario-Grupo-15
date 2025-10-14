import { Schema, model } from 'mongoose';
const animalSchema = new Schema({
    nro: { type: Number, required: true, unique: true },
    especie: { type: String, required: true },
    raza: { type: String, required: true },
    edad_estimada: { type: Number, required: true },
    fecha_ingreso: { type: Date, required: true },
    fecha_defuncion: { type: Date, default: null },
    estado: { type: String, required: true },
    imagen: [{ type: String }],
    video: [{ type: String }]
});
export const AnimalModel = model('Animal', animalSchema);
//# sourceMappingURL=animal.js.map