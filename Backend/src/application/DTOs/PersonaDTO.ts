export interface Veterinario {
    matricula: string;
    año_experiencia:string;
};

export interface Adoptante {
    estado:'Apto' | 'No apto';
    domicilio: string;
};

export interface Colaborador {
    id_colaborador: string;
};

export interface PersonaDTO {
    dni:number;
    nombre:string;
    apellido:string;
    email:string;
    contraseña:string;
    telefono:string;
    veterinario: Veterinario | null;
    adoptante: Adoptante | null;
    colaborador: Colaborador | null;
};