import { AnimalModel } from './animal.js';
import { mapearAnimal } from './mapearAnimal.js';
const especieValida = ['Perro', 'Gato'];
const estadoValido = ['Apto', 'No apto', 'En adopcion', 'Adoptado'];
export class AnimalRepositoryMongo {
    async registrar(dto) {
        if (!especieValida.includes(dto.especie)) {
            throw new Error('Especie inválida');
        }
        ;
        if (!estadoValido.includes(dto.estado)) {
            throw new Error('Estado inválido');
        }
        ;
        const animal = new AnimalModel(dto);
        const guardado = await animal.save();
        return {
            nro: guardado.nro,
            especie: guardado.especie,
            raza: guardado.raza,
            edad_estimada: guardado.edad_estimada,
            fecha_ingreso: guardado.fecha_ingreso,
            fecha_defuncion: guardado.fecha_defuncion,
            estado: guardado.estado,
            imagen: Array.isArray(guardado.imagen) ? guardado.imagen.join(',') : guardado.imagen,
            video: Array.isArray(guardado.video) ? guardado.video.join(',') : guardado.video
        };
    }
    ;
    async getAll() {
        const docs = await AnimalModel.find().lean();
        return docs.map(mapearAnimal);
    }
    ;
    async buscarPorNro(nro) {
        const doc = await AnimalModel.findOne({ nro }).lean();
        return doc ? mapearAnimal(doc) : null;
    }
    ;
    async actualizar(nro, dto) {
        const doc = await AnimalModel.findOneAndUpdate({ nro }, dto, { new: true }).lean();
        return doc ? mapearAnimal(doc) : null;
    }
    ;
    async eliminar(nro) {
        const resultado = await AnimalModel.deleteOne({ nro });
        return resultado.deletedCount === 1;
    }
    ;
}
;
//# sourceMappingURL=animalRepositoryMongo.js.map