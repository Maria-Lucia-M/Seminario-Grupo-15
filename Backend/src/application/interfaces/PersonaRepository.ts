import { PersonaDTO } from "../DTOs/PersonaDTO.js";

export interface PersonaRepository {
    registrarPersona(persona: PersonaDTO): Promise<PersonaDTO>;
    buscarPorDNI(dni: number): Promise<PersonaDTO | null>;
    listarPersonas(): Promise<PersonaDTO[]>;
    actualizarPersona(dni: number, persona: Partial<PersonaDTO>): Promise<PersonaDTO | null>;
    eliminarPersona(dni: number): Promise<boolean>;
};