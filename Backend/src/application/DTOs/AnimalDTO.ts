type Raza = 'Dogo' | 'Fila Du Brasil' | 'Pancho salchicha' | 'Cusco' | 'Otros';

type Especie = 'Perro' | 'Gato';

type Estado = 'Apto' | 'No apto' | 'En adopcion' | 'Adoptado';

export interface AnimalDTO {
    nro_animal: number;
    especie: Especie;
    raza: Raza;
    edad_estimada: number;
    fecha_ingreso: Date;
    fecha_defuncion: Date | null;
    estado: Estado;
    imagen: string;
    video: string | null;
};