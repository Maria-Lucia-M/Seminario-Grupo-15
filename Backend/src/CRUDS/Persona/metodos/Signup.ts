import { PersonaDTO } from "../../../application/DTOs/PersonaDTO.js";
import { PersonaRepository } from "../../../application/interfaces/PersonaRepository.js";

export class SignUp {
    constructor(private readonly personaRepo: PersonaRepository) {};

    async ejecutar(dto:any):Promise<PersonaDTO | string[]> {
        const errores: string[] = [];

        const { dni, email, nombre, apellido, telefono, domicilio, password } = dto;

        // Validaciones básicas
        if (!dni) {
            errores.push('DNI es requerido y debe ser un número');
        };
        if (!email || typeof email !== 'string') {
            errores.push('Email es requerido y debe ser una cadena de texto');
        };
        if (!nombre || typeof nombre !== 'string') {
            errores.push('Nombre es requerido y debe ser una cadena de texto');
        };
        if (!apellido || typeof apellido !== 'string') {
            errores.push('Apellido es requerido y debe ser una cadena de texto');
        };
        if (!telefono || typeof telefono !== 'string') {
            errores.push('Teléfono es requerido y debe ser una cadena de texto');
        };
        if (!domicilio || typeof domicilio !== 'string') {
            errores.push('Dirección es requerida y debe ser una cadena de texto');
        };
        if (!password || typeof password !== 'string' || password.length < 6) {
            errores.push('Contraseña es requerida y debe tener al menos 6 caracteres');
        };

        // Verificar si el DNI o email ya existen
        const personaExistenteDNI = await this.personaRepo.buscarPorDNI(dni);
        if (personaExistenteDNI) {
            errores.push('El DNI ya está registrado');
        };

        // Verificar email unico
        const personaExistenteEmail = await this.personaRepo.buscarPorEmail(email);
        if (personaExistenteEmail) {
            errores.push('El email ya está registrado');
        };

        if (errores.length > 0) {
            return errores;
        };

        const nuevaPersona = await this.personaRepo.registrarPersona(dto);
        return nuevaPersona;
    };
};