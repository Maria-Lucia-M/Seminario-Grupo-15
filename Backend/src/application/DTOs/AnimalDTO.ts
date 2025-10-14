type Raza = {
    raza: 'Dogo' | 'Fila Du Brasil' | 'Pancho salchicha' | 'Cusco';
};

export type Especie = 'Perro' | 'Gato';

export interface AnimalDTO {
    nro: number;
    especie: Especie;
    raza: string;
    edad_estimada: number;
    fecha_ingreso: Date;
    fecha_defuncion?: Date | null;
    estado: 'Disponible' | 'No disponible';
    imagen?: string[];
    video?: string[];
};