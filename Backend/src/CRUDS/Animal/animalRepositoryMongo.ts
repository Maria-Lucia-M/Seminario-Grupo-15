import { AnimalDTO } from '../../application/DTOs/AnimalDTO';
import { AnimalModel } from './animal.model.js';
import { mapearAnimal } from './mapearAnimal.js';

type Especie = 'Perro' | 'Gato';

type Estado = 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado' | 'disponible' | 'no_disponible';

const especieValida: Especie[] = ['Perro', 'Gato'];
const estadoValido: Estado[] = ['Apto', 'No apto', 'En adopcion', 'Adoptado', 'disponible', 'no_disponible'];

export class AnimalRepositoryMongo {
    async registrar(dto: AnimalDTO): Promise<AnimalDTO> {
        if (!especieValida.includes(dto.especie)) {
            throw new Error('Especie inválida');
        };

        if (!estadoValido.includes(dto.estado)) {
            throw new Error('Estado inválido');
        };

        const animal = new AnimalModel(dto);
        const guardado = await animal.save();

        return {
            nro: guardado.nro,
            especie: guardado.especie as Especie,
            raza: guardado.raza,
            edad_estimada: guardado.edad_estimada,
            fecha_ingreso: guardado.fecha_ingreso,
            fecha_defuncion: guardado.fecha_defuncion,
            estado: guardado.estado as Estado,
            imagen: Array.isArray(guardado.imagen) ? guardado.imagen.join(',') : guardado.imagen,
            video: Array.isArray(guardado.video) ? guardado.video.join(',') : guardado.video
        };
    };

    async getAll(): Promise<AnimalDTO[]> {
        const docs = await AnimalModel.find().lean();
        return docs.map(mapearAnimal);
    };

    async buscarPorNro(nro: number): Promise<AnimalDTO | null> {
        const doc = await AnimalModel.findOne({ nro }).lean();
        return doc ? mapearAnimal(doc) : null;
    };

    async actualizar(nro: number, dto: Partial<AnimalDTO>): Promise<AnimalDTO | null> {
        const doc = await AnimalModel.findOneAndUpdate({ nro }, dto, { new: true }).lean();
        return doc ? mapearAnimal(doc) : null;
    };

    async eliminar(nro: number): Promise<boolean> {
        const resultado = await AnimalModel.deleteOne({ nro });
        return resultado.deletedCount === 1;
    };
};