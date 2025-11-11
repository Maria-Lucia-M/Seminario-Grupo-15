import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepository } from "../../interfaces/AnimalRepository.js";
import { animalModel } from "../CUU-RegistrarAltaAnimal/Alta.js";

export class AnimalRepositoryMongo implements AnimalRepository {
    async registrar(dto: AnimalDTO): Promise<AnimalDTO>{
        const animal = new animalModel(dto);
        const guardado = await animal.save();
        const obj = guardado.toObject() as any;
        if (typeof obj.nro === 'bigint') obj.nro = Number(obj.nro);
        if (typeof obj.edad_estimada === 'bigint') obj.edad_estimada = Number(obj.edad_estimada);
        return obj as AnimalDTO;
    };

    async obtenerTodos(): Promise<AnimalDTO[]>{
        const animales = await animalModel.find().lean();
        const converted = (animales as any[]).map((obj) => {
            const a = { ...obj } as any;
            if (typeof a.nro === 'bigint') a.nro = Number(a.nro);
            if (typeof a.edad_estimada === 'bigint') a.edad_estimada = Number(a.edad_estimada);
            return a as AnimalDTO;
        });
        return converted;
    };

    async obtenerPorId(id: string): Promise<AnimalDTO | null> {
        const animal = await animalModel.findById(id).lean();
        if (!animal) return null;
        const obj = animal as any;
        if (typeof obj.nro === 'bigint') obj.nro = Number(obj.nro);
        if (typeof obj.edad_estimada === 'bigint') obj.edad_estimada = Number(obj.edad_estimada);
        return obj as AnimalDTO;
    };

    async actualizar(dto: AnimalDTO): Promise<AnimalDTO> {
        const actualizado = await animalModel.findByIdAndUpdate(dto.nro, dto, { new: true }).lean();
        if (!actualizado) throw new Error('Animal no encontrado');
        const obj = actualizado as any;
        if (typeof obj.nro === 'bigint') obj.nro = Number(obj.nro);
        if (typeof obj.edad_estimada === 'bigint') obj.edad_estimada = Number(obj.edad_estimada);
        return obj as AnimalDTO;
    };

    async eliminar(id: string): Promise<void> {
        await animalModel.findByIdAndDelete(id);
    };
};