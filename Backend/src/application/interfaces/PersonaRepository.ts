import { PersonaDTO } from "../DTOs/PersonaDTO.js";
import { PersonaConId } from "../../CRUDS/Persona/extensionPersona.js";

export interface PersonaRepository {
    registrarPersona(persona: PersonaDTO): Promise<PersonaDTO>;
    buscarPorDNI(dni: number): Promise<PersonaDTO | null>;
    listarPersonas(): Promise<PersonaDTO[]>;
    actualizarPersona(dni: number, persona: Partial<PersonaDTO>): Promise<PersonaDTO | null>;
    eliminarPersona(dni: number): Promise<boolean>;
    buscarPorEmail(email: string): Promise<PersonaConId | null>;
};