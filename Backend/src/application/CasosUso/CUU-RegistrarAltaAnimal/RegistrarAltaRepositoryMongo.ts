import { AnimalDTO } from "../../DTOs/AnimalDTO.js";
import { AnimalRepository } from "../../interfaces/AnimalRepository.js";
import { AnimalModel } from "./AltaAnimal.js";

export class AltaRepositoryMongo implements AnimalRepository {
    async registrar(dto: AnimalDTO): Promise<AnimalDTO>{
        const alta = new AnimalModel(dto);
        const guardado = await alta.save();
        return guardado.toObject();
    };
};