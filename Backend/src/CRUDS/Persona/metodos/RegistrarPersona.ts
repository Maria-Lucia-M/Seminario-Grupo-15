import { PersonaDTO } from "../../../application/DTOs/PersonaDTO.js";
import { PersonaRepository } from "../../../application/interfaces/PersonaRepository.js";
import { PersonaModel } from "../personaModel.js";

export class RegistrarPersona {
    constructor(private readonly repo:PersonaRepository) {};
    async ejecutar(dto:PersonaDTO):Promise<PersonaDTO | string[]>{
        const errores: string[] = [];

        if (!dto.dni || !dto.nombre || !dto.apellido || !dto.email || !dto.contraseña || !dto.telefono) {
            errores.push('Faltan datos obligatorios');
            return errores;
        };

        const existente = await this.repo.buscarPorDNI(dto.dni);
        if (existente) {
            errores.push('Ya existe una persona con ese DNI');
        return errores;
        };

        return await this.repo.registrarPersona(dto);
    };
};