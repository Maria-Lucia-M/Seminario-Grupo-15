import { FichaMedicaDTO } from "../DTOs/FichaMedicaDTO";
export interface FichaMedicaRepository {
    registrar(dto:FichaMedicaDTO): Promise<FichaMedicaDTO>;
    obtenerTodos(): Promise<FichaMedicaDTO[]>;
    obtenerPorId(id:string): Promise<FichaMedicaDTO | null>;
    obtenerPorAnimalId(animalId:string): Promise<FichaMedicaDTO | null>;
    actualizar(dto:FichaMedicaDTO): Promise<FichaMedicaDTO>;
    eliminar(id:string): Promise<void>;
}