import { EntrevistaDTO } from "../DTOs/EntrevistaDTO.js";
export interface EntrevistaRepository {
    registrar(dto:EntrevistaDTO): Promise<EntrevistaDTO>;
};