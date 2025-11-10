import { PersonaRepository } from "../../../application/interfaces/PersonaRepository.js";
import { PersonaDTO } from "../../../application/DTOs/PersonaDTO.js";

export class BuscarPersona {
    constructor(private readonly repo: PersonaRepository) {}

    async ejecutar(dni: number): Promise<PersonaDTO | null> {
        return await this.repo.buscarPorDNI(dni);
    };
};