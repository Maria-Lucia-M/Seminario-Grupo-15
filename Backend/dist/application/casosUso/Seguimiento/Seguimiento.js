import { Schema, model } from 'mongoose';
const seguimientoSchema = new Schema({
    nro_adopcion: { type: Schema.Types.Number, ref: 'Adopcion', required: true },
    fecha_seguimiento: { type: Date, required: true },
    estado_animal: { type: String, enum: ['Apto', 'No apto', 'En adopcion', 'Adoptado'], required: true },
    entorno: { type: String, required: true }
});
export const SeguimientoModel = model('Seguimiento', seguimientoSchema);
//# sourceMappingURL=Seguimiento.js.map