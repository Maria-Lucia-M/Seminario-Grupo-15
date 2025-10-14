import { FichaMedicaDTO } from "../DTOs/FichaMedicaDTO";
export interface FichaMedicaRepository {
    registrar(dto:FichaMedicaDTO): Promise<FichaMedicaDTO>;
}