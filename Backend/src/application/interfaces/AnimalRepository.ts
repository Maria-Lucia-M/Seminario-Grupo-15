import { AnimalDTO } from "../DTOs/AnimalDTO.js";
export interface AnimalRepository {
    registrar(dto:AnimalDTO): Promise<AnimalDTO>;
    getAll(): Promise<AnimalDTO[]>;
    buscarPorNro(nro: number): Promise<AnimalDTO | null>;
    actualizar(nro: number, dto: Partial<AnimalDTO>): Promise<AnimalDTO | null>;
    eliminar(nro: number): Promise<boolean>;
};