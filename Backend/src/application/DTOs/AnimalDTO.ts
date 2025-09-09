type Raza = {
    raza: 'Dogo' | 'Fila Du Brasil' | 'Pancho salchicha' | 'Cusco';
};

type Especie = 'Perro' | 'Gato';

type Estado = 'Disponible' | 'No disponible';

export interface AnimalDTO {
    nro_animal: number;
    especie: Especie;
    raza: Raza;
    edad_estimada: number;
    fecha_ingreso: Date;
    fecha_defuncion?: Date | null;
    estado: Estado;
    imagen: string;
    video: string;
};