import { Schema, model } from "mongoose";

const altaSchema = new Schema({
    nro: { type: Number, required: true, unique: true },
    especie: { type: String, enum: ['Perro', 'Gato'], required: true },
    raza: { type: String, required: true },
    edad_estimada: { type: Number, required: true },
    fecha_ingreso: { type: Date, required: true },
    fecha_defuncion: { type: Date, default: null },
    estado: {
        type: String,
        enum: ['Apto', 'No apto', 'En adopcion', 'Adoptado', 'disponible', 'no_disponible'],
        required: true
    },
    imagen: { type: String, required: true },
    video: { type: String, default: null }
});

export const AltaAnimalModel = model("AltaAnimal", altaSchema);
