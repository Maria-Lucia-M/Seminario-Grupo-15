interface Veterinario {
    matricula: string;
    año_experiencia:string;
};

interface Adoptante {
    estado:'Apto' | 'No apto';
    domicilio: string;
};

interface Colaborador {
    id_colaborador: number;
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