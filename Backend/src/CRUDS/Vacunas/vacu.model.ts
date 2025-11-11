import { Schema, model } from 'mongoose';

const DrogaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const VacunaSchema = new Schema({
    nro_vacuna: { type: Number, required: true },
    nombre: { type: String, required: true },
    fecha_vencimiento: { type: Date, required: true },
    droga: { type: [DrogaSchema], required: true },
    stock: { type: Number, required: true },
    fecha_ingreso: { type: Date, required: true }
});

export const VacunaModel = model('Vacuna', VacunaSchema);