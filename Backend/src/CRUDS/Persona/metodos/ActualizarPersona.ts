import { PersonaRepository } from '../../../application/interfaces/PersonaRepository.js';
import { PersonaDTO } from '../../../application/DTOs/PersonaDTO.js';

export class ActualizarPersona {
    constructor(private readonly repo: PersonaRepository) {}

    async ejecutar(dni: number, cambios: Partial<PersonaDTO>): Promise<PersonaDTO | null> {
        const existente = await this.repo.buscarPorDNI(dni);
        if (!existente) return null;

        return await this.repo.actualizarPersona(dni, cambios);
    };
}
