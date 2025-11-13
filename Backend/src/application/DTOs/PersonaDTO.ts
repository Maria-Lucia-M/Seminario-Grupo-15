export interface Veterinario {
    matricula: string;
    año_experiencia:string;
};

export interface Adoptante {
    estado:'Apto' | 'No apto';
    domicilio: string;
    enListaNegra: boolean;
};

export interface Colaborador {
    id_colaborador: string;
};

export interface PersonaDTO {
    _id?: string;
    dni:number;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    telefono:string;
    veterinario: Veterinario | null;
    adoptante: Adoptante | null;
    colaborador: Colaborador | null;
    __t?: "Adoptante" | "Colaborador" | "Veterinario" | "Admin";
};