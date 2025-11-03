import { AnimalDTO } from "../DTOs/AnimalDTO.js";
export interface AnimalRepository {
    registrar(dto:AnimalDTO): Promise<AnimalDTO>;
};