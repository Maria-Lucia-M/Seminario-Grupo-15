import { PersonaDTO } from "../../../application/DTOs/PersonaDTO.js";
import { PersonaRepository } from "../../../application/interfaces/PersonaRepository.js";

export class ListarPersonas {
    constructor(private readonly repo: PersonaRepository) {};

    async ejecutar(): Promise<PersonaDTO[]> {
        return await this.repo.listarPersonas();
    };
};