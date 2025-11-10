import { PersonaRepository } from "../../../application/interfaces/PersonaRepository.js";

export class EliminarPersona {
    constructor(private readonly repo: PersonaRepository) {}

    async ejecutar(dni: number): Promise<boolean> {
        const existente = await this.repo.buscarPorDNI(dni);
        if (!existente) return false;

        return await this.repo.eliminarPersona(dni);
    };
}
