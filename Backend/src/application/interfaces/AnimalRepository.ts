import { AnimalDTO } from "../DTOs/AnimalDTO.js";
export interface AnimalRepository {
    registrar(dto:AnimalDTO): Promise<AnimalDTO>;
    obtenerTodos(): Promise<AnimalDTO[]>;
    obtenerPorId(id:string): Promise<AnimalDTO | null>;
    actualizar(dto:AnimalDTO): Promise<AnimalDTO>;
    eliminar(id:string): Promise<void>;
};