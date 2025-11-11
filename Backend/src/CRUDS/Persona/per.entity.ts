import { Veterinario, Adoptante, Colaborador } from '../../application/DTOs/PersonaDTO';

export class Persona {
    dni: string;
    nombre: string;
    apellido: string;
    mail: string;
    password: string;
    telefono: string;
    veterinario!: Veterinario | null;
    adoptante!: Adoptante | null;
    colaborador!: Colaborador | null;

    constructor(
        dni: string,
        nombre: string,
        apellido: string,
        mail: string,
        password: string,
        telefono: string,
        veterinario: Veterinario | null = null,
        adoptante: Adoptante | null = null,
        colaborador: Colaborador | null = null
    ) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.password = password;
        this.telefono = telefono;
        this.veterinario = veterinario;
        this.adoptante = adoptante;
        this.colaborador = colaborador;
    }
}