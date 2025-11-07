import { Schema, model } from 'mongoose';


const rescateSchema = new Schema({
    lugar_rescate: { type: String, required: true },
    fecha_rescate: { type: Date, required: true },
    nro_animal: { type: Number, required: true, unique: true },
    dni_rescatista: { type: String, required: true },
});

export const RescateModel = model('Rescate', rescateSchema);