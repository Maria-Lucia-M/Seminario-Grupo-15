import { Schema, model } from 'mongoose';
const altaSchema = new Schema({
    nro: { type: Number, ref: 'Numero Animal', required: true },
    especie: { type: String, enum: ['Perro', 'Gato'], required: true },
    raza: { type: String, enum: ['Dogo', 'Fila Du Brasil', 'Pancho salchicha', 'Cusco', 'Otros'], required: true },
    edad_estimada: { type: Number, required: true },
    fecha_ingreso: { type: Date, required: true },
    fecha_defuncion: { type: Date, default: null }, // Puede ser null si el animal está vivo
    estado: { type: String, enum: ['No apto', 'Apto', 'En adopcion', 'Adoptado'], required: true },
    imagen: { type: String, required: true }, // URL de la imagen 
    video: { type: String, default: null } // URL del video
});
export const AnimalModel = model('Alta Animal', altaSchema);
//# sourceMappingURL=AltaAnimal.js.map